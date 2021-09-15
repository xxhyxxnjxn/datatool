<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :hide-default-header="hideHeader"
      :hide-default-footer="hideFooter"
      :items-per-page="pageCount"
      class="elevation-1"
      v-on:click:row="clickRow"
      :item-class="checkItem"
  >
    <template v-for="info in customSlotInfo" v-slot:[info.slotName]="{ item }">
      <slot :name="`${info.name}_custom`" v-bind:item="item"/>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "CompareDataTableComponent",
  props: {
    hideHeader: Boolean,
    hideFooter: Boolean,
    items: Array,
    headers: Array,
    customSlotInfo: Array,
    pageCount: Number,
    tableName: String,
    comparedItems:Array,
  },
  methods: {
    clickRow(row) {
      this.$emit('child-event', row);
    },
    checkItem(item){
      if(typeof item.category === 'undefined'){
        if(typeof item.revenueTotal !== 'undefined'){
          const result =  this.comparedItems.filter(element => item.entry === element.entry &&
              this.parseFloatData(item.revenueTotal) !== this.parseFloatData(element.revenueTotal));
          if(result.length > 0){
            return 'blue lighten-5';
          }
        }else if(typeof item.revenueTotal === 'undefined'){
          const result =  this.comparedItems.filter(element => item.id === element.id &&
              this.parseFloatData(item.profitPer) !== this.parseFloatData(element.profitPer));
          if(result.length > 0){
            return 'blue lighten-5';
          }
        }

      }else{
        if(this.parseFloatData(item.revenueTotal) !== this.parseFloatData(this.comparedItems[0].revenueTotal)){
          return 'blue lighten-5';
        }
      }
    },
    parseFloatData(value) {
      return Number(parseFloat(value).toFixed(2));
    },
  }
}
</script>

<style scoped>

</style>