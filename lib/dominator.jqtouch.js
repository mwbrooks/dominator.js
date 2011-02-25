(function() {

    dominator.extend('open', function(id, callback) {
        var self = this;

        // page is already open and an animation is not in progress
        if ('#' + self.window.$('.current').attr('id') === id && self.window.$('.current').length === 1) {
            callback();
            return;
        }

        // do not fire callback until the page is finished opening
        self.window.$(id).bind('pageAnimationEnd', function() {
            self.window.$(id).unbind(event);
            callback();
        });

        self.window.jQT.goTo(id, 'pop');
    });

    dominator.extend('click', function(selector, callback) {
        var type = (this.window.jQT.support.touch) ? 'tap' : 'click';
        this.window.$(selector).trigger(type);
        callback();
    });

    dominator.extend('waitForPage', function(selector, callback) {
        var self = this;
        self.expect(1);

        // page is already loaded
        if (this.window.$('.current').attr('id') === self.window.$(selector).attr('id')) {
            ok(true, 'Page loaded for ' + selector);
            setTimeout(callback, 250);
            return;
        }

        // wait for the page to load
        self.window.$(selector).bind('pageAnimationEnd', function() {
            ok(true, 'Page loaded for ' + selector);
            self.window.$(selector).unbind('pageAnimationEnd');
            setTimeout(callback, 250);
        });
    });

    dominator.extend('waitForVisible', function(selector, callback) {
        var self = this;
        self.expect(1);
        
        var intervalId = setInterval(function() {
            var $element = self.window.$(selector);
            if ($element.is(':visible')) {
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
            var $element = self.window.$(selector);
            if ($element.is(':hidden')) {
                QUnit.ok(true, selector + ' is not visible');
                clearTimeout(intervalId);
                callback();
            }
        }, 100);
    });

    dominator.extend('waitForEvent', function(selector, event, callback) {
        var self = this;
        self.expect(1);

        if (event === 'click') {
            event = (self.window.jQT.support.touch) ? 'tap' : 'click';
        }

        self.window.$(selector).bind(event, function() {
            ok(true, event + ' event fired on ' + selector);
            self.window.$(selector).unbind(event);
            callback();
        });
    });

})();
