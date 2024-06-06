from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_cors import CORS, cross_origin
import os 
import psycopg2
import boto3
from datetime import date

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
CORS(app)

# connect to database   
# os is used to access environment variables, so that the database username and password are not visible in the source code
conn = psycopg2.connect(
    host="localhost",
    database="impact_tutoring",
    user=os.environ['DB_USERNAME'],
    password=os.environ['DB_PASSWORD']
)

# create a new S3 client object using aws credentials
s3 = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'], aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])

@app.route('/')
def index():
    return 'index!'


############################################################################################################
# save sign up form data to database
############################################################################################################
@app.route('/save-signup-form-data', methods=['POST'])
def saveSignUpFormData():
    data = request.json
    cur = conn.cursor()

    if data['accountType'] == 'Tutor':
        cur.execute('''INSERT INTO tutors (first_name, last_name, email, password)
                    VALUES (%s, %s, %s, %s)''', (data['firstName'], data['lastName'], data['email'], data['password']))
    
    elif data['accountType'] == 'Tutee':
        cur.execute('''INSERT INTO tutees (first_name, last_name, email, password)
                    VALUES (%s, %s, %s, %s)''', (data['firstName'], data['lastName'], data['email'], data['password']))

    conn.commit()
    cur.close()
    
    return jsonify({'message': 'success'})


############################################################################################################
# validate that email exists in database for login
############################################################################################################
@app.route('/validate-login-form-data', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def validateLoginFormData():
    data = request.json
    cur = conn.cursor()

    cur.execute('''SELECT *
                FROM tutors
                WHERE email = %s and password = %s''', (data['email'], data['password']))

    result = cur.fetchall()

    conn.commit()
    cur.close()

    if result:
        # set the current session
        session['email'] = data['email']
        return jsonify({'message': 'success'})
    else:
        return jsonify({'message': 'error', 'details': 'Did not find matching email and password'})




############################################################################################################
# save data from tutor application form
############################################################################################################
@app.route('/save-tutor-application-data', methods=['POST'])
@cross_origin(supports_credentials=True)
def saveTutorApplicationData():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})
    
    data = request.json

    cur = conn.cursor()

    cur.execute('''UPDATE tutors 
                SET grade = %s, gender = %s, location = %s, subjects = %s, languages = %s, availability = %s, student_capacity = %s, previous_experience = %s
                WHERE email = %s ''', (data['grade'], data['gender'], data['location'], data['subjects'], data['languages'], data['availability'], data['studentCapacity'], data['previousExperience'], session['email']))

    conn.commit()
    cur.close()
    
    return jsonify({'message': 'success'})


############################################################################################################
# save tutor application resume
############################################################################################################
@app.route('/save-tutor-application-resume', methods=['POST'])
@cross_origin(supports_credentials=True)
def saveTutorApplicationResume():
    # get the name of the tutor that's currently logged in
    if 'email' not in session:
        print("EMAIL NOT FOUND IN SESSION")
        return jsonify({'message': 'error', 'details': 'Email not found in session'})

    print("GET SESSION EMAIL:", session['email'])
    cur = conn.cursor()

    cur.execute('''SELECT first_name, last_name
                FROM tutors
                WHERE email = %s ''', (session['email'],))

    result = cur.fetchall()

    cur.commit()
    cur.close()

    file = request.files['resume']
    first_name, last_name = result[0]
    file_name = f"{first_name}-{last_name}-Resume.pdf"
    
    # save file to S3
    s3.upload_fileobj(file, os.environ['TUTOR_APPLICATION_BUCKET_NAME'], file_name)

    print("FILE UPLOADED TO S3")

    return jsonify({'message': 'success'})


############################################################################################################
# save tutor application report card
############################################################################################################
@app.route('/save-tutor-application-report-card', methods=['POST'])
@cross_origin(supports_credentials=True)
def saveTutorApplicationReportCard():
    # get the name of the tutor that's currently logged in
    if 'email' not in session:
        print("EMAIL NOT FOUND IN SESSION")
        return jsonify({'message': 'error', 'details': 'Email not found in session'})

    print("GET SESSION EMAIL:", session['email'])
    cur = conn.cursor()

    cur.execute('''SELECT first_name, last_name
                FROM tutors
                WHERE email = %s ''', (session['email'],))

    result = cur.fetchall()
    
    cur.commit()
    cur.close()

    # get the file and the name of the tutor
    file = request.files['report-card']
    first_name, last_name = result[0]
    file_name = f"{first_name}-{last_name}-Report-Card.pdf"
    
    # save file to S3
    s3.upload_fileobj(file, os.environ['TUTOR_APPLICATION_BUCKET_NAME'], file_name)

    print("FILE UPLOADED TO S3")

    return jsonify({'message': 'success'})


############################################################################################################
# get profile information
############################################################################################################
@app.route('/get-profile-info', methods=['GET'])
@cross_origin(supports_credentials=True)
def getProfileInfo():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})

    cur = conn.cursor()

    cur.execute('''SELECT first_name, last_name, email, grade, gender, location, subjects, languages, availability, student_capacity
                FROM tutors
                WHERE email = %s''', (session['email'],))

    profile = cur.fetchall()

    result = {}

    result = {
        'firstName': profile[0][0],
        'lastName': profile[0][1],
        'email': profile[0][2],
        'grade': profile[0][3],
        'gender': profile[0][4],
        'location': profile[0][5],
        'subjects': profile[0][6],
        'languages': profile[0][7],
        'availability': profile[0][8],
        'studentCapacity': profile[0][9]
    }

    cur.close()

    return result


############################################################################################################
# get the tutor's upcoming sessions
############################################################################################################
@app.route('/get-upcoming-sessions', methods=['GET'])
@cross_origin(supports_credentials=True)
def getUpcomingSessions():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})
    
    cur = conn.cursor()

    # get tutor id
    cur.execute('''SELECT id
                FROM tutors
                WHERE email = %s''', (session['email'],))
    
    tutor_id = cur.fetchall()[0][0]

    # get all pairing ids associated with the tutor
    cur.execute('''SELECT id
                FROM pairings
                WHERE tutor_id = %s''', (tutor_id,))
    
    pairing_ids = cur.fetchall()

    for i in range(len(pairing_ids)):
        pairing_ids[i] = pairing_ids[i][0]
        
    # get all sessions associated with the pairing ids within the next 2 weeks
    cur.execute('''SELECT id
                FROM sessions
                WHERE pairing_id = ANY(%s) AND date >= CURRENT_DATE AND date <= CURRENT_DATE + INTERVAL '14 days' ''', (pairing_ids,))

    session_ids = cur.fetchall()

    for i in range(len(session_ids)):
        session_ids[i] = session_ids[i][0]

    # get the upcoming session card data
    cur.execute('''SELECT sessions.id, tutees.first_name, tutees.last_name, pairings.subject, sessions.date, sessions.start_time, sessions.end_time, sessions.lesson_plan, sessions.session_notes, sessions.meeting_link
                FROM tutees
                JOIN pairings
                ON tutees.id = pairings.tutee_id
                JOIN sessions
                ON pairings.id = sessions.pairing_id
                WHERE sessions.id = ANY(%s)
                ORDER BY sessions.date, sessions.start_time''', (session_ids,))

    upcoming_sessions = cur.fetchall()

    # convert into a list of dictionaries
    result = []
    for row in upcoming_sessions:
        upcoming_session = {
            'sessionID': row[0],
            'tuteeFirstName': row[1],
            'tuteeLastName': row[2],
            'subject': row[3],
            'month': row[4].strftime("%B"),
            'day': row[4].strftime("%d"),
            'year': row[4].strftime("%Y"),
            'startTime': row[5].strftime("%I:%M %p"),
            'endTime': row[6].strftime("%I:%M %p"),
            'meetingLink': row[9]
        }

        result.append(upcoming_session)

    cur.close()

    return result

############################################################################################################
# get lesson plan/session notes
############################################################################################################
@app.route('/get-editor-content', methods=['GET'])
@cross_origin(supports_credentials=True)
def getEditorContent():
    session_id = request.args.get('sessionID')
    type = request.args.get('type')

    print(session_id)
    print(type)
    cur = conn.cursor()

    if(type == "Lesson Plan"):
        cur.execute('''SELECT lesson_plan
                    FROM sessions
                    WHERE id = %s''', (session_id,))
        
    if(type == "Session Notes"):
        cur.execute('''SELECT session_notes
                FROM sessions
                WHERE id = %s''', (session_id,))
        
    result = cur.fetchall()
    cur.close()

    print(result)

    return result

############################################################################################################
# save lesson plan/session notes
############################################################################################################
@app.route('/save-editor-content', methods=['POST'])
@cross_origin(supports_credentials=True)
def saveEditorContent():
    data = request.json
    cur = conn.cursor()

    if(data['type'] == "Lesson Plan"):
        cur.execute('''UPDATE sessions
                    SET lesson_plan = %s
                    WHERE id = %s''', (data['content'], data['sessionID'],))
        
    if(data['type'] == "Session Notes"):
        cur.execute('''UPDATE sessions
                SET session_notes = %s
                WHERE id = %s''', (data['content'], data['sessionID'],))
    
    conn.commit()
    cur.close()

    return jsonify({'message': 'success'})


############################################################################################################
# get all tutees and subjects paired with the tutor
############################################################################################################
@app.route('/get-tutees', methods=['GET'])
@cross_origin(supports_credentials=True)
def getTutees():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})
    
    cur = conn.cursor()

    # get tutor id
    cur.execute('''SELECT id
                FROM tutors
                WHERE email = %s''', (session['email'],))
    
    tutor_id = cur.fetchall()[0][0]

    # get all pairing ids associated with the tutor
    cur.execute('''SELECT id
                FROM pairings
                WHERE tutor_id = %s''', (tutor_id,))
    
    pairing_ids = cur.fetchall()

    # get all tutees and subjects associated with the pairing ids
    cur.execute('''SELECT pairings.id, tutees.first_name, tutees.last_name, tutees.email, tutees.grade, pairings.subject, tutees.languages, pairings.meeting_days
                FROM pairings
                JOIN tutees
                ON pairings.tutee_id = tutees.id
                WHERE pairings.id = ANY(%s)''', (pairing_ids,))
    
    tutees = cur.fetchall()

    result = []

    for row in tutees:
        tutee = {
            'pairingID': row[0],
            'firstName': row[1],
            'lastName': row[2],
            'email': row[3],
            'grade': row[4],
            'subject': row[5],
            'languages': row[6],
            'meetingDays': row[7]
        }

        result.append(tutee)

    cur.close()

    return result

############################################################################################################
# get tutoring history
############################################################################################################
@app.route('/get-tutoring-history', methods=['GET'])
@cross_origin(supports_credentials=True)
def getTutoringHistory():
    pairing_id = request.args.get('pairingID')

    cur = conn.cursor()

    # get all sessions associated with the pairing id
    cur.execute('''SELECT sessions.date, sessions.id, tutees.first_name, tutees.last_name
                FROM pairings
                JOIN sessions
                ON pairings.id = sessions.pairing_id
                JOIN tutees
                ON pairings.tutee_id = tutees.id
                WHERE pairings.id = %s AND sessions.date < CURRENT_DATE 
                ORDER BY sessions.date DESC''', (pairing_id,))
                
    
    sessions = cur.fetchall()

    result = []

    for row in sessions:
        session = {
            'date': row[0].strftime("%Y-%m-%d"),
            'month': row[0].strftime("%B"),
            'day': row[0].strftime("%d"),
            'year': row[0].strftime("%Y"),
            'sessionID': row[1],
            'tuteeFirstName': row[2],
            'tuteeLastName': row[3],
        }

        result.append(session)

    cur.close()

    return result


############################################################################################################
# save volunteer hours data
############################################################################################################
@app.route('/save-volunteer-hours-data', methods=['POST'])
@cross_origin(supports_credentials=True)
def saveVolunteerHoursData():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})
    
    data = request.json

    cur = conn.cursor()

    cur.execute('''INSERT INTO volunteer_hours_requests (date_submitted, tutee_id, num_hours, status, description)
                VALUES (%s, (SELECT id FROM tutors WHERE email = %s), %s, %s, %s)''', (data['dateSubmitted'], session['email'], data['numHours'], data['status'], data['description']))

    conn.commit()
    cur.close()
    
    return jsonify({'message': 'success'})


############################################################################################################
# save volunteer hours request form
############################################################################################################
@app.route('/save-volunteer-hours-form', methods=['POST'])
@cross_origin(supports_credentials=True)
def saveVolunteerHoursForm():
    # get the name of the tutor that's currently logged in
    if 'email' not in session:
        print("EMAIL NOT FOUND IN SESSION")
        return jsonify({'message': 'error', 'details': 'Email not found in session'})

    print("GET SESSION EMAIL:", session['email'])
    cur = conn.cursor()

    cur.execute('''SELECT first_name, last_name
                FROM tutors
                WHERE email = %s ''', (session['email'],))

    # CHANGE TO TUTEES LATER

    result = cur.fetchall()
    
    cur.commit()
    cur.close()

    # get the file, name of the tutor, and the current date
    file = request.files['volunteer-hours-form']
    first_name, last_name = result[0]
    current_date = date.today()
    file_name = f"{first_name}-{last_name}-{current_date}-Volunteer-Hours-Request.pdf"
    
    # save file to S3
    s3.upload_fileobj(file, os.environ['VOLUNTEER_HOURS_BUCKET_NAME'], file_name)

    print("FILE UPLOADED TO S3")

    return jsonify({'message': 'success'})


############################################################################################################
# get past volunteer requests
############################################################################################################
@app.route('/get-past-volunteer-hours-request-history', methods=['GET'])
@cross_origin(supports_credentials=True)
def getPastVolunteerHoursRequestHistory():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})
    
    cur = conn.cursor()

    cur.execute('''SELECT id
                FROM tutors 
                WHERE email = %s''', (session['email'],))
    
    # CHANGE TO TUTEES LATER

    tutee_id = cur.fetchall()

    cur.execute('''SELECT date_submitted, num_hours, status
                FROM volunteer_hours_requests
                WHERE tutee_id = %s''', (tutee_id[0],))
    
    past_requests = cur.fetchall()

    result = []
    for row in past_requests:
        date_submitted = row[0].strftime("%Y-%m-%d")

        past_request = {
            'dateSubmitted': date_submitted,
            'numHours': row[1],
            'status': row[2]
        }

        result.append(past_request)
    
    # print("VOLUNTEER HOURS REQUEST HISTORY:", result)

    cur.close()

    return result


############################################################################################################
# log out
############################################################################################################
@app.route('/log-out', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def logOut():
    if 'email' not in session:
        print("EMAIL NOT FOUND IN SESSION")
        return jsonify({'message': 'error', 'details': 'Email not found in session'})

    session.pop('email')
    print("LOGGED OUT")
    return jsonify({'message': 'success'})


if __name__ == '__main__':
    app.secret_key = 'secret_key'
    app.run(debug=True)

# close the database connection
# conn.close()