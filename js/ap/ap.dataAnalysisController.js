ap.dataAnalysisController = function () {
    var me = this;
    this._container = dom.createElement('div', 'ap-dataAnalysisController');

    var head = new ap.head();
    head.setText('Data Analysis');
    head.render(this._container);

    this._chart = dom.createElement('div', 'chart', null, this._container);

    loader.getJS([
        'https://www.amcharts.com/lib/3/amcharts.js'
    ], function () {
        loader.getJS([
            'https://www.amcharts.com/lib/3/serial.js',
            'https://www.amcharts.com/lib/3/themes/light.js'
        ], function () {
            var chart = AmCharts.makeChart(me._chart, {
                'type': 'serial',
                'theme': 'light',
                'titles': [
                    { 'text': 'Birth in Taiwan', 'size': 20 },
                    { 'text': 'Source: Ministry of the Interiror', "bold": false, "color": "gray" }
                ],
                'marginRight': 20,
                'autoMarginOffset': 20,
                'dataDateFormat': 'YYYY-MM-DD HH:NN',
                'legend': {
                    'equalWidths': false,
                    'position': 'right',
                    'switchable': false
                },
                'dataProvider': [{
                    'year': '2007',
                    'men': 106898,
                    'female': 97516
                }, {
                    'year': '2008',
                    'men': 103937,
                    'female': 94796
                }, {
                    'year': '2009',
                    'men': 99492,
                    'female': 91818
                }, {
                    'year': '2010',
                    'men': 87213,
                    'female': 79673
                }, {
                    'year': '2011',
                    'men': 101943,
                    'female': 94684
                }, {
                    'year': '2012',
                    'men': 118848,
                    'female': 110633
                }, {
                    'year': '2013',
                    'men': 103120,
                    'female': 95993
                }],
                'graphs': [{
                    'balloonText': '[[category]]<br><b><span style="font-size:14px;">value:[[men]]</span></b>',
                    'bullet': 'round',
                    'dashLength': 3,
                    'colorField': 'color',
                    'title': 'Men',
                    'valueField': 'men'
                }, {

                    'balloonText': '[[category]]<br><b><span style="font-size:14px;">value:[[female]]</span></b>',
                    'bullet': 'round',
                    'dashLength': 3,
                    'colorField': 'color',
                    'title': 'Female',
                    'valueField': 'female'
                }],
                'valueAxes': [{
                    'stackType': 'regular',
                    'position': 'left',
                    'title': 'People'
                }],
                'categoryField': 'year',
                'categoryAxis': {
                    'parseDates': false,
                    'axisAlpha': 0,
                    'gridAlpha': 0.1,
                    'minorGridAlpha': 0.1,
                    'minorGridEnabled': true
                }
            });

            chart.addListener('dataUpdated', zoomChart);

            function zoomChart() {
                chart.zoomToDates(new Date(2012, 0, 2), new Date(2012, 0, 13));
            }
        });
    }, ["AmCharts"]);

};
ap.dataAnalysisController.prototype = {
    render: function (p) {
        if (p.appendChild) p.appendChild(this._container);
    },
    getDom: function () {
        return this._container;
    }
};
var style = dom.createElement('link', null, null, document.getElementsByTagName('head')[0]);
style.href = 'css/ap/ap-dataAnalysisController.css';
style.type = 'text/css';
style.rel = 'stylesheet';