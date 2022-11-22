-- Initial data in order to do some tests.

-- User 1 giving his choices to the poll 1
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 2, 1);
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 1, 2);
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 3, 3);
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 0, 4);

-- User 2 giving his choices also to the poll 1
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 0, 1);
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 2, 2);
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 1, 3);
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 3, 4);

-- User 1 giving his choices to the poll 2
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 0, 5);
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 3, 6);
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 1, 7);
INSERT INTO choices (username, points, questions_id) VALUES ('User1', 2, 8);

-- User 2 giving his choices also to the poll 2
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 3, 5);
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 0, 6);
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 2, 7);
INSERT INTO choices (username, points, questions_id) VALUES ('User2', 1, 8);
