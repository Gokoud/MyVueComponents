<template>
  <div id="swipe">
    <div class="swipe" ref="swipe" :style="{ transform: `translate3d(${xAxis}px,0,0)`, transition: animateState ? `transform 1000ms ease-out` : '',}" @transitionend="animationEnd">
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
    autopaly:{
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
      // 组件中处理过后的数组
      currentList: [], 
      // 处理后数组的索引，例如原本数组 [0,1,2] ,处理后[lastIndex,0,1,2,firstIndex]
      currentIndex: 0,
      currentCount: 0,
      // 用来指向[lastIndex,0,1,2,firstIndex] 中的 0,1,2
      activeIndex: 0, 
      // 是否开启动画
      animateState: false, 
      // 当前滑动的距离
      xAxis: 0 ,
      // 一个item 的宽度
      itemWidth: 0 
    };
  },
  created() {
    
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.animateState = true
      this.processOriginalData()
    },
    // 处理原数组
    processOriginalData() {
      const originalDataLen = this.urlList.length
      const originalData = JSON.parse(JSON.stringify(this.urlList))
      if ( originalDataLen === 1) {
        this.currentList = originalData
      }
      // 将原数组 0 ，切一份放最后。将原数组最后一个切一份放第一个。
      if ( originalDataLen > 1) {
        this.currentList = originalData.slice(-1).concat(originalData).concat(originalData.slice(0,1))
      }
      this.currentCount = this.currentList.length
      this.currentIndex += 1
      this.activeIndex = this.currentIndex - 1
      this.itemWidth = this.$refs.swipe.getBoundingClientRect().width
      this.xAxis = this.clacDistance()
      this.autopaly && this.autoPlay()
    },
    // 计算滑动的距离
    clacDistance() {
      return -this.currentIndex * this.itemWidth
    },
    // 自动播放
    autoPlay(){
      setTimeout(()=> {
        this.currentIndex += 1
        this.currentIndex = this.checkIndex(this.currentIndex)
        this.activeIndex = this.getActiveIndex(this.currentIndex) - 1
        this.xAxis = this.clacDistance()
        this.animateState = true
        this.autoPlay()
      }, this.duration)
    },
    // 活动下标的索引
    getActiveIndex (i) {
      // 如果滑到了 currentIndex 的第 0 张，那么 currentIndex 就要指会倒数第二张
      if (i === 0) {
        return this.currentCount - 2
        // 如果滑到了最后一张，那么currentIndex就要指向第1张
      } else if (i === this.currentCount - 1) {
        return 1
      } else {
        return i
      }
    },
    // 检查当前索引值是否到最后了
    checkIndex(i) {
      return i > this.currentCount - 1 ? this.currentCount - 1 : i
    },
    // 动画结束
    animationEnd() {
      this.animateState = false
      this.currentIndex = this.getActiveIndex(this.currentIndex)
      this.xAxis = this.clacDistance()
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