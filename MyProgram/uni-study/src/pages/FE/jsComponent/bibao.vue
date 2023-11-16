<template>
  <view>
    <ua-markdown :source="content" />
  </view>
</template>

<script>

// https://ext.dcloud.net.cn/plugin?id=13307
import uaMarkdown from "@/uni_modules/ua-markdown_1.2.1/components/ua-markdown/ua-markdown"
import bibao from '/static/javascript/bibao.js'
export default {
  data() {
    return {
      content: ''
    }
  },
  component: {
    uaMarkdown
  },
  mounted() {
    // this.readTextFile('/static/test.md')
    this.content = bibao.content
  },
  methods: {
    // readTextFile(fileName) {
    //   // #ifdef MP-WEIXIN
    //   uni.request({
    //     url: fileName,
    //     method: 'GET',
    //     success: (res) => {
    //       console.log('res========', res)
    //     },
    //     fail: (err) => {
    //       console.log('err========', err)
    //     }
    //   })
    //   // #endif

    //   // #ifdef H5
    //   var rawFile = new XMLHttpRequest()
    //   rawFile.open('GET', fileName, false)
    //   rawFile.onreadystatechange = () => {
    //     if (rawFile.readyState === 4) {
    //       if (rawFile.status === 200 || rawFile.status == 0) {
    //         var allText = rawFile.responseText
    //         this.mdvalue = allText
    //       }
    //     }
    //   }
    //   rawFile.send(null)
    //   // #endif
    // }
  },
}
</script>

<style lang="scss">
</style>