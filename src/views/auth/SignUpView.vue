<script setup>
</script>

<template>
  <main>
    <img class="logo" src="../../assets/appLogo.png">

    <div>
      <div class="tap1" :class="{click: userType == 1}" @click="userType = 1">일반회원</div>
      <div class="tap2" :class="{click: userType == 2}" @click="userType = 2">업주</div>
      <div class="tap3" :class="{click: userType == 3}" @click="userType = 3">라이더</div>
    </div>

    <input type="text" placeholder="User name" v-model="userName">
    <input type="text" placeholder="Id" v-model="userId">
    <button @click="checkId">Check Id</button>
    <div>{{ "아이디 체크 되었니?: " + CheckId }}</div>
    <input type="password" placeholder="Enter Your Password" v-model="userPw">
    <input type="password" placeholder="Check Your Password" v-model="userPwChk">
    <button @click="signUp">SIGN UP</button>
    <div>{{ "아이디 체크 되었니?: " + ChecksignUp }}</div>
  </main>
</template>

<script>
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
      userType: 0,
    };
  },
  computed: {
  },
  methods: {
    async checkId(){
      const info = {
        userId: this.userId
      }
      const response = await fetch(`${this.server}/users/regist/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
      })

      if (!response.ok) {
        throw new Error('계정중복체크에 실패했습니다.')
      }

      const data = await response.json()
      this.CheckId = data.success
    },
    async signUp(){
      if(!this.checkPw()){
        alert('비번 다름 다시 입력하셈')
        return
      }
      const info = {
        userName: this.userName,
        userId: this.userId,
        password: this.userPw,
        passwordCheck: this.userPwChk
      }
      const response = await fetch(`${this.server}/users/regist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info)
        })

        if (!response.ok) {
            throw new Error('회원가입에 실패했습니다.')
        }

        const data = await response.json()
        console.log(data)
        this.ChecksignUp = data.success
    },
    checkPw(){
      if(this.userPw == this.userPwChk){
        return true
      }else{
        return false
      }
    }
  },
};
</script>


<style scoped>
.logo{
  width: 8%;
  margin: 0 auto;
  margin-top: 7%;
  display: block;
}
.tap1{
  display: inline-block;
  background-color: red;
}
.tap2{
  display: inline-block;
  background-color: blue;
}
.tap3{
  display: inline-block;
  background-color: green;
}
.click{
  background-color: white;
}
div{
  text-align: center;
}
input{
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}
button{
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
} */
</style>
