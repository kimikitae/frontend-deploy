<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closeShopRegistModal')" class="close">X</div>
        <div class="line">
          <div class="title">매장 등록</div>
          <input
            class="ssch"
            @keyup.enter="search"
            type="text"
            v-model="brandName"
            placeholder="상호명을 검색하세요."
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '상호명을 검색하세요.'"
          />
          <div class="fline">
            <template v-if="JSON.stringify(brand) !== '{}'">
              <img src="../../assets/shopLogo.png" />
              <div class="fline2">
                <div class="l1">{{ brand.brandName }}</div>
                <div class="l2">{{ brand.shopCount }}명의 사장님과 함께 해요.</div>
              </div>
            </template>
          </div>

          <!-- <div class="sbox">
            <div class="fline">
              <img src="../../assets/shopLogo.png" />
              <div class="fline2">
                <div class="l1">굽네치킨</div>
                <div class="l2">421명의 사장님과 함께 해요.</div>
              </div>
            </div>
          </div> -->
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

        <div class="button" @click="registShopInfo">
          <span> 매장 정보 수정하기 </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "ShopRegistModal",
  data() {
    return {
      brandName: "",
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
      brand: (state) => state.brand,
    }),
  },
  methods: {
    search() {
      const info = {
        brandName: this.brandName,
      };
      this.searchBrand(info);
    },
    registShopInfo() {
      if (
        this.editInfo.newName != null &&
        this.editInfo.newAddress != null &&
        this.editInfo.newTip != null &&
        this.editInfo.newDescription != null &&
        this.brand.brandName != null 
      ) {
        const data = {
            shopName: this.editInfo.newName,
            shopAddress: this.editInfo.newAddress,
            tip: this.editInfo.newTip,
            description: this.editInfo.newDescription,
            brandName: this.brand.brandName
        };
        this.postShopInfo(data);
        this.$emit("closeShopRegistModal");
      } else {
        alert("다시 입력하세여(다 채워서)");
        return;
      }
    },
    ...mapActions("shop", ["postShopInfo", "searchBrand"]),
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
  margin-top: 3rem;
  width: 30rem;
  height: 41.5rem;
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
  flex-direction: column;
  margin-top: 2rem;
  margin-left: 3rem;
}
.title {
  font-size: 2rem;
}
.ssch {
  font-size: 1rem;
  background-color: #f6f6f6;
  border: none;
  outline: none;
  width: 21rem;
  padding: 0.8rem 1.5rem;
  border-radius: 0.7rem;
  display: block;
  margin-top: 1rem;
}
.sbox {
  border-radius: 0.7rem;
  margin-top: 1rem;
  width: 24rem;
  height: 7rem;
  overflow-y: scroll;
  box-shadow: inset 1px 1px 2px 1px rgb(220, 220, 220);
}
.fline {
  width: 24rem;
  height: 5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid rgba(123, 123, 123, 0.239);
  display: flex;
  border-radius: 0.7rem;
}
.fline > img {
  margin: 0.5rem;
  width: 4rem;
  height: 4rem;
}
.fline2 {
  display: flex;
  flex-direction: column;
}
.l1 {
  margin-top: 1rem;
  flex: 1;
  font-weight: bold;
}
.l2 {
  margin-top: 0.1rem;
  flex: 1;
}
.editInfo1 {
  text-align: center;
  float: right;
  margin-top: 1rem;
  margin-bottom: 3px;
  margin-right: 3rem;
}

.editInfo {
  text-align: center;
  float: right;
  margin-top: 6px;
  margin-bottom: 3px;
  margin-right: 3rem;
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
