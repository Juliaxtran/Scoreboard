const router = require("express").Router();

module.exports = (db, dbQueries) => {
router.post("/:groupId", async (req, res) => {
const { game_id, date, players } = req.body;
const { groupId } = req.params;
let match_id;

try {
  const match = await dbQueries.createMatch(game_id, date, db);
  if (match) {
    match_id = match.id;
    console.log(match_id);

    // res.status(200).send({
    //   success: true,
    //   message: "Match created",
    //   match: match,
    // });
  } else {
    res.status(400).send({
      success: false,
      message: "Match not created",
      match: match,
    });
  }
  //Part 2 of creating a match
const matchToGroup = await dbQueries.addGroupMatch( groupId, match_id,db);

if(matchToGroup){
  console.log(matchToGroup);
    // res.status(200).send({
    //     success: true,
    //     message: "Match added to group",
    //     match : matchToGroup,
    // });
}
// Part 3 Add players to match


for (const player of players ) {
 const matchResults = await dbQueries.addMatchPlayers(match_id, player.id, player.is_winner, player.is_loser, db);
  if(matchResults){
    console.log(matchResults);
    // res.status(200).send({
    //   success: true,
    //   message: "Match created",
    //   match: matchResults,});
  }
}



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