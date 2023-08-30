!function() {
    "use strict";
    var t, a, e;
    window.sessionStorage.getItem("defaultAttribute") && (t = document.documentElement.attributes,
    a = {},
    Object.entries(t).forEach(function(t) {
        var e;
        t[1] && t[1].nodeName && "undefined" != t[1].nodeName && (e = t[1].nodeName,
        a[e] = t[1].nodeValue)
    }),
    window.sessionStorage.getItem("defaultAttribute") !== JSON.stringify(a) ? (window.sessionStorage.clear(),
    window.location.reload()) : ((e = {})["data-layout"] = window.sessionStorage.getItem("data-layout"),
    e["data-sidebar-size"] = window.sessionStorage.getItem("data-sidebar-size"),
    e["data-layout-mode"] = window.sessionStorage.getItem("data-layout-mode"),
    e["data-layout-width"] = window.sessionStorage.getItem("data-layout-width"),
    e["data-sidebar"] = window.sessionStorage.getItem("data-sidebar"),
    e["data-sidebar-image"] = window.sessionStorage.getItem("data-sidebar-image"),
    e["data-layout-direction"] = window.sessionStorage.getItem("data-layout-direction"),
    e["data-layout-position"] = window.sessionStorage.getItem("data-layout-position"),
    e["data-layout-style"] = window.sessionStorage.getItem("data-layout-style"),
    e["data-topbar"] = window.sessionStorage.getItem("data-topbar"),
    e["data-preloader"] = window.sessionStorage.getItem("data-preloader"),
    e["data-body-image"] = window.sessionStorage.getItem("data-body-image"),
    Object.keys(e).forEach(function(t) {
        e[t] && document.documentElement.setAttribute(t, e[t])
    })))
}();
