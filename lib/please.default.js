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

    please.extend('open', function(id, callback) {
        id = toPage(id);
        this.window.location.href = id;
        waitForPage(this, id, callback);
    });
    
    please.extend('click', function(selector, callback) {
        var e = document.createEvent('MouseEvents');
        e.initEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

        var el = this.window.document.querySelector(selector);
        el.dispatchEvent(e);
        callback();
    });
    
    please.extend('waitForVisible', function(selector, callback) {
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
    
    please.extend('waitForNotVisible', function(selector, callback) {
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
    
    please.extend('waitForEvent', function(selector, event, callback) {
        var self = this;
        self.expect(1);

        self.window.document.querySelector(selector).addEventListener(event, function() {
            ok(true, event + ' event fired on ' + selector);
            self.window.removeEventListener(event, arguments.callee, false);
            callback();
        }, false);
    });

    please.extend('waitForPage', function(id, callback) {
        var self = this;
        waitForPage(this, toPage(id), callback);
    });

})();
