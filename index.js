const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const scurf = require('csurf');
const flash = require('connect-flash');

const homeRoute = require('./routes/home');
const coursesRoute = require('./routes/courses');
const addCourseRoute = require('./routes/add_course');
const cardRoute = require('./routes/card');
const ordersRoute = require('./routes/orders');
const authRoute = require('./routes/auth');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');

const app = express();

const MONGODB_URI = 'mongodb+srv://kuliashou:7Xbn7fkX4ymyRyAr@cluster0.ozhzl.mongodb.net/shop';

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

const store = MongoStore({
  collection: 'session',
  uri: MONGODB_URI, 
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store,
}))
app.use(scurf());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use('/', homeRoute);
app.use('/courses', coursesRoute);
app.use('/add_course', addCourseRoute);
app.use('/card', cardRoute);
app.use('/orders', ordersRoute);
app.use('/auth', authRoute);

app.get('/add_course', (req, res) => {
  res.render('add_course', {
    isAddCourse: true,
  });
});

app.get('/courses', (req, res) => {
  res.render('courses', {
    isCourses: true,
  });
});

app.get('/card', (req, res) => {
  res.render('card', {
    isBusket: true,
  });
});

async function start() {
  try {
    const url = 'mongodb+srv://kuliashou:7Xbn7fkX4ymyRyAr@cluster0.ozhzl.mongodb.net/shop';

    await mongoose.connect(url, { useNewUrlParser: true });

    app.listen('8000', (req, res) => {
      console.log('\x1b[32m', 'Server is running on 8000 port');
    });
  } catch (e) {
    console.log(e);
  }
}

start();
