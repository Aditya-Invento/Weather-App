import { useEffect, useState } from 'react';
import Moment from 'moment';

export default function TimePlaceComp({refresh_api,refreshing}) {
  const [time,setStime] = useState(Moment().format('h:mm A'));
  useEffect(()=>{
    const intervalId = setInterval(() => {
      setStime(Moment().format('hh:mm A'));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  },[]);

  return (
    <div className="time_reload animate__animated animate__fadeInUp animate__delay-1s">
      <p>{time}</p>
      <div title="Refresh Weather" onClick={refreshing?null:refresh_api}>
        <span><i className={`fa-solid fa-rotate-right ${refreshing?' rotate_anime':''}`}></i></span>
        <span>{refreshing?'Please Wait':'Refresh'}</span>
      </div>
    </div>
  )
}
