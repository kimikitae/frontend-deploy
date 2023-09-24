<template>
  <div class="zidx1" @click="this.$emit('closeChatMenuModal')">
    <main>
      <div class="modalframe">
        <div class="content" @click="toPay">결제하기</div>
        <hr>
        <div class="content" @click="exit">채팅방 나가기</div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "ChatMenuModal",
  methods: {
    async toPay() {
      this.$emit("closeChatModal");
      router.push('/PayInfoView')
    },
    exit() {
      this.$emit("closeChatModal");
      router.push("/ShareView");
    },
    ...mapMutations("token", ["setToken"]),
    ...mapActions("user", ["getInfo"]),
    ...mapActions("cart", ["getCartInfo"]),
  },
};
</script>

<style scoped>
.zidx1 {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 150;
  backdrop-filter: none;

}
.zidx1 > main {
  z-index: 100;
  display: block;
  margin-top: 3rem;
  margin-left: calc(50% + 28.7rem);
  margin-right: auto;
  width: 150px;
  background-color: white;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  animation: fadeInUp 0.5s ease backwards;
}
.modalframe {
  position: relative;
}
hr{
  margin: 0;
}
.content {
  padding: 0.2rem 0.8rem;
  line-height: 200%;
  height: 2rem;
  cursor: pointer;
}
.content:hover {
  background-color: #d9d9d9aa;
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
</style>
