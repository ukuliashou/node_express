const path = require('path');
const fs = require('fs');

const p = path.join(__dirname, '..', 'data', 'card.json');

class Card {
  static async add(course) {
    const card = await Card.fetch();
    console.log(card)
    const idx = card.courses.findIndex((item) => item.id === course.id);
    const candidate = card.courses[idx];

    if (candidate) {
      candidate.count++;
      card.courses[idx] = candidate;
    } else {
      course.count = 1;
      card.courses.push(course);
    }

    card.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (error) => {
        if (error) return reject(error);

        return resolve();
      })
    })
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, 'utf-8', (error, data) => {
        if (error) return reject(error);
        
        return resolve(JSON.parse(data));
      })
    })
  }

  static async remove(id) {
    const card = await Card.fetch();
    const idx = card.courses.findIndex((item) => item.id === id);
    const course = card.courses[idx];

    if (course.count === 1) {
      card.courses = card.courses.filter((item) => item.id !== id);
    } else {
      card.courses[idx].count--;
    }

    card.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (error) => {
        if (error) return reject(error);

        return resolve(card);
      })
    })
  }
}

module.exports = Card;
