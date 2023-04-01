export default {
  loading: true,
  refresh: false,
  req_url: 'http://localhost:5000',
  settings: {
    open: false,
    temp: 'c',//c / f
    dist: 'kph',//mph / kph
    measure: 'inch',//mm / inch
    search_by: 'auto',// auto / city / zip
    query_param: ''
  },
  bg_img: '/ClearSky.png',
  // After
  curr_temp: {
    _f:'--',
    _c:'--'
  },
  title: "--",
  location: '--',
  curr_other_metrics: {
    high: {
      _f:'--',
      _c:'--'
    },
    low: {
      _f:'--',
      _c:'--'
    },
    feelslike: {
      _f:'--',
      _c:'--'
    },
    precip: {
      mm: '--',
      inch: '--'
    },
    wind: {
      kph: '--',
      mph: '--'
    },
    uv: '--',
    is_day: null,
  },
  forcast_day: new Array(2).fill({
    date: '--',
    temp_c: '--',
    temp_f: '--',
    condition: {
      icon: '--',
      title: '--'
    }
  }),
  alerts: [],
}