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
                  <span class="btn2"> 프로필 보기 </span>
                </div>
              </div>
            </div>

            <div class="content"></div>
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
  display: flex;
  flex-direction: column;
}
.flexline2 > div {
  flex: 1;
}
.flexline2 > div > span:nth-child(2){
  float: right;
}
.name{
  margin-left: 1rem;
  font-size: 1.6rem;
}
.place{
  margin-left: 1rem;

  line-height: 200%;
}
.btn1{
  border-radius: 0.5rem;
  padding: 1rem 1rem;
  border: 1px solid;
}
.btn2{

}
.line2 > img {
  display: inline;
  width: 5rem;
  height: 5rem;
  border-radius: 5rem;
}

.content {
  width: 35rem;
}
</style>
