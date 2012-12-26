function retry(count, iterator, callback) {

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

var _err = 10;

retry(3, function(next) {

    if ( _err < 0 ) {
        return next('err');
    }
    next(null);
}, function(err, result) {

    if (err) {
        console.log(err);
    }

    //console.log('ok!!');
});
