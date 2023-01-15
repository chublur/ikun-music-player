<template>
  <img :src="musiclist.al.picUrl" class="bg-img" />
  <div class="detailtop">
    <div class="detailleft">
      <svg class="icon" aria-hidden="true" @click="updatedetailshow">
        <use xlink:href="#icon-xiangzuojiantou"></use>
      </svg>
      <div class="songname">
        <Vue3Marquee style="color: #fff; font-weight: 800; font-size: 20px">
          <p>{{ musiclist.al.name }}</p>
        </Vue3Marquee>
        <span v-for="item in musiclist.ar" :key="item">{{ item.name }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailright">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailcontent" v-show="!islyricshow">
    <img
      src="@/assets/needle-ab.png"
      class="img_needle"
      :class="{ img_needle_active: !isbtnshow }"
    />
    <img src="@/assets/disc-plus.png" class="img-cd" />
    <img
      :src="musiclist.al.picUrl"
      class="img-ar"
      :class="[!isbtnshow ? 'img_ar_active' : 'img_ar_paused']"
      @click="islyricshow = true"
    />
  </div>
  <div
    class="musiclyric"
    ref="musiclyric"
    v-show="islyricshow"
    @click="islyricshow = false"
  >
    <p
      v-for="item in lyric"
      :key="item"
      :class="{
        active:
          currenttime * 1000 >= item.time && currenttime * 1000 < item.pre,
      }"
    >
      {{ item.lrc }}
    </p>
  </div>
  <div class="detailfooter">
    <div class="footertop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="islyricshow = !islyricshow">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-message"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon-xunhuan"></use>
      </svg>
    </div>
    <div class="footercontent">
      <input type="range" class="range" min="0" :max="duration" v-model="currenttime" step="0.001">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goplay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        style="width: 1rem; height: 1rem"
        @click="play"
        v-if="isbtnshow"
      >
        <use xlink:href="#icon-bofanganniu"></use>
      </svg>
      <svg
        class="icon"
        aria-hidden="true"
        style="width: 1rem; height: 1rem"
        @click="play"
        v-else
      >
        <use xlink:href="#icon-24gl-pauseCircle"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goplay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlistMusic"></use>
      </svg>
    </div>
  </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      islyricshow: false, //是否显示歌词
    };
  },
  props: ["musiclist", "isbtnshow", "play","addduration"],
  computed: {
    ...mapState(["lyriclist", "currenttime", "playlistindex", "playlist","duration"]),
    lyric() {
      let arr;
      if (this.lyriclist.lyric) {
        arr = this.lyriclist.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          // let min = item.slice(1,3);
          // let sec =item.slice(4,6);
          // let mill =item.slice(7,10);
          // let lrc =item.slice(11,item.length);
          let min = item.slice(item.indexOf("[") + 1, item.indexOf(":"));
          let sec = item.slice(item.indexOf(":") + 1, item.indexOf("."));
          let mill = item.slice(item.indexOf(".") + 1, item.indexOf("]"));
          let lrc = item.slice(item.indexOf("]") + 1, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.pre = 1000000;
          } else {
            item.pre = arr[i + 1].time;
          }
        });
      }
      console.log("时间", arr);
      return arr;
    },
  },
  components: { Vue3Marquee },
  mounted() {
    // console.log("sssss", this.musiclist);
    // console.log("歌词", this.lyric);
    console.log("当前时间", this.currenttime);
    console.log('ligdkshg',this.duration);
    // console.log("hahaha", this.lyriclist.lyric.time);
    this.addduration()
  },
  watch: {
    currenttime(newvalue) {
      let p = document.querySelector("p.active");
      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musiclyric.scrollTop = p.offsetTop - 300;
        }
      }
      if (newvalue===this.duration) {
        if (this.playlistindex===this.playlist.length) {
          this.updateplaylistindex(0);
          this.play()
        }else{
          this.updateplaylistindex(this.playlistindex+1)
        }
      }
    },
  },
  methods: {
    ...mapMutations(["updatedetailshow", "updateplaylistindex"]),
    goplay(num) {
      let index = this.playlistindex + num;
      if (index < 0) {
        index = this.playlist.length - 1;
      } else if (index == this.playlist.length) {
        index = 0;
      }
      this.updateplaylistindex(index);
    },
  },
};
</script>
<style lang="less" scoped>
.bg-img {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -9;
  filter: blur(1.3rem);
}
.detailtop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  fill: #fff;
  .detailleft {
    display: flex;
    align-items: center;
  }
  span {
    font-size: 13px;
    color: gray;
  }
  .songname {
    width: 4rem;
    height: 100%;
    margin-left: 0.4rem;
    .icon {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
}
.detailcontent {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  
  .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-15deg);
    transition: all 1.5s;
  }
  .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 1.5s;
  }
  .img-cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img-ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: move 11s linear infinite;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
}
.musiclyric {
  width: 100%;
  height: 8.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;

  p {
    color: rgb(207, 202, 202);
    margin-bottom: 0.4rem;
  }
  .active {
    color: #fff;
    font-size: 0.45rem;
  }
}
.detailfooter {
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footertop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      fill: rgb(245, 234, 234);
    }
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .range{
    width: 100%;
    height: 0.6rem;
  }
}
.footer {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .icon {
    width: 0.5rem;
    height: 0.5rem;
    fill: #666666;
  }
}

@keyframes move {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>