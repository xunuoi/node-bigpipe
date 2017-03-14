/**
 * FOR Bigpipe Test
 * use es6 
 */

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
            // here the '#tag' match the element id/class used in FE js selector
            bigpipe.fire('tag', pipeData)
            resolve()
        }, 3000)
    })
}


function articlePagelet(bigpipe){
    return new Promise((resolve, reject)=>{
        let rdata = {
            'article': 'your data'
        }

        /**
         * It's async API. It will call `render` API inside the `node-bigpipe` module.
         */
        bigpipe.res.render('view/article', rdata, (err, html)=>{

            bigpipe.render('.wrap > .content', html)
            resolve()
        })
    })
}


export default {

    pindex (req, res, next, page=1){
        let bigpipe = new Bigpipe('karatBP', req, res)

        /**
         * `bigpipe.start` will inject the _bigpipe_id into the template `data`, So Frontend js can get the `id` by `new Bigpipe('{{_bigpipe_id}}')`
         * And in Frontend js, it will create a object named by `_bigpipe_id`. for Example, here will create the window.karatBP in browser js.
         */
        
        bigpipe.start('view/home')
        .pipe([
            tagPagelet,
            articlePagelet,
            
            // other ...
        ])
        .end()
    },


}

