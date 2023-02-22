const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const dotenv = require('dotenv');


const app = express();
const port = process.env.PORT || 4000;
dotenv.config();

app.use(bodyParser.json());

// Connect to database
mongoose.set('strictQuery', true)
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, { useNewUrlParser: true })
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}




//Use Routes
app.use('/player', playerRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port,
  () => {
    connect();
    console.log(`Server started on port ${port}`)
  }
  );