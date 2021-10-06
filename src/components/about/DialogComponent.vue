<template>
  <div>
      <a @click="showDialog" style="color: black"> {{ test }} </a>
      <window-popup
          v-model="open"
          :open="open"
      >
<!--        <Chart-->
<!--            ref="chart"-->
<!--            :unix-start-date="unixStartDate"-->
<!--            :unix-end-date="unixEndDate"-->
<!--            :entry="entryString"-->
<!--        />-->
      </window-popup>
  </div>
</template>

<script>
import WindowPopup from "@/components/about/WindowPopup";

export default {
  name: "DialogComponent",
  components: {
    WindowPopup,
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
      }
    },
  }
}
</script>

<style scoped>
</style>