<template>
  <v-container fluid class="pa-0">
    <section v-if="$fetchState.pending">
      <Loading :message="'booking uuid ' + $route.params.slug" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <!-- {{ booking }} -->
      <v-col cols="12" md="8" class="mx-auto">
        <!-- <Breadcrumb :breadcrumb-items="breadcrumbItems" /> -->
        <Breadcrumb :breadcrumb-items="breadcrumbItems" />
        <v-divider></v-divider>
        <h1 class="overline font-weight-bold">
          Booking status -
          <span v-if="booking.status == 'confirm'" class="success--text">{{
            booking.status
          }}</span>
          <span v-else class="warning--text">{{ booking.status }}</span>
        </h1>
        <div v-if="!booking.payment_success">
          <p class="caption mb-1">
            Kindly complete the payment within 24hrs to avoid cancellation
          </p>
          <v-btn color="primary" class="mb-4" @click="initiatePayment"
            >retry payment</v-btn
          >
        </div>
        <div v-else>
          <v-btn class="primary mb-4" @click="downloadInvoice">Download</v-btn>
        </div>
        <EventsMiniCard :event="booking.event" />
        <h1 class="overline mt-2 secondary--text">Booking Details</h1>

        <h2>
          Booking ID - <span class="primary--text">{{ booking.uuid }}</span>
        </h2>
        <h3 class="text-body-1">
          Name - {{ booking.booking_name }}<br />
          Email - {{ booking.booking_email }}<br />
          Contact - {{ booking.booking_contact }}
        </h3>
        <v-divider class="my-2"></v-divider>
        <h4 class="overline secondary--text">Tickets Info</h4>

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

      <v-overlay
        :value="loading"
        class="text-center"
        opacity="0.8"
        z-index="500"
      >
        <p>Saving payment, do not refresh or close!</p>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </section>
  </v-container>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarHeart } from '@mdi/js'
export default {
  middleware: 'auth',
  data() {
    return {
      booking: {},
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
          text: 'Bookings',
          disabled: false,
          to: '/booking',
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: true,
        },
      ],
      loading: false,
    }
  },
  async fetch() {
    try {
      await this.$axios
        .$get(`booking/${this.$route.params.slug}`)
        .then((res) => {
          this.booking = res.data
          if (this.booking.payment_success === 0) {
            this.initiatePayment()
          }
        })
        .catch((err) => {
          this.errorMessage = err
          this.$sentry.captureException(new Error(err))
        })
    } catch (error) {
      this.$sentry.captureException(new Error(error))
    }
  },

  methods: {
    initiatePayment() {
      const self = this
      const rzpOptions = {
        key: process.env.payKey,
        amount: this.booking.amount,
        name: this.booking.event.name,
        description: this.booking.event.desc,
        order_id: this.booking.payment.generated_id,
        handler(response) {
          self.loading = true
          self.$axios
            .$post(`booking/confirm/${self.booking.uuid}`, response)
            .then((res) => {
              self.booking = res.data
              self.$store.dispatch('setSnackbar', {
                color: 'success',
                text: res.message,
              })
              self.loading = false
            })
            .catch((err) => {
              self.$store.dispatch('setSnackbar', {
                color: 'error',
                text: 'Payment fail. Please try again!',
              })
              self.$sentry.captureException(new Error(err))
              self.loading = false
            })
        },
        modal: {
          ondismiss() {
            self.$store.dispatch('setSnackbar', {
              color: 'error',
              text: 'Please complete payment to confirm!',
            })
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
          color: '#667eea',
        },
      }
      /* global Razorpay */
      /* eslint no-undef: "error" */
      const rzp1 = new Razorpay(rzpOptions)
      rzp1.on('payment.failed', function (response) {
        // alert(response.error.code)
        // alert(response.error.description)
        // alert(response.error.source)
        // alert(response.error.step)
        // alert(response.error.reason)
        // alert(response.error.metadata.order_id)
        // alert(response.error.metadata.payment_id)
        self.$sentry.captureException(new Error(response.error))
        self.$store.dispatch('setSnackbar', {
          color: 'error',
          text: 'Payment failed, please try again!',
        })
      })
      rzp1.open()
    },

    async downloadInvoice() {
      await this.$axios({
        url: `booking/invoice/${this.booking.uuid}`,
        method: 'GET',
        responseType: 'blob', // important
      })

        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', this.booking.event.name + '.pdf')
          document.body.appendChild(link)
          link.click()
        })

        .catch((err) => {
          this.$store.dispatch('setSnackbar', {
            color: 'error',
            text: 'Download failed, contact support!',
          })
          this.$sentry.captureException(new Error(err))
        })
    },
  },
}
</script>
