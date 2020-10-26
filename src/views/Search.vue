<template>
  <div class="search">
    <b-alert v-model="error" variant="danger">
      {{ errorMessage }}
    </b-alert>

    <b-card
      :header="'Source Library: ' + $route.params.fromLib"
      header-tag="header"
    >
      <b-card-text>Header and footers using props.</b-card-text>
    </b-card>

    <hr class="my-4" />

    <b-table
      striped
      hover
      :items="tableContents"
      :fields="tableFields"
      :busy="loading"
    >
      <template #table-busy>
        <div class="text-center text-info my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading Recommendation Results...</strong>
        </div>
      </template>

      <template #cell(showDetails)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Library Description:</b></b-col
            >
            <b-col>{{ row.item.RS }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Maven Central:</b></b-col>
            <b-col>{{ row.item.DS }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"
              ><b>Library Repository:</b></b-col
            >
            <b-col>{{ row.item.DS }}</b-col>
          </b-row>

          <hr class="my-4" />

          <b-row class="mb-2">
            <b-col>
              <b-table
                striped
                hover
                :items="row.item.refs"
                :fields="['repoName', 'startCommit', 'endCommit', 'fileName']"
              >
                <template #cell(repoName)="data">
                  <b-link :href="getGitHubRepoLink(data.value)" target="_blank">
                    {{ data.value.replace("_", "/") }}
                  </b-link>
                </template>
                <template #cell(startCommit)="data">
                  <b-link
                    :href="getGitHubCommitLink(data.item.repoName, data.value)"
                    target="_blank"
                  >
                    <code>{{ data.value.substr(33, 7) }}</code>
                  </b-link>
                </template>
                <template #cell(endCommit)="data">
                  <b-link
                    :href="getGitHubCommitLink(data.item.repoName, data.value)"
                    target="_blank"
                  >
                    <code>{{ data.value.substr(33, 7) }}</code>
                  </b-link>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
import { getRecommendationAsync } from "@/rest.js";

export default {
  data: () => ({
    loading: false,
    error: false,
    errorMessage: "",
    page: 0,
    size: 20,
    results: [],
    totalPages: 0,
    totalElements: 0,
    fromLibInfo: {},
    tableFields: [
      "rank",
      "targetLibrary",
      "confidence",
      "RS",
      "MS",
      "AS",
      "DS",
      "showDetails",
    ],
  }),
  watch: {
    $route(to, from) {
      if (to.path == from.path) return;
      this.getRecommendation(this.$route.params.fromLib, this.page, this.size);
    },
  },
  computed: {
    tableContents: function() {
      let c = [];
      let rank = this.page * this.size + 1;
      for (let r of this.results) {
        let item = {
          rank: rank++,
          targetLibrary: r.toLib,
          confidence: r.confidence.toFixed(4),
          RS: r.ruleSupport.toFixed(4),
          MS: r.messageSupport.toFixed(4),
          AS: r.apiSupport.toFixed(4),
          DS: r.distanceSupport.toFixed(4),
          refs: r.refs,
          isConfirmed: false,
        };
        c.push(item);
      }
      return c;
    },
  },
  created: function() {
    this.getRecommendation(this.$route.params.fromLib, this.page, this.size);
  },
  methods: {
    getRecommendation(fromLib, page, size) {
      this.loading = true;
      getRecommendationAsync(fromLib, page, size).then((rec) => {
        if ("_embedded" in rec) {
          // No Error
          this.error = false;
          this.results = rec._embedded.migrationRecommendations;
          this.totalPages = rec.page.totalPages;
          this.totalElements = rec.page.totalElements;
        } else {
          this.error = true;
          this.errorMessage = rec.error + ": " + rec.message;
        }
        this.loading = false;
      });
    },
    getGitHubRepoLink(repoName) {
      return "https://github.com/" + repoName.replace("_", "/");
    },
    getGitHubCommitLink(repoName, commit) {
      return (
        "https://github.com/" + repoName.replace("_", "/") + "/commit/" + commit
      );
    },
  },
};
</script>
