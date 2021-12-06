<template>
  <v-container fluid class="pa-0">
    <h2 id="tickets" class="mt-4 text-center">Select Pass</h2>
    <v-item-group v-model="selectedTicket" mandatory>
      <v-row no-gutters>
        <v-col
          v-for="(ticket, n) in event.tickets"
          :key="n"
          cols="12"
          lg="4"
          md="6"
          sm="6"
          class="pa-2"
        >
          <v-item v-slot="{ active, toggle }" :value="ticket">
            <v-card
              :color="active ? 'primary' : ''"
              class="card-glass fill-height text-center pa-2"
              dark
              rounded
              :elevation="active ? 8 : 3"
              @click="toggle"
            >
              <v-row v-if="ticket.inStock" no-gutters class="mt-4">
                <v-select
                  label="quantity"
                  outlined
                  dense
                  rounded
                  :hint="'max: ' + ticket.max_per_booking"
                  persistent-hint
                  color="secondary"
                  clearable
                  :clear-icon="icons.delete"
                  :append-icon="null"
                  :items="
                    Array.from(Array(ticket.max_per_booking + 1).keys()).slice(
                      1
                    )
                  "
                  type="number"
                  @click:clear="removeTickets(ticket.id)"
                  @input="updateTickets"
                ></v-select>
                <!-- <v-btn icon class="ml-1" @click="removeTickets(ticket.id)"
                  ><v-icon>{{ icons.delete }}</v-icon></v-btn
                > -->
              </v-row>

              <p v-if="ticket.quantity < 100">{{ ticket.quantity }} left!</p>
              <h2>{{ ticket.price }}</h2>
              <h3 class="text-button">{{ ticket.name }}</h3>
              <p v-html="ticket.desc"></p>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <v-divider class="my-2"></v-divider>
    <h3 id="details" class="text-center text-button">Booking Details</h3>
    <v-divider class="my-2"></v-divider>
    <validation-observer ref="observer">
      <v-row no-gutters>
        <v-col cols="12" md="6" class="pa-2">
          <validation-provider
            v-slot="{ errors }"
            name="Full Name"
            rules="required"
          >
            <v-text-field
              v-model="form.booking_name"
              counter
              outlined
              hint="Enter your full name"
              label="Full Name"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required|email"
          >
            <v-text-field
              v-model="form.booking_email"
              counter
              outlined
              hint="Enter your email"
              label="Email"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Mobile Number"
            rules="required|digits:10"
          >
            <v-text-field
              v-model="form.booking_contact"
              counter
              outlined
              maxlength="10"
              type="number"
              prefix="+91"
              hint="Enter your contact number"
              label="Mobile Number"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <!-- <v-checkbox
            v-model="checkbox"
            :off-icon="icons.deselect"
            :on-icon="icons.select"
          >
            <template #label>
              <div>whatsapp epass on my number.</div>
            </template>
          </v-checkbox> -->
          <validation-provider
            v-slot="{ errors }"
            name="Agreement"
            rules="is:1"
          >
            <v-checkbox
              v-model="agreeTerms"
              :off-icon="icons.deselect"
              :on-icon="icons.select"
              :error-messages="errors"
              true-value="1"
              false-value="0"
            >
              <template #label>
                <div>
                  I agree to the

                  <a target="_blank" href=""> terms and conditions </a>

                  for the event.
                </div>
              </template>
            </v-checkbox>
          </validation-provider>
          <ul>
            <li>
              e-Pass will be sent to your email. You need to carry the e-Pass
              and additional documents (if any) as stated in the terms and
              conditions for the event.
            </li>
            <li>
              Please read the terms and conditions for Covid 19 Protocols to
              follow.
            </li>
          </ul>
        </v-col>

        <v-col class="pa-2">
          <v-text-field
            v-model="form.promo"
            label="Promo Code"
            outlined
            :success-messages="promoSuccess"
            :error-messages="promoError"
          ></v-text-field>
          <v-btn @click="checkPromo">Apply</v-btn>
          <v-divider class="my-2"></v-divider>
          <p>Total: INR {{ total }}</p>
          <div v-if="promo">
            <p>Original: {{ originalAmount }}</p>
            <p>Discount: {{ promo.discount }}</p>
          </div>
        </v-col>
      </v-row>
    </validation-observer>
  </v-container>
</template>

<script>
import {
  mdiTrashCanOutline,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
} from '@mdi/js'
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    form: {
      booking_email: null,
      booking_name: null,
      booking_contact: null,
      tickets: [],
      promo: null,
    },
    user: null,
    selectedTicket: null,
    agreeTerms: 0,
    icons: {
      delete: mdiTrashCanOutline,
      select: mdiCheckboxMarkedOutline,
      deselect: mdiCheckboxBlankOutline,
    },
    promoError: null,
    promoSuccess: null,
    promo: null,
    originalAmount: 0,
  }),
  computed: {
    total() {
      let total = 0
      this.form.tickets.forEach((el) => {
        total += el.price * el.quantity
      })
      if (this.promo) {
        total = total - this.promo.discount
      }
      return total
    },
  },
  watch: {
    total(newValue, oldValue) {
      this.originalAmount = oldValue
      this.$emit('setTotal', newValue)
    },
  },
  methods: {
    updateTickets(data) {
      if (data) {
        this.promo = null
        this.promoSuccess = null
        this.promoError = null
        const bookingTickets = this.form.tickets
        const ticketIndex = bookingTickets.findIndex(
          (el) => el.id === this.selectedTicket.id
        )
        if (ticketIndex === -1) {
          // add ticket
          bookingTickets.push({
            id: this.selectedTicket.id,
            quantity: data,
            price: this.selectedTicket.price,
          })
        } else {
          // update ticket
          bookingTickets[ticketIndex].quantity = data
        }
      }
    },
    removeTickets(ticketId) {
      this.promo = null
      this.promoSuccess = null
      this.promoError = null
      const ticketIndex = this.form.tickets.findIndex(
        (el) => el.event_ticket_id === ticketId
      )

      this.form.tickets.splice(ticketIndex, 1)
      this.$emit('setTotal', this.total)
    },
    async confirmBooking() {
      if (this.total > 0) {
        if (await this.$refs.observer.validate()) {
          this.$emit('setLoading', true)
          await this.$axios
            .$post(`booking/new/${this.event.url}`, this.form)
            .then((res) => {
              this.$store.dispatch('setSnackbar', {
                color: 'success',
                text: 'Redirecting to payment!',
              })
              this.$router.push(`/booking/${res.bookingUuid}`)
            })
            .catch((err) => {
              this.$emit('setLoading', false)
              this.$sentry.captureException(new Error(err))
              this.$store.dispatch('setSnackbar', {
                color: 'error',
                text: 'Booking error, contact support!',
              })
            })
        } else {
          this.$store.dispatch('setSnackbar', {
            color: 'warning',
            text: 'Enter booking details!',
          })
          this.$vuetify.goTo('#details')
        }
      } else {
        this.$store.dispatch('setSnackbar', {
          color: 'warning',
          text: 'Select passes to continue!',
        })
        this.$vuetify.goTo('#tickets')
      }
    },
    async checkPromo() {
      if (this.total > 0) {
        this.promo = null
        if (this.form.promo) {
          await this.$axios
            .$post(`booking/promo/${this.event.url}`, this.form)
            .then((res) => {
              this.promoSuccess = res.message
              this.promo = res
              this.promoError = null
              this.$emit('setTotal', this.total)
            })
            .catch((err) => {
              this.promoError = err.response
                ? err.response.data.message
                : err.message

              this.$store.dispatch('setSnackbar', {
                color: 'error',
                text: this.promoError,
              })
            })
        } else {
          this.promoError = 'Enter Promo'
        }
      } else {
        this.$store.dispatch('setSnackbar', {
          color: 'warning',
          text: 'Select passes to continue!',
        })
        this.$vuetify.goTo('#tickets')
      }
    },
  },
}
</script>

