const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
});

module.exports = Game = mongoose.model('Game', GameSchema);