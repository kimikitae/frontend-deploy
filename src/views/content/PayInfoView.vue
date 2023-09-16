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
              <img src="../../assets/shopLogo.png" width="100%">
            </div>

            <div class="shopInfo">
              <div class="shopName"> 
                굽네치킨 부산 안락점 
              </div>
              <div class="shopAddress">
                부산광역시 동래구 안락동
              </div>
            </div>
          </div>
          <div class="optionBox">
            <!-- v-for -->
            <div>
              <div class="menuName">1. 고추바사삭</div>
              <div class="price">21000원</div>
              <div class="box3">옵션</div>
              <!-- 옵션 리스트 v-for -->
              <div>
                <div class="optionBox2">
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                </div>
              </div>
            </div>
            <div>
              <div class="menuName">1. 고추바사삭</div>
              <div class="price">21000원</div>
              <div class="box3">옵션</div>
              <!-- 옵션 리스트 v-for -->
              <div>
                <div class="optionBox2">
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                </div>
              </div>
            </div>
            <div>
              <div class="menuName">1. 고추바사삭</div>
              <div class="price">21000원</div>
              <div class="box3">옵션</div>
              <!-- 옵션 리스트 v-for -->
              <div>
                <div class="optionBox2">
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                </div>
              </div>
            </div>
            <div>
              <div class="menuName">1. 고추바사삭</div>
              <div class="price">21000원</div>
              <div class="box3">옵션</div>
              <!-- 옵션 리스트 v-for -->
              <div>
                <div class="optionBox2">
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                  <div class="optionName">뼈치킨</div>
                  <div class="optionPrice">+0원</div>
                </div>
              </div>
            </div>
          </div>
          <div class="shareBox">
            <div class="line2">공유 참여자</div>
            <div class="share">
              <div>
                <div class="sharePeopleBox">
                  <div class="imageBox">
                    <img src="../../assets/userIcon.png" width="60rem" height="60rem">
                  </div>
                  <div class="nameBox">허은진님</div>
                </div>
                <div class="sharePeopleBox">
                  <div class="imageBox">
                    <img src="../../assets/userIcon.png" width="60rem" height="60rem">
                  </div>
                  <div class="nameBox">허은진님</div>
                </div>
                <div class="sharePeopleBox">
                  <div class="imageBox">
                    <img src="../../assets/userIcon.png" width="60rem" height="60rem">
                  </div>
                  <div class="nameBox">허은진님</div>
                </div>
              </div>
            </div>
          </div>
          <div class="payBtn">결제하기</div>
        </div>
    </div>
  </div>
  <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapActions } from "vuex";

export default {
  name: "PayInfoView",
  data() {
    return {
      openUserModal: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions("token", ["tryLogin"]),
  },
  components: {
    NavBar,
    UserModal,
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
  width: 62rem;
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
  border-top: 1px solid #D0D0D0;
  border-bottom: 1px solid #D0D0D0;
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
  border: 1px solid #D0D0D0;
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
  border: 1px solid #D0D0D0;
  float: left;
  width: 58rem;
}

.line2 {
  font-size: 1.4rem;
  margin-top: 5rem;
  margin-bottom: 2rem;
}

.share {
  border: 1px solid #D0D0D0;
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
  width: 20%;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  float: left;
}

.nameBox {
  width: 60%;
  font-size: 1.2rem;
  margin-left: 0.1rem;
  margin-top: 1.5rem;
  float: left;
}

.payBtn {
  width: 58.15rem;
  margin-top: 5rem;
  height: 3rem;
  border: 1px solid #D0D0D0;
  background-color: #FFF5D1;
  text-align: center;
  padding-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  position: fixed;;
  bottom: 0;
}
</style>
