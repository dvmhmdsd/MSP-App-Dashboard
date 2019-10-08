<template>
  <v-container>
    <div class="text-center" v-show="loading">
      <v-btn fab top loading></v-btn>
    </div>
    <p class="text-center" v-if="msg && !loading">{{ msg }}</p>
    <v-row v-if="!loading && !msg && projects.length > 0">
      <v-col cols="12" xs="12" lg="6" v-for="project in projects" :key="project._id">
        <ProjectItem @remove="removeProject($event)" :project="project"></ProjectItem>
      </v-col>
    </v-row>

    <v-row v-else-if="!loading && !msg">
      <v-col cols="12" xs="12" class="text-center">
        <p>No projects Added yet</p>
      </v-col>
    </v-row>

    <v-btn to="/projects/new" title="Add a new project" fixed dark fab bottom right color="blue">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import ProjectItem from "../helpers/ProjectItem";
export default {
  components: {
    ProjectItem
  },
  data() {
    return {
      projects: [],
      loading: false,
      msg: ""
    };
  },
  methods: {
    removeProject(id) {
      this.projects.forEach((project, i) => {
        if (project._id === id) {
          this.$http.delete(`/api/projects/delete/${id}`).then(result => {
            this.projects.splice(i, 1);
          });
        }
      });
    }
  },
  created() {
    this.loading = true;
    this.$http
      .get("/api/projects/")
      .then(result => {
        this.projects = result.data;
        this.loading = false;
        this.msg = "";
      })
      .catch(err => {
        this.loading = false;
        this.msg = "Oops! an error occured";
      });
  }
};
</script>
