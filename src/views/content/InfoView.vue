<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
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
          <div class="menulist">
            <div class="content">내 주문 내역</div>
            <hr />
            <div class="content">리뷰 관리</div>
            <hr />
            <div class="content" @click="openUserEditModal = true">정보 수정하기</div>
            <hr />
            <div class="content">주문 취소 목록</div>
            <hr />
            <div class="content">내 주소 관리</div>
          </div>
        </div>
        <div class="item">
          <div class="line2">작성한 게시물</div>

          <div class="postlist" v-for="(it, index) in userInfo.posts" :key="index">
            <div class="content">{{ it.title }}</div>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
    <UserEditModal
      v-if="openUserEditModal"
      @closeUserEditModal="openUserEditModal = false"
    />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import UserEditModal from "../../components/info/UserEditModal.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      openUserModal: false,
      openUserEditModal: false,
    };
  },
  computed: {
    ...mapState("user", {
      userInfo: (state) => state.userInfo,
    }),
  },
  methods: {
    ...mapActions("token", ["tryLogin"]),
  },
  components: {
    NavBar,
    UserModal,
    UserEditModal,
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
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.upside {
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
  object-fit: cover;
}

.menulist {
  background-color: white;
  border-radius: 1.5rem;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  cursor: pointer;
  margin-top: 5rem;
  width: 35rem;
  height: 15.5rem;
}
.postlist {
  background-color: white;
  border-radius: 1.5rem;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 1.5rem;
  width: 35rem;
  height: 6.2rem;
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
