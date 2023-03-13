const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const groupRoutes = require('./routes/group');
const matchRoutes = require('./routes/match');
const gameRoutes = require('./routes/game');
const session = require('express-session');
require('dotenv').config();
const { Pool } = require('pg');

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT} = process.env;



const pool = new Pool({
	user: DB_USER,
	host: DB_HOST,
	password: DB_PASSWORD,
	port: DB_PORT,
	database: DB_DATABASE,
})

pool.connect().then(() => {
	console.log("Database connection established.")
}).catch( e => {
	throw new Error(e);
})




const app = express();
const port = process.env.PORT || 4000;
// dotenv.config();

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
app.use('/player', playerRoutes);
app.use('/group', groupRoutes);
app.use('/match', matchRoutes);
app.use('/game', gameRoutes);


app.get('/health', (req, res) => {
  res.send('ok');
})



app.listen(port,
  () => {
    // connect();
    console.log(`Server started on port ${port}`)
  }
);