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
              prepend-inner-icon="mdi-lead-pencil"
              v-model="form.title"
              required
            ></v-text-field>
            <v-textarea
              :rules="rules"
              no-resize
              label="Description of the event"
              prepend-inner-icon="mdi-android-messages"
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

            <v-btn
              type="submit"
              x-large
              block
              color="blue"
              class="mt-5 white--text"
              :disabled="!valid"
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
      form: {
        title: "",
        description: "",
        location: "",
        price: "",
        formLink: "",
        imgURL: "",
        date: new Date().toISOString().substr(0, 10),
        time: new Date()
      },
      rules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    handleSubmit() {
      // send data to the server
      console.log(this.form);
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
    }
  }
};
</script>
