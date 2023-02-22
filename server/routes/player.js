
const router = require('express').Router();
const Player = require('../models/player');

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

module.exports = router;