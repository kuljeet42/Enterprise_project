from flask import Flask
from flask_pymongo import PyMongo
import pymongo
import os
import json
from flask import request

app = Flask(__name__)

client = pymongo.MongoClient( "mongodb://localhost:27017/");

db = client['event_management_system']
collection = db['client']
@app.route('/')
def get():
    documents = collection.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)
if __name__ == '__main__':
    app.run()
