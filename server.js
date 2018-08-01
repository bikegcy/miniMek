const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const heroes = require('./routes/api/heroes');
const mechs = require('./routes/api/mechs');
const unit = require('./routes/api/unit');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/heroes', heroes);
app.use('/api/mechs', mechs);
app.use('/api/unit', unit);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));