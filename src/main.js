import Vue from 'vue'
import App from './App.vue'
import Bus from '../utils/event.js'
import mix from '../src/mixins/mixins.js'
import { focus } from '../src/directive/directive.js'

Vue.config.productionTip = false

// 全局添加事件总线
Vue.prototype.$bus = Bus

// Vue.mixin(mix)

Vue.config.optionMergeStrategies.myOptions = function (toVal, fromVal) {
  
}

// 添加一个全局自定义指令
Vue.directive('focus',focus)

Vue.component('test',{
  template:`
  <div @click="componentBtn" id='test'>这个一个测试用的：
    <slot name="footer"></slot>
    <slot :text='text'>default slot</slot>
  </div>
  `,
  data() {
    return {
      text:'test 标签'
    }
  },
  mounted() {
    
  },
  methods: {
    componentBtn() {
      this.$emit('test','5631481')
    }
  }
});

new Vue({
  data: {
    foo :'foo'
  },
  render: h => h(App),
}).$mount('#app')


function Person(name,age) {
  this.name = name;
  this.age = age;
}

// 我们调用 Person 函数的时候，可以通过 apply 为 Person 函数指定 this 对象

function Student(name,age,grade) {
  // 在内部调用通过 apply 调用 Person 的时候，将 this 指向当前对象，就相当于从 Person 处，继承来了 this.name 和 this.age
  Person.apply(this,arguments) 
  this.grade = grade
}