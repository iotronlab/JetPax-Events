<template>
  <v-row no-gutters>
    <v-col cols="12" lg="6">
      <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
    </v-col>
    <v-col cols="12" lg="6" class="pa-2">
      <h3 class="primary--text">{{ artist.name }}</h3>

      <p
        style="
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        "
      >
        {{ artist.desc }}
      </p>
      <v-btn small outlined class="mb-2" color="secondary">view artist</v-btn>
      <SocialDetails :display-data="artist" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    artist: {
      required: true,
      type: Object,
    },
  },
  // data() {
  //   return {
  //     artists: null,
  //   }
  // },
  // async fetch() {
  //   await this.$axios
  //     .$get('artists', {
  //       params: {},
  //     })
  //     .then((res) => {
  //       this.artists = res.data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },
}
</script>
