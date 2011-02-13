(function(scope) {
    // Prevent QUnit from running the tests at the onload event
    // Manually start the tests with QUnit.start();
    QUnit.config.autostart = false;

    // Reset QUnit session storage because it does more harm than good
    sessionStorage.clear();

    var Politely = function() {
        this.config = {};
        this.tests  = [];
        this.tasks  = [];
    };

    Politely.prototype.extend = function(name, fn) {
        var self = this;

        Politely.prototype[name] = function() {
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
    };

    Politely.prototype.now = function() {
        var self = this;
        QUnit.stop();

        (function runner() {
            if (self.tasks.length <= 0) { QUnit.start(); return; }
            var task = self.tasks.shift();

            if (self.tasks.length > 0 && self.tasks[0].name === 'waitForEvent') {
                // run the event task  and allow it to call the next task.
                // run the action task and block it from calling the next task.
                self.tasks.shift().task(runner);
                task.task(function(){})
            }
            else {
                task.task(runner);
            }
        })();
    };

    Politely.prototype.expect = function(count) {
        QUnit.expect(QUnit.config.current.expected + count);
    };

    Politely.prototype.test = function() {
        if (arguments.length > 0) {
            this.tests.push(arguments[0]);
        }
        else {
            this.tests.forEach(function(t) { t(); });
            this.window = this.config.window || window;
            QUnit.start();
        }
    };

    scope.politely = scope.please = new Politely();

    politely.extend('open', function(id, callback) {
        this.window.location = 'home.html';
        // this.window.location.hash = id;
        // setTimeout(callback, ANIMATE_DURATION);
    });
    
    politely.extend('click', function(selector, callback) {
        this.window.document.querySelectorAll(selector)
        // this.window.$(selector).trigger('click');
        // setTimeout(callback, ANIMATE_DURATION);
    });
    
    politely.extend('waitForVisible', function(selector, callback) {
        // var self = this;
        // self.expect(1);
        // 
        // var intervalId = setInterval(function() {
        //     var $element = self.window.$(selector);
        //     if ($element.is(':visible')) {
        //         QUnit.ok(true, selector + ' is visible');
        //         clearTimeout(intervalId);
        //         callback();
        //     }
        // }, 100);
    });
    
    politely.extend('waitForNotVisible', function(selector, callback) {
        // var self = this;
        // self.expect(1);
        //     
        // var intervalId = setInterval(function() {
        //     var $element = self.window.$(selector);
        //     if ($element.is(':hidden')) {
        //         QUnit.ok(true, selector + ' is not visible');
        //         clearTimeout(intervalId);
        //         callback();
        //     }
        // }, 100);
    });
    
    politely.extend('waitForEvent', function(selector, event, callback) {
        // var self = this;
        // self.expect(1);
        //     
        // self.window.$(selector).bind(event, function() {
        //     ok(true, event + ' event fired on ' + selector);
        //     self.window.$(selector).unbind(event);
        //     callback();
        // });
    });

})(window);
