const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));


app.post('/insert', (req, res)=> {
console.log("Trying to insert new client data..");
console.log("ClientId: " + req.body.client)
res.send("1 document inserted");
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 var myobj = {"clientId": req.body.clientId,"clientName" :req.body.clientName,"contactNo" :req.body.contactNo,"address":req.body.address};
 dbo.collection("client").insertOne(myobj, function(err, res) {
   if (err) throw err;
   console.log("1 document inserted");

   db.close();
 });

});
});


app.get('/show',(req,res)=> {

MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 dbo.collection("client").find({}).toArray(function(err,result) {
 if (err) throw err;
 console.log(result);
 res.send(result);
 db.close();
});
});
});

app.post('/update',(req,res)=> {
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 var myquery = { "client": req.body.client };
 var newvalues = { $set: {"address":req.body.address } };
 dbo.collection("client").updateOne(myquery, newvalues, function(err, res) {
   if (err) throw err;
   console.log("1 document updated");
   db.close();
 });
});
});

app.post('/delete',(req, res)=> {
MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("event_management_system");
 var myobj = { "client": req.body.client };
 dbo.collection("client").deleteOne(myobj, function(err, result) {
   if (err) throw err;
   res.send("1 document deleted");
   console.log("1 document deleted");
   db.close();
 });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));