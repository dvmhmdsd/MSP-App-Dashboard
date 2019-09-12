<template>
  <v-app>
    <v-app-bar
      min-width="100%"
      max-height="56"
      class="justify-sm-center blue darken-1 white--text"
    >
      <v-app-bar-nav-icon
        class="d-sm-none white--text" 
        @click="sideNav = !sideNav"
      ></v-app-bar-nav-icon>
      <v-spacer class="d-sm-none"></v-spacer>
      <v-toolbar-title style="cursor: pointer">
        <router-link to="/" tag="span"> MSP App Dashboard </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn
          text
          class="white--text"
          v-for="item in menuItems"
          :key="item.title"
          exact
          :to="item.link"
        >
          <v-icon left> {{ item.icon }} </v-icon> {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>


    <v-navigation-drawer v-model="sideNav" absolute>
      <v-list>
        <v-list-item-group>
          <v-list-item 
          v-for="item in menuItems" 
          :key="item.title" 
          :to="item.link">
            <v-list-item-icon>
              <v-icon> {{ item.icon }} </v-icon>
            </v-list-item-icon>
            <v-list-item-content> {{ item.title }} </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>

</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    sideNav: false,
    menuItems: [
      { title: "courses",  link: "/courses", icon: "mdi-book-open-page-variant" },
      { title: "events",  link: "/events", icon: "mdi-account-multiple" }
    ]
  }),
};
</script>
