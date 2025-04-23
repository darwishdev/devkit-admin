import { f as Ge, s as je, a as Ue, e as We, c as Ze, g as Ye, h as Je, i as Qe, d as Xe, _ as Sn } from "./AppForm.vue_vue_type_script_setup_true_lang-CxQF4dwE.mjs";
import { j as Dn, k as En, l as $n, u as Bn } from "./AppForm.vue_vue_type_script_setup_true_lang-CxQF4dwE.mjs";
import { a3 as pe, s as _e, B as ue, e as et, W as Le, Z as de, r as q, j as J, a4 as tt, k as nt, l as it, f as X, O as ot, A as lt, a5 as at, E as rt, X as st, Y as ct, $ as ut, a6 as dt, i as G, a7 as se, v as pt, L as ht, R as be, a as ft, a0 as gt, V as bt, T as mt, M as vt, b as yt, a8 as Ke } from "./devkit_admin-_JTPygjc.mjs";
import { a9 as zn, aa as Rn } from "./devkit_admin-_JTPygjc.mjs";
import { shallowReactive as Ot, defineComponent as te, inject as me, ref as ce, computed as ve, watchEffect as Ae, watch as ye, withAsyncContext as Oe, openBlock as d, createBlock as L, resolveDynamicComponent as B, h as g, Suspense as Ie, withCtx as V, createTextVNode as U, createVNode as N, mergeProps as u, createElementBlock as y, createElementVNode as K, renderSlot as C, createCommentVNode as x, toDisplayString as E, resolveComponent as R, resolveDirective as Me, Fragment as Q, renderList as he, normalizeClass as H, Transition as It, normalizeProps as St, createSlots as De, withDirectives as Ee } from "vue";
import { useQuery as Se } from "@tanstack/vue-query";
import { resolveApiEndpoint as kt } from "devkit-apiclient";
import { useFormKitContext as oe } from "@formkit/vue";
import { AppBtn as ee, AppIcon as ke } from "devkit-base-components";
function wt(e, t) {
  const i = Ot(/* @__PURE__ */ new Map()), l = (...I) => JSON.stringify(I), o = (I, ...w) => (i.set(I, e(...w)), i.get(I)), r = (...I) => o(l(...I), ...I), s = (...I) => {
    i.delete(l(...I));
  }, c = () => {
    i.clear();
  }, O = (...I) => {
    const w = l(...I);
    return i.has(w) ? i.get(w) : o(w, ...I);
  };
  return O.load = r, O.delete = s, O.clear = c, O.generateKey = l, O.cache = i, O;
}
const le = (e) => ({
  not_array: new Error(`The value of "${e}" in the API response is not an array.`),
  not_defined: new Error(`The key "${e}" is missing in the API response.`)
}), $e = ({
  options: e,
  optionsMapper: t,
  apiClient: n,
  request: i = {},
  responseOptionsKey: l = "options"
}) => new Promise((o, r) => {
  if (Array.isArray(e)) return o(e);
  kt(e, n, i).then((s) => (console.log("fetching from api", s), t ? o(t(s)) : Array.isArray(s) ? o(s) : (console.log("Asdasdasd", l), l in s ? Array.isArray(s[l]) ? o(s[l]) : r(le(l).not_array) : r(le(l).not_defined)))).catch(r);
}), we = (e) => {
  pe.dropdownHelper.bulkDelete([e]);
}, Ct = () => Ge(
  (t) => $e(t),
  300
  // 300ms debounce delay
), Lt = ({ cacheKey: e, cacheTimeout: t = 1e5, bypassCache: n }, i) => new Promise((l, o) => {
  if (console.log("fetching from db"), !e || n)
    return console.log("fetch from api only"), $e(i).then(l).catch(o);
  pe.dropdownHelper.find(e).then(async (r) => {
    if (r) {
      l(r);
      return;
    }
    Ct()(i).then((c) => (c.length && pe.dropdownHelper.create(e, c, t).catch((O) => console.warn("Failed to create cache entry", O)), l(c))).catch(o);
  });
}), Ce = () => wt(
  (t, n, i) => Lt({ cacheKey: t, cacheTimeout: n, bypassCache: i.bypassCache }, i)
), xt = /* @__PURE__ */ te({
  __name: "InputDropdown",
  props: {
    context: {}
  },
  emits: ["valueChange"],
  async setup(e, { emit: t }) {
    let n, i;
    const l = me("apiClient"), o = t, {
      options: r,
      cacheKey: s,
      dependsOn: c,
      bypassCache: O,
      createRoute: I,
      node: w,
      requestPropertyName: W = "recordId",
      requestMapper: P,
      cacheTimeout: z = 60 * 60 * 1e3 * 200,
      useLazy: F,
      responseOptionsKey: v = "options",
      optionsMapper: $,
      hideReload: M
    } = e.context, S = ce(w.value), k = s || w.name, A = oe(w.name), T = c ? oe(c) : void 0, m = ve(
      () => {
        var a;
        return ((a = T == null ? void 0 : T.value) == null ? void 0 : a.value) ?? void 0;
      }
    );
    Ae(() => {
      A.value && (A.value.value ? A.value.value != S.value && (S.value = A.value.value) : S.value && (console.log("corm", S), S.value = null));
    }), ye(m, (a) => {
      console.log("parent value changed", a), Y(void 0), F || f.refetch();
    });
    const b = () => {
      let a = k;
      return c && m.value && (a += `-${m.value}`), a;
    }, D = () => {
      let a = {};
      const h = b();
      return c && m.value && (a[W] = m.value), P && (a = P(a)), Ce()(
        h,
        z,
        {
          options: r,
          request: a,
          bypassCache: O,
          apiClient: l,
          optionsMapper: $,
          responseOptionsKey: v
        }
      );
    }, f = Se({
      queryKey: [k, m.value],
      queryFn: D,
      retry: (a, h) => {
        const ie = le(v);
        return h.message == ie.not_defined.message || h.message == ie.not_array.message ? !1 : a < 3;
      },
      enabled: !F && r !== void 0,
      refetchOnWindowFocus: !1,
      staleTime: z
    }), _ = () => new Promise((a) => {
      const h = { ...e.context };
      return Array.isArray(r) || (h.optionLabel = h.optionLabel || "label", h.optionValue = h.optionValue ? h.optionValue : e.context.convertToFlat ? h.optionLabel : "value", h.placeholder = e.context.node.props.placeholder), (!F || typeof w.value < "u") && f.refetch(), a(h);
    }), Z = () => {
      var a;
      console.log("onbeforwdshow"), !(!F || !r || (a = f.data.value) != null && a.length && !c) && f.refetch();
    }, Y = (a) => {
      S.value !== a && (S.value = a, o("valueChange", a));
    }, j = () => {
      we(b()), f.refetch();
    }, ne = () => g(
      je,
      {
        ...p,
        pt: { overlay: "z-2000" },
        modelValue: S.value,
        "onUpdate:modelValue": Y,
        loading: f.isLoading.value || f.isFetching.value,
        options: f.data.value,
        onBeforeShow: Z
      },
      {
        header: (a) => g("div", { class: "select-header" }, [
          M ? void 0 : g(ee, {
            action: j,
            label: "reload",
            icon: "reload"
          }),
          I ? g(ee, { action: I, label: "create", icon: "plus" }) : void 0
        ]),
        option: ({ option: a, selected: h }) => f.isLoading.value || f.isFetching.value ? g("h2", "Loading...") : f.error.value ? g(
          "h2",
          { class: "text-red-500" },
          `Error: ${f.error.value.message}`
        ) : g(
          "div",
          {
            class: `flex items-center ${h ? "selected" : ""}`
          },
          [
            a.icon ? g(ke, { icon: a.icon }) : void 0,
            typeof p.optionLabel == "string" && a[p.optionLabel] ? g("span", a[p.optionLabel]) : void 0,
            "note" in a ? g("span", a.note) : void 0
          ]
        ),
        empty: () => f.isLoading.value || f.isFetching.value ? g("h2", "Loading...") : f.error.value ? g(
          "h2",
          { class: "text-red-500" },
          `Error: ${f.error.value.message}`
        ) : g("h2", "No options available")
      }
    ), p = ([n, i] = Oe(() => _()), n = await n, i(), n);
    return (a, h) => (d(), L(B(ne)));
  }
}), Vn = /* @__PURE__ */ te({
  __name: "Dropdown",
  props: {
    context: {}
  },
  setup(e) {
    const t = e;
    return (n, i) => (d(), L(Ie, null, {
      fallback: V(() => i[0] || (i[0] = [
        U(" Loading... ")
      ])),
      default: V(() => [
        N(xt, u(t, {
          onValueChange: t.context.node.input
        }), null, 16, ["onValueChange"])
      ]),
      _: 1
    }));
  }
});
var Be = {
  name: "TimesCircleIcon",
  extends: _e
};
function Ft(e, t, n, i, l, o) {
  return d(), y("svg", u({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, e.pti()), t[0] || (t[0] = [K("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M7 14C5.61553 14 4.26215 13.5895 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303296 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303296 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26215 14 5.61553 14 7C14 8.85652 13.2625 10.637 11.9497 11.9497C10.637 13.2625 8.85652 14 7 14ZM7 1.16667C5.84628 1.16667 4.71846 1.50879 3.75918 2.14976C2.79989 2.79074 2.05222 3.70178 1.61071 4.76768C1.16919 5.83358 1.05367 7.00647 1.27876 8.13803C1.50384 9.26958 2.05941 10.309 2.87521 11.1248C3.69102 11.9406 4.73042 12.4962 5.86198 12.7212C6.99353 12.9463 8.16642 12.8308 9.23232 12.3893C10.2982 11.9478 11.2093 11.2001 11.8502 10.2408C12.4912 9.28154 12.8333 8.15373 12.8333 7C12.8333 5.45291 12.2188 3.96918 11.1248 2.87521C10.0308 1.78125 8.5471 1.16667 7 1.16667ZM4.66662 9.91668C4.58998 9.91704 4.51404 9.90209 4.44325 9.87271C4.37246 9.84333 4.30826 9.8001 4.2544 9.74557C4.14516 9.6362 4.0838 9.48793 4.0838 9.33335C4.0838 9.17876 4.14516 9.0305 4.2544 8.92113L6.17553 7L4.25443 5.07891C4.15139 4.96832 4.09529 4.82207 4.09796 4.67094C4.10063 4.51982 4.16185 4.37563 4.26872 4.26876C4.3756 4.16188 4.51979 4.10066 4.67091 4.09799C4.82204 4.09532 4.96829 4.15142 5.07887 4.25446L6.99997 6.17556L8.92106 4.25446C9.03164 4.15142 9.1779 4.09532 9.32903 4.09799C9.48015 4.10066 9.62434 4.16188 9.73121 4.26876C9.83809 4.37563 9.89931 4.51982 9.90198 4.67094C9.90464 4.82207 9.84855 4.96832 9.74551 5.07891L7.82441 7L9.74554 8.92113C9.85478 9.0305 9.91614 9.17876 9.91614 9.33335C9.91614 9.48793 9.85478 9.6362 9.74554 9.74557C9.69168 9.8001 9.62748 9.84333 9.55669 9.87271C9.4859 9.90209 9.40996 9.91704 9.33332 9.91668C9.25668 9.91704 9.18073 9.90209 9.10995 9.87271C9.03916 9.84333 8.97495 9.8001 8.9211 9.74557L6.99997 7.82444L5.07884 9.74557C5.02499 9.8001 4.96078 9.84333 4.88999 9.87271C4.81921 9.90209 4.74326 9.91704 4.66662 9.91668Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
Be.render = Ft;
var Vt = function(t) {
  var n = t.dt;
  return `
.p-chip {
    display: inline-flex;
    align-items: center;
    background: `.concat(n("chip.background"), `;
    color: `).concat(n("chip.color"), `;
    border-radius: `).concat(n("chip.border.radius"), `;
    padding-block: `).concat(n("chip.padding.y"), `;
    padding-inline: `).concat(n("chip.padding.x"), `;
    gap: `).concat(n("chip.gap"), `;
}

.p-chip-icon {
    color: `).concat(n("chip.icon.color"), `;
    font-size: `).concat(n("chip.icon.font.size"), `;
    width: `).concat(n("chip.icon.size"), `;
    height: `).concat(n("chip.icon.size"), `;
}

.p-chip-image {
    border-radius: 50%;
    width: `).concat(n("chip.image.width"), `;
    height: `).concat(n("chip.image.height"), `;
    margin-inline-start: calc(-1 * `).concat(n("chip.padding.y"), `);
}

.p-chip:has(.p-chip-remove-icon) {
    padding-inline-end: `).concat(n("chip.padding.y"), `;
}

.p-chip:has(.p-chip-image) {
    padding-block-start: calc(`).concat(n("chip.padding.y"), ` / 2);
    padding-block-end: calc(`).concat(n("chip.padding.y"), ` / 2);
}

.p-chip-remove-icon {
    cursor: pointer;
    font-size: `).concat(n("chip.remove.icon.size"), `;
    width: `).concat(n("chip.remove.icon.size"), `;
    height: `).concat(n("chip.remove.icon.size"), `;
    color: `).concat(n("chip.remove.icon.color"), `;
    border-radius: 50%;
    transition: outline-color `).concat(n("chip.transition.duration"), ", box-shadow ").concat(n("chip.transition.duration"), `;
    outline-color: transparent;
}

.p-chip-remove-icon:focus-visible {
    box-shadow: `).concat(n("chip.remove.icon.focus.ring.shadow"), `;
    outline: `).concat(n("chip.remove.icon.focus.ring.width"), " ").concat(n("chip.remove.icon.focus.ring.style"), " ").concat(n("chip.remove.icon.focus.ring.color"), `;
    outline-offset: `).concat(n("chip.remove.icon.focus.ring.offset"), `;
}
`);
}, Tt = {
  root: "p-chip p-component",
  image: "p-chip-image",
  icon: "p-chip-icon",
  label: "p-chip-label",
  removeIcon: "p-chip-remove-icon"
}, Kt = ue.extend({
  name: "chip",
  theme: Vt,
  classes: Tt
}), At = {
  name: "BaseChip",
  extends: et,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    removable: {
      type: Boolean,
      default: !1
    },
    removeIcon: {
      type: String,
      default: void 0
    }
  },
  style: Kt,
  provide: function() {
    return {
      $pcChip: this,
      $parentInstance: this
    };
  }
}, Pe = {
  name: "Chip",
  extends: At,
  inheritAttrs: !1,
  emits: ["remove"],
  data: function() {
    return {
      visible: !0
    };
  },
  methods: {
    onKeydown: function(t) {
      (t.key === "Enter" || t.key === "Backspace") && this.close(t);
    },
    close: function(t) {
      this.visible = !1, this.$emit("remove", t);
    }
  },
  components: {
    TimesCircleIcon: Be
  }
}, Mt = ["aria-label"], Dt = ["src"];
function Et(e, t, n, i, l, o) {
  return l.visible ? (d(), y("div", u({
    key: 0,
    class: e.cx("root"),
    "aria-label": e.label
  }, e.ptmi("root")), [C(e.$slots, "default", {}, function() {
    return [e.image ? (d(), y("img", u({
      key: 0,
      src: e.image
    }, e.ptm("image"), {
      class: e.cx("image")
    }), null, 16, Dt)) : e.$slots.icon ? (d(), L(B(e.$slots.icon), u({
      key: 1,
      class: e.cx("icon")
    }, e.ptm("icon")), null, 16, ["class"])) : e.icon ? (d(), y("span", u({
      key: 2,
      class: [e.cx("icon"), e.icon]
    }, e.ptm("icon")), null, 16)) : x("", !0), e.label ? (d(), y("div", u({
      key: 3,
      class: e.cx("label")
    }, e.ptm("label")), E(e.label), 17)) : x("", !0)];
  }), e.removable ? C(e.$slots, "removeicon", {
    key: 0,
    removeCallback: o.close,
    keydownCallback: o.onKeydown
  }, function() {
    return [(d(), L(B(e.removeIcon ? "span" : "TimesCircleIcon"), u({
      class: [e.cx("removeIcon"), e.removeIcon],
      onClick: o.close,
      onKeydown: o.onKeydown
    }, e.ptm("removeIcon")), null, 16, ["class", "onClick", "onKeydown"]))];
  }) : x("", !0)], 16, Mt)) : x("", !0);
}
Pe.render = Et;
var $t = function(t) {
  var n = t.dt;
  return `
.p-multiselect {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: `.concat(n("multiselect.background"), `;
    border: 1px solid `).concat(n("multiselect.border.color"), `;
    transition: background `).concat(n("multiselect.transition.duration"), ", color ").concat(n("multiselect.transition.duration"), ", border-color ").concat(n("multiselect.transition.duration"), ", outline-color ").concat(n("multiselect.transition.duration"), ", box-shadow ").concat(n("multiselect.transition.duration"), `;
    border-radius: `).concat(n("multiselect.border.radius"), `;
    outline-color: transparent;
    box-shadow: `).concat(n("multiselect.shadow"), `;
}

.p-multiselect:not(.p-disabled):hover {
    border-color: `).concat(n("multiselect.hover.border.color"), `;
}

.p-multiselect:not(.p-disabled).p-focus {
    border-color: `).concat(n("multiselect.focus.border.color"), `;
    box-shadow: `).concat(n("multiselect.focus.ring.shadow"), `;
    outline: `).concat(n("multiselect.focus.ring.width"), " ").concat(n("multiselect.focus.ring.style"), " ").concat(n("multiselect.focus.ring.color"), `;
    outline-offset: `).concat(n("multiselect.focus.ring.offset"), `;
}

.p-multiselect.p-variant-filled {
    background: `).concat(n("multiselect.filled.background"), `;
}

.p-multiselect.p-variant-filled:not(.p-disabled):hover {
    background: `).concat(n("multiselect.filled.hover.background"), `;
}

.p-multiselect.p-variant-filled.p-focus {
    background: `).concat(n("multiselect.filled.focus.background"), `;
}

.p-multiselect.p-invalid {
    border-color: `).concat(n("multiselect.invalid.border.color"), `;
}

.p-multiselect.p-disabled {
    opacity: 1;
    background: `).concat(n("multiselect.disabled.background"), `;
}

.p-multiselect-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: `).concat(n("multiselect.dropdown.color"), `;
    width: `).concat(n("multiselect.dropdown.width"), `;
    border-start-end-radius: `).concat(n("multiselect.border.radius"), `;
    border-end-end-radius: `).concat(n("multiselect.border.radius"), `;
}

.p-multiselect-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    color: `).concat(n("multiselect.clear.icon.color"), `;
    inset-inline-end: `).concat(n("multiselect.dropdown.width"), `;
}

.p-multiselect-label-container {
    overflow: hidden;
    flex: 1 1 auto;
    cursor: pointer;
}

.p-multiselect-label {
    display: flex;
    align-items: center;
    gap: calc(`).concat(n("multiselect.padding.y"), ` / 2);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: `).concat(n("multiselect.padding.y"), " ").concat(n("multiselect.padding.x"), `;
    color: `).concat(n("multiselect.color"), `;
}

.p-multiselect-label.p-placeholder {
    color: `).concat(n("multiselect.placeholder.color"), `;
}

.p-multiselect.p-invalid .p-multiselect-label.p-placeholder {
    color: `).concat(n("multiselect.invalid.placeholder.color"), `;
}

.p-multiselect.p-disabled .p-multiselect-label {
    color: `).concat(n("multiselect.disabled.color"), `;
}

.p-multiselect-label-empty {
    overflow: hidden;
    visibility: hidden;
}

.p-multiselect .p-multiselect-overlay {
    min-width: 100%;
}

.p-multiselect-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: `).concat(n("multiselect.overlay.background"), `;
    color: `).concat(n("multiselect.overlay.color"), `;
    border: 1px solid `).concat(n("multiselect.overlay.border.color"), `;
    border-radius: `).concat(n("multiselect.overlay.border.radius"), `;
    box-shadow: `).concat(n("multiselect.overlay.shadow"), `;
}

.p-multiselect-header {
    display: flex;
    align-items: center;
    padding: `).concat(n("multiselect.list.header.padding"), `;
}

.p-multiselect-header .p-checkbox {
    margin-inline-end: `).concat(n("multiselect.option.gap"), `;
}

.p-multiselect-filter-container {
    flex: 1 1 auto;
}

.p-multiselect-filter {
    width: 100%;
}

.p-multiselect-list-container {
    overflow: auto;
}

.p-multiselect-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    padding: `).concat(n("multiselect.list.padding"), `;
    display: flex;
    flex-direction: column;
    gap: `).concat(n("multiselect.list.gap"), `;
}

.p-multiselect-option {
    cursor: pointer;
    font-weight: normal;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: `).concat(n("multiselect.option.gap"), `;
    padding: `).concat(n("multiselect.option.padding"), `;
    border: 0 none;
    color: `).concat(n("multiselect.option.color"), `;
    background: transparent;
    transition: background `).concat(n("multiselect.transition.duration"), ", color ").concat(n("multiselect.transition.duration"), ", border-color ").concat(n("multiselect.transition.duration"), ", box-shadow ").concat(n("multiselect.transition.duration"), ", outline-color ").concat(n("multiselect.transition.duration"), `;
    border-radius: `).concat(n("multiselect.option.border.radius"), `;
}

.p-multiselect-option:not(.p-multiselect-option-selected):not(.p-disabled).p-focus {
    background: `).concat(n("multiselect.option.focus.background"), `;
    color: `).concat(n("multiselect.option.focus.color"), `;
}

.p-multiselect-option.p-multiselect-option-selected {
    background: `).concat(n("multiselect.option.selected.background"), `;
    color: `).concat(n("multiselect.option.selected.color"), `;
}

.p-multiselect-option.p-multiselect-option-selected.p-focus {
    background: `).concat(n("multiselect.option.selected.focus.background"), `;
    color: `).concat(n("multiselect.option.selected.focus.color"), `;
}

.p-multiselect-option-group {
    cursor: auto;
    margin: 0;
    padding: `).concat(n("multiselect.option.group.padding"), `;
    background: `).concat(n("multiselect.option.group.background"), `;
    color: `).concat(n("multiselect.option.group.color"), `;
    font-weight: `).concat(n("multiselect.option.group.font.weight"), `;
}

.p-multiselect-empty-message {
    padding: `).concat(n("multiselect.empty.message.padding"), `;
}

.p-multiselect-label .p-chip {
    padding-block-start: calc(`).concat(n("multiselect.padding.y"), ` / 2);
    padding-block-end: calc(`).concat(n("multiselect.padding.y"), ` / 2);
    border-radius: `).concat(n("multiselect.chip.border.radius"), `;
}

.p-multiselect-label:has(.p-chip) {
    padding: calc(`).concat(n("multiselect.padding.y"), " / 2) calc(").concat(n("multiselect.padding.x"), ` / 2);
}

.p-multiselect-fluid {
    display: flex;
    width: 100%;
}

.p-multiselect-sm .p-multiselect-label {
    font-size: `).concat(n("multiselect.sm.font.size"), `;
    padding-block: `).concat(n("multiselect.sm.padding.y"), `;
    padding-inline: `).concat(n("multiselect.sm.padding.x"), `;
}

.p-multiselect-sm .p-multiselect-dropdown .p-icon {
    font-size: `).concat(n("multiselect.sm.font.size"), `;
    width: `).concat(n("multiselect.sm.font.size"), `;
    height: `).concat(n("multiselect.sm.font.size"), `;
}

.p-multiselect-lg .p-multiselect-label {
    font-size: `).concat(n("multiselect.lg.font.size"), `;
    padding-block: `).concat(n("multiselect.lg.padding.y"), `;
    padding-inline: `).concat(n("multiselect.lg.padding.x"), `;
}

.p-multiselect-lg .p-multiselect-dropdown .p-icon {
    font-size: `).concat(n("multiselect.lg.font.size"), `;
    width: `).concat(n("multiselect.lg.font.size"), `;
    height: `).concat(n("multiselect.lg.font.size"), `;
}
`);
}, Bt = {
  root: function(t) {
    var n = t.props;
    return {
      position: n.appendTo === "self" ? "relative" : void 0
    };
  }
}, Pt = {
  root: function(t) {
    var n = t.instance, i = t.props;
    return ["p-multiselect p-component p-inputwrapper", {
      "p-multiselect-display-chip": i.display === "chip",
      "p-disabled": i.disabled,
      "p-invalid": n.$invalid,
      "p-variant-filled": n.$variant === "filled",
      "p-focus": n.focused,
      "p-inputwrapper-filled": n.$filled,
      "p-inputwrapper-focus": n.focused || n.overlayVisible,
      "p-multiselect-open": n.overlayVisible,
      "p-multiselect-fluid": n.$fluid,
      "p-multiselect-sm p-inputfield-sm": i.size === "small",
      "p-multiselect-lg p-inputfield-lg": i.size === "large"
    }];
  },
  labelContainer: "p-multiselect-label-container",
  label: function(t) {
    var n = t.instance, i = t.props;
    return ["p-multiselect-label", {
      "p-placeholder": n.label === i.placeholder,
      "p-multiselect-label-empty": !i.placeholder && (!i.modelValue || i.modelValue.length === 0)
    }];
  },
  clearIcon: "p-multiselect-clear-icon",
  chipItem: "p-multiselect-chip-item",
  pcChip: "p-multiselect-chip",
  chipIcon: "p-multiselect-chip-icon",
  dropdown: "p-multiselect-dropdown",
  loadingIcon: "p-multiselect-loading-icon",
  dropdownIcon: "p-multiselect-dropdown-icon",
  overlay: "p-multiselect-overlay p-component",
  header: "p-multiselect-header",
  pcFilterContainer: "p-multiselect-filter-container",
  pcFilter: "p-multiselect-filter",
  listContainer: "p-multiselect-list-container",
  list: "p-multiselect-list",
  optionGroup: "p-multiselect-option-group",
  option: function(t) {
    var n = t.instance, i = t.option, l = t.index, o = t.getItemOptions, r = t.props;
    return ["p-multiselect-option", {
      "p-multiselect-option-selected": n.isSelected(i) && r.highlightOnSelect,
      "p-focus": n.focusedOptionIndex === n.getOptionIndex(l, o),
      "p-disabled": n.isOptionDisabled(i)
    }];
  },
  emptyMessage: "p-multiselect-empty-message"
}, zt = ue.extend({
  name: "multiselect",
  theme: $t,
  classes: Pt,
  inlineStyles: Bt
}), Rt = {
  name: "BaseMultiSelect",
  extends: yt,
  props: {
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    optionGroupLabel: null,
    optionGroupChildren: null,
    scrollHeight: {
      type: String,
      default: "14rem"
    },
    placeholder: String,
    inputId: {
      type: String,
      default: null
    },
    panelClass: {
      type: String,
      default: null
    },
    panelStyle: {
      type: null,
      default: null
    },
    overlayClass: {
      type: String,
      default: null
    },
    overlayStyle: {
      type: null,
      default: null
    },
    dataKey: null,
    showClear: {
      type: Boolean,
      default: !1
    },
    clearIcon: {
      type: String,
      default: void 0
    },
    resetFilterOnClear: {
      type: Boolean,
      default: !1
    },
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      default: "contains"
    },
    filterFields: {
      type: Array,
      default: null
    },
    appendTo: {
      type: [String, Object],
      default: "body"
    },
    display: {
      type: String,
      default: "comma"
    },
    selectedItemsLabel: {
      type: String,
      default: null
    },
    maxSelectedLabels: {
      type: Number,
      default: null
    },
    selectionLimit: {
      type: Number,
      default: null
    },
    showToggleAll: {
      type: Boolean,
      default: !0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    checkboxIcon: {
      type: String,
      default: void 0
    },
    dropdownIcon: {
      type: String,
      default: void 0
    },
    filterIcon: {
      type: String,
      default: void 0
    },
    loadingIcon: {
      type: String,
      default: void 0
    },
    removeTokenIcon: {
      type: String,
      default: void 0
    },
    chipIcon: {
      type: String,
      default: void 0
    },
    selectAll: {
      type: Boolean,
      default: null
    },
    resetFilterOnHide: {
      type: Boolean,
      default: !1
    },
    virtualScrollerOptions: {
      type: Object,
      default: null
    },
    autoOptionFocus: {
      type: Boolean,
      default: !1
    },
    autoFilterFocus: {
      type: Boolean,
      default: !1
    },
    focusOnHover: {
      type: Boolean,
      default: !0
    },
    highlightOnSelect: {
      type: Boolean,
      default: !1
    },
    filterMessage: {
      type: String,
      default: null
    },
    selectionMessage: {
      type: String,
      default: null
    },
    emptySelectionMessage: {
      type: String,
      default: null
    },
    emptyFilterMessage: {
      type: String,
      default: null
    },
    emptyMessage: {
      type: String,
      default: null
    },
    tabindex: {
      type: Number,
      default: 0
    },
    ariaLabel: {
      type: String,
      default: null
    },
    ariaLabelledby: {
      type: String,
      default: null
    }
  },
  style: zt,
  provide: function() {
    return {
      $pcMultiSelect: this,
      $parentInstance: this
    };
  }
};
function ae(e) {
  "@babel/helpers - typeof";
  return ae = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ae(e);
}
function xe(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    t && (i = i.filter(function(l) {
      return Object.getOwnPropertyDescriptor(e, l).enumerable;
    })), n.push.apply(n, i);
  }
  return n;
}
function Fe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xe(Object(n), !0).forEach(function(i) {
      ze(e, i, n[i]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : xe(Object(n)).forEach(function(i) {
      Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(n, i));
    });
  }
  return e;
}
function ze(e, t, n) {
  return (t = Ht(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Ht(e) {
  var t = Nt(e, "string");
  return ae(t) == "symbol" ? t : t + "";
}
function Nt(e, t) {
  if (ae(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t || "default");
    if (ae(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ve(e) {
  return Ut(e) || jt(e) || Gt(e) || qt();
}
function qt() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gt(e, t) {
  if (e) {
    if (typeof e == "string") return fe(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? fe(e, t) : void 0;
  }
}
function jt(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function Ut(e) {
  if (Array.isArray(e)) return fe(e);
}
function fe(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, i = Array(t); n < t; n++) i[n] = e[n];
  return i;
}
var Re = {
  name: "MultiSelect",
  extends: Rt,
  inheritAttrs: !1,
  emits: ["change", "focus", "blur", "before-show", "before-hide", "show", "hide", "filter", "selectall-change"],
  inject: {
    $pcFluid: {
      default: null
    }
  },
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  startRangeIndex: -1,
  searchTimeout: null,
  searchValue: "",
  selectOnFocus: !1,
  data: function() {
    return {
      id: this.$attrs.id,
      clicked: !1,
      focused: !1,
      focusedOptionIndex: -1,
      filterValue: null,
      overlayVisible: !1
    };
  },
  watch: {
    "$attrs.id": function(t) {
      this.id = t || Le();
    },
    options: function() {
      this.autoUpdateModel();
    }
  },
  mounted: function() {
    this.id = this.id || Le(), this.autoUpdateModel();
  },
  beforeUnmount: function() {
    this.unbindOutsideClickListener(), this.unbindResizeListener(), this.scrollHandler && (this.scrollHandler.destroy(), this.scrollHandler = null), this.overlay && (de.clear(this.overlay), this.overlay = null);
  },
  methods: {
    getOptionIndex: function(t, n) {
      return this.virtualScrollerDisabled ? t : n && n(t).index;
    },
    getOptionLabel: function(t) {
      return this.optionLabel ? q(t, this.optionLabel) : t;
    },
    getOptionValue: function(t) {
      return this.optionValue ? q(t, this.optionValue) : t;
    },
    getOptionRenderKey: function(t, n) {
      return this.dataKey ? q(t, this.dataKey) : this.getOptionLabel(t) + "_".concat(n);
    },
    getHeaderCheckboxPTOptions: function(t) {
      return this.ptm(t, {
        context: {
          selected: this.allSelected
        }
      });
    },
    getCheckboxPTOptions: function(t, n, i, l) {
      return this.ptm(l, {
        context: {
          selected: this.isSelected(t),
          focused: this.focusedOptionIndex === this.getOptionIndex(i, n),
          disabled: this.isOptionDisabled(t)
        }
      });
    },
    isOptionDisabled: function(t) {
      return this.maxSelectionLimitReached && !this.isSelected(t) ? !0 : this.optionDisabled ? q(t, this.optionDisabled) : !1;
    },
    isOptionGroup: function(t) {
      return this.optionGroupLabel && t.optionGroup && t.group;
    },
    getOptionGroupLabel: function(t) {
      return q(t, this.optionGroupLabel);
    },
    getOptionGroupChildren: function(t) {
      return q(t, this.optionGroupChildren);
    },
    getAriaPosInset: function(t) {
      var n = this;
      return (this.optionGroupLabel ? t - this.visibleOptions.slice(0, t).filter(function(i) {
        return n.isOptionGroup(i);
      }).length : t) + 1;
    },
    show: function(t) {
      this.$emit("before-show"), this.overlayVisible = !0, this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex(), t && J(this.$refs.focusInput);
    },
    hide: function(t) {
      var n = this, i = function() {
        n.$emit("before-hide"), n.overlayVisible = !1, n.clicked = !1, n.focusedOptionIndex = -1, n.searchValue = "", n.resetFilterOnHide && (n.filterValue = null), t && J(n.$refs.focusInput);
      };
      setTimeout(function() {
        i();
      }, 0);
    },
    onFocus: function(t) {
      this.disabled || (this.focused = !0, this.overlayVisible && (this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.findSelectedOptionIndex(), this.scrollInView(this.focusedOptionIndex)), this.$emit("focus", t));
    },
    onBlur: function(t) {
      var n, i;
      this.clicked = !1, this.focused = !1, this.focusedOptionIndex = -1, this.searchValue = "", this.$emit("blur", t), (n = (i = this.formField).onBlur) === null || n === void 0 || n.call(i);
    },
    onKeyDown: function(t) {
      var n = this;
      if (this.disabled) {
        t.preventDefault();
        return;
      }
      var i = t.metaKey || t.ctrlKey;
      switch (t.code) {
        case "ArrowDown":
          this.onArrowDownKey(t);
          break;
        case "ArrowUp":
          this.onArrowUpKey(t);
          break;
        case "Home":
          this.onHomeKey(t);
          break;
        case "End":
          this.onEndKey(t);
          break;
        case "PageDown":
          this.onPageDownKey(t);
          break;
        case "PageUp":
          this.onPageUpKey(t);
          break;
        case "Enter":
        case "NumpadEnter":
        case "Space":
          this.onEnterKey(t);
          break;
        case "Escape":
          this.onEscapeKey(t);
          break;
        case "Tab":
          this.onTabKey(t);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          this.onShiftKey(t);
          break;
        default:
          if (t.code === "KeyA" && i) {
            var l = this.visibleOptions.filter(function(o) {
              return n.isValidOption(o);
            }).map(function(o) {
              return n.getOptionValue(o);
            });
            this.updateModel(t, l), t.preventDefault();
            break;
          }
          !i && tt(t.key) && (!this.overlayVisible && this.show(), this.searchOptions(t), t.preventDefault());
          break;
      }
      this.clicked = !1;
    },
    onContainerClick: function(t) {
      this.disabled || this.loading || t.target.tagName === "INPUT" || t.target.getAttribute("data-pc-section") === "clearicon" || t.target.closest('[data-pc-section="clearicon"]') || ((!this.overlay || !this.overlay.contains(t.target)) && (this.overlayVisible ? this.hide(!0) : this.show(!0)), this.clicked = !0);
    },
    onClearClick: function(t) {
      this.updateModel(t, null), this.resetFilterOnClear && (this.filterValue = null);
    },
    onFirstHiddenFocus: function(t) {
      var n = t.relatedTarget === this.$refs.focusInput ? nt(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      J(n);
    },
    onLastHiddenFocus: function(t) {
      var n = t.relatedTarget === this.$refs.focusInput ? it(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      J(n);
    },
    onOptionSelect: function(t, n) {
      var i = this, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : -1, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
      if (!(this.disabled || this.isOptionDisabled(n))) {
        var r = this.isSelected(n), s = null;
        r ? s = this.d_value.filter(function(c) {
          return !X(c, i.getOptionValue(n), i.equalityKey);
        }) : s = [].concat(Ve(this.d_value || []), [this.getOptionValue(n)]), this.updateModel(t, s), l !== -1 && (this.focusedOptionIndex = l), o && J(this.$refs.focusInput);
      }
    },
    onOptionMouseMove: function(t, n) {
      this.focusOnHover && this.changeFocusedOptionIndex(t, n);
    },
    onOptionSelectRange: function(t) {
      var n = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1, l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : -1;
      if (i === -1 && (i = this.findNearestSelectedOptionIndex(l, !0)), l === -1 && (l = this.findNearestSelectedOptionIndex(i)), i !== -1 && l !== -1) {
        var o = Math.min(i, l), r = Math.max(i, l), s = this.visibleOptions.slice(o, r + 1).filter(function(c) {
          return n.isValidOption(c);
        }).map(function(c) {
          return n.getOptionValue(c);
        });
        this.updateModel(t, s);
      }
    },
    onFilterChange: function(t) {
      var n = t.target.value;
      this.filterValue = n, this.focusedOptionIndex = -1, this.$emit("filter", {
        originalEvent: t,
        value: n
      }), !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown: function(t) {
      switch (t.code) {
        case "ArrowDown":
          this.onArrowDownKey(t);
          break;
        case "ArrowUp":
          this.onArrowUpKey(t, !0);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(t, !0);
          break;
        case "Home":
          this.onHomeKey(t, !0);
          break;
        case "End":
          this.onEndKey(t, !0);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(t);
          break;
        case "Escape":
          this.onEscapeKey(t);
          break;
        case "Tab":
          this.onTabKey(t, !0);
          break;
      }
    },
    onFilterBlur: function() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated: function() {
      this.overlayVisible && this.alignOverlay();
    },
    onOverlayClick: function(t) {
      ot.emit("overlay-click", {
        originalEvent: t,
        target: this.$el
      });
    },
    onOverlayKeyDown: function(t) {
      switch (t.code) {
        case "Escape":
          this.onEscapeKey(t);
          break;
      }
    },
    onArrowDownKey: function(t) {
      if (!this.overlayVisible)
        this.show();
      else {
        var n = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
        t.shiftKey && this.onOptionSelectRange(t, this.startRangeIndex, n), this.changeFocusedOptionIndex(t, n);
      }
      t.preventDefault();
    },
    onArrowUpKey: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (t.altKey && !n)
        this.focusedOptionIndex !== -1 && this.onOptionSelect(t, this.visibleOptions[this.focusedOptionIndex]), this.overlayVisible && this.hide(), t.preventDefault();
      else {
        var i = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
        t.shiftKey && this.onOptionSelectRange(t, i, this.startRangeIndex), this.changeFocusedOptionIndex(t, i), !this.overlayVisible && this.show(), t.preventDefault();
      }
    },
    onArrowLeftKey: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      n && (this.focusedOptionIndex = -1);
    },
    onHomeKey: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (n) {
        var i = t.currentTarget;
        t.shiftKey ? i.setSelectionRange(0, t.target.selectionStart) : (i.setSelectionRange(0, 0), this.focusedOptionIndex = -1);
      } else {
        var l = t.metaKey || t.ctrlKey, o = this.findFirstOptionIndex();
        t.shiftKey && l && this.onOptionSelectRange(t, o, this.startRangeIndex), this.changeFocusedOptionIndex(t, o), !this.overlayVisible && this.show();
      }
      t.preventDefault();
    },
    onEndKey: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      if (n) {
        var i = t.currentTarget;
        if (t.shiftKey)
          i.setSelectionRange(t.target.selectionStart, i.value.length);
        else {
          var l = i.value.length;
          i.setSelectionRange(l, l), this.focusedOptionIndex = -1;
        }
      } else {
        var o = t.metaKey || t.ctrlKey, r = this.findLastOptionIndex();
        t.shiftKey && o && this.onOptionSelectRange(t, this.startRangeIndex, r), this.changeFocusedOptionIndex(t, r), !this.overlayVisible && this.show();
      }
      t.preventDefault();
    },
    onPageUpKey: function(t) {
      this.scrollInView(0), t.preventDefault();
    },
    onPageDownKey: function(t) {
      this.scrollInView(this.visibleOptions.length - 1), t.preventDefault();
    },
    onEnterKey: function(t) {
      this.overlayVisible ? this.focusedOptionIndex !== -1 && (t.shiftKey ? this.onOptionSelectRange(t, this.focusedOptionIndex) : this.onOptionSelect(t, this.visibleOptions[this.focusedOptionIndex])) : (this.focusedOptionIndex = -1, this.onArrowDownKey(t)), t.preventDefault();
    },
    onEscapeKey: function(t) {
      this.overlayVisible && this.hide(!0), t.preventDefault();
    },
    onTabKey: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
      n || (this.overlayVisible && this.hasFocusableElements() ? (J(t.shiftKey ? this.$refs.lastHiddenFocusableElementOnOverlay : this.$refs.firstHiddenFocusableElementOnOverlay), t.preventDefault()) : (this.focusedOptionIndex !== -1 && this.onOptionSelect(t, this.visibleOptions[this.focusedOptionIndex]), this.overlayVisible && this.hide(this.filter)));
    },
    onShiftKey: function() {
      this.startRangeIndex = this.focusedOptionIndex;
    },
    onOverlayEnter: function(t) {
      de.set("overlay", t, this.$primevue.config.zIndex.overlay), lt(t, {
        position: "absolute",
        top: "0",
        left: "0"
      }), this.alignOverlay(), this.scrollInView(), this.autoFilterFocus && J(this.$refs.filterInput.$el);
    },
    onOverlayAfterEnter: function() {
      this.bindOutsideClickListener(), this.bindScrollListener(), this.bindResizeListener(), this.$emit("show");
    },
    onOverlayLeave: function() {
      this.unbindOutsideClickListener(), this.unbindScrollListener(), this.unbindResizeListener(), this.$emit("hide"), this.overlay = null;
    },
    onOverlayAfterLeave: function(t) {
      de.clear(t);
    },
    alignOverlay: function() {
      this.appendTo === "self" ? at(this.overlay, this.$el) : (this.overlay.style.minWidth = rt(this.$el) + "px", st(this.overlay, this.$el));
    },
    bindOutsideClickListener: function() {
      var t = this;
      this.outsideClickListener || (this.outsideClickListener = function(n) {
        t.overlayVisible && t.isOutsideClicked(n) && t.hide();
      }, document.addEventListener("click", this.outsideClickListener));
    },
    unbindOutsideClickListener: function() {
      this.outsideClickListener && (document.removeEventListener("click", this.outsideClickListener), this.outsideClickListener = null);
    },
    bindScrollListener: function() {
      var t = this;
      this.scrollHandler || (this.scrollHandler = new ct(this.$refs.container, function() {
        t.overlayVisible && t.hide();
      })), this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function() {
      this.scrollHandler && this.scrollHandler.unbindScrollListener();
    },
    bindResizeListener: function() {
      var t = this;
      this.resizeListener || (this.resizeListener = function() {
        t.overlayVisible && !ut() && t.hide();
      }, window.addEventListener("resize", this.resizeListener));
    },
    unbindResizeListener: function() {
      this.resizeListener && (window.removeEventListener("resize", this.resizeListener), this.resizeListener = null);
    },
    isOutsideClicked: function(t) {
      return !(this.$el.isSameNode(t.target) || this.$el.contains(t.target) || this.overlay && this.overlay.contains(t.target));
    },
    getLabelByValue: function(t) {
      var n = this, i = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [], l = i.find(function(o) {
        return !n.isOptionGroup(o) && X(n.getOptionValue(o), t, n.equalityKey);
      });
      return l ? this.getOptionLabel(l) : null;
    },
    getSelectedItemsLabel: function() {
      var t = /{(.*?)}/, n = this.selectedItemsLabel || this.$primevue.config.locale.selectionMessage;
      return t.test(n) ? n.replace(n.match(t)[0], this.d_value.length + "") : n;
    },
    onToggleAll: function(t) {
      var n = this;
      if (this.selectAll !== null)
        this.$emit("selectall-change", {
          originalEvent: t,
          checked: !this.allSelected
        });
      else {
        var i = this.allSelected ? [] : this.visibleOptions.filter(function(l) {
          return n.isValidOption(l);
        }).map(function(l) {
          return n.getOptionValue(l);
        });
        this.updateModel(t, i);
      }
    },
    removeOption: function(t, n) {
      var i = this;
      t.stopPropagation();
      var l = this.d_value.filter(function(o) {
        return !X(o, n, i.equalityKey);
      });
      this.updateModel(t, l);
    },
    clearFilter: function() {
      this.filterValue = null;
    },
    hasFocusableElements: function() {
      return dt(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
    },
    isOptionMatched: function(t) {
      var n;
      return this.isValidOption(t) && typeof this.getOptionLabel(t) == "string" && ((n = this.getOptionLabel(t)) === null || n === void 0 ? void 0 : n.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)));
    },
    isValidOption: function(t) {
      return G(t) && !(this.isOptionDisabled(t) || this.isOptionGroup(t));
    },
    isValidSelectedOption: function(t) {
      return this.isValidOption(t) && this.isSelected(t);
    },
    isEquals: function(t, n) {
      return X(t, n, this.equalityKey);
    },
    isSelected: function(t) {
      var n = this, i = this.getOptionValue(t);
      return (this.d_value || []).some(function(l) {
        return n.isEquals(l, i);
      });
    },
    findFirstOptionIndex: function() {
      var t = this;
      return this.visibleOptions.findIndex(function(n) {
        return t.isValidOption(n);
      });
    },
    findLastOptionIndex: function() {
      var t = this;
      return se(this.visibleOptions, function(n) {
        return t.isValidOption(n);
      });
    },
    findNextOptionIndex: function(t) {
      var n = this, i = t < this.visibleOptions.length - 1 ? this.visibleOptions.slice(t + 1).findIndex(function(l) {
        return n.isValidOption(l);
      }) : -1;
      return i > -1 ? i + t + 1 : t;
    },
    findPrevOptionIndex: function(t) {
      var n = this, i = t > 0 ? se(this.visibleOptions.slice(0, t), function(l) {
        return n.isValidOption(l);
      }) : -1;
      return i > -1 ? i : t;
    },
    findSelectedOptionIndex: function() {
      var t = this;
      if (this.$filled) {
        for (var n = function() {
          var r = t.d_value[l], s = t.visibleOptions.findIndex(function(c) {
            return t.isValidSelectedOption(c) && t.isEquals(r, t.getOptionValue(c));
          });
          if (s > -1) return {
            v: s
          };
        }, i, l = this.d_value.length - 1; l >= 0; l--)
          if (i = n(), i) return i.v;
      }
      return -1;
    },
    findFirstSelectedOptionIndex: function() {
      var t = this;
      return this.$filled ? this.visibleOptions.findIndex(function(n) {
        return t.isValidSelectedOption(n);
      }) : -1;
    },
    findLastSelectedOptionIndex: function() {
      var t = this;
      return this.$filled ? se(this.visibleOptions, function(n) {
        return t.isValidSelectedOption(n);
      }) : -1;
    },
    findNextSelectedOptionIndex: function(t) {
      var n = this, i = this.$filled && t < this.visibleOptions.length - 1 ? this.visibleOptions.slice(t + 1).findIndex(function(l) {
        return n.isValidSelectedOption(l);
      }) : -1;
      return i > -1 ? i + t + 1 : -1;
    },
    findPrevSelectedOptionIndex: function(t) {
      var n = this, i = this.$filled && t > 0 ? se(this.visibleOptions.slice(0, t), function(l) {
        return n.isValidSelectedOption(l);
      }) : -1;
      return i > -1 ? i : -1;
    },
    findNearestSelectedOptionIndex: function(t) {
      var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, i = -1;
      return this.$filled && (n ? (i = this.findPrevSelectedOptionIndex(t), i = i === -1 ? this.findNextSelectedOptionIndex(t) : i) : (i = this.findNextSelectedOptionIndex(t), i = i === -1 ? this.findPrevSelectedOptionIndex(t) : i)), i > -1 ? i : t;
    },
    findFirstFocusedOptionIndex: function() {
      var t = this.findSelectedOptionIndex();
      return t < 0 ? this.findFirstOptionIndex() : t;
    },
    findLastFocusedOptionIndex: function() {
      var t = this.findSelectedOptionIndex();
      return t < 0 ? this.findLastOptionIndex() : t;
    },
    searchOptions: function(t) {
      var n = this;
      this.searchValue = (this.searchValue || "") + t.key;
      var i = -1;
      G(this.searchValue) && (this.focusedOptionIndex !== -1 ? (i = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function(l) {
        return n.isOptionMatched(l);
      }), i = i === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(function(l) {
        return n.isOptionMatched(l);
      }) : i + this.focusedOptionIndex) : i = this.visibleOptions.findIndex(function(l) {
        return n.isOptionMatched(l);
      }), i === -1 && this.focusedOptionIndex === -1 && (i = this.findFirstFocusedOptionIndex()), i !== -1 && this.changeFocusedOptionIndex(t, i)), this.searchTimeout && clearTimeout(this.searchTimeout), this.searchTimeout = setTimeout(function() {
        n.searchValue = "", n.searchTimeout = null;
      }, 500);
    },
    changeFocusedOptionIndex: function(t, n) {
      this.focusedOptionIndex !== n && (this.focusedOptionIndex = n, this.scrollInView(), this.selectOnFocus && this.onOptionSelect(t, this.visibleOptions[n]));
    },
    scrollInView: function() {
      var t = this, n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
      this.$nextTick(function() {
        var i = n !== -1 ? "".concat(t.id, "_").concat(n) : t.focusedOptionId, l = pt(t.list, 'li[id="'.concat(i, '"]'));
        l ? l.scrollIntoView && l.scrollIntoView({
          block: "nearest",
          inline: "nearest"
        }) : t.virtualScrollerDisabled || t.virtualScroller && t.virtualScroller.scrollToIndex(n !== -1 ? n : t.focusedOptionIndex);
      });
    },
    autoUpdateModel: function() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.$filled) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        var t = this.getOptionValue(this.visibleOptions[this.focusedOptionIndex]);
        this.updateModel(null, [t]);
      }
    },
    updateModel: function(t, n) {
      this.writeValue(n, t), this.$emit("change", {
        originalEvent: t,
        value: n
      });
    },
    flatOptions: function(t) {
      var n = this;
      return (t || []).reduce(function(i, l, o) {
        i.push({
          optionGroup: l,
          group: !0,
          index: o
        });
        var r = n.getOptionGroupChildren(l);
        return r && r.forEach(function(s) {
          return i.push(s);
        }), i;
      }, []);
    },
    overlayRef: function(t) {
      this.overlay = t;
    },
    listRef: function(t, n) {
      this.list = t, n && n(t);
    },
    virtualScrollerRef: function(t) {
      this.virtualScroller = t;
    }
  },
  computed: {
    visibleOptions: function() {
      var t = this, n = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      if (this.filterValue) {
        var i = Ue.filter(n, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
        if (this.optionGroupLabel) {
          var l = this.options || [], o = [];
          return l.forEach(function(r) {
            var s = t.getOptionGroupChildren(r), c = s.filter(function(O) {
              return i.includes(O);
            });
            c.length > 0 && o.push(Fe(Fe({}, r), {}, ze({}, typeof t.optionGroupChildren == "string" ? t.optionGroupChildren : "items", Ve(c))));
          }), this.flatOptions(o);
        }
        return i;
      }
      return n;
    },
    label: function() {
      var t;
      if (this.d_value && this.d_value.length) {
        if (G(this.maxSelectedLabels) && this.d_value.length > this.maxSelectedLabels)
          return this.getSelectedItemsLabel();
        t = "";
        for (var n = 0; n < this.d_value.length; n++)
          n !== 0 && (t += ", "), t += this.getLabelByValue(this.d_value[n]);
      } else
        t = this.placeholder;
      return t;
    },
    chipSelectedItems: function() {
      return G(this.maxSelectedLabels) && this.d_value && this.d_value.length > this.maxSelectedLabels;
    },
    allSelected: function() {
      var t = this;
      return this.selectAll !== null ? this.selectAll : G(this.visibleOptions) && this.visibleOptions.every(function(n) {
        return t.isOptionGroup(n) || t.isOptionDisabled(n) || t.isSelected(n);
      });
    },
    // @deprecated use $filled instead.
    hasSelectedOption: function() {
      return this.$filled;
    },
    equalityKey: function() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields: function() {
      return this.filterFields || [this.optionLabel];
    },
    maxSelectionLimitReached: function() {
      return this.selectionLimit && this.d_value && this.d_value.length === this.selectionLimit;
    },
    filterResultMessageText: function() {
      return G(this.visibleOptions) ? this.filterMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText: function() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptyFilterMessageText: function() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || "";
    },
    emptyMessageText: function() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || "";
    },
    selectionMessageText: function() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText: function() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText: function() {
      return this.$filled ? this.selectionMessageText.replaceAll("{0}", this.d_value.length) : this.emptySelectionMessageText;
    },
    focusedOptionId: function() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
    },
    ariaSetSize: function() {
      var t = this;
      return this.visibleOptions.filter(function(n) {
        return !t.isOptionGroup(n);
      }).length;
    },
    toggleAllAriaLabel: function() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria[this.allSelected ? "selectAll" : "unselectAll"] : void 0;
    },
    listAriaLabel: function() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listLabel : void 0;
    },
    virtualScrollerDisabled: function() {
      return !this.virtualScrollerOptions;
    },
    hasFluid: function() {
      return ht(this.fluid) ? !!this.$pcFluid : this.fluid;
    },
    isClearIconVisible: function() {
      return this.showClear && this.d_value != null && G(this.options);
    }
  },
  directives: {
    ripple: be
  },
  components: {
    InputText: ft,
    Checkbox: We,
    VirtualScroller: Ze,
    Portal: gt,
    Chip: Pe,
    IconField: Ye,
    InputIcon: Je,
    TimesIcon: bt,
    SearchIcon: Qe,
    ChevronDownIcon: mt,
    SpinnerIcon: vt,
    CheckIcon: Xe
  }
};
function re(e) {
  "@babel/helpers - typeof";
  return re = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, re(e);
}
function Te(e, t, n) {
  return (t = Wt(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Wt(e) {
  var t = Zt(e, "string");
  return re(t) == "symbol" ? t : t + "";
}
function Zt(e, t) {
  if (re(e) != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var i = n.call(e, t || "default");
    if (re(i) != "object") return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Yt = ["id", "disabled", "placeholder", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid"], Jt = {
  key: 0
}, Qt = ["id", "aria-label"], Xt = ["id"], _t = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-selected", "data-p-focused", "data-p-disabled"];
function en(e, t, n, i, l, o) {
  var r = R("Chip"), s = R("SpinnerIcon"), c = R("Checkbox"), O = R("InputText"), I = R("SearchIcon"), w = R("InputIcon"), W = R("IconField"), P = R("VirtualScroller"), z = R("Portal"), F = Me("ripple");
  return d(), y("div", u({
    ref: "container",
    class: e.cx("root"),
    style: e.sx("root"),
    onClick: t[7] || (t[7] = function() {
      return o.onContainerClick && o.onContainerClick.apply(o, arguments);
    })
  }, e.ptmi("root")), [K("div", u({
    class: "p-hidden-accessible"
  }, e.ptm("hiddenInputContainer"), {
    "data-p-hidden-accessible": !0
  }), [K("input", u({
    ref: "focusInput",
    id: e.inputId,
    type: "text",
    readonly: "",
    disabled: e.disabled,
    placeholder: e.placeholder,
    tabindex: e.disabled ? -1 : e.tabindex,
    role: "combobox",
    "aria-label": e.ariaLabel,
    "aria-labelledby": e.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-expanded": l.overlayVisible,
    "aria-controls": l.id + "_list",
    "aria-activedescendant": l.focused ? o.focusedOptionId : void 0,
    "aria-invalid": e.invalid || void 0,
    onFocus: t[0] || (t[0] = function() {
      return o.onFocus && o.onFocus.apply(o, arguments);
    }),
    onBlur: t[1] || (t[1] = function() {
      return o.onBlur && o.onBlur.apply(o, arguments);
    }),
    onKeydown: t[2] || (t[2] = function() {
      return o.onKeyDown && o.onKeyDown.apply(o, arguments);
    })
  }, e.ptm("hiddenInput")), null, 16, Yt)], 16), K("div", u({
    class: e.cx("labelContainer")
  }, e.ptm("labelContainer")), [K("div", u({
    class: e.cx("label")
  }, e.ptm("label")), [C(e.$slots, "value", {
    value: e.d_value,
    placeholder: e.placeholder
  }, function() {
    return [e.display === "comma" ? (d(), y(Q, {
      key: 0
    }, [U(E(o.label || "empty"), 1)], 64)) : e.display === "chip" ? (d(), y(Q, {
      key: 1
    }, [o.chipSelectedItems ? (d(), y("span", Jt, E(o.label), 1)) : (d(!0), y(Q, {
      key: 1
    }, he(e.d_value, function(v) {
      return d(), y("span", u({
        key: o.getLabelByValue(v),
        class: e.cx("chipItem"),
        ref_for: !0
      }, e.ptm("chipItem")), [C(e.$slots, "chip", {
        value: v,
        removeCallback: function(M) {
          return o.removeOption(M, v);
        }
      }, function() {
        return [N(r, {
          class: H(e.cx("pcChip")),
          label: o.getLabelByValue(v),
          removeIcon: e.chipIcon || e.removeTokenIcon,
          removable: "",
          unstyled: e.unstyled,
          onRemove: function(M) {
            return o.removeOption(M, v);
          },
          pt: e.ptm("pcChip")
        }, {
          removeicon: V(function() {
            return [C(e.$slots, e.$slots.chipicon ? "chipicon" : "removetokenicon", {
              class: H(e.cx("chipIcon")),
              item: v,
              removeCallback: function(M) {
                return o.removeOption(M, v);
              }
            })];
          }),
          _: 2
        }, 1032, ["class", "label", "removeIcon", "unstyled", "onRemove", "pt"])];
      })], 16);
    }), 128)), !e.d_value || e.d_value.length === 0 ? (d(), y(Q, {
      key: 2
    }, [U(E(e.placeholder || "empty"), 1)], 64)) : x("", !0)], 64)) : x("", !0)];
  })], 16)], 16), o.isClearIconVisible ? C(e.$slots, "clearicon", {
    key: 0,
    class: H(e.cx("clearIcon")),
    clearCallback: o.onClearClick
  }, function() {
    return [(d(), L(B(e.clearIcon ? "i" : "TimesIcon"), u({
      ref: "clearIcon",
      class: [e.cx("clearIcon"), e.clearIcon],
      onClick: o.onClearClick
    }, e.ptm("clearIcon"), {
      "data-pc-section": "clearicon"
    }), null, 16, ["class", "onClick"]))];
  }) : x("", !0), K("div", u({
    class: e.cx("dropdown")
  }, e.ptm("dropdown")), [e.loading ? C(e.$slots, "loadingicon", {
    key: 0,
    class: H(e.cx("loadingIcon"))
  }, function() {
    return [e.loadingIcon ? (d(), y("span", u({
      key: 0,
      class: [e.cx("loadingIcon"), "pi-spin", e.loadingIcon],
      "aria-hidden": "true"
    }, e.ptm("loadingIcon")), null, 16)) : (d(), L(s, u({
      key: 1,
      class: e.cx("loadingIcon"),
      spin: "",
      "aria-hidden": "true"
    }, e.ptm("loadingIcon")), null, 16, ["class"]))];
  }) : C(e.$slots, "dropdownicon", {
    key: 1,
    class: H(e.cx("dropdownIcon"))
  }, function() {
    return [(d(), L(B(e.dropdownIcon ? "span" : "ChevronDownIcon"), u({
      class: [e.cx("dropdownIcon"), e.dropdownIcon],
      "aria-hidden": "true"
    }, e.ptm("dropdownIcon")), null, 16, ["class"]))];
  })], 16), N(z, {
    appendTo: e.appendTo
  }, {
    default: V(function() {
      return [N(It, u({
        name: "p-connected-overlay",
        onEnter: o.onOverlayEnter,
        onAfterEnter: o.onOverlayAfterEnter,
        onLeave: o.onOverlayLeave,
        onAfterLeave: o.onOverlayAfterLeave
      }, e.ptm("transition")), {
        default: V(function() {
          return [l.overlayVisible ? (d(), y("div", u({
            key: 0,
            ref: o.overlayRef,
            style: [e.panelStyle, e.overlayStyle],
            class: [e.cx("overlay"), e.panelClass, e.overlayClass],
            onClick: t[5] || (t[5] = function() {
              return o.onOverlayClick && o.onOverlayClick.apply(o, arguments);
            }),
            onKeydown: t[6] || (t[6] = function() {
              return o.onOverlayKeyDown && o.onOverlayKeyDown.apply(o, arguments);
            })
          }, e.ptm("overlay")), [K("span", u({
            ref: "firstHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            class: "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: t[3] || (t[3] = function() {
              return o.onFirstHiddenFocus && o.onFirstHiddenFocus.apply(o, arguments);
            })
          }, e.ptm("hiddenFirstFocusableEl"), {
            "data-p-hidden-accessible": !0,
            "data-p-hidden-focusable": !0
          }), null, 16), C(e.$slots, "header", {
            value: e.d_value,
            options: o.visibleOptions
          }), e.showToggleAll && e.selectionLimit == null || e.filter ? (d(), y("div", u({
            key: 0,
            class: e.cx("header")
          }, e.ptm("header")), [e.showToggleAll && e.selectionLimit == null ? (d(), L(c, {
            key: 0,
            modelValue: o.allSelected,
            binary: !0,
            disabled: e.disabled,
            variant: e.variant,
            "aria-label": o.toggleAllAriaLabel,
            onChange: o.onToggleAll,
            unstyled: e.unstyled,
            pt: o.getHeaderCheckboxPTOptions("pcHeaderCheckbox")
          }, {
            icon: V(function(v) {
              return [e.$slots.headercheckboxicon ? (d(), L(B(e.$slots.headercheckboxicon), {
                key: 0,
                checked: v.checked,
                class: H(v.class)
              }, null, 8, ["checked", "class"])) : v.checked ? (d(), L(B(e.checkboxIcon ? "span" : "CheckIcon"), u({
                key: 1,
                class: [v.class, Te({}, e.checkboxIcon, v.checked)]
              }, o.getHeaderCheckboxPTOptions("pcHeaderCheckbox.icon")), null, 16, ["class"])) : x("", !0)];
            }),
            _: 1
          }, 8, ["modelValue", "disabled", "variant", "aria-label", "onChange", "unstyled", "pt"])) : x("", !0), e.filter ? (d(), L(W, {
            key: 1,
            class: H(e.cx("pcFilterContainer")),
            unstyled: e.unstyled,
            pt: e.ptm("pcFilterContainer")
          }, {
            default: V(function() {
              return [N(O, {
                ref: "filterInput",
                value: l.filterValue,
                onVnodeMounted: o.onFilterUpdated,
                onVnodeUpdated: o.onFilterUpdated,
                class: H(e.cx("pcFilter")),
                placeholder: e.filterPlaceholder,
                disabled: e.disabled,
                variant: e.variant,
                unstyled: e.unstyled,
                role: "searchbox",
                autocomplete: "off",
                "aria-owns": l.id + "_list",
                "aria-activedescendant": o.focusedOptionId,
                onKeydown: o.onFilterKeyDown,
                onBlur: o.onFilterBlur,
                onInput: o.onFilterChange,
                pt: e.ptm("pcFilter")
              }, null, 8, ["value", "onVnodeMounted", "onVnodeUpdated", "class", "placeholder", "disabled", "variant", "unstyled", "aria-owns", "aria-activedescendant", "onKeydown", "onBlur", "onInput", "pt"]), N(w, {
                unstyled: e.unstyled,
                pt: e.ptm("pcFilterIconContainer")
              }, {
                default: V(function() {
                  return [C(e.$slots, "filtericon", {}, function() {
                    return [e.filterIcon ? (d(), y("span", u({
                      key: 0,
                      class: e.filterIcon
                    }, e.ptm("filterIcon")), null, 16)) : (d(), L(I, St(u({
                      key: 1
                    }, e.ptm("filterIcon"))), null, 16))];
                  })];
                }),
                _: 3
              }, 8, ["unstyled", "pt"])];
            }),
            _: 3
          }, 8, ["class", "unstyled", "pt"])) : x("", !0), e.filter ? (d(), y("span", u({
            key: 2,
            role: "status",
            "aria-live": "polite",
            class: "p-hidden-accessible"
          }, e.ptm("hiddenFilterResult"), {
            "data-p-hidden-accessible": !0
          }), E(o.filterResultMessageText), 17)) : x("", !0)], 16)) : x("", !0), K("div", u({
            class: e.cx("listContainer"),
            style: {
              "max-height": o.virtualScrollerDisabled ? e.scrollHeight : ""
            }
          }, e.ptm("listContainer")), [N(P, u({
            ref: o.virtualScrollerRef
          }, e.virtualScrollerOptions, {
            items: o.visibleOptions,
            style: {
              height: e.scrollHeight
            },
            tabindex: -1,
            disabled: o.virtualScrollerDisabled,
            pt: e.ptm("virtualScroller")
          }), De({
            content: V(function(v) {
              var $ = v.styleClass, M = v.contentRef, S = v.items, k = v.getItemOptions, A = v.contentStyle, T = v.itemSize;
              return [K("ul", u({
                ref: function(b) {
                  return o.listRef(b, M);
                },
                id: l.id + "_list",
                class: [e.cx("list"), $],
                style: A,
                role: "listbox",
                "aria-multiselectable": "true",
                "aria-label": o.listAriaLabel
              }, e.ptm("list")), [(d(!0), y(Q, null, he(S, function(m, b) {
                return d(), y(Q, {
                  key: o.getOptionRenderKey(m, o.getOptionIndex(b, k))
                }, [o.isOptionGroup(m) ? (d(), y("li", u({
                  key: 0,
                  id: l.id + "_" + o.getOptionIndex(b, k),
                  style: {
                    height: T ? T + "px" : void 0
                  },
                  class: e.cx("optionGroup"),
                  role: "option",
                  ref_for: !0
                }, e.ptm("optionGroup")), [C(e.$slots, "optiongroup", {
                  option: m.optionGroup,
                  index: o.getOptionIndex(b, k)
                }, function() {
                  return [U(E(o.getOptionGroupLabel(m.optionGroup)), 1)];
                })], 16, Xt)) : Ee((d(), y("li", u({
                  key: 1,
                  id: l.id + "_" + o.getOptionIndex(b, k),
                  style: {
                    height: T ? T + "px" : void 0
                  },
                  class: e.cx("option", {
                    option: m,
                    index: b,
                    getItemOptions: k
                  }),
                  role: "option",
                  "aria-label": o.getOptionLabel(m),
                  "aria-selected": o.isSelected(m),
                  "aria-disabled": o.isOptionDisabled(m),
                  "aria-setsize": o.ariaSetSize,
                  "aria-posinset": o.getAriaPosInset(o.getOptionIndex(b, k)),
                  onClick: function(f) {
                    return o.onOptionSelect(f, m, o.getOptionIndex(b, k), !0);
                  },
                  onMousemove: function(f) {
                    return o.onOptionMouseMove(f, o.getOptionIndex(b, k));
                  },
                  ref_for: !0
                }, o.getCheckboxPTOptions(m, k, b, "option"), {
                  "data-p-selected": o.isSelected(m),
                  "data-p-focused": l.focusedOptionIndex === o.getOptionIndex(b, k),
                  "data-p-disabled": o.isOptionDisabled(m)
                }), [N(c, {
                  defaultValue: o.isSelected(m),
                  binary: !0,
                  tabindex: -1,
                  variant: e.variant,
                  unstyled: e.unstyled,
                  pt: o.getCheckboxPTOptions(m, k, b, "pcOptionCheckbox")
                }, {
                  icon: V(function(D) {
                    return [e.$slots.optioncheckboxicon || e.$slots.itemcheckboxicon ? (d(), L(B(e.$slots.optioncheckboxicon || e.$slots.itemcheckboxicon), {
                      key: 0,
                      checked: D.checked,
                      class: H(D.class)
                    }, null, 8, ["checked", "class"])) : D.checked ? (d(), L(B(e.checkboxIcon ? "span" : "CheckIcon"), u({
                      key: 1,
                      class: [D.class, Te({}, e.checkboxIcon, D.checked)],
                      ref_for: !0
                    }, o.getCheckboxPTOptions(m, k, b, "pcOptionCheckbox.icon")), null, 16, ["class"])) : x("", !0)];
                  }),
                  _: 2
                }, 1032, ["defaultValue", "variant", "unstyled", "pt"]), C(e.$slots, "option", {
                  option: m,
                  selected: o.isSelected(m),
                  index: o.getOptionIndex(b, k)
                }, function() {
                  return [K("span", u({
                    ref_for: !0
                  }, e.ptm("optionLabel")), E(o.getOptionLabel(m)), 17)];
                })], 16, _t)), [[F]])], 64);
              }), 128)), l.filterValue && (!S || S && S.length === 0) ? (d(), y("li", u({
                key: 0,
                class: e.cx("emptyMessage"),
                role: "option"
              }, e.ptm("emptyMessage")), [C(e.$slots, "emptyfilter", {}, function() {
                return [U(E(o.emptyFilterMessageText), 1)];
              })], 16)) : !e.options || e.options && e.options.length === 0 ? (d(), y("li", u({
                key: 1,
                class: e.cx("emptyMessage"),
                role: "option"
              }, e.ptm("emptyMessage")), [C(e.$slots, "empty", {}, function() {
                return [U(E(o.emptyMessageText), 1)];
              })], 16)) : x("", !0)], 16, Qt)];
            }),
            _: 2
          }, [e.$slots.loader ? {
            name: "loader",
            fn: V(function(v) {
              var $ = v.options;
              return [C(e.$slots, "loader", {
                options: $
              })];
            }),
            key: "0"
          } : void 0]), 1040, ["items", "style", "disabled", "pt"])], 16), C(e.$slots, "footer", {
            value: e.d_value,
            options: o.visibleOptions
          }), !e.options || e.options && e.options.length === 0 ? (d(), y("span", u({
            key: 1,
            role: "status",
            "aria-live": "polite",
            class: "p-hidden-accessible"
          }, e.ptm("hiddenEmptyMessage"), {
            "data-p-hidden-accessible": !0
          }), E(o.emptyMessageText), 17)) : x("", !0), K("span", u({
            role: "status",
            "aria-live": "polite",
            class: "p-hidden-accessible"
          }, e.ptm("hiddenSelectedMessage"), {
            "data-p-hidden-accessible": !0
          }), E(o.selectedMessageText), 17), K("span", u({
            ref: "lastHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            class: "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: t[4] || (t[4] = function() {
              return o.onLastHiddenFocus && o.onLastHiddenFocus.apply(o, arguments);
            })
          }, e.ptm("hiddenLastFocusableEl"), {
            "data-p-hidden-accessible": !0,
            "data-p-hidden-focusable": !0
          }), null, 16)], 16)) : x("", !0)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16);
}
Re.render = en;
const tn = /* @__PURE__ */ te({
  __name: "InputMultiDropdown",
  props: {
    context: {}
  },
  emits: ["valueChange"],
  async setup(e, { emit: t }) {
    let n, i;
    const l = me("apiClient"), o = t, { options: r, cacheKey: s, dependsOn: c, bypassCache: O, createRoute: I, node: w, requestPropertyName: W = "recordId", requestMapper: P, cacheTimeout: z = 60 * 60 * 1e3 * 200, useLazy: F, responseOptionsKey: v = "options", optionsMapper: $, hideReload: M } = e.context, S = s || w.name, k = c ? oe(c) : ce({ value: null }), A = ve(() => {
      var p;
      return ((p = k.value) == null ? void 0 : p.value) ?? "default";
    });
    ye(A, (p) => {
      console.log("parent value changed", p), _(void 0), F || b.refetch();
    });
    const T = () => {
      var a;
      let p = S;
      return c && ((a = k.value) != null && a.value) && (p += `-${k.value.value}`), p;
    }, m = () => {
      var h;
      let p = {};
      const a = T();
      return c && ((h = k.value) != null && h.value) && (p[W] = k.value.value), P && (p = P(p)), Ce()(a, z, { options: r, request: p, bypassCache: O, apiClient: l, optionsMapper: $, responseOptionsKey: v });
    }, b = Se({
      queryKey: [S, A.value],
      queryFn: m,
      retry: (p, a) => {
        const h = le(v);
        return a.message == h.not_defined.message || a.message == h.not_array.message ? !1 : p < 3;
      },
      enabled: !F && r !== void 0,
      refetchOnWindowFocus: !1,
      staleTime: z
    }), D = () => new Promise((p) => {
      const a = { ...e.context };
      return Array.isArray(r) || (a.optionLabel = a.optionLabel || "label", a.optionValue = a.optionValue ? a.optionValue : e.context.convertToFlat ? a.optionLabel : "value", a.placeholder = e.context.node.props.placeholder), (!F || typeof w.value < "u") && b.refetch(), p(a);
    }), f = () => {
      var p;
      !F || !r || (p = b.data.value) != null && p.length && !c || b.refetch();
    }, _ = (p) => {
      Z.value !== p && (Z.value = p, o("valueChange", p));
    }, Z = ce(w.value), Y = () => {
      we(T()), b.refetch();
    }, j = ([n, i] = Oe(() => D()), n = await n, i(), n), ne = () => g(Re, {
      pt: { overlay: "z-2000" },
      ...j,
      modelValue: Z.value,
      "onUpdate:modelValue": _,
      loading: b.isLoading.value || b.isFetching.value,
      options: b.data.value,
      onBeforeShow: f
    }, {
      header: (p) => g("div", { class: "select-header" }, [
        M ? void 0 : g(ee, { action: Y, label: "reload", icon: "reload" }),
        I ? g(ee, { action: I, label: "create", icon: "plus" }) : void 0
      ]),
      option: ({ option: p, selected: a }) => b.isLoading.value || b.isFetching.value ? g("h2", "Loading...") : b.error.value ? g("h2", { class: "text-red-500" }, `Error: ${b.error.value.message}`) : g("div", {
        class: `flex items-center ${a ? "selected" : ""}`
      }, [
        p.icon ? g(ke, { icon: p.icon }) : void 0,
        typeof j.optionLabel == "string" && p[j.optionLabel] ? g("span", p[j.optionLabel]) : void 0,
        "note" in p ? g("span", p.note) : void 0
      ]),
      empty: () => b.isLoading.value || b.isFetching.value ? g("h2", "Loading...") : b.error.value ? g("h2", { class: "text-red-500" }, `Error: ${b.error.value.message}`) : g("h2", "No options available")
    });
    return (p, a) => (d(), L(B(ne)));
  }
});
var nn = function(t) {
  var n = t.dt;
  return `
.p-togglebutton {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    color: `.concat(n("togglebutton.color"), `;
    background: `).concat(n("togglebutton.background"), `;
    border: 1px solid `).concat(n("togglebutton.border.color"), `;
    padding: `).concat(n("togglebutton.padding"), `;
    font-size: 1rem;
    font-family: inherit;
    font-feature-settings: inherit;
    transition: background `).concat(n("togglebutton.transition.duration"), ", color ").concat(n("togglebutton.transition.duration"), ", border-color ").concat(n("togglebutton.transition.duration"), `,
        outline-color `).concat(n("togglebutton.transition.duration"), ", box-shadow ").concat(n("togglebutton.transition.duration"), `;
    border-radius: `).concat(n("togglebutton.border.radius"), `;
    outline-color: transparent;
    font-weight: `).concat(n("togglebutton.font.weight"), `;
}

.p-togglebutton-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: `).concat(n("togglebutton.gap"), `;
}

.p-togglebutton-label,
.p-togglebutton-icon {
    position: relative;
    transition: none;
}

.p-togglebutton::before {
    content: "";
    background: transparent;
    transition: background `).concat(n("togglebutton.transition.duration"), ", color ").concat(n("togglebutton.transition.duration"), ", border-color ").concat(n("togglebutton.transition.duration"), `,
            outline-color `).concat(n("togglebutton.transition.duration"), ", box-shadow ").concat(n("togglebutton.transition.duration"), `;
    position: absolute;
    inset-inline-start: `).concat(n("togglebutton.content.left"), `;
    inset-block-start: `).concat(n("togglebutton.content.top"), `;
    width: calc(100% - calc(2 * `).concat(n("togglebutton.content.left"), `));
    height: calc(100% - calc(2 * `).concat(n("togglebutton.content.top"), `));
    border-radius: `).concat(n("togglebutton.border.radius"), `;
}

.p-togglebutton.p-togglebutton-checked::before {
    background: `).concat(n("togglebutton.content.checked.background"), `;
    box-shadow: `).concat(n("togglebutton.content.checked.shadow"), `;
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
    background: `).concat(n("togglebutton.hover.background"), `;
    color: `).concat(n("togglebutton.hover.color"), `;
}

.p-togglebutton.p-togglebutton-checked {
    background: `).concat(n("togglebutton.checked.background"), `;
    border-color: `).concat(n("togglebutton.checked.border.color"), `;
    color: `).concat(n("togglebutton.checked.color"), `;
}

.p-togglebutton:focus-visible {
    box-shadow: `).concat(n("togglebutton.focus.ring.shadow"), `;
    outline: `).concat(n("togglebutton.focus.ring.width"), " ").concat(n("togglebutton.focus.ring.style"), " ").concat(n("togglebutton.focus.ring.color"), `;
    outline-offset: `).concat(n("togglebutton.focus.ring.offset"), `;
}

.p-togglebutton.p-invalid {
    border-color: `).concat(n("togglebutton.invalid.border.color"), `;
}

.p-togglebutton:disabled {
    opacity: 1;
    cursor: default;
    background: `).concat(n("togglebutton.disabled.background"), `;
    border-color: `).concat(n("togglebutton.disabled.border.color"), `;
    color: `).concat(n("togglebutton.disabled.color"), `;
}

.p-togglebutton-icon {
    color: `).concat(n("togglebutton.icon.color"), `;
}

.p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
    color: `).concat(n("togglebutton.icon.hover.color"), `;
}

.p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
    color: `).concat(n("togglebutton.icon.checked.color"), `;
}

.p-togglebutton:disabled .p-togglebutton-icon {
    color: `).concat(n("togglebutton.icon.disabled.color"), `;
}

.p-togglebutton-sm {
    padding: `).concat(n("togglebutton.sm.padding"), `;
    font-size: `).concat(n("togglebutton.sm.font.size"), `;
}

.p-togglebutton-lg {
    padding: `).concat(n("togglebutton.lg.padding"), `;
    font-size: `).concat(n("togglebutton.lg.font.size"), `;
}
`);
}, on = {
  root: function(t) {
    var n = t.instance, i = t.props;
    return ["p-togglebutton p-component", {
      "p-togglebutton-checked": n.active,
      "p-invalid": n.$invalid,
      "p-togglebutton-sm p-inputfield-sm": i.size === "small",
      "p-togglebutton-lg p-inputfield-lg": i.size === "large"
    }];
  },
  content: "p-togglebutton-content",
  icon: "p-togglebutton-icon",
  label: "p-togglebutton-label"
}, ln = ue.extend({
  name: "togglebutton",
  theme: nn,
  classes: on
}), an = {
  name: "BaseToggleButton",
  extends: Ke,
  props: {
    onIcon: String,
    offIcon: String,
    onLabel: {
      type: String,
      default: "Yes"
    },
    offLabel: {
      type: String,
      default: "No"
    },
    iconPos: {
      type: String,
      default: "left"
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    tabindex: {
      type: Number,
      default: null
    },
    ariaLabelledby: {
      type: String,
      default: null
    },
    ariaLabel: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  style: ln,
  provide: function() {
    return {
      $pcToggleButton: this,
      $parentInstance: this
    };
  }
}, He = {
  name: "ToggleButton",
  extends: an,
  inheritAttrs: !1,
  emits: ["change"],
  methods: {
    getPTOptions: function(t) {
      var n = t === "root" ? this.ptmi : this.ptm;
      return n(t, {
        context: {
          active: this.active,
          disabled: this.disabled
        }
      });
    },
    onChange: function(t) {
      !this.disabled && !this.readonly && (this.writeValue(!this.d_value, t), this.$emit("change", t));
    },
    onBlur: function(t) {
      var n, i;
      (n = (i = this.formField).onBlur) === null || n === void 0 || n.call(i, t);
    }
  },
  computed: {
    active: function() {
      return this.d_value === !0;
    },
    hasLabel: function() {
      return G(this.onLabel) && G(this.offLabel);
    },
    label: function() {
      return this.hasLabel ? this.d_value ? this.onLabel : this.offLabel : " ";
    }
  },
  directives: {
    ripple: be
  }
}, rn = ["tabindex", "disabled", "aria-pressed", "aria-labelledby", "data-p-checked", "data-p-disabled"];
function sn(e, t, n, i, l, o) {
  var r = Me("ripple");
  return Ee((d(), y("button", u({
    type: "button",
    class: e.cx("root"),
    tabindex: e.tabindex,
    disabled: e.disabled,
    "aria-pressed": e.d_value,
    onClick: t[0] || (t[0] = function() {
      return o.onChange && o.onChange.apply(o, arguments);
    }),
    onBlur: t[1] || (t[1] = function() {
      return o.onBlur && o.onBlur.apply(o, arguments);
    })
  }, o.getPTOptions("root"), {
    "aria-labelledby": e.ariaLabelledby,
    "data-p-checked": o.active,
    "data-p-disabled": e.disabled
  }), [K("span", u({
    class: e.cx("content")
  }, o.getPTOptions("content")), [C(e.$slots, "default", {}, function() {
    return [C(e.$slots, "icon", {
      value: e.d_value,
      class: H(e.cx("icon"))
    }, function() {
      return [e.onIcon || e.offIcon ? (d(), y("span", u({
        key: 0,
        class: [e.cx("icon"), e.d_value ? e.onIcon : e.offIcon]
      }, o.getPTOptions("icon")), null, 16)) : x("", !0)];
    }), K("span", u({
      class: e.cx("label")
    }, o.getPTOptions("label")), E(o.label), 17)];
  })], 16)], 16, rn)), [[r]]);
}
He.render = sn;
var cn = function(t) {
  var n = t.dt;
  return `
.p-selectbutton {
    display: inline-flex;
    user-select: none;
    vertical-align: bottom;
    outline-color: transparent;
    border-radius: `.concat(n("selectbutton.border.radius"), `;
}

.p-selectbutton .p-togglebutton {
    border-radius: 0;
    border-width: 1px 1px 1px 0;
}

.p-selectbutton .p-togglebutton:focus-visible {
    position: relative;
    z-index: 1;
}

.p-selectbutton .p-togglebutton:first-child {
    border-inline-start-width: 1px;
    border-start-start-radius: `).concat(n("selectbutton.border.radius"), `;
    border-end-start-radius: `).concat(n("selectbutton.border.radius"), `;
}

.p-selectbutton .p-togglebutton:last-child {
    border-start-end-radius: `).concat(n("selectbutton.border.radius"), `;
    border-end-end-radius: `).concat(n("selectbutton.border.radius"), `;
}

.p-selectbutton.p-invalid {
    outline: 1px solid `).concat(n("selectbutton.invalid.border.color"), `;
    outline-offset: 0;
}
`);
}, un = {
  root: function(t) {
    var n = t.instance;
    return ["p-selectbutton p-component", {
      "p-invalid": n.$invalid
      // @todo: check
    }];
  }
}, dn = ue.extend({
  name: "selectbutton",
  theme: cn,
  classes: un
}), pn = {
  name: "BaseSelectButton",
  extends: Ke,
  props: {
    options: Array,
    optionLabel: null,
    optionValue: null,
    optionDisabled: null,
    multiple: Boolean,
    allowEmpty: {
      type: Boolean,
      default: !0
    },
    dataKey: null,
    ariaLabelledby: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    }
  },
  style: dn,
  provide: function() {
    return {
      $pcSelectButton: this,
      $parentInstance: this
    };
  }
};
function hn(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!n) {
    if (Array.isArray(e) || (n = Ne(e)) || t) {
      n && (e = n);
      var i = 0, l = function() {
      };
      return { s: l, n: function() {
        return i >= e.length ? { done: !0 } : { done: !1, value: e[i++] };
      }, e: function(O) {
        throw O;
      }, f: l };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var o, r = !0, s = !1;
  return { s: function() {
    n = n.call(e);
  }, n: function() {
    var O = n.next();
    return r = O.done, O;
  }, e: function(O) {
    s = !0, o = O;
  }, f: function() {
    try {
      r || n.return == null || n.return();
    } finally {
      if (s) throw o;
    }
  } };
}
function fn(e) {
  return mn(e) || bn(e) || Ne(e) || gn();
}
function gn() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ne(e, t) {
  if (e) {
    if (typeof e == "string") return ge(e, t);
    var n = {}.toString.call(e).slice(8, -1);
    return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? ge(e, t) : void 0;
  }
}
function bn(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function mn(e) {
  if (Array.isArray(e)) return ge(e);
}
function ge(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, i = Array(t); n < t; n++) i[n] = e[n];
  return i;
}
var qe = {
  name: "SelectButton",
  extends: pn,
  inheritAttrs: !1,
  emits: ["change"],
  methods: {
    getOptionLabel: function(t) {
      return this.optionLabel ? q(t, this.optionLabel) : t;
    },
    getOptionValue: function(t) {
      return this.optionValue ? q(t, this.optionValue) : t;
    },
    getOptionRenderKey: function(t) {
      return this.dataKey ? q(t, this.dataKey) : this.getOptionLabel(t);
    },
    isOptionDisabled: function(t) {
      return this.optionDisabled ? q(t, this.optionDisabled) : !1;
    },
    onOptionSelect: function(t, n, i) {
      var l = this;
      if (!(this.disabled || this.isOptionDisabled(n))) {
        var o = this.isSelected(n);
        if (!(o && !this.allowEmpty)) {
          var r = this.getOptionValue(n), s;
          this.multiple ? o ? s = this.d_value.filter(function(c) {
            return !X(c, r, l.equalityKey);
          }) : s = this.d_value ? [].concat(fn(this.d_value), [r]) : [r] : s = o ? null : r, this.writeValue(s, t), this.$emit("change", {
            event: t,
            value: s
          });
        }
      }
    },
    isSelected: function(t) {
      var n = !1, i = this.getOptionValue(t);
      if (this.multiple) {
        if (this.d_value) {
          var l = hn(this.d_value), o;
          try {
            for (l.s(); !(o = l.n()).done; ) {
              var r = o.value;
              if (X(r, i, this.equalityKey)) {
                n = !0;
                break;
              }
            }
          } catch (s) {
            l.e(s);
          } finally {
            l.f();
          }
        }
      } else
        n = X(this.d_value, i, this.equalityKey);
      return n;
    }
  },
  computed: {
    equalityKey: function() {
      return this.optionValue ? null : this.dataKey;
    }
  },
  directives: {
    ripple: be
  },
  components: {
    ToggleButton: He
  }
}, vn = ["aria-labelledby"];
function yn(e, t, n, i, l, o) {
  var r = R("ToggleButton");
  return d(), y("div", u({
    class: e.cx("root"),
    role: "group",
    "aria-labelledby": e.ariaLabelledby
  }, e.ptmi("root")), [(d(!0), y(Q, null, he(e.options, function(s, c) {
    return d(), L(r, {
      key: o.getOptionRenderKey(s),
      modelValue: o.isSelected(s),
      onLabel: o.getOptionLabel(s),
      offLabel: o.getOptionLabel(s),
      disabled: e.disabled || o.isOptionDisabled(s),
      unstyled: e.unstyled,
      size: e.size,
      readonly: !e.allowEmpty && o.isSelected(s),
      onChange: function(I) {
        return o.onOptionSelect(I, s, c);
      },
      pt: e.ptm("pcToggleButton")
    }, De({
      _: 2
    }, [e.$slots.option ? {
      name: "default",
      fn: V(function() {
        return [C(e.$slots, "option", {
          option: s,
          index: c
        }, function() {
          return [K("span", u({
            ref_for: !0
          }, e.ptm("pcToggleButton").label), E(o.getOptionLabel(s)), 17)];
        })];
      }),
      key: "0"
    } : void 0]), 1032, ["modelValue", "onLabel", "offLabel", "disabled", "unstyled", "size", "readonly", "onChange", "pt"]);
  }), 128))], 16, vn);
}
qe.render = yn;
const On = /* @__PURE__ */ te({
  __name: "InputSelectButton",
  props: {
    context: {}
  },
  emits: ["valueChange"],
  async setup(e, { emit: t }) {
    let n, i;
    const l = me("apiClient"), o = t, {
      options: r,
      cacheKey: s,
      dependsOn: c,
      bypassCache: O,
      createRoute: I,
      node: w,
      requestPropertyName: W = "recordId",
      requestMapper: P,
      cacheTimeout: z = 60 * 60 * 1e3 * 200,
      useLazy: F,
      responseOptionsKey: v = "options",
      optionsMapper: $,
      hideReload: M
    } = e.context, S = ce(w.value), k = s || w.name, A = oe(w.name), T = c ? oe(c) : void 0, m = ve(
      () => {
        var a;
        return ((a = T == null ? void 0 : T.value) == null ? void 0 : a.value) ?? void 0;
      }
    );
    Ae(() => {
      A.value && (A.value.value ? A.value.value != S.value && (S.value = A.value.value) : S.value && (console.log("corm", S), S.value = null));
    }), ye(m, (a) => {
      console.log("parent value changed", a), Y(void 0), F || f.refetch();
    });
    const b = () => {
      let a = k;
      return c && m.value && (a += `-${m.value}`), a;
    }, D = () => {
      let a = {};
      const h = b();
      return c && m.value && (a[W] = m.value), P && (a = P(a)), Ce()(
        h,
        z,
        {
          options: r,
          request: a,
          bypassCache: O,
          apiClient: l,
          optionsMapper: $,
          responseOptionsKey: v
        }
      );
    }, f = Se({
      queryKey: [k, m.value],
      queryFn: D,
      retry: (a, h) => {
        const ie = le(v);
        return h.message == ie.not_defined.message || h.message == ie.not_array.message ? !1 : a < 3;
      },
      enabled: !F && r !== void 0,
      refetchOnWindowFocus: !1,
      staleTime: z
    }), _ = () => new Promise((a) => {
      const h = { ...e.context };
      return Array.isArray(r) || (h.optionLabel = h.optionLabel || "label", h.optionValue = h.optionValue ? h.optionValue : e.context.convertToFlat ? h.optionLabel : "value", h.placeholder = e.context.node.props.placeholder), (!F || typeof w.value < "u") && f.refetch(), a(h);
    }), Z = () => {
      var a;
      !F || !r || (a = f.data.value) != null && a.length && !c || f.refetch();
    }, Y = (a) => {
      S.value !== a && (S.value = a, o("valueChange", a));
    }, j = () => {
      we(b()), f.refetch();
    }, ne = () => g(
      qe,
      {
        ...p,
        modelValue: S.value,
        "onUpdate:modelValue": Y,
        loading: f.isLoading.value || f.isFetching.value,
        options: f.data.value,
        onBeforeShow: Z
      },
      {
        header: (a) => g("div", { class: "select-header" }, [
          M ? void 0 : g(ee, {
            action: j,
            label: "reload",
            icon: "reload"
          }),
          I ? g(ee, { action: I, label: "create", icon: "plus" }) : void 0
        ]),
        option: ({ option: a, selected: h }) => f.isLoading.value || f.isFetching.value ? g("h2", "Loading...") : f.error.value ? g(
          "h2",
          { class: "text-red-500" },
          `Error: ${f.error.value.message}`
        ) : g(
          "div",
          {
            class: `flex items-center ${h ? "selected" : ""}`
          },
          [
            a.icon ? g(ke, { icon: a.icon }) : void 0,
            typeof p.optionLabel == "string" && a[p.optionLabel] ? g("span", a[p.optionLabel]) : void 0,
            "note" in a ? g("span", a.note) : void 0
          ]
        ),
        empty: () => f.isLoading.value || f.isFetching.value ? g("h2", "Loading...") : f.error.value ? g(
          "h2",
          { class: "text-red-500" },
          `Error: ${f.error.value.message}`
        ) : g("h2", "No options available")
      }
    ), p = ([n, i] = Oe(() => _()), n = await n, i(), n);
    return (a, h) => (d(), L(B(ne)));
  }
}), Tn = /* @__PURE__ */ te({
  __name: "MultiDropdown",
  props: {
    context: {}
  },
  setup(e) {
    const t = e;
    return (n, i) => (d(), L(Ie, null, {
      fallback: V(() => i[0] || (i[0] = [
        U(" Loading... ")
      ])),
      default: V(() => [
        N(tn, u(t, {
          onValueChange: t.context.node.input
        }), null, 16, ["onValueChange"])
      ]),
      _: 1
    }));
  }
}), Kn = /* @__PURE__ */ te({
  __name: "SelectButton",
  props: {
    context: {}
  },
  setup(e) {
    const t = e;
    return (n, i) => (d(), L(Ie, null, {
      fallback: V(() => i[0] || (i[0] = [
        U(" Loading... ")
      ])),
      default: V(() => [
        N(On, u(t, {
          onValueChange: t.context.node.input
        }), null, 16, ["onValueChange"])
      ]),
      _: 1
    }));
  }
});
export {
  zn as Datepicker,
  Vn as Dropdown,
  Dn as FormBase,
  Rn as InputDatepicker,
  xt as InputDropdown,
  tn as InputMultiDropdown,
  On as InputSelectButton,
  Tn as MultiDropdown,
  Kn as SelectButton,
  we as clearOptionsCache,
  Sn as default,
  Lt as fetchCachedDropdownOptions,
  $e as fetchDropdownOptions,
  le as optionsErrorMessages,
  En as useAppFormStore,
  $n as useAppFormStoreWithKey,
  Bn as useAppFormStoreWithProps,
  Ct as useDebouncedOptionsFetcher,
  Ce as useMemoizedDropdownOptions
};
