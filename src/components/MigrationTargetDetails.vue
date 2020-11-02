<template>
  <b-card>
    <library-card :lib="row.item.targetLibrary"></library-card>

    <hr class="my-4" />

    <h4>
      Possible Migrations from <code>{{ fromLibrary }}</code> to
      <code>{{ toLibrary }}</code>
    </h4>

    <b-pagination
      v-model="currentPage"
      :total-rows="refs.length"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      first-number
      last-number
    ></b-pagination>

    <b-table
      striped
      hover
      responsive
      :items="refs"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
      :busy="loading"
    >
      <template #head(confirmed)="data">
        <span
          v-b-tooltip.hover
          title="Whether this commit is manually confirmed by us as a migration."
          >{{ data.label }}
        </span>
      </template>
      <template #head(repoName)="data">
        <span
          v-b-tooltip.hover
          :title="
            'The GitHub repository name where a migration from ' +
              fromLibrary +
              ' to ' +
              toLibrary +
              ' happened.'
          "
          >{{ data.label }}
        </span>
      </template>
      <template #head(startCommit)="data">
        <span
          v-b-tooltip.hover
          :title="'The commit where ' + toLibrary + ' is added in pom.xml'"
          >{{ data.label }}
        </span>
      </template>
      <template #head(endCommit)="data">
        <span
          v-b-tooltip.hover
          :title="'The commit where ' + fromLibrary + ' is removed in pom.xml'"
          >{{ data.label }}
        </span>
      </template>
      <template #head(fileName)="data">
        <span
          v-b-tooltip.hover
          title="The path of pom.xml in this migration"
          >{{ data.label }}
        </span>
      </template>
      <template #table-busy>
        <div class="text-center text-info my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading Migration Commits...</strong>
        </div>
      </template>
      <template #cell(confirmed)="data">
        <b-badge :variant="data.value ? 'success' : 'secondary'">{{
          data.value ? "Confirmed" : "Unknown"
        }}</b-badge>
      </template>
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
  </b-card>
</template>

<script>
import LibraryCard from "@/components/LibraryCard.vue";
import { getRecommendationOneAync } from "@/rest.js";

export default {
  props: ["fromLibrary", "toLibrary", "row"],
  components: { LibraryCard },
  data: () => ({
    loading: true,
    refs: [],
    currentPage: 1,
    perPage: 10,
    fields: [
      { key: "confirmed", sortable: true },
      { key: "repoName", sortable: true },
      { key: "startCommit", sortable: true },
      { key: "endCommit", sortable: true },
      "fileName",
    ],
  }),
  created: function() {
    this.updateTable();
  },
  watch: {
    fromLibrary: function() {
      this.updateTable();
    },
    toLibrary: function() {
      this.updateTable();
    },
  },
  methods: {
    getGitHubRepoLink(repoName) {
      return "https://github.com/" + repoName.replace("_", "/");
    },
    getGitHubCommitLink(repoName, commit) {
      return (
        "https://github.com/" + repoName.replace("_", "/") + "/commit/" + commit
      );
    },
    updateTable() {
      this.loading = true;
      getRecommendationOneAync(this.fromLibrary, this.toLibrary).then(
        (result) => {
          this.refs = result.refs;
          this.loading = false;
        }
      );
    },
  },
};
</script>
