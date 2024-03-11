INSERT INTO tutors (first_name, last_name, email, password, grade, gender, location, subjects, languages, availability, student_capacity)
VALUES
    ('Minerva', 'McGonagall', 'minerva.mcgonagall@example.com', 'minerva123', 12, 'Female', 'London', ARRAY['Transfiguration'], ARRAY['English'], ARRAY['Monday', 'Wednesday'], 5),
    ('Severus', 'Snape', 'severus.snape@example.com', 'severus456', 12, 'Male', 'Manchester', ARRAY['Potions', 'Defense Against the Dark Arts'], ARRAY['English'], ARRAY['Tuesday', 'Thursday'], 3),
    ('Filius', 'Flitwick', 'filius.flitwick@example.com', 'filius789', 11, 'Male', 'Cheshire', ARRAY['Charms'], ARRAY['English'], ARRAY['Wednesday', 'Friday'], 2);

INSERT INTO tutees (first_name, last_name, email, password, grade, gender, location, subjects, languages, availability, additional_information, tutor_subjects)
VALUES
    ('Harry', 'Potter', 'harry.potter@example.com', 'harry123', 5, 'Male', 'London', ARRAY['Potions'], ARRAY['English'], ARRAY['Monday', 'Tuesday'], 'The Boy Who Lived', '{"Professor McGonagall": ["Transfiguration"], "Professor Snape": ["Potions", "Defense Against the Dark Arts"]}'),
    ('Ron', 'Weasley', 'ron.weasley@example.com', 'ronald456', 5, 'Male', 'Manchester', ARRAY['Charms', 'Potions'], ARRAY['English'], ARRAY['Tuesday', 'Wednesday'], 'Keeper of the Gryffindor Quidditch Team', '{"Professor McGonagall": ["Transfiguration"], "Professor Flitwick": ["Charms"]}'),
    ('Hermione', 'Granger', 'hermione.granger@example.com', 'hermione789', 5, 'Female', 'Cheshire', ARRAY['Charms', 'Potions', 'Transfiguration'], ARRAY['English'], ARRAY['Wednesday', 'Thursay'], 'Brightest Witch of Her Age', '{"Professor Snape": ["Potions", "Defense Against the Dark Arts"], "Professor Flitwick": ["Charms"]}');
