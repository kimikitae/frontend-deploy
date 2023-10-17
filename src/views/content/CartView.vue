<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div class="item">
          <div class="line">
            <span>장바구니</span>
            <span class="right" @click="deleteCart">장바구니 비우기</span>
          </div>
          <div class="box1">
            <div class="topi">장바구니 정보</div>
            <hr />
            <div class="cartlist" v-for="(menu, mindex) in cartInfo.menus" :key="mindex">
              <div class="cartname">{{ menu.menuName }}</div>
              <template v-for="(cart, cindex) in menu.carts" :key="cindex">
                <div class="menulist">
                  <div class="line1">
                    <div class="mname">
                      {{ cindex + 1 + ". " + cart.option.optionName }}
                    </div>
                  </div>
                  <div class="line2">
                    <div
                      class="content pleft btn"
                      @click="qModify(1, cart.idx, cart.quantity)"
                    >
                      +
                    </div>
                    <div class="content">{{ cart.quantity }}</div>
                    <div
                      class="content btn"
                      @click="qModify(-1, cart.idx, cart.quantity)"
                    >
                      -
                    </div>
                    <span class="price">{{ cart.price + "원" }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <div class="shad">
            <div class="box2">
              <div class="ptext">주문 예상 금액</div>
              <div class="tprice">{{ cartInfo.totalPrice + "원" }}</div>
            </div>

            <div class="box3" @click="this.$router.push('/PayInfoView')">결제하기</div>
          </div>
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
    ...mapMutations("chat", ["setPostIdx"]),
    ...mapActions("cart", ["getCartInfo", "putCartInfo", "deleteCart"]),
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
  mounted(){
    this.getCartInfo();
    this.setPostIdx(this.cartInfo.postIdx);
  }
};
</script>

<style scoped>
.float {
  background-color: white;
  position: relative;
  width: 100%;
  padding-top: 8rem;
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
.right{
  float: right;
  font-size: 1rem;
  font-weight: bold;
  background-color: #FFF5D1;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}
.box1 {
  width: 100%;
  border: solid 1px rgba(128, 128, 128, 0.168);
  /* box-shadow: 0px 5px 8px 4px #b4b4b476; */
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
.box3 {
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.4rem 0;
  background-color: #fff5d1;
  cursor: pointer;
}
.shad {
  border: solid 1px rgba(128, 128, 128, 0.168);
  /* box-shadow: 0px 5px 8px 4px #b4b4b476; */
}
</style>
