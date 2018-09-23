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
  .el-button {
    &:focus {
      z-index: 0;
      color: #409EFF;
      border-color: #c6e2ff;
    }
    &:hover {
      z-index: 1;
      border-color: #409EFF;
      color: #409EFF;
    }
  }
  blockquote {
    border-left: 3px solid #409EFF;
    padding-left: 5px;
    background-color: #eee;
  }
  code {
    font-family: Helvetica;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }
}
</style>
