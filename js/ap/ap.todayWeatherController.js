ap.todayWeatherController = function () {
    var me = this;

    this._container = dom.createElement('div', 'ap-todayWeatherController');

    var head = new ap.head();
    head.setText('Today\'s Weather');
    head.render(this._container);

    //error message
    this._msgError = dom.createElement('div', 'error', null, this._container);
    this._imgError = dom.createElement('img', 'img', null, this._msgError);
    this._textError = dom.createElement('div', 'text', null, this._msgError);

    //search part
    this._divSearch = dom.createElement('div', 'search', null, this._container);
    this._labelCity = dom.createElement('div', null, 'City:', this._divSearch);
    this._inputCity = dom.createElement('input', null, 'Taipei', this._divSearch);
    this._labelCountry = dom.createElement('div', null, 'Country', this._divSearch);
    this._inputCountry = dom.createElement('input', null, 'TW', this._divSearch);
    this._buttonSearch = dom.createElement('button', null, 'Search', this._divSearch);
    dom.addEventListener('click', this._buttonSearch, function () {
        me._imgLoading.style.display = "block";
        loader.getWeather(me._inputCity.value, me._inputCountry.value, function (data) {
            if (data) {
                me.setError(data.cod == '200' ? null : data);
                me.setResult(data);
            } else {
                me.setError({ message: 'No data response' });
                me.setResult();
            }
            me._imgLoading.style.display = "none";
        });
    });
    this._imgLoading = dom.createElement('div', 'loading', null, this._divSearch);

    //result part
    this._divWeather = dom.createElement('div', 'weather', null, this._container);
    this._imgWeather = dom.createElement('div', 'img NA', null, this._divWeather);
    this._divWeatherDetail = dom.createElement('div', 'detail', null, this._divWeather);
    this._textMain = dom.createElement('div', 'main', null, this._divWeatherDetail);
    this._textDesc = dom.createElement('div', 'desc', null, this._divWeatherDetail);
    this._divTemp = dom.createElement('div', 'temp', null, this._container);
    this._labelTemp = dom.createElement('div', '', 'Temperature:', this._divTemp);
    this._textTemp = dom.createElement('div', null, null, this._divTemp);
    this._divHumidity = dom.createElement('div', 'humidity', null, this._container);
    this._labelHumidity = dom.createElement('div', '', 'Humidity:', this._divHumidity);
    this._textHumidity = dom.createElement('div', null, null, this._divHumidity);
    this.setResult();
};
ap.todayWeatherController.prototype = {
    render: function (p) {
        if (p.appendChild) p.appendChild(this._container);
    },
    getDom: function () {
        return this._container;
    },
    setResult: function (data) {
        this._imgWeather.className = 'img ' + (data && data.weather && data.weather[0] ? data.weather[0].main : 'NA');
        this._textMain.textContent = this._textMain.innerText = (data && data.weather && data.weather[0] ? data.weather[0].main : '');
        this._textDesc.textContent = this._textDesc.innerText = (data && data.weather && data.weather[0] ? data.weather[0].description : '');
        this._textTemp.innerHTML = (data && data.main ? data.main.temp_min : '--') + '&deg;C ~ ' + (data && data.main ? data.main.temp_max : '--') + '&deg;C';
        this._textHumidity.textContent = this._textHumidity.innerText = (data && data.main ? data.main.humidity : '--') + '%';
    },
    setError: function (data) {
        if (data) {
            this._textError.textContent = this._textError.innerText = (data.message ? data.message.replace('Error:', '') : 'Error');
            this._msgError.style.display = 'block';
        } else {
            this._textError.textContent = this._textError.innerText = '';
            this._msgError.style.display = 'none';
        }
    }
};
var style = dom.createElement('link', null, null, document.getElementsByTagName('head')[0]);
style.href = 'css/ap/ap-todayWeatherController.css';
style.type = 'text/css';
style.rel = 'stylesheet';
