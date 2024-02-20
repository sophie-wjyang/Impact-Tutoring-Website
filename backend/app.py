from flask import Flask, request, jsonify
from flask_cors import CORS
import os 
import psycopg2
import sys

app = Flask(__name__)
CORS(app)

# connect to database   
# os is used to access environment variables, so that the database username and password are not visible in the source code
conn = psycopg2.connect(
    host="localhost",
    database="impact_tutoring",
    user=os.environ['DB_USERNAME'],
    password=os.environ['DB_PASSWORD']
)

@app.route('/')
def index():
    return 'index!'

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

    return ('Saved signup form data to database!')

@app.route('/validate-login-form-data', methods=['POST'])
def validateLoginFormData():
    data = request.json
    cur = conn.cursor()

    cur.execute('''SELECT first_name 
                FROM tutors
                WHERE email = %s and password = %s''', (data['email'], data['password']))

    result = cur.fetchall()

    for row in result:
        first_name = row[0]
        print("First name:", first_name)

    conn.commit()
    cur.close()

    return ('Validated login form data!')


if __name__ == '__main__':
    app.run(debug=True)

# close the database connection
# conn.close()