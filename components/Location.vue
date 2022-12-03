<template>
  <v-btn text to="/location">
    <v-icon left>{{ icons.location }}</v-icon
    >{{ defaultCity ? defaultCity : "select" }}
  </v-btn>
</template>

<script>
import { mdiMapMarkerRadius } from "@mdi/js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      icons: {
        location: mdiMapMarkerRadius,
      },
    };
  },
  computed: {
    ...mapGetters({
      defaultCity: "defaultCity",
    }),
  },
};
</script>
