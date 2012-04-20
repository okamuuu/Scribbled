// https://github.com/isaacs/node-bench

var obj = {
    hoge: 1,
    fuga: 2,
    piyo: 3,
    moga: {
        hoge: 1,
        fuga: 2,
        piyo: 3
    }
};

function copy (obj) {
    var tmp = {};
    for (var k in obj) {
        if (obj[k].constructor === Object || obj[k].constructor === Array) {
            tmp[k] = copy(obj[k]);
        } else {
            tmp[k] = obj[k];
        }
    }
    return tmp;
}

exports.compare = {
    "json.parse": function() {
        var copied = JSON.parse(JSON.stringify(obj));
    },
    "copy function": function() {
        var copied = copy(obj);
    }
};
require("bench").runMain()
