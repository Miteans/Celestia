from flask import Flask, jsonify,request,send_from_directory
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import musicafe_db as md
import os
import json
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

<<<<<<< HEAD
@app.route('/add-to-cart', methods=['POST'])
def get_cart_items():
    print(request)
    return jsonify({'flag:0'})
    
=======
#app.config['PATH'] = 'E:/projects/celestia/Celestia/MusiCafe/UI Side/src/assets/images'
>>>>>>> 81e61ccb2732927ff6768b1f53a2b1059775c726

@app.route('/add-item', methods = ['POST'])
def add_item():
    image = request.files['image']
    item_name = request.form.get('name').encode("utf-8").replace('"',"")
    category_id = request.form.get('category_id').encode("utf-8").replace('"',"")
    category_name = request.form.get('category_name').encode("utf-8").replace('"',"")
    price = request.form.get('price').encode("utf-8").replace('"',"")
    extension = image.filename.split(".")[-1]
    filename = item_name + '.' + extension
    filename = secure_filename(filename)
<<<<<<< HEAD
    #path = 'F:/Projects/Celestia/Celestia/MusiCafe/Server Side/images/' + category_name.lower() + '/'
    path = 'D:/angular/cafe/MusiCafe/Server Side/images/' + category_name.lower() + '/'
=======
    #path = 'E:/projects/celestia/Celestia/MusiCafe/Server Side/images/' + category_name.lower() + '/'
    path = 'F:/Projects/Celestia/Celestia/MusiCafe/Server Side/images/' + category_name.lower() + '/'
>>>>>>> 81e61ccb2732927ff6768b1f53a2b1059775c726
    image.save(os.path.join(path,filename))
    path = category_name.lower() + '/' + filename
    
    success = md.add_item(item_name,category_id,price,path)
    return jsonify({'isAdded':success})

@app.route('/images/<directory>/<image_name>')
def display_image(directory,image_name):
    print(image_name)
<<<<<<< HEAD
    #return send_from_directory('F:/Projects/Celestia/Celestia/MusiCafe/Server Side/images/'+directory+'/', filename = image_name)
    return send_from_directory('D:/angular/cafe/MusiCafe/Server Side/images/'+directory+'/', filename = image_name)
=======
    #return send_from_directory('E:/projects/celestia/Celestia/MusiCafe/Server Side/images/'+directory+'/', filename = image_name)
    return send_from_directory('F:/Projects/Celestia/Celestia/MusiCafe/Server Side/images/'+directory+'/', filename = image_name)
>>>>>>> 81e61ccb2732927ff6768b1f53a2b1059775c726

if __name__ == "__main__":
    app.run(debug=True)