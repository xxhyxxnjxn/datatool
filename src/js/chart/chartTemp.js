import { createChart } from 'lightweight-charts';
import { CrosshairMode } from 'lightweight-charts';

var chartWidth = 600;
var chartHeight = 300;

var chart = createChart(this.$ref.chart, {
    width: chartWidth,
    height: chartHeight,
    left: 10,
    layout: {
        textColor: '#000000',
    },
    crosshair: {
        mode: CrosshairMode.Normal,
    },

    localization: {
        locale: 'ko-KR',

    },
    watermark: {
        color: 'rgba(11, 94, 29, 0.4)',
        visible: false,
        text: 'TradingView Chart',
        fontSize: 24,
        horzAlign: 'left',
        vertAlign: 'bottom',
    },
    priceScale: {
        autoScale: true,
        alignLabels: true,
        borderVisible: true,
        borderColor: '#2b2b43',
        scaleMargins: {
            top: 0.30,
            bottom: 0.25,
        },
    },
});

var candleSeries = chart.addCandlestickSeries();
var volumeSeries = chart.addHistogramSeries({
    priceFormat: {
        type: 'volume',
    },
    priceLineVisible: true,
    priceScaleId: '',
    scaleMargins: {
        top: 0.85,
        bottom: 0,
    },
});

export default function update(data) {
    const cdata = data.map(d => {
        let colors;
        if (parseFloat(d['open']) > parseFloat(d['close'])) {
            colors = 'rgba(255,82,82, 0.3)'
        } else {
            colors = 'rgba(0, 150, 136, 0.3)'
        }
        return {
            time: parseInt(d['time']),
            open: parseFloat(d['open']),
            high: parseFloat(d['high']),
            low: parseFloat(d['low']),
            close: parseFloat(d['close']),
            value: parseFloat(d['volume']),
            color: colors
        }
    });

    candleSeries.setData(cdata) //캔들차트 데이터 넣기
    volumeSeries.setData(cdata) //볼륨 데이터 넣기
    let entryTime = 1630944000  //유닉스 타임스탬프
    let closeTime = 1630998000	//유닉스 타임스탬프
    let entry;
    let exit;
    for (var i = 1; i < cdata.length; i++) {
        if (cdata[i].time == entryTime) {
            entry = i;
        } else if (cdata[i].time == closeTime) {
            exit = i;
        }
    }
    var markers = [];
    let EntryString = 'short' // 진입포지션 변수 가져오기
    if (EntryString == 'long') {
        markers.push({
            time: cdata[entry].time,
            position: 'belowBar',
            color: '#2196F3',
            shape: 'arrowUp',
            text: 'long entry '
        });
    } else if (EntryString == 'short') {
        markers.push({
            time: cdata[entry].time,
            position: 'aboveBar',
            color: '#d91d0f',
            shape: 'arrowDown',
            text: 'short entry '
        });
    }
    markers.push({time: cdata[exit].time, position: 'aboveBar', color: '#850fd9', shape: 'arrowDown', text: 'close '});

    candleSeries.setMarkers(markers);
}

chart.subscribeCrosshairMove((param) => {
    if (param.time) {
        const price = param.seriesPrices.get(candleSeries);
        const vol = param.seriesPrices.get(volumeSeries);
        firstRow.innerText = '시: ' + price.open + ', 고: ' + price.high + ', 저: ' + price.low + ', 종: ' + price.close + ', 볼: ' + vol;
    } else {
        firstRow.innerText = '';
    }
});
document.body.style.position = 'relative';

var legend = document.createElement('div');
legend.classList.add('legend');
document.body.appendChild(legend);


var firstRow = document.createElement('div');
firstRow.innerText = '';
firstRow.style.color = 'black';
legend.appendChild(firstRow);
chart.subscribeCrosshairMove((param) => {
    if (param.time) {
        const price = param.seriesPrices.get(candleSeries);
        const vol = param.seriesPrices.get(volumeSeries);
        firstRow.innerText = '시: ' + price.open + ', 고: ' + price.high + ', 저: ' + price.low + ', 종: ' + price.close + ', 볼: ' + vol;
    } else {
        firstRow.innerText = '';
    }
});

//날짜표시 초까지 표시
chart.applyOptions({
    timeScale: {
        timeVisible: true,
        rightOffset: 10,
        shiftVisibleRangeOnNewBar: true,
        borderVisible: true,
        visible: true,
    },
});