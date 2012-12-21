var async = require('async');

var tasks = [], cols = ['hoge', 'fuga', 'piyo'];
    
for (var i = 0, len = cols.length; i < len; i ++) {

    var _col = cols[i]; 
    tasks.push(
        function(next) { 
            console.log('searchDb('+_col+')');
            next(null);
        }
    );
}

async.series(tasks, function(err) {
    console.log('end');
});

