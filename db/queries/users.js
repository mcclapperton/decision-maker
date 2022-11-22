const db = require('../connection');
const polls = require('./polls');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      console.log(data);
      return data.rows;
    });
};

module.exports = { getUsers };
