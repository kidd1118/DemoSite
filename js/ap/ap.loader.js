ap.loader = function () {
    function createXMLHttpRequest() {
        var xmlHttp = null;
        if (typeof XMLHttpRequest != "undefined") {
            xmlHttp = new XMLHttpRequest();
        }
        else if (typeof window.ActiveXObject != "undefined") {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.4.0");
            } catch (e) {
                try {
                    xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
                } catch (e) {
                    try {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        xmlHttp = null;
                    }
                }
            }
        }
        return xmlHttp;
    }
    this._xhttp = createXMLHttpRequest();
};
ap.loader.prototype = {
    getWeather: function (city, country, callback) {
        if (!this._xhttp) callback(null);
        var me = this;
        this._xhttp.onreadystatechange = function () {
            if (me._xhttp.readyState == 4 && me._xhttp.status == 200) {
                callback(JSON.parse(me._xhttp.responseText));
            }
        };
        this._xhttp.onerror = function () {
            callback(null);
        };
        try {
            this._xhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?APPID=d1a6f198b61ec5772db2207c243955d0&units=metric&q=' + city + ',' + country, true);
            this._xhttp.send();
        } catch (e) {
            var msg = '';
            switch (e.number) {
                case -2147024891: //ie7-9 issue
                    msg = e.message + 'please reference:https://social.msdn.microsoft.com/Forums/zh-TW/2fadcef5-eeea-4c4f-8cfe-74a993876d9e/kb-ie-70-xmlhttp-?forum=236';
                    break;
                default:
                    msg = e.message || 'loading error';
            }
            alert(msg);
            callback(null);
        }
    },
    getJS: function (list, callback, params) {
        var me = this,
            dh = document.getElementsByTagName('head')[0],
            maxNum = list.length,
            num = 0;

        //check parameters then callback
        var check = function () {
            var interval = setInterval(function () {
                for (var i in params) {
                    if (eval("typeof " + params[i]) != 'undefined') {
                        clearInterval(interval);
                        callback();
                    }
                }
            }, 50);
        };

        for (var i = 0; i < maxNum; i++) {
            var jsFile = list[i];

            var s = document.createElement('script');
            s.type = 'text/javascript';

            if (s.onreadystatechange === undefined) {
                s.onload = function () {
                    this.onload = null;
                    ++num;

                    if (num == maxNum) {
                        if (params) check();
                        else window.setTimeout(function () { callback(); }, 50);
                    }
                }
            } else {
                s.onreadystatechange = function () {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        this.onreadystatechange = null;
                        ++num;

                        if (num == maxNum) {
                            if (params) check();
                            else window.setTimeout(function () { callback(); }, 50);
                        }
                    }
                }
            }
            s.src = jsFile;
            dh.appendChild(s);
        }
    }
}
var loader = new ap.loader();