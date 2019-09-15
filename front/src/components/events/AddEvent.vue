<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="8" offset-sm="2">
          <h2 class="headline">Add an Event</h2>
          <v-form v-model="valid" @submit.prevent="handleSubmit">
            <v-text-field
              :rules="rules"
              label="Title of the event"
              prepend-inner-icon="mdi-calendar-edit"
              v-model="form.title"
              required
            ></v-text-field>
            <v-textarea
              :rules="rules"
              no-resize
              label="Description of the event"
              prepend-inner-icon="mdi-calendar-text"
              v-model="form.description"
              required
            ></v-textarea>
            <v-text-field
              :rules="rules"
              label="Location link"
              prepend-inner-icon="mdi-map-marker"
              v-model="form.location"
              required
            ></v-text-field>
            <v-text-field
              :rules="rules"
              label="Form link"
              prepend-inner-icon="mdi-link-variant"
              v-model="form.formLink"
              required
            ></v-text-field>
            <v-text-field
              :rules="rules"
              label="Price of the ticket"
              prepend-inner-icon="mdi-cash"
              v-model="form.price"
              suffix="L.E"
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
            <v-date-picker v-model="form.date" full-width class="mb-8"></v-date-picker>

            <v-time-picker v-model="form.time" full-width></v-time-picker>

            <v-card class="mt-6 pt-2 pb-8 px-8">
              <v-card-title>
                <div class="headline">Topics</div>
              </v-card-title>

              <v-card-text>
                <v-text-field label="Title" v-model="topic.title"></v-text-field>

                <v-text-field label="Speaker Name" v-model="topic.speakerName"></v-text-field>

                <v-text-field label="Speaker Job" v-model="topic.speakerJob"></v-text-field>
              </v-card-text>

              <div class="topics-preview">
                <div class="topics-preview-item" v-for="topic in form.topics" :key="topic.title">
                  <h3 class="blue white--text px-2 py-2 text-center">{{ topic.title }}</h3>
                </div>
              </div>

              <v-card-actions>
                <v-btn icon fab title="Add topic" @click="addTopic">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  icon
                  fab
                  title="Please be sure about every thing in the topics and make sure there's no typos because you won't be able to edit it later"
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
                >Please be sure about every thing in the topics and make sure there's no typos because you won't be able to edit it later</v-card-text>

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
            >Add Event</v-btn>
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
      form: {
        title: "",
        description: "",
        location: "",
        price: "",
        formLink: "",
        imgURL: "",
        date: new Date().toISOString().substr(0, 10),
        time: new Date().toTimeString().substr(0, 5),
        topics: []
      },
      topic: {
        title: "",
        speakerName: "",
        speakerJob: ""
      },
      rules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      // send data to the server
      this.$http
        .post("/api/events/add", {
          name: this.name,
          courseLink: this.link,
          title: this.form.title,
          description: this.form.description,
          location: this.form.location,
          price: this.form.price,
          formLink: this.form.formLink,
          imgURL: this.form.imgURL,
          date: this.form.date,
          time: this.form.time,
          topics: this.form.topics
        })
        .then(result => {
          this.$router.push("/events");
          this.loading = false;
        });
    },
    onfilePick() {
      this.$refs.fileInput.click();
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
    addTopic() {
      let { title, speakerName, speakerJob } = this.topic;

      this.form.topics.push({ title, speakerName, speakerJob });
    }
  }
};
</script>

<style scoped>
.topics-preview-item {
  display: inline-block;
  margin: 3px;
}

.topics-preview-item h3 {
  border-radius: 20px;
}
</style>
