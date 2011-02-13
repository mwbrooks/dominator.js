(function() {
    document.addEventListener('appready', function() {
        please.config.window = document.getElementById('app').contentWindow;
        please.test();
    }, false);
})();