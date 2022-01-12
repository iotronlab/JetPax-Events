<template>
  <v-container>
    <section v-if="gallery.length > 0">
      <v-row no-gutters>
        <v-col
          v-for="(image, i) in galleryGrid"
          :key="i"
          cols="12"
          sm="4"
          lg="6"
          class="pa-1"
        >
          <v-img :src="image.url" height="400" @click="openSlider(i)" />
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" fullscreen>
        <v-carousel
          v-model="activeImage"
          hide-delimiters
          height="100%"
          class="card-glass"
        >
          <v-row no-gutters class="px-1 mt-1">
            <p class="mx-auto">
              showing {{ activeImage + 1 }} of {{ gallery.length }}
            </p>

            <v-btn fab small color="accent" @click="dialog = false">
              <v-icon>{{ icons.cross }}</v-icon>
            </v-btn></v-row
          >

          <template #prev="{ on, attrs }">
            <v-icon v-bind="attrs" large v-on="on">{{ icons.left }}</v-icon>
          </template>
          <template #next="{ on, attrs }">
            <v-icon v-bind="attrs" large v-on="on">{{ icons.right }}</v-icon>
          </template>
          <v-carousel-item
            v-for="(slide, i) in gallery"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-img :src="slide.url" contain height="90%" />
          </v-carousel-item>
        </v-carousel>
      </v-dialog>
    </section>
    <section v-else>
      <h2 class="text-subtitle-2 text-center">No images to display.</h2>
    </section>
  </v-container>
</template>

<script>
import { mdiClose, mdiChevronDoubleRight, mdiChevronDoubleLeft } from '@mdi/js'

export default {
  props: {
    gallery: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      dialog: false,
      icons: {
        cross: mdiClose,
        right: mdiChevronDoubleRight,
        left: mdiChevronDoubleLeft,
      },
      activeImage: null,
    }
  },
  computed: {
    galleryGrid() {
      return this.gallery.slice(0, 4)
    },
  },
  methods: {
    openSlider(i) {
      this.activeImage = i
      this.dialog = true
    },
  },
}
</script>

