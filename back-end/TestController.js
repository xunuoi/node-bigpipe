/**
 * FOR Bigpipe Test
 * use es6 
 */

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

        /**
         * 这里是调用Express/Sails框架自带的render方法的演示
         * 
         * 此处render是调用了express的模板引擎的渲染方法，是express封装的方法，异步的。
         */
        bp.res.render('view/article', rdata, (err, html)=>{

            bp.render('.wrap > .content', html)
            resolve()
        })
    })
}


export default {

    pindex (req, res, next, page=1){
        let bp = new Bigpipe('karatBP', req, res)

        /**
         * bp.start会默认将 _bigpipe_id，也就是此处的'karatBP' 参数渲染到模板中。因此前端home模板可以根据这个参数，自动new Bigpipe('{{_bigpipe_id}}'),这样浏览器端可以自动生成对应的bigpipe对象，在浏览器端window对象会自动添加一个变量名为_bigpipe_id也就是 karatBP 的属性，可以全局访问
         */
        
        bp.start('view/home')
        .pipe([
            articlePipe,
            tagPipe,
            
            // other ...
        ])
        .end()
    },


}

