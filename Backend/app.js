var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
const apiOrder = require("./routes/orders2");
const apiTransport = require("./routes/transports2");

const db = require("./models");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users').router;
var ordersRouter = require('./routes/orders').router;
var transportRouter = require('./routes/transports').router;
var loginRouter = require('./routes/login').router;
var bestRouteRouter = require('./routes/bestRoute').router;
var registerRouter = require('./routes/register');
var carsRouter = require('./routes/cars').router;


var app = express();


apiOrder(app, db);
apiTransport(app, db);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
// Access the parse results as request.body
app.post('/ordersPost', function(request, response){
    console.log(request.body);
});
*/

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/transports', transportRouter);
app.use('/login', loginRouter);
app.use('/bestRoute', bestRouteRouter);
app.use('/register', registerRouter);
app.use('/cars', carsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
