<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" class="ma-2 rounded-xl card-glass elevated-1" temporary fixed app>
      <v-list-item>
        <v-spacer></v-spacer>
        <v-btn text rounded class="text-body-2 py-4 my-4" small to="/location">
          <v-icon class="mb-2 mr-2">{{ icons.location }}</v-icon>{{ defaultCity ? defaultCity : "select" }}
        </v-btn>
      </v-list-item>
      <v-list nav rounded class="text-center">
        <v-list-item v-for="(item, i) in navItems" :key="i" :to="item.to" router exact>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="$auth.loggedIn">
        <v-divider></v-divider>
        <v-list-item v-for="(item, i) in accountItems" :key="i" :to="item.to" router exact>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar id="nav" class="elevated nav-transparent" fixed app flat>
      <v-app-bar-nav-icon aria-label="nav-button" @click.stop="drawer = !drawer">
        <v-icon slot="default">{{ icons.menu }}</v-icon>
      </v-app-bar-nav-icon>
      <nuxt-link :to="{ name: 'index' }">
        <v-img src="/icon.png" max-width="60" contain alt="logo"></v-img>
      </nuxt-link>

      <AppBarMenu v-if="$vuetify.breakpoint.lgAndUp" :nav-items="navItems" />

      <section v-if="$auth.loggedIn == false" class="ml-auto">
        <!-- <Login /> -->
        <v-btn outlined to="/auth/sign-in">Sign in</v-btn>
      </section>
      <section v-if="$auth.loggedIn == true" class="ml-auto">
        <!-- Account button -->

        <v-btn color="secondary" dark icon to="/account">
          <v-icon>{{ icons.account }}</v-icon>
        </v-btn>
      </section>
    </v-app-bar>
    <v-main>
      <Nuxt />
      <v-overlay :value="noCity" opacity="0.8" z-index="55" class="pa-0">

        <v-card flat style="background-color: #1565C0;" width="80vw">
          <v-card-title>
            Find safe and exicting events around you
          </v-card-title>

        <v-row>
        <v-col cols="12">
          <v-autocomplete
              outlined :items="cities" item-text="name"
              label="Search all cities" class="ma-4" item-value="name" v-model="citySelection"
          ></v-autocomplete>
        </v-col>
        </v-row>

        <v-list-item class="pt-0 mt-0 pb-1">
          <v-btn rounded text @click="noCity = false">
              <span>Skip & continue</span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn rounded text><v-icon class="mb-1 mr-4">{{ icons.location }}</v-icon>
              <span class="hidden-md-and-down">Current location</span>
          </v-btn>
        </v-list-item>

        </v-card>

      </v-overlay>
    </v-main>
    <LazyFooter :nav-items="navItems" />
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-btn fab fixed bottom right color="primary" href="https://wa.me/918100487524" target="_blank" rel="noreferrer"
      style="z-index: 120">
      <v-icon x-large>{{ icons.whatsapp }} </v-icon>
    </v-btn>
    <v-scroll-y-transition>
      <v-snackbar v-model="snackbar.showing" top text :color="snackbar.color" :timeout="4000">
        <v-icon dark class="mr-2">{{ snackbar.icon }}</v-icon>
        {{ snackbar.text }}

        <template #action="{ attrs }">
          <v-btn text small v-bind="attrs" @click="snackbar.showing = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-scroll-y-transition>
  </v-app>
</template>

<script>
import { mdiMenu, mdiPhone, mdiWhatsapp, mdiEmail, mdiAccount, mdiMapMarkerRadius } from '@mdi/js'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      drawer: false,
      noCity: false,
      citySelection: "",
      icons: {
        menu: mdiMenu,
        call: mdiPhone,
        email: mdiEmail,
        whatsapp: mdiWhatsapp,
        account: mdiAccount,
        location: mdiMapMarkerRadius,
      },
      navItems: [
        {
          title: 'Home',
          to: '/',
        },
        {
          title: 'About Us',
          to: '/about',
          // children: [
          //   { title: 'Art Forms', to: '/about#artforms' },
          //   { title: 'Our Team', to: '/about#team' },
          //   { title: 'Associates', to: '/about#associates' },
          // ],
        },
        {
          title: 'Events',
          to: '/events',
        },
        {
          title: 'Artists',
          to: '/artists',
        },

        {
          title: 'Join Us',
          to: '/joinus',
        },
        {
          title: 'Contact Us',
          to: '/contactus',
        },
      ],
      accountItems: [
        {
          title: 'Account',
          to: '/account',
        },
        {
          title: 'Bookings',
          to: '/booking',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      snackbar: 'snackbar',
      cities: 'cities',
      defaultCity: 'defaultCity'
    }),
  },

  watch: {
    citySelection(oldVal, newVal) {
      this.setCity(this.citySelection)
      this.noCity = false
    },

    snackbar() {
      this.snackbar.showing = false
      setTimeout(() => {
        this.snackbar.showing = true
      }, 100)
    },
  },

  created() {
    this.getCities()
  },

  mounted() {
    const myNav = document.getElementById('nav')
    window.onscroll = function () {
      'use strict'
      if (document.body.scrollTop >= 200) {
        myNav.classList.add('nav-transparent')
        myNav.classList.remove('card-glass')
      } else {
        myNav.classList.remove('nav-transparent')
        myNav.classList.add('card-glass')
      }
    }

    this.getCookie()
  },

  methods: {
    ...mapActions(['getCities']),
    ...mapActions(['setCity']),

    getCookie() {
      const city = "defaultCity"
      if (this.defaultCity === null) {
        const cookieArr = document.cookie.split(";")
        for (let i = 0; i < cookieArr.length; i++) {
          const cookiePair = cookieArr[i].split("=")
          if (city === cookiePair[0].trim()) {
            const cityData = decodeURIComponent(cookiePair[1])
            this.setCity(cityData)
            this.noCity = false
            return null
          }
        }
        this.noCity = true
        return null
      }
    },

  },

  // this.tawk()

}
</script>

<style scoped>
.nav-transparent {
  background-color: transparent !important;
}

.elevated {
  z-index: 100 !important;
}

.elevated-1 {
  z-index: 200 !important;
}
</style>
