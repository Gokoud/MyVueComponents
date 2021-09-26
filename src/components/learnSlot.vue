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
  props: {
    url: {
      type: String,
      default: 'url'
    }
  },
  data() {
    return {
      user: {
        firstName: 'lee',
        lastName: 'mausen'
      }
    }
  }
}
</script>