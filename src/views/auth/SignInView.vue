<template>
  <main>
    <img class="logo" src="../../assets/appLogo.png">
    <div class="input">
      <img src="../../assets/user.png">
      <input type="text" placeholder="User name" v-model="loginId" @keyup.enter="login">
    </div>
    <div class="input">
      <img src="../../assets/lock.png">
      <input type="password" placeholder="Password" v-model="loginPassword" @keyup.enter="login">
    </div>
    <button @click="login">LOGIN</button>
    <div class="usersupport">
      <a href="/">ID 찾기</a>
      <span> | </span>
      <a href="/">비밀번호 찾기</a>
      <span> | </span>
      <a href="/SignUpView">회원가입</a>
    </div>
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
  computed: {

  },
  methods: {
    ...mapActions('token', ['tryLogin']),
    ...mapActions('user', ['getInfo']),
    chk_null(cmp) { // 비어있는지 체크하는 함수
      if (cmp.trim().length == 0) { return true }
      return false
    },
    setInit() {
      this.no_email = false
      this.no_pwd = false
    },
    async login() {
      this.setInit()
      if ((this.no_email = this.chk_null(this.loginId))) { return }      // email 비어있으면 종료
      else { this.no_email = false }
      if ((this.no_pwd = this.chk_null(this.loginPassword))) { return }          // pwd 비어있으면 종료
      else { this.no_pwd = false }

      const param = {
        userId: this.loginId,
        password: this.loginPassword,
      }
      await this.tryLogin(param)
      await this.getInfo()

      this.loginId = null
      this.loginPassword = null
    }
  },
};
</script>

<style scoped>
.logo {
  width: 15rem;
  margin: 0 auto;
  margin-top: 7%;
  display: block;
}

.input {
  margin: 0 auto;
  margin-top: 2%;
  width: 15%;
}

.input>img {
  width: 1rem;
}

/* .input>input {
  height: %;
}  */

button {
  font-size: 1.5rem;
  padding: 0.4rem 3rem;
  display: block;
  margin: 0 auto;
  margin-top: 2%;
  background-color: #ffe29e;
  border-radius: 2rem;
  border: none;
  box-shadow: 0.2px 0.2px 2px 2px #0000002f;
}

.usersupport {
  text-align: center;
  display: block;
  margin: 0 auto;
  margin-top: 2%;
}

a {
  text-decoration: none;
  color: black;
}
</style>