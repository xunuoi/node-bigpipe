'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FOR BIGPIPE
 * Modular bigpipe API
 */

var Bigpipe = function () {
    function Bigpipe(id, req, res) {
        var think = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

        _classCallCheck(this, Bigpipe);

        this.id = id;
        this.req = req;
        this.res = res;
        this._eventBase = {};

        // support the thinkjs
        this.think = think;
    }

    _createClass(Bigpipe, [{
        key: 'destroy',
        value: function destroy() {
            for (var k in this) {
                delete this[k];
            }
        }
    }, {
        key: 'config',
        value: function config() {
            var id = arguments.length <= 0 || arguments[0] === undefined ? this.id : arguments[0];
            var req = arguments.length <= 1 || arguments[1] === undefined ? this.req : arguments[1];
            var res = arguments.length <= 2 || arguments[2] === undefined ? this.res : arguments[2];

            this.id = id;
            this.req = req;
            this.res = res;
        }
    }, {
        key: 'start',
        value: function start(viewPath) {
            var _this = this;

            var data = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
            var fn = arguments[2];

            var res = this.res,
                bp = this;

            // step 1
            var p = new Promise(function (resolve, reject) {
                res.setHeader('content-type', 'text/html; charset=utf-8');

                data ? data['_bigpipe_id'] = bp.id : data = { '_bigpipe_id': bp.id };

                if (!_this.think) res.render(viewPath, data, function (err, html) {
                    if (err) return reject(err);
                    if (fn) fn(html);

                    res.write(html);
                    resolve(html);
                });else _this.think.assign(data), _this.think.fetch(viewPath).then(function (html) {
                    res.write(html);
                    resolve(html);
                });
            });

            // step 2
            bp.pipe = p.pipe = function (list) {
                var p2 = p.then(function (html) {
                    return Promise.all(list.map(function (pFn) {
                        return pFn(bp);
                    }));
                });

                // step 3
                bp.end = p2.end = function (fn) {
                    return p2.then(function (result) {
                        res.write('\n</body></html>');
                        res.end();

                        // destroy bigpipe
                        bp.destroy();
                    });
                };

                return p2;
            };

            return p;
        }
    }, {
        key: 'wrap',
        value: function wrap(selector, content) {
            return '<script>' + this.id + '.render(\'' + selector + '\', ' + JSON.stringify(content) + ')</script>';
        }
    }, {
        key: 'wrapAppend',
        value: function wrapAppend(selector, content) {
            return '<script>' + this.id + '.render(\'' + selector + '\', ' + JSON.stringify(content) + ')</script>';
        }
    }, {
        key: 'wrapFire',
        value: function wrapFire(event, data) {
            return '<script>' + this.id + '.fire(\'' + event + '\', ' + JSON.stringify(data) + ')</script>';
        }
    }, {
        key: 'render',
        value: function render() {
            this.res.write(this.wrap.apply(this, arguments));
        }
    }, {
        key: 'fire',
        value: function fire() {
            this.res.write(this.wrapFire.apply(this, arguments));
        }
    }, {
        key: 'append',
        value: function append() {
            this.res.write(this.wrapAppend.apply(this, arguments));
        }
    }]);

    return Bigpipe;
}();

exports.Bigpipe = Bigpipe;