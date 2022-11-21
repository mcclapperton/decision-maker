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

      const updateQuery = `UPDATE polls set adminstrativeLink = '/polls/results/${createdPoll.id}', submissionLink = '/polls/${createdPoll.id}' where id = ${createdPoll.id}`;
      console.log(updateQuery);
      db.query(updateQuery)
        .then(data => {
          createdPoll.administrativeLink = '/polls/results/${createdPoll.id}';
          createdPoll.submissionLink = '/polls/${createdPoll.id}';
          return data.rows;
        })
        .catch((err) => {
          console.log(err.message);
        });

      const result = Object.assign({}, {
        id : createdPoll.id,
	      title: createdPoll.title,
	      administrativeLink: createdPoll.administrativeLink,
	      submissionLink: createdPoll.submissionLink
      });
      return result;
    }).catch((err) => {
      console.log(err.message);
    });
};

module.exports = { createPoll };
