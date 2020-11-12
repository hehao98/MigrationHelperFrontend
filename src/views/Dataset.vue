<template>
  <div class="dataset">
    <h1>Confirmed Java Library Migrations on GitHub</h1>

    <b-button v-on:click="initVisData()"
      >Visualize Now<span v-if="migrations.length != totalElements">
        (Still Incomplete)</span
      ></b-button
    >
    <b-progress :max="totalElements" height="2rem">
      <b-progress-bar :value="migrations.length">
        <span
          >Progress:
          <strong
            >{{ ((migrations.length / totalElements) * 100).toFixed(2) }}% ({{
              migrations.length
            }}
            / {{ totalElements }}) loaded.</strong
          ></span
        >
      </b-progress-bar>
    </b-progress>

    <hr class="my-4" />

    <b-card no-body>
      <b-tabs>
        <b-tab title="Migration Graphs" active>
          <b-tabs card pills vertical>
            <b-tab
              v-for="(subgraph, index) in connectedSubGraphs"
              :key="index"
              :title="'Cluster ' + index + ' (' + subgraph.length + ' Libs)'"
              active
              ><b-card-text>{{ subgraph }}</b-card-text></b-tab
            >
          </b-tabs>
        </b-tab>
        <b-tab title="Migration Data Table"> </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { getConfirmedMigrations } from "@/rest.js";

export default {
  data: () => ({
    migrations: [],
    id2arrayIndex: {},
    migrationGraph: {},
    connectedSubGraphs: [],
    batchSize: 300,
    totalElements: 14334,
    totalPages: 0,
  }),
  computed: {},
  created: function() {
    getConfirmedMigrations(0, this.batchSize).then((payload) => {
      this.totalElements = payload.page.totalElements;
      this.totalPages = payload.page.totalPages;
      this.migrations.push(...payload._embedded.wocConfirmedMigrations);
      for (let i = 1; i < this.totalPages; ++i) {
        getConfirmedMigrations(i, this.batchSize).then((payload2) => {
          this.migrations.push(...payload2._embedded.wocConfirmedMigrations);
          if (this.migrations.length >= this.totalElements) {
            this.initVisData();
          }
        });
      }
    });
  },
  methods: {
    initVisData() {
      // Make an id2arrayIndex map
      for (let i = 0; i < this.migrations.length; ++i) {
        this.id2arrayIndex[this.migrations[i].id] = i;
      }

      // Make the migration graph (as an adjacency list)
      for (let i = 0; i < this.migrations.length; ++i) {
        let mig = this.migrations[i];
        if (!(mig.fromLib in this.migrationGraph)) {
          this.migrationGraph[mig.fromLib] = {
            toLibs: [mig.toLib],
            fromLibs: [],
            migrations: [i], // Only migrations from fromLib to toLibs
          };
        } else {
          this.migrationGraph[mig.fromLib].migrations.push(i);
          if (this.migrationGraph[mig.fromLib].toLibs.indexOf(mig.toLib) === -1) {
            this.migrationGraph[mig.fromLib].toLibs.push(mig.toLib);
          }
        }
      }
      // Fill in reverse relationships (toLib to fromLib)
      for (let fromLib in this.migrationGraph) {
        let node = this.migrationGraph[fromLib];
        for (let toLib of node.toLibs) {
          if (!(toLib in this.migrationGraph)) {
            this.migrationGraph[toLib] = {
              toLibs: [],
              fromLibs: [fromLib],
              migrations: [],
            };
          } else {
            this.migrationGraph[toLib].fromLibs.push(fromLib);
          }
        }
      }

      // Compute connected subgraphs
      let nodes = new Set(Object.keys(this.migrationGraph));
      while (nodes.size > 0) {
        let key = nodes.keys().next().value;
        let currSubgraph = new Set();
        let toVisit = [];
        toVisit.push(key);
        while (toVisit.length > 0) {
          let curr = toVisit.pop();
          currSubgraph.add(curr);
          for (let toLib of this.migrationGraph[curr].toLibs) {
            if (!currSubgraph.has(toLib)) toVisit.push(toLib);
          }
          for (let fromLib of this.migrationGraph[curr].fromLibs) {
            if (!currSubgraph.has(fromLib)) toVisit.push(fromLib);
          }
        }
        for (let lib of currSubgraph) {
          nodes.delete(lib);
        }
        this.connectedSubGraphs.push(Array.from(currSubgraph));
      }
    },
  },
};
</script>
