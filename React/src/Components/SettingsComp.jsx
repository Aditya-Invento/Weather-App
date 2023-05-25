import { useState } from "react"

function Metrics_Unit({type,settings,update_settings}) {
  const types = {
    dist: {
      title:'Dist Speed',
      vals:['kph','mph']
    },
    temp: {
      title:'Tempreture',
      vals:['f','c']
    },
    measure: {
      title:'Measurement',
      vals:['inch','mm']
    }
  }
  return (
    <div className="mtrix_ctrl_wpr">
      <p>{types[type].title}</p>
      <div title="Click me!" className="mtrix_ctrl" onClick={()=>update_settings(type,settings[type] === types[type].vals[0]?types[type].vals[1]:types[type].vals[0])}>
        <span className={settings[type] === types[type].vals[0] ? 'sel' : ''}>{types[type].vals[0].toLocaleUpperCase()}{types[type].vals[0]==='f'&&'°'}</span>
        <span className={settings[type] === types[type].vals[1]?'switch on':'switch'}><i className="fa-solid fa-toggle-off"></i></span>
        <span className={settings[type] === types[type].vals[1] ? 'sel' : ''}>{types[type].vals[1].toLocaleUpperCase()}{types[type].vals[1]==='c'&&'°'}</span>
      </div>
    </div>
  )
}

export default function Settings({toggle_settings,update_settings,settings,get_weather,loading}) {
  const [search_inp,setSearch_inp] = useState('');
  const [search_sett,setSearchSett] = useState(settings);

  function req_weather() {
    if(!loading) {
      const {search_by} = settings;
      if(search_by !== search_sett.search_by && search_by === 'auto') get_weather('?by=auto');
      if(search_by !== 'auto' && search_inp.length) {
        if(search_by === 'city') get_weather(`?by=city&val=${search_inp}`);
        if(search_by === 'zip') {
          const fragments = search_inp.split(',');
          if(fragments.length === 2) {
            const zip = fragments[0];
            const country = fragments[1].toLocaleUpperCase();
            if(country.length === 2 && zip.length) {
              get_weather(`?by=zip&val=${zip}&country_code=${country}`);
            }
          }
        }

      }
    }
  }

  return (
    <div className="settings animate__animated animate__fadeIn">
      <span onClick={toggle_settings} title="close" className="close_btn"><i className="fa-solid fa-xmark rotate_smooth"></i></span>
      <div className="search animate__animated animate__fadeInDown animate__delay-1s">
        <span><i className="fa-solid fa-magnifying-glass"></i></span>
        <input
          onChange={({target})=>setSearch_inp(target.value)}
          type="text"
          placeholder="Location by: city or zip-code?"
        />
      </div>
      <div className="search_supporters animate__animated animate__fadeInDown animate__delay-1s">
        <div className="search_supp">
          <input
            checked={settings?.search_by === 'auto'}
            onChange={()=>update_settings('search_by','auto')}
            name="search_by"
            type="radio"
          />
          <label>Auto Identify</label>
        </div>
        <div className="search_supp">
          <input
            checked={settings?.search_by === 'city'}
            onChange={()=>update_settings('search_by','city')}
            name="search_by"
            type="radio"
          />
          <label>City</label>
        </div>
        <div className="search_supp">
          <input
            checked={settings?.search_by === 'zip'}
            onChange={()=>update_settings('search_by','zip')}
            name="search_by"
            type="radio"
          />
          <label>Zip-Code</label>
        </div>
      </div>
      <button
        disabled={loading}
        style={loading?{cursor:'not-allowed',backgroundColor:'#adadad'}:{}}
        onClick={req_weather}
        className="animate__animated animate__fadeInDown animate__delay-1s"
      >
        <span>{loading?'Please wait...':'Submit'}</span>
        {!loading ? <span><i className="fa-solid fa-angle-right"></i></span>:<></>}
      </button>
      <div className="note animate__animated animate__fadeInDown animate__delay-1s">
        <p className="note_1">*Note:- Search by zip-code ( Outside US )</p>
        <p>&lt;zip-code&gt;,&lt;country-code&gt; | Ex: 11062,IN</p>
      </div>
      <div className="mtrix_controlers animate__animated animate__fadeInUp animate__delay-1s">
        {['temp','dist'].map((i,idx)=><Metrics_Unit
          key={idx}
          settings={settings}
          update_settings={update_settings}
          type={i}
        />)}
      </div>
      <div style={{marginTop:'20px'}} className="mtrix_controlers animate__animated animate__fadeInUp animate__delay-1s">
        <Metrics_Unit
          settings={settings}
          update_settings={update_settings}
          type='measure'
        />
      </div>
    </div>
  )
}
