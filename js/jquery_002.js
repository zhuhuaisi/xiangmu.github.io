/*!
 * cxSlide 1.1
 * http://code.ciaoca.com/
 * https://github.com/ciaoca/cxSlide
 * E-mail: ciaoca@gmail.com
 * Released under the MIT license
 * Date: 2014-12-11
 */
! function(a) {
	"function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a) {
	a.cxSlide = function() {
		var b, c, d, h, i, e = {
				dom: {},
				api: {}
			},
			f = function(a) {
				return a && ("function" == typeof HTMLElement || "object" == typeof HTMLElement) && a instanceof HTMLElement ? !0 : a && a.nodeType && 1 === a.nodeType ? !0 : !1
			},
			g = function(a) {
				return a && a.length && ("function" == typeof jQuery || "object" == typeof jQuery) && a instanceof jQuery ? !0 : !1
			};
		for (h = 0, i = arguments.length; i > h; h++) g(arguments[h]) ? b = arguments[h] : f(arguments[h]) ? b = a(arguments[h]) : "function" == typeof arguments[h] ? d = arguments[h] : "object" == typeof arguments[h] && (c = arguments[h]);
		b.length && (e.init = function() {
			var e = this;
			e.dom.el = b, e.settings = a.extend({}, a.cxSlide.defaults, c), e.build(), e.api = {
				play: function() {
					e.settings.auto = !0, e.play()
				},
				stop: function() {
					e.settings.auto = !1, e.stop()
				},
				"goto": function() {
					e.goto.apply(e, arguments)
				},
				prev: function() {
					e.goto(e.now - 1)
				},
				next: function() {
					e.goto()
				}
			}, "function" == typeof d && d(e.api)
		}, e.build = function() {
			var c, d, b = this;
			if (b.dom.box = b.dom.el.find(".box"), b.dom.list = b.dom.box.find(".list"), b.dom.items = b.dom.list.find("li"), b.itemSum = b.dom.items.length, !(b.itemSum <= 1)) {
				if (b.dom.numList = b.dom.el.find(".btn"), b.dom.numBtns = b.dom.numList.find("li"), b.dom.plusBtn = b.dom.el.find(".plus"), b.dom.minusBtn = b.dom.el.find(".minus"), b.boxWidth = b.dom.box.width(), b.boxHeight = b.dom.box.height(), b.now = 0, b.settings.btn && !b.dom.numList.length) {
					for (c = "", d = 1; d <= b.itemSum; d++) c += '<li class="b_' + d + '">' + d + "</li>";
					b.dom.numList = a("<ul></ul>", {
						"class": "btn",
						html: c
					}).appendTo(b.dom.el), b.dom.numBtns = b.dom.numList.find("li")
				}
				b.settings.plus && !b.dom.plusBtn.length && (b.dom.plusBtn = a("<div></div>", {
					"class": "plus"
				}).appendTo(b.dom.el)), b.settings.minus && !b.dom.minusBtn.length && (b.dom.minusBtn = a("<div></div>", {
					"class": "minus"
				}).appendTo(b.dom.el)), b.dom.box.on("mouseenter", function() {
					b.stop()
				}), b.dom.box.on("mouseleave", function() {
					b.play()
				}), b.settings.btn && b.dom.numList.on(b.settings.events, "li", function() {
					b.goto(a(this).index())
				}), b.settings.minus && b.dom.minusBtn.on(b.settings.events, function() {
					b.goto(b.now - 1)
				}), b.settings.plus && b.dom.plusBtn.on(b.settings.events, function() {
					b.goto()
				}), b.goto(b.settings.start)
			}
		}, e.play = function() {
			var a = this;
			a.settings.auto && (a.stop(), a.run = setTimeout(function() {
				a.goto()
			}, a.settings.time))
		}, e.stop = function() {
			"undefined" != typeof this.run && clearTimeout(this.run)
		}, e.goto = function(a) {
			var f, b = this,
				c = "undefined" == typeof a ? b.now + 1 : parseInt(a, 10),
				d = b.now,
				e = b.itemSum - 1;
			if (c > e ? c = 0 : 0 > c && (c = e), b.dom.numList.length && b.dom.numBtns.removeClass("selected").eq(c).addClass("selected"), b.stop(), c === d) return b.play(), void 0;
			switch (b.settings.type) {
				case "x":
					f = b.boxWidth * c, 0 === c && d === e ? (b.dom.items.eq(0).css({
						left: b.boxWidth * b.itemSum
					}), f = b.boxWidth * b.itemSum) : 0 === d && (b.dom.items.eq(0).css({
						left: ""
					}), b.dom.box.scrollLeft(0)), b.dom.box.stop(!0, !1).animate({
						scrollLeft: f
					}, b.settings.speed);
					break;
				case "y":
					f = b.boxHeight * c, 0 === c && d === e ? (b.dom.items.eq(0).css({
						top: b.boxHeight * b.itemSum
					}), f = b.boxHeight * b.itemSum) : 0 === d && (b.dom.items.eq(0).css({
						top: ""
					}), b.dom.box.scrollTop(0)), b.dom.box.stop(!0, !1).animate({
						scrollTop: f
					}, b.settings.speed);
					break;
				case "fade":
					b.dom.items.css({
						display: "none",
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: ""
					}), b.dom.items.eq(d).css({
						display: "",
						zIndex: 1
					}), b.dom.items.eq(c).css({
						zIndex: 2
					}).fadeIn(b.settings.speed);
					break;
				case "toggle":
					b.dom.items.hide().eq(c).show()
			}
			b.now = c, b.dom.box.queue(function() {
				b.play(), b.dom.box.dequeue()
			})
		}, e.init())
	}, a.cxSlide.defaults = {
		events: "click",
		type: "x",
		start: 0,
		speed: 800,
		time: 5e3,
		auto: !0,
		btn: !0,
		plus: !1,
		minus: !1
	}, a.fn.cxSlide = function(b, c) {
		return this.each(function() {
			a.cxSlide(this, b, c)
		}), this
	}
});