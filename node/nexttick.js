var async = require('async');

function getCopied(delay, callback) {
    setTimeout(function() {
        callback(null);
    }, delay);
}

function getCopiedWithNextTick(delay, callback) {
    setTimeout(function() {
        process.nextTick(function() {
            callback(null);
        });
    }, delay);
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

var len = 1000;

exports.compare = {
    noNextTick: function(done) {

        var tasks = [
            function(next) { a(1000, function() {next(null);}); },
            function(next) { a(1000, function() {next(null);}); },
            function(next) { a(1000, function() {next(null);}); },
            function(next) { a(1000, function() {next(null);}); },
            function(next) { a(1000, function() {next(null);}); },
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

        var tasks = [
            function(next) { b(1000, function() {next(null);}); },
            function(next) { b(1000, function() {next(null);}); },
            function(next) { b(1000, function() {next(null);}); },
            function(next) { b(1000, function() {next(null);}); },
            function(next) { b(1000, function() {next(null);}); },
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



