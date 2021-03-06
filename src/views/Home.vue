<template>
  <div id="home" class="home">
    <b-jumbotron style="margin-bottom: 30px">
      <template #header>Migration Advisor</template>
      <template #lead>
        Tell us a Java library you want to replace, we recommend the most suitable migrations
        through an intelligent analysis upon existing GitHub repositories.
      </template>
      <hr class="my-4" />
      <library-search-input
        size="md"
        buttonText="Try it out!"
        placeholder="Enter the Java library (groupId:artifactId) you want to replace here... (e.g. org.json:json)"
      />
      <b-row class="my-1">
        <b-col sm="9">
          Some Examples:
          <b-link to="search/org.json:json"><code>org.json:json</code></b-link
          >,&emsp; <b-link to="search/junit:junit"><code>junit:junit</code></b-link
          >,&emsp; <b-link to="search/log4j:log4j"><code>log4j:log4j</code></b-link
          >,&emsp;
          <b-link to="search/c3p0:c3p0"><code>c3p0:c3p0</code></b-link>
        </b-col>
      </b-row>
    </b-jumbotron>
    <b-card-group style="margin-bottom: 30px">
      <b-card>
        <animated-number :number="21358" /><br />
        GitHub Repositories Analyzed
      </b-card>
      <b-card>
        <animated-number :number="185817" /><br />
        Indexed Maven Artifacts
      </b-card>
      <b-card>
        <animated-number :number="1956809" /><br />
        Migration Advisories
      </b-card>
      <b-card>
        <animated-number :number="1384" /><br />
        Confirmed Migration Advisories
      </b-card>
    </b-card-group>
    <b-card title="How it works?" body-class="text-center" style="margin-bottom: 30px">
      <b-card-text>
        First, we build a large-scale database of GitHub repositories and Maven artifacts. <br />
        Then, we run a ranking algorithm to generate migration advisories by aggregating different
        sources of evidence from the collected data.
        <br />
        Finally, when you specify a library to migrate away, Migration Advisor will query the
        database and return relavant advisories for you.
      </b-card-text>
      <b-button-group class="mr-1">
        <b-button
          style="height:39px"
          href="https://github.com/hehao98/MigrationHelper"
          target="_blank"
        >
          <b-img style="height:24px" src="github-icon-light.png" fluid></b-img>
          Backend
        </b-button>
      </b-button-group>
      <b-button-group class="mr-1">
        <b-button
          style="height:39px"
          href="https://github.com/hehao98/MigrationHelperFrontend"
          target="_blank"
        >
          <b-img style="height:24px" src="github-icon-light.png" fluid></b-img>
          Frontend
        </b-button>
      </b-button-group>
      <b-button-group class="mr-1">
        <b-button
          style="height:39px"
          href="https://hehao98.github.io/files/2021-migration.pdf"
          target="_blank"
        >
          <b-icon icon="card-text"></b-icon>
          Techincal Paper
        </b-button>
      </b-button-group>
      <b-button-group class="mr-1">
        <b-button
          style="height:39px"
          href="https://hehao98.github.io/files/2021-migration-advisor.pdf"
          target="_blank"
        >
          <b-icon icon="card-text"></b-icon>
          Tool Paper
        </b-button>
      </b-button-group>
    </b-card>
    <b-card
      title="What is the advantage of Migration Advisor?"
      style="margin-bottom: 30px"
      body-class="text-center"
    >
      It is the <b>first</b> tool (within our knowledge) that can return migration advisories based on
      <b>real world migrations</b> happened on GitHub.  <br />
      We believe real world migrations are valuable supplement to existing knowledge of similar
      libraries available on the Internet, <br />
      such as <b-link href="https://alternativeto.net/" target="_blank">AlternativeTo</b-link>,
      <b-link href="https://doi.org/10.1145/2970276.2970290" target="_blank">SimilarTech</b-link>,
      <b-link href="https://github.com/akullpp/awesome-java" target="_blank"
        ><code>awesome-java</code></b-link
      >, blog posts or forum discussions.
    </b-card>
  </div>
</template>

<script>
import LibrarySearchInput from "@/components/LibrarySearchInput.vue";
import AnimatedNumber from "@/components/AnimatedNumber.vue";

export default {
  name: "Home",
  components: { LibrarySearchInput, AnimatedNumber },
  data: () => ({
    fromLib: "",
  }),
};
</script>
