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
          <b-nav-item to="/dataset">Search</b-nav-item>
          <b-nav-item to="/dataset">Dataset</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search a Java library..."
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit" 
              >Search</b-button
            >
          </b-nav-form></b-navbar-nav
        >
      </b-navbar>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
</style>
