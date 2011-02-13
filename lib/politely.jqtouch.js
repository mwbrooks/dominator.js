(function() {
    politely.extend('open', function(id, callback) {
        if ('#' + this.window.$('.current').attr('id') === id) {
            callback();
            return;
        }

        var self = this;
        self.window.$(id).bind('pageAnimationEnd', function() {
            self.window.$(id).unbind(event);
            callback();
        });

        self.window.jQT.goTo(id);
    });

    politely.extend('click', function(selector, callback) {
        this.window.$(selector).trigger('click');
    });

    politely.extend('waitForVisible', function(selector, callback) {
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

    politely.extend('waitForNotVisible', function(selector, callback) {
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

    politely.extend('waitForEvent', function(selector, event, callback) {
        var self = this;
        self.expect(1);

        self.window.$(selector).bind(event, function() {
            ok(true, event + ' event fired on ' + selector);
            self.window.$(selector).unbind(event);
            callback();
        });
    });

})()