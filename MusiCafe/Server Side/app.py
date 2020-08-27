from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import musicafe_db as md

app = Flask(__name__)
CORS(app)


@app.route('/coffee')
def get_info_of_coffee():
    info = md.get_coffee_info()
    return jsonify({'coffees':info})

@app.route('/cake')
def get_info_of_cake():
    info = md.get_cake_info()
    return jsonify({'cakes':info})


@app.route('/icecream')
def get_info_of_icecream():
    info = md.get_icecream_info()
    return jsonify({'icecreams':info})


@app.route('/snack')
def get_info_of_snack():
    info = md.get_snack_info()
    return jsonify({'snacks':info})


@app.route('/juice')
def get_info_of_juice():
    info = md.get_juice_info()
    return jsonify({'juices':info})

if __name__ == "__main__":
    app.run(debug=True)