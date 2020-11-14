<template>
  <b-card>
    <b-overlay :show="loading" rounded="sm">
      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"
          ><b><span v-if="startCommit.id !== endCommit.id">Start </span>Commit Link:</b></b-col
        >
        <b-col style="white-space: pre-wrap;"
          ><b-link :href="getGitHubCommitURL(startCommit.id)" target="_blank">{{
            getGitHubCommitURL(startCommit.id)
          }}</b-link></b-col
        >
      </b-row>

      <b-row class="mb-2" v-if="startCommit.id !== endCommit.id">
        <b-col sm="3" class="text-sm-right"><b>End Commit Link:</b></b-col>
        <b-col style="white-space: pre-wrap;"
          ><b-link :href="getGitHubCommitURL(endCommit.id)" target="_blank">{{
            getGitHubCommitURL(endCommit.id)
          }}</b-link></b-col
        >
      </b-row>

      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"
          ><b><span v-if="startCommit.id !== endCommit.id">Start </span>Commit Message:</b></b-col
        >
        <b-col style="white-space: pre-wrap;"
          ><span>{{ startCommit.message }}</span></b-col
        >
      </b-row>

      <b-row v-if="startCommit.id !== endCommit.id" class="mb-2">
        <b-col sm="3" class="text-sm-right"><b>End Commit Message:</b></b-col>
        <b-col style="white-space: pre-wrap;">{{ endCommit.message }}</b-col>
      </b-row>

      <b-row class="mb-2">
        <b-col sm="3" class="text-sm-right"
          ><b>
            <span v-if="startCommit.id !== endCommit.id">Start </span>Commit Changed Files:</b
          ></b-col
        >
        <b-col style="white-space: pre-wrap;">
          <span v-for="(item, index) of limitArray(startCommit.diffs, 20)" :key="index"
            ><code>{{ item.filename }}</code
            ><br
          /></span>
          <span v-if="startCommit.diffs.length > 20"
            >...and {{ startCommit.diffs.length - 20 }} more file changed.</span
          ><br />
        </b-col>
      </b-row>

      <b-row class="mb-2" v-if="startCommit.id !== endCommit.id">
        <b-col sm="3" class="text-sm-right"><b> End Commit Changed Files:</b></b-col>
        <b-col style="white-space: pre-wrap;">
          <span v-for="(item, index) of limitArray(endCommit.diffs, 20)" :key="index"
            ><code>{{ item.filename }}</code
            ><br
          /></span>
          <span v-if="endCommit.diffs.length > 20"
            >...and {{ endCommit.diffs.length - 20 }} more file changed.</span
          ><br />
        </b-col>
      </b-row>
    </b-overlay>
  </b-card>
</template>

<script>
import { getCommitAsync } from "@/rest.js";

export default {
  props: ["row"],
  data: () => ({
    startCommit: {diffs: []},
    endCommit: {diffs: []},
    loading: false,
  }),
  mounted: function() {
    this.getCommits();
  },
  methods: {
    getCommits() {
      this.loading = true;
      let startCommitSHA = this.row.item.startCommit;
      let endCommitSHA = this.row.item.endCommit;
      getCommitAsync(startCommitSHA).then((payload) => {
        this.startCommit = payload[0];
        getCommitAsync(endCommitSHA).then((payload) => {
          this.endCommit = payload[0];
          this.loading = false;
        });
      });
    },
    getGitHubCommitURL(commitSHA) {
      let owner = this.row.item.repoName.split("_")[0];
      let repo = this.row.item.repoName.split("_")[1];
      return "https://github.com/" + owner + "/" + repo + "/commit/" + commitSHA;
    },
    limitArray(a, n) {
      if (!a) return;
      if (a.length >= n) {
        return a.slice(0, 20);
      } else {
        return a;
      }
    },
  },
};
</script>
