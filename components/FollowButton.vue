<template>
  <v-btn
    outlined
    :text="isSubscribed ? false : true"
    :color="isSubscribed ? null : 'primary'"
    class="font-weight-black"
    @click.prevent="subscribe"
    elevation="8"
  >
    <v-icon left>{{ isSubscribed ? icons.subscribed : icons.subscribe }}</v-icon>
    {{ isSubscribed ? "subscribed" : "subscribe" }}
  </v-btn>
</template>

<script>
import { mdiStarFourPoints, mdiStarFourPointsOutline } from "@mdi/js";
export default {
  props: {
    creator: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      icons: {
        subscribed: mdiStarFourPoints,
        subscribe: mdiStarFourPointsOutline,
      },
    };
  },
  computed: {
    isSubscribed() {
      return this.creator.subscribed;
    },
  },
  methods: {
    async subscribe() {
      await this.$axios
        .post(`bookmark/artist/${this.creator.url}`)
        .then((result) => {
          this.$emit("subscribed", this.creator.url);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    unSubscribe() {},
  },
};
</script>
