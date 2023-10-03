<script setup>
import { RouterView } from "vue-router";
import AppFooter from "./components/common/AppFooter.vue";
</script>

<template>
  <div id="wrapper">
    <RouterView id="all" @orderInfo="orderInfo" :stats="stats" />
  </div>
  <footer>
    <AppFooter class="foot" />
  </footer>
</template>

<script>
export default {
  data() {
    return {
      stats: "",
      isBackgroundBlue: true,
    };
  },
  methods: {
    orderInfo(stats) {
      this.stats = stats;
    },
  },
  components: {
    AppFooter,
  },
};
</script>

<style scoped>
#wrapper {
  height: auto;
  min-height: 100%;
  padding-bottom: 25vh;
}

footer {
  z-index: 1;
  height: 25vh;
  position : relative;
  transform : translateY(-100%);
}
.foot {
  font-family: Arial, sans-serif;
}
#all {
  width: 100%;
  height: 100%;
  font-family: Arial, sans-serif;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
