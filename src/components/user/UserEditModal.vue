<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closeUserEditModal')" class="close">X</div>
        <div class="content-box">
          <h1>정보 수정</h1>
          <div class="editInfo1">
            <label class="text"> 닉네임 </label>
            <input type="text" v-model="editInfo.newNickname" />
          </div>
          <div class="editInfo">
            <label class="text"> 이전 비밀번호 </label>
            <input type="password" v-model="editInfo.oldPassword" />
          </div>
          <div class="editInfo">
            <label class="text"> 새 비밀번호 </label>
            <input type="password" v-model="editInfo.newPassword" />
          </div>
        </div>
        <div class="button" @click="editUserInfo">
          <span> 정보 수정하기 </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import router from "@/router";

export default {
  name: "UserEditModal",
  data() {
    return {
      editInfo: {
        newNickname: "",
        oldPassword: "",
        newPassword: "",
      },
    };
  },
  methods: {
    editUserInfo() {
      this.$emit("closeUserEditModal");
      if (
        (this.editInfo.oldPassword != null && this.editInfo.newPassword != null) ||
        this.editInfo.newNickname != null
      ) {
        const data = {
          newNickname: this.editInfo.newNickname,
          oldPassword: this.editInfo.oldPassword,
          newPassword: this.editInfo.newPassword,
        };
        if(data.newNickname == "" || data.newNickname == null) data.newNickname = null
        if(data.oldPassword == "" || data.oldPassword == null || data.newPassword == "" || data.newPassword == null){
            data.oldPassword = null
            data.newPassword = null
        }
        this.putInfo(data);
        router.push("/InfoView");
      } else {
        alert("다시 입력하세여");
        return;
      }
    },
    ...mapActions("user", ["putInfo"]),
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
  z-index: 110;
  backdrop-filter: blur(3px);
}

.zidx > main {
  z-index: 200;
  display: block;
  margin: 0 auto;
  margin-top: 10rem;
  width: 30rem;
  height: 35rem;
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

h1 {
  padding-top: 1rem;
  text-align: center;
}

.editInfo1 {
  text-align: center;
  float: right;
  margin-top: 2rem;
  margin-bottom: 4rem;
  margin-right: 40px;
}

.editInfo {
  text-align: center;
  float: right;
  margin-top: 6px;
  margin-bottom: 3px;
  margin-right: 40px;
}

.text {
  padding-right: 1rem;
}

input {
  font-size: 1.7rem;
  color: black;
  padding: 0.2rem 0;
  text-align: center;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  width: 17rem;
  border: none;
  outline: none;
}

input::-webkit-inner-spin-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
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

.button {
  border-radius: 0 0 0.5rem 0.5rem;
  cursor: pointer;
  position: relative;
  top: 27rem;
  height: 3.5rem;
  background-color: #fff5d1;
  line-height: 370%;
}

span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
