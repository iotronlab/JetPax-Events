<template>
  <div>
    <v-btn text @click.stop="citySelect = true">
      <v-icon left>{{ icons.location }}</v-icon
      >{{ citySelection ? citySelection : "select" }}
    </v-btn>
    <v-dialog
      v-model="citySelect"
      :persistent="citySelection === null ? true : false"
      overlay-opacity="0.9"
      max-width="900"
    >
      <v-card class="card-glass">
        <v-card-title>Select your city</v-card-title>
        <v-card-text>Let's find amazing experiences at your location.</v-card-text>
        <v-autocomplete
          v-model="citySelection"
          outlined
          :items="cities"
          item-text="name"
          label="Search all cities"
          class="ma-4"
          item-value="url"
          :prepend-icon="icons.location"
          @input="redirectToCity"
        ></v-autocomplete>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn outlined text to="/web" @click.stop="citySelect = false">
            <v-icon color="success" left>{{ icons.online }}</v-icon> browse Web Events
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiMapMarkerRadius, mdiCircleDouble } from "@mdi/js";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      citySelect: false,
      citySelection: null,
      icons: {
        location: mdiMapMarkerRadius,
        online: mdiCircleDouble,
      },
    };
  },
  computed: {
    ...mapGetters({
      defaultCity: "defaultCity",
      cities: "cities",
    }),
  },
  watch: {
    defaultCity(oldVal, newVal) {
      //   this.setCity(this.citySelection);
      //   this.citySelect = false;
      //   // this.RedirectCity()
      this.citySelection = this.defaultCity;
      // console.log(this.$route.path === '/');
      if (this.$route.path === "/") {
        this.$router.push(`/${this.citySelection}`);
      }
      //
    },
  },

  mounted() {
    if (
      this.defaultCity !== null
      //   && this.cities.length > 0
    ) {
      //   const city = this.cities.find((element) => element.url === this.defaultCity);
      this.citySelection = this.defaultCity;
      // city !== undefined ? city.url : null;
    } else {
      // this.askForLocation();
    }
  },

  methods: {
    ...mapActions(["setCity", "getCities"]),
    redirectToCity() {
      if (this.citySelection !== null) {
        // this.$router.push(`/${this.citySelection}`);
        this.citySelect = false;
        console.log(this.citySelection);
        this.setCity(this.citySelection);

        this.$router.push(`/${this.citySelection}`);
      }
    },
  },
};
</script>
