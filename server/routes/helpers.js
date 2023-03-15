
const getUserByEmail = function (email, db) {
  const queryStringEmail = `SELECT *
  FROM players
  WHERE email = $1`
  const values = [email];
  return db
    .query(queryStringEmail, values)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log("Email does not exist");
        return "No email found";
      } else {
        return result.rows[0];
      }

    })
    .catch((err) => {
      console.log(err.message);
    });
}

// Group Queries

const getGroupByPlayerId = function (id, db) {
  const queryString = `select * from groups_players where player_id = $1;`
  const values = [id];
  return db
    .query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log("No group found");
        return "No group found";
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const createGroup = function (name, owner_id, db) {
  const queryString =  `INSERT INTO groups (name, owner_id) VALUES ($1, $2) RETURNING *;`

  const values = [name, owner_id];
  return db
  .query(queryString, values)
  .then((result) => {
    if (result.rows.length === 0) {
      console.log("Group not created");
      return "Group not created";
    } else {
      return result.rows[0];
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const addPlayerToGroup = function (group_id, player_id, db) {
  const queryString = `INSERT INTO groups_players (group_id, player_id) VALUES ($1, $2) RETURNING *;`
  const values = [group_id, player_id];
  return db
  .query(queryString, values)
  .then((result) => {
    if (result.rows.length === 0) {
      console.log("Player not added to group");
      return "Player not added to group";
    } else {
      return result.rows[0];
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};


 const getPlayersByGroupId = function (group_id, db) {
  const queryString = `SELECT p.name, p.id
  FROM Groups_Players gp
  JOIN Players p ON gp.player_id = p.id
  WHERE gp.group_id = $1;`
  const values = [group_id];
  return db
   .query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log("No players found");
        return "No players found";
      } else {
        return result.rows;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Game helpers
const addGameToGroup = function (name, description, group_id, db) {
  const queryString = `INSERT INTO games (name, description, group_id) VALUES ($1, $2, $3) RETURNING *;`
  const values = [name, description, group_id];
  return db
  .query(queryString, values)
  .then((result) => {
    if (result.rows.length === 0) {
      console.log("Game not added to group");
      return "Game not added to group";
    } else {
      return result.rows[0];
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getAllGamesByGroupId = function (group_id, db) {
  const queryString = `SELECT *
  FROM Games
  WHERE group_id = $1;`
  const values = [group_id];
  return db
  .query(queryString, values)
  .then((result) => {
    if (result.rows.length === 0) {
      console.log("No games found");
      return "No games found";
    } else {
      return result.rows;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

// Matches queries
const createMatch = function (game_id, date, db) {
  const queryString = `INSERT INTO Matches (game_id, date) VALUES ($1, $2) RETURNING *;`;
  const values = [game_id, date];
  return db
    .query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log("Match not created");
        return null;
      } else {
          console.log("Match created");
          return result.rows[0];
      }
      })
      .catch((err) => {
          console.log(err.message);
          return null;
      });
  };


  const addGroupMatch = function (group_id, match_id, db) {
    const queryString = `INSERT INTO Groups_Matches (group_id, match_id) VALUES ($1, $2) RETURNING *;`;
    const values = [group_id, match_id];
    return db
      .query(queryString, values)
      .then((result) => {
        if (result.rows.length === 0) {
          console.log("Group match not added");
          return null;
        } else {
          return result.rows[0];
        }
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
  };

  const addMatchPlayers = function (match_id, player_ids, is_winner, is_loser, db) {
    const queryString =
      "INSERT INTO Matches_Players (match_id, player_id, is_winner, is_loser) VALUES ($1, $2, $3, $4)";
    const values = [match_id, player_ids, is_winner, is_loser];


    return db
      .query(queryString, values)
      .then((result) => {
        console.log(`${result.rowCount} rows inserted`);
        return result;
      })
      .catch((err) => {
        console.log(err.message);
        return null;
      });
  };





module.exports = {
  getUserByEmail,
  getGroupByPlayerId,
  createGroup,
  addPlayerToGroup,
  getPlayersByGroupId,
  addGameToGroup,
  getAllGamesByGroupId,
  createMatch,
  addGroupMatch,
  addMatchPlayers
}