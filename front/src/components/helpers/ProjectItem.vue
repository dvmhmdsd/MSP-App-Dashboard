<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col class="py-0 d-flex justify-center align-center">
          <p> url: {{project.imgURL}} </p>
          <img
            v-if="update.imgURLUpdated"
            height="100%"
            style="max-width: 100%"
            :src="update.imgURLUpdated"
            :alt="'image of ' + update.titleUpdated"
          />
          <p v-else>No image provided</p>
        </v-col>
        <v-col>
          <v-card-title>
            <h2 class="headline text-uppercase">
              <v-btn text :href="update.projectLinkUpdated" x-large>
                {{ update.titleUpdated }}
              </v-btn>
            </h2>
          </v-card-title>

          <v-card-text></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon large @click.stop="dialog = true">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>

            <v-btn icon large @click="removeItem">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">Edit</v-card-title>

        <v-card-text class="text-center">
          <v-btn text loading v-if="loading"></v-btn>
          <v-form v-model="valid" v-if="!loading">
            <v-text-field
              :rules="rules"
              label="Title of the project"
              prepend-inner-icon="mdi-calender-edit"
              v-model="form.title"
              required
            ></v-text-field>
            <v-textarea
              :rules="rules"
              no-resize
              label="Description of the project"
              prepend-inner-icon="mdi-calender-text"
              v-model="form.description"
              required
            ></v-textarea>
            <v-text-field
              :rules="rules"
              label="Project link"
              prepend-inner-icon="mdi-link-variant"
              v-model="form.projectLink"
              required
            ></v-text-field>
            <v-file-input
              @change="onFilePicked"
              label="Upload"
              type="file"
              ref="fileInput"
              accept="image/*"
              rounded
              flat
            ></v-file-input>
            <div>
              <img width="200" height="200" :src="form.imgURL" alt />
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="blue darken-1" text @click="handleSubmit" :disabled="!valid">edit project</v-btn>

          <v-btn color="blue darken-1" text @click="dialog = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["project"],
  data() {
    return {
      dialog: false,
      loading: false,
      valid: false,
      form: {
        title: this.project.title,
        description: this.project.description,
        projectLink: this.project.projectLink,
        imgURL: this.project.imgURL
      },
      update: {
        titleUpdated: this.project.title,
        descriptionUpdated: this.project.description,
        projectLinkUpdated: this.project.projectLink,
        imgURLUpdated: this.project.imgURL
      },
      rules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    removeItem() {
      this.$emit("remove", this.project._id);
    },
    onFilePicked(event) {
      if (!event) {
        return;
      }

      const fileReader = new FileReader();

      fileReader.addEventListener("load", e => {
        this.form.imgURL = e.target.result;
      });

      fileReader.readAsDataURL(event);
    },
    handleSubmit() {
      this.loading = true;

      this.$http
        .put(`/api/projects/edit/${this.id}`, this.form)
        .then(result => {
          this.update.titleUpdated = this.form.title;
          this.update.descriptionUpdated = this.form.description;
          this.update.imgURLUpdated = this.form.imgURL;
          this.update.projectLinkUpdated = this.form.projectLink;

          this.dialog = false;

          this.loading = false;
        });
    }
  }
};
</script>
