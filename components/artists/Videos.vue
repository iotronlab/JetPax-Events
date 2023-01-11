<template>
  <v-container fluid class="pa-0">
    <section v-if="videos.length > 0">
      <v-row no-gutters justify="center">
        <v-col
          v-for="(video, i) in videos"
          :key="i"
          cols="12"
          lg="5"
          class="pa-2"
        >
          <iframe
            id="ytplayer"
            type="text/html"
            :src="video.url + '?modestbranding'"
            width="100%"
            :height="$vuetify.breakpoint.smAndDown ? 360 : 480"
            frameborder="0"
          ></iframe
        ></v-col>
      </v-row>
    </section>
    <section v-else>
      <h2 class="text-subtitle-2 text-center">No videos to display.</h2>
    </section>
  </v-container>
</template>

<script>
export default {
  props: {
    videos: {
      type: Array,
      required: true,
    },
  },
}
</script>
