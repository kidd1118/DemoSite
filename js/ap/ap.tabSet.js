ap.tabSet = function (config) {
    var me = this,
        previous,
        target = config.target;

    this._data;
    this._tabs = [];
    this._container = document.createElement('div');
    this._container.className = 'ap-tabSet';
    this._onclick = function () {
        if (previous) previous.className = 'tab';
        while (target.firstChild) target.removeChild(target.firstChild);
        var idx = this.index || event.srcElement.index;
        var tab = me._tabs[idx];
        target.appendChild(me._data[idx].content);
        tab.className = 'tab focus';
        previous = tab;

    };
};
ap.tabSet.prototype = {
    load: function (data) {
        this._tabs.length = 0;
        for (var i in data) {
            var tab = dom.createElement('div', 'tab', data[i].text, this._container);
            tab.index = i;
            dom.addEventListener('click', tab, this._onclick);
            this._tabs.push(tab);
        }
        this._data = data;
    },
    render: function (p) {
        if (p.appendChild) p.appendChild(this._container);
    },
    getDom: function () {
        return this._container;
    }
};
var style = dom.createElement('link', null, null, document.getElementsByTagName('head')[0]);
style.href = 'css/ap/ap-tabSet.css';
style.type = 'text/css';
style.rel = 'stylesheet';