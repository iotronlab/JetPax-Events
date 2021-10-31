<template>
  <v-container fluid class="pa-0">
    <section v-if="$fetchState.pending">
      <Loading :message="'booking event ' + $route.params.slug" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-img class="mt-n16" :src="require('@/assets/images/events/bg.webp')">
        <v-col cols="12" md="8" class="mx-auto mt-16">
          <v-container fluid class="card-glass rounded-xl text-center">
            <Breadcrumb :breadcrumb-items="breadcrumbItems" />

            <v-divider class="my-2"></v-divider>
            <h1 style="font-size: 1.5rem">
              {{ event.name }}
            </h1>

            <v-row no-gutters class="mb-4" justify="center">
              <v-col cols="auto">
                <v-icon left size="2rem">{{ icon.calender }}</v-icon></v-col
              ><v-col cols="auto">
                <h1
                  class="primary--text pl-2 pt-2"
                  style="border-left: 0.5rem dotted #de3163; font-size: 1rem"
                >
                  {{ event.startOn }}
                  <span class="secondary--text"><br />- {{ event.endOn }}</span>
                </h1>
              </v-col></v-row
            >
            <v-divider class="my-2"></v-divider>
            <h3 class="my-4 text-body-1">
              <v-icon left>{{ icon.location }}</v-icon> Venue -
              {{ event.location }}
            </h3>
          </v-container>

          <h1 class="text-h3 text-center mt-2">Booking Form</h1>
          <EventsBookingForm />
          <v-btn color="primary">Add more guests</v-btn></v-col
        ></v-img
      >
    </section>
  </v-container>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarHeart } from '@mdi/js'
export default {
  data() {
    return {
      event: {},
      errorMessage: null,
      icon: {
        location: mdiMapMarkerStar,
        calender: mdiCalendarHeart,
      },
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Events',
          disabled: false,
          to: '/events',
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: false,
          to: `/events/${this.$route.params.slug}`,
          exact: true,
        },
      ],
    }
  },
  async fetch() {
    try {
      await this.$axios
        .$get(`events/${this.$route.params.slug}`)
        .then((res) => {
          this.event = res.data
        })
        .catch((err) => {
          this.errorMessage = err
          //  this.$sentry.captureException(new Error(err))
        })
    } catch (error) {
      // this.$sentry.captureException(new Error(error))
    }
  },
  head() {
    return {
      title: 'Book ' + this.event.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.event.desc,
        },
      ],
    }
  },
}
</script>
