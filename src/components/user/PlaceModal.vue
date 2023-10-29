<template>
  <div class="zidx" @click="this.$emit('closePlaceModal')">
    <main>
      <div class="modalframe">
        <template v-for="(addr, aindex) in addresses" :key="aindex">
          <div class="content" @click="toInfo">{{ addr.address }}</div>
          <hr />
        </template>

        <div class="add" @click="search()">+ 주소 추가하기</div>
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
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PlaceModal",
  data() {
    return {
      locinfo: {
        postcode: "",
        roadAddress: "",
        jibunAddress: "",
        extraAddress: "",
      },
    };
  },
  computed: {
    ...mapState("user", {
      addresses: (state) => state.addresses,
    }),
  },
  methods: {
    ...mapActions("user", ["getAddress","addAddress"]),
    async search() {
      //@click을 사용할 때 함수는 이렇게 작성해야 한다.
      new window.daum.Postcode({
        oncomplete: async (data) => {
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
            this.locinfo.extraAddress = extraRoadAddr;
          } else {
            // document.getElementById("extraAddress").value = "";
            this.locinfo.extraAddress = extraRoadAddr;
          }

          const info = {
            address: this.locinfo.jibunAddress,
          };
          const a = await this.addAddress(info);
          if(a){
            this.getAddress();
          }
        },
      }).open();
    },
  },
  mounted() {
    this.getAddress();
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
  z-index: 1;
}
.zidx > main {
  z-index: 100;
  display: block;
  margin-top: 23rem;
  margin-left: auto;
  margin-right: calc(50% - 25rem);
  width: 17rem;
  background-color: white;
  border-radius: 0.5rem;
  border: none;
  box-shadow: 0px 5px 8px 4px #b4b4b476;
  animation: fadeInUp 0.5s ease backwards;
}
.modalframe {
  position: relative;
}
.content1 {
  padding-top: 0.8rem;
  height: 1rem;
}
.content2 {
  color: #d0d0d0;
  margin-right: 1rem;
  float: right;
  font-size: 0.6rem;
  cursor: pointer;
}
.content {
  line-height: 200%;
  text-align: center;
  height: 2rem;
  cursor: pointer;
}
.add {
  padding: 1rem 0;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
}
hr {
  margin: 0 auto;
  width: 80%;
}
.content:hover {
  background-color: #d9d9d9aa;
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
