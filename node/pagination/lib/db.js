var mongodb = require('mongodb');
var config = require('./config');

function db() {
    this.host = config.getDbHost();
    this.port = config.getDbPort();
    this.dbName = config.getDbName();
    this.server = new mongodb.Server(this.host, this.port, {});
    this.client = new mongodb.Db(this.dbName, this.server, {});
}

module.exports = new db();

module.exports.find = function(colName, query, callback) {
        
    this.client.open(function(err, client) {

        this.client.createCollection(colName, function(err, collection) {

            collection.find(query);
            console.log(err, collection, cursor);
       
            client.close(); 

        });
    });
};

//module.exports.find = function(query, callback) {
//
//    Url.findOne(query, function(err, docs) {
//
//        if (err) {
//            return callback(err);
//        }
//
//        callback(null, docs);
//    });
//};
