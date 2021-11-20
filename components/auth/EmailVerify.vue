<template>
  <section>
    <validation-observer ref="observer">
      <v-card-text>
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

        <span class="text-caption text--secondary">
          This is the email you will use to login to your IAA account
        </span>
        <div id="recaptcha" class="ma-4"></div>
        <div v-if="otpSent">
          <validation-provider
            v-slot="{ errors }"
            name="OTP"
            rules="required|max:6|min:6"
          >
            <v-otp-input v-model="otp" length="6" type="number"></v-otp-input>
            {{ errors.toString() }}
          </validation-provider>
        </div>
      </v-card-text>
    </validation-observer>
    {{ errorMessage }}
    <v-divider></v-divider>

    <v-card-actions>
      <!-- <v-btn v-if="otpSent" depressed color="primary" @click="changeNumber">
        Change Email
      </v-btn> -->
      <v-spacer></v-spacer>
      <v-btn v-if="!otpSent" depressed color="primary" @click="sendOtp">
        Send Otp
      </v-btn>
      <v-btn v-if="otpSent" depressed color="primary" @click="verifyOtp">
        Verify Otp
      </v-btn>
    </v-card-actions>
  </section>
</template>

<script>
import { getAuth, RecaptchaVerifier } from 'firebase/auth'

export default {
  data: () => ({
    email: null,
    googleAuth: null,
    otp: null,
    otpSent: false,
    errorMessage: null,
  }),
  mounted() {
    this.googleAuth = getAuth()
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha',
      {},
      this.googleAuth
    )
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  },
  methods: {
    async sendOtp() {
      if (await this.$refs.observer.validate()) {
        try {
          await this.$axios
            .$get('http://localhost:8000/sanctum/csrf-cookie', {
              withCredentials: true,
            })
            .then(async (response) => {
              await this.$axios
                .$post('sendotp', {
                  email: this.email,
                  type: 'new',
                })
                .then((res) => {
                  this.otpSent = true
                  this.$store.dispatch('setSnackbar', {
                    color: 'success',
                    text: res.message,
                  })
                })
            })
        } catch (err) {
          this.$sentry.captureException(new Error(err))
          this.errorMessage = err.response
            ? err.response.data.message
            : err.message
          this.$store.dispatch('setSnackbar', {
            color: 'warning',
            text: this.errorMessage,
          })
        }
      }
    },
    async verifyOtp() {
      if (await this.$refs.observer.validate()) {
        await this.$axios
          .$post('verifyotp', {
            email: this.email,
            otp: this.otp,
          })
          .then((res) => {
            this.otpSent = true
            this.$store.dispatch('setSnackbar', {
              color: 'success',
              text: res.message,
            })
          })
          .catch((err) => {
            this.$sentry.captureException(new Error(err))
            this.errorMessage = err.response
              ? err.response.data.message
              : err.message
            this.$store.dispatch('setSnackbar', {
              color: 'warning',
              text: this.errorMessage,
            })
          })
      }
    },
  },
}
</script>
