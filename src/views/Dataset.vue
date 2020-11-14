<template>
  <div class="dataset">
    <b-alert show variant="warning"
      >Currently this page is suffering from performance issues. We are sorry for the freezes and
      low frame rates.</b-alert
    >

    <h2 class="center">Overview of Our Confirmed Migration Dataset</h2>

    <p>
      In this page, we demonstrate the migration dataset we manually confirmed in our paper.
      <br />
      We not only show some interesting statistics, but also show a migration graph as proposed in
      <b-link target="_blank" href="https://doi.org/10.1109/WCRE.2012.38">this paper</b-link>.
      <br />
      See the <b-link to="about/">About</b-link> page for where to download the relevant dataset.
    </p>
    <hr class="my-4" />

    <span class="text-center">The data will take some time to load, so please be patient...</span>
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

    <b-card-group class="my-4">
      <b-card><animated-number :number="rules.size" /><br />Migration Rules</b-card>
      <b-card><animated-number :number="repositories.size" /><br />Repositories</b-card>
      <b-card><animated-number :number="commits.size" /><br />Commits</b-card>
      <b-card
        ><animated-number :number="migrations.length" /><br /><code>pom.xml</code> Changes</b-card
      >
    </b-card-group>

    <b-card-group class="my-4">
      <b-card> <v-chart class="chart-in-card" :options="echartTimeOptions"></v-chart></b-card>
      <b-card> <v-chart class="chart-in-card" :options="echartMigrationOptions"></v-chart></b-card>
    </b-card-group>
    <b-card-group class="my-4">
      <b-card>
        <v-chart class="chart-in-card" :options="echartSourceLibraryOptions"></v-chart
      ></b-card>
      <b-card
        ><v-chart class="chart-in-card" :options="echartTargetLibraryOptions"></v-chart
      ></b-card>
    </b-card-group>

    <hr class="my-4" />

    <b-button v-on:click="initGraphData()" class="m-1" variant="info"
      >Visualize Migration Graph Now<span v-if="migrations.length != totalElements">
        (Still Loading)</span
      ></b-button
    >

    <b-card no-body>
      <b-tabs card pills vertical>
        <b-tab
          v-for="(subgraph, index) in connectedSubGraphs"
          :key="index"
          :title="'Cluster ' + index + ' (' + subgraph.length + ' Libs)'"
          active
          @click="handleTabSelect(index)"
        >
          <b-card class="center">
            <b-aspect aspect="1:1">
              <v-chart
                class="graph-chart"
                :options="index === currentEchartIndex ? echartGraphOptions : {}"
              ></v-chart></b-aspect
          ></b-card>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { getConfirmedMigrations } from "@/rest.js";
import AnimatedNumber from "@/components/AnimatedNumber.vue";
import SortedMap from "collections/sorted-map";

export default {
  components: { AnimatedNumber },
  data: () => ({
    commits: new Set(),
    rules: new Set(),
    repositories: new Set(),
    year2migrationCommits: new SortedMap(),
    rule2MigrationCommits: new SortedMap(),
    fromLib2MigrationCommits: new SortedMap(),
    toLib2MigrationCommits: new SortedMap(),
    migrations: [],
    id2arrayIndex: {},
    migrationGraph: {},
    connectedSubGraphs: [],
    batchSize: 500,
    totalElements: 14334,
    totalPages: 0,
    currentEchartIndex: 0,
    echartGraphOptions: {},
    echartTimeOptions: {},
    echartMigrationOptions: {},
    echartSourceLibraryOptions: {},
    echartTargetLibraryOptions: {},
  }),
  computed: {},
  created: function() {
    getConfirmedMigrations(0, this.batchSize).then((payload) => {
      this.totalElements = payload.page.totalElements;
      this.totalPages = payload.page.totalPages;
      this.updateMigrationData(payload);
      for (let i = 1; i < this.totalPages; ++i) {
        getConfirmedMigrations(i, this.batchSize).then((payload2) => {
          this.updateMigrationData(payload2);
        });
      }
    });
  },
  methods: {
    updateKey2CommitMap(sortedMap, key, ...commits) {
      if (!sortedMap.has(key)) sortedMap.set(key, new Set());
      sortedMap.get(key).add(...commits);
    },
    updateMigrationData(payload) {
      this.migrations.push(...payload._embedded.wocConfirmedMigrations);
      for (let mig of payload._embedded.wocConfirmedMigrations) {
        this.commits.add(mig.startCommit);
        this.commits.add(mig.endCommit);
        this.repositories.add(mig.repoName);
        this.rules.add(mig.fromLib + " " + mig.toLib);
        this.updateKey2CommitMap(
          this.year2migrationCommits,
          new Date(mig.startCommitTime).getFullYear(),
          mig.startCommit,
          mig.endCommit
        );
        this.updateKey2CommitMap(
          this.rule2MigrationCommits,
          mig.fromLib + " → " + mig.toLib,
          mig.startCommit,
          mig.endCommit
        );
        this.updateKey2CommitMap(
          this.fromLib2MigrationCommits,
          mig.fromLib,
          mig.startCommit,
          mig.endCommit
        );
        this.updateKey2CommitMap(
          this.toLib2MigrationCommits,
          mig.toLib,
          mig.startCommit,
          mig.endCommit
        );
      }
      this.updateGraphs();
    },
    updateGraphs() {
      this.echartTimeOptions = {
        title: {
          text: "Number of Confirmed Migration Commits by Time",
        },
        xAxis: {
          type: "category",
          data: Array.from(this.year2migrationCommits.keys()),
          axisLabel: {
            show: true,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: Array.from(this.year2migrationCommits.values()).map((x) => x.size),
            type: "bar",
            label: {
              normal: {
                show: true,
                textBorderColor: "#333",
                textBorderWidth: 2,
              },
            },
          },
        ],
      };
      let migrations = Array.from(this.rule2MigrationCommits.entries());
      migrations.sort((x, y) => y[1].size - x[1].size);
      migrations = migrations.slice(0, 20);
      this.echartMigrationOptions = {
        title: {
          text: "Most Frequent Migrations by Commit",
        },
        yAxis: {
          type: "category",
          data: migrations.map((x) => x[0]),
          axisLabel: {
            show: false,
          },
        },
        xAxis: {
          type: "value",
        },
        series: [
          {
            data: migrations.map((x) => x[1].size),
            type: "bar",
            label: {
              normal: {
                position: "insideLeft",
                formatter: "{c}: {b}",
                show: true,
                textBorderColor: "#333",
                textBorderWidth: 2,
              },
            },
          },
        ],
      };

      let fromLibs = Array.from(this.fromLib2MigrationCommits.entries());
      fromLibs.sort((x, y) => y[1].size - x[1].size);
      fromLibs = fromLibs.slice(0, 20);
      this.echartSourceLibraryOptions = {
        title: {
          text: "Most Frequent Migration Source Libraries by Commit",
        },
        yAxis: {
          type: "category",
          data: fromLibs.map((x) => x[0]),
          axisLabel: {
            show: false,
          },
        },
        xAxis: {
          type: "value",
          inverse: true,
        },
        series: [
          {
            data: fromLibs.map((x) => x[1].size),
            type: "bar",
            label: {
              normal: {
                position: "insideRight",
                formatter: "{c}: {b}",
                show: true,
                textBorderColor: "#333",
                textBorderWidth: 2,
              },
            },
          },
        ],
      };

      let toLibs = Array.from(this.toLib2MigrationCommits.entries());
      toLibs.sort((x, y) => y[1].size - x[1].size);
      toLibs = toLibs.slice(0, 20);
      this.echartTargetLibraryOptions = {
        title: {
          text: "Most Frequent Migration Target Libraries by Commit",
        },
        yAxis: {
          type: "category",
          data: toLibs.map((x) => x[0]),
          axisLabel: {
            show: false,
          },
        },
        xAxis: {
          type: "value",
        },
        series: [
          {
            data: toLibs.map((x) => x[1].size),
            type: "bar",
            label: {
              normal: {
                position: "insideLeft",
                formatter: "{c}: {b}",
                show: true,
                textBorderColor: "#333",
                textBorderWidth: 2,
              },
            },
          },
        ],
      };
    },
    initGraphData() {
      if (this.migrations.length === 0) return;
      this.id2arrayIndex = [];
      this.migrationGraph = {};
      this.connectedSubGraphs = [];
      this.echartGraphOptions = {};

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
      this.connectedSubGraphs.sort((a, b) => b.length - a.length);
      this.handleTabSelect(0);
    },
    handleTabSelect(currentIndex) {
      this.currentEchartIndex = currentIndex;
      let subgraph = this.connectedSubGraphs[currentIndex];
      let subgraphNodes = [];
      let subgraphLinks = [];
      for (let lib of subgraph) {
        subgraphNodes.push({
          id: lib,
          name: lib,
        });
        for (let lib2 of this.migrationGraph[lib].toLibs) {
          subgraphLinks.push({
            id: subgraphLinks.length,
            name: lib + " -> " + lib2,
            source: lib,
            target: lib2,
          });
        }
      }
      this.echartGraphOptions = {
        title: {
          text: "Migration Graph",
          subtext: "Default layout",
          top: "bottom",
          left: "right",
        },
        tooltip: {},
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            name: "Migration Graph",
            type: "graph",
            layout: "force",
            data: subgraphNodes,
            links: subgraphLinks,
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
            },
            label: {
              position: "right",
              formatter: "{b}",
            },
            lineStyle: {
              color: "source",
              curveness: 0.3,
            },
            emphasis: {
              lineStyle: {
                width: 10,
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.graph-chart {
  width: 80%;
  height: 80%;
  border: 1px;
}

.chart-in-card {
  width: 100%;
  height: 400px;
}
</style>
