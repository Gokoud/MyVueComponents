<template>
  <div id="parent">
    <slot></slot>
  </div>
</template>
<script>
const sym = Symbol()
export default {
  name: 'parent',
  provide() {
    return {
      // 按理来说这里应该能更改的，但是 son 组件接收不到
      [sym]:'123456',
      getDate: this.getDate
    }
  },
  data() {
    return {
      slotMsg: '传递过去的 slot 信息',
      msg: '欢迎来到父组件',
    }
  },
  mounted() {
    
  },
  computed: {
    symbolObj() {
      const name = Symbol('Mausen')
      return name
    }
  },
  methods: {
    getDate() {
      const date = new Date()
      console.log(date.toLocaleString().replace())
    }
  }
}
</script>