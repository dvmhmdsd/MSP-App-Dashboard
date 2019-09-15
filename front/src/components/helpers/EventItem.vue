<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col class="py-0">
          <img
            height="100%"
            style="max-width: 100%"
            :src="update.imgURLUpdated"
            :alt="'image of ' + update.titleUpdated"
          />
        </v-col>
        <v-col>
          <v-card-title>
            <h2 class="headline text-uppercase">
              <v-btn text :href="update.formLinkUpdated" x-large>
                <v-icon left>mdi-calendar-check</v-icon>
                {{ update.titleUpdated }}
              </v-btn>
            </h2>
          </v-card-title>

          <v-card-text>
            <p>{{ update.descriptionUpdated.substr(0, 70) + '...' }}</p>
            <v-row class="align-end">
              <v-col md="6" sm="12" cols="12">
                <p>
                  <v-icon left>mdi-calendar-check-outline</v-icon>
                  {{ update.dateUpdated }}
                </p>
              </v-col>
              <v-col md="6" sm="12" cols="12">
                <p>
                  <v-icon left>mdi-clock-outline</v-icon>
                  {{ update.timeUpdated }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <p>
              <v-icon left>mdi-cash</v-icon>
              {{ update.priceUpdated }} L.E
            </p>
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
              label="Title of the event"
              prepend-inner-icon="mdi-calender-edit"
              v-model="form.title"
              required
            ></v-text-field>
            <v-textarea
              :rules="rules"
              no-resize
              label="Description of the event"
              prepend-inner-icon="mdi-calender-text"
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
            <v-date-picker v-model="update.dateUpdate" full-width class="mb-8"></v-date-picker>

            <v-time-picker v-model="update.timeUpdated" full-width></v-time-picker>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <div class="flex-grow-1"></div>

          <v-btn color="blue darken-1" text @click="handleSubmit" :disabled="!valid">edit course</v-btn>

          <v-btn color="blue darken-1" text @click="dialog = false">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: [
    "id",
    "title",
    "description",
    "location",
    "price",
    "formLink",
    "imgURL",
    "date",
    "time"
  ],
  data() {
    return {
      dialog: false,
      loading: false,
      valid: false,
      form: {
        title: this.title,
        description: this.description,
        location: this.location,
        price: this.price,
        formLink: this.formLink,
        imgURL: this.imgURL,
        date: new Date().toISOString().substr(0, 10),
        time: new Date().toTimeString().substr(0, 5)
      },
      update: {
        titleUpdated: this.title,
        descriptionUpdated: this.description,
        locationUpdated: this.location,
        priceUpdated: this.price,
        formLinkUpdated: this.formLink,
        imgURLUpdated: this.imgURL,
        dateUpdated: this.date,
        timeUpdated: this.time
      },
      rules: [v => !!v || "This field is required"]
    };
  },
  methods: {
    removeItem() {
      this.$emit("remove", this.id);
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
    handleSubmit() {
      this.loading = true;

      this.$http.put(`/api/events/edit/${this.id}`, this.form).then(result => {
        this.update.titleUpdated = this.form.title;
        this.update.descriptionUpdated = this.form.description;
        this.update.locationUpdated = this.form.location;
        this.update.priceUpdated = this.form.price;
        this.update.formLinkUpdated = this.form.formLink;
        this.update.imgURLUpdated = this.form.imgURL;
        this.update.dateUpdated = this.form.date;
        this.update.timeUpdated = this.form.time;

        this.dialog = false;
      });
    }
  }
};
</script>
