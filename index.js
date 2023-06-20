require('dotenv').config();
const express = require('express');
const app = express();
const request_ip = require("request-ip");
const cookie = require('cookie-parser');
const cors = require('cors');

// CONNECTING TO DB
require('./database/redis_conn');

// All Routers
const weather_router = require('./router/weather.router');
// All Routers

// All middlewares
app.use(cookie('super_secret', {
  name: 'weather_cache',
  httpOnly: false,
  sameSite: false,
  secure: false,
  path: '/'
}));
app.use(request_ip.mw());
// Catch-all route for all other requests
app.get('*', (req, res, next) => {
  res.status(503).json({
    site: 'Weather App',
    msg: 'Site Under Construction 🚧',
    err: 503
  });
});
app.use(express.static("public"));
app.use(express.json());
// All middlewares

app.use('/weather', weather_router);

app.listen(process.env.PORT || 3000, err => {
  if (err) throw err;
  console.log(`=> SERVER STARTED @- 🌎:${process.env.PORT || 3000}`);
});
