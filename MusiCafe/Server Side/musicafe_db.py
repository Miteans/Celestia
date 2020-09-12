from pymongo import MongoClient
from pprint import pprint

db = MongoClient("mongodb+srv://celestia:celestia0121@cluster0.rbqpa.mongodb.net/cafedb?retryWrites=true&w=majority")

mydb = db.cafedb

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
                "categories":{"$push":"$Categories.category_name"}
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
