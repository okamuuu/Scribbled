var MyApp = (function () {
    function namespace(string) {
        var object = this;
        var levels = string.split(".");

        for (var i = 0, l = levels.length; i < l; i++) {
            if (typeof object[levels[i]] == "undefined") {
                object[levels[i]] = {}; 
            }   

            object = object[levels[i]];
        }   

        return object;
    }

    return {
        namespace: namespace
    };  
}());

(function () {
    var id = 0;

    function uid(object) {
        if (typeof object.__uid != "number") {
            object.__uid = id++;
        }

        return object.__uid;
    }

    if (typeof MyApp == "object") {
        MyApp.uid = uid;
    }
}());

(function () {
    function iterator(collection) {
        var index = 0;
        var length = collection.length;

        function next() {
            var item = collection[index++];

            return item;
        }

        function hasNext() {
            return index < length;
        }

        return {
            next: next,
            hasNext: hasNext
        };
    }

    if (typeof MyApp == "object") {
        MyApp.iterator = iterator;
    }
}());
