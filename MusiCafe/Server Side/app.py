from flask import Flask, jsonify,request
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import musicafe_db as md
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)


@app.route('/item/<categoryName>')
def get_info_of_items(categoryName):
    info = md.get_items_info(categoryName)
    return jsonify({'items':info})

@app.route('/categories')
def get_categories():
    info = md.get_categories()
    return jsonify({'categories':info})

@app.route('/add-item', methods = ['POST'])
def add_item():
    image = request.files['image']
    data = request.form.get('data')
    filename = secure_filename(image.filename)
    print(filename)
    image.save(os.path.join('../UI Side/src/assets/images/'), filename)
    #image.save(os.path.join('F:/Projects/Celestia/Celestia/MusiCafe/UI Side/src/assets/images/'), filename)
    print("Saved")
    return jsonify({'sjn':0})

if __name__ == "__main__":
    app.run(debug=True)