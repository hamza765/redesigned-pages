/*! calc-polyfill 10-04-2015 */
!function(win,doc){"use strict";function contentLoaded(a,b){var c=!1,d=!0,e=a.document,f=e.documentElement,g=e.addEventListener,h=g?"addEventListener":"attachEvent",i=g?"removeEventListener":"detachEvent",j=g?"":"on",k=function(d){("readystatechange"!=d.type||"complete"==e.readyState)&&(("load"==d.type?a:e)[i](j+d.type,k,!1),!c&&(c=!0)&&b.call(a,d.type||d))},l=function(){try{f.doScroll("left")}catch(a){return void setTimeout(l,50)}k("poll")};if("complete"==e.readyState)b.call(a,"lazy");else{if(!g&&f.doScroll){try{d=!a.frameElement}catch(m){}d&&l()}e[h](j+"DOMContentLoaded",k,!1),e[h](j+"readystatechange",k,!1),a[h](j+"load",k,!1)}}if(!doc.querySelectorAll)return!1;var EMPTY="",CALC_RULE="^(\\s*?[\\s\\S]*):(\\s*?[\\s\\S]*?((\\-(webkit|moz)\\-)?calc\\(([\\s\\S]+)\\))[\\s\\S]*)?$",CSSRULES="((\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",KEYFRAMES=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi"),FONTFACE=new RegExp("((@font-face\\s*?){([\\s\\S]*?)})","gi"),COMMENTS=new RegExp("(\\/\\*[\\s\\S]*?\\*\\/)","gi"),IMPORTS=new RegExp("@import .*?;","gi"),CHARSET=new RegExp("@charset .*?;","gi"),PERCENT=/[\d\.]+%/,PT=/\d+pt/,PIXEL=/(\d+)px/g,REMEM=/[\d\.]+r?em/,REM=/[\d\.]+rem/,EM=/[\d\.]+em/,MATH_EXP=/[\+\-\/\*]?[\d\.]+(px|%|em|rem)?/g,PLACEHOLDER="$1",ONLYNUMBERS=/[\s\-0-9]/g,FONTSIZE="font-size",ADDMEDIA="@media",onTextResize=[],onWindowResize=[],utilities={camelize:function(a){return a.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()})},trim:function(a){var b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;return String.prototype.trim?a.trim():a.replace(b,"")},indexOf:function(a,b,c){var d=a.length>>>0;for(c=Number(c)||0,c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=d);d>c;c++)if(c in a&&a[c]===b)return c;return-1},getStyle:function(a,b){return a.currentStyle?a.currentStyle[utilities.camelize(b)]:doc.defaultView&&doc.defaultView.getComputedStyle?doc.defaultView.getComputedStyle(a,null).getPropertyValue(b):a.style[utilities.camelize(b)]},getFontsize:function(a){var b,c=doc.createElement("span");return c.innerHTML="&nbsp;",c.style.position="absolute",c.style.lineHeight="1em",c.style.fontSize="1em",a.appendChild(c),b=c.offsetHeight,a.removeChild(c),b},addEvent:function(a,b,c){doc.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},textResize:function(a){var b,c,d=function(){b=doc.createElement("span"),b.id="text-resize-control",b.innerHTML="&nbsp;",b.style.position="absolute",b.style.left="-9999px",b.style.lineHeight="1em",b.style.fontSize="1em",doc.body.insertBefore(b,doc.body.firstChild),c=b.offsetHeight},e=function(){var d=b.offsetHeight;return c===d?(win.requestAnimationFrame(e),!1):(c=d,a&&"function"==typeof a&&a(),void win.requestAnimationFrame(e))};d(),win.requestAnimationFrame(e)}},calcTest=function(){var a=document.createElement("div");return a.style.cssText="width: -moz-calc(10px); width: -webkit-calc(10px); width: calc(10px)",!!a.style.length},getStyleSheets=function(){for(var a,b=[],c=0,d=doc.styleSheets.length;d>c;c++)a=doc.styleSheets[c],a.href&&a.href!==EMPTY&&b.push(a.href);b.length>0&&loadStylesheets(b)},loadStylesheets=function(a){var b,c=0,d=a.length,e=[];if(win.XMLHttpRequest)b=new XMLHttpRequest;else try{b=new ActiveXObject("Microsoft.XMLHTTP")}catch(f){b=null}if(b)for(;d>c;c++)try{b.open("GET",a[c],!1),b.send(),200===b.status&&e.push(b.responseText)}catch(f){console.log("Error making request for file "+a[c]+": "+f.message)}e.length>0&&parseStylesheets(e)},parseStylesheets=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=a[b].replace(COMMENTS,EMPTY).replace(CHARSET,EMPTY).replace(IMPORTS,EMPTY).replace(KEYFRAMES,EMPTY).replace(FONTFACE,EMPTY),dotheCalc(parseCSS(a[b]))},removeStyles=function(a){for(var b=0,c=a.length;c>b;b++)a[b].removeAttribute("style")},parseCSS=function(a,b){var c,d,e,f,g,h,i,j,k,l=[];for(b=b||"",e=new RegExp(CSSRULES,"gi");;){if(f=e.exec(a),null===f)break;if(g=utilities.trim((f[2]||f[5]).split("\r\n").join("\n")),-1!==g.indexOf(ADDMEDIA))h=f[3]+"\n}",l=l.concat(parseCSS(h,g.replace(ADDMEDIA,"")));else for(h=f[6].split("\r\n").join("\n").split(";"),c=0,d=h.length;d>c;c++){i=new RegExp(CALC_RULE,"gi").exec(h[c]);try{j=doc.querySelectorAll(g)}catch(m){console.log('Error trying to select "'+g+'": '+m.message);break}null!==i&&j.length&&(k={elements:j,media:b,values:utilities.trim(i[2]),formula:i[6],prop:utilities.trim(i[1]),placholder:utilities.trim(i[3])},k.formula.match(PERCENT)&&(k.onresize=!0),k.formula.match(REMEM)&&(k.ontextresize=!0),l.push(k))}}return l},dotheCalc=function(calcRules){for(var index=0,len=calcRules.length,obj,calc=function(obj){for(var i=0,len=obj.elements.length,refValue,modifier,matches,l,j,result,formula;len>i;i++){for(formula=obj.formula.replace(PIXEL,PLACEHOLDER),matches=formula.match(MATH_EXP),l=matches.length,j=0;l>j;j++)modifier=null,matches[j].match(PERCENT)&&(refValue=obj.elements[i].parentNode.clientWidth,modifier=parseFloat(matches[j],10)/100),matches[j].match(EM)&&(refValue=obj.elements[i].currentStyle?utilities.getFontsize(obj.elements[i]):parseInt(utilities.getStyle(obj.elements[i],FONTSIZE).replace(/px/,EMPTY),10),refValue.match&&refValue.match(PT)&&(refValue=Math.round(1.333333333*parseInt(refValue.replace(/pt/,""),10))),modifier=parseFloat(matches[j],10)),matches[j].match(REM)&&(refValue=utilities.getStyle(doc.body,FONTSIZE).match(PERCENT)?16*parseInt(utilities.getStyle(doc.body,FONTSIZE).replace(/%/,EMPTY),10)/100:utilities.getStyle(doc.body,FONTSIZE).match(PT)?Math.round(1.333333333*parseInt(utilities.getStyle(doc.body,FONTSIZE).replace(/pt/,""),10)):parseInt(utilities.getStyle(doc.body,FONTSIZE).replace(/px/,EMPTY),10),modifier=parseFloat(matches[j],10)),modifier&&(formula=formula.replace(matches[j],refValue*modifier));try{formula.match(ONLYNUMBERS)&&(result=eval(formula),obj.elements[i].style[utilities.trim(utilities.camelize(obj.prop))]=obj.values.replace(obj.placholder,result+"px"))}catch(e){}}};len>index;index++)obj=calcRules[index],obj.onresize&&-1===utilities.indexOf(onWindowResize,obj)&&onWindowResize.push(obj),obj.ontextresize&&-1===utilities.indexOf(onTextResize,obj)&&onTextResize.push(obj),obj.media!==EMPTY?win.matchMedia&&win.matchMedia(obj.media).matches?calc(obj):removeStyles(obj.elements):calc(obj)};contentLoaded(win,function(){calcTest()||(getStyleSheets(),onTextResize.length>0&&utilities.textResize(function(){dotheCalc(onTextResize)}),onWindowResize.length>0&&utilities.addEvent(win,"resize",function(){dotheCalc(onWindowResize)}))}),function(){for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!win.requestAnimationFrame;++c)win.requestAnimationFrame=win[b[c]+"RequestAnimationFrame"],win.cancelAnimationFrame=win[b[c]+"CancelAnimationFrame"]||win[b[c]+"CancelRequestAnimationFrame"];win.requestAnimationFrame||(win.requestAnimationFrame=function(b){var c=(new Date).getTime(),d=Math.max(0,16-(c-a)),e=win.setTimeout(function(){b(c+d)},d);return a=c+d,e}),win.cancelAnimationFrame||(win.cancelAnimationFrame=function(a){clearTimeout(a)})}()}(window,document);

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

    // $(".home").css("min-height", $(".inhome").outerHeight() + 60);
    // var winheight = "innerHeight" in window 
    //            ? window.innerHeight
    //            : document.documentElement.offsetHeight; 
    // $(".home").css("height", winheight - 108 - $("#whatisssl").outerHeight());
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
