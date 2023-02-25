
const router = require('express').Router();
const Group = require('../models/group');


// Group Routes
//GET: All groups 
// /group
router.get('/', async (req, res) => {
  try {

    const groups = await Group.find();
    res.json(groups);
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

// POST: Create a new group
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

// GET: A group specified by an id
// /group/:id
router.get('/:id', async (req, res) => {
 try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ message: 'Cannot find group' });
    }
    res.json(group);
 }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST: add player to group
// /group/:id/player/:id ? 

//PUT: Update Group


//DELETE: Delete group



module.exports = router;