<template>
  <div id="app">
    <ms-scroll :urlList="imgArr"></ms-scroll>
    <!-- 加入了keep-alive 之后，离开了组件之后，这个组件就会进入缓存区被缓存起来 -->
    <!-- 动态组件比较适合多个组件数据较统一的时候使用。 -->
    <keep-alive>
      <component ref="msHeader" :is="currentTabComponent" :list="list" :urlList="imgArr"  class="tab"></component>
    </keep-alive>
    <div id="dynamic-component-demo" class="demo flex center-center">
      <button 
        v-for="tab in tabs" 
        :key="tab" 
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
        >
      {{ tab }}
      </button>
      <button class="tab-button" @click="refs">测试 refs</button>
    </div>
    <!-- 这里的 url 组件属性，它的作用域在组件里面，所以在引用组件的地方是无法使用 url 的 -->
    <!-- 只要组件中设置了 slot ，任何都能够渲染出来，包括 html -->
    <learn-slot url="www.mausen.com">
      <!-- v-slot 只能用在 template 标签上使用，v-slot 缩写 #,如果是默认插槽要带上 default -->
      <template #default>
        <!-- {{url}} 控制台会报错，因为 url 作用域在组件中 -->这是一个插槽
        <h1>mausen</h1>
        <img width="100" height="100" src="https://artec.oss-cn-shenzhen.aliyuncs.com/8cb470mdiqfx68vgxlc4.jpg" alt="">
      </template>
      <template #header>
        <h3>渲染进具名插槽————header</h3>
      </template>
      <!-- 动态具名插槽 -->
      <template #[dynamicSlotName]>
        <p>渲染进具名插槽————footer</p>
      </template>
      <!-- v-slot="scope" 的话，默认为 v-slot:default="scope" -->
      <!-- 下面相当于把传过来的 scope 重命名为 user scope as user -->
      <template #scope="{ scope: user }">
        {{user.lastName}}
      </template>
    </learn-slot>
  </div>
</template>

<script>
import msHeader from '@/components/msHeader/msHeader'
import msScroll from '@/components/msScroll/msScroll'
import msArticle from '@/components/msArticle.vue'
export default {
  components: {
    msHeader,
    msScroll,
    msArticle,
    // 动态加载组件
    'learnSlot':function(resolve) {
      setTimeout(() => {
        require(['@/components/learnSlot.vue'], resolve)
      }, 1000);
    }
  },
  computed:{
    currentTabComponent(){
      return `ms-${this.currentTab.toLowerCase()}`
    }
  },
  data() {
    return {
      dynamicSlotName:'footer',
      currentTab:'Header',
      tabs:['Header','Article'],
      list: [
        {name: '首页'},
        {name: '个人中心'},
        {name: '关于'},
        {name: '赞助我'}
      ],
      imgArr:[
        {url: "https://artec.oss-cn-shenzhen.aliyuncs.com/8cb470mdiqfx68vgxlc4.jpg"},
        {url: "https://artec.oss-cn-shenzhen.aliyuncs.com/wvp62qnpud3dfsznubdy.jpg"},
        {url: "https://artec.oss-cn-shenzhen.aliyuncs.com/nrnjc80uvodpp5l51r07.jpg"}
      ]
    }
  },
  mounted() {
    
  },
  methods: {
    // 测试触发 msHeader 组件中的 rootClick 方法
    refs() {
      this.$refs.msHeader.rootClick();
    }
  },
}
</script>
<style>
@import url('./assets/common/common.css');
.tab-button.active {
  background-color: #1f1f1d;
  color: #f5f5d5;
}
.tab-button {
  border: 1px solid #1f1f1d;
  background-color: #fff;
  border-radius: 4px;
  margin: 4px 5px;
}
</style>