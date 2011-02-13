please.test(function() {

    module('About');

    test('should show about page', function() {
        please.open('#home')
              .click('#infoButton')
              .waitForEvent('#about', 'pageAnimationEnd')
              .waitForVisible('#about')
              .waitForNotVisible('#home')
              .click('#about a.goback')
              .waitForEvent('#about', 'pageAnimationEnd')
              .waitForVisible('#home')
              .waitForNotVisible('#about')
              .now();
    });
    
    test('should close about page', function() {
        please.open('#about')
              .click('#about a.goback')
              .waitForEvent('#home', 'pageAnimationEnd')
              .waitForVisible('#home')
              .waitForNotVisible('#about')
              .now();
    });

});