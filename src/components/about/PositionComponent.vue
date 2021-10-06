<template>
  <div class="pb-5">
    <v-banner class="pb-5">position</v-banner>
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3">
        <v-card v-show="showFirstTable">
          <MyDataTableComponent
              :headers="headers"
              :items="tradeTotalsFirstTable"
              :customSlotInfo=customSlotInfo
              :hide-footer="true"
              :hide-header="false"
              :table-name='firstPositionTableName'
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
          <div v-if="firstTableName === secondTableNames">
            <CompareDataTableComponent
                :headers="headers"
                :items="tradeTotalsSecondTable"
                :customSlotInfo=customSlotInfo
                :hide-footer="true"
                :hide-header="false"
                :table-name='secondPositionTableName'
                :compared-items="tradeTotalsFirstTable"
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
                :table-name='secondPositionTableName'
            >
              <template v-for="test in customSlotInfo"
                        v-slot:[`${test.name}_custom`]="{item}">
                {{ parseFloatData(item[`${test.name}`]) }}
              </template>
            </MyDataTableComponent>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <div class="pa-8" v-show="showFirstTable">
        <v-btn
            depressed
            color="primary"
            @click="getTradePiecesTables"
        >
          비교하기
        </v-btn>
      </div>
    </v-row>
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
import CompareDataTableComponent from "@/components/about/CompareDataTableComponent";
import DialogComponent from "@/components/about/DialogComponent";

export default {
  name: "PositionComponent",
  components: {
    MyDataTableComponent,
    MySnackBarComponent,
    CompareDataTableComponent,
    DialogComponent,
  },
  props: {
    response: Object,
    secondResponse: Object,
    data: Object,
    secondData: Object,
    firstTradePiecesPositionData: Array,
    secondTradePiecesPositionData: Array,
    tradeName: Object,
    secondTradeName: Object,
  },
  watch: {
    data: {
      deep: true,
      handler(newVal) {
        this.data = newVal;

        this.tradeTotalsFirstTable = [];
        this.tradeTotalsFirstTable.push(this.data)

        this.tradePiecesFirstTable = [];
        this.response.tradePieces.forEach(item => {
          if (this.data.entry === item.entry) {
            this.tradePiecesFirstTable.push(item);
          }
        })

        this.firstStartDate = '';
        this.firstEndDate = '';
        this.showFirstTable = true;
      }
    },
    secondData: {
      deep: true,
      handler(newVal) {
        this.secondData = newVal;

        this.tradeTotalsSecondTable = [];
        this.tradeTotalsSecondTable.push(this.secondData)

        this.tradePiecesSecondTable = [];
        this.secondResponse.tradePieces.forEach(item => {
          if (this.secondData.entry === item.entry) {
            this.tradePiecesSecondTable.push(item);
          }
        })

        this.secondStartDate = '';
        this.secondEndDate = '';
        this.showSecondTable = true;
      }
    },
    firstTradePiecesPositionData: {
      deep: true,
      handler(newVal) {

        this.tradePiecesFirstTable = [];
        newVal.forEach(item => {
          this.tradePiecesFirstTable.push(item);
        })

        this.firstStartDate = '';
        this.firstEndDate = '';

        this.showFirstTable = true;
      }
    },
    secondTradePiecesPositionData: {
      deep: true,
      handler(newVal) {
        this.tradePiecesSecondTable = [];
        newVal.forEach(item => {
          this.tradePiecesSecondTable.push(item);
        })

        this.secondStartDate = '';
        this.secondEndDate = '';

        this.showSecondTable = true;
      }
    },
    tradeName: {
      deep: true,
      handler(newVal) {
        this.firstTableName = newVal.tdName;
        this.tradePiecesFirstTable = [];
        this.firstStartDate = '';
        this.firstEndDate = '';

        this.showFirstTable = false;
      }
    },
    secondTradeName: {
      deep: true,
      handler(newVal) {
        this.secondTableNames = newVal.tdName;
        this.tradePiecesSecondTable = [];
        this.secondStartDate = '';
        this.secondEndDate = '';

        this.showSecondTable = false;
      }
    },
  },
  data: () => ({
    firstTableName: null,
    secondTableNames: null,
    firstPositionTableName: 'firstPositionTable',
    secondPositionTableName: 'secondPositionTable',
    showFirstTable: false,
    showSecondTable: false,
    headers: [
      {text: '엔트리', align: 'start', sortable: false, value: 'entry', class: "purple lighten-5"},
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
      {text: '산 시점', value: 'start', sortable: false, class: "purple lighten-5"},
      {text: '판 시점', value: 'end', sortable: false, class: "purple lighten-5"},
      {text: '엔트리', value: 'entry', sortable: false, class: "purple lighten-5"},
      {text: '수익률', value: 'profitPer', class: "purple lighten-5"},
      {text: '고점', value: 'runupPer', class: "purple lighten-5"},
      {text: '저점', value: 'drawdownPer', class: "purple lighten-5"},
    ],
    tradeTotalsFirstTable: [],
    tradeTotalsSecondTable: [],
    tradePiecesFirstTable: [],
    tradePiecesSecondTable: [],
    customSlotInfo: [
      {name: 'revenueTotal', slotName: 'item.revenueTotal'},
      {name: 'revenuePer', slotName: 'item.revenuePer'},
      {name: 'lossPer', slotName: 'item.lossPer'},
      {name: 'victoryPer', slotName: 'item.victoryPer'},
    ],
    secondCustomSlotInfo: [
      {name: 'id', slotName: 'item.id'},
      {name: 'start', slotName: 'item.start'},
      {name: 'end', slotName: 'item.end'},
      {name: 'profitPer', slotName: 'item.profitPer'},
      {name: 'runupPer', slotName: 'item.runupPer'},
      {name: 'drawdownPer', slotName: 'item.drawdownPer'},
    ],
    snackbar: false,
    text: '',
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
    getTradePiecesTables() {
      if (this.tradePiecesFirstTable.length === 0 || this.tradePiecesSecondTable.length === 0) {
        this.text = '비교항목을 선택해주세요.';
        this.snackbar = true;
      } else {
        this.$emit('send-message', this.tradePiecesFirstTable, this.tradePiecesSecondTable);
      }
    },
  }
}
</script>

<style scoped>
</style>