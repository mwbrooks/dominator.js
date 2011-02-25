Dominator.js
============

> Functional Test Destruction

    dominator.open('#home')
             .click('a.redButton')
             .waitForPage('#boom')
             .destroy();

Synopsis
--------

Dominator adds functional test assertions to __QUnit__.

Functional tests should be __simple to write__, __easy to read__, and __adaptable__ to any JavaScript framework.

For us, functional tests are a smoke screen. When you need more, then it is time to abstract and unit test.

Example
-------

    module('open');

    test('should open first page', function() {
        dominator.open('#home')
                 .waitForPage('#home')
                 .destroy();
    });

    module('settings');

    test('should save settings', function() {
        dominator.open('#settings')
                 .click('#save')
                 .waitForEvent('document', 'settingsChange');
                 .destroy();
    });

Usage
-----

[Dominator.js Homepage](http://mwbrooks.github.com/dominator.js/).

- [Installation](http://mwbrooks.github.com/dominator.js/#installing)
- [Getting Started](http://mwbrooks.github.com/dominator.js/#getting-started)
- [Reference](http://mwbrooks.github.com/dominator.js/#reference)
- [Customizing](http://mwbrooks.github.com/dominator.js/#customizing)
- [Community](http://mwbrooks.github.com/dominator.js/#community)
- [Contributing](http://mwbrooks.github.com/dominator.js/#contribute)
- [Acknowledgements](http://mwbrooks.github.com/dominator.js/#acknowledgement)
- [License](http://mwbrooks.github.com/dominator.js/#license)

Support
-------

Currently, dominator.js only runs in WebKit browsers.

Development
-----------

    $ git clone git://github.com/mwbrooks/dominator.js.git

    $ cd dominator.js

    $ git submodule init
    $ git submodule update

Running Tests
-------------

Open `test/index.html`