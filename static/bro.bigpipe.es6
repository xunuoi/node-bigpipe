class Bigpipe {

    constructor (id=location.href, _g=window) {
        this.id = id
        this._eventBase = { }
        this._global = _g

        // export the bigpie instance to global
        _g[id] = this
    }


    destroy () {
        delete this['_global'][this.id]
        delete this['_eventBase']
        delete this['_global']
        delete this['id']
        delete this['constructor']
    }


    getEvents() {
        return this._eventBase
    }


    _setThen (event){
        let _eb = this._eventBase

        this.then = function (fn) {
            _eb[event].push(fn)

            return this
        }
        
    }   


    on (event, fn) {

        this._eventBase[event] ? 
            (fn ? 
                this._eventBase[event].push(fn) : ''
            ) :
            (fn ? 
                this._eventBase[event] = [fn] :
                this._eventBase[event] = []
            )

        this._setThen(event)

        return this 
    }


    fire (event, ...args) {
        this._eventBase[event] ? 
            this._eventBase[event].forEach((fn, index)=>{
                // console.log(fn)
                fn(...args)
            }) :
            console.log(`No event subscribed for ${event}`)
    }


    render(selector, content){
        $(selector).html(content)
    }


    append(selector, content){
        $(selector).append(content)
    }

}


window.Bigpipe = Bigpipe
