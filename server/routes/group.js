
const router = require('express').Router();

module.exports = (db, dbQueries) => {

  // Get Group for a player
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    dbQueries
      .getGroupByPlayerId(id, db)
      .then((group) => {
        if (group) {
          res.status(200).send({
            success: true,
            message: "Group found",
            group: group,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Group not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  // Create a new group for a player
  router.post("/create", (req, res) => {
    const {name, owner_id} = req.body;
    dbQueries
    .createGroup(name, owner_id, db).then((group) => {
      if (group) {
        res.status(200).send({
          success: true,
          message: "Group created",
          group: group,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Group not created",
          group:group,
        });
      }
    });
  });






  return router;
};





// Group Routes
//GET: All groups
// /group
// router.get('/', async (req, res) => {
//   try {

//     const groups = await Group.find();
//     res.json(groups);
//     res.send('Group page')
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// POST: Create a new group
// router.post('/', async (req, res) => {
//   const name = req.body.name;
//   const player = req.body.player;

//   const group = new Group({
//     name: name,
//     players: player
//   })

//   try {
//     const newGroup = await group.save();
//     res.status(201).json(newGroup);
//   }
//   catch (err) {
//     res.status(400).json({ message: err.message });

//   }

// });

// GET: A group specified by an id
// /group/:id
// router.get('/:id', async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).json({ message: 'Cannot find group' });
//     }
//     res.json(group);
//   }
//   catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


//it can be removed -> pat is thinking about smtn lol
// POST: add player to group
// /group/:id/player/:id ?
// router.post('/:id/player/:id', async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).json({ message: 'Cannot find group' });
//     }
//     if (req.body.player != null) {
//       group.players.push(req.body.player);
//     }
//     const updatedGroup = await group.save();
//     res.json(updatedGroup);
//   }
//   catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


//PUT: Update Group
// router.put('/:id', async (req, res) => {
//     try {
//       const group = await Group.findById(req.params.id);
//       if (!game) {
//           return res.status(404).json({ message: 'Cannot find game' });
//       }
//       if (req.body.name != null) {
//           group.name = req.body.name;
//       }
//       if (req.body.players != null) {
//           group.players = req.body.players;
//       }
//       if (req.body.games != null) {
//           group.games = req.body.games;
//       }
//       if (req.body.matches != null) {
//         group.matches = req.body.matches;
//     }
//       const updatedGame = await group.save();
//       res.json(updatedGame);
//   } catch (err) {
//       res.status(400).json({ message: err.message });
//   }
// }
// );

//DELETE: Delete group
// router.delete('/:id', async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.id);
//     if (!group) {
//       return res.status(404).json({ message: 'Cannot find group' });
//     }
//     await group.remove();
//     res.json({ message: 'Group deleted' });
//   }
//   catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// module.exports = router;