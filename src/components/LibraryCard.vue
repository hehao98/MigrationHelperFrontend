<template>
  <div>
    <b-overlay :show="loading" rounded="sm">
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>Library Description:</b></b-col>
        <b-col>{{ info.description }}</b-col>
      </b-row>

      <b-row v-if="info.keywords != ''" class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>Library Keywords:</b></b-col>
        <b-col>{{ info.keywords }}</b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>Maven Central URL:</b></b-col>
        <b-col>
          <b-link :href="mavenCentralUrl" target="_blank">{{
            mavenCentralUrl
          }}</b-link>
        </b-col>
      </b-row>

      <b-row v-if="info.repositoryUrl != ''" class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>Repository URL:</b></b-col>
        <b-col>
          <b-link :href="info.repositoryUrl" target="_blank">{{
            info.repositoryUrl
          }}</b-link>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
</template>

<script>
import { getLibraryAsync } from "@/rest.js";

export default {
  name: "LibraryCard",
  props: ["lib"],
  data: () => ({
    loading: true,
    error: false,
    info: {},
  }),
  computed: {
    mavenCentralUrl: function() {
      return "https://mvnrepository.com/artifact/" + this.lib.replace(":", "/");
    },
  },
  watch: {
    lib: function(newLib) {
      this.getLibrary(newLib);
    },
  },
  created: function() {
    this.getLibrary(this.lib);
  },
  methods: {
    getLibrary(lib) {
      this.loading = true;
      getLibraryAsync(lib).then((res) => {
        if ("error" in res) {
          this.error = true;
          this.info = {};
        } else {
          this.info = res;
          if (this.info.description == "") {
            this.info.description = "No description available for this library";
          }
        }
        this.loading = false;
      });
    },
  },
};
</script>
