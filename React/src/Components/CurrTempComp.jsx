export default function CurrTempComp({toggle_settings,curr_temp,temp_unit}) {
  const {location,title} = curr_temp;

  return (
    <>
      <div className="curr_temp animate__animated animate__fadeInDown animate__delay-1s">
        <h1>{curr_temp['_'+temp_unit]}&deg;{temp_unit.toLocaleUpperCase()}</h1>
        <span onClick={toggle_settings} title="Open Settings" className="rotate_smooth"><i className="fa-solid fa-gear"></i></span>
      </div>
      <div className="tempDesc_place animate__animated animate__fadeInDown animate__delay-1s">
        <p>{title === 'Sunny'? 'Clear Sky' :title}</p>
        <span>{location}</span>
      </div>
    </>
  )
}
