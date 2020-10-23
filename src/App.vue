<template>
  <div id="app">
    <div id="nav">
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
        fixed="top"
        class="header"
      >
        <b-navbar-brand to="/">MigrationAdvisor</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item to="/search">Search</b-nav-item>
          <b-nav-item to="/dataset">Dataset</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              v-model="fromLib"
              class="mr-sm-2"
              placeholder="Search a Java library..."
            ></b-form-input>
            <b-button
              size="sm"
              class="my-2 my-sm-0"
              type="submit"
              :to="'/search/' + fromLib"
              >Search</b-button
            >
          </b-nav-form></b-navbar-nav
        >
      </b-navbar>
    </div>
    <div id="center-page">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    fromLib: "",
  }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
</style>
