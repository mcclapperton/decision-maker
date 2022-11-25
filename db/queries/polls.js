const defaults = require("pg/lib/defaults");
const db = require("../connection");
const emailSender = require("../../utils/emailSender");

const createPoll = (poll) => {
  const pollParams = [poll.title, poll.description, poll.email];
  return db
    .query(
      "INSERT INTO polls (title, description, email) VALUES ($1, $2, $3) RETURNING *;",
      pollParams
    )
    .then((data) => {
      const createdPoll = data.rows[0];

      for (let option of poll.options) {
        const optionParams = [option.name, createdPoll.id];
        db.query(
          "INSERT INTO options (name, poll_id) VALUES ($1, $2);",
          optionParams
        )
          .then((data) => {})
          .catch((err) => {
            console.log(err.message);
          });
      }

      const administrativeLink = `/api/poll/results/${createdPoll.id}`;
      const submissionLink = `/api/poll/page/${createdPoll.id}`;

      const updateQuery = `UPDATE polls set administrativeLink = $1, submissionLink = $2 where id = $3;`;

      db.query(updateQuery, [
        administrativeLink,
        submissionLink,
        createdPoll.id,
      ])
        .then((data) => {
          return data.rows;
        })
        .catch((err) => {
          console.log(err.message);
        });

      const result = Object.assign(
        {},
        {
          id: createdPoll.id,
          title: createdPoll.title,
          description: createdPoll.description,
          administrativeLink,
          submissionLink,
        }
      );

      emailSender.sendEmail(
        poll.email,
        "Decision Maker App",
        `Congrats! You just created a poll with the question: ${createdPoll.title}. Here there is the administrative link : http://localhost:8080${administrativeLink} and the submission link to share with your friends: http://localhost:8080${submissionLink} `
      );
      return result;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getPoll = (pollId) => {
  return db
    .query(
      `SELECT polls.id as poll_id, polls.title, polls.description, options.id as options_id, options.name
                   FROM polls
                   JOIN options ON polls.id = options.poll_id
                   WHERE polls.id = $1;`,
      [pollId]
    )
    .then((data) => {
      return data.rows;
    });
};

const submitPoll = (poll) => {
  let counter = 1;
  for (let choice of poll.ranking) {
    const points = poll.ranking.length - counter;
    counter++;

    const pollParams = [poll.username, points, choice.id];
    db.query(
      "INSERT INTO answers (username, points, options_id) VALUES ($1,  $2, $3) RETURNING *;",
      pollParams
    )
      .then((res) => console.log(res.rows))
      .catch((e) => console.error(e.stack));
  }
  db.query(
    "SELECT title, email, administrativelink from polls where id = $1;",
    [poll.id]
  )
    .then((res) => {
      emailSender.sendEmail(
        res.rows[0].email,
        "Decision Maker App",
        `The user ${poll.username} just submitted an answer to your poll "${res.rows[0].title}". Check the results here: http://localhost:8080${res.rows[0].administrativelink}`
      );
    })
    .catch((e) => console.error(e.stack));

  return new Promise((resolve, reject) => {
    resolve({});
  });
};

const getPollResults = (pollId) => {
  return db
    .query(
      `SELECT polls.title, polls.description, options.name, sum(answers.points) as total_points FROM polls
  JOIN options on polls.id = options.poll_id
  JOIN answers on options.id = answers.options_id
  WHERE polls.id = $1
  GROUP BY polls.title, polls.description, options.name
  ORDER BY total_points DESC;`,
      [pollId]
    )
    .then((data) => {
      // if no answers yet, showing results anyway
      if (data.rows.length < 1) {
        return db
          .query(
            `SELECT polls.title, polls.description, options.name
        FROM polls
        JOIN options on polls.id = options.poll_id
        WHERE polls.id = $1
        GROUP BY polls.title, polls.description, options.name;`,
            [pollId]
          )
          .then((data) => {
            return data.rows;
          });
      }
      return data.rows;
    });
};

module.exports = { createPoll, getPoll, submitPoll, getPollResults };
