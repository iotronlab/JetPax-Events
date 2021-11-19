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
            <v-text-field
              v-model="otp"
              counter
              outlined
              maxlength="6"
              :hint="'Enter otp recieved via email on ' + email"
              label="Enter OTP"
              :error-messages="errors"
            ></v-text-field
          ></validation-provider>
        </div>
      </v-card-text>
    </validation-observer>
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
      console.log(await this.$refs.observer.validate())
      if (await this.$refs.observer.validate()) {
        this.$axios
          .$post('sendotp')
          .then((res) => {
            // this.$store.commit('SET_SNACKBAR', {
            //   color: 'success',
            //   text: res.message,
            // })
            this.otpSent = true
            this.$store.dispatch('setSnackbar', {
              color: 'success',
              text: res.message,
            })
          })
          .catch((err) => {
            //    this.$sentry.captureException(new Error(err))
            console.log(err.response.data.message)
            this.$store.dispatch('setSnackbar', {
              color: 'warning',
              text: err.response.data.message,
            })
          })

        console.log(await this.$refs.observer.validate())
      }
      try {
        // const phoneNumber = '+91' + this.contact
        // const appVerifier = window.recaptchaVerifier
        // signInWithPhoneNumber(this.auth, phoneNumber, appVerifier)
        //   .then((confirmationResult) => {
        //     // SMS sent. Prompt user to type the code from the message, then sign the
        //     // user in with confirmationResult.confirm(code).
        //     window.confirmationResult = confirmationResult
        //     console.log(confirmationResult)
        //     // ...
        //   })
        //   .catch((error) => {
        //     // Error; SMS not sent
        //     console.log(error)
        //     // grecaptcha.reset(window.recaptchaWidgetId)
        //   })
      } catch (e) {
        // handleError(e)
        console.log(e)
      }
    },
    verifyOtp() {
      try {
        window.confirmationResult
          .confirm(this.otp)
          .then((result) => {
            // User signed in successfully.
            console.log(result)
            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
          })
      } catch (e) {
        // handleError(e)
        console.log(e)
      }
    },
  },
}
</script>
