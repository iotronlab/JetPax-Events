<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      class="ma-2 rounded-xl card-glass elevated-1"
      temporary
      fixed
      app
    >
      <v-list nav rounded class="text-center">
        <v-list-item
          v-for="(item, i) in navItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="$auth.loggedIn">
        <v-divider></v-divider>
        <v-list-item
          v-for="(item, i) in accountItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar id="nav" class="elevated nav-transparent" fixed app flat>
      <v-app-bar-nav-icon
        aria-label="nav-button"
        @click.stop="drawer = !drawer"
      >
        <v-icon slot="default">{{ icons.menu }}</v-icon></v-app-bar-nav-icon
      >
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
    </v-main>
    <LazyFooter :nav-items="navItems" />
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <v-scroll-y-transition>
      <v-snackbar
        v-model="snackbar.showing"
        top
        text
        :color="snackbar.color"
        :timeout="4000"
      >
        <v-icon dark class="mr-2">{{ snackbar.icon }}</v-icon>
        {{ snackbar.text }}

        <template #action="{ attrs }">
          <v-btn text small v-bind="attrs" @click="snackbar.showing = false">
            Close
          </v-btn>
        </template>
      </v-snackbar></v-scroll-y-transition
    >
  </v-app>
</template>

<script>
import { mdiMenu, mdiPhone, mdiWhatsapp, mdiEmail, mdiAccount } from '@mdi/js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      drawer: false,
      icons: {
        menu: mdiMenu,
        call: mdiPhone,
        email: mdiEmail,
        whatsapp: mdiWhatsapp,
        account: mdiAccount,
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
        // {
        //   title: 'Artists',
        //   to: '/artists',
        // },

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
    }),
  },
  watch: {
    snackbar() {
      this.snackbar.showing = false
      setTimeout(() => {
        this.snackbar.showing = true
      }, 100)
    },
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
    // this.tawk()
  },
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
