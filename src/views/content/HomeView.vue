<template>
  <main class="color">
    <NavBar />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
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
  },
};
</script>

<style scoped>
.color {
  background-color: #d9d9d9;
}
</style>
