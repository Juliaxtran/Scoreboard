
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

  // Add a player to a group by group id

  router.post("/add", (req, res) => {
    // why does group_id not work when its in the params?
    const {group_id, email} = req.body;
    dbQueries
     .getUserByEmail(email, db)
       .then((player) => {
          if (player) {
            dbQueries
            .addPlayerToGroup(group_id, player.id, db)
            .then((group) => {
              if (group) {
                res.status(200).send({
                  success: true,
                  message: "Player added to group",
                  group: group,
                });
              } else {
                res.status(400).send({
                  success: false,
                  message: "Player not added to group, player needs to sign up first",
                });
              }
            });
          } else {
            res.status(400).send({
              success: false,
              message: "Player not found",
            });
          }
       })

  });


  // Find all players for one group by group id
  router.get("/players/:id", (req, res) => {
    const { id } = req.params;
    dbQueries
      .getPlayersByGroupId(id, db)
      .then((players) => {
        if (players) {
          res.status(200).send({
            success: true,
            message: "Players found",
            players: players,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Players not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });









  return router;
};



