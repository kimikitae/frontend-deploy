<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="frame">
        <div class="line">
          <div class="tit">가게 정보</div>
          <div class="fbox1">
            <img src="../../assets/shopLogo.png" />
            <div class="fcbox1">
              <div>{{ shop.shopName }}</div>
              <star-rating
                class="setstar"
                :star-size="20"
                :rating="shop.starPoint"
                :read-only="true"
                :show-rating="false"
                inactive-color="#9A9A9A"
                active-color="#FEE503"
              ></star-rating>
              <div>
                <span>
                  {{ "주문수 " + shop.orderCount + "회 " }}
                </span>
                <span>
                  {{ "리뷰 " + shop.reviewCount }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="cbox">
          <div class="fbox2">
            <div @click="tabFlag = true">가게 정보</div>
            <div @click="tabFlag = false">리뷰</div>
          </div>
          <hr />

          <template v-if="tabFlag">
            <div class="cont">
              {{ shop.shopDescription }}
            </div>

            <div class="mbox">
              <div>메뉴</div>

              <template v-for="(menu, mindex) in shop.menus" :key="mindex">
                <div class="mflex">
                  <div class="mitem">
                    <img src="../../assets/shopLogo.png" class="slogo" />
                    <div class="cflex">
                      <div>
                        {{ menu.menuName }}
                      </div>
                      <div>
                        {{ menu.options[0].price + "원" }}
                      </div>
                    </div>
                    <img
                      src="../../assets/up.png"
                      class="arrow"
                      @click="openOption(mindex)"
                      v-if="btn == true && i == mindex"
                    />
                    <img
                      src="../../assets/down.png"
                      class="arrow"
                      @click="openOption(mindex)"
                      v-else
                    />
                  </div>

                  <template v-if="i == mindex && btn">
                    <div class="tedo">
                      <template v-for="(option, oindex) in menu.options" :key="oindex">
                        <div class="dbox">
                          <div>{{ option.optionName }}</div>
                          <div>{{ option.price + "원" }}</div>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </template>

          <template v-else>
            <div class="rbox">
              <template v-for="(review, rindex) in shop.reviews" :key="rindex">
                <div class="fline">
                  <img src="../../assets/userIcon.png" />
                  <div class="fcline">
                    <div>{{ review.userName }}</div>
                    <div>
                      <star-rating
                        class="setstar"
                        :star-size="20"
                        :rating="review.starPoint"
                        :read-only="true"
                        :show-rating="false"
                        inactive-color="#9A9A9A"
                        active-color="#FEE503"
                      ></star-rating>
                      <div class="data">
                        {{
                          extrYear(review.createAt) +
                          ". " +
                          extrMonth(review.createAt) +
                          ". " +
                          extrDate(review.createAt)
                        }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="content">
                  {{ review.content }}
                </div>
              </template>
            </div>
          </template>
        </div>

      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
  </main>
</template>

<script>
import StarRating from "vue-star-rating";
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "ShopInfoView",
  data() {
    return {
      tabFlag: true,
      openUserModal: false,
      i: null,
      btn: null,
    };
  },
  computed: {
    ...mapState("shop", {
      shop: (state) => state.shop,
    }),
  },
  methods: {
    ...mapActions("shop", ["getShop"]),
    extrYear(d) {
      return new Date(d).getFullYear();
    },
    extrMonth(d) {
      return new Date(d).getUTCMonth() + 1;
    },
    extrDate(d) {
      return new Date(d).getDate();
    },
    openOption(i) {
      if (this.i != i) {
        this.btn = true;
      } else {
        this.btn = !this.btn;
      }
      this.i = i;
    },
  },
  components: {
    NavBar,
    UserModal,
    StarRating,
  },
  mounted() {
    this.getShop();
  },
};
</script>

<style scoped>
.color {
  background-color: white;
}
.float {
  position: relative;
  top: 5rem;
  padding-bottom: 3rem;
}

.frame {
  width: 45%;
  margin: 0 auto;
}
.tit {
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 0.8rem;
}
.fbox1 {
  display: flex;
}
.fbox1 > img {
  padding: 0 0.5rem;
  width: 4.5rem;
  height: 4.5rem;
}
.fcbox1 {
  display: flex;
  flex-direction: column;
}
.fcbox1 > div:nth-child(1) {
  font-size: 1.2rem;
}
.fcbox1 > div:nth-child(3) {
  margin-top: 0.2rem;
  font-size: 0.8rem;
}
.cbox {
  margin-top: 1rem;
  height: 35rem;
  width: 100%;
  border: 1px solid rgba(123, 123, 123, 0.239);
}
.fbox2 {
  display: flex;
  align-items: center;
  text-align: center;
}
.fbox2 > div {
  padding: 1.5rem 0;
  flex: 1;
  cursor: pointer;
}
.fbox2 > div:nth-child(2) {
  border-left: 1px solid rgba(123, 123, 123, 0.239);
}
hr {
  margin: 0 auto;
  border: 0.1px solid rgba(123, 123, 123, 0.239);
}
.cont {
  height: 7rem;
  overflow-y: scroll;
  margin: 1rem 2rem;
  line-height: 300%;
}
.mbox {
  height: 20rem;
  margin: 0 2rem;
  overflow-y: scroll;
}
.mbox > div:nth-child(1) {
  font-weight: bold;
  font-size: 1.2rem;
}
.mflex {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
}
.mitem {
  display: flex;
  margin-bottom: 1rem;
}
.slogo {
  width: 4.5rem;
  height: 4.5rem;
}
.cflex {
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: 1rem;
}
.cflex > div:nth-child(2) {
  margin-top: auto;
}
.arrow {
  margin-top: 1rem;
  margin-right: 1rem;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}
.tedo {
  border: 1px solid rgba(123, 123, 123, 0.239);
  border-radius: 1rem;
  margin-bottom: 1rem;
}
.dbox {
  margin: 1.5rem;
  display: flex;
}
.dbox > div {
  flex: 1;
}
.dbox > div:nth-child(2) {
  text-align: right;
}
.rbox {
  margin: 0 2rem;
  margin-top: 2rem;
  overflow-y: scroll;
  height: 28rem;
}
.fline {
  display: flex;
  margin-bottom: 1rem;
}
.fline > img {
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
}
.fcline {
  width: 100%;
  margin-left: 1rem;
}
.fcline > div:nth-child(1) {
  display: flex;
  width: 100%;
}
.fcline > div:nth-child(2) {
  display: flex;
  width: 100%;
}
.setstar {
  margin-top: 0.5rem;
  flex: 1;
}
.data {
  margin-top: 0.5rem;
  text-align: right;
  flex: 1;
  color: #d0d0d0;
}
.content {
  padding: 0.7rem 1rem;
  background-color: #f6f6f6;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
}
</style>
