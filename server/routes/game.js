const router = require('express').Router();
const Game = require('../models/game');

// Game Routes

// GET: All games => /game
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// POST: Create a game => /game
router.post('/', async (req, res) => {
    const game = new Game({
        name: req.body.name,
        description: req.body.description,
       numPlayers: req.body.numPlayers,
    })
    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
);

// GET: Find a specific a game from an id => /game/:id
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Cannot find game' });
        }
        res.json(game);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

// PUT: Update a game => /game/:id
router.put('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Cannot find game' });
        }
        if (req.body.name != null) {
            game.name = req.body.name;
        }
        if (req.body.description != null) {
            game.description = req.body.description;
        }
        if (req.body.numPlayers != null) {
            game.numPlayers = req.body.numPlayers;
        }
     
        const updatedGame = await game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
);

// DELETE: Delete a game => /game/:id
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Cannot find game' });
        }
        await game.remove();
        res.json({ message: 'Deleted game' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
);

module.exports = router;