const { Router } = require('express');

const Course = require('../models/course');
const router = Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  res.render('add_course', {
    title: 'Add course',
    isAddCourse: true,
  })
});

router.post('/', auth, async (req, res) => {
  const course = await new Course({
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    userId: req.user._id
  });

  try {
    await course.save();
    res.redirect('/courses');
  } catch (e) {
    console.error(e)
  }
});

module.exports = router;
