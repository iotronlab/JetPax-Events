<template>
  <v-container fluid class="fill-height bg-glow">
    <v-row no-gutters justify="center">
      <v-col lg="5">
        <v-container fluid class="card-glass rounded-xl">
          <v-row no-gutters>
            <v-col class="d-flex justify-center align-center">
              <ValidationObserver ref="observer" v-slot="{}">
                <v-form id="login-form" method="post" @submit.prevent="login">
                  <v-img
                    src="/icon.png"
                    contain
                    alt="iaa logo"
                    max-width="120"
                    class="mx-auto"
                  />
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      prepend-icon="mdi-email"
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
                      prepend-icon="mdi-lock"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
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
                      color="primary"
                      rounded
                      outlined
                      type="submit"
                      class="mt-4"
                      >LogIn</v-btn
                    >
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
                      <v-icon right>mdi-facebook</v-icon>
                    </v-btn>

                    <v-btn
                      color="#DB4437"
                      class="ma-1"
                      dark
                      @click.prevent="socialLogin('google')"
                    >
                      google
                      <v-icon right>mdi-google</v-icon>
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
            <v-btn
              text
              x-small
              :to="{ path: '/verify/register' }"
              @click="dialog = false"
              >Create an account</v-btn
            >

            <v-btn
              text
              x-small
              :to="{ path: '/verify/reset' }"
              @click="dialog = false"
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
export default {
  components: {
    ValidationObserver,
  },

  data() {
    return {
      email: '',
      password: '',
      showPass: false,
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
<style scoped>
.bg-glow {
  background-image: url('@/assets/images/events/bg1.png');
  width: 100%;
  background-size: cover;
}
</style>
