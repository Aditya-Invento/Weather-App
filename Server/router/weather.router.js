const {fetch_weather} = require('../controllers/weather.controller');

// I prefer this method
module.exports = require('express')
.Router()
.get('/',fetch_weather);

// But below are other ways to achive the same thing

// Method #2
// const express = require('express');
// const Router = express.Router();
// Router.get();
// Router.post();
// module.exports = Router;

// Method #3
// const Router = require('express').Router().get().post();
// module.exports = Router;