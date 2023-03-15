const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const groupRoutes = require('./routes/group');
const matchRoutes = require('./routes/match');
const gameRoutes = require('./routes/game');
const db = require('./configs/db.config');
const dbQueries = require('./routes/helpers');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');



const app = express();
const port = process.env.PORT || 4000;


app.use(bodyParser.json());

//CORS for all routes
app.use(cors({origin: "http://localhost:3000", credentials: true}));

//set a cookie session
app.use(cookieSession({
  name: 'session',
  keys: ['iAMaKEyyyyyyyyyy', 'IaMTheSecondKey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(cookieParser());

//Use Routes
app.use('/player', playerRoutes(db, dbQueries));
app.use('/group', groupRoutes(db, dbQueries));
app.use('/game', gameRoutes(db, dbQueries));
app.use('/match', matchRoutes(db, dbQueries));


app.get('/', (req, res) => {
  res.send('Server is running');
})



app.listen(port,
  () => {
    console.log(`Server started on port ${port}`)
  }
);