const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

// Create the pilot Schema
const HeroSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  affiliation: {
    type: String,
    required: true
  },
  weapon: {
    type: String,
    required: true
  },
  damage: Number,
  health:  Number,
  mech: String,
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Hero = mongoose.model('hero', HeroSchema);