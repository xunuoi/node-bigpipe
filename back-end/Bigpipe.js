/**
 * FOR BIGPIPE
 * 模块化bigpipe， 可以url 访问，也可以api调用
 */


class Bigpipe {

    constructor (id, req, res) {
        this.id = id
        this.req = req
        this.res = res
        this._eventBase = { }
    }


    destroy () {
        for(let k in this){
            delete this[k]
        }
    }


    config(id=this.id, req=this.req, res=this.res){
        this.id = id
        this.req = req
        this.res = res
    }


    start(viewPath, data=undefined, fn){
        let res = this.res,
            bp = this

        // step 1
        let p = new Promise((resolve, reject)=>{
            res.setHeader('content-type', 'text/html; charset=utf-8')

            data ? 
                data['_bigpipe_id'] = bp.id : 
                data = { '_bigpipe_id': bp.id }

            res.render(viewPath, data, (err, html)=>{

                if(err) return reject(err)
                if(fn) fn(html)

                res.write(html)
                resolve(html)

            })
        })

        // step 2
        bp.pipe = p.pipe = function(list){
            let p2 = p.then(html=>{
                return Promise.all(list.map(pFn=>pFn(bp)))
            })

            // step 3
            bp.end = p2.end = function (fn){
                return p2.then(result=>{
                    res.write('\n</body></html>')
                    res.end()

                    // destroy bigpipe
                    bp.destroy()
                })
            }

            return p2
        }

        return p

    }


    wrap(selector, content){
        return `<script>${this.id}.render('${selector}', ${JSON.stringify(content)})</script>`
    }


    wrapAppend(selector, content){
       return `<script>${this.id}.render('${selector}', ${JSON.stringify(content)})</script>` 
    }


    wrapFire(event, data){
        return `<script>${this.id}.fire('${event}', ${JSON.stringify(data)})</script>`
    }


    render(...args){
        this.res.write(this.wrap(...args))
    }

    
    fire(...args){
        this.res.write(this.wrapFire(...args))
    }


    append(...args){
        this.res.write(this.wrapAppend(...args))
    }

}


export {
    Bigpipe
}