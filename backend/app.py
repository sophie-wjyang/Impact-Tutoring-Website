from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/landing-title')
def landing_title():
    return 'Make an impact, No matter how small'

if __name__ == '__main__':
    app.run(debug=True)