//
// Simple Test Runner
//
// onLoad, an iFrame loads the application to test.
// You can control what application is loaded by defining window.iframe
//
// After the application has loaded in the iFrame, an 'appready' event is fired.
//
// Dominator begins to run when the 'appready' event is fired.
//
(function() {

    //
    // Load your application to test.
    //
    window.addEventListener('load', function() {
        if (typeof window.iframe === 'undefined') {
            window.iframe = document.createElement('iframe');
            iframe.setAttribute('src',         'default/index.html');
            iframe.setAttribute('id',          'app');
            iframe.setAttribute('name',        'app');
            iframe.setAttribute('width',       '320');
            iframe.setAttribute('height',      '480');
            iframe.setAttribute('scrolling',   'auto');
            iframe.setAttribute('frameborder', '0');
            // iframe.setAttribute('style', 'visibility:hidden;position:absolute;top:0px;left:0px;z-index:-1;');
        }

        //
        // Once the application is fully loaded, fire 'appready'
        //
        window.iframe.onload = function() {
            var e = document.createEvent('Events');
            e.initEvent('appready');
            document.dispatchEvent(e);
        };

        document.body.appendChild(iframe);
    }, false);

    //
    // Application has loaded. Run Dominator.
    //
    document.addEventListener('appready', function() {
        document.removeEventListener('appready', arguments.callee, false);

        // Dominator tests are written against this.window.
        // Here is where we define the handle to this.window.
        dominator.config.window = document.getElementById('app').contentWindow;

        dominator.test();
    }, false);

})();
