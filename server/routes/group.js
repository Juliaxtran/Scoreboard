
const router = require('express').Router();
const Group = require('../models/group');


// Player Routes

router.get('/', async (req, res) => {
  try {
    res.send('Group page')
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// const groupSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
//   games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
//   matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
// });

// Create a new group

router.post('/', async (req, res) => {
 const name = req.body.name;
 const player = req.body.player;

  const group = new Group({
    name: name,
    players: player
  })

  try {
    const newGroup = await group.save();
    res.status(201).json(newGroup);
  }
  catch (err) {
    res.status(400).json({ message: err.message });

  }


});

module.exports = router;