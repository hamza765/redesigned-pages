/*! textStretch.js v1.0.0 | (c) 2012 - 2013 Albin Larsson | Licensed under MIT: http://www.opensource.org/licenses/mit-license.php */ ! function(a, b) {
    "use strict";
    var c, d, e, f = !1,
        g = {},
        h = {
            elements: [],
            settings: []
        };
    a("<style>.textStretch-calc{display:inline-block !important;*display:inline !important;white-space:nowrap !important;width:auto !important;padding:0 !important;text-align:left !important}</style>").appendTo("head"), a.fn.textStretch = function(i) {
        function j(a, b) {
            var c, d;
            return a.currentStyle && !a.currentStyle.hasLayout && (a.style.zoom = "1"), c = a.clientWidth, a.style.fontSize = "100px", a.className += " textStretch-calc", d = parseInt(c / (a.clientWidth / 100), 10), d = Math.min(Math.max(d, b.minFontSize), b.maxFontSize), a.style.fontSize = d + "px", a.clientWidth > c && (a.style.fontSize = d - 1 + "px"), a.className = a.className.substr(0, a.className.length - 17), c === a.clientWidth
        }

        function k(a, b, d) {
            for (c = 0, e = !1; c < a.length && !e; c += 1) e = !j(a[c], b[c] || b);
            e && !d && k(a, b, !0)
        }
        for (function(a) {
                for (c = 0; c < a.length; c += 1)
                    if (g[a[c]] = i && i[a[c]] ? i[a[c]] : b[a[c]], "number" != typeof g[a[c]]) throw 'textStretch error. Argument "' + a[c] + '" must be a number. Argument given was "' + g[a[c]] + '".'
            }(["minFontSize", "maxFontSize"]), g.maxFontSize = g.maxFontSize || Number.POSITIVE_INFINITY, k(this, g), c = 0; c < this.length; c += 1) d = a.inArray(this[c], h.elements), -1 === d ? (h.elements.push(this[c]), h.settings.push(g)) : h.settings[d] = g;
        return f || (a(window).on("orientationchange.textStretch resize.textStretch", function() {
            k(h.elements, h.settings)
        }), f = !0), this
    }, b.minFontSize = 0, b.maxFontSize = 0
}(jQuery, jQuery.textStretch = {});

$(".fitwidth").textStretch();

$(window).resize(function() {
    $(".pricing-panel").css("min-height", '');
    var ppheights = $(".pricing-panel").map(function() {
        return $(this).outerHeight();
    }).get();
    $(".pricing-panel").css("min-height", Math.max.apply(Math, ppheights));

    $(".pricing-panel-content:last-child").css("min-height", '');
    var pheights = $(".pricing-column").map(function() {
        return $(this).outerHeight();
    });
    var ptalletest = Math.max.apply(Math, pheights);
    $(".pricing-column").each(function() {
        var h = Math.abs($(this).outerHeight() - ptalletest);
        var child = $(this).children(".pricing-panel-content").children().last();
        child.css("min-height", child.outerHeight() + h);
    });

    $(".home").css("min-height", $(".inhome").outerHeight() + 60);
});

$(window).load(function() {
    $(window).resize();
});

jQuery.fn.extend({
    scrollTo: function(speed, easing) {
        return this.each(function() {
            var targetOffset = $(this).offset().top;
            $('html,body').animate({
                scrollTop: targetOffset
            }, speed, easing);
        });
    }
});
