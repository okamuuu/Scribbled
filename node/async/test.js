var async = require('async');

var tasks = [], cols = ['hoge', 'fuga', 'piyo'];
    
for (var i = 0, len = cols.length; i < len; i ++) {

    var _col = cols[i]; 
    tasks.push(
        (function(col) {
            return function(next) { 
                console.log('searchDb('+col+')');
                next(null);
            };
        })(_col)
    );
}

async.series(tasks, function(err) {
    console.log('end');
});

