const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

// Create the pilot Schema
const MechsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  classType: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Mechs = mongoose.model('mechs', MechsSchema);