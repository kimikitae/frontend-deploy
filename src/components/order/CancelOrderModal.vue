<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div class="content-box">
          <h3>정말 주문을 취소하시겠어요?</h3>
          <div class="desc">상대방이 당신을 기다리고 있어요.</div>
        </div>
        <div class="flex">
          <div class="button lef" @click="cancelOrder">네, 취소할래요</div>
          <div class="button rig" @click="this.$emit('closeCancelOrderModal')">아니에요</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CancelOrderModal",
  props: {
    idx: String,
  },
  data() {
    return {};
  },
  methods: {
    setRating(rating) {
      this.reviewInfo.starPoint = rating;
    },
    async cancelOrder() {
      const data = {
        idx: this.idx,
      };
      const a = await this.deleteOrder(data);
      if (a) {
        this.$emit("closeCancelOrderModal");
      } else {
        return;
      }
    },
    ...mapActions("order", ["deleteOrder"]),
  },
  components: {},
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
  width: 20rem;
  height: 12.5rem;
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

h3 {
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  text-align: center;
}
.desc {
  text-align: center;
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
.flex {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button {
  font-size: 0.8rem;
  line-height: 400%;
  text-align: center;
  width: 50%;
  height: 3.5rem;
  cursor: pointer;
  background-color: #fff5d1;
}
.lef{
    border-radius: 0 0 0 0.5rem;

}
.rig{
    border-radius: 0 0 0.5rem 0;

    border-left: solid 1px rgba(50, 50, 50, 0.354);
}
</style>
