<template>
  <v-text-field
      v-model="localFieldValue"
      :label="labelName"
      outlined
      v-show="isShow"
      style="width: 120px"
      @input="myChange"
  ></v-text-field>
</template>

<script>
export default {
  name: "MyTextFieldComponent",
  props: {
    isShow: Boolean,
    labelName : String,
    fieldValue : String,
  },
  computed: {
    localFieldValue: {
      get: function () {
        return this.fieldValue
      },
      set: function (data){
        this.$emit('input', data);
      }
    },
  },
  methods: {
    myChange($event) {
       this.$emit('update:fieldValue', $event);
      // console.log($event.target.value)
    },
  },
}
</script>

<style scoped>

</style>