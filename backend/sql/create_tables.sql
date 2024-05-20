CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    grade INTEGER,
    gender VARCHAR(255),
    location VARCHAR(255),
    subjects TEXT[],
    languages TEXT[],
    availability TEXT[],
    student_capacity INTEGER,
    previous_experience TEXT
);

CREATE TABLE tutees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    grade INTEGER,
    gender VARCHAR(255),
    location VARCHAR(255),
    subjects TEXT[],
    languages TEXT[],
    availability TEXT[],
    additional_information TEXT
);

CREATE TABLE pairings (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER REFERENCES tutors(id),
    tutee_id INTEGER REFERENCES tutees(id),
    subjects TEXT[],
    meeting_days TEXT[]
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    pairing_id INTEGER REFERENCES pairings(id),
    date DATE,
    start_time TIME,
    end_time TIME,
    lesson_plan TEXT,
    session_notes TEXT,
    meeting_link TEXT
);

CREATE TABLE volunteer_hours_requests (
    id SERIAL PRIMARY KEY,
    date_submitted DATE,
    tutor_id INTEGER REFERENCES tutors(id),
    num_hours INTEGER,
    status VARCHAR(255),
    description TEXT
);

