<template>
  <section>
    <validation-observer ref="contact">
      <!-- contact entry with country code -->

      <v-row justify="center" align="center">
        <v-select v-model="isdCode" :items="countries" item-value="isd_code" item-text="isd_code" solo
          style="max-width: 5rem !important">
          <template #selection="{ item }">
            <v-img max-width="1.5rem" :src="item.flag" class="mr-2"></v-img>
            {{ item.isd_code }}
          </template>
          <template #item="{ item }">
            <v-img max-width="1.5rem" :src="item.flag" class="mr-2"></v-img>
            {{ item.isd_code }}
          </template>
        </v-select>
        <validation-provider v-slot="{ errors }" name="mobile" rules="required|digits:10" style="width: 70%">
          <v-text-field v-model="contact" counter maxlength="10" type="number" label="Mobile Number" :disabled="otpSent"
            outlined :error-messages="errors" rounded>
          </v-text-field>
        </validation-provider>
      </v-row>

      <v-alert v-model="alert.show" class="mx-1 mt-4" border="left" outlined color="primary" close-text="Close Alert"
        dismissible :close-icon="alert.icon">
        {{ alert.text }}
        <nuxt-link v-if="type === 'register'" to="/auth/reset">Reset</nuxt-link>
        <nuxt-link v-if="type === 'reset'" to="/auth/register">Register</nuxt-link>
      </v-alert>

      <div v-if="otpSent" class="px-2">
        <v-divider class="my-4" />
        <p class="caption text-center text--secondary">Enter OTP</p>
        <validation-provider v-slot="{ errors }" name="OTP" rules="required|min:6">
          <v-otp-input v-model="otp" counter outlined maxlength="6"
            :hint="'Enter otp recieved via sms on +91' + contact" label="Enter OTP" :error-messages="errors">
          </v-otp-input>
          {{ errors.toString() }}
        </validation-provider>
      </div>
    </validation-observer>
    <v-card-actions class="my-4">
      <v-btn v-if="otpSent" text @click="changeNumber"> Change Number </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="!otpSent" id="otp" type="submit" outlined rounded color="accent" @click="checkExistingUser">
        Send Otp
      </v-btn>
      <v-btn v-if="otpSent" outlined rounded color="accent" @click="verifyOtp">
        Verify Otp
      </v-btn>
    </v-card-actions>
    <!-- <span v-if="!reCaptcha" class="caption">verify captcha to continue</span> -->
    <!-- <div v-show="!reCaptcha" id="recaptcha" class="ma-4"></div> -->
  </section>
</template>

<script>
/* global grecaptcha */
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { mdiClose } from '@mdi/js'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    contact: null,
    googleAuth: null,
    reCaptcha: null,
    isdCode: 91,
    countries: null,
    otp: null,
    otpSent: false,

    alert: {
      show: false,
      text: 'Something is wrong! Contact support!',
      icon: mdiClose,
    },
  }),
  async fetch() {
    await this.$axios
      .$get('countries')
      .then((result) => {
        this.countries = result.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  mounted() {
    this.initCaptcha()
  },
  methods: {
    initCaptcha() {
      this.googleAuth = getAuth()
      // To apply the default browser preference instead of explicitly setting it.
      // firebase.auth().useDeviceLanguage();
      window.recaptchaVerifier = new RecaptchaVerifier(
        'otp',
        {
          size: 'invisible',
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
      window.recaptchaVerifier
        .render()
        .then(function (widgetId) {
          window.recaptchaWidgetId = widgetId
        })
        .catch((error) => {
          // Error; Captcha not working
          this.$sentry.captureException(new Error(error))

          this.$store.dispatch('setSnackbar', {
            color: 'warning',
            text: 'Captcha error! Kindly contact support!',
          })
        })
    },
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
    async checkExistingUser() {
      if (
        await this.$refs.contact.validate()
        // && this.checkRecaptcha()
      ) {
        this.alert.show = false
        this.$axios
          .$post('verify/customer', { contact: this.contact })
          .then((result) => {
            if (result.success === false && this.type === 'register') {
              // user doesn't exist
              this.sendOtp()
            } else if (result.success === true && this.type === 'reset') {
              // user exists
              this.sendOtp()
            } else {
              this.$refs.contact.setErrors({ mobile: result.message })
              this.$store.dispatch('setSnackbar', {
                color: 'warning',
                text: result.message,
              })
              this.alert.show = true
              this.alert.text = result.message
            }
          })
          .catch((err) => {
            this.$sentry.captureException(new Error(err))
          })
      }
    },
    sendOtp() {
      const phoneNumber = '+' + this.isdCode + this.contact
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
          this.resetCaptcha()
          this.otpSent = false
          console.log(error)
          //  this.$sentry.captureException(new Error(error))
          this.$store.dispatch('setSnackbar', {
            color: 'error',
            text: 'Invalid phone number!',
          })
        })
    },
    async verifyOtp() {
      if (await this.$refs.contact.validate()) {
        window.confirmationResult
          .confirm(this.otp)
          .then((result) => {
            // User signed in successfully. Saving a temp VerifyUser in the database
            this.$axios
              .$post('verify/contact', { contact: this.contact })
              .then((res) => {
                this.$store.dispatch('setSnackbar', {
                  color: 'success',
                  text: res.message,
                })
                console.log(res)
                this.$emit('success', res)
              })
              .catch((err) => {
                this.$sentry.captureException(new Error(err))
              })

            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.log(error)
            this.$store.dispatch('setSnackbar', {
              color: 'error',
              text: 'Incorrect OTP entered!',
            })
          })
      }
    },
    changeNumber() {
      this.otpSent = false
      this.otp = null
      this.contact = ''
      this.resetCaptcha()
    },

    resetCaptcha() {
      this.reCaptcha = null
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId)
      })
    },
  },
}
</script>
