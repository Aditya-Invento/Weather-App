const { default: axios } = require("axios");
const {get_rd_data,set_rd_data} = require('../database/redis_conn');
const shortid = require("shortid");
const rdkey_weather = 'weather_app | weather_data => ';//for caching weather data
const rdkey_user = 'weather_app | user_data => ';//for caching user settings

function process_icon(code) {
  try {
    if(typeof code !== 'number' || isNaN(code)) return false;
    const rain_codes = [1072,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1240,1243,1246];//16
    const snow_codes = [1066,1114,1210,1213,1216,1219,1222,1225,1237];
    const sleet_codes = [1069,1204,1207,1249,1252];
    const cloud_codes = [1003,1006,1009];
    const thunder_rain_codes = [1273,1276];
    const thunder_snow_codes = [1279,1282];
    if(rain_codes.includes(code)) return 1072;
    if(snow_codes.includes(code)) return 1066;
    if(sleet_codes.includes(code)) return 1069;
    if(cloud_codes.includes(code)) return 1003;
    if(thunder_rain_codes.includes(code)) return 1273;
    if(thunder_snow_codes.includes(code)) return 1279;
    // remaining => 1087:'Thunder', 1030:'Mist', 1009:'Overcast', 1000:'Clear Sky'
    else return code;
  } catch(err) {
    return false;
  }
}
async function process_current_weather(data) {
  try {
    const {
      temp_c,temp_f,
      is_day,//0=night,1=day
      wind_mph,wind_kph,
      precip_mm,precip_in,
      feelslike_c,feelslike_f
    } = data?.current;
    const current_forcast = data?.forecast?.forecastday[0];
    const {maxtemp_c,maxtemp_f,mintemp_c,mintemp_f,uv,condition} = current_forcast.day;
    return {
      temp_f: {
        current:Math.round(temp_f),
        high:Math.round(maxtemp_f),low:Math.round(mintemp_f),
        feelslike:Math.round(feelslike_f)
      },
      temp_c: {
        current:Math.round(temp_c),
        high:Math.round(maxtemp_c),low:Math.round(mintemp_c),
        feelslike:Math.round(feelslike_c)
      },
      precip: {mm:Number(precip_mm.toFixed(2)),inch:Number(precip_in.toFixed(1))},
      wind: {kph:Number(wind_kph.toFixed(1)),mph:Number(wind_mph.toFixed(1))},
      uv:uv,is_day:Boolean(is_day),
      condition: {
        title: condition.text,
        icon: process_icon(condition.code)
      },
      astro: {
        sunrise: current_forcast?.astro?.sunrise,
        sunset: current_forcast?.astro?.sunset
      }
    };
  } catch(err) {
    return Promise.reject(err);
  }
}
async function process_daily_weather(data) {
  try {
    const {forecastday} = data?.forecast;
    return forecastday.slice(1).map(day=>{
      const {date_epoch,hour} = day;
      return {
        date: new Date(date_epoch * 1000).getTime(),
        temp_c: Math.round(hour[0].temp_c),
        temp_f: Math.round(hour[0].temp_f),
        icon: process_icon(day?.day?.condition?.code)
      }
    });
  } catch(err) {
    return Promise.reject(err);
  }
}

async function fetch_weather(req,res) {
  try {
    // Getting Cache
    const get_cache_weather = await get_rd_data(rdkey_weather+req?.cookies?.weather_cache);
    if(get_cache_weather && !req.query.refresh) return res.json(get_cache_weather);
    // Getting Cache
    const {by,val,country_code} = req.query;//val for lat_lon=<lat>,<lon>
    const can_q_by = {ip:1,lat_lon:1,city:1,zip:1};
    if(!can_q_by[by]) return res.status(503).json({err:true,message:'Invalid query params'});
    if(by !== 'ip' && (!val || typeof val !== 'string')) return res.status(503).json({err:true,message:`missing ${by} value`});
    let query_by = val;
    const us_zip_regex = new RegExp(/^\d{5}(-{0,1}\d{4})?$/);
    if(by === 'zip' && !us_zip_regex.test(val)) {
      if(!country_code || typeof country_code !== 'string' || country_code.length > 2) return res.status(503).json({err:true,message:'Invalid country code'});
      const found_zipcode = await axios.get(`https://api.openweathermap.org/geo/1.0/zip`,{
        params: {
          zip:`${val},${country_code}`,
          appid:process.env.OPENWEATHERMAP_APIKEY
        }
      });
      const {lat,lon} = found_zipcode?.data;
      query_by = `${lat},${lon}`;
    } if(by === 'ip') {
      query_by = req.clientIp;
    }
    const res_weather = await axios.get('https://api.weatherapi.com/v1/forecast.json',{
      params: {
        q:by==='city'?query_by.toLocaleLowerCase():query_by,//query parameters
        days:8,
        aqi:'no',
        alerts:'yes',
        key:process.env.WEATHERAPI_APIKEY||''
      }
    });
    const found_location = await axios.get('https://nominatim.openstreetmap.org/reverse',{
      params: {
        lat: res_weather?.data?.location?.lat,
        lon: res_weather?.data?.location?.lon,
        format:'json',
        zoom:18,
        addressdetails:1
      }
    });
    const current_w = await process_current_weather(res_weather?.data || res_weather);
    const daily_w = await process_daily_weather(res_weather?.data || res_weather);
    const {address} = found_location?.data;
    const res_data = {
      _ip:req.clientIp,
      location:`${address?.town}, ${address?.state_district}, ${address?.state}, ${address?.postcode}, ${address?.country}`,
      current:current_w,
      daily:daily_w,
      alerts:res_weather?.data?.alerts?.alert
    }
    // Setting Cache
    const cache_id = shortid.generate();
    await set_rd_data(rdkey_weather+cache_id,res_data);
    res.cookie('weather_cache',cache_id,{ maxAge: 600000, expires: new Date(Date.now() + 600000) });
    // Setting Cache
    return res.json(res_data);
  } catch(err) {
    return res.status(503).json({err:true,message:err.message});
  }
}

module.exports = {fetch_weather};