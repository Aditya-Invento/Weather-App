import { createContext, useState } from "react";

export const WeatherStore = createContext();

export const WeatherStoreProvider = ({ children }) => {
  const [state,setState] = useState({
    req_url: 'http://localhost:5000',
    settings: {
      open: false,
      temp: 'c',//c / f
      dist: 'kph',//mph / kph
      measure: 'inch',//mm / inch
      search_by: 'auto',// auto / city / zip
      country_code: '',//NA
    },
    bg_img: '',
    curr_temp: {
      location: '--',
      _f:'--',
      _c:'--',
      title: "--",
    },
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
      icon: 100
    }),
    alerts: [],
  });
  return (
    <WeatherStore.Provider value={{state,setState}}>
      {children}
    </WeatherStore.Provider>
  )
}