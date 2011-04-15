(function(scope) {
 
    // Prevent QUnit from running the tests at the onload event
    // Manually start the tests with QUnit.start();
    QUnit.config.autostart = false;

    // Reset QUnit session storage because it does more harm than good
    sessionStorage.clear();

    // Begin Domination

    var Dominator = function() {
        this.config = {};
        this.tests  = [];
        this.tasks  = [];
        this.fn     = Dominator.prototype;
    };

    Dominator.prototype = {

        extend: function(name, fn) {
            var self = this;

            Dominator.prototype[name] = function() {
                var args = Array.prototype.slice.call(arguments);

                self.tasks.push({
                    name: name,
                    task: function(callback) {
                        args.push(callback)
                        fn.apply(self, args);
                    }
                });

                return self;
            };
        },

        expect: function(count) {
            QUnit.expect(QUnit.config.current.expected + count);
        },

        destroy: function() {
            var self = this;
            QUnit.stop();

            // Configuration
            this.window = this.config.window || window;

            (function runner() {
                if (self.tasks.length <= 0) {
                    QUnit.start();
                    return;
                }

                var task = self.tasks.shift();

                // @todo need to allow tasks indicate that they must preceed an action.
                //       example: extend('waitForEvent', { waitForAction:true }, function() {});

                if (self.tasks.length > 0 && (self.tasks[0].name === 'waitForEvent' ||
                                              self.tasks[0].name === 'waitForPage')) {
                    // run the wait task and allow it to call the next task (continue the chain).
                    self.tasks.shift().task(runner);
                    // run the action task and block it from calling the next task.
                    task.task(function(){});
                }
                else {
                    task.task(runner);
                }
            })();
        }
    };

    scope.dominator = new Dominator();

})(window);

//
// Application Loader
//
// dominator.load(options)
//   - loads your application into an iframe
//   - waits for your application to load
//   - runs your test suite
//
(function() {

    dominator.fn.load = function(options) {
        //
        // Inject your application as an iFrame
        //
        window.addEventListener('load', function() {
            var iframe = document.createElement('iframe');

            for(var key in options) iframe.setAttribute(key, options[key]);

            iframe.onload = function() {
                var e = document.createEvent('Events');
                e.initEvent('appready', true, false);
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

            // Run QUnit tests
            QUnit.start();
        }, false);
    };

})();

//
// Default Actions
//
// Feel free to override these by creating a new file
// such as 'dominator.mine.js' and replace actions using:
//
//     dominator.extend('open', function(id, callback) {
//         console.log('my take on open.');
//         callback();
//      });
//
(function() {

    function toPage(id) {
        return 'default/' + id.replace(/^#/, '') + '.html';
    }

    function waitForPage(self, page, callback) {
        self.expect(1);

        var intervalId = setInterval(function() {
            if (self.window && self.window.location.href.indexOf(page) >= 0) {
                QUnit.ok(true, page + ' loaded');
                clearTimeout(intervalId);
                callback();
            }
        }, 100);
    }

    dominator.extend('open', function(id, callback) {
        id = toPage(id);
        this.window.location.href = id;
        waitForPage(this, id, callback);
    });

    dominator.extend('click', function(selector, callback) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        var el = this.window.document.querySelector(selector);
        el.dispatchEvent(e);
        callback();
    });

    dominator.extend('waitForVisible', function(selector, callback) {
        var self = this;
        self.expect(1);

        var intervalId = setInterval(function() {
            var element = self.window.document.querySelector(selector);
            var style   = self.window.getComputedStyle(element, null);

            if (style && style.display !== 'none' && style.visibility === 'visible') {
                QUnit.ok(true, selector + ' is visible');
                clearTimeout(intervalId);
                callback();
            }
        }, 100);
    });

    dominator.extend('waitForNotVisible', function(selector, callback) {
        var self = this;
        self.expect(1);

        var intervalId = setInterval(function() {
            var element = self.window.document.querySelector(selector);
            var style   = self.window.getComputedStyle(element, null);

            if (!element || !style || style.display === 'none' || style.visiblity !== 'visible') {
                QUnit.ok(true, selector + ' is not visible');
                clearTimeout(intervalId);
                callback();
            }
        }, 100);
    });
    
    dominator.extend('waitForEvent', function(selector, event, callback) {
        var self = this;
        self.expect(1);

        self.window.document.querySelector(selector).addEventListener(event, function() {
            ok(true, event + ' event fired on ' + selector);
            self.window.removeEventListener(event, arguments.callee, false);
            callback();
        }, false);
    });

    dominator.extend('waitForPage', function(id, callback) {
        var self = this;
        waitForPage(this, toPage(id), callback);
    });

})();
