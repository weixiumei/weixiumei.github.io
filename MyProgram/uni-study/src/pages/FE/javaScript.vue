<template>
  <view id="top"></view>
  <view class="list" id="list">
    <view class="title"
      >第{{ NUM[currentIndex] }}题 {{ data[currentIndex].ask }}</view
    >
    <!-- TODO 兼容小程序暂时不能给md里的标签添加样式 -->
    <image
      v-if="data[currentIndex].component == 'jsPrinciple'"
      style="width: 100%; height: 236px"
      mode="aspectFit"
      src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC8yLzIyLzE3MDZkNThjOTg2Y2ExYWM?x-oss-process=image/format,png"
    ></image>
    <!-- 渲染md内容 -->
    <ua-markdown :source="mdContent[data[currentIndex].component]" />
    <!-- TODO md里的图片403，暂时在这自定义显示 -->
    <image
      v-if="data[currentIndex].component == 'renderingProcess'"
      style="width: 100%; height: 76px"
      mode="aspectFit"
      src="/static/img/rendering.png"
    ></image>
  </view>
  <view class="bottom-btn">
    <view @click="preQuestion" :class="currentIndex === 0 ? 'disable' : ''"
      >上一题</view
    >
    <image
      @click="showDrawer('showRight')"
      src="../../static/img/menu.svg"
      alt=""
      srcset=""
    />
    <view
      @click="nextQuestion"
      :class="currentIndex === data.length - 1 ? 'disable' : ''"
      >下一题</view
    >
  </view>
  <uniDrawer
    class="menus"
    ref="showRight"
    mode="right"
    :width="280"
    @change="change($event, 'showRight')"
  >
    <view class="menu-tit">JavaScript</view>
    <view
      v-for="(item, index) in data"
      :key="index"
      @click="goto(index)"
      class="menu-item"
      :class="currentIndex == index ? 'active' : ''"
      :id="'menu-' + item.component"
    >
      <view class="tit">第{{ NUM[index] }}题 {{ item.ask }}</view>
    </view>
  </uniDrawer>
</template>

<script>
import uaMarkdown from '@/uni_modules/ua-markdown_1.2.1/components/ua-markdown/ua-markdown'
import uniDrawer from '@/uni_modules/uni-drawer/components/uni-drawer/uni-drawer'
import mdContent from '@/static/javascript/mdContent.js'
export default {
  data () {
    return {
      mdContent: {},
      currentItem: 0,
      currentIndex: 0,
      data: [
        { ask: 'javascript工作原理', component: 'jsPrinciple' },
        { ask: '页面渲染过程', component: 'renderingProcess' },
        { ask: '原型和原型链', component: 'prototype' },
        { ask: '数组及字符串常见的方法', component: 'methodOfArrayString' },
        { ask: '什么是闭包', component: 'bibao' },
        { ask: '实例化对象步骤', component: 'instance' },
        { ask: '防抖和节流', component: 'debounceThrottle' },
        { ask: '跨域解决', component: 'kuayu' },
        { ask: '深拷贝', component: 'deepCopy' }
      ],
      showRight: false,
      NUM: [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
        '十一',
        '十二',
        '十三',
        '十四',
        '十五',
        '十六',
        '十七',
        '十八',
        '十九',
        '二十'
      ]
    }
  },
  // 上拉加载
  onReachBottom () {
    console.log('-onReachBottom-')
    // this.currentIndex++
    // this.content = mdContent[this.data[this.currentIndex].component]
  },
  // 下拉刷新
  onPullDownRefresh () {
    // setTimeout(()=>{
    //   // ...  这里写刷新时需要完成的数据加载
    //   console.log('刷新成功')
    //   uni.stopPullDownRefresh();  //停止刷新
    // }, 1000)
  },
  components: {
    uaMarkdown,
    uniDrawer
  },
  mounted () {
    this.mdContent = mdContent
    // this.scrollthrottle = this.throttle()
  },
  onLoad () {},
  methods: {
    // throttle() {
    //   let canRun = true
    //   return function (e) {
    //     if (!canRun) return
    //     canRun = false
    //     setTimeout(() => {
    //       console.log('滚动', e.detail.scrollTop)
    //       // this.currentScrollTop = e.detail.scrollTop;
    //       canRun = true
    //     }, 500)
    //   };
    // },
    // scroll(e) {
    //   this.scrollthrottle(e)
    // },
    // upper: function(e) {
    //   console.log(e)
    // },
    // lower: function(e) {
    //   console.log(e)
    // },
    goto (index) {
      this.currentIndex = index
      this.$refs.showRight.close()
      this.scrollToTop()
    },
    scrollToTop () {
      this.$nextTick(() => {
        // #ifdef MP-WEIXIN
        uni.pageScrollTo({
          selector: `#top`,
          duration: 300
        })
        // #endif
        // // #ifdef H5
        // var element = document.getElementById('top')
        // element.scrollIntoView() // 将元素滚动到可见区域
        // // #endif
        // uni.pageScrollTo({
        //   scrollTop: -100, //滚动到页面的目标位置
        //   duration: 300
        // })
      })
    },
    preQuestion () {
      if (this.currentIndex === 0) return
      this.currentIndex--
      this.scrollToTop()
    },
    nextQuestion () {
      if (this.currentIndex === this.data.length - 1) return
      this.currentIndex++
      this.scrollToTop()
    },
    showDrawer (e) {
      this.$refs[e].open()
      // this.$nextTick(() => {
      //   /*下次 DOM 更新时，找到某个控件，再进行复杂计算并确定其高度后*/
      //   console.log('1111', this.$refs)
      // });
      // this.$refs.showRight.open();
    },
    // 关闭窗口
    closeDrawer (e) {
      this.$refs[e].close()
    },
    // 抽屉状态发生变化触发
    change (e, type) {
      console.log(
        (type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭')
      )
      // this[type] = e
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 12px;
  // margin: 20px 0;
  padding-bottom: 80px;
  // width: auto;
  // height: 100vh;
  // overflow: auto;
  .title {
    font-size: 16px;
    font-weight: bold;
    height: 50px;
    border-bottom: 1px solid #3d5ebd;
    line-height: 50px;
    margin-bottom: 10px;
  }
}
.menus {
  .menu-tit {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
  }
  .menu-item {
    color: #7f7f7f;
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #e9e9e9;
    margin: 0 15px;
    font-size: 14px;
  }
  .active {
    color: #175bbf;
  }
}
.bottom-btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 12;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #373737;
  .disable {
    color: #cbcbcb;
  }
  image {
    width: 40px;
    height: 40px;
    padding: 10px 15px;
  }
  .top {
    height: 1px;
    background: red;
    margin-top: 100px;
  }
}
</style>
