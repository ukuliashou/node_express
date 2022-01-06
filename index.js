const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const homeRoute = require('./routes/home');
const coursesRoute = require('./routes/courses');
const addCourseRoute = require('./routes/add_course');
const cardRoute = require('./routes/card');
const ordersRoute = require('./routes/orders');

const app = express();
const User = require('./models/user');

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
  try {
    const user = await User.findById('61d557117c2059a9c96b07b6');
    req.user = user;
    next();
  } catch (e) {
    console.error(e)
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true,
}));
app.use('/', homeRoute);
app.use('/courses', coursesRoute);
app.use('/add_course', addCourseRoute);
app.use('/card', cardRoute);
app.use('/orders', ordersRoute);


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
    const url = 'mongodb+srv://kuliashou:7Xbn7fkX4ymyRyAr@cluster0.ozhzl.mongodb.net/shop';

    await mongoose.connect(url, { useNewUrlParser: true });

    const candidate = await User.findOne();

    if (!candidate) {
      const user = new User({
        email: 'u.kuliashou@gmail.com',
        name: 'Vlad',
        cart: {
          items: [],
        },
      })

      await user.save();
    }

    app.listen('8000', (req, res) => {
      console.log('\x1b[32m', 'Server is running on 8000 port');
    });
  } catch (e) {
    console.log(e)
  }
}

start()
