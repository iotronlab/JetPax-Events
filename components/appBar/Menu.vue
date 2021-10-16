<template>
  <v-row no-gutters justify="center" align="center">
    <nuxt-link :to="{ name: 'index' }">
      <v-img src="/icon.png" max-width="70" contain class="mr-2"
    /></nuxt-link>
    <div v-for="(item, i) in navItems" :key="i">
      <div v-if="item.children">
        <v-menu rounded="xl" offset-y>
          <template v-slot:activator="{ attrs, on }">
            <v-btn text color="secondary" v-bind="attrs" v-on="on">
              <strong> {{ item.title }}</strong>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in item.children"
              :key="index"
              link
              :to="item.to"
            >
              <v-list-item-title
                class="text-overline"
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn v-else text color="secondary" :to="item.to">
        <strong> {{ item.title }}</strong></v-btn
      >
    </div>
  </v-row>
</template>

<script>
export default {
  props: {
    navItems: {
      required: true,
      type: Array,
    },
  },
}
</script>

