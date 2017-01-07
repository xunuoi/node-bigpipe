/**
 * FOR Bigpipe Test
 * use es6 
 */

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
                'message': 'for tag pipe html',
                'css': ['a.css'],
                'js': ['b.js'],
            }
            // here the '#tag' match the element id/class used in FE js selector
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
         * Here call the Express/Sails `render` api
         * 
         * It's async API.
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

