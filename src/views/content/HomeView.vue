<template>
  <main class="color">
    <NavBar />
    <div class="float">
      <MainScreen />
    </div>
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import MainScreen from "../../components/home/MainScreen.vue";
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapActions("token", ["tryLogin"]),
  },
  components: {
    NavBar,
    MainScreen,
  },
};
</script>

<style scoped>
.color {
  background-color: #d9d9d9;
}
.float{
    position: relative;
  top: 5rem;
}
</style>
