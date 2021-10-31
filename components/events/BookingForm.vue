<template>
  <section>
    <v-container fluid class="card-glass rounded-xl text-center">
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
      <v-switch label="book for guest"></v-switch>
    </v-container>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: null,
    name: null,
    contact: null,
    user: null,
    guest: null,
  }),
}
</script>

