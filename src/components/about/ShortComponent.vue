<template>
  <div class="pb-5">
    <v-banner class="pb-5">Short</v-banner>
    <v-row justify="center" no-gutters>
      <v-col cols = 5 class="pr-3">
          <MyDataTableComponent
              :headers="headers"
              :items="tradeTotalsFirstTable"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-show="showFirstTable"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
          <MyDataTableComponent
              :headers="headers2"
              :items="tradeTotalShortFirstTable"
              :customSlotInfo=customSlotInfo
              :pageCount="-1"
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="firstShortTableRowClick"
              v-show="showFirstTradeSumTable"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                <div v-if="test.name ==='id'">
                  {{ tradeTotalShortFirstTable.indexOf(item) + 1 }}
                </div>
                <div v-else>
                  <div v-if="test.name ==='victoryPer' && showEntryChip(item[`${test.name}`])">
                    <td style="color: red"> {{ parseFloatData(item[`${test.name}`]) }} </td>
                  </div>
                  <div v-else>
                    {{ parseFloatData(item[`${test.name}`]) }}
                  </div>
                </div>
              </span>
            </template>
          </MyDataTableComponent>
        <MyDataTableComponent
            :headers="positionHeaders2"
            :items="tradeTotalShortFirstTable"
            :customSlotInfo=customSlotInfo
            :pageCount="-1"
            :hide-footer="true"
            :hide-header="false"
            v-on:child-event="firstShortPositionTableRowClick"
            v-show="showFirstTradeSumTablePosition"
        >
          <template v-for="(test,index) in customSlotInfo"
                    v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                <div v-if="test.name ==='id'">
                  {{ tradeTotalShortFirstTable.indexOf(item) + 1 }}
                </div>
                <div v-else>
                  <div v-if="test.name ==='victoryPer' && showEntryChip(item[`${test.name}`])">
                    <td style="color: red"> {{ parseFloatData(item[`${test.name}`]) }} </td>
                  </div>
                  <div v-else>
                    {{ parseFloatData(item[`${test.name}`]) }}
                  </div>
                </div>
              </span>
          </template>
        </MyDataTableComponent>
      </v-col>
      <v-col cols = 5 class="pl-3">
        <div v-if="firstTableName === secondTableNames">
          <CompareDataTableComponent
              :headers="headers"
              :items="tradeTotalsSecondTable"
              :compared-items="tradeTotalsFirstTable"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-show="showSecondTable"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </CompareDataTableComponent>
        </div>
        <div v-else>
          <MyDataTableComponent
              :headers="headers"
              :items="tradeTotalsSecondTable"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              v-show="showSecondTable"
          >
            <template v-for="test in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              {{ parseFloatData(item[`${test.name}`]) }}
            </template>
          </MyDataTableComponent>
        </div>
        <div v-if="firstTableName === secondTableNames">
          <CompareDataTableComponent
              :headers="headers2"
              :items="tradeTotalShortSecondTable"
              :customSlotInfo=customSlotInfo
              :pageCount="-1"
              :hide-header="false"
              :hide-footer="true"
              v-on:child-event="secondShortTableRowClick"
              v-show="showSecondTradeSumTable"
              :compared-items="tradeTotalShortFirstTable"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                 <div v-if="test.name ==='id'">
                  {{ tradeTotalShortSecondTable.indexOf(item) + 1 }}
                </div>
                <div v-else>
                  <div v-if="test.name ==='victoryPer' && showEntryChip(item[`${test.name}`])">
                    <td style="color: red"> {{ parseFloatData(item[`${test.name}`]) }} </td>
                  </div>
                  <div v-else>
                    {{ parseFloatData(item[`${test.name}`]) }}
                  </div>
                </div>
              </span>
            </template>
          </CompareDataTableComponent>
        </div>
        <div v-else>
          <MyDataTableComponent
              :headers="headers2"
              :items="tradeTotalShortSecondTable"
              :customSlotInfo=customSlotInfo
              :pageCount="-1"
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="secondShortTableRowClick"
              v-show="showSecondTradeSumTable"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                 <div v-if="test.name ==='id'">
                  {{ tradeTotalShortSecondTable.indexOf(item) + 1 }}
                </div>
                <div v-else>
                  <div v-if="test.name ==='victoryPer' && showEntryChip(item[`${test.name}`])">
                    <td style="color: red"> {{ parseFloatData(item[`${test.name}`]) }} </td>
                  </div>
                  <div v-else>
                    {{ parseFloatData(item[`${test.name}`]) }}
                  </div>
                </div>
              </span>
            </template>
          </MyDataTableComponent>
        </div>
        <div v-if="firstTableName === secondTableNames">
          <CompareDataTableComponent
              :headers="positionHeaders2"
              :items="tradeTotalShortSecondTable"
              :customSlotInfo=customSlotInfo
              :pageCount="-1"
              :hide-footer="true"
              :hide-header="false"
              v-on:child-event="secondShortPositionTableRowClick"
              v-show="showSecondTradeSumTablePosition"
              :compared-items="tradeTotalShortFirstTable"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                 <div v-if="test.name ==='id'">
                  {{ tradeTotalShortSecondTable.indexOf(item) + 1 }}
                </div>
                <div v-else>
                  <div v-if="test.name ==='victoryPer' && showEntryChip(item[`${test.name}`])">
                    <td style="color: red"> {{ parseFloatData(item[`${test.name}`]) }} </td>
                  </div>
                  <div v-else>
                    {{ parseFloatData(item[`${test.name}`]) }}
                  </div>
                </div>
              </span>
            </template>
          </CompareDataTableComponent>
        </div>
        <div v-else>
        <MyDataTableComponent
            :headers="positionHeaders2"
            :items="tradeTotalShortSecondTable"
            :customSlotInfo=customSlotInfo
            :pageCount="-1"
            :hide-footer="true"
            :hide-header="false"
            v-on:child-event="secondShortPositionTableRowClick"
            v-show="showSecondTradeSumTablePosition"
        >
          <template v-for="(test,index) in customSlotInfo"
                    v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                 <div v-if="test.name ==='id'">
                  {{ tradeTotalShortSecondTable.indexOf(item) + 1 }}
                </div>
                <div v-else>
                  <div v-if="test.name ==='victoryPer' && showEntryChip(item[`${test.name}`])">
                    <td style="color: red"> {{ parseFloatData(item[`${test.name}`]) }} </td>
                  </div>
                  <div v-else>
                    {{ parseFloatData(item[`${test.name}`]) }}
                  </div>
                </div>
              </span>
          </template>
        </MyDataTableComponent>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MyDataTableComponent from "@/components/about/MyDataTableComponent";
import CompareDataTableComponent from "@/components/about/CompareDataTableComponent";

export default {
  name: "ShortComponent",
  components :{
    MyDataTableComponent,
    CompareDataTableComponent
  },
  props: {
    response : Object,
    secondResponse : Object,
    firstPositionTradeSumShortsData: Array,
    secondPositionTradeSumShortsData: Array,
  },
  watch :{
    response : {
      deep: true,
      handler(newVal) {
        this.response = newVal;

        this.tradeTotalsFirstTable = [];
        this.tradeTotalsFirstTable.push(this.response.tradeTotalShort);

        this.tradeTotalShortFirstTable = [];
        this.response.tradeSumShorts.forEach(item => {
          this.tradeTotalShortFirstTable.push(item)
        })

        this.showFirstTable = true;
        this.showFirstTradeSumTable = true;
        this.showFirstTradeSumTablePosition = false;
      }
    },
    secondResponse : {
      deep: true,
      handler(newVal) {
        this.secondResponse = newVal;

        this.tradeTotalsSecondTable = [];
        this.tradeTotalsSecondTable.push(this.secondResponse.tradeTotalShort);

        this.tradeTotalShortSecondTable = [];
        this.secondResponse.tradeSumShorts.forEach(item => {
          this.tradeTotalShortSecondTable.push(item)
        })

        this.showSecondTable = true;
        this.showSecondTradeSumTable = true;
        this.showSecondTradeSumTablePosition = false;
      }
    },
    firstPositionTradeSumShortsData : {
      deep: true,
      handler(newVal) {
        this.tradeTotalShortFirstTable = [];
        newVal.forEach(item => {
          this.tradeTotalShortFirstTable.push(item)
        })

        this.showFirstTradeSumTable = false;
        this.showFirstTradeSumTablePosition = true;
      }
    },
    secondPositionTradeSumShortsData : {
      deep: true,
      handler(newVal) {
        this.tradeTotalShortSecondTable = [];
        newVal.forEach(item => {
          this.tradeTotalShortSecondTable.push(item)
        })

        this.showSecondTradeSumTable = false;
        this.showSecondTradeSumTablePosition = true;
      }
    },
  },
  data: () => ({
    firstTableName: null,
    secondTableNames: null,
    showFirstTable : false,
    showSecondTable : false,
    showFirstTradeSumTable: false,
    showFirstTradeSumTablePosition: false,
    showSecondTradeSumTable: false,
    showSecondTradeSumTablePosition: false,
    headers: [
      {text: '엔트리', align: 'start',  sortable: false, value: 'category', class: "purple lighten-5"},
      {text: '순수익', value: 'revenueTotal', sortable: false, class: "purple lighten-5" },
      {text: '수익률', value: 'revenuePer', sortable: false, class: "purple lighten-5" },
      {text: '손실률', value: 'lossPer', sortable: false, class: "purple lighten-5"},
      {text: '거래횟수', value: 'transCount', sortable: false, class: "purple lighten-5"},
      {text: '수익횟수', value: 'revenueCount', sortable: false, class: "purple lighten-5"},
      {text: '손실횟수', value: 'lossCount', sortable: false, class: "purple lighten-5"},
      {text: '승률', value: 'victoryPer', sortable: false, class: "purple lighten-5"},
    ],
    headers2: [
      {text: 'id', align: 'start',  sortable: false, value: 'id', class: "purple lighten-5"},
      {text: '엔트리', sortable: false, value: 'entry', class: "purple lighten-5"},
      {text: '순수익', value: 'revenueTotal', sortable: false, class: "purple lighten-5"},
      {text: '수익률', value: 'revenuePer', sortable: false, class: "purple lighten-5"},
      {text: '손실률', value: 'lossPer', sortable: false, class: "purple lighten-5"},
      {text: '거래횟수', value: 'transCount', sortable: false, class: "purple lighten-5"},
      {text: '수익횟수', value: 'revenueCount', sortable: false, class: "purple lighten-5"},
      {text: '손실횟수', value: 'lossCount', sortable: false, class: "purple lighten-5"},
      {text: '승률', value: 'victoryPer', sortable: false, class: "purple lighten-5"},
    ],
    positionHeaders2: [
      {text: 'id', align: 'start', sortable: false, value: 'id', class: "purple lighten-5"},
      {text: '엔트리', sortable: false, value: 'entry', class: "purple lighten-5"},
      {text: '순수익', value: 'revenueTotal', sortable: false, class: "purple lighten-5"},
      {text: '수익률', value: 'revenuePer', sortable: false, class: "purple lighten-5"},
      {text: '손실률', value: 'lossPer', sortable: false, class: "purple lighten-5"},
      {text: '거래횟수', value: 'transCount', sortable: false, class: "purple lighten-5"},
      {text: '수익횟수', value: 'revenueCount', sortable: false, class: "purple lighten-5"},
      {text: '손실횟수', value: 'lossCount', sortable: false, class: "purple lighten-5"},
      {text: '승률', value: 'victoryPer', sortable: false, class: "purple lighten-5"},
      {text: '', value: 'interval', sortable: false, class: "purple lighten-5"},
    ],
    tradeTotalsFirstTable: [],
    tradeTotalsSecondTable: [],
    tradeTotalShortFirstTable: [],
    tradeTotalShortSecondTable: [],
    customSlotInfo: [
      {name: 'id', slotName: 'item.id'},
      {name: 'revenueTotal', slotName: 'item.revenueTotal'},
      {name: 'revenuePer', slotName: 'item.revenuePer'},
      {name: 'lossPer', slotName: 'item.lossPer'},
      {name: 'victoryPer', slotName: 'item.victoryPer'},
    ],
  }),
  methods: {
    async getTradeTotalFirstTable(row){
      this.firstTableName = row.tdName;
    },
    async getTradeTotalSecondTable(row){
      this.secondTableNames = row.tdName;
    },

    firstShortTableRowClick(row){
      this.$emit('send-message',row);
    },
    secondShortTableRowClick(row){
      this.$emit('send-message2',row);
    },
    showEntryChip(item) {
      if (item < 50) {
        return true;
      }
    },
    parseFloatData(value) {
      return parseFloat(value).toFixed(2);
    },
    firstShortPositionTableRowClick(row){
      this.$emit('send-message-position', row);
    },
    secondShortPositionTableRowClick(row){
      this.$emit('send-message2-position', row);
    }
  }
}
</script>

<style scoped>

</style>