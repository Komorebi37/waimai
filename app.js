var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var ejs = require('ejs');




var localRouter =require('./routes/local')
var aboutRouter = require('./routes/about');
var blogRouter = require('./routes/blog');
var contactRouter = require('./routes/contact');
var errorRouter = require('./routes/error');
var indexRouter = require('./routes/index');
var singlepostRouter = require('./routes/singlepost');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var orderRouter =require('./routes/order');
var shopRouter =require('./routes/shop');

var tbindexRouter =require('./routes/tbindex');
 var tbaboutRouter =require('./routes/tbabout');
var tbblogRouter =require('./routes/tbblog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.engine(".html",ejs.__express);
app.set("view engine","html");






app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cookieParser('exercise'));
app.use(session({
  secret: 'exercise',
  name: 'text',
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/local',localRouter);
app.use('/',indexRouter);
app.use('/about',aboutRouter);
app.use('/blog',blogRouter);
app.use('/contact',contactRouter);
app.use('/error',errorRouter);
app.use('/singlepost',singlepostRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/order',orderRouter);
app.use('/tbindex',tbindexRouter);
app.use('/tbabout',tbaboutRouter);
app.use('/tbblog',tbblogRouter);
app.use('/shop',shopRouter);




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
