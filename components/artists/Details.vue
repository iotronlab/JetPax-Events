<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-img
        :src="
          artist.displayImage.url
            ? artist.displayImage.url
            : 'https://via.placeholder.com/150/000000/FFFFFF/?text=Member'
        "
      ></v-img>
    </v-col>
    <v-col cols="12" class="pa-2">
      <h3 class="primary--text">{{ artist.name }}</h3>

      <p
        style="
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box !important;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        "
        class="pt-2 caption"
        v-html="artist.desc"
      ></p>
      <v-btn
        v-if="artist.status"
        small
        outlined
        class="mb-2"
        color="secondary"
        :to="{
          name: 'artists-slug',
          params: {
            slug: artist.url,
          },
        }"
        >view artist</v-btn
      >
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
