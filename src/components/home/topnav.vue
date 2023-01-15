<template lang="">
    <div class="topnav">
        <div class="topleft"><svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-24gl-playlistHeart3"></use>
</svg></div>
    
<div class="topcontent">
    <span @click="$router.push('/infouser')">我的</span>
    <span class="active">发现</span>
    <span @click="denglu">云村</span>
    <span>视频</span>
</div>
<div class="topright">
    <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
    <use xlink:href="#icon-sousuo"></use>
</svg>
</div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      phone:13178530297,
      pwd:'haoshuai1'
    }
  },
  methods:{
    async denglu(){
      let res =await this.$store.dispatch("getlogin", {
        phone:this.phone,
        password:this.pwd,
      });
      console.log(res);
      if (res.data.code===200) {
        this.$router.push('/infouser')
      }
    }
  }
};
</script>
<style lang="less" scoped>
.topnav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topcontent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    font-size: 0.3333rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>