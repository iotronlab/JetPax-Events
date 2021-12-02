<template>
  <v-container>
    <section v-if="$fetchState.pending">
      <Loading message="fetching bookings.." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <h1>Bookings ({{ bookings.length }})</h1>
      <hr />
      <v-row no-gutters justify="center" class="mt-4">
        <v-col
          v-for="booking in bookings"
          :key="booking.uuid"
          cols="12"
          md="5"
          class="card-glass pa-2 rounded"
        >
          Booking ID - {{ booking.uuid }}
          <br />
          Event - {{ booking.event.name }}
          <br />
          Event Date - {{ booking.event.startOn }}
          <br />
          Booking Date - {{ booking.updated }}
          <br />
          Status - {{ booking.status }}
          <br />
          <v-btn
            class="mt-4"
            color="primary"
            :to="{
              name: 'booking-slug',
              params: {
                slug: booking.uuid,
              },
            }"
            >view booking</v-btn
          >
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script>
export default {
  middleware: ['auth'],
  data() {
    return {
      bookings: null,
      errorMessage: null,
    }
  },
  async fetch() {
    await this.$axios
      .$get('bookings/getall')
      .then((res) => {
        this.bookings = res.data
      })
      .catch((err) => {
        this.$sentry.captureException(new Error(err))
      })
  },
}
</script>

