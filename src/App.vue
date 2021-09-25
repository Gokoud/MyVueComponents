<template>
  <div id="app">
    <ms-header :list="list" />
    <ms-scroll />
  </div>
</template>

<script>
import MsHeader from '@/components/msHeader/msHeader'
import MsScroll from '@/components/msScroll/msScroll.vue'
export default {
  components: {
    MsHeader,
    MsScroll
  },
  data() {
    return {
      list: [
        {name: '首页'},
        {name: '个人中心'},
        {name: '赞助我'},
        {name: '关于'}
      ]
    }
  }
}
</script>
<style>
@import url('./assets/common/common.css');
</style>