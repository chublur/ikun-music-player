import { createStore } from 'vuex'
import { getmusiclyric } from '@/request/api/item'
import { getphonelogin } from '@/request/api/home'
export default createStore({
  state: {
    playlist: [{
      al: {
        id: 155101866,
        name: "龙卷风 (温柔女声版)",
        pic: 109951168067497860,
        picUrl: "https://p1.music.126.net/FJabFWzmgTmtCODNBUsV5Q==/109951168067497861.jpg",
        pic_str: "109951168067497861",
      },
      id: 1999265908,
      name: "龙卷风 (温柔女声版)",
      
    }],
    playlistindex: 0,  // 默认下标为0
    isbtnshow: true, //播放按钮的形式
    detailshow: false, //歌曲详情页的展示
    lyriclist:{}, //歌词
    currenttime:0, //当前时间
    duration:0,  // 歌曲总时长
    islogin:false, //是否登录
    isfooter:true,  //是否显示底部组件
    token:'',
    user:{}, //用户信息
  },
  getters: {
  },
  mutations: {
    updateisbtnshow(state, value) {
      state.isbtnshow = value
    },
    updateplaylist(state, value) {
      state.playlist = value
      console.log(state.playlist);
    },
    updateplaylistindex(state, value) {
      state.playlistindex = value
    },
    updatedetailshow(state) {
      state.detailshow = !state.detailshow
    },
    updatelyriclist(state,value) {
      state.lyriclist =value
    },
    updatecurrenttime(state,value){
      // console.log(state.currenttime);
      state.currenttime =value
    },
    updateduration(state,value){
      state.duration =value
    },
    pushplaylist(state,value){
      state.playlist.push(value)
    },
    updateislogin(state,value){
      state.islogin =true;
    },
    updatetoken(state,value){
      state.token =value;
      localStorage.setItem('token',state.token);
    },
    updateuser(state,value){
      state.user = value;
    }
  },
  actions: {
    async getlyric(context, value) {
      let result = await getmusiclyric(value);
      console.log(result);
      context.commit("updatelyriclist",result.data.lrc)
    },
    getlogin:async function(context, value) {
      let res =await getphonelogin(value);
      console.log('登录',res);
      return res;
    }
  },
  modules: {
  }
})
