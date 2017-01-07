# node-bigpipe

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



### Backend API
- `bigpipe.start(viewPath, [data])`: Start render
- `bigpipe.pipe(promiseList)`：transport the pipe
- `bigpipe.end([onEndFn])`： Stop and finish the pipe
- `bigpipe.render(selector, htmlData)`： Similar with `$(selector).html(htmlData)`, set the dom html content 
- `bigpipe.append(selector, htmlData)`： Similar with `$(selector).append(htmlData)`, append the dom element content
- `bigpipe.fire(eventName, data)`: Trigger the event which subscribed in Front End. The event should is used to deal with the data transported by bigpipe. You can use `on` api to subscribe the event.

### Browser API
- `bigpipe.on(eventName).then(data=>{ // deal with data ...  })`: Subscribe the eventName and you can use `then` to add `callback` fn
- `bigpie.fire/render/append` Set the dom content, Same with mentioned above in Backend API.


### Examples

- Create a pipe and return a Promise

The implementation will be put into the tagPipe, bp

```Javascript
function tagPipe(bp){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'tag': 'your data'
        }

        // simulate the asynchronous response
        setTimeout(()=>{
            let html = '<div><span>TagA</span><span>TagB</span><span>TagC</span><span>TagD</span></div>'

            let pipeData = {
                'html': html,
                'message': 'for tag pipe html'
                'css': ['a.css'],
                'js': ['b.js'],
            }
            // 
            bp.fire('tag', pipeData)
            resolve()
        }, 3000)
    })
}

```

- In view controller, start the pipe

```Javascript

    index (req, res, next, page=1){
        let bp = new Bigpipe('karatBP', req, res)

        /**
         * bp.start will put the _bigpipe_id into the template `data`。
         * So Front End can get the id just by `new Bigpipe('{{_bigpipe_id}}')`
         * The Object is global in browser
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

- Front End

```Html
<script type="text/javascript">

// This method will automatically export a object `karatBP` in window. And the `_bigpipe_id` shoud match the definition in backend 
new Bigpipe('karatBP')


// You can also use the `_bigpipe_id` parameter from backend by defaultl below:
// new Bigpipe('{{_bigpipe_id}}')

</script>
```

- Full backend code TestController.js：

```Javascript

// this is a bigpipe, you should return a promise in the bigpipe-function.
function tagPipe(bp){
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
            bp.fire('tag', pipeData)
            resolve()
        }, 3000)
    })
}


// another bigpipe
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


// here the `index` fn should be bound in router so it can be views by url
// the `view/home` is the basic html template, you can define some container div/elements in this html.
export default {

    index (req, res, next, page=1){
        let bp = new Bigpipe('karatBP', req, res)

        bp.start('view/home')
        .pipe([
            articlePipe,
            tagPipe,
            
            // other pipe...
        ])
        .end()
    },
}
```

- Full front end code
```HTML
<!-- If you want, you can write your own Frontend js to replace `jquery` and `bro.bigpipe` here. -->
<script type="text/javascript" src="/static/jquery.min.js"></script>
<script type="text/javascript" src="/static/bro.bigpipe.js"></script>

<!-- Here will use the bigpipe object transported from Backend -->
<script type="text/javascript">

// The `karatBP` is the bigpipe-id, it should match the Backend definition. Or you can use '{{_bigpipe_id}}' directly.
new Bigpipe('karatBP')

// You can subscribe the events which match the backend API `fire`, like fire('tag', data), then you can `on('tag')` in FE js.
karatBP.on('tag')
.then(function (data) {
    var pipeData = JSON.parse(data)
    console.log(pipeData.message)
    $('#tag').html(pipeData.html)
})

</script>
```

### Support for ThinkJS

Difference of usage in Backend:

* Put an additional param `this` into `new Bigpipe()`, like `new Bigpipe('xxxBP', http.req, http.res, this)`
* Other API is the SAME
* More About ThinkJS: [https://thinkjs.org](https://thinkjs.org)



```Javascript

export default class extends Base {
  indexAction(){
    let http = this.http;

    // Put an additional param: `this`
    let bp = new Bigpipe('thinkBP', http.req, http.res, this)

    // `start` method use default ThinkJS template path: index.html
    
    // other API usage is the same
    bp.start() // or bp.sart('xxx')
    .pipe([
        tagPipe,
        testPipe
        
        // other ...
    ])
    .end()
 
  }
}
```


### More

View full demo code in this github repo files.

