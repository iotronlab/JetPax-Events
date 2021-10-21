<template>
  <v-container fluid class="text-center">
    <v-progress-circular
      indeterminate
      size="64"
      color="primary"
    ></v-progress-circular
    ><br /><br />
    {{ message || 'Loading data...' }}
  </v-container>
</template>

<script>
export default {
  props: {
    message: { type: String, required: false },
  },
}
</script>
