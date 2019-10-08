<template>
  <v-container>
    <div class="text-center" v-show="loading">
      <v-btn fab top loading></v-btn>
    </div>
    <v-row v-if="!loading && events.length > 0">
      <v-col cols="12" xs="12" lg="6" v-for="event in events" :key="event._id">
        <EventItem
          @remove="removeEvent($event)"
          :id="event._id"
          :title="event.title"
          :description="event.description"
          :location="event.location"
          :price="event.price"
          :formLink="event.formLink"
          :imgURL="event.imgURL"
          :date="event.date"
          :time="event.time"
          :topics="event.topics"
        ></EventItem>
      </v-col>
    </v-row>

    <v-row v-else-if="!loading">
      <v-col cols="12" xs="12" class="text-center">
        <p>No events Added yet</p>
      </v-col>
    </v-row>

    <v-btn to="/events/new" title="Add a new event" fixed dark fab bottom right color="blue">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import EventItem from "../helpers/EventItem";
export default {
  components: {
    EventItem
  },
  data() {
    return {
      events: [],
      loading: false
    };
  },
  methods: {
    removeEvent(id) {
      this.loading = true;
      this.events.forEach((event, i) => {
        if (event._id === id) {
          this.$http.delete(`/api/events/delete/${id}`).then(result => {
            this.events.splice(i, 1);
            this.loading = false;
          });
        }
      });
    }
  },
  created() {
    this.loading = true;
    this.$http
      .get("/api/events/")
      .then(result => {
        this.events = result.data;
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.msg = `Oops! ${err.response.statusText} ${err.response.status}`;
      });
  }
};
</script>
