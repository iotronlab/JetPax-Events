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
              <p>{{ ticket.desc }}</p>
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

        <v-col>
          <v-text-field label="Promo Code"></v-text-field>
          <p>Total - {{ total }}</p>
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
    },
    user: null,
    selectedTicket: null,
    agreeTerms: 0,
    icons: {
      delete: mdiTrashCanOutline,
      select: mdiCheckboxMarkedOutline,
      deselect: mdiCheckboxBlankOutline,
    },
  }),
  computed: {
    total() {
      let total = 0
      this.form.tickets.forEach((el) => {
        total += el.price * el.quantity
      })
      return total
    },
  },
  methods: {
    updateTickets(data) {
      if (data) {
        const bookingTickets = this.form.tickets
        const ticketIndex = bookingTickets.findIndex(
          (el) => el.event_ticket_id === this.selectedTicket.id
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
        this.$emit('setTotal', this.total)
      }
    },
    removeTickets(ticketId) {
      const ticketIndex = this.form.tickets.findIndex(
        (el) => el.event_ticket_id === ticketId
      )

      this.form.tickets.splice(ticketIndex, 1)
      this.$emit('setTotal', this.total)
    },
    async confirmBooking() {
      if (this.total > 0) {
        if (await this.$refs.observer.validate()) {
          await this.$axios
            .$post(`booking/new/${this.event.url}`, this.form)
            .then((res) => {
              console.log(res)
              this.$router.push(`/booking/${res.bookingUuid}`)
            })
            .catch((err) => {
              this.$sentry.captureException(new Error(err))
              console.log(err)
            })
        } else {
          this.$vuetify.goTo('#details')
        }
      } else {
        this.$vuetify.goTo('#tickets')
      }
    },
  },
}
</script>

