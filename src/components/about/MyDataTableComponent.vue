<template>
  <v-data-table
      :headers="headers"
      :items="items"
      :hide-default-header="hideHeader"
      :hide-default-footer="hideFooter"
      :items-per-page="pageCount"
      class="elevation-1"
      v-on:click:row="clickRow"
      :item-class="test"
  >
    <template v-for="info in customSlotInfo" v-slot:[info.slotName]="{ item }">
      <slot :name="`${info.name}_custom`" v-bind:item="item"/>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "MyDataTableComponent",
  props: {
    hideHeader: Boolean,
    hideFooter: Boolean,
    items: Array,
    headers: Array,
    customSlotInfo: Array,
    pageCount: Number,
    tableName: String,
  },
  methods: {
    clickRow(row) {
      this.$emit('child-event', row);
    },
    test(item){
      if (typeof this.tableName === 'undefined' && (item.revenueTotal < 0 || item.profitPer < 0)) {
        return 'yellow lighten-5';
      }
    }
  }
}
</script>

<style scoped>
</style>