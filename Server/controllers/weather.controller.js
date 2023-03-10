const { default: axios } = require("axios");
const shortid = require("shortid");
// Redis DB
const {get_rd_data,set_rd_data} = require('../database/redis_conn');
const rdkey_weather = 'weather_app | weather_data => ';//for caching weather data
const rdkey_user = 'weather_app | user_data => ';//for caching user settings
// Utils
const {process_current_weather,process_daily_weather} = require('../utils/weather');

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
    const {display_name} = found_location?.data;
    const res_data = {
      _ip:req.clientIp,
      location:display_name,
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