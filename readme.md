## 第一财经数据
1. 怎么理解HTML5的语义化
2. 如何解决classname冲突?
1. 引入classnames库, 自动在类名后加入hash值
2. css-loader配置
3. 事件委托是捕获还是冒泡
4. 0.5px的精度 如何解决
1. 直接设置 border-width: 0.5px；使用方便，但兼容性很差，不推荐使用
2. 用阴影代替边框，设置阴影box-shadow: 0 0 0 .5px #000; 使用方便，能正常展示圆角，兼容性一般
3. 给容器设置伪元素，设置绝对定位，高度为1px，背景图为线性渐变，一半有颜色，一半透明。视觉上宽度只有0.5px。这种方法适合设置一条边框，没法展示圆角
4. 给容器内设置伪元素，设置绝对定位，宽、高是200%，边框是1px，然后使用transform: scale(0.5) 让伪元素缩小原来的一半，这时候伪元素的边框和容器的边缘重合，视觉上宽度只有0.5px。这种方法兼容性最好，4个边框都能一次性设置，能正常展示圆角，**推荐使用**
5. fetch原理
6. 使用Hook的时候 是否使用Eslint做限制
7. 是否做过SEO优化(服务器渲染->node.js)
8. 是否了解webpack

二面
1. 如何处理递归溢出问题(改写成循环)
2. get请求可以发生body吗
3. 说一个有意思的api
4. 用promise实现 多个异步事件，后一个开始基于前一个完成
***

## 平安健康
1. 两栏布局(左边定宽, 右边自适应)
2. 浏览器从输入url到页面展示经历了什么
3. 斐波那契数列实现
4. 项目介绍
***

## 阿里巴巴
一面
1. 缓存if-modified-since和Etag的区别
2. Promise 三个状态、try catch和catch的区别、all和race的区别
3. 数组去重  对比优缺点
4. 首屏优化	如何监控、如何优化
5. async defer 区别？两个async的执行顺序
6. 打包优化
7. treeshaking原理
8. 虚拟dom
9. 和vue的区别
10. 工厂模式、发布订阅模式
11. 前端工程化
12. rem和em的区别
13. 移动端高低分辨率产生的区别
14. 为什么选前端

提问: 如何在技术方面提升
广度
第三方包-了解
深度
工程化-打包-研发规范
***

## 喜马拉雅
一面
1. 判断数据类型
2. 箭头函数vs普通函数
3. 箭头函数可以做构造函数吗
4. 浏览器从输入url到页面展示经历了什么
5. Script加载为什么要放底部
6. async defer的区别? 两个defer的执行顺序
7. 什么情况会引发回流? root元素改变是否会引起回流? 从动画方面分析?
8. 谈一谈跨域? 如何解决? cors什么时候不能发出通配符 表示同意任意跨源请求的时候
9. 什么时候发出options请求?  contentType为application/json的时候
10. React setstate异步还是同步
11. hook要注意什么
12. React 性能优化 -> setState / render / hook 
13. 从组件树层面如何进行性能优化(高阶组件？)
14. 高阶组件 vs hook
15. Redux:  store如何通知components state已经更新
16. webpack体积优化
17. treeshaking的原理
18. 小程序优化

提问: 如何学习工程化
1. 阅读源码create-react-app  webpack4和5的版本区别
2. 体积优化  插件查看体积/ 加载时间
<!-- 微前端 -->

二面
1. 长列表渲染如何优化   分析(window.performance查看延时的时间分析) -> 具化
1. TCP连接
2. http2.0 多路复用
3. 渲染机制
4. JS单线程 / CSS进程处理
2. 如何一套代码兼容多端-怎么实现  -> babel-loader 高本版->ES5
3. React setState的同步与异步管控
4. 手撕算法-二分法 

## 得物
一面(14min)
1. 微信小程序和React区别
2. 小程序可以用dom吗
3. 如何判断数组
4. Class vs Hooks
5. Hooks里怎么保存
6. 原型链继承
7. 了解arguments吗? 可以用for...of吗? 可以
8. map set
9. 伪类 伪元素的区别
10. transform: translate 会让真实位置偏移吗
11. fiber
12. React 阻止冒泡
13. React事件合成机制


## 爱数科技
一面(30min)
1. 父组件调用子组件
2. 防抖 节流 思路
3. 开发 测试 部署
- 需求分析 文档准备 
- 功能开发 ut测试 埋伏测试 -> 函数处理 数据流 执行逻辑
- 部署 node npm rum build 原理 
4. 浅拷贝 深拷贝 
5. input 动态匹配高亮？
- innerText  插入标签 class选颜色
- div  edible 匹配 加标签span


## 达达-京东到家
一面(47min)
1. 盒模型
2. 自适应
3. html渲染过程
4. dom tree vs css tree
![img](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png)
5. 异步 
6. 重绘&回流的区别? 什么情况会引起回流?
7. offSetTop会引起回流吗? ![title](./CSS.md#哪些情况会引起回流)
8. 如何判断数据类型
9.  es6的新特性
10. let vs const
11. 什么时候会用到symbol
12. 模拟私有变量
13. [] instanceOf Array/Object
14. 闭包 场景
15. 谈一谈promise
16. 什么情况下需要async await
17. try catch 捕获异步错误 ❎不可以
18. 宏任务 微任务 render
19. diff 算法
20. http缓存机制  ![title](./网络相关.md#http缓存机制)
21. 浏览器有哪些线程 -> GUI线程、JS线程、事件触发线程、定时触发器线程、异步http请求线程
22. https 什么时候用到非对称加密
    1.  https://zhuanlan.zhihu.com/p/96494976
    2.  HTTPS 在内容传输的加密上使用的是对称加密，非对称加密只作用在证书验证阶段
    3.  ![img](https://pic4.zhimg.com/80/v2-1ea0209a526f3527a713736fe7609fcf_1440w.jpg)
23. hash路由 vs history路由
24. 跨域 ![title](./网络相关.md#谈一谈跨域(CORS))
25. 设置什么可以让header发送cookie(服务器:Access-Control-Allow-Credentials为true; 浏览器: withCredentials属性为true)
26. hook的state如何保存
27. render更新
28. React性能优化
29. dvajs
30. 如何更新静态资源
31. Style-loader、css-loader的作用
32. 小程序优化
33. 小程序渲染

二面
1. 查找出现频率最高的但单词   Map -> 降低时间复杂度?
https://leetcode-cn.com/problems/most-common-word/

三面
1. Hooks场景题 - useCallback防止方法重新生成
2. 二叉树   
![img](https://assets.leetcode.com/uploads/2021/02/19/num2tree.jpg)
```javascript
输入：root = [4,9,0,5,1]
输出：36
解释：
从根到叶子节点路径 4->9->5 代表数字 4+9+5=18
从根到叶子节点路径 4->9->1 代表数字 4+9+1=14
从根到叶子节点路径 4->0 代表数字 4+0=0
因此，数字总和 = 18 + 14 + 4 = 36
```

## 字节跳动
一面
1. render props
2. 小程序的底层机制
3. 有没有了解过 JSBridge
4. react-loadable
5. Promise.all/ Promise.race/ Promise.any/ Promise.allSettled
6. 
```javascript
class A {
    static FromB() {}

    method() {}
}

const a = new A();

a.method();
a.__proto__.method()
a.prototype.method();

function A () {
}

prototype

__proto__
```
7. 输入一个网址在浏览器里面，浏览器可以看到内容之间过程，越详细越好。
```javascript
* public/max-age/s-max-age/no-cache/private
proxy/browser/
```
8. 
```javascript
为 Array 实现一个 Reader，通过接口 getReader 获取， Reader 有一个接口 read(n)
每次调用会按顺序读取数组的 n (默认为 1 )个元素
调用不会改变数组本身的值
若数组已全部读完则返回 EOF(null)
若传输的参数不合法则报错

const a = [1, 2, 3, 4, 5, 6, 7 ,8 , 9];
const reader = a.getReader();

console.log(reader.read()) // 1
console.log(reader.read(1)) // 2
console.log(reader.read(3)) // 3, 4, 5
console.log(reader.read(1000)) // 6, 7, 8, 9
console.log(reader.read(-11)) // throw new Error
```
```javascript
function getReader(arr){
    let index = 0
    return function(n){
        if(!n)  return arr.slice(index,1)
        let cur_ = index
        index += n
        if(n < 0)    return new Error('n should larger than 0')
        else if(cur_+n > arr.length)
            return arr.slice(cur_)
        else return arr.slice(cur_,n)
    }
}
const a = [1, 2, 3, 4, 5, 6, 7 ,8 , 9];
const reader = getReader(a);
console.log(reader())
console.log(reader(1))
```