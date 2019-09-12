<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="6" v-for="course in courses" :key="course.id">
        <CourseItem
          @remove="removeCourse($event)"
          @edit="editCourse($event)"
          :id="course.id"
          :courseName="course.name"
          :link="course.link"
        ></CourseItem>
      </v-col>
    </v-row>
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
      courses: [
        {
          id: 1,
          name: "Course 1",
          link: "http://javascript.info"
        },
        {
          id: 2,
          name: "Course 2",
          link: "http://javascript1.info"
        },
        {
          id: 3,
          name: "Course 3",
          link: "http://javascript2.info"
        },
        {
          id: 4,
          name: "Course 4",
          link: "http://javascript3.info"
        }
      ],
    };
  },
  methods: {
    removeCourse(id) {
      this.courses.forEach((course, i) => {
        if (course.id === id) {
          this.courses.splice(i, 1)
        }
      });
    },
    editCourse(data) {
      // send data to server
    }
  }
};
</script>
