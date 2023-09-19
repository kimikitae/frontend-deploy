<template>
  <div class="zidx" @click="this.$emit('closeUserModal')">
    <main>
      <div class="modalframe">
        <div class="content1" @click="toLogOut">
          <span class="content2">로그아웃</span>
        </div>
        <div class="content" @click="toInfo">내 정보</div>
        <div class="content" @click="toCart">장바구니</div>
        <div class="content" @click="toLogOut">기타항목</div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import router from "@/router";

export default {
  name: "UserModal",
  methods: {
    async toLogOut() {
      localStorage.removeItem("vuex");
      this.$emit("closeUserModal");
      await router.replace("/");
      router.go(0);
    },
    toInfo() {
      this.$emit("closeUserModal");
      this.getInfo();
      router.push("/InfoView");
    },
    toCart() {
      this.$emit("closeUserModal");
      this.getCartInfo();
      router.push("/CartView");
    },
    ...mapMutations("token", ["setToken"]),
    ...mapActions("user", ["getInfo"]),
    ...mapActions("cart", ["getCartInfo"]),
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
  z-index: 1;
}
.zidx > main {
  z-index: 100;
  display: block;
  margin-top: 4rem;
  margin-left: auto;
  margin-right: 2rem;
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
.content1 {
  padding-top: 0.8rem;
  height: 1rem;
}
.content2 {
  color: #d0d0d0;
  margin-right: 1rem;
  float: right;
  font-size: 0.6rem;
  cursor: pointer;
}
.content {
  line-height: 200%;
  text-align: center;
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
