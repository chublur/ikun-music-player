<template>
  <div class="musiclist">
    <div class="musictop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musiccontent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musiclist" :key="item">
          <router-link :to="{ path: '/itemmusic', query: { id: item.id } }">
            <img :src="item.picUrl" />
            <span class="playcount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofanganniu"></use>
              </svg>
              {{ changecount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import { getsonglist } from "@/request/api/home";
import { reactive, onMounted } from "vue";
export default {
  //   data() {
  //     return {
  //       musiclist: [],
  //     };
  //   },
  //   methods: {
  //     async getsonglist() {
  //       let res = await getsonglist();
  //       console.log("歌单", res);
  //       this.musiclist = res.data.result;
  //     },
  //     changecount(num) {
  //       if (num >= 100000000) {
  //         return (num / 100000000).toFixed(1) + "亿";
  //       } else if (num >= 10000) {
  //         return (num / 10000).toFixed(1) + "万";
  //       }
  //     },
  //   },
  //   mounted() {
  //     this.getsonglist();
  //   },

  setup() {
    const state = reactive({
      musiclist: [],
    });
    function changecount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    onMounted(async () => {
      let res = await getsonglist();
      console.log("歌单", res);
      state.musiclist = res.data.result;
    });
    return { state, changecount };
  },
};
</script>
<style lang="less" scoped>
.musiclist {
  position: relative;
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musictop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musiccontent {
    width: 100%;
    height: 4rem;
    overflow: hidden;
    .van-swipe-item {
      margin-right: 0.2rem;
      line-height: 0.5rem;
    }
    .my-swiper {
      height: 100%;
      img {
        width: 100%;
        height: 70%;
        border-radius: 0.3rem;
      }
      .name{
        color: rgb(9, 15, 12);
      }
      .playcount {
        display: inline-block;
        width: 70%;
        height: 0.7rem;
        position: absolute;
        vertical-align: top;
        top: 0;
        left: 0.8rem;
        color: #fff;
        svg {
          vertical-align: top;
        }
      }
    }
  }
}
</style>