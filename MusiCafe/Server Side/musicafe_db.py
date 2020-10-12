from pymongo import MongoClient
from pprint import pprint
import datetime

db = MongoClient("mongodb+srv://celestia:celestia0121@cluster0.rbqpa.mongodb.net/cafedb?retryWrites=true&w=majority")
mydb = db.cafedb

#db = MongoClient('localhost',27017)
#mydb = db['musicafe']

x = datetime.datetime.now()
date = x.strftime("%d-%m-%Y")
print(type(date))

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
    count = items.count()
    #item_id = category_id + str(count + 1)
    item_id = category_id + '_' + item_name[0] + item_name[1]
    success = items.update(
        {
            "Categories.category_id":str(category_id)
        },
        {
            "$addToSet":{"Categories.$.items":{"item_id":item_id,"item_name":item_name,
            "item_price":int(price),"item_image":path}}
        }
    )
    
    if success['nModified']:
        isAdded = True
    else:
        isAdded = False
   
    
    return isAdded

def delete_item(item_id,item_image):
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

def add_to_cart(cart_items,grand_total,date):
    cart_info = []
    count = orders.count()
    order_id = "or_" + str(count + 1)
    success = orders.insert_one(
    {
            "order_id": order_id, 
            "order_date": date, 
            "ordered_items": cart_items,
            "grand_total":grand_total
        }
    )

    print(success.inserted_id)

    if success.inserted_id:
        flag = True
        print("Here")
    else:
        flag = False

    return flag

def get_item_sales(dayMode,category):
    item_sales = []
    selected_category = []
    print(category)
    if category != 'All':
        selected_category.append(category)
    else:
        selected = get_categories()
        print(selected)
        for category in selected['categories']:
            print(category)
            selected_category.append(category['category_name'])
            print(selected_category)
    
    ordered_items = orders.aggregate([
    {
        "$unwind":"$ordered_items"
    },
    {
        "$match":{
            "order_date":{ "$regex" : date},
            "ordered_items.category": { "$in": selected_category}
        }
    },
    {
        "$group":{
            "_id":{
                "item_name":"$ordered_items.item_name",
                "item_id":"$ordered_items.item_id",
                "item_image":"$ordered_items.item_image",
                "item_price":"$ordered_items.item_price"
            },
            "total_sales":{"$sum":"$ordered_items.item_qty"}
        }
    },
    {
        "$project":{
                            "total_sales":1,
                            "item_name":"$_id.item_name",
                            "item_id":"$_id.item_id",
                            "item_image":"$_id.item_image",
                            "item_price":"$_id.item_price",
                            "_id":0
                        }
    }

    ])

    for item in ordered_items:
        item_sales.append(item)
    
    return item_sales