import axios from 'axios';

async function get_location() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) navigator.geolocation.getCurrentPosition(resolve, resolve);
    else {
      console.log('lonely :(');
      resolve(false);
    }
  });
}

export default async ({
  req_url,setData,
  toggle_load,cus_query
})=> {
  try {
    if(cus_query) toggle_load(true);
    let req_query = '?by=ip';
    // Getting Geo Location 
    const position = await get_location();
    if(position?.coords?.latitude && position?.coords?.longitude) req_query = `?by=lat_lon&val=${position.coords.latitude},${position.coords.longitude}`;
    // If Custom Query
    if(cus_query && (cus_query !== '?by=auto')) req_query = cus_query;
    // Requesting Api
    const res_weather = await axios.get(req_url+'/weather'+req_query,{withCredentials: true});
    const {alerts,current,daily,location,_ip} = res_weather.data;
    setData({
      alerts,location,forcast_day: daily,
      bg_img: current.condition.bg,
      curr_temp: {
        _f:current.temp_f.current,
        _c:current.temp_c.current
      },
      title: current.condition.title,
      curr_other_metrics: {
        high: {_f:current.temp_f.high,_c:current.temp_c.high},
        low: {_f:current.temp_f.low,_c:current.temp_c.low},
        feelslike: {_f:current.temp_f.feelslike,_c:current.temp_c.feelslike},
        precip: {mm:current.precip.mm,inch:current.precip.inch},
        wind: {kph:current.wind.kph,mph:current.wind.mph},
        uv:current.uv,is_day: current.is_day,
      }
    });
    if(cus_query) toggle_load(true);
    else toggle_load();
  } catch(err) {
    if(cus_query) toggle_load(true);
    else toggle_load();
    console.log(err?.response?.data?.msg || err?.message || 'Something Went Wrong.');
  }
}