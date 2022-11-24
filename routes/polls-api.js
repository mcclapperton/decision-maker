const express = require("express");
const router = express.Router();
const pollQueries = require("../db/queries/polls");

router.post("/create", (req, res) => {
  pollQueries
    .createPoll(req.body)
    .then((poll) => {
      res.json({ poll });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/page/:pollId", (req, res) => {
  pollQueries
    .getPoll(req.params.pollId)
    .then((polls) => {
      let poll = Object.assign(
        {},
        {
          id: polls[0].poll_id,
          title: polls[0].title,
          description: polls[0].description,
        }
      );
      let options = [];

      for (let p of polls) {
        options.push({ id: p.options_id, name: p.name });
      }

      poll = Object.assign(poll, { options });

      res.json(poll);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/submit", (req, res) => {
  pollQueries
    .submitPoll(req.body)
    .then((answers) => {
      res.json({ message: "Your answer has been submitted successfully." });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/results/:pollId", (req, res) => {
  console.log("routes:", req.params.pollId);
  pollQueries
    .getPollResults(req.params.pollId)
    .then((polls) => {
      console.log(polls);
      let poll = Object.assign(
        {},
        { title: polls[0].title, description: polls[0].description }
      );

      let options = [];
      let counter = 1;

      for (let p of polls) {
        options.push({
          ranking: counter,
          name: p.name,
          points: p.total_points,
        });
        counter++;
      }
      poll = Object.assign(poll, { options });
      console.log("poll:", poll);
      // res.json(poll);
      res.render("results", poll);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
