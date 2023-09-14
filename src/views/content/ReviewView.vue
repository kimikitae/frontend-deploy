<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="title">리뷰 관리</div>
      <div class="flex">
        <template v-for="(it, index) in sortedReview" :key="index">
          <div class="date">
            {{
              extrMonth(it.createAt) +
              1 +
              ". " +
              extrDate(it.createAt) +
              "(" +
              extrDay(it.createAt) +
              ")"
            }}
          </div>
          <div class="box">
            <div class="line1">
              <div class="left">
                {{ it.shopName }}
              </div>
              <div class="right">&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="right ul" @click="delReview(it.idx)">삭제</div>
              <div class="right">&nbsp;</div>
              <div class="right ul" @click="mdfReview(it.idx, it.content, it.starPoint)">수정</div>
            </div>
            <div class="line2">{{ it.orderName }}</div>
            <star-rating
              class="setstar"
              :star-size="25"
              :rating="it.starPoint"
              inactive-color="#9A9A9A"
              active-color="#FEE503"
              :read-only="true"
              :show-rating="false"
            ></star-rating>
            <div class="line4">{{ it.content }}</div>
          </div>
        </template>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
    <ReviewModal :mode="mode" :oldReview="oldReview" v-if="openReviewModal" @closeReviewModal="openReviewModal = false" />
  </main>
</template>

<script>
import StarRating from "vue-star-rating";
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import ReviewModal from "../../components/review/ReviewModal.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "ReviewView",
  data() {
    return {
      openUserModal: false,
      openReviewModal: false,
      oldReview: {

      },
      mode: 1
    };
  },
  computed: {
    ...mapState("review", {
      reviewInfo: (state) => state.reviewInfo,
    }),
    ...mapGetters("review", ["sortedReview"]),
  },
  methods: {
    delReview(idx){
      const data = {
        idx: idx
      }
      this.deleteReview(data)
    },
    mdfReview(idx, content, starPoint) {
      this.oldReview = {
        idx: idx,
        content: content,
        starPoint: starPoint
      }
      this.openReviewModal = true
    },
    ...mapActions("review", ["getReviewInfo", "deleteReview"]),
    extrMonth(d) {
      return new Date(d).getUTCMonth();
    },
    extrDate(d) {
      return new Date(d).getDate();
    },
    extrDay(d) {
      if (new Date(d).getDay() == "0") {
        return "일";
      } else if (new Date(d).getDay() == "1") {
        return "월";
      } else if (new Date(d).getDay() == "2") {
        return "화";
      } else if (new Date(d).getDay() == "3") {
        return "수";
      } else if (new Date(d).getDay() == "4") {
        return "목";
      } else if (new Date(d).getDay() == "5") {
        return "금";
      } else if (new Date(d).getDay() == "6") {
        return "토";
      }
    },
  },
  components: {
    NavBar,
    UserModal,
    StarRating,
    ReviewModal
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
.line1 {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
}
.line1 > .left {
  font-size: 1.1em;
  font-weight: bold;
  float: left;
}
.line1 > .right {
  float: right;
  color: #d0d0d0;
}
.ul {
  cursor: pointer;
  text-decoration: underline;
}
.line2 {
  margin-left: 0.5rem;

  margin-top: 1.9rem;
}

.setstar {
  margin: 0.6rem 0;
  margin-left: 0.6rem;
}
.line4 {
  margin-left: 0.6rem;
  margin-bottom: 1rem;
}
</style>
