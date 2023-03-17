
const router = require('express').Router();

module.exports = (db, dbQueries) => {

  // Get Group for a player once logged in
  router.get("/", (req, res) => {
    // player id is stored in session
    const player_id = req.session.player && req.session.player.id;
    dbQueries
      .getGroupByPlayerId(player_id, db)
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

  router.post("/create", (req, res) => {
    const { name, owner_id } = req.body;
    console.log("Create group", "name", name, "owner_id", owner_id);
    dbQueries.createGroup(name, owner_id, db)
      .then((group) => {
        if (group) {
          dbQueries.addPlayerToGroup(group.id, owner_id, db)
            .then((result) => {
              if (result) {
                res.status(200).send({
                  success: true,
                  message: "Group created",
                  group: group,
                });
              } else {
                res.status(400).send({
                  success: false,
                  message: "Group not created",
                  group: group,
                });
              }
            });
        } else {
          res.status(400).send({
            success: false,
            message: "Group not created",
            group: group,
          });
        }
      });
  });

  // Add a player to a group by group id

  router.post("/add/:group_id", (req, res) => {
    // why does group_id not work when its in the params?
    const { email} = req.body;
    const { group_id } = req.params;

    dbQueries
     .getUserByEmail(email, db)
       .then((player) => {
          if (player) {
            console.log('player info',player)
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
  router.get("/players/:group_id", (req, res) => {
    const { group_id } = req.params;
    dbQueries
      .getPlayersByGroupId(group_id , db)
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



