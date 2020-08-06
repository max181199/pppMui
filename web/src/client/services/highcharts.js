import Highcharts from 'highcharts/highstock';

Highcharts.setOptions({
  lang: {
        loading: 'Загрузка...',
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortMonths: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт', 'Нояб', 'Дек'],
        exportButtonTitle: "Экспорт",
        printButtonTitle: "Печать",
        rangeSelectorFrom: "С",
        rangeSelectorTo: "По",
        rangeSelectorZoom: "Период",
        downloadPNG: 'Скачать PNG',
        downloadJPEG: 'Скачать JPEG',
        downloadPDF: 'Скачать PDF',
        downloadSVG: 'Скачать SVG',
        printChart: 'Напечатать график'
  }
});

Highcharts.wrap(Highcharts.Series.prototype, 'drawLegendSymbol', function (proceed, legend) {
    proceed.call(this, legend);
    this.legendLine.attr({
        "stroke-width": "3"
    });
});

const defaultOptions = {
  chart: {
    zoomType: 'x',
    height: '20%',
  },
  title: {
    text: '',
    floating: true,
    align: 'center',
    y: 27,
    style: { "color": "black", "fontSize": "18px", "fontFamily": "'Roboto', sans-serif" }
  },
  series: [{}],
  legend: {
    enabled: true,
    align: 'right',
    x: -45,
    padding: 10,
    itemMarginTop: 0,
    itemMarginBottom: 5,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    verticalAlign: 'top',
    itemStyle: {"color": "black", "fontSize": "15px", "fontWeight": "300", "fontFamily": "'Roboto', sans-serif"},
  },
  tooltip: {
    xDateFormat: '%d.%m.%Y',
    shared: true,
    split: false,
    useHTML: true,
    backgroundColor: 'rgba(245,245,245,0.9)',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 0,
    style: {"color": "black", "fontSize": "14px", "fontFamily": "'Roboto', sans-serif"},
    headerFormat: '<span style="font-size: 14px; font-family: "Roboto", sans-serif;">{point.key}</span><br/><br/>',
    formatter: function () {
      let res = `<b> ${new Date(this.x).toLocaleString('ru', {year: 'numeric', month: 'numeric', day: 'numeric'})} </b>`;
      this.points.map((item) => {
        res += `<br/><span style="color:${item.color}">\u25CF</span>${item.series.name}: ${item.y} ${(item.point.comment) ? `Комментарий: ${item.point.comment}` : ''}`
      });
      return res;
    }
  },
  xAxis: {
    type: 'datetime',
    labels: {
      format: '{value: %d.%m.%Y}'
    }
  },
  scrollbar: {
    enabled: false
  },
  navigator: {
    margin: 3,
    handles: {
        backgroundColor: 'white',
        borderColor: 'rgb(211, 211, 211)'
    }
  },
  yAxis: {
    opposite: false,
    lineWidth: 1
  },
  rangeSelector: false,
  credits: {
    enabled: false
  }
}

export { Highcharts, defaultOptions }
