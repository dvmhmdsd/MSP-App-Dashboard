<template>
  <v-container>
    <div class="text-center" v-show="loading">
      <v-btn fab top loading></v-btn>
    </div>
    <v-row v-if="!loading && courses.length > 0">
      <v-col cols="12" xs="12" sm="6" v-for="course in courses" :key="course.id">
        <CourseItem
          @remove="removeCourse($event)"
          :id="course._id"
          :courseName="course.name"
          :link="course.courseLink"
        ></CourseItem>
      </v-col>
    </v-row>
    <v-row v-else-if="!loading">
      <v-col cols="12" xs="12" class="text-center">
        <p>No courses Added yet</p>
      </v-col>
    </v-row>

    <v-btn to="/courses/new" title="Add a new course" fixed dark fab bottom right color="blue">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import CourseItem from "../helpers/CourseItem";
export default {
  components: {
    CourseItem
  },
  data() {
    return {
      courses: [],
      loading: false
    };
  },
  methods: {
    removeCourse(id) {
      this.loading = true;
      this.courses.forEach((course, i) => {
        if (course._id === id) {
          this.$http.delete(`api/courses/delete/${id}`).then(result => {
            this.courses.splice(i, 1);
            this.loading = false;
          });
        }
      });
    }
  },
  created() {
    this.loading = true;
    this.$http.get("api/courses/").then(result => {
      this.courses = result.data;
      this.loading = false;
    });
  }
};
</script>
