function config() {
}

module.exports = new config();

module.exports.getDbHost = function() {
    return {
        test: '127.0.0.1',
        local: '127.0.0.1',
        dev: 'dev.example.com'
    }[process.env.mode];
};

module.exports.getDbPort = function() {
    return {
        test: 27017,
        local: 27017,
        dev: 27017
    }[process.env.mode];
};

module.exports.getDbName = function() {
    return {
        test: '_pagination',
        local: 'pagination',
        dev: 'pagination'
    }[process.env.mode];
};


