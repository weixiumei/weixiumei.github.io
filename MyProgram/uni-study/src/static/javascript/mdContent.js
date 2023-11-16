export default {
// javascript工作原理
jsPrinciple: `
JavaScript是**单线程**语言,这是因为js是浏览器脚本语言，处理用户交互和操作DOM，多线程会带来类似一个线程删除DOM节点一个在同一个DOM节点上添加内容的复杂问题，所以只有一个调用栈，因此，它按照语句出现的顺序执行的，同一时间只能做一件事

#### v8引擎用于Chrome和node
- 内存堆(Memory Heap)：内存分配发生的地方
- 调用栈(Call Stack)：调用栈是一种数据结构，它记录了我们在程序中的位置。如果我们运行到一个函数，它就会将其放置到栈顶。当从这个函数返回的时候，就会将这个函数从栈顶弹出，这就是调用栈做的事情

注：很多引擎之外的 API，我们把这些称为浏览器提供的 Web API，比如说 DOM、AJAX、setTimeout等等

#### 事件循环Event Loop
+ 为解决页面卡顿，写了同步和异步任务
+ 同步任务进入主线程，异步任务进入Event Table（事件表）并注册函数
+ 当指定的事情完成后，Event Table将这个函数移入Event Queue（事件队列）
    + macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
    + micro-task(微任务)：Promise，process.nextTick
+ 主线程（Call Stack）执行完毕为空，会去将Event Queue里读取所有微任务，进入主线程执行，执行完所有微任务，读取一个宏任务执行，再执行所有微任务...

#### 执行上下文
- 定义：**执行上下文是当前js代码解析和执行代码时运行环境的抽象概念，任何代码执行都是在执行上下文中运行**
- 执行上下文分为 **全局执行上下文** 和 **函数执行上下文**（eval用的少，不考虑）
  - 当 JavaScript 引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文并且压入当前调用栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的函数执行上下文并压入栈的顶部。
  - 引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。

- 全局执行上下文：一个程序只有一个，不在函数中的代码都位于全局执行上下文，它创建了全局对象window，this指向window
- 函数执行上下文：在函数调用时都会创建一个函数执行上下文，也只能在函数调用时创建
  - 执行上下文生命周期（三个阶段）：**创建 --> 执行 --> 销毁**
  - js是单线程解释执行的脚步语言，在执行之前要先解析代码
  1. 创建（解析）做的事情：
     - **确定this指向(当前的运行环境)**
        + 直接调用： this --> window
        + obj.foo()： this --> obj
        + var aa = new Foo()： this --> aa
        + add.call(obj, 1,2)： this --> obj
        + 箭头函数：this --> 外层的函数的this，若没有外层函数，指向window
        + setTimeout & setInterval 延时函数： this --> window
     - **词法环境**
        + **环境记录器**是存储变量和函数声明的实际位置。
        + **外部环境的引用**意味着它可以访问其父级词法环境（作用域）
     - **变量环境**
        + 也是词法环境，不同的是：词法环境被用来存储函数声明和变量（let 和 const）绑定，而变量环境只用来存储 var 变量绑定。

	**注意**
     1. 在创建阶段时，引擎检查代码找出变量和函数声明，虽然函数声明完全存储在环境中，但是变量最初设置为 undefined（var 情况下），或者未初始化（let 和 const 情况下）
     2. 变量声明提升：这就是为什么你可以在声明之前访问 var 定义的变量（虽然是 undefined），但是在声明之前访问 let 和 const 的变量会得到一个引用错误。
     3. 以下两点是es3，词法环境和变量环境的概念是es5
        1. 创建变量对象-->初始化arguments， 然后提升函数声明和变量声明
        2. 创建作用域链（作用域是变量的可访问性（可见性），由多个执行上下文的变量对象构成的链表叫作用域链）

+ 执行上下文栈：先进后出

	注：
栈和堆 - 栈是一种后进先出的数据结构，那为什么引用值要放在堆中，而原始值要放在栈中。js中有一句话：能量是守衡的，无非是时间换空间，空间换时间的问题。堆比栈大，栈比堆的运算速度快。
`,
// 页面渲染过程
renderingProcess: `
#### 解析DOM，生成DOM树，加载css，生成css树，合并成render tree

+ CSS 不会阻塞 DOM 的解析，但会阻塞 DOM 渲染。
+ JS 阻塞 DOM 解析，但浏览器会"偷看"DOM，预先下载相关资源。
    + 因为js又可以改变DOM，白解析了 
+ 浏览器遇到标签 script 且没有defer或async属性时，会触发页面渲染，因而如果前面CSS资源尚未加载完毕时，浏览器会等待它加载完毕在执行脚本。
    + 这就是js文件在css文件后面，要等css加载完毕，这样确保js获取最新的DOM
+ defer
	+ defer属性延迟执行，不会延迟下载，浏览器遇到script就立即下载脚本，DOM同时解析
	+ 文档解析完成时，脚本被执行，此时也会触发domcontentloaded事件，优先执行脚本
	+ 多个标签添加defer属性，执行顺序仍然是按书写顺序
+ async
	+ 让浏览器异步加载脚本文件。在加载脚本文件的时候，浏览器能继续标签的解析。
	+ 加载完就执行，还是会发生阻塞，异步脚本一定会在load事件之前执行，但可能会在domcontentloaded事件之前或者之后执行。
	+ 异步脚本之间的执行顺序不确定，可能不会按照书写顺序执行

同步加载以及defer、async加载时的区别，如下图，其中绿色线代表 HTML 解析，蓝色线代表网络读取js脚本，红色线代表js脚本执行时间

这就是为何 script最好放底部，link 最好放头部，如果头部同时有 script 与 link 的情况下，最好将 script 放在 link 上面了
`,
// 什么是闭包
bibao: `
#### 闭包的概念
+ 闭包是指有权访问另一个函数作用域中的变量的函数,本质也就是在函数里面返回一个函数
+ 一般就是一个函数A，return其内部的函数B，被return出去的B函数能够在外部访问A函数内部的变量，这时候就形成了一个B函数的变量闭包，
+ A函数执行结束后这个变量背包也不会被销毁，并且这个变量背包在A函数外部只能通过B函数访问。

#### 闭包形成的原理
+ 延长作用域链，当前作用域可以访问上级作用域中的变量

#### 闭包解决的问题
+ 能够让函数作用域中的变量在函数执行结束之后不被销毁，同时也能在函数外部可以访问函数内部的局部变量。

#### 闭包带来的问题
+ 由于垃圾回收器不会将闭包中变量销毁，于是就造成了内存泄露，内存泄露积累多了就容易导致内存溢出。
+ 所以使用完闭包后，可以通过对闭包 geta = null（下面代码） ，让垃圾回收器回收

#### 实现一个简单的闭包
\`\`\`javascript
function fun(){
  // fun函数作用域内部的变量
  var a = 10;
  return ()=>{
    // 在此可以访问到fun函数作用域的a
    return a;
  }
}

var geta = fun();
var a = geta();
// 通过闭包我们就可以在fun函数外部访问到fun函数内部作用域的变量
console.log(a);
\`\`\`

#### 闭包的作用
+ 延迟变量的生命周期
+ 创建出私有作用域 （如 vue中data返回一个对象）
+ 闭包可以在函数外部访问到函数内部作用域的变量
+ 闭包可以让访问变量不会被垃圾机制回收
+ 因为受js链式作用域的影响，
+ 子对象会一级一级向上寻找所有父对象的变量，反之不行。
+ js中函数内部可以读取全局变量，函数外部不能读取函数内部的局部变量

####  JS闭包的9大经典使用场景：
[https://cloud.tencent.com/developer/article/1842037?from=15425&areaSource=102001.2&traceId=wkM9axw16hHJjIP4ihvhj](https://cloud.tencent.com/developer/article/1842037?from=15425&areaSource=102001.2&traceId=wkM9axw16hHJjIP4ihvhj)
`,
// 事件循环Event Loop
EventLoop: `
  + 为解决页面卡顿，写了同步和异步任务
  + 同步任务进入主线程，异步任务进入Event Table（事件表）并注册函数
  + 当指定的事情完成后，Event Table将这个函数移入Event Queue（事件队列）
      + macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
      + micro-task(微任务)：Promise，process.nextTick
  + 主线程（Call Stack）执行完毕为空，会去将Event Queue里读取所有微任务，进入主线程执行，执行完所有微任务，读取一个宏任务执行，再执行所有微任务...
`,
// 实例化对象步骤
instance: `
**var a = new F()**
\`\`\`javascript
  var obj  = {};
  obj.__proto__ = F.prototype;
  F.call(obj);
\`\`\`
1. 第一行: 我们创建了一个空对象obj;
1. 第二行: 将空对象的__proto__成员指向了F函数对象prototype属性,该原型属性是一个原型对象，也就意味着obj的原型属性上拥有了F.prototype中的属性或方法
1. 第三行: 将F函数对象的this指针替换成obj，然后再调用F函数.obj有了F构造函数中的属性或方法，然后F函数无返回值或返回的不是对象，直接返回obj,否则返回F函数中的对象

**可以理解为 -- 以new操作符调用构造函数的时候，函数内部实际上发生以下变化：**

1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
2. 属性和方法被加入到 this 引用的对象中。
3. 新创建的对象由 this 所引用，并且最后隐式的返回 this.
`,
// 防抖和节流
debounceThrottle: `
**作用：都是防止某事件频繁发生**
    
#### 1. 防抖
  
- 思路：
	- 高频操作触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。
	- 每次触发事件时都取消之前的延时调用方法
- 场景：输入联想、resize

\`\`\`javascript
function debounce(fn) {
  // 创建一个标记用来存放定时器的返回值
  let timeout = null 
  return function () {
    // 每当用户输入的时候把前一个 setTimeout clear 掉
    clearTimeout(timeout) 
    timeout = setTimeout(() => { 
      // 然后又创建一个新的 setTimeout, 
      // 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
      fn.apply(this, arguments)
    }, 500)
  }
}
function sayHi() {
  console.log('防抖成功')
}
var inp = document.getElementById('inp')
// 防抖
inp.addEventListener('input', debounce(sayHi)) 
\`\`\`
    
#### 2. 节流

- 思路：
	- n秒内置只执行一次某高频操作，所以节流是稀释函数的执行频率
	- 触发事件时，判断是否有等待执行的延时函数
- 场景：mousedown，滚动事件

\`\`\`javascript
function throttle(fn) {
  let canRun = true // 通过闭包保存一个标记
  return function () {
    if (!canRun) return // 在函数开头判断标记是否为true，不为true则return
    canRun = false // 立即设置为false
    setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
      fn.apply(this, arguments)
      // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。
      // 当定时器没有执行的时候标记永远是false，在开头被return掉
      canRun = true
    }, 500)
  }
}
function sayHi(e) {
  console.log(e.target.innerWidth, e.target.innerHeight)
}
window.addEventListener('resize', throttle(sayHi))
\`\`\`
`,
// 跨域解决
kuayu: `
#### 什么是跨域？
	
- 一个域下的文档或脚本试图去请求另一个域下的资源
    
#### 为什么会有跨域限制？

- 浏览器的基本安全功能 -- 同源策略，规定协议、端口、域名（IP）只要有一个不同即是跨域

#### 限制哪些行为？

- Cookie、LocalStorage和IndexDB无法读取
- DOM和Js对象无法获得
- AJAX 请求不能发送

#### 不限制哪些行为？

- 资源跳转： A链接、重定向、表单提交
- 资源嵌入：link、script、img、frame等dom标签，还有样式中background:url()、@font-face()等文件外链
- 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等

#### 如何解决跨域
    
##### 1. 通过jsonp跨域
	
- 原理：利用script允许跨域的原理
        
##### 2. document.domain + iframe跨域
- 仅限主域相同，子域不同的跨域应用场景
- 原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
- 父窗口：http://www.domain.com/a.html
- 子窗口：http://child.domain.com/a.html
    
##### 3. location.hash + iframe
- 原理： a欲与b跨域相互通信，通过中间页c来实现。
- 三个页面，不同域之间利用iframe的location.hash传值，相同域之间直接js访问来通信。
  
##### 4. window.name + iframe跨域

- 原理：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。
- 通过iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。
  
##### 5. postMessage跨域
- postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，
  它可用于解决以下方面的问题：
  - a.）页面和其打开的新窗口的数据传递
  - b.）多窗口之间消息传递
  - c.）页面与嵌套的iframe消息传递
  
##### 6. 跨域资源共享（CORS）
- 服务端：Access-Control-Allow-Origin
- 客户端：withCredentials（如果要带cookie请求）
  
##### 7. nginx代理跨域
- 跨域原理： 同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。
- 实现思路：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。

##### 8. nodejs中间件代理跨域
- 大致与nginx相同
- 非vue利用中间件服务器
- vue利用webpack的devServer（webpack-dev-server）
  
##### 9. WebSocket协议跨域
- WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。
`,
// 数组及字符串常见的方法
methodOfArrayString: `
- 不改变现有的数组：
\`\`\`javascript
concat：连接两个或多个数组
reduce（reduceRight从右开始）：接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
every：检测数组所有元素是否都符合指定条件，返回true/false
some：检测数组中的元素是否满足指定条件，有一个元素满足条件，则表达式返回true
filter：创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
find（findIndex）：返回传入一个测试条件（函数）符合条件的数组第一个元素(元素位置) / 没有符合的返回-1
forEach：用于调用数组的每个元素，并将元素传递给回调函数
map：一个新数组，数组中的元素为原始数组元素调用函数处理后的值
indexOf：返回某个指定的字符串值在字符串中首次出现的位置
lastIndexOf：返回一个指定的字符串值最后出现的位置
join：把数组中的所有元素转换一个字符串，元素是通过指定的分隔符进行分隔的
split：方法用于把一个字符串分割成字符串数组
slice：从已有的数组/字符串中返回选定的元素
string.substring(start, end)：提取一个字符串,end不支持负数（负数为0）
string.substr(start, len)提取一个长度为len的字符串(start可以未负数)
sort：对数组的元素进行排序
copyWithin：从数组的指定位置拷贝元素到数组的另一个指定位置中，
copyWithin(target, start, end)
isArray：Array.isArray直接写在了Array构造器上，而不是prototype对象上。Array.isArray会根据参数的[[Class]]内部属性是否是"Array" 返回true或false.
\`\`\`

- 改变现有的数组
\`\`\`javascript
push：向数组的末尾添加一个或多个元素，并返回新的长度
pop：删除最后一个元素，并返回删除的元素
unshift：向数组的起始位置添加一个或多个元素，并返回新的长度
shift：移除数组第一个元素
delete：移除对象或数组内某值，为empty
splice：用于插入、删除或替换数组的元素,
      [1,2,3].splice(开始删除/开始添加的index，要删除的个数，添加的数组)
fill：用于将一个固定值替换数组的元素
      var fruits = ["Banana", "Orange", "Apple"];
      fruits.fill("Runoob")=>fruits = ["Runoob","Runoob","Runoob"]
reverse()方法用于颠倒数组中元素的顺序
\`\`\`

- 特殊例子
\`\`\`javascript
var lis = document.getElementByTagName('li')
var lis2= [].slice.call(lis)
var lis2= Array.prototype.alice.call(lis)
lis非数组，lis2数组

map : [1,2,3].map(parseInt)
parseInt(1,0) 1
parseInt(2,1) NaN
parseInt(3,2) NaN
\`\`\`
![parseInt](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC8yLzE3LzE3MDUzODE3Y2NhOTk2NDI?x-oss-process=image/format,png)
`,
// 原型和原型链
prototype: `

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91c2VyLWdvbGQtY2RuLnhpdHUuaW8vMjAyMC8zLzQvMTcwYTVhZDUyMmJlMWQyOA?x-oss-process=image/format,png)


#### 一 概念:

- 构造函数，原型，实例的关系:

  **每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针。**

  **万物皆为对象，对象具有属性proto，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法**


- JS对象的圈子里有这么个规则:

	**如果试图引用对象(实例instance)的某个属性,会首先在对象内部寻找该属性,直至找不到,然后才在该对象的原型(instance.prototype)里去找这个属性.**

- 如果让原型对象指向另一个类型的实例(constructor1.prototype = instance2)有趣的事情便发生了 - **查找属性**
  1. 首先会在instance1内部属性中找一遍;
  2. 接着会在instance1._proto__(constructor1.prototype)中找一遍,而constructor1.prototype 实际上是instance2, 也就是说在instance2中寻找该属性p1;
  3. 如果instance2中还是没有,此时程序不会灰心,它会继续在instance2.__proto_(constructor2.prototype)中寻找…直至Object的原型对象
    
	对应轨迹: instance1–> instance2 –> constructor2.prototype…–>Object.prototype

	这种搜索的轨迹，形似一条长链，又因prototype在这个游戏规则中充当链接的作用，于是我们把这种实例与原型的链条称作**原型链**. 

\`\`\`javascript
  function Father(){
      this.property = true;
  }
  Father.prototype.getFatherValue = function(){
      return this.property;
  }
  function Son(){
      this.sonProperty = false;
  }
  //继承 Father
  Son.prototype = new Father();//Son.prototype被重写,导致Son.prototype.constructor也一同被重写
  Son.prototype.getSonVaule = function(){
      return this.sonProperty;
  }
  var instance = new Son();
  alert(instance.getFatherValue());//true
  instance实例通过原型链找到了Father原型中的getFatherValue方法
\`\`\`
	注意： 此时instance.constructor指向的是Father,这是因为Son.prototype中的constructor被重写的缘故.

- 注：如何判断原型和实例的这种继承关系？

	+ 第一种是使用 instanceof 操作符, 只要用这个操作符来测试实例(instance)与原型链中出现过的构造函数,结果就会返回true. 以下几行代码就说明了这点.

\`\`\`javascript
alert(instance instanceof Object);//true
alert(instance instanceof Father);//true
alert(instance instanceof Son);//true
由于原型链的关系, 我们可以说instance 是 Object, Father 或 Son中任何一个类型的实例. 
因此, 这三个构造函数的结果都返回了true.
\`\`\`

+ 第二种是使用 isPrototypeOf() 方法, 同样只要是原型链中出现过的原型,isPrototypeOf() 方法就会返回true, 如下所示.
\`\`\`javascript
alert(Object.prototype.isPrototypeOf(instance));//true
alert(Father.prototype.isPrototypeOf(instance));//true
alert(Son.prototype.isPrototypeOf(instance));//true
原理同上.
\`\`\`

#### 二 原型链的问题

  - 问题一: 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;
  - 问题二: 在创建子类型(例如创建Son的实例)时,不能向超类型(例如Father)的构造函数中传递参数.

	*为此，下面将有一些尝试以弥补原型链的不足.*

#### 三 借用构造函数

  - 基本思想:即在子类型构造函数的内部调用超类型构造函数.
\`\`\`javascript
function Father(){
    this.colors = ["red","blue","green"];
}
function Son(){
    Father.call(this);// ☆☆继承了Father,且向父类型传递参数☆☆
}
var instance1 = new Son();
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"

var instance2 = new Son();
console.log(instance2.colors);//"red,blue,green" 可见引用类型值是独立的
\`\`\`
- 很明显，借用构造函数一举解决了原型链的两大问题:

  1. 保证了原型链中引用类型值的独立,不再被所有实例共享;
  2. 子类型创建时也能够向父类型传递参数.

- 如果仅仅借用构造函数，将无法避免构造函数模式存在的问题
  1. 方法都在构造函数中定义，因此函数复用也就不可用了.
  2. 超类型(原型)中定义的方法，对子类型而言也是不可见的.


  备注 -
  **问题 1 理解：**
  this定义的方式，实例化之后是让每一个实例化对象都有一份属于自己的在构造函数中的对象或者函数方法，
  prototype定义的方式，实例化之后每个实例化对象共同拥有一份构造函数中的对象或者函数方法。


#### 四 组合继承

- 组合继承：**指的是将原型链和借用构造函数的技术组合到一块，从而发挥两者之长的一种继承模式.**

- 基本思路: **使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承.**

- 既通过在原型上定义方法实现了函数复用，又能保证每个实例都有它自己的属性.
\`\`\`javascript
function Father(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
    alert(this.name);
};
function Son(name,age){
    Father.call(this,name);//继承实例属性，第一次调用Father()
    this.age = age;
}
Son.prototype = new Father();//继承父类方法,第二次调用Father()
Son.prototype.sayAge = function(){
    alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
\`\`\`
	组合继承避免了原型链和借用构造函数的缺陷,融合了它们的优点,成为 JavaScript 中最常用的继承模式. 而且, instanceof 和 isPrototypeOf( )也能用于识别基于组合继承创建的对象.

	问题：**组合继承其实调用了两次父类构造函数, 造成了不必要的消耗,后面讲到.**


---------**以下是引子**---------

1. **原型继承**

- 在object()函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的一个新实例.
\`\`\`javascript
function object(o){
    function F(){}
    F.prototype = o;
    return new F();
}
\`\`\`
- 从本质上讲, object() 对传入其中的对象执行了一次浅复制. 下面我们来看看为什么是浅复制.
\`\`\`javascript
var person = {
    friends : ["Van","Louis","Nick"]
};
var anotherPerson = object(person);
anotherPerson.friends.push("Rob");
var yetAnotherPerson = object(person);
yetAnotherPerson.friends.push("Style");
alert(person.friends);//"Van,Louis,Nick,Rob,Style"
\`\`\`
	可以作为另一个对象基础的是person对象,于是我们把它传入到object()函数中，然后该函数返回一个新对象。这个新对象将person作为原型,因此它的原型中就包含引用类型值属性。这意味着person.friends不仅属于person所有，而且也会被anotherPerson以及yetAnotherPerson共享。

- ES5通过新增 **object.create()** 方法规范化了上面的原型式继承，**object.create()** 接收两个参数:
	1. 一个用作新对象原型的对象
	2. (可选的)一个为新对象定义额外属性的对象
\`\`\`javascript
var person = {
    friends : ["Van","Louis","Nick"]
};
var anotherPerson = Object.create(person);
anotherPerson.friends.push("Rob");
var yetAnotherPerson = Object.create(person);
yetAnotherPerson.friends.push("Style");
alert(person.friends);//"Van,Louis,Nick,Rob,Style"
\`\`\`
- object.create() 只有一个参数时功能与上述object方法相同, 它的第二个参数与Object.defineProperties()方法的第二个参数格式相同: 每个属性都是通过自己的描述符定义的.以这种方式指定的任何属性都会覆盖原型对象上的同名属性.例如:
\`\`\`javascript
var person = {
    name : "Van"
};
var anotherPerson = Object.create(person, {
    name : {value : "Louis"}
});
alert(anotherPerson.name);//"Louis"
\`\`\`
  目前支持 Object.create() 的浏览器有 IE9+, Firefox 4+, Safari 5+, Opera 12+ 和 Chrome.

	**提醒**: 原型式继承中, 包含引用类型值的属性始终都会共享相应的值, 就像使用原型模式一样.

2. **寄生式继承**

- 寄生式继承是与原型式继承紧密相关的一种思路
- 寄生式继承的思路与(寄生)构造函数和工厂模式类似, 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象。 如下：
\`\`\`javascript
function createAnother(original){
    var clone = object(original);//通过调用object函数创建一个新对象
    clone.sayHi = function(){//以某种方式来增强这个对象
        alert("hi");
    };
    return clone;//返回这个对象
}
\`\`\`
	这个例子中的代码基于person返回了一个新对象–anotherPerson. 新对象不仅具有 person 的所有属性和方法, 而且还被增强了, 拥有了sayH()方法.

	**注意**: 使用寄生式继承来为对象添加函数, 会由于不能做到函数复用而降低效率;这一点与构造函数模式类似.

---------**引子结束**---------

#### 五 寄生组合式继承

- 前面讲过，组合继承是 JavaScript 最常用的继承模式; 不过, 它也有自己的不足. 组合继承最大的问题就是无论什么情况下，都会**调用两次父类构造函数**：一次是在创建子类型原型的时候，另一次是在子类型构造函数内部。寄生组合式继承就是为了降低调用父类构造函数的开销而出现的。

	其背后的基本思路是: **不必为了指定子类型的原型而调用超类型的构造函数**
\`\`\`javascript
function extend(subClass,superClass){
    var prototype = object(superClass.prototype);//创建对象
    prototype.constructor = subClass;//增强对象
    subClass.prototype = prototype;//指定对象
}
\`\`\`
- extend的高效率
  + 它没有调用superClass构造函数,因此避免了在subClass.prototype上面创建不必要、多余的属性.
  + 原型链还能保持不变，因此还能正常使用 instanceof 和 isPrototypeOf() 方法。

  以上,寄生组合式继承,集寄生式继承和组合继承的优点于一身,是实现基于类型继承的最有效方法.

- extend的另一种更为有效的扩展.
\`\`\`javascript
function extend(subClass, superClass) {
    // 完成了subClass和superClass的继承关系
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F(); 
    // 明确构造器的指向
    subClass.prototype.constructor = subClass;
    // 跳出这个extend函数来看，之前传入的super完全也可以作为其他函数对象的sub！
    // 所以，在extend函数中，需要最后确认super的构造器指向是否正确，如果不正确，需要自己来更正。
    // 即使父类是Object也可以正常继承
    // superClass是从别的地儿继承过来(obj)又忘记指定constructor
    subClass.superclass = superClass.prototype;
    if(superClass.prototype.constructor == Object.prototype.constructor) {
      superClass.prototype.constructor = superClass;
    }
}
\`\`\`
- 我一直不太明白的是为什么要 “new F()“, 既然extend的目的是将子类型的 prototype 指向超类型的 prototype,为什么不直接做如下操作呢?

	subClass.prototype = superClass.prototype;//直接指向超类型prototype

  显然, 基于如上操作, 子类型原型将与超类型原型共用, 根本就没有继承关系.


- **new 运算符**

	为了追本溯源, 我顺便研究了new运算符具体干了什么?发现其实很简单，就干了三件事情.
\`\`\`javascript
var obj  = {};
obj.__proto__ = F.prototype;
F.call(obj);
\`\`\`
  - 第一行，我们创建了一个空对象obj;
  - 第二行，我们将这个空对象的proto成员指向了F函数对象prototype成员对象;
  - 第三行，我们将F函数对象的this指针替换成obj，然后再调用F函数.

  我们可以这么理解: 以 new 操作符调用构造函数的时候，函数内部实际上发生以下变化：

  1. 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
  2. 属性和方法被加入到 this 引用的对象中。
  3. 新创建的对象由 this 所引用，并且最后隐式的返回 this.

  __proto__ 属性是指定原型的关键
  以上, 通过设置 __proto__ 属性继承了父类, 如果去掉new 操作, 直接参考如下写法
  subClass.prototype = superClass.prototype;//直接指向超类型prototype

	那么, 使用 instanceof 方法判断对象是否是构造器的实例时, 将会出现紊乱.

	假如参考如上写法, 那么extend代码应该为
\`\`\`javascript
function extend(subClass, superClass) {
  subClass.prototype = superClass.prototype;

  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}
\`\`\`
  此时, 请看如下测试:
\`\`\`javascript
function a(){}
function b(){}
extend(b,a);
var c = new a(){};
console.log(c instanceof a);//true
console.log(c instanceof b);//true
\`\`\`
  c被认为是a的实例可以理解, 也是对的; 但c却被认为也是b的实例, 这就不对了. 究其原因, instanceof 操作符比较的应该是 c.__proto__ 与 构造器.prototype(即 b.prototype 或 a.prototype) 这两者是否相等, 又extend(b,a); 则b.prototype === a.prototype, 故这才打印出上述不合理的输出.

  那么最终,原型链继承可以这么实现,例如:
\`\`\`javascript
function Father(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
    alert(this.name);
};
function Son(name,age){
    Father.call(this,name); // 继承实例属性，第一次调用Father()
    this.age = age;
}
extend(Son,Father)//继承父类方法,此处并不会第二次调用Father()
Son.prototype.sayAge = function(){
    alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance1 = new Son("zhai",10);
console.log(instance1.colors);//"red,blue,green"
instance1.sayName();//zhai
instance1.sayAge();//10
\`\`\`

- 终点为什么是null？
  1. 必须有一个停顿的位置，而不是无限的向上引用（循环引用）。
  2. 没法访问null的属性，起到了终止原型链的作用
  3. null在某种意义上也是一种对象，即空对象，不会违反“原型链上只能有对象”的约定
`,
deepCopy: `

#### 为什么要深拷贝：
  1. js原始数据类型：Undefined, Null, String, Number, Boolean, Symbol
  2. 引用类型：Object、Array、RegExp、Date、Function
  3. 引用类型被clone的是堆地址，也就说原对象值变了，克隆后的值也跟着变了

#### 简单深拷贝：
\`\`\`javascript
  var obj = {a:[1,2],b:{aa:11}}
  var obj_copy = JSON.parse(JSON. stringify())
\`\`\`

#### 弊端：
  1. 不能够拷贝function，symbol，regExp等特殊对象的克隆
  2. 对象又循环引用会报错
  3. 抛弃了对象的constructor， 所有的构造函数指向Object

#### 深拷贝思路：
  1. 深拷贝=浅拷贝+递归
  2. 参数校验	-- Object.prototype.toString.call(x)==='[object Object]'
  3. 是否是对象判断要严谨、数组兼容
  4. 递归爆栈问题：递归 改为 深度优先
  5. 循环引用问题：引入一个数组uniqueList用来存储已经拷贝的数组，每次循环遍历时，先判断对象是否在uniqueList中了，如果在的话就不执行拷贝逻辑了
`
}