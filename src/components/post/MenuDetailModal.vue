<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <div @click="this.$emit('closeMenuDetailModal')" class="close">X</div>
        <div class="flex">
          <div class="left">
            <div class="line">
              <div class="tit">{{ shop.shopName }}</div>
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
                          <template
                            v-for="(option, oindex) in menu.options"
                            :key="oindex"
                          >
                            <div class="dbox">
                              <input type="checkbox" @change="check(option.idx)" />
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

          <div class="right">
            <div class="topi">내가 선택한 메뉴</div>
            <div class="ccbox">
              <div class="cartlist" v-for="(menu, mindex) in shop.menus" :key="mindex">
                <template v-if="verif(menu.options)">
                  <div class="cartname">{{ menu.menuName }}</div>
                </template>
                <template v-for="(option, oindex) in menu.options" :key="oindex">
                  <template v-if="oMap.has(option.idx)">
                    <div class="menulist">
                      <div class="line1">
                        <div class="mname">
                          {{ option.optionName }}
                        </div>
                      </div>
                      <div class="line2">
                        <div
                          class="contents pleft btn"
                          @click="qModify(1, option.idx, oMap.get(option.idx))"
                        >
                          +
                        </div>
                        <div class="contents">{{ oMap.get(option.idx) }}</div>
                        <div
                          class="contents btn"
                          @click="qModify(-1, option.idx, oMap.get(option.idx))"
                        >
                          -
                        </div>
                        <span class="price">{{ option.price + "원" }}</span>
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>

            <div class="shad">
              <div class="box2">
                <div class="ptext">주문 예상 금액</div>
                <div class="tprice">{{ totalP + "원" }}</div>
              </div>

              <div class="box3" @click="setMenuShop">메뉴 선택 완료</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "MenuDetailModal",
  data() {
    return {
      tabFlag: true,
      i: null,
      btn: null,
      oMap: new Map(),
    };
  },
  computed: {
    ...mapState("shop", {
      shop: (state) => state.shop,
    }),
    totalP() {
      let totalPrice = 0;
      this.oMap.forEach((value, key) => {
        for (const menu of this.shop.menus) {
          for (const option of menu.options) {
            if (option.idx == key) {
              totalPrice += value * option.price;
            }
          }
        }
      });
      return totalPrice;
    },
  },
  methods: {
    ...mapMutations("post", ["setMenu"]),
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
    check(idx) {
      if (this.oMap.has(idx)) {
        this.oMap.delete(idx);
      } else {
        this.oMap.set(idx, 1);
      }
    },
    verif(options) {
      for (const option of options) {
        if (this.oMap.has(option.idx)) {
          return true;
        }
      }
      return false;
    },
    async qModify(m, i, q) {
      if (m + q <= 0) {
        this.oMap.delete(i);
        return;
      }
      this.oMap.set(i, q + m);
    },
    setMenuShop() {
      let options = [];
      this.oMap.forEach((value, key) => {
        const obj = {};
        obj['idx'] = key;
        obj['quantity'] = value;
        options.push(obj);
      });
      const info = {
        idx: this.shop.idx,
        options: options,
      };
      this.setMenu(info);
      this.$emit('setMenu')
    },
  },
  components: {
    StarRating,
  },
  mounted() {
    this.getShop();
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
  margin-top: 2rem;
  width: 60rem;
  height: 45rem;
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
.flex {
  display: flex;
}
.left {
  margin: 0 1.5rem;
  margin-top: 1rem;
  flex: 4;
}
.right {
  padding-bottom: 1rem;
  flex: 3;
}
.ccbox {
  height: 30rem;
  overflow-y: scroll;
}
.tit {
  font-size: 1.4rem;
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
  height: 39rem;
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
  height: 26rem;
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
  margin-left: 2rem;
}
.dbox > div:nth-child(3) {
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
.right0 {
  float: right;
  font-size: 1rem;
  font-weight: bold;
  background-color: #fff5d1;
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
  width: 88%;
  margin: 1.5rem auto;
  margin-top: 2.5rem;
  font-weight: bold;
  font-size: 1.4rem;
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
.contents {
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
