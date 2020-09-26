from pymongo import MongoClient
from pprint import pprint

# db = MongoClient("mongodb+srv://celestia:celestia0121@cluster0.rbqpa.mongodb.net/cafedb?retryWrites=true&w=majority")
# mydb = db.cafedb

db = MongoClient('localhost',27017)
mydb = db['musicafe']

items= mydb['Items']

def get_items_info(category_name):
    item = []

    item_info = items.aggregate([{"$unwind":"$Categories"},
    {"$match":{"Categories.category_name":category_name}},
    {"$project":{"Categories.items.item_id":1,"Categories.items.item_name":1,"Categories.items.item_price":1,"Categories.items.item_image":1,"_id":0}}])

    for info in item_info:
        item.append(info)
    
    return item

def get_categories():
    categories = []

    category_info = items.aggregate([
        {
               "$unwind":"$Categories"
        }, 
        {
            "$group":
            {
                "_id":"$_id",
                "categories":{"$push":{"category_name":"$Categories.category_name","category_id":"$Categories.category_id"}},
            }
        },
        {
            "$project":{
                "categories":1,
                "_id":0
            }
        }
    ])

    for info in category_info:
        categories.append(info)
    
    return categories[0]

def add_item(item_name,category_id,price,path):
    item_id = item_name[0] + item_name[-1]
    print(item_id)
    success = items.update(
        {
            "Categories.category_id":str(category_id)
        },
        {
            "$addToSet":{"Categories.$.items":{"item_id":item_id,"item_name":item_name,
            "item_price":int(price),"item_image":path}}
        }
    )

    isAdded = []
    for record in success:
        isAdded.append(record)
    
    return isAdded
