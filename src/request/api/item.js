// 歌单详情的接口
import service from "..";

// 获取歌单详情数据
export const getmusicitemlist = (id) => {
    //发请求 axios 返回结果是promise对象
    return service({ url: `/playlist/detail?id=${id}`, method: 'get' })
};

// 获取歌单所有歌曲
export const getallmusic = (id) => {
    //发请求 axios 返回结果是promise对象
    return service({ url: `/playlist/track/all?id=${id}&limit=20&offset=0`, method: 'get' })
};

// 获取歌词数据
export const getmusiclyric = (id) => {
    //发请求 axios 返回结果是promise对象
    return service({ url: `/lyric/new?id=${id}`, method: 'get' })
};