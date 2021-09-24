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
  border-radius: 10px;
  border: 1px solid #eeeeee;
}
.nav {
  height: 50px;
  width: 80px;
  border-radius: 10px;
}
.nav:hover {
  box-shadow: inset 3px 1px 3px #ebebeb;
}
</style>