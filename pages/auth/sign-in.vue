<template>
  <v-container fluid class="fill-height glow-pink">
    <v-row no-gutters justify="center">
      <v-col lg="5">
        <v-container fluid class="card-glass rounded-xl">
          <v-row no-gutters>
            <v-col class="d-flex justify-center align-center">
              <ValidationObserver ref="observer" v-slot="{}">
                <v-form id="login-form" method="post" @submit.prevent="login">
                  <v-img
                    :src="require('@/assets/images/index/logo.webp')"
                    contain
                    alt="iaa logo"
                    max-width="200"
                    class="mx-auto"
                  />
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      :prepend-icon="icon.email"
                      label="Email ID"
                      name="email"
                      type="email"
                      :error-messages="errors"
                      required
                    ></v-text-field
                  ></ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required|min:6"
                  >
                    <v-text-field
                      v-model="password"
                      :prepend-icon="icon.password"
                      :append-icon="showPass ? icon.passShow : icon.passHide"
                      :type="showPass ? 'text' : 'password'"
                      label="Password"
                      name="password"
                      :error-messages="errors"
                      required
                      @click:append="showPass = !showPass"
                    ></v-text-field>
                  </ValidationProvider>
                  <div class="d-flex justify-center">
                    <v-btn
                      color="secondary"
                      rounded
                      outlined
                      type="submit"
                      class="mt-4"
                      ><b>LogIn</b>
                    </v-btn>
                  </div>

                  <br />
                  <hr />
                  <br />
                  <p class="text-center grey--text subtitle-2">LOG IN VIA</p>

                  <v-row no-gutters justify="space-around">
                    <v-btn
                      color="#4267B2"
                      class="ma-1"
                      dark
                      @click.prevent="socialLogin('facebook')"
                    >
                      facebook
                      <v-icon right>{{ icon.facebook }}</v-icon>
                    </v-btn>

                    <v-btn
                      color="#DB4437"
                      class="ma-1"
                      dark
                      @click.prevent="socialLogin('google')"
                    >
                      <v-icon left>{{ icon.google }}</v-icon
                      >google
                    </v-btn>
                  </v-row>
                </v-form></ValidationObserver
              >
            </v-col>
          </v-row>

          <br />
          <hr />
          <br />
          <v-row no-gutters class="my-2" justify="space-around">
            <v-btn text small :to="{ path: 'register' }" @click="dialog = false"
              >Create an account</v-btn
            >

            <v-btn text small :to="{ path: 'reset' }" @click="dialog = false"
              >Forgot password</v-btn
            >
          </v-row>
        </v-container>
      </v-col></v-row
    >
  </v-container>
</template>
<script>
import { ValidationObserver } from 'vee-validate'
import {
  mdiEmail,
  mdiLock,
  mdiEye,
  mdiEyeOff,
  mdiFacebook,
  mdiGoogle,
} from '@mdi/js'
export default {
  components: {
    ValidationObserver,
  },

  data() {
    return {
      email: '',
      password: '',
      showPass: false,
      icon: {
        email: mdiEmail,
        password: mdiLock,
        passShow: mdiEye,
        passHide: mdiEyeOff,
        facebook: mdiFacebook,
        google: mdiGoogle,
      },
    }
  },
  methods: {
    async login() {
      if (this.$refs.observer.validate()) {
        console.log(this.$refs.observer.validate())
        await this.$auth
          .loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.log(error.response.data)
            this.$toast.error(error.response.data.message)
          })
      } else {
        console.log('invalid formwa')
      }

      this.checkLogin()
    },
    // async loginWithFacebook() {
    //   window.location.href = `https://api.butiq.co.in/public/api/login/facebook`
    //   this.checkLogin()
    // },
    // async loginWithGoogle() {
    //   window.location.href = `https://api.butiq.co.in/public/api/login/google`
    //   this.checkLogin()
    // },
    checkLogin() {
      console.log(this.$auth.user)
      if (this.$auth.loggedIn) {
        this.dialog = false
      } else {
        this.message = 'Invalid email or password'
      }
    },
  },
}
</script>
