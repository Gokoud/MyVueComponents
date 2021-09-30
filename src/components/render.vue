<script>
export default {
    name: 'render',
    render(h) {
        const user = {name:'mausen',age:12}
        // 这里创建了 <header><slot name="header"></slot></header>,<main><slot></slot></main>,<footer><slot name="footer"></slot></footer> 三个插槽
        // const slots = [h('header',this.$slots.header),h('main',this.$scopedSlots.default({user})),h('footer',this.$slots.footer)]
        // 这个 test 是我们在 main.js 中定义的全局组件—— test
        // 工厂函数可以创建一个对象，并返回它
        
        return h('div',[h('test',{
            // class API 和 style API 跟在模板中的使用方法是一样的。
            class:{
                primary: this.primary,
                success: this.success,
                warning: this.warning,
                error: this.error
            },
            style: {
                color:'red',
                fontSize:'14px',
                fontWeight:'bold',
                marginTop:'20px'
            },
            // HTML attribute
            attrs: {
                id:'render'
            },
            // 事件监听器也在 on 里，可以用来监听 vm.$emit
            on: {
                test: this.nativeClickHandler,
            },
            // 触发子组件的click事件,相当于 v-on:click.native
            nativeOn: {
                click: this.nativeClick
            },
            // 使用 slots
            slot: 'footer',
            // 这里的作用域插槽，是 test 组件中作用域插槽，
            scopedSlots: {
                default: props => h('div','看看能不能渲染'),
                // 这样，可以在插入到插槽 button 设置样式
                footer: props => h('button',{style:{color:'red',fontSize:'25px'}},'footer标签'),
                header: props => h('header','header')
            },
            key: 'myref',
            ref: 'myref'
        // 这个 slots ，$slots & $scopedSlots 当子组件没有设置 scopedSlots 的时候，就会生效
        }),h('header',this.$slots.header)])

    },
    props: ['level','type'],
    data() {
        return {
            primary: false,
            success: false,
            warning: false,
            error: false
        }
    },
    mounted() {
        this.changeColor()
    },
    methods: {
        nativeClick() {
            console.log('为组件添加点击事件')
        },
        nativeClickHandler(e) {
            console.log(`render 传过来的值：${e}`)
        },
        changeColor() {
            switch(this.type) {
                case 'primary':
                    this.primary = true;
                    break
                case 'success':
                    this.success = true;
                    break
                case 'warning':
                this.warning = true;
                    break
                case 'error':
                    this.error = true;
                    break
            }
        }
    }
}
</script>
<style scoped>
button {
    color: #fff;
    border: none;
}
.primary {
    color: #fff;
    background: rgb(0, 183, 255);
}
.success {
    background: rgb(21, 255, 0);
}
.error {
    background: rgb(255, 0, 0)
}
</style>