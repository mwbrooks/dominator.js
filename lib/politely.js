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

})(window);
