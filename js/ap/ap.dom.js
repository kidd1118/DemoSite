ap.dom = function () { };
ap.dom.prototype = {
    createElement: function (type, className, text, appendTo) {
        var dom = document.createElement(type);
        if (className != null && className != undefined) dom.className = className;
        if (text != null && text != undefined) {
            if (dom.textContent != undefined) dom.textContent = text;
            if (dom.innerText != undefined) dom.innerText = text;
            if (dom.value != undefined) dom.value = text;
        }
        if (appendTo != null && appendTo != undefined) appendTo.appendChild(dom);
        return dom;
    },
    addEventListener: function (evnt, elem, func) {
        if (elem.addEventListener)
            elem.addEventListener(evnt, func, false);
        else if (elem.attachEvent) {
            elem.attachEvent("on" + evnt, func);
        } else {
            elem[evnt] = func;
        }
    }
}
var dom = new ap.dom();
