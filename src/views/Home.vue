<template>
  <div id="home" class="home">
    <b-jumbotron>
    <template #header>Migration Advisor</template>

    <template #lead>
      Through an intelligent analysis of existing GitHub repositories, 
        we recommend the most suitable library migrations for you.
    </template>
      <hr class="my-4">
      <b-button variant="primary" href="#">Try it out!</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    fromLib: "org.json:json",
  }),
};
</script>
