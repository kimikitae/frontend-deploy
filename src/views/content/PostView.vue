<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div>
          <span>
            {{ post.title }}
          </span>
          <span>
            {{ post.author + "님" }}
          </span>
          <span>
            {{ post.place + "에 거주하고 있어요." }}
          </span>
        </div>
        <div></div>
        <div>
          {{ post.place + "에 거주하고 있어요." }}
        </div>
        <div>
          {{ post.content }}
        </div>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapState, mapActions } from "vuex";
// import router from "../../router";

export default {
  name: "PostView",
  data() {
    return {
      openUserModal: false,
    };
  },
  computed: {
    ...mapState("post", {
      post: (state) => state.post,
    }),
  },
  methods: {
    ...mapActions("post", ["getPost"]),
  },
  components: {
    NavBar,
    UserModal,
  },
  mounted() {
    this.getPost();
  },
};
</script>

<style scoped>
.float {
  background-color: white;
  position: relative;
  width: calc(100%);
  padding-top: 8rem;
}

.flex {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
