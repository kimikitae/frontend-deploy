<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div class="item">
          <div class="line">
            <template v-if="viewStatus == 0"> 결제 상세 </template>
            <template v-else-if="viewStatus == 1"> 결제 완료! </template>
          </div>
          <div class="date">
            <template v-if="viewStatus == 0">
              {{
                extrYear(order.createAt) +
                ". " +
                extrMonth(order.createAt) +
                ". " +
                extrDate(order.createAt) +
                " 주문"
              }}
            </template>
          </div>

          <div class="box1">
            <div class="topi">주문상품 정보</div>
            <hr />
            <div class="boxflex">
              <div class="flexch">
                <span>주문번호 </span>
                <span>{{ order.idx }}</span>
              </div>

              <div class="list" v-for="(menu, oindex) in order.menus" :key="oindex">
                <div class="flexch">
                  <span>상품명 </span>
                  <span>{{ menu.menuName }}</span>
                </div>
                <div class="flexch">
                  <span>옵션 </span>
                  <template v-if="menu.items.length == 1">
                    <span>{{ menu.items[0].optionName }}</span>
                  </template>
                  <template v-else>
                    <template v-for="(item, index) in menu.items" :key="index">
                      <span>{{ item.optionName }}</span>
                      <span v-if="index < menu.items.length - 1">, &nbsp; </span>
                    </template>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="box1" v-if="viewStatus == 0">
            <div class="topi">배달 정보</div>
            <hr />
            <div class="boxflex">
              <div class="flexch">
                {{ userName }}
              </div>
              <div class="flexch">
                {{ order.address }}
              </div>
            </div>
          </div>

          <div class="box1" v-if="viewStatus == 1">
            <div class="topi">공유 정보</div>
            <hr />

            <div class="boxflex">
              <div class="flexch">
                <span> 공유 장소 </span>

                <span> 연산동 </span>
              </div>

              <div class="flexch">
                <span> 공유 시간 </span>

                <span> 17:30 분 </span>
              </div>
            </div>
          </div>

          <div class="shad">
            <div class="box2">
              <div class="ptext">결제 금액</div>
              <div class="tprice">{{ order.totalPrice + "원" }}</div>
            </div>

            <div class="box3" @click="this.$router.push('/')">메인으로 돌아가기</div>
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
import { mapState, mapActions } from "vuex";

export default {
  name: "PayView",
  data() {
    return {
      openUserModal: false,
      sum: 0,
    };
  },
  computed: {
    ...mapState("order", {
      order: (state) => state.order,
      viewStatus: (state) => state.viewStatus,
    }),
    ...mapState("user", {
      userName: (state) => state.userInfo.userName,
    }),
  },
  methods: {
    ...mapActions("order", ["getOrder"]),
    getSum(items) {
      console.log(items);
      let sum = 0;
      items.forEach((item) => {
        sum += item.price;
      });
      return sum;
    },
    extrYear(d) {
      return new Date(d).getFullYear();
    },
    extrMonth(d) {
      return new Date(d).getUTCMonth() + 1;
    },
    extrDate(d) {
      return new Date(d).getDate();
    },
  },
  components: {
    NavBar,
    UserModal,
  },
  mounted() {
    if(this.viewStatus == 0){
      this.getOrder();
    } else if(this.viewStatus == 1){
      this.getdsa();
    }
    
  },
};
</script>

<style scoped>
.date {
  font-size: 1.4rem;
  padding-bottom: 0.5rem;
}
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
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
}
.box1 {
  width: 100%;
  border: solid 1px rgba(128, 128, 128, 0.168);
  margin-bottom: 2rem;
}
.topi {
  padding: 1rem 0;
  text-align: center;
}
.boxflex {
  display: felx;
  flex-direction: column;
  justify-content: space-around;
}
.box1 > hr {
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
.flexch {
  display: flex;
  margin: 1.5rem 0;
  margin-left: 2rem;
}
.flexch > span:first-child {
  width: 5rem;
}
</style>
