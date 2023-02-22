const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/scoreboard', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

//Use Routes
// app.use('/api/items', items);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));