const { Router } = require('express');
const Card = require('../models/card');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
  const card = await Card.fetch();

  res.render('card', {
    title: 'Busket',
    isBusket: true,
    price: card.price,
    courses: card.courses,
  })
});

router.post('/add', async (req, res) => {
  const course = await Course.getById(req.body.id)

  await Card.add(course);
  res.redirect('/card')
});

router.delete('/delete/:id', async (req, res) => {
  const card = await Card.remove(req.params.id);

  res.status(200).json(card);
})

module.exports = router;
