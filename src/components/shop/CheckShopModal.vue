<template>
  <div class="zidx2">
    <main>
      <div class="modalframe">
        <div class="content-box">
          <h3>정말 매장을 삭제하시겠어요?</h3>
          <div class="desc">
            삭제까지 1주일 정도의 시간이 소요 돼요.<br />
            그동안 삭제 철회를 할 수 있어요.
          </div>
        </div>
        <div class="flex">
          <div class="button lef" @click="this.$emit('delShop')">네, 삭제할래요</div>
          <div class="button rig" @click="this.$emit('closeCheckShopModal')">
            아니에요
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CancelOrderModal",
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
.zidx2 {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 210;
  /* backdrop-filter: blur(3px); */
}

.zidx2 > main {
  z-index: 200;
  display: block;
  margin: 0 auto;
  margin-top: 15rem;
  width: 20rem;
  height: 14rem;
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
.lef {
  border-radius: 0 0 0 0.5rem;
}
.rig {
  border-radius: 0 0 0.5rem 0;

  border-left: solid 1px rgba(50, 50, 50, 0.354);
}
</style>
