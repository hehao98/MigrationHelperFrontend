<template>
  <b-card>
    <library-card :lib="row.item.targetLibrary"></library-card>

    <hr class="my-4" />

    <h4>
      Possible Migrations from <code>{{ fromLibrary }}</code> to
      <code>{{ row.item.targetLibrary }}</code>
    </h4>

    <b-pagination
      v-model="currentPage"
      :total-rows="row.item.refs.length"
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
      :items="row.item.refs"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="fields"
    >
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

export default {
  props: ["fromLibrary", "row"],
  components: { LibraryCard },
  data: () => ({
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
  methods: {
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
