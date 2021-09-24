<template>
  <div id="app">
    <ms-header :list="list" />
  </div>
</template>

<script>
import msHeader from '@/components/msHeader/msHeader'
export default {
  components: {
    msHeader
  },
  data() {
    return {
      list: [
        {name: '首页'},
        {name: '个人中心'},
        {name: '关于'}
      ]
    }
  }
}
</script>
<style>
@import url('./assets/common/common.css');
</style>