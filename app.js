const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const errorMiddleware = require('./middleware/error');
const config = require('./config');

// import routes
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const paymentRoutes = require('./routes/payment');
const postRoutes = require('./routes/post');

// initialize the app
const app = express();

// middleware
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(passport.initialize());
require('./config/passport')(passport);

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// set routes
// TODO: change to '/user' and '/message'
app.use(`${config.root}/users`, userRoutes);
app.use(`${config.root}/messages`, messageRoutes);
app.use(`${config.root}/payment`, paymentRoutes);
app.use(`${config.root}/post`, postRoutes);

// set error handling middleware
app.use(errorMiddleware);

module.exports = app;
