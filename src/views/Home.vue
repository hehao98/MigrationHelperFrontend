<template>
  <div id="home" class="home">
    <b-jumbotron>
      <template #header>Migration Advisor</template>
      <template #lead>
        Tell us a Java library you want to replace, we recommend the most suitable migrations
        for you, through an intelligent analysis of existing GitHub repositories.
      </template>
      <hr class="my-4" />
      <b-row class="my-1">
        <b-col sm="9">
          <b-form-input
            id="input-live"
            v-model="fromLib"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Enter the Java library (groupId:artifactId) you want to replace here... (e.g. org.json:json)"
            trim
          ></b-form-input>
        </b-col>
        <b-col sm="3">
          <b-button variant="primary" :to="'search/' + fromLib"
            >Try it out!</b-button
          >
        </b-col>
      </b-row>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    fromLib: "",
  }),
};
</script>
