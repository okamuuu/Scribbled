var mongodb = require('mongodb');
var config = require('./config');

function Db() {
    this.host = config.getDbHost();
    this.port = config.getDbPort();
    this.dbName = config.getDbName();
    this.server = new mongodb.Server(this.host, this.port, {});
    this.db = new mongodb.Db(this.dbName, this.server, {
        safe: false
    });
}

module.exports = new Db();

module.exports.find = function(colName, query, callback) {

    this.db.open(function(err, client) {

        if (err) {
            return callback(err);
        }

        client.collection(colName, function(err, collection) {

            if (err) {
                return callback(err);
            }

            collection.find(query, function(err, result) {

                if (err) {
                    return callback(err);
                }

                callback(null, result);
                client.close();
            });
        });
    });
};

module.exports.list = function(colName, data, callback) {

    this.db.open(function(err, client) {

        if (err) {
            return callback(err);
        }

        client.collection(colName, function(err, collection) {

            if (err) {
                return callback(err);
            }

            var page = data.page ? Math.max(1, data.page) : 1;
            var size = data.size ? Math.max(1, data.size) : 20;
            var selector = data.selector || {};
            var sort = data.sort || {
                _id: 1
            };

            var result = {
                page: page,
                size: size,
                selector: selector,
                sort: sort
            };

            collection.find({}).count(function(err, count) {
                    
                if (err) {
                    return callback(err);
                }

                result.max = count;
                result.maxpage = (result.max === 0) ? 1 : Math.ceil(result.max / result.size);

                collection.find(selector).sort(sort).skip((page - 1) * size).limit(size).toArray(function(err, items) {

                    if (err) {
                        return callback(err);
                    }

                    result.list = items;

                    callback(null, result);
                    client.close();
                });
            });
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
