const defaults = require('pg/lib/defaults');
const db = require('../connection');

const createPoll = (poll) => {
  const pollParams = [poll.title, poll.email];
  return db.query('INSERT INTO polls (title, email) VALUES ($1, $2) RETURNING *;', pollParams)
    .then(data => {
      const createdPoll = data.rows[0];

      for (let option of poll.options) {
        const optionParams = [option.name, option.description, createdPoll.id];
        db.query('INSERT INTO options (name, description, poll_id) VALUES ($1, $2, $3);', optionParams)
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

const getPoll = (pollId) => {
  return db.query(`SELECT polls.id as poll_id, polls.title, options.id as options_id, options.name, options.description
                   FROM polls
                   JOIN options ON polls.id = options.poll_id
                   WHERE polls.id = $1;`, [pollId])
    .then(data => {
      return data.rows;
    });
}

const submitPoll = (poll) => {
  let counter = 1;
  for (let choice of poll.ranking) {
    const points = poll.ranking.length - counter;
    counter++;

    const pollParams = [poll.username, points, choice.id];
    db.query('INSERT INTO answers (username, points, options_id) VALUES ($1,  $2, $3) RETURNING *;', pollParams)
    .then(res => console.log(res.rows))
    .catch(e => console.error(e.stack));
  }
  return new Promise( (resolve, reject) => {
    resolve({});
  });
}

const getPollResults = (pollId) => {
  return db.query(`SELECT polls.title, options.name, options.description, sum(answers.points) as total_points FROM polls
  JOIN options on polls.id = options.poll_id
  JOIN answers on options.id = answers.options_id
  WHERE polls.id = $1
  GROUP BY polls.title, options.name, options.description
  ORDER BY total_points DESC;`, [pollId])
    .then(data => {
      return data.rows;
    });
}

module.exports = { createPoll, getPoll, submitPoll, getPollResults };
