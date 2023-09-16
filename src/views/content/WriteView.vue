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
          <input class="title"
              type="text"
              placeholder="제목을 입력하세요"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '제목을 입력하세요'"
          />
          <textarea placeholder="내용을 입력하세요"
          onfocus="this.placeholder = ''" onblur="this.placeholder = '내용을 입력하세요'"></textarea>
          <div class="box1">
            <span>공유 메뉴를 선택하세요</span>
            <div class="plus">+</div>
          </div>
          <div class="box1">
            <span>공유 장소를 선택하세요</span>
            <div class="plus">+</div>
          </div>
          <div class="box1">
            <span>공유 인원를 선택하세요</span>
            <div class="plus"><img src="../../assets/Downarrow.png"></div>
          </div>
          <div class="box1">
            <span>공유 시간를 선택하세요</span>
            <input class="time" type="time" value="xxx" min="yyy" max="zzz">
          </div>
          <div class="line2">
            <div class="btn2">등록</div>
            <div class="btn1">취소</div>
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

export default {
  name: "WriteView",
  data() {
    return {
      openUserModal: false,
    };
  },
  components: {
    NavBar,
    UserModal,
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
  width: 12rem;
}

.plus {
  float: right;
  border: 1px solid #D0D0D0;
  border-radius: 0.3rem;
  width: 1rem;
  text-align: center;
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
  border: 1px solid #D0D0D0;
  float: right;
  margin-left: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.5rem;
  right: inherit;
}

.btn2 {
  width: 5rem;
  border: 1px solid #D0D0D0;
  float: right;
  margin-left: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #FFF5D1;
}
</style>
