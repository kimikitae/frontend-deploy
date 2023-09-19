<template>
  <div class="zidx">
    <main>
      <div class="modalframe">
        <img
          src="../../assets/3dots.png"
          @click="openChatMenuModal = true"
          class="close"
        />

        <div class="flex">
          <div class="roomlistbox">
            <div class="roomitem">
              <div class="flex0">
                <div class="fimg">
                  <img src="../../assets/user.png" />
                </div>

                <div class="flex1">
                  <span> 고민석님과의 공유 채팅방 </span>

                  <span> 바로 공유 결제 시작하실까요? </span>
                </div>
              </div>

              <hr />
            </div>

            <div class="roomitem">
              <div class="flex0">
                <div class="fimg">
                  <img src="../../assets/user.png" />
                </div>

                <div class="flex1">
                  <span> 고민석님과의 공유 채팅방 </span>

                  <span> 바로 공유 결제 시작하실까요? </span>
                </div>
              </div>

              <hr />
            </div>
          </div>

          <div class="chatbox">
            <div class="chatitem">
              <template v-if="true">
                <div>
                  <img src="../../assets/user.png" class="im" />
                </div>

                <div class="utx">안녕하세요. 공유 가능하신가요?</div>
              </template>

              <template v-else-if="false">
                <div class="itx">
                  안녕하세요. 공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요.
                  공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요. 공유
                  가능하신가요?안녕하세요. 공유 가능하신가요?
                </div>
                <div>
                  <img src="../../assets/userIcon.png" class="im" />
                </div>
              </template>
            </div>

            <div class="chatitem">
              <template v-if="false">
                <div>
                  <img src="../../assets/user.png" class="im" />
                </div>

                <div class="utx">안녕하세요. 공유 가능하신가요?</div>
              </template>

              <template v-else-if="true">
                <div class="itx">
                  안녕하세요. 공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요.
                  공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요. 공유
                  가능하신가요?안녕하세요. 공유 가능하신가요?
                </div>
                <div>
                  <img src="../../assets/userIcon.png" class="im" />
                </div>
              </template>
            </div>

            <div class="chatitem">
              <template v-if="true">
                <div>
                  <img src="../../assets/user.png" class="im" />
                </div>

                <div class="utx">바로 공유 결제 시작하실까요?</div>
              </template>

              <template v-else-if="false">
                <div class="itx">
                  ewqewq
                </div>
                <div>
                  <img src="../../assets/userIcon.png" class="im" />
                </div>
              </template>
            </div>

            <div class="chatitem">
              <template v-if="false">
                <div>
                  <img src="../../assets/user.png" class="im" />
                </div>

                <div class="utx">안녕하세요. 공유 가능하신가요?</div>
              </template>

              <template v-else-if="true">
                <div class="itx">
                  안녕하세요. 공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요.
                  공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요. 공유
                  가능하신가요?안녕하세요. 공유 가능하신가요?
                </div>
                <div>
                  <img src="../../assets/userIcon.png" class="im" />
                </div>
              </template>
            </div>

            <div class="chatitem">
              <template v-if="false">
                <div>
                  <img src="../../assets/user.png" class="im" />
                </div>

                <div class="utx">안녕하세요. 공유 가능하신가요?</div>
              </template>

              <template v-else-if="true">
                <div class="itx">
                  안녕하세요. 공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요.
                  공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요. 공유
                  가능하신가요?안녕하세요. 공유 가능하신가요?
                </div>
                <div>
                  <img src="../../assets/userIcon.png" class="im" />
                </div>
              </template>
            </div>

            <div class="chatitem">
              <template v-if="false">
                <div>
                  <img src="../../assets/user.png" class="im" />
                </div>

                <div class="utx">안녕하세요. 공유 가능하신가요?</div>
              </template>

              <template v-else-if="true">
                <div class="itx">
                  안녕하세요. 공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요.
                  공유 가능하신가요?안녕하세요. 공유 가능하신가요?안녕하세요. 공유
                  가능하신가요?안녕하세요. 공유 가능하신가요?
                </div>
                <div>
                  <img src="../../assets/userIcon.png" class="im" />
                </div>
              </template>
            </div>

            <div class="writebox">
              <span>
                TIP. 상단의 점 세개 아이콘을 눌러 채팅방 관리를 할 수 있습니다.
              </span>
              <input type="text" />
              <img src="../../assets/send.png" />
            </div>
          </div>
        </div>
      </div>

      <ChatMenuModal v-if="openChatMenuModal" @closeChatMenuModal="openChatMenuModal = false"
        @closeChatModal="this.$emit('closeChatModal')"
        />
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ChatMenuModal from "./ChatMenuModal.vue"

export default {
  name: "ChatModal",
  data() {
    return {
      openChatMenuModal: false,
      searchtext: "",
      ami: "u",
      seletedRoom: 0,
    };
  },
  computed: {
    ...mapState("shop", {
      shops: (state) => state.shops,
    }),
  },
  methods: {
    ...mapActions("shop", ["postShops"]),
    search(menuName) {
      const data = {
        menuName: menuName,
      };
      this.postShops(data);
    },
    selectPlace() {
      this.$emit("closePlaceModal");
    },
  },
  mounted() {
    const data = {
      menuName: "",
    };
    this.postShops(data);
  },
  components:{
    ChatMenuModal,
  }
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
  margin-top: 2%;
  width: 58rem;
  height: 90%;
  background-color: white;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  animation: fadeInUp 0.5s ease backwards;
}

.modalframe {
  padding-top: 0.5rem;
  position: relative;
  height: 100%;
}

.close {
  width: 2rem;
  margin-right: 0.5rem;
  float: right;
  cursor: pointer;
}

.flex {
  height: calc(100% - 4rem);
  width: 100%;
  display: flex;
}

.roomlistbox {
  width: 100%;
  height: max-content;
  flex: 2;
}

.roomitem {
  width: calc(100% - 3rem);
  margin: 1.5rem 1.5rem;
  cursor: pointer;
}

.flex0 {
  display: flex;
  margin-bottom: 0.5rem;
}
.fimg {
  width: 3rem;
  height: 3rem;
}
.fimg > img {
  width: 100%;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
}

.flex1 {
  margin-left: 0.6rem;
  display: flex;
  flex-direction: column;
  width: calc(100% - 3rem);
}
.flex1 > span:nth-child(1) {
  font-size: 0.9rem;
  font-weight: bold;
}
.flex1 > span:nth-child(2) {
  padding-top: 0.8rem;
  font-size: 0.8rem;
}

hr {
  margin: 0 auto;
  width: 95%;
}

.chatbox {
  width: 100%;
  height: 92%;
  flex: 3;
  border-left: 1px solid rgba(172, 172, 172, 0.586);
  overflow-y: scroll;
}

.chatitem {
  padding: 0 1.5rem;
  width: calc(100% - 3rem);
  display: flex;
  margin-bottom: 2rem;
}
.itx {
  margin-right: 1rem;
  margin-left: 40%;
  margin-top: 0.2rem;
  line-height: 140%;
  font-size: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  background-color: #fff5d1;
}

.utx {
  margin-left: 1rem;
  margin-right: 40%;
  margin-top: 0.2rem;
  line-height: 140%;
  font-size: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  background-color: #f3f0f0;
}



.im {
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
}

.uimg {
  /* width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  margin-left: 2rem;
  padding-top: 1rem; */
  float: left;
}

.u {
  float: left;

  background-color: #f3f0f0;
}
.iimg {
  float: right;

  /* border-radius: 3rem;
  margin-left: 2rem;
  padding-top: 1rem; */
}

.i {
  float: right;

  background-color: #fff5d1;
  /* line-height: 140%;
  font-size: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 0.7rem; */
}

.writebox {
  z-index: 9;
  position: absolute;
  bottom: 2rem;
  width: 60%;
}
.writebox > span {
  color: #9a9a9a;
  font-size: 0.8rem;
  padding-left: 7%;
}
.writebox > input {
  background-color: #ffeba4ca;
  height: 1.9rem;
  width: 85%;
  margin-left: 5%;
  border-radius: 1rem;
  border: none;
  outline: none;
  padding-left: 0.8rem;
}
.writebox > img {
  cursor: pointer;
  position: absolute;
  margin: 0.1rem 0;
  width: 1.8rem;
  right: 10%;
}

@keyframes fadeInUp {
  0% {
    transform: translate(0px, 7px);
    opacity: 0;
  }

  100% {
    transform: translate(0px, 0);
    opacity: 1;
  }
}
</style>
