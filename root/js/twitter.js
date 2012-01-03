var page = new WebPage();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(encodeURI("http://mobile.twitter.com/okamuuu"), function (status) {
    if (status !== "success") {
        console.log("Unable to access network");
    } else {
        page.evaluate(function() {
            var list = document.querySelectorAll('span.status');
            for (var i = 0; i < list.length; ++i) {
                console.log((i + 1) + ": " + list[i].textContent);
            }
        });
    }
    phantom.exit();
});
