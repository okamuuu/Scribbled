


getCopied(100000, function(err, result) {
    console.log(err, result);        
});

function getCopied(count, callback) {

    if(typeof count !== 'number') {
        throw new Error('count must be number!!');
    }
    
    for (var i = 0; i < count; i++){
        
    }
     
    process.nextTick(function() {
        callback(null, count);
    });
}
