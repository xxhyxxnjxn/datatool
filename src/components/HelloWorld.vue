<template>
  <div>
    <v-row justify="center" no-gutters>
      <v-col
          cols="12"
          md="9"
          lg="6"
      >
        <v-card
            max-width="1200"
            outlined
            ref="form"
        >
          <v-card-text>
            <v-container fluid grid-list-lg>
              <v-textarea
                  v-model="inputData"
                  clearable
                  clear-icon="mdi-close-circle"
                  label="Text"
                  @keyup.enter="submit"
                  rows="10"
                  row-height="30"
              ></v-textarea>
            </v-container>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    v-model="tdName"
                    color="purple darken-2"
                    label="이름"
                    outlined
                    @keyup.enter="submit"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                  cols="12"
                  sm="6"
              >
                <v-text-field
                    v-model="fee"
                    color="purple darken-2"
                    label="수수료"
                    hint="곱하기 2 해줘야 함 => ex) 사는데 수수료 0.075 => 0.15, 이유 : 탈출까지 계산하는데 진입 하고 탈출하면 0.75가 2번 들기때문"
                    persistent-hint
                    outlined
                    @keyup.enter="submit"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn
                color="primary"
                text
                @click="submit"
            >
              Submit
            </v-btn>
          </v-card-actions>
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
import MySnackBarComponent from "@/components/about/MySnackBarComponent";

export default {
  name: 'HelloWorld',
  components: {
    MySnackBarComponent,
  },
  data: () => ({
    inputData: '',
    tdName: '',
    fee: '0.15',
    snackbar: false,
    text: '',
  }),
  methods: { // 메소드 객체
    submit() {
      // Perform an action
      const params = new URLSearchParams();
      params.append('inputData', this.inputData);
      params.append('tdName', this.tdName);
      params.append('fee', this.fee);

      this.$axios.post('/api/insert/', params).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.text = '저장되었습니다.';
        } else {
          this.text = '저장하지 못하였습니다.';
        }
        this.snackbar = true;
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>

<style scoped>
</style>
