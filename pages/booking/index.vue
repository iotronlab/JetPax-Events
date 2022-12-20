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
            sm="6"
            lg="4"
            class="pa-1"
          >
            <v-card
              :to="{
                name: 'booking-slug',
                params: {
                  slug: booking.uuid,
                },
              }"
              outlined
              class="pa-2 rounded"
            >
              <h1 class="caption">
                Booking ID <br /><b class="text-h6">{{ booking.uuid }}</b>
                <br />
                Event <br /><b class="text-h6">{{ booking.event.name }}</b>
                <br />
                Event Date <br /><b class="text-h6">{{ booking.event.startOn }}</b>
                <br />
                Status<br />
                <b v-if="booking.status == 'confirm'" class="text-h6 success--text">{{
                  booking.status
                }}</b>
                <b v-else class="text-h6 warning--text">{{ booking.status }}</b>
              </h1>
              <p class="caption">booked on {{ booking.updated }}</p>
              <v-card-actions>
                <v-btn
                  class="mt-auto"
                  color="primary"
                  text
                  :to="{
                    name: 'booking-slug',
                    params: {
                      slug: booking.uuid,
                    },
                  }"
                >
                  <v-icon left>{{ icons.view }}</v-icon> view</v-btn
                >
                <v-btn
                  class="mt-auto"
                  color="primary"
                  outlined
                  :to="{
                    name: 'booking-slug',
                    params: {
                      slug: booking.uuid,
                    },
                  }"
                  @click.prevent
                >
                  Go to Event</v-btn
                >
              </v-card-actions>
            </v-card>
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
import { mdiEye } from "@mdi/js";
export default {
  middleware: ["auth"],
  data() {
    return {
      bookings: null,
      errorMessage: null,
      pageData: null,
      icons: {
        view: mdiEye,
      },
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
