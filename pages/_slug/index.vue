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
        <Search />

        <div class="box">
          <EventSlider />
        </div>

        <div class="section">

        <v-card tile flat class="transparent py-4 mx-lg-16 px-lg-8">
          <v-list-item class="mx-8">
            <v-card-title>Events by genre {{ heightx }}</v-card-title>
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
        </v-card>

        </div>
      </section>
    </section>
  </v-container>
</template>

<script>
import { mdiMagnify } from "@mdi/js";

export default {
  data() {
    return {
      heightx: "",
      events: [],
      errorMessage: null,
      city: this.$route.params.slug,
      icons: {
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
      .$get(`events/${this.city}/get`, { params: { page: 1 } })
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

  watch: {
    "$route.query": "$fetch",
  },

  mounted() {
    this.getHeightx()
  },

  methods: {
    getHeightx() {
      // this.heightx = this.$refs.SlideComponent.clientHeight
      // alert(this.$refs.SlideComponent.clientHeight)
      // document.getElementById("ShiftedDiv").style.top = (266 + document.getElementById("SlideComponent").offsetHeight) + "px";
    }
 },
};
</script>

<style scoped>
#SlideComponent {
  /* position: relative !important;
  border: 2px solid white;
  height: 800px; */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.section {
  margin-top: 20px;
  width: 100%;
  height: 100vh;
}

.box {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>