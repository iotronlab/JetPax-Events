<template>
  <v-container>
    <section v-if="$fetchState.pending">
      <Loading />
    </section>
    <section v-else>
      <v-container fluid class="pa-0">
        <v-img
          :aspect-ratio="$vuetify.breakpoint.smAndUp ? 16 / 2.5 : 16 / 9"
          :src="
            creator.coverimg
              ? creator.coverimg
              : require('@/assets/images/index/landing.webp')
          "
          :lazy-src="require('@/assets/images/index/landing.webp')"
        />

        <!-- <ul v-for="(service, i) in creator.services" :key="i">
          <li>
            {{ service.name }}
          </li>
        </ul> -->

        <v-row no-gutters>
          <v-col cols="12" lg="4" md="4">
            <v-container fluid class="d-flex justify-center">
              <v-avatar size="200" class="mt-n16">
                <v-img
                  :src="
                    creator.avatarimg
                      ? creator.avatarimg
                      : require('@/assets/images/index/landing.webp')
                  "
                ></v-img
              ></v-avatar>
            </v-container>

            <!-- <v-row no-gutters>
                <v-col class="flex-grow-0 flex-shrink-1"
                  ><v-card
                    :img="
                      creator.avatarimg
                        ? creator.avatarimg
                        : require('@/assets/img/default-profile.png')
                    "
                    width="150"
                    height="150"
                    color="accent"
                    class="ml-lg-12 ml-4"
                  ></v-card></v-col
                ><v-col class="flex-grow-1 flex-shrink-0">
                  <v-btn small class="ml-2" color="secondary" @click.prevent=""
                    >Follow</v-btn
                  >
                  <v-container fluid>
                    <h5 class="subtitle-1">{{ creator.display_name }}</h5>
                    <h4 class="subtitle-2">{{ creator.views }} views</h4>

                    <h4 class="subtitle-2">{{ creator.views }} subs</h4>
                  </v-container></v-col
                ></v-row
              > -->
          </v-col>
          <v-col cols="12" lg="4" md="4" order-md="first">
            <v-container fluid class="text-center text-lg-right">
              <Breadcrumb :breadcrumbItems="breadcrumbItems" />
              <h1 class="text-h5">
                <!-- {{ creator.display_name }} -->

                {{ creator.name }}
              </h1>
              <h2 class="overline">@{{ creator.url }}</h2>
              <v-row
                no-gutters
                align="center"
                justify="center"
                justify-lg="end"
                class="mb-4"
              >
                <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mt-2 btn-creator"
                      color="agency"
                      @click.prevent=""
                      v-bind="attrs"
                      v-on="on"
                      rounded
                      dark
                    >
                      <v-icon left>{{ icons.email }}</v-icon
                      >Enquire</v-btn
                    >
                  </template>
                  <CreatorEnquire :enquire="creator.services" />
                </v-dialog>
              </v-row>

              <span class="overline">Categories</span>
              <v-chip
                small
                label
                class="ma-1"
                v-for="(category, i) in creator.categories"
                :key="i"
              >
                {{ category }}</v-chip
              >
              <!-- <v-row
                no-gutters
                align="center"
                justify="center"
                justify-lg="end"
              >
                <v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>{{ icons.facebook }}</v-icon>
                  </v-btn></v-hover
                >
                <v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>{{ icons.whatsapp }}</v-icon>
                  </v-btn></v-hover
                >
                <v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>{{ icons.twitter }}</v-icon>
                  </v-btn> </v-hover
                ><v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>{{ icons.pinterest }}</v-icon>
                  </v-btn> </v-hover
                ><v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="ml-1"
                  >
                    <v-icon>{{ icons.email }}</v-icon>
                  </v-btn>
                </v-hover>
              </v-row> -->
            </v-container>
          </v-col>

          <v-col cols="12" lg="4" md="4">
            <v-container fluid class="px-3">
              <span class="overline">Socials</span>
              <v-chip
                class="ma-1"
                v-for="(social, i) in creator.socials"
                :key="i"
                pill
              >
                <!-- <v-icon left :color="icons[social.type].color">
                    {{ icons[social.type].link }}
                  </v-icon> -->
                <v-avatar left :color="icons[social.type].color">
                  <v-icon dark>
                    {{ icons[social.type].link }}
                  </v-icon>
                </v-avatar>
                <!-- <v-icon left v-if="social.type == 'Instagram'"> mdi-instagram </v-icon> -->
                {{ social.type }}
                {{ formattedFollows(social.followers) }}</v-chip
              >
              <v-row no-gutters align="center" class="mt-2">
                <span class="overline">Languages</span>
                <v-chip
                  small
                  label
                  outlined
                  class="mx-1"
                  v-for="(lang, i) in creator.languages"
                  :key="i"
                >
                  {{ lang }}</v-chip
                ></v-row
              >
              <h5 class="overline creator--text mt-2">About the Creator</h5>
              <h4 class="caption text--secondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quo dolores, earum maiores dolorem quod velit voluptas accusamus
                nostrum minus quaerat dolor totam illum voluptate itaque
                laboriosam distinctio! Asperiores, hic?
                {{
                  creator.bio
                    ? creator.bio
                    : 'This artist has not updated bio yet.'
                }}
              </h4>
            </v-container>
          </v-col>
        </v-row>
        <!-- <MiniProfile :creator="creator" /> --></v-container
      >
      <h1 class="text-h6">{{ creator.name }}'s Services</h1>
      <!-- <v-row no-gutters>
        <v-col
          v-for="(service, i) in creator.services"
          :key="i"
          cols="12"
          lg="3"
          md="6"
          sm="6"
        >
          <v-card class="ma-1" rounded="lg">
            <v-card-title class="text-h5"> {{ service.name }}</v-card-title>

            <v-card-subtitle
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              quo dolores, earum maiores dolorem quod velit voluptas accusamus
              nostrum minus quaerat dolor totam illum voluptate itaque
              laboriosam distinctio! Asperiores, hic?
              <h2 class="text-h6">₹ {{ service.rate }}</h2></v-card-subtitle
            >
          </v-card></v-col
        >
      </v-row> -->
      <CreatorServices :services="creator.services" />
    </section>
  </v-container>
</template>
<script>
import { mdiEmail } from '@mdi/js'
import { mdiWhatsapp } from '@mdi/js'
import { mdiFacebook } from '@mdi/js'
import { mdiInstagram } from '@mdi/js'
import { mdiYoutube } from '@mdi/js'
import { mdiLinkedin } from '@mdi/js'
import { mdiPinterest } from '@mdi/js'
import { mdiTwitter } from '@mdi/js'
import { mdiMenuDown } from '@mdi/js'
import { mdiClose } from '@mdi/js'

export default {
  data() {
    return {
      dialog: false,
      dropdownIcon: mdiMenuDown,
      removeIcon: mdiClose,
      serviceSelect: [],
      creator: null,
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Artists',
          disabled: false,
          to: '/artists',
          exact: true,
        },
        {
          text: this.$route.params.slug,
          disabled: true,
        },
      ],
      icons: {
        email: mdiEmail,
        whatsapp: mdiWhatsapp,
        linkedin: mdiLinkedin,
        pinterest: mdiPinterest,

        Facebook: { link: mdiFacebook, color: '#1877f2' },
        Youtube: { link: mdiYoutube, color: '#FF0000' },
        Instagram: { link: mdiInstagram, color: '#7232bd' },
        Twitter: { link: mdiTwitter, color: '#1DA1F2' },
      },
      socialLinks: [
        { icon: mdiFacebook, url: '' },
        { icon: mdiYoutube, url: '' },
        { icon: mdiInstagram, url: '' },
        { icon: mdiLinkedin, url: 'Privacy Policy' },
      ],
    }
  },

  methods: {
    remove(item) {
      this.serviceSelect.splice(this.serviceSelect.indexOf(item))
      this.serviceSelect = [...this.serviceSelect]
    },
  },

  computed: {
    formattedFollows() {
      return (num) =>
        Math.abs(num) > 999
          ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
          : Math.sign(num) * Math.abs(num)
    },
  },
  async fetch() {
    await this.$axios
      .$get(`artists/${this.$route.params.slug}`)
      .then((res) => {
        this.creator = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },

  // async asyncData({ params, app }) {
  //   let response = await app.$axios.$get(`creator/${params.slug}`)

  //   return {
  //     creator: response.data,
  //   }
  // },
}
</script>
