const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/keys');
const path = require('path');

const userRoutes = require('./routes/userRoutes');

var port = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());
app.use(bodyParser());

require('./config/passport');

const db = require('./config/keys').mongoURI;

mongoose.connect(db);

app.use(
  session({
    secret: config.secretOrKey,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
