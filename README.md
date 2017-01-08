# [![node-bigpipe](https://raw.githubusercontent.com/xunuoi/node-bigpipe/master/meta/logo.png)](https://github.com/xunuoi/node-bigpipe) node-bigpipe 


[![NPM version](https://img.shields.io/npm/v/node-bigpipe.svg?style=flat-square)](http://badge.fury.io/js/node-bigpipe)<img src="https://raw.githubusercontent.com/xunuoi/node-bigpipe/master/meta/build.png?style=flat-square" width="90" alt="Build status" />


### Introduction
- Bigpie module for nodejs, web frameworks like Express, Sails, ThinkJS
- Only 3 Simple API: `start`, `pipe`, `end`, very light and transparent
- Based on `Promise`, easy to use and control


### Install
- Backend side: [npm: `npm install node-bigpipe --save-dev`]. Or [Copy Files into your project directly]
- Frontend side: Involve the `jQuery` and `bro.bigpipe.js` scripts into html. Or `require('node-bigpipe/static/bro.bigpipe')` by `webpack` or `browserify`.
- **You can write the Frontend js code by yourself, make sure to match the `Bigpipe` API of Backend.**


### Usage

In Backend, you should use `node-bigpipe` to create a bigpipe for response. 
In Frontend, you can use `bro.bigpipe.js`, or use your own js code to call the `bigpipe` from Backend.

Step:
* require the `node-bigpipe` module by `var Bigpipe = require('node-bigpipe').Bigpipe`
* Create an Bigpipe by `var bigpipe = new Bigpipe('pipeName', req, res)`
* Use `start` api to ouput the pipe and render the unclosed base html frame
* Use `pipe` api to transport to browser the array composed by pipe blocks you created 
* Use `end` api to finish this bigpipe
* More detail in Example

**Note:**
<br>
If you use nginx/apache, please check the server config for buffer.
If the response size is small, the nginx won't send pagelet, it will save in its buffer for final response. But you can **close nginx buffer/gzip** to show the bigpipe effect obviously like this:

```bash
location / {
    gzip  off;
    fastcgi_buffer_size 0k;
    proxy_buffering off;

    ...
}
```




### Backend API
- `bigpipe.start(viewPath, [data])`: Start render, `viewPath` can be a basic html template
- `bigpipe.pipe(promiseList)`：begin to transport the pipe into reponse
- `bigpipe.end([onEndFn])`： finish the pipe
- `bigpipe.render(selector, htmlData)`： Similar with `$(selector).html(htmlData)` in browser, set the dom html content 
- `bigpipe.append(selector, htmlData)`： Similar with `$(selector).append(htmlData)`, append the dom element content
- `bigpipe.fire(eventName, data)`: Trigger the event which subscribed in Front End. The event should is used to process the data transported by bigpipe. You can use `on` api to subscribe the event in Frontend js.

### Frontend js(Browser) API
- `bigpipe.on(eventName).then(data=>{ // deal with data ...  })`: Subscribe the eventName, you can use callback function in `then` API to process data.
- `bigpie.fire/render/append` Set the dom content, Same with mentioned above in Backend API.


### Examples

- Create a pagelet and return a Promise

The implementation will be put into the tagPagelet, bp

```Javascript
// Here the `bigpipe` parameter is injected by `start` API automatically.
function tagPagelet(bigpipe){

    return new Promise((resolve, reject)=>{
        let rdata = {
            'tag': 'your data'
        }

        // simulate the asynchronous response
        setTimeout(()=>{
            let html = '<div><span>TagA</span><span>TagB</span><span>TagC</span><span>TagD</span></div>'

            let pipeData = {
                'html': html,
                'message': 'for tag pipe html',
                'css': ['a.css'],
                'js': ['b.js'],
            }
            // Here the `tag` event names will subscribed by Frontend js code.
            // Here you can use `render`, `append`, `fire`, it depends on your Backend code
            bigpipe.fire('tag', pipeData)
            resolve()
        }, 3000)
    })
}

```

- In Backend controller, start the pipe

```Javascript

    index (req, res, next, page=1){
        let bigpipe = new Bigpipe('karatBP', req, res)

        /**
         * `bigpipe.start` will inject the _bigpipe_id into the template `data`, So Frontend js can get the `id` by `new Bigpipe('{{_bigpipe_id}}')`
         * And in Frontend js, it will export a object named by `_bigpipe_id`. for Example, here will create the window.karatBP object in browser js.
         */
        
        bigpipe.start('view/home')
        .pipe([
            articlePagelet,
            tagPagelet,
            
            // other ...
        ])
        .end()
    },

```

- Front End

```Html
<script type="text/javascript">

// This method will automatically export a object `karatBP` in window. And the `_bigpipe_id` shoud match the definition in backend 
new Bigpipe('karatBP')


// You can also use the `_bigpipe_id` parameter from backend by defaultl below:
// new Bigpipe('{{_bigpipe_id}}')

</script>
```

### Full Demo Code

- Full Backend demo code in `demo/DemoController.js`：

```Javascript

var Bigpipe = require('node-bigpipe').Bigpipe

// this is a pagelet for pipe, you should return a promise in the pagelet-function.
function tagPagelet(bigpipe){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'tag': 'your data'
        }

        // simulate the asynchronous response, it may be replaced by DB/IO/NETWORK and other async operations.
        setTimeout(()=>{
            let html = '<div><span>TagA</span><span>TagB</span><span>TagC</span><span>TagD</span></div>'

            let pipeData = {
                'html': html,
                'message': 'for tag pipe html'
                'css': ['a.css'],
                'js': ['b.js'],
            }
            // here the `tag` match the event in frontend. You can use the bigpipe by `on('tag')` in Frontend js code.
            bigpipe.fire('tag', pipeData)
            resolve()
        }, 3000)
    })
}


// another pagelet
function articlePagelet(bigpipe){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'article': 'your data'
        }

        bigpipe.res.render('view/article', rdata, (err, html)=>{

            // Here you can use `render`, `append`, `fire`
            bigpipe.render('.wrap > .content', html)
            resolve()

        })
    })
}


// here the `index` fn should be bound in router so it can be views by url
// the `view/home` is the basic html template, you can define some container div/elements in this html.
export default {

    index (req, res, next, page=1){
        let bigpipe = new Bigpipe('karatBP', req, res)

        bigpipe.start('view/home')
        .pipe([
            articlePagelet,
            tagPagelet,
            
            // other pagelet...
        ])
        .end()
    },
}
```

- Full Frontend demo code
```HTML
<!-- If you want, you can write your own Frontend js to replace `jquery` and `bro.bigpipe` here. -->
<script type="text/javascript" src="/static/jquery.min.js"></script>
<script type="text/javascript" src="/static/bro.bigpipe.js"></script>

<!-- Here will use the bigpipe object transported from Backend -->
<script type="text/javascript">

// The `karatBP` is the bigpipe-id, it should match the Backend definition. Or you can use '{{_bigpipe_id}}' directly.
var karatBP = new Bigpipe('karatBP')

// You can subscribe the events which match the backend API `fire`, like fire('tag', data), then you can `on('tag')` in FE js.
karatBP.on('tag')
.then(function (pageletData) {
    console.log(pageletData)
    $('#tag').html(pageletData.html)
})

</script>
```

### Support for ThinkJS

Difference of usage in Backend:

* Put an additional param `this` into `new Bigpipe()`, like `new Bigpipe('xxxBP', http.req, http.res, this)`
* Other APIs keep SAME with above usage
* More About ThinkJS: [https://thinkjs.org](https://thinkjs.org)



```Javascript

export default class extends Base {
  indexAction(){
    let http = this.http;

    // Put an additional param: `this`
    let bigpipe = new Bigpipe('thinkBP', http.req, http.res, this)

    // `start` method use default ThinkJS template path: index.html
    // Or bigpipe.sart('xxx') to specific some html template file
    bigpipe.start()
    .pipe([
        tagPagelet,
        articlePagelet
        
        // other pagelet...
    ])
    .end()
    // Other APIs keep same with above usage.
 
  }
}
```


### More

Please check the demo code in `demo` folder in the repository. And the Frontend js code is in `static` folder.

