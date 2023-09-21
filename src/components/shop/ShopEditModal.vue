<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closeShopEditModal')" class="close">X</div>
        <div class="line">
          <div class="title">매장 정보 수정</div>
          <div class="dbtn" @click="openCheckShopModal = true">매장 삭제</div>
        </div>
        <div class="editInfo1">
          <label class="text"> 가게명 </label>
          <input
            type="text"
            v-model="editInfo.newName"
            :placeholder="myShop.shopName"
            @focus="placeholder = ' '"
            @blur="placeholder = myShop.shopName"
          />
        </div>
        <div class="editInfo">
          <label class="text"> 가게 주소 </label>
          <input
            type="text"
            v-model="editInfo.newAddress"
            :placeholder="myShop.shopAddress"
            @focus="placeholder = ' '"
            @blur="placeholder = myShop.shopAddress"
          />
        </div>
        <div class="editInfo">
          <label class="text"> 배달팁 </label>
          <input
            type="text"
            v-model="editInfo.newTip"
            :placeholder="myShop.tip"
            @focus="placeholder = ' '"
            @blur="placeholder = myShop.tip"
          />
        </div>
        <div class="editInfo">
          <label class="text1"> 가게 정보 </label>
          <textarea
            v-model="editInfo.newDescription"
            :placeholder="myShop.description"
            @focus="placeholder = ' '"
            @blur="placeholder = myShop.description"
          />
        </div>

        <div class="button" @click="editShopInfo">
          <span> 매장 정보 수정하기 </span>
        </div>
      </div>

      <CheckShopModal
        v-if="openCheckShopModal"
        @closeCheckShopModal="openCheckShopModal = false"
        @delShop="deleteShop()"
      />
    </main>
  </div>
</template>

<script>
import CheckShopModal from "./CheckShopModal.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "ShopEditModal",
  data() {
    return {
      openCheckShopModal: false,
      editInfo: {
        newName: "",
        newAddress: "",
        newTip: "",
        newDescription: "",
      },
    };
  },
  computed: {
    ...mapState("shop", {
      myShop: (state) => state.myShop,
    }),
    // ...mapGetters("shop", ["getIdx"]),
  },
  methods: {
    editShopInfo() {
      if (
        this.editInfo.newName != null &&
        this.editInfo.newAddress != null &&
        this.editInfo.newTip != null &&
        this.editInfo.newDescription != null
      ) {
        const data = {
          idx: this.myShop.idx,
          newName: this.editInfo.newName,
          newAddress: this.editInfo.newAddress,
          newTip: this.editInfo.newTip,
          newDescription: this.editInfo.newDescription,
        };
        this.putShopInfo(data);
        this.$emit("closeShopEditModal");
      } else {
        return;
      }
    },
    async deleteShop() {
      const info = {
        idx: this.myShop.idx,
      };
      const a = await this.delShop(info);
      if (a) {
        this.$emit("closeShopEditModal");
      } else {
        return;
      }
    },
    ...mapActions("shop", ["putShopInfo", "getMyShop", "delShop"]),
  },
  mounted() {
    this.getMyShop();
  },
  components: {
    CheckShopModal,
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
  height: 31rem;
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
  cursor: pointer;
}
.title {
  font-size: 2rem;
}

.editInfo1 {
  text-align: center;
  float: right;
  margin-top: 2rem;
  margin-bottom: 3px;
  margin-right: 4rem;
}

.editInfo {
  text-align: center;
  float: right;
  margin-top: 6px;
  margin-bottom: 3px;
  margin-right: 4rem;
}

.text {
  padding-right: 1.5rem;
}
.text1 {
  position: relative;
  top: 0.8rem;
  vertical-align: top;
  padding-right: 1.5rem;
}
textarea {
  width: 16rem;
  height: 10rem;
  font-size: 1.1rem;
  color: black;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  resize: none;
  font-family: Arial, sans-serif;
  padding-left: 1rem;
  padding-top: 0.7rem;
  padding-right: 0.5rem;
}

input {
  font-size: 1.1rem;
  color: black;
  padding: 0.5rem 0;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  width: 16rem;
  border: none;
  outline: none;
  padding-left: 1rem;
  padding-right: 0.5rem;
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
  top: 23rem;
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
