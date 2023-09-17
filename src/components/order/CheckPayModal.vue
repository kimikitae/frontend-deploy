<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div class="content-box">
          <div class="title">
            잠깐!<br />
            아래의 공유 정보가 맞나요?
          </div>
          <div class="desc">
            연산동에서 공유하길 원해요.<br />
            2명이 나누었으면 좋겠어요.<br />
            17:30분쯤 주문했으면 좋겠어요.
          </div>
        </div>
        <div class="flex">
          <div class="button lef" @click="toPayView">네,맞아요</div>
          <div class="button rig" @click="this.$emit('closeCheckPayModal')">아니에요</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import router from "../../router";

export default {
  name: "CheckPayModal",
  props: {},
  data() {
    return {};
  },
  methods: {
    toPayView(){
      this.setViewStatus(1)
      router.push('/PayView')
    },
    ...mapMutations("order", ["setViewStatus"]),
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
  margin-top: 15rem;
  width: 20rem;
  height: fit-content;
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

.title {
  font-weight: bold;
  font-size: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
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
