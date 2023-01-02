import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlayScene from "../views/PlayScene.vue";
import HomeScene from "../views/HomeScene.vue";
import TimeUp from "../views/TimeUp.vue";
import GameOver from "../views/GameOver.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeScene,
    },
    {
      path: "/play",
      name: "play",
      component: PlayScene,
    },
    {
      path: "/time-up",
      name: "time-up",
      component: TimeUp,
    },
    {
      path: "/game-over",
      name: "game-over",
      component: GameOver,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
