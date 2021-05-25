<template>
  <div>
    <Header />
    <Menu />
    <Content />
  </div>
</template>

<script>
import Header from "./components/template/Header";
import Menu from "./components/template/Menu";
import Content from "./components/template/Content";

export default {
  name: "App",
  components: {
    Header,
    Content,
    Menu,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
