<template>
  <v-container>
    <div v-if="!formSubmitted" class="pa-1">
      <validation-observer ref="observer">
        <v-col cols="12" class="mx-auto card-glass rounded-xl">
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
              label="Are you a business or person?"
              outlined
            ></v-select>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="Business Link(optional)"
          >
            <v-text-field
              v-model="form.business_link"
              outlined
              hint="link to social media page or website"
              label="Business Link"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Referrer">
            <v-text-field
              v-model="form.referrer"
              outlined
              hint="link to social media page or website"
              label="Referrer"
              :error-messages="errors"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Query"
            rules="required"
          >
            <v-textarea
              v-model="form.query"
              outlined
              hint="Describe your query in summary"
              label="Query"
              :error-messages="errors"
            ></v-textarea>
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
      <v-alert v-if="message" type="success" outlined :icon="icons.check">
        {{ message }}
      </v-alert>
    </div>
  </v-container>
</template>


<script>
import { mdiCheckDecagram } from '@mdi/js'
export default {
  data: () => ({
    form: {
      name: null,
      location: null,
      email: null,
      contact: null,
      category: null,
      business_link: null,
      referrer: null,
      query: null,
    },
    icons: {
      check: mdiCheckDecagram,
    },
    categoryOptions: ['Personal', 'Business'],

    message: null,
    formSubmitted: false,
  }),

  methods: {
    async submit() {
      if (await this.$refs.observer.validate()) {
        await this.$axios
          .$post('forms/contact', this.form)
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

