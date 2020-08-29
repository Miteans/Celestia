from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import musicafe_db as md

app = Flask(__name__)
CORS(app)


@app.route('/item/<categoryName>')
def get_info_of_items(categoryName):
    info = md.get_items_info(categoryName)
    return jsonify({'items':info})

if __name__ == "__main__":
    app.run(debug=True)