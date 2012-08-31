var async = require('async');

function getCopied(count, callback) {

    for (var i = 0; i < count; i++) {
        Math.random();
    }

    callback(null);
}

function getCopiedWithNextTick(count, callback) {

    for (var i = 0; i < count; i++) {
        Math.random();
    }

    process.nextTick(function() {
        callback(null);
    });
}

// short cut
function a(count, callback) {
    getCopied(count, callback);
}

function b(count, callback) {
    getCopiedWithNextTick(count, callback);
}

// !node-bench %
// run many times so that we can abstract out the overhead of promise creation.

//exports.countPerLap = count;

exports.compare = {
    noNextTick: function(done) {

        a(1000000, function() {});
        a(1000000, function() {});
        a(1000000, function() {});
        a(1000000, function() {});
        a(1000000, function() {});

        var tasks = [
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); },
            function(next) { a(10,   function() {next(null);}); }
        ];
        
        async.parallel(tasks, function() {
            done();
        });
    },
    withNextTick: function(done) {

        b(1000000, function() {});
        b(1000000, function() {});
        b(1000000, function() {});
        b(1000000, function() {});
        b(1000000, function() {});
        
        var tasks = [
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); },
            function(next) { b(10,   function() {next(null);}); }
        ];
 
        async.parallel(tasks, function() {
            done();
        });
    }
};



