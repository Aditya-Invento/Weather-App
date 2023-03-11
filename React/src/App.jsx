import { WeatherStore } from './Context/Store';
import { useContext, useEffect, useState } from 'react';
import SettingsComp from './Components/SettingsComp';
import CurrTempComp from './Components/CurrTempComp';
import CurrOthMetxComp from './Components/CurrOthMetxComp';
import ForcastComp from './Components/ForcastComp';
import TimeReloadComp from './Components/TimeReloadComp';

import get_weather from '../Utils/api-services';

function App() {
  const [pageLoad,setPageLoad] = useState(false);
  const [refreshing,setRefreshing] = useState(false);
  const {state,setState} = useContext(WeatherStore);
  const {
    req_url,settings,bg_img,
    curr_temp,curr_other_metrics,
    forcast_day,alerts
  } = state;

  const update_settings = (what,to)=> {
    const can_update = {
      open:1,//true / false
      country_code: 1,//NA / <num>
      temp: 1,//c / f
      dist: 1,//mph / kph
      measure: 1,//mm / inch
      search_by: 1// auto / city / zip
    }
    if(can_update[what]) {
      setState(pre=>{
        return {...pre,settings:{...pre.settings,[what]:to}}
      });
    }
  }

  useEffect(()=>{
    if(!pageLoad) {
      get_weather({req_url,setState,setPageLoad});
    }
  },[pageLoad]);
  useEffect(()=>{
    const intervalId = setInterval(() => {
      get_weather({req_url,setState:setState,refresh:true,setRefreshing});
    }, 600000);
    return () => {
      clearInterval(intervalId);
    };
  },[]);


  return (
    <div id="app_main">
      {pageLoad ? <>
        <main style={{backgroundImage:`linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%), url('${req_url}/bg_imgs/${bg_img}.png')`}} className="animate__animated animate__zoomIn">
          {settings.open && <SettingsComp toggle_settings={()=>update_settings('open',!settings.open)} update_settings={update_settings} settings={settings} />}
          <CurrTempComp
            temp_unit={settings.temp}
            curr_temp={curr_temp}
            toggle_settings={()=>update_settings('open',!settings.open)}
          />
          <CurrOthMetxComp
            temp_unit={settings.temp}
            dist_unit={settings.dist}
            measure_unit={settings.measure}
            curr_other_metrics={curr_other_metrics}
          />
          <ForcastComp
            req_url={req_url}
            temp_unit={settings.temp}
            forcast_day={forcast_day}
          />
          <TimeReloadComp refreshing={refreshing} refresh_api={()=>get_weather({req_url,setState:setState,refresh:true,setRefreshing})} />
        </main>
        <footer style={{marginTop:'30px'}} className='animate__animated animate__fadeInUp'>
          <p style={{fontSize:'20px',fontWeight:'600'}}>Made With <i className="fa-solid fa-heart"></i> By <a target="_blank" href="https://github.com/Aditya-Invento/">Aditya Burmam</a></p>
        </footer>
      </> : <div className='loader'>
          <div className="loading"></div>
          <p style={{fontSize:'20px',fontWeight:'600',marginTop:'30px',textAlign:'center'}}>Loading...</p>
        </div>}
    </div>
  )
}

export default App
