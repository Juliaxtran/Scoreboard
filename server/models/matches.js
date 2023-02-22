const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  playerList: {
    type: Array,
    required: true
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  winner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Match = mongoose.model('Match', MatchSchema);
