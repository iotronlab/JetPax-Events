<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      class="ma-2 rounded-xl"
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
    </v-navigation-drawer>
    <v-app-bar fixed app color="transparent" flat>
      <v-app-bar-nav-icon
        aria-label="nav-button"
        @click.stop="drawer = !drawer"
      >
        <v-icon slot="default">{{ icons.menu }}</v-icon></v-app-bar-nav-icon
      >
      <nuxt-link v-if="!$vuetify.breakpoint.lgAndUp" :to="{ name: 'index' }">
        <v-img src="/icon.png" max-width="60" contain alt="logo"></v-img>
      </nuxt-link>

      <AppBarMenu v-else :navItems="navItems" />
      <v-btn class="ml-auto" outlined>Sign in</v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {
  mdiMenu,
  mdiPhone,
  mdiWhatsapp,
  mdiEmail,
  mdiFacebook,
  mdiInstagram,
  mdiYoutube,
  mdiGoogle,
} from '@mdi/js'
export default {
  data() {
    return {
      drawer: false,

      icons: {
        menu: mdiMenu,
        call: mdiPhone,
        email: mdiEmail,
        whatsapp: mdiWhatsapp,
      },
      navItems: [
        {
          title: 'Home',
          to: '/',
        },
        {
          title: 'About Us',
          to: '/about',
        },
        {
          title: 'Events',
          to: '/events',
        },
        {
          title: 'Artists',
          to: '/artists',
        },
      ],
      socialLinks: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/signetlogo',
          icon: mdiFacebook,
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/signetlogo',
          icon: mdiInstagram,
        },
        {
          name: 'Youtube',
          url: 'https://www.youtube.com/channel/UCTHNYidV3Jv-tRoEB_iUmTQ',
          icon: mdiYoutube,
        },
        { name: 'Google', url: 'https://g.co/kgs/jbFUBk', icon: mdiGoogle },
      ],
    }
  },
}
</script>
