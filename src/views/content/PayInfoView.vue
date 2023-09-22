<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div class="item">
          <div class="line">
            <span>결제 정보</span>
          </div>

          <div class="box1">
            <div class="shopImage">
              <img src="../../assets/shopLogo.png" />
            </div>

            <div class="shopInfo">
              <div class="shopName">{{ payInfo.shopName }}</div>
              <div class="shopAddress">{{ payInfo.shopAddress }}</div>
            </div>
          </div>

          <div class="optionBox">
            <template v-for="(menu, mindex) in payInfo.menus" :key="mindex">
              <div class="menuName">{{ mindex + 1 + ". " + menu.menuName }}</div>
              <div class="price">{{ menu.menuPrice + "원" }}</div>
              <div class="box3">옵션</div>
              <template v-for="(option, oindex) in menu.options" :key="oindex">
                <div class="optionBox2">
                  <div class="optionName">{{ option.optionName }}</div>
                  <div class="optionPrice">{{ "+" + option.optionPrice + "원" }}</div>
                </div>
              </template>
            </template>
          </div>

          <div class="shareBox">
            <div class="line2">공유 참여자</div>
            <div class="share">
              <template v-for="(person, pindex) in payInfo.peoples" :key="pindex">
                <div class="sharePeopleBox">
                  <div class="imageBox">
                    <img src="../../assets/userIcon.png" />
                  </div>
                  <div class="nameBox">{{ person }}</div>
                </div>
              </template>
            </div>
          </div>
          <div class="payBtn" @click="openCheckPayModal = true">결제하기</div>
        </div>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
    <CheckPayModal
      v-if="openCheckPayModal"
      @closeCheckPayModal="openCheckPayModal = false"
    />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import CheckPayModal from "../../components/order/CheckPayModal.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "PayInfoView",
  data() {
    return {
      openUserModal: false,
      openCheckPayModal: false,
    };
  },
  computed: {
    ...mapState("order", {
      payInfo: (state) => state.payInfo,
    }),
  },
  methods: {
    ...mapActions("order", ["getPayInfo"]),
  },
  components: {
    NavBar,
    UserModal,
    CheckPayModal,
  },
  mounted() {
    this.getPayInfo();
  },
};
</script>

<style scoped>
.color {
  background-color: white;
}
.float {
  background-color: white;
  position: relative;
  width: 100%;
  padding-top: 6rem;
}

.flex {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.item {
  width: 58.15rem;
  margin: 0 auto;
  margin-top: 3rem;
}

.line {
  font-size: 2.5rem;
  font-weight: bold;
  margin: auto 0;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
}

.box1 {
  height: 8rem;
}

.shopImage {
  margin-top: 1rem;
  margin-left: 2rem;
  width: 6rem;
  height: 6rem;
  float: left;
}
.shopImage > img{
  width: 100%;
}

.shopInfo {
  margin-top: 1rem;
  margin-left: 1rem;
  width: 20rem;
  height: 6rem;
  float: left;
}

.shopName {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
}

.shopAddress {
  margin-top: 0.7rem;
}

.optionBox {
  width: 58.15rem;
  height: 30rem;
  overflow-y: scroll;
  border-top: 1px solid #d0d0d0;
  border-bottom: 1px solid #d0d0d0;
}

.optionBox::-webkit-scrollbar {
  display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

.box2 {
  height: 3rem;
}

.menuName {
  width: 16rem;
  margin-top: 1rem;
  margin-left: 1rem;
  float: left;
}

.price {
  width: 16rem;
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  float: right;
  text-align: right;
}
.box3 {
  width: 41rem;
  padding-left: 17rem;
  padding-top: 1rem;
  height: 2rem;
  border: 1px solid #d0d0d0;
  float: left;
}

.optionName {
  width: 16rem;
  margin-top: 1rem;
  margin-left: 2rem;
  float: left;
  margin-bottom: 1rem;
}

.optionPrice {
  width: 16rem;
  margin-top: 1rem;
  margin-right: 2rem;
  float: right;
  text-align: right;
  margin-bottom: 1rem;
}

.optionBox2 {
  border: 1px solid #d0d0d0;
  float: left;
  width: 58rem;
}

.line2 {
  font-size: 1.4rem;
  margin-top: 5rem;
  margin-bottom: 2rem;
}

.share {
  border: 1px solid #d0d0d0;
  height: 10rem;
  width: 58rem;
  overflow-y: scroll;
  margin-bottom: 10rem;
}

.share::-webkit-scrollbar {
  display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

.sharePeopleBox {
  width: 100%;
  height: 5rem;
}

.imageBox {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  float: left;
}
.imageBox > img {
  width: 60px;
  height: 60px;
}

.nameBox {
  width: 60%;
  font-size: 1.2rem;
  margin-left: 3rem;
  margin-top: 1.5rem;
  float: left;
}

.payBtn {
  width: 58.15rem;
  margin-top: 5rem;
  height: 3rem;
  border: 1px solid #d0d0d0;
  background-color: #fff5d1;
  text-align: center;
  padding-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  position: fixed;
  bottom: 0;
  cursor: pointer;
}
</style>
