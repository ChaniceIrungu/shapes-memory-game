<template>
  <div class="flex flex-col items-center">
    <p class="pt-16 text-[#1b1a17] font-bold text-xl">
      You got
      <span class="text-[#0eff01] font-bold">{{ correct || 0 }}</span> correct
    </p>
    <p class="pt-2 text-[#1d1b17] font-bold text-xl">
      You got
      <span class="text-[#ff0901] font-bold">{{ wrong || 0 }}</span> wrong
    </p>
    <p class="pt-2 text-[#050505] font-bold text-xl">
      Your score: <span class="text-[#FFB801] font-bold">{{ score || 0 }}</span>
    </p>
    <div>
      <h1 class="pt-32 text-center text-xl font-bold">Time's Up!</h1>
    </div>
    <div class="pt-32 flex flex-col items-center">
      <h1 class="text-center text-xl font-bold">Come on! You can do it!</h1>
      <div class="pt-7 pl-4 h-24 w-24">
        <img
          src="../assets/replay.png"
          @click="goToOtherPage('play')"
          class="h-full"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      score: localStorage.getItem("score"),
      correct: localStorage.getItem("correct"),
      wrong: localStorage.getItem("wrong"),
    };
  },
  // method to navigate other pages
  methods: {
    goToOtherPage(page) {
      this.$router.push(`/${page}`);
    },
  },
};
</script>
