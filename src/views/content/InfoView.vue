<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      dasasd
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapActions } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      openUserModal: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions("token", ["tryLogin"]),
  },
  components: {
    NavBar,
    UserModal,
  },
};
</script>

<style scoped>
.color {
  background-color: #d9d9d9;
}
.float {
  background-color: white;
  position: relative;
  top: 3.5rem;
  width: calc(100% - 1rem);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
