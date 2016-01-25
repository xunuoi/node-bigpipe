# node-bigpipe

### 简介
- Bigpie for nodejs, frameworks like Express, Sails, ThinkJS
- Simple API: start, pipe, end。 Api简单好用
- 服务器端API基于Promise


### 安装
- 服务端： import {Bigpipe} from './Bigpipe'
- 前端： 引入jQuery和 mo.bigpipe.es5.js


### 使用

* 服务端，首先构造对应的pipe块，需要返回一个promise
* start这个方法来启动pipe，渲染一个基本html框架
* pipe方法来传输之前构造的pipe块组成的数组
* end方法来结束pipe传输，http请求结束



### 服务端API
- `bigpipe.start(viewPath, [data])`: 开始
- `bigpipe.pipe(promiseList)`：传输
- `bigpipe.end([onEndFn])`： 结束
- `bigpipe.render(selector, htmlData)`： 向html的容器填充htmlData,相当于前端执行了$(selector).html(htmlData)
- `bigpipe.append(selector, htmlData)`： 向html的容器追加htmlData，相当于前端$(selector).append(htmlData)
- `bigpipe.fire(eventName, data)`: 触发前端的eventName事件，前端需要自定义好事件函数，来处理data

### 浏览器端APi
- `bigpipe.on(eventName).then(data=>{ // deal with data ...  })`: 订阅eventName事件并通过then添加处理函数
- `bigpie.fire/render/append` 同服务器端api介绍


### 代码示例

- 构造pipe块，需要返回一个Promise对象，这个pipe的函数会被传入bigpipe对象参数(下面的bp就是)

````Javascript
function tagPipe(bp){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'tag': 'your data'
        }

        // 模拟异步数据查询和输出
        setTimeout(()=>{
            let html = '<div><span>TagA</span><span>TagB</span><span>TagC</span><span>TagD</span></div>'

            let pipeData = {
                'html': html,
                'message': 'for tag pipe html'
                'css': ['a.css'],
                'js': ['b.js'],
            }
            // 此处'#tag'对应前端html的容器的选择器
            bp.fire('tag', pipeData)
            resolve()
        }, 3000)
    })
}

```

- 在路由的请求处理函数中，启动pipe，然后结束。

````Javascript

    index (req, res, next, page=1){
        let bp = new Bigpipe('karatBP', req, res)

        /**
         * bp.start会默认将 _bigpipe_id，也就是此处的'karatBP' 参数渲染到模板中。
         * 因此前端home模板可以根据这个参数，自动new Bigpipe('{{_bigpipe_id}}'),这样浏览器端可以自动生
         * 成对应的bigpipe对象，在浏览器端window对象会自动添加一个变量名为_bigpipe_id也就是 karatBP 的
         * 属性，可以全局访问
         */
        
        bp.start('view/home')
        .pipe([
            articlePipe,
            tagPipe,
            
            // other ...
        ])
        .end()
    },

```

- 前端代码

````Html
<script type="text/javascript">
// 此处的'karatBP'对应服务端Bigpipe实例的id,会在window对象自动添加karatBP这个属性
new Bigpipe('karatBP')

// 或者可以自动从数据中获取的Bigpipe的id,如： new Bigpipe('{{_bigpipe_id}}')
</script>
```

- 完整服务端代码 TestController.js：

````Javascript

function tagPipe(bp){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'tag': 'your data'
        }

        // 模拟异步数据查询和输出
        setTimeout(()=>{
            let html = '<div><span>TagA</span><span>TagB</span><span>TagC</span><span>TagD</span></div>'

            let pipeData = {
                'html': html,
                'message': 'for tag pipe html'
                'css': ['a.css'],
                'js': ['b.js'],
            }
            // 此处'#tag'对应前端html的容器的选择器
            bp.fire('tag', pipeData)
            resolve()
        }, 3000)
    })
}


function articlePipe(bp){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'article': 'your data'
        }

        bp.res.render('view/article', rdata, (err, html)=>{

            bp.render('.wrap > .content', html)
            resolve()
        })
    })
}


// 此处index函数应该被框架的route来绑定
export default {

    index (req, res, next, page=1){
        let bp = new Bigpipe('karatBP', req, res)

        bp.start('view/home')
        .pipe([
            articlePipe,
            tagPipe,
            
            // other ...
        ])
        .end()
    },
}
```

- 完整前端代码
````HTML
<script type="text/javascript" src="/static/jquery.min.js"></script>
<script type="text/javascript" src="/static/mo.bigpipe.es5.js"></script>
<script type="text/javascript">
new Bigpipe('karatBP')

// 绑定自定义的pipe处理事件,对应服务端的bp.fire('tag', data)
karatBP.on('tag')
.then(function (data) {
    var pipeData = JSON.parse(data)
    console.log(pipeData.message)
    $('#tag').html(pipeData.html)
})
</script>
```

### 新增对ThinkJS的支持

使用时服务端代码略有不同:

* new Bigpie时需要多传入一个this参数
* 其他API以及前端部分无变化
* 关于ThinkJS框架可访问: [https://thinkjs.org](https://thinkjs.org)



````Javascript

export default class extends Base {
  indexAction(){
    let http = this.http;
    // 这里需要比Express/Sails框架，额外传入一个this参数
    let bp = new Bigpipe('thinkBP', http.req, http.res, this)

    // start默认参数是ThinkJS的默认模板文件index.html
    // 其他使用方法保持一致
    bp.start() // 或者 bp.sart('xxx')
    .pipe([
        tagPipe,
        testPipe
        
        // other ...
    ])
    .end()
 
  }
}
```


### 说明

完整demo代码见文件


