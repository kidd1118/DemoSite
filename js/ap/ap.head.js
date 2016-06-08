ap.head = function () {
    this._container = document.createElement('div');
    this._container.className = 'ap-head';
};
ap.head.prototype = {
    setText: function (text) {
        this._container.textContent = this._container.innerText = text;
    },
    render: function (p) {
        if (p.appendChild) p.appendChild(this._container);
    },
    getDom: function () {
        return this._container;
    }
};
var style = dom.createElement('link', null, null, document.getElementsByTagName('head')[0]);
style.href = 'css/ap/ap-head.css';
style.type = 'text/css';
style.rel = 'stylesheet';