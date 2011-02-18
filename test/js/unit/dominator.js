dominator.test(function() {

    module('open');

    test('should open first page', function() {
        dominator.open('#home')
              .waitForPage('#home')
              .now();
    });

    test('should open a sub-page', function() {
        dominator.open('#ui')
              .waitForPage('#ui')
              .now();
    });

    test('should open many pages', function() {
        dominator.open('#home')
              .waitForPage('#home')
              .open('#ui')
              .waitForPage('#ui')
              .open('#callbacks')
              .waitForPage('#callbacks')
              .open('#home')
              .waitForPage('#home')
              .now();
    });

    test('should implicitly wait for each page to open', function() {
        dominator.open('#home')
              .open('#ui')
              .open('#callbacks')
              .now();
    });

    test('can open the same page multiple times', function() {
        dominator.open('#home')
              .open('#home')
              .open('#home')
              .waitForPage('#home')
              .now();
    });

    module('click');

    test('should fire click event', function() {
        dominator.open('#home')
              .click('#home a[href="#ui"]')
              .waitForEvent('#home a[href="#ui"]', 'click')
              .now();
    });

    test('should navigate to a page', function() {
        dominator.open('#home')
              .click('#home a[href="#ui"]')
              .waitForPage('#ui')
              .now();
    });

    test('can be the last action', function() {
        dominator.open('#home')
              .click('#home a[href="#ui"]')
              .now();
    });

    module('waitForEvent');

    test('should fire a click event', function() {
        dominator.open('#home')
              .click('#home a[href="#ui"]')
              .waitForEvent('#home a[href="#ui"]', 'click')
              .waitForPage('#ui')
              .now();
    });

    module('waitForVisible');

    test('should wait until back button is visible', function() {
        dominator.open('#home')
              .click('#home a[href="#ui"]')
              .waitForPage('#ui')
              .waitForVisible('#ui a.back')
              .now();
    });

    module('waitForNotVisible');

    test('should wait until About button is not visible', function() {
        dominator.open('#home')
              .waitForVisible('#infoButton')
              .click('#home a[href="#ui"]')
              .waitForPage('#ui')
              .waitForNotVisible('#infoButton')
              .now();
    });

    module('waitForPage');

    test('should wait until UI page is shown', function() {
        dominator.open('#home')
              .click('#home a[href="#ui"]')
              .waitForPage('#ui')
              .now();
    });
});