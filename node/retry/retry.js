function retry(count, iterator, callback) {

    if (isNaN(count) || typeof count !== 'number') {
        return callback(new Error('count is not Number!!'));
    }

    var iterate = function() {
            
            iterator(function(err, result) {

                if(err && --count < 1) {
                    callback(err);
                }
                else if(err) {
                    process.nextTick(function() {
                        iterate(); 
                    });
                }
                else {
                    callback(null, result);
                }
            });
        };
    
    iterate();
}

var tryCount = 0;

retry(3, function(next) {

    if ( ++tryCount !== 3 ) {
        console.log('err');
        return next('err');
    }
    next(null, 'ok');

}, function(err, result) {

    if (err) {
        return console.log(err);
    }
    console.log(null, result);
});
