<template>
  <div id="header" class="header flex end-center bottom-shadow">
      <div class="nav flex center-center" v-for="(nav, key) in list" :key="key">
        <p>{{nav.name}}</p>
      </div>
  </div>
</template>

<script>
// 混入对象的钩子，会比组件自身的钩子先执行
// 倘若出现组件和混入对象同名的时候，那么就会合并不同项，同项以组件优先
const mixin = {
  created() {
    console.log('%c混入','color: red;font-size:18px;')
    // this.hello()
  },
  data() {
    return {
      isMixins: true,
      info: {
        name: 'Mausen',
        country: 'China'
      }
    }
  },
  methods: {
    hello() {
      console.log('%cHello Mixins','color: red;font-size: 24px;')
    }
  }
}
export default {
  name: 'Ms-Header',
  mixins:[mixin],
  props: {
    list:{
      type: Array,
      value: []
    }
  },
  myOptions: {
    age: 56
  },
  data() {
    return {
      active: 0,
      info: {
        name: 'Gokou',
        province: 'Guang Dong',
        city: 'He Yuan'
      }
    }
  },
  created() {
    
  },
  mounted() {

  },
  methods: {
    rootClick() {
      alert(`这个在 header 组件中的方法被触发了。`)
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #1d1d1f;
  border: 1px solid #1d1d1f;
}
.nav {
  flex: 1;
  height: 50px;
  width: 80px;
  color: #f5f5f7;
  font-size: 14px;
  transition: all 150ms ease-in;
  cursor: pointer;
  -moz-user-select:none;
  -webkit-user-select:none;
  user-select:none; 
}
.nav:hover {
  color: #1d1d1f;
  background-color: #f5f5f7;
}
.active {
  box-shadow: inset 2px -1px 2px #ebebeb;
}
</style>