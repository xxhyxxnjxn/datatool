<template>
  <v-container>
    <TableComponent
        @send-message="sendMessage"
        @send-message2="sendMessage2"
    />
    <TotalComponent
        ref="total_component"
        @firstPercent-submit="changeTotalFirstTable"
        @firstPosition-submit="changePositionFirstTable"
        @secondPercent-submit="changeTotalSecondTable"
        @secondPosition-submit="changePositionSecondTable"
        @first-max-data-table-loss="firstMaxDataTableLossPer"
        @first-max-data-table-revenue="firstMaxDataTableRevenuePer"
        @first-max-data-table-victory="firstMaxDataTableVictoryPer"
        @second-max-data-table-loss="secondMaxDataTableLossPer"
        @second-max-data-table-revenue="secondMaxDataTableRevenuePer"
        @second-max-data-table-victory="secondMaxDataTableVictoryPer"
        @first-max-data-table-loss-position="firstMaxDataPositionTableLossPer"
        @first-max-data-table-revenue-position="firstMaxDataPositionTableRevenuePer"
        @first-max-data-table-victory-position="firstMaxDataPositionTableVictoryPer"
        @second-max-data-table-loss-position="secondMaxDataPositionTableLossPer"
        @second-max-data-table-revenue-position="secondMaxDataPositionTableRevenuePer"
        @second-max-data-table-victory-position="secondMaxDataPositionTableVictoryPer"
        @first-return-initialize="firstReturn"
        @second-return-initialize="secondReturn"
        v-bind:response="response"
        v-bind:secondResponse="secondResponse"
        v-bind:firstMaxData="firstMaxData"
        v-bind:secondMaxData="secondMaxData"
        v-bind:firstMaxDataPosition="firstMaxDataPosition"
        v-bind:secondMaxDataPosition="secondMaxDataPosition"
    />
    <LongComponent
        ref="long_component"
        @send-message="LongComponentMessage"
        @send-message2="LongComponentMessage2"
        @send-message-position="LongPositionComponentMessage"
        @send-message2-position="LongPositionComponentMessage2"
        v-bind:response="response"
        v-bind:secondResponse="secondResponse"
        v-bind:firstPositionTradeSumLongsData="firstPositionTradeSumLongsData"
        v-bind:secondPositionTradeSumLongsData="secondPositionTradeSumLongsData"
    />
    <ShortComponent
        ref="short_component"
        @send-message="ShortComponentMessage"
        @send-message2="ShortComponentMessage2"
        @send-message-position="ShortPositionComponentMessage"
        @send-message2-position="ShortPositionComponentMessage2"
        v-bind:response="response"
        v-bind:secondResponse="secondResponse"
        v-bind:firstPositionTradeSumShortsData="firstPositionTradeSumShortsData"
        v-bind:secondPositionTradeSumShortsData="secondPositionTradeSumShortsData"
    />
    <PositionComponent
        ref="position_component"
        @send-message="test"
        v-bind:response="response"
        v-bind:secondResponse="secondResponse"
        v-bind:data="data"
        v-bind:secondData="secondData"
        v-bind:firstTradePiecesPositionData="firstTradePiecesPositionData"
        v-bind:secondTradePiecesPositionData="secondTradePiecesPositionData"
        v-bind:tradeName="tradeName"
        v-bind:secondTradeName="secondTradeName"
    />
    <CompareComponent
        ref="compare_component"
        v-bind:data="data"
        v-bind:secondData="secondData"
        v-bind:tradeName="tradeName"
        v-bind:secondTradeName="secondTradeName"
    />
  </v-container>
</template>

<script>
import TableComponent from "@/components/about/TableComponent";
import TotalComponent from "@/components/about/TotalComponent";
import LongComponent from "@/components/about/LongComponent";
import ShortComponent from "@/components/about/ShortComponent";
import PositionComponent from "@/components/about/PositionComponent";
import CompareComponent from "@/components/about/CompareComponent";

export default {
  name: 'About',
  components: {
    TableComponent,
    TotalComponent,
    LongComponent,
    ShortComponent,
    PositionComponent,
    CompareComponent,
  },
  data: () => ({
    tradeName: null,
    secondTradeName: null,
    response: null,
    responseCopy: null,
    secondResponse: null,
    secondResponseCopy: null,
    data: null,
    secondData: null,
    firstMaxData: null,
    secondMaxData: null,
    firstMaxDataPosition: null,
    secondMaxDataPosition: null,
    firstPositionTradeSumLongsData: null,
    secondPositionTradeSumLongsData: null,
    firstPositionTradeSumShortsData: null,
    secondPositionTradeSumShortsData: null,
    firstTradePiecesPositionData:null,
    secondTradePiecesPositionData:null,
  }),
  methods: {
    sendMessage(data) {
      this.tradeName = data;
      this.getTradeTotal(data.id).then(res => {
        this.response = res.data;
        this.responseCopy =JSON.parse(JSON.stringify(res.data));
        this.$refs.total_component.getTradeTotalFirstTable(data);
        this.$refs.long_component.getTradeTotalFirstTable(data);
        this.$refs.short_component.getTradeTotalFirstTable(data);
      });
    },

    sendMessage2(data) {
      this.secondTradeName = data;
      this.getTradeTotal(data.id).then(res => {
        this.secondResponse = res.data;
        this.secondResponseCopy = JSON.parse(JSON.stringify(res.data));
        this.$refs.total_component.getTradeTotalSecondTable(data);
        this.$refs.long_component.getTradeTotalSecondTable(data);
        this.$refs.short_component.getTradeTotalSecondTable(data);
      });
    },
    async getTradeTotal(id) {
      const params = new URLSearchParams();
      params.append('tdNameId', id);

      return this.$axios.post('/api/show/tradeTotal', params);
    },
    LongComponentMessage(data) {
      this.data = data;
    },
    LongPositionComponentMessage(data){
      this.data = data;
      this.firstTradePiecesPositionData = data.tradePieces;
    },
    LongComponentMessage2(data) {
      this.secondData = data;
    },
    LongPositionComponentMessage2(data) {
      this.secondData = data;
      this.secondTradePiecesPositionData = data.tradePieces;
    },
    ShortComponentMessage(data) {
      this.data = data;
    },
    ShortPositionComponentMessage(data){
      this.data = data;
      this.firstTradePiecesPositionData = data.tradePieces;
    },
    ShortComponentMessage2(data) {
      this.secondData = data;
    },
    ShortPositionComponentMessage2(data) {
      this.secondData = data;
      this.secondTradePiecesPositionData = data.tradePieces;
    },
    test(data,data2){
      this.$refs.compare_component.getTradePiecesTableDatas(data,data2);
    },
    changeTotalFirstTable(firstTableMinValue, firstTableMaxValue, firstTableIntervalValue){
      this.response =JSON.parse(JSON.stringify(this.responseCopy));
      const params = new URLSearchParams();
      params.append('minValue', firstTableMinValue);
      params.append('maxValue', firstTableMaxValue);
      params.append('intervalValue', firstTableIntervalValue);
      params.append('tradeName', JSON.stringify(this.tradeName));
      params.append('action', 'total');
      this.calculateNewTradeTestTotal(params).then(res => {
        this.firstMaxData = res.data;
      })
    },
    firstMaxDataTableLossPer(){
      this.response.tradeTotalLong = this.firstMaxData.tradeTableMaxLossPerData.tradeTotalLong;
      this.response.tradeTotalShort = this.firstMaxData.tradeTableMaxLossPerData.tradeTotalShort;
      this.response.tradeSumLongs = this.firstMaxData.tradeTableMaxLossPerData.tradeSumLongs;
      this.response.tradeSumShorts = this.firstMaxData.tradeTableMaxLossPerData.tradeSumShorts;
      this.response.tradePieces = this.firstMaxData.tradeTableMaxLossPerData.tradePieces;
    },
    firstMaxDataTableRevenuePer(){
      this.response.tradeTotalLong = this.firstMaxData.tradeTableMaxRevenuePerData.tradeTotalLong;
      this.response.tradeTotalShort = this.firstMaxData.tradeTableMaxRevenuePerData.tradeTotalShort;
      this.response.tradeSumLongs = this.firstMaxData.tradeTableMaxRevenuePerData.tradeSumLongs;
      this.response.tradeSumShorts = this.firstMaxData.tradeTableMaxRevenuePerData.tradeSumShorts;
      this.response.tradePieces = this.firstMaxData.tradeTableMaxRevenuePerData.tradePieces;
    },
    firstMaxDataTableVictoryPer(){
      this.response.tradeTotalLong = this.firstMaxData.tradeTableMaxVictoryPerData.tradeTotalLong;
      this.response.tradeTotalShort = this.firstMaxData.tradeTableMaxVictoryPerData.tradeTotalShort;
      this.response.tradeSumLongs = this.firstMaxData.tradeTableMaxVictoryPerData.tradeSumLongs;
      this.response.tradeSumShorts = this.firstMaxData.tradeTableMaxVictoryPerData.tradeSumShorts;
      this.response.tradePieces = this.firstMaxData.tradeTableMaxVictoryPerData.tradePieces;
    },
    changePositionFirstTable(firstTableMinValue, firstTableMaxValue, firstTableIntervalValue){
      this.response =JSON.parse(JSON.stringify(this.responseCopy));
      const params = new URLSearchParams();
      params.append('minValue', firstTableMinValue);
      params.append('maxValue', firstTableMaxValue);
      params.append('intervalValue', firstTableIntervalValue);
      params.append('tradeName', JSON.stringify(this.tradeName));
      params.append('action', 'position');
      this.calculateNewTradeTestPosition(params).then(res => {
         this.firstMaxDataPosition = res.data;
        // this.$refs.total_component.getTradeTotalFirstTablePosition();
      })
    },
    firstMaxDataPositionTableLossPer(){
      // this.response.tradeTotal = this.firstMaxDataPosition.tradeTableMaxLossPerData.tradeTotal;
      this.response.tradeTotalLong = this.firstMaxDataPosition.tradeTableMaxLossPerData.tradeTotalLong;
      this.firstPositionTradeSumLongsData = this.firstMaxDataPosition.tradeTableMaxLossPerData.tradeSumLongs;
      this.response.tradeTotalShort = this.firstMaxDataPosition.tradeTableMaxLossPerData.tradeTotalShort;
      this.firstPositionTradeSumShortsData = this.firstMaxDataPosition.tradeTableMaxLossPerData.tradeSumShorts;
    },
    firstMaxDataPositionTableRevenuePer(){
      // this.response.tradeTotal = this.firstMaxDataPosition.tradeTableMaxRevenuePerData.tradeTotal;
      this.response.tradeTotalLong = this.firstMaxDataPosition.tradeTableMaxRevenuePerData.tradeTotalLong;
      this.firstPositionTradeSumLongsData = this.firstMaxDataPosition.tradeTableMaxRevenuePerData.tradeSumLongs;
      this.response.tradeTotalShort = this.firstMaxDataPosition.tradeTableMaxRevenuePerData.tradeTotalShort;
      this.firstPositionTradeSumShortsData = this.firstMaxDataPosition.tradeTableMaxRevenuePerData.tradeSumShorts;
    },
    firstMaxDataPositionTableVictoryPer(){
      // this.response.tradeTotal = this.firstMaxDataPosition.tradeTableMaxVictoryPerData.tradeTotal;
      this.response.tradeTotalLong = this.firstMaxDataPosition.tradeTableMaxVictoryPerData.tradeTotalLong;
      this.firstPositionTradeSumLongsData = this.firstMaxDataPosition.tradeTableMaxVictoryPerData.tradeSumLongs;
      this.response.tradeTotalShort = this.firstMaxDataPosition.tradeTableMaxVictoryPerData.tradeTotalShort;
      this.firstPositionTradeSumShortsData = this.firstMaxDataPosition.tradeTableMaxVictoryPerData.tradeSumShorts;
    },
    changeTotalSecondTable(secondTableMinValue, secondTableMaxValue, secondTableIntervalValue){
      this.secondResponse =JSON.parse(JSON.stringify(this.secondResponseCopy));
      const params = new URLSearchParams();
      params.append('minValue', secondTableMinValue);
      params.append('maxValue', secondTableMaxValue);
      params.append('intervalValue', secondTableIntervalValue);
      params.append('tradeName', JSON.stringify(this.secondTradeName));
      params.append('action', 'total');
      this.calculateNewTradeTestTotal(params).then(res => {
        this.secondMaxData = res.data;
      })

    },
    secondMaxDataTableLossPer(){
      this.secondResponse.tradeTotalLong = this.secondMaxData.tradeTableMaxLossPerData.tradeTotalLong;
      this.secondResponse.tradeTotalShort = this.secondMaxData.tradeTableMaxLossPerData.tradeTotalShort;
      this.secondResponse.tradeSumLongs = this.secondMaxData.tradeTableMaxLossPerData.tradeSumLongs;
      this.secondResponse.tradeSumShorts = this.secondMaxData.tradeTableMaxLossPerData.tradeSumShorts;
      this.secondResponse.tradePieces = this.secondMaxData.tradeTableMaxLossPerData.tradePieces;
    },
    secondMaxDataTableRevenuePer(){
      this.secondResponse.tradeTotalLong = this.secondMaxData.tradeTableMaxRevenuePerData.tradeTotalLong;
      this.secondResponse.tradeTotalShort = this.secondMaxData.tradeTableMaxRevenuePerData.tradeTotalShort;
      this.secondResponse.tradeSumLongs = this.secondMaxData.tradeTableMaxRevenuePerData.tradeSumLongs;
      this.secondResponse.tradeSumShorts = this.secondMaxData.tradeTableMaxRevenuePerData.tradeSumShorts;
      this.secondResponse.tradePieces = this.secondMaxData.tradeTableMaxRevenuePerData.tradePieces;
    },
    secondMaxDataTableVictoryPer(){
      this.secondResponse.tradeTotalLong = this.secondMaxData.tradeTableMaxVictoryPerData.tradeTotalLong;
      this.secondResponse.tradeTotalShort = this.secondMaxData.tradeTableMaxVictoryPerData.tradeTotalShort;
      this.secondResponse.tradeSumLongs = this.secondMaxData.tradeTableMaxVictoryPerData.tradeSumLongs;
      this.secondResponse.tradeSumShorts = this.secondMaxData.tradeTableMaxVictoryPerData.tradeSumShorts;
      this.secondResponse.tradePieces = this.secondMaxData.tradeTableMaxVictoryPerData.tradePieces;
    },
    changePositionSecondTable(secondTableMinValue, secondTableMaxValue, secondTableIntervalValue){
      this.secondResponse =JSON.parse(JSON.stringify(this.secondResponseCopy));
      const params = new URLSearchParams();
      params.append('minValue', secondTableMinValue);
      params.append('maxValue', secondTableMaxValue);
      params.append('intervalValue', secondTableIntervalValue);
      params.append('tradeName', JSON.stringify(this.secondTradeName));
      params.append('action', 'position');
      this.calculateNewTradeTestPosition(params).then(res => {
        this.secondMaxDataPosition = res.data;
        // this.$refs.total_component.getTradeTotalSecondTablePosition();
      })
    },
    secondMaxDataPositionTableLossPer(){
      // this.secondResponse.tradeTotal = this.secondMaxDataPosition.tradeTableMaxLossPerData.tradeTotal;
      this.secondResponse.tradeTotalLong = this.secondMaxDataPosition.tradeTableMaxLossPerData.tradeTotalLong;
      this.secondPositionTradeSumLongsData = this.secondMaxDataPosition.tradeTableMaxLossPerData.tradeSumLongs;
      this.secondResponse.tradeTotalShort = this.secondMaxDataPosition.tradeTableMaxLossPerData.tradeTotalShort;
      this.secondPositionTradeSumShortsData = this.secondMaxDataPosition.tradeTableMaxLossPerData.tradeSumShorts;
    },
    secondMaxDataPositionTableRevenuePer(){
      // this.secondResponse.tradeTotal = this.secondMaxDataPosition.tradeTableMaxRevenuePerData.tradeTotal;
      this.secondResponse.tradeTotalLong = this.secondMaxDataPosition.tradeTableMaxRevenuePerData.tradeTotalLong;
      this.secondPositionTradeSumLongsData = this.secondMaxDataPosition.tradeTableMaxRevenuePerData.tradeSumLongs;
      this.secondResponse.tradeTotalShort = this.secondMaxDataPosition.tradeTableMaxRevenuePerData.tradeTotalShort;
      this.secondPositionTradeSumShortsData = this.secondMaxDataPosition.tradeTableMaxRevenuePerData.tradeSumShorts;
    },
    secondMaxDataPositionTableVictoryPer(){
      // this.secondResponse.tradeTotal = this.secondMaxDataPosition.tradeTableMaxVictoryPerData.tradeTotal;
      this.secondResponse.tradeTotalLong = this.secondMaxDataPosition.tradeTableMaxVictoryPerData.tradeTotalLong;
      this.secondPositionTradeSumLongsData = this.secondMaxDataPosition.tradeTableMaxVictoryPerData.tradeSumLongs;
      this.secondResponse.tradeTotalShort = this.secondMaxDataPosition.tradeTableMaxVictoryPerData.tradeTotalShort;
      this.secondPositionTradeSumShortsData = this.secondMaxDataPosition.tradeTableMaxVictoryPerData.tradeSumShorts;
    },
    async calculateNewTradeTestTotal(params){
      return this.$axios.post('/api/show/calculate/test/total', params);
    },
    async calculateNewTradeTestPosition(params){
      return this.$axios.post('/api/show/calculate/test/position', params);
    },
    firstReturn() {
      this.response =JSON.parse(JSON.stringify(this.responseCopy));
    },
    secondReturn() {
      this.secondResponse =JSON.parse(JSON.stringify(this.secondResponseCopy));
    }
  }
}
</script>

<style scoped>

</style>