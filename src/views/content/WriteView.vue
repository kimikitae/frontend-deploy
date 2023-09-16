<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      되냐
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";

export default {
  name: "WriteView",
  data() {
    return {
      openUserModal: false,
    };
  },
  components: {
    NavBar,
    UserModal,
  },
};
</script>

<style scoped>
.float {
  background-color: white;
  position: relative;
  width: 100%;
  padding-top: 6rem;
}
</style>
