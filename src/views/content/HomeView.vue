<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true"/>
    <div class="float">
      <MainScreen />
      <MainContent />
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false"/>
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import MainScreen from "../../components/common/MainScreen.vue";
import MainContent from "../../components/common/MainContent.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
        openUserModal: false,
        code: ""
    };
  },
  computed: {},
  methods: {
    ...mapActions("token", ["tryLogin"]),
  },
  components: {
    NavBar,
    MainScreen,
    MainContent,
    UserModal
  },
};
</script>

<style scoped>
.color {
  background-color: #F6EAC2;
}
.float{
  position: relative;
  top: 5rem;
}
</style>
