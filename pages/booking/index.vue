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
            <LazyBookingCard :booking="booking">
              <v-btn color="primary" text>
                <v-icon left>{{ icons.view }}</v-icon> view</v-btn
              >
            </LazyBookingCard>
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
  methods: {
    // startTimer() {
    //   setInterval(function () {
    //     // Get today's date and time
    //     let now = new Date().getTime();
    //     // Find the distance between now and the count down date
    //     let distance = countDownDate - now;
    //     // Time calculations for days, hours, minutes and seconds
    //     // var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    //     // Display the result in the element with id="demo"
    //     document.getElementById("demo").innerHTML =
    //       days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    //     // If the count down is finished, write some text
    //     if (distance < 0) {
    //       clearInterval(x);
    //       document.getElementById("demo").innerHTML = "EXPIRED";
    //     }
    //   }, 1000);
    // },
  },
};
</script>
