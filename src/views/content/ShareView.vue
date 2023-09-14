<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div>
          <span class="news">우리 동네 소식</span>
        </div>
        <div>
          <div class="line">
            <span>공유</span>
            <span class="right" @click="deleteCart">게시글 작성</span>
            <div class="subt">음식을 나누고, 용기도 나눠요.</div>
            <input
              type="text"
              placeholder="검색어를 입력하여 검색할 수 있어요."
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '검색어를 입력하여 검색할 수 있어요.'"
            />
          </div>
          <span class="loc">연산동</span>
          <span class="desc">주변 122개 동네의 게시물을 검색합니다.</span>
        </div>
        <div>
          <span class="forso">고민석님께 추천드려요</span>
        </div>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "CartView",
  data() {
    return {
      openUserModal: false,
    };
  },
  computed: {
    ...mapState("cart", {
      cartInfo: (state) => state.cartInfo,
    }),
  },
  methods: {
    ...mapMutations("cart", ["setQuantity"]),
    ...mapActions("cart", ["putCartInfo", "deleteCart"]),
    async qModify(m, i, q) {
      const data = [
        {
          idx: i,
          quantity: parseInt(q + m),
        },
      ];
      if (data[0].quantity <= 0) {
        return;
      }
      await this.putCartInfo(data);
    },
  },
  components: {
    NavBar,
    UserModal,
  },
};
</script>

<style scoped>
.float {
  background-color: white;
  position: relative;
  width: 100%;
  padding-top: 8rem;
}
.line {
  width: 100%;
  font-size: 2rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.right {
  border: 1px solid rgba(0, 0, 0, 0.586);
  float: right;
  font-size: 1rem;
  font-weight: bold;
  background-color: #fff5d1;
  padding: 0.5rem 1.2rem;
  margin-right: 2rem;
  border-radius: 8px;
  cursor: pointer;
}
.line > .subt {
  margin-top: 1rem;
  font-size: 1rem;
  margin-bottom: 0.8rem;
}
.line > input {
  font-size: 1.1rem;
  background-color: #f6f6f6;
  border: none;
  outline: none;
  width: 90%;
  padding: 1.5rem;
  border-radius: 1rem;
}
.line > input::placeholder {
  color: #d0d0d0;
  font-size: 1.05rem;
}
.flex {
  margin-top: 1rem;
  display: flex;
  align-items: top;
  justify-content: space-around;
}
.flex > div {
  margin: 0 0.7rem;
}
.flex > div:nth-child(1) {
  padding-top: 10.5rem;

  flex-grow: 1;
}
.flex > div:nth-child(2) {
  flex-grow: 2.1;
}
.flex > div:nth-child(3) {
  padding-top: 10.5rem;
  flex-grow: 1;
}
.news {
  font-size: 1.2rem;
}
.loc {
  font-size: 2rem;
}
.desc {
  margin-left: 1rem;
}
.forso {
  font-size: 1.2rem;
}
</style>
