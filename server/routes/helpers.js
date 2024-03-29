// Login and register Queries
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

const getGroupByPlayerId = function (player_id, db) {
  const queryString = `SELECT g.*, p.name AS owner_name
  FROM Groups g
  JOIN Players p ON g.owner_id = p.id
  JOIN Groups_Players gp ON g.id = gp.group_id
  WHERE gp.player_id = $1;
  `;
  const values = [player_id];
  return db
    .query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        return [];
      } else {
        return result.rows;
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
  const queryString = `SELECT p.name, p.id, p.lastName
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

// leaderboard for group

const getLeaderBoardByGroupId = function (group_id, db) {
  const queryString = `SELECT
  mp.player_id as id,
  p.name AS name,
  COUNT(mp.is_winner) FILTER (WHERE mp.is_winner) AS total_wins,
  COUNT(mp.is_winner) AS total_matches,
  COUNT(mp.is_winner) FILTER (WHERE mp.is_winner) * 100.0 / COUNT(mp.is_winner) AS win_ratio
FROM
  Groups g
  JOIN Groups_Matches gm ON g.id = gm.group_id
  JOIN Matches_Players mp ON gm.match_id = mp.match_id
  JOIN Players p ON mp.player_id = p.id
WHERE
  g.id = $1
GROUP BY
  mp.player_id, p.name
ORDER BY
  win_ratio DESC;`
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
      return [];
    } else {
      return result.rows;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const getGameStats  = function (group_id, db) {
  const queryString = `select games.name as game, games.id as game_id, games.description as description,
  players.name as player,
  count(CASE WHEN matches_players.is_winner THEN 1 END) as wins,
     (select count(*)) - count(CASE WHEN matches_players.is_winner THEN 1 END) as losses
 from games
 join groups on games.group_id = groups.id
 join matches on games.id = matches.game_id
 join matches_players on matches.id = matches_players.match_id
 join players on matches_players.player_id = players.id
 where groups.id = $1
 group by game, player, games.id , description
 order by wins desc
 ;`
  const values = [group_id];
  return db
  .query(queryString, values)
  .then((result) => {
    if (result.rows.length === 0) {
      console.log("No games found");
      return [];
    } else {
      return result.rows;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

const gameStatsTable = function (group_id, db) {
  const queryString = `SELECT gm.group_id, g.name AS game_name, p.id, p.name,
  COUNT(CASE WHEN mp.is_winner = TRUE THEN 1 END) AS total_wins,
  COUNT(CASE WHEN mp.is_winner = FALSE THEN 1 END) AS total_losses
FROM groups_matches gm
JOIN matches m ON m.id = gm.match_id
JOIN games g ON g.id = m.game_id
JOIN matches_players mp ON mp.match_id = m.id
JOIN players p ON p.id = mp.player_id
WHERE gm.group_id = $1
GROUP BY gm.group_id, g.id, p.id, p.name
ORDER BY gm.group_id, g.id, total_wins DESC, total_losses DESC;`
  const values = [group_id];
  return db
  .query(queryString, values)
  .then((result) => {
    if (result.rows.length === 0) {
      console.log("No games statsTable");
      return [];
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

  const addMatchPlayers = function (match_id, player_ids, is_winner, db) {
    const queryString =
      "INSERT INTO Matches_Players (match_id, player_id, is_winner) VALUES ($1, $2, $3)";
    const values = [match_id, player_ids, is_winner];


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

  const getMatchesByGroupId = function (group_id, db) {
    const queryString = `SELECT m.id AS match_id, g2.id AS group_id, g2.name AS group_name, g.name AS game_name, m.date AS played_on, string_agg(p.name, ', ' ORDER BY mp.is_winner DESC) AS player_names, string_agg(CASE WHEN mp.is_winner THEN p.name END, ', ') AS winners
    FROM Matches m
    JOIN Games g ON m.game_id = g.id
    JOIN Groups g2 ON g2.id = g.group_id AND g2.id = $1
    JOIN Matches_Players mp ON m.id = mp.match_id
    JOIN Players p ON mp.player_id = p.id
    GROUP BY m.id, g.name, played_on, g2.id
    ORDER BY m.date DESC;`
    const values = [group_id];
    return db
    .query(queryString, values)
    .then((result) => {
      if (result.rows.length === 0) {
        console.log("No matches found");
        return [];
      } else {
        return result.rows;
      }
    })
    .catch((err) => {
      console.log(err.message);
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
  addMatchPlayers,
  getMatchesByGroupId,
  getLeaderBoardByGroupId,
  getGameStats,
  gameStatsTable
}