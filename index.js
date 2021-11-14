const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const homeRoute = require('./routes/home');
const coursesRoute = require('./routes/courses');
const addCourseRoute = require('./routes/add_course');
const cardRoute = require('./routes/card');
const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true,
}));
app.use('/', homeRoute);
app.use('/courses', coursesRoute);
app.use('/add_course', addCourseRoute);
app.use('/card', cardRoute);


app.get('/add_course', (req, res) => {
  res.render('add_course', {
    isAddCourse: true,
  })
});

app.get('/courses', (req, res) => {
  res.render('courses', {
    isCourses: true,
  })
});

app.get('/card', (req, res) => {
  res.render('card', {
    isBusket: true,
  })
});

async function start() {
  try {
    const url = 'mongodb+srv://kuliashou:7Xbn7fkX4ymyRyAr@cluster0.ozhzl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    await mongoose.connect(url, { useNewUrlParser: true });

    app.listen('8000', (req, res) => {
      console.log(`Server is running on 8000 port`);
    });
  } catch (e) {
    console.log(e)
  }
}

start()
