<template lang="">
    <itemmusictop :playlist="state.playlist" :songlist="state.songlist"></itemmusictop>
</template>
<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import {getmusicitemlist,getallmusic} from '@/request/api/item.js'
import itemmusictop from '@/components/item/itemmusictop'
export default {
    setup(){
        const state = reactive({
            playlist:{}, //歌单详情
            songlist:[],  //歌单的歌曲

        })
        onMounted(async ()=>{
            let id = useRoute().query.id;
            let res = await getmusicitemlist(id);
            console.log(res);
            state.playlist=res.data.playlist;
            // 获取歌单歌曲
            let result = await getallmusic(id);
            console.log(result);
            state.songlist=result.data.songs;
             // 防止页面刷新 数据丢失
            sessionStorage.setItem('itemdetail',JSON.stringify(state))
        });
        return {state};
    },
    components:{
        itemmusictop
    }
}
</script>
<style >
    
</style>