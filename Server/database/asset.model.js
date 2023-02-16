const {Schema,model} = require('mongoose');
const shortid = require("shortid");
const asset_schema = new Schema({
  id: {
    type: String,
    default: shortid.generate,
    index: true
  },
  time: {//POS VALS = morning / afternoon / night
    typs:String,index: true
  },
  scene: {//POS VALS = clear_sky / clouds / rain / thunderstorm / snow / mist
    typs:String,index: true
  },
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