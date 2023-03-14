const router = require("express").Router();

module.exports = (db, dbQueries) => {
  router.post("/", (req, res) => {
    const { game_id, date } = req.body;
    let match_id;

    dbQueries.createMatch(game_id, date, db)
    .then((match) => {
      if (match) {
        match_id = match.id;
        console.log(match_id);

        res.status(200).send({
          success: true,
          message: "Match created",
          match: match,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Match not created",
          match: match,
        });
      }
    })
  });


  return router;
};
