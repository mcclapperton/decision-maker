-- Initial data in order to do some tests.

-- Creating poll 1
INSERT INTO polls (title, description, email, administrativeLink, submissionLink) VALUES ('Which movie are we going to watch today?', 'Any description', 'creator1@test.com', '/polls/results/1', '/polls/page/1');

-- Creating poll 2
INSERT INTO polls (title, description, email, administrativeLink, submissionLink) VALUES ('Where are we going in our next trip?', 'Any description', 'creator2@test.com', '/polls/results/2', '/polls/page/2');
