import service from "../index";
// 获取首页轮播图数据
export const getbanner = () => {
    //发请求 axios 返回结果是promise对象
    return service({ url: '/banner?type=2', method: 'get' })
};

// 获取发现歌单的数据
export const getsonglist = () => {
    //发请求 axios 返回结果是promise对象
    return service({ url: '/personalized?limit=10', method: 'get' })
};

// 搜索
export const getsearchmusic = (data) => {
    //发请求 axios 返回结果是promise对象
    return service({ url: `/cloudsearch?keywords=${data}`, method: 'get' })
};

// 登录接口
export const getphonelogin = (data) => {
    //发请求 axios 返回结果是promise对象
    return service({ url: `/login/cellphone?phone=${data.phone}&password=${data.password}`, method: 'get' })
};

// 获取用户详情

export const getloginuser = (data) => {
    //发请求 axios 返回结果是promise对象
    return service({ url: `/user/detail?uid=${data}`, method: 'get' })
};