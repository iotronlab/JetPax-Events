<template>
  <v-container fluid class="pa-0 glow-purple mb-8">
    <section v-if="$fetchState.pending">
      <Loading :message="'booking event ' + $route.params.slug" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <Breadcrumb :breadcrumb-items="breadcrumbItems" />
      <v-col cols="12" lg="8" md="10" class="mx-auto">
        <EventsMiniCard :event="event" />
        <v-divider class="my-2"></v-divider>
        <!-- <h1 class="text-h3 text-center mt-2">Booking Form</h1> -->
        <v-divider class="my-2"></v-divider>
        <v-card class="card-glass rounded-xl pa-1">
          <EventsBookingForm
            ref="form"
            :event="event"
            @setTotal="setTotal"
            @setLoading="setLoading"
          />
          <!-- <EventsGuestForm :event="event" /> -->
        </v-card>
      </v-col>
      <v-app-bar bottom fixed
        >Total: INR {{ bookingTotal }}
        <v-btn
          width="50%"
          class="ml-auto"
          color="primary"
          :loading="loading"
          @click="confirmBooking"
          >Confirm Booking</v-btn
        ></v-app-bar
      >
    </section>
  </v-container>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarHeart } from "@mdi/js";
export default {
  middleware: "auth",
  data() {
    return {
      event: {},
      errorMessage: null,
      bookingTotal: 0,
      loading: false,
      icon: {
        location: mdiMapMarkerStar,
        calender: mdiCalendarHeart,
      },

      breadcrumbItems: [
        {
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          text: "Events",
          disabled: false,
          to: "/events",
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: false,
          to: `/events/${this.$route.params.slug}`,
          exact: true,
        },
      ],
    };
  },
  async fetch() {
    try {
      await this.$axios
        .$get(`events/${this.$route.params.slug}`)
        .then((res) => {
          this.event = res.data;
        })
        .catch((err) => {
          this.errorMessage = err;
          this.$sentry.captureException(new Error(err));
        });
    } catch (error) {
      this.$sentry.captureException(new Error(error));
    }
  },
  head() {
    return {
      title: "Book " + this.event.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.event.desc,
        },
      ],
    };
  },
  methods: {
    setTotal(total) {
      this.bookingTotal = total;
    },
    confirmBooking() {
      this.$refs.form.confirmBooking();
    },
    setLoading(data) {
      this.loading = data;
    },
  },
};
</script>
