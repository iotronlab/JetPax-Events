<template>
  <v-container fluid>
    <section v-if="$fetchState.pending">
      <Loading message="fetching bookings.." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-col cols="12" md="10" class="mx-auto pa-0">
        <v-row no-gutters justify="space-between" class="mb-2">
          <h1 class="text-h6">Bookings ({{ bookings.length }})</h1>
          <v-btn color="primary" outlined text>Filter</v-btn>
        </v-row>

        <v-divider />
        <v-row no-gutters justify="center" class="mt-4">
          <v-col
            v-for="booking in bookings"
            :key="booking.uuid"
            cols="12"
            md="5"
            class="pa-1"
          >
            <v-sheet class="card-glass pa-2 rounded">
              Booking ID - {{ booking.uuid }}
              <br />
              Event - {{ booking.event.name }}
              <br />
              Event Date - {{ booking.event.startOn }}
              <br />
              Booking Date - {{ booking.updated }}
              <br />
              <h1 class="overline font-weight-bold">
                Booking status -
                <span v-if="booking.status == 'confirm'" class="success--text">{{
                  booking.status
                }}</span>
                <span v-else class="warning--text">{{ booking.status }}</span>
              </h1>
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
            </v-sheet>
          </v-col>
        </v-row>
        <v-pagination
          v-model="pageData.current_page"
          :length="pageData.last_page"
          :next-icon="nextArrow"
          :prev-icon="prevArrow"
          @input="updateQuery(pageData.current_page)"
        ></v-pagination>
      </v-col>
    </section>
  </v-container>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      bookings: null,
      errorMessage: null,
      pageData: null,
    };
  },
  async fetch() {
    await this.$axios
      .$get("booking/getall")
      .then((res) => {
        this.bookings = res.data;
        this.pageData = res.meta;
      })
      .catch((err) => {
        this.$sentry.captureException(new Error(err));
      });
  },
  head() {
    return {
      title: "Bookings",
    };
  },
};
</script>
