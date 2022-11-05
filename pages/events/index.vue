<template>
  <v-container fluid class="pa-0 glow-purple">
    <!-- <FilterNav /> -->
    <section v-if="$fetchState.pending">
      <h1 class="text-lg-h1 text-h2 text-center">Events</h1>
      <Loading message="fetching events..." />
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
        <!-- page body start -->
        <v-row no-gutters justify="center" align="center" class="text-center">
          <Breadcrumb :breadcrumb-items="breadcrumbItems" />
          <v-col cols="12" lg="3" md="3">
            <h1 class="text-lg-h1 text-h2">Events</h1>
            <v-divider class="my-2"></v-divider>
          </v-col>
          <h2 class="text-body-1 mb-2">
            <div class="alignment-box">
              <v-pagination v-model="pageData.current_page" :length="pageData.last_page" :next-icon="nextArrow"
                :prev-icon="prevArrow" @input="updateQuery(pageData.current_page)"></v-pagination>
              <FilterNav />
            </div>
            showing ({{ pageData.from }} - {{ pageData.to }})
            <span v-if="pageData.total > 1">events</span>
            <span v-else>event</span>
          </h2>
        </v-row>

        <!-- events for loop -->
        <section>
          <v-col cols="12" lg="10" class="mx-auto pa-0 ma-0">
            <v-row no-gutters justify="center" class="ma-0">
              <v-col v-for="(event, i) in events" :key="i" cols="12" lg="4" md="5" sm="5" style="z-index: 10"
                class="pa-0 ma-0 my-4">
                <EventCardNew :event="event" />
              </v-col>
            </v-row>
          </v-col>
        </section>

        <h2 class="text-body-1 text-center mb-6">
          <v-pagination v-model="pageData.current_page" :length="pageData.last_page" :next-icon="nextArrow"
            :prev-icon="prevArrow" total-visible="10" @input="updateQuery(pageData.current_page)"></v-pagination>
          <FilterNav />
          showing ({{ pageData.from }} - {{ pageData.to }})
          <span v-if="pageData.total > 1">events</span>
          <span v-else>event</span>

        </h2>
      </section>
    </section>
  </v-container>
</template>

<script>
import { mdiArrowRight, mdiArrowLeft } from '@mdi/js'
export default {
  data() {
    return {
      events: [],
      pageData: {},
      errorMessage: null,
      nextArrow: mdiArrowRight,
      prevArrow: mdiArrowLeft,
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Events',
          disabled: true,
        },
      ],
    }
  },
  async fetch() {
    await this.$axios
      .$get('events', { params: this.$route.query })
      .then((res) => {
        this.events = res.data
        this.pageData = res.meta
      })
      .catch((err) => {
        this.errorMessage = err
        this.$sentry.captureException(new Error(err))
      })
  },
  head() {
    return {
      title: 'Events',
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

<style scoped>
.alignment-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
