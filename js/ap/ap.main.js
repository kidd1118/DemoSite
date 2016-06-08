ap.main = function () {
    this._container = document.createElement('div');
    this._container.className = 'ap-main';
};
ap.main.prototype = {
    render: function (p) {
        if (p.appendChild) p.appendChild(this._container);
    },
    getDom: function () {
        return this._container;
    }
};
var style = dom.createElement('link', null, null, document.getElementsByTagName('head')[0]);
style.href = 'css/ap/ap-main.css';
style.type = 'text/css';
style.rel = 'stylesheet';