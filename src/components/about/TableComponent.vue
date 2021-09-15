<template>
  <div class="pb-5">
    <v-banner class="pb-5">Data</v-banner>
    <v-row justify="center" no-gutters>
      <v-col cols = 5 class="pr-3">
        <v-card>
          <div class="pa-3">데이터 목록 1</div>
          <v-divider/>
          <MyDataTableComponent
              :headers="headers"
              :items="tradeNames"
              :customSlotInfo=customSlotInfo
          >
            <template v-slot:id_custom="{ item }">
              {{ tradeNames.indexOf(item) +1 }}
            </template>
            <template v-slot:delete_custom="{ item }">
              <v-btn
                  class="ma-1"
                  color="error"
                  plain
                  @click="deleteData(item)"
              >
                Delete
              </v-btn>
            </template>
            <template v-slot:tdName_custom="{ item }">
              <td @click="firstTableRowClick(item)">{{item.tdName}}</td>
            </template>
            <template v-slot:createAt_custom="{ item }">
              {{ parseDate(item.createAt) }}
            </template>
          </MyDataTableComponent>
        </v-card>
      </v-col>
      <v-col cols = 5 class="pl-3">
        <v-card>
          <div class="pa-3">데이터 목록 2</div>
          <v-divider/>
          <MyDataTableComponent
              :headers="headers2"
              :items="tradeNames"
              :customSlotInfo=customSlotInfo
          >
            <template v-slot:id_custom="{ item }">
              {{ tradeNames.indexOf(item) +1 }}
            </template>
            <template v-slot:tdName_custom="{ item }">
              <td @click="secondTableRowClick(item)">{{item.tdName}}</td>
            </template>
            <template v-slot:createAt_custom="{ item }">
              {{ parseDate(item.createAt) }}
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

export default {
  name: "TableComponent",
  components: {
    MyDataTableComponent,
    MySnackBarComponent,
  },
  data: () => ({
    headers: [
      {text: 'id', align: 'start', sortable: false, value: 'id', show: 'false', class: "purple lighten-5"},
      {text: '제목', align: 'center', sortable: false, value: 'tdName', class: "purple lighten-5"},
      {text: '생성날짜', align: 'center', value: 'createAt', sortable: false, class: "purple lighten-5"},
      {text: '삭제', align: 'center', value: 'delete', sortable: false, class: "purple lighten-5"},
    ],
    headers2: [
      {text: 'id', align: 'start', sortable: false, value: 'id', class: "purple lighten-5"},
      {text: '제목', align: 'center', value: 'tdName', sortable: false, class: "purple lighten-5"},
      {text: '생성날짜', align: 'center', value: 'createAt', sortable: false, class: "purple lighten-5"},
    ],
    customSlotInfo: [
      { name: 'id', slotName: 'item.id' },
      { name: 'delete', slotName: 'item.delete' },
      { name: 'tdName', slotName: 'item.tdName' },
      { name: 'createAt', slotName: 'item.createAt' },
    ],
    tradeNames: [],
    snackbar: false,
    text: '',
    index: 0,
  }),
  created() {
    this.getTradeNames();
  },
  methods: {
    async getTradeNames() {
      this.$axios.post('/api/show/', {}).then(res => {
        res.data.reverse().forEach(item => {
          this.tradeNames.push(item)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    deleteData(item) {
      const params = new URLSearchParams();
      params.append('tdNameId', item.id);

      this.$axios.post('/api/delete/', params).then(res => {
        if (res.status === 200) {
          this.text = '삭제하였습니다.';
          this.tradeNames.splice(this.tradeNames.indexOf(item),1);
        }else{
          this.text = '삭제하지 못하였습니다.';
        }
        this.snackbar = true;
      }).catch(err => {
        console.log(err)
      })
    },
    firstTableRowClick(row){
      this.$emit('send-message',row);
    },
    secondTableRowClick(row){
      this.$emit('send-message2',row);
    },
    parseDate(createAt){
      return this.$moment(createAt).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
</script>

<style scoped>

</style>