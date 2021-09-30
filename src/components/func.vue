<script>
export default {
    // functional: true 的时候，说明它是一个纯函数，不能使用this关键字,也不会有响应式，只是用来接收 props 数据的
    functional: true,
    render(h, ctx) {
        const { props, scopedSlots,slots } = ctx
        const user = { name: 'mausen', job:'it'}
        console.log(slots())
        return (
            <div id="func">
                {slots().header}
                {scopedSlots.footer({ user })}
            </div>
        )
    },
}
</script>