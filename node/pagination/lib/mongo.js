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

        var cursor = client.collection(colName).find(query);

        cursor.explain(function(err, explain) {
            console.log('find:', explain);
        });
        
        cursor.toArray(function(err, items) {
            callback(null, items);
            client.close();
        });
    });
};

module.exports.list = function(colName, data, callback) {

    this.db.open(function(err, client) {

        if (err) {
            return callback(err);
        }

        var page = data.page ? Math.max(1, data.page) : 1;
        var size = data.size ? Math.max(1, data.size) : 20;
        var selector = data.selector || {};
        var sort = data.sort || {
            _id: 1
        };

        // On a query using skip() and limit(), count ignores these parameters by default. 
        var cursor = client.collection(colName).find(selector).sort(sort).skip((page - 1) * size).limit(size);

        cursor.explain(function(err, explain) {
            console.log('list:',explain);
        });
        
        // XXX: MySQLFoundRows みたいなのないかね
        cursor.count(function(err, count) {

            if (err) {
                return callback(err);
            }

            var maxpage = (count === 0) ? 1 : Math.ceil(count / size);

            cursor.toArray(function(err, items) {

                if (err) {
                    return callback(err);
                }

                callback(null, {
                    max: count,
                    maxpage: maxpage,
                    page: page,
                    size: size,
                    selector: selector,
                    sort: sort,
                    list: items
                });
            
                client.close();
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
