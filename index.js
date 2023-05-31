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
// app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
app.use(cookie('super_secret',{
  // maxAge: 604800,//1 week
  // expire: 604800,//1 week
  name: 'weather_cache',
  httpOnly: false,//Change This Later
  sameSite: false,//Change This later
  secure: false,//process.env.NODE_ENV === 'production'
  path: '/'
}));
app.use(request_ip.mw());
app.use(express.static("public"));
app.use(express.json());
// All middlewares

app.use('/weather',weather_router);
// app.get('/',(req,res)=>{

// });
app.get('*',(req,res)=>{
  res.status(503).json({
    site:'Weather App',
    msg:'Site Under Construction 🚧',
    err:503
  });
});

app.listen(5000,err=>{
  if(err) throw err;
  console.log('=> SERVER STARTED @- 🌎:5000')
});