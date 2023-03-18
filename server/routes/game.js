const router = require('express').Router();



module.exports = (db, dbQueries) => {

 // User can add a game for group using groupId
    router.post("/add/:group_id", (req, res) => {
        const { group_id } = req.params;
        const { name, description } = req.body;
        dbQueries
            .addGameToGroup( name, description,group_id, db)
            .then((game) => {
                if (game) {
                    res.status(200).send({
                        success: true,
                        message: "Game added",
                        game: game,
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: "Game not added",
                        game: game,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

    //  User can see all games in the group

    router.get("/all/:groupId", (req, res) => {
        const { groupId } = req.params;
        dbQueries
            .getAllGamesByGroupId(groupId, db)
            .then((games) => {
                if (games) {
                    res.status(200).send({
                        success: true,
                        message: "Games found",
                        games: games,
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: "Games not found",
                        games: games,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });





  return router;
};




// Game Routes

// GET: All games => /game
// router.get('/', async (req, res) => {
//     try {
//         const games = await Game.find();
//         res.json(games);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
// );

// POST: Create a game => /game
// router.post('/', async (req, res) => {
//     const game = new Game({
//         name: req.body.name,
//         description: req.body.description,
//        numPlayers: req.body.numPlayers,
//     })
//     try {
//         const newGame = await game.save();
//         res.status(201).json(newGame);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }
// );

// GET: Find a specific a game from an id => /game/:id
// router.get('/:id', async (req, res) => {
//     try {
//         const game = await Game.findById(req.params.id);
//         if (!game) {
//             return res.status(404).json({ message: 'Cannot find game' });
//         }
//         res.json(game);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
// );

// PUT: Update a game => /game/:id
// router.put('/:id', async (req, res) => {
//     try {
//         const game = await Game.findById(req.params.id);
//         if (!game) {
//             return res.status(404).json({ message: 'Cannot find game' });
//         }
//         if (req.body.name != null) {
//             game.name = req.body.name;
//         }
//         if (req.body.description != null) {
//             game.description = req.body.description;
//         }
//         if (req.body.numPlayers != null) {
//             game.numPlayers = req.body.numPlayers;
//         }

//         const updatedGame = await game.save();
//         res.json(updatedGame);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// }
// );

// DELETE: Delete a game => /game/:id
// router.delete('/:id', async (req, res) => {
//     try {
//         const game = await Game.findById(req.params.id);
//         if (!game) {
//             return res.status(404).json({ message: 'Cannot find game' });
//         }
//         await game.remove();
//         res.json({ message: 'Deleted game' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// }
// );

// module.exports = router;