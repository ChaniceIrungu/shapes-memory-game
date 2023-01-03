<template>
  <div class="">
    <div class="flex flex-col items-center">
      <div class="pt-16">
        <img src="../assets/game-logo2.png" class="" />
      </div>
      <div class="">
        <h1
          class="px-2 pt-36 text-center text-[#343f14] text-xl font-bold whitespace-nowrap"
        >
          Choose if statement is True or False
        </h1>
      </div>

      <div class="pt-32 text-center">
        <router-link to="/play">
          <button
            class="bg-[#698F01] hover:bg-[#35202D] text-white font-bold py-3 px-10 rounded-full"
          >
            Continue
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
