<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="h-[640px] w-[360px] min-h-screen my-auto mx-auto p-2 bg-white">
    <RouterView />
  </div>
</template>
<style>
body {
  background-color: black;
}
</style>
