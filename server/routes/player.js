
const router = require('express').Router();
const Player = require('../models/player');


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

module.exports = router;