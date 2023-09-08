<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div class="item">
          <div class="line">장바구니</div>
          <div class="box1">
            <div class="topi">장바구니 정보</div>
            <hr />
            <!-- <div class="cartlist" v-for="(it, index) in cartInfo.menus" :key="index"> -->
            <div class="cartlist">
              <div class="cartname">고추 바사삭</div>
              <div class="menulist">
                <div class="line1">
                  <div class="mname">1. 뼈치킨</div>
                </div>
                <div class="line2">
                  <div class="content pleft btn">+</div>
                  <div class="content">1</div>
                  <div class="content btn">-</div>
                  <span class="price">19000원</span>
                </div>
              </div>

              <!-- <div class="content">{{ it.menuName }}</div>
              <div class="content">{{ it.carts.option.optionName }}</div>
              <div class="content">{{ it.carts.price }}</div>
              <div class="content">{{ it.carts.quantity }}</div> -->
            </div>
          </div>

          <div class="box2">
            <div class="ptext">주문 예상 금액</div>
            <div class="tprice">44000원</div>
          </div>

          <div class="box3">결제하기</div>
        </div>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
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
  methods: {},
  components: {
    NavBar,
    UserModal,
  },
};
</script>

<style scoped>
.color {
  background-color: #d9d9d9;
}

.float {
  background-color: white;
  position: relative;
  top: 1rem;
  width: calc(100% - 1rem);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-top: 4rem;
}
.flex {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.item {
  width: 60%;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.line {
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
}
.box1 {
  width: 100%;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}
.topi {
  padding: 1rem 0;
  text-align: center;
}
.cartlist {
  margin: 0 auto;
  width: 88%;
  margin-bottom: 2rem;
}
.cartname {
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 0.7rem;
}
.menulist {
  height: 5rem;
  border: solid 0.5px #d0d0d079;
}
.line1 {
  height: 2.5rem;
  display: flex;
  align-items: center;
}
.mname {
  padding-left: 1rem;
}
.line2 {
  height: 2.5rem;
}
.pleft {
  margin-left: 1rem;
}
.line2 > div {
  width: 1.7rem;
  height: 1.7rem;
  border: solid 0.5px #d0d0d09f;
  text-align: center;
  line-height: 170%;
}
.price {
    float: right;
  font-weight: bold;
  margin-right: 1rem;
}
.btn {
  cursor: pointer;
}
.content {
  float: left;
}
hr {
  margin: 0 auto;
  width: 100%;
}

.box2 {
  height: 3rem;
  border: solid 0.5px #d0d0d09f;
  padding-left: 2rem;
}
.ptext {
  line-height: 230%;
  float: left;
  font-weight: bold;
  font-size: 1.3rem;
}
.tprice {
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 240%;
  float: right;
  margin-right: 1rem;
  color: #113ee0;
}
.box3{
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.4rem 0;
  background-color: #FFF5D1;
  cursor: pointer;
}
</style>
