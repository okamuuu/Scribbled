var assert = require("assert")

var config = require('../lib/config');

describe('config can some modes', function() {

    it('should return test configuration if test mode.', function(done) {
        
        process.env.mode = 'test'; 
    
        assert.ok(config.getDbHost() === '127.0.0.1');
        assert.ok(config.getDbPort() === 27017);
        done();
    });

    it('should return dev configuration if dev mode.', function(done) {
    
        process.env.mode = 'dev'; 
        
        assert.ok(config.getDbHost() === 'dev.example.com');
        assert.ok(config.getDbPort() === 27017);
        done();
    });
});

