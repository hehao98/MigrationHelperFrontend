<template>
  <div class="search">
    <h1>This is an search page</h1>
    <p>Source Library: {{ $route.params.fromLib }}</p>
    <p>Recommendation Results: {{ results }}</p>
  </div>
</template>

<script>
import { getRecommendation } from "@/rest.js";

export default {
  data: () => ({
    page: 0,
    size: 20,
    results: {},
  }),
  watch: {
    $route(to, from) {
      if (to.path == from.path) return;
      getRecommendation(to, this.page, this.size).then((rec) => {
        this.results = rec;
      });
    },
  },
  created: function() {
    getRecommendation(this.$route.params.fromLib, this.page, this.size).then(
      (rec) => {
        this.results = rec;
      }
    );
  },
};
</script>
