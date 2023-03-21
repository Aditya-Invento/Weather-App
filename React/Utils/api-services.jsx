import axios from "axios";

async function get_location() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, resolve);
    } else {
      console.log('lonely :(');
      resolve(false);
    }
  });
}
async function get_weather({req_url,setState,setPageLoad,refresh=false,setRefreshing=()=>{},more_query}) {
  try {
    if(refresh) {
      setRefreshing(true);
    }
    let req_query = '?by=ip';
    const position = await get_location();
    if(position?.coords?.latitude && position?.coords?.longitude) {
      const {latitude,longitude} = position.coords;
      req_query = `?by=lat_lon&val=${latitude},${longitude}`;
    }
    if(refresh && more_query && more_query !== '?by=auto') {
      req_query = more_query;
    }
    const res_weather = await axios.get(req_url+'/weather'+req_query+`&refresh=${refresh?1:0}`,{withCredentials: true});
    const {alerts,current,daily,location,_ip} = res_weather.data;
    setState(pre=>{
      return {
        ...pre,
        settings: {
          ...pre.settings,
          search_by: res_weather.data.settings.search_by
        },
        alerts:alerts,
        bg_img:current.condition.bg,
        curr_temp: {
          location:location,
          _f:current.temp_f.current,
          _c:current.temp_c.current,
          title:current.condition.title
        },
        curr_other_metrics: {
          high: {
            _f:current.temp_f.high,
            _c:current.temp_c.high
          },
          low: {
            _f:current.temp_f.low,
            _c:current.temp_c.low
          },
          feelslike: {
            _f:current.temp_f.feelslike,
            _c:current.temp_c.feelslike
          },
          precip: {
            mm:current.precip.mm,
            inch:current.precip.inch
          },
          wind: {
            kph:current.wind.kph,
            mph:current.wind.mph
          },
          uv:current.uv,
          is_day: current.is_day,
        },
        forcast_day: daily
      };
    });
    if(!refresh) {
      setPageLoad(true);
    }
    if(refresh) {
      setRefreshing(false);
    }
  } catch(err) {
    console.log(err?.response?.data?.msg || err?.message || 'Something Went Wrong.');
    // setPageAlert({msg:err?.response?.data?.msg || err?.message || 'Something Went Wrong.',type:'danger'})
  }
}

export default get_weather;