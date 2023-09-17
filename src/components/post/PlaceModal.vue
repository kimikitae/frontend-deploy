<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closePlaceModal')" class="close">X</div>
        <div class="content-box">
          <div class="title">장소 선택</div>
          <input
            type="text"
            v-model="searchtext"
            placeholder="지명 및 도로명을 입력하세요. 예) 연산동"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '지명 및 도로명을 입력하세요. 예) 연산동'"
          />
        </div>

        <div class="listbox">
          <template v-for="(shop, sindex) in shops" :key="sindex">
            <div class="listitem">
              <div class="fbox">
                <div class="fline1">부산광역시 연제구 연산동</div>
                <div class="fline2">133,291 명이 살고 있어요.</div>
              </div>
            </div>
            <div class="listitem">
              <div class="fbox">
                <div class="fline1">충남 논산시 연산면</div>
                <div class="fline2">123 명이 살고 있어요.</div>
              </div>
            </div>
          </template>
        </div>

        <div class="bott">
          <div class="desc">선택된 위치</div>

          <div class="listitem1">
            <div class="fbox">
              <div class="fline1">
                <span> 부산광역시 연제구 연산동 </span>
              </div>
              <div class="fline2">133,291 명이 살고 있어요.</div>
            </div>
          </div>

          <div class="cbtn">장소 선택 완료</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PlaceModal",
  data() {
    return {
      searchtext: "",
    };
  },
  computed: {
    ...mapState("shop", {
      shops: (state) => state.shops,
    }),
  },
  methods: {
    ...mapActions("shop", ["postShops"]),
    search(menuName) {
      const data = {
        menuName: menuName,
      };
      this.postShops(data);
    },
  },
  mounted() {
    const data = {
      menuName: "",
    };
    this.postShops(data);
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
  width: 32rem;
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

.content-box {
  margin-top: 0.5rem;
}

.title {
  font-size: 2rem;
  padding-top: 1rem;
  padding-left: 2rem;
}
.content-box > input {
  font-size: 1.1rem;
  background-color: #f6f6f6;
  border: none;
  outline: none;
  width: 83%;
  padding: 1.5rem;
  border-radius: 1rem;
  display: block;
  margin: 0 auto;
  margin-top: 1rem;
}
.content-box > input::placeholder {
  color: #d0d0d0;
  font-size: 1.05rem;
}

.listbox {
  width: calc(83% + 3rem);
  margin: 0 auto;
  margin-top: 1.5rem;
  overflow-y: scroll;
  height: 11rem;
}

.listitem {
  border: 1px solid rgba(123, 123, 123, 0.239);
  border-radius: 0.5rem;
  margin-bottom: 1px;
  cursor: pointer;
}

.bott {
  width: 100%;
  position: absolute;
  bottom: -18rem;
}

.desc {
  padding-top: 3rem;
  padding-bottom: 0.5rem;
  padding-left: 2.5rem;
  font-size: 1.3rem;
  font-weight: bold;
}

.listitem1 {
  width: calc(83% + 3rem);
  margin: 0 auto;
  border: 1px solid rgba(123, 123, 123, 0.239);
  border-radius: 0.5rem;
  margin-bottom: 1px;
  cursor: pointer;
}
.fbox {
  margin-left: 1rem;
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
}
.fline1 {
  margin-top: 1rem;
  font-weight: bold;
}
.fline2 {
  margin-top: 0.8rem;
  margin-bottom: 0.5rem;
}

.cbtn {
  margin: 2rem 2rem;
  text-align: center;
  font-size: 1.3rem;
  line-height: 400%;
  height: 5rem;
  cursor: pointer;
  background-color: #fff5d1;
  font-weight: bold;
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
</style>
