<template>
  <router-view/>
  <footermusic v-show="$store.state.isfooter"></footermusic>
</template>
<script>
import footermusic from '@/components/item/footermusic.vue';
export default {
  components:{
    footermusic
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
</style>
