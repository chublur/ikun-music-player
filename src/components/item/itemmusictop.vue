<template lang="">
    <div class="itemmusic">
        <img :src="playlist.coverImgUrl" class="bg-img">
        <div class="itemleft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-xiangzuojiantou"></use>
              </svg>
              <span>歌单</span>
        </div>
        <div class="itemright">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
              </svg>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
              </svg>
        </div>
    </div>
    <div class="introduce">
        <div class="intro-left">
            <img :src="playlist.coverImgUrl" class="intro-img">
        </div>
        <div class="intro-right">
            <div class="intro-title">{{playlist.name}}</div>
            <div class="intro-user">
                <img :src="playlist.creator.avatarUrl" class="touxiang">
                <span class="intro-name">{{playlist.creator.nickname}}</span>
            </div>
            <div class="intro-description">{{playlist.description}}</div>
        </div>
    </div>

    <div class="tag">
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-message"></use>
              </svg>
              <p>{{playlist.commentCount}}</p>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
              </svg>
              <p>{{playlist.shareCount}}</p>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai"></use>
              </svg>
              <p>下载</p>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-duoxuan"></use>
              </svg>
              <p>多选</p>
        </div>
    </div>

    <div class="songlist">
        <div class="songlist-top">
            <div class="songlist-top-left">
                <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <span>播放全部</span>
            </div>
            <div class="songlist-top-right">
              <span>收藏（{{playlist.trackCount}}）</span>
            </div>
        </div>
        <div class="slist">
            <div class="list-item" v-for="(item,index) in songlist" :key="index">
                <div class="list-left">{{index+1}}</div>
                <div class="list-mid" @click="playmusic(index)">
                     <div class="songname">{{item.name}}</div> 
                     <div class="songauthor">{{item.ar[0].name}}</div> 
                </div>
                <div class="list-right">
                    <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gf-playlistHeart2"></use>
              </svg>
                </div>
            </div>
            
            
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
    setup(props) {
    console.log(props);
    // 判断如果数据拿不到 就去sessionstroage里拿
    if ((props.playlist.creator="")) {
        props.playlist.creator=JSON.parse(sessionStorage.getItem().playlist).creator
    }
  },
  props: ["playlist","songlist"],
  methods:{
    playmusic(i){
        this.updateplaylist(this.songlist)
        this.updateplaylistindex(i)
    },
    ...mapMutations(['updateplaylist','updateplaylistindex'])
  }
};
</script>
<style lang="less" scoped>
.itemmusic {
  position: relative;
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bg-img {
    position: fixed;
    width: 100%;
    height: 11rem;
    z-index: -1;
    filter: blur(20px);
  }
  .itemleft,
  .itemright {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 20px;
      color: #fff;
      font-weight: 800;
    }
    .icon {
      fill: #fff;
    }
  }
}

.introduce{
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-around;
    .intro-left{
        width: 40%;
        height: 100%;
        img{
            width: 100%;
            height: 100%;
            border-radius: .5rem;
        }
    }
    .intro-right{
        width: 55%;
        height: 100%;

        img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }
        .intro-user{
            margin-top: .3rem;
            line-height: .9rem;
            .intro-name{
            vertical-align: top;
            margin-left: .3rem;
            font-size: 0.34rem;
            color: rgb(227, 220, 220);
        }
        }
       
        .intro-title{
            font-size: .35rem;
            font-weight: bold;
            color: #fff;
        }
        .intro-description{
            font-size: .3rem;
            color: rgb(176, 172, 172);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }
}

.tag{
    display: flex;
    margin-top: .5rem;
    justify-content: space-around;
    fill: #fff;
    text-align: center;
    color: #fff;
    p{
        margin-top: .1rem;
    }
}

.songlist{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 7.7rem;
    border-top-right-radius: .5rem;
    border-top-left-radius: .5rem;
    background-color: #fff;
    overflow: scroll;
    .slist{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 6.6rem;
            .list-item{
                display: flex;
                width: 100%;
                height: 1rem;
                margin-top: .1rem;
                .list-left{
                    width: 1rem;
                    text-align: center;
                    font-size: 18px;
                    line-height: 1rem;
                    color: #5c5c66;
                }
                .list-mid{
                    flex: 1;
                    background-color:#fff;
                    line-height: .5rem;
                    .songname{
                        color: black;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .songauthor{
                        color: #686363;
                        font-size: 13px;
                        font-weight: bold;
                    }
                }
                .list-right{
                    width: 1rem;
                    line-height: 1.2rem;
                }
            }

        }
    .songlist-top{
        display: flex;
        line-height: 1rem;
        vertical-align: middle;
        width: 100%;
        height: 1rem;
      
        .songlist-top-left{
            position: absolute;
            left: .3rem;
            font-size: 18px;
            font-weight: 800;
            .icon{
            vertical-align: middle;
            margin-right: .1rem;
            }
        }
        .songlist-top-right{
            position: absolute;
            top: .1rem;
            right: .3rem;
            width: 2.5rem;
            height: .9rem;
            color: #fff;
            line-height: .9rem;
            border-radius: 2rem;
            fill: #fff;
            background-color: #fc381e;
            text-align: center;
        }
        
    }
}

</style>