TestCase("UidTest", {
    "test should retrun nemeric id":
    function () {
        var id = MyApp.uid({});

        assertNumber(id);
    },

    "test should return consistent id for object":
    function () {
        var object = {};
        var id = MyApp.uid(object);

        assertSame(id, MyApp.uid(object));
    },

    "test should return unique id":
    function () {
        var object = {};
        var object2 = {};
        var id = MyApp.uid(object);

        assertNotEquals(id, MyApp.uid(object2));
    },

    "test should return consistent id for function":
    function () {
        var func = function () {};
        var id = MyApp.uid(func);

        assertSame(id, MyApp.uid(func));
    },

    "test should return undefined for primitive":
    function () {
        var str = "my string";

        assertUndefined(MyApp.uid(str));
    }
});

TestCase("IteratorTest", {
    "test next should return first item":
    function () {
        var collection = [1, 2, 3, 4, 5];
        var iterator = MyApp.iterator(collection);
        assertSame(collection[0], iterator.next());
        assertTrue(iterator.hasNext());
    },

    "test hasNext should be false after last item":
    function () {
        var collection = [1, 2];
        var iterator = MyApp.iterator(collection);

        iterator.next();
        iterator.next();

        assertFalse(iterator.hasNext());
    },

    "test should loop collection with iterator":
    function () {
        var collection = [1, 2, 3, 4, 5];
        var it = MyApp.iterator(collection);
        var result = [];

        while (it.hasNext()) {
            result.push(it.next());
        }

        assertEquals(collection, result);
    }
});

