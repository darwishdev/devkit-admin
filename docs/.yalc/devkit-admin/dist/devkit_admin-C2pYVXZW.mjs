var Ya = Object.defineProperty;
var za = (t, e, n) => e in t ? Ya(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var hr = (t, e, n) => za(t, typeof e != "symbol" ? e + "" : e, n);
import { ref as Dt, readonly as Ha, getCurrentInstance as qa, onMounted as Ua, nextTick as Wa, watch as Za, mergeProps as j, openBlock as Y, createElementBlock as J, createElementVNode as we, renderSlot as ve, createTextVNode as Wn, toDisplayString as xe, resolveComponent as Zn, resolveDirective as Oo, withDirectives as $n, createBlock as Te, resolveDynamicComponent as Ue, withCtx as Fe, createCommentVNode as me, normalizeClass as En, Teleport as Ga, normalizeStyle as Qa, Fragment as dn, createVNode as qe, Transition as Ri, renderList as it, vShow as vo, withKeys as Pe, defineComponent as Yi, inject as Xa, computed as Ja, withAsyncContext as es, h as pi, onErrorCaptured as ns, Suspense as ts, unref as rs } from "vue";
import { resolveApiEndpoint as os } from "devkit-apiclient";
import { Skeleton as is } from "primevue";
import { useFormKitContext as as } from "@formkit/vue";
import { useQuery as ss } from "@tanstack/vue-query";
const cc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function us(t, e) {
  return t ? t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className) : !1;
}
function ls(t, e) {
  if (t && e) {
    const n = (i) => {
      us(t, i) || (t.classList ? t.classList.add(i) : t.className += " " + i);
    };
    [e].flat().filter(Boolean).forEach((i) => i.split(" ").forEach(n));
  }
}
function yr(t) {
  for (const e of document == null ? void 0 : document.styleSheets)
    try {
      for (const n of e == null ? void 0 : e.cssRules)
        for (const i of n == null ? void 0 : n.style)
          if (t.test(i))
            return { name: i, value: n.style.getPropertyValue(i).trim() };
    } catch {
    }
  return null;
}
function cs(t) {
  {
    let e = document.createElement("a");
    if (e.download !== void 0) {
      const { name: n, src: i } = t;
      return e.setAttribute("href", i), e.setAttribute("download", n), e.style.display = "none", document.body.appendChild(e), e.click(), document.body.removeChild(e), !0;
    }
  }
  return !1;
}
function dc(t, e) {
  let n = new Blob([t], {
    type: "application/csv;charset=utf-8;"
  });
  window.navigator.msSaveOrOpenBlob ? navigator.msSaveOrOpenBlob(n, e + ".csv") : cs({ name: e + ".csv", src: URL.createObjectURL(n) }) || (t = "data:text/csv;charset=utf-8," + t, window.open(encodeURI(t)));
}
function fo(t, e) {
  if (t && e) {
    const n = (i) => {
      t.classList ? t.classList.remove(i) : t.className = t.className.replace(new RegExp("(^|\\b)" + i.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };
    [e].flat().filter(Boolean).forEach((i) => i.split(" ").forEach(n));
  }
}
function zi(t) {
  let e = { width: 0, height: 0 };
  return t && (t.style.visibility = "hidden", t.style.display = "block", e.width = t.offsetWidth, e.height = t.offsetHeight, t.style.display = "none", t.style.visibility = "visible"), e;
}
function Hi() {
  let t = window, e = document, n = e.documentElement, i = e.getElementsByTagName("body")[0], s = t.innerWidth || n.clientWidth || i.clientWidth, u = t.innerHeight || n.clientHeight || i.clientHeight;
  return { width: s, height: u };
}
function ds() {
  let t = document.documentElement;
  return (window.pageXOffset || t.scrollLeft) - (t.clientLeft || 0);
}
function fs() {
  let t = document.documentElement;
  return (window.pageYOffset || t.scrollTop) - (t.clientTop || 0);
}
function ps(t, e, n = !0) {
  var i, s, u, f;
  if (t) {
    const h = t.offsetParent ? { width: t.offsetWidth, height: t.offsetHeight } : zi(t), b = h.height, v = h.width, p = e.offsetHeight, O = e.offsetWidth, $ = e.getBoundingClientRect(), I = fs(), A = ds(), q = Hi();
    let G, ne, ee = "top";
    $.top + p + b > q.height ? (G = $.top + I - b, ee = "bottom", G < 0 && (G = I)) : G = p + $.top + I, $.left + v > q.width ? ne = Math.max(0, $.left + A + O - v) : ne = $.left + A, t.style.top = G + "px", t.style.left = ne + "px", t.style.transformOrigin = ee, n && (t.style.marginTop = ee === "bottom" ? `calc(${(s = (i = yr(/-anchor-gutter$/)) == null ? void 0 : i.value) != null ? s : "2px"} * -1)` : (f = (u = yr(/-anchor-gutter$/)) == null ? void 0 : u.value) != null ? f : "");
  }
}
function hs(t, e) {
  t && (typeof e == "string" ? t.style.cssText = e : Object.entries(e || {}).forEach(([n, i]) => t.style[n] = i));
}
function br(t, e) {
  return t instanceof HTMLElement ? t.offsetWidth : 0;
}
function ms(t, e, n = !0) {
  var i, s, u, f;
  if (t) {
    const h = t.offsetParent ? { width: t.offsetWidth, height: t.offsetHeight } : zi(t), b = e.offsetHeight, v = e.getBoundingClientRect(), p = Hi();
    let O, $, I = "top";
    v.top + b + h.height > p.height ? (O = -1 * h.height, I = "bottom", v.top + O < 0 && (O = -1 * v.top)) : O = b, h.width > p.width ? $ = v.left * -1 : v.left + h.width > p.width ? $ = (v.left + h.width - p.width) * -1 : $ = 0, t.style.top = O + "px", t.style.left = $ + "px", t.style.transformOrigin = I, n && (t.style.marginTop = I === "bottom" ? `calc(${(s = (i = yr(/-anchor-gutter$/)) == null ? void 0 : i.value) != null ? s : "2px"} * -1)` : (f = (u = yr(/-anchor-gutter$/)) == null ? void 0 : u.value) != null ? f : "");
  }
}
function st(t) {
  return typeof HTMLElement == "object" ? t instanceof HTMLElement : t && typeof t == "object" && t !== null && t.nodeType === 1 && typeof t.nodeName == "string";
}
function fc() {
  if (window.getSelection) {
    const t = window.getSelection() || {};
    t.empty ? t.empty() : t.removeAllRanges && t.rangeCount > 0 && t.getRangeAt(0).getClientRects().length > 0 && t.removeAllRanges();
  }
}
function vr(t, e = {}) {
  if (st(t)) {
    const n = (i, s) => {
      var u, f;
      const h = (u = t == null ? void 0 : t.$attrs) != null && u[i] ? [(f = t == null ? void 0 : t.$attrs) == null ? void 0 : f[i]] : [];
      return [s].flat().reduce((b, v) => {
        if (v != null) {
          const p = typeof v;
          if (p === "string" || p === "number")
            b.push(v);
          else if (p === "object") {
            const O = Array.isArray(v) ? n(i, v) : Object.entries(v).map(([$, I]) => i === "style" && (I || I === 0) ? `${$.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${I}` : I ? $ : void 0);
            b = O.length ? b.concat(O.filter(($) => !!$)) : b;
          }
        }
        return b;
      }, h);
    };
    Object.entries(e).forEach(([i, s]) => {
      if (s != null) {
        const u = i.match(/^on(.+)/);
        u ? t.addEventListener(u[1].toLowerCase(), s) : i === "p-bind" || i === "pBind" ? vr(t, s) : (s = i === "class" ? [...new Set(n("class", s))].join(" ").trim() : i === "style" ? n("style", s).join(";").trim() : s, (t.$attrs = t.$attrs || {}) && (t.$attrs[i] = s), t.setAttribute(i, s));
      }
    });
  }
}
function bs(t, e = {}, ...n) {
  {
    const i = document.createElement(t);
    return vr(i, e), i.append(...n), i;
  }
}
function On(t, e) {
  return st(t) ? Array.from(t.querySelectorAll(e)) : [];
}
function on(t, e) {
  return st(t) ? t.matches(e) ? t : t.querySelector(e) : null;
}
function pc(t, e) {
  t && document.activeElement !== t && t.focus(e);
}
function Un(t, e) {
  if (st(t)) {
    const n = t.getAttribute(e);
    return isNaN(n) ? n === "true" || n === "false" ? n === "true" : n : +n;
  }
}
function wr(t, e = "") {
  let n = On(
    t,
    `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`
  ), i = [];
  for (let s of n)
    getComputedStyle(s).display != "none" && getComputedStyle(s).visibility != "hidden" && i.push(s);
  return i;
}
function hc(t, e) {
  const n = wr(t, e);
  return n.length > 0 ? n[0] : null;
}
function hi(t) {
  if (t) {
    let e = t.offsetHeight, n = getComputedStyle(t);
    return e -= parseFloat(n.paddingTop) + parseFloat(n.paddingBottom) + parseFloat(n.borderTopWidth) + parseFloat(n.borderBottomWidth), e;
  }
  return 0;
}
function mc(t) {
  if (t) {
    t.style.visibility = "hidden", t.style.display = "block";
    let e = t.offsetHeight;
    return t.style.display = "none", t.style.visibility = "visible", e;
  }
  return 0;
}
function bc(t) {
  if (t) {
    t.style.visibility = "hidden", t.style.display = "block";
    let e = t.offsetWidth;
    return t.style.display = "none", t.style.visibility = "visible", e;
  }
  return 0;
}
function $o(t) {
  if (t) {
    let e = t.parentNode;
    return e && e instanceof ShadowRoot && e.host && (e = e.host), e;
  }
  return null;
}
function St(t) {
  var e;
  if (t) {
    let n = (e = $o(t)) == null ? void 0 : e.childNodes, i = 0;
    if (n)
      for (let s = 0; s < n.length; s++) {
        if (n[s] === t) return i;
        n[s].nodeType === 1 && i++;
      }
  }
  return -1;
}
function gc(t, e) {
  const n = wr(t, e);
  return n.length > 0 ? n[n.length - 1] : null;
}
function yc(t, e) {
  let n = t.nextElementSibling;
  for (; n; ) {
    if (n.matches(e))
      return n;
    n = n.nextElementSibling;
  }
  return null;
}
function gs(t) {
  if (t) {
    let e = t.getBoundingClientRect();
    return {
      top: e.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
      left: e.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
    };
  }
  return {
    top: "auto",
    left: "auto"
  };
}
function ys(t, e) {
  return t ? t.offsetHeight : 0;
}
function qi(t, e = []) {
  const n = $o(t);
  return n === null ? e : qi(n, e.concat([n]));
}
function vc(t, e) {
  let n = t.previousElementSibling;
  for (; n; ) {
    if (n.matches(e))
      return n;
    n = n.previousElementSibling;
  }
  return null;
}
function vs(t) {
  let e = [];
  if (t) {
    let n = qi(t);
    const i = /(auto|scroll)/, s = (u) => {
      try {
        let f = window.getComputedStyle(u, null);
        return i.test(f.getPropertyValue("overflow")) || i.test(f.getPropertyValue("overflowX")) || i.test(f.getPropertyValue("overflowY"));
      } catch {
        return !1;
      }
    };
    for (let u of n) {
      let f = u.nodeType === 1 && u.dataset.scrollselectors;
      if (f) {
        let h = f.split(",");
        for (let b of h) {
          let v = on(u, b);
          v && s(v) && e.push(v);
        }
      }
      u.nodeType !== 9 && s(u) && e.push(u);
    }
  }
  return e;
}
function wc() {
  if (window.getSelection) return window.getSelection().toString();
  if (document.getSelection) return document.getSelection().toString();
}
function ws(t) {
  return !!(t !== null && typeof t < "u" && t.nodeName && $o(t));
}
function mi(t) {
  if (t) {
    let e = t.offsetWidth, n = getComputedStyle(t);
    return e -= parseFloat(n.paddingLeft) + parseFloat(n.paddingRight) + parseFloat(n.borderLeftWidth) + parseFloat(n.borderRightWidth), e;
  }
  return 0;
}
function kc(t, e, n) {
  t[e].apply(t, n);
}
function Sc() {
  return /(android)/i.test(navigator.userAgent);
}
function Cc(t) {
  if (t) {
    const e = t.nodeName, n = t.parentElement && t.parentElement.nodeName;
    return e === "INPUT" || e === "TEXTAREA" || e === "BUTTON" || e === "A" || n === "INPUT" || n === "TEXTAREA" || n === "BUTTON" || n === "A" || !!t.closest(".p-button, .p-checkbox, .p-radiobutton");
  }
  return !1;
}
function Eo() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function xc(t, e = "") {
  return st(t) ? t.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`) : !1;
}
function Dc(t) {
  return !!(t && t.offsetParent != null);
}
function _c(t) {
  return t ? getComputedStyle(t).direction === "rtl" : !1;
}
function ks() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
function Ui(t, e = "", n) {
  st(t) && n !== null && n !== void 0 && t.setAttribute(e, n);
}
function un(t) {
  return t == null || t === "" || Array.isArray(t) && t.length === 0 || !(t instanceof Date) && typeof t == "object" && Object.keys(t).length === 0;
}
function Ss(t, e, n, i = 1) {
  let s = -1;
  const u = un(t), f = un(e);
  return u && f ? s = 0 : u ? s = i : f ? s = -i : typeof t == "string" && typeof e == "string" ? s = n(t, e) : s = t < e ? -1 : t > e ? 1 : 0, s;
}
function wo(t, e, n = /* @__PURE__ */ new WeakSet()) {
  if (t === e) return !0;
  if (!t || !e || typeof t != "object" || typeof e != "object" || n.has(t) || n.has(e)) return !1;
  n.add(t).add(e);
  let i = Array.isArray(t), s = Array.isArray(e), u, f, h;
  if (i && s) {
    if (f = t.length, f != e.length) return !1;
    for (u = f; u-- !== 0; ) if (!wo(t[u], e[u], n)) return !1;
    return !0;
  }
  if (i != s) return !1;
  let b = t instanceof Date, v = e instanceof Date;
  if (b != v) return !1;
  if (b && v) return t.getTime() == e.getTime();
  let p = t instanceof RegExp, O = e instanceof RegExp;
  if (p != O) return !1;
  if (p && O) return t.toString() == e.toString();
  let $ = Object.keys(t);
  if (f = $.length, f !== Object.keys(e).length) return !1;
  for (u = f; u-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(e, $[u])) return !1;
  for (u = f; u-- !== 0; )
    if (h = $[u], !wo(t[h], e[h], n)) return !1;
  return !0;
}
function Cs(t, e) {
  return wo(t, e);
}
function Sr(t) {
  return !!(t && t.constructor && t.call && t.apply);
}
function be(t) {
  return !un(t);
}
function bi(t, e) {
  if (!t || !e)
    return null;
  try {
    const n = t[e];
    if (be(n)) return n;
  } catch {
  }
  if (Object.keys(t).length) {
    if (Sr(e))
      return e(t);
    if (e.indexOf(".") === -1)
      return t[e];
    {
      let n = e.split("."), i = t;
      for (let s = 0, u = n.length; s < u; ++s) {
        if (i == null)
          return null;
        i = i[n[s]];
      }
      return i;
    }
  }
  return null;
}
function xs(t, e, n) {
  return n ? bi(t, n) === bi(e, n) : Cs(t, e);
}
function Pc(t, e) {
  if (t != null && e && e.length) {
    for (let n of e)
      if (xs(t, n)) return !0;
  }
  return !1;
}
function Tc(t, e) {
  let n = -1;
  if (e) {
    for (let i = 0; i < e.length; i++)
      if (e[i] === t) {
        n = i;
        break;
      }
  }
  return n;
}
function Oc(t, e) {
  let n = -1;
  if (be(t))
    try {
      n = t.findLastIndex(e);
    } catch {
      n = t.lastIndexOf([...t].reverse().find(e));
    }
  return n;
}
function In(t, e = !0) {
  return t instanceof Object && t.constructor === Object && (e || Object.keys(t).length !== 0);
}
function nn(t, ...e) {
  return Sr(t) ? t(...e) : t;
}
function Ze(t, e = !0) {
  return typeof t == "string" && (e || t !== "");
}
function an(t) {
  return Ze(t) ? t.replace(/(-|_)/g, "").toLowerCase() : t;
}
function Mo(t, e = "", n = {}) {
  const i = an(e).split("."), s = i.shift();
  return s ? In(t) ? Mo(nn(t[Object.keys(t).find((u) => an(u) === s) || ""], n), i.join("."), n) : void 0 : nn(t, n);
}
function Cr(t, e = !0) {
  return Array.isArray(t) && (e || t.length !== 0);
}
function Ds(t) {
  return be(t) && !isNaN(t);
}
function $c(t = "") {
  return be(t) && t.length === 1 && !!t.match(/\S| /);
}
function _s() {
  return new Intl.Collator(void 0, { numeric: !0 }).compare;
}
function kn(t, e) {
  if (e) {
    const n = e.test(t);
    return e.lastIndex = 0, n;
  }
  return !1;
}
function _t(t) {
  return t && t.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "").replace(/ {2,}/g, " ").replace(/ ([{:}]) /g, "$1").replace(/([;,]) /g, "$1").replace(/ !/g, "!").replace(/: /g, ":");
}
function Ec(t) {
  if (t && /[\xC0-\xFF\u0100-\u017E]/.test(t)) {
    const n = {
      A: /[\xC0-\xC5\u0100\u0102\u0104]/g,
      AE: /[\xC6]/g,
      C: /[\xC7\u0106\u0108\u010A\u010C]/g,
      D: /[\xD0\u010E\u0110]/g,
      E: /[\xC8-\xCB\u0112\u0114\u0116\u0118\u011A]/g,
      G: /[\u011C\u011E\u0120\u0122]/g,
      H: /[\u0124\u0126]/g,
      I: /[\xCC-\xCF\u0128\u012A\u012C\u012E\u0130]/g,
      IJ: /[\u0132]/g,
      J: /[\u0134]/g,
      K: /[\u0136]/g,
      L: /[\u0139\u013B\u013D\u013F\u0141]/g,
      N: /[\xD1\u0143\u0145\u0147\u014A]/g,
      O: /[\xD2-\xD6\xD8\u014C\u014E\u0150]/g,
      OE: /[\u0152]/g,
      R: /[\u0154\u0156\u0158]/g,
      S: /[\u015A\u015C\u015E\u0160]/g,
      T: /[\u0162\u0164\u0166]/g,
      U: /[\xD9-\xDC\u0168\u016A\u016C\u016E\u0170\u0172]/g,
      W: /[\u0174]/g,
      Y: /[\xDD\u0176\u0178]/g,
      Z: /[\u0179\u017B\u017D]/g,
      a: /[\xE0-\xE5\u0101\u0103\u0105]/g,
      ae: /[\xE6]/g,
      c: /[\xE7\u0107\u0109\u010B\u010D]/g,
      d: /[\u010F\u0111]/g,
      e: /[\xE8-\xEB\u0113\u0115\u0117\u0119\u011B]/g,
      g: /[\u011D\u011F\u0121\u0123]/g,
      i: /[\xEC-\xEF\u0129\u012B\u012D\u012F\u0131]/g,
      ij: /[\u0133]/g,
      j: /[\u0135]/g,
      k: /[\u0137,\u0138]/g,
      l: /[\u013A\u013C\u013E\u0140\u0142]/g,
      n: /[\xF1\u0144\u0146\u0148\u014B]/g,
      p: /[\xFE]/g,
      o: /[\xF2-\xF6\xF8\u014D\u014F\u0151]/g,
      oe: /[\u0153]/g,
      r: /[\u0155\u0157\u0159]/g,
      s: /[\u015B\u015D\u015F\u0161]/g,
      t: /[\u0163\u0165\u0167]/g,
      u: /[\xF9-\xFC\u0169\u016B\u016D\u016F\u0171\u0173]/g,
      w: /[\u0175]/g,
      y: /[\xFD\xFF\u0177]/g,
      z: /[\u017A\u017C\u017E]/g
    };
    for (let i in n)
      t = t.replace(n[i], i);
  }
  return t;
}
function Mc(t, e, n) {
  t && e !== n && (n >= t.length && (n %= t.length, e %= t.length), t.splice(n, 0, t.splice(e, 1)[0]));
}
function Ic(t, e, n = 1, i, s = 1) {
  const u = Ss(t, e, i, n);
  let f = n;
  return (un(t) || un(e)) && (f = s === 1 ? n : s), f * u;
}
function Ps(t) {
  return Ze(t, !1) ? t[0].toUpperCase() + t.slice(1) : t;
}
function Wi(t) {
  return Ze(t) ? t.replace(/(_)/g, "-").replace(/[A-Z]/g, (e, n) => n === 0 ? e : "-" + e.toLowerCase()).toLowerCase() : t;
}
function gi(t) {
  return Ze(t) ? t.replace(/[A-Z]/g, (e, n) => n === 0 ? e : "." + e.toLowerCase()).toLowerCase() : t;
}
function Ts() {
  let t = [];
  const e = (f, h, b = 999) => {
    const v = s(f, h, b), p = v.value + (v.key === f ? 0 : b) + 1;
    return t.push({ key: f, value: p }), p;
  }, n = (f) => {
    t = t.filter((h) => h.value !== f);
  }, i = (f, h) => s(f).value, s = (f, h, b = 0) => [...t].reverse().find((v) => !0) || { key: f, value: b }, u = (f) => f && parseInt(f.style.zIndex, 10) || 0;
  return {
    get: u,
    set: (f, h, b) => {
      h && (h.style.zIndex = String(e(f, !0, b)));
    },
    clear: (f) => {
      f && (n(u(f)), f.style.zIndex = "");
    },
    getCurrent: (f) => i(f)
  };
}
var po = Ts();
function Io() {
  const t = /* @__PURE__ */ new Map();
  return {
    on(e, n) {
      let i = t.get(e);
      return i ? i.push(n) : i = [n], t.set(e, i), this;
    },
    off(e, n) {
      let i = t.get(e);
      return i && i.splice(i.indexOf(n) >>> 0, 1), this;
    },
    emit(e, n) {
      let i = t.get(e);
      i && i.slice().map((s) => {
        s(n);
      });
    },
    clear() {
      t.clear();
    }
  };
}
var mr = {};
function Ao(t = "pui_id_") {
  return mr.hasOwnProperty(t) || (mr[t] = 0), mr[t]++, `${t}${mr[t]}`;
}
function Tt(t) {
  "@babel/helpers - typeof";
  return Tt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Tt(t);
}
function Os(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function $s(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, Ms(i.key), i);
  }
}
function Es(t, e, n) {
  return $s(t.prototype, e), Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
function Ms(t) {
  var e = Is(t, "string");
  return Tt(e) == "symbol" ? e : e + "";
}
function Is(t, e) {
  if (Tt(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (Tt(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var As = /* @__PURE__ */ function() {
  function t(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    Os(this, t), this.element = e, this.listener = n;
  }
  return Es(t, [{
    key: "bindScrollListener",
    value: function() {
      this.scrollableParents = vs(this.element);
      for (var n = 0; n < this.scrollableParents.length; n++)
        this.scrollableParents[n].addEventListener("scroll", this.listener);
    }
  }, {
    key: "unbindScrollListener",
    value: function() {
      if (this.scrollableParents)
        for (var n = 0; n < this.scrollableParents.length; n++)
          this.scrollableParents[n].removeEventListener("scroll", this.listener);
    }
  }, {
    key: "destroy",
    value: function() {
      this.unbindScrollListener(), this.element = null, this.listener = null, this.scrollableParents = null;
    }
  }]);
}();
function Ot(t) {
  "@babel/helpers - typeof";
  return Ot = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Ot(t);
}
function Bs(t) {
  return Ks(t) || Ls(t) || Vs(t) || js();
}
function js() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Vs(t, e) {
  if (t) {
    if (typeof t == "string") return ko(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ko(t, e) : void 0;
  }
}
function Ls(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function Ks(t) {
  if (Array.isArray(t)) return ko(t);
}
function ko(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function Ns(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function Fs(t, e) {
  for (var n = 0; n < e.length; n++) {
    var i = e[n];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, Zi(i.key), i);
  }
}
function Rs(t, e, n) {
  return Fs(t.prototype, e), Object.defineProperty(t, "prototype", { writable: !1 }), t;
}
function yi(t, e, n) {
  return (e = Zi(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Zi(t) {
  var e = Ys(t, "string");
  return Ot(e) == "symbol" ? e : e + "";
}
function Ys(t, e) {
  if (Ot(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e);
    if (Ot(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Ac = /* @__PURE__ */ function() {
  function t(e) {
    var n = e.init, i = e.type;
    Ns(this, t), yi(this, "helpers", void 0), yi(this, "type", void 0), this.helpers = new Set(n), this.type = i;
  }
  return Rs(t, [{
    key: "add",
    value: function(n) {
      this.helpers.add(n);
    }
  }, {
    key: "update",
    value: function() {
    }
  }, {
    key: "delete",
    value: function(n) {
      this.helpers.delete(n);
    }
  }, {
    key: "clear",
    value: function() {
      this.helpers.clear();
    }
  }, {
    key: "get",
    value: function(n, i) {
      var s = this._get(n, i), u = s ? this._recursive(Bs(this.helpers), s) : null;
      return be(u) ? u : null;
    }
  }, {
    key: "_isMatched",
    value: function(n, i) {
      var s, u = n == null ? void 0 : n.parent;
      return (u == null || (s = u.vnode) === null || s === void 0 ? void 0 : s.key) === i || u && this._isMatched(u, i) || !1;
    }
  }, {
    key: "_get",
    value: function(n, i) {
      var s, u;
      return ((s = i || (n == null ? void 0 : n.$slots)) === null || s === void 0 || (u = s.default) === null || u === void 0 ? void 0 : u.call(s)) || null;
    }
  }, {
    key: "_recursive",
    value: function() {
      var n = this, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], u = [];
      return s.forEach(function(f) {
        f.children instanceof Array ? u = u.concat(n._recursive(u, f.children)) : f.type.name === n.type ? u.push(f) : be(f.key) && (u = u.concat(i.filter(function(h) {
          return n._isMatched(h, f.key);
        }).map(function(h) {
          return h.vnode;
        })));
      }), u;
    }
  }]);
}();
function vi() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  return Ao(t);
}
function Bc(t, e) {
  if (t) {
    var n = t.props;
    if (n) {
      var i = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), s = Object.prototype.hasOwnProperty.call(n, i) ? i : e;
      return t.type.extends.props[e].type === Boolean && n[s] === "" ? !0 : n[s];
    }
  }
  return null;
}
var zs = Object.defineProperty, Hs = Object.defineProperties, qs = Object.getOwnPropertyDescriptors, kr = Object.getOwnPropertySymbols, Gi = Object.prototype.hasOwnProperty, Qi = Object.prototype.propertyIsEnumerable, wi = (t, e, n) => e in t ? zs(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, sn = (t, e) => {
  for (var n in e || (e = {}))
    Gi.call(e, n) && wi(t, n, e[n]);
  if (kr)
    for (var n of kr(e))
      Qi.call(e, n) && wi(t, n, e[n]);
  return t;
}, ho = (t, e) => Hs(t, qs(e)), vn = (t, e) => {
  var n = {};
  for (var i in t)
    Gi.call(t, i) && e.indexOf(i) < 0 && (n[i] = t[i]);
  if (t != null && kr)
    for (var i of kr(t))
      e.indexOf(i) < 0 && Qi.call(t, i) && (n[i] = t[i]);
  return n;
}, Us = Io(), wn = Us;
function ki(t, e) {
  Cr(t) ? t.push(...e || []) : In(t) && Object.assign(t, e);
}
function Ws(t) {
  return In(t) && t.hasOwnProperty("value") && t.hasOwnProperty("type") ? t.value : t;
}
function Zs(t) {
  return t.replaceAll(/ /g, "").replace(/[^\w]/g, "-");
}
function So(t = "", e = "") {
  return Zs(`${Ze(t, !1) && Ze(e, !1) ? `${t}-` : t}${e}`);
}
function Xi(t = "", e = "") {
  return `--${So(t, e)}`;
}
function Gs(t = "") {
  const e = (t.match(/{/g) || []).length, n = (t.match(/}/g) || []).length;
  return (e + n) % 2 !== 0;
}
function Ji(t, e = "", n = "", i = [], s) {
  if (Ze(t)) {
    const u = /{([^}]*)}/g, f = t.trim();
    if (Gs(f))
      return;
    if (kn(f, u)) {
      const h = f.replaceAll(u, (p) => {
        const $ = p.replace(/{|}/g, "").split(".").filter((I) => !i.some((A) => kn(I, A)));
        return `var(${Xi(n, Wi($.join("-")))}${be(s) ? `, ${s}` : ""})`;
      }), b = /(\d+\s+[\+\-\*\/]\s+\d+)/g, v = /var\([^)]+\)/g;
      return kn(h.replace(v, "0"), b) ? `calc(${h})` : h;
    }
    return f;
  } else if (Ds(t))
    return t;
}
function Qs(t, e, n) {
  Ze(e, !1) && t.push(`${e}:${n};`);
}
function at(t, e) {
  return t ? `${t}{${e}}` : "";
}
var Pt = (...t) => Xs(De.getTheme(), ...t), Xs = (t = {}, e, n, i) => {
  if (e) {
    const { variable: s, options: u } = De.defaults || {}, { prefix: f, transform: h } = (t == null ? void 0 : t.options) || u || {}, v = kn(e, /{([^}]*)}/g) ? e : `{${e}}`;
    return i === "value" || un(i) && h === "strict" ? De.getTokenValue(e) : Ji(v, void 0, f, [s.excludedKeyRegex], n);
  }
  return "";
};
function Js(t, e = {}) {
  const n = De.defaults.variable, { prefix: i = n.prefix, selector: s = n.selector, excludedKeyRegex: u = n.excludedKeyRegex } = e, f = (v, p = "") => Object.entries(v).reduce(
    (O, [$, I]) => {
      const A = kn($, u) ? So(p) : So(p, Wi($)), q = Ws(I);
      if (In(q)) {
        const { variables: G, tokens: ne } = f(q, A);
        ki(O.tokens, ne), ki(O.variables, G);
      } else
        O.tokens.push((i ? A.replace(`${i}-`, "") : A).replaceAll("-", ".")), Qs(O.variables, Xi(A), Ji(q, A, i, [u]));
      return O;
    },
    { variables: [], tokens: [] }
  ), { variables: h, tokens: b } = f(t, i);
  return {
    value: h,
    tokens: b,
    declarations: h.join(""),
    css: at(s, h.join(""))
  };
}
var rn = {
  regex: {
    rules: {
      class: {
        pattern: /^\.([a-zA-Z][\w-]*)$/,
        resolve(t) {
          return { type: "class", selector: t, matched: this.pattern.test(t.trim()) };
        }
      },
      attr: {
        pattern: /^\[(.*)\]$/,
        resolve(t) {
          return { type: "attr", selector: `:root${t}`, matched: this.pattern.test(t.trim()) };
        }
      },
      media: {
        pattern: /^@media (.*)$/,
        resolve(t) {
          return { type: "media", selector: `${t}{:root{[CSS]}}`, matched: this.pattern.test(t.trim()) };
        }
      },
      system: {
        pattern: /^system$/,
        resolve(t) {
          return { type: "system", selector: "@media (prefers-color-scheme: dark){:root{[CSS]}}", matched: this.pattern.test(t.trim()) };
        }
      },
      custom: {
        resolve(t) {
          return { type: "custom", selector: t, matched: !0 };
        }
      }
    },
    resolve(t) {
      const e = Object.keys(this.rules).filter((n) => n !== "custom").map((n) => this.rules[n]);
      return [t].flat().map((n) => {
        var i;
        return (i = e.map((s) => s.resolve(n)).find((s) => s.matched)) != null ? i : this.rules.custom.resolve(n);
      });
    }
  },
  _toVariables(t, e) {
    return Js(t, { prefix: e == null ? void 0 : e.prefix });
  },
  getCommon({ name: t = "", theme: e = {}, params: n, set: i, defaults: s }) {
    var u, f, h, b, v, p, O;
    const { preset: $, options: I } = e;
    let A, q, G, ne, ee, V, U;
    if (be($) && I.transform !== "strict") {
      const { primitive: ge, semantic: ce, extend: de } = $, Se = ce || {}, { colorScheme: je } = Se, $e = vn(Se, ["colorScheme"]), Ae = de || {}, { colorScheme: Be } = Ae, Z = vn(Ae, ["colorScheme"]), oe = je || {}, { dark: pe } = oe, ke = vn(oe, ["dark"]), Ne = Be || {}, { dark: Oe } = Ne, Ge = vn(Ne, ["dark"]), Ve = be(ge) ? this._toVariables({ primitive: ge }, I) : {}, We = be($e) ? this._toVariables({ semantic: $e }, I) : {}, pn = be(ke) ? this._toVariables({ light: ke }, I) : {}, tn = be(pe) ? this._toVariables({ dark: pe }, I) : {}, hn = be(Z) ? this._toVariables({ semantic: Z }, I) : {}, An = be(Ge) ? this._toVariables({ light: Ge }, I) : {}, mn = be(Oe) ? this._toVariables({ dark: Oe }, I) : {}, [ut, xr] = [(u = Ve.declarations) != null ? u : "", Ve.tokens], [X, Kt] = [(f = We.declarations) != null ? f : "", We.tokens || []], [Qn, ye] = [(h = pn.declarations) != null ? h : "", pn.tokens || []], [Bn, Dr] = [(b = tn.declarations) != null ? b : "", tn.tokens || []], [bn, _r] = [(v = hn.declarations) != null ? v : "", hn.tokens || []], [Pr, Tr] = [(p = An.declarations) != null ? p : "", An.tokens || []], [Or, lt] = [(O = mn.declarations) != null ? O : "", mn.tokens || []];
      A = this.transformCSS(t, ut, "light", "variable", I, i, s), q = xr;
      const Je = this.transformCSS(t, `${X}${Qn}`, "light", "variable", I, i, s), Nt = this.transformCSS(t, `${Bn}`, "dark", "variable", I, i, s);
      G = `${Je}${Nt}`, ne = [.../* @__PURE__ */ new Set([...Kt, ...ye, ...Dr])];
      const jn = this.transformCSS(t, `${bn}${Pr}color-scheme:light`, "light", "variable", I, i, s), Ft = this.transformCSS(t, `${Or}color-scheme:dark`, "dark", "variable", I, i, s);
      ee = `${jn}${Ft}`, V = [.../* @__PURE__ */ new Set([..._r, ...Tr, ...lt])], U = nn($.css, { dt: Pt });
    }
    return {
      primitive: {
        css: A,
        tokens: q
      },
      semantic: {
        css: G,
        tokens: ne
      },
      global: {
        css: ee,
        tokens: V
      },
      style: U
    };
  },
  getPreset({ name: t = "", preset: e = {}, options: n, params: i, set: s, defaults: u, selector: f }) {
    var h, b, v;
    let p, O, $;
    if (be(e) && n.transform !== "strict") {
      const I = t.replace("-directive", ""), A = e, { colorScheme: q, extend: G, css: ne } = A, ee = vn(A, ["colorScheme", "extend", "css"]), V = G || {}, { colorScheme: U } = V, ge = vn(V, ["colorScheme"]), ce = q || {}, { dark: de } = ce, Se = vn(ce, ["dark"]), je = U || {}, { dark: $e } = je, Ae = vn(je, ["dark"]), Be = be(ee) ? this._toVariables({ [I]: sn(sn({}, ee), ge) }, n) : {}, Z = be(Se) ? this._toVariables({ [I]: sn(sn({}, Se), Ae) }, n) : {}, oe = be(de) ? this._toVariables({ [I]: sn(sn({}, de), $e) }, n) : {}, [pe, ke] = [(h = Be.declarations) != null ? h : "", Be.tokens || []], [Ne, Oe] = [(b = Z.declarations) != null ? b : "", Z.tokens || []], [Ge, Ve] = [(v = oe.declarations) != null ? v : "", oe.tokens || []], We = this.transformCSS(I, `${pe}${Ne}`, "light", "variable", n, s, u, f), pn = this.transformCSS(I, Ge, "dark", "variable", n, s, u, f);
      p = `${We}${pn}`, O = [.../* @__PURE__ */ new Set([...ke, ...Oe, ...Ve])], $ = nn(ne, { dt: Pt });
    }
    return {
      css: p,
      tokens: O,
      style: $
    };
  },
  getPresetC({ name: t = "", theme: e = {}, params: n, set: i, defaults: s }) {
    var u;
    const { preset: f, options: h } = e, b = (u = f == null ? void 0 : f.components) == null ? void 0 : u[t];
    return this.getPreset({ name: t, preset: b, options: h, params: n, set: i, defaults: s });
  },
  getPresetD({ name: t = "", theme: e = {}, params: n, set: i, defaults: s }) {
    var u;
    const f = t.replace("-directive", ""), { preset: h, options: b } = e, v = (u = h == null ? void 0 : h.directives) == null ? void 0 : u[f];
    return this.getPreset({ name: f, preset: v, options: b, params: n, set: i, defaults: s });
  },
  applyDarkColorScheme(t) {
    return !(t.darkModeSelector === "none" || t.darkModeSelector === !1);
  },
  getColorSchemeOption(t, e) {
    var n;
    return this.applyDarkColorScheme(t) ? this.regex.resolve(t.darkModeSelector === !0 ? e.options.darkModeSelector : (n = t.darkModeSelector) != null ? n : e.options.darkModeSelector) : [];
  },
  getLayerOrder(t, e = {}, n, i) {
    const { cssLayer: s } = e;
    return s ? `@layer ${nn(s.order || "primeui", n)}` : "";
  },
  getCommonStyleSheet({ name: t = "", theme: e = {}, params: n, props: i = {}, set: s, defaults: u }) {
    const f = this.getCommon({ name: t, theme: e, params: n, set: s, defaults: u }), h = Object.entries(i).reduce((b, [v, p]) => b.push(`${v}="${p}"`) && b, []).join(" ");
    return Object.entries(f || {}).reduce((b, [v, p]) => {
      if (p != null && p.css) {
        const O = _t(p == null ? void 0 : p.css), $ = `${v}-variables`;
        b.push(`<style type="text/css" data-primevue-style-id="${$}" ${h}>${O}</style>`);
      }
      return b;
    }, []).join("");
  },
  getStyleSheet({ name: t = "", theme: e = {}, params: n, props: i = {}, set: s, defaults: u }) {
    var f;
    const h = { name: t, theme: e, params: n, set: s, defaults: u }, b = (f = t.includes("-directive") ? this.getPresetD(h) : this.getPresetC(h)) == null ? void 0 : f.css, v = Object.entries(i).reduce((p, [O, $]) => p.push(`${O}="${$}"`) && p, []).join(" ");
    return b ? `<style type="text/css" data-primevue-style-id="${t}-variables" ${v}>${_t(b)}</style>` : "";
  },
  createTokens(t = {}, e, n = "", i = "", s = {}) {
    return Object.entries(t).forEach(([u, f]) => {
      const h = kn(u, e.variable.excludedKeyRegex) ? n : n ? `${n}.${gi(u)}` : gi(u), b = i ? `${i}.${u}` : u;
      In(f) ? this.createTokens(f, e, h, b, s) : (s[h] || (s[h] = {
        paths: [],
        computed(v, p = {}) {
          var O, $;
          return this.paths.length === 1 ? (O = this.paths[0]) == null ? void 0 : O.computed(this.paths[0].scheme, p.binding) : v && v !== "none" ? ($ = this.paths.find((I) => I.scheme === v)) == null ? void 0 : $.computed(v, p.binding) : this.paths.map((I) => I.computed(I.scheme, p[I.scheme]));
        }
      }), s[h].paths.push({
        path: b,
        value: f,
        scheme: b.includes("colorScheme.light") ? "light" : b.includes("colorScheme.dark") ? "dark" : "none",
        computed(v, p = {}) {
          const O = /{([^}]*)}/g;
          let $ = f;
          if (p.name = this.path, p.binding || (p.binding = {}), kn(f, O)) {
            const A = f.trim().replaceAll(O, (ne) => {
              var ee;
              const V = ne.replace(/{|}/g, ""), U = (ee = s[V]) == null ? void 0 : ee.computed(v, p);
              return Cr(U) && U.length === 2 ? `light-dark(${U[0].value},${U[1].value})` : U == null ? void 0 : U.value;
            }), q = /(\d+\w*\s+[\+\-\*\/]\s+\d+\w*)/g, G = /var\([^)]+\)/g;
            $ = kn(A.replace(G, "0"), q) ? `calc(${A})` : A;
          }
          return un(p.binding) && delete p.binding, {
            colorScheme: v,
            path: this.path,
            paths: p,
            value: $.includes("undefined") ? void 0 : $
          };
        }
      }));
    }), s;
  },
  getTokenValue(t, e, n) {
    var i;
    const u = ((b) => b.split(".").filter((p) => !kn(p.toLowerCase(), n.variable.excludedKeyRegex)).join("."))(e), f = e.includes("colorScheme.light") ? "light" : e.includes("colorScheme.dark") ? "dark" : void 0, h = [(i = t[u]) == null ? void 0 : i.computed(f)].flat().filter((b) => b);
    return h.length === 1 ? h[0].value : h.reduce((b = {}, v) => {
      const p = v, { colorScheme: O } = p, $ = vn(p, ["colorScheme"]);
      return b[O] = $, b;
    }, void 0);
  },
  getSelectorRule(t, e, n, i) {
    return n === "class" || n === "attr" ? at(be(e) ? `${t}${e},${t} ${e}` : t, i) : at(t, be(e) ? at(e, i) : i);
  },
  transformCSS(t, e, n, i, s = {}, u, f, h) {
    if (be(e)) {
      const { cssLayer: b } = s;
      if (i !== "style") {
        const v = this.getColorSchemeOption(s, f);
        e = n === "dark" ? v.reduce((p, { type: O, selector: $ }) => (be($) && (p += $.includes("[CSS]") ? $.replace("[CSS]", e) : this.getSelectorRule($, h, O, e)), p), "") : at(h ?? ":root", e);
      }
      if (b) {
        const v = {
          name: "primeui",
          order: "primeui"
        };
        In(b) && (v.name = nn(b.name, { name: t, type: i })), be(v.name) && (e = at(`@layer ${v.name}`, e), u == null || u.layerNames(v.name));
      }
      return e;
    }
    return "";
  }
}, De = {
  defaults: {
    variable: {
      prefix: "p",
      selector: ":root",
      excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi
    },
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: !1
    }
  },
  _theme: void 0,
  _layerNames: /* @__PURE__ */ new Set(),
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  _loadingStyles: /* @__PURE__ */ new Set(),
  _tokens: {},
  update(t = {}) {
    const { theme: e } = t;
    e && (this._theme = ho(sn({}, e), {
      options: sn(sn({}, this.defaults.options), e.options)
    }), this._tokens = rn.createTokens(this.preset, this.defaults), this.clearLoadedStyleNames());
  },
  get theme() {
    return this._theme;
  },
  get preset() {
    var t;
    return ((t = this.theme) == null ? void 0 : t.preset) || {};
  },
  get options() {
    var t;
    return ((t = this.theme) == null ? void 0 : t.options) || {};
  },
  get tokens() {
    return this._tokens;
  },
  getTheme() {
    return this.theme;
  },
  setTheme(t) {
    this.update({ theme: t }), wn.emit("theme:change", t);
  },
  getPreset() {
    return this.preset;
  },
  setPreset(t) {
    this._theme = ho(sn({}, this.theme), { preset: t }), this._tokens = rn.createTokens(t, this.defaults), this.clearLoadedStyleNames(), wn.emit("preset:change", t), wn.emit("theme:change", this.theme);
  },
  getOptions() {
    return this.options;
  },
  setOptions(t) {
    this._theme = ho(sn({}, this.theme), { options: t }), this.clearLoadedStyleNames(), wn.emit("options:change", t), wn.emit("theme:change", this.theme);
  },
  getLayerNames() {
    return [...this._layerNames];
  },
  setLayerNames(t) {
    this._layerNames.add(t);
  },
  getLoadedStyleNames() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded(t) {
    return this._loadedStyleNames.has(t);
  },
  setLoadedStyleName(t) {
    this._loadedStyleNames.add(t);
  },
  deleteLoadedStyleName(t) {
    this._loadedStyleNames.delete(t);
  },
  clearLoadedStyleNames() {
    this._loadedStyleNames.clear();
  },
  getTokenValue(t) {
    return rn.getTokenValue(this.tokens, t, this.defaults);
  },
  getCommon(t = "", e) {
    return rn.getCommon({ name: t, theme: this.theme, params: e, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getComponent(t = "", e) {
    const n = { name: t, theme: this.theme, params: e, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return rn.getPresetC(n);
  },
  getDirective(t = "", e) {
    const n = { name: t, theme: this.theme, params: e, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return rn.getPresetD(n);
  },
  getCustomPreset(t = "", e, n, i) {
    const s = { name: t, preset: e, options: this.options, selector: n, params: i, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } };
    return rn.getPreset(s);
  },
  getLayerOrderCSS(t = "") {
    return rn.getLayerOrder(t, this.options, { names: this.getLayerNames() }, this.defaults);
  },
  transformCSS(t = "", e, n = "style", i) {
    return rn.transformCSS(t, e, i, n, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults);
  },
  getCommonStyleSheet(t = "", e, n = {}) {
    return rn.getCommonStyleSheet({ name: t, theme: this.theme, params: e, props: n, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  getStyleSheet(t, e, n = {}) {
    return rn.getStyleSheet({ name: t, theme: this.theme, params: e, props: n, defaults: this.defaults, set: { layerNames: this.setLayerNames.bind(this) } });
  },
  onStyleMounted(t) {
    this._loadingStyles.add(t);
  },
  onStyleUpdated(t) {
    this._loadingStyles.add(t);
  },
  onStyleLoaded(t, { name: e }) {
    this._loadingStyles.size && (this._loadingStyles.delete(e), wn.emit(`theme:${e}:load`, t), !this._loadingStyles.size && wn.emit("theme:load"));
  }
}, Mn = {
  _loadedStyleNames: /* @__PURE__ */ new Set(),
  getLoadedStyleNames: function() {
    return this._loadedStyleNames;
  },
  isStyleNameLoaded: function(e) {
    return this._loadedStyleNames.has(e);
  },
  setLoadedStyleName: function(e) {
    this._loadedStyleNames.add(e);
  },
  deleteLoadedStyleName: function(e) {
    this._loadedStyleNames.delete(e);
  },
  clearLoadedStyleNames: function() {
    this._loadedStyleNames.clear();
  }
};
function $t(t) {
  "@babel/helpers - typeof";
  return $t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, $t(t);
}
function Si(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Ci(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Si(Object(n), !0).forEach(function(i) {
      eu(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Si(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function eu(t, e, n) {
  return (e = nu(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function nu(t) {
  var e = tu(t, "string");
  return $t(e) == "symbol" ? e : e + "";
}
function tu(t, e) {
  if ($t(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if ($t(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function ru(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  qa() ? Ua(t) : e ? t() : Wa(t);
}
var ou = 0;
function iu(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = Dt(!1), i = Dt(t), s = Dt(null), u = Eo() ? window.document : void 0, f = e.document, h = f === void 0 ? u : f, b = e.immediate, v = b === void 0 ? !0 : b, p = e.manual, O = p === void 0 ? !1 : p, $ = e.name, I = $ === void 0 ? "style_".concat(++ou) : $, A = e.id, q = A === void 0 ? void 0 : A, G = e.media, ne = G === void 0 ? void 0 : G, ee = e.nonce, V = ee === void 0 ? void 0 : ee, U = e.first, ge = U === void 0 ? !1 : U, ce = e.onMounted, de = ce === void 0 ? void 0 : ce, Se = e.onUpdated, je = Se === void 0 ? void 0 : Se, $e = e.onLoad, Ae = $e === void 0 ? void 0 : $e, Be = e.props, Z = Be === void 0 ? {} : Be, oe = function() {
  }, pe = function(Oe) {
    var Ge = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (h) {
      var Ve = Ci(Ci({}, Z), Ge), We = Ve.name || I, pn = Ve.id || q, tn = Ve.nonce || V;
      s.value = h.querySelector('style[data-primevue-style-id="'.concat(We, '"]')) || h.getElementById(pn) || h.createElement("style"), s.value.isConnected || (i.value = Oe || t, vr(s.value, {
        type: "text/css",
        id: pn,
        media: ne,
        nonce: tn
      }), ge ? h.head.prepend(s.value) : h.head.appendChild(s.value), Ui(s.value, "data-primevue-style-id", We), vr(s.value, Ve), s.value.onload = function(hn) {
        return Ae == null ? void 0 : Ae(hn, {
          name: We
        });
      }, de == null || de(We)), !n.value && (oe = Za(i, function(hn) {
        s.value.textContent = hn, je == null || je(We);
      }, {
        immediate: !0
      }), n.value = !0);
    }
  }, ke = function() {
    !h || !n.value || (oe(), ws(s.value) && h.head.removeChild(s.value), n.value = !1);
  };
  return v && !O && ru(pe), {
    id: q,
    name: I,
    el: s,
    css: i,
    unload: ke,
    load: pe,
    isLoaded: Ha(n)
  };
}
function Et(t) {
  "@babel/helpers - typeof";
  return Et = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Et(t);
}
function xi(t, e) {
  return lu(t) || uu(t, e) || su(t, e) || au();
}
function au() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function su(t, e) {
  if (t) {
    if (typeof t == "string") return Di(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Di(t, e) : void 0;
  }
}
function Di(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function uu(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, s, u, f, h = [], b = !0, v = !1;
    try {
      if (u = (n = n.call(t)).next, e !== 0) for (; !(b = (i = u.call(n)).done) && (h.push(i.value), h.length !== e); b = !0) ;
    } catch (p) {
      v = !0, s = p;
    } finally {
      try {
        if (!b && n.return != null && (f = n.return(), Object(f) !== f)) return;
      } finally {
        if (v) throw s;
      }
    }
    return h;
  }
}
function lu(t) {
  if (Array.isArray(t)) return t;
}
function _i(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function mo(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? _i(Object(n), !0).forEach(function(i) {
      cu(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : _i(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function cu(t, e, n) {
  return (e = du(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function du(t) {
  var e = fu(t, "string");
  return Et(e) == "symbol" ? e : e + "";
}
function fu(t, e) {
  if (Et(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (Et(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var pu = function(e) {
  var n = e.dt;
  return `
*,
::before,
::after {
    box-sizing: border-box;
}

/* Non vue overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: `.concat(n("disabled.opacity"), `;
}

.pi {
    font-size: `).concat(n("icon.size"), `;
}

.p-icon {
    width: `).concat(n("icon.size"), `;
    height: `).concat(n("icon.size"), `;
}

.p-overlay-mask {
    background: `).concat(n("mask.background"), `;
    color: `).concat(n("mask.color"), `;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation `).concat(n("mask.transition.duration"), ` forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation `).concat(n("mask.transition.duration"), ` forwards;
}

@keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: `).concat(n("mask.background"), `;
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: `).concat(n("mask.background"), `;
    }
    to {
        background: transparent;
    }
}
`);
}, hu = function(e) {
  var n = e.dt;
  return `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: `.concat(n("scrollbar.width"), `;
}
`);
}, mu = {}, bu = {}, Ie = {
  name: "base",
  css: hu,
  theme: pu,
  classes: mu,
  inlineStyles: bu,
  load: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(u) {
      return u;
    }, s = i(nn(e, {
      dt: Pt
    }));
    return be(s) ? iu(_t(s), mo({
      name: this.name
    }, n)) : {};
  },
  loadCSS: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.css, e);
  },
  loadTheme: function() {
    var e = this, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.load(this.theme, n, function() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return De.transformCSS(n.name || e.name, "".concat(s).concat(i));
    });
  },
  getCommonTheme: function(e) {
    return De.getCommon(this.name, e);
  },
  getComponentTheme: function(e) {
    return De.getComponent(this.name, e);
  },
  getDirectiveTheme: function(e) {
    return De.getDirective(this.name, e);
  },
  getPresetTheme: function(e, n, i) {
    return De.getCustomPreset(this.name, e, n, i);
  },
  getLayerOrderThemeCSS: function() {
    return De.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var i = nn(this.css, {
        dt: Pt
      }) || "", s = _t("".concat(i).concat(e)), u = Object.entries(n).reduce(function(f, h) {
        var b = xi(h, 2), v = b[0], p = b[1];
        return f.push("".concat(v, '="').concat(p, '"')) && f;
      }, []).join(" ");
      return be(s) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(u, ">").concat(s, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return De.getCommonStyleSheet(this.name, e, n);
  },
  getThemeStyleSheet: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = [De.getStyleSheet(this.name, e, n)];
    if (this.theme) {
      var s = this.name === "base" ? "global-style" : "".concat(this.name, "-style"), u = nn(this.theme, {
        dt: Pt
      }), f = _t(De.transformCSS(s, u)), h = Object.entries(n).reduce(function(b, v) {
        var p = xi(v, 2), O = p[0], $ = p[1];
        return b.push("".concat(O, '="').concat($, '"')) && b;
      }, []).join(" ");
      be(f) && i.push('<style type="text/css" data-primevue-style-id="'.concat(s, '" ').concat(h, ">").concat(f, "</style>"));
    }
    return i.join("");
  },
  extend: function(e) {
    return mo(mo({}, this), {}, {
      css: void 0,
      theme: void 0
    }, e);
  }
}, Pi = Ie.extend({
  name: "common"
});
function Mt(t) {
  "@babel/helpers - typeof";
  return Mt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Mt(t);
}
function gu(t) {
  return ta(t) || yu(t) || na(t) || ea();
}
function yu(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function Ct(t, e) {
  return ta(t) || vu(t, e) || na(t, e) || ea();
}
function ea() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function na(t, e) {
  if (t) {
    if (typeof t == "string") return Ti(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ti(t, e) : void 0;
  }
}
function Ti(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function vu(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, s, u, f, h = [], b = !0, v = !1;
    try {
      if (u = (n = n.call(t)).next, e === 0) {
        if (Object(n) !== n) return;
        b = !1;
      } else for (; !(b = (i = u.call(n)).done) && (h.push(i.value), h.length !== e); b = !0) ;
    } catch (p) {
      v = !0, s = p;
    } finally {
      try {
        if (!b && n.return != null && (f = n.return(), Object(f) !== f)) return;
      } finally {
        if (v) throw s;
      }
    }
    return h;
  }
}
function ta(t) {
  if (Array.isArray(t)) return t;
}
function Oi(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function ue(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Oi(Object(n), !0).forEach(function(i) {
      xt(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Oi(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function xt(t, e, n) {
  return (e = wu(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function wu(t) {
  var e = ku(t, "string");
  return Mt(e) == "symbol" ? e : e + "";
}
function ku(t, e) {
  if (Mt(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (Mt(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var Lt = {
  name: "BaseComponent",
  props: {
    pt: {
      type: Object,
      default: void 0
    },
    ptOptions: {
      type: Object,
      default: void 0
    },
    unstyled: {
      type: Boolean,
      default: void 0
    },
    dt: {
      type: Object,
      default: void 0
    }
  },
  inject: {
    $parentInstance: {
      default: void 0
    }
  },
  watch: {
    isUnstyled: {
      immediate: !0,
      handler: function(e) {
        e || (this._loadCoreStyles(), this._themeChangeListener(this._loadCoreStyles));
      }
    },
    dt: {
      immediate: !0,
      handler: function(e) {
        var n = this;
        e ? (this._loadScopedThemeStyles(e), this._themeChangeListener(function() {
          return n._loadScopedThemeStyles(e);
        })) : this._unloadScopedThemeStyles();
      }
    }
  },
  scopedStyleEl: void 0,
  rootEl: void 0,
  $attrSelector: void 0,
  beforeCreate: function() {
    var e, n, i, s, u, f, h, b, v, p, O, $ = (e = this.pt) === null || e === void 0 ? void 0 : e._usept, I = $ ? (n = this.pt) === null || n === void 0 || (n = n.originalValue) === null || n === void 0 ? void 0 : n[this.$.type.name] : void 0, A = $ ? (i = this.pt) === null || i === void 0 || (i = i.value) === null || i === void 0 ? void 0 : i[this.$.type.name] : this.pt;
    (s = A || I) === null || s === void 0 || (s = s.hooks) === null || s === void 0 || (u = s.onBeforeCreate) === null || u === void 0 || u.call(s);
    var q = (f = this.$primevueConfig) === null || f === void 0 || (f = f.pt) === null || f === void 0 ? void 0 : f._usept, G = q ? (h = this.$primevue) === null || h === void 0 || (h = h.config) === null || h === void 0 || (h = h.pt) === null || h === void 0 ? void 0 : h.originalValue : void 0, ne = q ? (b = this.$primevue) === null || b === void 0 || (b = b.config) === null || b === void 0 || (b = b.pt) === null || b === void 0 ? void 0 : b.value : (v = this.$primevue) === null || v === void 0 || (v = v.config) === null || v === void 0 ? void 0 : v.pt;
    (p = ne || G) === null || p === void 0 || (p = p[this.$.type.name]) === null || p === void 0 || (p = p.hooks) === null || p === void 0 || (O = p.onBeforeCreate) === null || O === void 0 || O.call(p), this.$attrSelector = Ao("pc");
  },
  created: function() {
    this._hook("onCreated");
  },
  beforeMount: function() {
    this.rootEl = on(this.$el, '[data-pc-name="'.concat(an(this.$.type.name), '"]')), this.rootEl && (this.$attrSelector && !this.rootEl.hasAttribute(this.$attrSelector) && this.rootEl.setAttribute(this.$attrSelector, ""), this.rootEl.$pc = ue({
      name: this.$.type.name,
      attrSelector: this.$attrSelector
    }, this.$params)), this._loadStyles(), this._hook("onBeforeMount");
  },
  mounted: function() {
    this._hook("onMounted");
  },
  beforeUpdate: function() {
    this._hook("onBeforeUpdate");
  },
  updated: function() {
    this._hook("onUpdated");
  },
  beforeUnmount: function() {
    this._hook("onBeforeUnmount");
  },
  unmounted: function() {
    this._unloadScopedThemeStyles(), this._hook("onUnmounted");
  },
  methods: {
    _hook: function(e) {
      if (!this.$options.hostName) {
        var n = this._usePT(this._getPT(this.pt, this.$.type.name), this._getOptionValue, "hooks.".concat(e)), i = this._useDefaultPT(this._getOptionValue, "hooks.".concat(e));
        n == null || n(), i == null || i();
      }
    },
    _mergeProps: function(e) {
      for (var n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++)
        i[s - 1] = arguments[s];
      return Sr(e) ? e.apply(void 0, i) : j.apply(void 0, i);
    },
    _loadStyles: function() {
      var e = this, n = function() {
        Mn.isStyleNameLoaded("base") || (Ie.loadCSS(e.$styleOptions), e._loadGlobalStyles(), Mn.setLoadedStyleName("base")), e._loadThemeStyles();
      };
      n(), this._themeChangeListener(n);
    },
    _loadCoreStyles: function() {
      var e, n;
      !Mn.isStyleNameLoaded((e = this.$style) === null || e === void 0 ? void 0 : e.name) && (n = this.$style) !== null && n !== void 0 && n.name && (Pi.loadCSS(this.$styleOptions), this.$options.style && this.$style.loadCSS(this.$styleOptions), Mn.setLoadedStyleName(this.$style.name));
    },
    _loadGlobalStyles: function() {
      var e = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
      be(e) && Ie.load(e, ue({
        name: "global"
      }, this.$styleOptions));
    },
    _loadThemeStyles: function() {
      var e, n;
      if (!(this.isUnstyled || this.$theme === "none")) {
        if (!De.isStyleNameLoaded("common")) {
          var i, s, u = ((i = this.$style) === null || i === void 0 || (s = i.getCommonTheme) === null || s === void 0 ? void 0 : s.call(i)) || {}, f = u.primitive, h = u.semantic, b = u.global, v = u.style;
          Ie.load(f == null ? void 0 : f.css, ue({
            name: "primitive-variables"
          }, this.$styleOptions)), Ie.load(h == null ? void 0 : h.css, ue({
            name: "semantic-variables"
          }, this.$styleOptions)), Ie.load(b == null ? void 0 : b.css, ue({
            name: "global-variables"
          }, this.$styleOptions)), Ie.loadTheme(ue({
            name: "global-style"
          }, this.$styleOptions), v), De.setLoadedStyleName("common");
        }
        if (!De.isStyleNameLoaded((e = this.$style) === null || e === void 0 ? void 0 : e.name) && (n = this.$style) !== null && n !== void 0 && n.name) {
          var p, O, $, I, A = ((p = this.$style) === null || p === void 0 || (O = p.getComponentTheme) === null || O === void 0 ? void 0 : O.call(p)) || {}, q = A.css, G = A.style;
          ($ = this.$style) === null || $ === void 0 || $.load(q, ue({
            name: "".concat(this.$style.name, "-variables")
          }, this.$styleOptions)), (I = this.$style) === null || I === void 0 || I.loadTheme(ue({
            name: "".concat(this.$style.name, "-style")
          }, this.$styleOptions), G), De.setLoadedStyleName(this.$style.name);
        }
        if (!De.isStyleNameLoaded("layer-order")) {
          var ne, ee, V = (ne = this.$style) === null || ne === void 0 || (ee = ne.getLayerOrderThemeCSS) === null || ee === void 0 ? void 0 : ee.call(ne);
          Ie.load(V, ue({
            name: "layer-order",
            first: !0
          }, this.$styleOptions)), De.setLoadedStyleName("layer-order");
        }
      }
    },
    _loadScopedThemeStyles: function(e) {
      var n, i, s, u = ((n = this.$style) === null || n === void 0 || (i = n.getPresetTheme) === null || i === void 0 ? void 0 : i.call(n, e, "[".concat(this.$attrSelector, "]"))) || {}, f = u.css, h = (s = this.$style) === null || s === void 0 ? void 0 : s.load(f, ue({
        name: "".concat(this.$attrSelector, "-").concat(this.$style.name)
      }, this.$styleOptions));
      this.scopedStyleEl = h.el;
    },
    _unloadScopedThemeStyles: function() {
      var e;
      (e = this.scopedStyleEl) === null || e === void 0 || (e = e.value) === null || e === void 0 || e.remove();
    },
    _themeChangeListener: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
      };
      Mn.clearLoadedStyleNames(), wn.on("theme:change", e);
    },
    _getHostInstance: function(e) {
      return e ? this.$options.hostName ? e.$.type.name === this.$options.hostName ? e : this._getHostInstance(e.$parentInstance) : e.$parentInstance : void 0;
    },
    _getPropValue: function(e) {
      var n;
      return this[e] || ((n = this._getHostInstance(this)) === null || n === void 0 ? void 0 : n[e]);
    },
    _getOptionValue: function(e) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return Mo(e, n, i);
    },
    _getPTValue: function() {
      var e, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !0, f = /./g.test(i) && !!s[i.split(".")[0]], h = this._getPropValue("ptOptions") || ((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.ptOptions) || {}, b = h.mergeSections, v = b === void 0 ? !0 : b, p = h.mergeProps, O = p === void 0 ? !1 : p, $ = u ? f ? this._useGlobalPT(this._getPTClassValue, i, s) : this._useDefaultPT(this._getPTClassValue, i, s) : void 0, I = f ? void 0 : this._getPTSelf(n, this._getPTClassValue, i, ue(ue({}, s), {}, {
        global: $ || {}
      })), A = this._getPTDatasets(i);
      return v || !v && I ? O ? this._mergeProps(O, $, I, A) : ue(ue(ue({}, $), I), A) : ue(ue({}, I), A);
    },
    _getPTSelf: function() {
      for (var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length, i = new Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++)
        i[s - 1] = arguments[s];
      return j(
        this._usePT.apply(this, [this._getPT(e, this.$name)].concat(i)),
        // Exp; <component :pt="{}"
        this._usePT.apply(this, [this.$_attrsPT].concat(i))
        // Exp; <component :pt:[passthrough_key]:[attribute]="{value}" or <component :pt:[passthrough_key]="() =>{value}"
      );
    },
    _getPTDatasets: function() {
      var e, n, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", s = "data-pc-", u = i === "root" && be((e = this.pt) === null || e === void 0 ? void 0 : e["data-pc-section"]);
      return i !== "transition" && ue(ue({}, i === "root" && ue(ue(xt({}, "".concat(s, "name"), an(u ? (n = this.pt) === null || n === void 0 ? void 0 : n["data-pc-section"] : this.$.type.name)), u && xt({}, "".concat(s, "extend"), an(this.$.type.name))), Eo() && xt({}, "".concat(this.$attrSelector), ""))), {}, xt({}, "".concat(s, "section"), an(i)));
    },
    _getPTClassValue: function() {
      var e = this._getOptionValue.apply(this, arguments);
      return Ze(e) || Cr(e) ? {
        class: e
      } : e;
    },
    _getPT: function(e) {
      var n = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", s = arguments.length > 2 ? arguments[2] : void 0, u = function(h) {
        var b, v = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, p = s ? s(h) : h, O = an(i), $ = an(n.$name);
        return (b = v ? O !== $ ? p == null ? void 0 : p[O] : void 0 : p == null ? void 0 : p[O]) !== null && b !== void 0 ? b : p;
      };
      return e != null && e.hasOwnProperty("_usept") ? {
        _usept: e._usept,
        originalValue: u(e.originalValue),
        value: u(e.value)
      } : u(e, !0);
    },
    _usePT: function(e, n, i, s) {
      var u = function(q) {
        return n(q, i, s);
      };
      if (e != null && e.hasOwnProperty("_usept")) {
        var f, h = e._usept || ((f = this.$primevueConfig) === null || f === void 0 ? void 0 : f.ptOptions) || {}, b = h.mergeSections, v = b === void 0 ? !0 : b, p = h.mergeProps, O = p === void 0 ? !1 : p, $ = u(e.originalValue), I = u(e.value);
        return $ === void 0 && I === void 0 ? void 0 : Ze(I) ? I : Ze($) ? $ : v || !v && I ? O ? this._mergeProps(O, $, I) : ue(ue({}, $), I) : I;
      }
      return u(e);
    },
    _useGlobalPT: function(e, n, i) {
      return this._usePT(this.globalPT, e, n, i);
    },
    _useDefaultPT: function(e, n, i) {
      return this._usePT(this.defaultPT, e, n, i);
    },
    ptm: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this._getPTValue(this.pt, e, ue(ue({}, this.$params), n));
    },
    ptmi: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return j(this.$_attrsWithoutPT, this.ptm(e, n));
    },
    ptmo: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this._getPTValue(e, n, ue({
        instance: this
      }, i), !1);
    },
    cx: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.isUnstyled ? void 0 : this._getOptionValue(this.$style.classes, e, ue(ue({}, this.$params), n));
    },
    sx: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (n) {
        var s = this._getOptionValue(this.$style.inlineStyles, e, ue(ue({}, this.$params), i)), u = this._getOptionValue(Pi.inlineStyles, e, ue(ue({}, this.$params), i));
        return [u, s];
      }
    }
  },
  computed: {
    globalPT: function() {
      var e, n = this;
      return this._getPT((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.pt, void 0, function(i) {
        return nn(i, {
          instance: n
        });
      });
    },
    defaultPT: function() {
      var e, n = this;
      return this._getPT((e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.pt, void 0, function(i) {
        return n._getOptionValue(i, n.$name, ue({}, n.$params)) || nn(i, ue({}, n.$params));
      });
    },
    isUnstyled: function() {
      var e;
      return this.unstyled !== void 0 ? this.unstyled : (e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.unstyled;
    },
    $inProps: function() {
      var e, n = Object.keys(((e = this.$.vnode) === null || e === void 0 ? void 0 : e.props) || {});
      return Object.fromEntries(Object.entries(this.$props).filter(function(i) {
        var s = Ct(i, 1), u = s[0];
        return n == null ? void 0 : n.includes(u);
      }));
    },
    $theme: function() {
      var e;
      return (e = this.$primevueConfig) === null || e === void 0 ? void 0 : e.theme;
    },
    $style: function() {
      return ue(ue({
        classes: void 0,
        inlineStyles: void 0,
        load: function() {
        },
        loadCSS: function() {
        },
        loadTheme: function() {
        }
      }, (this._getHostInstance(this) || {}).$style), this.$options.style);
    },
    $styleOptions: function() {
      var e;
      return {
        nonce: (e = this.$primevueConfig) === null || e === void 0 || (e = e.csp) === null || e === void 0 ? void 0 : e.nonce
      };
    },
    $primevueConfig: function() {
      var e;
      return (e = this.$primevue) === null || e === void 0 ? void 0 : e.config;
    },
    $name: function() {
      return this.$options.hostName || this.$.type.name;
    },
    $params: function() {
      var e = this._getHostInstance(this) || this.$parent;
      return {
        instance: this,
        props: this.$props,
        state: this.$data,
        attrs: this.$attrs,
        parent: {
          instance: e,
          props: e == null ? void 0 : e.$props,
          state: e == null ? void 0 : e.$data,
          attrs: e == null ? void 0 : e.$attrs
        }
      };
    },
    $_attrsPT: function() {
      return Object.entries(this.$attrs || {}).filter(function(e) {
        var n = Ct(e, 1), i = n[0];
        return i == null ? void 0 : i.startsWith("pt:");
      }).reduce(function(e, n) {
        var i = Ct(n, 2), s = i[0], u = i[1], f = s.split(":"), h = gu(f), b = h.slice(1);
        return b == null || b.reduce(function(v, p, O, $) {
          return !v[p] && (v[p] = O === $.length - 1 ? u : {}), v[p];
        }, e), e;
      }, {});
    },
    $_attrsWithoutPT: function() {
      return Object.entries(this.$attrs || {}).filter(function(e) {
        var n = Ct(e, 1), i = n[0];
        return !(i != null && i.startsWith("pt:"));
      }).reduce(function(e, n) {
        var i = Ct(n, 2), s = i[0], u = i[1];
        return e[s] = u, e;
      }, {});
    }
  }
}, Su = `
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`, Cu = Ie.extend({
  name: "baseicon",
  css: Su
});
function It(t) {
  "@babel/helpers - typeof";
  return It = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, It(t);
}
function $i(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Ei(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? $i(Object(n), !0).forEach(function(i) {
      xu(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : $i(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function xu(t, e, n) {
  return (e = Du(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Du(t) {
  var e = _u(t, "string");
  return It(e) == "symbol" ? e : e + "";
}
function _u(t, e) {
  if (It(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (It(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var Gn = {
  name: "BaseIcon",
  extends: Lt,
  props: {
    label: {
      type: String,
      default: void 0
    },
    spin: {
      type: Boolean,
      default: !1
    }
  },
  style: Cu,
  provide: function() {
    return {
      $pcIcon: this,
      $parentInstance: this
    };
  },
  methods: {
    pti: function() {
      var e = un(this.label);
      return Ei(Ei({}, !this.isUnstyled && {
        class: ["p-icon", {
          "p-icon-spin": this.spin
        }]
      }), {}, {
        role: e ? void 0 : "img",
        "aria-label": e ? void 0 : this.label,
        "aria-hidden": e
      });
    }
  }
}, ra = {
  name: "CalendarIcon",
  extends: Gn
};
function Pu(t, e, n, i, s, u) {
  return Y(), J("svg", j({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), e[0] || (e[0] = [we("path", {
    d: "M10.7838 1.51351H9.83783V0.567568C9.83783 0.417039 9.77804 0.272676 9.6716 0.166237C9.56516 0.0597971 9.42079 0 9.27027 0C9.11974 0 8.97538 0.0597971 8.86894 0.166237C8.7625 0.272676 8.7027 0.417039 8.7027 0.567568V1.51351H5.29729V0.567568C5.29729 0.417039 5.2375 0.272676 5.13106 0.166237C5.02462 0.0597971 4.88025 0 4.72973 0C4.5792 0 4.43484 0.0597971 4.3284 0.166237C4.22196 0.272676 4.16216 0.417039 4.16216 0.567568V1.51351H3.21621C2.66428 1.51351 2.13494 1.73277 1.74467 2.12305C1.35439 2.51333 1.13513 3.04266 1.13513 3.59459V11.9189C1.13513 12.4709 1.35439 13.0002 1.74467 13.3905C2.13494 13.7807 2.66428 14 3.21621 14H10.7838C11.3357 14 11.865 13.7807 12.2553 13.3905C12.6456 13.0002 12.8649 12.4709 12.8649 11.9189V3.59459C12.8649 3.04266 12.6456 2.51333 12.2553 2.12305C11.865 1.73277 11.3357 1.51351 10.7838 1.51351ZM3.21621 2.64865H4.16216V3.59459C4.16216 3.74512 4.22196 3.88949 4.3284 3.99593C4.43484 4.10237 4.5792 4.16216 4.72973 4.16216C4.88025 4.16216 5.02462 4.10237 5.13106 3.99593C5.2375 3.88949 5.29729 3.74512 5.29729 3.59459V2.64865H8.7027V3.59459C8.7027 3.74512 8.7625 3.88949 8.86894 3.99593C8.97538 4.10237 9.11974 4.16216 9.27027 4.16216C9.42079 4.16216 9.56516 4.10237 9.6716 3.99593C9.77804 3.88949 9.83783 3.74512 9.83783 3.59459V2.64865H10.7838C11.0347 2.64865 11.2753 2.74831 11.4527 2.92571C11.6301 3.10311 11.7297 3.34371 11.7297 3.59459V5.67568H2.27027V3.59459C2.27027 3.34371 2.36993 3.10311 2.54733 2.92571C2.72473 2.74831 2.96533 2.64865 3.21621 2.64865ZM10.7838 12.8649H3.21621C2.96533 12.8649 2.72473 12.7652 2.54733 12.5878C2.36993 12.4104 2.27027 12.1698 2.27027 11.9189V6.81081H11.7297V11.9189C11.7297 12.1698 11.6301 12.4104 11.4527 12.5878C11.2753 12.7652 11.0347 12.8649 10.7838 12.8649Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
ra.render = Pu;
var oa = {
  name: "ChevronDownIcon",
  extends: Gn
};
function Tu(t, e, n, i, s, u) {
  return Y(), J("svg", j({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), e[0] || (e[0] = [we("path", {
    d: "M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
oa.render = Tu;
var ia = {
  name: "ChevronLeftIcon",
  extends: Gn
};
function Ou(t, e, n, i, s, u) {
  return Y(), J("svg", j({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), e[0] || (e[0] = [we("path", {
    d: "M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
ia.render = Ou;
var aa = {
  name: "ChevronRightIcon",
  extends: Gn
};
function $u(t, e, n, i, s, u) {
  return Y(), J("svg", j({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), e[0] || (e[0] = [we("path", {
    d: "M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
aa.render = $u;
var sa = {
  name: "ChevronUpIcon",
  extends: Gn
};
function Eu(t, e, n, i, s, u) {
  return Y(), J("svg", j({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), e[0] || (e[0] = [we("path", {
    d: "M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
sa.render = Eu;
var ua = {
  name: "SpinnerIcon",
  extends: Gn
};
function Mu(t, e, n, i, s, u) {
  return Y(), J("svg", j({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), e[0] || (e[0] = [we("path", {
    d: "M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
ua.render = Mu;
var Iu = function(e) {
  var n = e.dt;
  return `
.p-badge {
    display: inline-flex;
    border-radius: `.concat(n("badge.border.radius"), `;
    align-items: center;
    justify-content: center;
    padding: `).concat(n("badge.padding"), `;
    background: `).concat(n("badge.primary.background"), `;
    color: `).concat(n("badge.primary.color"), `;
    font-size: `).concat(n("badge.font.size"), `;
    font-weight: `).concat(n("badge.font.weight"), `;
    min-width: `).concat(n("badge.min.width"), `;
    height: `).concat(n("badge.height"), `;
}

.p-badge-dot {
    width: `).concat(n("badge.dot.size"), `;
    min-width: `).concat(n("badge.dot.size"), `;
    height: `).concat(n("badge.dot.size"), `;
    border-radius: 50%;
    padding: 0;
}

.p-badge-circle {
    padding: 0;
    border-radius: 50%;
}

.p-badge-secondary {
    background: `).concat(n("badge.secondary.background"), `;
    color: `).concat(n("badge.secondary.color"), `;
}

.p-badge-success {
    background: `).concat(n("badge.success.background"), `;
    color: `).concat(n("badge.success.color"), `;
}

.p-badge-info {
    background: `).concat(n("badge.info.background"), `;
    color: `).concat(n("badge.info.color"), `;
}

.p-badge-warn {
    background: `).concat(n("badge.warn.background"), `;
    color: `).concat(n("badge.warn.color"), `;
}

.p-badge-danger {
    background: `).concat(n("badge.danger.background"), `;
    color: `).concat(n("badge.danger.color"), `;
}

.p-badge-contrast {
    background: `).concat(n("badge.contrast.background"), `;
    color: `).concat(n("badge.contrast.color"), `;
}

.p-badge-sm {
    font-size: `).concat(n("badge.sm.font.size"), `;
    min-width: `).concat(n("badge.sm.min.width"), `;
    height: `).concat(n("badge.sm.height"), `;
}

.p-badge-lg {
    font-size: `).concat(n("badge.lg.font.size"), `;
    min-width: `).concat(n("badge.lg.min.width"), `;
    height: `).concat(n("badge.lg.height"), `;
}

.p-badge-xl {
    font-size: `).concat(n("badge.xl.font.size"), `;
    min-width: `).concat(n("badge.xl.min.width"), `;
    height: `).concat(n("badge.xl.height"), `;
}
`);
}, Au = {
  root: function(e) {
    var n = e.props, i = e.instance;
    return ["p-badge p-component", {
      "p-badge-circle": be(n.value) && String(n.value).length === 1,
      "p-badge-dot": un(n.value) && !i.$slots.default,
      "p-badge-sm": n.size === "small",
      "p-badge-lg": n.size === "large",
      "p-badge-xl": n.size === "xlarge",
      "p-badge-info": n.severity === "info",
      "p-badge-success": n.severity === "success",
      "p-badge-warn": n.severity === "warn",
      "p-badge-danger": n.severity === "danger",
      "p-badge-secondary": n.severity === "secondary",
      "p-badge-contrast": n.severity === "contrast"
    }];
  }
}, Bu = Ie.extend({
  name: "badge",
  theme: Iu,
  classes: Au
}), ju = {
  name: "BaseBadge",
  extends: Lt,
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    severity: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  style: Bu,
  provide: function() {
    return {
      $pcBadge: this,
      $parentInstance: this
    };
  }
}, la = {
  name: "Badge",
  extends: ju,
  inheritAttrs: !1
};
function Vu(t, e, n, i, s, u) {
  return Y(), J("span", j({
    class: t.cx("root")
  }, t.ptmi("root")), [ve(t.$slots, "default", {}, function() {
    return [Wn(xe(t.value), 1)];
  })], 16);
}
la.render = Vu;
var Mi = Io();
function At(t) {
  "@babel/helpers - typeof";
  return At = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, At(t);
}
function Ii(t, e) {
  return Fu(t) || Nu(t, e) || Ku(t, e) || Lu();
}
function Lu() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ku(t, e) {
  if (t) {
    if (typeof t == "string") return Ai(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Ai(t, e) : void 0;
  }
}
function Ai(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function Nu(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var i, s, u, f, h = [], b = !0, v = !1;
    try {
      if (u = (n = n.call(t)).next, e !== 0) for (; !(b = (i = u.call(n)).done) && (h.push(i.value), h.length !== e); b = !0) ;
    } catch (p) {
      v = !0, s = p;
    } finally {
      try {
        if (!b && n.return != null && (f = n.return(), Object(f) !== f)) return;
      } finally {
        if (v) throw s;
      }
    }
    return h;
  }
}
function Fu(t) {
  if (Array.isArray(t)) return t;
}
function Bi(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function fe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Bi(Object(n), !0).forEach(function(i) {
      Co(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Bi(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function Co(t, e, n) {
  return (e = Ru(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Ru(t) {
  var e = Yu(t, "string");
  return At(e) == "symbol" ? e : e + "";
}
function Yu(t, e) {
  if (At(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (At(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var se = {
  _getMeta: function() {
    return [In(arguments.length <= 0 ? void 0 : arguments[0]) || arguments.length <= 0 ? void 0 : arguments[0], nn(In(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function(e, n) {
    var i, s, u;
    return (i = (e == null || (s = e.instance) === null || s === void 0 ? void 0 : s.$primevue) || (n == null || (u = n.ctx) === null || u === void 0 || (u = u.appContext) === null || u === void 0 || (u = u.config) === null || u === void 0 || (u = u.globalProperties) === null || u === void 0 ? void 0 : u.$primevue)) === null || i === void 0 ? void 0 : i.config;
  },
  _getOptionValue: Mo,
  _getPTValue: function() {
    var e, n, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "", f = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, h = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, b = function() {
      var ee = se._getOptionValue.apply(se, arguments);
      return Ze(ee) || Cr(ee) ? {
        class: ee
      } : ee;
    }, v = ((e = i.binding) === null || e === void 0 || (e = e.value) === null || e === void 0 ? void 0 : e.ptOptions) || ((n = i.$primevueConfig) === null || n === void 0 ? void 0 : n.ptOptions) || {}, p = v.mergeSections, O = p === void 0 ? !0 : p, $ = v.mergeProps, I = $ === void 0 ? !1 : $, A = h ? se._useDefaultPT(i, i.defaultPT(), b, u, f) : void 0, q = se._usePT(i, se._getPT(s, i.$name), b, u, fe(fe({}, f), {}, {
      global: A || {}
    })), G = se._getPTDatasets(i, u);
    return O || !O && q ? I ? se._mergeProps(i, I, A, q, G) : fe(fe(fe({}, A), q), G) : fe(fe({}, q), G);
  },
  _getPTDatasets: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = "data-pc-";
    return fe(fe({}, n === "root" && Co({}, "".concat(i, "name"), an(e.$name))), {}, Co({}, "".concat(i, "section"), an(n)));
  },
  _getPT: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", i = arguments.length > 2 ? arguments[2] : void 0, s = function(f) {
      var h, b = i ? i(f) : f, v = an(n);
      return (h = b == null ? void 0 : b[v]) !== null && h !== void 0 ? h : b;
    };
    return e != null && e.hasOwnProperty("_usept") ? {
      _usept: e._usept,
      originalValue: s(e.originalValue),
      value: s(e.value)
    } : s(e);
  },
  _usePT: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0, i = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0, u = arguments.length > 4 ? arguments[4] : void 0, f = function(G) {
      return i(G, s, u);
    };
    if (n != null && n.hasOwnProperty("_usept")) {
      var h, b = n._usept || ((h = e.$primevueConfig) === null || h === void 0 ? void 0 : h.ptOptions) || {}, v = b.mergeSections, p = v === void 0 ? !0 : v, O = b.mergeProps, $ = O === void 0 ? !1 : O, I = f(n.originalValue), A = f(n.value);
      return I === void 0 && A === void 0 ? void 0 : Ze(A) ? A : Ze(I) ? I : p || !p && A ? $ ? se._mergeProps(e, $, I, A) : fe(fe({}, I), A) : A;
    }
    return f(n);
  },
  _useDefaultPT: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = arguments.length > 2 ? arguments[2] : void 0, s = arguments.length > 3 ? arguments[3] : void 0, u = arguments.length > 4 ? arguments[4] : void 0;
    return se._usePT(e, n, i, s, u);
  },
  _loadStyles: function(e, n, i) {
    var s, u = se._getConfig(n, i), f = {
      nonce: u == null || (s = u.csp) === null || s === void 0 ? void 0 : s.nonce
    };
    se._loadCoreStyles(e.$instance, f), se._loadThemeStyles(e.$instance, f), se._loadScopedThemeStyles(e.$instance, f), se._themeChangeListener(function() {
      return se._loadThemeStyles(e.$instance, f);
    });
  },
  _loadCoreStyles: function() {
    var e, n, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, s = arguments.length > 1 ? arguments[1] : void 0;
    if (!Mn.isStyleNameLoaded((e = i.$style) === null || e === void 0 ? void 0 : e.name) && (n = i.$style) !== null && n !== void 0 && n.name) {
      var u;
      Ie.loadCSS(s), (u = i.$style) === null || u === void 0 || u.loadCSS(s), Mn.setLoadedStyleName(i.$style.name);
    }
  },
  _loadThemeStyles: function() {
    var e, n, i, s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = arguments.length > 1 ? arguments[1] : void 0;
    if (!(s != null && s.isUnstyled() || (s == null || (e = s.theme) === null || e === void 0 ? void 0 : e.call(s)) === "none")) {
      if (!De.isStyleNameLoaded("common")) {
        var f, h, b = ((f = s.$style) === null || f === void 0 || (h = f.getCommonTheme) === null || h === void 0 ? void 0 : h.call(f)) || {}, v = b.primitive, p = b.semantic, O = b.global, $ = b.style;
        Ie.load(v == null ? void 0 : v.css, fe({
          name: "primitive-variables"
        }, u)), Ie.load(p == null ? void 0 : p.css, fe({
          name: "semantic-variables"
        }, u)), Ie.load(O == null ? void 0 : O.css, fe({
          name: "global-variables"
        }, u)), Ie.loadTheme(fe({
          name: "global-style"
        }, u), $), De.setLoadedStyleName("common");
      }
      if (!De.isStyleNameLoaded((n = s.$style) === null || n === void 0 ? void 0 : n.name) && (i = s.$style) !== null && i !== void 0 && i.name) {
        var I, A, q, G, ne = ((I = s.$style) === null || I === void 0 || (A = I.getDirectiveTheme) === null || A === void 0 ? void 0 : A.call(I)) || {}, ee = ne.css, V = ne.style;
        (q = s.$style) === null || q === void 0 || q.load(ee, fe({
          name: "".concat(s.$style.name, "-variables")
        }, u)), (G = s.$style) === null || G === void 0 || G.loadTheme(fe({
          name: "".concat(s.$style.name, "-style")
        }, u), V), De.setLoadedStyleName(s.$style.name);
      }
      if (!De.isStyleNameLoaded("layer-order")) {
        var U, ge, ce = (U = s.$style) === null || U === void 0 || (ge = U.getLayerOrderThemeCSS) === null || ge === void 0 ? void 0 : ge.call(U);
        Ie.load(ce, fe({
          name: "layer-order",
          first: !0
        }, u)), De.setLoadedStyleName("layer-order");
      }
    }
  },
  _loadScopedThemeStyles: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0, i = e.preset();
    if (i && e.$attrSelector) {
      var s, u, f, h = ((s = e.$style) === null || s === void 0 || (u = s.getPresetTheme) === null || u === void 0 ? void 0 : u.call(s, i, "[".concat(e.$attrSelector, "]"))) || {}, b = h.css, v = (f = e.$style) === null || f === void 0 ? void 0 : f.load(b, fe({
        name: "".concat(e.$attrSelector, "-").concat(e.$style.name)
      }, n));
      e.scopedStyleEl = v.el;
    }
  },
  _themeChangeListener: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : function() {
    };
    Mn.clearLoadedStyleNames(), wn.on("theme:change", e);
  },
  _hook: function(e, n, i, s, u, f) {
    var h, b, v = "on".concat(Ps(n)), p = se._getConfig(s, u), O = i == null ? void 0 : i.$instance, $ = se._usePT(O, se._getPT(s == null || (h = s.value) === null || h === void 0 ? void 0 : h.pt, e), se._getOptionValue, "hooks.".concat(v)), I = se._useDefaultPT(O, p == null || (b = p.pt) === null || b === void 0 || (b = b.directives) === null || b === void 0 ? void 0 : b[e], se._getOptionValue, "hooks.".concat(v)), A = {
      el: i,
      binding: s,
      vnode: u,
      prevVnode: f
    };
    $ == null || $(O, A), I == null || I(O, A);
  },
  _mergeProps: function() {
    for (var e = arguments.length > 1 ? arguments[1] : void 0, n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++)
      i[s - 2] = arguments[s];
    return Sr(e) ? e.apply(void 0, i) : j.apply(void 0, i);
  },
  _extend: function(e) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = function(f, h, b, v, p) {
      var O, $, I, A;
      h._$instances = h._$instances || {};
      var q = se._getConfig(b, v), G = h._$instances[e] || {}, ne = un(G) ? fe(fe({}, n), n == null ? void 0 : n.methods) : {};
      h._$instances[e] = fe(fe({}, G), {}, {
        /* new instance variables to pass in directive methods */
        $name: e,
        $host: h,
        $binding: b,
        $modifiers: b == null ? void 0 : b.modifiers,
        $value: b == null ? void 0 : b.value,
        $el: G.$el || h || void 0,
        $style: fe({
          classes: void 0,
          inlineStyles: void 0,
          load: function() {
          },
          loadCSS: function() {
          },
          loadTheme: function() {
          }
        }, n == null ? void 0 : n.style),
        $primevueConfig: q,
        $attrSelector: (O = h.$pd) === null || O === void 0 || (O = O[e]) === null || O === void 0 ? void 0 : O.attrSelector,
        /* computed instance variables */
        defaultPT: function() {
          return se._getPT(q == null ? void 0 : q.pt, void 0, function(V) {
            var U;
            return V == null || (U = V.directives) === null || U === void 0 ? void 0 : U[e];
          });
        },
        isUnstyled: function() {
          var V, U;
          return ((V = h.$instance) === null || V === void 0 || (V = V.$binding) === null || V === void 0 || (V = V.value) === null || V === void 0 ? void 0 : V.unstyled) !== void 0 ? (U = h.$instance) === null || U === void 0 || (U = U.$binding) === null || U === void 0 || (U = U.value) === null || U === void 0 ? void 0 : U.unstyled : q == null ? void 0 : q.unstyled;
        },
        theme: function() {
          var V;
          return (V = h.$instance) === null || V === void 0 || (V = V.$primevueConfig) === null || V === void 0 ? void 0 : V.theme;
        },
        preset: function() {
          var V;
          return (V = h.$instance) === null || V === void 0 || (V = V.$binding) === null || V === void 0 || (V = V.value) === null || V === void 0 ? void 0 : V.dt;
        },
        /* instance's methods */
        ptm: function() {
          var V, U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", ge = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return se._getPTValue(h.$instance, (V = h.$instance) === null || V === void 0 || (V = V.$binding) === null || V === void 0 || (V = V.value) === null || V === void 0 ? void 0 : V.pt, U, fe({}, ge));
        },
        ptmo: function() {
          var V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", ge = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return se._getPTValue(h.$instance, V, U, ge, !1);
        },
        cx: function() {
          var V, U, ge = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", ce = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return (V = h.$instance) !== null && V !== void 0 && V.isUnstyled() ? void 0 : se._getOptionValue((U = h.$instance) === null || U === void 0 || (U = U.$style) === null || U === void 0 ? void 0 : U.classes, ge, fe({}, ce));
        },
        sx: function() {
          var V, U = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", ge = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0, ce = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return ge ? se._getOptionValue((V = h.$instance) === null || V === void 0 || (V = V.$style) === null || V === void 0 ? void 0 : V.inlineStyles, U, fe({}, ce)) : void 0;
        }
      }, ne), h.$instance = h._$instances[e], ($ = (I = h.$instance)[f]) === null || $ === void 0 || $.call(I, h, b, v, p), h["$".concat(e)] = h.$instance, se._hook(e, f, h, b, v, p), h.$pd || (h.$pd = {}), h.$pd[e] = fe(fe({}, (A = h.$pd) === null || A === void 0 ? void 0 : A[e]), {}, {
        name: e,
        instance: h.$instance
      });
    }, s = function(f) {
      var h, b, v, p, O, $ = (h = f.$instance) === null || h === void 0 ? void 0 : h.watch;
      $ == null || (b = $.config) === null || b === void 0 || b.call(f.$instance, (v = f.$instance) === null || v === void 0 ? void 0 : v.$primevueConfig), Mi.on("config:change", function(I) {
        var A, q = I.newValue, G = I.oldValue;
        return $ == null || (A = $.config) === null || A === void 0 ? void 0 : A.call(f.$instance, q, G);
      }), $ == null || (p = $["config.ripple"]) === null || p === void 0 || p.call(f.$instance, (O = f.$instance) === null || O === void 0 || (O = O.$primevueConfig) === null || O === void 0 ? void 0 : O.ripple), Mi.on("config:ripple:change", function(I) {
        var A, q = I.newValue, G = I.oldValue;
        return $ == null || (A = $["config.ripple"]) === null || A === void 0 ? void 0 : A.call(f.$instance, q, G);
      });
    };
    return {
      created: function(f, h, b, v) {
        f.$pd || (f.$pd = {}), f.$pd[e] = {
          name: e,
          attrSelector: Ao("pd")
        }, i("created", f, h, b, v);
      },
      beforeMount: function(f, h, b, v) {
        se._loadStyles(f, h, b), i("beforeMount", f, h, b, v), s(f);
      },
      mounted: function(f, h, b, v) {
        se._loadStyles(f, h, b), i("mounted", f, h, b, v);
      },
      beforeUpdate: function(f, h, b, v) {
        i("beforeUpdate", f, h, b, v);
      },
      updated: function(f, h, b, v) {
        se._loadStyles(f, h, b), i("updated", f, h, b, v);
      },
      beforeUnmount: function(f, h, b, v) {
        i("beforeUnmount", f, h, b, v);
      },
      unmounted: function(f, h, b, v) {
        var p;
        (p = f.$instance) === null || p === void 0 || (p = p.scopedStyleEl) === null || p === void 0 || (p = p.value) === null || p === void 0 || p.remove(), i("unmounted", f, h, b, v);
      }
    };
  },
  extend: function() {
    var e = se._getMeta.apply(se, arguments), n = Ii(e, 2), i = n[0], s = n[1];
    return fe({
      extend: function() {
        var f = se._getMeta.apply(se, arguments), h = Ii(f, 2), b = h[0], v = h[1];
        return se.extend(b, fe(fe(fe({}, s), s == null ? void 0 : s.methods), v));
      }
    }, se._extend(i, s));
  }
}, zu = function(e) {
  var n = e.dt;
  return `
.p-ink {
    display: block;
    position: absolute;
    background: `.concat(n("ripple.background"), `;
    border-radius: 100%;
    transform: scale(0);
    pointer-events: none;
}

.p-ink-active {
    animation: ripple 0.4s linear;
}

@keyframes ripple {
    100% {
        opacity: 0;
        transform: scale(2.5);
    }
}
`);
}, Hu = {
  root: "p-ink"
}, qu = Ie.extend({
  name: "ripple-directive",
  theme: zu,
  classes: Hu
}), Uu = se.extend({
  style: qu
});
function Bt(t) {
  "@babel/helpers - typeof";
  return Bt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Bt(t);
}
function Wu(t) {
  return Xu(t) || Qu(t) || Gu(t) || Zu();
}
function Zu() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gu(t, e) {
  if (t) {
    if (typeof t == "string") return xo(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? xo(t, e) : void 0;
  }
}
function Qu(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function Xu(t) {
  if (Array.isArray(t)) return xo(t);
}
function xo(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
function ji(t, e, n) {
  return (e = Ju(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Ju(t) {
  var e = el(t, "string");
  return Bt(e) == "symbol" ? e : e + "";
}
function el(t, e) {
  if (Bt(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (Bt(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var Bo = Uu.extend("ripple", {
  watch: {
    "config.ripple": function(e) {
      e ? (this.createRipple(this.$host), this.bindEvents(this.$host), this.$host.setAttribute("data-pd-ripple", !0), this.$host.style.overflow = "hidden", this.$host.style.position = "relative") : (this.remove(this.$host), this.$host.removeAttribute("data-pd-ripple"));
    }
  },
  unmounted: function(e) {
    this.remove(e);
  },
  timeout: void 0,
  methods: {
    bindEvents: function(e) {
      e.addEventListener("mousedown", this.onMouseDown.bind(this));
    },
    unbindEvents: function(e) {
      e.removeEventListener("mousedown", this.onMouseDown.bind(this));
    },
    createRipple: function(e) {
      var n = bs("span", ji(ji({
        role: "presentation",
        "aria-hidden": !0,
        "data-p-ink": !0,
        "data-p-ink-active": !1,
        class: !this.isUnstyled() && this.cx("root"),
        onAnimationEnd: this.onAnimationEnd.bind(this)
      }, this.$attrSelector, ""), "p-bind", this.ptm("root")));
      e.appendChild(n), this.$el = n;
    },
    remove: function(e) {
      var n = this.getInk(e);
      n && (this.$host.style.overflow = "", this.$host.style.position = "", this.unbindEvents(e), n.removeEventListener("animationend", this.onAnimationEnd), n.remove());
    },
    onMouseDown: function(e) {
      var n = this, i = e.currentTarget, s = this.getInk(i);
      if (!(!s || getComputedStyle(s, null).display === "none")) {
        if (!this.isUnstyled() && fo(s, "p-ink-active"), s.setAttribute("data-p-ink-active", "false"), !hi(s) && !mi(s)) {
          var u = Math.max(br(i), ys(i));
          s.style.height = u + "px", s.style.width = u + "px";
        }
        var f = gs(i), h = e.pageX - f.left + document.body.scrollTop - mi(s) / 2, b = e.pageY - f.top + document.body.scrollLeft - hi(s) / 2;
        s.style.top = b + "px", s.style.left = h + "px", !this.isUnstyled() && ls(s, "p-ink-active"), s.setAttribute("data-p-ink-active", "true"), this.timeout = setTimeout(function() {
          s && (!n.isUnstyled() && fo(s, "p-ink-active"), s.setAttribute("data-p-ink-active", "false"));
        }, 401);
      }
    },
    onAnimationEnd: function(e) {
      this.timeout && clearTimeout(this.timeout), !this.isUnstyled() && fo(e.currentTarget, "p-ink-active"), e.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function(e) {
      return e && e.children ? Wu(e.children).find(function(n) {
        return Un(n, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
});
function jt(t) {
  "@babel/helpers - typeof";
  return jt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, jt(t);
}
function fn(t, e, n) {
  return (e = nl(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function nl(t) {
  var e = tl(t, "string");
  return jt(e) == "symbol" ? e : e + "";
}
function tl(t, e) {
  if (jt(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (jt(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var rl = function(e) {
  var n = e.dt;
  return `
.p-button {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: `.concat(n("button.primary.color"), `;
    background: `).concat(n("button.primary.background"), `;
    border: 1px solid `).concat(n("button.primary.border.color"), `;
    padding: `).concat(n("button.padding.y"), " ").concat(n("button.padding.x"), `;
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background `).concat(n("button.transition.duration"), ", color ").concat(n("button.transition.duration"), ", border-color ").concat(n("button.transition.duration"), `,
            outline-color `).concat(n("button.transition.duration"), ", box-shadow ").concat(n("button.transition.duration"), `;
    border-radius: `).concat(n("button.border.radius"), `;
    outline-color: transparent;
    gap: `).concat(n("button.gap"), `;
}

.p-button:disabled {
    cursor: default;
}

.p-button-icon-right {
    order: 1;
}

.p-button-icon-right:dir(rtl) {
    order: -1;
}

.p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
    order: 1;
}

.p-button-icon-bottom {
    order: 2;
}

.p-button-icon-only {
    width: `).concat(n("button.icon.only.width"), `;
    padding-inline-start: 0;
    padding-inline-end: 0;
    gap: 0;
}

.p-button-icon-only.p-button-rounded {
    border-radius: 50%;
    height: `).concat(n("button.icon.only.width"), `;
}

.p-button-icon-only .p-button-label {
    visibility: hidden;
    width: 0;
}

.p-button-sm {
    font-size: `).concat(n("button.sm.font.size"), `;
    padding: `).concat(n("button.sm.padding.y"), " ").concat(n("button.sm.padding.x"), `;
}

.p-button-sm .p-button-icon {
    font-size: `).concat(n("button.sm.font.size"), `;
}

.p-button-lg {
    font-size: `).concat(n("button.lg.font.size"), `;
    padding: `).concat(n("button.lg.padding.y"), " ").concat(n("button.lg.padding.x"), `;
}

.p-button-lg .p-button-icon {
    font-size: `).concat(n("button.lg.font.size"), `;
}

.p-button-vertical {
    flex-direction: column;
}

.p-button-label {
    font-weight: `).concat(n("button.label.font.weight"), `;
}

.p-button-fluid {
    width: 100%;
}

.p-button-fluid.p-button-icon-only {
    width: `).concat(n("button.icon.only.width"), `;
}

.p-button:not(:disabled):hover {
    background: `).concat(n("button.primary.hover.background"), `;
    border: 1px solid `).concat(n("button.primary.hover.border.color"), `;
    color: `).concat(n("button.primary.hover.color"), `;
}

.p-button:not(:disabled):active {
    background: `).concat(n("button.primary.active.background"), `;
    border: 1px solid `).concat(n("button.primary.active.border.color"), `;
    color: `).concat(n("button.primary.active.color"), `;
}

.p-button:focus-visible {
    box-shadow: `).concat(n("button.primary.focus.ring.shadow"), `;
    outline: `).concat(n("button.focus.ring.width"), " ").concat(n("button.focus.ring.style"), " ").concat(n("button.primary.focus.ring.color"), `;
    outline-offset: `).concat(n("button.focus.ring.offset"), `;
}

.p-button .p-badge {
    min-width: `).concat(n("button.badge.size"), `;
    height: `).concat(n("button.badge.size"), `;
    line-height: `).concat(n("button.badge.size"), `;
}

.p-button-raised {
    box-shadow: `).concat(n("button.raised.shadow"), `;
}

.p-button-rounded {
    border-radius: `).concat(n("button.rounded.border.radius"), `;
}

.p-button-secondary {
    background: `).concat(n("button.secondary.background"), `;
    border: 1px solid `).concat(n("button.secondary.border.color"), `;
    color: `).concat(n("button.secondary.color"), `;
}

.p-button-secondary:not(:disabled):hover {
    background: `).concat(n("button.secondary.hover.background"), `;
    border: 1px solid `).concat(n("button.secondary.hover.border.color"), `;
    color: `).concat(n("button.secondary.hover.color"), `;
}

.p-button-secondary:not(:disabled):active {
    background: `).concat(n("button.secondary.active.background"), `;
    border: 1px solid `).concat(n("button.secondary.active.border.color"), `;
    color: `).concat(n("button.secondary.active.color"), `;
}

.p-button-secondary:focus-visible {
    outline-color: `).concat(n("button.secondary.focus.ring.color"), `;
    box-shadow: `).concat(n("button.secondary.focus.ring.shadow"), `;
}

.p-button-success {
    background: `).concat(n("button.success.background"), `;
    border: 1px solid `).concat(n("button.success.border.color"), `;
    color: `).concat(n("button.success.color"), `;
}

.p-button-success:not(:disabled):hover {
    background: `).concat(n("button.success.hover.background"), `;
    border: 1px solid `).concat(n("button.success.hover.border.color"), `;
    color: `).concat(n("button.success.hover.color"), `;
}

.p-button-success:not(:disabled):active {
    background: `).concat(n("button.success.active.background"), `;
    border: 1px solid `).concat(n("button.success.active.border.color"), `;
    color: `).concat(n("button.success.active.color"), `;
}

.p-button-success:focus-visible {
    outline-color: `).concat(n("button.success.focus.ring.color"), `;
    box-shadow: `).concat(n("button.success.focus.ring.shadow"), `;
}

.p-button-info {
    background: `).concat(n("button.info.background"), `;
    border: 1px solid `).concat(n("button.info.border.color"), `;
    color: `).concat(n("button.info.color"), `;
}

.p-button-info:not(:disabled):hover {
    background: `).concat(n("button.info.hover.background"), `;
    border: 1px solid `).concat(n("button.info.hover.border.color"), `;
    color: `).concat(n("button.info.hover.color"), `;
}

.p-button-info:not(:disabled):active {
    background: `).concat(n("button.info.active.background"), `;
    border: 1px solid `).concat(n("button.info.active.border.color"), `;
    color: `).concat(n("button.info.active.color"), `;
}

.p-button-info:focus-visible {
    outline-color: `).concat(n("button.info.focus.ring.color"), `;
    box-shadow: `).concat(n("button.info.focus.ring.shadow"), `;
}

.p-button-warn {
    background: `).concat(n("button.warn.background"), `;
    border: 1px solid `).concat(n("button.warn.border.color"), `;
    color: `).concat(n("button.warn.color"), `;
}

.p-button-warn:not(:disabled):hover {
    background: `).concat(n("button.warn.hover.background"), `;
    border: 1px solid `).concat(n("button.warn.hover.border.color"), `;
    color: `).concat(n("button.warn.hover.color"), `;
}

.p-button-warn:not(:disabled):active {
    background: `).concat(n("button.warn.active.background"), `;
    border: 1px solid `).concat(n("button.warn.active.border.color"), `;
    color: `).concat(n("button.warn.active.color"), `;
}

.p-button-warn:focus-visible {
    outline-color: `).concat(n("button.warn.focus.ring.color"), `;
    box-shadow: `).concat(n("button.warn.focus.ring.shadow"), `;
}

.p-button-help {
    background: `).concat(n("button.help.background"), `;
    border: 1px solid `).concat(n("button.help.border.color"), `;
    color: `).concat(n("button.help.color"), `;
}

.p-button-help:not(:disabled):hover {
    background: `).concat(n("button.help.hover.background"), `;
    border: 1px solid `).concat(n("button.help.hover.border.color"), `;
    color: `).concat(n("button.help.hover.color"), `;
}

.p-button-help:not(:disabled):active {
    background: `).concat(n("button.help.active.background"), `;
    border: 1px solid `).concat(n("button.help.active.border.color"), `;
    color: `).concat(n("button.help.active.color"), `;
}

.p-button-help:focus-visible {
    outline-color: `).concat(n("button.help.focus.ring.color"), `;
    box-shadow: `).concat(n("button.help.focus.ring.shadow"), `;
}

.p-button-danger {
    background: `).concat(n("button.danger.background"), `;
    border: 1px solid `).concat(n("button.danger.border.color"), `;
    color: `).concat(n("button.danger.color"), `;
}

.p-button-danger:not(:disabled):hover {
    background: `).concat(n("button.danger.hover.background"), `;
    border: 1px solid `).concat(n("button.danger.hover.border.color"), `;
    color: `).concat(n("button.danger.hover.color"), `;
}

.p-button-danger:not(:disabled):active {
    background: `).concat(n("button.danger.active.background"), `;
    border: 1px solid `).concat(n("button.danger.active.border.color"), `;
    color: `).concat(n("button.danger.active.color"), `;
}

.p-button-danger:focus-visible {
    outline-color: `).concat(n("button.danger.focus.ring.color"), `;
    box-shadow: `).concat(n("button.danger.focus.ring.shadow"), `;
}

.p-button-contrast {
    background: `).concat(n("button.contrast.background"), `;
    border: 1px solid `).concat(n("button.contrast.border.color"), `;
    color: `).concat(n("button.contrast.color"), `;
}

.p-button-contrast:not(:disabled):hover {
    background: `).concat(n("button.contrast.hover.background"), `;
    border: 1px solid `).concat(n("button.contrast.hover.border.color"), `;
    color: `).concat(n("button.contrast.hover.color"), `;
}

.p-button-contrast:not(:disabled):active {
    background: `).concat(n("button.contrast.active.background"), `;
    border: 1px solid `).concat(n("button.contrast.active.border.color"), `;
    color: `).concat(n("button.contrast.active.color"), `;
}

.p-button-contrast:focus-visible {
    outline-color: `).concat(n("button.contrast.focus.ring.color"), `;
    box-shadow: `).concat(n("button.contrast.focus.ring.shadow"), `;
}

.p-button-outlined {
    background: transparent;
    border-color: `).concat(n("button.outlined.primary.border.color"), `;
    color: `).concat(n("button.outlined.primary.color"), `;
}

.p-button-outlined:not(:disabled):hover {
    background: `).concat(n("button.outlined.primary.hover.background"), `;
    border-color: `).concat(n("button.outlined.primary.border.color"), `;
    color: `).concat(n("button.outlined.primary.color"), `;
}

.p-button-outlined:not(:disabled):active {
    background: `).concat(n("button.outlined.primary.active.background"), `;
    border-color: `).concat(n("button.outlined.primary.border.color"), `;
    color: `).concat(n("button.outlined.primary.color"), `;
}

.p-button-outlined.p-button-secondary {
    border-color: `).concat(n("button.outlined.secondary.border.color"), `;
    color: `).concat(n("button.outlined.secondary.color"), `;
}

.p-button-outlined.p-button-secondary:not(:disabled):hover {
    background: `).concat(n("button.outlined.secondary.hover.background"), `;
    border-color: `).concat(n("button.outlined.secondary.border.color"), `;
    color: `).concat(n("button.outlined.secondary.color"), `;
}

.p-button-outlined.p-button-secondary:not(:disabled):active {
    background: `).concat(n("button.outlined.secondary.active.background"), `;
    border-color: `).concat(n("button.outlined.secondary.border.color"), `;
    color: `).concat(n("button.outlined.secondary.color"), `;
}

.p-button-outlined.p-button-success {
    border-color: `).concat(n("button.outlined.success.border.color"), `;
    color: `).concat(n("button.outlined.success.color"), `;
}

.p-button-outlined.p-button-success:not(:disabled):hover {
    background: `).concat(n("button.outlined.success.hover.background"), `;
    border-color: `).concat(n("button.outlined.success.border.color"), `;
    color: `).concat(n("button.outlined.success.color"), `;
}

.p-button-outlined.p-button-success:not(:disabled):active {
    background: `).concat(n("button.outlined.success.active.background"), `;
    border-color: `).concat(n("button.outlined.success.border.color"), `;
    color: `).concat(n("button.outlined.success.color"), `;
}

.p-button-outlined.p-button-info {
    border-color: `).concat(n("button.outlined.info.border.color"), `;
    color: `).concat(n("button.outlined.info.color"), `;
}

.p-button-outlined.p-button-info:not(:disabled):hover {
    background: `).concat(n("button.outlined.info.hover.background"), `;
    border-color: `).concat(n("button.outlined.info.border.color"), `;
    color: `).concat(n("button.outlined.info.color"), `;
}

.p-button-outlined.p-button-info:not(:disabled):active {
    background: `).concat(n("button.outlined.info.active.background"), `;
    border-color: `).concat(n("button.outlined.info.border.color"), `;
    color: `).concat(n("button.outlined.info.color"), `;
}

.p-button-outlined.p-button-warn {
    border-color: `).concat(n("button.outlined.warn.border.color"), `;
    color: `).concat(n("button.outlined.warn.color"), `;
}

.p-button-outlined.p-button-warn:not(:disabled):hover {
    background: `).concat(n("button.outlined.warn.hover.background"), `;
    border-color: `).concat(n("button.outlined.warn.border.color"), `;
    color: `).concat(n("button.outlined.warn.color"), `;
}

.p-button-outlined.p-button-warn:not(:disabled):active {
    background: `).concat(n("button.outlined.warn.active.background"), `;
    border-color: `).concat(n("button.outlined.warn.border.color"), `;
    color: `).concat(n("button.outlined.warn.color"), `;
}

.p-button-outlined.p-button-help {
    border-color: `).concat(n("button.outlined.help.border.color"), `;
    color: `).concat(n("button.outlined.help.color"), `;
}

.p-button-outlined.p-button-help:not(:disabled):hover {
    background: `).concat(n("button.outlined.help.hover.background"), `;
    border-color: `).concat(n("button.outlined.help.border.color"), `;
    color: `).concat(n("button.outlined.help.color"), `;
}

.p-button-outlined.p-button-help:not(:disabled):active {
    background: `).concat(n("button.outlined.help.active.background"), `;
    border-color: `).concat(n("button.outlined.help.border.color"), `;
    color: `).concat(n("button.outlined.help.color"), `;
}

.p-button-outlined.p-button-danger {
    border-color: `).concat(n("button.outlined.danger.border.color"), `;
    color: `).concat(n("button.outlined.danger.color"), `;
}

.p-button-outlined.p-button-danger:not(:disabled):hover {
    background: `).concat(n("button.outlined.danger.hover.background"), `;
    border-color: `).concat(n("button.outlined.danger.border.color"), `;
    color: `).concat(n("button.outlined.danger.color"), `;
}

.p-button-outlined.p-button-danger:not(:disabled):active {
    background: `).concat(n("button.outlined.danger.active.background"), `;
    border-color: `).concat(n("button.outlined.danger.border.color"), `;
    color: `).concat(n("button.outlined.danger.color"), `;
}

.p-button-outlined.p-button-contrast {
    border-color: `).concat(n("button.outlined.contrast.border.color"), `;
    color: `).concat(n("button.outlined.contrast.color"), `;
}

.p-button-outlined.p-button-contrast:not(:disabled):hover {
    background: `).concat(n("button.outlined.contrast.hover.background"), `;
    border-color: `).concat(n("button.outlined.contrast.border.color"), `;
    color: `).concat(n("button.outlined.contrast.color"), `;
}

.p-button-outlined.p-button-contrast:not(:disabled):active {
    background: `).concat(n("button.outlined.contrast.active.background"), `;
    border-color: `).concat(n("button.outlined.contrast.border.color"), `;
    color: `).concat(n("button.outlined.contrast.color"), `;
}

.p-button-outlined.p-button-plain {
    border-color: `).concat(n("button.outlined.plain.border.color"), `;
    color: `).concat(n("button.outlined.plain.color"), `;
}

.p-button-outlined.p-button-plain:not(:disabled):hover {
    background: `).concat(n("button.outlined.plain.hover.background"), `;
    border-color: `).concat(n("button.outlined.plain.border.color"), `;
    color: `).concat(n("button.outlined.plain.color"), `;
}

.p-button-outlined.p-button-plain:not(:disabled):active {
    background: `).concat(n("button.outlined.plain.active.background"), `;
    border-color: `).concat(n("button.outlined.plain.border.color"), `;
    color: `).concat(n("button.outlined.plain.color"), `;
}

.p-button-text {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.primary.color"), `;
}

.p-button-text:not(:disabled):hover {
    background: `).concat(n("button.text.primary.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.primary.color"), `;
}

.p-button-text:not(:disabled):active {
    background: `).concat(n("button.text.primary.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.primary.color"), `;
}

.p-button-text.p-button-secondary {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.secondary.color"), `;
}

.p-button-text.p-button-secondary:not(:disabled):hover {
    background: `).concat(n("button.text.secondary.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.secondary.color"), `;
}

.p-button-text.p-button-secondary:not(:disabled):active {
    background: `).concat(n("button.text.secondary.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.secondary.color"), `;
}

.p-button-text.p-button-success {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.success.color"), `;
}

.p-button-text.p-button-success:not(:disabled):hover {
    background: `).concat(n("button.text.success.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.success.color"), `;
}

.p-button-text.p-button-success:not(:disabled):active {
    background: `).concat(n("button.text.success.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.success.color"), `;
}

.p-button-text.p-button-info {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.info.color"), `;
}

.p-button-text.p-button-info:not(:disabled):hover {
    background: `).concat(n("button.text.info.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.info.color"), `;
}

.p-button-text.p-button-info:not(:disabled):active {
    background: `).concat(n("button.text.info.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.info.color"), `;
}

.p-button-text.p-button-warn {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.warn.color"), `;
}

.p-button-text.p-button-warn:not(:disabled):hover {
    background: `).concat(n("button.text.warn.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.warn.color"), `;
}

.p-button-text.p-button-warn:not(:disabled):active {
    background: `).concat(n("button.text.warn.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.warn.color"), `;
}

.p-button-text.p-button-help {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.help.color"), `;
}

.p-button-text.p-button-help:not(:disabled):hover {
    background: `).concat(n("button.text.help.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.help.color"), `;
}

.p-button-text.p-button-help:not(:disabled):active {
    background: `).concat(n("button.text.help.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.help.color"), `;
}

.p-button-text.p-button-danger {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.danger.color"), `;
}

.p-button-text.p-button-danger:not(:disabled):hover {
    background: `).concat(n("button.text.danger.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.danger.color"), `;
}

.p-button-text.p-button-danger:not(:disabled):active {
    background: `).concat(n("button.text.danger.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.danger.color"), `;
}

.p-button-text.p-button-contrast {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.contrast.color"), `;
}

.p-button-text.p-button-contrast:not(:disabled):hover {
    background: `).concat(n("button.text.contrast.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.contrast.color"), `;
}

.p-button-text.p-button-contrast:not(:disabled):active {
    background: `).concat(n("button.text.contrast.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.contrast.color"), `;
}

.p-button-text.p-button-plain {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.text.plain.color"), `;
}

.p-button-text.p-button-plain:not(:disabled):hover {
    background: `).concat(n("button.text.plain.hover.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.plain.color"), `;
}

.p-button-text.p-button-plain:not(:disabled):active {
    background: `).concat(n("button.text.plain.active.background"), `;
    border-color: transparent;
    color: `).concat(n("button.text.plain.color"), `;
}

.p-button-link {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.link.color"), `;
}

.p-button-link:not(:disabled):hover {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.link.hover.color"), `;
}

.p-button-link:not(:disabled):hover .p-button-label {
    text-decoration: underline;
}

.p-button-link:not(:disabled):active {
    background: transparent;
    border-color: transparent;
    color: `).concat(n("button.link.active.color"), `;
}
`);
}, ol = {
  root: function(e) {
    var n = e.instance, i = e.props;
    return ["p-button p-component", fn(fn(fn(fn(fn(fn(fn(fn(fn({
      "p-button-icon-only": n.hasIcon && !i.label && !i.badge,
      "p-button-vertical": (i.iconPos === "top" || i.iconPos === "bottom") && i.label,
      "p-button-loading": i.loading,
      "p-button-link": i.link || i.variant === "link"
    }, "p-button-".concat(i.severity), i.severity), "p-button-raised", i.raised), "p-button-rounded", i.rounded), "p-button-text", i.text || i.variant === "text"), "p-button-outlined", i.outlined || i.variant === "outlined"), "p-button-sm", i.size === "small"), "p-button-lg", i.size === "large"), "p-button-plain", i.plain), "p-button-fluid", n.hasFluid)];
  },
  loadingIcon: "p-button-loading-icon",
  icon: function(e) {
    var n = e.props;
    return ["p-button-icon", fn({}, "p-button-icon-".concat(n.iconPos), n.label)];
  },
  label: "p-button-label"
}, il = Ie.extend({
  name: "button",
  theme: rl,
  classes: ol
}), al = {
  name: "BaseButton",
  extends: Lt,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconPos: {
      type: String,
      default: "left"
    },
    iconClass: {
      type: [String, Object],
      default: null
    },
    badge: {
      type: String,
      default: null
    },
    badgeClass: {
      type: [String, Object],
      default: null
    },
    badgeSeverity: {
      type: String,
      default: "secondary"
    },
    loading: {
      type: Boolean,
      default: !1
    },
    loadingIcon: {
      type: String,
      default: void 0
    },
    as: {
      type: [String, Object],
      default: "BUTTON"
    },
    asChild: {
      type: Boolean,
      default: !1
    },
    link: {
      type: Boolean,
      default: !1
    },
    severity: {
      type: String,
      default: null
    },
    raised: {
      type: Boolean,
      default: !1
    },
    rounded: {
      type: Boolean,
      default: !1
    },
    text: {
      type: Boolean,
      default: !1
    },
    outlined: {
      type: Boolean,
      default: !1
    },
    size: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    },
    plain: {
      type: Boolean,
      default: !1
    },
    fluid: {
      type: Boolean,
      default: null
    }
  },
  style: il,
  provide: function() {
    return {
      $pcButton: this,
      $parentInstance: this
    };
  }
}, ca = {
  name: "Button",
  extends: al,
  inheritAttrs: !1,
  inject: {
    $pcFluid: {
      default: null
    }
  },
  methods: {
    getPTOptions: function(e) {
      var n = e === "root" ? this.ptmi : this.ptm;
      return n(e, {
        context: {
          disabled: this.disabled
        }
      });
    }
  },
  computed: {
    disabled: function() {
      return this.$attrs.disabled || this.$attrs.disabled === "" || this.loading;
    },
    defaultAriaLabel: function() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs.ariaLabel;
    },
    hasIcon: function() {
      return this.icon || this.$slots.icon;
    },
    attrs: function() {
      return j(this.asAttrs, this.a11yAttrs, this.getPTOptions("root"));
    },
    asAttrs: function() {
      return this.as === "BUTTON" ? {
        type: "button",
        disabled: this.disabled
      } : void 0;
    },
    a11yAttrs: function() {
      return {
        "aria-label": this.defaultAriaLabel,
        "data-pc-name": "button",
        "data-p-disabled": this.disabled,
        "data-p-severity": this.severity
      };
    },
    hasFluid: function() {
      return un(this.fluid) ? !!this.$pcFluid : this.fluid;
    }
  },
  components: {
    SpinnerIcon: ua,
    Badge: la
  },
  directives: {
    ripple: Bo
  }
};
function sl(t, e, n, i, s, u) {
  var f = Zn("SpinnerIcon"), h = Zn("Badge"), b = Oo("ripple");
  return t.asChild ? ve(t.$slots, "default", {
    key: 1,
    class: En(t.cx("root")),
    a11yAttrs: u.a11yAttrs
  }) : $n((Y(), Te(Ue(t.as), j({
    key: 0,
    class: t.cx("root")
  }, u.attrs), {
    default: Fe(function() {
      return [ve(t.$slots, "default", {}, function() {
        return [t.loading ? ve(t.$slots, "loadingicon", j({
          key: 0,
          class: [t.cx("loadingIcon"), t.cx("icon")]
        }, t.ptm("loadingIcon")), function() {
          return [t.loadingIcon ? (Y(), J("span", j({
            key: 0,
            class: [t.cx("loadingIcon"), t.cx("icon"), t.loadingIcon]
          }, t.ptm("loadingIcon")), null, 16)) : (Y(), Te(f, j({
            key: 1,
            class: [t.cx("loadingIcon"), t.cx("icon")],
            spin: ""
          }, t.ptm("loadingIcon")), null, 16, ["class"]))];
        }) : ve(t.$slots, "icon", j({
          key: 1,
          class: [t.cx("icon")]
        }, t.ptm("icon")), function() {
          return [t.icon ? (Y(), J("span", j({
            key: 0,
            class: [t.cx("icon"), t.icon, t.iconClass]
          }, t.ptm("icon")), null, 16)) : me("", !0)];
        }), we("span", j({
          class: t.cx("label")
        }, t.ptm("label")), xe(t.label || " "), 17), t.badge ? (Y(), Te(h, {
          key: 2,
          value: t.badge,
          class: En(t.badgeClass),
          severity: t.badgeSeverity,
          unstyled: t.unstyled,
          pt: t.ptm("pcBadge")
        }, null, 8, ["value", "class", "severity", "unstyled", "pt"])) : me("", !0)];
      })];
    }),
    _: 3
  }, 16, ["class"])), [[b]]);
}
ca.render = sl;
var ul = {
  name: "BaseEditableHolder",
  extends: Lt,
  emits: ["update:modelValue", "value-change"],
  props: {
    modelValue: {
      type: null,
      default: void 0
    },
    defaultValue: {
      type: null,
      default: void 0
    },
    name: {
      type: String,
      default: void 0
    },
    invalid: {
      type: Boolean,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    formControl: {
      type: Object,
      default: void 0
    }
  },
  inject: {
    $parentInstance: {
      default: void 0
    },
    $pcForm: {
      default: void 0
    },
    $pcFormField: {
      default: void 0
    }
  },
  data: function() {
    return {
      d_value: this.defaultValue || this.modelValue
    };
  },
  watch: {
    modelValue: function(e) {
      this.d_value = e;
    },
    defaultValue: function(e) {
      this.d_value = e;
    },
    $formName: {
      immediate: !0,
      handler: function(e) {
        var n, i;
        this.formField = ((n = this.$pcForm) === null || n === void 0 || (i = n.register) === null || i === void 0 ? void 0 : i.call(n, e, this.$formControl)) || {};
      }
    },
    $formControl: {
      immediate: !0,
      handler: function(e) {
        var n, i;
        this.formField = ((n = this.$pcForm) === null || n === void 0 || (i = n.register) === null || i === void 0 ? void 0 : i.call(n, this.$formName, e)) || {};
      }
    },
    $formDefaultValue: {
      immediate: !0,
      handler: function(e) {
        this.d_value !== e && (this.d_value = e);
      }
    }
  },
  formField: {},
  methods: {
    writeValue: function(e, n) {
      var i, s;
      this.controlled && (this.d_value = e, this.$emit("update:modelValue", e)), this.$emit("value-change", e), (i = (s = this.formField).onChange) === null || i === void 0 || i.call(s, {
        originalEvent: n,
        value: e
      });
    }
  },
  computed: {
    $filled: function() {
      return be(this.d_value);
    },
    $invalid: function() {
      var e, n, i, s;
      return (e = (n = this.invalid) !== null && n !== void 0 ? n : (i = this.$pcFormField) === null || i === void 0 || (i = i.$field) === null || i === void 0 ? void 0 : i.invalid) !== null && e !== void 0 ? e : (s = this.$pcForm) === null || s === void 0 || (s = s.states) === null || s === void 0 || (s = s[this.$formName]) === null || s === void 0 ? void 0 : s.invalid;
    },
    $formName: function() {
      var e;
      return this.name || ((e = this.$formControl) === null || e === void 0 ? void 0 : e.name);
    },
    $formControl: function() {
      var e;
      return this.formControl || ((e = this.$pcFormField) === null || e === void 0 ? void 0 : e.formControl);
    },
    $formDefaultValue: function() {
      var e, n, i, s;
      return (e = (n = this.d_value) !== null && n !== void 0 ? n : (i = this.$pcFormField) === null || i === void 0 ? void 0 : i.initialValue) !== null && e !== void 0 ? e : (s = this.$pcForm) === null || s === void 0 || (s = s.initialValues) === null || s === void 0 ? void 0 : s[this.$formName];
    },
    controlled: function() {
      return this.$inProps.hasOwnProperty("modelValue") || !this.$inProps.hasOwnProperty("modelValue") && !this.$inProps.hasOwnProperty("defaultValue");
    },
    // @deprecated use $filled instead
    filled: function() {
      return this.$filled;
    }
  }
}, da = {
  name: "BaseInput",
  extends: ul,
  props: {
    size: {
      type: String,
      default: null
    },
    fluid: {
      type: Boolean,
      default: null
    },
    variant: {
      type: String,
      default: null
    }
  },
  inject: {
    $parentInstance: {
      default: void 0
    },
    $pcFluid: {
      default: void 0
    }
  },
  computed: {
    $variant: function() {
      var e;
      return (e = this.variant) !== null && e !== void 0 ? e : this.$primevue.config.inputStyle || this.$primevue.config.inputVariant;
    },
    $fluid: function() {
      var e;
      return (e = this.fluid) !== null && e !== void 0 ? e : !!this.$pcFluid;
    },
    // @deprecated use $fluid instead
    hasFluid: function() {
      return this.$fluid;
    }
  }
}, ll = function(e) {
  var n = e.dt;
  return `
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: `.concat(n("inputtext.color"), `;
    background: `).concat(n("inputtext.background"), `;
    padding-block: `).concat(n("inputtext.padding.y"), `;
    padding-inline: `).concat(n("inputtext.padding.x"), `;
    border: 1px solid `).concat(n("inputtext.border.color"), `;
    transition: background `).concat(n("inputtext.transition.duration"), ", color ").concat(n("inputtext.transition.duration"), ", border-color ").concat(n("inputtext.transition.duration"), ", outline-color ").concat(n("inputtext.transition.duration"), ", box-shadow ").concat(n("inputtext.transition.duration"), `;
    appearance: none;
    border-radius: `).concat(n("inputtext.border.radius"), `;
    outline-color: transparent;
    box-shadow: `).concat(n("inputtext.shadow"), `;
}

.p-inputtext:enabled:hover {
    border-color: `).concat(n("inputtext.hover.border.color"), `;
}

.p-inputtext:enabled:focus {
    border-color: `).concat(n("inputtext.focus.border.color"), `;
    box-shadow: `).concat(n("inputtext.focus.ring.shadow"), `;
    outline: `).concat(n("inputtext.focus.ring.width"), " ").concat(n("inputtext.focus.ring.style"), " ").concat(n("inputtext.focus.ring.color"), `;
    outline-offset: `).concat(n("inputtext.focus.ring.offset"), `;
}

.p-inputtext.p-invalid {
    border-color: `).concat(n("inputtext.invalid.border.color"), `;
}

.p-inputtext.p-variant-filled {
    background: `).concat(n("inputtext.filled.background"), `;
}

.p-inputtext.p-variant-filled:enabled:hover {
    background: `).concat(n("inputtext.filled.hover.background"), `;
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: `).concat(n("inputtext.filled.focus.background"), `;
}

.p-inputtext:disabled {
    opacity: 1;
    background: `).concat(n("inputtext.disabled.background"), `;
    color: `).concat(n("inputtext.disabled.color"), `;
}

.p-inputtext::placeholder {
    color: `).concat(n("inputtext.placeholder.color"), `;
}

.p-inputtext.p-invalid::placeholder {
    color: `).concat(n("inputtext.invalid.placeholder.color"), `;
}

.p-inputtext-sm {
    font-size: `).concat(n("inputtext.sm.font.size"), `;
    padding-block: `).concat(n("inputtext.sm.padding.y"), `;
    padding-inline: `).concat(n("inputtext.sm.padding.x"), `;
}

.p-inputtext-lg {
    font-size: `).concat(n("inputtext.lg.font.size"), `;
    padding-block: `).concat(n("inputtext.lg.padding.y"), `;
    padding-inline: `).concat(n("inputtext.lg.padding.x"), `;
}

.p-inputtext-fluid {
    width: 100%;
}
`);
}, cl = {
  root: function(e) {
    var n = e.instance, i = e.props;
    return ["p-inputtext p-component", {
      "p-filled": n.$filled,
      "p-inputtext-sm p-inputfield-sm": i.size === "small",
      "p-inputtext-lg p-inputfield-lg": i.size === "large",
      "p-invalid": n.$invalid,
      "p-variant-filled": n.$variant === "filled",
      "p-inputtext-fluid": n.$fluid
    }];
  }
}, dl = Ie.extend({
  name: "inputtext",
  theme: ll,
  classes: cl
}), fl = {
  name: "BaseInputText",
  extends: da,
  style: dl,
  provide: function() {
    return {
      $pcInputText: this,
      $parentInstance: this
    };
  }
}, fa = {
  name: "InputText",
  extends: fl,
  inheritAttrs: !1,
  methods: {
    onInput: function(e) {
      this.writeValue(e.target.value, e);
    }
  },
  computed: {
    attrs: function() {
      return j(this.ptmi("root", {
        context: {
          filled: this.$filled,
          disabled: this.disabled
        }
      }), this.formField);
    }
  }
}, pl = ["value", "disabled", "aria-invalid"];
function hl(t, e, n, i, s, u) {
  return Y(), J("input", j({
    type: "text",
    class: t.cx("root"),
    value: t.d_value,
    disabled: t.disabled,
    "aria-invalid": t.$invalid || void 0,
    onInput: e[0] || (e[0] = function() {
      return u.onInput && u.onInput.apply(u, arguments);
    })
  }, u.attrs), null, 16, pl);
}
fa.render = hl;
var ml = Io(), pa = {
  name: "Portal",
  props: {
    appendTo: {
      type: [String, Object],
      default: "body"
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  data: function() {
    return {
      mounted: !1
    };
  },
  mounted: function() {
    this.mounted = Eo();
  },
  computed: {
    inline: function() {
      return this.disabled || this.appendTo === "self";
    }
  }
};
function bl(t, e, n, i, s, u) {
  return u.inline ? ve(t.$slots, "default", {
    key: 0
  }) : s.mounted ? (Y(), Te(Ga, {
    key: 1,
    to: n.appendTo
  }, [ve(t.$slots, "default")], 8, ["to"])) : me("", !0);
}
pa.render = bl;
var gl = function(e) {
  var n = e.dt;
  return `
.p-datepicker {
    display: inline-flex;
    max-width: 100%;
}

.p-datepicker-input {
    flex: 1 1 auto;
    width: 1%;
}

.p-datepicker:has(.p-datepicker-dropdown) .p-datepicker-input {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
}

.p-datepicker-dropdown {
    cursor: pointer;
    display: inline-flex;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    width: `.concat(n("datepicker.dropdown.width"), `;
    border-start-end-radius: `).concat(n("datepicker.dropdown.border.radius"), `;
    border-end-end-radius: `).concat(n("datepicker.dropdown.border.radius"), `;
    background: `).concat(n("datepicker.dropdown.background"), `;
    border: 1px solid `).concat(n("datepicker.dropdown.border.color"), `;
    border-inline-start: 0 none;
    color: `).concat(n("datepicker.dropdown.color"), `;
    transition: background `).concat(n("datepicker.transition.duration"), ", color ").concat(n("datepicker.transition.duration"), ", border-color ").concat(n("datepicker.transition.duration"), ", outline-color ").concat(n("datepicker.transition.duration"), `;
    outline-color: transparent;
}

.p-datepicker-dropdown:not(:disabled):hover {
    background: `).concat(n("datepicker.dropdown.hover.background"), `;
    border-color: `).concat(n("datepicker.dropdown.hover.border.color"), `;
    color: `).concat(n("datepicker.dropdown.hover.color"), `;
}

.p-datepicker-dropdown:not(:disabled):active {
    background: `).concat(n("datepicker.dropdown.active.background"), `;
    border-color: `).concat(n("datepicker.dropdown.active.border.color"), `;
    color: `).concat(n("datepicker.dropdown.active.color"), `;
}

.p-datepicker-dropdown:focus-visible {
    box-shadow: `).concat(n("datepicker.dropdown.focus.ring.shadow"), `;
    outline: `).concat(n("datepicker.dropdown.focus.ring.width"), " ").concat(n("datepicker.dropdown.focus.ring.style"), " ").concat(n("datepicker.dropdown.focus.ring.color"), `;
    outline-offset: `).concat(n("datepicker.dropdown.focus.ring.offset"), `;
}

.p-datepicker:has(.p-datepicker-input-icon-container) {
    position: relative;
}

.p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-input {
    padding-inline-end: calc((`).concat(n("form.field.padding.x"), " * 2) + ").concat(n("icon.size"), `);
}

.p-datepicker-input-icon-container {
    cursor: pointer;
    position: absolute;
    top: 50%;
    inset-inline-end: `).concat(n("form.field.padding.x"), `;
    margin-block-start: calc(-1 * (`).concat(n("icon.size"), ` / 2));
    color: `).concat(n("datepicker.input.icon.color"), `;
    line-height: 1;
}

.p-datepicker-fluid {
    display: flex;
}

.p-datepicker-fluid .p-datepicker-input {
    width: 1%;
}

.p-datepicker .p-datepicker-panel {
    min-width: 100%;
}

.p-datepicker-panel {
    width: auto;
    padding: `).concat(n("datepicker.panel.padding"), `;
    background: `).concat(n("datepicker.panel.background"), `;
    color: `).concat(n("datepicker.panel.color"), `;
    border: 1px solid `).concat(n("datepicker.panel.border.color"), `;
    border-radius: `).concat(n("datepicker.panel.border.radius"), `;
    box-shadow: `).concat(n("datepicker.panel.shadow"), `;
}

.p-datepicker-panel-inline {
    display: inline-block;
    overflow-x: auto;
    box-shadow: none;
}

.p-datepicker-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: `).concat(n("datepicker.header.padding"), `;
    background: `).concat(n("datepicker.header.background"), `;
    color: `).concat(n("datepicker.header.color"), `;
    border-block-end: 1px solid `).concat(n("datepicker.header.border.color"), `;
}

.p-datepicker-next-button:dir(rtl) {
    order: -1;
}

.p-datepicker-prev-button:dir(rtl) {
    order: 1;
}

.p-datepicker-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: `).concat(n("datepicker.title.gap"), `;
    font-weight: `).concat(n("datepicker.title.font.weight"), `;
}

.p-datepicker-select-year,
.p-datepicker-select-month {
    border: none;
    background: transparent;
    margin: 0;
    cursor: pointer;
    font-weight: inherit;
    transition: background `).concat(n("datepicker.transition.duration"), ", color ").concat(n("datepicker.transition.duration"), ", border-color ").concat(n("datepicker.transition.duration"), ", outline-color ").concat(n("datepicker.transition.duration"), ", box-shadow ").concat(n("datepicker.transition.duration"), `;
}

.p-datepicker-select-month {
    padding: `).concat(n("datepicker.select.month.padding"), `;
    color: `).concat(n("datepicker.select.month.color"), `;
    border-radius: `).concat(n("datepicker.select.month.border.radius"), `;
}

.p-datepicker-select-year {
    padding: `).concat(n("datepicker.select.year.padding"), `;
    color: `).concat(n("datepicker.select.year.color"), `;
    border-radius: `).concat(n("datepicker.select.year.border.radius"), `;
}

.p-datepicker-select-month:enabled:hover {
    background: `).concat(n("datepicker.select.month.hover.background"), `;
    color: `).concat(n("datepicker.select.month.hover.color"), `;
}

.p-datepicker-select-year:enabled:hover {
    background: `).concat(n("datepicker.select.year.hover.background"), `;
    color: `).concat(n("datepicker.select.year.hover.color"), `;
}

.p-datepicker-select-month:focus-visible,
.p-datepicker-select-year:focus-visible {
    box-shadow: `).concat(n("datepicker.date.focus.ring.shadow"), `;
    outline: `).concat(n("datepicker.date.focus.ring.width"), " ").concat(n("datepicker.date.focus.ring.style"), " ").concat(n("datepicker.date.focus.ring.color"), `;
    outline-offset: `).concat(n("datepicker.date.focus.ring.offset"), `;
}

.p-datepicker-calendar-container {
    display: flex;
}

.p-datepicker-calendar-container .p-datepicker-calendar {
    flex: 1 1 auto;
    border-inline-start: 1px solid `).concat(n("datepicker.group.border.color"), `;
    padding-inline-end: `).concat(n("datepicker.group.gap"), `;
    padding-inline-start: `).concat(n("datepicker.group.gap"), `;
}

.p-datepicker-calendar-container .p-datepicker-calendar:first-child {
    padding-inline-start: 0;
    border-inline-start: 0 none;
}

.p-datepicker-calendar-container .p-datepicker-calendar:last-child {
    padding-inline-end: 0;
}

.p-datepicker-day-view {
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem;
    margin: `).concat(n("datepicker.day.view.margin"), `;
}

.p-datepicker-weekday-cell {
    padding: `).concat(n("datepicker.week.day.padding"), `;
}

.p-datepicker-weekday {
    font-weight: `).concat(n("datepicker.week.day.font.weight"), `;
    color: `).concat(n("datepicker.week.day.color"), `;
}

.p-datepicker-day-cell {
    padding: `).concat(n("datepicker.date.padding"), `;
}

.p-datepicker-day {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    width: `).concat(n("datepicker.date.width"), `;
    height: `).concat(n("datepicker.date.height"), `;
    border-radius: `).concat(n("datepicker.date.border.radius"), `;
    transition: background `).concat(n("datepicker.transition.duration"), ", color ").concat(n("datepicker.transition.duration"), ", border-color ").concat(n("datepicker.transition.duration"), ", box-shadow ").concat(n("datepicker.transition.duration"), ", outline-color ").concat(n("datepicker.transition.duration"), `;
    border: 1px solid transparent;
    outline-color: transparent;
    color: `).concat(n("datepicker.date.color"), `;
}

.p-datepicker-day:not(.p-datepicker-day-selected):not(.p-disabled):hover {
    background: `).concat(n("datepicker.date.hover.background"), `;
    color: `).concat(n("datepicker.date.hover.color"), `;
}

.p-datepicker-day:focus-visible {
    box-shadow: `).concat(n("datepicker.date.focus.ring.shadow"), `;
    outline: `).concat(n("datepicker.date.focus.ring.width"), " ").concat(n("datepicker.date.focus.ring.style"), " ").concat(n("datepicker.date.focus.ring.color"), `;
    outline-offset: `).concat(n("datepicker.date.focus.ring.offset"), `;
}

.p-datepicker-day-selected {
    background: `).concat(n("datepicker.date.selected.background"), `;
    color: `).concat(n("datepicker.date.selected.color"), `;
}

.p-datepicker-day-selected-range {
    background: `).concat(n("datepicker.date.range.selected.background"), `;
    color: `).concat(n("datepicker.date.range.selected.color"), `;
}

.p-datepicker-today > .p-datepicker-day {
    background: `).concat(n("datepicker.today.background"), `;
    color: `).concat(n("datepicker.today.color"), `;
}

.p-datepicker-today > .p-datepicker-day-selected {
    background: `).concat(n("datepicker.date.selected.background"), `;
    color: `).concat(n("datepicker.date.selected.color"), `;
}

.p-datepicker-today > .p-datepicker-day-selected-range {
    background: `).concat(n("datepicker.date.range.selected.background"), `;
    color: `).concat(n("datepicker.date.range.selected.color"), `;
}

.p-datepicker-weeknumber {
    text-align: center;
}

.p-datepicker-month-view {
    margin: `).concat(n("datepicker.month.view.margin"), `;
}

.p-datepicker-month {
    width: 33.3%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    padding: `).concat(n("datepicker.month.padding"), `;
    transition: background `).concat(n("datepicker.transition.duration"), ", color ").concat(n("datepicker.transition.duration"), ", border-color ").concat(n("datepicker.transition.duration"), ", box-shadow ").concat(n("datepicker.transition.duration"), ", outline-color ").concat(n("datepicker.transition.duration"), `;
    border-radius: `).concat(n("datepicker.month.border.radius"), `;
    outline-color: transparent;
    color: `).concat(n("datepicker.date.color"), `;
}

.p-datepicker-month:not(.p-disabled):not(.p-datepicker-month-selected):hover {
    color: `).concat(n("datepicker.date.hover.color"), `;
    background: `).concat(n("datepicker.date.hover.background"), `;
}

.p-datepicker-month-selected {
    color: `).concat(n("datepicker.date.selected.color"), `;
    background: `).concat(n("datepicker.date.selected.background"), `;
}

.p-datepicker-month:not(.p-disabled):focus-visible {
    box-shadow: `).concat(n("datepicker.date.focus.ring.shadow"), `;
    outline: `).concat(n("datepicker.date.focus.ring.width"), " ").concat(n("datepicker.date.focus.ring.style"), " ").concat(n("datepicker.date.focus.ring.color"), `;
    outline-offset: `).concat(n("datepicker.date.focus.ring.offset"), `;
}

.p-datepicker-year-view {
    margin: `).concat(n("datepicker.year.view.margin"), `;
}

.p-datepicker-year {
    width: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    padding: `).concat(n("datepicker.year.padding"), `;
    transition: background `).concat(n("datepicker.transition.duration"), ", color ").concat(n("datepicker.transition.duration"), ", border-color ").concat(n("datepicker.transition.duration"), ", box-shadow ").concat(n("datepicker.transition.duration"), ", outline-color ").concat(n("datepicker.transition.duration"), `;
    border-radius: `).concat(n("datepicker.year.border.radius"), `;
    outline-color: transparent;
    color: `).concat(n("datepicker.date.color"), `;
}

.p-datepicker-year:not(.p-disabled):not(.p-datepicker-year-selected):hover {
    color: `).concat(n("datepicker.date.hover.color"), `;
    background: `).concat(n("datepicker.date.hover.background"), `;
}

.p-datepicker-year-selected {
    color: `).concat(n("datepicker.date.selected.color"), `;
    background: `).concat(n("datepicker.date.selected.background"), `;
}

.p-datepicker-year:not(.p-disabled):focus-visible {
    box-shadow: `).concat(n("datepicker.date.focus.ring.shadow"), `;
    outline: `).concat(n("datepicker.date.focus.ring.width"), " ").concat(n("datepicker.date.focus.ring.style"), " ").concat(n("datepicker.date.focus.ring.color"), `;
    outline-offset: `).concat(n("datepicker.date.focus.ring.offset"), `;
}

.p-datepicker-buttonbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: `).concat(n("datepicker.buttonbar.padding"), `;
    border-block-start: 1px solid `).concat(n("datepicker.buttonbar.border.color"), `;
}

.p-datepicker-buttonbar .p-button {
    width: auto;
}

.p-datepicker-time-picker {
    display: flex;
    justify-content: center;
    align-items: center;
    border-block-start: 1px solid `).concat(n("datepicker.time.picker.border.color"), `;
    padding: 0;
    gap: `).concat(n("datepicker.time.picker.gap"), `;
}

.p-datepicker-calendar-container + .p-datepicker-time-picker {
    padding: `).concat(n("datepicker.time.picker.padding"), `;
}

.p-datepicker-time-picker > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: `).concat(n("datepicker.time.picker.button.gap"), `;
}

.p-datepicker-time-picker span {
    font-size: 1rem;
}

.p-datepicker-timeonly .p-datepicker-time-picker {
    border-block-start: 0 none;
}

.p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown {
    width: `).concat(n("datepicker.dropdown.sm.width"), `;
}

.p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown .p-icon,
.p-datepicker:has(.p-inputtext-sm) .p-datepicker-input-icon {
    font-size: `).concat(n("form.field.sm.font.size"), `;
    width: `).concat(n("form.field.sm.font.size"), `;
    height: `).concat(n("form.field.sm.font.size"), `;
}

.p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown {
    width: `).concat(n("datepicker.dropdown.lg.width"), `;
}

.p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown .p-icon,
.p-datepicker:has(.p-inputtext-lg) .p-datepicker-input-icon {
    font-size: `).concat(n("form.field.lg.font.size"), `;
    width: `).concat(n("form.field.lg.font.size"), `;
    height: `).concat(n("form.field.lg.font.size"), `;
}
`);
}, yl = {
  root: function(e) {
    var n = e.props;
    return {
      position: n.appendTo === "self" ? "relative" : void 0
    };
  }
}, vl = {
  root: function(e) {
    var n = e.instance, i = e.state;
    return ["p-datepicker p-component p-inputwrapper", {
      "p-invalid": n.$invalid,
      "p-inputwrapper-filled": n.$filled,
      "p-inputwrapper-focus": i.focused || i.overlayVisible,
      "p-focus": i.focused || i.overlayVisible,
      "p-datepicker-fluid": n.$fluid
    }];
  },
  pcInputText: "p-datepicker-input",
  dropdown: "p-datepicker-dropdown",
  inputIconContainer: "p-datepicker-input-icon-container",
  inputIcon: "p-datepicker-input-icon",
  panel: function(e) {
    var n = e.props;
    return ["p-datepicker-panel p-component", {
      "p-datepicker-panel-inline": n.inline,
      "p-disabled": n.disabled,
      "p-datepicker-timeonly": n.timeOnly
    }];
  },
  calendarContainer: "p-datepicker-calendar-container",
  calendar: "p-datepicker-calendar",
  header: "p-datepicker-header",
  pcPrevButton: "p-datepicker-prev-button",
  title: "p-datepicker-title",
  selectMonth: "p-datepicker-select-month",
  selectYear: "p-datepicker-select-year",
  decade: "p-datepicker-decade",
  pcNextButton: "p-datepicker-next-button",
  dayView: "p-datepicker-day-view",
  weekHeader: "p-datepicker-weekheader p-disabled",
  weekNumber: "p-datepicker-weeknumber",
  weekLabelContainer: "p-datepicker-weeklabel-container p-disabled",
  weekDayCell: "p-datepicker-weekday-cell",
  weekDay: "p-datepicker-weekday",
  dayCell: function(e) {
    var n = e.date;
    return ["p-datepicker-day-cell", {
      "p-datepicker-other-month": n.otherMonth,
      "p-datepicker-today": n.today
    }];
  },
  day: function(e) {
    var n = e.instance, i = e.props, s = e.date, u = "";
    return n.isRangeSelection() && n.isSelected(s) && s.selectable && (u = n.isDateEquals(i.modelValue[0], s) || n.isDateEquals(i.modelValue[1], s) ? "p-datepicker-day-selected" : "p-datepicker-day-selected-range"), ["p-datepicker-day", {
      "p-datepicker-day-selected": !n.isRangeSelection() && n.isSelected(s) && s.selectable,
      "p-disabled": i.disabled || !s.selectable
    }, u];
  },
  monthView: "p-datepicker-month-view",
  month: function(e) {
    var n = e.instance, i = e.props, s = e.month, u = e.index;
    return ["p-datepicker-month", {
      "p-datepicker-month-selected": n.isMonthSelected(u),
      "p-disabled": i.disabled || !s.selectable
    }];
  },
  yearView: "p-datepicker-year-view",
  year: function(e) {
    var n = e.instance, i = e.props, s = e.year;
    return ["p-datepicker-year", {
      "p-datepicker-year-selected": n.isYearSelected(s.value),
      "p-disabled": i.disabled || !s.selectable
    }];
  },
  timePicker: "p-datepicker-time-picker",
  hourPicker: "p-datepicker-hour-picker",
  pcIncrementButton: "p-datepicker-increment-button",
  pcDecrementButton: "p-datepicker-decrement-button",
  separator: "p-datepicker-separator",
  minutePicker: "p-datepicker-minute-picker",
  secondPicker: "p-datepicker-second-picker",
  ampmPicker: "p-datepicker-ampm-picker",
  buttonbar: "p-datepicker-buttonbar",
  pcTodayButton: "p-datepicker-today-button",
  pcClearButton: "p-datepicker-clear-button"
}, wl = Ie.extend({
  name: "datepicker",
  theme: gl,
  classes: vl,
  inlineStyles: yl
}), kl = {
  name: "BaseDatePicker",
  extends: da,
  props: {
    selectionMode: {
      type: String,
      default: "single"
    },
    dateFormat: {
      type: String,
      default: null
    },
    inline: {
      type: Boolean,
      default: !1
    },
    showOtherMonths: {
      type: Boolean,
      default: !0
    },
    selectOtherMonths: {
      type: Boolean,
      default: !1
    },
    showIcon: {
      type: Boolean,
      default: !1
    },
    iconDisplay: {
      type: String,
      default: "button"
    },
    icon: {
      type: String,
      default: void 0
    },
    prevIcon: {
      type: String,
      default: void 0
    },
    nextIcon: {
      type: String,
      default: void 0
    },
    incrementIcon: {
      type: String,
      default: void 0
    },
    decrementIcon: {
      type: String,
      default: void 0
    },
    numberOfMonths: {
      type: Number,
      default: 1
    },
    responsiveOptions: Array,
    breakpoint: {
      type: String,
      default: "769px"
    },
    view: {
      type: String,
      default: "date"
    },
    minDate: {
      type: Date,
      value: null
    },
    maxDate: {
      type: Date,
      value: null
    },
    disabledDates: {
      type: Array,
      value: null
    },
    disabledDays: {
      type: Array,
      value: null
    },
    maxDateCount: {
      type: Number,
      value: null
    },
    showOnFocus: {
      type: Boolean,
      default: !0
    },
    autoZIndex: {
      type: Boolean,
      default: !0
    },
    baseZIndex: {
      type: Number,
      default: 0
    },
    showButtonBar: {
      type: Boolean,
      default: !1
    },
    shortYearCutoff: {
      type: String,
      default: "+10"
    },
    showTime: {
      type: Boolean,
      default: !1
    },
    timeOnly: {
      type: Boolean,
      default: !1
    },
    hourFormat: {
      type: String,
      default: "24"
    },
    stepHour: {
      type: Number,
      default: 1
    },
    stepMinute: {
      type: Number,
      default: 1
    },
    stepSecond: {
      type: Number,
      default: 1
    },
    showSeconds: {
      type: Boolean,
      default: !1
    },
    hideOnDateTimeSelect: {
      type: Boolean,
      default: !1
    },
    hideOnRangeSelection: {
      type: Boolean,
      default: !1
    },
    timeSeparator: {
      type: String,
      default: ":"
    },
    showWeek: {
      type: Boolean,
      default: !1
    },
    manualInput: {
      type: Boolean,
      default: !0
    },
    appendTo: {
      type: [String, Object],
      default: "body"
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    },
    inputId: {
      type: String,
      default: null
    },
    inputClass: {
      type: [String, Object],
      default: null
    },
    inputStyle: {
      type: Object,
      default: null
    },
    panelClass: {
      type: [String, Object],
      default: null
    },
    panelStyle: {
      type: Object,
      default: null
    },
    todayButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary",
          text: !0,
          size: "small"
        };
      }
    },
    clearButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary",
          text: !0,
          size: "small"
        };
      }
    },
    navigatorButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary",
          text: !0,
          rounded: !0
        };
      }
    },
    timepickerButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary",
          text: !0,
          rounded: !0
        };
      }
    },
    ariaLabelledby: {
      type: String,
      default: null
    },
    ariaLabel: {
      type: String,
      default: null
    }
  },
  style: wl,
  provide: function() {
    return {
      $pcDatePicker: this,
      $parentInstance: this
    };
  }
};
function Do(t) {
  "@babel/helpers - typeof";
  return Do = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Do(t);
}
function bo(t) {
  return xl(t) || Cl(t) || ha(t) || Sl();
}
function Sl() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Cl(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null) return Array.from(t);
}
function xl(t) {
  if (Array.isArray(t)) return _o(t);
}
function go(t, e) {
  var n = typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (!n) {
    if (Array.isArray(t) || (n = ha(t)) || e) {
      n && (t = n);
      var i = 0, s = function() {
      };
      return { s, n: function() {
        return i >= t.length ? { done: !0 } : { done: !1, value: t[i++] };
      }, e: function(v) {
        throw v;
      }, f: s };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var u, f = !0, h = !1;
  return { s: function() {
    n = n.call(t);
  }, n: function() {
    var v = n.next();
    return f = v.done, v;
  }, e: function(v) {
    h = !0, u = v;
  }, f: function() {
    try {
      f || n.return == null || n.return();
    } finally {
      if (h) throw u;
    }
  } };
}
function ha(t, e) {
  if (t) {
    if (typeof t == "string") return _o(t, e);
    var n = {}.toString.call(t).slice(8, -1);
    return n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set" ? Array.from(t) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? _o(t, e) : void 0;
  }
}
function _o(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, i = Array(e); n < e; n++) i[n] = t[n];
  return i;
}
var ma = {
  name: "DatePicker",
  extends: kl,
  inheritAttrs: !1,
  emits: ["show", "hide", "input", "month-change", "year-change", "date-select", "today-click", "clear-click", "focus", "blur", "keydown"],
  inject: {
    $pcFluid: {
      default: null
    }
  },
  navigationState: null,
  timePickerChange: !1,
  scrollHandler: null,
  outsideClickListener: null,
  resizeListener: null,
  matchMediaListener: null,
  overlay: null,
  input: null,
  previousButton: null,
  nextButton: null,
  timePickerTimer: null,
  preventFocus: !1,
  typeUpdate: !1,
  data: function() {
    return {
      d_id: this.id,
      currentMonth: null,
      currentYear: null,
      currentHour: null,
      currentMinute: null,
      currentSecond: null,
      pm: null,
      focused: !1,
      overlayVisible: !1,
      currentView: this.view,
      query: null,
      queryMatches: !1
    };
  },
  watch: {
    id: function(e) {
      this.d_id = e || vi();
    },
    modelValue: function(e) {
      this.updateCurrentMetaData(), !this.typeUpdate && !this.inline && this.input && (this.input.value = this.inputFieldValue), this.typeUpdate = !1;
    },
    showTime: function() {
      this.updateCurrentMetaData();
    },
    minDate: function() {
      this.updateCurrentMetaData();
    },
    maxDate: function() {
      this.updateCurrentMetaData();
    },
    months: function() {
      this.overlay && (this.focused || (this.inline && (this.preventFocus = !0), setTimeout(this.updateFocus, 0)));
    },
    numberOfMonths: function() {
      this.destroyResponsiveStyleElement(), this.createResponsiveStyle();
    },
    responsiveOptions: function() {
      this.destroyResponsiveStyleElement(), this.createResponsiveStyle();
    },
    currentView: function() {
      var e = this;
      Promise.resolve(null).then(function() {
        return e.alignOverlay();
      });
    },
    view: function(e) {
      this.currentView = e;
    }
  },
  created: function() {
    this.updateCurrentMetaData();
  },
  mounted: function() {
    this.d_id = this.d_id || vi(), this.createResponsiveStyle(), this.bindMatchMediaListener(), this.inline ? this.disabled || (this.preventFocus = !0, this.initFocusableCell()) : this.input.value = this.inputFieldValue;
  },
  updated: function() {
    this.overlay && (this.preventFocus = !0, setTimeout(this.updateFocus, 0)), this.input && this.selectionStart != null && this.selectionEnd != null && (this.input.selectionStart = this.selectionStart, this.input.selectionEnd = this.selectionEnd, this.selectionStart = null, this.selectionEnd = null);
  },
  beforeUnmount: function() {
    this.timePickerTimer && clearTimeout(this.timePickerTimer), this.destroyResponsiveStyleElement(), this.unbindOutsideClickListener(), this.unbindResizeListener(), this.unbindMatchMediaListener(), this.scrollHandler && (this.scrollHandler.destroy(), this.scrollHandler = null), this.overlay && this.autoZIndex && po.clear(this.overlay), this.overlay = null;
  },
  methods: {
    isComparable: function() {
      return this.d_value != null && typeof this.d_value != "string";
    },
    isSelected: function(e) {
      if (!this.isComparable())
        return !1;
      if (this.d_value) {
        if (this.isSingleSelection())
          return this.isDateEquals(this.d_value, e);
        if (this.isMultipleSelection()) {
          var n = !1, i = go(this.d_value), s;
          try {
            for (i.s(); !(s = i.n()).done; ) {
              var u = s.value;
              if (n = this.isDateEquals(u, e), n)
                break;
            }
          } catch (f) {
            i.e(f);
          } finally {
            i.f();
          }
          return n;
        } else if (this.isRangeSelection())
          return this.d_value[1] ? this.isDateEquals(this.d_value[0], e) || this.isDateEquals(this.d_value[1], e) || this.isDateBetween(this.d_value[0], this.d_value[1], e) : this.isDateEquals(this.d_value[0], e);
      }
      return !1;
    },
    isMonthSelected: function(e) {
      var n = this;
      if (!this.isComparable()) return !1;
      if (this.isMultipleSelection())
        return this.d_value.some(function(b) {
          return b.getMonth() === e && b.getFullYear() === n.currentYear;
        });
      if (this.isRangeSelection())
        if (this.d_value[1]) {
          var u = new Date(this.currentYear, e, 1), f = new Date(this.d_value[0].getFullYear(), this.d_value[0].getMonth(), 1), h = new Date(this.d_value[1].getFullYear(), this.d_value[1].getMonth(), 1);
          return u >= f && u <= h;
        } else {
          var i, s;
          return ((i = this.d_value[0]) === null || i === void 0 ? void 0 : i.getFullYear()) === this.currentYear && ((s = this.d_value[0]) === null || s === void 0 ? void 0 : s.getMonth()) === e;
        }
      else
        return this.d_value.getMonth() === e && this.d_value.getFullYear() === this.currentYear;
    },
    isYearSelected: function(e) {
      if (!this.isComparable()) return !1;
      if (this.isMultipleSelection())
        return this.d_value.some(function(s) {
          return s.getFullYear() === e;
        });
      if (this.isRangeSelection()) {
        var n = this.d_value[0] ? this.d_value[0].getFullYear() : null, i = this.d_value[1] ? this.d_value[1].getFullYear() : null;
        return n === e || i === e || n < e && i > e;
      } else
        return this.d_value.getFullYear() === e;
    },
    isDateEquals: function(e, n) {
      return e ? e.getDate() === n.day && e.getMonth() === n.month && e.getFullYear() === n.year : !1;
    },
    isDateBetween: function(e, n, i) {
      var s = !1;
      if (e && n) {
        var u = new Date(i.year, i.month, i.day);
        return e.getTime() <= u.getTime() && n.getTime() >= u.getTime();
      }
      return s;
    },
    getFirstDayOfMonthIndex: function(e, n) {
      var i = /* @__PURE__ */ new Date();
      i.setDate(1), i.setMonth(e), i.setFullYear(n);
      var s = i.getDay() + this.sundayIndex;
      return s >= 7 ? s - 7 : s;
    },
    getDaysCountInMonth: function(e, n) {
      return 32 - this.daylightSavingAdjust(new Date(n, e, 32)).getDate();
    },
    getDaysCountInPrevMonth: function(e, n) {
      var i = this.getPreviousMonthAndYear(e, n);
      return this.getDaysCountInMonth(i.month, i.year);
    },
    getPreviousMonthAndYear: function(e, n) {
      var i, s;
      return e === 0 ? (i = 11, s = n - 1) : (i = e - 1, s = n), {
        month: i,
        year: s
      };
    },
    getNextMonthAndYear: function(e, n) {
      var i, s;
      return e === 11 ? (i = 0, s = n + 1) : (i = e + 1, s = n), {
        month: i,
        year: s
      };
    },
    daylightSavingAdjust: function(e) {
      return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null;
    },
    isToday: function(e, n, i, s) {
      return e.getDate() === n && e.getMonth() === i && e.getFullYear() === s;
    },
    isSelectable: function(e, n, i, s) {
      var u = !0, f = !0, h = !0, b = !0;
      return s && !this.selectOtherMonths ? !1 : (this.minDate && (this.minDate.getFullYear() > i || this.minDate.getFullYear() === i && (this.minDate.getMonth() > n || this.minDate.getMonth() === n && this.minDate.getDate() > e)) && (u = !1), this.maxDate && (this.maxDate.getFullYear() < i || this.maxDate.getFullYear() === i && (this.maxDate.getMonth() < n || this.maxDate.getMonth() === n && this.maxDate.getDate() < e)) && (f = !1), this.disabledDates && (h = !this.isDateDisabled(e, n, i)), this.disabledDays && (b = !this.isDayDisabled(e, n, i)), u && f && h && b);
    },
    onOverlayEnter: function(e) {
      var n = this.inline ? void 0 : {
        position: "absolute",
        top: "0",
        left: "0"
      };
      hs(e, n), this.autoZIndex && po.set("overlay", e, this.baseZIndex || this.$primevue.config.zIndex.overlay), this.alignOverlay(), this.$emit("show");
    },
    onOverlayEnterComplete: function() {
      this.bindOutsideClickListener(), this.bindScrollListener(), this.bindResizeListener();
    },
    onOverlayAfterLeave: function(e) {
      this.autoZIndex && po.clear(e);
    },
    onOverlayLeave: function() {
      this.currentView = this.view, this.unbindOutsideClickListener(), this.unbindScrollListener(), this.unbindResizeListener(), this.$emit("hide"), this.overlay = null;
    },
    onPrevButtonClick: function(e) {
      this.navigationState = {
        backward: !0,
        button: !0
      }, this.navBackward(e);
    },
    onNextButtonClick: function(e) {
      this.navigationState = {
        backward: !1,
        button: !0
      }, this.navForward(e);
    },
    navBackward: function(e) {
      e.preventDefault(), this.isEnabled() && (this.currentView === "month" ? (this.decrementYear(), this.$emit("year-change", {
        month: this.currentMonth,
        year: this.currentYear
      })) : this.currentView === "year" ? this.decrementDecade() : e.shiftKey ? this.decrementYear() : (this.currentMonth === 0 ? (this.currentMonth = 11, this.decrementYear()) : this.currentMonth--, this.$emit("month-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      })));
    },
    navForward: function(e) {
      e.preventDefault(), this.isEnabled() && (this.currentView === "month" ? (this.incrementYear(), this.$emit("year-change", {
        month: this.currentMonth,
        year: this.currentYear
      })) : this.currentView === "year" ? this.incrementDecade() : e.shiftKey ? this.incrementYear() : (this.currentMonth === 11 ? (this.currentMonth = 0, this.incrementYear()) : this.currentMonth++, this.$emit("month-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      })));
    },
    decrementYear: function() {
      this.currentYear--;
    },
    decrementDecade: function() {
      this.currentYear = this.currentYear - 10;
    },
    incrementYear: function() {
      this.currentYear++;
    },
    incrementDecade: function() {
      this.currentYear = this.currentYear + 10;
    },
    switchToMonthView: function(e) {
      this.currentView = "month", setTimeout(this.updateFocus, 0), e.preventDefault();
    },
    switchToYearView: function(e) {
      this.currentView = "year", setTimeout(this.updateFocus, 0), e.preventDefault();
    },
    isEnabled: function() {
      return !this.disabled && !this.readonly;
    },
    updateCurrentTimeMeta: function(e) {
      var n = e.getHours();
      this.hourFormat === "12" && (this.pm = n > 11, n >= 12 && (n = n == 12 ? 12 : n - 12)), this.currentHour = Math.floor(n / this.stepHour) * this.stepHour, this.currentMinute = Math.floor(e.getMinutes() / this.stepMinute) * this.stepMinute, this.currentSecond = Math.floor(e.getSeconds() / this.stepSecond) * this.stepSecond;
    },
    bindOutsideClickListener: function() {
      var e = this;
      this.outsideClickListener || (this.outsideClickListener = function(n) {
        e.overlayVisible && e.isOutsideClicked(n) && (e.overlayVisible = !1);
      }, document.addEventListener("mousedown", this.outsideClickListener));
    },
    unbindOutsideClickListener: function() {
      this.outsideClickListener && (document.removeEventListener("mousedown", this.outsideClickListener), this.outsideClickListener = null);
    },
    bindScrollListener: function() {
      var e = this;
      this.scrollHandler || (this.scrollHandler = new As(this.$refs.container, function() {
        e.overlayVisible && (e.overlayVisible = !1);
      })), this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function() {
      this.scrollHandler && this.scrollHandler.unbindScrollListener();
    },
    bindResizeListener: function() {
      var e = this;
      this.resizeListener || (this.resizeListener = function() {
        e.overlayVisible && !ks() && (e.overlayVisible = !1);
      }, window.addEventListener("resize", this.resizeListener));
    },
    unbindResizeListener: function() {
      this.resizeListener && (window.removeEventListener("resize", this.resizeListener), this.resizeListener = null);
    },
    bindMatchMediaListener: function() {
      var e = this;
      if (!this.matchMediaListener) {
        var n = matchMedia("(max-width: ".concat(this.breakpoint, ")"));
        this.query = n, this.queryMatches = n.matches, this.matchMediaListener = function() {
          e.queryMatches = n.matches, e.mobileActive = !1;
        }, this.query.addEventListener("change", this.matchMediaListener);
      }
    },
    unbindMatchMediaListener: function() {
      this.matchMediaListener && (this.query.removeEventListener("change", this.matchMediaListener), this.matchMediaListener = null);
    },
    isOutsideClicked: function(e) {
      return !(this.$el.isSameNode(e.target) || this.isNavIconClicked(e) || this.$el.contains(e.target) || this.overlay && this.overlay.contains(e.target));
    },
    isNavIconClicked: function(e) {
      return this.previousButton && (this.previousButton.isSameNode(e.target) || this.previousButton.contains(e.target)) || this.nextButton && (this.nextButton.isSameNode(e.target) || this.nextButton.contains(e.target));
    },
    alignOverlay: function() {
      this.overlay && (this.appendTo === "self" || this.inline ? ms(this.overlay, this.$el) : (this.view === "date" ? (this.overlay.style.width = br(this.overlay) + "px", this.overlay.style.minWidth = br(this.$el) + "px") : this.overlay.style.width = br(this.$el) + "px", ps(this.overlay, this.$el)));
    },
    onButtonClick: function() {
      this.isEnabled() && (this.overlayVisible ? this.overlayVisible = !1 : (this.input.focus(), this.overlayVisible = !0));
    },
    isDateDisabled: function(e, n, i) {
      if (this.disabledDates) {
        var s = go(this.disabledDates), u;
        try {
          for (s.s(); !(u = s.n()).done; ) {
            var f = u.value;
            if (f.getFullYear() === i && f.getMonth() === n && f.getDate() === e)
              return !0;
          }
        } catch (h) {
          s.e(h);
        } finally {
          s.f();
        }
      }
      return !1;
    },
    isDayDisabled: function(e, n, i) {
      if (this.disabledDays) {
        var s = new Date(i, n, e), u = s.getDay();
        return this.disabledDays.indexOf(u) !== -1;
      }
      return !1;
    },
    onMonthDropdownChange: function(e) {
      this.currentMonth = parseInt(e), this.$emit("month-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      });
    },
    onYearDropdownChange: function(e) {
      this.currentYear = parseInt(e), this.$emit("year-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      });
    },
    onDateSelect: function(e, n) {
      var i = this;
      if (!(this.disabled || !n.selectable)) {
        if (On(this.overlay, 'table td span:not([data-p-disabled="true"])').forEach(function(u) {
          return u.tabIndex = -1;
        }), e && e.currentTarget.focus(), this.isMultipleSelection() && this.isSelected(n)) {
          var s = this.d_value.filter(function(u) {
            return !i.isDateEquals(u, n);
          });
          this.updateModel(s);
        } else
          this.shouldSelectDate(n) && (n.otherMonth ? (this.currentMonth = n.month, this.currentYear = n.year, this.selectDate(n)) : this.selectDate(n));
        this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect) && (this.input && this.input.focus(), setTimeout(function() {
          i.overlayVisible = !1;
        }, 150));
      }
    },
    selectDate: function(e) {
      var n = this, i = new Date(e.year, e.month, e.day);
      this.showTime && (this.hourFormat === "12" && this.currentHour !== 12 && this.pm ? i.setHours(this.currentHour + 12) : i.setHours(this.currentHour), i.setMinutes(this.currentMinute), i.setSeconds(this.currentSecond)), this.minDate && this.minDate > i && (i = this.minDate, this.currentHour = i.getHours(), this.currentMinute = i.getMinutes(), this.currentSecond = i.getSeconds()), this.maxDate && this.maxDate < i && (i = this.maxDate, this.currentHour = i.getHours(), this.currentMinute = i.getMinutes(), this.currentSecond = i.getSeconds());
      var s = null;
      if (this.isSingleSelection())
        s = i;
      else if (this.isMultipleSelection())
        s = this.d_value ? [].concat(bo(this.d_value), [i]) : [i];
      else if (this.isRangeSelection())
        if (this.d_value && this.d_value.length) {
          var u = this.d_value[0], f = this.d_value[1];
          !f && i.getTime() >= u.getTime() ? f = i : (u = i, f = null), s = [u, f];
        } else
          s = [i, null];
      s !== null && this.updateModel(s), this.isRangeSelection() && this.hideOnRangeSelection && s[1] !== null && setTimeout(function() {
        n.overlayVisible = !1;
      }, 150), this.$emit("date-select", i);
    },
    updateModel: function(e) {
      this.writeValue(e);
    },
    shouldSelectDate: function() {
      return this.isMultipleSelection() && this.maxDateCount != null ? this.maxDateCount > (this.d_value ? this.d_value.length : 0) : !0;
    },
    isSingleSelection: function() {
      return this.selectionMode === "single";
    },
    isRangeSelection: function() {
      return this.selectionMode === "range";
    },
    isMultipleSelection: function() {
      return this.selectionMode === "multiple";
    },
    formatValue: function(e) {
      if (typeof e == "string")
        return this.dateFormat ? this.formatDate(new Date(e), this.dateFormat) : e;
      var n = "";
      if (e)
        try {
          if (this.isSingleSelection())
            n = this.formatDateTime(e);
          else if (this.isMultipleSelection())
            for (var i = 0; i < e.length; i++) {
              var s = this.formatDateTime(e[i]);
              n += s, i !== e.length - 1 && (n += ", ");
            }
          else if (this.isRangeSelection() && e && e.length) {
            var u = e[0], f = e[1];
            n = this.formatDateTime(u), f && (n += " - " + this.formatDateTime(f));
          }
        } catch {
          n = e;
        }
      return n;
    },
    formatDateTime: function(e) {
      var n = null;
      return e && (this.timeOnly ? n = this.formatTime(e) : (n = this.formatDate(e, this.datePattern), this.showTime && (n += " " + this.formatTime(e)))), n;
    },
    formatDate: function(e, n) {
      if (!e)
        return "";
      var i, s = function(p) {
        var O = i + 1 < n.length && n.charAt(i + 1) === p;
        return O && i++, O;
      }, u = function(p, O, $) {
        var I = "" + O;
        if (s(p))
          for (; I.length < $; )
            I = "0" + I;
        return I;
      }, f = function(p, O, $, I) {
        return s(p) ? I[O] : $[O];
      }, h = "", b = !1;
      if (e)
        for (i = 0; i < n.length; i++)
          if (b)
            n.charAt(i) === "'" && !s("'") ? b = !1 : h += n.charAt(i);
          else
            switch (n.charAt(i)) {
              case "d":
                h += u("d", e.getDate(), 2);
                break;
              case "D":
                h += f("D", e.getDay(), this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
                break;
              case "o":
                h += u("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
              case "m":
                h += u("m", e.getMonth() + 1, 2);
                break;
              case "M":
                h += f("M", e.getMonth(), this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
                break;
              case "y":
                h += s("y") ? e.getFullYear() : (e.getFullYear() % 100 < 10 ? "0" : "") + e.getFullYear() % 100;
                break;
              case "@":
                h += e.getTime();
                break;
              case "!":
                h += e.getTime() * 1e4 + this.ticksTo1970;
                break;
              case "'":
                s("'") ? h += "'" : b = !0;
                break;
              default:
                h += n.charAt(i);
            }
      return h;
    },
    formatTime: function(e) {
      if (!e)
        return "";
      var n = "", i = e.getHours(), s = e.getMinutes(), u = e.getSeconds();
      return this.hourFormat === "12" && i > 11 && i !== 12 && (i -= 12), this.hourFormat === "12" ? n += i === 0 ? 12 : i < 10 ? "0" + i : i : n += i < 10 ? "0" + i : i, n += ":", n += s < 10 ? "0" + s : s, this.showSeconds && (n += ":", n += u < 10 ? "0" + u : u), this.hourFormat === "12" && (n += e.getHours() > 11 ? " ".concat(this.$primevue.config.locale.pm) : " ".concat(this.$primevue.config.locale.am)), n;
    },
    onTodayButtonClick: function(e) {
      var n = /* @__PURE__ */ new Date(), i = {
        day: n.getDate(),
        month: n.getMonth(),
        year: n.getFullYear(),
        otherMonth: n.getMonth() !== this.currentMonth || n.getFullYear() !== this.currentYear,
        today: !0,
        selectable: !0
      };
      this.onDateSelect(null, i), this.$emit("today-click", n), e.preventDefault();
    },
    onClearButtonClick: function(e) {
      this.updateModel(null), this.overlayVisible = !1, this.$emit("clear-click", e), e.preventDefault();
    },
    onTimePickerElementMouseDown: function(e, n, i) {
      this.isEnabled() && (this.repeat(e, null, n, i), e.preventDefault());
    },
    onTimePickerElementMouseUp: function(e) {
      this.isEnabled() && (this.clearTimePickerTimer(), this.updateModelTime(), e.preventDefault());
    },
    onTimePickerElementMouseLeave: function() {
      this.clearTimePickerTimer();
    },
    repeat: function(e, n, i, s) {
      var u = this, f = n || 500;
      switch (this.clearTimePickerTimer(), this.timePickerTimer = setTimeout(function() {
        u.repeat(e, 100, i, s);
      }, f), i) {
        case 0:
          s === 1 ? this.incrementHour(e) : this.decrementHour(e);
          break;
        case 1:
          s === 1 ? this.incrementMinute(e) : this.decrementMinute(e);
          break;
        case 2:
          s === 1 ? this.incrementSecond(e) : this.decrementSecond(e);
          break;
      }
    },
    convertTo24Hour: function(e, n) {
      return this.hourFormat == "12" ? e === 12 ? n ? 12 : 0 : n ? e + 12 : e : e;
    },
    validateTime: function(e, n, i, s) {
      var u = this.isComparable() ? this.d_value : this.viewDate, f = this.convertTo24Hour(e, s);
      this.isRangeSelection() && (u = this.d_value[1] || this.d_value[0]), this.isMultipleSelection() && (u = this.d_value[this.d_value.length - 1]);
      var h = u ? u.toDateString() : null;
      return !(this.minDate && h && this.minDate.toDateString() === h && (this.minDate.getHours() > f || this.minDate.getHours() === f && (this.minDate.getMinutes() > n || this.minDate.getMinutes() === n && this.minDate.getSeconds() > i)) || this.maxDate && h && this.maxDate.toDateString() === h && (this.maxDate.getHours() < f || this.maxDate.getHours() === f && (this.maxDate.getMinutes() < n || this.maxDate.getMinutes() === n && this.maxDate.getSeconds() < i)));
    },
    incrementHour: function(e) {
      var n = this.currentHour, i = this.currentHour + Number(this.stepHour), s = this.pm;
      this.hourFormat == "24" ? i = i >= 24 ? i - 24 : i : this.hourFormat == "12" && (n < 12 && i > 11 && (s = !this.pm), i = i >= 13 ? i - 12 : i), this.validateTime(i, this.currentMinute, this.currentSecond, s) && (this.currentHour = i, this.pm = s), e.preventDefault();
    },
    decrementHour: function(e) {
      var n = this.currentHour - this.stepHour, i = this.pm;
      this.hourFormat == "24" ? n = n < 0 ? 24 + n : n : this.hourFormat == "12" && (this.currentHour === 12 && (i = !this.pm), n = n <= 0 ? 12 + n : n), this.validateTime(n, this.currentMinute, this.currentSecond, i) && (this.currentHour = n, this.pm = i), e.preventDefault();
    },
    incrementMinute: function(e) {
      var n = this.currentMinute + Number(this.stepMinute);
      this.validateTime(this.currentHour, n, this.currentSecond, this.pm) && (this.currentMinute = n > 59 ? n - 60 : n), e.preventDefault();
    },
    decrementMinute: function(e) {
      var n = this.currentMinute - this.stepMinute;
      n = n < 0 ? 60 + n : n, this.validateTime(this.currentHour, n, this.currentSecond, this.pm) && (this.currentMinute = n), e.preventDefault();
    },
    incrementSecond: function(e) {
      var n = this.currentSecond + Number(this.stepSecond);
      this.validateTime(this.currentHour, this.currentMinute, n, this.pm) && (this.currentSecond = n > 59 ? n - 60 : n), e.preventDefault();
    },
    decrementSecond: function(e) {
      var n = this.currentSecond - this.stepSecond;
      n = n < 0 ? 60 + n : n, this.validateTime(this.currentHour, this.currentMinute, n, this.pm) && (this.currentSecond = n), e.preventDefault();
    },
    updateModelTime: function() {
      var e = this;
      this.timePickerChange = !0;
      var n = this.isComparable() ? this.d_value : this.viewDate;
      this.isRangeSelection() && (n = this.d_value[1] || this.d_value[0]), this.isMultipleSelection() && (n = this.d_value[this.d_value.length - 1]), n = n ? new Date(n.getTime()) : /* @__PURE__ */ new Date(), this.hourFormat == "12" ? this.currentHour === 12 ? n.setHours(this.pm ? 12 : 0) : n.setHours(this.pm ? this.currentHour + 12 : this.currentHour) : n.setHours(this.currentHour), n.setMinutes(this.currentMinute), n.setSeconds(this.currentSecond), this.isRangeSelection() && (this.d_value[1] ? n = [this.d_value[0], n] : n = [n, null]), this.isMultipleSelection() && (n = [].concat(bo(this.d_value.slice(0, -1)), [n])), this.updateModel(n), this.$emit("date-select", n), setTimeout(function() {
        return e.timePickerChange = !1;
      }, 0);
    },
    toggleAMPM: function(e) {
      var n = this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, !this.pm);
      !n && (this.maxDate || this.minDate) || (this.pm = !this.pm, this.updateModelTime(), e.preventDefault());
    },
    clearTimePickerTimer: function() {
      this.timePickerTimer && clearInterval(this.timePickerTimer);
    },
    onMonthSelect: function(e, n) {
      n.month;
      var i = n.index;
      this.view === "month" ? this.onDateSelect(e, {
        year: this.currentYear,
        month: i,
        day: 1,
        selectable: !0
      }) : (this.currentMonth = i, this.currentView = "date", this.$emit("month-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      })), setTimeout(this.updateFocus, 0);
    },
    onYearSelect: function(e, n) {
      this.view === "year" ? this.onDateSelect(e, {
        year: n.value,
        month: 0,
        day: 1,
        selectable: !0
      }) : (this.currentYear = n.value, this.currentView = "month", this.$emit("year-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      })), setTimeout(this.updateFocus, 0);
    },
    updateCurrentMetaData: function() {
      var e = this.viewDate;
      this.currentMonth = e.getMonth(), this.currentYear = e.getFullYear(), (this.showTime || this.timeOnly) && this.updateCurrentTimeMeta(e);
    },
    isValidSelection: function(e) {
      var n = this;
      if (e == null)
        return !0;
      var i = !0;
      return this.isSingleSelection() ? this.isSelectable(e.getDate(), e.getMonth(), e.getFullYear(), !1) || (i = !1) : e.every(function(s) {
        return n.isSelectable(s.getDate(), s.getMonth(), s.getFullYear(), !1);
      }) && this.isRangeSelection() && (i = e.length > 1 && e[1] >= e[0]), i;
    },
    parseValue: function(e) {
      if (!e || e.trim().length === 0)
        return null;
      var n;
      if (this.isSingleSelection())
        n = this.parseDateTime(e);
      else if (this.isMultipleSelection()) {
        var i = e.split(",");
        n = [];
        var s = go(i), u;
        try {
          for (s.s(); !(u = s.n()).done; ) {
            var f = u.value;
            n.push(this.parseDateTime(f.trim()));
          }
        } catch (v) {
          s.e(v);
        } finally {
          s.f();
        }
      } else if (this.isRangeSelection()) {
        var h = e.split(" - ");
        n = [];
        for (var b = 0; b < h.length; b++)
          n[b] = this.parseDateTime(h[b].trim());
      }
      return n;
    },
    parseDateTime: function(e) {
      var n, i = e.split(" ");
      if (this.timeOnly)
        n = /* @__PURE__ */ new Date(), this.populateTime(n, i[0], i[1]);
      else {
        var s = this.datePattern;
        this.showTime ? (n = this.parseDate(i[0], s), this.populateTime(n, i[1], i[2])) : n = this.parseDate(e, s);
      }
      return n;
    },
    populateTime: function(e, n, i) {
      if (this.hourFormat == "12" && !i)
        throw "Invalid Time";
      this.pm = i === this.$primevue.config.locale.pm || i === this.$primevue.config.locale.pm.toLowerCase();
      var s = this.parseTime(n);
      e.setHours(s.hour), e.setMinutes(s.minute), e.setSeconds(s.second);
    },
    parseTime: function(e) {
      var n = e.split(":"), i = this.showSeconds ? 3 : 2, s = /^[0-9][0-9]$/;
      if (n.length !== i || !n[0].match(s) || !n[1].match(s) || this.showSeconds && !n[2].match(s))
        throw "Invalid time";
      var u = parseInt(n[0]), f = parseInt(n[1]), h = this.showSeconds ? parseInt(n[2]) : null;
      if (isNaN(u) || isNaN(f) || u > 23 || f > 59 || this.hourFormat == "12" && u > 12 || this.showSeconds && (isNaN(h) || h > 59))
        throw "Invalid time";
      return this.hourFormat == "12" && u !== 12 && this.pm ? u += 12 : this.hourFormat == "12" && u == 12 && !this.pm && (u = 0), {
        hour: u,
        minute: f,
        second: h
      };
    },
    parseDate: function(e, n) {
      if (n == null || e == null)
        throw "Invalid arguments";
      if (e = Do(e) === "object" ? e.toString() : e + "", e === "")
        return null;
      var i, s, u, f = 0, h = typeof this.shortYearCutoff != "string" ? this.shortYearCutoff : (/* @__PURE__ */ new Date()).getFullYear() % 100 + parseInt(this.shortYearCutoff, 10), b = -1, v = -1, p = -1, O = -1, $ = !1, I, A = function(V) {
        var U = i + 1 < n.length && n.charAt(i + 1) === V;
        return U && i++, U;
      }, q = function(V) {
        var U = A(V), ge = V === "@" ? 14 : V === "!" ? 20 : V === "y" && U ? 4 : V === "o" ? 3 : 2, ce = V === "y" ? ge : 1, de = new RegExp("^\\d{" + ce + "," + ge + "}"), Se = e.substring(f).match(de);
        if (!Se)
          throw "Missing number at position " + f;
        return f += Se[0].length, parseInt(Se[0], 10);
      }, G = function(V, U, ge) {
        for (var ce = -1, de = A(V) ? ge : U, Se = [], je = 0; je < de.length; je++)
          Se.push([je, de[je]]);
        Se.sort(function(Be, Z) {
          return -(Be[1].length - Z[1].length);
        });
        for (var $e = 0; $e < Se.length; $e++) {
          var Ae = Se[$e][1];
          if (e.substr(f, Ae.length).toLowerCase() === Ae.toLowerCase()) {
            ce = Se[$e][0], f += Ae.length;
            break;
          }
        }
        if (ce !== -1)
          return ce + 1;
        throw "Unknown name at position " + f;
      }, ne = function() {
        if (e.charAt(f) !== n.charAt(i))
          throw "Unexpected literal at position " + f;
        f++;
      };
      for (this.currentView === "month" && (p = 1), this.currentView === "year" && (p = 1, v = 1), i = 0; i < n.length; i++)
        if ($)
          n.charAt(i) === "'" && !A("'") ? $ = !1 : ne();
        else
          switch (n.charAt(i)) {
            case "d":
              p = q("d");
              break;
            case "D":
              G("D", this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
              break;
            case "o":
              O = q("o");
              break;
            case "m":
              v = q("m");
              break;
            case "M":
              v = G("M", this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
              break;
            case "y":
              b = q("y");
              break;
            case "@":
              I = new Date(q("@")), b = I.getFullYear(), v = I.getMonth() + 1, p = I.getDate();
              break;
            case "!":
              I = new Date((q("!") - this.ticksTo1970) / 1e4), b = I.getFullYear(), v = I.getMonth() + 1, p = I.getDate();
              break;
            case "'":
              A("'") ? ne() : $ = !0;
              break;
            default:
              ne();
          }
      if (f < e.length && (u = e.substr(f), !/^\s+/.test(u)))
        throw "Extra/unparsed characters found in date: " + u;
      if (b === -1 ? b = (/* @__PURE__ */ new Date()).getFullYear() : b < 100 && (b += (/* @__PURE__ */ new Date()).getFullYear() - (/* @__PURE__ */ new Date()).getFullYear() % 100 + (b <= h ? 0 : -100)), O > -1) {
        v = 1, p = O;
        do {
          if (s = this.getDaysCountInMonth(b, v - 1), p <= s)
            break;
          v++, p -= s;
        } while (!0);
      }
      if (I = this.daylightSavingAdjust(new Date(b, v - 1, p)), I.getFullYear() !== b || I.getMonth() + 1 !== v || I.getDate() !== p)
        throw "Invalid date";
      return I;
    },
    getWeekNumber: function(e) {
      var n = new Date(e.getTime());
      n.setDate(n.getDate() + 4 - (n.getDay() || 7));
      var i = n.getTime();
      return n.setMonth(0), n.setDate(1), Math.floor(Math.round((i - n.getTime()) / 864e5) / 7) + 1;
    },
    onDateCellKeydown: function(e, n, i) {
      var s = e.currentTarget, u = s.parentElement, f = St(u);
      switch (e.code) {
        case "ArrowDown": {
          s.tabIndex = "-1";
          var h = u.parentElement.nextElementSibling;
          if (h) {
            var b = St(u.parentElement), v = Array.from(u.parentElement.parentElement.children), p = v.slice(b + 1), O = p.find(function(Ne) {
              var Oe = Ne.children[f].children[0];
              return !Un(Oe, "data-p-disabled");
            });
            if (O) {
              var $ = O.children[f].children[0];
              $.tabIndex = "0", $.focus();
            } else
              this.navigationState = {
                backward: !1
              }, this.navForward(e);
          } else
            this.navigationState = {
              backward: !1
            }, this.navForward(e);
          e.preventDefault();
          break;
        }
        case "ArrowUp": {
          if (s.tabIndex = "-1", e.altKey)
            this.overlayVisible = !1, this.focused = !0;
          else {
            var I = u.parentElement.previousElementSibling;
            if (I) {
              var A = St(u.parentElement), q = Array.from(u.parentElement.parentElement.children), G = q.slice(0, A).reverse(), ne = G.find(function(Ne) {
                var Oe = Ne.children[f].children[0];
                return !Un(Oe, "data-p-disabled");
              });
              if (ne) {
                var ee = ne.children[f].children[0];
                ee.tabIndex = "0", ee.focus();
              } else
                this.navigationState = {
                  backward: !0
                }, this.navBackward(e);
            } else
              this.navigationState = {
                backward: !0
              }, this.navBackward(e);
          }
          e.preventDefault();
          break;
        }
        case "ArrowLeft": {
          s.tabIndex = "-1";
          var V = u.previousElementSibling;
          if (V) {
            var U = Array.from(u.parentElement.children), ge = U.slice(0, f).reverse(), ce = ge.find(function(Ne) {
              var Oe = Ne.children[0];
              return !Un(Oe, "data-p-disabled");
            });
            if (ce) {
              var de = ce.children[0];
              de.tabIndex = "0", de.focus();
            } else
              this.navigateToMonth(e, !0, i);
          } else
            this.navigateToMonth(e, !0, i);
          e.preventDefault();
          break;
        }
        case "ArrowRight": {
          s.tabIndex = "-1";
          var Se = u.nextElementSibling;
          if (Se) {
            var je = Array.from(u.parentElement.children), $e = je.slice(f + 1), Ae = $e.find(function(Ne) {
              var Oe = Ne.children[0];
              return !Un(Oe, "data-p-disabled");
            });
            if (Ae) {
              var Be = Ae.children[0];
              Be.tabIndex = "0", Be.focus();
            } else
              this.navigateToMonth(e, !1, i);
          } else
            this.navigateToMonth(e, !1, i);
          e.preventDefault();
          break;
        }
        case "Enter":
        case "NumpadEnter":
        case "Space": {
          this.onDateSelect(e, n), e.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = !1, e.preventDefault();
          break;
        }
        case "Tab": {
          this.inline || this.trapFocus(e);
          break;
        }
        case "Home": {
          s.tabIndex = "-1";
          var Z = u.parentElement, oe = Z.children[0].children[0];
          Un(oe, "data-p-disabled") ? this.navigateToMonth(e, !0, i) : (oe.tabIndex = "0", oe.focus()), e.preventDefault();
          break;
        }
        case "End": {
          s.tabIndex = "-1";
          var pe = u.parentElement, ke = pe.children[pe.children.length - 1].children[0];
          Un(ke, "data-p-disabled") ? this.navigateToMonth(e, !1, i) : (ke.tabIndex = "0", ke.focus()), e.preventDefault();
          break;
        }
        case "PageUp": {
          s.tabIndex = "-1", e.shiftKey ? (this.navigationState = {
            backward: !0
          }, this.navBackward(e)) : this.navigateToMonth(e, !0, i), e.preventDefault();
          break;
        }
        case "PageDown": {
          s.tabIndex = "-1", e.shiftKey ? (this.navigationState = {
            backward: !1
          }, this.navForward(e)) : this.navigateToMonth(e, !1, i), e.preventDefault();
          break;
        }
      }
    },
    navigateToMonth: function(e, n, i) {
      if (n)
        if (this.numberOfMonths === 1 || i === 0)
          this.navigationState = {
            backward: !0
          }, this.navBackward(e);
        else {
          var s = this.overlay.children[i - 1], u = On(s, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])'), f = u[u.length - 1];
          f.tabIndex = "0", f.focus();
        }
      else if (this.numberOfMonths === 1 || i === this.numberOfMonths - 1)
        this.navigationState = {
          backward: !1
        }, this.navForward(e);
      else {
        var h = this.overlay.children[i + 1], b = on(h, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
        b.tabIndex = "0", b.focus();
      }
    },
    onMonthCellKeydown: function(e, n) {
      var i = e.currentTarget;
      switch (e.code) {
        case "ArrowUp":
        case "ArrowDown": {
          i.tabIndex = "-1";
          var s = i.parentElement.children, u = St(i), f = s[e.code === "ArrowDown" ? u + 3 : u - 3];
          f && (f.tabIndex = "0", f.focus()), e.preventDefault();
          break;
        }
        case "ArrowLeft": {
          i.tabIndex = "-1";
          var h = i.previousElementSibling;
          h ? (h.tabIndex = "0", h.focus()) : (this.navigationState = {
            backward: !0
          }, this.navBackward(e)), e.preventDefault();
          break;
        }
        case "ArrowRight": {
          i.tabIndex = "-1";
          var b = i.nextElementSibling;
          b ? (b.tabIndex = "0", b.focus()) : (this.navigationState = {
            backward: !1
          }, this.navForward(e)), e.preventDefault();
          break;
        }
        case "PageUp": {
          if (e.shiftKey) return;
          this.navigationState = {
            backward: !0
          }, this.navBackward(e);
          break;
        }
        case "PageDown": {
          if (e.shiftKey) return;
          this.navigationState = {
            backward: !1
          }, this.navForward(e);
          break;
        }
        case "Enter":
        case "NumpadEnter":
        case "Space": {
          this.onMonthSelect(e, n), e.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = !1, e.preventDefault();
          break;
        }
        case "Tab": {
          this.trapFocus(e);
          break;
        }
      }
    },
    onYearCellKeydown: function(e, n) {
      var i = e.currentTarget;
      switch (e.code) {
        case "ArrowUp":
        case "ArrowDown": {
          i.tabIndex = "-1";
          var s = i.parentElement.children, u = St(i), f = s[e.code === "ArrowDown" ? u + 2 : u - 2];
          f && (f.tabIndex = "0", f.focus()), e.preventDefault();
          break;
        }
        case "ArrowLeft": {
          i.tabIndex = "-1";
          var h = i.previousElementSibling;
          h ? (h.tabIndex = "0", h.focus()) : (this.navigationState = {
            backward: !0
          }, this.navBackward(e)), e.preventDefault();
          break;
        }
        case "ArrowRight": {
          i.tabIndex = "-1";
          var b = i.nextElementSibling;
          b ? (b.tabIndex = "0", b.focus()) : (this.navigationState = {
            backward: !1
          }, this.navForward(e)), e.preventDefault();
          break;
        }
        case "PageUp": {
          if (e.shiftKey) return;
          this.navigationState = {
            backward: !0
          }, this.navBackward(e);
          break;
        }
        case "PageDown": {
          if (e.shiftKey) return;
          this.navigationState = {
            backward: !1
          }, this.navForward(e);
          break;
        }
        case "Enter":
        case "NumpadEnter":
        case "Space": {
          this.onYearSelect(e, n), e.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = !1, e.preventDefault();
          break;
        }
        case "Tab": {
          this.trapFocus(e);
          break;
        }
      }
    },
    updateFocus: function() {
      var e;
      if (this.navigationState) {
        if (this.navigationState.button)
          this.initFocusableCell(), this.navigationState.backward ? this.previousButton.focus() : this.nextButton.focus();
        else {
          if (this.navigationState.backward) {
            var n;
            this.currentView === "month" ? n = On(this.overlay, '[data-pc-section="monthview"] [data-pc-section="month"]:not([data-p-disabled="true"])') : this.currentView === "year" ? n = On(this.overlay, '[data-pc-section="yearview"] [data-pc-section="year"]:not([data-p-disabled="true"])') : n = On(this.overlay, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])'), n && n.length > 0 && (e = n[n.length - 1]);
          } else
            this.currentView === "month" ? e = on(this.overlay, '[data-pc-section="monthview"] [data-pc-section="month"]:not([data-p-disabled="true"])') : this.currentView === "year" ? e = on(this.overlay, '[data-pc-section="yearview"] [data-pc-section="year"]:not([data-p-disabled="true"])') : e = on(this.overlay, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
          e && (e.tabIndex = "0", e.focus());
        }
        this.navigationState = null;
      } else
        this.initFocusableCell();
    },
    initFocusableCell: function() {
      var e;
      if (this.currentView === "month") {
        var n = On(this.overlay, '[data-pc-section="monthview"] [data-pc-section="month"]'), i = on(this.overlay, '[data-pc-section="monthview"] [data-pc-section="month"][data-p-selected="true"]');
        n.forEach(function(h) {
          return h.tabIndex = -1;
        }), e = i || n[0];
      } else if (this.currentView === "year") {
        var s = On(this.overlay, '[data-pc-section="yearview"] [data-pc-section="year"]'), u = on(this.overlay, '[data-pc-section="yearview"] [data-pc-section="year"][data-p-selected="true"]');
        s.forEach(function(h) {
          return h.tabIndex = -1;
        }), e = u || s[0];
      } else if (e = on(this.overlay, 'span[data-p-selected="true"]'), !e) {
        var f = on(this.overlay, 'td[data-p-today="true"] span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
        f ? e = f : e = on(this.overlay, '.p-datepicker-calendar td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
      }
      e && (e.tabIndex = "0", this.preventFocus = !1);
    },
    trapFocus: function(e) {
      e.preventDefault();
      var n = wr(this.overlay);
      if (n && n.length > 0)
        if (!document.activeElement)
          n[0].focus();
        else {
          var i = n.indexOf(document.activeElement);
          if (e.shiftKey)
            i === -1 || i === 0 ? n[n.length - 1].focus() : n[i - 1].focus();
          else if (i === -1)
            if (this.timeOnly)
              n[0].focus();
            else {
              for (var s = null, u = 0; u < n.length; u++)
                if (n[u].tagName === "SPAN") {
                  s = u;
                  break;
                }
              n[s].focus();
            }
          else i === n.length - 1 ? n[0].focus() : n[i + 1].focus();
        }
    },
    onContainerButtonKeydown: function(e) {
      switch (e.code) {
        case "Tab":
          this.trapFocus(e);
          break;
        case "Escape":
          this.overlayVisible = !1, e.preventDefault();
          break;
      }
      this.$emit("keydown", e);
    },
    onInput: function(e) {
      try {
        this.selectionStart = this.input.selectionStart, this.selectionEnd = this.input.selectionEnd;
        var n = this.parseValue(e.target.value);
        this.isValidSelection(n) && (this.typeUpdate = !0, this.updateModel(n), this.updateCurrentMetaData());
      } catch {
      }
      this.$emit("input", e);
    },
    onInputClick: function() {
      this.showOnFocus && this.isEnabled() && !this.overlayVisible && (this.overlayVisible = !0);
    },
    onFocus: function(e) {
      this.showOnFocus && this.isEnabled() && (this.overlayVisible = !0), this.focused = !0, this.$emit("focus", e);
    },
    onBlur: function(e) {
      var n, i;
      this.$emit("blur", {
        originalEvent: e,
        value: e.target.value
      }), (n = (i = this.formField).onBlur) === null || n === void 0 || n.call(i), this.focused = !1, e.target.value = this.formatValue(this.d_value);
    },
    onKeyDown: function(e) {
      if (e.code === "ArrowDown" && this.overlay)
        this.trapFocus(e);
      else if (e.code === "ArrowDown" && !this.overlay)
        this.overlayVisible = !0;
      else if (e.code === "Escape")
        this.overlayVisible && (this.overlayVisible = !1, e.preventDefault());
      else if (e.code === "Tab")
        this.overlay && wr(this.overlay).forEach(function(s) {
          return s.tabIndex = "-1";
        }), this.overlayVisible && (this.overlayVisible = !1);
      else if (e.code === "Enter") {
        var n;
        if (this.manualInput && e.target.value !== null && ((n = e.target.value) === null || n === void 0 ? void 0 : n.trim()) !== "")
          try {
            var i = this.parseValue(e.target.value);
            this.isValidSelection(i) && (this.overlayVisible = !1);
          } catch {
          }
        this.$emit("keydown", e);
      }
    },
    overlayRef: function(e) {
      this.overlay = e;
    },
    inputRef: function(e) {
      this.input = e ? e.$el : void 0;
    },
    previousButtonRef: function(e) {
      this.previousButton = e ? e.$el : void 0;
    },
    nextButtonRef: function(e) {
      this.nextButton = e ? e.$el : void 0;
    },
    getMonthName: function(e) {
      return this.$primevue.config.locale.monthNames[e];
    },
    getYear: function(e) {
      return this.currentView === "month" ? this.currentYear : e.year;
    },
    onOverlayClick: function(e) {
      e.stopPropagation(), this.inline || ml.emit("overlay-click", {
        originalEvent: e,
        target: this.$el
      });
    },
    onOverlayKeyDown: function(e) {
      switch (e.code) {
        case "Escape":
          this.inline || (this.input.focus(), this.overlayVisible = !1);
          break;
      }
    },
    onOverlayMouseUp: function(e) {
      this.onOverlayClick(e);
    },
    createResponsiveStyle: function() {
      if (this.numberOfMonths > 1 && this.responsiveOptions && !this.isUnstyled) {
        if (!this.responsiveStyleElement) {
          var e;
          this.responsiveStyleElement = document.createElement("style"), this.responsiveStyleElement.type = "text/css", Ui(this.responsiveStyleElement, "nonce", (e = this.$primevue) === null || e === void 0 || (e = e.config) === null || e === void 0 || (e = e.csp) === null || e === void 0 ? void 0 : e.nonce), document.body.appendChild(this.responsiveStyleElement);
        }
        var n = "";
        if (this.responsiveOptions)
          for (var i = _s(), s = bo(this.responsiveOptions).filter(function(O) {
            return !!(O.breakpoint && O.numMonths);
          }).sort(function(O, $) {
            return -1 * i(O.breakpoint, $.breakpoint);
          }), u = 0; u < s.length; u++) {
            for (var f = s[u], h = f.breakpoint, b = f.numMonths, v = `
                            .p-datepicker-panel[`.concat(this.$attrSelector, "] .p-datepicker-calendar:nth-child(").concat(b, `) .p-datepicker-next-button {
                                display: inline-flex;
                            }
                        `), p = b; p < this.numberOfMonths; p++)
              v += `
                                .p-datepicker-panel[`.concat(this.$attrSelector, "] .p-datepicker-calendar:nth-child(").concat(p + 1, `) {
                                    display: none;
                                }
                            `);
            n += `
                            @media screen and (max-width: `.concat(h, `) {
                                `).concat(v, `
                            }
                        `);
          }
        this.responsiveStyleElement.innerHTML = n;
      }
    },
    destroyResponsiveStyleElement: function() {
      this.responsiveStyleElement && (this.responsiveStyleElement.remove(), this.responsiveStyleElement = null);
    }
  },
  computed: {
    viewDate: function() {
      var e = this.d_value;
      if (e && Array.isArray(e) && (this.isRangeSelection() ? e = this.inline ? e[0] : e[1] || e[0] : this.isMultipleSelection() && (e = e[e.length - 1])), e && typeof e != "string")
        return e;
      var n = /* @__PURE__ */ new Date();
      return this.maxDate && this.maxDate < n ? this.maxDate : this.minDate && this.minDate > n ? this.minDate : n;
    },
    inputFieldValue: function() {
      return this.formatValue(this.d_value);
    },
    months: function() {
      for (var e = [], n = 0; n < this.numberOfMonths; n++) {
        var i = this.currentMonth + n, s = this.currentYear;
        i > 11 && (i = i % 11 - 1, s = s + 1);
        for (var u = [], f = this.getFirstDayOfMonthIndex(i, s), h = this.getDaysCountInMonth(i, s), b = this.getDaysCountInPrevMonth(i, s), v = 1, p = /* @__PURE__ */ new Date(), O = [], $ = Math.ceil((h + f) / 7), I = 0; I < $; I++) {
          var A = [];
          if (I == 0) {
            for (var q = b - f + 1; q <= b; q++) {
              var G = this.getPreviousMonthAndYear(i, s);
              A.push({
                day: q,
                month: G.month,
                year: G.year,
                otherMonth: !0,
                today: this.isToday(p, q, G.month, G.year),
                selectable: this.isSelectable(q, G.month, G.year, !0)
              });
            }
            for (var ne = 7 - A.length, ee = 0; ee < ne; ee++)
              A.push({
                day: v,
                month: i,
                year: s,
                today: this.isToday(p, v, i, s),
                selectable: this.isSelectable(v, i, s, !1)
              }), v++;
          } else
            for (var V = 0; V < 7; V++) {
              if (v > h) {
                var U = this.getNextMonthAndYear(i, s);
                A.push({
                  day: v - h,
                  month: U.month,
                  year: U.year,
                  otherMonth: !0,
                  today: this.isToday(p, v - h, U.month, U.year),
                  selectable: this.isSelectable(v - h, U.month, U.year, !0)
                });
              } else
                A.push({
                  day: v,
                  month: i,
                  year: s,
                  today: this.isToday(p, v, i, s),
                  selectable: this.isSelectable(v, i, s, !1)
                });
              v++;
            }
          this.showWeek && O.push(this.getWeekNumber(new Date(A[0].year, A[0].month, A[0].day))), u.push(A);
        }
        e.push({
          month: i,
          year: s,
          dates: u,
          weekNumbers: O
        });
      }
      return e;
    },
    weekDays: function() {
      for (var e = [], n = this.$primevue.config.locale.firstDayOfWeek, i = 0; i < 7; i++)
        e.push(this.$primevue.config.locale.dayNamesMin[n]), n = n == 6 ? 0 : ++n;
      return e;
    },
    ticksTo1970: function() {
      return (1969 * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 1e7;
    },
    sundayIndex: function() {
      return this.$primevue.config.locale.firstDayOfWeek > 0 ? 7 - this.$primevue.config.locale.firstDayOfWeek : 0;
    },
    datePattern: function() {
      return this.dateFormat || this.$primevue.config.locale.dateFormat;
    },
    monthPickerValues: function() {
      for (var e = this, n = [], i = function(f) {
        if (e.minDate) {
          var h = e.minDate.getMonth(), b = e.minDate.getFullYear();
          if (e.currentYear < b || e.currentYear === b && f < h)
            return !1;
        }
        if (e.maxDate) {
          var v = e.maxDate.getMonth(), p = e.maxDate.getFullYear();
          if (e.currentYear > p || e.currentYear === p && f > v)
            return !1;
        }
        return !0;
      }, s = 0; s <= 11; s++)
        n.push({
          value: this.$primevue.config.locale.monthNamesShort[s],
          selectable: i(s)
        });
      return n;
    },
    yearPickerValues: function() {
      for (var e = this, n = [], i = this.currentYear - this.currentYear % 10, s = function(h) {
        return !(e.minDate && e.minDate.getFullYear() > h || e.maxDate && e.maxDate.getFullYear() < h);
      }, u = 0; u < 10; u++)
        n.push({
          value: i + u,
          selectable: s(i + u)
        });
      return n;
    },
    formattedCurrentHour: function() {
      return this.currentHour == 0 && this.hourFormat == "12" ? this.currentHour + 12 : this.currentHour < 10 ? "0" + this.currentHour : this.currentHour;
    },
    formattedCurrentMinute: function() {
      return this.currentMinute < 10 ? "0" + this.currentMinute : this.currentMinute;
    },
    formattedCurrentSecond: function() {
      return this.currentSecond < 10 ? "0" + this.currentSecond : this.currentSecond;
    },
    todayLabel: function() {
      return this.$primevue.config.locale.today;
    },
    clearLabel: function() {
      return this.$primevue.config.locale.clear;
    },
    weekHeaderLabel: function() {
      return this.$primevue.config.locale.weekHeader;
    },
    monthNames: function() {
      return this.$primevue.config.locale.monthNames;
    },
    switchViewButtonDisabled: function() {
      return this.numberOfMonths > 1 || this.disabled;
    },
    panelId: function() {
      return this.d_id + "_panel";
    }
  },
  components: {
    InputText: fa,
    Button: ca,
    Portal: pa,
    CalendarIcon: ra,
    ChevronLeftIcon: ia,
    ChevronRightIcon: aa,
    ChevronUpIcon: sa,
    ChevronDownIcon: oa
  },
  directives: {
    ripple: Bo
  }
}, Dl = ["id"], _l = ["disabled", "aria-label", "aria-expanded", "aria-controls"], Pl = ["id", "role", "aria-modal", "aria-label"], Tl = ["disabled", "aria-label"], Ol = ["disabled", "aria-label"], $l = ["disabled", "aria-label"], El = ["disabled", "aria-label"], Ml = ["data-p-disabled"], Il = ["abbr"], Al = ["data-p-disabled"], Bl = ["aria-label", "data-p-today", "data-p-other-month"], jl = ["onClick", "onKeydown", "aria-selected", "aria-disabled", "data-p-disabled", "data-p-selected"], Vl = ["onClick", "onKeydown", "data-p-disabled", "data-p-selected"], Ll = ["onClick", "onKeydown", "data-p-disabled", "data-p-selected"];
function Kl(t, e, n, i, s, u) {
  var f = Zn("InputText"), h = Zn("Button"), b = Zn("Portal"), v = Oo("ripple");
  return Y(), J("span", j({
    ref: "container",
    id: s.d_id,
    class: t.cx("root"),
    style: t.sx("root")
  }, t.ptmi("root")), [t.inline ? me("", !0) : (Y(), Te(f, {
    key: 0,
    ref: u.inputRef,
    id: t.inputId,
    role: "combobox",
    class: En([t.inputClass, t.cx("pcInputText")]),
    style: Qa(t.inputStyle),
    defaultValue: u.inputFieldValue,
    placeholder: t.placeholder,
    name: t.name,
    size: t.size,
    invalid: t.invalid,
    variant: t.variant,
    fluid: t.fluid,
    unstyled: t.unstyled,
    autocomplete: "off",
    "aria-autocomplete": "none",
    "aria-haspopup": "dialog",
    "aria-expanded": s.overlayVisible,
    "aria-controls": u.panelId,
    "aria-labelledby": t.ariaLabelledby,
    "aria-label": t.ariaLabel,
    inputmode: "none",
    disabled: t.disabled,
    readonly: !t.manualInput || t.readonly,
    tabindex: 0,
    onInput: u.onInput,
    onClick: u.onInputClick,
    onFocus: u.onFocus,
    onBlur: u.onBlur,
    onKeydown: u.onKeyDown,
    pt: t.ptm("pcInputText")
  }, null, 8, ["id", "class", "style", "defaultValue", "placeholder", "name", "size", "invalid", "variant", "fluid", "unstyled", "aria-expanded", "aria-controls", "aria-labelledby", "aria-label", "disabled", "readonly", "onInput", "onClick", "onFocus", "onBlur", "onKeydown", "pt"])), t.showIcon && t.iconDisplay === "button" && !t.inline ? ve(t.$slots, "dropdownbutton", {
    key: 1,
    toggleCallback: u.onButtonClick
  }, function() {
    return [we("button", j({
      class: t.cx("dropdown"),
      disabled: t.disabled,
      onClick: e[0] || (e[0] = function() {
        return u.onButtonClick && u.onButtonClick.apply(u, arguments);
      }),
      type: "button",
      "aria-label": t.$primevue.config.locale.chooseDate,
      "aria-haspopup": "dialog",
      "aria-expanded": s.overlayVisible,
      "aria-controls": u.panelId
    }, t.ptm("dropdown")), [ve(t.$slots, "dropdownicon", {
      class: En(t.icon)
    }, function() {
      return [(Y(), Te(Ue(t.icon ? "span" : "CalendarIcon"), j({
        class: t.icon
      }, t.ptm("dropdownIcon")), null, 16, ["class"]))];
    })], 16, _l)];
  }) : t.showIcon && t.iconDisplay === "input" && !t.inline ? (Y(), J(dn, {
    key: 2
  }, [t.$slots.inputicon || t.showIcon ? (Y(), J("span", j({
    key: 0,
    class: t.cx("inputIconContainer")
  }, t.ptm("inputIconContainer")), [ve(t.$slots, "inputicon", {
    class: En(t.cx("inputIcon")),
    clickCallback: u.onButtonClick
  }, function() {
    return [(Y(), Te(Ue(t.icon ? "i" : "CalendarIcon"), j({
      class: [t.icon, t.cx("inputIcon")],
      onClick: u.onButtonClick
    }, t.ptm("inputicon")), null, 16, ["class", "onClick"]))];
  })], 16)) : me("", !0)], 64)) : me("", !0), qe(b, {
    appendTo: t.appendTo,
    disabled: t.inline
  }, {
    default: Fe(function() {
      return [qe(Ri, j({
        name: "p-connected-overlay",
        onEnter: e[58] || (e[58] = function(p) {
          return u.onOverlayEnter(p);
        }),
        onAfterEnter: u.onOverlayEnterComplete,
        onAfterLeave: u.onOverlayAfterLeave,
        onLeave: u.onOverlayLeave
      }, t.ptm("transition")), {
        default: Fe(function() {
          return [t.inline || s.overlayVisible ? (Y(), J("div", j({
            key: 0,
            ref: u.overlayRef,
            id: u.panelId,
            class: [t.cx("panel"), t.panelClass],
            style: t.panelStyle,
            role: t.inline ? null : "dialog",
            "aria-modal": t.inline ? null : "true",
            "aria-label": t.$primevue.config.locale.chooseDate,
            onClick: e[55] || (e[55] = function() {
              return u.onOverlayClick && u.onOverlayClick.apply(u, arguments);
            }),
            onKeydown: e[56] || (e[56] = function() {
              return u.onOverlayKeyDown && u.onOverlayKeyDown.apply(u, arguments);
            }),
            onMouseup: e[57] || (e[57] = function() {
              return u.onOverlayMouseUp && u.onOverlayMouseUp.apply(u, arguments);
            })
          }, t.ptm("panel")), [t.timeOnly ? me("", !0) : (Y(), J(dn, {
            key: 0
          }, [we("div", j({
            class: t.cx("calendarContainer")
          }, t.ptm("calendarContainer")), [(Y(!0), J(dn, null, it(u.months, function(p, O) {
            return Y(), J("div", j({
              key: p.month + p.year,
              class: t.cx("calendar"),
              ref_for: !0
            }, t.ptm("calendar")), [we("div", j({
              class: t.cx("header"),
              ref_for: !0
            }, t.ptm("header")), [ve(t.$slots, "header"), $n(qe(h, j({
              ref_for: !0,
              ref: u.previousButtonRef,
              class: t.cx("pcPrevButton"),
              disabled: t.disabled,
              "aria-label": s.currentView === "year" ? t.$primevue.config.locale.prevDecade : s.currentView === "month" ? t.$primevue.config.locale.prevYear : t.$primevue.config.locale.prevMonth,
              unstyled: t.unstyled,
              onClick: u.onPrevButtonClick,
              onKeydown: u.onContainerButtonKeydown
            }, t.navigatorButtonProps, {
              pt: t.ptm("pcPrevButton"),
              "data-pc-group-section": "navigator"
            }), {
              icon: Fe(function($) {
                return [ve(t.$slots, "previcon", {}, function() {
                  return [(Y(), Te(Ue(t.prevIcon ? "span" : "ChevronLeftIcon"), j({
                    class: [t.prevIcon, $.class],
                    ref_for: !0
                  }, t.ptm("pcPrevButton").icon), null, 16, ["class"]))];
                })];
              }),
              _: 2
            }, 1040, ["class", "disabled", "aria-label", "unstyled", "onClick", "onKeydown", "pt"]), [[vo, O === 0]]), we("div", j({
              class: t.cx("title"),
              ref_for: !0
            }, t.ptm("title")), [t.$primevue.config.locale.showMonthAfterYear ? (Y(), J(dn, {
              key: 0
            }, [s.currentView !== "year" ? (Y(), J("button", j({
              key: 0,
              type: "button",
              onClick: e[1] || (e[1] = function() {
                return u.switchToYearView && u.switchToYearView.apply(u, arguments);
              }),
              onKeydown: e[2] || (e[2] = function() {
                return u.onContainerButtonKeydown && u.onContainerButtonKeydown.apply(u, arguments);
              }),
              class: t.cx("selectYear"),
              disabled: u.switchViewButtonDisabled,
              "aria-label": t.$primevue.config.locale.chooseYear,
              ref_for: !0
            }, t.ptm("selectYear"), {
              "data-pc-group-section": "view"
            }), xe(u.getYear(p)), 17, Tl)) : me("", !0), s.currentView === "date" ? (Y(), J("button", j({
              key: 1,
              type: "button",
              onClick: e[3] || (e[3] = function() {
                return u.switchToMonthView && u.switchToMonthView.apply(u, arguments);
              }),
              onKeydown: e[4] || (e[4] = function() {
                return u.onContainerButtonKeydown && u.onContainerButtonKeydown.apply(u, arguments);
              }),
              class: t.cx("selectMonth"),
              disabled: u.switchViewButtonDisabled,
              "aria-label": t.$primevue.config.locale.chooseMonth,
              ref_for: !0
            }, t.ptm("selectMonth"), {
              "data-pc-group-section": "view"
            }), xe(u.getMonthName(p.month)), 17, Ol)) : me("", !0)], 64)) : (Y(), J(dn, {
              key: 1
            }, [s.currentView === "date" ? (Y(), J("button", j({
              key: 0,
              type: "button",
              onClick: e[5] || (e[5] = function() {
                return u.switchToMonthView && u.switchToMonthView.apply(u, arguments);
              }),
              onKeydown: e[6] || (e[6] = function() {
                return u.onContainerButtonKeydown && u.onContainerButtonKeydown.apply(u, arguments);
              }),
              class: t.cx("selectMonth"),
              disabled: u.switchViewButtonDisabled,
              "aria-label": t.$primevue.config.locale.chooseMonth,
              ref_for: !0
            }, t.ptm("selectMonth"), {
              "data-pc-group-section": "view"
            }), xe(u.getMonthName(p.month)), 17, $l)) : me("", !0), s.currentView !== "year" ? (Y(), J("button", j({
              key: 1,
              type: "button",
              onClick: e[7] || (e[7] = function() {
                return u.switchToYearView && u.switchToYearView.apply(u, arguments);
              }),
              onKeydown: e[8] || (e[8] = function() {
                return u.onContainerButtonKeydown && u.onContainerButtonKeydown.apply(u, arguments);
              }),
              class: t.cx("selectYear"),
              disabled: u.switchViewButtonDisabled,
              "aria-label": t.$primevue.config.locale.chooseYear,
              ref_for: !0
            }, t.ptm("selectYear"), {
              "data-pc-group-section": "view"
            }), xe(u.getYear(p)), 17, El)) : me("", !0)], 64)), s.currentView === "year" ? (Y(), J("span", j({
              key: 2,
              class: t.cx("decade"),
              ref_for: !0
            }, t.ptm("decade")), [ve(t.$slots, "decade", {
              years: u.yearPickerValues
            }, function() {
              return [Wn(xe(u.yearPickerValues[0].value) + " - " + xe(u.yearPickerValues[u.yearPickerValues.length - 1].value), 1)];
            })], 16)) : me("", !0)], 16), $n(qe(h, j({
              ref_for: !0,
              ref: u.nextButtonRef,
              class: t.cx("pcNextButton"),
              disabled: t.disabled,
              "aria-label": s.currentView === "year" ? t.$primevue.config.locale.nextDecade : s.currentView === "month" ? t.$primevue.config.locale.nextYear : t.$primevue.config.locale.nextMonth,
              unstyled: t.unstyled,
              onClick: u.onNextButtonClick,
              onKeydown: u.onContainerButtonKeydown
            }, t.navigatorButtonProps, {
              pt: t.ptm("pcNextButton"),
              "data-pc-group-section": "navigator"
            }), {
              icon: Fe(function($) {
                return [ve(t.$slots, "nexticon", {}, function() {
                  return [(Y(), Te(Ue(t.nextIcon ? "span" : "ChevronRightIcon"), j({
                    class: [t.nextIcon, $.class],
                    ref_for: !0
                  }, t.ptm("pcNextButton").icon), null, 16, ["class"]))];
                })];
              }),
              _: 2
            }, 1040, ["class", "disabled", "aria-label", "unstyled", "onClick", "onKeydown", "pt"]), [[vo, t.numberOfMonths === 1 ? !0 : O === t.numberOfMonths - 1]])], 16), s.currentView === "date" ? (Y(), J("table", j({
              key: 0,
              class: t.cx("dayView"),
              role: "grid",
              ref_for: !0
            }, t.ptm("dayView")), [we("thead", j({
              ref_for: !0
            }, t.ptm("tableHeader")), [we("tr", j({
              ref_for: !0
            }, t.ptm("tableHeaderRow")), [t.showWeek ? (Y(), J("th", j({
              key: 0,
              scope: "col",
              class: t.cx("weekHeader"),
              ref_for: !0
            }, t.ptm("weekHeader", {
              context: {
                disabled: t.showWeek
              }
            }), {
              "data-p-disabled": t.showWeek,
              "data-pc-group-section": "tableheadercell"
            }), [ve(t.$slots, "weekheaderlabel", {}, function() {
              return [we("span", j({
                ref_for: !0
              }, t.ptm("weekHeaderLabel", {
                context: {
                  disabled: t.showWeek
                }
              }), {
                "data-pc-group-section": "tableheadercelllabel"
              }), xe(u.weekHeaderLabel), 17)];
            })], 16, Ml)) : me("", !0), (Y(!0), J(dn, null, it(u.weekDays, function($) {
              return Y(), J("th", j({
                key: $,
                scope: "col",
                abbr: $,
                ref_for: !0
              }, t.ptm("tableHeaderCell"), {
                "data-pc-group-section": "tableheadercell",
                class: t.cx("weekDayCell")
              }), [we("span", j({
                class: t.cx("weekDay"),
                ref_for: !0
              }, t.ptm("weekDay"), {
                "data-pc-group-section": "tableheadercelllabel"
              }), xe($), 17)], 16, Il);
            }), 128))], 16)], 16), we("tbody", j({
              ref_for: !0
            }, t.ptm("tableBody")), [(Y(!0), J(dn, null, it(p.dates, function($, I) {
              return Y(), J("tr", j({
                key: $[0].day + "" + $[0].month,
                ref_for: !0
              }, t.ptm("tableBodyRow")), [t.showWeek ? (Y(), J("td", j({
                key: 0,
                class: t.cx("weekNumber"),
                ref_for: !0
              }, t.ptm("weekNumber"), {
                "data-pc-group-section": "tablebodycell"
              }), [we("span", j({
                class: t.cx("weekLabelContainer"),
                ref_for: !0
              }, t.ptm("weekLabelContainer", {
                context: {
                  disabled: t.showWeek
                }
              }), {
                "data-p-disabled": t.showWeek,
                "data-pc-group-section": "tablebodycelllabel"
              }), [ve(t.$slots, "weeklabel", {
                weekNumber: p.weekNumbers[I]
              }, function() {
                return [p.weekNumbers[I] < 10 ? (Y(), J("span", j({
                  key: 0,
                  style: {
                    visibility: "hidden"
                  },
                  ref_for: !0
                }, t.ptm("weekLabel")), "0", 16)) : me("", !0), Wn(" " + xe(p.weekNumbers[I]), 1)];
              })], 16, Al)], 16)) : me("", !0), (Y(!0), J(dn, null, it($, function(A) {
                return Y(), J("td", j({
                  key: A.day + "" + A.month,
                  "aria-label": A.day,
                  class: t.cx("dayCell", {
                    date: A
                  }),
                  ref_for: !0
                }, t.ptm("dayCell", {
                  context: {
                    date: A,
                    today: A.today,
                    otherMonth: A.otherMonth,
                    selected: u.isSelected(A),
                    disabled: !A.selectable
                  }
                }), {
                  "data-p-today": A.today,
                  "data-p-other-month": A.otherMonth,
                  "data-pc-group-section": "tablebodycell"
                }), [t.showOtherMonths || !A.otherMonth ? $n((Y(), J("span", j({
                  key: 0,
                  class: t.cx("day", {
                    date: A
                  }),
                  onClick: function(G) {
                    return u.onDateSelect(G, A);
                  },
                  draggable: "false",
                  onKeydown: function(G) {
                    return u.onDateCellKeydown(G, A, O);
                  },
                  "aria-selected": u.isSelected(A),
                  "aria-disabled": !A.selectable,
                  ref_for: !0
                }, t.ptm("day", {
                  context: {
                    date: A,
                    today: A.today,
                    otherMonth: A.otherMonth,
                    selected: u.isSelected(A),
                    disabled: !A.selectable
                  }
                }), {
                  "data-p-disabled": !A.selectable,
                  "data-p-selected": u.isSelected(A),
                  "data-pc-group-section": "tablebodycelllabel"
                }), [ve(t.$slots, "date", {
                  date: A
                }, function() {
                  return [Wn(xe(A.day), 1)];
                })], 16, jl)), [[v]]) : me("", !0), u.isSelected(A) ? (Y(), J("div", j({
                  key: 1,
                  class: "p-hidden-accessible",
                  "aria-live": "polite",
                  ref_for: !0
                }, t.ptm("hiddenSelectedDay"), {
                  "data-p-hidden-accessible": !0
                }), xe(A.day), 17)) : me("", !0)], 16, Bl);
              }), 128))], 16);
            }), 128))], 16)], 16)) : me("", !0)], 16);
          }), 128))], 16), s.currentView === "month" ? (Y(), J("div", j({
            key: 0,
            class: t.cx("monthView")
          }, t.ptm("monthView")), [(Y(!0), J(dn, null, it(u.monthPickerValues, function(p, O) {
            return $n((Y(), J("span", j({
              key: p,
              onClick: function(I) {
                return u.onMonthSelect(I, {
                  month: p,
                  index: O
                });
              },
              onKeydown: function(I) {
                return u.onMonthCellKeydown(I, {
                  month: p,
                  index: O
                });
              },
              class: t.cx("month", {
                month: p,
                index: O
              }),
              ref_for: !0
            }, t.ptm("month", {
              context: {
                month: p,
                monthIndex: O,
                selected: u.isMonthSelected(O),
                disabled: !p.selectable
              }
            }), {
              "data-p-disabled": !p.selectable,
              "data-p-selected": u.isMonthSelected(O)
            }), [Wn(xe(p.value) + " ", 1), u.isMonthSelected(O) ? (Y(), J("div", j({
              key: 0,
              class: "p-hidden-accessible",
              "aria-live": "polite",
              ref_for: !0
            }, t.ptm("hiddenMonth"), {
              "data-p-hidden-accessible": !0
            }), xe(p.value), 17)) : me("", !0)], 16, Vl)), [[v]]);
          }), 128))], 16)) : me("", !0), s.currentView === "year" ? (Y(), J("div", j({
            key: 1,
            class: t.cx("yearView")
          }, t.ptm("yearView")), [(Y(!0), J(dn, null, it(u.yearPickerValues, function(p) {
            return $n((Y(), J("span", j({
              key: p.value,
              onClick: function($) {
                return u.onYearSelect($, p);
              },
              onKeydown: function($) {
                return u.onYearCellKeydown($, p);
              },
              class: t.cx("year", {
                year: p
              }),
              ref_for: !0
            }, t.ptm("year", {
              context: {
                year: p,
                selected: u.isYearSelected(p.value),
                disabled: !p.selectable
              }
            }), {
              "data-p-disabled": !p.selectable,
              "data-p-selected": u.isYearSelected(p.value)
            }), [Wn(xe(p.value) + " ", 1), u.isYearSelected(p.value) ? (Y(), J("div", j({
              key: 0,
              class: "p-hidden-accessible",
              "aria-live": "polite",
              ref_for: !0
            }, t.ptm("hiddenYear"), {
              "data-p-hidden-accessible": !0
            }), xe(p.value), 17)) : me("", !0)], 16, Ll)), [[v]]);
          }), 128))], 16)) : me("", !0)], 64)), (t.showTime || t.timeOnly) && s.currentView === "date" ? (Y(), J("div", j({
            key: 1,
            class: t.cx("timePicker")
          }, t.ptm("timePicker")), [we("div", j({
            class: t.cx("hourPicker")
          }, t.ptm("hourPicker"), {
            "data-pc-group-section": "timepickerContainer"
          }), [qe(h, j({
            class: t.cx("pcIncrementButton"),
            "aria-label": t.$primevue.config.locale.nextHour,
            unstyled: t.unstyled,
            onMousedown: e[9] || (e[9] = function(p) {
              return u.onTimePickerElementMouseDown(p, 0, 1);
            }),
            onMouseup: e[10] || (e[10] = function(p) {
              return u.onTimePickerElementMouseUp(p);
            }),
            onKeydown: [u.onContainerButtonKeydown, e[12] || (e[12] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 0, 1);
            }, ["enter"])), e[13] || (e[13] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 0, 1);
            }, ["space"]))],
            onMouseleave: e[11] || (e[11] = function(p) {
              return u.onTimePickerElementMouseLeave();
            }),
            onKeyup: [e[14] || (e[14] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["enter"])), e[15] || (e[15] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["space"]))]
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcIncrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "incrementicon", {}, function() {
                return [(Y(), Te(Ue(t.incrementIcon ? "span" : "ChevronUpIcon"), j({
                  class: [t.incrementIcon, p.class]
                }, t.ptm("pcIncrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "unstyled", "onKeydown", "pt"]), we("span", j(t.ptm("hour"), {
            "data-pc-group-section": "timepickerlabel"
          }), xe(u.formattedCurrentHour), 17), qe(h, j({
            class: t.cx("pcDecrementButton"),
            "aria-label": t.$primevue.config.locale.prevHour,
            unstyled: t.unstyled,
            onMousedown: e[16] || (e[16] = function(p) {
              return u.onTimePickerElementMouseDown(p, 0, -1);
            }),
            onMouseup: e[17] || (e[17] = function(p) {
              return u.onTimePickerElementMouseUp(p);
            }),
            onKeydown: [u.onContainerButtonKeydown, e[19] || (e[19] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 0, -1);
            }, ["enter"])), e[20] || (e[20] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 0, -1);
            }, ["space"]))],
            onMouseleave: e[18] || (e[18] = function(p) {
              return u.onTimePickerElementMouseLeave();
            }),
            onKeyup: [e[21] || (e[21] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["enter"])), e[22] || (e[22] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["space"]))]
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcDecrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "decrementicon", {}, function() {
                return [(Y(), Te(Ue(t.decrementIcon ? "span" : "ChevronDownIcon"), j({
                  class: [t.decrementIcon, p.class]
                }, t.ptm("pcDecrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "unstyled", "onKeydown", "pt"])], 16), we("div", j(t.ptm("separatorContainer"), {
            "data-pc-group-section": "timepickerContainer"
          }), [we("span", j(t.ptm("separator"), {
            "data-pc-group-section": "timepickerlabel"
          }), xe(t.timeSeparator), 17)], 16), we("div", j({
            class: t.cx("minutePicker")
          }, t.ptm("minutePicker"), {
            "data-pc-group-section": "timepickerContainer"
          }), [qe(h, j({
            class: t.cx("pcIncrementButton"),
            "aria-label": t.$primevue.config.locale.nextMinute,
            disabled: t.disabled,
            unstyled: t.unstyled,
            onMousedown: e[23] || (e[23] = function(p) {
              return u.onTimePickerElementMouseDown(p, 1, 1);
            }),
            onMouseup: e[24] || (e[24] = function(p) {
              return u.onTimePickerElementMouseUp(p);
            }),
            onKeydown: [u.onContainerButtonKeydown, e[26] || (e[26] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 1, 1);
            }, ["enter"])), e[27] || (e[27] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 1, 1);
            }, ["space"]))],
            onMouseleave: e[25] || (e[25] = function(p) {
              return u.onTimePickerElementMouseLeave();
            }),
            onKeyup: [e[28] || (e[28] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["enter"])), e[29] || (e[29] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["space"]))]
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcIncrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "incrementicon", {}, function() {
                return [(Y(), Te(Ue(t.incrementIcon ? "span" : "ChevronUpIcon"), j({
                  class: [t.incrementIcon, p.class]
                }, t.ptm("pcIncrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "disabled", "unstyled", "onKeydown", "pt"]), we("span", j(t.ptm("minute"), {
            "data-pc-group-section": "timepickerlabel"
          }), xe(u.formattedCurrentMinute), 17), qe(h, j({
            class: t.cx("pcDecrementButton"),
            "aria-label": t.$primevue.config.locale.prevMinute,
            disabled: t.disabled,
            onMousedown: e[30] || (e[30] = function(p) {
              return u.onTimePickerElementMouseDown(p, 1, -1);
            }),
            onMouseup: e[31] || (e[31] = function(p) {
              return u.onTimePickerElementMouseUp(p);
            }),
            onKeydown: [u.onContainerButtonKeydown, e[33] || (e[33] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 1, -1);
            }, ["enter"])), e[34] || (e[34] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 1, -1);
            }, ["space"]))],
            onMouseleave: e[32] || (e[32] = function(p) {
              return u.onTimePickerElementMouseLeave();
            }),
            onKeyup: [e[35] || (e[35] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["enter"])), e[36] || (e[36] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["space"]))]
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcDecrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "decrementicon", {}, function() {
                return [(Y(), Te(Ue(t.decrementIcon ? "span" : "ChevronDownIcon"), j({
                  class: [t.decrementIcon, p.class]
                }, t.ptm("pcDecrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "disabled", "onKeydown", "pt"])], 16), t.showSeconds ? (Y(), J("div", j({
            key: 0,
            class: t.cx("separatorContainer")
          }, t.ptm("separatorContainer"), {
            "data-pc-group-section": "timepickerContainer"
          }), [we("span", j(t.ptm("separator"), {
            "data-pc-group-section": "timepickerlabel"
          }), xe(t.timeSeparator), 17)], 16)) : me("", !0), t.showSeconds ? (Y(), J("div", j({
            key: 1,
            class: t.cx("secondPicker")
          }, t.ptm("secondPicker"), {
            "data-pc-group-section": "timepickerContainer"
          }), [qe(h, j({
            class: t.cx("pcIncrementButton"),
            "aria-label": t.$primevue.config.locale.nextSecond,
            disabled: t.disabled,
            unstyled: t.unstyled,
            onMousedown: e[37] || (e[37] = function(p) {
              return u.onTimePickerElementMouseDown(p, 2, 1);
            }),
            onMouseup: e[38] || (e[38] = function(p) {
              return u.onTimePickerElementMouseUp(p);
            }),
            onKeydown: [u.onContainerButtonKeydown, e[40] || (e[40] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 2, 1);
            }, ["enter"])), e[41] || (e[41] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 2, 1);
            }, ["space"]))],
            onMouseleave: e[39] || (e[39] = function(p) {
              return u.onTimePickerElementMouseLeave();
            }),
            onKeyup: [e[42] || (e[42] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["enter"])), e[43] || (e[43] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["space"]))]
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcIncrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "incrementicon", {}, function() {
                return [(Y(), Te(Ue(t.incrementIcon ? "span" : "ChevronUpIcon"), j({
                  class: [t.incrementIcon, p.class]
                }, t.ptm("pcIncrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "disabled", "unstyled", "onKeydown", "pt"]), we("span", j(t.ptm("second"), {
            "data-pc-group-section": "timepickerlabel"
          }), xe(u.formattedCurrentSecond), 17), qe(h, j({
            class: t.cx("pcDecrementButton"),
            "aria-label": t.$primevue.config.locale.prevSecond,
            disabled: t.disabled,
            unstyled: t.unstyled,
            onMousedown: e[44] || (e[44] = function(p) {
              return u.onTimePickerElementMouseDown(p, 2, -1);
            }),
            onMouseup: e[45] || (e[45] = function(p) {
              return u.onTimePickerElementMouseUp(p);
            }),
            onKeydown: [u.onContainerButtonKeydown, e[47] || (e[47] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 2, -1);
            }, ["enter"])), e[48] || (e[48] = Pe(function(p) {
              return u.onTimePickerElementMouseDown(p, 2, -1);
            }, ["space"]))],
            onMouseleave: e[46] || (e[46] = function(p) {
              return u.onTimePickerElementMouseLeave();
            }),
            onKeyup: [e[49] || (e[49] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["enter"])), e[50] || (e[50] = Pe(function(p) {
              return u.onTimePickerElementMouseUp(p);
            }, ["space"]))]
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcDecrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "decrementicon", {}, function() {
                return [(Y(), Te(Ue(t.decrementIcon ? "span" : "ChevronDownIcon"), j({
                  class: [t.decrementIcon, p.class]
                }, t.ptm("pcDecrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "disabled", "unstyled", "onKeydown", "pt"])], 16)) : me("", !0), t.hourFormat == "12" ? (Y(), J("div", j({
            key: 2,
            class: t.cx("separatorContainer")
          }, t.ptm("separatorContainer"), {
            "data-pc-group-section": "timepickerContainer"
          }), [we("span", j(t.ptm("separator"), {
            "data-pc-group-section": "timepickerlabel"
          }), xe(t.timeSeparator), 17)], 16)) : me("", !0), t.hourFormat == "12" ? (Y(), J("div", j({
            key: 3,
            class: t.cx("ampmPicker")
          }, t.ptm("ampmPicker")), [qe(h, j({
            class: t.cx("pcIncrementButton"),
            "aria-label": t.$primevue.config.locale.am,
            disabled: t.disabled,
            unstyled: t.unstyled,
            onClick: e[51] || (e[51] = function(p) {
              return u.toggleAMPM(p);
            }),
            onKeydown: u.onContainerButtonKeydown
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcIncrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "incrementicon", {
                class: En(t.cx("incrementIcon"))
              }, function() {
                return [(Y(), Te(Ue(t.incrementIcon ? "span" : "ChevronUpIcon"), j({
                  class: [t.cx("incrementIcon"), p.class]
                }, t.ptm("pcIncrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "disabled", "unstyled", "onKeydown", "pt"]), we("span", j(t.ptm("ampm"), {
            "data-pc-group-section": "timepickerlabel"
          }), xe(s.pm ? t.$primevue.config.locale.pm : t.$primevue.config.locale.am), 17), qe(h, j({
            class: t.cx("pcDecrementButton"),
            "aria-label": t.$primevue.config.locale.pm,
            disabled: t.disabled,
            onClick: e[52] || (e[52] = function(p) {
              return u.toggleAMPM(p);
            }),
            onKeydown: u.onContainerButtonKeydown
          }, t.timepickerButtonProps, {
            pt: t.ptm("pcDecrementButton"),
            "data-pc-group-section": "timepickerbutton"
          }), {
            icon: Fe(function(p) {
              return [ve(t.$slots, "decrementicon", {
                class: En(t.cx("decrementIcon"))
              }, function() {
                return [(Y(), Te(Ue(t.decrementIcon ? "span" : "ChevronDownIcon"), j({
                  class: [t.cx("decrementIcon"), p.class]
                }, t.ptm("pcDecrementButton").icon, {
                  "data-pc-group-section": "timepickerlabel"
                }), null, 16, ["class"]))];
              })];
            }),
            _: 3
          }, 16, ["class", "aria-label", "disabled", "onKeydown", "pt"])], 16)) : me("", !0)], 16)) : me("", !0), t.showButtonBar ? (Y(), J("div", j({
            key: 2,
            class: t.cx("buttonbar")
          }, t.ptm("buttonbar")), [qe(h, j({
            label: u.todayLabel,
            onClick: e[53] || (e[53] = function(p) {
              return u.onTodayButtonClick(p);
            }),
            class: t.cx("pcTodayButton"),
            unstyled: t.unstyled,
            onKeydown: u.onContainerButtonKeydown
          }, t.todayButtonProps, {
            pt: t.ptm("pcTodayButton"),
            "data-pc-group-section": "button"
          }), null, 16, ["label", "class", "unstyled", "onKeydown", "pt"]), qe(h, j({
            label: u.clearLabel,
            onClick: e[54] || (e[54] = function(p) {
              return u.onClearButtonClick(p);
            }),
            class: t.cx("pcClearButton"),
            unstyled: t.unstyled,
            onKeydown: u.onContainerButtonKeydown
          }, t.clearButtonProps, {
            pt: t.ptm("pcClearButton"),
            "data-pc-group-section": "button"
          }), null, 16, ["label", "class", "unstyled", "onKeydown", "pt"])], 16)) : me("", !0), ve(t.$slots, "footer")], 16, Pl)) : me("", !0)];
        }),
        _: 3
      }, 16, ["onAfterEnter", "onAfterLeave", "onLeave"])];
    }),
    _: 3
  }, 8, ["appendTo", "disabled"])], 16, Dl);
}
ma.render = Kl;
const Nl = /* @__PURE__ */ Yi({
  __name: "InputDatepicker",
  props: {
    context: {}
  },
  emits: ["valueChange"],
  async setup(t, { emit: e }) {
    let n, i;
    const s = {
      INVALID_TYPE_NUMBER: "The binded value from formkit is not a number while convertToNumber is set true",
      UNABLE_TO_GET_DISABLED_DATES: "can't get the disabled dates from the response",
      INVALID_DISABLED_DATES_RESPONSE: "disabled dates return Unsupported type.. Suupported types are date[] | number[]",
      INVALID_TYPE_DATE: "The binded value from formkit is not a date while convertToNumber is set false",
      RANGE_REQUIRES_ARRAY: "The value must be an array if selectionMode is range",
      SINGLE_REQUIRES_NON_ARRAY: "The value cannot be an array if selectionMode is not range"
    }, u = Xa("apiClient"), f = e, {
      node: h,
      disabledDates: b,
      disabledDatesRequestPropertyName: v = "recordId",
      dsiabledDatesRequestMapper: p,
      disabledDatesResponsePropertyName: O = "dates",
      dsiabledDatesResponseMapper: $,
      convertToNumber: I,
      disabledDatesDependsOn: A,
      selectionMode: q
    } = t.context, G = as(A), ne = Ja(
      () => {
        var Z;
        return ((Z = G.value) == null ? void 0 : Z.value) ?? void 0;
      }
    ), ee = { ...t.context }, V = Dt(), U = (Z) => {
      if (q === "range" && !Array.isArray(Z))
        throw new Error(s.RANGE_REQUIRES_ARRAY);
      if (q !== "range" && Array.isArray(Z))
        throw new Error(s.SINGLE_REQUIRES_NON_ARRAY);
    }, ge = (Z) => {
      if (U(Z), Array.isArray(Z) && Z.length == 0)
        return [];
      if (Array.isArray(Z)) {
        if (Z.every((oe) => oe instanceof Date))
          return Z.map((oe) => Fi(oe));
        throw new Error(s.INVALID_TYPE_DATE);
      }
      if (Z instanceof Date)
        return Fi(Z);
      throw new Error(s.INVALID_TYPE_DATE);
    }, ce = () => {
      const { value: Z } = h;
      if (U(Z), Array.isArray(Z) && Z.length == 0)
        return [];
      if (Array.isArray(Z)) {
        if (Z.every((oe) => typeof oe == "number"))
          return Z.map((oe) => yo(oe));
        throw new Error(s.INVALID_TYPE_DATE);
      }
      if (typeof Z == "number")
        return yo(Z);
      throw new Error(s.INVALID_TYPE_DATE);
    }, de = (Z) => Z.length == 0 ? [] : Z.every((oe) => oe instanceof Date) ? Z : Z.every((oe) => typeof oe == "number") ? Z.map((oe) => yo(oe)) : (console.error(s.INVALID_DISABLED_DATES_RESPONSE), []), Se = (Z) => {
      if (!I) {
        f("valueChange", Z);
        return;
      }
      const oe = ge(Z);
      f("valueChange", oe);
    }, je = () => new Promise((Z) => {
      if (!b) return Z([]);
      let oe = {};
      ne.value && (p ? oe = p(ne.value) : oe[v] = ne.value), os(
        b,
        u,
        oe
      ).then((pe) => {
        if (Array.isArray(pe))
          return Z(de(pe));
        if ($) {
          const ke = $(pe);
          if (Array.isArray(ke))
            return Z(de(ke));
        }
        if (O in pe) {
          const ke = pe[O];
          if (Array.isArray(ke))
            return Z(de(ke));
        }
        console.error(s.UNABLE_TO_GET_DISABLED_DATES), Z([]);
      });
    }), $e = ss({
      queryKey: [`${h.name}-disabled-dates`, ne.value],
      queryFn: je,
      enabled: !0,
      refetchOnWindowFocus: !1
    }), Ae = () => new Promise((Z, oe) => {
      try {
        const { value: pe } = h;
        if (pe == null)
          return V.value = null, Z();
        if (I)
          try {
            return V.value = ce(), Z();
          } catch (ke) {
            return oe(ke);
          }
        return pe instanceof Date ? (V.value = new Date(pe), Z()) : Array.isArray(pe) && pe.every((ke) => ke instanceof Date) ? (V.value = pe.map((ke) => new Date(ke)), Z()) : oe(new Error(`Unsupported value type: ${typeof pe}`));
      } catch (pe) {
        return console.error("Error in init function:", pe), oe(pe);
      }
    });
    [n, i] = es(() => Ae()), await n, i();
    const Be = () => pi(
      ma,
      {
        ...ee,
        modelValue: h.context ? h.context._value : void 0,
        disabledDates: $e.data.value,
        "onUpdate:modelValue": Se
      },
      {
        date: $e.isLoading.value || $e.isFetching.value ? () => pi(is, {
          shape: "circle",
          size: "1.5rem"
        }) : void 0
      }
    );
    return (Z, oe) => (Y(), Te(Ue(Be)));
  }
});
var ba = {
  name: "TimesIcon",
  extends: Gn
};
function Fl(t, e, n, i, s, u) {
  return Y(), J("svg", j({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, t.pti()), e[0] || (e[0] = [we("path", {
    d: "M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
ba.render = Fl;
var Rl = function(e) {
  var n = e.dt;
  return `
.p-message {
    border-radius: `.concat(n("message.border.radius"), `;
    outline-width: `).concat(n("message.border.width"), `;
    outline-style: solid;
}

.p-message-content {
    display: flex;
    align-items: center;
    padding: `).concat(n("message.content.padding"), `;
    gap: `).concat(n("message.content.gap"), `;
    height: 100%;
}

.p-message-icon {
    flex-shrink: 0;
}

.p-message-close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-inline-start: auto;
    overflow: hidden;
    position: relative;
    width: `).concat(n("message.close.button.width"), `;
    height: `).concat(n("message.close.button.height"), `;
    border-radius: `).concat(n("message.close.button.border.radius"), `;
    background: transparent;
    transition: background `).concat(n("message.transition.duration"), ", color ").concat(n("message.transition.duration"), ", outline-color ").concat(n("message.transition.duration"), ", box-shadow ").concat(n("message.transition.duration"), `, opacity 0.3s;
    outline-color: transparent;
    color: inherit;
    padding: 0;
    border: none;
    cursor: pointer;
    user-select: none;
}

.p-message-close-icon {
    font-size: `).concat(n("message.close.icon.size"), `;
    width: `).concat(n("message.close.icon.size"), `;
    height: `).concat(n("message.close.icon.size"), `;
}

.p-message-close-button:focus-visible {
    outline-width: `).concat(n("message.close.button.focus.ring.width"), `;
    outline-style: `).concat(n("message.close.button.focus.ring.style"), `;
    outline-offset: `).concat(n("message.close.button.focus.ring.offset"), `;
}

.p-message-info {
    background: `).concat(n("message.info.background"), `;
    outline-color: `).concat(n("message.info.border.color"), `;
    color: `).concat(n("message.info.color"), `;
    box-shadow: `).concat(n("message.info.shadow"), `;
}

.p-message-info .p-message-close-button:focus-visible {
    outline-color: `).concat(n("message.info.close.button.focus.ring.color"), `;
    box-shadow: `).concat(n("message.info.close.button.focus.ring.shadow"), `;
}

.p-message-info .p-message-close-button:hover {
    background: `).concat(n("message.info.close.button.hover.background"), `;
}

.p-message-info.p-message-outlined {
    color: `).concat(n("message.info.outlined.color"), `;
    outline-color: `).concat(n("message.info.outlined.border.color"), `;
}

.p-message-info.p-message-simple {
    color: `).concat(n("message.info.simple.color"), `;
}

.p-message-success {
    background: `).concat(n("message.success.background"), `;
    outline-color: `).concat(n("message.success.border.color"), `;
    color: `).concat(n("message.success.color"), `;
    box-shadow: `).concat(n("message.success.shadow"), `;
}

.p-message-success .p-message-close-button:focus-visible {
    outline-color: `).concat(n("message.success.close.button.focus.ring.color"), `;
    box-shadow: `).concat(n("message.success.close.button.focus.ring.shadow"), `;
}

.p-message-success .p-message-close-button:hover {
    background: `).concat(n("message.success.close.button.hover.background"), `;
}

.p-message-success.p-message-outlined {
    color: `).concat(n("message.success.outlined.color"), `;
    outline-color: `).concat(n("message.success.outlined.border.color"), `;
}

.p-message-success.p-message-simple {
    color: `).concat(n("message.success.simple.color"), `;
}

.p-message-warn {
    background: `).concat(n("message.warn.background"), `;
    outline-color: `).concat(n("message.warn.border.color"), `;
    color: `).concat(n("message.warn.color"), `;
    box-shadow: `).concat(n("message.warn.shadow"), `;
}

.p-message-warn .p-message-close-button:focus-visible {
    outline-color: `).concat(n("message.warn.close.button.focus.ring.color"), `;
    box-shadow: `).concat(n("message.warn.close.button.focus.ring.shadow"), `;
}

.p-message-warn .p-message-close-button:hover {
    background: `).concat(n("message.warn.close.button.hover.background"), `;
}

.p-message-warn.p-message-outlined {
    color: `).concat(n("message.warn.outlined.color"), `;
    outline-color: `).concat(n("message.warn.outlined.border.color"), `;
}

.p-message-warn.p-message-simple {
    color: `).concat(n("message.warn.simple.color"), `;
}

.p-message-error {
    background: `).concat(n("message.error.background"), `;
    outline-color: `).concat(n("message.error.border.color"), `;
    color: `).concat(n("message.error.color"), `;
    box-shadow: `).concat(n("message.error.shadow"), `;
}

.p-message-error .p-message-close-button:focus-visible {
    outline-color: `).concat(n("message.error.close.button.focus.ring.color"), `;
    box-shadow: `).concat(n("message.error.close.button.focus.ring.shadow"), `;
}

.p-message-error .p-message-close-button:hover {
    background: `).concat(n("message.error.close.button.hover.background"), `;
}

.p-message-error.p-message-outlined {
    color: `).concat(n("message.error.outlined.color"), `;
    outline-color: `).concat(n("message.error.outlined.border.color"), `;
}

.p-message-error.p-message-simple {
    color: `).concat(n("message.error.simple.color"), `;
}

.p-message-secondary {
    background: `).concat(n("message.secondary.background"), `;
    outline-color: `).concat(n("message.secondary.border.color"), `;
    color: `).concat(n("message.secondary.color"), `;
    box-shadow: `).concat(n("message.secondary.shadow"), `;
}

.p-message-secondary .p-message-close-button:focus-visible {
    outline-color: `).concat(n("message.secondary.close.button.focus.ring.color"), `;
    box-shadow: `).concat(n("message.secondary.close.button.focus.ring.shadow"), `;
}

.p-message-secondary .p-message-close-button:hover {
    background: `).concat(n("message.secondary.close.button.hover.background"), `;
}

.p-message-secondary.p-message-outlined {
    color: `).concat(n("message.secondary.outlined.color"), `;
    outline-color: `).concat(n("message.secondary.outlined.border.color"), `;
}

.p-message-secondary.p-message-simple {
    color: `).concat(n("message.secondary.simple.color"), `;
}

.p-message-contrast {
    background: `).concat(n("message.contrast.background"), `;
    outline-color: `).concat(n("message.contrast.border.color"), `;
    color: `).concat(n("message.contrast.color"), `;
    box-shadow: `).concat(n("message.contrast.shadow"), `;
}

.p-message-contrast .p-message-close-button:focus-visible {
    outline-color: `).concat(n("message.contrast.close.button.focus.ring.color"), `;
    box-shadow: `).concat(n("message.contrast.close.button.focus.ring.shadow"), `;
}

.p-message-contrast .p-message-close-button:hover {
    background: `).concat(n("message.contrast.close.button.hover.background"), `;
}

.p-message-contrast.p-message-outlined {
    color: `).concat(n("message.contrast.outlined.color"), `;
    outline-color: `).concat(n("message.contrast.outlined.border.color"), `;
}

.p-message-contrast.p-message-simple {
    color: `).concat(n("message.contrast.simple.color"), `;
}

.p-message-text {
    font-size: `).concat(n("message.text.font.size"), `;
    font-weight: `).concat(n("message.text.font.weight"), `;
}

.p-message-icon {
    font-size: `).concat(n("message.icon.size"), `;
    width: `).concat(n("message.icon.size"), `;
    height: `).concat(n("message.icon.size"), `;
}

.p-message-enter-from {
    opacity: 0;
}

.p-message-enter-active {
    transition: opacity 0.3s;
}

.p-message.p-message-leave-from {
    max-height: 1000px;
}

.p-message.p-message-leave-to {
    max-height: 0;
    opacity: 0;
    margin: 0;
}

.p-message-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.3s;
}

.p-message-leave-active .p-message-close-button {
    opacity: 0;
}

.p-message-sm .p-message-content {
    padding: `).concat(n("message.content.sm.padding"), `;
}

.p-message-sm .p-message-text {
    font-size: `).concat(n("message.text.sm.font.size"), `;
}

.p-message-sm .p-message-icon {
    font-size: `).concat(n("message.icon.sm.size"), `;
    width: `).concat(n("message.icon.sm.size"), `;
    height: `).concat(n("message.icon.sm.size"), `;
}

.p-message-sm .p-message-close-icon {
    font-size: `).concat(n("message.close.icon.sm.size"), `;
    width: `).concat(n("message.close.icon.sm.size"), `;
    height: `).concat(n("message.close.icon.sm.size"), `;
}

.p-message-lg .p-message-content {
    padding: `).concat(n("message.content.lg.padding"), `;
}

.p-message-lg .p-message-text {
    font-size: `).concat(n("message.text.lg.font.size"), `;
}

.p-message-lg .p-message-icon {
    font-size: `).concat(n("message.icon.lg.size"), `;
    width: `).concat(n("message.icon.lg.size"), `;
    height: `).concat(n("message.icon.lg.size"), `;
}

.p-message-lg .p-message-close-icon {
    font-size: `).concat(n("message.close.icon.lg.size"), `;
    width: `).concat(n("message.close.icon.lg.size"), `;
    height: `).concat(n("message.close.icon.lg.size"), `;
}

.p-message-outlined {
    background: transparent;
    outline-width: `).concat(n("message.outlined.border.width"), `;
}

.p-message-simple {
    background: transparent;
    outline-color: transparent;
    box-shadow: none;
}

.p-message-simple .p-message-content {
    padding: `).concat(n("message.simple.content.padding"), `;
}

.p-message-outlined .p-message-close-button:hover,
.p-message-simple .p-message-close-button:hover {
    background: transparent;
}
`);
}, Yl = {
  root: function(e) {
    var n = e.props;
    return ["p-message p-component p-message-" + n.severity, {
      "p-message-outlined": n.variant === "outlined",
      "p-message-simple": n.variant === "simple",
      "p-message-sm": n.size === "small",
      "p-message-lg": n.size === "large"
    }];
  },
  content: "p-message-content",
  icon: "p-message-icon",
  text: "p-message-text",
  closeButton: "p-message-close-button",
  closeIcon: "p-message-close-icon"
}, zl = Ie.extend({
  name: "message",
  theme: Rl,
  classes: Yl
}), Hl = {
  name: "BaseMessage",
  extends: Lt,
  props: {
    severity: {
      type: String,
      default: "info"
    },
    closable: {
      type: Boolean,
      default: !1
    },
    life: {
      type: Number,
      default: null
    },
    icon: {
      type: String,
      default: void 0
    },
    closeIcon: {
      type: String,
      default: void 0
    },
    closeButtonProps: {
      type: null,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: null
    }
  },
  style: zl,
  provide: function() {
    return {
      $pcMessage: this,
      $parentInstance: this
    };
  }
}, ga = {
  name: "Message",
  extends: Hl,
  inheritAttrs: !1,
  emits: ["close", "life-end"],
  timeout: null,
  data: function() {
    return {
      visible: !0
    };
  },
  mounted: function() {
    var e = this;
    this.life && setTimeout(function() {
      e.visible = !1, e.$emit("life-end");
    }, this.life);
  },
  methods: {
    close: function(e) {
      this.visible = !1, this.$emit("close", e);
    }
  },
  computed: {
    closeAriaLabel: function() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    }
  },
  directives: {
    ripple: Bo
  },
  components: {
    TimesIcon: ba
  }
};
function Vt(t) {
  "@babel/helpers - typeof";
  return Vt = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Vt(t);
}
function Vi(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    e && (i = i.filter(function(s) {
      return Object.getOwnPropertyDescriptor(t, s).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Li(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Vi(Object(n), !0).forEach(function(i) {
      ql(t, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Vi(Object(n)).forEach(function(i) {
      Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return t;
}
function ql(t, e, n) {
  return (e = Ul(e)) in t ? Object.defineProperty(t, e, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : t[e] = n, t;
}
function Ul(t) {
  var e = Wl(t, "string");
  return Vt(e) == "symbol" ? e : e + "";
}
function Wl(t, e) {
  if (Vt(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(t, e || "default");
    if (Vt(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
var Zl = ["aria-label"];
function Gl(t, e, n, i, s, u) {
  var f = Zn("TimesIcon"), h = Oo("ripple");
  return Y(), Te(Ri, j({
    name: "p-message",
    appear: ""
  }, t.ptmi("transition")), {
    default: Fe(function() {
      return [$n(we("div", j({
        class: t.cx("root"),
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true"
      }, t.ptm("root")), [t.$slots.container ? ve(t.$slots, "container", {
        key: 0,
        closeCallback: u.close
      }) : (Y(), J("div", j({
        key: 1,
        class: t.cx("content")
      }, t.ptm("content")), [ve(t.$slots, "icon", {
        class: En(t.cx("icon"))
      }, function() {
        return [(Y(), Te(Ue(t.icon ? "span" : null), j({
          class: [t.cx("icon"), t.icon]
        }, t.ptm("icon")), null, 16, ["class"]))];
      }), t.$slots.default ? (Y(), J("div", j({
        key: 0,
        class: t.cx("text")
      }, t.ptm("text")), [ve(t.$slots, "default")], 16)) : me("", !0), t.closable ? $n((Y(), J("button", j({
        key: 1,
        class: t.cx("closeButton"),
        "aria-label": u.closeAriaLabel,
        type: "button",
        onClick: e[0] || (e[0] = function(b) {
          return u.close(b);
        })
      }, Li(Li({}, t.closeButtonProps), t.ptm("closeButton"))), [ve(t.$slots, "closeicon", {}, function() {
        return [t.closeIcon ? (Y(), J("i", j({
          key: 0,
          class: [t.cx("closeIcon"), t.closeIcon]
        }, t.ptm("closeIcon")), null, 16)) : (Y(), Te(f, j({
          key: 1,
          class: [t.cx("closeIcon"), t.closeIcon]
        }, t.ptm("closeIcon")), null, 16, ["class"]))];
      })], 16, Zl)), [[h]]) : me("", !0)], 16))], 16), [[vo, s.visible]])];
    }),
    _: 3
  }, 16);
}
ga.render = Gl;
const jc = /* @__PURE__ */ Yi({
  __name: "Datepicker",
  props: {
    context: {}
  },
  setup(t) {
    const e = t, n = Dt("");
    return ns((i) => {
      console.log("error capture", i), i instanceof Error ? n.value = i.message : n.value = "An unexpected error occurred in the date picker";
    }), (i, s) => {
      const u = Zn("Skeleton");
      return Y(), Te(ts, null, {
        fallback: Fe(() => [
          n.value ? (Y(), Te(rs(ga), {
            key: 0,
            severity: "error"
          }, {
            default: Fe(() => [
              Wn(xe(n.value), 1)
            ]),
            _: 1
          })) : (Y(), Te(u, {
            key: 1,
            height: "2rem",
            class: "mb-2"
          }))
        ]),
        default: Fe(() => [
          qe(Nl, j(e, {
            onValueChange: e.context.node.input
          }), null, 16, ["onValueChange"])
        ]),
        _: 1
      });
    };
  }
});
var Ql = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xl(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var gr = { exports: {} }, Jl = gr.exports, Ki;
function ec() {
  return Ki || (Ki = 1, function(t, e) {
    (function(n, i) {
      t.exports = i();
    })(Jl, function() {
      var n = function(r, o) {
        return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a, l) {
          a.__proto__ = l;
        } || function(a, l) {
          for (var c in l) Object.prototype.hasOwnProperty.call(l, c) && (a[c] = l[c]);
        })(r, o);
      }, i = function() {
        return (i = Object.assign || function(r) {
          for (var o, a = 1, l = arguments.length; a < l; a++) for (var c in o = arguments[a]) Object.prototype.hasOwnProperty.call(o, c) && (r[c] = o[c]);
          return r;
        }).apply(this, arguments);
      };
      function s(r, o, a) {
        for (var l, c = 0, d = o.length; c < d; c++) !l && c in o || ((l = l || Array.prototype.slice.call(o, 0, c))[c] = o[c]);
        return r.concat(l || Array.prototype.slice.call(o));
      }
      var u = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : Ql, f = Object.keys, h = Array.isArray;
      function b(r, o) {
        return typeof o != "object" || f(o).forEach(function(a) {
          r[a] = o[a];
        }), r;
      }
      typeof Promise > "u" || u.Promise || (u.Promise = Promise);
      var v = Object.getPrototypeOf, p = {}.hasOwnProperty;
      function O(r, o) {
        return p.call(r, o);
      }
      function $(r, o) {
        typeof o == "function" && (o = o(v(r))), (typeof Reflect > "u" ? f : Reflect.ownKeys)(o).forEach(function(a) {
          A(r, a, o[a]);
        });
      }
      var I = Object.defineProperty;
      function A(r, o, a, l) {
        I(r, o, b(a && O(a, "get") && typeof a.get == "function" ? { get: a.get, set: a.set, configurable: !0 } : { value: a, configurable: !0, writable: !0 }, l));
      }
      function q(r) {
        return { from: function(o) {
          return r.prototype = Object.create(o.prototype), A(r.prototype, "constructor", r), { extend: $.bind(null, r.prototype) };
        } };
      }
      var G = Object.getOwnPropertyDescriptor, ne = [].slice;
      function ee(r, o, a) {
        return ne.call(r, o, a);
      }
      function V(r, o) {
        return o(r);
      }
      function U(r) {
        if (!r) throw new Error("Assertion Failed");
      }
      function ge(r) {
        u.setImmediate ? setImmediate(r) : setTimeout(r, 0);
      }
      function ce(r, o) {
        if (typeof o == "string" && O(r, o)) return r[o];
        if (!o) return r;
        if (typeof o != "string") {
          for (var a = [], l = 0, c = o.length; l < c; ++l) {
            var d = ce(r, o[l]);
            a.push(d);
          }
          return a;
        }
        var m = o.indexOf(".");
        if (m !== -1) {
          var g = r[o.substr(0, m)];
          return g == null ? void 0 : ce(g, o.substr(m + 1));
        }
      }
      function de(r, o, a) {
        if (r && o !== void 0 && !("isFrozen" in Object && Object.isFrozen(r))) if (typeof o != "string" && "length" in o) {
          U(typeof a != "string" && "length" in a);
          for (var l = 0, c = o.length; l < c; ++l) de(r, o[l], a[l]);
        } else {
          var d, m, g = o.indexOf(".");
          g !== -1 ? (d = o.substr(0, g), (m = o.substr(g + 1)) === "" ? a === void 0 ? h(r) && !isNaN(parseInt(d)) ? r.splice(d, 1) : delete r[d] : r[d] = a : de(g = !(g = r[d]) || !O(r, d) ? r[d] = {} : g, m, a)) : a === void 0 ? h(r) && !isNaN(parseInt(o)) ? r.splice(o, 1) : delete r[o] : r[o] = a;
        }
      }
      function Se(r) {
        var o, a = {};
        for (o in r) O(r, o) && (a[o] = r[o]);
        return a;
      }
      var je = [].concat;
      function $e(r) {
        return je.apply([], r);
      }
      var Vn = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat($e([8, 16, 32, 64].map(function(r) {
        return ["Int", "Uint", "Float"].map(function(o) {
          return o + r + "Array";
        });
      }))).filter(function(r) {
        return u[r];
      }), Ae = new Set(Vn.map(function(r) {
        return u[r];
      })), Be = null;
      function Z(r) {
        return Be = /* @__PURE__ */ new WeakMap(), r = function o(a) {
          if (!a || typeof a != "object") return a;
          var l = Be.get(a);
          if (l) return l;
          if (h(a)) {
            l = [], Be.set(a, l);
            for (var c = 0, d = a.length; c < d; ++c) l.push(o(a[c]));
          } else if (Ae.has(a.constructor)) l = a;
          else {
            var m, g = v(a);
            for (m in l = g === Object.prototype ? {} : Object.create(g), Be.set(a, l), a) O(a, m) && (l[m] = o(a[m]));
          }
          return l;
        }(r), Be = null, r;
      }
      var oe = {}.toString;
      function pe(r) {
        return oe.call(r).slice(8, -1);
      }
      var ke = typeof Symbol < "u" ? Symbol.iterator : "@@iterator", Ne = typeof ke == "symbol" ? function(r) {
        var o;
        return r != null && (o = r[ke]) && o.apply(r);
      } : function() {
        return null;
      };
      function Oe(r, o) {
        return o = r.indexOf(o), 0 <= o && r.splice(o, 1), 0 <= o;
      }
      var Ge = {};
      function Ve(r) {
        var o, a, l, c;
        if (arguments.length === 1) {
          if (h(r)) return r.slice();
          if (this === Ge && typeof r == "string") return [r];
          if (c = Ne(r)) {
            for (a = []; !(l = c.next()).done; ) a.push(l.value);
            return a;
          }
          if (r == null) return [r];
          if (typeof (o = r.length) != "number") return [r];
          for (a = new Array(o); o--; ) a[o] = r[o];
          return a;
        }
        for (o = arguments.length, a = new Array(o); o--; ) a[o] = arguments[o];
        return a;
      }
      var We = typeof Symbol < "u" ? function(r) {
        return r[Symbol.toStringTag] === "AsyncFunction";
      } : function() {
        return !1;
      }, ct = ["Unknown", "Constraint", "Data", "TransactionInactive", "ReadOnly", "Version", "NotFound", "InvalidState", "InvalidAccess", "Abort", "Timeout", "QuotaExceeded", "Syntax", "DataClone"], en = ["Modify", "Bulk", "OpenFailed", "VersionChange", "Schema", "Upgrade", "InvalidTable", "MissingAPI", "NoSuchDatabase", "InvalidArgument", "SubTransaction", "Unsupported", "Internal", "DatabaseClosed", "PrematureCommit", "ForeignAwait"].concat(ct), pn = { VersionChanged: "Database version changed by other database connection", DatabaseClosed: "Database has been closed", Abort: "Transaction aborted", TransactionInactive: "Transaction has already completed or failed", MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb" };
      function tn(r, o) {
        this.name = r, this.message = o;
      }
      function hn(r, o) {
        return r + ". Errors: " + Object.keys(o).map(function(a) {
          return o[a].toString();
        }).filter(function(a, l, c) {
          return c.indexOf(a) === l;
        }).join(`
`);
      }
      function An(r, o, a, l) {
        this.failures = o, this.failedKeys = l, this.successCount = a, this.message = hn(r, o);
      }
      function mn(r, o) {
        this.name = "BulkError", this.failures = Object.keys(o).map(function(a) {
          return o[a];
        }), this.failuresByPos = o, this.message = hn(r, this.failures);
      }
      q(tn).from(Error).extend({ toString: function() {
        return this.name + ": " + this.message;
      } }), q(An).from(tn), q(mn).from(tn);
      var ut = en.reduce(function(r, o) {
        return r[o] = o + "Error", r;
      }, {}), xr = tn, X = en.reduce(function(r, o) {
        var a = o + "Error";
        function l(c, d) {
          this.name = a, c ? typeof c == "string" ? (this.message = "".concat(c).concat(d ? `
 ` + d : ""), this.inner = d || null) : typeof c == "object" && (this.message = "".concat(c.name, " ").concat(c.message), this.inner = c) : (this.message = pn[o] || a, this.inner = null);
        }
        return q(l).from(xr), r[o] = l, r;
      }, {});
      X.Syntax = SyntaxError, X.Type = TypeError, X.Range = RangeError;
      var Kt = ct.reduce(function(r, o) {
        return r[o + "Error"] = X[o], r;
      }, {}), Qn = en.reduce(function(r, o) {
        return ["Syntax", "Type", "Range"].indexOf(o) === -1 && (r[o + "Error"] = X[o]), r;
      }, {});
      function ye() {
      }
      function Bn(r) {
        return r;
      }
      function Dr(r, o) {
        return r == null || r === Bn ? o : function(a) {
          return o(r(a));
        };
      }
      function bn(r, o) {
        return function() {
          r.apply(this, arguments), o.apply(this, arguments);
        };
      }
      function _r(r, o) {
        return r === ye ? o : function() {
          var a = r.apply(this, arguments);
          a !== void 0 && (arguments[0] = a);
          var l = this.onsuccess, c = this.onerror;
          this.onsuccess = null, this.onerror = null;
          var d = o.apply(this, arguments);
          return l && (this.onsuccess = this.onsuccess ? bn(l, this.onsuccess) : l), c && (this.onerror = this.onerror ? bn(c, this.onerror) : c), d !== void 0 ? d : a;
        };
      }
      function Pr(r, o) {
        return r === ye ? o : function() {
          r.apply(this, arguments);
          var a = this.onsuccess, l = this.onerror;
          this.onsuccess = this.onerror = null, o.apply(this, arguments), a && (this.onsuccess = this.onsuccess ? bn(a, this.onsuccess) : a), l && (this.onerror = this.onerror ? bn(l, this.onerror) : l);
        };
      }
      function Tr(r, o) {
        return r === ye ? o : function(a) {
          var l = r.apply(this, arguments);
          b(a, l);
          var c = this.onsuccess, d = this.onerror;
          return this.onsuccess = null, this.onerror = null, a = o.apply(this, arguments), c && (this.onsuccess = this.onsuccess ? bn(c, this.onsuccess) : c), d && (this.onerror = this.onerror ? bn(d, this.onerror) : d), l === void 0 ? a === void 0 ? void 0 : a : b(l, a);
        };
      }
      function Or(r, o) {
        return r === ye ? o : function() {
          return o.apply(this, arguments) !== !1 && r.apply(this, arguments);
        };
      }
      function lt(r, o) {
        return r === ye ? o : function() {
          var a = r.apply(this, arguments);
          if (a && typeof a.then == "function") {
            for (var l = this, c = arguments.length, d = new Array(c); c--; ) d[c] = arguments[c];
            return a.then(function() {
              return o.apply(l, d);
            });
          }
          return o.apply(this, arguments);
        };
      }
      Qn.ModifyError = An, Qn.DexieError = tn, Qn.BulkError = mn;
      var Je = typeof location < "u" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
      function Nt(r) {
        Je = r;
      }
      var jn = {}, Ft = 100, Vn = typeof Promise > "u" ? [] : function() {
        var r = Promise.resolve();
        if (typeof crypto > "u" || !crypto.subtle) return [r, v(r), r];
        var o = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
        return [o, v(o), r];
      }(), ct = Vn[0], en = Vn[1], Vn = Vn[2], en = en && en.then, Ln = ct && ct.constructor, $r = !!Vn, dt = function(r, o) {
        ft.push([r, o]), Rt && (queueMicrotask(va), Rt = !1);
      }, Er = !0, Rt = !0, Kn = [], Yt = [], Mr = Bn, Sn = { id: "global", global: !0, ref: 0, unhandleds: [], onunhandled: ye, pgp: !1, env: {}, finalize: ye }, Q = Sn, ft = [], Nn = 0, zt = [];
      function H(r) {
        if (typeof this != "object") throw new TypeError("Promises must be constructed via new");
        this._listeners = [], this._lib = !1;
        var o = this._PSD = Q;
        if (typeof r != "function") {
          if (r !== jn) throw new TypeError("Not a function");
          return this._state = arguments[1], this._value = arguments[2], void (this._state === !1 && Ar(this, this._value));
        }
        this._state = null, this._value = null, ++o.ref, function a(l, c) {
          try {
            c(function(d) {
              if (l._state === null) {
                if (d === l) throw new TypeError("A promise cannot be resolved with itself.");
                var m = l._lib && Xn();
                d && typeof d.then == "function" ? a(l, function(g, w) {
                  d instanceof H ? d._then(g, w) : d.then(g, w);
                }) : (l._state = !0, l._value = d, Vo(l)), m && Jn();
              }
            }, Ar.bind(null, l));
          } catch (d) {
            Ar(l, d);
          }
        }(this, r);
      }
      var Ir = { get: function() {
        var r = Q, o = Wt;
        function a(l, c) {
          var d = this, m = !r.global && (r !== Q || o !== Wt), g = m && !xn(), w = new H(function(S, D) {
            Br(d, new jo(Ko(l, r, m, g), Ko(c, r, m, g), S, D, r));
          });
          return this._consoleTask && (w._consoleTask = this._consoleTask), w;
        }
        return a.prototype = jn, a;
      }, set: function(r) {
        A(this, "then", r && r.prototype === jn ? Ir : { get: function() {
          return r;
        }, set: Ir.set });
      } };
      function jo(r, o, a, l, c) {
        this.onFulfilled = typeof r == "function" ? r : null, this.onRejected = typeof o == "function" ? o : null, this.resolve = a, this.reject = l, this.psd = c;
      }
      function Ar(r, o) {
        var a, l;
        Yt.push(o), r._state === null && (a = r._lib && Xn(), o = Mr(o), r._state = !1, r._value = o, l = r, Kn.some(function(c) {
          return c._value === l._value;
        }) || Kn.push(l), Vo(r), a && Jn());
      }
      function Vo(r) {
        var o = r._listeners;
        r._listeners = [];
        for (var a = 0, l = o.length; a < l; ++a) Br(r, o[a]);
        var c = r._PSD;
        --c.ref || c.finalize(), Nn === 0 && (++Nn, dt(function() {
          --Nn == 0 && jr();
        }, []));
      }
      function Br(r, o) {
        if (r._state !== null) {
          var a = r._state ? o.onFulfilled : o.onRejected;
          if (a === null) return (r._state ? o.resolve : o.reject)(r._value);
          ++o.psd.ref, ++Nn, dt(ya, [a, r, o]);
        } else r._listeners.push(o);
      }
      function ya(r, o, a) {
        try {
          var l, c = o._value;
          !o._state && Yt.length && (Yt = []), l = Je && o._consoleTask ? o._consoleTask.run(function() {
            return r(c);
          }) : r(c), o._state || Yt.indexOf(c) !== -1 || function(d) {
            for (var m = Kn.length; m; ) if (Kn[--m]._value === d._value) return Kn.splice(m, 1);
          }(o), a.resolve(l);
        } catch (d) {
          a.reject(d);
        } finally {
          --Nn == 0 && jr(), --a.psd.ref || a.psd.finalize();
        }
      }
      function va() {
        Fn(Sn, function() {
          Xn() && Jn();
        });
      }
      function Xn() {
        var r = Er;
        return Rt = Er = !1, r;
      }
      function Jn() {
        var r, o, a;
        do
          for (; 0 < ft.length; ) for (r = ft, ft = [], a = r.length, o = 0; o < a; ++o) {
            var l = r[o];
            l[0].apply(null, l[1]);
          }
        while (0 < ft.length);
        Rt = Er = !0;
      }
      function jr() {
        var r = Kn;
        Kn = [], r.forEach(function(l) {
          l._PSD.onunhandled.call(null, l._value, l);
        });
        for (var o = zt.slice(0), a = o.length; a; ) o[--a]();
      }
      function Ht(r) {
        return new H(jn, !1, r);
      }
      function _e(r, o) {
        var a = Q;
        return function() {
          var l = Xn(), c = Q;
          try {
            return Dn(a, !0), r.apply(this, arguments);
          } catch (d) {
            o && o(d);
          } finally {
            Dn(c, !1), l && Jn();
          }
        };
      }
      $(H.prototype, { then: Ir, _then: function(r, o) {
        Br(this, new jo(null, null, r, o, Q));
      }, catch: function(r) {
        if (arguments.length === 1) return this.then(null, r);
        var o = r, a = arguments[1];
        return typeof o == "function" ? this.then(null, function(l) {
          return (l instanceof o ? a : Ht)(l);
        }) : this.then(null, function(l) {
          return (l && l.name === o ? a : Ht)(l);
        });
      }, finally: function(r) {
        return this.then(function(o) {
          return H.resolve(r()).then(function() {
            return o;
          });
        }, function(o) {
          return H.resolve(r()).then(function() {
            return Ht(o);
          });
        });
      }, timeout: function(r, o) {
        var a = this;
        return r < 1 / 0 ? new H(function(l, c) {
          var d = setTimeout(function() {
            return c(new X.Timeout(o));
          }, r);
          a.then(l, c).finally(clearTimeout.bind(null, d));
        }) : this;
      } }), typeof Symbol < "u" && Symbol.toStringTag && A(H.prototype, Symbol.toStringTag, "Dexie.Promise"), Sn.env = Lo(), $(H, { all: function() {
        var r = Ve.apply(null, arguments).map(Zt);
        return new H(function(o, a) {
          r.length === 0 && o([]);
          var l = r.length;
          r.forEach(function(c, d) {
            return H.resolve(c).then(function(m) {
              r[d] = m, --l || o(r);
            }, a);
          });
        });
      }, resolve: function(r) {
        return r instanceof H ? r : r && typeof r.then == "function" ? new H(function(o, a) {
          r.then(o, a);
        }) : new H(jn, !0, r);
      }, reject: Ht, race: function() {
        var r = Ve.apply(null, arguments).map(Zt);
        return new H(function(o, a) {
          r.map(function(l) {
            return H.resolve(l).then(o, a);
          });
        });
      }, PSD: { get: function() {
        return Q;
      }, set: function(r) {
        return Q = r;
      } }, totalEchoes: { get: function() {
        return Wt;
      } }, newPSD: Cn, usePSD: Fn, scheduler: { get: function() {
        return dt;
      }, set: function(r) {
        dt = r;
      } }, rejectionMapper: { get: function() {
        return Mr;
      }, set: function(r) {
        Mr = r;
      } }, follow: function(r, o) {
        return new H(function(a, l) {
          return Cn(function(c, d) {
            var m = Q;
            m.unhandleds = [], m.onunhandled = d, m.finalize = bn(function() {
              var g, w = this;
              g = function() {
                w.unhandleds.length === 0 ? c() : d(w.unhandleds[0]);
              }, zt.push(function S() {
                g(), zt.splice(zt.indexOf(S), 1);
              }), ++Nn, dt(function() {
                --Nn == 0 && jr();
              }, []);
            }, m.finalize), r();
          }, o, a, l);
        });
      } }), Ln && (Ln.allSettled && A(H, "allSettled", function() {
        var r = Ve.apply(null, arguments).map(Zt);
        return new H(function(o) {
          r.length === 0 && o([]);
          var a = r.length, l = new Array(a);
          r.forEach(function(c, d) {
            return H.resolve(c).then(function(m) {
              return l[d] = { status: "fulfilled", value: m };
            }, function(m) {
              return l[d] = { status: "rejected", reason: m };
            }).then(function() {
              return --a || o(l);
            });
          });
        });
      }), Ln.any && typeof AggregateError < "u" && A(H, "any", function() {
        var r = Ve.apply(null, arguments).map(Zt);
        return new H(function(o, a) {
          r.length === 0 && a(new AggregateError([]));
          var l = r.length, c = new Array(l);
          r.forEach(function(d, m) {
            return H.resolve(d).then(function(g) {
              return o(g);
            }, function(g) {
              c[m] = g, --l || a(new AggregateError(c));
            });
          });
        });
      }), Ln.withResolvers && (H.withResolvers = Ln.withResolvers));
      var Le = { awaits: 0, echoes: 0, id: 0 }, wa = 0, qt = [], Ut = 0, Wt = 0, ka = 0;
      function Cn(r, o, a, l) {
        var c = Q, d = Object.create(c);
        return d.parent = c, d.ref = 0, d.global = !1, d.id = ++ka, Sn.env, d.env = $r ? { Promise: H, PromiseProp: { value: H, configurable: !0, writable: !0 }, all: H.all, race: H.race, allSettled: H.allSettled, any: H.any, resolve: H.resolve, reject: H.reject } : {}, o && b(d, o), ++c.ref, d.finalize = function() {
          --this.parent.ref || this.parent.finalize();
        }, l = Fn(d, r, a, l), d.ref === 0 && d.finalize(), l;
      }
      function et() {
        return Le.id || (Le.id = ++wa), ++Le.awaits, Le.echoes += Ft, Le.id;
      }
      function xn() {
        return !!Le.awaits && (--Le.awaits == 0 && (Le.id = 0), Le.echoes = Le.awaits * Ft, !0);
      }
      function Zt(r) {
        return Le.echoes && r && r.constructor === Ln ? (et(), r.then(function(o) {
          return xn(), o;
        }, function(o) {
          return xn(), Ee(o);
        })) : r;
      }
      function Sa() {
        var r = qt[qt.length - 1];
        qt.pop(), Dn(r, !1);
      }
      function Dn(r, o) {
        var a, l = Q;
        (o ? !Le.echoes || Ut++ && r === Q : !Ut || --Ut && r === Q) || queueMicrotask(o ? (function(c) {
          ++Wt, Le.echoes && --Le.echoes != 0 || (Le.echoes = Le.awaits = Le.id = 0), qt.push(Q), Dn(c, !0);
        }).bind(null, r) : Sa), r !== Q && (Q = r, l === Sn && (Sn.env = Lo()), $r && (a = Sn.env.Promise, o = r.env, (l.global || r.global) && (Object.defineProperty(u, "Promise", o.PromiseProp), a.all = o.all, a.race = o.race, a.resolve = o.resolve, a.reject = o.reject, o.allSettled && (a.allSettled = o.allSettled), o.any && (a.any = o.any))));
      }
      function Lo() {
        var r = u.Promise;
        return $r ? { Promise: r, PromiseProp: Object.getOwnPropertyDescriptor(u, "Promise"), all: r.all, race: r.race, allSettled: r.allSettled, any: r.any, resolve: r.resolve, reject: r.reject } : {};
      }
      function Fn(r, o, a, l, c) {
        var d = Q;
        try {
          return Dn(r, !0), o(a, l, c);
        } finally {
          Dn(d, !1);
        }
      }
      function Ko(r, o, a, l) {
        return typeof r != "function" ? r : function() {
          var c = Q;
          a && et(), Dn(o, !0);
          try {
            return r.apply(this, arguments);
          } finally {
            Dn(c, !1), l && queueMicrotask(xn);
          }
        };
      }
      function Vr(r) {
        Promise === Ln && Le.echoes === 0 ? Ut === 0 ? r() : enqueueNativeMicroTask(r) : setTimeout(r, 0);
      }
      ("" + en).indexOf("[native code]") === -1 && (et = xn = ye);
      var Ee = H.reject, Rn = "￿", gn = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", No = "String expected.", nt = [], Gt = "__dbnames", Lr = "readonly", Kr = "readwrite";
      function Yn(r, o) {
        return r ? o ? function() {
          return r.apply(this, arguments) && o.apply(this, arguments);
        } : r : o;
      }
      var Fo = { type: 3, lower: -1 / 0, lowerOpen: !1, upper: [[]], upperOpen: !1 };
      function Qt(r) {
        return typeof r != "string" || /\./.test(r) ? function(o) {
          return o;
        } : function(o) {
          return o[r] === void 0 && r in o && delete (o = Z(o))[r], o;
        };
      }
      function Ro() {
        throw X.Type();
      }
      function le(r, o) {
        try {
          var a = Yo(r), l = Yo(o);
          if (a !== l) return a === "Array" ? 1 : l === "Array" ? -1 : a === "binary" ? 1 : l === "binary" ? -1 : a === "string" ? 1 : l === "string" ? -1 : a === "Date" ? 1 : l !== "Date" ? NaN : -1;
          switch (a) {
            case "number":
            case "Date":
            case "string":
              return o < r ? 1 : r < o ? -1 : 0;
            case "binary":
              return function(c, d) {
                for (var m = c.length, g = d.length, w = m < g ? m : g, S = 0; S < w; ++S) if (c[S] !== d[S]) return c[S] < d[S] ? -1 : 1;
                return m === g ? 0 : m < g ? -1 : 1;
              }(zo(r), zo(o));
            case "Array":
              return function(c, d) {
                for (var m = c.length, g = d.length, w = m < g ? m : g, S = 0; S < w; ++S) {
                  var D = le(c[S], d[S]);
                  if (D !== 0) return D;
                }
                return m === g ? 0 : m < g ? -1 : 1;
              }(r, o);
          }
        } catch {
        }
        return NaN;
      }
      function Yo(r) {
        var o = typeof r;
        return o != "object" ? o : ArrayBuffer.isView(r) ? "binary" : (r = pe(r), r === "ArrayBuffer" ? "binary" : r);
      }
      function zo(r) {
        return r instanceof Uint8Array ? r : ArrayBuffer.isView(r) ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : new Uint8Array(r);
      }
      var Ho = (Ce.prototype._trans = function(r, o, a) {
        var l = this._tx || Q.trans, c = this.name, d = Je && typeof console < "u" && console.createTask && console.createTask("Dexie: ".concat(r === "readonly" ? "read" : "write", " ").concat(this.name));
        function m(S, D, y) {
          if (!y.schema[c]) throw new X.NotFound("Table " + c + " not part of transaction");
          return o(y.idbtrans, y);
        }
        var g = Xn();
        try {
          var w = l && l.db._novip === this.db._novip ? l === Q.trans ? l._promise(r, m, a) : Cn(function() {
            return l._promise(r, m, a);
          }, { trans: l, transless: Q.transless || Q }) : function S(D, y, P, k) {
            if (D.idbdb && (D._state.openComplete || Q.letThrough || D._vip)) {
              var x = D._createTransaction(y, P, D._dbSchema);
              try {
                x.create(), D._state.PR1398_maxLoop = 3;
              } catch (_) {
                return _.name === ut.InvalidState && D.isOpen() && 0 < --D._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), D.close({ disableAutoOpen: !1 }), D.open().then(function() {
                  return S(D, y, P, k);
                })) : Ee(_);
              }
              return x._promise(y, function(_, C) {
                return Cn(function() {
                  return Q.trans = x, k(_, C, x);
                });
              }).then(function(_) {
                if (y === "readwrite") try {
                  x.idbtrans.commit();
                } catch {
                }
                return y === "readonly" ? _ : x._completion.then(function() {
                  return _;
                });
              });
            }
            if (D._state.openComplete) return Ee(new X.DatabaseClosed(D._state.dbOpenError));
            if (!D._state.isBeingOpened) {
              if (!D._state.autoOpen) return Ee(new X.DatabaseClosed());
              D.open().catch(ye);
            }
            return D._state.dbReadyPromise.then(function() {
              return S(D, y, P, k);
            });
          }(this.db, r, [this.name], m);
          return d && (w._consoleTask = d, w = w.catch(function(S) {
            return console.trace(S), Ee(S);
          })), w;
        } finally {
          g && Jn();
        }
      }, Ce.prototype.get = function(r, o) {
        var a = this;
        return r && r.constructor === Object ? this.where(r).first(o) : r == null ? Ee(new X.Type("Invalid argument to Table.get()")) : this._trans("readonly", function(l) {
          return a.core.get({ trans: l, key: r }).then(function(c) {
            return a.hook.reading.fire(c);
          });
        }).then(o);
      }, Ce.prototype.where = function(r) {
        if (typeof r == "string") return new this.db.WhereClause(this, r);
        if (h(r)) return new this.db.WhereClause(this, "[".concat(r.join("+"), "]"));
        var o = f(r);
        if (o.length === 1) return this.where(o[0]).equals(r[o[0]]);
        var a = this.schema.indexes.concat(this.schema.primKey).filter(function(g) {
          if (g.compound && o.every(function(S) {
            return 0 <= g.keyPath.indexOf(S);
          })) {
            for (var w = 0; w < o.length; ++w) if (o.indexOf(g.keyPath[w]) === -1) return !1;
            return !0;
          }
          return !1;
        }).sort(function(g, w) {
          return g.keyPath.length - w.keyPath.length;
        })[0];
        if (a && this.db._maxKey !== Rn) {
          var d = a.keyPath.slice(0, o.length);
          return this.where(d).equals(d.map(function(w) {
            return r[w];
          }));
        }
        !a && Je && console.warn("The query ".concat(JSON.stringify(r), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(o.join("+"), "]"));
        var l = this.schema.idxByName;
        function c(g, w) {
          return le(g, w) === 0;
        }
        var m = o.reduce(function(y, w) {
          var S = y[0], D = y[1], y = l[w], P = r[w];
          return [S || y, S || !y ? Yn(D, y && y.multi ? function(k) {
            return k = ce(k, w), h(k) && k.some(function(x) {
              return c(P, x);
            });
          } : function(k) {
            return c(P, ce(k, w));
          }) : D];
        }, [null, null]), d = m[0], m = m[1];
        return d ? this.where(d.name).equals(r[d.keyPath]).filter(m) : a ? this.filter(m) : this.where(o).equals("");
      }, Ce.prototype.filter = function(r) {
        return this.toCollection().and(r);
      }, Ce.prototype.count = function(r) {
        return this.toCollection().count(r);
      }, Ce.prototype.offset = function(r) {
        return this.toCollection().offset(r);
      }, Ce.prototype.limit = function(r) {
        return this.toCollection().limit(r);
      }, Ce.prototype.each = function(r) {
        return this.toCollection().each(r);
      }, Ce.prototype.toArray = function(r) {
        return this.toCollection().toArray(r);
      }, Ce.prototype.toCollection = function() {
        return new this.db.Collection(new this.db.WhereClause(this));
      }, Ce.prototype.orderBy = function(r) {
        return new this.db.Collection(new this.db.WhereClause(this, h(r) ? "[".concat(r.join("+"), "]") : r));
      }, Ce.prototype.reverse = function() {
        return this.toCollection().reverse();
      }, Ce.prototype.mapToClass = function(r) {
        var o, a = this.db, l = this.name;
        function c() {
          return o !== null && o.apply(this, arguments) || this;
        }
        (this.schema.mappedClass = r).prototype instanceof Ro && (function(w, S) {
          if (typeof S != "function" && S !== null) throw new TypeError("Class extends value " + String(S) + " is not a constructor or null");
          function D() {
            this.constructor = w;
          }
          n(w, S), w.prototype = S === null ? Object.create(S) : (D.prototype = S.prototype, new D());
        }(c, o = r), Object.defineProperty(c.prototype, "db", { get: function() {
          return a;
        }, enumerable: !1, configurable: !0 }), c.prototype.table = function() {
          return l;
        }, r = c);
        for (var d = /* @__PURE__ */ new Set(), m = r.prototype; m; m = v(m)) Object.getOwnPropertyNames(m).forEach(function(w) {
          return d.add(w);
        });
        function g(w) {
          if (!w) return w;
          var S, D = Object.create(r.prototype);
          for (S in w) if (!d.has(S)) try {
            D[S] = w[S];
          } catch {
          }
          return D;
        }
        return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = g, this.hook("reading", g), r;
      }, Ce.prototype.defineClass = function() {
        return this.mapToClass(function(r) {
          b(this, r);
        });
      }, Ce.prototype.add = function(r, o) {
        var a = this, l = this.schema.primKey, c = l.auto, d = l.keyPath, m = r;
        return d && c && (m = Qt(d)(r)), this._trans("readwrite", function(g) {
          return a.core.mutate({ trans: g, type: "add", keys: o != null ? [o] : null, values: [m] });
        }).then(function(g) {
          return g.numFailures ? H.reject(g.failures[0]) : g.lastResult;
        }).then(function(g) {
          if (d) try {
            de(r, d, g);
          } catch {
          }
          return g;
        });
      }, Ce.prototype.update = function(r, o) {
        return typeof r != "object" || h(r) ? this.where(":id").equals(r).modify(o) : (r = ce(r, this.schema.primKey.keyPath), r === void 0 ? Ee(new X.InvalidArgument("Given object does not contain its primary key")) : this.where(":id").equals(r).modify(o));
      }, Ce.prototype.put = function(r, o) {
        var a = this, l = this.schema.primKey, c = l.auto, d = l.keyPath, m = r;
        return d && c && (m = Qt(d)(r)), this._trans("readwrite", function(g) {
          return a.core.mutate({ trans: g, type: "put", values: [m], keys: o != null ? [o] : null });
        }).then(function(g) {
          return g.numFailures ? H.reject(g.failures[0]) : g.lastResult;
        }).then(function(g) {
          if (d) try {
            de(r, d, g);
          } catch {
          }
          return g;
        });
      }, Ce.prototype.delete = function(r) {
        var o = this;
        return this._trans("readwrite", function(a) {
          return o.core.mutate({ trans: a, type: "delete", keys: [r] });
        }).then(function(a) {
          return a.numFailures ? H.reject(a.failures[0]) : void 0;
        });
      }, Ce.prototype.clear = function() {
        var r = this;
        return this._trans("readwrite", function(o) {
          return r.core.mutate({ trans: o, type: "deleteRange", range: Fo });
        }).then(function(o) {
          return o.numFailures ? H.reject(o.failures[0]) : void 0;
        });
      }, Ce.prototype.bulkGet = function(r) {
        var o = this;
        return this._trans("readonly", function(a) {
          return o.core.getMany({ keys: r, trans: a }).then(function(l) {
            return l.map(function(c) {
              return o.hook.reading.fire(c);
            });
          });
        });
      }, Ce.prototype.bulkAdd = function(r, o, a) {
        var l = this, c = Array.isArray(o) ? o : void 0, d = (a = a || (c ? void 0 : o)) ? a.allKeys : void 0;
        return this._trans("readwrite", function(m) {
          var S = l.schema.primKey, g = S.auto, S = S.keyPath;
          if (S && c) throw new X.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
          if (c && c.length !== r.length) throw new X.InvalidArgument("Arguments objects and keys must have the same length");
          var w = r.length, S = S && g ? r.map(Qt(S)) : r;
          return l.core.mutate({ trans: m, type: "add", keys: c, values: S, wantResults: d }).then(function(x) {
            var y = x.numFailures, P = x.results, k = x.lastResult, x = x.failures;
            if (y === 0) return d ? P : k;
            throw new mn("".concat(l.name, ".bulkAdd(): ").concat(y, " of ").concat(w, " operations failed"), x);
          });
        });
      }, Ce.prototype.bulkPut = function(r, o, a) {
        var l = this, c = Array.isArray(o) ? o : void 0, d = (a = a || (c ? void 0 : o)) ? a.allKeys : void 0;
        return this._trans("readwrite", function(m) {
          var S = l.schema.primKey, g = S.auto, S = S.keyPath;
          if (S && c) throw new X.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
          if (c && c.length !== r.length) throw new X.InvalidArgument("Arguments objects and keys must have the same length");
          var w = r.length, S = S && g ? r.map(Qt(S)) : r;
          return l.core.mutate({ trans: m, type: "put", keys: c, values: S, wantResults: d }).then(function(x) {
            var y = x.numFailures, P = x.results, k = x.lastResult, x = x.failures;
            if (y === 0) return d ? P : k;
            throw new mn("".concat(l.name, ".bulkPut(): ").concat(y, " of ").concat(w, " operations failed"), x);
          });
        });
      }, Ce.prototype.bulkUpdate = function(r) {
        var o = this, a = this.core, l = r.map(function(m) {
          return m.key;
        }), c = r.map(function(m) {
          return m.changes;
        }), d = [];
        return this._trans("readwrite", function(m) {
          return a.getMany({ trans: m, keys: l, cache: "clone" }).then(function(g) {
            var w = [], S = [];
            r.forEach(function(y, P) {
              var k = y.key, x = y.changes, _ = g[P];
              if (_) {
                for (var C = 0, T = Object.keys(x); C < T.length; C++) {
                  var E = T[C], M = x[E];
                  if (E === o.schema.primKey.keyPath) {
                    if (le(M, k) !== 0) throw new X.Constraint("Cannot update primary key in bulkUpdate()");
                  } else de(_, E, M);
                }
                d.push(P), w.push(k), S.push(_);
              }
            });
            var D = w.length;
            return a.mutate({ trans: m, type: "put", keys: w, values: S, updates: { keys: l, changeSpecs: c } }).then(function(y) {
              var P = y.numFailures, k = y.failures;
              if (P === 0) return D;
              for (var x = 0, _ = Object.keys(k); x < _.length; x++) {
                var C, T = _[x], E = d[Number(T)];
                E != null && (C = k[T], delete k[T], k[E] = C);
              }
              throw new mn("".concat(o.name, ".bulkUpdate(): ").concat(P, " of ").concat(D, " operations failed"), k);
            });
          });
        });
      }, Ce.prototype.bulkDelete = function(r) {
        var o = this, a = r.length;
        return this._trans("readwrite", function(l) {
          return o.core.mutate({ trans: l, type: "delete", keys: r });
        }).then(function(m) {
          var c = m.numFailures, d = m.lastResult, m = m.failures;
          if (c === 0) return d;
          throw new mn("".concat(o.name, ".bulkDelete(): ").concat(c, " of ").concat(a, " operations failed"), m);
        });
      }, Ce);
      function Ce() {
      }
      function pt(r) {
        function o(m, g) {
          if (g) {
            for (var w = arguments.length, S = new Array(w - 1); --w; ) S[w - 1] = arguments[w];
            return a[m].subscribe.apply(null, S), r;
          }
          if (typeof m == "string") return a[m];
        }
        var a = {};
        o.addEventType = d;
        for (var l = 1, c = arguments.length; l < c; ++l) d(arguments[l]);
        return o;
        function d(m, g, w) {
          if (typeof m != "object") {
            var S;
            g = g || Or;
            var D = { subscribers: [], fire: w = w || ye, subscribe: function(y) {
              D.subscribers.indexOf(y) === -1 && (D.subscribers.push(y), D.fire = g(D.fire, y));
            }, unsubscribe: function(y) {
              D.subscribers = D.subscribers.filter(function(P) {
                return P !== y;
              }), D.fire = D.subscribers.reduce(g, w);
            } };
            return a[m] = o[m] = D;
          }
          f(S = m).forEach(function(y) {
            var P = S[y];
            if (h(P)) d(y, S[y][0], S[y][1]);
            else {
              if (P !== "asap") throw new X.InvalidArgument("Invalid event config");
              var k = d(y, Bn, function() {
                for (var x = arguments.length, _ = new Array(x); x--; ) _[x] = arguments[x];
                k.subscribers.forEach(function(C) {
                  ge(function() {
                    C.apply(null, _);
                  });
                });
              });
            }
          });
        }
      }
      function ht(r, o) {
        return q(o).from({ prototype: r }), o;
      }
      function tt(r, o) {
        return !(r.filter || r.algorithm || r.or) && (o ? r.justLimit : !r.replayFilter);
      }
      function Nr(r, o) {
        r.filter = Yn(r.filter, o);
      }
      function Fr(r, o, a) {
        var l = r.replayFilter;
        r.replayFilter = l ? function() {
          return Yn(l(), o());
        } : o, r.justLimit = a && !l;
      }
      function Xt(r, o) {
        if (r.isPrimKey) return o.primaryKey;
        var a = o.getIndexByKeyPath(r.index);
        if (!a) throw new X.Schema("KeyPath " + r.index + " on object store " + o.name + " is not indexed");
        return a;
      }
      function qo(r, o, a) {
        var l = Xt(r, o.schema);
        return o.openCursor({ trans: a, values: !r.keysOnly, reverse: r.dir === "prev", unique: !!r.unique, query: { index: l, range: r.range } });
      }
      function Jt(r, o, a, l) {
        var c = r.replayFilter ? Yn(r.filter, r.replayFilter()) : r.filter;
        if (r.or) {
          var d = {}, m = function(g, w, S) {
            var D, y;
            c && !c(w, S, function(P) {
              return w.stop(P);
            }, function(P) {
              return w.fail(P);
            }) || ((y = "" + (D = w.primaryKey)) == "[object ArrayBuffer]" && (y = "" + new Uint8Array(D)), O(d, y) || (d[y] = !0, o(g, w, S)));
          };
          return Promise.all([r.or._iterate(m, a), Uo(qo(r, l, a), r.algorithm, m, !r.keysOnly && r.valueMapper)]);
        }
        return Uo(qo(r, l, a), Yn(r.algorithm, c), o, !r.keysOnly && r.valueMapper);
      }
      function Uo(r, o, a, l) {
        var c = _e(l ? function(d, m, g) {
          return a(l(d), m, g);
        } : a);
        return r.then(function(d) {
          if (d) return d.start(function() {
            var m = function() {
              return d.continue();
            };
            o && !o(d, function(g) {
              return m = g;
            }, function(g) {
              d.stop(g), m = ye;
            }, function(g) {
              d.fail(g), m = ye;
            }) || c(d.value, d, function(g) {
              return m = g;
            }), m();
          });
        });
      }
      var mt = (Wo.prototype.execute = function(r) {
        var o = this["@@propmod"];
        if (o.add !== void 0) {
          var a = o.add;
          if (h(a)) return s(s([], h(r) ? r : [], !0), a).sort();
          if (typeof a == "number") return (Number(r) || 0) + a;
          if (typeof a == "bigint") try {
            return BigInt(r) + a;
          } catch {
            return BigInt(0) + a;
          }
          throw new TypeError("Invalid term ".concat(a));
        }
        if (o.remove !== void 0) {
          var l = o.remove;
          if (h(l)) return h(r) ? r.filter(function(c) {
            return !l.includes(c);
          }).sort() : [];
          if (typeof l == "number") return Number(r) - l;
          if (typeof l == "bigint") try {
            return BigInt(r) - l;
          } catch {
            return BigInt(0) - l;
          }
          throw new TypeError("Invalid subtrahend ".concat(l));
        }
        return a = (a = o.replacePrefix) === null || a === void 0 ? void 0 : a[0], a && typeof r == "string" && r.startsWith(a) ? o.replacePrefix[1] + r.substring(a.length) : r;
      }, Wo);
      function Wo(r) {
        this["@@propmod"] = r;
      }
      var Ca = (he.prototype._read = function(r, o) {
        var a = this._ctx;
        return a.error ? a.table._trans(null, Ee.bind(null, a.error)) : a.table._trans("readonly", r).then(o);
      }, he.prototype._write = function(r) {
        var o = this._ctx;
        return o.error ? o.table._trans(null, Ee.bind(null, o.error)) : o.table._trans("readwrite", r, "locked");
      }, he.prototype._addAlgorithm = function(r) {
        var o = this._ctx;
        o.algorithm = Yn(o.algorithm, r);
      }, he.prototype._iterate = function(r, o) {
        return Jt(this._ctx, r, o, this._ctx.table.core);
      }, he.prototype.clone = function(r) {
        var o = Object.create(this.constructor.prototype), a = Object.create(this._ctx);
        return r && b(a, r), o._ctx = a, o;
      }, he.prototype.raw = function() {
        return this._ctx.valueMapper = null, this;
      }, he.prototype.each = function(r) {
        var o = this._ctx;
        return this._read(function(a) {
          return Jt(o, r, a, o.table.core);
        });
      }, he.prototype.count = function(r) {
        var o = this;
        return this._read(function(a) {
          var l = o._ctx, c = l.table.core;
          if (tt(l, !0)) return c.count({ trans: a, query: { index: Xt(l, c.schema), range: l.range } }).then(function(m) {
            return Math.min(m, l.limit);
          });
          var d = 0;
          return Jt(l, function() {
            return ++d, !1;
          }, a, c).then(function() {
            return d;
          });
        }).then(r);
      }, he.prototype.sortBy = function(r, o) {
        var a = r.split(".").reverse(), l = a[0], c = a.length - 1;
        function d(w, S) {
          return S ? d(w[a[S]], S - 1) : w[l];
        }
        var m = this._ctx.dir === "next" ? 1 : -1;
        function g(w, S) {
          return le(d(w, c), d(S, c)) * m;
        }
        return this.toArray(function(w) {
          return w.sort(g);
        }).then(o);
      }, he.prototype.toArray = function(r) {
        var o = this;
        return this._read(function(a) {
          var l = o._ctx;
          if (l.dir === "next" && tt(l, !0) && 0 < l.limit) {
            var c = l.valueMapper, d = Xt(l, l.table.core.schema);
            return l.table.core.query({ trans: a, limit: l.limit, values: !0, query: { index: d, range: l.range } }).then(function(g) {
              return g = g.result, c ? g.map(c) : g;
            });
          }
          var m = [];
          return Jt(l, function(g) {
            return m.push(g);
          }, a, l.table.core).then(function() {
            return m;
          });
        }, r);
      }, he.prototype.offset = function(r) {
        var o = this._ctx;
        return r <= 0 || (o.offset += r, tt(o) ? Fr(o, function() {
          var a = r;
          return function(l, c) {
            return a === 0 || (a === 1 ? --a : c(function() {
              l.advance(a), a = 0;
            }), !1);
          };
        }) : Fr(o, function() {
          var a = r;
          return function() {
            return --a < 0;
          };
        })), this;
      }, he.prototype.limit = function(r) {
        return this._ctx.limit = Math.min(this._ctx.limit, r), Fr(this._ctx, function() {
          var o = r;
          return function(a, l, c) {
            return --o <= 0 && l(c), 0 <= o;
          };
        }, !0), this;
      }, he.prototype.until = function(r, o) {
        return Nr(this._ctx, function(a, l, c) {
          return !r(a.value) || (l(c), o);
        }), this;
      }, he.prototype.first = function(r) {
        return this.limit(1).toArray(function(o) {
          return o[0];
        }).then(r);
      }, he.prototype.last = function(r) {
        return this.reverse().first(r);
      }, he.prototype.filter = function(r) {
        var o;
        return Nr(this._ctx, function(a) {
          return r(a.value);
        }), (o = this._ctx).isMatch = Yn(o.isMatch, r), this;
      }, he.prototype.and = function(r) {
        return this.filter(r);
      }, he.prototype.or = function(r) {
        return new this.db.WhereClause(this._ctx.table, r, this);
      }, he.prototype.reverse = function() {
        return this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
      }, he.prototype.desc = function() {
        return this.reverse();
      }, he.prototype.eachKey = function(r) {
        var o = this._ctx;
        return o.keysOnly = !o.isMatch, this.each(function(a, l) {
          r(l.key, l);
        });
      }, he.prototype.eachUniqueKey = function(r) {
        return this._ctx.unique = "unique", this.eachKey(r);
      }, he.prototype.eachPrimaryKey = function(r) {
        var o = this._ctx;
        return o.keysOnly = !o.isMatch, this.each(function(a, l) {
          r(l.primaryKey, l);
        });
      }, he.prototype.keys = function(r) {
        var o = this._ctx;
        o.keysOnly = !o.isMatch;
        var a = [];
        return this.each(function(l, c) {
          a.push(c.key);
        }).then(function() {
          return a;
        }).then(r);
      }, he.prototype.primaryKeys = function(r) {
        var o = this._ctx;
        if (o.dir === "next" && tt(o, !0) && 0 < o.limit) return this._read(function(l) {
          var c = Xt(o, o.table.core.schema);
          return o.table.core.query({ trans: l, values: !1, limit: o.limit, query: { index: c, range: o.range } });
        }).then(function(l) {
          return l.result;
        }).then(r);
        o.keysOnly = !o.isMatch;
        var a = [];
        return this.each(function(l, c) {
          a.push(c.primaryKey);
        }).then(function() {
          return a;
        }).then(r);
      }, he.prototype.uniqueKeys = function(r) {
        return this._ctx.unique = "unique", this.keys(r);
      }, he.prototype.firstKey = function(r) {
        return this.limit(1).keys(function(o) {
          return o[0];
        }).then(r);
      }, he.prototype.lastKey = function(r) {
        return this.reverse().firstKey(r);
      }, he.prototype.distinct = function() {
        var r = this._ctx, r = r.index && r.table.schema.idxByName[r.index];
        if (!r || !r.multi) return this;
        var o = {};
        return Nr(this._ctx, function(c) {
          var l = c.primaryKey.toString(), c = O(o, l);
          return o[l] = !0, !c;
        }), this;
      }, he.prototype.modify = function(r) {
        var o = this, a = this._ctx;
        return this._write(function(l) {
          var c, d, m;
          m = typeof r == "function" ? r : (c = f(r), d = c.length, function(C) {
            for (var T = !1, E = 0; E < d; ++E) {
              var M = c[E], B = r[M], L = ce(C, M);
              B instanceof mt ? (de(C, M, B.execute(L)), T = !0) : L !== B && (de(C, M, B), T = !0);
            }
            return T;
          });
          var g = a.table.core, y = g.schema.primaryKey, w = y.outbound, S = y.extractKey, D = 200, y = o.db._options.modifyChunkSize;
          y && (D = typeof y == "object" ? y[g.name] || y["*"] || 200 : y);
          function P(C, M) {
            var E = M.failures, M = M.numFailures;
            x += C - M;
            for (var B = 0, L = f(E); B < L.length; B++) {
              var R = L[B];
              k.push(E[R]);
            }
          }
          var k = [], x = 0, _ = [];
          return o.clone().primaryKeys().then(function(C) {
            function T(M) {
              var B = Math.min(D, C.length - M);
              return g.getMany({ trans: l, keys: C.slice(M, M + B), cache: "immutable" }).then(function(L) {
                for (var R = [], K = [], N = w ? [] : null, z = [], F = 0; F < B; ++F) {
                  var W = L[F], re = { value: Z(W), primKey: C[M + F] };
                  m.call(re, re.value, re) !== !1 && (re.value == null ? z.push(C[M + F]) : w || le(S(W), S(re.value)) === 0 ? (K.push(re.value), w && N.push(C[M + F])) : (z.push(C[M + F]), R.push(re.value)));
                }
                return Promise.resolve(0 < R.length && g.mutate({ trans: l, type: "add", values: R }).then(function(ie) {
                  for (var ae in ie.failures) z.splice(parseInt(ae), 1);
                  P(R.length, ie);
                })).then(function() {
                  return (0 < K.length || E && typeof r == "object") && g.mutate({ trans: l, type: "put", keys: N, values: K, criteria: E, changeSpec: typeof r != "function" && r, isAdditionalChunk: 0 < M }).then(function(ie) {
                    return P(K.length, ie);
                  });
                }).then(function() {
                  return (0 < z.length || E && r === Rr) && g.mutate({ trans: l, type: "delete", keys: z, criteria: E, isAdditionalChunk: 0 < M }).then(function(ie) {
                    return P(z.length, ie);
                  });
                }).then(function() {
                  return C.length > M + B && T(M + D);
                });
              });
            }
            var E = tt(a) && a.limit === 1 / 0 && (typeof r != "function" || r === Rr) && { index: a.index, range: a.range };
            return T(0).then(function() {
              if (0 < k.length) throw new An("Error modifying one or more objects", k, x, _);
              return C.length;
            });
          });
        });
      }, he.prototype.delete = function() {
        var r = this._ctx, o = r.range;
        return tt(r) && (r.isPrimKey || o.type === 3) ? this._write(function(a) {
          var l = r.table.core.schema.primaryKey, c = o;
          return r.table.core.count({ trans: a, query: { index: l, range: c } }).then(function(d) {
            return r.table.core.mutate({ trans: a, type: "deleteRange", range: c }).then(function(m) {
              var g = m.failures;
              if (m.lastResult, m.results, m = m.numFailures, m) throw new An("Could not delete some values", Object.keys(g).map(function(w) {
                return g[w];
              }), d - m);
              return d - m;
            });
          });
        }) : this.modify(Rr);
      }, he);
      function he() {
      }
      var Rr = function(r, o) {
        return o.value = null;
      };
      function xa(r, o) {
        return r < o ? -1 : r === o ? 0 : 1;
      }
      function Da(r, o) {
        return o < r ? -1 : r === o ? 0 : 1;
      }
      function Qe(r, o, a) {
        return r = r instanceof Go ? new r.Collection(r) : r, r._ctx.error = new (a || TypeError)(o), r;
      }
      function rt(r) {
        return new r.Collection(r, function() {
          return Zo("");
        }).limit(0);
      }
      function er(r, o, a, l) {
        var c, d, m, g, w, S, D, y = a.length;
        if (!a.every(function(x) {
          return typeof x == "string";
        })) return Qe(r, No);
        function P(x) {
          c = x === "next" ? function(C) {
            return C.toUpperCase();
          } : function(C) {
            return C.toLowerCase();
          }, d = x === "next" ? function(C) {
            return C.toLowerCase();
          } : function(C) {
            return C.toUpperCase();
          }, m = x === "next" ? xa : Da;
          var _ = a.map(function(C) {
            return { lower: d(C), upper: c(C) };
          }).sort(function(C, T) {
            return m(C.lower, T.lower);
          });
          g = _.map(function(C) {
            return C.upper;
          }), w = _.map(function(C) {
            return C.lower;
          }), D = (S = x) === "next" ? "" : l;
        }
        P("next"), r = new r.Collection(r, function() {
          return _n(g[0], w[y - 1] + l);
        }), r._ondirectionchange = function(x) {
          P(x);
        };
        var k = 0;
        return r._addAlgorithm(function(x, _, C) {
          var T = x.key;
          if (typeof T != "string") return !1;
          var E = d(T);
          if (o(E, w, k)) return !0;
          for (var M = null, B = k; B < y; ++B) {
            var L = function(R, K, N, z, F, W) {
              for (var re = Math.min(R.length, z.length), ie = -1, ae = 0; ae < re; ++ae) {
                var Xe = K[ae];
                if (Xe !== z[ae]) return F(R[ae], N[ae]) < 0 ? R.substr(0, ae) + N[ae] + N.substr(ae + 1) : F(R[ae], z[ae]) < 0 ? R.substr(0, ae) + z[ae] + N.substr(ae + 1) : 0 <= ie ? R.substr(0, ie) + K[ie] + N.substr(ie + 1) : null;
                F(R[ae], Xe) < 0 && (ie = ae);
              }
              return re < z.length && W === "next" ? R + N.substr(R.length) : re < R.length && W === "prev" ? R.substr(0, N.length) : ie < 0 ? null : R.substr(0, ie) + z[ie] + N.substr(ie + 1);
            }(T, E, g[B], w[B], m, S);
            L === null && M === null ? k = B + 1 : (M === null || 0 < m(M, L)) && (M = L);
          }
          return _(M !== null ? function() {
            x.continue(M + D);
          } : C), !1;
        }), r;
      }
      function _n(r, o, a, l) {
        return { type: 2, lower: r, upper: o, lowerOpen: a, upperOpen: l };
      }
      function Zo(r) {
        return { type: 1, lower: r, upper: r };
      }
      var Go = (Object.defineProperty(Ke.prototype, "Collection", { get: function() {
        return this._ctx.table.db.Collection;
      }, enumerable: !1, configurable: !0 }), Ke.prototype.between = function(r, o, a, l) {
        a = a !== !1, l = l === !0;
        try {
          return 0 < this._cmp(r, o) || this._cmp(r, o) === 0 && (a || l) && (!a || !l) ? rt(this) : new this.Collection(this, function() {
            return _n(r, o, !a, !l);
          });
        } catch {
          return Qe(this, gn);
        }
      }, Ke.prototype.equals = function(r) {
        return r == null ? Qe(this, gn) : new this.Collection(this, function() {
          return Zo(r);
        });
      }, Ke.prototype.above = function(r) {
        return r == null ? Qe(this, gn) : new this.Collection(this, function() {
          return _n(r, void 0, !0);
        });
      }, Ke.prototype.aboveOrEqual = function(r) {
        return r == null ? Qe(this, gn) : new this.Collection(this, function() {
          return _n(r, void 0, !1);
        });
      }, Ke.prototype.below = function(r) {
        return r == null ? Qe(this, gn) : new this.Collection(this, function() {
          return _n(void 0, r, !1, !0);
        });
      }, Ke.prototype.belowOrEqual = function(r) {
        return r == null ? Qe(this, gn) : new this.Collection(this, function() {
          return _n(void 0, r);
        });
      }, Ke.prototype.startsWith = function(r) {
        return typeof r != "string" ? Qe(this, No) : this.between(r, r + Rn, !0, !0);
      }, Ke.prototype.startsWithIgnoreCase = function(r) {
        return r === "" ? this.startsWith(r) : er(this, function(o, a) {
          return o.indexOf(a[0]) === 0;
        }, [r], Rn);
      }, Ke.prototype.equalsIgnoreCase = function(r) {
        return er(this, function(o, a) {
          return o === a[0];
        }, [r], "");
      }, Ke.prototype.anyOfIgnoreCase = function() {
        var r = Ve.apply(Ge, arguments);
        return r.length === 0 ? rt(this) : er(this, function(o, a) {
          return a.indexOf(o) !== -1;
        }, r, "");
      }, Ke.prototype.startsWithAnyOfIgnoreCase = function() {
        var r = Ve.apply(Ge, arguments);
        return r.length === 0 ? rt(this) : er(this, function(o, a) {
          return a.some(function(l) {
            return o.indexOf(l) === 0;
          });
        }, r, Rn);
      }, Ke.prototype.anyOf = function() {
        var r = this, o = Ve.apply(Ge, arguments), a = this._cmp;
        try {
          o.sort(a);
        } catch {
          return Qe(this, gn);
        }
        if (o.length === 0) return rt(this);
        var l = new this.Collection(this, function() {
          return _n(o[0], o[o.length - 1]);
        });
        l._ondirectionchange = function(d) {
          a = d === "next" ? r._ascending : r._descending, o.sort(a);
        };
        var c = 0;
        return l._addAlgorithm(function(d, m, g) {
          for (var w = d.key; 0 < a(w, o[c]); ) if (++c === o.length) return m(g), !1;
          return a(w, o[c]) === 0 || (m(function() {
            d.continue(o[c]);
          }), !1);
        }), l;
      }, Ke.prototype.notEqual = function(r) {
        return this.inAnyRange([[-1 / 0, r], [r, this.db._maxKey]], { includeLowers: !1, includeUppers: !1 });
      }, Ke.prototype.noneOf = function() {
        var r = Ve.apply(Ge, arguments);
        if (r.length === 0) return new this.Collection(this);
        try {
          r.sort(this._ascending);
        } catch {
          return Qe(this, gn);
        }
        var o = r.reduce(function(a, l) {
          return a ? a.concat([[a[a.length - 1][1], l]]) : [[-1 / 0, l]];
        }, null);
        return o.push([r[r.length - 1], this.db._maxKey]), this.inAnyRange(o, { includeLowers: !1, includeUppers: !1 });
      }, Ke.prototype.inAnyRange = function(T, o) {
        var a = this, l = this._cmp, c = this._ascending, d = this._descending, m = this._min, g = this._max;
        if (T.length === 0) return rt(this);
        if (!T.every(function(E) {
          return E[0] !== void 0 && E[1] !== void 0 && c(E[0], E[1]) <= 0;
        })) return Qe(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", X.InvalidArgument);
        var w = !o || o.includeLowers !== !1, S = o && o.includeUppers === !0, D, y = c;
        function P(E, M) {
          return y(E[0], M[0]);
        }
        try {
          (D = T.reduce(function(E, M) {
            for (var B = 0, L = E.length; B < L; ++B) {
              var R = E[B];
              if (l(M[0], R[1]) < 0 && 0 < l(M[1], R[0])) {
                R[0] = m(R[0], M[0]), R[1] = g(R[1], M[1]);
                break;
              }
            }
            return B === L && E.push(M), E;
          }, [])).sort(P);
        } catch {
          return Qe(this, gn);
        }
        var k = 0, x = S ? function(E) {
          return 0 < c(E, D[k][1]);
        } : function(E) {
          return 0 <= c(E, D[k][1]);
        }, _ = w ? function(E) {
          return 0 < d(E, D[k][0]);
        } : function(E) {
          return 0 <= d(E, D[k][0]);
        }, C = x, T = new this.Collection(this, function() {
          return _n(D[0][0], D[D.length - 1][1], !w, !S);
        });
        return T._ondirectionchange = function(E) {
          y = E === "next" ? (C = x, c) : (C = _, d), D.sort(P);
        }, T._addAlgorithm(function(E, M, B) {
          for (var L, R = E.key; C(R); ) if (++k === D.length) return M(B), !1;
          return !x(L = R) && !_(L) || (a._cmp(R, D[k][1]) === 0 || a._cmp(R, D[k][0]) === 0 || M(function() {
            y === c ? E.continue(D[k][0]) : E.continue(D[k][1]);
          }), !1);
        }), T;
      }, Ke.prototype.startsWithAnyOf = function() {
        var r = Ve.apply(Ge, arguments);
        return r.every(function(o) {
          return typeof o == "string";
        }) ? r.length === 0 ? rt(this) : this.inAnyRange(r.map(function(o) {
          return [o, o + Rn];
        })) : Qe(this, "startsWithAnyOf() only works with strings");
      }, Ke);
      function Ke() {
      }
      function ln(r) {
        return _e(function(o) {
          return bt(o), r(o.target.error), !1;
        });
      }
      function bt(r) {
        r.stopPropagation && r.stopPropagation(), r.preventDefault && r.preventDefault();
      }
      var gt = "storagemutated", Yr = "x-storagemutated-1", Pn = pt(null, gt), _a = (cn.prototype._lock = function() {
        return U(!Q.global), ++this._reculock, this._reculock !== 1 || Q.global || (Q.lockOwnerFor = this), this;
      }, cn.prototype._unlock = function() {
        if (U(!Q.global), --this._reculock == 0) for (Q.global || (Q.lockOwnerFor = null); 0 < this._blockedFuncs.length && !this._locked(); ) {
          var r = this._blockedFuncs.shift();
          try {
            Fn(r[1], r[0]);
          } catch {
          }
        }
        return this;
      }, cn.prototype._locked = function() {
        return this._reculock && Q.lockOwnerFor !== this;
      }, cn.prototype.create = function(r) {
        var o = this;
        if (!this.mode) return this;
        var a = this.db.idbdb, l = this.db._state.dbOpenError;
        if (U(!this.idbtrans), !r && !a) switch (l && l.name) {
          case "DatabaseClosedError":
            throw new X.DatabaseClosed(l);
          case "MissingAPIError":
            throw new X.MissingAPI(l.message, l);
          default:
            throw new X.OpenFailed(l);
        }
        if (!this.active) throw new X.TransactionInactive();
        return U(this._completion._state === null), (r = this.idbtrans = r || (this.db.core || a).transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })).onerror = _e(function(c) {
          bt(c), o._reject(r.error);
        }), r.onabort = _e(function(c) {
          bt(c), o.active && o._reject(new X.Abort(r.error)), o.active = !1, o.on("abort").fire(c);
        }), r.oncomplete = _e(function() {
          o.active = !1, o._resolve(), "mutatedParts" in r && Pn.storagemutated.fire(r.mutatedParts);
        }), this;
      }, cn.prototype._promise = function(r, o, a) {
        var l = this;
        if (r === "readwrite" && this.mode !== "readwrite") return Ee(new X.ReadOnly("Transaction is readonly"));
        if (!this.active) return Ee(new X.TransactionInactive());
        if (this._locked()) return new H(function(d, m) {
          l._blockedFuncs.push([function() {
            l._promise(r, o, a).then(d, m);
          }, Q]);
        });
        if (a) return Cn(function() {
          var d = new H(function(m, g) {
            l._lock();
            var w = o(m, g, l);
            w && w.then && w.then(m, g);
          });
          return d.finally(function() {
            return l._unlock();
          }), d._lib = !0, d;
        });
        var c = new H(function(d, m) {
          var g = o(d, m, l);
          g && g.then && g.then(d, m);
        });
        return c._lib = !0, c;
      }, cn.prototype._root = function() {
        return this.parent ? this.parent._root() : this;
      }, cn.prototype.waitFor = function(r) {
        var o, a = this._root(), l = H.resolve(r);
        a._waitingFor ? a._waitingFor = a._waitingFor.then(function() {
          return l;
        }) : (a._waitingFor = l, a._waitingQueue = [], o = a.idbtrans.objectStore(a.storeNames[0]), function d() {
          for (++a._spinCount; a._waitingQueue.length; ) a._waitingQueue.shift()();
          a._waitingFor && (o.get(-1 / 0).onsuccess = d);
        }());
        var c = a._waitingFor;
        return new H(function(d, m) {
          l.then(function(g) {
            return a._waitingQueue.push(_e(d.bind(null, g)));
          }, function(g) {
            return a._waitingQueue.push(_e(m.bind(null, g)));
          }).finally(function() {
            a._waitingFor === c && (a._waitingFor = null);
          });
        });
      }, cn.prototype.abort = function() {
        this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new X.Abort()));
      }, cn.prototype.table = function(r) {
        var o = this._memoizedTables || (this._memoizedTables = {});
        if (O(o, r)) return o[r];
        var a = this.schema[r];
        if (!a) throw new X.NotFound("Table " + r + " not part of transaction");
        return a = new this.db.Table(r, a, this), a.core = this.db.core.table(r), o[r] = a;
      }, cn);
      function cn() {
      }
      function zr(r, o, a, l, c, d, m) {
        return { name: r, keyPath: o, unique: a, multi: l, auto: c, compound: d, src: (a && !m ? "&" : "") + (l ? "*" : "") + (c ? "++" : "") + Qo(o) };
      }
      function Qo(r) {
        return typeof r == "string" ? r : r ? "[" + [].join.call(r, "+") + "]" : "";
      }
      function Hr(r, o, a) {
        return { name: r, primKey: o, indexes: a, mappedClass: null, idxByName: (l = function(c) {
          return [c.name, c];
        }, a.reduce(function(c, d, m) {
          return m = l(d, m), m && (c[m[0]] = m[1]), c;
        }, {})) };
        var l;
      }
      var yt = function(r) {
        try {
          return r.only([[]]), yt = function() {
            return [[]];
          }, [[]];
        } catch {
          return yt = function() {
            return Rn;
          }, Rn;
        }
      };
      function qr(r) {
        return r == null ? function() {
        } : typeof r == "string" ? (o = r).split(".").length === 1 ? function(a) {
          return a[o];
        } : function(a) {
          return ce(a, o);
        } : function(a) {
          return ce(a, r);
        };
        var o;
      }
      function Xo(r) {
        return [].slice.call(r);
      }
      var Pa = 0;
      function vt(r) {
        return r == null ? ":id" : typeof r == "string" ? r : "[".concat(r.join("+"), "]");
      }
      function Ta(r, o, w) {
        function l(C) {
          if (C.type === 3) return null;
          if (C.type === 4) throw new Error("Cannot convert never type to IDBKeyRange");
          var k = C.lower, x = C.upper, _ = C.lowerOpen, C = C.upperOpen;
          return k === void 0 ? x === void 0 ? null : o.upperBound(x, !!C) : x === void 0 ? o.lowerBound(k, !!_) : o.bound(k, x, !!_, !!C);
        }
        function c(P) {
          var k, x = P.name;
          return { name: x, schema: P, mutate: function(_) {
            var C = _.trans, T = _.type, E = _.keys, M = _.values, B = _.range;
            return new Promise(function(L, R) {
              L = _e(L);
              var K = C.objectStore(x), N = K.keyPath == null, z = T === "put" || T === "add";
              if (!z && T !== "delete" && T !== "deleteRange") throw new Error("Invalid operation type: " + T);
              var F, W = (E || M || { length: 1 }).length;
              if (E && M && E.length !== M.length) throw new Error("Given keys array must have same length as given values array.");
              if (W === 0) return L({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
              function re(He) {
                ++Xe, bt(He);
              }
              var ie = [], ae = [], Xe = 0;
              if (T === "deleteRange") {
                if (B.type === 4) return L({ numFailures: Xe, failures: ae, results: [], lastResult: void 0 });
                B.type === 3 ? ie.push(F = K.clear()) : ie.push(F = K.delete(l(B)));
              } else {
                var N = z ? N ? [M, E] : [M, null] : [E, null], te = N[0], Ye = N[1];
                if (z) for (var ze = 0; ze < W; ++ze) ie.push(F = Ye && Ye[ze] !== void 0 ? K[T](te[ze], Ye[ze]) : K[T](te[ze])), F.onerror = re;
                else for (ze = 0; ze < W; ++ze) ie.push(F = K[T](te[ze])), F.onerror = re;
              }
              function pr(He) {
                He = He.target.result, ie.forEach(function(qn, co) {
                  return qn.error != null && (ae[co] = qn.error);
                }), L({ numFailures: Xe, failures: ae, results: T === "delete" ? E : ie.map(function(qn) {
                  return qn.result;
                }), lastResult: He });
              }
              F.onerror = function(He) {
                re(He), pr(He);
              }, F.onsuccess = pr;
            });
          }, getMany: function(_) {
            var C = _.trans, T = _.keys;
            return new Promise(function(E, M) {
              E = _e(E);
              for (var B, L = C.objectStore(x), R = T.length, K = new Array(R), N = 0, z = 0, F = function(ie) {
                ie = ie.target, K[ie._pos] = ie.result, ++z === N && E(K);
              }, W = ln(M), re = 0; re < R; ++re) T[re] != null && ((B = L.get(T[re]))._pos = re, B.onsuccess = F, B.onerror = W, ++N);
              N === 0 && E(K);
            });
          }, get: function(_) {
            var C = _.trans, T = _.key;
            return new Promise(function(E, M) {
              E = _e(E);
              var B = C.objectStore(x).get(T);
              B.onsuccess = function(L) {
                return E(L.target.result);
              }, B.onerror = ln(M);
            });
          }, query: (k = S, function(_) {
            return new Promise(function(C, T) {
              C = _e(C);
              var E, M, B, N = _.trans, L = _.values, R = _.limit, F = _.query, K = R === 1 / 0 ? void 0 : R, z = F.index, F = F.range, N = N.objectStore(x), z = z.isPrimaryKey ? N : N.index(z.name), F = l(F);
              if (R === 0) return C({ result: [] });
              k ? ((K = L ? z.getAll(F, K) : z.getAllKeys(F, K)).onsuccess = function(W) {
                return C({ result: W.target.result });
              }, K.onerror = ln(T)) : (E = 0, M = !L && "openKeyCursor" in z ? z.openKeyCursor(F) : z.openCursor(F), B = [], M.onsuccess = function(W) {
                var re = M.result;
                return re ? (B.push(L ? re.value : re.primaryKey), ++E === R ? C({ result: B }) : void re.continue()) : C({ result: B });
              }, M.onerror = ln(T));
            });
          }), openCursor: function(_) {
            var C = _.trans, T = _.values, E = _.query, M = _.reverse, B = _.unique;
            return new Promise(function(L, R) {
              L = _e(L);
              var z = E.index, K = E.range, N = C.objectStore(x), N = z.isPrimaryKey ? N : N.index(z.name), z = M ? B ? "prevunique" : "prev" : B ? "nextunique" : "next", F = !T && "openKeyCursor" in N ? N.openKeyCursor(l(K), z) : N.openCursor(l(K), z);
              F.onerror = ln(R), F.onsuccess = _e(function(W) {
                var re, ie, ae, Xe, te = F.result;
                te ? (te.___id = ++Pa, te.done = !1, re = te.continue.bind(te), ie = (ie = te.continuePrimaryKey) && ie.bind(te), ae = te.advance.bind(te), Xe = function() {
                  throw new Error("Cursor not stopped");
                }, te.trans = C, te.stop = te.continue = te.continuePrimaryKey = te.advance = function() {
                  throw new Error("Cursor not started");
                }, te.fail = _e(R), te.next = function() {
                  var Ye = this, ze = 1;
                  return this.start(function() {
                    return ze-- ? Ye.continue() : Ye.stop();
                  }).then(function() {
                    return Ye;
                  });
                }, te.start = function(Ye) {
                  function ze() {
                    if (F.result) try {
                      Ye();
                    } catch (He) {
                      te.fail(He);
                    }
                    else te.done = !0, te.start = function() {
                      throw new Error("Cursor behind last entry");
                    }, te.stop();
                  }
                  var pr = new Promise(function(He, qn) {
                    He = _e(He), F.onerror = ln(qn), te.fail = qn, te.stop = function(co) {
                      te.stop = te.continue = te.continuePrimaryKey = te.advance = Xe, He(co);
                    };
                  });
                  return F.onsuccess = _e(function(He) {
                    F.onsuccess = ze, ze();
                  }), te.continue = re, te.continuePrimaryKey = ie, te.advance = ae, ze(), pr;
                }, L(te)) : L(null);
              }, R);
            });
          }, count: function(_) {
            var C = _.query, T = _.trans, E = C.index, M = C.range;
            return new Promise(function(B, L) {
              var R = T.objectStore(x), K = E.isPrimaryKey ? R : R.index(E.name), R = l(M), K = R ? K.count(R) : K.count();
              K.onsuccess = _e(function(N) {
                return B(N.target.result);
              }), K.onerror = ln(L);
            });
          } };
        }
        var d, m, g, D = (m = w, g = Xo((d = r).objectStoreNames), { schema: { name: d.name, tables: g.map(function(P) {
          return m.objectStore(P);
        }).map(function(P) {
          var k = P.keyPath, C = P.autoIncrement, x = h(k), _ = {}, C = { name: P.name, primaryKey: { name: null, isPrimaryKey: !0, outbound: k == null, compound: x, keyPath: k, autoIncrement: C, unique: !0, extractKey: qr(k) }, indexes: Xo(P.indexNames).map(function(T) {
            return P.index(T);
          }).map(function(B) {
            var E = B.name, M = B.unique, L = B.multiEntry, B = B.keyPath, L = { name: E, compound: h(B), keyPath: B, unique: M, multiEntry: L, extractKey: qr(B) };
            return _[vt(B)] = L;
          }), getIndexByKeyPath: function(T) {
            return _[vt(T)];
          } };
          return _[":id"] = C.primaryKey, k != null && (_[vt(k)] = C.primaryKey), C;
        }) }, hasGetAll: 0 < g.length && "getAll" in m.objectStore(g[0]) && !(typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) }), w = D.schema, S = D.hasGetAll, D = w.tables.map(c), y = {};
        return D.forEach(function(P) {
          return y[P.name] = P;
        }), { stack: "dbcore", transaction: r.transaction.bind(r), table: function(P) {
          if (!y[P]) throw new Error("Table '".concat(P, "' not found"));
          return y[P];
        }, MIN_KEY: -1 / 0, MAX_KEY: yt(o), schema: w };
      }
      function Oa(r, o, a, l) {
        var c = a.IDBKeyRange;
        return a.indexedDB, { dbcore: (l = Ta(o, c, l), r.dbcore.reduce(function(d, m) {
          return m = m.create, i(i({}, d), m(d));
        }, l)) };
      }
      function nr(r, l) {
        var a = l.db, l = Oa(r._middlewares, a, r._deps, l);
        r.core = l.dbcore, r.tables.forEach(function(c) {
          var d = c.name;
          r.core.schema.tables.some(function(m) {
            return m.name === d;
          }) && (c.core = r.core.table(d), r[d] instanceof r.Table && (r[d].core = c.core));
        });
      }
      function tr(r, o, a, l) {
        a.forEach(function(c) {
          var d = l[c];
          o.forEach(function(m) {
            var g = function w(S, D) {
              return G(S, D) || (S = v(S)) && w(S, D);
            }(m, c);
            (!g || "value" in g && g.value === void 0) && (m === r.Transaction.prototype || m instanceof r.Transaction ? A(m, c, { get: function() {
              return this.table(c);
            }, set: function(w) {
              I(this, c, { value: w, writable: !0, configurable: !0, enumerable: !0 });
            } }) : m[c] = new r.Table(c, d));
          });
        });
      }
      function Ur(r, o) {
        o.forEach(function(a) {
          for (var l in a) a[l] instanceof r.Table && delete a[l];
        });
      }
      function $a(r, o) {
        return r._cfg.version - o._cfg.version;
      }
      function Ea(r, o, a, l) {
        var c = r._dbSchema;
        a.objectStoreNames.contains("$meta") && !c.$meta && (c.$meta = Hr("$meta", ei("")[0], []), r._storeNames.push("$meta"));
        var d = r._createTransaction("readwrite", r._storeNames, c);
        d.create(a), d._completion.catch(l);
        var m = d._reject.bind(d), g = Q.transless || Q;
        Cn(function() {
          return Q.trans = d, Q.transless = g, o !== 0 ? (nr(r, a), S = o, ((w = d).storeNames.includes("$meta") ? w.table("$meta").get("version").then(function(D) {
            return D ?? S;
          }) : H.resolve(S)).then(function(D) {
            return P = D, k = d, x = a, _ = [], D = (y = r)._versions, C = y._dbSchema = or(0, y.idbdb, x), (D = D.filter(function(T) {
              return T._cfg.version >= P;
            })).length !== 0 ? (D.forEach(function(T) {
              _.push(function() {
                var E = C, M = T._cfg.dbschema;
                ir(y, E, x), ir(y, M, x), C = y._dbSchema = M;
                var B = Wr(E, M);
                B.add.forEach(function(z) {
                  Zr(x, z[0], z[1].primKey, z[1].indexes);
                }), B.change.forEach(function(z) {
                  if (z.recreate) throw new X.Upgrade("Not yet support for changing primary key");
                  var F = x.objectStore(z.name);
                  z.add.forEach(function(W) {
                    return rr(F, W);
                  }), z.change.forEach(function(W) {
                    F.deleteIndex(W.name), rr(F, W);
                  }), z.del.forEach(function(W) {
                    return F.deleteIndex(W);
                  });
                });
                var L = T._cfg.contentUpgrade;
                if (L && T._cfg.version > P) {
                  nr(y, x), k._memoizedTables = {};
                  var R = Se(M);
                  B.del.forEach(function(z) {
                    R[z] = E[z];
                  }), Ur(y, [y.Transaction.prototype]), tr(y, [y.Transaction.prototype], f(R), R), k.schema = R;
                  var K, N = We(L);
                  return N && et(), B = H.follow(function() {
                    var z;
                    (K = L(k)) && N && (z = xn.bind(null, null), K.then(z, z));
                  }), K && typeof K.then == "function" ? H.resolve(K) : B.then(function() {
                    return K;
                  });
                }
              }), _.push(function(E) {
                var M, B, L = T._cfg.dbschema;
                M = L, B = E, [].slice.call(B.db.objectStoreNames).forEach(function(R) {
                  return M[R] == null && B.db.deleteObjectStore(R);
                }), Ur(y, [y.Transaction.prototype]), tr(y, [y.Transaction.prototype], y._storeNames, y._dbSchema), k.schema = y._dbSchema;
              }), _.push(function(E) {
                y.idbdb.objectStoreNames.contains("$meta") && (Math.ceil(y.idbdb.version / 10) === T._cfg.version ? (y.idbdb.deleteObjectStore("$meta"), delete y._dbSchema.$meta, y._storeNames = y._storeNames.filter(function(M) {
                  return M !== "$meta";
                })) : E.objectStore("$meta").put(T._cfg.version, "version"));
              });
            }), function T() {
              return _.length ? H.resolve(_.shift()(k.idbtrans)).then(T) : H.resolve();
            }().then(function() {
              Jo(C, x);
            })) : H.resolve();
            var y, P, k, x, _, C;
          }).catch(m)) : (f(c).forEach(function(D) {
            Zr(a, D, c[D].primKey, c[D].indexes);
          }), nr(r, a), void H.follow(function() {
            return r.on.populate.fire(d);
          }).catch(m));
          var w, S;
        });
      }
      function Ma(r, o) {
        Jo(r._dbSchema, o), o.db.version % 10 != 0 || o.objectStoreNames.contains("$meta") || o.db.createObjectStore("$meta").add(Math.ceil(o.db.version / 10 - 1), "version");
        var a = or(0, r.idbdb, o);
        ir(r, r._dbSchema, o);
        for (var l = 0, c = Wr(a, r._dbSchema).change; l < c.length; l++) {
          var d = function(m) {
            if (m.change.length || m.recreate) return console.warn("Unable to patch indexes of table ".concat(m.name, " because it has changes on the type of index or primary key.")), { value: void 0 };
            var g = o.objectStore(m.name);
            m.add.forEach(function(w) {
              Je && console.debug("Dexie upgrade patch: Creating missing index ".concat(m.name, ".").concat(w.src)), rr(g, w);
            });
          }(c[l]);
          if (typeof d == "object") return d.value;
        }
      }
      function Wr(r, o) {
        var a, l = { del: [], add: [], change: [] };
        for (a in r) o[a] || l.del.push(a);
        for (a in o) {
          var c = r[a], d = o[a];
          if (c) {
            var m = { name: a, def: d, recreate: !1, del: [], add: [], change: [] };
            if ("" + (c.primKey.keyPath || "") != "" + (d.primKey.keyPath || "") || c.primKey.auto !== d.primKey.auto) m.recreate = !0, l.change.push(m);
            else {
              var g = c.idxByName, w = d.idxByName, S = void 0;
              for (S in g) w[S] || m.del.push(S);
              for (S in w) {
                var D = g[S], y = w[S];
                D ? D.src !== y.src && m.change.push(y) : m.add.push(y);
              }
              (0 < m.del.length || 0 < m.add.length || 0 < m.change.length) && l.change.push(m);
            }
          } else l.add.push([a, d]);
        }
        return l;
      }
      function Zr(r, o, a, l) {
        var c = r.db.createObjectStore(o, a.keyPath ? { keyPath: a.keyPath, autoIncrement: a.auto } : { autoIncrement: a.auto });
        return l.forEach(function(d) {
          return rr(c, d);
        }), c;
      }
      function Jo(r, o) {
        f(r).forEach(function(a) {
          o.db.objectStoreNames.contains(a) || (Je && console.debug("Dexie: Creating missing table", a), Zr(o, a, r[a].primKey, r[a].indexes));
        });
      }
      function rr(r, o) {
        r.createIndex(o.name, o.keyPath, { unique: o.unique, multiEntry: o.multi });
      }
      function or(r, o, a) {
        var l = {};
        return ee(o.objectStoreNames, 0).forEach(function(c) {
          for (var d = a.objectStore(c), m = zr(Qo(S = d.keyPath), S || "", !0, !1, !!d.autoIncrement, S && typeof S != "string", !0), g = [], w = 0; w < d.indexNames.length; ++w) {
            var D = d.index(d.indexNames[w]), S = D.keyPath, D = zr(D.name, S, !!D.unique, !!D.multiEntry, !1, S && typeof S != "string", !1);
            g.push(D);
          }
          l[c] = Hr(c, m, g);
        }), l;
      }
      function ir(r, o, a) {
        for (var l = a.db.objectStoreNames, c = 0; c < l.length; ++c) {
          var d = l[c], m = a.objectStore(d);
          r._hasGetAll = "getAll" in m;
          for (var g = 0; g < m.indexNames.length; ++g) {
            var w = m.indexNames[g], S = m.index(w).keyPath, D = typeof S == "string" ? S : "[" + ee(S).join("+") + "]";
            !o[d] || (S = o[d].idxByName[D]) && (S.name = w, delete o[d].idxByName[D], o[d].idxByName[w] = S);
          }
        }
        typeof navigator < "u" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && u.WorkerGlobalScope && u instanceof u.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (r._hasGetAll = !1);
      }
      function ei(r) {
        return r.split(",").map(function(o, a) {
          var l = (o = o.trim()).replace(/([&*]|\+\+)/g, ""), c = /^\[/.test(l) ? l.match(/^\[(.*)\]$/)[1].split("+") : l;
          return zr(l, c || null, /\&/.test(o), /\*/.test(o), /\+\+/.test(o), h(c), a === 0);
        });
      }
      var Ia = (ar.prototype._parseStoresSpec = function(r, o) {
        f(r).forEach(function(a) {
          if (r[a] !== null) {
            var l = ei(r[a]), c = l.shift();
            if (c.unique = !0, c.multi) throw new X.Schema("Primary key cannot be multi-valued");
            l.forEach(function(d) {
              if (d.auto) throw new X.Schema("Only primary key can be marked as autoIncrement (++)");
              if (!d.keyPath) throw new X.Schema("Index must have a name and cannot be an empty string");
            }), o[a] = Hr(a, c, l);
          }
        });
      }, ar.prototype.stores = function(a) {
        var o = this.db;
        this._cfg.storesSource = this._cfg.storesSource ? b(this._cfg.storesSource, a) : a;
        var a = o._versions, l = {}, c = {};
        return a.forEach(function(d) {
          b(l, d._cfg.storesSource), c = d._cfg.dbschema = {}, d._parseStoresSpec(l, c);
        }), o._dbSchema = c, Ur(o, [o._allTables, o, o.Transaction.prototype]), tr(o, [o._allTables, o, o.Transaction.prototype, this._cfg.tables], f(c), c), o._storeNames = f(c), this;
      }, ar.prototype.upgrade = function(r) {
        return this._cfg.contentUpgrade = lt(this._cfg.contentUpgrade || ye, r), this;
      }, ar);
      function ar() {
      }
      function Gr(r, o) {
        var a = r._dbNamesDB;
        return a || (a = r._dbNamesDB = new yn(Gt, { addons: [], indexedDB: r, IDBKeyRange: o })).version(1).stores({ dbnames: "name" }), a.table("dbnames");
      }
      function Qr(r) {
        return r && typeof r.databases == "function";
      }
      function Xr(r) {
        return Cn(function() {
          return Q.letThrough = !0, r();
        });
      }
      function Jr(r) {
        return !("from" in r);
      }
      var Re = function(r, o) {
        if (!this) {
          var a = new Re();
          return r && "d" in r && b(a, r), a;
        }
        b(this, arguments.length ? { d: 1, from: r, to: 1 < arguments.length ? o : r } : { d: 0 });
      };
      function wt(r, o, a) {
        var l = le(o, a);
        if (!isNaN(l)) {
          if (0 < l) throw RangeError();
          if (Jr(r)) return b(r, { from: o, to: a, d: 1 });
          var c = r.l, l = r.r;
          if (le(a, r.from) < 0) return c ? wt(c, o, a) : r.l = { from: o, to: a, d: 1, l: null, r: null }, ti(r);
          if (0 < le(o, r.to)) return l ? wt(l, o, a) : r.r = { from: o, to: a, d: 1, l: null, r: null }, ti(r);
          le(o, r.from) < 0 && (r.from = o, r.l = null, r.d = l ? l.d + 1 : 1), 0 < le(a, r.to) && (r.to = a, r.r = null, r.d = r.l ? r.l.d + 1 : 1), a = !r.r, c && !r.l && kt(r, c), l && a && kt(r, l);
        }
      }
      function kt(r, o) {
        Jr(o) || function a(l, w) {
          var d = w.from, m = w.to, g = w.l, w = w.r;
          wt(l, d, m), g && a(l, g), w && a(l, w);
        }(r, o);
      }
      function ni(r, o) {
        var a = sr(o), l = a.next();
        if (l.done) return !1;
        for (var c = l.value, d = sr(r), m = d.next(c.from), g = m.value; !l.done && !m.done; ) {
          if (le(g.from, c.to) <= 0 && 0 <= le(g.to, c.from)) return !0;
          le(c.from, g.from) < 0 ? c = (l = a.next(g.from)).value : g = (m = d.next(c.from)).value;
        }
        return !1;
      }
      function sr(r) {
        var o = Jr(r) ? null : { s: 0, n: r };
        return { next: function(a) {
          for (var l = 0 < arguments.length; o; ) switch (o.s) {
            case 0:
              if (o.s = 1, l) for (; o.n.l && le(a, o.n.from) < 0; ) o = { up: o, n: o.n.l, s: 1 };
              else for (; o.n.l; ) o = { up: o, n: o.n.l, s: 1 };
            case 1:
              if (o.s = 2, !l || le(a, o.n.to) <= 0) return { value: o.n, done: !1 };
            case 2:
              if (o.n.r) {
                o.s = 3, o = { up: o, n: o.n.r, s: 0 };
                continue;
              }
            case 3:
              o = o.up;
          }
          return { done: !0 };
        } };
      }
      function ti(r) {
        var o, a, l = (((o = r.r) === null || o === void 0 ? void 0 : o.d) || 0) - (((a = r.l) === null || a === void 0 ? void 0 : a.d) || 0), c = 1 < l ? "r" : l < -1 ? "l" : "";
        c && (o = c == "r" ? "l" : "r", a = i({}, r), l = r[c], r.from = l.from, r.to = l.to, r[c] = l[c], a[c] = l[o], (r[o] = a).d = ri(a)), r.d = ri(r);
      }
      function ri(a) {
        var o = a.r, a = a.l;
        return (o ? a ? Math.max(o.d, a.d) : o.d : a ? a.d : 0) + 1;
      }
      function ur(r, o) {
        return f(o).forEach(function(a) {
          r[a] ? kt(r[a], o[a]) : r[a] = function l(c) {
            var d, m, g = {};
            for (d in c) O(c, d) && (m = c[d], g[d] = !m || typeof m != "object" || Ae.has(m.constructor) ? m : l(m));
            return g;
          }(o[a]);
        }), r;
      }
      function eo(r, o) {
        return r.all || o.all || Object.keys(r).some(function(a) {
          return o[a] && ni(o[a], r[a]);
        });
      }
      $(Re.prototype, ((en = { add: function(r) {
        return kt(this, r), this;
      }, addKey: function(r) {
        return wt(this, r, r), this;
      }, addKeys: function(r) {
        var o = this;
        return r.forEach(function(a) {
          return wt(o, a, a);
        }), this;
      }, hasKey: function(r) {
        var o = sr(this).next(r).value;
        return o && le(o.from, r) <= 0 && 0 <= le(o.to, r);
      } })[ke] = function() {
        return sr(this);
      }, en));
      var zn = {}, no = {}, to = !1;
      function lr(r) {
        ur(no, r), to || (to = !0, setTimeout(function() {
          to = !1, ro(no, !(no = {}));
        }, 0));
      }
      function ro(r, o) {
        o === void 0 && (o = !1);
        var a = /* @__PURE__ */ new Set();
        if (r.all) for (var l = 0, c = Object.values(zn); l < c.length; l++) oi(m = c[l], r, a, o);
        else for (var d in r) {
          var m, g = /^idb\:\/\/(.*)\/(.*)\//.exec(d);
          g && (d = g[1], g = g[2], (m = zn["idb://".concat(d, "/").concat(g)]) && oi(m, r, a, o));
        }
        a.forEach(function(w) {
          return w();
        });
      }
      function oi(r, o, a, l) {
        for (var c = [], d = 0, m = Object.entries(r.queries.query); d < m.length; d++) {
          for (var g = m[d], w = g[0], S = [], D = 0, y = g[1]; D < y.length; D++) {
            var P = y[D];
            eo(o, P.obsSet) ? P.subscribers.forEach(function(C) {
              return a.add(C);
            }) : l && S.push(P);
          }
          l && c.push([w, S]);
        }
        if (l) for (var k = 0, x = c; k < x.length; k++) {
          var _ = x[k], w = _[0], S = _[1];
          r.queries.query[w] = S;
        }
      }
      function Aa(r) {
        var o = r._state, a = r._deps.indexedDB;
        if (o.isBeingOpened || r.idbdb) return o.dbReadyPromise.then(function() {
          return o.dbOpenError ? Ee(o.dbOpenError) : r;
        });
        o.isBeingOpened = !0, o.dbOpenError = null, o.openComplete = !1;
        var l = o.openCanceller, c = Math.round(10 * r.verno), d = !1;
        function m() {
          if (o.openCanceller !== l) throw new X.DatabaseClosed("db.open() was cancelled");
        }
        function g() {
          return new H(function(P, k) {
            if (m(), !a) throw new X.MissingAPI();
            var x = r.name, _ = o.autoSchema || !c ? a.open(x) : a.open(x, c);
            if (!_) throw new X.MissingAPI();
            _.onerror = ln(k), _.onblocked = _e(r._fireOnBlocked), _.onupgradeneeded = _e(function(C) {
              var T;
              D = _.transaction, o.autoSchema && !r._options.allowEmptyDB ? (_.onerror = bt, D.abort(), _.result.close(), (T = a.deleteDatabase(x)).onsuccess = T.onerror = _e(function() {
                k(new X.NoSuchDatabase("Database ".concat(x, " doesnt exist")));
              })) : (D.onerror = ln(k), C = C.oldVersion > Math.pow(2, 62) ? 0 : C.oldVersion, y = C < 1, r.idbdb = _.result, d && Ma(r, D), Ea(r, C / 10, D, k));
            }, k), _.onsuccess = _e(function() {
              D = null;
              var C, T, E, M, B, L = r.idbdb = _.result, R = ee(L.objectStoreNames);
              if (0 < R.length) try {
                var K = L.transaction((M = R).length === 1 ? M[0] : M, "readonly");
                if (o.autoSchema) T = L, E = K, (C = r).verno = T.version / 10, E = C._dbSchema = or(0, T, E), C._storeNames = ee(T.objectStoreNames, 0), tr(C, [C._allTables], f(E), E);
                else if (ir(r, r._dbSchema, K), ((B = Wr(or(0, (B = r).idbdb, K), B._dbSchema)).add.length || B.change.some(function(N) {
                  return N.add.length || N.change.length;
                })) && !d) return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."), L.close(), c = L.version + 1, d = !0, P(g());
                nr(r, K);
              } catch {
              }
              nt.push(r), L.onversionchange = _e(function(N) {
                o.vcFired = !0, r.on("versionchange").fire(N);
              }), L.onclose = _e(function(N) {
                r.on("close").fire(N);
              }), y && (B = r._deps, K = x, L = B.indexedDB, B = B.IDBKeyRange, Qr(L) || K === Gt || Gr(L, B).put({ name: K }).catch(ye)), P();
            }, k);
          }).catch(function(P) {
            switch (P == null ? void 0 : P.name) {
              case "UnknownError":
                if (0 < o.PR1398_maxLoop) return o.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), g();
                break;
              case "VersionError":
                if (0 < c) return c = 0, g();
            }
            return H.reject(P);
          });
        }
        var w, S = o.dbReadyResolve, D = null, y = !1;
        return H.race([l, (typeof navigator > "u" ? H.resolve() : !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(P) {
          function k() {
            return indexedDB.databases().finally(P);
          }
          w = setInterval(k, 100), k();
        }).finally(function() {
          return clearInterval(w);
        }) : Promise.resolve()).then(g)]).then(function() {
          return m(), o.onReadyBeingFired = [], H.resolve(Xr(function() {
            return r.on.ready.fire(r.vip);
          })).then(function P() {
            if (0 < o.onReadyBeingFired.length) {
              var k = o.onReadyBeingFired.reduce(lt, ye);
              return o.onReadyBeingFired = [], H.resolve(Xr(function() {
                return k(r.vip);
              })).then(P);
            }
          });
        }).finally(function() {
          o.openCanceller === l && (o.onReadyBeingFired = null, o.isBeingOpened = !1);
        }).catch(function(P) {
          o.dbOpenError = P;
          try {
            D && D.abort();
          } catch {
          }
          return l === o.openCanceller && r._close(), Ee(P);
        }).finally(function() {
          o.openComplete = !0, S();
        }).then(function() {
          var P;
          return y && (P = {}, r.tables.forEach(function(k) {
            k.schema.indexes.forEach(function(x) {
              x.name && (P["idb://".concat(r.name, "/").concat(k.name, "/").concat(x.name)] = new Re(-1 / 0, [[[]]]));
            }), P["idb://".concat(r.name, "/").concat(k.name, "/")] = P["idb://".concat(r.name, "/").concat(k.name, "/:dels")] = new Re(-1 / 0, [[[]]]);
          }), Pn(gt).fire(P), ro(P, !0)), r;
        });
      }
      function oo(r) {
        function o(d) {
          return r.next(d);
        }
        var a = c(o), l = c(function(d) {
          return r.throw(d);
        });
        function c(d) {
          return function(w) {
            var g = d(w), w = g.value;
            return g.done ? w : w && typeof w.then == "function" ? w.then(a, l) : h(w) ? Promise.all(w).then(a, l) : a(w);
          };
        }
        return c(o)();
      }
      function cr(r, o, a) {
        for (var l = h(r) ? r.slice() : [r], c = 0; c < a; ++c) l.push(o);
        return l;
      }
      var Ba = { stack: "dbcore", name: "VirtualIndexMiddleware", level: 1, create: function(r) {
        return i(i({}, r), { table: function(o) {
          var a = r.table(o), l = a.schema, c = {}, d = [];
          function m(y, P, k) {
            var x = vt(y), _ = c[x] = c[x] || [], C = y == null ? 0 : typeof y == "string" ? 1 : y.length, T = 0 < P, T = i(i({}, k), { name: T ? "".concat(x, "(virtual-from:").concat(k.name, ")") : k.name, lowLevelIndex: k, isVirtual: T, keyTail: P, keyLength: C, extractKey: qr(y), unique: !T && k.unique });
            return _.push(T), T.isPrimaryKey || d.push(T), 1 < C && m(C === 2 ? y[0] : y.slice(0, C - 1), P + 1, k), _.sort(function(E, M) {
              return E.keyTail - M.keyTail;
            }), T;
          }
          o = m(l.primaryKey.keyPath, 0, l.primaryKey), c[":id"] = [o];
          for (var g = 0, w = l.indexes; g < w.length; g++) {
            var S = w[g];
            m(S.keyPath, 0, S);
          }
          function D(y) {
            var P, k = y.query.index;
            return k.isVirtual ? i(i({}, y), { query: { index: k.lowLevelIndex, range: (P = y.query.range, k = k.keyTail, { type: P.type === 1 ? 2 : P.type, lower: cr(P.lower, P.lowerOpen ? r.MAX_KEY : r.MIN_KEY, k), lowerOpen: !0, upper: cr(P.upper, P.upperOpen ? r.MIN_KEY : r.MAX_KEY, k), upperOpen: !0 }) } }) : y;
          }
          return i(i({}, a), { schema: i(i({}, l), { primaryKey: o, indexes: d, getIndexByKeyPath: function(y) {
            return (y = c[vt(y)]) && y[0];
          } }), count: function(y) {
            return a.count(D(y));
          }, query: function(y) {
            return a.query(D(y));
          }, openCursor: function(y) {
            var P = y.query.index, k = P.keyTail, x = P.isVirtual, _ = P.keyLength;
            return x ? a.openCursor(D(y)).then(function(T) {
              return T && C(T);
            }) : a.openCursor(y);
            function C(T) {
              return Object.create(T, { continue: { value: function(E) {
                E != null ? T.continue(cr(E, y.reverse ? r.MAX_KEY : r.MIN_KEY, k)) : y.unique ? T.continue(T.key.slice(0, _).concat(y.reverse ? r.MIN_KEY : r.MAX_KEY, k)) : T.continue();
              } }, continuePrimaryKey: { value: function(E, M) {
                T.continuePrimaryKey(cr(E, r.MAX_KEY, k), M);
              } }, primaryKey: { get: function() {
                return T.primaryKey;
              } }, key: { get: function() {
                var E = T.key;
                return _ === 1 ? E[0] : E.slice(0, _);
              } }, value: { get: function() {
                return T.value;
              } } });
            }
          } });
        } });
      } };
      function io(r, o, a, l) {
        return a = a || {}, l = l || "", f(r).forEach(function(c) {
          var d, m, g;
          O(o, c) ? (d = r[c], m = o[c], typeof d == "object" && typeof m == "object" && d && m ? (g = pe(d)) !== pe(m) ? a[l + c] = o[c] : g === "Object" ? io(d, m, a, l + c + ".") : d !== m && (a[l + c] = o[c]) : d !== m && (a[l + c] = o[c])) : a[l + c] = void 0;
        }), f(o).forEach(function(c) {
          O(r, c) || (a[l + c] = o[c]);
        }), a;
      }
      function ao(r, o) {
        return o.type === "delete" ? o.keys : o.keys || o.values.map(r.extractKey);
      }
      var ja = { stack: "dbcore", name: "HooksMiddleware", level: 2, create: function(r) {
        return i(i({}, r), { table: function(o) {
          var a = r.table(o), l = a.schema.primaryKey;
          return i(i({}, a), { mutate: function(c) {
            var d = Q.trans, m = d.table(o).hook, g = m.deleting, w = m.creating, S = m.updating;
            switch (c.type) {
              case "add":
                if (w.fire === ye) break;
                return d._promise("readwrite", function() {
                  return D(c);
                }, !0);
              case "put":
                if (w.fire === ye && S.fire === ye) break;
                return d._promise("readwrite", function() {
                  return D(c);
                }, !0);
              case "delete":
                if (g.fire === ye) break;
                return d._promise("readwrite", function() {
                  return D(c);
                }, !0);
              case "deleteRange":
                if (g.fire === ye) break;
                return d._promise("readwrite", function() {
                  return function y(P, k, x) {
                    return a.query({ trans: P, values: !1, query: { index: l, range: k }, limit: x }).then(function(_) {
                      var C = _.result;
                      return D({ type: "delete", keys: C, trans: P }).then(function(T) {
                        return 0 < T.numFailures ? Promise.reject(T.failures[0]) : C.length < x ? { failures: [], numFailures: 0, lastResult: void 0 } : y(P, i(i({}, k), { lower: C[C.length - 1], lowerOpen: !0 }), x);
                      });
                    });
                  }(c.trans, c.range, 1e4);
                }, !0);
            }
            return a.mutate(c);
            function D(y) {
              var P, k, x, _ = Q.trans, C = y.keys || ao(l, y);
              if (!C) throw new Error("Keys missing");
              return (y = y.type === "add" || y.type === "put" ? i(i({}, y), { keys: C }) : i({}, y)).type !== "delete" && (y.values = s([], y.values)), y.keys && (y.keys = s([], y.keys)), P = a, x = C, ((k = y).type === "add" ? Promise.resolve([]) : P.getMany({ trans: k.trans, keys: x, cache: "immutable" })).then(function(T) {
                var E = C.map(function(M, B) {
                  var L, R, K, N = T[B], z = { onerror: null, onsuccess: null };
                  return y.type === "delete" ? g.fire.call(z, M, N, _) : y.type === "add" || N === void 0 ? (L = w.fire.call(z, M, y.values[B], _), M == null && L != null && (y.keys[B] = M = L, l.outbound || de(y.values[B], l.keyPath, M))) : (L = io(N, y.values[B]), (R = S.fire.call(z, L, M, N, _)) && (K = y.values[B], Object.keys(R).forEach(function(F) {
                    O(K, F) ? K[F] = R[F] : de(K, F, R[F]);
                  }))), z;
                });
                return a.mutate(y).then(function(M) {
                  for (var B = M.failures, L = M.results, R = M.numFailures, M = M.lastResult, K = 0; K < C.length; ++K) {
                    var N = (L || C)[K], z = E[K];
                    N == null ? z.onerror && z.onerror(B[K]) : z.onsuccess && z.onsuccess(y.type === "put" && T[K] ? y.values[K] : N);
                  }
                  return { failures: B, results: L, numFailures: R, lastResult: M };
                }).catch(function(M) {
                  return E.forEach(function(B) {
                    return B.onerror && B.onerror(M);
                  }), Promise.reject(M);
                });
              });
            }
          } });
        } });
      } };
      function ii(r, o, a) {
        try {
          if (!o || o.keys.length < r.length) return null;
          for (var l = [], c = 0, d = 0; c < o.keys.length && d < r.length; ++c) le(o.keys[c], r[d]) === 0 && (l.push(a ? Z(o.values[c]) : o.values[c]), ++d);
          return l.length === r.length ? l : null;
        } catch {
          return null;
        }
      }
      var Va = { stack: "dbcore", level: -1, create: function(r) {
        return { table: function(o) {
          var a = r.table(o);
          return i(i({}, a), { getMany: function(l) {
            if (!l.cache) return a.getMany(l);
            var c = ii(l.keys, l.trans._cache, l.cache === "clone");
            return c ? H.resolve(c) : a.getMany(l).then(function(d) {
              return l.trans._cache = { keys: l.keys, values: l.cache === "clone" ? Z(d) : d }, d;
            });
          }, mutate: function(l) {
            return l.type !== "add" && (l.trans._cache = null), a.mutate(l);
          } });
        } };
      } };
      function ai(r, o) {
        return r.trans.mode === "readonly" && !!r.subscr && !r.trans.explicit && r.trans.db._options.cache !== "disabled" && !o.schema.primaryKey.outbound;
      }
      function si(r, o) {
        switch (r) {
          case "query":
            return o.values && !o.unique;
          case "get":
          case "getMany":
          case "count":
          case "openCursor":
            return !1;
        }
      }
      var La = { stack: "dbcore", level: 0, name: "Observability", create: function(r) {
        var o = r.schema.name, a = new Re(r.MIN_KEY, r.MAX_KEY);
        return i(i({}, r), { transaction: function(l, c, d) {
          if (Q.subscr && c !== "readonly") throw new X.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(Q.querier));
          return r.transaction(l, c, d);
        }, table: function(l) {
          var c = r.table(l), d = c.schema, m = d.primaryKey, y = d.indexes, g = m.extractKey, w = m.outbound, S = m.autoIncrement && y.filter(function(k) {
            return k.compound && k.keyPath.includes(m.keyPath);
          }), D = i(i({}, c), { mutate: function(k) {
            function x(F) {
              return F = "idb://".concat(o, "/").concat(l, "/").concat(F), M[F] || (M[F] = new Re());
            }
            var _, C, T, E = k.trans, M = k.mutatedParts || (k.mutatedParts = {}), B = x(""), L = x(":dels"), R = k.type, z = k.type === "deleteRange" ? [k.range] : k.type === "delete" ? [k.keys] : k.values.length < 50 ? [ao(m, k).filter(function(F) {
              return F;
            }), k.values] : [], K = z[0], N = z[1], z = k.trans._cache;
            return h(K) ? (B.addKeys(K), (z = R === "delete" || K.length === N.length ? ii(K, z) : null) || L.addKeys(K), (z || N) && (_ = x, C = z, T = N, d.indexes.forEach(function(F) {
              var W = _(F.name || "");
              function re(ae) {
                return ae != null ? F.extractKey(ae) : null;
              }
              function ie(ae) {
                return F.multiEntry && h(ae) ? ae.forEach(function(Xe) {
                  return W.addKey(Xe);
                }) : W.addKey(ae);
              }
              (C || T).forEach(function(ae, Ye) {
                var te = C && re(C[Ye]), Ye = T && re(T[Ye]);
                le(te, Ye) !== 0 && (te != null && ie(te), Ye != null && ie(Ye));
              });
            }))) : K ? (N = { from: (N = K.lower) !== null && N !== void 0 ? N : r.MIN_KEY, to: (N = K.upper) !== null && N !== void 0 ? N : r.MAX_KEY }, L.add(N), B.add(N)) : (B.add(a), L.add(a), d.indexes.forEach(function(F) {
              return x(F.name).add(a);
            })), c.mutate(k).then(function(F) {
              return !K || k.type !== "add" && k.type !== "put" || (B.addKeys(F.results), S && S.forEach(function(W) {
                for (var re = k.values.map(function(te) {
                  return W.extractKey(te);
                }), ie = W.keyPath.findIndex(function(te) {
                  return te === m.keyPath;
                }), ae = 0, Xe = F.results.length; ae < Xe; ++ae) re[ae][ie] = F.results[ae];
                x(W.name).addKeys(re);
              })), E.mutatedParts = ur(E.mutatedParts || {}, M), F;
            });
          } }), y = function(x) {
            var _ = x.query, x = _.index, _ = _.range;
            return [x, new Re((x = _.lower) !== null && x !== void 0 ? x : r.MIN_KEY, (_ = _.upper) !== null && _ !== void 0 ? _ : r.MAX_KEY)];
          }, P = { get: function(k) {
            return [m, new Re(k.key)];
          }, getMany: function(k) {
            return [m, new Re().addKeys(k.keys)];
          }, count: y, query: y, openCursor: y };
          return f(P).forEach(function(k) {
            D[k] = function(x) {
              var _ = Q.subscr, C = !!_, T = ai(Q, c) && si(k, x) ? x.obsSet = {} : _;
              if (C) {
                var E = function(N) {
                  return N = "idb://".concat(o, "/").concat(l, "/").concat(N), T[N] || (T[N] = new Re());
                }, M = E(""), B = E(":dels"), _ = P[k](x), C = _[0], _ = _[1];
                if ((k === "query" && C.isPrimaryKey && !x.values ? B : E(C.name || "")).add(_), !C.isPrimaryKey) {
                  if (k !== "count") {
                    var L = k === "query" && w && x.values && c.query(i(i({}, x), { values: !1 }));
                    return c[k].apply(this, arguments).then(function(N) {
                      if (k === "query") {
                        if (w && x.values) return L.then(function(re) {
                          return re = re.result, M.addKeys(re), N;
                        });
                        var z = x.values ? N.result.map(g) : N.result;
                        (x.values ? M : B).addKeys(z);
                      } else if (k === "openCursor") {
                        var F = N, W = x.values;
                        return F && Object.create(F, { key: { get: function() {
                          return B.addKey(F.primaryKey), F.key;
                        } }, primaryKey: { get: function() {
                          var re = F.primaryKey;
                          return B.addKey(re), re;
                        } }, value: { get: function() {
                          return W && M.addKey(F.primaryKey), F.value;
                        } } });
                      }
                      return N;
                    });
                  }
                  B.add(a);
                }
              }
              return c[k].apply(this, arguments);
            };
          }), D;
        } });
      } };
      function ui(r, o, a) {
        if (a.numFailures === 0) return o;
        if (o.type === "deleteRange") return null;
        var l = o.keys ? o.keys.length : "values" in o && o.values ? o.values.length : 1;
        return a.numFailures === l ? null : (o = i({}, o), h(o.keys) && (o.keys = o.keys.filter(function(c, d) {
          return !(d in a.failures);
        })), "values" in o && h(o.values) && (o.values = o.values.filter(function(c, d) {
          return !(d in a.failures);
        })), o);
      }
      function so(r, o) {
        return a = r, ((l = o).lower === void 0 || (l.lowerOpen ? 0 < le(a, l.lower) : 0 <= le(a, l.lower))) && (r = r, (o = o).upper === void 0 || (o.upperOpen ? le(r, o.upper) < 0 : le(r, o.upper) <= 0));
        var a, l;
      }
      function li(r, o, P, l, c, d) {
        if (!P || P.length === 0) return r;
        var m = o.query.index, g = m.multiEntry, w = o.query.range, S = l.schema.primaryKey.extractKey, D = m.extractKey, y = (m.lowLevelIndex || m).extractKey, P = P.reduce(function(k, x) {
          var _ = k, C = [];
          if (x.type === "add" || x.type === "put") for (var T = new Re(), E = x.values.length - 1; 0 <= E; --E) {
            var M, B = x.values[E], L = S(B);
            T.hasKey(L) || (M = D(B), (g && h(M) ? M.some(function(F) {
              return so(F, w);
            }) : so(M, w)) && (T.addKey(L), C.push(B)));
          }
          switch (x.type) {
            case "add":
              var R = new Re().addKeys(o.values ? k.map(function(W) {
                return S(W);
              }) : k), _ = k.concat(o.values ? C.filter(function(W) {
                return W = S(W), !R.hasKey(W) && (R.addKey(W), !0);
              }) : C.map(function(W) {
                return S(W);
              }).filter(function(W) {
                return !R.hasKey(W) && (R.addKey(W), !0);
              }));
              break;
            case "put":
              var K = new Re().addKeys(x.values.map(function(W) {
                return S(W);
              }));
              _ = k.filter(function(W) {
                return !K.hasKey(o.values ? S(W) : W);
              }).concat(o.values ? C : C.map(function(W) {
                return S(W);
              }));
              break;
            case "delete":
              var N = new Re().addKeys(x.keys);
              _ = k.filter(function(W) {
                return !N.hasKey(o.values ? S(W) : W);
              });
              break;
            case "deleteRange":
              var z = x.range;
              _ = k.filter(function(W) {
                return !so(S(W), z);
              });
          }
          return _;
        }, r);
        return P === r ? r : (P.sort(function(k, x) {
          return le(y(k), y(x)) || le(S(k), S(x));
        }), o.limit && o.limit < 1 / 0 && (P.length > o.limit ? P.length = o.limit : r.length === o.limit && P.length < o.limit && (c.dirty = !0)), d ? Object.freeze(P) : P);
      }
      function ci(r, o) {
        return le(r.lower, o.lower) === 0 && le(r.upper, o.upper) === 0 && !!r.lowerOpen == !!o.lowerOpen && !!r.upperOpen == !!o.upperOpen;
      }
      function Ka(r, o) {
        return function(a, l, c, d) {
          if (a === void 0) return l !== void 0 ? -1 : 0;
          if (l === void 0) return 1;
          if ((l = le(a, l)) === 0) {
            if (c && d) return 0;
            if (c) return 1;
            if (d) return -1;
          }
          return l;
        }(r.lower, o.lower, r.lowerOpen, o.lowerOpen) <= 0 && 0 <= function(a, l, c, d) {
          if (a === void 0) return l !== void 0 ? 1 : 0;
          if (l === void 0) return -1;
          if ((l = le(a, l)) === 0) {
            if (c && d) return 0;
            if (c) return -1;
            if (d) return 1;
          }
          return l;
        }(r.upper, o.upper, r.upperOpen, o.upperOpen);
      }
      function Na(r, o, a, l) {
        r.subscribers.add(a), l.addEventListener("abort", function() {
          var c, d;
          r.subscribers.delete(a), r.subscribers.size === 0 && (c = r, d = o, setTimeout(function() {
            c.subscribers.size === 0 && Oe(d, c);
          }, 3e3));
        });
      }
      var Fa = { stack: "dbcore", level: 0, name: "Cache", create: function(r) {
        var o = r.schema.name;
        return i(i({}, r), { transaction: function(a, l, c) {
          var d, m, g = r.transaction(a, l, c);
          return l === "readwrite" && (m = (d = new AbortController()).signal, c = function(w) {
            return function() {
              if (d.abort(), l === "readwrite") {
                for (var S = /* @__PURE__ */ new Set(), D = 0, y = a; D < y.length; D++) {
                  var P = y[D], k = zn["idb://".concat(o, "/").concat(P)];
                  if (k) {
                    var x = r.table(P), _ = k.optimisticOps.filter(function(W) {
                      return W.trans === g;
                    });
                    if (g._explicit && w && g.mutatedParts) for (var C = 0, T = Object.values(k.queries.query); C < T.length; C++) for (var E = 0, M = (R = T[C]).slice(); E < M.length; E++) eo((K = M[E]).obsSet, g.mutatedParts) && (Oe(R, K), K.subscribers.forEach(function(W) {
                      return S.add(W);
                    }));
                    else if (0 < _.length) {
                      k.optimisticOps = k.optimisticOps.filter(function(W) {
                        return W.trans !== g;
                      });
                      for (var B = 0, L = Object.values(k.queries.query); B < L.length; B++) for (var R, K, N, z = 0, F = (R = L[B]).slice(); z < F.length; z++) (K = F[z]).res != null && g.mutatedParts && (w && !K.dirty ? (N = Object.isFrozen(K.res), N = li(K.res, K.req, _, x, K, N), K.dirty ? (Oe(R, K), K.subscribers.forEach(function(W) {
                        return S.add(W);
                      })) : N !== K.res && (K.res = N, K.promise = H.resolve({ result: N }))) : (K.dirty && Oe(R, K), K.subscribers.forEach(function(W) {
                        return S.add(W);
                      })));
                    }
                  }
                }
                S.forEach(function(W) {
                  return W();
                });
              }
            };
          }, g.addEventListener("abort", c(!1), { signal: m }), g.addEventListener("error", c(!1), { signal: m }), g.addEventListener("complete", c(!0), { signal: m })), g;
        }, table: function(a) {
          var l = r.table(a), c = l.schema.primaryKey;
          return i(i({}, l), { mutate: function(d) {
            var m = Q.trans;
            if (c.outbound || m.db._options.cache === "disabled" || m.explicit || m.idbtrans.mode !== "readwrite") return l.mutate(d);
            var g = zn["idb://".concat(o, "/").concat(a)];
            return g ? (m = l.mutate(d), d.type !== "add" && d.type !== "put" || !(50 <= d.values.length || ao(c, d).some(function(w) {
              return w == null;
            })) ? (g.optimisticOps.push(d), d.mutatedParts && lr(d.mutatedParts), m.then(function(w) {
              0 < w.numFailures && (Oe(g.optimisticOps, d), (w = ui(0, d, w)) && g.optimisticOps.push(w), d.mutatedParts && lr(d.mutatedParts));
            }), m.catch(function() {
              Oe(g.optimisticOps, d), d.mutatedParts && lr(d.mutatedParts);
            })) : m.then(function(w) {
              var S = ui(0, i(i({}, d), { values: d.values.map(function(D, y) {
                var P;
                return w.failures[y] ? D : (D = (P = c.keyPath) !== null && P !== void 0 && P.includes(".") ? Z(D) : i({}, D), de(D, c.keyPath, w.results[y]), D);
              }) }), w);
              g.optimisticOps.push(S), queueMicrotask(function() {
                return d.mutatedParts && lr(d.mutatedParts);
              });
            }), m) : l.mutate(d);
          }, query: function(d) {
            if (!ai(Q, l) || !si("query", d)) return l.query(d);
            var m = ((S = Q.trans) === null || S === void 0 ? void 0 : S.db._options.cache) === "immutable", y = Q, g = y.requery, w = y.signal, S = function(x, _, C, T) {
              var E = zn["idb://".concat(x, "/").concat(_)];
              if (!E) return [];
              if (!(_ = E.queries[C])) return [null, !1, E, null];
              var M = _[(T.query ? T.query.index.name : null) || ""];
              if (!M) return [null, !1, E, null];
              switch (C) {
                case "query":
                  var B = M.find(function(L) {
                    return L.req.limit === T.limit && L.req.values === T.values && ci(L.req.query.range, T.query.range);
                  });
                  return B ? [B, !0, E, M] : [M.find(function(L) {
                    return ("limit" in L.req ? L.req.limit : 1 / 0) >= T.limit && (!T.values || L.req.values) && Ka(L.req.query.range, T.query.range);
                  }), !1, E, M];
                case "count":
                  return B = M.find(function(L) {
                    return ci(L.req.query.range, T.query.range);
                  }), [B, !!B, E, M];
              }
            }(o, a, "query", d), D = S[0], y = S[1], P = S[2], k = S[3];
            return D && y ? D.obsSet = d.obsSet : (y = l.query(d).then(function(x) {
              var _ = x.result;
              if (D && (D.res = _), m) {
                for (var C = 0, T = _.length; C < T; ++C) Object.freeze(_[C]);
                Object.freeze(_);
              } else x.result = Z(_);
              return x;
            }).catch(function(x) {
              return k && D && Oe(k, D), Promise.reject(x);
            }), D = { obsSet: d.obsSet, promise: y, subscribers: /* @__PURE__ */ new Set(), type: "query", req: d, dirty: !1 }, k ? k.push(D) : (k = [D], (P = P || (zn["idb://".concat(o, "/").concat(a)] = { queries: { query: {}, count: {} }, objs: /* @__PURE__ */ new Map(), optimisticOps: [], unsignaledParts: {} })).queries.query[d.query.index.name || ""] = k)), Na(D, k, g, w), D.promise.then(function(x) {
              return { result: li(x.result, d, P == null ? void 0 : P.optimisticOps, l, D, m) };
            });
          } });
        } });
      } };
      function dr(r, o) {
        return new Proxy(r, { get: function(a, l, c) {
          return l === "db" ? o : Reflect.get(a, l, c);
        } });
      }
      var yn = (Me.prototype.version = function(r) {
        if (isNaN(r) || r < 0.1) throw new X.Type("Given version is not a positive number");
        if (r = Math.round(10 * r) / 10, this.idbdb || this._state.isBeingOpened) throw new X.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, r);
        var o = this._versions, a = o.filter(function(l) {
          return l._cfg.version === r;
        })[0];
        return a || (a = new this.Version(r), o.push(a), o.sort($a), a.stores({}), this._state.autoSchema = !1, a);
      }, Me.prototype._whenReady = function(r) {
        var o = this;
        return this.idbdb && (this._state.openComplete || Q.letThrough || this._vip) ? r() : new H(function(a, l) {
          if (o._state.openComplete) return l(new X.DatabaseClosed(o._state.dbOpenError));
          if (!o._state.isBeingOpened) {
            if (!o._state.autoOpen) return void l(new X.DatabaseClosed());
            o.open().catch(ye);
          }
          o._state.dbReadyPromise.then(a, l);
        }).then(r);
      }, Me.prototype.use = function(r) {
        var o = r.stack, a = r.create, l = r.level, c = r.name;
        return c && this.unuse({ stack: o, name: c }), r = this._middlewares[o] || (this._middlewares[o] = []), r.push({ stack: o, create: a, level: l ?? 10, name: c }), r.sort(function(d, m) {
          return d.level - m.level;
        }), this;
      }, Me.prototype.unuse = function(r) {
        var o = r.stack, a = r.name, l = r.create;
        return o && this._middlewares[o] && (this._middlewares[o] = this._middlewares[o].filter(function(c) {
          return l ? c.create !== l : !!a && c.name !== a;
        })), this;
      }, Me.prototype.open = function() {
        var r = this;
        return Fn(Sn, function() {
          return Aa(r);
        });
      }, Me.prototype._close = function() {
        var r = this._state, o = nt.indexOf(this);
        if (0 <= o && nt.splice(o, 1), this.idbdb) {
          try {
            this.idbdb.close();
          } catch {
          }
          this.idbdb = null;
        }
        r.isBeingOpened || (r.dbReadyPromise = new H(function(a) {
          r.dbReadyResolve = a;
        }), r.openCanceller = new H(function(a, l) {
          r.cancelOpen = l;
        }));
      }, Me.prototype.close = function(a) {
        var o = (a === void 0 ? { disableAutoOpen: !0 } : a).disableAutoOpen, a = this._state;
        o ? (a.isBeingOpened && a.cancelOpen(new X.DatabaseClosed()), this._close(), a.autoOpen = !1, a.dbOpenError = new X.DatabaseClosed()) : (this._close(), a.autoOpen = this._options.autoOpen || a.isBeingOpened, a.openComplete = !1, a.dbOpenError = null);
      }, Me.prototype.delete = function(r) {
        var o = this;
        r === void 0 && (r = { disableAutoOpen: !0 });
        var a = 0 < arguments.length && typeof arguments[0] != "object", l = this._state;
        return new H(function(c, d) {
          function m() {
            o.close(r);
            var g = o._deps.indexedDB.deleteDatabase(o.name);
            g.onsuccess = _e(function() {
              var w, S, D;
              w = o._deps, S = o.name, D = w.indexedDB, w = w.IDBKeyRange, Qr(D) || S === Gt || Gr(D, w).delete(S).catch(ye), c();
            }), g.onerror = ln(d), g.onblocked = o._fireOnBlocked;
          }
          if (a) throw new X.InvalidArgument("Invalid closeOptions argument to db.delete()");
          l.isBeingOpened ? l.dbReadyPromise.then(m) : m();
        });
      }, Me.prototype.backendDB = function() {
        return this.idbdb;
      }, Me.prototype.isOpen = function() {
        return this.idbdb !== null;
      }, Me.prototype.hasBeenClosed = function() {
        var r = this._state.dbOpenError;
        return r && r.name === "DatabaseClosed";
      }, Me.prototype.hasFailed = function() {
        return this._state.dbOpenError !== null;
      }, Me.prototype.dynamicallyOpened = function() {
        return this._state.autoSchema;
      }, Object.defineProperty(Me.prototype, "tables", { get: function() {
        var r = this;
        return f(this._allTables).map(function(o) {
          return r._allTables[o];
        });
      }, enumerable: !1, configurable: !0 }), Me.prototype.transaction = function() {
        var r = (function(o, a, l) {
          var c = arguments.length;
          if (c < 2) throw new X.InvalidArgument("Too few arguments");
          for (var d = new Array(c - 1); --c; ) d[c - 1] = arguments[c];
          return l = d.pop(), [o, $e(d), l];
        }).apply(this, arguments);
        return this._transaction.apply(this, r);
      }, Me.prototype._transaction = function(r, o, a) {
        var l = this, c = Q.trans;
        c && c.db === this && r.indexOf("!") === -1 || (c = null);
        var d, m, g = r.indexOf("?") !== -1;
        r = r.replace("!", "").replace("?", "");
        try {
          if (m = o.map(function(S) {
            if (S = S instanceof l.Table ? S.name : S, typeof S != "string") throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
            return S;
          }), r == "r" || r === Lr) d = Lr;
          else {
            if (r != "rw" && r != Kr) throw new X.InvalidArgument("Invalid transaction mode: " + r);
            d = Kr;
          }
          if (c) {
            if (c.mode === Lr && d === Kr) {
              if (!g) throw new X.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
              c = null;
            }
            c && m.forEach(function(S) {
              if (c && c.storeNames.indexOf(S) === -1) {
                if (!g) throw new X.SubTransaction("Table " + S + " not included in parent transaction.");
                c = null;
              }
            }), g && c && !c.active && (c = null);
          }
        } catch (S) {
          return c ? c._promise(null, function(D, y) {
            y(S);
          }) : Ee(S);
        }
        var w = (function S(D, y, P, k, x) {
          return H.resolve().then(function() {
            var _ = Q.transless || Q, C = D._createTransaction(y, P, D._dbSchema, k);
            if (C.explicit = !0, _ = { trans: C, transless: _ }, k) C.idbtrans = k.idbtrans;
            else try {
              C.create(), C.idbtrans._explicit = !0, D._state.PR1398_maxLoop = 3;
            } catch (M) {
              return M.name === ut.InvalidState && D.isOpen() && 0 < --D._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), D.close({ disableAutoOpen: !1 }), D.open().then(function() {
                return S(D, y, P, null, x);
              })) : Ee(M);
            }
            var T, E = We(x);
            return E && et(), _ = H.follow(function() {
              var M;
              (T = x.call(C, C)) && (E ? (M = xn.bind(null, null), T.then(M, M)) : typeof T.next == "function" && typeof T.throw == "function" && (T = oo(T)));
            }, _), (T && typeof T.then == "function" ? H.resolve(T).then(function(M) {
              return C.active ? M : Ee(new X.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
            }) : _.then(function() {
              return T;
            })).then(function(M) {
              return k && C._resolve(), C._completion.then(function() {
                return M;
              });
            }).catch(function(M) {
              return C._reject(M), Ee(M);
            });
          });
        }).bind(null, this, d, m, c, a);
        return c ? c._promise(d, w, "lock") : Q.trans ? Fn(Q.transless, function() {
          return l._whenReady(w);
        }) : this._whenReady(w);
      }, Me.prototype.table = function(r) {
        if (!O(this._allTables, r)) throw new X.InvalidTable("Table ".concat(r, " does not exist"));
        return this._allTables[r];
      }, Me);
      function Me(r, o) {
        var a = this;
        this._middlewares = {}, this.verno = 0;
        var l = Me.dependencies;
        this._options = o = i({ addons: Me.addons, autoOpen: !0, indexedDB: l.indexedDB, IDBKeyRange: l.IDBKeyRange, cache: "cloned" }, o), this._deps = { indexedDB: o.indexedDB, IDBKeyRange: o.IDBKeyRange }, l = o.addons, this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this;
        var c, d, m, g, w, S = { dbOpenError: null, isBeingOpened: !1, onReadyBeingFired: null, openComplete: !1, dbReadyResolve: ye, dbReadyPromise: null, cancelOpen: ye, openCanceller: null, autoSchema: !0, PR1398_maxLoop: 3, autoOpen: o.autoOpen };
        S.dbReadyPromise = new H(function(y) {
          S.dbReadyResolve = y;
        }), S.openCanceller = new H(function(y, P) {
          S.cancelOpen = P;
        }), this._state = S, this.name = r, this.on = pt(this, "populate", "blocked", "versionchange", "close", { ready: [lt, ye] }), this.on.ready.subscribe = V(this.on.ready.subscribe, function(y) {
          return function(P, k) {
            Me.vip(function() {
              var x, _ = a._state;
              _.openComplete ? (_.dbOpenError || H.resolve().then(P), k && y(P)) : _.onReadyBeingFired ? (_.onReadyBeingFired.push(P), k && y(P)) : (y(P), x = a, k || y(function C() {
                x.on.ready.unsubscribe(P), x.on.ready.unsubscribe(C);
              }));
            });
          };
        }), this.Collection = (c = this, ht(Ca.prototype, function(T, C) {
          this.db = c;
          var k = Fo, x = null;
          if (C) try {
            k = C();
          } catch (E) {
            x = E;
          }
          var _ = T._ctx, C = _.table, T = C.hook.reading.fire;
          this._ctx = { table: C, index: _.index, isPrimKey: !_.index || C.schema.primKey.keyPath && _.index === C.schema.primKey.name, range: k, keysOnly: !1, dir: "next", unique: "", algorithm: null, filter: null, replayFilter: null, justLimit: !0, isMatch: null, offset: 0, limit: 1 / 0, error: x, or: _.or, valueMapper: T !== Bn ? T : null };
        })), this.Table = (d = this, ht(Ho.prototype, function(y, P, k) {
          this.db = d, this._tx = k, this.name = y, this.schema = P, this.hook = d._allTables[y] ? d._allTables[y].hook : pt(null, { creating: [_r, ye], reading: [Dr, Bn], updating: [Tr, ye], deleting: [Pr, ye] });
        })), this.Transaction = (m = this, ht(_a.prototype, function(y, P, k, x, _) {
          var C = this;
          this.db = m, this.mode = y, this.storeNames = P, this.schema = k, this.chromeTransactionDurability = x, this.idbtrans = null, this.on = pt(this, "complete", "error", "abort"), this.parent = _ || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new H(function(T, E) {
            C._resolve = T, C._reject = E;
          }), this._completion.then(function() {
            C.active = !1, C.on.complete.fire();
          }, function(T) {
            var E = C.active;
            return C.active = !1, C.on.error.fire(T), C.parent ? C.parent._reject(T) : E && C.idbtrans && C.idbtrans.abort(), Ee(T);
          });
        })), this.Version = (g = this, ht(Ia.prototype, function(y) {
          this.db = g, this._cfg = { version: y, storesSource: null, dbschema: {}, tables: {}, contentUpgrade: null };
        })), this.WhereClause = (w = this, ht(Go.prototype, function(y, P, k) {
          if (this.db = w, this._ctx = { table: y, index: P === ":id" ? null : P, or: k }, this._cmp = this._ascending = le, this._descending = function(x, _) {
            return le(_, x);
          }, this._max = function(x, _) {
            return 0 < le(x, _) ? x : _;
          }, this._min = function(x, _) {
            return le(x, _) < 0 ? x : _;
          }, this._IDBKeyRange = w._deps.IDBKeyRange, !this._IDBKeyRange) throw new X.MissingAPI();
        })), this.on("versionchange", function(y) {
          0 < y.newVersion ? console.warn("Another connection wants to upgrade database '".concat(a.name, "'. Closing db now to resume the upgrade.")) : console.warn("Another connection wants to delete database '".concat(a.name, "'. Closing db now to resume the delete request.")), a.close({ disableAutoOpen: !1 });
        }), this.on("blocked", function(y) {
          !y.newVersion || y.newVersion < y.oldVersion ? console.warn("Dexie.delete('".concat(a.name, "') was blocked")) : console.warn("Upgrade '".concat(a.name, "' blocked by other connection holding version ").concat(y.oldVersion / 10));
        }), this._maxKey = yt(o.IDBKeyRange), this._createTransaction = function(y, P, k, x) {
          return new a.Transaction(y, P, k, a._options.chromeTransactionDurability, x);
        }, this._fireOnBlocked = function(y) {
          a.on("blocked").fire(y), nt.filter(function(P) {
            return P.name === a.name && P !== a && !P._state.vcFired;
          }).map(function(P) {
            return P.on("versionchange").fire(y);
          });
        }, this.use(Va), this.use(Fa), this.use(La), this.use(Ba), this.use(ja);
        var D = new Proxy(this, { get: function(y, P, k) {
          if (P === "_vip") return !0;
          if (P === "table") return function(_) {
            return dr(a.table(_), D);
          };
          var x = Reflect.get(y, P, k);
          return x instanceof Ho ? dr(x, D) : P === "tables" ? x.map(function(_) {
            return dr(_, D);
          }) : P === "_createTransaction" ? function() {
            return dr(x.apply(this, arguments), D);
          } : x;
        } });
        this.vip = D, l.forEach(function(y) {
          return y(a);
        });
      }
      var fr, en = typeof Symbol < "u" && "observable" in Symbol ? Symbol.observable : "@@observable", Ra = (uo.prototype.subscribe = function(r, o, a) {
        return this._subscribe(r && typeof r != "function" ? r : { next: r, error: o, complete: a });
      }, uo.prototype[en] = function() {
        return this;
      }, uo);
      function uo(r) {
        this._subscribe = r;
      }
      try {
        fr = { indexedDB: u.indexedDB || u.mozIndexedDB || u.webkitIndexedDB || u.msIndexedDB, IDBKeyRange: u.IDBKeyRange || u.webkitIDBKeyRange };
      } catch {
        fr = { indexedDB: null, IDBKeyRange: null };
      }
      function di(r) {
        var o, a = !1, l = new Ra(function(c) {
          var d = We(r), m, g = !1, w = {}, S = {}, D = { get closed() {
            return g;
          }, unsubscribe: function() {
            g || (g = !0, m && m.abort(), y && Pn.storagemutated.unsubscribe(k));
          } };
          c.start && c.start(D);
          var y = !1, P = function() {
            return Vr(x);
          }, k = function(_) {
            ur(w, _), eo(S, w) && P();
          }, x = function() {
            var _, C, T;
            !g && fr.indexedDB && (w = {}, _ = {}, m && m.abort(), m = new AbortController(), T = function(E) {
              var M = Xn();
              try {
                d && et();
                var B = Cn(r, E);
                return B = d ? B.finally(xn) : B;
              } finally {
                M && Jn();
              }
            }(C = { subscr: _, signal: m.signal, requery: P, querier: r, trans: null }), Promise.resolve(T).then(function(E) {
              a = !0, o = E, g || C.signal.aborted || (w = {}, function(M) {
                for (var B in M) if (O(M, B)) return;
                return 1;
              }(S = _) || y || (Pn(gt, k), y = !0), Vr(function() {
                return !g && c.next && c.next(E);
              }));
            }, function(E) {
              a = !1, ["DatabaseClosedError", "AbortError"].includes(E == null ? void 0 : E.name) || g || Vr(function() {
                g || c.error && c.error(E);
              });
            }));
          };
          return setTimeout(P, 0), D;
        });
        return l.hasValue = function() {
          return a;
        }, l.getValue = function() {
          return o;
        }, l;
      }
      var Hn = yn;
      function lo(r) {
        var o = Tn;
        try {
          Tn = !0, Pn.storagemutated.fire(r), ro(r, !0);
        } finally {
          Tn = o;
        }
      }
      $(Hn, i(i({}, Qn), { delete: function(r) {
        return new Hn(r, { addons: [] }).delete();
      }, exists: function(r) {
        return new Hn(r, { addons: [] }).open().then(function(o) {
          return o.close(), !0;
        }).catch("NoSuchDatabaseError", function() {
          return !1;
        });
      }, getDatabaseNames: function(r) {
        try {
          return o = Hn.dependencies, a = o.indexedDB, o = o.IDBKeyRange, (Qr(a) ? Promise.resolve(a.databases()).then(function(l) {
            return l.map(function(c) {
              return c.name;
            }).filter(function(c) {
              return c !== Gt;
            });
          }) : Gr(a, o).toCollection().primaryKeys()).then(r);
        } catch {
          return Ee(new X.MissingAPI());
        }
        var o, a;
      }, defineClass: function() {
        return function(r) {
          b(this, r);
        };
      }, ignoreTransaction: function(r) {
        return Q.trans ? Fn(Q.transless, r) : r();
      }, vip: Xr, async: function(r) {
        return function() {
          try {
            var o = oo(r.apply(this, arguments));
            return o && typeof o.then == "function" ? o : H.resolve(o);
          } catch (a) {
            return Ee(a);
          }
        };
      }, spawn: function(r, o, a) {
        try {
          var l = oo(r.apply(a, o || []));
          return l && typeof l.then == "function" ? l : H.resolve(l);
        } catch (c) {
          return Ee(c);
        }
      }, currentTransaction: { get: function() {
        return Q.trans || null;
      } }, waitFor: function(r, o) {
        return o = H.resolve(typeof r == "function" ? Hn.ignoreTransaction(r) : r).timeout(o || 6e4), Q.trans ? Q.trans.waitFor(o) : o;
      }, Promise: H, debug: { get: function() {
        return Je;
      }, set: function(r) {
        Nt(r);
      } }, derive: q, extend: b, props: $, override: V, Events: pt, on: Pn, liveQuery: di, extendObservabilitySet: ur, getByKeyPath: ce, setByKeyPath: de, delByKeyPath: function(r, o) {
        typeof o == "string" ? de(r, o, void 0) : "length" in o && [].map.call(o, function(a) {
          de(r, a, void 0);
        });
      }, shallowClone: Se, deepClone: Z, getObjectDiff: io, cmp: le, asap: ge, minKey: -1 / 0, addons: [], connections: nt, errnames: ut, dependencies: fr, cache: zn, semVer: "4.0.11", version: "4.0.11".split(".").map(function(r) {
        return parseInt(r);
      }).reduce(function(r, o, a) {
        return r + o / Math.pow(10, 2 * a);
      }) })), Hn.maxKey = yt(Hn.dependencies.IDBKeyRange), typeof dispatchEvent < "u" && typeof addEventListener < "u" && (Pn(gt, function(r) {
        Tn || (r = new CustomEvent(Yr, { detail: r }), Tn = !0, dispatchEvent(r), Tn = !1);
      }), addEventListener(Yr, function(r) {
        r = r.detail, Tn || lo(r);
      }));
      var ot, Tn = !1, fi = function() {
      };
      return typeof BroadcastChannel < "u" && ((fi = function() {
        (ot = new BroadcastChannel(Yr)).onmessage = function(r) {
          return r.data && lo(r.data);
        };
      })(), typeof ot.unref == "function" && ot.unref(), Pn(gt, function(r) {
        Tn || ot.postMessage(r);
      })), typeof addEventListener < "u" && (addEventListener("pagehide", function(r) {
        if (!yn.disableBfCache && r.persisted) {
          Je && console.debug("Dexie: handling persisted pagehide"), ot != null && ot.close();
          for (var o = 0, a = nt; o < a.length; o++) a[o].close({ disableAutoOpen: !1 });
        }
      }), addEventListener("pageshow", function(r) {
        !yn.disableBfCache && r.persisted && (Je && console.debug("Dexie: handling persisted pageshow"), fi(), lo({ all: new Re(-1 / 0, [[]]) }));
      })), H.rejectionMapper = function(r, o) {
        return !r || r instanceof tn || r instanceof TypeError || r instanceof SyntaxError || !r.name || !Kt[r.name] ? r : (o = new Kt[r.name](o || r.message, r), "stack" in r && A(o, "stack", { get: function() {
          return this.inner.stack;
        } }), o);
      }, Nt(Je), i(yn, Object.freeze({ __proto__: null, Dexie: yn, liveQuery: di, Entity: Ro, cmp: le, PropModification: mt, replacePrefix: function(r, o) {
        return new mt({ replacePrefix: [r, o] });
      }, add: function(r) {
        return new mt({ add: r });
      }, remove: function(r) {
        return new mt({ remove: r });
      }, default: yn, RangeSet: Re, mergeRanges: kt, rangesOverlap: ni }), { default: yn }), yn;
    });
  }(gr)), gr.exports;
}
var nc = ec();
const Po = /* @__PURE__ */ Xl(nc), Ni = Symbol.for("Dexie"), To = globalThis[Ni] || (globalThis[Ni] = Po);
if (Po.semVer !== To.semVer)
  throw new Error(`Two different versions of Dexie loaded in the same app: ${Po.semVer} and ${To.semVer}`);
class tc {
  constructor(e) {
    hr(this, "table");
    this.table = e;
  }
  async cleanupExpiredEntries() {
    const e = Date.now(), i = (await this.table.where("expirationTime").belowOrEqual(e).toArray()).map((s) => s.key);
    await this.table.bulkDelete(i);
  }
  isCacheValid(e) {
    return Date.now() < e;
  }
  async find(e) {
    const n = await this.table.get(e);
    if (n && this.isCacheValid(n.expirationTime))
      return n.value;
    n && await this.table.delete(e);
  }
  async create(e, n, i) {
    const s = Date.now() + i;
    await this.table.put({ key: e, value: n, expirationTime: s });
  }
  async bulkDelete(e) {
    await this.table.bulkDelete(e);
  }
}
class rc extends To {
  constructor() {
    super("DEVKIT_ADMIN");
    hr(this, "dropdownHelper");
    hr(this, "dropdown");
    this.version(1).stores({
      dropdown: "key"
    }), this.dropdownHelper = new tc(this.dropdown);
  }
}
const Fi = (t) => {
  console.log(t);
  const e = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), i = String(t.getDate()).padStart(2, "0"), s = `${e}${n}${i}`;
  return parseInt(s);
}, yo = (t) => {
  const e = Math.floor(t / 1e4), n = Math.floor(t % 1e4 / 100), i = t % 100;
  return new Date(e, n - 1, i);
};
function Vc(t) {
  const e = Number(Number(t.seconds) * 1e3 + Math.floor(Number(t.nanos) / 1e6));
  return new Date(e).toLocaleString();
}
const Lc = new rc(), Kc = {
  install(t, { apiClient: e, authHandler: n, filesHandler: i, locales: s, iconFindApi: u }) {
    t.provide("apiClient", e), i && t.provide("filesHandler", i), n && t.provide("authHandler", n), console.log("admin installed", t, e, s, u);
  }
};
export {
  Cc as $,
  br as A,
  Ie as B,
  ps as C,
  As as D,
  ks as E,
  wr as F,
  Oc as G,
  fa as H,
  pa as I,
  oa as J,
  da as K,
  wc as L,
  fc as M,
  Ui as N,
  ml as O,
  Pc as P,
  se as Q,
  Bo as R,
  xc as S,
  Vc as T,
  vi as U,
  bs as V,
  Ac as W,
  Bc as X,
  Un as Y,
  po as Z,
  jc as _,
  Lt as a,
  _s as a0,
  Ic as a1,
  Tc as a2,
  On as a3,
  dc as a4,
  gs as a5,
  _c as a6,
  St as a7,
  bc as a8,
  mc as a9,
  Mc as aa,
  ys as ab,
  un as ac,
  kc as ad,
  yc as ae,
  vc as af,
  aa as ag,
  nn as ah,
  yo as ai,
  Fi as aj,
  cc as ak,
  Kc as al,
  ls as b,
  ca as c,
  Lc as d,
  ga as e,
  ba as f,
  la as g,
  Nl as h,
  bi as i,
  Ec as j,
  xs as k,
  Dc as l,
  mi as m,
  hi as n,
  on as o,
  ua as p,
  pc as q,
  fo as r,
  Gn as s,
  Sc as t,
  $c as u,
  be as v,
  hc as w,
  gc as x,
  hs as y,
  ms as z
};
