(function() {
    window.addEventListener('load', function() {
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src',         '../../vendor/jqtouch/demos/main/index.html');
        iframe.setAttribute('id',          'app');
        iframe.setAttribute('name',        'app');
        iframe.setAttribute('width',       '320');
        iframe.setAttribute('height',      '480');
        iframe.setAttribute('scrolling',   'auto');
        iframe.setAttribute('frameborder', '0');
        // iframe.setAttribute('style', 'visibility:hidden;position:absolute;top:0px;left:0px;z-index:-1;');
        iframe.onload = function() {
            var e = document.createEvent('Events');
            e.initEvent('appready');
            document.dispatchEvent(e);
        };

        document.body.appendChild(iframe);
    }, false);
})();