<template>
  <main>
    <div class="frame">
      <div class="content">
        <div class="win">
          <img src="../../assets/content_1.png" style="width: 24rem; height: 16rem" />
        </div>
        <div class="ment">
          <div class="aa">
            &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;최소 주문 금액<br />
            &nbsp;&nbsp; 부담스럽지 않으셨나요?
          </div>
        </div>
      </div>

      <div class="content">
        <div class="ment">
          <div class="aa">
            음식이 너무 많이 남아서 <br />
            곤란하셨나요?
          </div>
        </div>
        <div class="win">
          <img src="../../assets/content_2.png" style="width: 24rem; height: 16rem" />
        </div>
      </div>

      <div class="content1">
        <div class="center1">
          용기 나눔은 이런 고객님들께<br />
          추천드려요.
        </div>
      </div>

      <div class="content2">
        <div class="center2">
          최소 주문 금액이 부담스러우신 고객님<br /><br />

          배달 음식이 많이 남아 처리가 곤란하신 고객님<br /><br />

          영업 종료 후 음식이 많이 남으신 가게 사장님
        </div>
      </div>

      <div class="content3">
        <div class="center3">
          용기나눔에서<br />
          모두 해결하세요
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.frame {
  background-color: #e9e9e9;
  position: relative;
  width: calc(100% - 1rem);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: white;
}
.content {
  height: 100vh;
  margin: 0 3rem;
  margin-bottom: 6rem;
  display: flex;
  justify-content: center;
}
.content1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.content2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.content3 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.win {
  margin: 2rem 3rem;
  background-color: white;
  width: 24rem;
  height: 16rem;
  background-color: white;
  border-radius: 1.5rem;
  border: none;
}
.ment {
  display: table;
  margin: 2rem 3rem;
  font-size: 2rem;
  width: 24rem;
  height: 16rem;
}
.aa {
  font-size: 2rem;
  display: table-cell;
  vertical-align: middle;
}
.center1 {
  font-size: 2rem;
  text-align: center;
}
.center2 {
  font-size: 1.4rem;
  text-align: center;
}
.center3 {
  font-size: 2.2rem;
  text-align: center;
}
</style>
