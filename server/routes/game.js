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

    router.get("/stats/table/:groupId", (req, res) => {
        const { groupId  } = req.params;
        console.log('Group Id', groupId);
        dbQueries
            .gameStatsTable(groupId, db)
            .then((games) => {
                if (games) {
                    console.log('Game table stats being called')
                    console.log(games)
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




