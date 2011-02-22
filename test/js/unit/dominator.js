module('open');

test('should open first page', function() {
    dominator.open('#home')
          .waitForPage('#home')
          .destroy();
});

test('should open a sub-page', function() {
    dominator.open('#ui')
          .waitForPage('#ui')
          .destroy();
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
          .destroy();
});

test('should implicitly wait for each page to open', function() {
    dominator.open('#home')
          .open('#ui')
          .open('#callbacks')
          .destroy();
});

test('can open the same page multiple times', function() {
    dominator.open('#home')
          .open('#home')
          .open('#home')
          .waitForPage('#home')
          .destroy();
});

module('click');

test('should fire click event', function() {
    dominator.open('#home')
          .click('#home a[href="#ui"]')
          .waitForEvent('#home a[href="#ui"]', 'click')
          .destroy();
});

test('should navigate to a page', function() {
    dominator.open('#home')
          .click('#home a[href="#ui"]')
          .waitForPage('#ui')
          .destroy();
});

test('can be the last action', function() {
    dominator.open('#home')
          .click('#home a[href="#ui"]')
          .destroy();
});

module('waitForEvent');

test('should fire a click event', function() {
    dominator.open('#home')
          .click('#home a[href="#ui"]')
          .waitForEvent('#home a[href="#ui"]', 'click')
          .waitForPage('#ui')
          .destroy();
});

module('waitForVisible');

test('should wait until back button is visible', function() {
    dominator.open('#home')
          .click('#home a[href="#ui"]')
          .waitForPage('#ui')
          .waitForVisible('#ui a.back')
          .destroy();
});

module('waitForNotVisible');

test('should wait until About button is not visible', function() {
    dominator.open('#home')
          .waitForVisible('#infoButton')
          .click('#home a[href="#ui"]')
          .waitForPage('#ui')
          .waitForNotVisible('#infoButton')
          .destroy();
});

module('waitForPage');

test('should wait until UI page is shown', function() {
    dominator.open('#home')
          .click('#home a[href="#ui"]')
          .waitForPage('#ui')
          .destroy();
});
