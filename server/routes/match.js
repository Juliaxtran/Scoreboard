const router = require('express').Router();
const Match = require('../models/match'); 

// GET: All match => /match
router.get('/', async (req, res) => {
    try {
        const matches = await Match.find();
        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// POST: Create a match => /match
router.post('/', async (req, res) => {
    const match = new Match({
        players: req.body.players,
        game: req.body.game,
        winners: req.body.winners,
        group: req.body.group,
        date: req.body.date
    })
    try {
      const newMatch = await match.save();
      res.status(201).json(newMatch);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  
  });

// GET: Find a specific a match from an id => /match/:id
router.get('/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Cannot find match' });
        }
        res.json(match);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT: Update a match => /match/:id 
router.put('/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Cannot find match' });
        }
        if (req.body.players != null) {
            match.players = req.body.players;
        }
        if (req.body.game != null) {
            match.game = req.body.game;
        }
        if (req.body.winners != null) {
            match.winners = req.body.winners;
        }
        if (req.body.group != null) {
            match.group = req.body.group;
        }
        if (req.body.date != null) {
            match.date = req.body.date;
        }
        const updatedMatch = await match.save();
        res.json(updatedMatch);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a match => /match/:id 
router.delete('/:id', async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Cannot find match' });
        }
        await match.remove();
        res.json({ message: 'Deleted match' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);


module.exports = router;