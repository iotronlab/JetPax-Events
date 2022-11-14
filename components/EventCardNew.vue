<template>
  <div>
    <nuxt-link
      :to="{
        name: 'slug-event',
        params: {
          slug: event.url,
        },
      }"
      :aria-label="event.name"
    >
      <v-img
        class="rounded-lg"
        :aspect-ratio="4 / 5"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        gradient="to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%"
        dark
      >
        <div class="d-flex align-content-space-between flex-wrap fill-height pa-1">
          <v-row no-gutters justify="space-between" style="width: 100%">
            <div class="card-glass rounded-lg">
              <h1 class="ma-1 text-center text-h5">
                {{ StartDate(event.startOn).split(" ")[0] }} <br />
                {{ StartDate(event.startOn).split(" ")[1] }}
              </h1>
            </div>
            <v-btn icon>
              <v-icon>{{ icons.heart }}</v-icon>
            </v-btn>
          </v-row>
          <h2 class="text-h4">{{ event.name }}</h2>
        </div>
      </v-img>
    </nuxt-link>
    <h3 class="text-h6">
      <v-icon small>{{ icons.calendar }}</v-icon>
      {{ FullDate(event.startOn, event.endOn) }}
    </h3>
    <h3 class="text-subtitle-1">
      <v-icon small>{{ icons.marker }}</v-icon> {{ event.location }}
    </h3>

    <v-row no-gutters class="pa-2 text-subtitle-1">
      <v-row no-gutters align="center" class="mx-1">
        <h4>Genres</h4>
        <v-chip v-for="(genre, n) in event.genres" :key="n" class="ma-1" outlined>{{
          genre
        }}</v-chip>
      </v-row>
      <v-row no-gutters align="center" class="mx-1">
        <h4>Languages</h4>
        <v-chip v-for="(language, k) in event.languages" :key="k" class="ma-1" outlined>{{
          language
        }}</v-chip>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarMonth, mdiHeart } from "@mdi/js";

export default {
  name: "EventCardNew",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      icons: {
        marker: mdiMapMarkerStar,
        calendar: mdiCalendarMonth,
        heart: mdiHeart,
      },
    };
  },

  methods: {
    FullDate(start, end) {
      const strt = start.split(" ")[2][0];
      const ed = end.split(" ");
      const date = strt + " - " + ed[2][0] + " " + ed[1] + " " + ed[3];
      return date;
    },

    StartDate(start) {
      const strt = start.split(" ")[2][0];
      const mon = start.split(" ")[1];
      const date = strt + " " + mon;
      return date;
    },
  },
};
</script>
