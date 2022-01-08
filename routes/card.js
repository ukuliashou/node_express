const { Router } = require('express');

const Course = require('../models/course');
const router = Router();
const auth = require('../middleware/auth');

function mapCartItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    id: c.courseId.id,
    count: c.count,
  }));
}

function computePrice(courses) {
  return courses.reduce((total, course) => total += course.price * course.count , 0)
}

router.get('/', auth, async (req, res) => {
  const user = await req.user.populate('cart.items.courseId');
  const courses = mapCartItems(user.cart);

  res.render('card', {
    title: 'Busket',
    isBusket: true,
    price: computePrice(courses),
    courses,
  })
});

router.post('/add', auth, async (req, res) => {
  const course = await Course.findById(req.body.id);

  await req.user.addToCart(course);

  res.redirect('/card')
});

router.delete('/delete/:id', auth, async (req, res) => {
  await req.user.removeFromCart(req.params.id);

  const user = await req.user.populate('cart.items.courseId');
  const courses = mapCartItems(user.cart);

  const cart = {
    courses,
    price: computePrice(courses),
  };

  res.status(200).json(cart);
})

module.exports = router;
