<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closeShopEditModal')" class="close">X</div>
        <div class="line">
          <div class="title">매장 정보 수정</div>
          <div class="dbtn">매장 삭제</div>
        </div>
        <div class="editInfo1">
          <label class="text"> 가게명 </label>
          <input type="text" v-model="editInfo.newName" />
        </div>
        <div class="editInfo">
          <label class="text"> 가게 주소 </label>
          <input type="text" v-model="editInfo.newAddress" />
        </div>
        <div class="editInfo">
          <label class="text"> 배달팁 </label>
          <input type="text" v-model="editInfo.newTip" />
        </div>
        <div class="editInfo">
          <label class="text1"> 가게 정보 </label>
          <textarea v-model="editInfo.newDescription" />
        </div>

        <div class="button" @click="editShopInfo">
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
  name: "ShopEditModal",
  data() {
    return {
      editInfo: {
        newName: "",
        newAddress: "",
        newTip: "",
        newDescription: "",
      },
    };
  },
  methods: {
    editShopInfo() {
      this.$emit("closeShopEditModal");
      if (
        this.editInfo.newName != null &&
        this.editInfo.newAddress != null &&
        this.editInfo.newTip != null &&
        this.editInfo.newDescription != null
      ) {
        const data = {
            newName: this.editInfo.newName,
            newAddress: this.editInfo.newAddress,
            newTip: this.editInfo.newTip,
            newDescription: this.editInfo.newDescription
        };
        this.putShopInfo(data);
        router.push("/InfoView");
      } else {
        alert("다시 입력하세여");
        return;
      }
    },
    ...mapActions("shop", ["putShopInfo"]),
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
  margin-top: 6rem;
  width: 30rem;
  height: 40rem;
  background-color: white;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  animation: fadeInUp 0.5s ease backwards;
}

.modalframe {
  padding-top: 0.5rem;
  position: relative;
}

.close {
  margin-right: 0.5rem;
  float: right;
  cursor: pointer;
}

.line {
  display: flex;
  margin-top: 2rem;
  margin-left: 3rem;
}
.dbtn {
    color: white;
  border-radius: 0.5rem;
  padding: 0 1rem;
  line-height: 200%;
  font-size: 1.15rem;
  margin-right: 2rem;
  margin-left: auto;
  background-color: #fd6363;
}
.title {
  font-size: 2rem;
}

.editInfo1 {
  text-align: center;
  float: right;
  margin-top: 2rem;
  margin-bottom: 3px;
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
.text1{
    padding-bottom: 10rem;
}
textarea {
  width: 17rem;
  height: 10rem;
  font-size: 1.3rem;
  color: black;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  resize: none;
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
