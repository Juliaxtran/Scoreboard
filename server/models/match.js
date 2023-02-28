const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  date: { type: Date, default: Date.now }
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
