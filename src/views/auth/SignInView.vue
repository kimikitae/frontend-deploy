<template>
  <main>
    <img class="logo" src="../../assets/appLogo.jpeg" @click="this.$router.push('/')"/>
    <div class="inpbox">
      <div class="input0">
        <img class="iimg" src="../../assets/user.png" />
        <input
          class="i0"
          type="text"
          placeholder="아이디"
          v-model="loginId"
          @keyup.enter="login"
        />
      </div>
      <div class="input1">
        <img class="iimg" src="../../assets/lock.png" />
        <input
        class="i1"
          type="password"
          placeholder="비밀번호"
          v-model="loginPassword"
          @keyup.enter="login"
        />
      </div>
    </div>

    <button @click="login">로그인</button>
    <div class="usersupport">
      <span>아직 회원이 아니신가요?</span>
      <a href="/SignUpView" class="gr"> 회원가입</a>
    </div>
    <img
      class="kakao"
      src="../../assets/kakao_login_medium_wide.png"
      @click="getTest"
    />
    <img
      class="naver"
      src="../../assets/btnW_완성형.png"
      @click="getTestN"
    />
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignInView",
  data() {
    return {
      loginId: "",
      loginPassword: "",
      no_email: false,
      no_pwd: false,
      no_login: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions("token", ["tryLogin"]),
    ...mapActions("user", ["getInfo", "getTest", "getTestN"]),
    chk_null(cmp) {
      // 비어있는지 체크하는 함수
      if (cmp.trim().length == 0) {
        return true;
      }
      return false;
    },
    setInit() {
      this.no_email = false;
      this.no_pwd = false;
    },
    async login() {
      this.setInit();
      if ((this.no_email = this.chk_null(this.loginId))) {
        return;
      } // email 비어있으면 종료
      else {
        this.no_email = false;
      }
      if ((this.no_pwd = this.chk_null(this.loginPassword))) {
        return;
      } // pwd 비어있으면 종료
      else {
        this.no_pwd = false;
      }

      const param = {
        userId: this.loginId,
        password: this.loginPassword,
      };
      await this.tryLogin(param);
      await this.getInfo();

      this.loginId = null;
      this.loginPassword = null;
    },
  },
};
</script>

<style scoped>
.logo {
  width: 15rem;
  margin: 0 auto;
  margin-top: 7rem;
  display: block;
  cursor: pointer;
}
.inpbox {
  margin: 0 auto;
  margin-top: 1.5rem;
  width: 25rem;
  border-radius: 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
  padding: 1rem;
}
.input0 {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
}
.input1 {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
  border-top: none;
}
.i0{
  font-size: 1rem;
  color: black;
  outline: none;
  border: none;
  background-color: #f6f6f6;
  width: 22.85rem;
  padding: 0.9rem 0;
  padding-left: 2rem;
  border-radius: 0.5rem 0.5rem 0 0 ;
}
.i1{
  font-size: 1rem;
  color: black;
  outline: none;
  border: none;
  background-color: #f6f6f6;
  width: 22.85rem;
  padding: 0.9rem 0;
  padding-left: 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
}
input::placeholder {
  font-size: 1rem;
  color: black;
  background-color: #f6f6f6;
}

.iimg {
  margin-top: 0.9rem;
  margin-left: 0.5rem;
  position: absolute;
  width: 1rem;
}

button {
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.4rem 3rem;
  display: block;
  margin: 0 auto;
  background-color: #FFF5D1;
  margin-top: 1rem;
  width: 27rem;
  border-radius: 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
}

.usersupport {
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-top: 2%;
}
.gr{
  color: #D0D0D0;
}
span{
  font-size: 0.9rem;
}
a {
  font-size: 0.9rem;
  text-decoration: none;
  color: black;
}

.kakao {
  display: block;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 4rem;
  width: 27rem;
  height: 5.5rem;

  /* width: 20rem;
  height: 3rem;
  border: 1px solid #D9D9D9;
  margin-left: 38rem;
  margin-top: 2rem;
  border-radius: 5px;
  background-color: #F7E600; */
}
.naver{
  display: block;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 1rem;
  width: 27rem;
  height: 5.5rem;
  
}
</style>
