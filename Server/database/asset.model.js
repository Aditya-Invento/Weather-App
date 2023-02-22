const {Schema,model} = require('mongoose');
const shortid = require("shortid");
const asset_schema = new Schema({
  id: {//weather_code + time suffix: d=day/n=night
    type: String,
    // default: shortid.generate,
    index: true
  },
  //POS VALS = day / night
  time: String,
  // POS VALS = rain / snow / sleet / clouds / thunder / mist / overcast / clear_sky
  weather: String,
  imgs: {//BACKGROUND IMAGES
    type: Array,
    default: []
  },
  sounds: {//BACKGROUND LOFI SOUNDS
    type: Array,
    default: []
  }
});
const asset_model = new model('assets',asset_schema);
module.exports = asset_model;