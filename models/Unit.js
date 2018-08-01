const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

// Create the pilot Schema
const UnitSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  affiliation: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: Object,
    required: true
  },
  damageTeam: {
    type: Object,
    required: true
  },
  tankTeam: {
    type: Object,
    required: true
  },
  supportTeam: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Units = mongoose.model('unit', UnitSchema);