<script setup>
</script>

<template>
  <main>
    <img class="logo" src="../../assets/appLogo.png">

    <div>
      <div class="tap1" :class="{ click: userType == '일반회원' }" @click="userType = '일반회원'">일반회원</div>
      <div class="tap2" :class="{ click: userType == '가게사장님' }" @click="userType = '가게사장님'">업주</div>
      <div class="tap3" :class="{ click: userType == '라이더' }" @click="userType = '라이더'">라이더</div>
    </div>
    <input type="text" placeholder="이름" v-model="userName">
    <input type="text" placeholder="아이디" v-model="userId">
    <input type="password" placeholder="비밀번호" v-model="userPw">
    <input type="password" placeholder="비밀번호 확인" v-model="userPwChk">
    <button @click="signUp">SIGN UP</button>
  </main>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignInView",
  data() {
    return {
      userName: "",
      userId: "",
      userPw: "",
      userPwChk: "",
      CheckId: false,
      ChecksignUp: false,
      // mock server
      // server: "https://e5fce603-4225-432a-91e0-9508a46a8189.mock.pstmn.io"
      // local server
      server: "http://localhost:8080",
      userType: "일반회원",
    };
  },
  computed: {
  },
  methods: {
    ...mapActions('token', ['trySignUp']),
    async signUp() {
      if (!this.checkPw()) {
        alert('비번 다름 다시 입력하셈')
        return
      }
      const info = {
        userName: this.userName,
        userId: this.userId,
        password: this.userPw,
        role: this.userType
      }

      const data = await this.trySignUp(info)
      this.ChecksignUp = data
    },
    checkPw() {
      if (this.userPw == this.userPwChk) {
        return true
      } else {
        return false
      }
    }
  },
};
</script>


<style scoped>
.logo {
  width: 8%;
  margin: 0 auto;
  margin-top: 7%;
  display: block;
}

.tap1 {
  display: inline-block;
  background-color: rgb(182, 182, 182);
}

.tap2 {
  display: inline-block;
  background-color: rgb(120, 120, 120);
}

.tap3 {
  display: inline-block;
  background-color: rgb(59, 59, 59);
}

.click {
  background-color: white;
}

div {
  text-align: center;
}

input {
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}

button {
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */</style>
