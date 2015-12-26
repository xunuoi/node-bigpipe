(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Bigpipe = (function () {
    function Bigpipe() {
        var id = arguments.length <= 0 || arguments[0] === undefined ? location.href : arguments[0];

        var _g = arguments.length <= 1 || arguments[1] === undefined ? window : arguments[1];

        _classCallCheck(this, Bigpipe);

        this.id = id;
        this._eventBase = {};
        this._global = _g;

        // export the bigpie instance to global
        _g[id] = this;
    }

    _createClass(Bigpipe, [{
        key: 'destroy',
        value: function destroy() {
            delete this['_global'][this.id];
            delete this['_eventBase'];
            delete this['_global'];
            delete this['id'];
            delete this['constructor'];
        }
    }, {
        key: 'getEvents',
        value: function getEvents() {
            return this._eventBase;
        }
    }, {
        key: '_setThen',
        value: function _setThen(event) {
            var _eb = this._eventBase;

            this.then = function (fn) {
                _eb[event].push(fn);

                return this;
            };
        }
    }, {
        key: 'on',
        value: function on(event, fn) {

            this._eventBase[event] ? fn ? this._eventBase[event].push(fn) : '' : fn ? this._eventBase[event] = [fn] : this._eventBase[event] = [];

            this._setThen(event);

            return this;
        }
    }, {
        key: 'fire',
        value: function fire(event) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            this._eventBase[event] ? this._eventBase[event].forEach(function (fn, index) {
                // console.log(fn)
                fn.apply(undefined, args);
            }) : console.log('No event subscribed for ' + event);
        }
    }, {
        key: 'render',
        value: function render(selector, content) {
            $(selector).html(content);
        }
    }, {
        key: 'append',
        value: function append(selector, content) {
            $(selector).append(content);
        }
    }]);

    return Bigpipe;
})();

window.Bigpipe = Bigpipe;
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvLnRtcC9jb21tb24vbW8uYmlncGlwZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBCaWdwaXBlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCaWdwaXBlKCkge1xuICAgICAgICB2YXIgaWQgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBsb2NhdGlvbi5ocmVmIDogYXJndW1lbnRzWzBdO1xuXG4gICAgICAgIHZhciBfZyA9IGFyZ3VtZW50cy5sZW5ndGggPD0gMSB8fCBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHdpbmRvdyA6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmlncGlwZSk7XG5cbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLl9ldmVudEJhc2UgPSB7fTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsID0gX2c7XG5cbiAgICAgICAgLy8gZXhwb3J0IHRoZSBiaWdwaWUgaW5zdGFuY2UgdG8gZ2xvYmFsXG4gICAgICAgIF9nW2lkXSA9IHRoaXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEJpZ3BpcGUsIFt7XG4gICAgICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzWydfZ2xvYmFsJ11bdGhpcy5pZF07XG4gICAgICAgICAgICBkZWxldGUgdGhpc1snX2V2ZW50QmFzZSddO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXNbJ19nbG9iYWwnXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzWydpZCddO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXNbJ2NvbnN0cnVjdG9yJ107XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEV2ZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRFdmVudHMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRCYXNlO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfc2V0VGhlbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0VGhlbihldmVudCkge1xuICAgICAgICAgICAgdmFyIF9lYiA9IHRoaXMuX2V2ZW50QmFzZTtcblxuICAgICAgICAgICAgdGhpcy50aGVuID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgX2ViW2V2ZW50XS5wdXNoKGZuKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50QmFzZVtldmVudF0gPyBmbiA/IHRoaXMuX2V2ZW50QmFzZVtldmVudF0ucHVzaChmbikgOiAnJyA6IGZuID8gdGhpcy5fZXZlbnRCYXNlW2V2ZW50XSA9IFtmbl0gOiB0aGlzLl9ldmVudEJhc2VbZXZlbnRdID0gW107XG5cbiAgICAgICAgICAgIHRoaXMuX3NldFRoZW4oZXZlbnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZmlyZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmaXJlKGV2ZW50KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZXZlbnRCYXNlW2V2ZW50XSA/IHRoaXMuX2V2ZW50QmFzZVtldmVudF0uZm9yRWFjaChmdW5jdGlvbiAoZm4sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZm4pXG4gICAgICAgICAgICAgICAgZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIH0pIDogY29uc29sZS5sb2coJ05vIGV2ZW50IHN1YnNjcmliZWQgZm9yICcgKyBldmVudCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoc2VsZWN0b3IsIGNvbnRlbnQpIHtcbiAgICAgICAgICAgICQoc2VsZWN0b3IpLmh0bWwoY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FwcGVuZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBlbmQoc2VsZWN0b3IsIGNvbnRlbnQpIHtcbiAgICAgICAgICAgICQoc2VsZWN0b3IpLmFwcGVuZChjb250ZW50KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCaWdwaXBlO1xufSkoKTtcblxud2luZG93LkJpZ3BpcGUgPSBCaWdwaXBlOyJdfQ==
