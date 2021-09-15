<template>
  <v-app>
    <template v-if="!$route.path.includes('login')">
      <v-app-bar
          absolute
          color="deep-purple"
          dark
          height="56"
          fixed
          app
      >
        <v-toolbar-title>Title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-bind="attrs"
                v-on="on"
                target="_blank"
                text
            >
              <span class="mr-2">아이디</span>
              <v-icon>$vuetify.icons.account</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="onClick">
              <v-list-item-title>logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
          absolute
          v-model="drawer"
          :mini-variant.sync="mini"
          permanent
          width="250"
          fixed
          app
      >
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <!--          <v-app-bar-nav-icon @click.stop="mini = !mini" @click="show = !show" v-show="show"></v-app-bar-nav-icon>-->
            <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
          </v-list-item-avatar>

          <v-list-item-title>menu</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list>
          <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              @click="movePage(item.target);"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>
    <v-main>
      <keep-alive :include="['Login']">
        <router-view/>
      </keep-alive>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
    drawer: false,
    group: null,
    items: [
      {title: '생성', icon: '$vuetify.icons.edit', target: 'Home'},
      {title: '비교분석 리스트', icon: '$vuetify.icons.compareList', target: 'About'},
    ],
    mini: false,
    show: true,
  }),

  methods: { // 메소드 객체
    onClick() {
    },
    movePage(target) {
      this.$router.push({name: target});
    },
  }
};
</script>
