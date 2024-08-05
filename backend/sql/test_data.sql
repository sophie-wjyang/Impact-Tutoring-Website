INSERT INTO tutors (first_name, last_name, email, password, grade, gender, location, subjects, languages, availability, student_capacity, status, signup_date)
VALUES
    -- pw: minerva123, severus456, filius789
    ('Minerva', 'McGonagall', 'minerva.mcgonagall@example.com', 'fe8145c2d38c3100c5503a15e43f053e26efe859567dcb1e6b9fa5d65dc50a8e', 12, 'female', 'London', ARRAY['Transfiguration'], ARRAY['English'], ARRAY['Monday', 'Wednesday'], 5, 'verified', '2021-01-01'),
    ('Severus', 'Snape', 'severus.snape@example.com', 'severus456', 12, 'male', 'Manchester', ARRAY['Potions', 'Defense Against the Dark Arts'], ARRAY['English'], ARRAY['Tuesday', 'Thursday'], 3, 'verified', '2021-01-02'),
    ('Filius', 'Flitwick', 'filius.flitwick@example.com', 'filius789', 11, 'male', 'Cheshire', ARRAY['Charms', 'Arithmancy'], ARRAY['English'], ARRAY['Wednesday', 'Friday'], 2, 'verified', '2021-01-03');

INSERT INTO tutees (first_name, last_name, email, password, grade, gender, location, subjects, languages, availability, status, signup_date)
VALUES
    ('Harry', 'Potter', 'harry.potter@example.com', 'harry123', 5, 'male', 'London', ARRAY['Potions'], ARRAY['English'], ARRAY['Monday', 'Tuesday'], 'verified', '2021-01-01'),
    ('Ron', 'Weasley', 'ron.weasley@example.com', 'ronald456', 5, 'male', 'Manchester', ARRAY['Charms', 'Potions'], ARRAY['English'], ARRAY['Tuesday', 'Wednesday'], 'verified', '2023-06-01'),
    ('Hermione', 'Granger', 'hermione.granger@example.com', 'hermione789', 5, 'female', 'Cheshire', ARRAY['Charms', 'Potions', 'Transfiguration'], ARRAY['English'], ARRAY['Wednesday', 'Thursay'], 'verified', '2024-06-01');

INSERT INTO pairings (tutor_id, tutee_id, subjects, meeting_days)
VALUES 
    (1, 1, '{"Transfiguration"}', '{"Monday", "Wednesday"}'),
    (1, 2, '{"Transfiguration"}', '{"Tuesday", "Thursday"}'),
    (2, 3, '{"Defense Against the Dark Arts", "Potions"}', '{"Wednesday", "Friday"}'),
    (2, 1, '{"Potions"}', '{"Monday", "Tuesday"}'),
    (3, 2, '{"Charms"}', '{"Tuesday", "Wednesday"}'),
    (3, 3, '{"Charms", "Arithmancy"}', '{"Wednesday", "Thursday"}');

INSERT INTO sessions (pairing_id, date, start_time, end_time, lesson_plan, session_notes, meeting_link)
VALUES
    (1, '2021-01-04', '15:00:00', '16:00:00', 'Practice Quidditch moves', 'Harry is a natural at Quidditch', 'https://meet.google.com/abc-def-ghi'),
    (2, '2021-01-05', '15:00:00', '16:00:00', 'Transfiguration theory', 'Hermione is a quick learner', 'https://meet.google.com/jkl-mno-pqr'),
    (3, '2021-01-06', '15:00:00', '16:00:00', 'Defense Against the Dark Arts practical', 'Ron is a bit clumsy with his wand', 'https://meet.google.com/stu-vwx-yz');