const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const groupRoutes = require('./routes/group');
const matchRoutes = require('./routes/match');
const gameRoutes = require('./routes/game');
const session = require('express-session');
const db = require('./configs/db.config');
const dbQueries = require('./routes/helpers');
require('dotenv').config();




const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.json());

// Connect to database
// mongoose.set('strictQuery', true)
// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO, { useNewUrlParser: true })
//     console.log('Connected to database')
//   } catch (err) {
//     console.log(err)
//   }
// }

//CORS for all routes

app.use(session({
  secret: 'scoreboard',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//Use Routes
app.use('/player', playerRoutes(db, dbQueries));
app.use('/group', groupRoutes(db, dbQueries));
app.use('/game', gameRoutes(db, dbQueries));
app.use('/match', matchRoutes(db, dbQueries));


app.get('/health', (req, res) => {
  res.send('ok');
})



app.listen(port,
  () => {
    // connect();
    console.log(`Server started on port ${port}`)
  }
);