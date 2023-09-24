<template>
  <main class="color">
    <NavBar @openUserModal="openUserModal = true" />
    <div class="float">
      <div class="flex">
        <div class="item">
          <div class="line">
            <span>게시물 작성</span>
          </div>
          <div class="line1">
            <span>게시물을 작성하고 용기를 나누어 보세요.</span>
          </div>
          <input
            v-model="writeInfo.title"
            class="title"
            type="text"
            placeholder="제목을 입력하세요"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '제목을 입력하세요'"
          />
          <textarea
            v-model="writeInfo.content"
            placeholder="내용을 입력하세요"
            onfocus="this.placeholder = ''"
            onblur="this.placeholder = '내용을 입력하세요'"
          ></textarea>
          <div class="box1">
            <span>공유 메뉴를 선택하세요</span>
            <div class="plus" @click="openMenuModal = true">+</div>
          </div>
          <div class="box1">
            <span>공유 장소를 선택하세요</span>
            <div class="plus" @click="search()">+</div>
            <template v-if="false">
              <input
                type="text"
                id="postcode"
                placeholder="우편번호"
                v-model="locinfo.postcode"
              />
              <input
                type="text"
                id="roadAddress"
                placeholder="도로명주소"
                v-model="locinfo.roadAddress"
              />
              <input
                type="text"
                id="jibunAddress"
                placeholder="지번주소"
                v-model="locinfo.jibunAddress"
              />
              <span id="guide" style="color: #000; display: none"></span>
              <input
                type="text"
                id="extraAddress"
                placeholder="참고항목"
                v-model="locinfo.extraAddress"
              />
            </template>
          </div>
          <div class="box1">
            <span>공유 인원를 선택하세요</span>
            <div class="sele">
              <select name="items1" v-model="writeInfo.people">
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
              </select>
            </div>
          </div>
          <div class="box1">
            <span>공유 시간를 선택하세요</span>
            <input
              class="time"
              type="time"
              v-model="writeInfo.time"
              min="yyy"
              max="zzz"
            />
          </div>
          <div class="line2">
            <div class="btn2" @click="write">등록</div>
            <div class="btn1">취소</div>
          </div>
        </div>
      </div>
    </div>
    <UserModal v-if="openUserModal" @closeUserModal="openUserModal = false" />
    <MenuModal v-if="openMenuModal" @closeMenuModal="openMenuModal = false" />
  </main>
</template>

<script>
import NavBar from "../../components/common/navBar.vue";
import UserModal from "../../components/common/UserModal.vue";
import MenuModal from "../../components/post/MenuModal.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "WriteView",
  data() {
    return {
      openUserModal: false,
      openMenuModal: false,
      openPlaceModal: false,
      writeInfo: {
        title: "",
        content: "",
        time: "",
        people: "",
        place: "",
      },
      locinfo: {
        postcode: "",
        roadAddress: "",
        jibunAddress: "",
        // detailAddress: "",
        extraAddress: "",
      },
    };
  },
  methods: {
    ...mapMutations("post", ["setTCTP"]),
    ...mapActions("post", ["writePost"]),
    async write() {
      this.setTCTP(this.writeInfo);
      if (
        this.writeInfo.title != "" &&
        this.writeInfo.content != "" &&
        this.writeInfo.time != "" &&
        this.writeInfo.people != ""
      ) {
        await this.writePost();
      } else {
        alert("다시!");
        return;
      }
    },
    async search() {
      //@click을 사용할 때 함수는 이렇게 작성해야 한다.
      new window.daum.Postcode({
        oncomplete: (data) => {
          //function이 아니라 => 로 바꿔야한다.
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var roadAddr = data.roadAddress; // 도로명 주소 변수
          var extraRoadAddr = ""; // 참고 항목 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          // document.getElementById("postcode").value = data.zonecode;
          // document.getElementById("roadAddress").value = roadAddr;
          // document.getElementById("jibunAddress").value = data.jibunAddress;
          this.locinfo.postcode = data.zonecode;
          this.locinfo.roadAddress = roadAddr;
          this.locinfo.jibunAddress = data.jibunAddress;


          // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
          if (roadAddr !== "") {
            // document.getElementById("extraAddress").value = extraRoadAddr;
            this.writeInfo.place = extraRoadAddr
            this.locinfo.extraAddress = extraRoadAddr
          } else {
            // document.getElementById("extraAddress").value = "";
            this.writeInfo.place = extraRoadAddr
            this.locinfo.extraAddress = extraRoadAddr
          }

          // var guideTextBox = document.getElementById("guide");
          // // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
          // if (data.autoRoadAddress) {
          //   var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          //   guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
          //   guideTextBox.style.display = "block";
          // } else if (data.autoJibunAddress) {
          //   var expJibunAddr = data.autoJibunAddress;
          //   guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
          //   guideTextBox.style.display = "block";
          // } else {
          //   guideTextBox.innerHTML = "";
          //   guideTextBox.style.display = "none";
          // }

        },
      }).open();
    },
  },
  components: {
    NavBar,
    UserModal,
    MenuModal,
  },
  mounted() {},
};
</script>

<style scoped>
.float {
  background-color: white;
  position: relative;
  width: 100%;
  padding-top: 6rem;
}

.flex {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.item {
  width: 38rem;
  margin: 0 auto;
  margin-top: 3rem;
}

.line {
  font-size: 2rem;
  font-weight: bold;
  margin: auto 0;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
}

.line1 {
  margin: auto 0;
  margin-left: 1rem;
  margin-top: 3rem;
}

.line > span {
  float: left;
}

.box1 {
  margin-left: 1rem;
  margin-top: 1.5rem;
  width: 13rem;
}

.plus {
  cursor: pointer;
  float: right;
  border: 1px solid #d0d0d0;
  border-radius: 0.3rem;
  width: 1rem;
  text-align: center;
}

.sele {
  display: inline;
  margin-left: 1rem;
}

.title {
  font-size: 1.1rem;
  background-color: #f6f6f6;
  border: none;
  outline: none;
  width: 35rem;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  margin-top: 1rem;
}

textarea {
  font-family: Arial, sans-serif;
  width: 36.3rem;
  height: 20rem;
  font-size: 1.35em;
  color: black;
  background-color: #f6f6f6;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
  margin-top: 1rem;
  padding-left: 1.5rem;
  padding-top: 1rem;
  border: none;
  outline: none;
  resize: none;
}

.time {
  display: inline;
}

.line2 {
  height: 10rem;
  width: 38rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.btn1 {
  width: 5rem;
  border: 1px solid #d0d0d0;
  float: right;
  margin-left: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.5rem;
  right: inherit;
}

.btn2 {
  cursor: pointer;
  width: 5rem;
  border: 1px solid #d0d0d0;
  float: right;
  margin-left: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #fff5d1;
}
</style>
