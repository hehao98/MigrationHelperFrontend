<template>
  <div id="app">
    <div id="nav">
      <b-navbar toggleable="lg" type="dark" variant="info" fixed="top" class="header">
        <b-navbar-brand to="/">MigrationAdvisor</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/dataset">Dataset</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <library-search-input size="sm" button-text="Search" placeholder="Search a Java library..."/>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div id="center-page">
      <router-view />
    </div>
    <div id="app-footer">
      <hr class="my-4" />
      © Copyright 2020
      <b-link href="https://hehao98.github.io/" target="_blank">Hao He</b-link>, Ph.D. candidate at
      Peking University <br />
      Special Thanks to:
      <b-link href="http://worldofcode.org/" target="_blank">World of Code</b-link> led by
      <b-link href="https://mockus.org/" target="_blank">Prof. Audris Mockus</b-link> and Software
      Analysis Lab at Huawei Technologies Co., Ltd.<br />
      All source code and data available under the
      <b-link href="http://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
        >GPL-v3 License</b-link
      >.
    </div>
  </div>
</template>

<script>
import LibrarySearchInput from "@/components/LibrarySearchInput.vue";

export default {
  name: "App",
  components: { LibrarySearchInput },
  data: () => ({
    fromLib: "",
  }),
};
</script>

<style>
#app {
  font-family: /*Avenir,*/ Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  /*color: #2c3e50;*/
}

/*
#nav a.router-link-exact-active {
  color: #42b983;
}*/

#center-page {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 50px;
  margin-left: 50px;
}

#app-footer {
  text-align: center;
  margin-right: 100px;
  margin-left: 100px;
  margin-bottom: 30px;
}
</style>
