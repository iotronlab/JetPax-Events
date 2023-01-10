<template>
  <v-container fluid class="glow-pink">
    <v-row justify="center" class="pa-2">
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
        class="card-glass rounded-xl pa-4 mt-10 text-center"
      >
        <v-img src="/logo.webp" max-width="160" alt="logo" class="mx-auto mb-2"></v-img>
        <h1 class="text-body-1 mb-4">Gateway to amazing experiences</h1>

        <v-btn-toggle
          v-model="loginMethod"
          background-color="transparent"
          class="mb-2"
          mandatory
        >
          <v-btn icon value="contact">
            <v-icon>{{ icon.phone }}</v-icon>
          </v-btn>
          <v-btn icon value="email">
            <v-icon>{{ icon.email }}</v-icon>
          </v-btn>
        </v-btn-toggle>
        <ValidationObserver ref="observer">
          <div v-if="loginMethod == 'contact'">
            <ValidationProvider
              v-slot="{ errors }"
              name="Contact"
              rules="required|min:10|max:15"
            >
              <v-text-field
                v-model="identifier"
                label="Contact"
                placeholder="Enter your number"
                name="Contact"
                type="number"
                hide-spin-buttons
                :error-messages="errors"
                outlined
                required
                color="success"
              ></v-text-field>
            </ValidationProvider>
          </div>

          <div v-if="loginMethod == 'email'">
            <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
              <v-text-field
                v-model="identifier"
                label="Email"
                placeholder="Enter your email"
                type="email"
                name="email"
                :error-messages="errors"
                outlined
                required
                color="success"
              ></v-text-field>
            </ValidationProvider>
          </div>

          <ValidationProvider v-slot="{ errors }" name="Password" rules="required|min:6">
            <v-text-field
              v-model="password"
              :append-icon="showPass ? icon.passShow : icon.passHide"
              :type="showPass ? 'text' : 'password'"
              label="Password"
              name="password"
              :error-messages="errors"
              outlined
              required
              color="success"
              @click:append="showPass = !showPass"
            ></v-text-field>
          </ValidationProvider>

          <div class="d-flex justify-center">
            <v-btn color="primary" @click.prevent="login">Sign in</v-btn>
          </div>
        </ValidationObserver>

        <br />
        <v-alert
          v-model="alert.show"
          class="mx-1 mt-4"
          border="left"
          outlined
          color="primary"
          close-text="Close Alert"
          dismissible
          :close-icon="alert.icon"
        >
          {{ alert.text }}
          <nuxt-link to="/auth/register"><u>create an account</u></nuxt-link>
        </v-alert>
        <p class="text-center">Sign in with</p>
        <v-row no-gutters justify="center">
          <v-btn color="#4267B2" class="ma-1" dark @click.prevent="loginWithFacebook">
            facebook
            <v-icon right>{{ icon.facebook }}</v-icon>
          </v-btn>

          <v-btn color="#DB4437" class="ma-1" dark @click.prevent="loginWithGoogle">
            <v-icon left>{{ icon.google }}</v-icon
            >google
          </v-btn>
        </v-row>
        <br />

        <v-row no-gutters class="my-2" justify="space-around">
          <v-btn text small :to="{ path: '/auth/register' }">Create an account</v-btn>

          <v-btn text small :to="{ path: '/auth/reset' }">Forgot password</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import { ValidationObserver } from 'vee-validate'
import {
  mdiEmail,
  mdiEye,
  mdiEyeOff,
  mdiFacebook,
  mdiGoogle,
  mdiPhone,
  mdiClose,
} from "@mdi/js";
export default {
  middleware: ["auth-user"],

  data() {
    return {
      loginMethod: "contact",
      identifier: null,
      password: null,
      userExists: false,
      showPass: false,
      errorMessage: null,
      alert: {
        show: false,
        text: "Something is wrong! Contact support!",
        icon: mdiClose,
      },
      icon: {
        email: mdiEmail,
        phone: mdiPhone,
        passShow: mdiEye,
        passHide: mdiEyeOff,
        facebook: mdiFacebook,
        google: mdiGoogle,
      },
    };
  },
  mounted() {
    console.log(process.env.apiUrl);
  },
  methods: {
    async login() {
      if (await this.$refs.observer.validate()) {
        await this.$auth
          .loginWith("laravelSanctum", {
            data: {
              method: this.loginMethod,
              identifier: this.identifier,
              password: this.password,
            },
          })
          .then((res) => {
            console.log(res);
            this.$store.dispatch("setSnackbar", {
              color: "success",
              text: res.message,
            });
          })
          .catch((err) => {
            this.errorMessage = err.response.data.message;
            if (this.errorMessage === "User not found!") {
              this.alert.show = true;
              this.alert.text = this.errorMessage;
            }
            console.log(err.response);
            this.$refs.observer.setErrors(err.response.data.errors);
            this.$store.dispatch("setSnackbar", {
              color: "error",
              text: this.errorMessage,
            });
            // this.$sentry.captureException(new Error(err));
          });
      }

      // this.checkLogin()
    },
    loginWithFacebook() {
      window.location.href = process.env.apiUrl + "/login/facebook";
      // this.checkLogin()
      // await this.$auth.loginWith('facebook')
    },
    loginWithGoogle() {
      window.location.href = process.env.apiUrl + "/login/google";
      // this.checkLogin()
      //    await this.$auth.loginWith('google')
    },
    async checkExistingUser() {
      if (
        await this.$refs.observer.validate()
        // && this.checkRecaptcha()
      ) {
        // this.alert.show = false;
        this.$axios
          .$post(`verify`, { method: this.loginMethod, identifier: this.identifier })
          .then((result) => {
            if (result.success === true) {
              // user exists
              this.userExists = true;
              // this.login();
            } else {
              this.$refs.observer.setErrors({
                contact: result.message,
                email: result.message,
              });
              this.$store.dispatch("setSnackbar", {
                color: "warning",
                text: result.message,
              });
              this.alert.show = true;
              this.alert.text = result.message;
            }
          })
          .catch((err) => {
            this.$sentry.captureException(new Error(err));
          });
      }
    },
  },
};
</script>
