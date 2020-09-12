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

def get_all_categories():
    category = []
    all_categories = items.aggregate([
    {"$unwind":"$Categories"},
    {"$project":{"category_name":"$Categories.category_name","_id":0}}
    ])

    for cat in all_categories:
        category.append(cat)

    return category