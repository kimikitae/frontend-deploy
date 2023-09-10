<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="title">리뷰 관리</div>
      <div class="flex">
        <template v-for="(it, index) in sortedReview" :key="index">
          <div class="date">{{ it.createAt }}</div>
          <div class="box">
            <div class="line1">{{ it.shopName }}</div>
            <div class="line2">{{ it.orderName }}</div>
            <div class="line3">{{ it.starPoint }}</div>
            <div class="line4">{{ it.content }}</div>
          </div>
        </template>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ReviewView",
  data() {
    return {
      openUserModal: false,
    };
  },
  computed: {
    ...mapState("review", {
      reviewInfo: (state) => state.reviewInfo,
    }),
    ...mapGetters("review", ["sortedReview"]),
  },
  methods: {
    ...mapActions("review", ["getReviewInfo"]),
  },
  components: {
    NavBar,
    UserModal,
  },
  mounted() {
    this.getReviewInfo();
  },
};
</script>

<style scoped>
.color {
  background-color: white;
}

.float {
  position: relative;
  top: 8rem;
}

.title {
  font-size: 2.4rem;
  font-weight: bold;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 2rem;
}

.flex {
  display: flex;
  flex-direction: column;
}

.date {
  font-size: 1.2rem;
  width: 50%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  text-align: left;
}

.box {
  border: solid 1px rgba(128, 128, 128, 0.168);
  width: 50%;
  margin: 0 auto;
  margin-bottom: 2rem;
}
</style>
