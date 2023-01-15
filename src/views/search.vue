<template>
  <div class="searchtop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-jiantou_xiangzuo"></use>
    </svg>
    <input
      type="text"
      placeholder="蔡徐坤"
      v-on:focus="duijiao"
      v-model="searchkey"
      @keydown.enter="enterkey"
    />
  </div>
  <div class="history">
    <p>历史</p>
    <span >蔡徐坤</span>
    <span v-for="item in keywordlist" :key="item" @click="searchhistory(item)">{{
      item
    }}</span>
    <svg class="icon" aria-hidden="true" @click="delhistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>

  <!-- 搜索歌曲列表 -->
  <div class="songlist" >
        <div class="slist">
            <div class="list-item" v-for="(item,index) in searchlist" :key="index">
                <div class="list-left">{{index+1}}</div>
                <div class="list-mid" @click="updateindex(item)">
                     <div class="songname">{{item.name}}</div> 
                     <div class="songauthor">{{item.ar[0].name}}</div> 
                </div>
                <div class="list-right">
                    <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-playlistHeart3"></use>
              </svg>
                </div>
            </div>
            
            
        </div>
    </div>
</template>
<script>
import { getsearchmusic } from "@/request/api/home";
export default {
  data() {
    return {
      keywordlist: [],
      searchkey: "",
    };
  },
  mounted() {
    this.keywordlist = JSON.parse(localStorage.getItem("keywordlist")) || [];
    
  },
  methods: {
    async enterkey() {
      if (this.keyword != "") {
        this.keywordlist.unshift(this.searchkey);
        this.keywordlist = [...new Set(this.keywordlist)];
        if (this.keywordlist.length > 5) {
          this.keywordlist.splice(this.keywordlist.length - 1, 1);
        }
        localStorage.setItem("keywordlist", JSON.stringify(this.keywordlist));
        let res = await getsearchmusic(this.searchkey);
        console.log(res);
        this.searchlist = res.data.result.songs;
        this.searchkey = "";
      }
    },
    delhistory() {
      localStorage.removeItem("keywordlist");
      this.keywordlist = [];
    },
    async searchhistory(item) {
      let res = await getsearchmusic(item);
      console.log(res);
      this.searchlist = res.data.result.songs;
    },
    updateindex(item) {
        this.$store.commit("pushplaylist",item);
        this.$store.commit("updateplaylistindex",this.$store.state.playlist.length-1);
    },

  },
};
</script>
<style lang="less" scoped>
.searchtop {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  input {
    margin-left: 0.2rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 85%;
    padding: 0.1rem;
  }
}

.history {
  position: relative;
  width: 100%;
  padding: 0.2rem;
  p {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }
  span {
    display: inline-block;
    background-color: #999;
    padding: 0.1rem 0.2rem;
    border-radius: 0.4rem;
    margin: 0.2rem 0.2rem;
  }
  .icon {
    position: fixed;
    top: 1.2rem;
    right: 0.3rem;
    width: 0.5rem;
    height: 0.5rem;
  }
}

.songlist{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 10.5rem;
    overflow: scroll;
    z-index: -1;
    .slist{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 10.5rem;
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
        position: fixed;
        display: flex;
        line-height: 1rem;
        vertical-align: middle;
        width: 100%;
        height: 1rem;
        background-color: #fff;
        z-index: 22;
      
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