function CurrentMetrics({title,val,unit,other,uv}) {
  return (
    <div className="curr_other_metc animate__animated animate__flipInX animate__delay-1s">
      <p>{title} {other&&!uv&&<span style={{fontSize:'12px'}}>"{unit}</span>}</p>
      {other?
        <h3>{val}</h3>:
        <h3>{val}&deg;{unit.toLocaleUpperCase()}</h3>
      }
    </div>
  )
}

export default function CurrOthMetxComp({curr_other_metrics,temp_unit,dist_unit,measure_unit}) {
  const {high,low,feelslike,precip,wind,uv,is_day} = curr_other_metrics;
  return (
    <>
      <div className="curr_other_metc_wpr">
        <CurrentMetrics title='Feels Like' val={feelslike['_'+temp_unit]} unit={temp_unit} />
        <CurrentMetrics title='High' val={high['_'+temp_unit]} unit={temp_unit} />
        <CurrentMetrics title='Low' val={low['_'+temp_unit]} unit={temp_unit} />
      </div>
      <div className="curr_other_metc_wpr">
        <CurrentMetrics title='UV Index' val={Boolean(is_day)?uv:'0'} other={true} unit='' uv={true} />
        <CurrentMetrics title='Wind' val={wind[dist_unit]} other={true} unit={dist_unit} />
        <CurrentMetrics title='Precip' val={precip[measure_unit]} other={true} unit={measure_unit} />
      </div>
    </>
  )
}
