<template>
  <v-container fluid class="text-center pa-0">
    <h2 class="mt-4">Select Pass</h2>
    <v-item-group mandatory>
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
          <v-item v-slot="{ active, toggle }">
            <v-card
              :color="active ? 'primary' : ''"
              class="card-glass fill-height text-center pa-2"
              dark
              rounded
              :elevation="active ? 8 : 3"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <v-row v-if="active" no-gutters class="mt-4">
                  <v-select label="quantity" dense outlined rounded></v-select>
                  <v-chip outlined class="ml-2">200</v-chip>
                </v-row>
                <v-row v-else no-gutters class="mt-4">
                  <v-select
                    label="quantity"
                    dense
                    outlined
                    rounded
                    disabled
                  ></v-select
                  ><v-chip outlined disabled class="ml-2">200</v-chip>
                </v-row>
              </v-scroll-y-transition>
              <h2>{{ ticket.price }}</h2>
              <h3 class="text-button">{{ ticket.name }}</h3>
              <p>{{ ticket.desc }}</p>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <h2>Booking Details</h2>
    <v-divider class="my-2"></v-divider>
    <v-row no-gutters>
      <v-col cols="12" md="6" class="pa-2">
        <validation-provider
          v-slot="{ errors }"
          name="Full Name"
          rules="required"
        >
          <v-text-field
            v-model="email"
            counter
            outlined
            hint="Enter your full name"
            label="Full Name"
            :disabled="otpSent"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Email"
          rules="required|email"
        >
          <v-text-field
            v-model="email"
            counter
            outlined
            hint="Enter your email"
            label="Email"
            :disabled="otpSent"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="Mobile Number"
          rules="required|digits:10"
        >
          <v-text-field
            v-model="contact"
            counter
            outlined
            maxlength="10"
            type="number"
            prefix="+91"
            hint="Enter your contact number"
            label="Mobile Number"
            :disabled="otpSent"
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
      </v-col>
      <v-col> <v-text-field label="Promo Code"></v-text-field></v-col>
    </v-row>

    <v-btn block color="primary">Confirm Booking</v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    email: null,
    name: null,
    contact: null,
    user: null,
  }),
}
</script>

