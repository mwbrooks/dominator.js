please.test(function() {

    module('UI');

    test('should show UI page', function() {
        please.open('#home')
              .click('#home a[href=#ui]')
              .waitForEvent('#ui', 'pageAnimationEnd')
              .waitForVisible('#ui')
              .waitForNotVisible('#home')
              .now();
    });

    test('should show Edge-to-Edge', function() {
        please.open('#ui')
              .click('#ui a[href=#edge]')
              .waitForEvent('#edge', 'pageAnimationEnd')
              .waitForVisible('#edge')
              .waitForNotVisible('#ui')
              .now();
    });

});