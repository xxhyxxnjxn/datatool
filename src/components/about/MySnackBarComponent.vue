<template>
  <v-snackbar
      v-model="localSnackBar"
      :top = true
      :multi-line=true
      :timeout=900
      color="#E8EAF6"
      height="100px"
      width="250px"
      light
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="updateSnackBar"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "MySnackBarComponent",
  props: {
    snackbar: Boolean,
    text: String,
  },
  computed: {
    localSnackBar: {
      get: function () {
        return this.snackbar
      },
      set: function (data) {
        this.$emit('update:snackbar',data)
      },
    },
  },
  methods: {
    updateSnackBar(){
      this.$emit('update:snackbar',false)
    }
  }
}
</script>

<style scoped>

</style>