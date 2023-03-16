const router = require("express").Router();
const bcrypt = require("bcryptjs");


module.exports = (db, dbQueries) => {

  // Login Route
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send("Wrong email or password");
    }

    dbQueries
      .getUserByEmail(email, db)
      .then((player) => {
        if (player) {
          bcrypt.compare(
            req.body.password,
            player.password,
            function (err, response) {
              if (err) {
                return res.status(401).send({
                  sucess: false,
                  message: "No user found",
                });
              }
              if (response) {
                req.session.player = {
                  id: player.id,
                  name: player.name,
                  lastName: player.lastname,
                  email: player.email,
                }
                console.log("Session Id" , req.session.player)
                res
                  .status(200)
                  .send({
                    success: true,
                    message: "Login succesful",
                   player:{
                      id: player.id,
                      name: player.name,
                      lastName: player.lastname,
                      email: player.email,
                   }
                  });
              } else {
                return res
                  .status(400)
                  .send({ success: false, message: "passwords do not match" });
              }
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
});
  //

  // Register Route
  router.post('/signup', async (req, res) => {

    const { name, lastName, email, password } = req.body;

    try {
      // Step 1: Check if email exists in the database
      const existingUser = await dbQueries.getUserByEmail(email, db);
      if (existingUser !== "No email found") {
        // Step 2: If email exists, send a message to the user that the email is already in use
        return res.status(400).send({
          success: false,
          message: "Email is already in use",
        });
      }

      // Step 3: If email does not exist, create a new user in the database using async and await
      const hashedPassword = bcrypt.hashSync(password, 12);
      const command = "INSERT INTO players (name, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *;";
      const values = [name, lastName, email, hashedPassword];

      const newPlayer = await db.query(command, values);
      req.session.player = {
        id: newPlayer.rows[0].id,
        name: newPlayer.rows[0].name,
        lastName: newPlayer.rows[0].lastname,
        email: newPlayer.rows[0].email,
      }


      // Step 4: Create a new session for the new user

      return res.status(200).send({
        success: true,
        message: "Sign up successful",
        player: {
          id: newPlayer.rows[0].id,
          name: newPlayer.rows[0].name,
          lastName: newPlayer.rows[0].lastname,
          email: newPlayer.rows[0].email,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Sign up failed",
      });
    }
  });

  return router;
};


