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


//another route to delete game from group where you also delete the match
// router.delete("/:group_id/:game_id", async (req, res) => {
//     const { group_id, game_id } = req.params;
// let match_ids =[];

//     try {
    
//         const matches = await dbQueries.getMatchesByGameId(game_id, db);
//         if(matches){
//             match_ids = matches.map(match => match.id);
//         }
    

//         const groupMatchesDeleted = await dbQueries.deleteGroupMatchesByIds(group_id, match_ids, db);
        
//         if (!groupMatchesDeleted) {
//             res.status(404).send({
//                 success: false,
//                 message: "Matches not deleted for game"
//             });
//         }
//         console.log(matches)
// console.log('match_id',match_ids)
// console.log('game_id',game_id)


// const playerMatch =  await dbQueries.deletePlayerResultsByMatchId(match_ids, db);
// if (!playerMatch) {
//     res.status(404).send({
//         success: false,
//         message: "Player match not deleted for game"
//     });
// }

// const game = await dbQueries.deleteGameFromGroup(group_id, game_id, db);
// if (!game) {
//     res.status(404).send({
//         success: false,
//         message: "Game not deleted for group"
//     });
// }

 
//       res.status(200).send({
//         success: true,
//         message: "Match deleted",
//       });
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({
//         success: false,
//         message: "Server Error",
//       });
//     }
//   });
  
//Delete a game when there are no matches for that game
router.delete("/:group_id/:game_id/nomatches", async (req, res) => {
    const { group_id, game_id } = req.params;
    try {
      const matches = await dbQueries.getMatchesForGame(game_id, db);
      if (matches.length > 0) {
        return res.status(400).send({
          success: false,
          message: "Cannot delete game with associated matches.Please Delete the match first"
        });
      }
  
      const game = await dbQueries.deleteGameFromGroup(group_id, game_id, db);
      if (!game) {
        return res.status(404).send({
          success: false,
          message: "Game not deleted for group"
        });
      }
  
      console.log(game);
      return res.status(200).send({
        success: true,
        message: "Game deleted"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Server Error"
      });
    }
  });






// router.delete("/:group_id/:game_id", async (req, res) => {
//     const { group_id, game_id } = req.params;
//     try {

//         const match = await dbQueries.getMatchByGameId(game_id, db);
//             if (!match) {
//                 res.status(404).send({
//                     success: false,
//                     message: "Match not found for game"
//                 });    
    
//                 return;
//             }            
//             const match_id = match[0].id; 
//           console.log(match_id)
        
  
// //delete match from group based on game_id
//        const matchGame =  await dbQueries.deleteMatchByGameId(game_id, db);  
//        if (!matchGame) {
//         res.status(404).send({
//             success: false,
//             message: "Match not deleted  for game"
//         });    

//         return;
//     }  
//             await dbQueries.deleteGameFromGroup(group_id, game_id, db);
 


//             res.status(200).send({
//                 success: true,
//                 message: "Game deleted",
//             });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({
//             success: false,
//             message: "Server Error",
//         });
//     }
// });


  return router;
};




