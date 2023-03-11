import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WeatherStoreProvider } from './Context/Store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <WeatherStoreProvider>
    <App />
  </WeatherStoreProvider>
  // </React.StrictMode>,
)
