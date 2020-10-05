from pymongo import MongoClient
from pprint import pprint
import datetime

db = MongoClient("mongodb+srv://celestia:celestia0121@cluster0.rbqpa.mongodb.net/cafedb?retryWrites=true&w=majority")
mydb = db.cafedb

#db = MongoClient('localhost',27017)
#mydb = db['musicafe']

x = datetime.datetime.now()
date = x.strftime("%d/%m/%Y")

items= mydb['Items']
orders=mydb['orders']

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

def delete_item(item_id,item_image):
    print(item_id)
    print(item_image)
    success = items.update(
        {
            "Categories.items.item_id":item_id
        },
        {
            "$pull":{"Categories.$.items":{"item_id":item_id}}
        }
    )
    isDeleted=success['nModified']
    if isDeleted==1:
        return True
    else:
        return False

def add_to_cart():
    cart_info = []
    cart_item = orders.insertOne(
    {
            "order_id": "or_6", 
            "order_date": "", 
            "ordered_items": [
            { 
              "item_id":"cf1", 
              "item_name": "espresso", 
              "price": 125, "quantity":2, 
              "total_price":250
            },
            {
                "item_id":"cf2", 
                "item_name": "americano", 
                "price": 150, 
                "quantity":1, 
                "total_price":150
            }],
            "grand_total":400 
        }
    )


    for order in cart_item:
        cart_info.append(order)
    return cart_info