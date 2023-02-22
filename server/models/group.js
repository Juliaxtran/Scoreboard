const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
