function process_icon(code) {
  try {
    if(typeof code !== 'number' || isNaN(code)) return false;
    const rain_codes = [1072,1063,1150,1153,1168,1171,1180,1183,1186,1189,1192,1195,1198,1201,1240,1243,1246];//16
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
        condition: {
          icon: process_icon(day?.day?.condition?.code),
          title: day?.day?.condition?.text,
        },
      }
    });
  } catch(err) {
    return Promise.reject(err);
  }
}

module.exports = {process_current_weather,process_daily_weather};