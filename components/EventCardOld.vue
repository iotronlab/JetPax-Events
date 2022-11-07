<template>
    <v-card class="mb-12 mx-4 pb-2 pt-1" style="border-radius: 10px;">
        <template slot="progress">
        <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
        ></v-progress-linear>
        </template>

        <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        style="border-radius: 10px;"
        >
        <v-list-item class="my-2">
          <v-btn text tile class="white py-8" style="border-radius: 10px;">
            <div>
              <v-card-title class="ma-0 pa-0 text--lighten black--text mt-1 ml-2">{{ StartDate(event.startOn).split(' ')[0] }}</v-card-title>
              <v-card-text class="ma-0 pa-0 text--lighten black--text text-body-2">{{ StartDate(event.startOn).split(' ')[1] }}</v-card-text>
            </div>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon class="red"><v-icon class="">{{ icons.heart }}</v-icon></v-btn>
        </v-list-item>
        </v-img>

        <v-card-title class="mb-0">{{ event.name }}</v-card-title>

        <v-card-text class="mb-0 pb-0 mt-4">
        <v-row
            align="center"
            class="mx-0"
        >
            <div class="grey--text">
            <v-icon small class="mr-1">{{ icons.calendar }}</v-icon> {{ FullDate(event.startOn, event.endOn) }}
            </div>
        </v-row>

        <div class="mt-6 text-body-2">
          <v-icon small class="mr-1">{{ icons.marker }}</v-icon> {{ event.location }}
        </div>
        </v-card-text>

        <v-divider class="mx-4 my-4"></v-divider>

        <v-row v-if="event.genres" no-gutters class="mx-4 my-2" align="center">
        <h4 class="mr-2 text-body-1">Genres</h4>
        <v-chip
          v-for="(genre, n) in event.genres"
          :key="n"
          class="ml-2"
          outlined
          >{{ genre }}</v-chip
        >
      </v-row>

      <h4 class="mx-4 text-body-1">Languages</h4>

      <v-card-text class="my-0 py-0">
        <v-chip-group
          active-class="deep-purple accent-4 white--text my-0 py-1"
          column
        >
          <v-chip v-for="(language, k) in event.languages" :key="k" class="mr-2">{{ language }}</v-chip>
        </v-chip-group>
      </v-card-text>
<!-- 
        </v-card-text> -->

        <v-card-actions class="mx-2 mt-2">
        <v-btn color="deep-purple lighten-2" rounded text>
            Bookings open
        </v-btn><v-spacer></v-spacer>
        <v-btn color="deep-purple lighten-2" text rounded class="text-body-2">
            Details
        </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarMonth, mdiHeart } from '@mdi/js'

export default {
  name: 'EventCardOld',
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
    }
  },

  methods: {
    FullDate(start, end) {
      const strt = (start.split(' ')[2])[0]
      const ed = (end.split(' '))
      const date = strt + " - " + ed[2][0] + ' ' + ed[1] + ' ' + ed[3]
      return date
    },

    StartDate(start) {
      const strt = (start.split(' ')[2])[0]
      const mon = (start.split(' ')[1])
      const date = strt + ' ' + mon
      return date
    },


  },
}
</script>