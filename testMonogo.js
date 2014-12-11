// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(err) {
        return console.log(err);
    } 

    var date = Date.now();
    obj =  [{
            date: '1186203', 
            name: 'Joaquin Benavides',
            orderLines: [{
                abbreviation: 'k',
                quantity: 2
            }]
        }
    ];
    date = '1186203';
    //insertOrder(db, function() { }, obj, date);
    findOrders(db, function() { }, date);
    //removeOrder(db, function() {});

});

var insertOrder = function(db, callback, obj, date) {

    var collection = db.collection('empanadas');
    var storeObj = {
    };
    storeObj[date] = obj;
    collection.insert( [storeObj], function(err, result) {
        callback(result);
    });
}

var updateOrder = function(db, callback) {
    var collection = db.collection('empanadas');
    /*
    collection.update({ a : 2 } , { $set: { b : 1 } }, 
    function(err, result) {
        callback(result);
    });  
    */
}

var findOrders = function(db, callback, date) {
    var collection = db.collection('empanadas');
    //collection.find({'date': date}).toArray(function(err, order) {
    collection.find('1186203').toArray(function(err, order) {
        console.log("Found the following orders");
        console.log(order);
        callback(order);
    });      
}

var removeOrder = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('empanadas');
  // Insert some documents 
  collection.remove({}, function(err, result) { 
      console.log("Removed the document with the field a equal to 3");
        callback(result);
    });    
}
