
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
//Register Route
router.post('/register', async (req, res) => {
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


//Update a player specified by an id => /player/:id
router.put('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Cannot find player' });
    }
    if (req.body.name != null) {
      player.name = req.body.name;
    }
    if (req.body.email != null) {
      player.email = req.body.email;
    }
    if (req.body.password != null) {
      player.password = req.body.password;
    }


    const updatedPlayer = await player.save();
    res.json(updatedPlayer);
  } catch (err) {
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
e});

//Authentication routes
//Login Route
router.post('/login', async (req, res) => {
  const player = await Player.findOne({ email: req.body.email });
  if (!player) {
  
    return res.status(400).send('Email or password is wrong');
  }
  if (req.body.password != player.password) {
    return res.status(400).send('Email or password is wrong');
  } 
  
     res.cookie('sessionId', req.session.id, {
      httpOnly: true,
      maxAge: 3600000 // Cookie expires in 1 hour
    });
  res.send('Logged in');
});


//Logout Route
router.post('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('sessionId');
  res.send('Logged out');
});



module.exports = router;