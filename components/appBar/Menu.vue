<template>
  <v-row no-gutters justify="center" align="center">
    <Location />
    <div v-for="(item, i) in navItems" :key="i">
      <div v-if="item.children">
        <v-menu rounded="xl" offset-y>
          <template #activator="{ attrs, on }">
            <v-btn text color="secondary" v-bind="attrs" v-on="on">
              <strong> {{ item.title }}</strong>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(child, index) in item.children"
              :key="index"
              link
              :to="child.to"
            >
              <v-list-item-title
                class="text-overline"
                v-text="child.title"
              ></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <v-btn v-else text :to="item.to">{{ item.title }}</v-btn>
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
