<template>
  <div id="swipe">
    <div class="swipe" ref="swipe" 
    :style="{ transform: `translate3d(${xAxis}px,0,0)`, transition: animateState ? `transform 1000ms ease-out` : '',}"
    >
    <!-- transitionend 事件是 css 动画结束的时候触发的 -->
      <div class="swipe-item-wrapper" v-for="(sItem, index) in currentList" :class="index === currentIndex ? 'current' :''" :key="index">
        <img :src="sItem.url" alt="" />
      </div>
    </div>
    <div class="mask">
        <div class="indicate" v-for="(item, key) in urlList" :key="key" :class="key === activeIndex ? 'active' : ''"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MsSwiper",
  props: {
    // 图片列表
    urlList: {
      type: Array,
      default: () => [
        { url: require("../../assets/images/1.png") },
        { url: require("../../assets/images/2.jpg") },
        { url: require("../../assets/images/3.jpg") },
        { url: require("../../assets/images/4.png") },
        { url: require("../../assets/images/5.png") }
      ],
    },
    // 是否开启自动播放
    openAutoPlay:{
        type: Boolean,
        default: true
    },
    // 轮播间隔时间
    duration:{
      type: Number || String,
      default: 2000
    }
  },
  data() {
    return {
        currentList: [], // 组件中处理过后的数组
        currentIndex: 0, // 处理后数组的索引
        activeIndex: 0, // 实际展示的索引值
        xAxis: 0, // 当前滑动的距离
        itemWidth: 0, // 一个 item 的宽度
        itemCount: 0, // 记录 item 的数量
        animateState: true // 是否开启动画
    };
  },
  computed: {
    // 是否可以滑动
    isScroll() {
        return this.itemCount > 1
    }
  },
  created(){
    const urlListLen = this.urlList.length;
    if (urlListLen === 1) {
      this.currentList = this.urlList
    }
    if (urlListLen > 1 ) {
      this.currentList = this.urlList.slice(-1).concat(this.urlList).concat(this.urlList.slice(0,1))
    }
    this.itemCount = this.currentList.length;
    // 在原本的列表前面加了一张，所以 currentIndex 往后推 [0,1,2]   [lastIndex,0,1,2,firstIndex]
    this.currentIndex += 1
    this.activeIndex = this.currentIndex - 1
  },
  mounted() {
      this.init();
  },
  methods: {
    init() {
      this.itemWidth = this.$refs.swipe.getBoundingClientRect().width;
      this.currentIndex = 
      this.xAxis = this.slideX()
    },
    // 滑动距离
    slideX(){
      return -this.currentIndex * this.itemWidth
    },
    // 判断 currentIndex 索引值是否正确
    checkCurrentIndex(curIndex) {
      
    }
  },
};
</script>
<style scoped>
#swipe {
  position: relative;
  width: 98%;
  font-size: 0;
  overflow: hidden;
  margin: 1% auto;
  border-radius: 4px;
  box-shadow: #bbb 0px 0px 6px;
}
.swipe {
  white-space: nowrap;
}
.swipe-item-wrapper {
  width: 100%;
  height: 100px;
  display: inline-block;
  box-sizing: border-box;
}
.swipe-item-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.mask {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 20px;
  bottom: 0;
  background-color: rgba(0, 0, 0, .1);
}
.mask .indicate {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #f5f5f5;
    filter: blur(.5);
    margin: 0 2px;
}
.mask .indicate.active {
    background-color: #999999;
}
</style>