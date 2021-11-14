const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', (req, res) => {
  res.render('add_course', {
    title: 'Add course',
    isAddCourse: true,
  })
});

router.post('/', async (req, res) => {
  const course = await new Course(req.body.title, req.body.price, req.body.image);

  course.save();

  res.redirect('/courses')
});

module.exports = router;
