<template lang="">
    <div class="iconlist">
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-iconkuozhan_tuijianpre"></use>
            </svg>
            <span>每日推荐</span>
        </div>
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-diantai"></use>
            </svg>
            <span>私人FM</span>
        </div>
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-gedan1"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="iconitem">
            <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>排行榜</span>
        </div>
    </div>
</template>
<script>
export default {
    
};
</script>
<style lang="less" scoped>
    .iconlist{
        width: 100%;
        height: 2rem;
        margin: .1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iconitem{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>