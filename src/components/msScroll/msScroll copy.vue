<template>
  <div id="swipe">
    <div class="swipe" ref="swipe" :style="{ transform: `translate3d(${xAxis}px,0,0)`, transition: animateState ? `transform 1000ms ease-out` : '',}"
      @transitionend="animationEnd">
    <!-- transitionend 事件是 css 动画结束的时候触发的 -->
      <div class="swipe-item-wrapper" v-for="(sItem, index) in currentList" :class="index === currentIndex ? 'current' :''" :key="index">
        <img :src="sItem.url" alt="" />
      </div>
    </div>
    <div class="mask">
        <div class="indicate" v-for="(item, key) in urlList" :key="key" :class="key === actuallyIndex ? 'active' : ''"></div>
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
        actuallyIndex: 0, // 实际展示的索引值
        markSwipeWidth: 0,
        itemWidth: 0, // 一个 item 的宽度
        markItemCount: 0, // 记录 item 的数量
        animateState: true, // 是否开启动画
        xAxis: 0 // 当前滑动的距离
    };
  },
  computed: {
    // 是否可以滑动
    isScroll() {
        return this.markItemCount > 1
    }
  },
  mounted() {
      this.init();
  },
  methods: {
      // 初始化页面
      init() {
          this.currentListFactory();
          this.getItemWidth();
          this.xAxis = this.calcScrollDistance();
          this.openAutoPlay && this.autoPlay();
          this.currentIndex = this.calcActuallyIndex(this.currentIndex);
          this.markSwipeWidth = -(this.markItemCount - 1) * this.itemWidth
      },
      // 将 props 传进来的 urlList 处理成 currentList
      currentListFactory() {
          const propsUrlLength = this.urlList && this.urlList.length;
          const currentUrlArr = JSON.parse(JSON.stringify(this.urlList));
          if (propsUrlLength > 1) {
              this.currentList = currentUrlArr.slice(-1).concat(currentUrlArr).concat(currentUrlArr.slice(0,1));
          }
          if (propsUrlLength === 1) {
              this.currentList = currentUrlArr;
          }
          this.markItemCount = this.currentList.length;
          this.currentIndex += 1;
          this.$emit('change', this.actuallyIndex);
      },
      // 获取 item 的宽度
      getItemWidth() {
          this.itemWidth = this.$refs.swipe.getBoundingClientRect().width;
      },
      // 计算每次滑动的距离
      calcScrollDistance() {
          const distance = -this.currentIndex * this.itemWidth;
          return distance;
      },
      // 自动播放
      autoPlay() {
          setTimeout(() => {
              this.currentIndex += 1;
              this.xAxis = this.calcScrollDistance();
              this.currentIndex = this.checkIsFinallyIndex(this.currentIndex);
              this.actuallyIndex = this.calcActuallyIndex(this.currentIndex) - 1;
              this.animateState = true
              this.autoPlay()
          }, this.duration)
      },
      // 动画结束
      animationEnd() {
          // 动画结束就关闭动画
          this.animateState = false;
          this.currentIndex = this.calcActuallyIndex(this.currentIndex);
          this.xAxis = this.calcScrollDistance()
          this.$emit('change', this.actuallyIndex);
      },
      // 计算实际展示索引值
      calcActuallyIndex(index) {
          if (index === 0) {
              return this.markItemCount - 2
          } else if (index === this.markItemCount - 1) {
              return 1
          } else {
              return index
          }
      },
      // 修正索引,判断有没有到最后一张轮播图
      checkIsFinallyIndex(index){
          return index > this.markItemCount - 1 ? this.markItemCount - 1 : index
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