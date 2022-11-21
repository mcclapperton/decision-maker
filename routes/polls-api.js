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

router.get('/:pollId', (req, res) => {
  pollQueries.getPoll(req.params.pollId)
    .then(polls => {
      let poll = Object.assign({}, {title: polls[0].title});
      let questions = [];

      for (let p of polls) {
        questions.push({name: p.name, description: p.description});
      }

      poll = Object.assign(poll, { questions });

      res.json({ poll });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
