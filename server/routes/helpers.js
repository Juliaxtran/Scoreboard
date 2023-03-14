
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




module.exports = {
  getUserByEmail,
  getGroupByPlayerId,
  createGroup,
}