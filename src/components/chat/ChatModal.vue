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
            <template v-for="(room, rindex) in chats" :key="rindex">
              <div class="roomitem" @click="inRoom(room.idx)">
                <div class="flex0">
                  <div class="fimg">
                    <img src="../../assets/user.png" />
                  </div>

                  <div class="flex1">
                    <span> {{ room.chatTitle }} </span>
                    <span> {{ room.lastMsg }} </span>
                  </div>
                </div>
                <hr />
              </div>
            </template>
          </div>

          <template v-if="seletedRoom">
            <div class="chatbox">
              <template v-for="(message, cindex) in chat.messages" :key="cindex">
                <div
                  :class="{
                    uchatitem: message.userName != userInfo.userName,
                    ichatitem: message.userName == userInfo.userName,
                  }"
                >
                  <div>
                    <img src="../../assets/user.png" class="im" />
                  </div>

                  <div class="tx">
                    <div
                      :class="{
                        uname: message.userName != userInfo.userName,
                        iname: message.userName == userInfo.userName,
                      }"
                    >
                      {{ message.userName }}
                    </div>
                    <div
                      :class="{
                        ucontent: message.userName != userInfo.userName,
                        icontent: message.userName == userInfo.userName,
                      }"
                    >
                      {{ message.content }}
                    </div>
                  </div>
                </div>
              </template>

              <template v-for="(message, cindex) in recvList" :key="cindex">
                <div
                  :class="{
                    uchatitem: message.userName != userInfo.userName,
                    ichatitem: message.userName == userInfo.userName,
                  }"
                >
                  <div>
                    <img src="../../assets/user.png" class="im" />
                  </div>

                  <div class="tx">
                    <div
                      :class="{
                        uname: message.userName != userInfo.userName,
                        iname: message.userName == userInfo.userName,
                      }"
                    >
                      {{ message.userName }}
                    </div>
                    <div
                      :class="{
                        ucontent: message.userName != userInfo.userName,
                        icontent: message.userName == userInfo.userName,
                      }"
                    >
                      {{ message.content }}
                    </div>
                  </div>
                </div>
              </template>

              <div class="writebox">
                <span>
                  TIP. 상단의 점 세개 아이콘을 눌러 채팅방 관리를 할 수 있습니다.
                </span>
                <input
                  type="text"
                  v-model="message"
                  @keyup.enter="sendMessage(chat.idx)"
                />
                <img src="../../assets/send.png" @click="sendMessage(chat.idx)" />
              </div>
            </div>
          </template>

          <div v-else class="nochatbox">왼쪽에서 채팅방을 선택 하세요!</div>
        </div>
      </div>

      <ChatMenuModal
        v-if="openChatMenuModal"
        @closeChatMenuModal="openChatMenuModal = false"
        @closeChatModal="this.$emit('closeChatModal')"
      />
    </main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ChatMenuModal from "./ChatMenuModal.vue";
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

export default {
  name: "ChatModal",
  data() {
    return {
      userName: "das",
      message: "",
      recvList: [],
      openChatMenuModal: false,
      searchtext: "",
      seletedRoom: 0,
      subscription: {},
    };
  },
  computed: {
    ...mapState("chat", {
      chats: (state) => state.chats,
      chat: (state) => state.chat,
    }),
    ...mapState("user", {
      userInfo: (state) => state.userInfo,
    }),
  },
  methods: {
    ...mapActions("chat", ["getChatRooms", "getChatRoom"]),
    async inRoom(idx) {
      console.log("검색" + this.seletedRoom);
      const prev = this.seletedRoom;
      if (prev != 0) {
        this.disconnect();
      }
      this.seletedRoom = idx;
      const data = {
        idx: this.seletedRoom,
      };
      this.getChatRoom(data);
      if (prev != idx) {
        this.connect();
      }
    },
    async sendMessage() {
      if (this.userName !== "" && this.message !== "") {
        this.send();
        this.message = "";
      }
    },
    send() {
      console.log("Send message:" + this.message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userName: this.userInfo.userName,
          content: this.message,
        };
        const s = "/send/" + this.seletedRoom;
        this.stompClient.send(s, JSON.stringify(msg), {});
      }
    },
    connect() {
      const serverURL = "http://localhost:8080/ws";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
      this.stompClient.connect(
        {},
        (frame) => {
          // 소켓 연결 성공
          this.connected = true;
          console.log("소켓 연결 성공", frame);
          // 서버의 메시지 전송 endpoint를 구독합니다.
          // 이런형태를 pub sub 구조라고 합니다.
          const s = "/send/" + this.seletedRoom;
          this.subscription = this.stompClient.subscribe(s, (res) => {
            console.log("구독으로 받은 메시지 입니다.", res.body);
            // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
            this.recvList.push(JSON.parse(res.body));
            console.log(this.recvList);
            this.getChatRooms();
            let mySpace = document.querySelector(".chatbox");
            mySpace.scrollTop = mySpace.scrollHeight;
          });
        },
        (error) => {
          // 소켓 연결 실패
          console.log("소켓 연결 실패", error);
          this.connected = false;
        }
      );
    },
    async disconnect() {
      const s = "/send/" + this.seletedRoom;
      this.recvList = [];
      console.log("구독 종료할게요:" + s);
      await this.subscription.unsubscribe();
    },
  },
  mounted() {
    this.getChatRooms();
  },
  beforeUpdate() {
    this.getChatRooms();
  },
  components: {
    ChatMenuModal,
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
.nochatbox {
  width: 100%;
  height: 92%;
  flex: 3;
  text-align: center;
  line-height: 3000%;
  border-left: 1px solid rgba(172, 172, 172, 0.586);
}
.uchatitem {
  padding: 0 1.5rem;
  width: calc(100% - 3rem);
  display: flex;
  margin-bottom: 1rem;
}
.ichatitem {
  padding: 0 1.5rem;
  width: calc(100% - 3rem);
  display: flex;
  margin-bottom: 1rem;
  flex-direction: row-reverse;
}

.tx {
  display: flex;
  flex-direction: column;
}
.uname {
  margin-left: 0.5rem;
  text-align: left;
  margin-right: auto;
}
.iname {
  text-align: right;
  margin-right: 0.5rem;
  margin-left: auto;
}
.ucontent {
  max-width: 20rem;
  word-wrap: break-word;

  margin-right: auto;
  margin-left: 1rem;

  margin-top: 0.2rem;
  line-height: 140%;
  font-size: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  background-color: #f3f0f0;
}
.icontent {
  max-width: 20rem;
  word-wrap: break-word;

  margin-left: auto;
  margin-right: 1rem;

  margin-top: 0.2rem;
  line-height: 140%;
  font-size: 0.8rem;
  padding: 0.8rem 1rem;
  border-radius: 0.7rem;
  background-color: #fff5d1;
}
.im {
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
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
  width: calc(85% - 3rem);
  margin-left: 5%;
  border-radius: 1rem;
  border: none;
  outline: none;
  padding-left: 0.8rem;
  padding-right: 3rem;
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
