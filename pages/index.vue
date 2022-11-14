<template>
  <v-container fluid class="pa-0">

    <v-overlay :value="noCity" opacity="0.8" z-index="55" class="pa-0">

      <v-card flat style="background-color: #1565C0;" width="80vw">
        <v-card-title>
          Find safe and exicting events around you
        </v-card-title>

        <v-row>
          <v-col cols="12">
            <v-autocomplete outlined :items="cities" item-text="name" label="Search all cities" class="ma-4"
              item-value="name" v-model="citySelection"></v-autocomplete>
          </v-col>
        </v-row>

        <v-list-item class="pt-0 mt-0 pb-1">
          <v-btn rounded text @click="noCity = false">
            <span>Skip & continue</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded text>
            <v-icon class="mb-1 mr-4">{{ icons.location }}</v-icon>
            <span class="hidden-md-and-down">Current location</span>
          </v-btn>
        </v-list-item>

      </v-card>

    </v-overlay>

    <section v-if="$fetchState.pending">
      <h1 class="text-lg-h1 text-h2 text-center">Events</h1>
      <Loading message="Loading" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <section v-if="events.length < 1">
        <v-card height="480" rounded="xl" class="text-center ma-2">
          <h1 class="text-body-1 pa-2 pt-4">
            There are no events to display.
          </h1>
        </v-card>
      </section>
      <section v-else>

        <v-card flat class="mx-lg-16 px-lg-16 mx-md-16 px-md-16 transparent">

          <Search />

          {{ this.goURL }}

          <v-card flat class="transparent">
            <v-list-item>
              <v-card-title class="hidden-sm-and-down">Events nearby</v-card-title>
              <v-spacer></v-spacer>
              <v-btn text to="/events">View all</v-btn>
            </v-list-item>

            <v-col cols="12" lg="12" class="mx-auto pa-0 ma-0 mt-4">
              <v-row no-gutters justify="center" class="ma-0">
                <v-col v-for="(event, i) in events.slice(0, 3)" :key="i" cols="12" lg="4" md="5" sm="5"
                  style="z-index: 10" class="pa-0 ma-0">
                    <EventCardNew :event="event" />
                </v-col>
              </v-row>
            </v-col>

          </v-card>
        </v-card>

        <v-card tile flat class="gray gray--text hidden-sm-and-down" height="350" style="margin-top: -250px;">
          .
        </v-card>

        <v-card tile flat class="transparent py-4">
          <v-list-item>
            <v-card-title>Events by genre</v-card-title>
            <v-spacer></v-spacer>
            <v-card-title class="hidden-sm-and-down">View all</v-card-title>
          </v-list-item>

          <v-card class="px-8 transparent pb-16" flat>
            <v-col cols="12" lg="12" class="mx-auto pa-0 ma-0 mt-4">
              <v-row no-gutters justify="center" class="ma-0">
                <v-col v-for="(genre, i) in genres" :key="i" cols="12" lg="3" md="5" sm="5" style="z-index: 10"
                  class="pa-0 ma-0">
                  <v-card flat class="white mx-8 py-4 pb-0 mb-0" style="border-radius: 10px;" height="150">
                    <v-card-title class="black--text my-4 align-end">
                      {{ genre.title }}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-card>

        </v-card>
      </section>
    </section>

  </v-container>
</template>

<script>
import { mdiMagnify, mdiMapMarkerRadius } from '@mdi/js'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      events: [],
      CityURL: {},
      noCity: false,
      citySelection: "",
      goURL: '',
      errorMessage: null,
      icons: {
        location: mdiMapMarkerRadius,
        search: mdiMagnify,
      },
      genres: [
        {
          title: "Sports"
        },
        {
          title: "Music"
        },
        {
          title: "Dance"
        },
        {
          title: "Comedy"
        },
      ],
    }
  },

  async fetch() {
    await this.$axios
      .$get('events', { params: { page: 1 } })
      .then((res) => {
        this.events = res.data
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },

  head() {
    return {
      title: 'Home',
    }
  },

  methods: {
    ...mapActions(['getCities']),
    ...mapActions(['setCity']),

    RedirectCity() {
        this.CityURL = this.cities.filter(city => (city.name === this.defaultCity) ? city.url : '')
        this.goURL = this.CityURL[0].url
        this.$router.push(`/${this.goURL}`)
    },

    getCookie() {
      const city = "defaultCity"
      if (this.defaultCity === null) {
        const cookieArr = document.cookie.split(";")
        for (let i = 0; i < cookieArr.length; i++) {
          const cookiePair = cookieArr[i].split("=")
          if (city === cookiePair[0].trim()) {
            const cityData = decodeURIComponent(cookiePair[1])
            this.setCity(cityData)
            this.noCity = false
            return null
          }
        }
        this.noCity = true
        return null
      }
    },

  },

  computed: {
    ...mapGetters({
      defaultCity: 'defaultCity',
      cities: 'cities'
    }),
  },

  watch: {
    citySelection(oldVal, newVal) {
      this.setCity(this.citySelection)
      this.noCity = false
      this.RedirectCity()
    },

    '$route.query': '$fetch',
  },

  created() {
    this.getCities()
  },

  mounted() {
    if (this.defaultCity !== null) {
      this.RedirectCity()
    }

    this.getCookie()
  }

}
</script>

