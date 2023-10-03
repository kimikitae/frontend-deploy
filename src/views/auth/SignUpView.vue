<script setup></script>

<template>
  <main>
    <img class="logo" src="../../assets/appLogo.jpeg" />

    <div class="tbox">
      <div
        class="tap"
        :class="{ click: userType == '일반회원' }"
        @click="userType = '일반회원'"
      >
        일반회원
      </div>
      <div
        class="tap"
        :class="{ click: userType == '가게사장님' }"
        @click="userType = '가게사장님'"
      >
        가게사장님
      </div>
      <div
        class="tap"
        :class="{ click: userType == '라이더' }"
        @click="userType = '라이더'"
      >
        라이더
      </div>
    </div>
    <div class="inpbox">
      <input type="text" placeholder="이름 입력" v-model="userName" />
      <input type="text" placeholder="아이디 입력" v-model="userId" />
      <input type="password" placeholder="비밀번호 입력" v-model="userPw" />
      <input type="password" placeholder="비밀번호 확인 입력" v-model="userPwChk" />
    </div>

    <button @click="signUp">회원가입</button>
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
  computed: {},
  methods: {
    ...mapActions("token", ["trySignUp"]),
    async signUp() {
      if (!this.checkPw()) {
        alert("비번 다름 다시 입력하셈");
        return;
      }
      const info = {
        userName: this.userName,
        userId: this.userId,
        password: this.userPw,
        role: this.userType,
      };

      const data = await this.trySignUp(info);
      this.ChecksignUp = data;
    },
    checkPw() {
      if (this.userPw == this.userPwChk) {
        return true;
      } else {
        return false;
      }
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
}

.tbox {
  margin-top: 1.5rem;
  text-align: center;
}
.tap {
  cursor: pointer;
  width: 6rem;
  padding: 1rem;
  display: inline-block;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
}
.tbox > div:nth-child(1) {
  border-right: none;
}
.tbox > div:nth-child(2) {
  border-right: none;
}
.click {
  background-color: #fff5d1;
}

.inpbox {
  margin: 0 auto;
  width: 23.15rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
  border-top: none;
  padding: 1rem 0.5rem;
}
.inpbox > input:nth-child(1){
  font-size: 1rem;
  color: black;
  outline: none;
  border: none;
  background-color: #f6f6f6;
  width: 20.85rem;
  padding: 0.9rem 0;
  padding-left: 2rem;
  border-radius: 0.5rem 0.5rem 0 0 ;
  border: solid 1px rgba(65, 65, 65, 0.294);
}
.inpbox > input:nth-child(2){
  font-size: 1rem;
  color: black;
  outline: none;
  border: none;
  background-color: #f6f6f6;
  width: 20.85rem;
  padding: 0.9rem 0;
  padding-left: 2rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
  border-top: none;
}
.inpbox > input:nth-child(3){
  font-size: 1rem;
  color: black;
  outline: none;
  border: none;
  background-color: #f6f6f6;
  width: 20.85rem;
  padding: 0.9rem 0;
  padding-left: 2rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
  border-top: none;

}
.inpbox > input:nth-child(4){
  font-size: 1rem;
  color: black;
  outline: none;
  border: none;
  background-color: #f6f6f6;
  width: 20.85rem;
  padding: 0.9rem 0;
  padding-left: 2rem;
  border-radius: 0 0 0.5rem 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
  border-top: none;
}
input::placeholder {
  font-size: 1rem;
  background-color: #f6f6f6;
}

button {
  cursor: pointer;
  font-size: 1rem;
  padding: 0.9rem 3rem;
  display: block;
  margin: 0 auto;
  background-color: #FFF5D1;
  margin-top: 1.5rem;
  width: 24.5rem;
  border-radius: 0.5rem;
  border: solid 1px rgba(65, 65, 65, 0.294);
}

/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
