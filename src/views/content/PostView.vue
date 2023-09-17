<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div class="item">
          <div class="upside">
            <div class="title">
              {{ post.title }}
            </div>
            <div class="line1">
              <span>
                {{
                  extrYear(post.createAt) +
                  ". " +
                  extrMonth(post.createAt) +
                  ". " +
                  extrDate(post.createAt) +
                  " " +
                  extrMinutes(post.createAt) +
                  ":" +
                  extrSeconds(post.createAt)
                }}
              </span>
              <span> 삭제 </span>
              <span> 수정 </span>
            </div>

            <div class="line2">
              <img src="../../assets/userIcon.png" />
              <div class="flexline2">
                <div>
                  <span class="name">
                    {{ post.author + "님" }}
                  </span>
                  <span class="btn1"> 공유 참여하기 </span>
                </div>

                <div>
                  <span class="place">
                    {{ post.place + "에 거주하고 있어요." }}
                  </span>
                  <span class="btn2" @click="this.$router.push('/InfoView')"> 프로필 보기 </span>
                </div>
              </div>
            </div>

            <div class="content">
              <div class="top">
                <div class="pcontent">{{ post.content }}</div>
                <div class="psharebox">
                  <div class="pshare">{{ post.place + "에서 공유하길 원해요." }}</div>
                  <div class="pshare">
                    {{ post.people + "명이 나누었으면 좋겠어요." }}
                  </div>
                  <div class="pshare">{{ post.time + "쯤 주문했으면 좋겠어요." }}</div>
                </div>
              </div>

              <div class="mid">
                <div class="head0">공유 정보</div>
                <div class="menu">
                  <div>
                    <span> 메뉴 </span>
                    <span>
                      {{ post.menuName }}
                    </span>
                  </div>
                </div>

                <div class="option">
                  <span> 옵션 </span>
                  <div class="oflex">
                    <template v-for="(share, sindex) in post.shares" :key="sindex">
                      <span>
                        {{
                          sindex +
                          1 +
                          ". " +
                          share.optionName +
                          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                          share.quantity +
                          "개"
                        }}
                      </span>
                    </template>
                  </div>
                </div>
              </div>

              <div class="bot">
                <div class="head1">매장 정보</div>
                <div class="bflex">
                  <img src="../../assets/shopLogo.png" />
                  <div class="bflex1">
                    <div>
                      <span class="sname">
                        {{ post.shopName}}
                      </span>
                      <span class="sshop" @click="toShopInfo"> 가게 살펴보기 </span>
                    </div>

                    <div>
                      <span class="tip">
                        {{ "배달팁 " + post.tip }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
// import router from "../../router";

export default {
  name: "PostView",
  data() {
    return {
      openUserModal: false,
    };
  },
  computed: {
    ...mapState("post", {
      post: (state) => state.post,
    }),
  },
  methods: {
    toShopInfo(){
      this.$router.push('/ShopInfoView')
    },
    ...mapActions("post", ["getPost"]),
    extrYear(d) {
      return new Date(d).getFullYear();
    },
    extrMonth(d) {
      return new Date(d).getUTCMonth() + 1;
    },
    extrDate(d) {
      return new Date(d).getDate();
    },
    extrMinutes(d) {
      return new Date(d).getMinutes();
    },
    extrSeconds(d) {
      return new Date(d).getSeconds();
    },
  },
  components: {
    NavBar,
    UserModal,
  },
  mounted() {
    this.getPost();
  },
};
</script>

<style scoped>
.float {
  background-color: white;
  position: relative;
  width: calc(100%);
  padding-top: 8rem;
}

.flex {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.item {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.upside {
  margin: 0 auto;
}
.title {
  font-size: 2.4rem;
  font-weight: bold;
}
.line1 > span:nth-child(1) {
  color: #d0d0d0;
}
.line1 > span:nth-child(2) {
  float: right;
  color: #d0d0d0;
  cursor: pointer;
  text-decoration: underline;
  padding-right: 0.6rem;
}
.line1 > span:nth-child(3) {
  float: right;
  color: #d0d0d0;
  cursor: pointer;
  text-decoration: underline;
  padding-right: 0.6rem;
}
.line2 {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
}
.line2 > div:nth-child(2) {
  flex: 5;
}
.line2 > div:nth-child(3) {
  flex: 1;
}
.flexline2 {
  flex-basis: 0;
  display: flex;
  flex-direction: column;
}
.flexline2 > div {
  flex: 1;
}
.flexline2 > div > span:nth-child(2) {
  float: right;
}
.flexline2 > div:nth-child(2) {
  padding-top: 0.7rem;
}
.name {
  margin-left: 1rem;
  font-size: 1.6rem;
}
.place {
  margin-left: 1rem;
  line-height: 200%;
}
.btn1 {
  background-color: #fff5d1;
  border-radius: 0.5rem;
  width: 6rem;
  text-align: center;
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(123, 123, 123, 0.647);
}
.btn2 {
  cursor: pointer;
  width: 6rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(123, 123, 123, 0.647);
}
.line2 > img {
  display: inline;
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
}
.content {
  margin-top: 1rem;
  width: 45rem;
}
.top {
  border-top: 1px solid rgba(123, 123, 123, 0.647);
  border-left: 1px solid rgba(123, 123, 123, 0.647);
  border-right: 1px solid rgba(123, 123, 123, 0.647);
  padding-top: 2rem;
  padding-left: 2rem;
}
.pcontent {
  line-height: 300%;
  margin-bottom: 4rem;
}
.pshare {
  line-height: 150%;
  color: #9a9a9a;
}
.psharebox {
  padding-bottom: 2rem;
}
.mid {
  border-top: 1px solid rgba(123, 123, 123, 0.647);
  border-left: 1px solid rgba(123, 123, 123, 0.647);
  border-right: 1px solid rgba(123, 123, 123, 0.647);
}
.head0 {
  padding: 0.5rem 0;
  text-align: center;
}
.menu {
  padding-top: 2rem;
  padding-left: 2rem;
  border-top: 1px solid rgba(123, 123, 123, 0.647);
}
.menu > div > span:nth-child(2) {
  padding-left: 2rem;
}
.option {
  display: flex;
  padding-top: 1.5rem;
  padding-left: 2rem;
}
.oflex {
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-left: 2rem;
}
.oflex > span {
  padding-bottom: 1.5rem;
}
.bot {
  border-top: 1px solid rgba(123, 123, 123, 0.647);
  border-left: 1px solid rgba(123, 123, 123, 0.647);
  border-right: 1px solid rgba(123, 123, 123, 0.647);
  border-bottom: 1px solid rgba(123, 123, 123, 0.647);
}
.head1 {
  padding: 0.5rem 0;
  text-align: center;
}
.bflex {
  display: flex;
  border-top: 1px solid rgba(123, 123, 123, 0.647);
}
.bflex > img {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  width: 5rem;
  height: 5rem;
  border-radius: 3rem;
}
.sshop{
  padding-left: 23rem;
  float: right;
  font-size: 0.8rem;
  color: #d0d0d0;
  cursor: pointer;
  text-decoration: underline;
}
.bflex1{
  width: max-content;
  display: flex;
  flex-direction: column;
}
.bflex1 > div:nth-child(1) {
  width: max-content;
  padding-top: 2rem;
  flex: 1;
  font-size: 1.1rem;
}
.bflex1 > div:nth-child(2) {
  flex: 1;
  font-size: 1.1rem;
}
.sname{
  margin-top: 1rem;
}
.tip{

}
</style>
