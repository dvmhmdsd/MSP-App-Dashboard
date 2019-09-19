<template>
  <v-container>
    <div class="text-center" v-show="loading">
      <v-btn fab top loading></v-btn>
    </div>
    <v-row v-if="!loading && projects.length > 0">
      <v-col cols="12" xs="12" lg="6" v-for="project in projects" :key="project._id">
        <ProjectItem
          @remove="removeProject($event)"
          :id="project._id"
          :title="project.title"
          :description="project.description"
          :projectLink="project.projectLink"
          :imgURL="project.imgURL"
        ></ProjectItem>
      </v-col>
    </v-row>

    <v-row v-else-if="!loading">
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
      loading: false
    };
  },
  methods: {
    removeProject(id) {
      this.loading = true;
      this.projects.forEach((project, i) => {
        if (project._id === id) {
          this.$http
            .delete(`/api/projects/delete/${id}`)
            .then(result => {
              this.projects.splice(i, 1);
              this.loading = false;
            });
        }
      });
    }
  },
  created() {
    this.loading = true;
    this.$http.get("/api/projects/").then(result => {
      this.projects = result.data;
      this.loading = false;
    });
  }
};
</script>
