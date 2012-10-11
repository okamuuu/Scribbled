var testUtils = require('./testutils');
var assert = require("assert")
var mongo = require('../lib/mongo');

describe('testing mongo library', function() {

    it('should return db instance.', function(done) {

        mongo.db.open(function(err, _client) {

            var cursor = _client.collection('Users').find({});
            
            cursor.explain(function(err, explain) {
//                console.log(err, explain);
            });

            cursor.toArray(function(err, items) {
                assert.ok(items.length === 1000);
                _client.close();
                done();
            });
        });
    });

    it('find return iterator.', function(done) {

        mongo.find('Users', {}, function(err, result) {
            assert.ok(!err);
            assert.ok(result);
            done();
        });
    });

    it('list return iterator with pager.', function(done) {

        mongo.list('Users', {
            page: 1,
            size: 6,
            selector: {},
            sort: {
                order: 1,
            }
        }, function(err, result) {
            assert.ok(!err);
            assert.ok(result.page === 1);
            assert.ok(result.size === 6);
            assert.ok(result.max === 1000);
            assert.ok(result.list.length === 6);
            assert.ok(result.list[0].order <= result.list[1].order);
            done();
        });
    });
});
