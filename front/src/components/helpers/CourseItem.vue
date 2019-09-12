<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-btn text :href="update.updatedLink">{{ update.updatedName }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon large @click.stop="dialog = true">
          <v-icon>mdi-lead-pencil</v-icon>
        </v-btn>

        <v-btn icon large @click="removeItem">
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Edit</v-card-title>

        <v-card-text class="text-center">
          <v-form v-model="valid">
            <v-text-field
              :rules="nameRules"
              label="Name of the course"
              prepend-inner-icon="mdi-lead-pencil"
              v-model="form.name"
              required
            ></v-text-field>
            <v-text-field
              :rules="linkRules"
              label="Link of the course"
              prepend-inner-icon="mdi-link-variant"
              v-model="form.courseLink"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="blue darken-1" text @click="handleSubmit" :disabled="!valid">edit course</v-btn>

          <v-btn color="blue darken-1" text @click="dialog = false">cansel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["courseName", "link", "id"],
  data() {
    return {
      dialog: false,
      valid: false,
      form: {
        name: this.courseName,
        courseLink: this.link
      },
      update: {
        updatedName: this.courseName,
        updatedLink: this.link
      },
      nameRules: [v => !!v || "Name of the course is required"],
      linkRules: [v => !!v || "The Link of the course is required"]
    };
  },
  methods: {
    removeItem() {
      this.$emit("remove", this.id);
    },
    handleSubmit() {
      this.update.updatedName = this.form.name;
      this.update.updatedLink = this.form.courseLink;
      
      this.$emit("edit", [this.form, this.id]);

      this.dialog = false;
    }
  }
};
</script>
