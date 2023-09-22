<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closeMenuModal')" class="close">X</div>
        <div class="content-box">
          <div class="title">메뉴 선택</div>
          <div class="desc">가게를 선택하면 가게의 메뉴를 볼 수 있어요.</div>
          <input
            @keyup.enter="search(searchtext)"
            type="text"
            v-model="searchtext"
            placeholder="가게 이름을 입력하세요"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '가게 이름을 입력하세요'"
          />
        </div>

        <div class="listbox">
          <template v-for="(shop, sindex) in shops" :key="sindex">
            <div class="listitem" @click="selectMenu(shop.idx)">
              <img src="../../assets/shopLogo.png" />
              <div class="fbox">
                <div class="fline1">
                  <span> {{ shop.shopName }} </span>
                  <star-rating
                    class="setstar"
                    :star-size="20"
                    :rating="shop.starCount"
                    inactive-color="#9A9A9A"
                    active-color="#FEE503"
                    :read-only="true"
                    :show-rating="false"
                  ></star-rating>
                </div>
                <div class="fline2">{{ shop.description }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </main>
    <MenuDetailModal
      v-if="openMenuDetailModal"
      @closeMenuDetailModal="openMenuDetailModal = false"
      @setMenu="openMenuDetailModal = false;
      this.$emit('closeMenuModal')
      "
    />
  </div>
</template>

<script>
import MenuDetailModal from "./MenuDetailModal.vue";
import StarRating from "vue-star-rating";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "MenuModal",
  data() {
    return {
      openMenuDetailModal: false,
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
    ...mapMutations("shop", ["setIdx"]),
    search(menuName) {
      const data = {
        menuName: menuName,
      };
      this.postShops(data);
    },
    selectMenu(sidx) {
      this.openMenuDetailModal = true;
      this.setIdx(sidx);
    },
  },
  mounted() {
    const data = {
      menuName: "",
    };
    this.postShops(data);
  },
  components: {
    StarRating,
    MenuDetailModal,
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
  width: 40rem;
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

.desc {
  color: rgba(0, 0, 0, 0.242);
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
}

.listitem {
  border: 1px solid rgba(123, 123, 123, 0.239);
  border-radius: 0.5rem;
  margin-bottom: 1px;
  cursor: pointer;
}
.listitem > img {
  width: 5rem;
  padding: 0.7rem;
}
.fbox {
  margin-left: 1rem;
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
}
.fline1 {
  margin-top: 1rem;
  display: inline-flex;
}

.setstar {
  margin-left: 2rem;
}
.fline1 > span {
  line-height: 200%;
  font-weight: bold;
}
.fline2 {
  margin-top: 1rem;
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
