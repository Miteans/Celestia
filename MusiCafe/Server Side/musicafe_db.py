from pymongo import MongoClient
from pprint import pprint

db = MongoClient("mongodb+srv://celestia:celestia0121@cluster0.rbqpa.mongodb.net/cafedb?retryWrites=true&w=majority")

mydb = db.cafedb

items= mydb['Items']

def get_coffee_info():
    coffees = []

    co_info = items.aggregate([{"$unwind":"$Categories"},
    {"$match":{"Categories.category_name":"Coffee"}},
    {"$project":{"Categories.items.item_id":1,"Categories.items.item_name":1,"Categories.items.item_price":1,"Categories.items.item_image":1,"_id":0}}])

    for info in co_info:
        coffees.append(info)
    
    return coffees


def get_cake_info():
    cakes = []

    ca_info = items.aggregate([{"$unwind":"$Categories"},
    {"$match":{"Categories.category_name":"Cake"}},
    {"$project":{"Categories.items.item_id":1,"Categories.items.item_name":1,"Categories.items.item_price":1,"Categories.items.item_image":1,"_id":0}}])

    for info in ca_info:
        cakes.append(info)
    
    return cakes

def get_icecream_info():
    icecreams = []
    ic_info = items.aggregate([{"$unwind":"$Categories"},
    {"$match":{"Categories.category_name":"Ice-cream"}},
    {"$project":{"Categories.items.item_id":1,"Categories.items.item_name":1,"Categories.items.item_price":1,"Categories.items.item_image":1,"_id":0}}])

    for info in ic_info:
        icecreams.append(info)
    
    return icecreams

def get_snack_info():
    snacks = []

    sn_info = items.aggregate([{"$unwind":"$Categories"},
    {"$match":{"Categories.category_name":"Snacks"}},
    {"$project":{"Categories.items.item_id":1,"Categories.items.item_name":1,"Categories.items.item_price":1,"Categories.items.item_image":1,"_id":0}}])

    for info in sn_info:
        snacks.append(info)
    
    return snacks

def get_juice_info():
    juices = []

    ju_info = items.aggregate([{"$unwind":"$Categories"},
    {"$match":{"Categories.category_name":"Juice"}},
    {"$project":{"Categories.items.item_id":1,"Categories.items.item_name":1,"Categories.items.item_price":1,"Categories.items.item_image":1,"_id":0}}])

    for info in ju_info:
        juices.append(info)
    
    return juices


