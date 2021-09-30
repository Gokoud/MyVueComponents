<template>
  <div id="app">
    <ms-scroll></ms-scroll>
    <!-- 加入了keep-alive 之后，离开了组件之后，这个组件就会进入缓存区被缓存起来 -->
    <!-- 动态组件比较适合多个组件数据较统一的时候使用。 -->
    <transition name="fade">
      <keep-alive>
        <component ref="msHeader" :is="currentTabComponent" :list="list" :urlList="imgArr"  class="tab"></component>
      </keep-alive>
    </transition>
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
    <learn-slot url="www.mausen.com" slot-name="biu">
      <!-- v-slot 只能用在 template 标签上使用，v-slot 缩写 #,如果是默认插槽要带上 default -->
      <template>
        这是一个插槽
        <h1>default 插槽</h1>
      </template>
      <template #header>
        <h3>header插槽</h3>
      </template>
      <!-- 动态具名插槽 -->
      <template #[dynamicSlotName]>
        <p>动态插槽</p>
      </template>
      <!-- v-slot="scope" 的话，默认为 v-slot:default="scope" -->
      <!-- 下面相当于把传过来的 scope 重命名为 user scope as user -->
      <template #scope="{ scope: user }">
        {{user.lastName}}
      </template>
    </learn-slot>
    <parent v-if="check" :msg="msg">
        <son @test="test">
          <!-- 只能有一个父节点 -->
          <div>当 son 组件使用 inline-template 内联模板的时候显示这段，不过 inline-template 会让模板的作用于变得更加难以理解。所以在组件内使用 template 或大单文件组件中使用 template 标签元素来定义</div>
        </son>
    </parent>
    <button @click="check = !check">注册事件</button>
    <button @click="forceUpdate">强制更新</button>
    <!-- 动态指令参数 -->
    <input type="text" v-focus:[argument]="{name:'mausen',age:56}" v-model="msg" placeholder="测试自定义事件 v-focus ">
    <render type="success" :items="[]" @input="inputEvent" @test="test">
      <template #header>使用 render 进行组件渲染的 header</template>
      <template #default="{user}">{{user.name}}</template>
      <!-- <template #footer>使用 render 进行组件渲染的 footer</template> -->
    </render>
    <func :func="func">
      <template #header>
        <h1>aaaaa</h1>
      </template>
      <template #footer="{user}">
        <h1>{{user.name}}</h1>
      </template>
    </func>
  </div>
</template>

<script>
import render from '@/components/render.vue'
import msHeader from '@/components/msHeader/msHeader'
import msScroll from '@/components/msScroll/msScroll'
import msArticle from '@/components/msArticle.vue'
import Parent from '@/components/Parent.vue'
import Son from '@/components/Son.vue'
import func from '@/components/func.vue'
export default {
  components: {
    render,
    msHeader,
    msScroll,
    msArticle,
    // 动态加载组件
    'learnSlot':function(resolve) {
      setTimeout(() => {
        require(['@/components/learnSlot.vue'], resolve)
      }, 1000);
    },
    Parent,
    Son,
    func
  },
  computed:{
    currentTabComponent(){
      return `ms-${this.currentTab.toLowerCase()}`
    }
  },
  data() {
    return {
      func:[
        {name:'masuen'},
        {name:'tony'},
        {name:'tom'}
      ],
      argument:'margin',
      msg:'default',
      check: true,
      rootVal: 0,
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
  created() {
    this.$bus.on(this.$bus.TYPES.EVENT1.ADD.CONFIRM, (data) => {
            console.log(data);
        })
  },
  mounted() {
    /**
     * 获取根实例中的 foo,获取在 main.js 中的 Vue 实例数据，适合小项目
     * 如果是大应用还是用 vuex 好了
     */ 
    this.rootVal = this.$root.foo
    // 监听一下 hook of updated
    this.$on('hook:updated',() => {
      // console.log('监听update事件')
    })
  },
  methods: {
    // 接收 render 的 input 事件
    inputEvent(e) {
      console.log(e)
    },
    // 测试触发 msHeader 组件中的 rootClick 方法
    refs() {
      if (this.currentTab === 'Header') {
        this.$refs.msHeader.rootClick();
      } else {
        alert('请切换至 header 组件')
      }
    },
    test(e) {
      console.log(e)
    },
    forceUpdate() {
      this.$forceUpdate()
    }
  }
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