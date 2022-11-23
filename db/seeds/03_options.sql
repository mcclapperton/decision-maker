-- Initial data in order to do some tests.

-- Inserting options to the poll 1 (Which movies)
INSERT INTO options (name, description, poll_id) VALUES ('Lord of the Rings', 'Adventure', 1);
INSERT INTO options (name, description, poll_id) VALUES ('Thor', 'Adventure', 1);
INSERT INTO options (name, description, poll_id) VALUES ('The avengers', 'Adventure', 1);
INSERT INTO options (name, description, poll_id) VALUES ('Iron Man 2', 'Adventure', 1);

-- Inserting options to the poll 2 (Place to next trip)
INSERT INTO options (name, description, poll_id) VALUES ('Paris', 'Description', 2);
INSERT INTO options (name, description, poll_id) VALUES ('Veneza', 'Description', 2);
INSERT INTO options (name, description, poll_id) VALUES ('Oslo', 'Description', 2);
INSERT INTO options (name, description, poll_id) VALUES ('Tokyo', 'Description', 2);
