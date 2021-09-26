<template>
  <div class="header flex end-center bottom-shadow">
      <div class="nav flex center-center" v-for="(nav, key) in list" :key="key">
        <p>{{nav.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Ms-Header',
  props: {
    list:{
      type: Array,
      value: []
    }
  },
  data() {
    return {
      active: 0,
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
}
.nav:hover {
  color: #1d1d1f;
  background-color: #f5f5f7;
}
.active {
  box-shadow: inset 2px -1px 2px #ebebeb;
}
</style>