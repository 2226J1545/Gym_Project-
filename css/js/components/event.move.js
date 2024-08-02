!function(e) {
    "function" == typeof define && define.amd ? define([], e) : "undefined" != typeof module && null !== module && module.exports ? module.exports = e : e()
}(function() {
    var e = Object.assign || window.jQuery && jQuery.extend
      , t = 8
      , n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
        return window.setTimeout(function() {
            e()
        }, 25)
    }
      , i = {
        textarea: !0,
        input: !0,
        select: !0,
        button: !0
    }
      , o = {
        move: "mousemove",
        cancel: "mouseup dragstart",
        end: "mouseup"
    }
      , a = {
        move: "touchmove",
        cancel: "touchend",
        end: "touchend"
    }
      , c = /\s+/
      , u = {
        bubbles: !0,
        cancelable: !0
    }
      , r = Symbol("events");
    function d(e) {
        return e[r] || (e[r] = {})
    }
    function m(e, t, n, i, o) {
        t = t.split(c);
        var a, u = d(e), r = t.length;
        function m(e) {
            n(e, i)
        }
        for (; r--; )
            (u[a = t[r]] || (u[a] = [])).push([n, m]),
            e.addEventListener(a, m)
    }
    function f(e, t, n, i) {
        t = t.split(c);
        var o, a, u, r = d(e), m = t.length;
        if (r)
            for (; m--; )
                if (a = r[o = t[m]])
                    for (u = a.length; u--; )
                        a[u][0] === n && (e.removeEventListener(o, a[u][1]),
                        a.splice(u, 1))
    }
    function v(t, n, i) {
        var o = function(e) {
            return new CustomEvent(e,u)
        }(n);
        i && e(o, i),
        t.dispatchEvent(o)
    }
    function s(e) {
        var t = e
          , i = !1
          , o = !1;
        function a(e) {
            i ? (t(),
            n(a),
            o = !0,
            i = !1) : o = !1
        }
        this.kick = function(e) {
            i = !0,
            o || a()
        }
        ,
        this.end = function(e) {
            var n = t;
            e && (o ? (t = i ? function() {
                n(),
                e()
            }
            : e,
            i = !0) : e())
        }
    }
    function l() {}
    function g(e) {
        e.preventDefault()
    }
    function p(e, t) {
        var n, i;
        if (e.identifiedTouch)
            return e.identifiedTouch(t);
        for (n = -1,
        i = e.length; ++n < i; )
            if (e[n].identifier === t)
                return e[n]
    }
    function h(e, t) {
        var n = p(e.changedTouches, t.identifier);
        if (n && (n.pageX !== t.pageX || n.pageY !== t.pageY))
            return n
    }
    function X(e, t) {
        T(e, t, e, y)
    }
    function Y(e, t) {
        y()
    }
    function y() {
        f(document, o.move, X),
        f(document, o.cancel, Y)
    }
    function w(e) {
        f(document, a.move, e.touchmove),
        f(document, a.cancel, e.touchend)
    }
    function T(e, n, i, o) {
        var a = i.pageX - n.pageX
          , c = i.pageY - n.pageY;
        a * a + c * c < t * t || function(e, t, n, i, o, a) {
            var c = e.targetTouches
              , u = e.timeStamp - t.timeStamp
              , r = {
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                startX: t.pageX,
                startY: t.pageY,
                distX: i,
                distY: o,
                deltaX: i,
                deltaY: o,
                pageX: n.pageX,
                pageY: n.pageY,
                velocityX: i / u,
                velocityY: o / u,
                identifier: t.identifier,
                targetTouches: c,
                finger: c ? c.length : 1,
                enableMove: function() {
                    this.moveEnabled = !0,
                    this.enableMove = l,
                    e.preventDefault()
                }
            };
            v(t.target, "movestart", r),
            a(t)
        }(e, n, i, a, c, o)
    }
    function b(e, t) {
        var n = t.timer;
        t.touch = e,
        t.timeStamp = e.timeStamp,
        n.kick()
    }
    function S(e, t) {
        var n = t.target
          , i = t.event
          , a = t.timer;
        f(document, o.move, b),
        f(document, o.end, S),
        K(n, i, a, function() {
            setTimeout(function() {
                f(n, "click", g)
            }, 0)
        })
    }
    function k(e, t) {
        var n = t.target
          , i = t.event
          , o = t.timer;
        p(e.changedTouches, i.identifier) && (!function(e) {
            f(document, a.move, e.activeTouchmove),
            f(document, a.end, e.activeTouchend)
        }(t),
        K(n, i, o))
    }
    function K(e, t, n, i) {
        n.end(function() {
            return v(e, "moveend", t),
            i && i()
        })
    }
    if (m(document, "mousedown", function(e) {
        (function(e) {
            return 1 === e.which && !e.ctrlKey && !e.altKey
        }
        )(e) && (function(e) {
            return !!i[e.target.tagName.toLowerCase()]
        }(e) || (m(document, o.move, X, e),
        m(document, o.cancel, Y, e)))
    }),
    m(document, "touchstart", function(e) {
        if (!i[e.target.tagName.toLowerCase()]) {
            var t = e.changedTouches[0]
              , n = {
                target: t.target,
                pageX: t.pageX,
                pageY: t.pageY,
                identifier: t.identifier,
                touchmove: function(e, t) {
                    !function(e, t) {
                        var n = h(e, t);
                        n && T(e, t, n, w)
                    }(e, t)
                },
                touchend: function(e, t) {
                    !function(e, t) {
                        p(e.changedTouches, t.identifier) && w(t)
                    }(e, t)
                }
            };
            m(document, a.move, n.touchmove, n),
            m(document, a.cancel, n.touchend, n)
        }
    }),
    m(document, "movestart", function(e) {
        if (!e.defaultPrevented && e.moveEnabled) {
            var t = {
                startX: e.startX,
                startY: e.startY,
                pageX: e.pageX,
                pageY: e.pageY,
                distX: e.distX,
                distY: e.distY,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                velocityX: e.velocityX,
                velocityY: e.velocityY,
                identifier: e.identifier,
                targetTouches: e.targetTouches,
                finger: e.finger
            }
              , n = {
                target: e.target,
                event: t,
                timer: new s(function(e) {
                    (function(e, t, n) {
                        var i = n - e.timeStamp;
                        e.distX = t.pageX - e.startX,
                        e.distY = t.pageY - e.startY,
                        e.deltaX = t.pageX - e.pageX,
                        e.deltaY = t.pageY - e.pageY,
                        e.velocityX = .3 * e.velocityX + .7 * e.deltaX / i,
                        e.velocityY = .3 * e.velocityY + .7 * e.deltaY / i,
                        e.pageX = t.pageX,
                        e.pageY = t.pageY
                    }
                    )(t, n.touch, n.timeStamp),
                    v(n.target, "move", t)
                }
                ),
                touch: void 0,
                timeStamp: e.timeStamp
            };
            void 0 === e.identifier ? (m(e.target, "click", g),
            m(document, o.move, b, n),
            m(document, o.end, S, n)) : (n.activeTouchmove = function(e, t) {
                !function(e, t) {
                    var n = t.event
                      , i = t.timer
                      , o = h(e, n);
                    o && (e.preventDefault(),
                    n.targetTouches = e.targetTouches,
                    t.touch = o,
                    t.timeStamp = e.timeStamp,
                    i.kick())
                }(e, t)
            }
            ,
            n.activeTouchend = function(e, t) {
                k(e, t)
            }
            ,
            m(document, a.move, n.activeTouchmove, n),
            m(document, a.end, n.activeTouchend, n))
        }
    }),
    window.jQuery) {
        var j = "startX startY pageX pageY distX distY deltaX deltaY velocityX velocityY".split(" ");
        jQuery.event.special.movestart = {
            setup: function() {
                return m(this, "movestart", E),
                !1
            },
            teardown: function() {
                return f(this, "movestart", E),
                !1
            },
            add: A
        },
        jQuery.event.special.move = {
            setup: function() {
                return m(this, "movestart", Q),
                !1
            },
            teardown: function() {
                return f(this, "movestart", Q),
                !1
            },
            add: A
        },
        jQuery.event.special.moveend = {
            setup: function() {
                return m(this, "movestart", q),
                !1
            },
            teardown: function() {
                return f(this, "movestart", q),
                !1
            },
            add: A
        }
    }
    function E(e) {
        e.enableMove()
    }
    function Q(e) {
        e.enableMove()
    }
    function q(e) {
        e.enableMove()
    }
    function A(e) {
        var t = e.handler;
        e.handler = function(e) {
            for (var n, i = j.length; i--; )
                e[n = j[i]] = e.originalEvent[n];
            t.apply(this, arguments)
        }
    }
});
