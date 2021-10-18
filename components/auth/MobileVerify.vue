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
        <div id="recaptcha" class="ma-4"></div>
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
          ></v-text-field
        ></validation-provider>
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
  //  signInWithPhoneNumber,
} from 'firebase/auth'

export default {
  data: () => ({
    contact: null,
    auth: null,
    otp: null,
    otpSent: false,
  }),
  mounted() {
    this.auth = getAuth()
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {}, this.auth)
    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId
    })
  },
  methods: {
    async sendOtp() {
      console.log(await this.$refs.observer.validate())
      if (await this.$refs.observer.validate()) {
        this.otpSent = true
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
<style>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield !important;
}
</style>
