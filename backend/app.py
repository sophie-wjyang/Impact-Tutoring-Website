from flask import Flask, request, jsonify
from flask_cors import CORS
import os 
import psycopg2

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
    app.logger.error('MAIN FUNCTION')
    return 'Hello, World!'

@app.route('/save-signup-form-data', methods=['GET', 'POST'])
def save_signup_form():
    data = request.json
    cur = conn.cursor()

    print(data)

    cur.execute('''INSERT INTO tutors (first_name, last_name, email, password)
                VALUES (%s, %s, %s, %s)''', (data['firstName'], data['lastName'], data['email'], data['password']))
    
    conn.commit()
    cur.close()

if __name__ == '__main__':
    app.run(debug=True)

# close the database connection
conn.close()