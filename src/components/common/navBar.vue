<template>
  <main>
    <div class="frame">
      <img class="logo" src="../../assets/appLogo.png" />
      <span class="title">용기나눔</span>
      <span class="menu">공유</span>
      <span class="menu">동네이야기</span>
      <span class="menu">더보기</span>
      <div class="right">
        <div class="button">{{ name }}님
            <img class="direct" src="../../assets/Downarrow.png" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
        name: "고민석"
    };
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.frame {
  width: 99%;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  background-color: white;
}

.logo {
  position: relative;
  left: 0.5rem;
  width: 3rem;
}

.title {
  position: relative;
  left: 0.5rem;
  font-size: 2rem;
  vertical-align: 30%;
}
.menu {
  margin-left: 2rem;
  vertical-align: 70%;
}
.right {
  float: right;
}
.button {
  background-color: white;
  border-radius: 1.5rem;
  border: none;
  box-shadow: 0.5px 0.5px 2px 1px #d6d6d624;
  cursor: pointer;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-right: 1rem;
  margin-top: 1rem;
}
.direct{
  width: 1rem;
}
</style>
