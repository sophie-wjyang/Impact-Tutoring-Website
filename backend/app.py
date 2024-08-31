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


############################################################################################################
# get user object
############################################################################################################
@app.route("/get-user", methods=["GET"])
def getUser():
    if not is_session_valid(session):
        # this endpoint is expected to be called for unauthenticated requests so we won't return an error code here
        return {"message": "No user session found"}

    user_type = session.get("user_type")

    if user_type == "admin":
        return {
            "type": "admin",
            "firstName": "Impact",
            "lastName": "Tutoring",
            "email": session.get("email"),
            "status": "accepted",
        }

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

        return {"message": "User not found"}, 500

    except:
        return {"message": "Error getting user from session"}, 500


############################################################################################################
# save sign up form data to database
############################################################################################################
@app.route("/save-signup-form-data", methods=["POST"])
def save_signup_form_data():
    if is_session_valid(session):
        return {"message": "Already logged in"}, 400

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

        # insert the new user into the database
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

        # create an email confirmation code for the new user
        if result:
            code = create_email_confirmation_code(
                cur, user_id=result[0], user_type=user_type, email=email
            )
            mailer.send_email(
                "Please click the following link to confirm your email: {}/confirm-email?code={}".format(
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


@app.route("/confirm-email", methods=["GET"])
def confirm_email():
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

        # if the code exists and hasn't expired, update the user's status to be verified
        if result and result[2] >= datetime.now():
            cur.execute(
                """UPDATE %ss SET status = 'verified' WHERE id = %%s""" % result[1],
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
            return {
                "message": "We couldn't find an account matching the email and password you entered. Please verify your credentials are correct, or sign up ssfor an account."
            }, 400

    except:
        return {"message": "Error logging in"}, 500


############################################################################################################
# save data from tutor application form
############################################################################################################
@app.route("/save-tutor-application-data", methods=["POST"])
def save_tutor_application_data():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "tutor":
        return {"message": "Not logged in as tutor"}, 403

    data = request.json

    if (
        data["grade"] is None
        or data["gender"] is None
        or data["location"] is None
        or data["subjects"] is None
        or data["languages"] is None
        or data["availability"] is None
        or data["studentCapacity"] is None
        or data["previousExperience"] is None
    ):
        return {"message": "Missing data"}, 400

    cur = conn.cursor()

    try:
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
                session.get("email"),
            ),
        )

        conn.commit()
        cur.close()

        return {"message": "Updated tutor data"}

    except:
        conn.rollback()
        cur.close()

        return {"message": "Error updating tutor data"}, 500


############################################################################################################
# save tutor application resume
############################################################################################################
@app.route("/save-tutor-application-resume", methods=["POST"])
def save_tutor_application_resume():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "tutor":
        return {"message": "Not logged in as tutor"}, 403

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT first_name, last_name
                    FROM tutors
                    WHERE email = %s """,
            (session["email"],),
        )

        result = cur.fetchone()

        file = request.files["resume"]
        first_name, last_name = result
        object_name = f"{first_name}-{last_name}-Resume.pdf"

        # save file to S3
        s3.upload_fileobj(
            file, os.environ["TUTOR_APPLICATION_BUCKET_NAME"], object_name
        )

        cur.close()

        return {"message": "Saved resume"}

    except:
        cur.close()
        return {"message": "Error saving resume"}, 500


############################################################################################################
# save tutor application report card
############################################################################################################
@app.route("/save-tutor-application-report-card", methods=["POST"])
def save_tutor_application_report_card():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "tutor":
        return {"message": "Not logged in as tutor"}, 403

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT first_name, last_name
                    FROM tutors
                    WHERE email = %s """,
            (session["email"],),
        )

        result = cur.fetchone()

        # get the file and the name of the tutor
        file = request.files["report-card"]
        first_name, last_name = result
        object_name = f"{first_name}-{last_name}-Report-Card.pdf"

        # save file to S3
        s3.upload_fileobj(
            file, os.environ["TUTOR_APPLICATION_BUCKET_NAME"], object_name
        )

        cur.close()

        return {"message": "Saved report card"}

    except:
        cur.close()
        return {"message": "Error saving report card"}, 500


############################################################################################################
# get profile information
############################################################################################################
@app.route("/get-profile-info", methods=["GET"])
def get_profile_info():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    user_type = session.get("user_type")

    if user_type == "admin":
        return {"message": "Not logged in as tutor or tutee"}, 403

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

        # conditionally return the additional fields for tutors or tutees and merge them with the common fields
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

        return {"message": "User not found"}, 500

    except:
        cur.close()
        return {"message": "Error getting user profile"}, 500


############################################################################################################
# get upcoming sessions
############################################################################################################
@app.route("/get-upcoming-sessions", methods=["GET"])
def get_upcoming_sessions():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    user_id = session.get("id")
    user_type = session.get("user_type")

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT id FROM pairings WHERE %s_id = %%s""" % user_type,
            (user_id,),
        )

        pairing_ids = list(map(lambda p: p[0], cur.fetchall()))

        # get all sessions associated with the pairing ids within the next 2 weeks
        cur.execute(
            """SELECT id
                    FROM sessions
                    WHERE pairing_id = ANY(%s) AND date >= CURRENT_DATE AND date <= CURRENT_DATE + INTERVAL '14 days' """,
            (pairing_ids,),
        )

        session_ids = list(map(lambda s: s[0], cur.fetchall()))

        result_type = "tutee" if user_type == "tutor" else "tutor"

        # get the upcoming session card data
        cur.execute(
            """SELECT sessions.id, %ss.first_name, %ss.last_name, pairings.subjects, sessions.date, sessions.start_time, sessions.end_time, sessions.meeting_link
                    FROM %ss
                    JOIN pairings
                    ON %ss.id = pairings.%s_id
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    WHERE sessions.id = ANY(%%s)
                    ORDER BY sessions.date, sessions.start_time"""
            % (result_type, result_type, result_type, result_type, result_type),
            (session_ids,),
        )

        result = cur.fetchall()

        upcoming_sessions = list(
            map(
                lambda row: {
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
                },
                result,
            )
        )

        cur.close()

        return upcoming_sessions

    except Exception as e:
        print(e)
        cur.close()
        return {"message": "Error getting upcoming sessions"}, 500


############################################################################################################
# get lesson plan/session notes
############################################################################################################
@app.route("/get-editor-content", methods=["GET"])
def get_editor_content():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    session_id = request.args.get("session_id")
    content_type = request.args.get("content_type")

    if session_id is None or content_type is None:
        return {"message": "Invalid request arguments"}, 400

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT %s FROM sessions WHERE id = %%s""" % content_type, (session_id,)
        )

        result = cur.fetchone()

        cur.close()

        if result[0]:
            return result[0]

        return {"message": "Editor content not found"}, 400

    except:
        cur.close()
        return {"message": "Error getting editor content"}, 500


############################################################################################################
# save lesson plan/session notes
############################################################################################################
@app.route("/save-editor-content", methods=["POST"])
def save_editor_content():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    data = request.json

    session_id = data["session_id"]
    content_type = data["content_type"]
    content = data["content"]

    if session_id is None or content_type is None or content is None:
        return {"message": "Invalid request body"}, 400

    cur = conn.cursor()

    try:
        cur.execute(
            """UPDATE SESSIONS SET %s = %%s WHERE id = %%s""" % content_type,
            (
                content,
                session_id,
            ),
        )

        conn.commit()
        cur.close()

        return {"message": "Updated editor conten"}

    except:
        cur.close()
        return {"message": "Error saving editor content"}, 500


############################################################################################################
# get all of the tutor's tutees or all of the tutee's subjects
############################################################################################################
@app.route("/get-commitments", methods=["GET"])
def get_commitments():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    user_id = session.get("id")
    user_type = session.get("user_type")

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT id FROM pairings WHERE %s_id = %%s""" % user_type, (user_id,)
        )

        pairing_ids = list(map(lambda p: p[0], cur.fetchall()))

        query = (
            """SELECT pairings.id, pairings.subjects, pairings.meeting_days, tutees.first_name, tutees.last_name, tutees.email, tutees.grade, tutees.languages
                    FROM pairings
                    JOIN tutees
                    ON pairings.tutee_id = tutees.id
                    WHERE pairings.id = ANY(%s)"""
            if user_type == "tutor"
            else """SELECT pairings.id, pairings.subjects, pairings.meeting_days, tutors.first_name, tutors.last_name, tutors.email, tutors.languages
                    FROM pairings
                    JOIN tutors
                    ON pairings.tutor_id = tutors.id
                    WHERE pairings.id = ANY(%s)"""
        )

        cur.execute(query, (pairing_ids,))

        result = cur.fetchall()

        cur.close()

        return list(
            map(
                lambda row: (
                    {
                        "pairingID": row[0],
                        "subject": row[1],
                        "meetingDays": row[2],
                        "tuteeFirstName": row[3],
                        "tuteeLastName": row[4],
                        "tuteeEmail": row[5],
                        "tuteeGrade": row[6],
                        "tuteeLanguages": row[7],
                    }
                    if user_type == "tutor"
                    else {
                        "pairingID": row[0],
                        "subject": row[1],
                        "meetingDays": row[2],
                        "tutorFirstName": row[3],
                        "tutorLastName": row[4],
                        "tutorEmail": row[5],
                        "tutorLanguages": row[6],
                    }
                ),
                result,
            )
        )

    except Exception as e:
        print(e)
        cur.close()
        return {"message": "Error getting commitments"}, 500


############################################################################################################
# get tutoring history
############################################################################################################
@app.route("/get-tutoring-history", methods=["GET"])
def get_tutoring_history():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    pairing_id = request.args.get("pairing_id")

    if pairing_id is None:
        return {"message": "Invalid request arguments"}, 400

    user_type = session.get("user_type")

    cur = conn.cursor()

    try:
        query = (
            """SELECT sessions.date, sessions.id, tutees.first_name, tutees.last_name
                    FROM pairings
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    JOIN tutees
                    ON pairings.tutee_id = tutees.id
                    WHERE pairings.id = %s AND sessions.date < CURRENT_DATE 
                    ORDER BY sessions.date DESC"""
            if user_type == "tutor"
            else """SELECT sessions.date, sessions.id, tutors.first_name, tutors.last_name
                    FROM pairings
                    JOIN sessions
                    ON pairings.id = sessions.pairing_id
                    JOIN tutors
                    ON pairings.tutor_id = tutors.id
                    WHERE pairings.id = %s AND sessions.date < CURRENT_DATE 
                    ORDER BY sessions.date DESC"""
        )

        cur.execute(query, (pairing_id,))

        result = cur.fetchall()

        cur.close()

        return list(
            map(
                lambda row: (
                    {
                        "date": row[0].strftime("%Y-%m-%d"),
                        "month": row[0].strftime("%B"),
                        "day": row[0].strftime("%d"),
                        "year": row[0].strftime("%Y"),
                        "sessionID": row[1],
                        "tuteeFirstName": row[2],
                        "tuteeLastName": row[3],
                    }
                    if user_type == "tutor"
                    else {
                        "date": row[0].strftime("%Y-%m-%d"),
                        "month": row[0].strftime("%B"),
                        "day": row[0].strftime("%d"),
                        "year": row[0].strftime("%Y"),
                        "sessionID": row[1],
                        "tutorFirstName": row[2],
                        "tutorLastName": row[3],
                    }
                ),
                result,
            )
        )

    except:
        cur.close()
        return {"message": "Error getting tutoring history"}, 500


############################################################################################################
# save volunteer hours data
############################################################################################################
@app.route("/save-volunteer-hours-data", methods=["POST"])
def save_volunteer_hours_data():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "tutor":
        return {"message": "Not logged in as tutor"}, 403

    data = request.json

    if (
        data["dateSubmitted"] is None
        or data["numHours"] is None
        or data["status"] is None
        or data["description"] is None
    ):
        return {"message": "Invalid request body"}, 400

    cur = conn.cursor()

    try:
        cur.execute(
            """INSERT INTO volunteer_hours_requests (created_at, tutor_id, num_hours, status, description)
                    VALUES (%s, %s, %s, %s, %s)""",
            (
                data["dateSubmitted"],
                session.get("id"),
                data["numHours"],
                data["status"],
                data["description"],
            ),
        )

        conn.commit()
        cur.close()

        return {"message": "Saved volunteer hours data"}
    except:
        conn.rollback()
        cur.close()

        return {"message": "Error saving volunteer hours data"}, 500


############################################################################################################
# save volunteer hours request form
############################################################################################################
@app.route("/save-volunteer-hours-request-form", methods=["POST"])
def save_volunteer_hours_request_form():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "tutor":
        return {"message": "Not logged in as tutor"}, 403

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT first_name, last_name
                    FROM tutors
                    WHERE id = %s""",
            (session.get("id"),),
        )

        result = cur.fetchone()

        if result is None:
            return {"message": "Tutor not found"}, 400

        # get the file, name of the tutor, and the current date
        file = request.files["volunteer-hours-form"]
        first_name, last_name = result
        current_date = date.today()
        object_name = (
            f"{first_name}-{last_name}-{current_date}-Volunteer-Hours-Request.pdf"
        )

        # save file to S3
        s3.upload_fileobj(
            file, os.environ["VOLUNTEER_HOURS_REQUESTS_BUCKET_NAME"], object_name
        )

        cur.close()

        return {"message": "Saved volunteer hours request form"}

    except:
        cur.close()
        return {"message": "Error saving volunteer hours request form"}, 500


############################################################################################################
# get past volunteer requests
############################################################################################################
@app.route("/get-past-volunteer-hours-request-history", methods=["GET"])
def get_past_volunteer_hours_request_history():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "tutor":
        return {"message": "Not logged in as tutor"}, 403

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT created_at, num_hours, status
                    FROM volunteer_hours_requests
                    WHERE tutor_id = %s""",
            (session.get("id"),),
        )

        result = cur.fetchall()

        cur.close()

        return list(
            map(
                lambda row: {
                    "dateSubmitted": row[0].strftime("%Y-%m-%d"),
                    "numHours": row[1],
                    "status": row[2],
                },
                result,
            )
        )

    except Exception as e:
        print(e)
        cur.close()
        return {"message": "Error getting past volunteer hours requests"}, 500


############################################################################################################
# get tutors
############################################################################################################
@app.route("/get-tutors", methods=["GET"])
def get_tutors():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "admin":
        return {"message": "Not logged in as admin"}, 403

    cur = conn.cursor()

    try:
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

        if result:
            return result

        return {"message": "Tutors not found"}, 400

    except:
        cur.close()
        return {"message": "Error fetching tutors"}, 500


############################################################################################################
# get tutees
############################################################################################################
@app.route("/get-tutees", methods=["GET"])
def get_tutees():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "admin":
        return {"message": "Not logged in as admin"}, 403

    cur = conn.cursor()

    try:
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

        if result:
            return result

        return {"message": "Tutors not found"}, 400

    except:
        return {"message": "Error fetching tutees"}, 500


############################################################################################################
# get pairings
############################################################################################################
@app.route("/get-pairings", methods=["GET"])
def get_pairings():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "admin":
        return {"message": "Not logged in as admin"}, 403

    cur = conn.cursor()

    try:
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

        if result:
            return result

        return {"message": "Pairings not found"}, 400

    except:
        cur.close()
        return {"message": "Error fetching pairings"}, 500


############################################################################################################
# get pending volunteer hours requests
############################################################################################################
@app.route("/get-pending-volunteer-hours-requests", methods=["GET"])
def get_pending_volunteer_hours_requests():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "admin":
        return {"message": "Not logged in as admin"}, 403

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT v.id, v.created_at, v.num_hours, tutors.first_name, tutors.last_name
                    FROM volunteer_hours_requests AS v
                    JOIN tutors
                    ON v.tutor_id = tutors.id
                    WHERE v.status = %s""",
            ("Pending",),
        )

        result = cur.fetchall()

        cur.close()

        return list(
            map(
                lambda row: {
                    "requestID": row[0],
                    "dateSubmitted": row[1].strftime("%Y-%m-%d"),
                    "numHours": row[2],
                    "tutorFirstName": row[3],
                    "tutorLastName": row[4],
                },
                result,
            )
        )

    except:
        cur.close()
        return {"message": "Error fetching pending volunteer hours requests"}, 500


############################################################################################################
# get data for a given volunteer hours request
############################################################################################################
@app.route("/get-hours-request-data", methods=["GET"])
def get_hours_request_data():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "admin":
        return {"message": "Not logged in as admin"}, 403

    request_id = request.args.get("request_id")

    if request_id is None:
        return {"message": "Invalid request ID"}, 400

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT v.created_at, v.num_hours, tutors.first_name, tutors.last_name, v.description
                    FROM volunteer_hours_requests AS v
                    JOIN tutors
                    ON v.tutor_id = tutors.id
                    WHERE v.id = %s""",
            (request_id,),
        )

        result = cur.fetchone()

        cur.close()

        return {
            "dateSubmitted": result[0].strftime("%Y-%m-%d"),
            "numHours": result[1],
            "tutorFirstName": result[2],
            "tutorLastName": result[3],
            "description": result[4],
        }

    except:
        cur.close()
        return {"message": "Error fetching volunteer hours request data"}, 500


############################################################################################################
# get custom volunteer hours form, if exists
############################################################################################################
@app.route("/get-volunteer-hours-form", methods=["GET"])
def get_volunteer_hours_form():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "admin":
        return {"message": "Not logged in as admin"}, 403

    request_id = request.args.get("request_id")

    if request_id is None:
        return {"message": "Invalid request ID"}, 400

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT tutors.first_name, tutors.last_name, v.created_at
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
                Bucket=os.environ["VOLUNTEER_HOURS_REQUESTS_BUCKET_NAME"],
                Key=object_name,
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
            return send_file(
                local_file_path, as_attachment=True, download_name=object_name
            )
        else:
            return send_file(
                default_file_path, as_attachment=True, download_name=object_name
            )

    except:
        cur.close()
        return {"message": "Error fetching volunteer hours form"}, 500


############################################################################################################
# save volunteer hours approval form
############################################################################################################
@app.route("/save-volunteer-hours-approval-form", methods=["POST"])
def save_volunteer_hours_approval_form():
    if not is_session_valid(session):
        return {"message": "No session found"}, 401

    if session.get("user_type") != "admin":
        return {"message": "Not logged in as admin"}, 403

    request_id = request.form["request_id"]

    if request_id is None:
        return {"message": "Invalid request ID"}, 400

    cur = conn.cursor()

    try:
        cur.execute(
            """SELECT tutors.first_name, tutors.last_name, v.created_at
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

        return {"message": "success"}

    except:
        cur.close()
        return {"message": "Error saving volunteer hours approval form"}, 500


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
    app.run(
        debug=(os.environ["ENVIRONMENT"] == "development"),
        port=os.environ["PORT"],
        ssl_context=(os.environ["SSL_CERTIFICATE"], os.environ["SSL_KEY"]),
    )
