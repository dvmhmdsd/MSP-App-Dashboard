<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="6" md="4" v-for="item in addItems" :key="item.title">
          <AddItem :itemTitle="item.title" :icon="item.icon" :link="item.link"></AddItem>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import AddItem from "./helpers/AddItem";

export default {
  components: {
    AddItem
  },
  data() {
    return {
      addItems: [
        { title: "Add a new Event", icon: "mdi-plus", link: "/events/new" },
        { title: "Add a new Course", icon: "mdi-plus", link: "/courses/new" },
        { title: "Add a new Project", icon: "mdi-plus", link: "/projects/new" }
      ]
    };
  }
};
</script>
