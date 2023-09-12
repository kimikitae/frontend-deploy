<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closeReviewModal')" class="close">X</div>
        <div class="content-box">
          <h1>리뷰 작성</h1>
          <div class="desc">
            가게 사장님을 위해<br />솔직하고 담백한 리뷰를 작성해주세요.
          </div>
          <star-rating
            class="setstar"
            :star-size="25"
            @update:rating ="setRating"
            :show-rating="false"
            inactive-color="#9A9A9A"
            active-color="#FEE503"
          ></star-rating>

          <div class="editInfo1">
            <textarea v-model="reviewInfo.content" />
          </div>
          
        </div>
        <div class="button" @click="writeReview">
          <span> 리뷰 등록하기 </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapActions } from "vuex";

export default {
  name: "ReviewModal",
  props: {
    idx: String,
  },
  data() {
    return {
      reviewInfo: {
        starPoint: 0,
        content: "",
      },
    };
  },
  methods: {
    setRating(rating){
      this.reviewInfo.starPoint= rating;
    },
    async writeReview() {
      const data = {
        idx: this.idx,
        content: this.reviewInfo.content,
        starPoint: this.reviewInfo.starPoint
      }
      const a = await this.postReview(data)
      if(a){
        this.$emit("closeReviewModal");
      } else{
        return
      }
    },
    ...mapActions("review", ["postReview"]),
  },
  components: {
    StarRating,
  },
};
</script>

<style scoped>
.zidx {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 110;
  backdrop-filter: blur(3px);
}

.zidx > main {
  z-index: 200;
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
  width: 30rem;
  height: 31rem;
  background-color: white;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  animation: fadeInUp 0.5s ease backwards;
}

.modalframe {
  position: relative;
}

.close {
  margin-right: 0.5rem;
  float: right;
  cursor: pointer;
}

.content-box {
  position: relative;
  top: 1rem;
}

h1 {
  padding-top: 1rem;
  text-align: center;
}
.desc {
  text-align: center;
}
.setstar {
  margin-top: 4px;
  justify-content: center;
  align-items: center;
}
.editInfo1 {
  margin-top: 0.8rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
textarea {
  width: 26rem;
  height: 14rem;
  font-size: 1.3rem;
  color: black;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  resize: none;
}

input::-webkit-inner-spin-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

@keyframes fadeInUp {
  0% {
    transform: translate(0px, 7px);
    opacity: 0;
  }

  100% {
    transform: translate(0px, 0);
    opacity: 1;
  }
}

.button {
  border-radius: 0 0 0.5rem 0.5rem;
  cursor: pointer;
  position: relative;
  top: 4rem;
  height: 3.5rem;
  background-color: #fff5d1;
  line-height: 370%;
}

span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
