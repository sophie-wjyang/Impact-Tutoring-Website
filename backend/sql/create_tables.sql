CREATE TYPE GENDER AS ENUM ('male', 'female', 'nonbinary', 'unspecified');
CREATE TYPE STATUS AS ENUM ('unverified', 'verified', 'applied', 'accepted', 'rejected');
CREATE TYPE USER_TYPE AS ENUM('tutor', 'tutee');

CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    grade TEXT,
    gender GENDER,
    location TEXT,
    subjects TEXT[],
    languages TEXT[],
    availability TEXT[],
    student_capacity INTEGER,
    previous_experience TEXT,
    status STATUS DEFAULT 'unverified',
    signup_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE tutees (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    grade TEXT,
    gender GENDER,
    location TEXT,
    subjects TEXT[],
    languages TEXT[],
    availability TEXT[],
    additional_information TEXT,
    status STATUS DEFAULT 'unverified',
    signup_date DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE pairings (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER REFERENCES tutors(id),
    tutee_id INTEGER REFERENCES tutees(id),
    subjects TEXT[],
    meeting_days TEXT[],

    UNIQUE(tutor_id, tutee_id)
);

CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    pairing_id INTEGER REFERENCES pairings(id) NOT NULL,
    date DATE,
    start_time TIME,
    end_time TIME,
    lesson_plan TEXT,
    session_notes TEXT,
    meeting_link TEXT
);

CREATE TABLE volunteer_hours_requests (
    id SERIAL PRIMARY KEY,
    tutor_id INTEGER REFERENCES tutors(id) NOT NULL,
    num_hours INTEGER NOT NULL,
    status TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE confirmation_codes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    user_type USER_TYPE NOT NULL,
    email TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP + INTERVAL '3 hours',
    verified_at TIMESTAMP
);
