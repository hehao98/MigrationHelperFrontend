<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MigrationRecEntry rec="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import MigrationRecEntry from "@/components/MigrationRecEntry.vue";

export default {
  name: "App",
  components: {
    MigrationRecEntry,
  },
  data: () => ({
    fromLib: "org.json:json",
  }),
};
</script>
