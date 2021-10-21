<template>
  <v-container fluid>
    <section v-if="$fetchState.pending">
      <Loading message="fetching events..." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <section v-if="events.length < 1">
        <v-card height="480" rounded="xl" class="text-center">
          <h1 class="text-body-1 pa-2 pt-4">
            There is no events to display.
          </h1></v-card
        >
      </section>
      <section v-else>
        <h1 class="text-h1 text-center">Events</h1>
        <v-divider class="my-2"></v-divider>
        <v-row
          v-for="(event, i) in events"
          :key="i"
          no-gutters
          justify="center"
        >
          <v-col cols="12" lg="5" class="pa-2">
            <nuxt-link
              :to="{
                name: 'events-slug',
                params: {
                  slug: event.id,
                },
              }"
            >
              <v-img
                :src="require('@/assets/images/index/landing.webp')"
                gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.7)"
                class="rounded-lg"
                dark
              >
              </v-img>
            </nuxt-link>
          </v-col>
          <v-col cols="12" lg="4" offset-x="50">
            <v-container fluid>
              <h1 class="primary--text mb-2">
                {{ event.startOn }}
                <span class="text-subtitle-2 secondary--text"
                  ><br />- {{ event.endOn }}</span
                >
              </h1>
              <v-row no-gutters class="mb-2" align="center">
                <v-chip v-if="event.isBookingOpen == true" color="success"
                  >Booking Open</v-chip
                >
                <v-chip v-else>Booking Closed</v-chip>
                <v-btn class="btn-agency ml-2" dark small rounded> View </v-btn>
              </v-row>
              <h2 class="mb-2" style="letter-spacing: 0.1rem; font-size: 2rem">
                {{ event.name }}
              </h2>

              <h3 class="text-body-1">
                <v-icon left>{{ location }}</v-icon
                >{{ event.location }}
              </h3>
            </v-container></v-col
          >
        </v-row>
        <div class="text-center">
          <v-pagination
            v-model="pageData.current_page"
            :length="pageData.last_page"
            :next-icon="nextArrow"
            :prev-icon="prevArrow"
            @input="updateQuery(pageData.current_page)"
          ></v-pagination>
        </div>
      </section>
    </section>
  </v-container>
</template>

<script>
import { mdiArrowRight, mdiArrowLeft, mdiMapMarkerStar } from '@mdi/js'
export default {
  data() {
    return {
      events: [],
      pageData: {},
      errorMessage: null,
      nextArrow: mdiArrowRight,
      prevArrow: mdiArrowLeft,
      location: mdiMapMarkerStar,
    }
  },
  async fetch() {
    try {
      await this.$axios
        .$get('events', { params: this.$route.query })
        .then((res) => {
          this.events = res.data
          this.pageData = res.meta
        })
        .catch((err) => {
          this.errorMessage = err
          // this.$sentry.captureException(new Error(err))
        })
    } catch (error) {
      // this.$sentry.captureException(new Error(error))
    }
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    updateQuery(data) {
      this.$router.push({ query: { page: data } })
    },
  },
}
</script>
