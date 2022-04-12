CREATE TABLE users (
id SERIAL PRIMARY KEY,
email text NOT NULL,
password text NOT NULL
);

CREATE TABLE students (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
school INT NOT NULL,
expires DATE NOT NULL
);

CREATE TABLE schools (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
address TEXT NOT NULL
);

CREATE TABLE observations (
id SERIAL PRIMARY KEY,
users_id INT NOT NULL,
students_id INT NOT NULL,
tasks_id INT NOT NULL,
duration INTEGER NOT NULL
);

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL
);

INSERT INTO tasks (name) VALUES ('Planned Pres.');
INSERT INTO tasks (name) VALUES ('Response Pres.');
INSERT INTO tasks (name) VALUES ('Monitoring.');
INSERT INTO tasks (name) VALUES ('Perform Feedbk.');
INSERT INTO tasks (name) VALUES ('Motiv. FeedBk.');
INSERT INTO tasks (name) VALUES ('Equip Mgt.');
INSERT INTO tasks (name) VALUES ('Organization.');
INSERT INTO tasks (name) VALUES ('Behavior Mgt.');
INSERT INTO tasks (name) VALUES ('Other Tasks.');