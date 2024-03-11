CREATE TABLE tutors (
    id serial PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    grade integer,
    gender varchar(255),
    location varchar(255),
    subjects TEXT[],
    languages TEXT[],
    availability TEXT[],
    student_capacity integer,
    report_card BYTEA,
    resume BYTEA,
    previous_experience TEXT
);

CREATE TABLE tutees (
    id serial PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    grade integer,
    gender varchar(255),
    location varchar(255),
    subjects TEXT[],
    languages TEXT[],
    availability TEXT[],
    additional_information TEXT
    tutor_subjects JSONB
);