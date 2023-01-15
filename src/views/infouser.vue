<template lang="">
    <div class="left">
        <svg class="icon" aria-hidden="true" @click="$router.push('/')">
    <use xlink:href="#icon-xiangzuojiantou"></use>
</svg>
    </div>
    <div class="back">
        <img :src="user.data.profile.backgroundUrl" alt="" class="backimg">
    </div>
    <div class="userinfotop">
    <div>
        <img :src="user.data.profile.avatarUrl" alt="" class="avatarimg">
        </div>
        <p class="jianjie">{{user.data.profile.signature}}</p>
    <div class="name">{{user.data.profile.nickname}}</div>
    </div>
    <musiclist></musiclist>
</template>
<script>
import { mapState } from "vuex";
import musiclist from '@/components/home/musiclist'
export default {
  data() {
    return {
      userinfo: "",
    };
  },
  components:{musiclist},
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    console.log("个人信息", this.user);
  },
};
</script>
<style lang="less" scoped>
.left {
    position: relative;
    top: 0;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: rgba(0, 0, 0, .9);
  .icon{
    fill: #fff;
  }
}
.back {
  width: 100%;
  height: 5rem;
  .backimg {
    width: 100%;
    height: 100%;
    background-size: cover;
  }
}
.userinfotop {
  position: absolute;
  top: 1rem;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .avatarimg {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .jianjie {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.24rem;
  }
  .name {
    font-weight: bold;
    font-size: 0.4rem;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>