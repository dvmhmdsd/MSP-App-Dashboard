<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="6" offset-sm="3">
          <h2 class="headline">Add a Course</h2>
          <v-form v-model="valid" @submit.prevent="handleSubmit">
            <v-text-field
              :rules="nameRules"
              label="Name of the course"
              prepend-inner-icon="mdi-lead-pencil"
              v-model="name"
              required
            ></v-text-field>
            <v-text-field
              :rules="linkRules"
              label="Link of the course"
              prepend-inner-icon="mdi-link-variant"
              v-model="link"
              required
            ></v-text-field>

            <v-btn
              type="submit"
              x-large
              color="blue"
              class="mt-5 white--text"
              :disabled="!valid"
              :loading="loading"
            >Add Course</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      loading: false,
      name: "",
      link: "",
      nameRules: [v => !!v || "Name of the course is required"],
      linkRules: [v => !!v || "The Link of the course is required"]
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      // send data to the server
      this.$http
        .post("/api/courses/add", {
          name: this.name,
          courseLink: this.link
        })
        .then(result => {
          this.$router.push("/courses");

          this.loading = false;
        });
    }
  }
};
</script>
