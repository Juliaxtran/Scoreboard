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
                req.session.id = player.id;

                res
                  .cookie('sessionId', req.session.id, {
                        httpOnly: true,
                        maxAge: 3600000 // Cookie expires in 1 hour
                      })
                  .status(200)
                  .send({
                    success: true,
                    message: "Login succesful",
                    player : {
                      id: player.id,
                      name: player.name,
                      email: player.email,
                    }
                  });
                  console.log( "Session Id" , req.session.id);
                  console.log("Plater Id", player.id)
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
  router.post('/signup', (req, res) => {

    let {  name ,email, password } = req.body
    password = bcrypt.hashSync(password, 12);
    const command = ' INSERT INTO players (name, email, password) VALUES($1, $2, $3) RETURNING *;'
    const values = [ name, email, password]
    db.query(command, values).then(data => {

      if (data["rows"].length > 0) {

        req.session.id = data["rows"][0].id
        return res.status(200).send({
          "success": true,
          "message": "Sign up successful",
           "player": data["rows"][0]
        })
      }

    })
      .catch((err) => console.log(err));

  })

  return router;
};

