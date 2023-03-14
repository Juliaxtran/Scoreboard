
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

module.exports = {
  getUserByEmail
}