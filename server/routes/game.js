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



//another route to delete game from group where you also delete the match
router.delete("/:group_id/:game_id", async (req, res) => {
    const { group_id, game_id } = req.params;
    try {

        const match = await dbQueries.getMatchByGameId(game_id, db);
            if (!match) {
                res.status(404).send({
                    success: false,
                    message: "Match not found for game"
                });    
    
                return;
            }            
            const match_id = match[0].id; 
          console.log(match_id)
        
  
//delete match from group based on game_id
       const matchGame =  dbQueries.deleteMatchByGameId(game_id, db);  
       if (!matchGame) {
        res.status(404).send({
            success: false,
            message: "Match not deleted  for game"
        });    

        return;
    }  

            await dbQueries.deleteGameFromGroup(group_id, game_id, db);
 


            res.status(200).send({
                success: true,
                message: "Game deleted",
            });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server Error",
        });
    }
});

// Delete a match for a group
// router.delete("/:group_id/:game_id", async (req, res) => {
//     const { group_id, game_id } = req.params;
//     try {


//     // Step 1: Get match_id for game_id
//     const match = await dbQueries.getMatchByGameId(game_id, db);
//     if (!match) {
//         res.status(404).send({
//             success: false,
//             message: "Match not found for game"
//         });
//         return;
//     }
//     const match_id = match[0].id;
// console.log('match',match[0].id)
//     // Step 2: Delete player results
//      await   dbQueries.deletePlayerResultsByMatchId(match_id, db);

//      // Step 2: Delete match from group based on gameID
//     const deleteGameMatch = await dbQueries.deleteMatchByGameId(game_id, db);
  
//      if (!deleteGameMatch) {
//         res.status(404).send({
//           success: false,
//           message: "Match not found in group"
//         });
//         return;
//       }
  

//       // Step 3: Delete match from group based on gameID
//       const gameMatch = await dbQueries.deleteGameFromGroup(group_id, game_id, db);
//       if (!gameMatch) {
//         res.status(404).send({
//           success: false,
//           message: "Game not found in Match and Group"
//         });
//         return;
//       }
  
     
//       res.status(200).send({
//         success: true,
//         message: "Game deleted",
//       });
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         success: false,
//         message: "Server Error",
//       });
//     }
//   });
  




    //  User can see all games in a group that has been played
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


    // User can see most win and most loses in a game for a group

    router.get("/stats/:groupId", (req, res) => {
        const { groupId } = req.params;
        dbQueries
            .getGameStats(groupId, db)
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

    //  Win lose ratio for each game for each person in a group

    router.get("/stats/table/:groupId", (req, res) => {
        const { groupId  } = req.params;
        dbQueries
            .gameStatsTable(groupId, db)
            .then((games) => {
                if (games) {
                    res.status(200).send({
                        success: true,
                        message: "Stats found",
                        games: games,
                    });
                } else {
                    res.status(400).send({
                        success: false,
                        message: "No stats found",
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




