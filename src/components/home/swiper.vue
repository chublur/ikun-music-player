<template >
  <div id="swiper-top">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
import axios from "axios";
import { getbanner } from "@/request/api/home";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      images: [],
    });
    onMounted(async () => {
      let res = await getbanner();
      console.log(res);
      state.images = res.data.banners;
    });
    return { state };
  },
};
</script>
<style lang="less" >
#swiper-top {
  .van-swipe {
    width: 100%;
    .van-swipe-item {
      padding: 0 0.3rem;
      img {
        width: 100%;
        height: 3rem;
        border-radius: 0.2rem;
      }
    }
    .van-swipe__ indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>