<template>
  <div class="pb-5">
    <v-banner class="pb-5">Total</v-banner>
    <v-row
        no-gutters>
      <v-col
      ></v-col>
      <v-col
      >
        <my-text-field-component
            v-bind:fieldValue.sync="firstTableMinValue"
            :label-name="min"
            :is-show="showFirstTable"
        ></my-text-field-component>
      </v-col>
      <v-col>
        <my-text-field-component
            v-bind:fieldValue.sync="firstTableMaxValue"
            :label-name="max"
            :is-show="showFirstTable"
        ></my-text-field-component>
      </v-col>
      <v-col>
        <my-text-field-component
            v-bind:fieldValue.sync="firstTableIntervalValue"
            :label-name="interval"
            :is-show="showFirstTable"
        ></my-text-field-component>
      </v-col>
      <v-col>
        <v-btn
            class="mt-2"
            depressed
            color="primary"
            width="90px"
            v-show="showFirstTable"
            @click="firstPercentSubmit"
        >
          total
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
            class="mt-2"
            depressed
            color="primary"
            width="90px"
            v-show="showFirstTable"
            @click="firstPositionSubmit"
        >
          position
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
            class="mt-2"
            depressed
            color="primary"
            width="90px"
            v-show="showFirstTable"
            @click="firstReturn"
        >
          return
        </v-btn>
      </v-col>
      <v-col
      >
        <my-text-field-component
            v-bind:fieldValue.sync="secondTableMinValue"
            :label-name="min"
            :is-show="showSecondTable"
        ></my-text-field-component>
      </v-col>
      <v-col
      >
        <my-text-field-component
            v-bind:fieldValue.sync="secondTableMaxValue"
            :label-name="max"
            :is-show="showSecondTable"
        ></my-text-field-component>
      </v-col>
      <v-col
      >
        <my-text-field-component
            v-bind:fieldValue.sync="secondTableIntervalValue"
            :label-name="interval"
            :is-show="showSecondTable"
        ></my-text-field-component>
      </v-col>
      <v-col
      >
        <v-btn
            class="mt-2"
            depressed
            color="primary"
            width="90px"
            v-show="showSecondTable"
            @click="secondPercentSubmit"
        >
          total
        </v-btn>
      </v-col>
      <v-col
      >
        <v-btn
            class="mt-2"
            depressed
            color="primary"
            width="90px"
            v-show="showSecondTable"
            @click="secondPositionSubmit"
        >
          position
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
            class="mt-2"
            depressed
            color="primary"
            width="90px"
            v-show="showSecondTable"
            @click="secondReturn"
        >
          return
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3">
        <v-card v-show="showFirstTable">
          <div class="pa-3"> {{ firstTableName }}</div>
          <MyDataTableComponent
              :headers="headers"
              :items="tradeTotalsFirstTable"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
      <v-col cols=5 class="pl-3">
        <v-card v-show="showSecondTable">
          <div class="pa-3"> {{ secondTableNames }}</div>
            <MyDataTableComponent
                :headers="headers"
                :items="tradeTotalsSecondTable"
                :customSlotInfo=customSlotInfo
                :hide-footer="true"
                :hide-header="false"
            >
              <template v-for="test in customSlotInfo"
                        v-slot:[`${test.name}_custom`]="{item}">
                {{ parseFloatData(item[`${test.name}`]) }}
              </template>
            </MyDataTableComponent>
        </v-card>
      </v-col>
    </v-row>
    <!-- 리스트 3개 추출 테이블 영역 -->
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3 pt-7">
        <div v-show="showFirstTradeTotalMaxData"> {{ kindOfButtonFirst }} </div>
        <v-card v-show="showFirstTradeTotalMaxData">
          <div class="pa-3">순수익</div>
          <MyDataTableComponent
              :headers="headers"
              :items="tradeTotalMaxRevenuePer"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="firstMaxRevenuePerTableRowClick"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
      <v-col cols=5 class="pl-3 pt-7">
        <div v-show="showSecondTradeTotalMaxData">
          {{kindOfButtonSecond}}
        </div>
        <v-card v-show="showSecondTradeTotalMaxData">
          <div class="pa-3">순수익</div>
          <MyDataTableComponent
              :headers="headers"
              :items="secondTradeTotalMaxRevenuePer"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="secondMaxRevenuePerTableRowClick"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3">
        <v-card v-show="showFirstTradeTotalMaxData">
          <div class="pa-3">손실률</div>
          <MyDataTableComponent
              :headers="headers"
              :items="tradeTotalMaxLossPer"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="firstMaxLossPerTableRowClick"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
      <v-col cols=5 class="pl-3">
        <v-card v-show="showSecondTradeTotalMaxData">
          <div class="pa-3">손실률</div>
          <MyDataTableComponent
              :headers="headers"
              :items="secondTradeTotalMaxLossPer"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="secondMaxLossPerTableRowClick"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3">
        <v-card v-show="showFirstTradeTotalMaxData">
          <div class="pa-3">승률</div>
          <MyDataTableComponent
              :headers="headers"
              :items="tradeTotalMaxVictoryPer"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="firstMaxVictoryPerTableRowClick"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
      <v-col cols=5 class="pl-3">
        <v-card v-show="showSecondTradeTotalMaxData">
          <div class="pa-3">승률</div>
          <MyDataTableComponent
              :headers="headers"
              :items="secondTradeTotalMaxVictoryPer"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="secondMaxVictoryPerTableRowClick"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
    </v-row>
    <MySnackBarComponent
        v-bind:snackbar.sync="snackbar"
        :text="text"
    >
    </MySnackBarComponent>
  </div>
</template>

<script>
import MyDataTableComponent from "@/components/about/MyDataTableComponent";
import MySnackBarComponent from "@/components/about/MySnackBarComponent";
import MyTextFieldComponent from "@/components/about/MyTextFieldComponent";

export default {
  name: "TotalComponent",
  components: {
    MyDataTableComponent,
    MySnackBarComponent,
    MyTextFieldComponent,
  },
  props: {
    response: Object,
    secondResponse: Object,
    firstMaxData: Object,
    secondMaxData: Object,
    firstMaxDataPosition: Object,
    secondMaxDataPosition: Object,
  },
  watch: {
    response: {
      deep: true,
      handler(newVal) {
        this.response = newVal;

        this.tradeTotalsFirstTable = [];
        this.tradeTotalsFirstTable.push(this.response.tradeTotal);
        this.showFirstTable = true;
      }
    },
    secondResponse: {
      deep: true,
      handler(newVal) {
        this.secondResponse = newVal;

        this.tradeTotalsSecondTable = [];
        this.tradeTotalsSecondTable.push(this.secondResponse.tradeTotal);
        this.showSecondTable = true;
      }
    },
    firstMaxData: {
      deep: true,
      handler(newVal) {
        this.tradeTotalMaxLossPer = [];
        this.tradeTotalMaxRevenuePer = [];
        this.tradeTotalMaxVictoryPer = [];

        newVal.tradeTableMaxLossPerData.tradeTotal.category = newVal.tradeTableMaxLossPerData.interval;
        newVal.tradeTableMaxRevenuePerData.tradeTotal.category = newVal.tradeTableMaxRevenuePerData.interval;
        newVal.tradeTableMaxVictoryPerData.tradeTotal.category = newVal.tradeTableMaxVictoryPerData.interval;

        this.tradeTotalMaxLossPer.push(newVal.tradeTableMaxLossPerData.tradeTotal);
        this.tradeTotalMaxRevenuePer.push(newVal.tradeTableMaxRevenuePerData.tradeTotal);
        this.tradeTotalMaxVictoryPer.push(newVal.tradeTableMaxVictoryPerData.tradeTotal);

      }
    },
    secondMaxData: {
      deep: true,
      handler(newVal) {
        this.secondTradeTotalMaxLossPer = [];
        this.secondTradeTotalMaxRevenuePer = [];
        this.secondTradeTotalMaxVictoryPer = [];

        newVal.tradeTableMaxLossPerData.tradeTotal.category = newVal.tradeTableMaxLossPerData.interval;
        newVal.tradeTableMaxRevenuePerData.tradeTotal.category = newVal.tradeTableMaxRevenuePerData.interval;
        newVal.tradeTableMaxVictoryPerData.tradeTotal.category = newVal.tradeTableMaxVictoryPerData.interval;

        this.secondTradeTotalMaxLossPer.push(newVal.tradeTableMaxLossPerData.tradeTotal);
        this.secondTradeTotalMaxRevenuePer.push(newVal.tradeTableMaxRevenuePerData.tradeTotal);
        this.secondTradeTotalMaxVictoryPer.push(newVal.tradeTableMaxVictoryPerData.tradeTotal);

      }
    },
    firstMaxDataPosition: {
      deep: true,
      handler(newVal) {
        this.tradeTotalMaxLossPer = [];
        this.tradeTotalMaxRevenuePer = [];
        this.tradeTotalMaxVictoryPer = [];

        this.tradeTotalMaxLossPer.push(newVal.tradeTableMaxLossPerData.tradeTotal);
        this.tradeTotalMaxRevenuePer.push(newVal.tradeTableMaxRevenuePerData.tradeTotal);
        this.tradeTotalMaxVictoryPer.push(newVal.tradeTableMaxVictoryPerData.tradeTotal);

      }
    },
    secondMaxDataPosition: {
      deep: true,
      handler(newVal) {
        this.secondTradeTotalMaxLossPer = [];
        this.secondTradeTotalMaxRevenuePer = [];
        this.secondTradeTotalMaxVictoryPer = [];

        this.secondTradeTotalMaxLossPer.push(newVal.tradeTableMaxLossPerData.tradeTotal);
        this.secondTradeTotalMaxRevenuePer.push(newVal.tradeTableMaxRevenuePerData.tradeTotal);
        this.secondTradeTotalMaxVictoryPer.push(newVal.tradeTableMaxVictoryPerData.tradeTotal);

      }
    },
  },
  data: () => ({
    min: "최소",
    max: "최대",
    interval: "간격",
    firstTableName: "",
    secondTableNames: "",
    showFirstTable: false,
    showSecondTable: false,
    headers: [
      {text: '엔트리', align: 'start', sortable: false, value: 'category', class: "purple lighten-5"},
      {text: '순수익', value: 'revenueTotal', sortable: false, class: "purple lighten-5"},
      {text: '수익률', value: 'revenuePer', sortable: false, class: "purple lighten-5"},
      {text: '손실률', value: 'lossPer', sortable: false, class: "purple lighten-5"},
      {text: '거래횟수', value: 'transCount', sortable: false, class: "purple lighten-5"},
      {text: '수익횟수', value: 'revenueCount', sortable: false, class: "purple lighten-5"},
      {text: '손실횟수', value: 'lossCount', sortable: false, class: "purple lighten-5"},
      {text: '승률', value: 'victoryPer', sortable: false, class: "purple lighten-5"},
    ],
    tradeTotalsFirstTable: [],
    tradeTotalsSecondTable: [],
    customSlotInfo: [
      {name: 'revenueTotal', slotName: 'item.revenueTotal'},
      {name: 'revenuePer', slotName: 'item.revenuePer'},
      {name: 'lossPer', slotName: 'item.lossPer'},
      {name: 'victoryPer', slotName: 'item.victoryPer'},
    ],
    selectBoxItems: ['손실률', '순수익', '승률'],
    firstSelectedItem: '',
    secondSelectedItem: '',
    firstTableMinValue: '',
    firstTableMaxValue: '',
    firstTableIntervalValue: '',
    secondTableMinValue: '',
    secondTableMaxValue: '',
    secondTableIntervalValue: '',
    snackbar: false,
    text: '',
    tradeTotalMaxLossPer: [],
    tradeTotalMaxRevenuePer: [],
    tradeTotalMaxVictoryPer: [],
    showFirstTradeTotalMaxData: false,
    secondTradeTotalMaxLossPer: [],
    secondTradeTotalMaxRevenuePer: [],
    secondTradeTotalMaxVictoryPer: [],
    showSecondTradeTotalMaxData: false,
    showFirstTablePosition: false,
    showSecondTablePosition: false,
    kindOfButtonFirst: null,
    kindOfButtonSecond: null,
  }),
  methods: {
    async getTradeTotalFirstTable(row) {
      this.firstTableName = row.tdName;
      this.firstTableMinValue = "";
      this.firstTableMaxValue = "";
      this.firstTableIntervalValue = "";
      this.showFirstTradeTotalMaxData = false;
      this.showFirstTablePosition = false;
    },
    async getTradeTotalSecondTable(row) {
      this.secondTableNames = row.tdName;
      this.secondTableMinValue = "";
      this.secondTableMaxValue = "";
      this.secondTableIntervalValue = "";
      this.showSecondTradeTotalMaxData = false;
      this.showSecondTablePosition = false;
    },
    parseFloatData(value) {
      return parseFloat(value).toFixed(2);
    },
    firstPercentSubmit() {
      if (this.firstTableMinValue === '' || this.firstTableMaxValue === '' || this.firstTableIntervalValue === '') {
        this.text = '빈칸을 입력해주세요.';
        this.snackbar = true;
      } else {
        this.kindOfButtonFirst = 'total'
        this.$emit('firstPercent-submit', this.firstTableMinValue, this.firstTableMaxValue, this.firstTableIntervalValue);
        this.showFirstTradeTotalMaxData = true;
      }
    },
    firstPositionSubmit() {
      if (this.firstTableMinValue === '' || this.firstTableMaxValue === '' || this.firstTableIntervalValue === '') {
        this.text = '빈칸을 입력해주세요.';
        this.snackbar = true;
      } else {
        this.kindOfButtonFirst = 'position'
        this.$emit('firstPosition-submit', this.firstTableMinValue, this.firstTableMaxValue, this.firstTableIntervalValue);
        this.showFirstTradeTotalMaxData = true;
      }
    },
    secondPercentSubmit() {
      if (this.secondTableMinValue === '' || this.secondTableMaxValue === '' || this.secondTableIntervalValue === '') {
        this.text = '빈칸을 입력해주세요.';
        this.snackbar = true;
      } else {
        this.kindOfButtonSecond = 'total'
        this.$emit('secondPercent-submit', this.secondTableMinValue, this.secondTableMaxValue, this.secondTableIntervalValue);
        this.showSecondTradeTotalMaxData = true;
      }
    },
    secondPositionSubmit() {
      if (this.secondTableMinValue === '' || this.secondTableMaxValue === '' || this.secondTableIntervalValue === '') {
        this.text = '빈칸을 입력해주세요.';
        this.snackbar = true;
      } else {
        this.kindOfButtonSecond = 'position'
        this.$emit('secondPosition-submit', this.secondTableMinValue, this.secondTableMaxValue, this.secondTableIntervalValue);
        this.showSecondTradeTotalMaxData = true;
      }
    },
    firstMaxLossPerTableRowClick() {
      if(this.kindOfButtonFirst === 'total'){
        this.$emit('first-max-data-table-loss');
      }else if(this.kindOfButtonFirst === 'position'){
        this.$emit('first-max-data-table-loss-position');
      }
    },
    firstMaxRevenuePerTableRowClick() {
      if(this.kindOfButtonFirst === 'total'){
        this.$emit('first-max-data-table-revenue');
      }else if(this.kindOfButtonFirst === 'position'){
        this.$emit('first-max-data-table-revenue-position');
      }
    },
    firstMaxVictoryPerTableRowClick() {
      if(this.kindOfButtonFirst === 'total'){
        this.$emit('first-max-data-table-victory');
      }else if(this.kindOfButtonFirst === 'position'){
        this.$emit('first-max-data-table-victory-position');
      }
    },
    secondMaxLossPerTableRowClick() {
      if(this.kindOfButtonSecond === 'total'){
        this.$emit('second-max-data-table-loss');
      }else if(this.kindOfButtonSecond === 'position'){
        this.$emit('second-max-data-table-loss-position');
      }
    },
    secondMaxRevenuePerTableRowClick() {
      if(this.kindOfButtonSecond === 'total'){
        this.$emit('second-max-data-table-revenue');
      }else if(this.kindOfButtonSecond === 'position'){
        this.$emit('second-max-data-table-revenue-position');
      }

    },
    secondMaxVictoryPerTableRowClick() {
      if(this.kindOfButtonSecond === 'total'){
        this.$emit('second-max-data-table-victory');
      }else if(this.kindOfButtonSecond === 'position'){
        this.$emit('second-max-data-table-victory-position');
      }

    },
    firstReturn() {
      this.firstTableMinValue = "";
      this.firstTableMaxValue = "";
      this.firstTableIntervalValue = "";
      this.showFirstTradeTotalMaxData = false;
      this.showFirstTablePosition = false;
      this.$emit('first-return-initialize');
    },
    secondReturn() {
      this.secondTableMinValue = "";
      this.secondTableMaxValue = "";
      this.secondTableIntervalValue = "";
      this.showSecondTradeTotalMaxData = false;
      this.showSecondTablePosition = false;
      this.$emit('second-return-initialize');
    },
  }
}
</script>

<style scoped>

</style>