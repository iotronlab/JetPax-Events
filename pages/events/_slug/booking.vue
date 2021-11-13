<template>
  <v-container fluid class="pa-0 glow-purple mb-8">
    <section v-if="$fetchState.pending">
      <Loading :message="'booking event ' + $route.params.slug" />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-col cols="12" lg="8" md="10" class="mx-auto">
        <v-container fluid class="card-glass rounded-xl text-center">
          <Breadcrumb :breadcrumb-items="breadcrumbItems" />

          <v-divider class="my-2"></v-divider>
          <h1 style="font-size: 1.5rem">
            {{ event.name }}
          </h1>

          <v-row no-gutters class="mb-4" justify="center">
            <v-col cols="auto">
              <v-icon left size="3rem">{{ icon.calender }}</v-icon></v-col
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
        <v-divider class="my-2"></v-divider>
        <h1 class="text-h3 text-center mt-2">Booking Form</h1>
        <v-divider class="my-2"></v-divider>
        <v-card class="card-glass rounded-xl pa-1">
          <EventsBookingForm ref="form" :event="event" @setTotal="setTotal" />
          <!-- <EventsGuestForm :event="event" /> -->
        </v-card>
      </v-col>
      <v-app-bar bottom fixed
        >Total: {{ bookingTotal }}
        <v-btn
          width="50%"
          class="ml-auto"
          color="primary"
          @click="confirmBooking"
          >Confirm Booking</v-btn
        ></v-app-bar
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
      bookingTotal: 0,
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
          this.$sentry.captureException(new Error(err))
        })
    } catch (error) {
      this.$sentry.captureException(new Error(error))
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
  methods: {
    setTotal(total) {
      this.bookingTotal = total
    },
    confirmBooking() {
      this.$refs.form.confirmBooking()
      this.createPayment()
    },
    createPayment() {
      const self = this
      const rzpOptions = {
        key: 'rzp_test_0wpfilwI7DwcZd',
        amount: this.bookingTotal * 100,
        name: this.event.name,
        description: this.event.desc,
        handler(response) {
          self.$toast.success(`Payment Succesful`, {
            position: 'bottom-center',
            theme: 'outline',
            duration: 5000,
          })
          self.payment_id = response.razorpay_payment_id
        },
        modal: {
          ondismiss() {
            self.$toast.error(`Payment Failed`, {
              position: 'bottom-center',
              theme: 'outline',
              duration: 5000,
            })
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
      rzp1.open()
    },
  },
}
</script>
