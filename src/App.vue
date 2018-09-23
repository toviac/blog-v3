<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  pre > code {
    border-radius: 4px;
    font-family: 'Consolas';
    // atom-one-dark
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #abb2bf;
    background: #282c34;
  }
  blockquote {
    background-color: #efefef;
    padding: 5px 10px;
    border-left: 3px solid #409EFF;
  }
}
</style>
