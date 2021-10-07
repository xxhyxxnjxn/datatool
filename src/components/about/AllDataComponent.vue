<template>
  <div class="pb-5">
    <v-banner class="pb-5">ALL</v-banner>
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3">
        <v-card v-show="showFirstTable">
          <MyDataTableComponent
              :headers="headers2"
              :items="tradePiecesFirstTable"
              :customSlotInfo=secondCustomSlotInfo
              :pageCount="-1"
              :hide-footer="true"
              :hide-header="false"
          >
            <template v-for="(test,index) in secondCustomSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                <div v-if="test.name ==='id'">
                  {{ tradePiecesFirstTable.indexOf(item) + 1 }}
                </div>
                <div v-else-if="test.name ==='start' || test.name ==='end'">
<!--                  <td @click="clickDate(item['start'],item['end'])"> {{ item[`${test.name}`] }} </td>-->
                  <td>
                    <DialogComponent
                        :start-date="item['start']"
                        :end-date="item['end']"
                        :tradeTotal="tradeTotalsFirstTable"
                        :test="item[`${test.name}`]"
                        v-show="showFirstTable"
                    />
                  </td>
                </div>
                <div v-else>
                  <div v-if="test.name ==='runupPer' && showEntryChip(item[`${test.name}`])">
                    <td style="color: red"> {{ parseFloatData(item[`${test.name}`]) }} </td>
                  </div>
                  <div v-else>
                    {{ parseFloatData(item[`${test.name}`]) }}
                  </div>
                </div>
              </span>
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
      <v-col cols=5 class="pl-3">
        <v-card v-show="showSecondTable">
          <div v-if="firstTableName === secondTableNames">
            <CompareDataTableComponent
                :headers="headers2"
                :items="tradePiecesSecondTable"
                :customSlotInfo=secondCustomSlotInfo
                :pageCount="-1"
                :hide-footer="true"
                :hide-header="false"
                :compared-items="tradePiecesFirstTable"
            >
              <template v-for="(test,index) in secondCustomSlotInfo"
                        v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                <div v-if="test.name ==='id'">
                  {{ tradePiecesSecondTable.indexOf(item) + 1 }}
                </div>
                <div v-else-if="test.name ==='start' || test.name ==='end'">
<!--                  <td @click="secondClickDate(item['start'],item['end'])"> {{ item[`${test.name}`] }} </td>-->
                <td>
                    <DialogComponent
                        :start-date="item['start']"
                        :end-date="item['end']"
                        :tradeTotal="tradeTotalsSecondTable"
                        :test="item[`${test.name}`]"
                        v-show="showSecondTable"
                    />
                  </td>
                </div>
                <div v-else>
                  <div v-if="test.name ==='runupPer' && showEntryChip(item[`${test.name}`])">
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
                :items="tradePiecesSecondTable"
                :customSlotInfo=secondCustomSlotInfo
                :pageCount="-1"
                :hide-footer="true"
                :hide-header="false"
            >
              <template v-for="(test,index) in secondCustomSlotInfo"
                        v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                <div v-if="test.name ==='id'">
                  {{ tradePiecesSecondTable.indexOf(item) + 1 }}
                </div>
                <div v-else-if="test.name ==='start' || test.name ==='end'">
<!--                  <td @click="secondClickDate(item['start'],item['end'])"> {{ item[`${test.name}`] }} </td>-->
                <td>
                    <DialogComponent
                        :start-date="item['start']"
                        :end-date="item['end']"
                        :tradeTotal="tradeTotalsSecondTable"
                        :test="item[`${test.name}`]"
                        v-show="showSecondTable"
                    />
                  </td>
                </div>
                <div v-else>
                  <div v-if="test.name ==='runupPer' && showEntryChip(item[`${test.name}`])">
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MyDataTableComponent from "@/components/about/MyDataTableComponent";
import CompareDataTableComponent from "@/components/about/CompareDataTableComponent";
import DialogComponent from "@/components/about/DialogComponent";

export default {
  name: "AllDataComponent",
  components: {
    MyDataTableComponent,
    CompareDataTableComponent,
    DialogComponent
  },
  props: {
    tradeName: Object,
    secondTradeName: Object,
    response: Object,
    secondResponse: Object,
  },
  watch: {
    tradeName: {
      deep: true,
      handler(newVal) {
        this.firstTableName = newVal.tdName;
      }
    },
    secondTradeName: {
      deep: true,
      handler(newVal) {
        this.secondTableNames = newVal.tdName;
      }
    },
    response: {
      deep: true,
      handler(newVal) {
        this.showFirstTable = true;
        this.tradePiecesFirstTable = newVal.tradePieces;
        this.tradeTotalsFirstTable.push(newVal.tradePieces[0]);
      }
    },
    secondResponse: {
      deep: true,
      handler(newVal) {
        this.showSecondTable = true;
        this.tradePiecesSecondTable = newVal.tradePieces;
        this.tradeTotalsSecondTable.push(newVal.tradePieces[0]);
      }
    },
  },
  data: () => ({
    firstTableName: null,
    secondTableNames: null,
    showFirstTable: false,
    showSecondTable: false,
    headers2: [
      {text: 'id', align: 'start', sortable: false, value: 'id', class: "purple lighten-5"},
      {text: '산 시점', value: 'start', sortable: false, class: "purple lighten-5"},
      {text: '판 시점', value: 'end', sortable: false, class: "purple lighten-5"},
      {text: '엔트리', value: 'entry', sortable: false, class: "purple lighten-5"},
      {text: '수익률', value: 'profitPer', class: "purple lighten-5"},
      {text: '고점', value: 'runupPer', class: "purple lighten-5"},
      {text: '저점', value: 'drawdownPer', class: "purple lighten-5"},
    ],
    tradePiecesFirstTable: [],
    tradePiecesSecondTable: [],
    tradeTotalsFirstTable: [],
    tradeTotalsSecondTable: [],
    secondCustomSlotInfo: [
      {name: 'id', slotName: 'item.id'},
      {name: 'start', slotName: 'item.start'},
      {name: 'end', slotName: 'item.end'},
      {name: 'profitPer', slotName: 'item.profitPer'},
      {name: 'runupPer', slotName: 'item.runupPer'},
      {name: 'drawdownPer', slotName: 'item.drawdownPer'},
    ],
  }),
  methods: {
    parseFloatData(value) {
      return parseFloat(value).toFixed(2);
    },
    showEntryChip(item) {
      if (item < 0.5) {
        return true;
      }
    },
  },
}
</script>

<style scoped>

</style>