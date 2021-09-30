/**
 * @param Node el 指令绑定的元素
 * @param Object binding { 
 * name：指令名，不包括 v- 前缀。
 * value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
 * oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
 * expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
 * arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
 * modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: *true }。
 * }
 * @param VNode Vue编译生成的虚拟节点
 * @param oldVnod 上一个虚拟节点，只在 update 和 ComponentUpdated 中可用
 */
export const focus = {
  // 可以在这里进行初始化设置，因为该函数只调用一次
  bind(el, binding) {
    el.style[binding.arg] = `${binding.value}px`
    console.log('%c指令初始化设置','color:#f00000')
  },
  // 被绑定元素插入到父节点时调用
  inserted(el,binding) {
    console.log('%c指令插入父节点','color:#f00000')
    // 被绑定元素已经插入到父元素中了，就可以对 VNode 进行操作了
    el.focus()
  },
  // 所有组件的VNode更新时调用，可能发生在子VNode更新之前
  update(el,binding,vnode,oldVnode) {

  },
  // 指令所在节点和它子节点全部更新后调用
  componentUpdated(el,binding,vnode,oldVnode) {
    console.log('%cVNode发生更新','color:#f00000')
  },
  // 指令与元素解绑时，或者元素销毁时启用
  unbind() {
    console.log('%c指令已解除绑定','color:#f00000')
    // 移除指令或者销魂指令所在 node 的时候都会执行
  },
}