<template>
  <div class="flex flex-col items-center">
    <p class="pt-16 text-[#FFB801] font-bold text-3xl">5/10</p>
    <div>
      <h1 class="pt-32 text-center text-xl font-bold">Congratulations!!</h1>
    </div>
    <div class="pt-48 flex flex-col items-center">
      <h1 class="text-center text-xl font-bold">Come on! You can do it!</h1>
      <div class="pt-7 pl-4 h-24 w-24">
        <img
          src="../assets/play-again.png"
          @click="goToOtherPage('/')"
          class="h-full"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  // method to navigate other pages
  methods: {
    goToOtherPage(page) {
      this.$router.push(`${page}`);
    },
  },
};
</script>
