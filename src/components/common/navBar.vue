<template>
  <main>
    <div class="frame">
      <img class="logo" src="../../assets/appLogo.png" @click="toMain" />
      <span class="title" @click="toMain">용기나눔</span>
      <span class="menu">공유</span>
      <span class="menu">동네이야기</span>
      <span class="menu">더보기</span>
      <div class="right">
        <template v-if="token">
          <div class="button" @click="$emit('openUserModal')">
            {{ userName }}님
            <img class="direct" src="../../assets/Downarrow.png" />
          </div>
        </template>
        <template v-else>
          <div class="button" @click="toSignUpView">회원가입</div>
          <div class="button" @click="toSignInView">로그인</div>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import router from "../../router";

export default {
  name: "NavBar",
  data() {
    return {
      name: "고민석",
    };
  },
  computed: {
    ...mapState("token", {
      token: (state) => state.accessToken,
    }),
    ...mapState("user",{
      userName: (state) => state.userInfo.userName
    })
  },
  methods: {
    toSignInView(){
      router.push('/SignInView')
    },
    toSignUpView(){
      router.push('/SignUpView')
    },
    toMain() {
      router.push("/");
    },
  },
};
</script>

<style scoped>
.frame {
  z-index: 100;
  position: fixed;
  /* top: 0.5rem; */
  width: calc(100%);
  /* margin-left: 0.5rem;
  margin-right: 0.5rem; */
  background-color: white;
}

.logo {
  position: relative;
  left: 0.5rem;
  width: 3rem;
  cursor: pointer;
}

.title {
  cursor: pointer;
  position: relative;
  left: 0.5rem;
  font-size: 2.4rem;
  vertical-align: 15%;
}
.menu {
  font-size: 1.2rem;
  margin-left: 2rem;
  vertical-align: 50%;
  cursor: pointer;
}
.right {
  float: right;
}
.button {
  font-size: 1.2rem;
  float: right;
  background-color: white;
  border-radius: 1.5rem;
  border: none;
  box-shadow: 0.5px 0.5px 2px 1px #d6d6d624;
  cursor: pointer;
  padding: 0.1rem 2.4rem;
  margin-right: 1rem;
  margin-top: 1rem;
}
.direct {
  width: 1rem;
}
</style>
