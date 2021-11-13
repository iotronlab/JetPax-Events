<template>
  <v-container fluid class="pa-0 glow-purple">
    <h1 class="text-h2 text-center mt-2 mb-6">Join Our Network</h1>
    <div v-if="!formSubmitted" class="pa-1">
      <validation-observer ref="observer">
        <v-col cols="12" lg="8" class="mx-auto card-glass rounded-xl">
          <validation-provider
            v-slot="{ errors }"
            name="Full Name"
            rules="required"
          >
            <v-text-field
              v-model="form.name"
              outlined
              hint="Enter your full name"
              label="Full Name"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Email"
            rules="required|email"
          >
            <v-text-field
              v-model="form.email"
              outlined
              hint="Enter your email"
              label="Email"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Mobile Number"
            rules="required|digits:10"
          >
            <v-text-field
              v-model="form.contact"
              counter
              outlined
              maxlength="10"
              type="number"
              prefix="+91"
              hint="Enter your contact number"
              label="Mobile Number"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Location"
            rules="required"
          >
            <v-text-field
              v-model="form.location"
              outlined
              hint="Enter Location"
              label="Location"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Category"
            rules="required"
          >
            <v-select
              v-model="form.category"
              :items="categoryOptions"
              :error-messages="errors"
              label="Category"
              outlined
            ></v-select>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Genres"
            rules="required"
          >
            <v-combobox
              v-model="form.genres"
              :items="genreOptions"
              item-text="name"
              item-value="name"
              :search-input.sync="search"
              hide-selected
              hint="select or add your own"
              label="Genres"
              multiple
              outlined
              persistent-hint
              small-chips
              :error-messages="errors"
            >
              <template #no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results for "<strong>{{ search }}</strong
                      >". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Languages"
            rules="required"
          >
            <v-combobox
              v-model="form.languages"
              :items="languageOptions"
              item-text="name"
              item-value="name"
              :search-input.sync="search"
              hide-selected
              hint="select or add your own"
              label="Languages"
              multiple
              outlined
              persistent-hint
              small-chips
              :error-messages="errors"
            >
              <template #no-data>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      No results for "<strong>{{ search }}</strong
                      >". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-combobox></validation-provider
          >
          <validation-provider
            v-slot="{ errors }"
            name="Video Link"
            rules="required"
          >
            <v-text-field
              v-model="form.video_link"
              outlined
              hint="Enter your Video Link"
              label="Video Link"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Profile Link"
            rules="required"
          >
            <v-text-field
              v-model="form.profile_link"
              outlined
              hint="Enter your Profile Link"
              label="Profile Link"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>

          <v-btn block color="primary" class="mb-2" @click="submit"
            >Submit</v-btn
          >
          <v-alert v-if="message" type="error">
            {{ message }}
          </v-alert>
        </v-col></validation-observer
      >
    </div>
    <div v-else class="ma-2">
      <v-alert v-if="message" type="success" outlined>
        {{ message }}
      </v-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: null,
      name: null,
      contact: null,
      location: null,
      category: null,
      genres: null,
      languages: null,
      video_link: null,
      profile_link: null,
    },
    genreOptions: [],
    languageOptions: [],
    categoryOptions: ['Solo', 'Duo/Trio', 'Band/Musicians'],
    agreeTerms: false,
    search: null,
    message: null,
    formSubmitted: false,
  }),
  async fetch() {
    await this.$axios
      .$get('filters')
      .then((res) => {
        this.genreOptions = res.data.Genres
        this.languageOptions = res.data.Languages
      })
      .catch((err) => {
        this.$sentry.captureException(new Error(err))
      })
  },
  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        await this.$axios
          .$post('forms/artist', this.form)
          .then((res) => {
            this.message = res.message
            this.formSubmitted = true
          })
          .catch((err) => {
            this.message = err.response.data.message
            this.$sentry.captureException(new Error(err))
          })
      }
    },
  },
}
</script>

