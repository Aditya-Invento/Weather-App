export default function Settings({toggle_settings}) {
  return (
    <div className="settings animate__animated animate__fadeIn">
      <span onClick={toggle_settings} title="close" className="close_btn"><i className="fa-solid fa-xmark rotate_smooth"></i></span>
      <div className="search animate__animated animate__fadeInDown animate__delay-1s">
        <span><i className="fa-solid fa-magnifying-glass"></i></span>
        <input type="text" placeholder="Location by: city or zip-code?" />
      </div>
      <div className="search_supporters animate__animated animate__fadeInDown animate__delay-1s">
        <div className="search_supp">
          <input name="search_by" type="radio" />
          <label>Auto Identify</label>
        </div>
        <div className="search_supp">
          <input name="search_by" type="radio" />
          <label>City</label>
        </div>
        <div className="search_supp">
          <input name="search_by" type="radio" />
          <label>Zip-Code</label>
        </div>
      </div>
      <button className="animate__animated animate__fadeInDown animate__delay-1s">
        <span>Submit</span>
        <span><i className="fa-solid fa-angle-right"></i></span>
      </button>
      <div className="note animate__animated animate__fadeInDown animate__delay-1s">
        <p className="note_1">*Note:- Search by zip-code ( Outside US )</p>
        <p>&lt;zip-code&gt;,&lt;country-code&gt; | Ex: 11062,IN</p>
      </div>
      <div className="mtrix_controlers animate__animated animate__fadeInUp animate__delay-1s">
        <div className="mtrix_ctrl_wpr">
          <p>Tempreture</p>
          <div className="mtrix_ctrl">
            <span>F&deg;</span>
            <span className="switch on"><i className="fa-solid fa-toggle-off"></i></span>
            <span className="sel">C&deg;</span>
          </div>
        </div>
        <div className="mtrix_ctrl_wpr">
          <p>Distance</p>
          <div className="mtrix_ctrl">
            <span className="sel">mi</span>
            <span className="switch"><i className="fa-solid fa-toggle-off"></i></span>
            <span>km</span>
          </div>
        </div>
      </div>
      <div style={{marginTop:'20px'}} className="mtrix_controlers animate__animated animate__fadeInUp animate__delay-1s">
        <div className="mtrix_ctrl_wpr">
          <p>Measurement</p>
          <div className="mtrix_ctrl">
            <span>inch</span>
            <span className="switch on"><i className="fa-solid fa-toggle-off"></i></span>
            <span className="sel">mm</span>
          </div>
        </div>
      </div>
    </div>
  )
}
