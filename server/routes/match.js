const router = require("express").Router();

module.exports = (db, dbQueries) => {

  // Create a new match for a group
  router.post("/:groupId", async (req, res) => {
    const { game_id, date, players } = req.body;
    const { groupId } = req.params;
    let match_id;

    try {
      //Step 1: Create a new match
      const match = await dbQueries.createMatch(game_id, date, db);
      if (match) {
        match_id = match.id;
        console.log(match_id);
      }

      // Step 2: Add match to group
      const matchToGroup = await dbQueries.addGroupMatch(groupId, match_id, db);

      if (matchToGroup) {
        console.log(matchToGroup);
      }

      // Step 3: Add players AND results to match
      for (const player of players) {
        const matchResults = await dbQueries.addMatchPlayers(match_id, player.id, player.is_winner, db);
        if (matchResults) {
          console.log(matchResults);
        }
      }

      res.status(200).send({
        success: true,
        message: "Match created",
        body: {
          game_id: game_id,
          date: date,
          players: players,
        }
      })
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Server Error",
      });
    }
  });

  // Get all matches for a group
  router.get("/:groupId", (req, res) => {
    const { groupId } = req.params;
    dbQueries
      .getMatchesByGroupId(groupId, db)
      .then((matches) => {
        if (matches) {
          res.status(200).send({
            success: true,
            message: "Matches found",
            matches: matches,
          });
        } else {
          res.status(400).send({
            success: false,
            message: "Matches not found",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });


// Delete a match for a group
router.delete("/:groupId/:matchId", async (req, res) => {
  const { groupId, matchId } = req.params;
  try {
    // Step 1: Delete player results
    await dbQueries.deletePlayerResultsByMatchId(matchId, db);

    // Step 2: Delete match from group
    const groupMatch = await dbQueries.deleteGroupMatchById(groupId, matchId, db);
    if (!groupMatch) {
      res.status(404).send({
        success: false,
        message: "Match not found in group"
      });
      return;
    }

    // Step 3: Delete match
    const match = await dbQueries.deleteMatchById(matchId, db);
    if (!match) {
      res.status(404).send({
        success: false,
        message: "Match not found"
      });
      return;
    }

    res.status(200).send({
      success: true,
      message: "Match deleted",
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
});


  return router;
};
