<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div>
          <div class="box" v-for="(menu, mindex) in menuList" :key="mindex">
            <div class="boxitem" @click="search(menu)">
              {{ menu }}
            </div>
          </div>
        </div>

        <div>
          <div class="line">
            <div>공유</div>
            <span class="subt">음식을 나누고, 용기도 나눠요.</span>
            <span class="right" @click="this.$router.push('/WriteView')"
              >게시글 작성</span
            >
            <input
              @keyup.enter="search(searchtext)"
              type="text"
              v-model="searchtext"
              placeholder="검색어를 입력하여 검색할 수 있어요."
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '검색어를 입력하여 검색할 수 있어요.'"
            />
          </div>

          <span class="loc">연산동</span>
          <span class="desc">주변 122개 동네의 게시물을 검색합니다.</span>

          <div class="listbox">
            <template v-for="(post, pindex) in posts" :key="pindex">
              <div
                class="item"
                @click="
                  this.setSelectedIdx(post.idx);
                  this.$router.push('/PostView');
                "
              >
                <div class="pleft">
                  <img src="../../assets/shopLogo.png" />
                </div>

                <div class="pcenter">
                  <span class="tit">{{ post.title }}</span>
                  <span class="smname">{{ post.menuName }}</span>
                </div>

                <div class="pright">
                  <span class="sloc">{{ post.place + "에서 공유하길 원해요." }}</span>
                  <span class="speop">{{
                    post.people + "명이 나누었으면 좋겠어요."
                  }}</span>
                  <span class="stime">{{ post.time + "쯤 주문했으면 좋겠어요." }}</span>
                </div>
              </div>
            </template>
          </div>
          <div class="serve">아래로 내리면 더 많은 게시물을 볼 수 있어요.</div>
        </div>

        <div>
          <span class="news">우리 동네 소식</span>
          <div class="newslistbox">
            <template v-for="(notice, nindex) in notices.slice().reverse()" :key="nindex">
              <div class="newsitem">
                <div>
                  {{ notice.content }}
                </div>
                <div>
                  {{ elapsedTime(notice.createAt) }}
                </div>
              </div>
            </template>

            <div class="writebox">
              <input
                @keyup.enter="sendNews"
                v-model="writeNews"
                type="text"
                placeholder="동네 소식 작성하기"
                onfocus="this.placeholder = ''"
                onblur="this.placeholder = '동네 소식 작성하기'"
              />
              <img src="../../assets/send.png" @click="sendNews" />
            </div>
          </div>
        </div>

        <div class="chat" @click="openChatModal = true">채팅</div>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
    <ChatModal v-if="openChatModal" @closeChatModal="openChatModal = false"/>
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import ChatModal from "../../components/chat/ChatModal.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "ShareView",
  data() {
    return {
      openUserModal: false,
      openChatModal: false,
      menuList: ["치킨", "피자", "일식", "중식", "분식", "족발/보쌈"],
      searchtext: "",
      writeNews: "",
    };
  },
  computed: {
    ...mapState("post", {
      posts: (state) => state.posts,
      notices: (state) => state.notices,
    }),
  },
  methods: {
    ...mapMutations("post", ["setSelectedIdx"]),
    ...mapActions("post", ["getPosts", "getSearchPosts", "getNotices", "postNotice"]),
    async search(title) {
      const data = {
        title: title,
      };
      await this.getSearchPosts(data);
    },
    async sendNews() {
      if(this.writeNews == "")return
      const data = {
        content: this.writeNews,
      };
      if (await this.postNotice(data)) {
        this.writeNews = "";
      }
    },
    elapsedTime(date) {
      const start = new Date(date);
      const end = new Date();

      const diff = (end - start) / 1000;

      const times = [
        { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
        { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
        { name: "일", milliSeconds: 60 * 60 * 24 },
        { name: "시간", milliSeconds: 60 * 60 },
        { name: "분", milliSeconds: 60 },
      ];

      for (const value of times) {
        const betweenTime = Math.floor(diff / value.milliSeconds);

        if (betweenTime > 0) {
          return `${betweenTime}${value.name} 전`;
        }
      }
      return "방금 전";
    },
  },
  components: {
    NavBar,
    UserModal,
    ChatModal
  },
  mounted() {
    this.getPosts();
    this.getNotices();
  },
};
</script>

<style scoped>
.float {
  background-color: white;
  position: relative;
  width: 100%;
  padding-top: 6rem;
}
.line {
  width: 100%;
  font-size: 2rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.right {
  border: 1px solid rgba(172, 172, 172, 0.586);
  float: right;
  font-size: 1rem;
  font-weight: bold;
  background-color: #fff5d1;
  padding: 0.5rem 1.2rem;
  margin-right: 3rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.line > .subt {
  margin-top: 1rem;
  font-size: 1rem;
  margin-bottom: 0.8rem;
}
.line > input {
  font-size: 1.1rem;
  background-color: #f6f6f6;
  border: none;
  outline: none;
  width: 90%;
  padding: 1.5rem;
  border-radius: 1rem;
}
.line > input::placeholder {
  color: #d0d0d0;
  font-size: 1.05rem;
}
.flex {
  margin-top: 1rem;
  display: flex;
  align-items: top;
  justify-content: space-around;
  flex-basis: 0;
}
.flex > div {
  margin: 0 0.7rem;
}
.flex > div:nth-child(1) {
  padding-top: 10.5rem;
  flex: 1.3;
}
.flex > div:nth-child(2) {
  flex: 5.5;
}
.flex > div:nth-child(3) {
  padding-top: 11rem;
  flex: 2;
}
.box {
  cursor: pointer;
  margin: 0 auto;
  width: 6.5rem;
  display: flex;
  flex-direction: column;
}
.boxitem {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(123, 123, 123, 0.475);
}
.loc {
  font-size: 2rem;
}
.desc {
  color: #d0d0d0;
  margin-left: 2rem;
}
.news {
  font-size: 1.8rem;
}

.listbox {
  overflow: scroll;
  margin-top: 1rem;
  border-top: 1px solid rgba(123, 123, 123, 0.475);
  border-bottom: 1px solid rgba(123, 123, 123, 0.475);
  height: 26rem;
}
.item {
  cursor: pointer;
  display: flex;
  height: 6rem;
  border-bottom: 1px solid rgba(123, 123, 123, 0.475);
}
.pleft {
  flex: 1;
}
.pleft > img {
  width: 5rem;
  height: 5rem;
  margin: 0.5rem 1rem;
}
.pcenter {
  flex: 3;
  display: flex;
  flex-direction: column;
}
.smname {
  padding-top: 0.5rem;
}
.pright {
  margin: 1rem 0;
  flex: 1.5;
  display: flex;
  flex-direction: column;
}
.tit {
  font-weight: bold;
  font-size: 1.2rem;
  padding-top: 1rem;
  margin-bottom: 0.5rem;
}
.sloc {
  padding-top: 0.2rem;
  font-size: 0.9rem;
}
.speop {
  padding-top: 0.2rem;
  font-size: 0.9rem;
}
.stime {
  padding-top: 0.2rem;
  font-size: 0.9rem;
}
.serve {
  margin-top: 0.5rem;
  text-align: center;
}
.chat {
  background-color: whitesmoke;
  cursor: pointer;
  padding: 0.5rem 1rem;
  z-index: 10;
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(123, 123, 123, 0.475);
}
.newslistbox {
  overflow: scroll;
  height: 24rem;
  margin-top: 1rem;
  margin-right: 2rem;
  border: 1px solid rgba(123, 123, 123, 0.475);
  border-radius: 1rem;
  padding-bottom: 2rem;
}
.newsitem {
  padding: 1rem;
  padding-bottom: 0.5rem;
  margin: 1rem 2rem;
  border: 1px solid rgba(123, 123, 123, 0.647);
  border-radius: 0.5rem;
}
.newsitem > div:nth-child(2) {
  text-align: right;
  color: #9a9a9a;
}
.writebox {
  z-index: 9;
  position: absolute;
  bottom: 3rem;
  width: 20rem;
}
.writebox > input:nth-child(1) {
  background-color: #ffeba4ca;
  height: 1.9rem;
  width: 15rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  padding-left: 0.8rem;
}
.writebox > img {
  cursor: pointer;
  position: absolute;
  margin: 0.1rem 0;
  width: 1.8rem;
  right: 4rem;
}
</style>
