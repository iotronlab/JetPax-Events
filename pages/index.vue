<template>
  <v-container fluid class="pa-0">
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
          <h1 class="text-body-1 pa-2 pt-4">There are no events to display.</h1>
        </v-card>
      </section>
      <section v-else>
        <v-card flat class="mx-lg-16 px-lg-16 mx-md-16 px-md-16 transparent">
          <Search />

          <!-- <v-card flat class="transparent">
            <v-list-item>
              <v-card-title class="hidden-sm-and-down"
                >Events nearby {{ CityData }}</v-card-title
              >
              <v-spacer></v-spacer>
              <v-btn text to="/events">View all</v-btn>
            </v-list-item>

            <v-col cols="12" lg="12" class="mx-auto pa-0 ma-0 mt-4">
              <v-row no-gutters justify="center" class="ma-0">
                <v-col
                  v-for="(event, i) in events.slice(0, 3)"
                  :key="i"
                  cols="12"
                  lg="4"
                  md="5"
                  sm="5"
                  style="z-index: 10"
                  class="pa-0 ma-0"
                >
                  <EventCardNew :event="event" />
                </v-col>
              </v-row>
            </v-col>
          </v-card> -->
        </v-card>

        <!-- <v-card
          tile
          flat
          class="gray gray--text hidden-sm-and-down"
          height="350"
          style="margin-top: -250px"
        >
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
                <v-col
                  v-for="(genre, i) in genres"
                  :key="i"
                  cols="12"
                  lg="3"
                  md="5"
                  sm="5"
                  style="z-index: 10"
                  class="pa-0 ma-0"
                >
                  <v-card
                    flat
                    class="white mx-8 py-4 pb-0 mb-0"
                    style="border-radius: 10px"
                    height="150"
                  >
                    <v-card-title class="black--text my-4 align-end">
                      {{ genre.title }}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
        </v-card> -->
        {{ defaultCity }} {{ citySelect }}
        <v-skeleton-loader
          class="mx-auto"
          max-width="300"
          type="image"
        ></v-skeleton-loader>
      </section>
    </section>
  </v-container>
</template>

<script>
import { mdiMagnify, mdiMapMarkerRadius } from "@mdi/js";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      events: [],
      CityURL: {},
      CityData: [],
      citySelect: false,
      citySelection: "",
      goURL: "",
      errorMessage: null,
      icons: {
        location: mdiMapMarkerRadius,
        search: mdiMagnify,
      },
      genres: [
        {
          title: "Sports",
        },
        {
          title: "Music",
        },
        {
          title: "Dance",
        },
        {
          title: "Comedy",
        },
      ],
    };
  },

  async fetch() {
    await this.$axios
      .$get("events", { params: { page: 1 } })
      .then((res) => {
        this.events = res.data;
      })
      .catch((err) => {
        this.errorMessage = err;
        this.$sentry.captureException(new Error(err));
      });
  },

  head() {
    return {
      title: "Home",
    };
  },

  computed: {
    ...mapGetters({
      defaultCity: "defaultCity",
      cities: "cities",
    }),
  },

  // watch: {
  //   citySelection(oldVal, newVal) {
  //     this.setCity(this.citySelection);
  //     this.citySelect = false;
  //     // this.RedirectCity()
  //   },

  //   "$route.query": "$fetch",
  // },

  mounted() {
    if (this.defaultCity !== null) {
      this.redirectToCity(this.defaultCity);
    } else {
      this.askForLocation();
    }
  },

  methods: {
    ...mapActions(["setCity"]),

    redirectToCity(city) {
      /* this.CityURL = this.cities.filter(city => (city.name === cityGo) ? city.url : '')
      this.goURL = this.CityURL[0].url */

      this.$router.push(`/${city}`);
    },

    // syncCityFromCookie() {
    //   const city = document.cookie
    //     .split("; ")
    //     .filter((row) => row.startsWith("defaultCity="))
    //     .map((res) => res.split("=")[1])[0];
    //   console.log(city);
    //   if (city !== undefined) {
    //     const decodedCity = decodeURIComponent(city);
    //     this.setCity(decodedCity);
    //     this.redirectToCity(decodedCity);
    //   } else {
    //     // this.askForLocation();
    //     // const decodedCity = "kolkata";
    //     // this.setCity(decodedCity);
    //     // this.redirectToCity(decodedCity);
    //   }
    // },
    askForLocation() {
      this.citySelect = true;
    },
  },
};
</script>
