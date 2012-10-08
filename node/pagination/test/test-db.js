var testUtils = require('./testutils');
var assert = require("assert")
var db = require('../lib/db');

describe('db', function() {

    it('should return db instance.', function(done) {

        db.client.open(function(err, _client) {

            _client.createCollection('Users', function(err, collection) {

                var cursor = collection.find({});
                cursor.toArray(function(err, items) {
                    assert.ok(items.length===1000);
                    _client.close();
                    done();
                });
            });
        });
    });

});
