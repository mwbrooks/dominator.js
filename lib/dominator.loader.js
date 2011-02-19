//
// Simple Test Runner
//
// dominator.load(options)
//   - loads your application into an iframe
//   - waits for your application to load
//   - runs your test suite
//
(function(scope) {

    dominator.fn.load = function(options) {
        //
        // Inject your application as an iFrame
        //
        window.addEventListener('load', function() {
            var iframe = document.createElement('iframe');

            for(var key in options) iframe.setAttribute(key, options[key]);

            iframe.onload = function() {
                var e = document.createEvent('Events');
                e.initEvent('appready');
                document.dispatchEvent(e);
            };

            document.body.appendChild(iframe);
        }, false);

        //
        // Application has loaded. Now run Dominator.
        //
        document.addEventListener('appready', function() {
            document.removeEventListener('appready', arguments.callee, false);

            // Define the window handle for Dominator to run against
            dominator.config.window = document.getElementById('app').contentWindow;
            dominator.test();
        }, false);
    };

})(window);
