<template>
  <v-container fluid class="pa-0">
    <section v-if="$fetchState.pending">
      <Loading :message="'booking id ' + $route.params.slug" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <!-- {{ booking }} -->
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <!-- <Breadcrumb :breadcrumb-items="breadcrumbItems" /> -->
        <Breadcrumb :breadcrumb-items="breadcrumbItems" />

        <!-- <EventsMiniCard :event="booking.event" /> -->

        <v-row no-gutters justify="center"
          ><v-col cols="12" md="5">
            <BookingCard :booking="booking">
              <v-btn
                v-if="!booking.payment_success"
                color="accent"
                @click="initiatePayment"
                >retry payment</v-btn
              >

              <v-btn v-else class="accent" @click="downloadInvoice">Download</v-btn>
            </BookingCard>
          </v-col>
          <v-col v-if="booking.qr" cols="6" sm="4" md="2" class="pa-2"
            ><v-sheet max-width="50vw" color="white" class="pa-2 mx-auto">
              <v-img :src="booking.qr"></v-img> </v-sheet
          ></v-col>
          <v-col cols="12" md="5" class="pa-2">
            <h1 class="overline font-weight-black secondary--text">Booking Details</h1>

            <h2 class="caption">
              Booking Name <br /><b class="text-h6">{{ booking.booking_name }}</b>
              <br />
              Booking Email <br /><b class="text-h6">{{ booking.booking_email }}</b>
              <br />
              Contact <br /><b class="text-h6">{{ booking.booking_contact }}</b>
            </h2>
            <v-divider class="my-2"></v-divider>
            <h3 class="overline font-weight-black secondary--text">Tickets Info</h3>

            <h4
              v-for="(ticket, i) in booking.tickets"
              :key="i"
              cols="12"
              md="6"
              class="text-body-1"
            >
              {{ ticket.name }} x {{ ticket.quantity }}
            </h4>
            <v-divider class="my-2"></v-divider>
            <h3>Total - INR {{ booking.amount / 100 }}</h3>

            <v-divider class="my-2"></v-divider>
          </v-col>
        </v-row>
      </v-col>

      <v-overlay :value="acceptPayment" class="text-center" opacity="0.8" z-index="500">
        <p>Saving payment, do not refresh or close!</p>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </section>
  </v-container>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarHeart } from "@mdi/js";
export default {
  middleware: "auth",

  data() {
    return {
      booking: {},
      errorMessage: null,
      timeLimit: null,
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
          text: "Bookings",
          disabled: false,
          to: "/booking",
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: true,
        },
      ],
      acceptPayment: false,
    };
  },
  async fetch() {
    await this.$axios
      .$get(`booking/${this.$route.params.slug}`)
      .then((res) => {
        this.booking = res.data;
        if (this.booking.status === "pending") {
          const countDownDate = new Date(this.booking.expires).getTime();
          const now = new Date().getTime();
          // timeLimit in total of seconds
          this.timeLimit = Math.floor((countDownDate - now) / 1000);
          if (this.timeLimit > 0) {
            this.initiatePayment();
          }
        }
      })
      .catch((err) => {
        this.errorMessage = err;
        this.$sentry.captureException(new Error(err));
      });
  },
  head() {
    return {
      title: "Booking",
      script: [
        {
          hid: "rzpay",
          src: "https://checkout.razorpay.com/v1/checkout.js",
          defer: true,
        },
      ],
    };
  },
  expired() {
    if (this.booking.status === "pending" && this.timeLimit <= 0) {
      return true;
    }
    return false;
  },
  // always fetch and not load from cache
  mounted() {
    this.$fetch();
  },

  methods: {
    initiatePayment() {
      const self = this;
      this.acceptPayment = true;
      const rzpOptions = {
        key: process.env.payKey,
        amount: this.booking.amount,
        name: this.booking.event.name,
        description: this.booking.event.desc,
        order_id: this.booking.payment.generated_id,
        // handler(response) {
        //   self.acceptPayment = true
        //   self.$axios
        //     .$post(`booking/confirm/${self.booking.uuid}`, response)
        //     .then((res) => {
        //       self.booking = res.data
        //       self.$store.dispatch('setSnackbar', {
        //         color: 'success',
        //         text: res.message,
        //       })
        //       self.acceptPayment = false
        //     })
        //     .catch((err) => {
        //       self.$store.dispatch('setSnackbar', {
        //         color: 'error',
        //         text: 'Payment fail. Please try again!',
        //       })
        //       self.$sentry.captureException(new Error(err))
        //       self.acceptPayment = false
        //     })
        // },
        callback_url: process.env.apiUrl + "/api/v1/booking/confirm/" + this.booking.uuid,
        modal: {
          ondismiss() {
            self.acceptPayment = false;
            self.$store.dispatch("setSnackbar", {
              color: "error",
              text: "Please complete payment to confirm!",
            });
          },
        },
        prefill: {
          email: this.booking.booking_email,
          contact: this.booking.booking_contact,
        },
        notes: {
          name: this.booking.booking_name,
          item: this.booking.uuid,
        },
        theme: {
          color: "#667eea",
        },
      };
      /* global Razorpay */
      /* eslint no-undef: "error" */
      const rzp1 = new Razorpay(rzpOptions);
      rzp1.on("payment.failed", function () {
        self.acceptPayment = false;
        self.$store.dispatch("setSnackbar", {
          color: "error",
          text: "Payment failed, contact support!",
        });
      });
      rzp1.open();
    },

    async downloadInvoice() {
      await this.$axios({
        url: `booking/invoice/${this.booking.uuid}`,
        method: "GET",
        responseType: "blob", // important
      })

        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", this.booking.event.name + ".pdf");
          document.body.appendChild(link);
          link.click();
        })

        .catch((err) => {
          this.$store.dispatch("setSnackbar", {
            color: "error",
            text: "Download failed, contact support!",
          });
          this.$sentry.captureException(new Error(err));
        });
    },
  },
};
</script>
