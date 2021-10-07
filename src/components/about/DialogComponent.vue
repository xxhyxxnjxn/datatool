<template>
  <div>
    <a @click="showDialog" style="color: black"> {{ test }} </a>
    <window-popup
        :open="open"
        v-on:open="doOpen"
    >
      <v-card>
        <v-card-title>
          CHART
        </v-card-title>
        <v-card-subtitle>
          {{ this.startDate }} ~ {{ this.endDate }}
        </v-card-subtitle>
        <v-card-text>
          <Chart
              ref="chart"
              :unix-start-date="unixStartDate"
              :unix-end-date="unixEndDate"
              :entry="entryString"
          />
        </v-card-text>
      </v-card>
      <!--        <Chart-->
      <!--            ref="chart"-->
      <!--        ></Chart>-->
    </window-popup>
  </div>
</template>

<script>
import WindowPopup from "@/components/about/WindowPopup";
import Chart from "@/components/about/Chart";

export default {
  name: "DialogComponent",
  components: {
    WindowPopup,
    Chart,
  },
  props: {
    startDate: String,
    endDate: String,
    tradeTotal: Array,
    test: String,
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1000)

      this.loader = null
    },
  },
  data: () => ({
    loader: null,
    loading: false,
    dialog: false,
    snackbar: false,
    text: '',
    unixStartDate: null,
    unixEndDate: null,
    entryString: null,
    open: false,
  }),
  methods: {
    showDialog() {
      if (this.tradeTotal[0].entry.includes("short")) {
        this.entryString = "short";
      } else if (this.tradeTotal[0].entry.includes("long")) {
        this.entryString = "long";
      }

      if (this.startDate.length === 0 || this.endDate.length === 0) {
        this.text = '날짜를 선택해주세요.';
        this.snackbar = true;
      } else {
        this.unixStartDate = new Date(this.startDate).valueOf();
        this.unixEndDate = new Date(this.endDate).valueOf();

        this.dialog = true;
        this.open = true;
        // this.$refs.chart.drawChart();
      }
    },
    doOpen(d){
      this.open = d;
    }
  }
}
</script>

<style scoped>
</style>