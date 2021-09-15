<template>
  <div class="pb-5">
    <v-banner class="pb-5">Long</v-banner>
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3">
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
            :items="tradeTotalLongFirstTable"
            :customSlotInfo=customSlotInfo
            :pageCount="-1"
            :hide-footer="true"
            :hide-header="false"
            v-on:child-event="firstLongTableRowClick"
            v-show="showFirstTradeSumTable"
        >
          <template v-for="(test,index) in customSlotInfo"
                    v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index+count">
                <div v-if="test.name ==='id'">
                  {{ tradeTotalLongFirstTable.indexOf(item) + 1 }}
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
            :items="tradeTotalLongFirstTable"
            :customSlotInfo=customSlotInfo
            :pageCount="-1"
            :hide-footer="true"
            :hide-header="false"
            v-on:child-event="firstLongPositionTableRowClick"
            v-show="showFirstTradeSumTablePosition"
        >
          <template v-for="(test,index) in customSlotInfo"
                    v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index+count">
                <div v-if="test.name ==='id'">
                  {{ tradeTotalLongFirstTable.indexOf(item) + 1 }}
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
      <v-col cols=5 class="pl-3">
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
              :items="tradeTotalLongSecondTable"
              :customSlotInfo=customSlotInfo
              :hide-header="false"
              :pageCount="-1"
              :hide-footer="true"
              v-on:child-event="secondLongTableRowClick"
              v-show="showSecondTradeSumTable"
              :compared-items="tradeTotalLongFirstTable"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
               <div v-if="test.name ==='id'">
                  {{ tradeTotalLongSecondTable.indexOf(item) + 1 }}
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
              :items="tradeTotalLongSecondTable"
              :customSlotInfo=customSlotInfo
              :hide-header="false"
              :pageCount="-1"
              :hide-footer="true"
              v-on:child-event="secondLongTableRowClick"
              v-show="showSecondTradeSumTable"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
               <div v-if="test.name ==='id'">
                  {{ tradeTotalLongSecondTable.indexOf(item) + 1 }}
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
              :items="tradeTotalLongSecondTable"
              :customSlotInfo=customSlotInfo
              :hide-header="false"
              :pageCount="-1"
              :hide-footer="true"
              v-on:child-event="secondLongPositionTableRowClick"
              v-show="showSecondTradeSumTablePosition"
              :compared-items="tradeTotalLongFirstTable"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
               <div v-if="test.name ==='id'">
                  {{ tradeTotalLongSecondTable.indexOf(item) + 1 }}
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
            :items="tradeTotalLongSecondTable"
            :customSlotInfo=customSlotInfo
            :hide-header="false"
            :pageCount="-1"
            :hide-footer="true"
            v-on:child-event="secondLongPositionTableRowClick"
            v-show="showSecondTradeSumTablePosition"
        >
          <template v-for="(test,index) in customSlotInfo"
                    v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
               <div v-if="test.name ==='id'">
                  {{ tradeTotalLongSecondTable.indexOf(item) + 1 }}
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
  name: "LongComponent",
  components: {
    MyDataTableComponent,
    CompareDataTableComponent,
  },
  props: {
    response: Object,
    secondResponse: Object,
    firstPositionTradeSumLongsData: Array,
    secondPositionTradeSumLongsData: Array,
  },
  watch: {
    response: {
      deep: true,
      handler(newVal) {
        this.response = newVal;

        this.tradeTotalsFirstTable = [];
        this.tradeTotalsFirstTable.push(this.response.tradeTotalLong);

        this.tradeTotalLongFirstTable = [];
        this.response.tradeSumLongs.forEach(item => {
          this.tradeTotalLongFirstTable.push(item)
        })

        this.showFirstTable = true;
        this.showFirstTradeSumTable = true;
        this.showFirstTradeSumTablePosition = false;

      }
    },
    secondResponse: {
      deep: true,
      handler(newVal) {
        this.secondResponse = newVal;

        this.tradeTotalsSecondTable = [];
        this.tradeTotalsSecondTable.push(this.secondResponse.tradeTotalLong);

        this.tradeTotalLongSecondTable = [];
        this.secondResponse.tradeSumLongs.forEach(item => {
          this.tradeTotalLongSecondTable.push(item)
        })

        this.showSecondTable = true;
        this.showSecondTradeSumTable = true;
        this.showSecondTradeSumTablePosition = false;
      }
    },
    firstPositionTradeSumLongsData: {
      deep: true,
      handler(newVal) {
        this.tradeTotalLongFirstTable = [];
        newVal.forEach(item => {
          this.tradeTotalLongFirstTable.push(item)
        })

        this.showFirstTradeSumTable = false;
        this.showFirstTradeSumTablePosition = true;
      }
    },
    secondPositionTradeSumLongsData: {
      deep: true,
      handler(newVal) {
        this.tradeTotalLongSecondTable = [];
        newVal.forEach(item => {
          this.tradeTotalLongSecondTable.push(item)
        })

        this.showSecondTradeSumTable = false;
        this.showSecondTradeSumTablePosition = true;
      }
    },
  },
  data: () => ({
    firstTableName: null,
    secondTableNames: null,
    showFirstTable: false,
    showSecondTable: false,
    showFirstTradeSumTable: false,
    showFirstTradeSumTablePosition: false,
    showSecondTradeSumTable: false,
    showSecondTradeSumTablePosition: false,
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
    headers2: [
      {text: 'id', align: 'start', sortable: false, value: 'id', class: "purple lighten-5"},
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
    tradeTotalLongFirstTable: [],
    tradeTotalLongSecondTable: [],
    customSlotInfo: [
      {name: 'id', slotName: 'item.id'},
      {name: 'revenueTotal', slotName: 'item.revenueTotal'},
      {name: 'revenuePer', slotName: 'item.revenuePer'},
      {name: 'lossPer', slotName: 'item.lossPer'},
      {name: 'victoryPer', slotName: 'item.victoryPer'},
    ],
    count: 1,
  }),
  methods: {
    async getTradeTotalFirstTable(row) {
      this.firstTableName = row.tdName;
    },
    async getTradeTotalSecondTable(row) {
      this.secondTableNames = row.tdName;
    },

    firstLongTableRowClick(row) {
      this.$emit('send-message', row);
    },
    secondLongTableRowClick(row) {
      this.$emit('send-message2', row);
    },
    parseFloatData(value) {
      return parseFloat(value).toFixed(2);
    },
    showEntryChip(item) {
      if (item < 50) {
        return true;
      }
    },
    firstLongPositionTableRowClick(row) {
      this.$emit('send-message-position', row);
    },
    secondLongPositionTableRowClick(row) {
      this.$emit('send-message2-position', row);
    }
  }
}
</script>

<style scoped>
</style>