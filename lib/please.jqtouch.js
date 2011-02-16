(function() {
    please.extend('open', function(id, callback) {
        var self = this;

        // page is already open and an animation is not in progress
        if ('#' + self.window.$('.current').attr('id') === id && self.window.$('.current').length === 1) {
            callback();
            return;
        }

        // @todo if open is called while the page of interest is opening, then
        //       the following event will capture it and fire, then hang on the next
        //       open call

        // do not fire callback until the page is finished opening
        self.window.$(id).bind('pageAnimationEnd', function() {
            self.window.$(id).unbind(event);
            callback();
        });

        self.window.jQT.goTo(id, 'pop');
    });

    please.extend('click', function(selector, callback) {
        // @todo if click is the last action, then the test will hang because callback is not fired
        this.window.$(selector).trigger('click');
    });

    please.extend('waitForPage', function(selector, callback) {
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

    please.extend('waitForVisible', function(selector, callback) {
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

    please.extend('waitForNotVisible', function(selector, callback) {
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

    please.extend('waitForEvent', function(selector, event, callback) {
        var self = this;
        self.expect(1);

        self.window.$(selector).bind(event, function() {
            ok(true, event + ' event fired on ' + selector);
            self.window.$(selector).unbind(event);
            callback();
        });
    });

})();
