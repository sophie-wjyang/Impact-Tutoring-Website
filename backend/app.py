from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_cors import CORS, cross_origin
import os 
import psycopg2
import boto3

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
        # print("SET SESSION EMAIL:", session['email'])
        return jsonify({'message': 'success'})
    else:
        return jsonify({'message': 'error', 'details': 'Did not find matching email and password'})


############################################################################################################
# get profile information
############################################################################################################
@app.route('/get-profile-info', methods=['GET'])
@cross_origin(supports_credentials=True)
def getProfileInfo():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})

    # print("GET SESSION EMAIL:", session['email'])

    cur = conn.cursor()

    cur.execute('''SELECT first_name, last_name, email, grade, gender, location, subjects, languages, availability, student_capacity
                FROM tutors
                WHERE email = %s ''', (session['email'],))

    result = cur.fetchall()

    # print("PROFILE INFO:", result)

    cur.close()

    return jsonify(result)


############################################################################################################
# get all tutees and subjects paired with the tutor
############################################################################################################
@app.route('/get-tutees', methods=['GET'])
@cross_origin(supports_credentials=True)
def getTutees():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})
    
    cur = conn.cursor()

    cur.execute('''SELECT tutees.first_name, tutees.last_name, tutees.email, tutees.grade, tutees.languages, tutees.availability, pairings.subjects
                FROM pairings
                JOIN tutees
                ON pairings.tutee_id = tutees.id
                WHERE tutor_id = (SELECT id FROM tutors WHERE email = %s)''', (session['email'],))
    
    result = cur.fetchall()

    print(result)

    cur.close()

    return jsonify(result)


############################################################################################################
# save data from tutor application form
############################################################################################################
@app.route('/save-tutor-application-data', methods=['POST'])
@cross_origin(supports_credentials=True)
def saveTutorApplicationData():
    if 'email' not in session:
        return jsonify({'message': 'error', 'details': 'Email not found in session'})
    
    data = request.json
    print(data)

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

    file = request.files['resume']
    first_name, last_name = result[0]
    file_name = f"{first_name}-{last_name}-Resume.pdf"
    
    # save file to S3
    s3.upload_fileobj(file, os.environ['BUCKET_NAME'], file_name)

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

    file = request.files['report-card']
    first_name, last_name = result[0]
    file_name = f"{first_name}-{last_name}-Report-Card.pdf"
    
    # save file to S3
    s3.upload_fileobj(file, os.environ['BUCKET_NAME'], file_name)

    print("FILE UPLOADED TO S3")
    
    return jsonify({'message': 'success'})

if __name__ == '__main__':
    app.secret_key = 'secret_key'
    app.run(debug=True)

# close the database connection
# conn.close()