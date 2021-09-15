<template>
  <div class="pb-5">
    <v-banner class="pb-5">Compare</v-banner>
    <v-row justify="center" no-gutters>
      <v-col cols=5 class="pr-3">
        <v-card v-show="showFirstTable">
          <MyDataTableComponent
              :headers="headers"
              :items="firstCompareDatas"
              :customSlotInfo="customSlotInfo"
              :pageCount="-1"
              :hide-header="false"
              :hide-footer="true"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
               <div v-if="test.name ==='id'">
                  {{ firstCompareDatas.indexOf(item) + 1 }}
               </div>
                <div v-else-if="item[`${test.name}`] === '-'">
                  {{ item[`${test.name}`] }}
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
          <MyDataTableComponent
              :headers="headers"
              :items="secondCompareDatas"
              :customSlotInfo="customSlotInfo"
              :pageCount="-1"
              :hide-header="false"
              :hide-footer="true"
          >
            <template v-for="(test,index) in customSlotInfo"
                      v-slot:[`${test.name}_custom`]="{item}">
              <span :key="index">
                <div v-if="test.name ==='id'">
                  {{ secondCompareDatas.indexOf(item) + 1 }}
                </div>
                <div v-else-if="item[`${test.name}`] === '-'">
                  {{ item[`${test.name}`] }}
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
    </v-row>
  </div>
</template>

<script>
import MyDataTableComponent from "@/components/about/MyDataTableComponent";

export default {
  name: "CompareComponent",
  components: {
    MyDataTableComponent,
  },
  props: {
    data: Object,
    secondData: Object,
    tradeName: Object,
    secondTradeName: Object,
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.showFirstTable = false;
        this.showSecondTable = false;
      }
    },
    secondData: {
      deep: true,
      handler() {
        this.showFirstTable = false;
        this.showSecondTable = false;
      }
    },
    tradeName: {
      deep: true,
      handler(newVal) {
        this.firstTableName = newVal.tdName;
        this.showFirstTable = false;
        this.showSecondTable = false;
      }
    },
    secondTradeName: {
      deep: true,
      handler(newVal) {
        this.secondTableNames = newVal.tdName;
        this.showFirstTable = false;
        this.showSecondTable = false;
      }
    },
  },
  data: () => ({
    firstTableName: null,
    secondTableNames: null,
    showFirstTable: false,
    showSecondTable: false,
    headers: [
      {text: 'id', align: 'start', sortable: false, value: 'id', class: "purple lighten-5"},
      {text: '산 시점', value: 'start', sortable: false, class: "purple lighten-5"},
      {text: '판 시점', value: 'end', sortable: false, class: "purple lighten-5"},
      {text: '엔트리', value: 'entry', sortable: false, class: "purple lighten-5"},
      {text: '수익률', value: 'profitPer', sortable: false, class: "purple lighten-5"},
      {text: '고점', value: 'runupPer', sortable: false, class: "purple lighten-5"},
      {text: '저점', value: 'drawdownPer', sortable: false, class: "purple lighten-5"},
    ],
    customSlotInfo: [
      {name: 'id', slotName: 'item.id'},
      {name: 'profitPer', slotName: 'item.profitPer'},
      {name: 'runupPer', slotName: 'item.runupPer'},
      {name: 'drawdownPer', slotName: 'item.drawdownPer'},
    ],
    firstCompareDatas: [],
    secondCompareDatas: [],
  }),
  methods: {
    getTradePiecesTableDatas(data, data2) {
      const params = new URLSearchParams();
      params.append('first', JSON.stringify(data));
      params.append('second', JSON.stringify(data2));

      this.$axios.post('/api/show/compareData', params).then(res => {
        this.firstCompareDatas = [];
        this.secondCompareDatas = [];

        if (res.status === 200) {
          this.showFirstTable = true;
          this.showSecondTable = true;

          res.data.firstCompareTable.forEach(item => {
            this.firstCompareDatas.push(item)
          })
          res.data.secondCompareTable.forEach(item => {
            this.secondCompareDatas.push(item)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    parseFloatData(value) {
      return parseFloat(value).toFixed(2);
    },
    showEntryChip(item) {
      if (item< 0.5) {
        return true;
      }
    },
  }
}
</script>

<style scoped>
</style>