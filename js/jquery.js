/*!
 * jQuery cxScroll 1.2.1
 * http://code.ciaoca.com/
 * https://github.com/ciaoca/cxScroll
 * E-mail: ciaoca@gmail.com
 * Released under the MIT license
 * Date: 2014-03-10
 */
! function (a) {
    a.fn.cxScroll = function (b) {
        var c, d;
        this.length && (b = a.extend({}, a.cxScroll.defaults, b), c = this, d = {
            lock: !1,
            dom: {}
        }, d.init = function () {
            if (d.dom.box = c.find(".box"), d.dom.list = d.dom.box.find(".list"), d.dom.items = d.dom.list.find("li"), d.itemSum = d.dom.items.length, !(d.itemSum <= 1)) {
                if (d.dom.prevBtn = c.find(".prev"), d.dom.nextBtn = c.find(".next"), d.itemWidth = d.dom.items.outerWidth(), d.itemHeight = d.dom.items.outerHeight(), "left" == b.direction || "right" == b.direction) {
                    if (d.itemWidth * d.itemSum <= d.dom.box.outerWidth()) return;
                    d.prevVal = "left", d.nextVal = "right", d.moveVal = d.itemWidth
                } else {
                    if (d.itemHeight * d.itemSum <= d.dom.box.outerHeight()) return;
                    d.prevVal = "top", d.nextVal = "bottom", d.moveVal = d.itemHeight
                }
                d.dom.list.append(d.dom.list.html()), b.prevBtn && !d.dom.prevBtn.length && (d.dom.prevBtn = a("<a></a>", {
                    "class": "prev"
                }).prependTo(c)), b.nextBtn && !d.dom.nextBtn.length && (d.dom.nextBtn = a("<a></a>", {
                    "class": "next"
                }).prependTo(c)), b.auto && c.hover(function () {
                    b.auto = !1, d.lock = !1, d.off()
                }, function () {
                    b.auto = !0, d.lock = !1, d.on()
                }), d.bindEvents(), d.on()
            }
        }, d.bindEvents = function () {
            b.nextBtn && d.dom.prevBtn.length && d.dom.nextBtn.bind("click", function () {
                d.lock || d.goto(d.nextVal, b.accel)
            }), b.prevBtn && d.dom.prevBtn.length && d.dom.prevBtn.bind("click", function () {
                d.lock || d.goto(d.prevVal, b.accel)
            })
        }, d.on = function () {
            b.auto && ("undefined" != typeof d.run && clearTimeout(d.run), d.run = setTimeout(function () {
                d.goto(b.direction)
            }, b.time))
        }, d.off = function () {
            d.dom.box.stop(!0), "undefined" != typeof d.run && clearTimeout(d.run)
        }, d.goto = function (c, e) {
            var f, g, h;
            switch (d.off(), b.controlLock && (d.lock = !0), h = e || b.speed, c) {
            case "left":
            case "top":
                f = 0, "left" == c ? (0 == parseInt(d.dom.box.scrollLeft(), 10) && d.dom.box.scrollLeft(d.itemSum * d.moveVal), g = d.dom.box.scrollLeft() - d.moveVal * b.step, g % d.itemWidth > 0 && (g -= g % d.itemWidth - d.itemWidth), f > g && (g = f), d.dom.box.animate({
                    scrollLeft: g
                }, h, b.easing, function () {
                    parseInt(d.dom.box.scrollLeft(), 10) <= f && d.dom.box.scrollLeft(0)
                })) : (0 == parseInt(d.dom.box.scrollTop(), 10) && d.dom.box.scrollTop(d.itemSum * d.moveVal), g = d.dom.box.scrollTop() - d.moveVal * b.step, g % d.itemHeight > 0 && (g -= g % d.itemHeight - d.itemHeight), f > g && (g = f), d.dom.box.animate({
                    scrollTop: g
                }, h, b.easing, function () {
                    parseInt(d.dom.box.scrollTop(), 10) <= f && d.dom.box.scrollTop(0)
                }));
                break;
            case "right":
            case "bottom":
                f = d.itemSum * d.moveVal, "right" == c ? (g = d.dom.box.scrollLeft() + d.moveVal * b.step, g % d.itemWidth > 0 && (g -= g % d.itemWidth), g > f && (g = f), d.dom.box.animate({
                    scrollLeft: g
                }, h, b.easing, function () {
                    parseInt(d.dom.box.scrollLeft(), 10) >= f && d.dom.box.scrollLeft(0)
                })) : (g = d.dom.box.scrollTop() + d.moveVal * b.step, g % d.itemHeight > 0 && (g -= g % d.itemHeight), g > f && (g = f), d.dom.box.animate({
                    scrollTop: g
                }, h, b.easing, function () {
                    parseInt(d.dom.box.scrollTop(), 10) >= f && d.dom.box.scrollTop(0)
                }))
            }
            d.dom.box.queue(function () {
                b.controlLock && (d.lock = !1), d.on(), a(this).dequeue()
            })
        }, d.init())
    }, a.cxScroll = {
        defaults: {
            direction: "right",
            easing: "swing",
            step: 1,
            accel: 160,
            speed: 800,
            time: 4e3,
            auto: !0,
            prevBtn: !0,
            nextBtn: !0,
            safeLock: !0
        }
    }
}(jQuery);