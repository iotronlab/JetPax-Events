<template>
  <v-container fluid class="card-glass rounded-xl">
    <v-row no-gutters class="mb-4" justify="center">
      <v-col cols="auto">
        <v-icon left x-large>{{ calender }}</v-icon></v-col
      ><v-col cols="auto">
        <h1
          class="primary--text pl-2 pt-2"
          style="border-left: 0.5rem dotted #de3163; font-size: 1.3rem"
        >
          {{ event.startOn }}
          <span class="text-subtitle-2 secondary--text"
            ><br />- {{ event.endOn }}</span
          >
        </h1>
      </v-col></v-row
    >

    <v-row no-gutters class="mb-2" align="center" justify="center">
      <v-btn
        v-if="event.isBookingOpen == true"
        small
        outlined
        rounded
        color="success"
        :to="{
          name: 'events-slug',
          params: {
            slug: event.url,
          },
        }"
        >Booking Open</v-btn
      >
      <v-btn v-else small text disabled>Booking Closed</v-btn>
      <v-btn
        class="ml-2"
        small
        rounded
        outlined
        :to="{
          name: 'events-slug',
          params: {
            slug: event.url,
          },
        }"
        >details</v-btn
      >
    </v-row>
    <h2 style="letter-spacing: 0.1rem; font-size: 1.8rem" class="text-center">
      {{ event.name }}
    </h2>
    <v-divider class="my-2"></v-divider>
    <v-btn text class="mb-2">
      <v-icon left>{{ location }}</v-icon
      >View on map</v-btn
    >
    <div class="text-body-2">
      <h3 class="mb-4">Venue - {{ event.location }}</h3>
      <v-row no-gutters class="mb-2" align="center">
        <h4>Genres</h4>
        <v-chip
          v-for="(genre, n) in event.genres"
          :key="n"
          class="ml-2"
          outlined
          >{{ genre }}</v-chip
        >
      </v-row>
      <v-row v-if="event.languages" no-gutters class="mb-2" align="center">
        <h4>Languages</h4>
        <v-chip
          v-for="(language, k) in event.languages"
          :key="k"
          class="ml-2"
          outlined
          >{{ language }}</v-chip
        >
      </v-row>
      <!-- <v-row
                  v-if="event.socials"
                  no-gutters
                  class="mb-2"
                  align="center"
                >
                  <h4>Socials</h4>
                  <v-chip
                    v-for="(social, l) in event.socials"
                    :key="l"
                    class="ml-2"
                    outlined
                    >{{ social }}</v-chip
                  >
                </v-row> -->
    </div>
    <section class="text-center">
      <h2 class="text-h4 my-4">Line Up</h2>
      <v-row no-gutters justify="center"
        ><v-col v-for="(artist, z) in event.artists" :key="z" cols="6" lg="4">
          <v-avatar class="profile" color="grey" size="9rem">
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
          <h3>{{ artist.name }}</h3>
        </v-col></v-row
      >
    </section>
  </v-container>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarHeart } from '@mdi/js'
export default {
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      location: mdiMapMarkerStar,
      calender: mdiCalendarHeart,
    }
  },
}
</script>

