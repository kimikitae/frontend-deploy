<template>
  <main>
    <div class="frame">
      <div class="content">
        <div class="win">사진</div>
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
            음식이 너무 많이 남아서 <br/>
            곤란하셨나요?
          </div>
        </div>
        <div class="win">사진</div>
      </div>

      <div class="content1">
        <div class="center">
            용기 나눔은 이런 고객님들께<br/>
            추천드려요.
        </div>
      </div>

      <div class="content2">
        <div class="center1">
            최소 주문 금액이 부담스러우신 고객님<br/><br/>

            배달 음식이 많이 남아 처리가 곤란하신 고객님<br/><br/>

            영업 종료 후 음식이 많이 남으신 가게 사장님
        </div>
      </div>

      <div class="content3">
        <div class="center2">
            용기나눔에서<br/>
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
  position: relative;
  width: calc(100% - 1rem);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: white;
}
.content {
  margin: 0 3rem;
  margin-bottom: 6rem;
  display: flex;
  justify-content: center;
}
.content1{
  margin-top: 9rem;
  display: flex;
  justify-content: center;
}
.content2{
  margin-top: 5rem;
  display: flex;
  justify-content: center;
}
.content3{
  margin-top: 10rem;
  padding-bottom: 16rem;
  display: flex;
  justify-content: center;
}
.win {
  margin: 2rem 3rem;
  background-color: white;
  width: 24rem;
  height: 16rem;
  background-color: white;
  border-radius: 1.5rem;
  border: none;
  box-shadow: 2px 2px 10px 4px #43434324;
}
.ment {
  display: table;
  margin: 2rem 3rem;
  font-size: 2rem;
  width: 24rem;
  height: 16rem;
}
.aa {
  display: table-cell;
  vertical-align: middle;
}
.center{
  font-size: 2rem;
  text-align: center;
}
.center1{
  font-size: 1.4rem;
  text-align: center;
}
.center2{
  font-size: 2.2rem;
  text-align: center;
}
</style>
