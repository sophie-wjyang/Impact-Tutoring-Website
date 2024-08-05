import os
import hashlib
from datetime import date, datetime

from cachelib import FileSystemCache
from flask import Flask, redirect, request, session, send_file
from flask_session import Session
from flask_cors import CORS

import psycopg2
import boto3

from dotenv import load_dotenv

from gmail import Mailer
from utils import create_email_confirmation_code, is_session_valid

load_dotenv()

app = Flask(__name__)
app.config.from_prefixed_env()
app.config["SESSION_CACHELIB"] = FileSystemCache(cache_dir="flask_session")

Session(app)
CORS(app)

mailer = Mailer()

# connect to database
# os is used to access environment variables, so that the database username and password are not visible in the source code
conn = psycopg2.connect(
    host="localhost",
    database="impact_tutoring",
    user=os.environ["DB_USERNAME"],
    password=os.environ["DB_PASSWORD"],
)

# create a new S3 client object using aws credentials
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
)


@app.route("/")
def index():
    return "index!"


@app.route("/get-user")
def getUser():
    if is_session_valid(session):
        user_type = session.get("user_type")

        cur = conn.cursor()

        try:
            cur.execute(
                """SELECT first_name, last_name, email, status FROM %s WHERE id = %%s AND email = %%s"""
                % f"{user_type}s",
                (session.get("id"), session.get("email")),
            )

            result = cur.fetchone()

            cur.close()

            if result:
                return {
                    "type": user_type,
                    "firstName": result[0],
                    "lastName": result[1],
                    "email": result[2],
                    "status": result[3],
                }

            return {"message": "User not found"}, 400

        except:
            return {"message": "Error getting user from session"}, 500

    return {"message": "No session found"}


############################################################################################################
# save sign up form data to database
############################################################################################################
@app.route("/save-signup-form-data", methods=["POST"])
def save_signup_form_data():
    data = request.json

    # validate data
    if (
        data["email"] is None
        or data["first_name"] is None
        or data["last_name"] is None
        or data["password"] is None
        or data["user_type"] is None
    ):
        return {"message": "Missing data"}, 400

    # format data
    email = data["email"].lower()
    first_name = data["first_name"].capitalize()
    last_name = data["last_name"].capitalize()
    password = hashlib.sha256(
        data["password"].encode()
    ).hexdigest()  # hash the password using sha256
    user_type = data["user_type"].lower()

    # check if they are signing up using the admin email
    if email == os.environ["ADMIN_EMAIL"]:
        return {"message": "Email already exists"}, 400

    cur = conn.cursor()

    try:

        # check if the email already exists
        cur.execute(
            """SELECT email FROM tutees WHERE email = %s UNION SELECT email FROM tutors WHERE email = %s""",
            (email, email),
        )

        if len(cur.fetchall()) > 0:
            return {"message": "Email already exists"}, 400

        cur.execute(
            (
                """INSERT INTO %s (first_name, last_name, email, password, signup_date)
                    VALUES (%%s, %%s, %%s, %%s, %%s)"""
                % ("tutees" if user_type == "tutee" else "tutors")
            ),
            (
                first_name,
                last_name,
                email,
                password,
                date.today(),
            ),
        )

        cur.execute(
            "SELECT id FROM %s WHERE email = %%s"
            % ("tutees" if user_type == "tutee" else "tutors"),
            (email,),
        )

        result = cur.fetchone()

        if result:
            code = create_email_confirmation_code(
                cur, user_id=result[0], user_type=user_type, email=email
            )
            mailer.send_email(
                "Please click the following link to confirm your email: {}/confirm_email?code={}".format(
                    os.environ["SERVER_URL"], code
                ),
                "Impact Tutoring: Confirm your email",
                email,
            )

        conn.commit()
        cur.close()

        return {"message": "Signed up successfully"}

    except:
        conn.rollback()
        cur.close()

        return {"message": "Error signing up"}, 500


@app.route("/validate-signup-token", methods=["GET"])
def validate_signup_token():
    code = request.args.get("code")

    if code is None:
        return {"message": "No code provided"}, 400

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT user_id, user_type, expires_at FROM confirmation_codes WHERE code = %s""",
            (code,),
        )

        result = cur.fetchone()

        if result and result[2] >= datetime.now():
            cur.execute(
                """UPDATE %s SET status = 'verified' WHERE id = %%s"""
                % ("tutees" if result[1] == "tutee" else "tutors"),
                (result[0],),
            )

            cur.execute(
                """UPDATE confirmation_codes SET verified_at = CURRENT_TIMESTAMP WHERE code = %s""",
                (code,),
            )

            conn.commit()
            cur.close()

            return redirect(
                location="{}/log-in".format(os.environ["CLIENT_URL"]), code=302
            )
        else:
            return {"message": "Invalid confirmation code"}, 400

    except:
        conn.rollback()
        cur.close()

        return {"message": "Error verifying confirmation code"}, 500


############################################################################################################
# validate that email exists in database for login
############################################################################################################
@app.route("/validate-login-form-data", methods=["POST"])
def validate_login_form_data():
    if is_session_valid(session):
        return {"message": "Already logged in"}, 400

    data = request.json

    # validate data
    if data["email"] is None or data["password"] is None:
        return {"message": "Missing data"}, 400

    # format data
    email = data["email"].lower()
    password = hashlib.sha256(
        data["password"].encode()
    ).hexdigest()  # hash the password using sha256

    # admin login
    if (
        email == os.environ["ADMIN_EMAIL"]
        and data["password"] == os.environ["ADMIN_PASSWORD"]
    ):
        session["id"] = 0
        session["email"] = email
        session["user_type"] = "admin"
        return {
            "type": "admin",
            "firstName": "Impact Tutoring",
            "lastName": "",
            "email": email,
            "status": "accepted",
        }

    # tutor or tutee login
    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT 'tutor', id, first_name, last_name, status
                FROM tutors
                WHERE email = %s AND password = %s
                UNION
                SELECT 'tutee', id, first_name, last_name, status
                FROM tutees
                WHERE email = %s AND password = %s""",
            (email, password, email, password),
        )

        result = cur.fetchone()

        cur.close()

        if result is not None:
            user_type = result[0]
            user_id = result[1]
            first_name = result[2]
            last_name = result[3]
            status = result[4]

            if status != "unverified":
                session["id"] = user_id
                session["email"] = email
                session["user_type"] = user_type

                return {
                    "type": user_type,
                    "firstName": first_name,
                    "lastName": last_name,
                    "email": email,
                    "status": status,
                }

            return {"message": "Email not verified"}, 400
        else:
            return {"message": "Did not find a matching email and password"}, 400

    except:
        return {"message": "Error logging in"}, 500


############################################################################################################
# save data from tutor application form
############################################################################################################
@app.route("/save-tutor-application-data", methods=["POST"])
def saveTutorApplicationData():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    data = request.json

    cur = conn.cursor()

    cur.execute(
        """UPDATE tutors 
                SET grade = %s, gender = %s, location = %s, subjects = %s, languages = %s, availability = %s, student_capacity = %s, previous_experience = %s
                WHERE email = %s """,
        (
            data["grade"],
            data["gender"],
            data["location"],
            data["subjects"],
            data["languages"],
            data["availability"],
            data["studentCapacity"],
            data["previousExperience"],
            session["email"],
        ),
    )

    conn.commit()
    cur.close()

    return {"message": "success"}


############################################################################################################
# save tutor application resume
############################################################################################################
@app.route("/save-tutor-application-resume", methods=["POST"])
def saveTutorApplicationResume():
    # get the name of the tutor that's currently logged in
    if "email" not in session:
        print("EMAIL NOT FOUND IN SESSION")
        return {"message": "error", "details": "Email not found in session"}

    print("GET SESSION EMAIL:", session["email"])
    cur = conn.cursor()

    cur.execute(
        """SELECT first_name, last_name
                FROM tutors
                WHERE email = %s """,
        (session["email"],),
    )

    result = cur.fetchone()

    cur.commit()
    cur.close()

    file = request.files["resume"]
    first_name, last_name = result
    object_name = f"{first_name}-{last_name}-Resume.pdf"

    # save file to S3
    s3.upload_fileobj(file, os.environ["TUTOR_APPLICATION_BUCKET_NAME"], object_name)

    print("FILE UPLOADED TO S3")

    return {"message": "success"}


############################################################################################################
# save tutor application report card
############################################################################################################
@app.route("/save-tutor-application-report-card", methods=["POST"])
def saveTutorApplicationReportCard():
    # get the name of the tutor that's currently logged in
    if "email" not in session:
        print("EMAIL NOT FOUND IN SESSION")
        return {"message": "error", "details": "Email not found in session"}

    print("GET SESSION EMAIL:", session["email"])
    cur = conn.cursor()

    cur.execute(
        """SELECT first_name, last_name
                FROM tutors
                WHERE email = %s """,
        (session["email"],),
    )

    result = cur.fetchone()

    cur.commit()
    cur.close()

    # get the file and the name of the tutor
    file = request.files["report-card"]
    first_name, last_name = result
    object_name = f"{first_name}-{last_name}-Report-Card.pdf"

    # save file to S3
    s3.upload_fileobj(file, os.environ["TUTOR_APPLICATION_BUCKET_NAME"], object_name)

    print("FILE UPLOADED TO S3")

    return {"message": "success"}


############################################################################################################
# get profile information
############################################################################################################
@app.route("/get-profile-info", methods=["GET"])
def get_profile_info():
    if is_session_valid(session):
        user_type = session.get("user_type")

        fields = (
            "first_name, last_name, email, grade, gender, location, subjects, languages, availability, student_capacity, previous_experience, signup_date"
            if user_type == "tutor"
            else "first_name, last_name, email, grade, gender, location, subjects, languages, availability, additional_information, signup_date"
        )

        cur = conn.cursor()

        try:
            cur.execute(
                """SELECT %s FROM %s WHERE id = %%s AND email = %%s"""
                % (fields, f"{user_type}s"),
                (session.get("id"), session.get("email")),
            )

            result = cur.fetchone()

            cur.close()

            if result:
                return {
                    "firstName": result[0],
                    "lastName": result[1],
                    "email": result[2],
                    "grade": result[3],
                    "gender": result[4],
                    "location": result[5],
                    "subjects": result[6],
                    "languages": result[7],
                    "availability": result[8],
                } | (
                    {
                        "studentCapacity": result[9],
                        "previousExperience": result[10],
                        "signupDate": result[11],
                    }
                    if user_type == "tutor"
                    else {"additionalInformation": result[9], "signupDate": result[10]}
                )

            return {"message": "Error getting user from session"}, 400

        except Exception as e:
            print(e)
            cur.close()
            return {"message": "Error getting user profile"}, 500

    return {"message": "No session found"}, 400


############################################################################################################
# get upcoming sessions
############################################################################################################
@app.route("/get-upcoming-sessions", methods=["GET"])
def getUpcomingSessions():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    cur = conn.cursor()

    if session["user_type"] == "tutor":
        # get tutor id
        cur.execute(
            """SELECT id
                    FROM tutors
                    WHERE email = %s""",
            (session["email"],),
        )

        tutor_id = cur.fetchone()

        # get all pairing ids associated with the tutor
        cur.execute(
            """SELECT id
                    FROM pairings
                    WHERE tutor_id = %s""",
            (tutor_id,),
        )

        pairing_ids = cur.fetchall()

        for i in range(len(pairing_ids)):
            pairing_ids[i] = pairing_ids[i][0]

        # get all sessions associated with the pairing ids within the next 2 weeks
        cur.execute(
            """SELECT id
                    FROM sessions
                    WHERE pairing_id = ANY(%s) AND date >= CURRENT_DATE AND date <= CURRENT_DATE + INTERVAL '14 days' """,
            (pairing_ids,),
        )

        session_ids = cur.fetchall()

        for i in range(len(session_ids)):
            session_ids[i] = session_ids[i][0]

        # get the upcoming session card data
        cur.execute(
            """SELECT sessions.id, tutees.first_name, tutees.last_name, pairings.subject, sessions.date, sessions.start_time, sessions.end_time, sessions.meeting_link
                    FROM tutees
                    JOIN pairings
                    ON tutees.id = pairings.tutee_id
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    WHERE sessions.id = ANY(%s)
                    ORDER BY sessions.date, sessions.start_time""",
            (session_ids,),
        )

        upcoming_sessions = cur.fetchall()

        # convert into a list of dictionaries
        result = []
        for row in upcoming_sessions:
            upcoming_session = {
                "sessionID": row[0],
                "tuteeFirstName": row[1],
                "tuteeLastName": row[2],
                "subject": row[3],
                "month": row[4].strftime("%B"),
                "day": row[4].strftime("%d"),
                "year": row[4].strftime("%Y"),
                "startTime": row[5].strftime("%I:%M %p"),
                "endTime": row[6].strftime("%I:%M %p"),
                "meetingLink": row[7],
            }

            result.append(upcoming_session)

    if session["user_type"] == "tutee":
        # get tutee id
        cur.execute(
            """SELECT id
                    FROM tutees
                    WHERE email = %s""",
            (session["email"],),
        )

        tutor_id = cur.fetchone()

        # get all pairing ids associated with the tutee
        cur.execute(
            """SELECT id
                    FROM pairings
                    WHERE tutee_id = %s""",
            (tutor_id,),
        )

        pairing_ids = cur.fetchall()

        for i in range(len(pairing_ids)):
            pairing_ids[i] = pairing_ids[i][0]

        # get all sessions associated with the pairing ids within the next 2 weeks
        cur.execute(
            """SELECT id
                    FROM sessions
                    WHERE pairing_id = ANY(%s) AND date >= CURRENT_DATE AND date <= CURRENT_DATE + INTERVAL '14 days' """,
            (pairing_ids,),
        )

        session_ids = cur.fetchall()

        for i in range(len(session_ids)):
            session_ids[i] = session_ids[i][0]

        # get the upcoming session card data
        cur.execute(
            """SELECT sessions.id, tutors.first_name, tutors.last_name, pairings.subject, sessions.date, sessions.start_time, sessions.end_time, sessions.meeting_link
                    FROM tutors 
                    JOIN pairings
                    ON tutors.id = pairings.tutor_id
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    WHERE sessions.id = ANY(%s)
                    ORDER BY sessions.date, sessions.start_time""",
            (session_ids,),
        )

        upcoming_sessions = cur.fetchall()

        # convert into a list of dictionaries
        result = []
        for row in upcoming_sessions:
            upcoming_session = {
                "sessionID": row[0],
                "tutorFirstName": row[1],
                "tutorLastName": row[2],
                "subject": row[3],
                "month": row[4].strftime("%B"),
                "day": row[4].strftime("%d"),
                "year": row[4].strftime("%Y"),
                "startTime": row[5].strftime("%I:%M %p"),
                "endTime": row[6].strftime("%I:%M %p"),
                "meetingLink": row[7],
            }

            result.append(upcoming_session)

    cur.close()

    return result


############################################################################################################
# get lesson plan/session notes
############################################################################################################
@app.route("/get-editor-content", methods=["GET"])
def getEditorContent():
    session_id = request.args.get("sessionID")
    type = request.args.get("type")

    print(session_id)
    print(type)
    cur = conn.cursor()

    if type == "Lesson Plan":
        cur.execute(
            """SELECT lesson_plan
                    FROM sessions
                    WHERE id = %s""",
            (session_id,),
        )

    if type == "Session Notes":
        cur.execute(
            """SELECT session_notes
                FROM sessions
                WHERE id = %s""",
            (session_id,),
        )

    result = cur.fetchall()
    cur.close()

    print(result)

    return result


############################################################################################################
# save lesson plan/session notes
############################################################################################################
@app.route("/save-editor-content", methods=["POST"])
def saveEditorContent():
    data = request.json
    cur = conn.cursor()

    if data["type"] == "Lesson Plan":
        cur.execute(
            """UPDATE sessions
                    SET lesson_plan = %s
                    WHERE id = %s""",
            (
                data["content"],
                data["sessionID"],
            ),
        )

    if data["type"] == "Session Notes":
        cur.execute(
            """UPDATE sessions
                SET session_notes = %s
                WHERE id = %s""",
            (
                data["content"],
                data["sessionID"],
            ),
        )

    conn.commit()
    cur.close()

    return {"message": "success"}


############################################################################################################
# get all of the tutor's tutees or all of the tutee's subjects
############################################################################################################
@app.route("/get-commitments", methods=["GET"])
def getCommitments():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    cur = conn.cursor()

    if session["user_type"] == "tutor":
        # get tutor id
        cur.execute(
            """SELECT id
                    FROM tutors
                    WHERE email = %s""",
            (session["email"],),
        )

        tutor_id = cur.fetchone()

        # get all pairing ids associated with the tutor
        cur.execute(
            """SELECT id
                    FROM pairings
                    WHERE tutor_id = %s""",
            (tutor_id,),
        )

        pairing_ids = cur.fetchall()

        # get all tutees associated with the pairing ids
        cur.execute(
            """SELECT pairings.id, pairings.subject, pairings.meeting_days, tutees.first_name, tutees.last_name, tutees.email, tutees.grade, tutees.languages
                    FROM pairings
                    JOIN tutees
                    ON pairings.tutee_id = tutees.id
                    WHERE pairings.id = ANY(%s)""",
            (pairing_ids,),
        )

        tutees = cur.fetchall()

        result = []

        for row in tutees:
            tutee = {
                "pairingID": row[0],
                "subject": row[1],
                "meetingDays": row[2],
                "tuteeFirstName": row[3],
                "tuteeLastName": row[4],
                "tuteeEmail": row[5],
                "tuteeGrade": row[6],
                "tuteeLanguages": row[7],
            }

            result.append(tutee)

    if session["user_type"] == "tutee":
        # get tutee id
        cur.execute(
            """SELECT id
                    FROM tutees
                    WHERE email = %s""",
            (session["email"],),
        )

        tutee_id = cur.fetchone()

        # get all pairing ids associated with the tutee
        cur.execute(
            """SELECT id
                    FROM pairings
                    WHERE tutee_id = %s""",
            (tutee_id,),
        )

        pairing_ids = cur.fetchall()

        # get all subjects associated with the pairing ids
        cur.execute(
            """SELECT pairings.id, pairings.subject, pairings.meeting_days, tutors.first_name, tutors.last_name, tutors.email, tutors.languages
                    FROM pairings
                    JOIN tutors
                    ON pairings.tutor_id = tutors.id
                    WHERE pairings.id = ANY(%s)""",
            (pairing_ids,),
        )

        subjects = cur.fetchall()

        result = []

        for row in subjects:
            subject = {
                "pairingID": row[0],
                "subject": row[1],
                "meetingDays": row[2],
                "tutorFirstName": row[3],
                "tutorLastName": row[4],
                "tutorEmail": row[5],
                "tutorLanguages": row[6],
            }

            result.append(subject)

    cur.close()

    return result


############################################################################################################
# get tutoring history
############################################################################################################
@app.route("/get-tutoring-history", methods=["GET"])
def getTutoringHistory():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    pairing_id = request.args.get("pairingID")

    cur = conn.cursor()

    if session["user_type"] == "tutor":
        # get all sessions associated with the pairing id
        cur.execute(
            """SELECT sessions.date, sessions.id, tutees.first_name, tutees.last_name
                    FROM pairings
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    JOIN tutees
                    ON pairings.tutee_id = tutees.id
                    WHERE pairings.id = %s AND sessions.date < CURRENT_DATE 
                    ORDER BY sessions.date DESC""",
            (pairing_id,),
        )

        sessions = cur.fetchall()

        result = []

        for row in sessions:
            s = {
                "date": row[0].strftime("%Y-%m-%d"),
                "month": row[0].strftime("%B"),
                "day": row[0].strftime("%d"),
                "year": row[0].strftime("%Y"),
                "sessionID": row[1],
                "tuteeFirstName": row[2],
                "tuteeLastName": row[3],
            }

            result.append(s)

    if session["user_type"] == "tutee":
        # get all sessions associated with the pairing id
        cur.execute(
            """SELECT sessions.date, sessions.id, tutors.first_name, tutors.last_name
                    FROM pairings
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    JOIN tutors
                    ON pairings.tutor_id = tutors.id
                    WHERE pairings.id = %s AND sessions.date < CURRENT_DATE 
                    ORDER BY sessions.date DESC""",
            (pairing_id,),
        )

        sessions = cur.fetchall()

        result = []

        for row in sessions:
            s = {
                "date": row[0].strftime("%Y-%m-%d"),
                "month": row[0].strftime("%B"),
                "day": row[0].strftime("%d"),
                "year": row[0].strftime("%Y"),
                "sessionID": row[1],
                "tutorFirstName": row[2],
                "tutorLastName": row[3],
            }

            result.append(s)

    if session["user_type"] == "admin":
        # get all sessions associated with the pairing id
        cur.execute(
            """SELECT sessions.date, sessions.id, tutors.first_name, tutors.last_name, tutees.first_name, tutees.last_name
                    FROM pairings
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    JOIN tutors
                    ON pairings.tutor_id = tutors.id
                    JOIN tutees
                    ON pairings.tutee_id = tutees.id
                    WHERE pairings.id = %s AND sessions.date < CURRENT_DATE 
                    ORDER BY sessions.date DESC""",
            (pairing_id,),
        )

        sessions = cur.fetchall()

        result = []

        for row in sessions:
            s = {
                "date": row[0].strftime("%Y-%m-%d"),
                "month": row[0].strftime("%B"),
                "day": row[0].strftime("%d"),
                "year": row[0].strftime("%Y"),
                "sessionID": row[1],
                "tutorFirstName": row[2],
                "tutorLastName": row[3],
                "tuteeFirstName": row[4],
                "tuteeLastName": row[5],
            }

            result.append(s)

    cur.close()

    return result


############################################################################################################
# save volunteer hours data
############################################################################################################
@app.route("/save-volunteer-hours-data", methods=["POST"])
def saveVolunteerHoursData():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    data = request.json

    cur = conn.cursor()

    cur.execute(
        """INSERT INTO volunteer_hours_requests (date_submitted, tutor_id, num_hours, status, description)
                VALUES (%s, (SELECT id FROM tutors WHERE email = %s), %s, %s, %s)""",
        (
            data["dateSubmitted"],
            session["email"],
            data["numHours"],
            data["status"],
            data["description"],
        ),
    )

    conn.commit()
    cur.close()

    return {"message": "success"}


############################################################################################################
# save volunteer hours request form
############################################################################################################
@app.route("/save-volunteer-hours-request-form", methods=["POST"])
def saveVolunteerHoursRequestForm():
    # get the name of the tutor that's currently logged in
    if "email" not in session:
        print("EMAIL NOT FOUND IN SESSION")
        return {"message": "error", "details": "Email not found in session"}

    print("GET SESSION EMAIL:", session["email"])
    cur = conn.cursor()

    cur.execute(
        """SELECT first_name, last_name
                FROM tutors
                WHERE email = %s """,
        (session["email"],),
    )

    result = cur.fetchone()

    cur.commit()
    cur.close()

    # get the file, name of the tutor, and the current date
    file = request.files["volunteer-hours-form"]
    first_name, last_name = result
    current_date = date.today()
    object_name = f"{first_name}-{last_name}-{current_date}-Volunteer-Hours-Request.pdf"

    # save file to S3
    s3.upload_fileobj(
        file, os.environ["VOLUNTEER_HOURS_REQUESTS_BUCKET_NAME"], object_name
    )

    print("FILE UPLOADED TO S3")

    return {"message": "success"}


############################################################################################################
# get past volunteer requests
############################################################################################################
@app.route("/get-past-volunteer-hours-request-history", methods=["GET"])
def getPastVolunteerHoursRequestHistory():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    cur = conn.cursor()

    cur.execute(
        """SELECT id
                FROM tutors 
                WHERE email = %s""",
        (session["email"],),
    )

    tutor_id = cur.fetchone()

    cur.execute(
        """SELECT date_submitted, num_hours, status
                FROM volunteer_hours_requests
                WHERE tutor_id = %s""",
        (tutor_id,),
    )

    past_requests = cur.fetchall()

    result = []
    for row in past_requests:
        date_submitted = row[0].strftime("%Y-%m-%d")

        past_request = {
            "dateSubmitted": date_submitted,
            "numHours": row[1],
            "status": row[2],
        }

        result.append(past_request)

    cur.close()

    return result


############################################################################################################
# get tutors
############################################################################################################
@app.route("/get-tutors", methods=["GET"])
def getTutors():
    cur = conn.cursor()

    cur.execute(
        """SELECT first_name, last_name, email, grade, gender, location, subjects, languages, availability, student_capacity
                FROM tutors
                ORDER BY first_name"""
    )

    tutors = cur.fetchall()

    result = []

    for tutor in tutors:
        t = {
            "firstName": tutor[0],
            "lastName": tutor[1],
            "email": tutor[2],
            "grade": tutor[3],
            "gender": tutor[4],
            "location": tutor[5],
            "subjects": tutor[6],
            "languages": tutor[7],
            "availability": tutor[8],
            "studentCapacity": tutor[9],
        }

        result.append(t)

    cur.close()

    return result


############################################################################################################
# get tutees
############################################################################################################
@app.route("/get-tutees", methods=["GET"])
def getTutees():
    cur = conn.cursor()

    cur.execute(
        """SELECT first_name, last_name, email, grade, gender, location, subjects, languages, availability
                FROM tutees
                ORDER BY first_name"""
    )

    tutees = cur.fetchall()

    result = []

    for tutee in tutees:
        t = {
            "firstName": tutee[0],
            "lastName": tutee[1],
            "email": tutee[2],
            "grade": tutee[3],
            "gender": tutee[4],
            "location": tutee[5],
            "subjects": tutee[6],
            "languages": tutee[7],
            "availability": tutee[8],
        }

        result.append(t)

    cur.close()

    return result


############################################################################################################
# get pairings
############################################################################################################
@app.route("/get-pairings", methods=["GET"])
def getPairings():
    cur = conn.cursor()

    cur.execute(
        """SELECT tutors.first_name, tutors.last_name, tutees.first_name, tutees.last_name, pairings.id
                FROM pairings
                JOIN tutors
                ON pairings.tutor_id = tutors.id
                JOIN tutees
                ON pairings.tutee_id = tutees.id"""
    )

    pairings = cur.fetchall()

    result = []

    for pairing in pairings:
        p = {
            "tutorFirstName": pairing[0],
            "tutorLastName": pairing[1],
            "tuteeFirstName": pairing[2],
            "tuteeLastName": pairing[3],
            "pairingID": pairing[4],
        }

        result.append(p)

    cur.close()

    return result


############################################################################################################
# get pending volunteer hours requests
############################################################################################################
@app.route("/get-pending-volunteer-hours-requests", methods=["GET"])
def getPendingVolunteerHoursRequests():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    cur = conn.cursor()

    cur.execute(
        """SELECT v.id, v.date_submitted, v.num_hours, tutors.first_name, tutors.last_name
                FROM volunteer_hours_requests AS v
                JOIN tutors
                ON v.tutor_id = tutors.id
                WHERE v.status = %s""",
        ("Pending",),
    )

    pending_requests = cur.fetchall()

    result = []
    for row in pending_requests:
        date_submitted = row[1].strftime("%Y-%m-%d")

        r = {
            "requestID": row[0],
            "dateSubmitted": date_submitted,
            "numHours": row[2],
            "tutorFirstName": row[3],
            "tutorLastName": row[4],
        }

        result.append(r)

    # print("VOLUNTEER HOURS REQUEST HISTORY:", result)

    cur.close()

    return result


############################################################################################################
# get data for a given volunteer hours request
############################################################################################################
@app.route("/get-hours-request-data", methods=["GET"])
def getHoursRequestData():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    request_id = request.args.get("requestID")

    cur = conn.cursor()

    cur.execute(
        """SELECT v.date_submitted, v.num_hours, tutors.first_name, tutors.last_name, v.description
                FROM volunteer_hours_requests AS v
                JOIN tutors
                ON v.tutor_id = tutors.id
                WHERE v.id = %s""",
        (request_id,),
    )

    r = cur.fetchone()
    date_submitted = r[0].strftime("%Y-%m-%d")

    result = {
        "dateSubmitted": date_submitted,
        "numHours": r[1],
        "tutorFirstName": r[2],
        "tutorLastName": r[3],
        "description": r[4],
    }

    cur.close()

    return result


############################################################################################################
# get custom volunteer hours form, if exists
############################################################################################################
@app.route("/get-volunteer-hours-form", methods=["GET"])
def getVolunteerHoursForm():
    if "email" not in session:
        return {"message": "error", "details": "Email not found in session"}

    request_id = request.args.get("requestID")

    cur = conn.cursor()

    cur.execute(
        """SELECT tutors.first_name, tutors.last_name, v.date_submitted
                FROM volunteer_hours_requests AS v
                JOIN tutors
                ON v.tutor_id = tutors.id
                WHERE v.id = %s""",
        (request_id,),
    )

    r = cur.fetchone()
    cur.close()

    # get the file name it was saved as
    object_name = f"{r[0]}-{r[1]}-{r[2]}-Volunteer-Hours-Request.pdf"
    local_file_path = f"{object_name}"
    default_file_path = f"../frontend/src/assets/default-volunteer-hours-form.pdf"

    # see if if the file exists in S3
    try:
        s3.head_object(
            Bucket=os.environ["VOLUNTEER_HOURS_REQUESTS_BUCKET_NAME"], Key=object_name
        )
        file_exists = True
    except s3.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "404":
            file_exists = False
        else:
            return (
                {"message": "error", "details": "Error fetching file from S3"},
                500,
            )

    if file_exists:
        with open(object_name, "wb") as f:
            s3.download_fileobj(
                os.environ["VOLUNTEER_HOURS_REQUESTS_BUCKET_NAME"], object_name, f
            )

        # download the file to a temporary path
        # return a response object that represents the file download
        return send_file(local_file_path, as_attachment=True, download_name=object_name)
    else:
        return send_file(
            default_file_path, as_attachment=True, download_name=object_name
        )


############################################################################################################
# save volunteer hours approval form
############################################################################################################
@app.route("/save-volunteer-hours-approval-form", methods=["POST"])
def saveVolunteerHoursApprovalForm():
    request_id = request.form["requestID"]

    cur = conn.cursor()

    cur.execute(
        """SELECT tutors.first_name, tutors.last_name, v.date_submitted
                FROM tutors
                JOIN volunteer_hours_requests AS v
                ON v.tutor_id = tutors.id
                WHERE v.id = %s """,
        (request_id,),
    )

    result = cur.fetchone()
    cur.close()

    file = request.files["volunteer-hours-form"]
    first_name, last_name, date = result
    object_name = f"{first_name}-{last_name}-{date}-Volunteer-Hours-Approval.pdf"

    # save file to S3
    s3.upload_fileobj(
        file, os.environ["VOLUNTEER_HOURS_APPROVALS_BUCKET_NAME"], object_name
    )

    print("FILE UPLOADED TO S3")

    return {"message": "success"}


############################################################################################################
# log out
############################################################################################################
@app.route("/log-out", methods=["GET", "POST"])
def logOut():
    if not is_session_valid(session):
        return {"message": "Not logged in"}, 400

    session.clear()
    return {"message": "Logged out"}


if __name__ == "__main__":
    app.run(debug=(os.environ["ENVIRONMENT"] == "development"), port=os.environ["PORT"])
