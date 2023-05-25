import Moment from 'moment';
import conditions from '../../Utils/conditions';

function ForcastDay({temp_unit,obj,req_url}) {
  return (
    <div className="forcast animate__animated animate__flipInX animate__delay-1s" title={obj?.condition?.icon === 1000 ? 'Clear Sky' : conditions[obj?.condition?.icon]}>
      <p>{obj.date!=='--'?Moment(new Date(obj.date)).format('dddd'):obj.date}</p>
      <div className="temp">
        <img src={req_url+`/icons/${obj?.condition?.icon}d.svg`} alt={obj?.condition?.icon === 1000 ? 'Clear Sky' : conditions[obj?.condition?.icon]} />
        <p>{obj['temp_'+temp_unit]}&deg;{temp_unit.toLocaleUpperCase()}</p>
      </div>
    </div>
  )
}

export default function ForcastComp({forcast_day,temp_unit,req_url}) {
  return (
    <div className="forcast_wpr">
      {forcast_day.length && forcast_day.map((i,idx)=><ForcastDay req_url={req_url} temp_unit={temp_unit} obj={i} key={idx} />)}
    </div>
  )
}
