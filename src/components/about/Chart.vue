<script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
<template>
  <div id="charDiv">
  </div>
</template>
<script>
import {createChart, CrosshairMode} from "lightweight-charts";

export default {
  name: "Chart",
  props: {
    unixStartDate: Number,
    unixEndDate: Number,
    entry: String,
  },
  data: () => ({
    chart2: null,
    candleSeries: null,
    volumeSeries: null,
  }),
  methods: {
    drawChart() {
      var chartWidth = 950;
      var chartHeight = 650;
      // debugger
      var chartDivId = document.getElementById("charDiv");
      this.chart2 = createChart(chartDivId, {
        width: chartWidth,
        height: chartHeight,
        left: 10,
        layout: {
          textColor: '#000000',
          fontSize: 15,
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
            top: 0.1,
            bottom: 0.1,
          },
        },
      });
      this.candleSeries = this.chart2.addCandlestickSeries();
      this.volumeSeries = this.chart2.addHistogramSeries({
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


      this.showTradingView().then(res => {
        const cdata = res.data.map(d => {
          let colors;
          if (parseFloat(d['open']) > parseFloat(d['close'])) {
            colors = 'rgba(255,82,82, 0.3)'
          } else {
            colors = 'rgba(0, 150, 136, 0.3)'
          }
          return {
            time: parseInt(d['time'] / 1000),
            open: parseFloat(d['open']),
            high: parseFloat(d['high']),
            low: parseFloat(d['low']),
            close: parseFloat(d['close']),
            value: parseFloat(d['volume']),
            color: colors
          }
        });

        let entryTime = (this.unixStartDate / 1000)+32400;  //유닉스 타임스탬프
        let closeTime = (this.unixEndDate / 1000)+32400;	//유닉스 타임스탬프
        // let entry;
        // let exit;
        // for (var i = 1; i < cdata.length; i++) {
        //   if (cdata[i].time === entryTime) {
        //     entry = i;
        //   } else if (cdata[i].time === closeTime) {
        //     exit = i;
        //   }
        // }

        for (var i = this.findIndex(cdata,entryTime) - 30; i >= 0 ; i--) {
          cdata.splice(i, 1);
        }
        for (var i = cdata.length - 1; i > this.findIndex(cdata,closeTime) + 30; i--) {
          cdata.splice(i, 1);
        }

        this.candleSeries.setData(cdata) //캔들차트 데이터 넣기
        this.volumeSeries.setData(cdata) //볼륨 데이터 넣기

        var markers = [];
        // let EntryString = 'short' // 진입포지션 변수 가져오기
        if (this.entry === 'long') {
          markers.push({
            time: cdata[this.findIndex(cdata,entryTime)].time,
            position: 'belowBar',
            color: '#2196F3',
            shape: 'arrowUp',
            text: 'long entry '
          });
        } else if (this.entry === 'short') {
          markers.push({
            time: cdata[this.findIndex(cdata,entryTime)].time,
            position: 'aboveBar',
            color: '#d91d0f',
            shape: 'arrowDown',
            text: 'short entry '
          });
        }
        markers.push({
          time: cdata[this.findIndex(cdata,closeTime)].time,
          position: 'aboveBar',
          color: '#850fd9',
          shape: 'arrowDown',
          text: 'close '
        });

        markers.push({
          time: cdata[this.findIndex(cdata,entryTime) - 24].time,
          position: 'aboveBar',
          color: '#e91e63',
          shape: 'arrowDown',
          text: 'prev'
        });
        markers.push({
          time: cdata[this.findIndex(cdata,closeTime) + 24].time,
          position: 'aboveBar',
          color: '#e91e63',
          shape: 'arrowDown',
          text: 'after'
        });

        this.candleSeries.setMarkers(markers);
      }).catch(err => {
        console.log(err)
      })

      var legend = document.createElement('div');
      legend.classList.add('legend');
      document.body.appendChild(legend);

      var firstRow = document.createElement('div');
      firstRow.innerText = '';
      firstRow.style.color = 'black';
      legend.appendChild(firstRow);
      this.chart2.subscribeCrosshairMove((param) => {
        if (param.time) {
          const price = param.seriesPrices.get(this.candleSeries);
          const vol = param.seriesPrices.get(this.volumeSeries);
          firstRow.innerText = '시: ' + price.open + ', 고: ' + price.high + ', 저: ' + price.low + ', 종: ' + price.close + ', 볼: ' + vol;
        } else {
          firstRow.innerText = '';
        }
      });

      this.chart2.subscribeCrosshairMove((param) => {
        if (param.time) {
          const price = param.seriesPrices.get(this.candleSeries);
          const vol = param.seriesPrices.get(this.volumeSeries);
          firstRow.innerText = '시: ' + price.open + ', 고: ' + price.high + ', 저: ' + price.low + ', 종: ' + price.close + ', 볼: ' + vol;
        } else {
          firstRow.innerText = '';
        }
      });
      document.body.style.position = 'relative';

      this.chart2.applyOptions({
        timeScale: {
          timeVisible: true,
          rightOffset: 10,
          shiftVisibleRangeOnNewBar: true,
          borderVisible: true,
          visible: true,
        },
      });
    },
    findIndex(data,value) {
      let index;
      for (var i = 0; i < data.length; i++) {
        if(data[i].time === value){
          index = i;
        }
      }
      return index;
    },
    async showTradingView() {
      return this.$axios.get('/api/show/rate');
    },
    test(){
      console.log("chartTest")
    }
  }
}
</script>

<style scoped>
select {
  width: 60px;
  height: 26px;
  border-style: none;
  border: 1px solid #D7D6D6;
}

.go-to-realtime-button {
  width: 27px;
  height: 27px;
  position: absolute;
  display: none;
  padding: 6px;
  box-sizing: border-box;
  font-size: 10px;
  border-radius: 50%;
  text-align: center;
  z-index: 1000;
  color: #B2B5BE;
  background: rgba(250, 250, 250, 0.95);
  box-shadow: 0 2px 5px 0 rgba(117, 134, 150, 0.45);
  left: 572px;
  top: 268px;
}

.legend {
  position: absolute;
  left: 4px;
  top: -12px;
  z-index: 10;
  font-size: 13px;
  line-height: 50px;
  font-weight: 100;
}

.tv-lightweight-charts {
  width: 100%;
  height: 340px !important;
}

.tv-lightweight-charts table {
  height: 340px !important;
}

.tv-lightweight-charts table td {
  border-right: 0px;
}
</style>