<template>
  <div class="mt-8 mx-5">
    <h1 class="text-h4">{{ greet }}, Friend!</h1>
    <v-text-field label="Search amazing events" rounded class="mt-4" outlined placeholder="Type"></v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greet: ""
    }
  },
  mounted() {
    const current = new Date()
    // current.setHours(12);
    const currentHours = current.getHours()
    console.log(currentHours)
    if (currentHours > 0 && currentHours < 12)
      this.greet = "Good Morning"

    else if (currentHours >= 12 && currentHours < 18)
      this.greet = "Good Afternoon"

    else
      this.greet = "Good Evening"
  }
}
</script>

