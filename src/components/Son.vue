<template>
  <div id="son">
    <button @click="destroy">销毁事件</button>
  </div>
</template>
<script>
export default {
  name: 'son',
  inject:['getDate'],
  // inject:{ sym },
  data() {
    return {
      date: null,
      event1: 'hook:beforeDestroy',
      event2: 'hook:destroyed'
    }
  },
  mounted() {
    // console.log(this.sym)
    // console.log(this.date())
    console.log(this.getDate())
    console.log(this.$el) // 获取根节点
    // console.log(`子组件调用的父组件信息：${this.$parent.msg}`)
    this.watch()
  },
  methods: {
    watchOnce() {
      this.$once('test',(data) => {
       console.log(`只监听一次test事件${data}`)
      })
    },
    watch() {
      this.$on('test',(data) => {
        console.log(`每次都监听test事件${data}`)
      })
    },
    destroy() {
      this.$emit('test', 'test')
    }
  }
}
</script>