<template>
  <div id="son">
    <button @click="emitParentEvent">点击触发父组件A事件</button>
    <button @click="send">传 test 给 app</button>
    <button @click="watchOff">卸载 test 事件</button>
  </div>
</template>
<script>
const fn = (data) => {
        console.log(`每次都监听test事件${data}`)
      }
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
    // console.log(this.getDate())
    //console.log(this.$el)  获取根节点
    // console.log(`子组件调用的父组件信息：${this.$parent.msg}`)
    this.watch()
  },
  methods: {
    emitParentEvent() {
      this.$bus.emit(this.$bus.TYPES.EVENT1.ADD.CONFIRM, '父组件A事件被触发了');
    },
    watchOff() {
      // 如果没有填写事件名的话，就会删除该组件监听的所有事件
      // 如果填了事件名没填回调函数的话，那么就删除该事件的所有回调
      // 如果填了事件名和回调函数的话，那么就会删除该时间中的与之匹配的回调函数
      this.$off('test',fn)
    },
    watchOnce() {
      this.$once('test',(data) => {
       console.log(`只监听一次test事件${data}`)
      })
    },
    watch() {
      this.$on('test',fn)
    },
    send() {
      this.$emit('test', 'test')
      console.log(this._events)
    }
  }
}
</script>