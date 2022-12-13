<template>
  <v-container fluid class="glow-pink">
    <!-- Nav bar right -->
    <section v-if="$fetchState.pending">
      <h1 class="text-lg-h2 text-h3 text-center">Artists</h1>
      <Loading message="fetching artists..." />
    </section>
    <section v-else-if="errorMessage != null">
      <LazyFetchError />
    </section>
    <section v-else>
      <v-row no-gutters justify="center" align="center" class="text-center">
        <v-col cols="12" lg="3" md="3">
          <Breadcrumb :breadcrumb-items="breadcrumbItems" />
        </v-col>
        <v-col cols="12" lg="3" md="3">
          <h1 class="text-lg-h2 text-h3 text-center">Artists</h1>
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
        </v-col>
      </v-row>
      <v-col cols="12" lg="10" class="mx-auto pa-0">
        <v-row no-gutters>
          <v-col
            v-for="(creator, i) in creators"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            class="pa-2"
          >
            <NuxtLink
              :to="{
                name: 'slug-artist',
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
      <h2 class="text-body-1 text-center my-5">
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
import { mdiMenuDown, mdiArrowRight, mdiArrowLeft } from "@mdi/js";

export default {
  data() {
    return {
      drawer: false,
      filterMenu: {},
      filterParams: {},
      creators: {},
      pageData: {},
      errorMessage: null,
      dropdownIcon: mdiMenuDown,
      nextArrow: mdiArrowRight,
      prevArrow: mdiArrowLeft,
      breadcrumbItems: [
        {
          text: "Home",
          disabled: false,
          to: "/",
        },
        {
          text: "Artists",
          disabled: true,
        },
      ],
      items: [
        {
          title: "Language",
          menu: ["English", "Hindi"],
        },
        {
          title: "Follower",
          menu: ["More than 100", "More than 250", "More than 500"],
        },
        {
          title: "Social",
          menu: ["Facebook", "Instagram", "Twitter"],
        },
        {
          title: "Category",
          menu: ["Health and Fitness", "Beauty and Cosmetics", "Travel"],
        },
      ],
    };
  },
  async fetch() {
    await this.$axios
      .$get("artists", { params: this.$route.query })
      .then((res) => {
        this.creators = res.data;
        this.pageData = res.meta;
      })
      .catch((err) => {
        this.errorMessage = err;
        this.$sentry.captureException(new Error(err));
      });
  },
  head() {
    return {
      title: "Artists",
    };
  },
  watch: {
    "$route.query": "$fetch",
  },
  methods: {
    async submit() {
      await this.$axios
        .$get("creator", {
          params: this.filterParams,
        })
        .then((res) => {
          this.$router.push({ query: this.filterParams });
          this.creators = res.data;
        })
        .catch((err) => {
          this.$sentry.captureException(new Error(err));
        });
    },

    filterUpdate(data) {
      this.filterParams[data.filter_code] = data.admin_name;
      // this.$router.push({ query: this.filterParams })
    },

    reset() {
      this.filterParams = {};
      this.$router.push({ query: this.filterParams });
      this.$fetch();
    },
    updateQuery(data) {
      this.$router.push({ query: { page: data } });
    },
  },
};
</script>
