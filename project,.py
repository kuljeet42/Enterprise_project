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
@app.route('/client',methods=['get'])
def get():
    documents = collection.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)

@app.route("/insert1", methods=['POST'])
def insert_document():
    req_data = request.get_json()
    collection.insert_one(req_data).inserted_id
    return ('', 204)

if __name__ == '__main__':
    app.run()
