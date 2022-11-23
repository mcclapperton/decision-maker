const express = require('express');
const router  = express.Router();
const pollQueries = require('../db/queries/polls');

router.post('/create', (req, res) => {
  pollQueries.createPoll(req.body)
    .then(poll => {
      res.json({ poll });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/page/:pollId', (req, res) => {
  pollQueries.getPoll(req.params.pollId)
    .then(polls => {
      let poll = Object.assign({}, {id: polls[0].poll_id, title: polls[0].title});
      let questions = [];

      for (let p of polls) {
        questions.push({id: p.questions_id, name: p.name, description: p.description});
      }

      poll = Object.assign(poll, { questions });

      res.json(poll);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/submit', (req, res) => {
  pollQueries.submitPoll(req.body)
    .then(choices => {
      res.json({message: "Your answer had been submitted successfully."});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/results/:pollId', (req, res) => {
  pollQueries.getPollResults(req.params.pollId)
    .then(polls => {
      let poll = Object.assign({}, {title: polls[0].title});
      let questions = [];
      let counter = 1;

      for (let p of polls) {
        questions.push({ranking: counter, name: p.name, points: p.total_points});
        counter++;
      }

      poll = Object.assign(poll, { questions });

      res.json(poll);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
