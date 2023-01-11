<template>
  <div>
    <v-btn
      dark
      class="card-glass font-weight-medium"
      icon
      @click.stop="userNav = !userNav"
    >
      {{ avatar }}
    </v-btn>
    <v-navigation-drawer
      v-model="userNav"
      class="card-glass elevated-1"
      temporary
      fixed
      right
      app
    >
      <v-btn icon class="ma-1" @click.stop="userNav = !userNav"
        ><v-icon>{{ icons.close }}</v-icon></v-btn
      >
      <v-list>
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
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      userNav: false,
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
      icons: {
        close: mdiClose,
      },
    }
  },
  computed: {
    ...mapGetters({
      defaultCity: 'defaultCity',
    }),
    ...mapState({
      user: (state) => state.auth.user,
    }),
    avatar() {
      const fullName = this.user.name
      const namesArray = fullName.trim().split(' ')
      if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`
      else
        return `${namesArray[0].charAt(0)}${namesArray[
          namesArray.length - 1
        ].charAt(0)}`
    },
  },
}
</script>
