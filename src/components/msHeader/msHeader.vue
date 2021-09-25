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
  }
}
</script>

<style scoped>
.header {
  border: 1px solid #eeeeee;
  background-color: #1d1d1f;
  color: #f5f5f7;
  font-size: 14px;
}
.nav {
  height: 50px;
  width: 80px;
  border-radius: 10px;
  flex: 1;
}
</style>