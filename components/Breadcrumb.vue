<template>
  <div>
    <v-breadcrumbs
      :items="breadcrumbItems"
      divider="/"
      large
      class="justify-center text-caption font-weight-bold"
    ></v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbItems: {
      type: Array,
      required: true,
    },
  },
}
</script>
