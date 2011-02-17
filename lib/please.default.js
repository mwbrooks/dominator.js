(function() {
    please.extend('open', function(id, callback) {
        // this.window.location = 'home.html';
        // this.window.location.hash = id;
        // setTimeout(callback, ANIMATE_DURATION);
    });
    
    please.extend('click', function(selector, callback) {
        // this.window.document.querySelectorAll(selector)
        // this.window.$(selector).trigger('click');
        // setTimeout(callback, ANIMATE_DURATION);
    });
    
    please.extend('waitForVisible', function(selector, callback) {
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
    
    please.extend('waitForNotVisible', function(selector, callback) {
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
    
    please.extend('waitForEvent', function(selector, event, callback) {
        // var self = this;
        // self.expect(1);
        //     
        // self.window.$(selector).bind(event, function() {
        //     ok(true, event + ' event fired on ' + selector);
        //     self.window.$(selector).unbind(event);
        //     callback();
        // });
    });

    please.extend('waitForPage', function(id, callback) {

    });

})();
