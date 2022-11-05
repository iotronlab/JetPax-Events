<template>
  <div class="mx-16 mt-16">
    <h3>{{greet}}, User</h3>
    <v-text-field  label="Search amazing events" class="mt-4" outlined placeholder="Type"></v-text-field>
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
    if (currentHours>0 && currentHours < 12)
      this.greet = "Good Morning"

    else if (currentHours>=12 && currentHours < 18)
      this.greet = "Good Afternoon"

    else 
      this.greet = "Good Evening"
}
}
</script>

