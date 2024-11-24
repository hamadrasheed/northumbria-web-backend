const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const http = require('http');
const dotenv = require('dotenv');
const db = require('./database/db.js');
const indexRouter = require('./routes/');

dotenv.config({ path: '.env' });

const app = express();

// Check database connection
db.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => {
    console.log('Database authenticaion error...', error);
    process.exit();
});

// Configurations
app.use(cors());
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 8500);

app.use('/api', indexRouter);

// error handler
// app.use(function(err, req, res, next) {
//   res.status(err?.status || 500).send({
//     message: err?.message || 'Something went wrong!' 
//   })
// });

const server = http.createServer(app);

app.listen(app.get('port'), () => {
    console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
    console.log('Press CTRL-C to stop\n');
});

module.exports = app;