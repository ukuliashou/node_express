const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.id = uuidv4();
  }

  readFile() {
    return ({
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id,
    })
  }

  static async update(course) {
    const courses = await Course.getAll();
    const idx = courses.findIndex((item) => item.id === course.id);

    courses[idx] = course;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err, data) => {
          if (err) return reject(err)

          return resolve();
        },
      );
    });
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.readFile());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err, data) => {
          if (err) return reject(err)

          return resolve();
        },
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8', 
        (error, data) => {
          if (error) return reject(error);
          
          return resolve(JSON.parse(data))
        }
      )
    })
  }

  static async getById(id) {
    const courses = await Course.getAll();

    return courses.find((item) => item.id === id);
  }
}

module.exports = Course;
