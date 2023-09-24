<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <template v-if="userInfo.idx == uIdx">
          <div class="item">
            <div class="upside">
              <div class="circle">
                <img src="../../assets/user.png" class="userIcon" />
              </div>
              <div class="line1">
                <div class="uname">{{ userInfo.userName }}님</div>
                <div>
                  {{
                    userInfo.orderCount == 0 || userInfo.orderCount == null
                      ? "용기나눔을 이용한 기록이 없어요."
                      : "용기나눔과" + userInfo.orderCount + "번 거래 했어요."
                  }}
                </div>
              </div>
            </div>
            <template v-if="userInfo.role == 'USER'">
              <div class="menulist">
                <div class="content" @click="toOrderList('ing')">내 주문 내역</div>
                <hr />
                <div class="content" @click="toReviewView">리뷰 관리</div>
                <hr />
                <div class="content" @click="openUserEditModal = true">정보 수정하기</div>
                <hr />
                <div class="content" @click="toOrderList('cancel')">주문 취소 목록</div>
                <hr />
                <div class="content" @click="openPlaceModal = true">내 주소 관리</div>
              </div>
            </template>
            <template v-else-if="userInfo.role == 'SHOPPER'">
              <div class="menulist">
                <div class="content" @click="openUserEditModal = true">내 정보 수정</div>
                <hr />
                <div class="content" @click="openShopEditModal = true">
                  매장 정보 수정
                </div>
                <hr />
                <div class="content" @click="opneShopRegistModal = true">매장 등록</div>
              </div>
            </template>
          </div>

          <div class="item">
            <template v-if="userInfo.posts.length">
              <div class="line2">작성한 게시물</div>
              <div class="postlist">
                <template v-for="(it, index) in userInfo.posts" :key="index">
                  <div class="content" @click="toPost(it.idx)">{{ it.title }}</div>
                  <hr />
                </template>
              </div>
            </template>
            <template v-else>
              <div class="line2">작성한 게시물이 없어용..ㅜㅜ</div>
            </template>
          </div>
        </template>

        <template v-else>
          <div class="item">
            <div class="upside">
              <div class="circle">
                <img src="../../assets/user.png" class="userIcon" />
              </div>
              <div class="line1">
                <div class="uname">{{ yourInfo.userName }}님</div>
                <div>
                  {{
                    yourInfo.orderCount == 0 || yourInfo.orderCount == null
                      ? "용기나눔을 이용한 기록이 없어요."
                      : "용기나눔과" + yourInfo.orderCount + "번 거래 했어요."
                  }}
                </div>
              </div>
            </div>
          </div>

          <div class="item">
            <template v-if="yourInfo.posts.length">
              <div class="line2">작성한 게시물</div>
              <div class="postlist">
                <template v-for="(it, index) in yourInfo.posts" :key="index">
                  <div class="content" @click="toPost(it.idx)">{{ it.title }}</div>
                  <hr />
                </template>
              </div>
            </template>
            <template v-else>
              <div class="line2">작성한 게시물이 없어용..ㅜㅜ</div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
    <UserEditModal
      v-if="openUserEditModal"
      @closeUserEditModal="openUserEditModal = false"
    />
    <ShopEditModal
      v-if="openShopEditModal"
      @closeShopEditModal="openShopEditModal = false"
    />
    <ShopRegistModal
      v-if="opneShopRegistModal"
      @closeShopRegistModal="opneShopRegistModal = false"
    />
    <PlaceModal
      v-if="openPlaceModal"
      @closePlaceModal="openPlaceModal = false"
    />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import UserEditModal from "../../components/user/UserEditModal.vue";
import ShopEditModal from "../../components/shop/ShopEditModal.vue";
import ShopRegistModal from "../../components/shop/ShopRegistModal.vue";
import PlaceModal from "../../components/user/PlaceModal.vue";
import { mapActions, mapState, mapMutations } from "vuex";
import router from "../../router";

export default {
  name: "InfoView",
  data() {
    return {
      openPlaceModal: false,
      openUserModal: false,
      openUserEditModal: false,
      openShopEditModal: false,
      opneShopRegistModal: false,
    };
  },
  computed: {
    ...mapState("user", {
      userInfo: (state) => state.userInfo,
      uIdx: (state) => state.uIdx,
      yourInfo: (state) => state.yourInfo
    }),
  },
  methods: {
    toOrderList(s) {
      this.$emit("orderInfo", s);
      router.push("/OrderView");
    },
    toReviewView() {
      router.push("/ReviewView");
    },
    async toPost(idx) {
      this.setSelectedIdx(idx);
      await this.$router.push("/PostView");
    },
    ...mapActions("token", ["tryLogin"]),
    ...mapMutations("post", ["setSelectedIdx"]),
  },
  components: {
    NavBar,
    UserModal,
    UserEditModal,
    ShopEditModal,
    ShopRegistModal,
    PlaceModal,
  },
  mounted() {
    
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
  width: 35rem;
  margin: 0 auto;
}
.circle {
  background-color: #d9d9d9;
  width: 3rem;
  border-radius: 50%;
  overflow: hidden;
  float: left;
}
.line1 {
  margin-left: 1rem;
  float: left;
}
.line2 {
  margin-left: 1rem;
}
.uname {
  font-size: 1.4rem;
  font-weight: bold;
}
.userIcon {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.menulist {
  background-color: white;
  border-radius: 1.5rem;
  border: solid 1px rgba(128, 128, 128, 0.168);
  /* box-shadow: 0px 5px 8px 4px #b4b4b476; */
  cursor: pointer;
  margin-top: 5rem;
  width: 35rem;
  /* height: 15.5rem; */
}
.postlist {
  background-color: white;
  border-radius: 1.5rem;
  border: solid 1px rgba(128, 128, 128, 0.168);
  /* box-shadow: 0px 5px 8px 4px #b4b4b476; */
  cursor: pointer;
  margin: 0 auto;
  margin-top: 1.5rem;
  width: 35rem;
  /* height: 6.2rem; */
  overflow: auto;
}

.content {
  padding-left: 10%;
  line-height: 300%;
  text-align: left;
  height: 3rem;
  cursor: pointer;
}
.content:hover {
  border-radius: 1.5rem;
  background-color: #b7b7b7aa;
}
hr {
  margin: 0 auto;
  width: 80%;
}
</style>
