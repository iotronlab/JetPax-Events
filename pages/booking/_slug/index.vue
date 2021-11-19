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
        <h1 class="overline">
          Booking status -
          <span v-if="booking.status" class="warning--text">{{
            booking.status
          }}</span>
        </h1>
        <div v-if="!booking.payment_success">
          <p class="caption mb-1">
            Kindly complete the payment within 24hrs to avoid cancellation
          </p>
          <v-btn color="primary" class="mb-2" @click="initiatePayment"
            >retry payment</v-btn
          >
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
        <h3>Total - {{ booking.amount }}</h3>

        <v-divider class="my-2"></v-divider>
      </v-col></section
  ></v-container>
</template>

<script>
import { mdiMapMarkerStar, mdiCalendarHeart } from '@mdi/js'
export default {
  middleware: 'auth',
  data() {
    return {
      booking: null,
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
          to: '/bookings',
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: true,
        },
      ],
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
          //  this.$sentry.captureException(new Error(err))
        })
    } catch (error) {
      // this.$sentry.captureException(new Error(error))
    }
  },
  //  computed: {
  //   currentTitle() {
  //     switch (data) {
  //       case 1:
  //         return 'sign-up'
  //       case 2:
  //         return 'Create a password'
  //       default:
  //         return 'Account created'
  //     }
  //   },
  // },
  methods: {
    initiatePayment() {
      const self = this
      const rzpOptions = {
        key: 'rzp_test_0wpfilwI7DwcZd',
        amount: this.booking.amount,
        name: this.booking.event.name,
        description: this.booking.event.desc,
        order_id: this.booking.payment.generated_id,
        handler(response) {
          // self.$toast.success(`Payment Succesful`, {
          //   position: 'bottom-center',
          //   theme: 'outline',
          //   duration: 5000,
          // })
          // self.payment_id = response.razorpay_payment_id
          self.$axios
            .$post(`booking/confirm/${this.booking.uuid}`, response)
            .then((result) => {})
            .catch((err) => {
              this.$sentry.captureException(new Error(err))
            })
          console.log(response)
        },
        modal: {
          ondismiss() {
            // self.$toast.error(`Payment Failed`, {
            //   position: 'bottom-center',
            //   theme: 'outline',
            //   duration: 5000,
            // })
          },
        },
        prefill: {
          email: 'test@email.com',
          contact: +914455667788,
        },
        notes: {
          name: 'Customer Name',
          item: 'Item',
        },
        theme: {
          color: '#667eea',
        },
      }
      /* global Razorpay */
      /* eslint no-undef: "error" */
      const rzp1 = new Razorpay(rzpOptions)
      rzp1.on('payment.failed', function (response) {
        alert(response.error.code)
        alert(response.error.description)
        alert(response.error.source)
        alert(response.error.step)
        alert(response.error.reason)
        alert(response.error.metadata.order_id)
        alert(response.error.metadata.payment_id)
      })
      rzp1.open()
    },
  },
}
</script>
