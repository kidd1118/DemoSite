var ap = function () {
    this._container = document.createDocumentFragment();
};
ap.prototype = {
    render: function (p) {
        if (p.appendChild) p.appendChild(this._container);
    },
    getDom: function () {
        return this._container;
    },
    load: function (list, callback) {
        var me = this,
            dh = document.getElementsByTagName('head')[0],
            maxNum = list.length,
            num = 0;

        for (var i = 0; i < maxNum; i++) {
            var jsFile = list[i];

            var s = document.createElement('script');
            s.type = 'text/javascript';

            if (s.onreadystatechange === undefined) {
                s.onload = function () {
                    this.onload = null;
                    ++num;

                    if (num == maxNum) {
                        window.setTimeout(function () {
                            callback();
                        }, 50);
                    }
                }
            } else {
                s.onreadystatechange = function () {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        this.onreadystatechange = null;
                        ++num;

                        if (num == maxNum) {
                            window.setTimeout(function () {
                                callback();
                            }, 50);
                        }
                    }
                }
            }
            s.src = jsFile;
            dh.appendChild(s);
        }
    }
};
var app = new ap();
app.load([
    'js/ap/ap.loader.js',
    'js/ap/ap.dom.js',
    'js/ap/ap.tabSet.js',
    'js/ap/ap.main.js',
    'js/ap/ap.head.js',
    'js/ap/ap.dataAnalysisController.js',
    'js/ap/ap.todayWeatherController.js'
], function () {
    var main = new ap.main();
    var content1 = new ap.dataAnalysisController();
    var content2 = new ap.todayWeatherController();
    var tabSet = new ap.tabSet({ target: main.getDom() });
    tabSet.load([
        { text: 'Data Analysis', content: content1.getDom() },
        { text: 'Today\'s Weather', content: content2.getDom() }
    ]);
    tabSet.render(app.getDom());
    main.render(app.getDom());
    app.render(document.body);
});
