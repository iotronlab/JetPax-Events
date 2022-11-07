<template>
  <v-card rounded="lg" class="card-glass mx-4 my-4" elevation="6">
    <nuxt-link :to="{
      name: 'slug-event',
      params: {
        slug: event.url,
      },
    }" :aria-label="event.name">

      <v-img height="10rem" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        gradient="to top, rgba(0, 0, 0, 0.8) 0%, transparent 70%" dark>
        <v-row no-gutters class="fill-height" align="end">
          <v-col cols="6">
            <h4 class="text-subtitle-2 ml-4">{{ event.name }}</h4>
          </v-col>
        </v-row>
      </v-img>

    </nuxt-link>

    <v-row no-gutters>
      <v-col cols="6">
        <h6 class="text-caption ml-4 mt-1" style="
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box !important;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                ">

          <div class="grey--text">
            <v-icon small class="mr-1">{{ icons.calendar }}</v-icon> {{ FullDate(event.startOn, event.endOn) }}
          </div>

          <div class="mt-1 mb-2">
            <v-icon small class="mr-1">{{ icons.marker }}</v-icon> {{ event.location }}
          </div>

        </h6>
      </v-col>
      <v-col cols="6">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png" max-width="150" :aspect-ratio="1 / 1"
          class="mt-n16 ml-auto mr-4 rounded-lg" />
      </v-col>
    </v-row>
    <v-row no-gutters class="pa-2">
      <v-row no-gutters align="center" class="ml-1">
        <h4 class="text-body-2 mr-2">Genres</h4>
        <v-chip v-for="(genre, n) in event.genres" :key="n" class="ma-1" outlined small>{{ genre }}</v-chip>
      </v-row>
      <v-row no-gutters align="center" class="ml-1">
        <h4 class="text-body-2 mr-2">Languages</h4>
        <v-chip v-for="(language, k) in event.languages" :key="k" class="ma-1" outlined small>{{ language }}</v-chip>
      </v-row>
    </v-row>
  </v-card>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarMonth, mdiHeart } from '@mdi/js'
import { mapGetters } from 'vuex'

export default {
  name: 'EventCardNew',
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

  computed: {
    ...mapGetters({
      defaultCity: 'defaultCity'
    }),
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
