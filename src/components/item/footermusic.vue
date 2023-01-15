<template>
  <div class="footermusic">
    <div class="footerleft" @click="updatedetailshow">
      <img :src="playlist[playlistindex].al.picUrl" />
      <div>
        <p>{{ playlist[playlistindex].name }}</p>
        <span>横滑切换上下曲</span>

      </div>
    </div>
    <div class="footerright">
      <svg class="icon" aria-hidden="true" v-if="isbtnshow" @click="play">
        <use xlink:href="#icon-bofanganniu" ></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-24gl-pauseCircle" ></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gl-playlistHeart3"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playlistindex].id}.mp3`"
    ></audio>
    <van-popup
  v-model:show="detailshow"
  position="right"
  :style="{ width: '100%', height: '100%' }"
><musicdetail :musiclist="playlist[playlistindex]" :play="play" :isbtnshow="isbtnshow" :addduration="addduration"></musicdetail>
</van-popup>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import musicdetail from "@/components/item/musicdetail.vue"
export default {
  data() {
    return {
      timer:0, //定时器
    }
  },
  computed: {
    ...mapState(["playlist", "playlistindex","isbtnshow",'detailshow']),
  },
  components:{musicdetail},
  mounted() {
    console.log(this.$refs);
    this.$store.dispatch("getlyric",this.playlist[this.playlistindex].id);
    this.updatetime();
  },
  updated() {
    this.$store.dispatch("getlyric",this.playlist[this.playlistindex].id);
    this.addduration();
  },
  methods: {
    play() {
        // 判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateisbtnshow(false);
        this.updatetime();  //播放就调用定时器
      } else {
        this.$refs.audio.pause();
        this.updateisbtnshow(true);
        clearInterval(this.timer)
      }
    },
    addduration(){
      this.updateduration(this.$refs.audio.duration)
      console.log('aaa',this.$refs.audio.duration);
    },
    updatetime(){
      this.timer=setInterval(() => {
        this.updatecurrenttime(this.$refs.audio.currentTime)
      }, 1000);
    },
    ...mapMutations(['updateisbtnshow','updatedetailshow','updatecurrenttime','updateduration'])
  },
  watch:{
    // 如果下标发生改变 则自动播放音乐
    playlistindex(){
        this.$refs.audio.autoplay=true;
        if(this.$refs.audio.paused){
            this.updateisbtnshow(false);
        }
    },
    playlist(){
        if (this.isbtnshow) {
            this.$refs.audio.autoplay=true;
        }
    }
  }
};
</script>
<style lang="less" scoped>
.footermusic {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.4rem;
  background-color: #fff;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem;
  .footerleft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p{
        font-weight: bold;
    }
    span{
        font-size: 15px;
        color: #999;
    }
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .footerright {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>