<template>
  <topnav></topnav>
  <swiper></swiper>
  <iconlist></iconlist>
  <musiclist></musiclist>
</template>

<script>

import topnav from "@/components/home/topnav.vue"
import swiper from "@/components/home/swiper.vue"
import iconlist from "@/components/home/iconlist.vue"
import musiclist from "@/components/home/musiclist.vue"
export default {
  name: 'HomeView',
  components: {
    topnav,
    swiper,
    iconlist,
    musiclist,
  }
}
</script>
