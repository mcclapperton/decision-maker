const defaults = require('pg/lib/defaults');
const db = require('../connection');

const createPoll = (poll) => {
  const pollParams = [poll.title, poll.email];
  return db.query('INSERT INTO polls (title, email) VALUES ($1, $2) RETURNING *;', pollParams)
    .then(data => {
      const createdPoll = data.rows[0];

      for (let question of poll.questions) {
        const questionParams = [question.name, question.description, createdPoll.id];
        db.query('INSERT INTO questions (name, description, poll_id) VALUES ($1, $2, $3);', questionParams)
          .then(data => {
          })
          .catch((err) => {
            console.log(err.message);
          });
      }

      const administrativeLink = `/polls/results/${createdPoll.id}`;
      const submissionLink = `/polls/${createdPoll.id}`;

      const updateQuery = `UPDATE polls set administrativeLink = $1, submissionLink = $2 where id = $3;`;

      db.query(updateQuery, [administrativeLink, submissionLink, createdPoll.id])
        .then(data => {
          return data.rows;
        })
        .catch((err) => {
          console.log(err.message);
        });

      const result = Object.assign({}, {
        id : createdPoll.id,
	      title: createdPoll.title,
	      administrativeLink,
	      submissionLink
      });
      return result;
    }).catch((err) => {
      console.log(err.message);
    });
};

module.exports = { createPoll };
