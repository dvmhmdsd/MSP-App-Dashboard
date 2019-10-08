<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="8" offset-sm="2">
          <h2 class="headline">Add a Project</h2>
          <v-form v-model="valid" @submit.prevent="handleSubmit">
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

            <v-select
              :items="items"
              label="Category"
              solo
              v-model="form.category"
            ></v-select>

            <v-card class="mt-6 pt-2 pb-8 px-8">
              <v-card-title>
                <div class="headline">Stuff</div>
              </v-card-title>

              <v-card-text>
                <v-text-field v-model="member.name" @keypress.ctrl.enter="addMember"></v-text-field>
                <small class="d-none d-md-flex">press ctrl + enter to add member</small>
                <v-file-input
                  @change="onMemberImgPicked"
                  label="Upload"
                  type="file"
                  ref="fileInput"
                  accept="image/*"
                  rounded
                  flat
                ></v-file-input>
              </v-card-text>

              <div class="stuff-preview">
                <div class="stuff-preview-item" v-for="member in form.stuff" :key="member.name">
                  <p class="blue white--text px-2 py-2 text-center">{{ member.name }}</p>
                  <div>
                    <img style="border-radius: 50%" width="50" height="50" :src="member.memberIMG" alt />
                  </div>
                </div>
              </div>

              <v-card-actions>
                <v-btn icon fab title="Add member" @click="addMember">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  fab
                  title="Please be sure about every thing in the stuff and make sure there's no typos because you won't be able to edit it later"
                  @click.stop="hintDialog = true"
                  max-width="290"
                >
                  <v-icon>mdi-help-circle-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>

            <v-dialog v-model="hintDialog" max-width="290">
              <v-card class="pt-5">
                <v-card-text
                  class="text-center"
                  style="font-weight: bold"
                >Please be sure about every thing in the stuff and make sure there's no typos because you won't be able to edit it later</v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>

                  <v-btn color="blue darken-1" text @click="hintDialog = false">close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-btn
              type="submit"
              x-large
              block
              color="blue"
              class="mt-5 white--text"
              :disabled="!valid"
              :loading="loading"
            >Add Project</v-btn>
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
      hintDialog: false,
      items: ["IT", "WEB", "MOBILE", "MEDIA", "AUTONOMOUS"],
      form: {
        title: "",
        description: "",
        projectLink: "",
        imgURL: "",
        stuff: [],
        category: ""
      },
      member: {
        name: "",
        memberIMG: ""
      },
      rules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      // send data to the server
      this.$http
        .post("/api/projects/add", {
          title: this.form.title,
          description: this.form.description,
          projectLink: this.form.projectLink,
          imgURL: this.form.imgURL,
          stuff: this.form.stuff,
          category: this.form.category
        })
        .then(result => {
          this.$router.push("/projects");
          this.loading = false;
        });
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
    onMemberImgPicked(event) {
      if (!event) {
        return;
      }

      const fileReader = new FileReader();

      fileReader.addEventListener("load", e => {
        this.member.memberIMG = e.target.result;
      });

      fileReader.readAsDataURL(event);
    },
    addMember() {
      let { name, memberIMG } = this.member;
      if (this.member.name.length > 2) {
        this.form.stuff.push({ name, memberIMG });
        this.stuffMember = "";
      }
    }
  }
};
</script>

<style scoped>
.stuff-preview-item {
  display: inline-block;
  margin: 3px;
}

.stuff-preview-item p {
  border-radius: 20px;
}
</style>
