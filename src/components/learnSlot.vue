<template>
  <div id="slot">
    <!-- 不设置 name of Attribute 的话，The name default is the default -->
    <slot>这是一个后备插槽，用于没有为组件提供内容的时候使用</slot>
    <slot name="header">
      名为 header 的具名插槽
    </slot>
    <slot name="footer">
      名为 footer 的具名插槽
    </slot>
    <!-- 定义一个 scope 属性，然后将 user 对象通过插槽传给父组件 -->
    <slot name="scope" :scope="user">
      {{user.firstName}}
    </slot>
  </div>
</template>
<script>
export default {
  name: 'learnSlot',
  data() {
    return {
      user: {
        firstName: 'lee',
        lastName: 'mausen'
      }
    }
  },
  mounted() {
    // 如果在父作用域上写了不作为 prop 被识别的属性值时，我们可以通过下面的这个方法获取，并且是可修改的。
    this.$attrs.url = 'www.baidu.com'
    this.attrsData();
    this.normalSlots();
    this.scopedSlots();
    this.createScopedSlots();
  },
  methods: {
    attrsData() {
      // groupCollapsed 折叠分组，group 不折叠分组
      console.groupCollapsed('%c使用 $attrs 获取传送过来的数据','color:#f00000;')
      console.log(this.$attrs)
      console.groupEnd()
    },
    normalSlots() {
      console.groupCollapsed('%clearnSlot中的普通插槽','color:blue;')
      console.log(this.$slots,'插槽')
      console.groupEnd()
    },
    scopedSlots() {
      console.groupCollapsed('%clearSlot 中的作用域插槽','color:green')
      console.log(this.$scopedSlots,'所有的插槽无论是否带有作用域，都会暴露在 $scopedSlots 中，带有作用域的插槽，不会出现在 $slots 中')
      console.groupEnd()
    },
    createScopedSlots() {
      // 给 header 创建一个作用域
    }
  }
}
</script>
<style scoped>
#slot {
  width: 98%;
  margin: 5px auto;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 0px 5px #a3a3a3;
}
</style>