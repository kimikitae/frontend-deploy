<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
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
  background-color: white;
}
.float {
  position: relative;
  top: 5rem;
}
</style>
