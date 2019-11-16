<template>
  <div id="app" class="d-flex flex-column" style="min-height:100vh;">
    <vue-progress-bar></vue-progress-bar>
    <Header />
    <router-view style="flex:1;"></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "./assets/sass/app";
</style>
