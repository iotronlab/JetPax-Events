<template>
  <v-container fluid class="pa-0 glow-red">
    <!-- Nav bar right -->
    <section v-if="$fetchState.pending">
      <h1 class="text-lg-h1 text-h2 text-center">Artists</h1>
      <Loading message="fetching artists..." />
    </section>

    <section v-else>
      <v-row no-gutters justify="center" align="center" class="text-center">
        <v-col cols="12" lg="3" md="3">
          <Breadcrumb :breadcrumb-items="breadcrumbItems"
        /></v-col>
        <v-col cols="12" lg="3" md="3">
          <h1 class="text-lg-h1 text-h2">Artists</h1>
          <v-divider class="my-2"></v-divider>
        </v-col>
        <v-col cols="12" lg="3" md="3">
          <h2 class="text-body-1">
            <v-pagination
              v-model="pageData.current_page"
              :length="pageData.last_page"
              :next-icon="nextArrow"
              :prev-icon="prevArrow"
              @input="updateQuery(pageData.current_page)"
            ></v-pagination>
            showing ({{ pageData.from }} - {{ pageData.to }})
            <span v-if="pageData.total > 1">artists</span>
            <span v-else>artist</span>
          </h2>
          <v-btn class="mt-2" @click.stop="drawer = !drawer">filter</v-btn>
        </v-col>
      </v-row>
      <v-col cols="12" lg="10" class="mx-auto">
        <!-- <h1 class="text-h3 text-center">Our Artists</h1>
        <v-divider class="my-2"></v-divider>
        <v-toolbar class="mb-2" rounded="lg">
          <v-select
            class="mr-2"
            :append-icon="dropdownIcon"
            v-for="(filter, i) in filterMenu"
            :key="i"
            :label="filter.admin_name"
            :items="filter.options"
            item-text="admin_name"
            item-value="admin_name"
            hide-details
            dense
            outlined
            rounded
            small-chips
            multiple
            cache-items
            deletable-chips
        /></v-toolbar>

        <v-row no-gutters
          ><h3 class="text-subtitle-1">Creators</h3>
          <v-spacer /><v-btn @click.stop="drawer = !drawer"
            >filter results</v-btn
          ></v-row
        > -->
        <v-row no-gutters>
          <v-col
            v-for="(creator, i) in creators"
            :key="i"
            cols="12"
            lg="3"
            md="4"
            class="pa-1"
          >
            <NuxtLink
              :to="{
                name: 'artists-slug',
                params: {
                  slug: creator.url,
                },
              }"
            >
              <ArtistsCard :creator="creator" />
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-navigation-drawer v-model="drawer" fixed app temporary right>
        <v-list-item v-for="(filter, i) in filterMenu" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="filter.admin_name" />
            <v-list-item-subtitle>
              <v-select
                :items="filter.options"
                item-text="admin_name"
                item-value="admin_name"
                label="Select"
                return-object
                @change="filterUpdate"
              >
              </v-select>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-btn block color="red" @click="submit"> Filter </v-btn>
        <v-btn class="mt-4" block color="red" @click="reset"> Reset </v-btn>
      </v-navigation-drawer> -->
      <h2 class="text-body-1 text-center mb-6">
        <v-pagination
          v-model="pageData.current_page"
          :length="pageData.last_page"
          :next-icon="nextArrow"
          :prev-icon="prevArrow"
          total-visible="10"
          @input="updateQuery(pageData.current_page)"
        ></v-pagination>
        showing ({{ pageData.from }} - {{ pageData.to }})
        <span v-if="pageData.total > 1">artists</span>
        <span v-else>artist</span>
      </h2>
    </section>
  </v-container>
</template>

<script>
import { mdiMenuDown, mdiArrowRight, mdiArrowLeft } from '@mdi/js'

export default {
  data() {
    return {
      drawer: false,
      filterMenu: {},
      filterParams: {},
      creators: {},
      pageData: {},
      dropdownIcon: mdiMenuDown,
      nextArrow: mdiArrowRight,
      prevArrow: mdiArrowLeft,
      breadcrumbItems: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Artists',
          disabled: true,
        },
      ],
      items: [
        {
          title: 'Language',
          menu: ['English', 'Hindi'],
        },
        {
          title: 'Follower',
          menu: ['More than 100', 'More than 250', 'More than 500'],
        },
        {
          title: 'Social',
          menu: ['Facebook', 'Instagram', 'Twitter'],
        },
        {
          title: 'Category',
          menu: ['Health and Fitness', 'Beauty and Cosmetics', 'Travel'],
        },
      ],
    }
  },
  async fetch() {
    await this.$axios
      .$get('artists', { params: this.$route.query })
      .then((res) => {
        this.creators = res.data
        this.pageData = res.meta
      })
      .catch((err) => {
        console.log(err)
      })

    // await this.$axios
    //   .$get('filter')
    //   .then((ress) => {
    //     this.filterMenu = ress.data
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  },
  head() {
    return {
      title: 'Artists',
      // meta: [
      //   // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      //   {
      //     hid: 'description',
      //     name: 'description',
      //     content: 'My custom description',
      //   },
      // ],
    }
  },
  watch: {
    '$route.query': '$fetch',
  },
  methods: {
    async submit() {
      await this.$axios
        .$get('creator', {
          params: this.filterParams,
        })
        .then((res) => {
          this.$router.push({ query: this.filterParams })
          this.creators = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    filterUpdate(data) {
      this.filterParams[data.filter_code] = data.admin_name
      // this.$router.push({ query: this.filterParams })
    },

    reset() {
      this.filterParams = {}
      this.$router.push({ query: this.filterParams })
      this.$fetch()
    },
    updateQuery(data) {
      this.$router.push({ query: { page: data } })
    },
  },
}
</script>

