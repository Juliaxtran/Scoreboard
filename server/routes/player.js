
const router = require('express').Router();
const Player = require('../models/player');
const Group = require('../models/group');


// Player Routes
router.get('/', async (req, res) => {
  try {
    res.send('Players page')
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Create a new player
router.post('/', async (req, res) => {
  const player = new Player({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    group: req.body.group
  })

  try {
    const newPlayer = await player.save();
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });

  }

});


// Connect player to group
router.post('/:id/connect', async (req, res) => {
  const groupId = req.body.groupId;

  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Cannot find player' });
    }

    const group = await Group.findByIdAndUpdate(groupId, { $push: { players: player._id } });
    if (!group) {
      return res.status(404).json({ message: 'Cannot find group' });
    }

    player.group = group._id;
    const updatedPlayer = await player.save();

    res.json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//GET: A player specified by an id => /player/:id
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Cannot find player' });
    }
    res.json(player);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});


//Delete a player specified by an id => /player/:id
router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Cannot find player' });
    }
    await player.remove();
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;