<template>
  <section>
    <validation-observer ref="observer">
      <v-card-text>
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

        <span class="text-caption text--secondary">
          This is the phone number you will use to login to your IAA account
        </span>
        <div v-if="!otpSent" id="recaptcha" class="ma-4"></div>

        <div v-if="otpSent">
          <v-scroll-y-transition>
            <validation-provider
              v-slot="{ errors }"
              name="OTP"
              rules="required|max:6|min:6"
            >
              <v-text-field
                v-if="otpSent"
                v-model.number="otp"
                counter
                outlined
                maxlength="6"
                :hint="'Enter otp recieved via sms on +91' + contact"
                label="Enter OTP"
                :error-messages="errors"
              ></v-text-field></validation-provider
          ></v-scroll-y-transition>
        </div>
      </v-card-text>
    </validation-observer>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn v-if="otpSent" depressed color="primary" @click="changeNumber">
        Change Number
      </v-btn>
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
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'

export default {
  data: () => ({
    contact: null,
    googleAuth: null,
    reCaptcha: null,
    otp: null,
    otpSent: false,
  }),
  mounted() {
    this.googleAuth = getAuth()
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha',
      {
        size: 'normal',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.reCaptcha = response
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          this.reCaptcha = null
        },
      },
      this.googleAuth
    )
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  },
  methods: {
    checkRecaptcha() {
      if (this.reCaptcha != null) {
        return true
      } else {
        this.$store.dispatch('setSnackbar', {
          color: 'warning',
          text: 'Verify you are not a robot!',
        })
        return false
      }
    },
    async sendOtp() {
      if ((await this.$refs.observer.validate()) && this.checkRecaptcha()) {
        const phoneNumber = '+91' + this.contact
        const appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(this.googleAuth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult
            this.$store.dispatch('setSnackbar', {
              color: 'success',
              text: 'Otp sent on ' + this.contact,
            })
            this.$emit('otpsent', { contact: this.contact })
            this.otpSent = true
            // ...
          })
          .catch((error) => {
            // Error; SMS not sent
            this.otpSent = false
            this.$sentry.captureException(new Error(error))
            this.$store.dispatch('setSnackbar', {
              color: 'warning',
              text: 'Kindly try email verification!',
            })
          })
      }
    },
    verifyOtp() {
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
          this.$sentry.captureException(new Error(error))
        })
    },
  },
}
</script>
