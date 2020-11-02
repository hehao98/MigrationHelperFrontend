<template>
  <div class="search">
    <b-alert v-model="error" variant="danger">
      {{ errorMessage }}
    </b-alert>

    <b-card header-tag="header">
      <template #header>
        Basic Information of Source Library
        <code>{{ $route.params.fromLib }}</code>
      </template>
      <library-card :lib="$route.params.fromLib"></library-card>
    </b-card>

    <hr class="my-4" />

    <h2 style="text-align:center">
      Recommended Migration Targets for <code>{{ $route.params.fromLib }}</code>
    </h2>

    <b-table
      striped
      hover
      responsive
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

      <template #head(rank)="data">
        <span
          v-b-tooltip.hover
          title="The rank of this library by confidence. Correct migration targets are more likely to be in a higher rank. "
          >{{ data.label }}
        </span>
      </template>

      <template #head(targetLibrary)="data">
        <span
          v-b-tooltip.hover
          title="The name (i.e. group ID and artfiact ID) of the target migration library."
          >{{ data.label }}
        </span>
      </template>

      <template #head(confidence)="data">
        <span
          v-b-tooltip.hover
          title="The higher it is, the more possible this target library is a valid and frequently chosen migration target. Range: (0, 1]"
          >{{ data.label }}
        </span>
      </template>

      <template #head(RS)="data">
        <span
          v-b-tooltip.hover
          title="RS stands for Rule Support. It means how frequent the relevant pom.xml changes are. Range: [0, 1]"
          >{{ data.label }}
        </span>
      </template>

      <template #head(MS)="data">
        <span
          v-b-tooltip.hover
          title="MS stands for Message Support. It means how frequent developers states this migration in the commit messages. Range: [0, +∞)"
          >{{ data.label }}
        </span>
      </template>

      <template #head(AS)="data">
        <span
          v-b-tooltip.hover
          title="AS stands for API Support. It means how frequent the relevant API code changes are Range: [0.1, 1]"
          >{{ data.label }}
        </span>
      </template>

      <template #head(DS)="data">
        <span
          v-b-tooltip.hover
          title="DS stands for Distance Support. It means how close each pair of relevant pom.xml changes are. Range: [0, 1]"
          >{{ data.label }}
        </span>
      </template>

      <template #cell(targetLibrary)="row">
        <code>{{ row.value }}</code>
      </template>

      <template #cell(showDetails)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? "Hide" : "Show" }} Details
        </b-button>
      </template>

      <template #row-details="row">
        <migration-target-details
          :row="row"
          :fromLibrary="$route.params.fromLib"
          :toLibrary="row.item.targetLibrary"
        ></migration-target-details>
      </template>
    </b-table>
  </div>
</template>

<script>
import { getRecommendationAsync } from "@/rest.js";
import LibraryCard from "@/components/LibraryCard.vue";
import MigrationTargetDetails from "@/components/MigrationTargetDetails.vue";

export default {
  components: { LibraryCard, MigrationTargetDetails },
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
    maxConfidence: 5.0,
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
          confidence: Math.pow(r.confidence / this.maxConfidence, 0.25),
          RS: r.ruleSupport.toFixed(4),
          MS: r.messageSupport.toFixed(4),
          AS: r.apiSupport.toFixed(4),
          DS: r.distanceSupport.toFixed(4),
          isConfirmed: false,
        };
        if (item.confidence > 1) item.confidence = 1.0;
        item.confidence = item.confidence.toFixed(4);
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
  },
};
</script>
