from flask import Flask
from flask_restful import Api
from user import User
import sqlite3
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
api = Api(app)

# api.add_resource(User, '/user/<string:name>/<string:password>')
@app.route('/user/<string:name>/<string:password>')
def find_username(name,password):
    connection = sqlite3.connect("game.db")
    cursor=connection.cursor()

    query = "SELECT * FROM users WHERE user_name= '" + name + "' AND user_password='" + password + "'"
    cursor.execute(query)
    row=cursor.fetchone()
    if row:
        return 'success'
    return 'faliure'
if __name__ =='__main__':
    app.run(port=5000)