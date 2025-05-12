import { d as Wa, R as _t, e as $t, f as Ba, s as Ra, o as Tn, g as Ja, h as Sa } from "./Datalist.vue_vue_type_script_setup_true_lang-D2aXan8r.mjs";
import { i as Uo, j as Qo } from "./Datalist.vue_vue_type_script_setup_true_lang-D2aXan8r.mjs";
import { shallowReactive as Ya, defineComponent as Je, inject as ae, resolveComponent as _, withAsyncContext as Fa, ref as oe, openBlock as V, createBlock as x, resolveDynamicComponent as de, h as f, onMounted as Ea, createElementBlock as H, Fragment as Me, createElementVNode as k, toDisplayString as le, unref as se, withCtx as L, createTextVNode as Ae, createCommentVNode as T, createVNode as U, mergeProps as W, renderSlot as ee, renderList as un, normalizeClass as ue, withKeys as Pn, normalizeProps as qt, Suspense as Na, guardReactiveProps as xa } from "vue";
import { d as we, s as za, B as el, a as pn, b as Ha, r as jn, c as nl, e as Ka, f as tl, R as Ma, g as wa } from "./devkit_admin-C2pYVXZW.mjs";
import { _ as Do, h as To } from "./devkit_admin-C2pYVXZW.mjs";
import { useToast as La, SelectButton as ka, MultiSelect as Ua } from "primevue";
import { useRoute as fn, useRouter as Qa } from "vue-router";
import { AppBtn as M, AppImage as ll, AppIcon as va } from "devkit-base-components";
import { useQueryClient as Da, useMutation as Ta } from "@tanstack/vue-query";
import { resolveApiEndpoint as j, ObjectKeys as Le } from "devkit-apiclient";
import "pinia";
import "@formkit/vue";
import { _ as Pa } from "./FileManager.vue_vue_type_script_setup_true_lang-tfHn_nw6.mjs";
function ja(e, n) {
  const l = Ya(/* @__PURE__ */ new Map()), a = (...g) => JSON.stringify(g), c = (g, ...m) => (l.set(g, e(...m)), l.get(g)), d = (...g) => c(a(...g), ...g), s = (...g) => {
    l.delete(a(...g));
  }, o = () => {
    l.clear();
  }, i = (...g) => {
    const m = a(...g);
    return l.has(m) ? l.get(m) : c(m, ...g);
  };
  return i.load = d, i.delete = s, i.clear = o, i.generateKey = a, i.cache = l, i;
}
const No = /* @__PURE__ */ Je({
  __name: "FormBase",
  props: {
    context: {}
  },
  async setup(e) {
    let n, t;
    const l = ae("dialogRef"), a = _("FormKitSchema"), c = Da(), d = _("FormKit"), s = ae("apiClient"), o = La(), i = e, { submitHandler: g, options: m, formKey: h, findHandler: u, invalidateCaches: I } = i.context, b = Wa(h), Z = fn(), E = (y) => {
      if (y != null)
        try {
          return JSON.parse(y);
        } catch (C) {
          $t(h), localStorage.removeItem(h), console.log("error parsing url", C);
        }
    }, A = () => {
      if (!i.context.useReset) return;
      const y = localStorage.getItem(h);
      return y ? E(y) : {};
    }, K = () => {
      if (!i.context.syncWithUrl) return;
      const y = _t(h);
      return y ? E(y) : {};
    }, z = () => {
      if (!i.context.syncWithUrl && !i.context.usePresist)
        return;
      if (i.context.usePresist) {
        const C = A();
        if (C && Le(C).length > 0)
          return b.formValueRef = C, C;
      }
      const y = K();
      if (y && Le(y).length > 0)
        return b.formValueRef = y, y;
    }, me = () => new Promise((y) => {
      if (!u)
        return y(null);
      const C = {}, Y = u.requestValue ? u.requestValue : Z.params[u.routerParamName || "id"];
      C[u.requestPropertyName] = Y, j(u.endpoint, s, C).then((F) => {
        if (u.responsePropertyName && u.responsePropertyName in F) {
          const D = F[u.responsePropertyName];
          if (typeof D == "object" && D)
            return y(D);
        }
        return y(F);
      }).catch((F) => {
        console.error("find handler failed", F), y(null);
      });
    }), be = ([n, t] = Fa(() => me()), n = await n, t(), n), p = Ta({
      mutationFn: (y) => new Promise((C, Y) => {
        if (typeof g.endpoint == "string" && !s) {
          Y("apiclient is not provided");
          return;
        }
        j(g.endpoint, s, y).then((F) => {
          C(F);
        }).catch((F) => {
          Y(F);
        });
      }),
      onSuccess: () => {
        g.redirectRoute && Dn(g.redirectRoute), I && (we.dropdownHelper.bulkDelete(I), c.invalidateQueries({
          queryKey: i.context.invalidateCaches
        }));
      }
    }), $ = (y) => typeof y == "object" && Array.isArray(y.inputs) && !Array.isArray(y), en = () => {
      const y = [], { sections: C } = i.context;
      for (let Y in C) {
        const F = C[Y];
        let D = "form-section";
        const q = !$(F), nn = {
          $el: "div",
          attrs: {
            class: q ? D : `${D} ${F.isTransparent ? " glass" : ""}`
          },
          children: q ? F : F.inputs
        };
        y.push(nn);
      }
      return y;
    }, Za = oe(!1), { push: Dn } = Qa();
    function ya(y) {
      const C = {}, Y = /-\s(\w+):\s(.+?)\s\[/g;
      let F;
      for (; (F = Y.exec(y)) !== null; ) {
        const [, D, q] = F;
        C[D] = q;
      }
      return C;
    }
    const pa = (y, C) => {
      console.log("error is here from handlerRrorrr methoed", C.message);
      try {
        const Y = JSON.parse(C.rawMessage);
        y.setErrors(Y.globalErrors, Y.fieldErrors), console.log(Y);
      } catch {
        console.log(C, "error from catch", ya(C)), y.setErrors([C.message]);
      }
    }, fa = (y, C) => {
      b.formValueRef = y, i.context.syncWithUrl && b.debouncedRouteQueryAppend();
      const Y = i.context.submitHandler, F = Y.mapFunction ? Y.mapFunction(y) : y;
      return new Promise((D) => {
        p.mutateAsync(F).then((q) => {
          const nn = "api_success_summary", Aa = "api_success_detail";
          if (i.context.resetOnSuccess && C.reset(), m && !m.isSuccessNotificationHidden) {
            const Xa = m.successMessageSummary ?? nn, Ca = m.successMessageDetail ?? Aa;
            o.add({ severity: "success", summary: Xa, detail: Ca, life: 3e3 });
          }
          g.callback && g.callback(q), Za.value || Y.redirectRoute && typeof Y.redirectRoute == "string" && Dn({ name: Y.redirectRoute }), l && l.value.close(), D(null);
        }).catch((q) => {
          console.log("error from the sbmithandler", q), pa(C, q), D(null);
        });
      });
    }, Va = () => f(
      d,
      {
        type: "form",
        id: i.context.formKey,
        onInput: i.context.invalidateCachesOnChage ? () => {
          c.invalidateQueries({ queryKey: i.context.invalidateCachesOnChage }), console.log("form updated");
        } : void 0,
        actions: !1,
        value: be || z(),
        onSubmit: fa
      },
      {
        default: () => [
          f(a, {
            id: i.context.formKey,
            schema: {
              $el: "div",
              attrs: {
                class: "schema-wrapper"
              },
              children: en()
            }
          }),
          f("div", { class: "custom-form-actions" }, i.context.submitHandler.hideActions ? void 0 : [
            f(M, { type: "submit", label: "submit", icon: "send" }),
            i.context.useClear ? f(M, { action: b.clearForm, label: "clear" }) : void 0,
            i.context.useReset ? f(M, { action: b.resetForm, label: "reset" }) : void 0,
            i.context.usePresist ? f(M, { action: b.presistForm, label: "presist" }) : void 0
          ])
        ]
      }
    );
    return (y, C) => (V(), x(de(Va())));
  }
}), xo = /* @__PURE__ */ Je({
  __name: "LoginForm",
  setup(e) {
    const n = ae("authHandler"), t = ae("apiClient"), l = (s, o) => {
      if (!["createdAt", "updatedAt", "deletedAt"].includes(s))
        return typeof o == "bigint" ? o.toString() : o;
    }, a = (s) => {
      s.navigationBar && localStorage.setItem("sidebar", JSON.stringify(s.navigationBar)), s.loginInfo && localStorage.setItem("token", s.loginInfo.accessToken), s.user && localStorage.setItem(
        "user_info",
        JSON.stringify(s.user, l)
      );
    }, c = {
      context: {
        title: "login",
        formKey: "login",
        options: {
          successMessageSummary: "logged in"
        },
        submitHandler: {
          endpoint: n ? n.login : "",
          redirectRoute: {
            path: "/"
          },
          callback: a
        },
        sections: {
          login: {
            inputs: [
              {
                $formkit: "text",
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "loginCode",
                validation: "required",
                placeholder: "user name",
                label: "userName"
              },
              {
                $formkit: "text",
                prefixIcon: "tools",
                outerClass: "col-12 sm:col-6 md:col-5",
                name: "userPassword",
                validation: "required",
                placeholder: "password",
                label: "password"
              }
            ]
          }
        }
      }
    };
    fn(), Ea(() => {
      if (!n) return;
      const s = window.location.hash.substring(1), i = new URLSearchParams(s).get("access_token");
      i && n.providerLoginCallback && j(n.providerLoginCallback, t, {
        accessToken: i
      }).then(a), console.log("routequery is", i), console.log("mounted changed");
    });
    const d = async (s) => {
      if (!(n != null && n.providerLogin)) return;
      const o = {
        provider: s,
        redirectUrl: "http://localhost:5173/provider-login"
      }, { url: i } = await j(
        n.providerLogin,
        t,
        o
      );
      window.open(i, "_blank"), console.log("url is ", i);
    };
    return (s, o) => {
      const i = _("Message");
      return V(), H(Me, null, [
        k("h2", null, "hello authHandler " + le(se(n)), 1),
        se(n) ? T("", !0) : (V(), x(i, {
          key: 0,
          severity: "error"
        }, {
          default: L(() => [
            Ae(le(s.$t("provide auth handler")), 1)
          ]),
          _: 1
        })),
        U(se(Ba), {
          context: c.context
        }, null, 8, ["context"]),
        U(se(M), {
          icon: "google",
          label: "login by google",
          action: () => d("google")
        }, null, 8, ["action"])
      ], 64);
    };
  }
});
var al = {
  name: "UploadIcon",
  extends: za
};
function Oa(e, n, t, l, a, c) {
  return V(), H("svg", W({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, e.pti()), n[0] || (n[0] = [k("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M6.58942 9.82197C6.70165 9.93405 6.85328 9.99793 7.012 10C7.17071 9.99793 7.32234 9.93405 7.43458 9.82197C7.54681 9.7099 7.61079 9.55849 7.61286 9.4V2.04798L9.79204 4.22402C9.84752 4.28011 9.91365 4.32457 9.98657 4.35479C10.0595 4.38502 10.1377 4.40039 10.2167 4.40002C10.2956 4.40039 10.3738 4.38502 10.4467 4.35479C10.5197 4.32457 10.5858 4.28011 10.6413 4.22402C10.7538 4.11152 10.817 3.95902 10.817 3.80002C10.817 3.64102 10.7538 3.48852 10.6413 3.37602L7.45127 0.190618C7.44656 0.185584 7.44176 0.180622 7.43687 0.175736C7.32419 0.063214 7.17136 0 7.012 0C6.85264 0 6.69981 0.063214 6.58712 0.175736C6.58181 0.181045 6.5766 0.186443 6.5715 0.191927L3.38282 3.37602C3.27669 3.48976 3.2189 3.6402 3.22165 3.79564C3.2244 3.95108 3.28746 4.09939 3.39755 4.20932C3.50764 4.31925 3.65616 4.38222 3.81182 4.38496C3.96749 4.3877 4.11814 4.33001 4.23204 4.22402L6.41113 2.04807V9.4C6.41321 9.55849 6.47718 9.7099 6.58942 9.82197ZM11.9952 14H2.02883C1.751 13.9887 1.47813 13.9228 1.22584 13.8061C0.973545 13.6894 0.746779 13.5241 0.558517 13.3197C0.370254 13.1154 0.22419 12.876 0.128681 12.6152C0.0331723 12.3545 -0.00990605 12.0775 0.0019109 11.8V9.40005C0.0019109 9.24092 0.065216 9.08831 0.1779 8.97579C0.290584 8.86326 0.443416 8.80005 0.602775 8.80005C0.762134 8.80005 0.914966 8.86326 1.02765 8.97579C1.14033 9.08831 1.20364 9.24092 1.20364 9.40005V11.8C1.18295 12.0376 1.25463 12.274 1.40379 12.4602C1.55296 12.6463 1.76817 12.7681 2.00479 12.8H11.9952C12.2318 12.7681 12.447 12.6463 12.5962 12.4602C12.7453 12.274 12.817 12.0376 12.7963 11.8V9.40005C12.7963 9.24092 12.8596 9.08831 12.9723 8.97579C13.085 8.86326 13.2378 8.80005 13.3972 8.80005C13.5565 8.80005 13.7094 8.86326 13.8221 8.97579C13.9347 9.08831 13.998 9.24092 13.998 9.40005V11.8C14.022 12.3563 13.8251 12.8996 13.45 13.3116C13.0749 13.7236 12.552 13.971 11.9952 14Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
al.render = Oa;
var _a = function(n) {
  var t = n.dt;
  return `
.p-progressbar {
    position: relative;
    overflow: hidden;
    height: `.concat(t("progressbar.height"), `;
    background: `).concat(t("progressbar.background"), `;
    border-radius: `).concat(t("progressbar.border.radius"), `;
}

.p-progressbar-value {
    margin: 0;
    background: `).concat(t("progressbar.value.background"), `;
}

.p-progressbar-label {
    color: `).concat(t("progressbar.label.color"), `;
    font-size: `).concat(t("progressbar.label.font.size"), `;
    font-weight: `).concat(t("progressbar.label.font.weight"), `;
}

.p-progressbar-determinate .p-progressbar-value {
    height: 100%;
    width: 0%;
    position: absolute;
    display: none;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: width 1s ease-in-out;
}

.p-progressbar-determinate .p-progressbar-label {
    display: inline-flex;
}

.p-progressbar-indeterminate .p-progressbar-value::before {
    content: "";
    position: absolute;
    background: inherit;
    inset-block-start: 0;
    inset-inline-start: 0;
    inset-block-end: 0;
    will-change: inset-inline-start, inset-inline-end;
    animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.p-progressbar-indeterminate .p-progressbar-value::after {
    content: "";
    position: absolute;
    background: inherit;
    inset-block-start: 0;
    inset-inline-start: 0;
    inset-block-end: 0;
    will-change: inset-inline-start, inset-inline-end;
    animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
}

@keyframes p-progressbar-indeterminate-anim {
    0% {
        inset-inline-start: -35%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
    100% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
}
@-webkit-keyframes p-progressbar-indeterminate-anim {
    0% {
        inset-inline-start: -35%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
    100% {
        inset-inline-start: 100%;
        inset-inline-end: -90%;
    }
}

@keyframes p-progressbar-indeterminate-anim-short {
    0% {
        inset-inline-start: -200%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
    100% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
}
@-webkit-keyframes p-progressbar-indeterminate-anim-short {
    0% {
        inset-inline-start: -200%;
        inset-inline-end: 100%;
    }
    60% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
    100% {
        inset-inline-start: 107%;
        inset-inline-end: -8%;
    }
}
`);
}, $a = {
  root: function(n) {
    var t = n.instance;
    return ["p-progressbar p-component", {
      "p-progressbar-determinate": t.determinate,
      "p-progressbar-indeterminate": t.indeterminate
    }];
  },
  value: "p-progressbar-value",
  label: "p-progressbar-label"
}, qa = el.extend({
  name: "progressbar",
  theme: _a,
  classes: $a
}), ec = {
  name: "BaseProgressBar",
  extends: pn,
  props: {
    value: {
      type: Number,
      default: null
    },
    mode: {
      type: String,
      default: "determinate"
    },
    showValue: {
      type: Boolean,
      default: !0
    }
  },
  style: qa,
  provide: function() {
    return {
      $pcProgressBar: this,
      $parentInstance: this
    };
  }
}, cl = {
  name: "ProgressBar",
  extends: ec,
  inheritAttrs: !1,
  computed: {
    progressStyle: function() {
      return {
        width: this.value + "%",
        display: "flex"
      };
    },
    indeterminate: function() {
      return this.mode === "indeterminate";
    },
    determinate: function() {
      return this.mode === "determinate";
    }
  }
}, nc = ["aria-valuenow"];
function tc(e, n, t, l, a, c) {
  return V(), H("div", W({
    role: "progressbar",
    class: e.cx("root"),
    "aria-valuemin": "0",
    "aria-valuenow": e.value,
    "aria-valuemax": "100"
  }, e.ptmi("root")), [c.determinate ? (V(), H("div", W({
    key: 0,
    class: e.cx("value"),
    style: c.progressStyle
  }, e.ptm("value")), [e.value != null && e.value !== 0 && e.showValue ? (V(), H("div", W({
    key: 0,
    class: e.cx("label")
  }, e.ptm("label")), [ee(e.$slots, "default", {}, function() {
    return [Ae(le(e.value + "%"), 1)];
  })], 16)) : T("", !0)], 16)) : c.indeterminate ? (V(), H("div", W({
    key: 1,
    class: e.cx("value")
  }, e.ptm("value")), null, 16)) : T("", !0)], 16, nc);
}
cl.render = tc;
var lc = function(n) {
  var t = n.dt;
  return `
.p-fileupload input[type="file"] {
    display: none;
}

.p-fileupload-advanced {
    border: 1px solid `.concat(t("fileupload.border.color"), `;
    border-radius: `).concat(t("fileupload.border.radius"), `;
    background: `).concat(t("fileupload.background"), `;
    color: `).concat(t("fileupload.color"), `;
}

.p-fileupload-header {
    display: flex;
    align-items: center;
    padding: `).concat(t("fileupload.header.padding"), `;
    background: `).concat(t("fileupload.header.background"), `;
    color: `).concat(t("fileupload.header.color"), `;
    border-style: solid;
    border-width: `).concat(t("fileupload.header.border.width"), `;
    border-color: `).concat(t("fileupload.header.border.color"), `;
    border-radius: `).concat(t("fileupload.header.border.radius"), `;
    gap: `).concat(t("fileupload.header.gap"), `;
}

.p-fileupload-content {
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    gap: `).concat(t("fileupload.content.gap"), `;
    transition: border-color `).concat(t("fileupload.transition.duration"), `;
    padding: `).concat(t("fileupload.content.padding"), `;
}

.p-fileupload-content .p-progressbar {
    width: 100%;
    height: `).concat(t("fileupload.progressbar.height"), `;
}

.p-fileupload-file-list {
    display: flex;
    flex-direction: column;
    gap: `).concat(t("fileupload.filelist.gap"), `;
}

.p-fileupload-file {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: `).concat(t("fileupload.file.padding"), `;
    border-block-end: 1px solid `).concat(t("fileupload.file.border.color"), `;
    gap: `).concat(t("fileupload.file.gap"), `;
}

.p-fileupload-file:last-child {
    border-block-end: 0;
}

.p-fileupload-file-info {
    display: flex;
    flex-direction: column;
    gap: `).concat(t("fileupload.file.info.gap"), `;
}

.p-fileupload-file-thumbnail {
    flex-shrink: 0;
}

.p-fileupload-file-actions {
    margin-inline-start: auto;
}

.p-fileupload-highlight {
    border: 1px dashed `).concat(t("fileupload.content.highlight.border.color"), `;
}

.p-fileupload-basic {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: `).concat(t("fileupload.basic.gap"), `;
}
`);
}, ac = {
  root: function(n) {
    var t = n.props;
    return ["p-fileupload p-fileupload-".concat(t.mode, " p-component")];
  },
  header: "p-fileupload-header",
  pcChooseButton: "p-fileupload-choose-button",
  pcUploadButton: "p-fileupload-upload-button",
  pcCancelButton: "p-fileupload-cancel-button",
  content: "p-fileupload-content",
  fileList: "p-fileupload-file-list",
  file: "p-fileupload-file",
  fileThumbnail: "p-fileupload-file-thumbnail",
  fileInfo: "p-fileupload-file-info",
  fileName: "p-fileupload-file-name",
  fileSize: "p-fileupload-file-size",
  pcFileBadge: "p-fileupload-file-badge",
  fileActions: "p-fileupload-file-actions",
  pcFileRemoveButton: "p-fileupload-file-remove-button"
}, cc = el.extend({
  name: "fileupload",
  theme: lc,
  classes: ac
}), dc = {
  name: "BaseFileUpload",
  extends: pn,
  props: {
    name: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    mode: {
      type: String,
      default: "advanced"
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    accept: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    auto: {
      type: Boolean,
      default: !1
    },
    maxFileSize: {
      type: Number,
      default: null
    },
    invalidFileSizeMessage: {
      type: String,
      default: "{0}: Invalid file size, file size should be smaller than {1}."
    },
    invalidFileTypeMessage: {
      type: String,
      default: "{0}: Invalid file type, allowed file types: {1}."
    },
    fileLimit: {
      type: Number,
      default: null
    },
    invalidFileLimitMessage: {
      type: String,
      default: "Maximum number of files exceeded, limit is {0} at most."
    },
    withCredentials: {
      type: Boolean,
      default: !1
    },
    previewWidth: {
      type: Number,
      default: 50
    },
    chooseLabel: {
      type: String,
      default: null
    },
    uploadLabel: {
      type: String,
      default: null
    },
    cancelLabel: {
      type: String,
      default: null
    },
    customUpload: {
      type: Boolean,
      default: !1
    },
    showUploadButton: {
      type: Boolean,
      default: !0
    },
    showCancelButton: {
      type: Boolean,
      default: !0
    },
    chooseIcon: {
      type: String,
      default: void 0
    },
    uploadIcon: {
      type: String,
      default: void 0
    },
    cancelIcon: {
      type: String,
      default: void 0
    },
    style: null,
    class: null,
    chooseButtonProps: {
      type: null,
      default: null
    },
    uploadButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary"
        };
      }
    },
    cancelButtonProps: {
      type: Object,
      default: function() {
        return {
          severity: "secondary"
        };
      }
    }
  },
  style: cc,
  provide: function() {
    return {
      $pcFileUpload: this,
      $parentInstance: this
    };
  }
}, dl = {
  name: "FileContent",
  hostName: "FileUpload",
  extends: pn,
  emits: ["remove"],
  props: {
    files: {
      type: Array,
      default: function() {
        return [];
      }
    },
    badgeSeverity: {
      type: String,
      default: "warn"
    },
    badgeValue: {
      type: String,
      default: null
    },
    previewWidth: {
      type: Number,
      default: 50
    },
    templates: {
      type: null,
      default: null
    }
  },
  methods: {
    formatSize: function(n) {
      var t, l = 1024, a = 3, c = ((t = this.$primevue.config.locale) === null || t === void 0 ? void 0 : t.fileSizeTypes) || ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      if (n === 0)
        return "0 ".concat(c[0]);
      var d = Math.floor(Math.log(n) / Math.log(l)), s = parseFloat((n / Math.pow(l, d)).toFixed(a));
      return "".concat(s, " ").concat(c[d]);
    }
  },
  components: {
    Button: nl,
    Badge: wa,
    TimesIcon: tl
  }
}, sc = ["alt", "src", "width"];
function oc(e, n, t, l, a, c) {
  var d = _("Badge"), s = _("TimesIcon"), o = _("Button");
  return V(!0), H(Me, null, un(t.files, function(i, g) {
    return V(), H("div", W({
      key: i.name + i.type + i.size,
      class: e.cx("file"),
      ref_for: !0
    }, e.ptm("file")), [k("img", W({
      role: "presentation",
      class: e.cx("fileThumbnail"),
      alt: i.name,
      src: i.objectURL,
      width: t.previewWidth,
      ref_for: !0
    }, e.ptm("fileThumbnail")), null, 16, sc), k("div", W({
      class: e.cx("fileInfo"),
      ref_for: !0
    }, e.ptm("fileInfo")), [k("div", W({
      class: e.cx("fileName"),
      ref_for: !0
    }, e.ptm("fileName")), le(i.name), 17), k("span", W({
      class: e.cx("fileSize"),
      ref_for: !0
    }, e.ptm("fileSize")), le(c.formatSize(i.size)), 17)], 16), U(d, {
      value: t.badgeValue,
      class: ue(e.cx("pcFileBadge")),
      severity: t.badgeSeverity,
      unstyled: e.unstyled,
      pt: e.ptm("pcFileBadge")
    }, null, 8, ["value", "class", "severity", "unstyled", "pt"]), k("div", W({
      class: e.cx("fileActions"),
      ref_for: !0
    }, e.ptm("fileActions")), [U(o, {
      onClick: function(h) {
        return e.$emit("remove", g);
      },
      text: "",
      rounded: "",
      severity: "danger",
      class: ue(e.cx("pcFileRemoveButton")),
      unstyled: e.unstyled,
      pt: e.ptm("pcFileRemoveButton")
    }, {
      icon: L(function(m) {
        return [t.templates.fileremoveicon ? (V(), x(de(t.templates.fileremoveicon), {
          key: 0,
          class: ue(m.class),
          file: i,
          index: g
        }, null, 8, ["class", "file", "index"])) : (V(), x(s, W({
          key: 1,
          class: m.class,
          "aria-hidden": "true",
          ref_for: !0
        }, e.ptm("pcFileRemoveButton").icon), null, 16, ["class"]))];
      }),
      _: 2
    }, 1032, ["onClick", "class", "unstyled", "pt"])], 16)], 16);
  }), 128);
}
dl.render = oc;
function tn(e) {
  return uc(e) || rc(e) || sl(e) || ic();
}
function ic() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rc(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function uc(e) {
  if (Array.isArray(e)) return gn(e);
}
function Ee(e, n) {
  var t = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!t) {
    if (Array.isArray(e) || (t = sl(e)) || n) {
      t && (e = t);
      var l = 0, a = function() {
      };
      return { s: a, n: function() {
        return l >= e.length ? { done: !0 } : { done: !1, value: e[l++] };
      }, e: function(i) {
        throw i;
      }, f: a };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var c, d = !0, s = !1;
  return { s: function() {
    t = t.call(e);
  }, n: function() {
    var i = t.next();
    return d = i.done, i;
  }, e: function(i) {
    s = !0, c = i;
  }, f: function() {
    try {
      d || t.return == null || t.return();
    } finally {
      if (s) throw c;
    }
  } };
}
function sl(e, n) {
  if (e) {
    if (typeof e == "string") return gn(e, n);
    var t = {}.toString.call(e).slice(8, -1);
    return t === "Object" && e.constructor && (t = e.constructor.name), t === "Map" || t === "Set" ? Array.from(e) : t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? gn(e, n) : void 0;
  }
}
function gn(e, n) {
  (n == null || n > e.length) && (n = e.length);
  for (var t = 0, l = Array(n); t < n; t++) l[t] = e[t];
  return l;
}
var ol = {
  name: "FileUpload",
  extends: dc,
  inheritAttrs: !1,
  emits: ["select", "uploader", "before-upload", "progress", "upload", "error", "before-send", "clear", "remove", "remove-uploaded-file"],
  duplicateIEEvent: !1,
  data: function() {
    return {
      uploadedFileCount: 0,
      files: [],
      messages: [],
      focused: !1,
      progress: null,
      uploadedFiles: []
    };
  },
  methods: {
    upload: function() {
      this.hasFiles && this.uploader();
    },
    onBasicUploaderClick: function(n) {
      n.button === 0 && this.$refs.fileInput.click();
    },
    onFileSelect: function(n) {
      if (n.type !== "drop" && this.isIE11() && this.duplicateIEEvent) {
        this.duplicateIEEvent = !1;
        return;
      }
      this.isBasic && this.hasFiles && (this.files = []), this.messages = [], this.files = this.files || [];
      var t = n.dataTransfer ? n.dataTransfer.files : n.target.files, l = Ee(t), a;
      try {
        for (l.s(); !(a = l.n()).done; ) {
          var c = a.value;
          !this.isFileSelected(c) && !this.isFileLimitExceeded() && this.validate(c) && (this.isImage(c) && (c.objectURL = window.URL.createObjectURL(c)), this.files.push(c));
        }
      } catch (d) {
        l.e(d);
      } finally {
        l.f();
      }
      this.$emit("select", {
        originalEvent: n,
        files: this.files
      }), this.fileLimit && this.checkFileLimit(), this.auto && this.hasFiles && !this.isFileLimitExceeded() && this.uploader(), n.type !== "drop" && this.isIE11() ? this.clearIEInput() : this.clearInputElement();
    },
    choose: function() {
      this.$refs.fileInput.click();
    },
    uploader: function() {
      var n = this;
      if (this.customUpload)
        this.fileLimit && (this.uploadedFileCount += this.files.length), this.$emit("uploader", {
          files: this.files
        }), this.clear();
      else {
        var t = new XMLHttpRequest(), l = new FormData();
        this.$emit("before-upload", {
          xhr: t,
          formData: l
        });
        var a = Ee(this.files), c;
        try {
          for (a.s(); !(c = a.n()).done; ) {
            var d = c.value;
            l.append(this.name, d, d.name);
          }
        } catch (s) {
          a.e(s);
        } finally {
          a.f();
        }
        t.upload.addEventListener("progress", function(s) {
          s.lengthComputable && (n.progress = Math.round(s.loaded * 100 / s.total)), n.$emit("progress", {
            originalEvent: s,
            progress: n.progress
          });
        }), t.onreadystatechange = function() {
          if (t.readyState === 4) {
            var s;
            n.progress = 0, t.status >= 200 && t.status < 300 ? (n.fileLimit && (n.uploadedFileCount += n.files.length), n.$emit("upload", {
              xhr: t,
              files: n.files
            })) : n.$emit("error", {
              xhr: t,
              files: n.files
            }), (s = n.uploadedFiles).push.apply(s, tn(n.files)), n.clear();
          }
        }, t.open("POST", this.url, !0), this.$emit("before-send", {
          xhr: t,
          formData: l
        }), t.withCredentials = this.withCredentials, t.send(l);
      }
    },
    clear: function() {
      this.files = [], this.messages = null, this.$emit("clear"), this.isAdvanced && this.clearInputElement();
    },
    onFocus: function() {
      this.focused = !0;
    },
    onBlur: function() {
      this.focused = !1;
    },
    isFileSelected: function(n) {
      if (this.files && this.files.length) {
        var t = Ee(this.files), l;
        try {
          for (t.s(); !(l = t.n()).done; ) {
            var a = l.value;
            if (a.name + a.type + a.size === n.name + n.type + n.size) return !0;
          }
        } catch (c) {
          t.e(c);
        } finally {
          t.f();
        }
      }
      return !1;
    },
    isIE11: function() {
      return !!window.MSInputMethodContext && !!document.documentMode;
    },
    validate: function(n) {
      return this.accept && !this.isFileTypeValid(n) ? (this.messages.push(this.invalidFileTypeMessage.replace("{0}", n.name).replace("{1}", this.accept)), !1) : this.maxFileSize && n.size > this.maxFileSize ? (this.messages.push(this.invalidFileSizeMessage.replace("{0}", n.name).replace("{1}", this.formatSize(this.maxFileSize))), !1) : !0;
    },
    isFileTypeValid: function(n) {
      var t = this.accept.split(",").map(function(s) {
        return s.trim();
      }), l = Ee(t), a;
      try {
        for (l.s(); !(a = l.n()).done; ) {
          var c = a.value, d = this.isWildcard(c) ? this.getTypeClass(n.type) === this.getTypeClass(c) : n.type == c || this.getFileExtension(n).toLowerCase() === c.toLowerCase();
          if (d)
            return !0;
        }
      } catch (s) {
        l.e(s);
      } finally {
        l.f();
      }
      return !1;
    },
    getTypeClass: function(n) {
      return n.substring(0, n.indexOf("/"));
    },
    isWildcard: function(n) {
      return n.indexOf("*") !== -1;
    },
    getFileExtension: function(n) {
      return "." + n.name.split(".").pop();
    },
    isImage: function(n) {
      return /^image\//.test(n.type);
    },
    onDragEnter: function(n) {
      this.disabled || (n.stopPropagation(), n.preventDefault());
    },
    onDragOver: function(n) {
      this.disabled || (!this.isUnstyled && Ha(this.$refs.content, "p-fileupload-highlight"), this.$refs.content.setAttribute("data-p-highlight", !0), n.stopPropagation(), n.preventDefault());
    },
    onDragLeave: function() {
      this.disabled || (!this.isUnstyled && jn(this.$refs.content, "p-fileupload-highlight"), this.$refs.content.setAttribute("data-p-highlight", !1));
    },
    onDrop: function(n) {
      if (!this.disabled) {
        !this.isUnstyled && jn(this.$refs.content, "p-fileupload-highlight"), this.$refs.content.setAttribute("data-p-highlight", !1), n.stopPropagation(), n.preventDefault();
        var t = n.dataTransfer ? n.dataTransfer.files : n.target.files, l = this.multiple || t && t.length === 1;
        l && this.onFileSelect(n);
      }
    },
    remove: function(n) {
      this.clearInputElement();
      var t = this.files.splice(n, 1)[0];
      this.files = tn(this.files), this.$emit("remove", {
        file: t,
        files: this.files
      });
    },
    removeUploadedFile: function(n) {
      var t = this.uploadedFiles.splice(n, 1)[0];
      this.uploadedFiles = tn(this.uploadedFiles), this.$emit("remove-uploaded-file", {
        file: t,
        files: this.uploadedFiles
      });
    },
    clearInputElement: function() {
      this.$refs.fileInput.value = "";
    },
    clearIEInput: function() {
      this.$refs.fileInput && (this.duplicateIEEvent = !0, this.$refs.fileInput.value = "");
    },
    formatSize: function(n) {
      var t, l = 1024, a = 3, c = ((t = this.$primevue.config.locale) === null || t === void 0 ? void 0 : t.fileSizeTypes) || ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      if (n === 0)
        return "0 ".concat(c[0]);
      var d = Math.floor(Math.log(n) / Math.log(l)), s = parseFloat((n / Math.pow(l, d)).toFixed(a));
      return "".concat(s, " ").concat(c[d]);
    },
    isFileLimitExceeded: function() {
      return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focused && (this.focused = !1), this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    },
    checkFileLimit: function() {
      this.isFileLimitExceeded() && this.messages.push(this.invalidFileLimitMessage.replace("{0}", this.fileLimit.toString()));
    },
    onMessageClose: function() {
      this.messages = null;
    }
  },
  computed: {
    isAdvanced: function() {
      return this.mode === "advanced";
    },
    isBasic: function() {
      return this.mode === "basic";
    },
    chooseButtonClass: function() {
      return [this.cx("pcChooseButton"), this.class];
    },
    basicFileChosenLabel: function() {
      var n;
      if (this.auto) return this.chooseButtonLabel;
      if (this.hasFiles) {
        var t;
        return this.files && this.files.length === 1 ? this.files[0].name : (t = this.$primevue.config.locale) === null || t === void 0 || (t = t.fileChosenMessage) === null || t === void 0 ? void 0 : t.replace("{0}", this.files.length);
      }
      return ((n = this.$primevue.config.locale) === null || n === void 0 ? void 0 : n.noFileChosenMessage) || "";
    },
    hasFiles: function() {
      return this.files && this.files.length > 0;
    },
    hasUploadedFiles: function() {
      return this.uploadedFiles && this.uploadedFiles.length > 0;
    },
    chooseDisabled: function() {
      return this.disabled || this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    },
    uploadDisabled: function() {
      return this.disabled || !this.hasFiles || this.fileLimit && this.fileLimit < this.files.length;
    },
    cancelDisabled: function() {
      return this.disabled || !this.hasFiles;
    },
    chooseButtonLabel: function() {
      return this.chooseLabel || this.$primevue.config.locale.choose;
    },
    uploadButtonLabel: function() {
      return this.uploadLabel || this.$primevue.config.locale.upload;
    },
    cancelButtonLabel: function() {
      return this.cancelLabel || this.$primevue.config.locale.cancel;
    },
    completedLabel: function() {
      return this.$primevue.config.locale.completed;
    },
    pendingLabel: function() {
      return this.$primevue.config.locale.pending;
    }
  },
  components: {
    Button: nl,
    ProgressBar: cl,
    Message: Ka,
    FileContent: dl,
    PlusIcon: Ra,
    UploadIcon: al,
    TimesIcon: tl
  },
  directives: {
    ripple: Ma
  }
}, gc = ["multiple", "accept", "disabled"], mc = ["files"], bc = ["accept", "disabled", "multiple"];
function Ic(e, n, t, l, a, c) {
  var d = _("Button"), s = _("ProgressBar"), o = _("Message"), i = _("FileContent");
  return c.isAdvanced ? (V(), H("div", W({
    key: 0,
    class: e.cx("root")
  }, e.ptmi("root")), [k("input", W({
    ref: "fileInput",
    type: "file",
    onChange: n[0] || (n[0] = function() {
      return c.onFileSelect && c.onFileSelect.apply(c, arguments);
    }),
    multiple: e.multiple,
    accept: e.accept,
    disabled: c.chooseDisabled
  }, e.ptm("input")), null, 16, gc), k("div", W({
    class: e.cx("header")
  }, e.ptm("header")), [ee(e.$slots, "header", {
    files: a.files,
    uploadedFiles: a.uploadedFiles,
    chooseCallback: c.choose,
    uploadCallback: c.uploader,
    clearCallback: c.clear
  }, function() {
    return [U(d, W({
      label: c.chooseButtonLabel,
      class: c.chooseButtonClass,
      style: e.style,
      disabled: e.disabled,
      unstyled: e.unstyled,
      onClick: c.choose,
      onKeydown: Pn(c.choose, ["enter"]),
      onFocus: c.onFocus,
      onBlur: c.onBlur
    }, e.chooseButtonProps, {
      pt: e.ptm("pcChooseButton")
    }), {
      icon: L(function(g) {
        return [ee(e.$slots, "chooseicon", {}, function() {
          return [(V(), x(de(e.chooseIcon ? "span" : "PlusIcon"), W({
            class: [g.class, e.chooseIcon],
            "aria-hidden": "true"
          }, e.ptm("pcChooseButton").icon), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["label", "class", "style", "disabled", "unstyled", "onClick", "onKeydown", "onFocus", "onBlur", "pt"]), e.showUploadButton ? (V(), x(d, W({
      key: 0,
      class: e.cx("pcUploadButton"),
      label: c.uploadButtonLabel,
      onClick: c.uploader,
      disabled: c.uploadDisabled,
      unstyled: e.unstyled
    }, e.uploadButtonProps, {
      pt: e.ptm("pcUploadButton")
    }), {
      icon: L(function(g) {
        return [ee(e.$slots, "uploadicon", {}, function() {
          return [(V(), x(de(e.uploadIcon ? "span" : "UploadIcon"), W({
            class: [g.class, e.uploadIcon],
            "aria-hidden": "true"
          }, e.ptm("pcUploadButton").icon, {
            "data-pc-section": "uploadbuttonicon"
          }), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["class", "label", "onClick", "disabled", "unstyled", "pt"])) : T("", !0), e.showCancelButton ? (V(), x(d, W({
      key: 1,
      class: e.cx("pcCancelButton"),
      label: c.cancelButtonLabel,
      onClick: c.clear,
      disabled: c.cancelDisabled,
      unstyled: e.unstyled
    }, e.cancelButtonProps, {
      pt: e.ptm("pcCancelButton")
    }), {
      icon: L(function(g) {
        return [ee(e.$slots, "cancelicon", {}, function() {
          return [(V(), x(de(e.cancelIcon ? "span" : "TimesIcon"), W({
            class: [g.class, e.cancelIcon],
            "aria-hidden": "true"
          }, e.ptm("pcCancelButton").icon, {
            "data-pc-section": "cancelbuttonicon"
          }), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["class", "label", "onClick", "disabled", "unstyled", "pt"])) : T("", !0)];
  })], 16), k("div", W({
    ref: "content",
    class: e.cx("content"),
    onDragenter: n[1] || (n[1] = function() {
      return c.onDragEnter && c.onDragEnter.apply(c, arguments);
    }),
    onDragover: n[2] || (n[2] = function() {
      return c.onDragOver && c.onDragOver.apply(c, arguments);
    }),
    onDragleave: n[3] || (n[3] = function() {
      return c.onDragLeave && c.onDragLeave.apply(c, arguments);
    }),
    onDrop: n[4] || (n[4] = function() {
      return c.onDrop && c.onDrop.apply(c, arguments);
    })
  }, e.ptm("content"), {
    "data-p-highlight": !1
  }), [ee(e.$slots, "content", {
    files: a.files,
    uploadedFiles: a.uploadedFiles,
    removeUploadedFileCallback: c.removeUploadedFile,
    removeFileCallback: c.remove,
    progress: a.progress,
    messages: a.messages
  }, function() {
    return [c.hasFiles ? (V(), x(s, {
      key: 0,
      value: a.progress,
      showValue: !1,
      unstyled: e.unstyled,
      pt: e.ptm("pcProgressbar")
    }, null, 8, ["value", "unstyled", "pt"])) : T("", !0), (V(!0), H(Me, null, un(a.messages, function(g) {
      return V(), x(o, {
        key: g,
        severity: "error",
        onClose: c.onMessageClose,
        unstyled: e.unstyled,
        pt: e.ptm("pcMessage")
      }, {
        default: L(function() {
          return [Ae(le(g), 1)];
        }),
        _: 2
      }, 1032, ["onClose", "unstyled", "pt"]);
    }), 128)), c.hasFiles ? (V(), H("div", {
      key: 1,
      class: ue(e.cx("fileList"))
    }, [U(i, {
      files: a.files,
      onRemove: c.remove,
      badgeValue: c.pendingLabel,
      previewWidth: e.previewWidth,
      templates: e.$slots,
      unstyled: e.unstyled,
      pt: e.pt
    }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "unstyled", "pt"])], 2)) : T("", !0), c.hasUploadedFiles ? (V(), H("div", {
      key: 2,
      class: ue(e.cx("fileList"))
    }, [U(i, {
      files: a.uploadedFiles,
      onRemove: c.removeUploadedFile,
      badgeValue: c.completedLabel,
      badgeSeverity: "success",
      previewWidth: e.previewWidth,
      templates: e.$slots,
      unstyled: e.unstyled,
      pt: e.pt
    }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "unstyled", "pt"])], 2)) : T("", !0)];
  }), e.$slots.empty && !c.hasFiles && !c.hasUploadedFiles ? (V(), H("div", qt(W({
    key: 0
  }, e.ptm("empty"))), [ee(e.$slots, "empty")], 16)) : T("", !0)], 16)], 16)) : c.isBasic ? (V(), H("div", W({
    key: 1,
    class: e.cx("root")
  }, e.ptmi("root")), [(V(!0), H(Me, null, un(a.messages, function(g) {
    return V(), x(o, {
      key: g,
      severity: "error",
      onClose: c.onMessageClose,
      unstyled: e.unstyled,
      pt: e.ptm("pcMessage")
    }, {
      default: L(function() {
        return [Ae(le(g), 1)];
      }),
      _: 2
    }, 1032, ["onClose", "unstyled", "pt"]);
  }), 128)), U(d, W({
    label: c.chooseButtonLabel,
    class: c.chooseButtonClass,
    style: e.style,
    disabled: e.disabled,
    unstyled: e.unstyled,
    onMouseup: c.onBasicUploaderClick,
    onKeydown: Pn(c.choose, ["enter"]),
    onFocus: c.onFocus,
    onBlur: c.onBlur
  }, e.chooseButtonProps, {
    pt: e.ptm("pcChooseButton")
  }), {
    icon: L(function(g) {
      return [ee(e.$slots, "chooseicon", {}, function() {
        return [(V(), x(de(e.chooseIcon ? "span" : "PlusIcon"), W({
          class: [g.class, e.chooseIcon],
          "aria-hidden": "true"
        }, e.ptm("pcChooseButton").icon), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["label", "class", "style", "disabled", "unstyled", "onMouseup", "onKeydown", "onFocus", "onBlur", "pt"]), e.auto ? T("", !0) : ee(e.$slots, "filelabel", {
    key: 0,
    class: ue(e.cx("filelabel"))
  }, function() {
    return [k("span", {
      class: ue(e.cx("filelabel")),
      files: a.files
    }, le(c.basicFileChosenLabel), 11, mc)];
  }), k("input", W({
    ref: "fileInput",
    type: "file",
    accept: e.accept,
    disabled: e.disabled,
    multiple: e.multiple,
    onChange: n[5] || (n[5] = function() {
      return c.onFileSelect && c.onFileSelect.apply(c, arguments);
    }),
    onFocus: n[6] || (n[6] = function() {
      return c.onFocus && c.onFocus.apply(c, arguments);
    }),
    onBlur: n[7] || (n[7] = function() {
      return c.onBlur && c.onBlur.apply(c, arguments);
    })
  }, e.ptm("input")), null, 16, bc)], 16)) : T("", !0);
}
ol.render = Ic;
const Gc = /* @__PURE__ */ Je({
  __name: "InputUploadDialog",
  props: {
    isSelectionHidden: { type: Boolean },
    bucketName: {}
  },
  emits: ["choose"],
  setup(e, { emit: n }) {
    const t = ae("dialogRef"), l = e, a = n, c = (s) => {
      console.log("close", t), t && (t.value.close(), a("choose", [s]));
    }, d = (s) => {
      console.log(s.modelSelectionRef), console.log("close", t), t && (t.value.close(), a("choose", s.modelSelectionRef), s.modelSelectionRef = []);
    };
    return (s, o) => (V(), x(Na, null, {
      default: L(() => [
        U(se(Pa), qt(xa(l)), {
          actions: L(({ data: i }) => [
            U(se(M), {
              action: () => c(i),
              label: "choose"
            }, null, 8, ["action"])
          ]),
          globalActions: L(({ store: i }) => [
            U(se(M), {
              action: () => d(i),
              label: "choose"
            }, null, 8, ["action"])
          ]),
          card: L(({ data: i }) => [
            Ae(le(i.name) + " ", 1),
            U(se(ll), {
              width: 150,
              src: i.name
            }, null, 8, ["src"])
          ]),
          _: 1
        }, 16)
      ]),
      _: 1
    }));
  }
});
var hc = Symbol();
function Zc() {
  var e = ae(hc);
  if (!e)
    throw new Error("No PrimeVue Dialog provided!");
  return e;
}
const yc = async (e, n) => {
  const t = await e.arrayBuffer();
  return {
    path: `${e.name}`,
    bucketName: n,
    reader: new Uint8Array(t),
    fileType: e.type
  };
}, On = async (e, n) => ({
  files: await Promise.all(
    e.map((l) => yc(l, n))
  )
}), zo = /* @__PURE__ */ Je({
  __name: "InputUpload",
  props: {
    context: {}
  },
  setup(e) {
    const { bucketName: n, auto: t, fileLimit: l, node: a, multiple: c } = e.context, d = ae("apiClient"), s = oe([]), o = oe([]), i = Zc(), g = ae("filesHandler"), m = oe(), h = () => s.value.length + o.value.length, u = () => {
      if (!o.value.length) return c ? [] : "";
      if (c)
        return [
          ...o.value.map((p) => `${p.bucketId}/${p.name}`),
          ...s.value.map((p) => `${n}/${p.name}`)
        ];
      const G = o.value[0];
      return `${G.bucketId}/${G.name}`;
    }, I = async (G) => {
      if (console.log("files selected", G.files), !!G.files.length) {
        if (c) {
          const p = [...s.value, ...G.files];
          m.value.files = p, s.value = p;
        } else {
          o.value = [];
          const p = [G.files[G.files.length - 1]];
          m.value.files = p, s.value = p;
        }
        if (l && c && h() + G.files.length > l) {
          console.error("exceeded file limit");
          return;
        }
        if (!t && (a.input(u()), a.parent && a.parent.props.type == "form")) {
          const p = await On(
            G.files,
            n
          );
          a.parent.props.uploads = p;
        }
      }
    }, b = () => {
      i.open(
        f(Gc, {
          bucketName: n,
          isSelectionHidden: !c,
          onChoose: async (G) => {
            if (!c) {
              o.value = [G[0]], m.value.uploadedFiles = [G[0]], s.value = [], a.input(u());
              return;
            }
            m.value.uploadedFiles = [
              ...o.value,
              ...G
            ], o.value = [...o.value, ...G], a.input(u());
          }
        })
      );
    }, Z = (G) => {
      const p = s.value.indexOf(G);
      p !== -1 && (s.value.splice(p, 1), a.input(u()), t && A(G));
    }, E = (G) => {
      const p = o.value.indexOf(G);
      p !== -1 && (o.value.splice(p, 1), a.input(u()));
    }, A = async (G) => {
      g && g.fileDeleteByBucket && await j(g.fileDeleteByBucket, d, {
        bucketName: n,
        records: Array.isArray(G) ? G.map((p) => p.name) : [G.name]
      });
    }, K = async (G) => {
      if (g) {
        if (g.fileCreate) {
          await j(
            g.fileCreate,
            d,
            G.files[0]
          );
          return;
        }
        if (g.fileBulkCreate) {
          await j(g.fileBulkCreate, d, G);
          return;
        }
      }
    }, z = async (G) => {
      if (g) {
        if (g.fileBulkCreate) {
          await j(g.fileBulkCreate, d, G);
          return;
        }
        if (g.fileCreate) {
          for (let p = 0; p < G.files.length; p++)
            await j(
              g.fileCreate,
              d,
              G.files[p]
            );
          return;
        }
      }
    }, me = async (G) => {
      if (!g || !g.fileBulkCreate && !g.fileCreate || !G.files || Array.isArray(G.files) && G.files.length == 0) return;
      const p = Array.isArray(G.files) ? G.files : [G.files];
      let $ = await On(p, n);
      if ($.files.length) {
        if (!c) {
          await K($), a.input(u());
          return;
        }
        await z($), a.input(u());
      }
    }, be = () => f(
      ol,
      {
        ...e.context,
        ref: (G) => m.value = G,
        onSelect: I,
        onUploader: me,
        fileLimit: c ? l : 1,
        customUpload: !0
      },
      {
        content: () => f(
          "div",
          {
            class: "flex"
          },
          [
            s.value.map(
              (G) => f(
                "div",
                {
                  class: "card"
                },
                [
                  f("img", {
                    width: "150px",
                    src: URL.createObjectURL(G)
                  }),
                  f(M, {
                    label: "remove",
                    icon: "trash",
                    action: () => Z(G)
                  })
                ]
              )
            ),
            o.value.map(
              (G) => f(
                "div",
                {
                  class: "card"
                },
                [
                  f(ll, {
                    width: "150px",
                    src: G.name
                  }),
                  f(M, {
                    label: "remove",
                    icon: "trash",
                    action: () => E(G)
                  })
                ]
              )
            )
          ]
        ),
        empty: () => f("h2", "drop files hear"),
        header: ({
          chooseCallback: G,
          clearCallback: p
        }) => f(
          "div",
          {
            class: "flex gap-2"
          },
          [
            f(M, {
              icon: "images",
              label: "select from files",
              rounded: !0,
              outlined: !0,
              severity: "info",
              action: () => {
                G(), console.log("choose");
              }
            }),
            f(M, {
              icon: "images",
              label: "select from gallery",
              rounded: !0,
              outlined: !0,
              severity: "success",
              action: () => {
                b();
              }
            }),
            f(M, {
              icon: "images",
              label: "cancel",
              rounded: !0,
              outlined: !0,
              severity: "danger",
              action: async () => {
                t && await A(s.value), o.value = [], s.value = [], a.input(u()), p();
              }
            })
          ]
        )
      }
    );
    return (G, p) => (V(), x(de(be)));
  }
}), _n = (e) => {
  if (!e.context || !e.context.messages) return;
  const [n] = Tn(e.context.messages);
  if (!n || !n.length) return;
  const t = [];
  for (const [l, a] of Tn(e.context.messages))
    a.type == "error" && t.push(f(
      "p",
      { class: "input-error text-red-500" },
      `Error: ${a.value}`
    ));
  return t;
}, $n = (e) => {
  if (!e)
    return f("h2", "Loading...");
}, Ho = /* @__PURE__ */ Je({
  __name: "Dropdown",
  props: {
    context: {}
  },
  emits: ["valueChange"],
  setup(e, { emit: n }) {
    const t = e, { context: l } = t, a = n, {
      options: c,
      dependsOn: d,
      createRoute: s,
      node: o,
      useLazy: i,
      hideReload: g
    } = l, m = () => {
      const A = { ...l };
      return Array.isArray(c) || (A.optionLabel = A.optionLabel || "label", A.optionValue = A.optionValue ? A.optionValue : l.convertToFlat ? A.optionLabel : "value", "placeholder" in A && (A.placeholder = l.node.props.placeholder)), A;
    }, h = () => {
      if (d) {
        if (o.props.lastParentValue == o.props.getParentFormValue())
          return;
        o.props.optionsFetcher();
        return;
      }
      !i || !c || o.props.optionsArray.value.length || o.props.optionsFetcher();
    }, u = (A) => {
      o.input(A), a("valueChange", A);
    }, I = () => {
      o.props.forceReload();
    }, b = (A) => {
      if (o.props.isLoading.value || o.props.errorMessageRef.value) return;
      if (typeof l.slots.option == "function") return l.slots.option(A);
      const { selected: K, option: z } = A;
      return f(
        "div",
        {
          class: `flex items-center ${K ? "selected" : ""}`
        },
        [
          z.icon ? f(va, { icon: z.icon }) : void 0,
          typeof Z.optionLabel == "string" && z[Z.optionLabel] ? f("span", z[Z.optionLabel]) : void 0,
          "note" in z ? f("span", z.note) : void 0
        ]
      );
    }, Z = m(), E = () => {
      var A;
      return f(
        l.useButtons ? ka : l.multiple ? Ua : Ja,
        {
          ...Z,
          pt: { overlay: "z-2000" },
          modelValue: l._value,
          "onUpdate:modelValue": u,
          loading: o.props.isLoading.value,
          options: ((A = o.props.optionsArray) == null ? void 0 : A.value) || [],
          onBeforeShow: h
        },
        {
          ...l.slots,
          header: (K) => f("div", { class: "select-header" }, [
            g ? void 0 : f(M, {
              action: I,
              label: "reload",
              icon: "reload"
            }),
            s ? f(M, { action: s, label: "create", icon: "plus" }) : void 0
          ]),
          option: (K) => [
            $n(o.props.isLoading),
            _n(o),
            b(K)
          ],
          empty: () => [
            $n(o.props.isLoading),
            _n(o),
            f("h2", "No options available")
          ]
        }
      );
    };
    return (A, K) => (V(), x(de(E)));
  }
}), qn = (e) => ({
  not_array: new Error(`The value of "${e}" in the API response is not an array.`),
  not_defined: new Error(`The key "${e}" is missing in the API response.`)
}), il = ({
  options: e,
  optionsMapper: n,
  apiClient: t,
  request: l = {},
  responseOptionsKey: a = "options"
}) => new Promise((c, d) => {
  if (Array.isArray(e)) return c(e);
  j(e, t, l).then((s) => (console.log("fetching from api", s), n ? c(n(s)) : Array.isArray(s) ? c(s) : (console.log("Asdasdasd", a), a in s ? Array.isArray(s[a]) ? c(s[a]) : d(qn(a).not_array) : d(qn(a).not_defined)))).catch(d);
}), pc = () => Sa(
  (n) => il(n),
  300
  // 300ms debounce delay
), fc = ({ cacheKey: e, cacheTimeout: n = 1e5, bypassCache: t }, l) => new Promise((a, c) => {
  if (console.log("fetching from db", e), !e || t)
    return console.log("fetch from api only"), il(l).then(a).catch(c);
  we.dropdownHelper.find(e).then(async (d) => {
    if (d) {
      a(d);
      return;
    }
    pc()(l).then((o) => (console.log("apioptiosn", o), o.length && we.dropdownHelper.create(e, o, n).catch((i) => console.warn("Failed to create cache entry", i)), a(o))).catch(c);
  });
}), Vc = () => ja(
  (n, t, l) => fc({ cacheKey: n, cacheTimeout: t, bypassCache: l.bypassCache }, l)
), Ko = (e) => {
  if (e.props && (("dependsOn" in e.props || "requestMapper" in e.props || "requestPropertyName" in e.props) && (e.props.constructRequest = () => {
    const { requestMapper: n, requestPropertyName: t = "recordId" } = e.props;
    let l = {};
    if (e.props.dependsOn) {
      const a = e.props.getParentFormValue();
      if (!a) return !1;
      e.props.lastParentValue = a, l[t] = a;
    }
    return n && (l = n(l)), l;
  }), "dependsOn" in e.props)) {
    e.props.errorMessageRef = oe("");
    const { dependsOn: n } = e.props, t = () => {
      if (!n) return {};
      if (!e.parent)
        return e.setErrors(["dependsOn is passed but the input has no parent"]), e.props.errorMessageRef.value = "dependsOn is passed but the input has no parent", !1;
      if (!e.parent.value || typeof e.parent.value != "object") return !1;
      const l = e.parent.value;
      return n in l ? l[n] ? l[n] : (e.props.errorMessageRef.value = `please select value from this input "${n}" in order to fetch options for this input`, !1) : (e.setErrors([`dependsOn is passed but the input has no sibling with this name "${n}"`]), !1);
    };
    e.props.getParentFormValue = t;
  }
}, Mo = (e) => {
  if (!e.props) return;
  const n = e.props.type;
  if (n == "devkitDropdown" || n == "devkitMultiDropdown") {
    e.props.isLoading = oe(!1), e.props.optionsArray = oe([]), e.props.errorMessageRef = oe(""), e.props.lastParentValue = "";
    const t = ae("apiClient"), { options: l, dependsOn: a, cacheKey: c = e.props.name, bypassCache: d, useLazy: s, optionsMapper: o, responseOptionsKey: i = "options", cacheTimeout: g = 60 * 60 * 1e3 * 200 } = e.props, m = () => {
      if (!e.props.getParentFormValue || !a) return c;
      const b = e.props.getParentFormValue();
      return b ? `${c}-${b.value}` : c;
    }, h = () => {
      const b = e.props.constructRequest ? e.props.constructRequest() : {}, Z = m();
      return b ? Vc()(
        Z,
        g,
        {
          options: l,
          request: b,
          bypassCache: d,
          apiClient: t,
          optionsMapper: o,
          responseOptionsKey: i
        }
      ) : Promise.resolve([]);
    }, u = () => {
      if (e.props.isLoading.value = !0, Array.isArray(e.props.options)) {
        e.props.optionsArray.value = l, e.props.isLoading.value = !1;
        return;
      }
      h().then((b) => {
        e.props.optionsArray.value = b;
      }).catch((b) => {
        if (console.log("e", b), "message" in b) {
          if (b.message.includes("is not a function")) {
            e.props.errorMessageRef.value = "the function name passed on options not found on injected api client";
            return;
          }
          e.props.errorMessageRef.value = b.message;
          return;
        }
        e.props.errorMessageRef.value = b;
      }).finally(() => e.props.isLoading.value = !1);
    }, I = () => {
      we.dropdownHelper.bulkDelete([m()]), u();
    };
    s || u(), e.props.optionsFetcher = u, e.props.forceReload = I;
  }
};
var X;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(X || (X = {}));
function Vn(e, n) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? n === void 0 ? !0 : n.typeName === e.$typeName : !1;
}
var r;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(r || (r = {}));
function Ac() {
  let e = 0, n = 0;
  for (let l = 0; l < 28; l += 7) {
    let a = this.buf[this.pos++];
    if (e |= (a & 127) << l, !(a & 128))
      return this.assertBounds(), [e, n];
  }
  let t = this.buf[this.pos++];
  if (e |= (t & 15) << 28, n = (t & 112) >> 4, !(t & 128))
    return this.assertBounds(), [e, n];
  for (let l = 3; l <= 31; l += 7) {
    let a = this.buf[this.pos++];
    if (n |= (a & 127) << l, !(a & 128))
      return this.assertBounds(), [e, n];
  }
  throw new Error("invalid varint");
}
function ln(e, n, t) {
  for (let c = 0; c < 28; c = c + 7) {
    const d = e >>> c, s = !(!(d >>> 7) && n == 0), o = (s ? d | 128 : d) & 255;
    if (t.push(o), !s)
      return;
  }
  const l = e >>> 28 & 15 | (n & 7) << 4, a = !!(n >> 3);
  if (t.push((a ? l | 128 : l) & 255), !!a) {
    for (let c = 3; c < 31; c = c + 7) {
      const d = n >>> c, s = !!(d >>> 7), o = (s ? d | 128 : d) & 255;
      if (t.push(o), !s)
        return;
    }
    t.push(n >>> 31 & 1);
  }
}
const He = 4294967296;
function et(e) {
  const n = e[0] === "-";
  n && (e = e.slice(1));
  const t = 1e6;
  let l = 0, a = 0;
  function c(d, s) {
    const o = Number(e.slice(d, s));
    a *= t, l = l * t + o, l >= He && (a = a + (l / He | 0), l = l % He);
  }
  return c(-24, -18), c(-18, -12), c(-12, -6), c(-6), n ? ul(l, a) : An(l, a);
}
function Xc(e, n) {
  let t = An(e, n);
  const l = t.hi & 2147483648;
  l && (t = ul(t.lo, t.hi));
  const a = rl(t.lo, t.hi);
  return l ? "-" + a : a;
}
function rl(e, n) {
  if ({ lo: e, hi: n } = Cc(e, n), n <= 2097151)
    return String(He * n + e);
  const t = e & 16777215, l = (e >>> 24 | n << 8) & 16777215, a = n >> 16 & 65535;
  let c = t + l * 6777216 + a * 6710656, d = l + a * 8147497, s = a * 2;
  const o = 1e7;
  return c >= o && (d += Math.floor(c / o), c %= o), d >= o && (s += Math.floor(d / o), d %= o), s.toString() + nt(d) + nt(c);
}
function Cc(e, n) {
  return { lo: e >>> 0, hi: n >>> 0 };
}
function An(e, n) {
  return { lo: e | 0, hi: n | 0 };
}
function ul(e, n) {
  return n = ~n, e ? e = ~e + 1 : n += 1, An(e, n);
}
const nt = (e) => {
  const n = String(e);
  return "0000000".slice(n.length) + n;
};
function tt(e, n) {
  if (e >= 0) {
    for (; e > 127; )
      n.push(e & 127 | 128), e = e >>> 7;
    n.push(e);
  } else {
    for (let t = 0; t < 9; t++)
      n.push(e & 127 | 128), e = e >> 7;
    n.push(1);
  }
}
function Wc() {
  let e = this.buf[this.pos++], n = e & 127;
  if (!(e & 128))
    return this.assertBounds(), n;
  if (e = this.buf[this.pos++], n |= (e & 127) << 7, !(e & 128))
    return this.assertBounds(), n;
  if (e = this.buf[this.pos++], n |= (e & 127) << 14, !(e & 128))
    return this.assertBounds(), n;
  if (e = this.buf[this.pos++], n |= (e & 127) << 21, !(e & 128))
    return this.assertBounds(), n;
  e = this.buf[this.pos++], n |= (e & 15) << 28;
  for (let t = 5; e & 128 && t < 10; t++)
    e = this.buf[this.pos++];
  if (e & 128)
    throw new Error("invalid varint");
  return this.assertBounds(), n >>> 0;
}
const B = /* @__PURE__ */ Bc();
function Bc() {
  const e = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const t = BigInt("-9223372036854775808"), l = BigInt("9223372036854775807"), a = BigInt("0"), c = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(d) {
        const s = typeof d == "bigint" ? d : BigInt(d);
        if (s > l || s < t)
          throw new Error(`invalid int64: ${d}`);
        return s;
      },
      uParse(d) {
        const s = typeof d == "bigint" ? d : BigInt(d);
        if (s > c || s < a)
          throw new Error(`invalid uint64: ${d}`);
        return s;
      },
      enc(d) {
        return e.setBigInt64(0, this.parse(d), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      uEnc(d) {
        return e.setBigInt64(0, this.uParse(d), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      dec(d, s) {
        return e.setInt32(0, d, !0), e.setInt32(4, s, !0), e.getBigInt64(0, !0);
      },
      uDec(d, s) {
        return e.setInt32(0, d, !0), e.setInt32(4, s, !0), e.getBigUint64(0, !0);
      }
    };
  }
  return {
    zero: "0",
    supported: !1,
    parse(t) {
      return typeof t != "string" && (t = t.toString()), lt(t), t;
    },
    uParse(t) {
      return typeof t != "string" && (t = t.toString()), at(t), t;
    },
    enc(t) {
      return typeof t != "string" && (t = t.toString()), lt(t), et(t);
    },
    uEnc(t) {
      return typeof t != "string" && (t = t.toString()), at(t), et(t);
    },
    dec(t, l) {
      return Xc(t, l);
    },
    uDec(t, l) {
      return rl(t, l);
    }
  };
}
function lt(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function at(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function ge(e, n) {
  switch (e) {
    case r.STRING:
      return "";
    case r.BOOL:
      return !1;
    default:
      return 0;
    case r.DOUBLE:
    case r.FLOAT:
      return 0;
    case r.INT64:
    case r.UINT64:
    case r.SFIXED64:
    case r.FIXED64:
    case r.SINT64:
      return n ? "0" : B.zero;
    case r.BYTES:
      return new Uint8Array(0);
  }
}
function Rc(e, n) {
  switch (e) {
    case r.BOOL:
      return n === !1;
    case r.STRING:
      return n === "";
    case r.BYTES:
      return n instanceof Uint8Array && !n.byteLength;
    default:
      return n == 0;
  }
}
const Jc = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class w extends Error {
  constructor(n, t, l = "FieldValueInvalidError") {
    super(t), this.name = l, this.field = () => n;
  }
}
function Sc(e) {
  return e instanceof Error && Jc.includes(e.name) && "field" in e && typeof e.field == "function";
}
const gl = 2, te = Symbol.for("reflect unsafe local");
function ml(e, n) {
  const t = e[n.localName].case;
  return t === void 0 ? t : n.fields.find((l) => l.localName === t);
}
function Yc(e, n) {
  const t = n.localName;
  if (n.oneof)
    return e[n.oneof.localName].case === t;
  if (n.presence != gl)
    return e[t] !== void 0 && Object.prototype.hasOwnProperty.call(e, t);
  switch (n.fieldKind) {
    case "list":
      return e[t].length > 0;
    case "map":
      return Object.keys(e[t]).length > 0;
    // eslint-disable-line @typescript-eslint/no-unsafe-argument
    case "scalar":
      return !Rc(n.scalar, e[t]);
    case "enum":
      return e[t] !== n.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function Xe(e, n) {
  return Object.prototype.hasOwnProperty.call(e, n) && e[n] !== void 0;
}
function bl(e, n) {
  if (n.oneof) {
    const t = e[n.oneof.localName];
    return t.case === n.localName ? t.value : void 0;
  }
  return e[n.localName];
}
function Il(e, n, t) {
  n.oneof ? e[n.oneof.localName] = {
    case: n.localName,
    value: t
  } : e[n.localName] = t;
}
function Fc(e, n) {
  const t = n.localName;
  if (n.oneof) {
    const l = n.oneof.localName;
    e[l].case === t && (e[l] = { case: void 0 });
  } else if (n.presence != gl)
    delete e[t];
  else
    switch (n.fieldKind) {
      case "map":
        e[t] = {};
        break;
      case "list":
        e[t] = [];
        break;
      case "enum":
        e[t] = n.enum.values[0].number;
        break;
      case "scalar":
        e[t] = ge(n.scalar, n.longAsString);
        break;
    }
}
function ie(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Xn(e, n) {
  var t, l, a, c;
  if (ie(e) && te in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (n !== void 0) {
      const d = n, s = e.field();
      return d.listKind == s.listKind && d.scalar === s.scalar && ((t = d.message) === null || t === void 0 ? void 0 : t.typeName) === ((l = s.message) === null || l === void 0 ? void 0 : l.typeName) && ((a = d.enum) === null || a === void 0 ? void 0 : a.typeName) === ((c = s.enum) === null || c === void 0 ? void 0 : c.typeName);
    }
    return !0;
  }
  return !1;
}
function Cn(e, n) {
  var t, l, a, c;
  if (ie(e) && te in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (n !== void 0) {
      const d = n, s = e.field();
      return d.mapKey === s.mapKey && d.mapKind == s.mapKind && d.scalar === s.scalar && ((t = d.message) === null || t === void 0 ? void 0 : t.typeName) === ((l = s.message) === null || l === void 0 ? void 0 : l.typeName) && ((a = d.enum) === null || a === void 0 ? void 0 : a.typeName) === ((c = s.enum) === null || c === void 0 ? void 0 : c.typeName);
    }
    return !0;
  }
  return !1;
}
function Wn(e, n) {
  return ie(e) && te in e && "desc" in e && ie(e.desc) && e.desc.kind === "message" && (n === void 0 || e.desc.typeName == n.typeName);
}
function Ec(e) {
  return Gl(e.$typeName);
}
function Se(e) {
  const n = e.fields[0];
  return Gl(e.typeName) && n !== void 0 && n.fieldKind == "scalar" && n.name == "value" && n.number == 1;
}
function Gl(e) {
  return e.startsWith("google.protobuf.") && [
    "DoubleValue",
    "FloatValue",
    "Int64Value",
    "UInt64Value",
    "Int32Value",
    "UInt32Value",
    "BoolValue",
    "StringValue",
    "BytesValue"
  ].includes(e.substring(16));
}
const Nc = 999, xc = 998, Ke = 2;
function O(e, n) {
  if (Vn(n, e))
    return n;
  const t = wc(e);
  return n !== void 0 && zc(e, t, n), t;
}
function zc(e, n, t) {
  for (const l of e.members) {
    let a = t[l.localName];
    if (a == null)
      continue;
    let c;
    if (l.kind == "oneof") {
      const d = ml(t, l);
      if (!d)
        continue;
      c = d, a = bl(t, d);
    } else
      c = l;
    switch (c.fieldKind) {
      case "message":
        a = Bn(c, a);
        break;
      case "scalar":
        a = hl(c, a);
        break;
      case "list":
        a = Kc(c, a);
        break;
      case "map":
        a = Hc(c, a);
        break;
    }
    Il(n, c, a);
  }
  return n;
}
function hl(e, n) {
  return e.scalar == r.BYTES ? Rn(n) : n;
}
function Hc(e, n) {
  if (ie(n)) {
    if (e.scalar == r.BYTES)
      return ct(n, Rn);
    if (e.mapKind == "message")
      return ct(n, (t) => Bn(e, t));
  }
  return n;
}
function Kc(e, n) {
  if (Array.isArray(n)) {
    if (e.scalar == r.BYTES)
      return n.map(Rn);
    if (e.listKind == "message")
      return n.map((t) => Bn(e, t));
  }
  return n;
}
function Bn(e, n) {
  if (e.fieldKind == "message" && !e.oneof && Se(e.message))
    return hl(e.message.fields[0], n);
  if (ie(n)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return n;
    if (!Vn(n, e.message))
      return O(e.message, n);
  }
  return n;
}
function Rn(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function ct(e, n) {
  const t = {};
  for (const l of Object.entries(e))
    t[l[0]] = n(l[1]);
  return t;
}
const Mc = Symbol(), dt = /* @__PURE__ */ new WeakMap();
function wc(e) {
  let n;
  if (Lc(e)) {
    const t = dt.get(e);
    let l, a;
    if (t)
      ({ prototype: l, members: a } = t);
    else {
      l = {}, a = /* @__PURE__ */ new Set();
      for (const c of e.members)
        c.kind != "oneof" && (c.fieldKind != "scalar" && c.fieldKind != "enum" || c.presence != Ke && (a.add(c), l[c.localName] = an(c)));
      dt.set(e, { prototype: l, members: a });
    }
    n = Object.create(l), n.$typeName = e.typeName;
    for (const c of e.members)
      a.has(c) || c.kind == "field" && (c.fieldKind == "message" || (c.fieldKind == "scalar" || c.fieldKind == "enum") && c.presence != Ke) || (n[c.localName] = an(c));
  } else {
    n = {
      $typeName: e.typeName
    };
    for (const t of e.members)
      (t.kind == "oneof" || t.presence == Ke) && (n[t.localName] = an(t));
  }
  return n;
}
function Lc(e) {
  switch (e.file.edition) {
    case Nc:
      return !1;
    case xc:
      return !0;
    default:
      return e.fields.some((n) => n.presence != Ke && n.fieldKind != "message" && !n.oneof);
  }
}
function an(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return Mc;
  const n = e.getDefaultValue();
  return n !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? n.toString() : n : e.fieldKind == "scalar" ? ge(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const cn = Symbol.for("@bufbuild/protobuf/text-encoding");
function Jn() {
  if (globalThis[cn] == null) {
    const e = new globalThis.TextEncoder(), n = new globalThis.TextDecoder();
    globalThis[cn] = {
      encodeUtf8(t) {
        return e.encode(t);
      },
      decodeUtf8(t) {
        return n.decode(t);
      },
      checkUtf8(t) {
        try {
          return encodeURIComponent(t), !0;
        } catch {
          return !1;
        }
      }
    };
  }
  return globalThis[cn];
}
var J;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(J || (J = {}));
const Zl = 34028234663852886e22, yl = -34028234663852886e22, pl = 4294967295, fl = 2147483647, Vl = -2147483648;
class Al {
  constructor(n = Jn().encodeUtf8) {
    this.encodeUtf8 = n, this.stack = [], this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
    let n = 0;
    for (let a = 0; a < this.chunks.length; a++)
      n += this.chunks[a].length;
    let t = new Uint8Array(n), l = 0;
    for (let a = 0; a < this.chunks.length; a++)
      t.set(this.chunks[a], l), l += this.chunks[a].length;
    return this.chunks = [], t;
  }
  /**
   * Start a new fork for length-delimited data like a message
   * or a packed repeated field.
   *
   * Must be joined later with `join()`.
   */
  fork() {
    return this.stack.push({ chunks: this.chunks, buf: this.buf }), this.chunks = [], this.buf = [], this;
  }
  /**
   * Join the last fork. Write its length and bytes, then
   * return to the previous state.
   */
  join() {
    let n = this.finish(), t = this.stack.pop();
    if (!t)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = t.chunks, this.buf = t.buf, this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(n, t) {
    return this.uint32((n << 3 | t) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(n) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(n), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(n) {
    for (st(n); n > 127; )
      this.buf.push(n & 127 | 128), n = n >>> 7;
    return this.buf.push(n), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(n) {
    return dn(n), tt(n, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(n) {
    return this.buf.push(n ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(n) {
    return this.uint32(n.byteLength), this.raw(n);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(n) {
    let t = this.encodeUtf8(n);
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(n) {
    kc(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setFloat32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(n) {
    let t = new Uint8Array(8);
    return new DataView(t.buffer).setFloat64(0, n, !0), this.raw(t);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(n) {
    st(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setUint32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(n) {
    dn(n);
    let t = new Uint8Array(4);
    return new DataView(t.buffer).setInt32(0, n, !0), this.raw(t);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(n) {
    return dn(n), n = (n << 1 ^ n >> 31) >>> 0, tt(n, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(n) {
    let t = new Uint8Array(8), l = new DataView(t.buffer), a = B.enc(n);
    return l.setInt32(0, a.lo, !0), l.setInt32(4, a.hi, !0), this.raw(t);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(n) {
    let t = new Uint8Array(8), l = new DataView(t.buffer), a = B.uEnc(n);
    return l.setInt32(0, a.lo, !0), l.setInt32(4, a.hi, !0), this.raw(t);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(n) {
    let t = B.enc(n);
    return ln(t.lo, t.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(n) {
    let t = B.enc(n), l = t.hi >> 31, a = t.lo << 1 ^ l, c = (t.hi << 1 | t.lo >>> 31) ^ l;
    return ln(a, c, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(n) {
    let t = B.uEnc(n);
    return ln(t.lo, t.hi, this.buf), this;
  }
}
class Sn {
  constructor(n, t = Jn().decodeUtf8) {
    this.decodeUtf8 = t, this.varint64 = Ac, this.uint32 = Wc, this.buf = n, this.len = n.length, this.pos = 0, this.view = new DataView(n.buffer, n.byteOffset, n.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let n = this.uint32(), t = n >>> 3, l = n & 7;
    if (t <= 0 || l < 0 || l > 5)
      throw new Error("illegal tag: field no " + t + " wire type " + l);
    return [t, l];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(n, t) {
    let l = this.pos;
    switch (n) {
      case J.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // eslint-disable-next-line
      // @ts-expect-error TS7029: Fallthrough case in switch
      case J.Bit64:
        this.pos += 4;
      // eslint-disable-next-line no-fallthrough
      case J.Bit32:
        this.pos += 4;
        break;
      case J.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case J.StartGroup:
        for (; ; ) {
          const [c, d] = this.tag();
          if (d === J.EndGroup) {
            if (t !== void 0 && c !== t)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(d, c);
        }
        break;
      default:
        throw new Error("cant skip wire type " + n);
    }
    return this.assertBounds(), this.buf.subarray(l, this.pos);
  }
  /**
   * Throws error if position in byte array is out of range.
   */
  assertBounds() {
    if (this.pos > this.len)
      throw new RangeError("premature EOF");
  }
  /**
   * Read a `int32` field, a signed 32 bit varint.
   */
  int32() {
    return this.uint32() | 0;
  }
  /**
   * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
   */
  sint32() {
    let n = this.uint32();
    return n >>> 1 ^ -(n & 1);
  }
  /**
   * Read a `int64` field, a signed 64-bit varint.
   */
  int64() {
    return B.dec(...this.varint64());
  }
  /**
   * Read a `uint64` field, an unsigned 64-bit varint.
   */
  uint64() {
    return B.uDec(...this.varint64());
  }
  /**
   * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64() {
    let [n, t] = this.varint64(), l = -(n & 1);
    return n = (n >>> 1 | (t & 1) << 31) ^ l, t = t >>> 1 ^ l, B.dec(n, t);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [n, t] = this.varint64();
    return n !== 0 || t !== 0;
  }
  /**
   * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
   */
  fixed32() {
    return this.view.getUint32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
   */
  sfixed32() {
    return this.view.getInt32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
   */
  fixed64() {
    return B.uDec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
   */
  sfixed64() {
    return B.dec(this.sfixed32(), this.sfixed32());
  }
  /**
   * Read a `float` field, 32-bit floating point number.
   */
  float() {
    return this.view.getFloat32((this.pos += 4) - 4, !0);
  }
  /**
   * Read a `double` field, a 64-bit floating point number.
   */
  double() {
    return this.view.getFloat64((this.pos += 8) - 8, !0);
  }
  /**
   * Read a `bytes` field, length-delimited arbitrary data.
   */
  bytes() {
    let n = this.uint32(), t = this.pos;
    return this.pos += n, this.assertBounds(), this.buf.subarray(t, t + n);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function dn(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > fl || e < Vl)
    throw new Error("invalid int32: " + e);
}
function st(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > pl || e < 0)
    throw new Error("invalid uint32: " + e);
}
function kc(e) {
  if (typeof e == "string") {
    const n = e;
    if (e = Number(e), isNaN(e) && n !== "NaN")
      throw new Error("invalid float32: " + n);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > Zl || e < yl))
    throw new Error("invalid float32: " + e);
}
function re(e, n) {
  const t = e.fieldKind == "list" ? Xn(n, e) : e.fieldKind == "map" ? Cn(n, e) : Yn(e, n);
  if (t === !0)
    return;
  let l;
  switch (e.fieldKind) {
    case "list":
      l = `expected ${Wl(e)}, got ${N(n)}`;
      break;
    case "map":
      l = `expected ${Bl(e)}, got ${N(n)}`;
      break;
    default:
      l = ke(e, n, t);
  }
  return new w(e, l);
}
function ot(e, n, t) {
  const l = Yn(e, t);
  if (l !== !0)
    return new w(e, `list item #${n + 1}: ${ke(e, t, l)}`);
}
function Uc(e, n, t) {
  const l = Xl(n, e.mapKey);
  if (l !== !0)
    return new w(e, `invalid map key: ${ke({ scalar: e.mapKey }, n, l)}`);
  const a = Yn(e, t);
  if (a !== !0)
    return new w(e, `map entry ${N(n)}: ${ke(e, t, a)}`);
}
function Yn(e, n) {
  return e.scalar !== void 0 ? Xl(n, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(n) : e.enum.values.some((t) => t.number === n) : Wn(n, e.message);
}
function Xl(e, n) {
  switch (n) {
    case r.DOUBLE:
      return typeof e == "number";
    case r.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > Zl || e < yl ? `${e.toFixed()} out of range` : !0;
    case r.INT32:
    case r.SFIXED32:
    case r.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > fl || e < Vl ? `${e.toFixed()} out of range` : !0;
    case r.FIXED32:
    case r.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > pl || e < 0 ? `${e.toFixed()} out of range` : !0;
    case r.BOOL:
      return typeof e == "boolean";
    case r.STRING:
      return typeof e != "string" ? !1 : Jn().checkUtf8(e) || "invalid UTF8";
    case r.BYTES:
      return e instanceof Uint8Array;
    case r.INT64:
    case r.SFIXED64:
    case r.SINT64:
      if (typeof e != "string" && typeof e != "bigint" && typeof e != "number")
        return !1;
      try {
        B.parse(e);
      } catch {
        return `${e} out of range`;
      }
      return !0;
    case r.FIXED64:
    case r.UINT64:
      if (typeof e != "string" && typeof e != "bigint" && typeof e != "number")
        return !1;
      try {
        B.uParse(e);
      } catch {
        return `${e} out of range`;
      }
      return !0;
  }
}
function ke(e, n, t) {
  return t = typeof t == "string" ? `: ${t}` : `, got ${N(n)}`, e.scalar !== void 0 ? `expected ${Qc(e.scalar)}` + t : e.enum !== void 0 ? `expected ${e.enum.toString()}` + t : `expected ${Cl(e.message)}` + t;
}
function N(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Xn(e) ? Wl(e.field()) : Cn(e) ? Bl(e.field()) : Wn(e) ? Cl(e.desc) : Vn(e) ? `message ${e.$typeName}` : "object";
    case "string":
      return e.length > 30 ? "string" : `"${e.split('"').join('\\"')}"`;
    case "boolean":
      return String(e);
    case "number":
      return String(e);
    case "bigint":
      return String(e) + "n";
    default:
      return typeof e;
  }
}
function Cl(e) {
  return `ReflectMessage (${e.typeName})`;
}
function Wl(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${r[e.scalar]})`;
  }
}
function Bl(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${r[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${r[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${r[e.mapKey]}, ${r[e.scalar]})`;
  }
}
function Qc(e) {
  switch (e) {
    case r.STRING:
      return "string";
    case r.BOOL:
      return "boolean";
    case r.INT64:
    case r.SINT64:
    case r.SFIXED64:
      return "bigint (int64)";
    case r.UINT64:
    case r.FIXED64:
      return "bigint (uint64)";
    case r.BYTES:
      return "Uint8Array";
    case r.DOUBLE:
      return "number (float64)";
    case r.FLOAT:
      return "number (float32)";
    case r.FIXED32:
    case r.UINT32:
      return "number (uint32)";
    case r.INT32:
    case r.SFIXED32:
    case r.SINT32:
      return "number (int32)";
  }
}
function Q(e, n, t = !0) {
  return new Rl(e, n, t);
}
class Rl {
  get sortedFields() {
    var n;
    return (n = this._sortedFields) !== null && n !== void 0 ? n : this._sortedFields = this.desc.fields.concat().sort((t, l) => t.number - l.number);
  }
  constructor(n, t, l = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = l, this.desc = n, this.message = this[te] = t ?? O(n), this.fields = n.fields, this.oneofs = n.oneofs, this.members = n.members;
  }
  findNumber(n) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((t) => [t.number, t]))), this._fieldsByNumber.get(n);
  }
  oneofCase(n) {
    return fe(this.message, n), ml(this.message, n);
  }
  isSet(n) {
    return fe(this.message, n), Yc(this.message, n);
  }
  clear(n) {
    fe(this.message, n), Fc(this.message, n);
  }
  get(n) {
    fe(this.message, n);
    const t = bl(this.message, n);
    switch (n.fieldKind) {
      case "list":
        let l = this.lists.get(n);
        return (!l || l[te] !== t) && this.lists.set(n, l = new vc(n, t, this.check)), l;
      case "map":
        let a = this.maps.get(n);
        return (!a || a[te] !== t) && this.maps.set(n, a = new Dc(n, t, this.check)), a;
      case "message":
        return En(n, t, this.check);
      case "scalar":
        return t === void 0 ? ge(n.scalar, !1) : Nn(n, t);
      case "enum":
        return t ?? n.enum.values[0].number;
    }
  }
  set(n, t) {
    if (fe(this.message, n), this.check) {
      const a = re(n, t);
      if (a)
        throw a;
    }
    let l;
    n.fieldKind == "message" ? l = Fn(n, t) : Cn(t) || Xn(t) ? l = t[te] : l = xn(n, t), Il(this.message, n, l);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(n) {
    this.message.$unknown = n;
  }
}
function fe(e, n) {
  if (n.parent.typeName !== e.$typeName)
    throw new w(n, `cannot use ${n.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class vc {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(n, t, l) {
    this._field = n, this._arr = this[te] = t, this.check = l;
  }
  get(n) {
    const t = this._arr[n];
    return t === void 0 ? void 0 : sn(this._field, t, this.check);
  }
  set(n, t) {
    if (n < 0 || n >= this._arr.length)
      throw new w(this._field, `list item #${n + 1}: out of range`);
    if (this.check) {
      const l = ot(this._field, n, t);
      if (l)
        throw l;
    }
    this._arr[n] = it(this._field, t);
  }
  add(n) {
    if (this.check) {
      const t = ot(this._field, this._arr.length, n);
      if (t)
        throw t;
    }
    this._arr.push(it(this._field, n));
  }
  clear() {
    this._arr.splice(0, this._arr.length);
  }
  [Symbol.iterator]() {
    return this.values();
  }
  keys() {
    return this._arr.keys();
  }
  *values() {
    for (const n of this._arr)
      yield sn(this._field, n, this.check);
  }
  *entries() {
    for (let n = 0; n < this._arr.length; n++)
      yield [n, sn(this._field, this._arr[n], this.check)];
  }
}
class Dc {
  constructor(n, t, l = !0) {
    this.obj = this[te] = t ?? {}, this.check = l, this._field = n;
  }
  field() {
    return this._field;
  }
  set(n, t) {
    if (this.check) {
      const l = Uc(this._field, n, t);
      if (l)
        throw l;
    }
    return this.obj[Ne(n)] = Tc(this._field, t), this;
  }
  delete(n) {
    const t = Ne(n), l = Object.prototype.hasOwnProperty.call(this.obj, t);
    return l && delete this.obj[t], l;
  }
  clear() {
    for (const n of Object.keys(this.obj))
      delete this.obj[n];
  }
  get(n) {
    let t = this.obj[Ne(n)];
    return t !== void 0 && (t = on(this._field, t, this.check)), t;
  }
  has(n) {
    return Object.prototype.hasOwnProperty.call(this.obj, Ne(n));
  }
  *keys() {
    for (const n of Object.keys(this.obj))
      yield rt(n, this._field.mapKey);
  }
  *entries() {
    for (const n of Object.entries(this.obj))
      yield [
        rt(n[0], this._field.mapKey),
        on(this._field, n[1], this.check)
      ];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const n of Object.values(this.obj))
      yield on(this._field, n, this.check);
  }
  forEach(n, t) {
    for (const l of this.entries())
      n.call(t, l[1], l[0], this);
  }
}
function Fn(e, n) {
  return Wn(n) ? Ec(n.message) && !e.oneof && e.fieldKind == "message" ? n.message.value : n.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Sl(n.message) : n.message : n;
}
function En(e, n, t) {
  return n !== void 0 && (Se(e.message) && !e.oneof && e.fieldKind == "message" ? n = {
    $typeName: e.message.typeName,
    value: Nn(e.message.fields[0], n)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && ie(n) && (n = Jl(n))), new Rl(e.message, n, t);
}
function it(e, n) {
  return e.listKind == "message" ? Fn(e, n) : xn(e, n);
}
function sn(e, n, t) {
  return e.listKind == "message" ? En(e, n, t) : Nn(e, n);
}
function Tc(e, n) {
  return e.mapKind == "message" ? Fn(e, n) : xn(e, n);
}
function on(e, n, t) {
  return e.mapKind == "message" ? En(e, n, t) : n;
}
function Ne(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function rt(e, n) {
  switch (n) {
    case r.STRING:
      return e;
    case r.INT32:
    case r.FIXED32:
    case r.UINT32:
    case r.SFIXED32:
    case r.SINT32: {
      const t = Number.parseInt(e);
      if (Number.isFinite(t))
        return t;
      break;
    }
    case r.BOOL:
      switch (e) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      break;
    case r.UINT64:
    case r.FIXED64:
      try {
        return B.uParse(e);
      } catch {
      }
      break;
    default:
      try {
        return B.parse(e);
      } catch {
      }
      break;
  }
  return e;
}
function Nn(e, n) {
  switch (e.scalar) {
    case r.INT64:
    case r.SFIXED64:
    case r.SINT64:
      "longAsString" in e && e.longAsString && typeof n == "string" && (n = B.parse(n));
      break;
    case r.FIXED64:
    case r.UINT64:
      "longAsString" in e && e.longAsString && typeof n == "string" && (n = B.uParse(n));
      break;
  }
  return n;
}
function xn(e, n) {
  switch (e.scalar) {
    case r.INT64:
    case r.SFIXED64:
    case r.SINT64:
      "longAsString" in e && e.longAsString ? n = String(n) : (typeof n == "string" || typeof n == "number") && (n = B.parse(n));
      break;
    case r.FIXED64:
    case r.UINT64:
      "longAsString" in e && e.longAsString ? n = String(n) : (typeof n == "string" || typeof n == "number") && (n = B.uParse(n));
      break;
  }
  return n;
}
function Jl(e) {
  const n = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (ie(e))
    for (const [t, l] of Object.entries(e))
      n.fields[t] = Fl(l);
  return n;
}
function Sl(e) {
  const n = {};
  for (const [t, l] of Object.entries(e.fields))
    n[t] = Yl(l);
  return n;
}
function Yl(e) {
  switch (e.kind.case) {
    case "structValue":
      return Sl(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(Yl);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function Fl(e) {
  const n = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof e) {
    case "number":
      n.kind = { case: "numberValue", value: e };
      break;
    case "string":
      n.kind = { case: "stringValue", value: e };
      break;
    case "boolean":
      n.kind = { case: "boolValue", value: e };
      break;
    case "object":
      if (e === null)
        n.kind = { case: "nullValue", value: 0 };
      else if (Array.isArray(e)) {
        const t = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(e))
          for (const l of e)
            t.values.push(Fl(l));
        n.kind = {
          case: "listValue",
          value: t
        };
      } else
        n.kind = {
          case: "structValue",
          value: Jl(e)
        };
      break;
  }
  return n;
}
function zn(e) {
  const n = Pc();
  let t = e.length * 3 / 4;
  e[e.length - 2] == "=" ? t -= 2 : e[e.length - 1] == "=" && (t -= 1);
  let l = new Uint8Array(t), a = 0, c = 0, d, s = 0;
  for (let o = 0; o < e.length; o++) {
    if (d = n[e.charCodeAt(o)], d === void 0)
      switch (e[o]) {
        // @ts-expect-error TS7029: Fallthrough case in switch
        case "=":
          c = 0;
        // reset state when padding found
        // eslint-disable-next-line no-fallthrough
        case `
`:
        case "\r":
        case "	":
        case " ":
          continue;
        // skip white-space, and padding
        default:
          throw Error("invalid base64 string");
      }
    switch (c) {
      case 0:
        s = d, c = 1;
        break;
      case 1:
        l[a++] = s << 2 | (d & 48) >> 4, s = d, c = 2;
        break;
      case 2:
        l[a++] = (s & 15) << 4 | (d & 60) >> 2, s = d, c = 3;
        break;
      case 3:
        l[a++] = (s & 3) << 6 | d, c = 0;
        break;
    }
  }
  if (c == 1)
    throw Error("invalid base64 string");
  return l.subarray(0, a);
}
function El(e, n = "std") {
  const t = Nl(n), l = n == "std";
  let a = "", c = 0, d, s = 0;
  for (let o = 0; o < e.length; o++)
    switch (d = e[o], c) {
      case 0:
        a += t[d >> 2], s = (d & 3) << 4, c = 1;
        break;
      case 1:
        a += t[s | d >> 4], s = (d & 15) << 2, c = 2;
        break;
      case 2:
        a += t[s | d >> 6], a += t[d & 63], c = 0;
        break;
    }
  return c && (a += t[s], l && (a += "=", c == 1 && (a += "="))), a;
}
let xe, ut, Ie;
function Nl(e) {
  return xe || (xe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), ut = xe.slice(0, -2).concat("-", "_")), e == "url" ? ut : xe;
}
function Pc() {
  if (!Ie) {
    Ie = [];
    const e = Nl("std");
    for (let n = 0; n < e.length; n++)
      Ie[e[n].charCodeAt(0)] = n;
    Ie[45] = e.indexOf("+"), Ie[95] = e.indexOf("/");
  }
  return Ie;
}
function Ce(e) {
  let n = !1;
  const t = [];
  for (let l = 0; l < e.length; l++) {
    let a = e.charAt(l);
    switch (a) {
      case "_":
        n = !0;
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        t.push(a), n = !1;
        break;
      default:
        n && (n = !1, a = a.toUpperCase()), t.push(a);
        break;
    }
  }
  return t.join("");
}
const jc = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function We(e) {
  return jc.has(e) ? e + "$" : e;
}
function Hn(e) {
  for (const n of e.field)
    Xe(n, "jsonName") || (n.jsonName = Ce(n.name));
  e.nestedType.forEach(Hn);
}
function Oc(e, n) {
  const t = e.values.find((l) => l.name === n);
  if (!t)
    throw new Error(`cannot parse ${e} default value: ${n}`);
  return t.number;
}
function _c(e, n) {
  switch (e) {
    case r.STRING:
      return n;
    case r.BYTES: {
      const t = $c(n);
      if (t === !1)
        throw new Error(`cannot parse ${r[e]} default value: ${n}`);
      return t;
    }
    case r.INT64:
    case r.SFIXED64:
    case r.SINT64:
      return B.parse(n);
    case r.UINT64:
    case r.FIXED64:
      return B.uParse(n);
    case r.DOUBLE:
    case r.FLOAT:
      switch (n) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(n);
      }
    case r.BOOL:
      return n === "true";
    case r.INT32:
    case r.UINT32:
    case r.SINT32:
    case r.FIXED32:
    case r.SFIXED32:
      return parseInt(n, 10);
  }
}
function $c(e) {
  const n = [], t = {
    tail: e,
    c: "",
    next() {
      return this.tail.length == 0 ? !1 : (this.c = this.tail[0], this.tail = this.tail.substring(1), !0);
    },
    take(l) {
      if (this.tail.length >= l) {
        const a = this.tail.substring(0, l);
        return this.tail = this.tail.substring(l), a;
      }
      return !1;
    }
  };
  for (; t.next(); )
    switch (t.c) {
      case "\\":
        if (t.next())
          switch (t.c) {
            case "\\":
              n.push(t.c.charCodeAt(0));
              break;
            case "b":
              n.push(8);
              break;
            case "f":
              n.push(12);
              break;
            case "n":
              n.push(10);
              break;
            case "r":
              n.push(13);
              break;
            case "t":
              n.push(9);
              break;
            case "v":
              n.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const l = t.c, a = t.take(2);
              if (a === !1)
                return !1;
              const c = parseInt(l + a, 8);
              if (isNaN(c))
                return !1;
              n.push(c);
              break;
            }
            case "x": {
              const l = t.c, a = t.take(2);
              if (a === !1)
                return !1;
              const c = parseInt(l + a, 16);
              if (isNaN(c))
                return !1;
              n.push(c);
              break;
            }
            case "u": {
              const l = t.c, a = t.take(4);
              if (a === !1)
                return !1;
              const c = parseInt(l + a, 16);
              if (isNaN(c))
                return !1;
              const d = new Uint8Array(4);
              new DataView(d.buffer).setInt32(0, c, !0), n.push(d[0], d[1], d[2], d[3]);
              break;
            }
            case "U": {
              const l = t.c, a = t.take(8);
              if (a === !1)
                return !1;
              const c = B.uEnc(l + a), d = new Uint8Array(8), s = new DataView(d.buffer);
              s.setInt32(0, c.lo, !0), s.setInt32(4, c.hi, !0), n.push(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7]);
              break;
            }
          }
        break;
      default:
        n.push(t.c.charCodeAt(0));
    }
  return new Uint8Array(n);
}
function* mn(e) {
  switch (e.kind) {
    case "file":
      for (const n of e.messages)
        yield n, yield* mn(n);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const n of e.nestedMessages)
        yield n, yield* mn(n);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function xl(...e) {
  const n = qc();
  if (!e.length)
    return n;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const t of e[0].file)
      bt(t, n);
    return n;
  }
  if ("$typeName" in e[0]) {
    let c = function(d) {
      const s = [];
      for (const o of d.dependency) {
        if (n.getFile(o) != null || a.has(o))
          continue;
        const i = l(o);
        if (!i)
          throw new Error(`Unable to resolve ${o}, imported by ${d.name}`);
        "kind" in i ? n.addFile(i, !1, !0) : (a.add(i.name), s.push(i));
      }
      return s.concat(...s.map(c));
    };
    const t = e[0], l = e[1], a = /* @__PURE__ */ new Set();
    for (const d of [t, ...c(t)].reverse())
      bt(d, n);
  } else
    for (const t of e)
      for (const l of t.files)
        n.addFile(l);
  return n;
}
function qc() {
  const e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types: e,
    extendees: n,
    [Symbol.iterator]() {
      return e.values();
    },
    get files() {
      return t.values();
    },
    addFile(l, a, c) {
      if (t.set(l.proto.name, l), !a)
        for (const d of mn(l))
          this.add(d);
      if (c)
        for (const d of l.dependencies)
          this.addFile(d, a, c);
    },
    add(l) {
      if (l.kind == "extension") {
        let a = n.get(l.extendee.typeName);
        a || n.set(l.extendee.typeName, a = /* @__PURE__ */ new Map()), a.set(l.number, l);
      }
      e.set(l.typeName, l);
    },
    get(l) {
      return e.get(l);
    },
    getFile(l) {
      return t.get(l);
    },
    getMessage(l) {
      const a = e.get(l);
      return (a == null ? void 0 : a.kind) == "message" ? a : void 0;
    },
    getEnum(l) {
      const a = e.get(l);
      return (a == null ? void 0 : a.kind) == "enum" ? a : void 0;
    },
    getExtension(l) {
      const a = e.get(l);
      return (a == null ? void 0 : a.kind) == "extension" ? a : void 0;
    },
    getExtensionFor(l, a) {
      var c;
      return (c = n.get(l.typeName)) === null || c === void 0 ? void 0 : c.get(a);
    },
    getService(l) {
      const a = e.get(l);
      return (a == null ? void 0 : a.kind) == "service" ? a : void 0;
    }
  };
}
const ed = 998, nd = 999, td = 9, Ue = 10, Ve = 11, ld = 12, gt = 14, Kn = 3, ad = 2, mt = 1, cd = 0, rn = 1, dd = 2, sd = 3, od = 1, id = 2, rd = 1, zl = {
  // EDITION_PROTO2
  998: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 2,
    // CLOSED,
    repeatedFieldEncoding: 2,
    // EXPANDED,
    utf8Validation: 3,
    // NONE,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 2
    // LEGACY_BEST_EFFORT,
  },
  // EDITION_PROTO3
  999: {
    fieldPresence: 2,
    // IMPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1
    // ALLOW,
  },
  // EDITION_2023
  1e3: {
    fieldPresence: 1,
    // EXPLICIT,
    enumType: 1,
    // OPEN,
    repeatedFieldEncoding: 1,
    // PACKED,
    utf8Validation: 2,
    // VERIFY,
    messageEncoding: 1,
    // LENGTH_PREFIXED,
    jsonFormat: 1
    // ALLOW,
  }
};
function bt(e, n) {
  var t, l;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (l = (t = e.options) === null || t === void 0 ? void 0 : t.deprecated) !== null && l !== void 0 ? l : !1,
    edition: bd(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: Id(e, n),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${e.name}`;
    }
  }, c = /* @__PURE__ */ new Map(), d = {
    get(s) {
      return c.get(s);
    },
    add(s) {
      var o;
      P(((o = s.proto.options) === null || o === void 0 ? void 0 : o.mapEntry) === !0), c.set(s.typeName, s);
    }
  };
  for (const s of e.enumType)
    Hl(s, a, void 0, n);
  for (const s of e.messageType)
    Kl(s, a, void 0, n, d);
  for (const s of e.service)
    ud(s, a, n);
  bn(a, n);
  for (const s of c.values())
    In(s, n, d);
  for (const s of a.messages)
    In(s, n, d), bn(s, n);
  n.addFile(a, !0);
}
function bn(e, n) {
  switch (e.kind) {
    case "file":
      for (const t of e.proto.extension) {
        const l = Gn(t, e, n);
        e.extensions.push(l), n.add(l);
      }
      break;
    case "message":
      for (const t of e.proto.extension) {
        const l = Gn(t, e, n);
        e.nestedExtensions.push(l), n.add(l);
      }
      for (const t of e.nestedMessages)
        bn(t, n);
      break;
  }
}
function In(e, n, t) {
  const l = e.proto.oneofDecl.map((c) => md(c, e)), a = /* @__PURE__ */ new Set();
  for (const c of e.proto.field) {
    const d = Zd(c, l), s = Gn(c, e, n, d, t);
    e.fields.push(s), e.field[s.localName] = s, d === void 0 ? e.members.push(s) : (d.fields.push(s), a.has(d) || (a.add(d), e.members.push(d)));
  }
  for (const c of l.filter((d) => a.has(d)))
    e.oneofs.push(c);
  for (const c of e.nestedMessages)
    In(c, n, t);
}
function Hl(e, n, t, l) {
  var a, c, d;
  const s = Gd(e.name, e.value), o = {
    kind: "enum",
    proto: e,
    deprecated: (c = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && c !== void 0 ? c : !1,
    file: n,
    parent: t,
    open: !0,
    name: e.name,
    typeName: Te(e, t, n),
    value: {},
    values: [],
    sharedPrefix: s,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  o.open = Vd(o), l.add(o), e.value.forEach((i) => {
    var g, m;
    const h = i.name;
    o.values.push(o.value[i.number] = {
      kind: "enum_value",
      proto: i,
      deprecated: (m = (g = i.options) === null || g === void 0 ? void 0 : g.deprecated) !== null && m !== void 0 ? m : !1,
      parent: o,
      name: h,
      localName: We(s == null ? h : h.substring(s.length)),
      number: i.number,
      toString() {
        return `enum value ${o.typeName}.${h}`;
      }
    });
  }), ((d = t == null ? void 0 : t.nestedEnums) !== null && d !== void 0 ? d : n.enums).push(o);
}
function Kl(e, n, t, l, a) {
  var c, d, s, o;
  const i = {
    kind: "message",
    proto: e,
    deprecated: (d = (c = e.options) === null || c === void 0 ? void 0 : c.deprecated) !== null && d !== void 0 ? d : !1,
    file: n,
    parent: t,
    name: e.name,
    typeName: Te(e, t, n),
    fields: [],
    field: {},
    oneofs: [],
    members: [],
    nestedEnums: [],
    nestedMessages: [],
    nestedExtensions: [],
    toString() {
      return `message ${this.typeName}`;
    }
  };
  ((s = e.options) === null || s === void 0 ? void 0 : s.mapEntry) === !0 ? a.add(i) : (((o = t == null ? void 0 : t.nestedMessages) !== null && o !== void 0 ? o : n.messages).push(i), l.add(i));
  for (const g of e.enumType)
    Hl(g, n, i, l);
  for (const g of e.nestedType)
    Kl(g, n, i, l, a);
}
function ud(e, n, t) {
  var l, a;
  const c = {
    kind: "service",
    proto: e,
    deprecated: (a = (l = e.options) === null || l === void 0 ? void 0 : l.deprecated) !== null && a !== void 0 ? a : !1,
    file: n,
    name: e.name,
    typeName: Te(e, void 0, n),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  n.services.push(c), t.add(c);
  for (const d of e.method) {
    const s = gd(d, c, t);
    c.methods.push(s), c.method[s.localName] = s;
  }
}
function gd(e, n, t) {
  var l, a, c, d;
  let s;
  e.clientStreaming && e.serverStreaming ? s = "bidi_streaming" : e.clientStreaming ? s = "client_streaming" : e.serverStreaming ? s = "server_streaming" : s = "unary";
  const o = t.getMessage(ne(e.inputType)), i = t.getMessage(ne(e.outputType));
  P(o, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), P(i, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const g = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (l = e.options) === null || l === void 0 ? void 0 : l.deprecated) !== null && a !== void 0 ? a : !1,
    parent: n,
    name: g,
    localName: We(g.length ? We(g[0].toLowerCase() + g.substring(1)) : g),
    methodKind: s,
    input: o,
    output: i,
    idempotency: (d = (c = e.options) === null || c === void 0 ? void 0 : c.idempotencyLevel) !== null && d !== void 0 ? d : cd,
    toString() {
      return `rpc ${n.typeName}.${g}`;
    }
  };
}
function md(e, n) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: n,
    fields: [],
    name: e.name,
    localName: We(Ce(e.name)),
    toString() {
      return `oneof ${n.typeName}.${this.name}`;
    }
  };
}
function Gn(e, n, t, l, a) {
  var c, d, s;
  const o = a === void 0, i = {
    kind: "field",
    proto: e,
    deprecated: (d = (c = e.options) === null || c === void 0 ? void 0 : c.deprecated) !== null && d !== void 0 ? d : !1,
    name: e.name,
    number: e.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: yd(e, l, o, n),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (o) {
    const u = n.kind == "file" ? n : n.file, I = n.kind == "file" ? void 0 : n, b = Te(e, I, u);
    i.kind = "extension", i.file = u, i.parent = I, i.oneof = void 0, i.typeName = b, i.jsonName = `[${b}]`, i.toString = () => `extension ${b}`;
    const Z = t.getMessage(ne(e.extendee));
    P(Z, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), i.extendee = Z;
  } else {
    const u = n;
    P(u.kind == "message"), i.parent = u, i.oneof = l, i.localName = l ? Ce(e.name) : We(Ce(e.name)), i.jsonName = e.jsonName, i.toString = () => `field ${u.typeName}.${e.name}`;
  }
  const g = e.label, m = e.type, h = (s = e.options) === null || s === void 0 ? void 0 : s.jstype;
  if (g === Kn) {
    const u = m == Ve ? a == null ? void 0 : a.get(ne(e.typeName)) : void 0;
    if (u) {
      i.fieldKind = "map";
      const { key: I, value: b } = fd(u);
      return i.mapKey = I.scalar, i.mapKind = b.fieldKind, i.message = b.message, i.delimitedEncoding = !1, i.enum = b.enum, i.scalar = b.scalar, i;
    }
    switch (i.fieldKind = "list", m) {
      case Ve:
      case Ue:
        i.listKind = "message", i.message = t.getMessage(ne(e.typeName)), P(i.message), i.delimitedEncoding = It(e, n);
        break;
      case gt:
        i.listKind = "enum", i.enum = t.getEnum(ne(e.typeName)), P(i.enum);
        break;
      default:
        i.listKind = "scalar", i.scalar = m, i.longAsString = h == mt;
        break;
    }
    return i.packed = pd(e, n), i;
  }
  switch (m) {
    case Ve:
    case Ue:
      i.fieldKind = "message", i.message = t.getMessage(ne(e.typeName)), P(
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        i.message,
        `invalid FieldDescriptorProto: type_name ${e.typeName} not found`
      ), i.delimitedEncoding = It(e, n), i.getDefaultValue = () => {
      };
      break;
    case gt: {
      const u = t.getEnum(ne(e.typeName));
      P(u !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), i.fieldKind = "enum", i.enum = t.getEnum(ne(e.typeName)), i.getDefaultValue = () => Xe(e, "defaultValue") ? Oc(u, e.defaultValue) : void 0;
      break;
    }
    default: {
      i.fieldKind = "scalar", i.scalar = m, i.longAsString = h == mt, i.getDefaultValue = () => Xe(e, "defaultValue") ? _c(m, e.defaultValue) : void 0;
      break;
    }
  }
  return i;
}
function bd(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return ed;
    case "proto3":
      return nd;
    case "editions":
      if (e.edition in zl)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function Id(e, n) {
  return e.dependency.map((t) => {
    const l = n.getFile(t);
    if (!l)
      throw new Error(`Cannot find ${t}, imported by ${e.name}`);
    return l;
  });
}
function Gd(e, n) {
  const t = hd(e) + "_";
  for (const l of n) {
    if (!l.name.toLowerCase().startsWith(t))
      return;
    const a = l.name.substring(t.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return t;
}
function hd(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (n) => "_" + n)).toLowerCase();
}
function Te(e, n, t) {
  let l;
  return n ? l = `${n.typeName}.${e.name}` : t.proto.package.length > 0 ? l = `${t.proto.package}.${e.name}` : l = `${e.name}`, l;
}
function ne(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function Zd(e, n) {
  if (!Xe(e, "oneofIndex") || e.proto3Optional)
    return;
  const t = n[e.oneofIndex];
  return P(
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    t,
    `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`
  ), t;
}
function yd(e, n, t, l) {
  return e.label == ad ? sd : e.label == Kn ? dd : n || e.proto3Optional || e.type == Ve || t ? rn : Ge("fieldPresence", { proto: e, parent: l });
}
function pd(e, n) {
  if (e.label != Kn)
    return !1;
  switch (e.type) {
    case td:
    case ld:
    case Ue:
    case Ve:
      return !1;
  }
  const t = e.options;
  return t && Xe(t, "packed") ? t.packed : od == Ge("repeatedFieldEncoding", {
    proto: e,
    parent: n
  });
}
function fd(e) {
  const n = e.fields.find((l) => l.number === 1), t = e.fields.find((l) => l.number === 2);
  return P(n && n.fieldKind == "scalar" && n.scalar != r.BYTES && n.scalar != r.FLOAT && n.scalar != r.DOUBLE && t && t.fieldKind != "list" && t.fieldKind != "map"), { key: n, value: t };
}
function Vd(e) {
  var n;
  return rd == Ge("enumType", {
    proto: e.proto,
    parent: (n = e.parent) !== null && n !== void 0 ? n : e.file
  });
}
function It(e, n) {
  return e.type == Ue ? !0 : id == Ge("messageEncoding", {
    proto: e,
    parent: n
  });
}
function Ge(e, n) {
  var t, l;
  const a = (t = n.proto.options) === null || t === void 0 ? void 0 : t.features;
  if (a) {
    const c = a[e];
    if (c != 0)
      return c;
  }
  if ("kind" in n) {
    if (n.kind == "message")
      return Ge(e, (l = n.parent) !== null && l !== void 0 ? l : n.file);
    const c = zl[n.edition];
    if (!c)
      throw new Error(`feature default for edition ${n.edition} not found`);
    return c[e];
  }
  return Ge(e, n.parent);
}
function P(e, n) {
  if (!e)
    throw new Error(n);
}
function Ad(e) {
  const n = Xd(e);
  return n.messageType.forEach(Hn), xl(n, () => {
  }).getFile(n.name);
}
function Xd(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map(Ml), enumType: e.enumType.map(wl) }));
}
function Ml(e) {
  var n, t, l, a, c, d, s, o;
  return {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (t = (n = e.field) === null || n === void 0 ? void 0 : n.map(Cd)) !== null && t !== void 0 ? t : [],
    extension: [],
    nestedType: (a = (l = e.nestedType) === null || l === void 0 ? void 0 : l.map(Ml)) !== null && a !== void 0 ? a : [],
    enumType: (d = (c = e.enumType) === null || c === void 0 ? void 0 : c.map(wl)) !== null && d !== void 0 ? d : [],
    extensionRange: (o = (s = e.extensionRange) === null || s === void 0 ? void 0 : s.map((i) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, i))) !== null && o !== void 0 ? o : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  };
}
function Cd(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? Wd(e.options) : void 0 }));
}
function Wd(e) {
  var n, t, l;
  return Object.assign(/* @__PURE__ */ Object.create({
    ctype: 0,
    packed: !1,
    jstype: 0,
    lazy: !1,
    unverifiedLazy: !1,
    deprecated: !1,
    weak: !1,
    debugRedact: !1,
    retention: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), { targets: (n = e.targets) !== null && n !== void 0 ? n : [], editionDefaults: (l = (t = e.editionDefaults) === null || t === void 0 ? void 0 : t.map((c) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, c))) !== null && l !== void 0 ? l : [], uninterpretedOption: [] }));
}
function wl(e) {
  return {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: e.name,
    reservedName: [],
    reservedRange: [],
    value: e.value.map((n) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, n))
  };
}
function Ye(e, n, ...t) {
  return t.reduce((l, a) => l.nestedMessages[a], e.messages[n]);
}
const Mn = /* @__PURE__ */ Ad({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }] }), Bd = /* @__PURE__ */ Ye(Mn, 1);
var Gt;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(Gt || (Gt = {}));
var ht;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(ht || (ht = {}));
var Zt;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(Zt || (Zt = {}));
var yt;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(yt || (yt = {}));
var pt;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(pt || (pt = {}));
var ft;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(ft || (ft = {}));
var Vt;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(Vt || (Vt = {}));
var At;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(At || (At = {}));
var hn;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(hn || (hn = {}));
var Xt;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(Xt || (Xt = {}));
var Ct;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(Ct || (Ct = {}));
var Wt;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(Wt || (Wt = {}));
var Bt;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(Bt || (Bt = {}));
var Rt;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(Rt || (Rt = {}));
var Jt;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(Jt || (Jt = {}));
var St;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(St || (St = {}));
var Yt;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(Yt || (Yt = {}));
const Ft = {
  readUnknownFields: !0
};
function Rd(e) {
  return e ? Object.assign(Object.assign({}, Ft), e) : Ft;
}
function Pe(e, n, t) {
  const l = Q(e, void 0, !1);
  return Ll(l, new Sn(n), Rd(t), !1, n.byteLength), l.message;
}
function Ll(e, n, t, l, a) {
  var c;
  const d = l ? n.len : n.pos + a;
  let s, o;
  const i = (c = e.getUnknown()) !== null && c !== void 0 ? c : [];
  for (; n.pos < d && ([s, o] = n.tag(), !(l && o == J.EndGroup)); ) {
    const g = e.findNumber(s);
    if (!g) {
      const m = n.skip(o, s);
      t.readUnknownFields && i.push({ no: s, wireType: o, data: m });
      continue;
    }
    kl(e, n, g, o, t);
  }
  if (l && (o != J.EndGroup || s !== a))
    throw new Error("invalid end group tag");
  i.length > 0 && e.setUnknown(i);
}
function kl(e, n, t, l, a) {
  switch (t.fieldKind) {
    case "scalar":
      e.set(t, he(n, t.scalar));
      break;
    case "enum":
      e.set(t, he(n, r.INT32));
      break;
    case "message":
      e.set(t, wn(n, a, t, e.get(t)));
      break;
    case "list":
      Sd(n, l, e.get(t), a);
      break;
    case "map":
      Jd(n, e.get(t), a);
      break;
  }
}
function Jd(e, n, t) {
  const l = n.field();
  let a, c;
  const d = e.pos + e.uint32();
  for (; e.pos < d; ) {
    const [s] = e.tag();
    switch (s) {
      case 1:
        a = he(e, l.mapKey);
        break;
      case 2:
        switch (l.mapKind) {
          case "scalar":
            c = he(e, l.scalar);
            break;
          case "enum":
            c = e.int32();
            break;
          case "message":
            c = wn(e, t, l);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = ge(l.mapKey, !1)), c === void 0)
    switch (l.mapKind) {
      case "scalar":
        c = ge(l.scalar, !1);
        break;
      case "enum":
        c = l.enum.values[0].number;
        break;
      case "message":
        c = Q(l.message, void 0, !1);
        break;
    }
  n.set(a, c);
}
function Sd(e, n, t, l) {
  var a;
  const c = t.field();
  if (c.listKind === "message") {
    t.add(wn(e, l, c));
    return;
  }
  const d = (a = c.scalar) !== null && a !== void 0 ? a : r.INT32;
  if (!(n == J.LengthDelimited && d != r.STRING && d != r.BYTES)) {
    t.add(he(e, d));
    return;
  }
  const o = e.uint32() + e.pos;
  for (; e.pos < o; )
    t.add(he(e, d));
}
function wn(e, n, t, l) {
  const a = t.delimitedEncoding, c = l ?? Q(t.message, void 0, !1);
  return Ll(c, e, n, a, a ? t.number : e.uint32()), c;
}
function he(e, n) {
  switch (n) {
    case r.STRING:
      return e.string();
    case r.BOOL:
      return e.bool();
    case r.DOUBLE:
      return e.double();
    case r.FLOAT:
      return e.float();
    case r.INT32:
      return e.int32();
    case r.INT64:
      return e.int64();
    case r.UINT64:
      return e.uint64();
    case r.FIXED64:
      return e.fixed64();
    case r.BYTES:
      return e.bytes();
    case r.FIXED32:
      return e.fixed32();
    case r.SFIXED32:
      return e.sfixed32();
    case r.SFIXED64:
      return e.sfixed64();
    case r.SINT64:
      return e.sint64();
    case r.UINT32:
      return e.uint32();
    case r.SINT32:
      return e.sint32();
  }
}
function R(e, n) {
  var t;
  const l = Pe(Bd, zn(e));
  return l.messageType.forEach(Hn), l.dependency = (t = n == null ? void 0 : n.map((c) => c.proto.name)) !== null && t !== void 0 ? t : [], xl(l, (c) => n == null ? void 0 : n.find((d) => d.proto.name === c)).getFile(l.name);
}
const pe = /* @__PURE__ */ R("Ch9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvEg9nb29nbGUucHJvdG9idWYiKwoJVGltZXN0YW1wEg8KB3NlY29uZHMYASABKAMSDQoFbmFub3MYAiABKAVChQEKE2NvbS5nb29nbGUucHJvdG9idWZCDlRpbWVzdGFtcFByb3RvUAFaMmdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3RpbWVzdGFtcHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), Yd = /* @__PURE__ */ R("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), Fd = /* @__PURE__ */ Ye(Yd, 0), Ed = 3, Et = {
  writeUnknownFields: !0
};
function Nd(e) {
  return e ? Object.assign(Object.assign({}, Et), e) : Et;
}
function Ul(e, n, t) {
  return Qe(new Al(), Nd(t), Q(e, n)).finish();
}
function Qe(e, n, t) {
  var l;
  for (const a of t.sortedFields) {
    if (!t.isSet(a)) {
      if (a.presence == Ed)
        throw new Error(`cannot encode field ${t.desc.typeName}.${a.name} to binary: required field not set`);
      continue;
    }
    Ql(e, n, t, a);
  }
  if (n.writeUnknownFields)
    for (const { no: a, wireType: c, data: d } of (l = t.getUnknown()) !== null && l !== void 0 ? l : [])
      e.tag(a, c).raw(d);
  return e;
}
function Ql(e, n, t, l) {
  var a;
  switch (l.fieldKind) {
    case "scalar":
    case "enum":
      ve(e, (a = l.scalar) !== null && a !== void 0 ? a : r.INT32, l.number, t.get(l));
      break;
    case "list":
      xd(e, n, l, t.get(l));
      break;
    case "message":
      vl(e, n, l, t.get(l));
      break;
    case "map":
      for (const [c, d] of t.get(l))
        zd(e, n, l, c, d);
      break;
  }
}
function ve(e, n, t, l) {
  Dl(e.tag(t, Hd(n)), n, l);
}
function vl(e, n, t, l) {
  t.delimitedEncoding ? Qe(e.tag(t.number, J.StartGroup), n, l).tag(t.number, J.EndGroup) : Qe(e.tag(t.number, J.LengthDelimited).fork(), n, l).join();
}
function xd(e, n, t, l) {
  var a;
  if (t.listKind == "message") {
    for (const d of l)
      vl(e, n, t, d);
    return;
  }
  const c = (a = t.scalar) !== null && a !== void 0 ? a : r.INT32;
  if (t.packed) {
    if (!l.size)
      return;
    e.tag(t.number, J.LengthDelimited).fork();
    for (const d of l)
      Dl(e, c, d);
    e.join();
    return;
  }
  for (const d of l)
    ve(e, c, t.number, d);
}
function zd(e, n, t, l, a) {
  var c;
  switch (e.tag(t.number, J.LengthDelimited).fork(), ve(e, t.mapKey, 1, l), t.mapKind) {
    case "scalar":
    case "enum":
      ve(e, (c = t.scalar) !== null && c !== void 0 ? c : r.INT32, 2, a);
      break;
    case "message":
      Qe(e.tag(2, J.LengthDelimited).fork(), n, a).join();
      break;
  }
  e.join();
}
function Dl(e, n, t) {
  switch (n) {
    case r.STRING:
      e.string(t);
      break;
    case r.BOOL:
      e.bool(t);
      break;
    case r.DOUBLE:
      e.double(t);
      break;
    case r.FLOAT:
      e.float(t);
      break;
    case r.INT32:
      e.int32(t);
      break;
    case r.INT64:
      e.int64(t);
      break;
    case r.UINT64:
      e.uint64(t);
      break;
    case r.FIXED64:
      e.fixed64(t);
      break;
    case r.BYTES:
      e.bytes(t);
      break;
    case r.FIXED32:
      e.fixed32(t);
      break;
    case r.SFIXED32:
      e.sfixed32(t);
      break;
    case r.SFIXED64:
      e.sfixed64(t);
      break;
    case r.SINT64:
      e.sint64(t);
      break;
    case r.UINT32:
      e.uint32(t);
      break;
    case r.SINT32:
      e.sint32(t);
      break;
  }
}
function Hd(e) {
  switch (e) {
    case r.BYTES:
    case r.STRING:
      return J.LengthDelimited;
    case r.DOUBLE:
    case r.FIXED64:
    case r.SFIXED64:
      return J.Bit64;
    case r.FIXED32:
    case r.SFIXED32:
    case r.FLOAT:
      return J.Bit32;
    default:
      return J.Varint;
  }
}
function Kd(e, n, t) {
  let l = !1;
  return t || (t = O(Fd), l = !0), t.value = Ul(e, n), t.typeUrl = Ld(n.$typeName), l ? t : void 0;
}
function Md(e, n) {
  if (e.typeUrl === "")
    return !1;
  const t = typeof n == "string" ? n : n.typeName, l = Tl(e.typeUrl);
  return t === l;
}
function wd(e, n) {
  if (e.typeUrl === "")
    return;
  const t = n.kind == "message" ? n : n.getMessage(Tl(e.typeUrl));
  if (!(!t || !Md(e, t)))
    return Pe(t, e.value);
}
function Ld(e) {
  return `type.googleapis.com/${e}`;
}
function Tl(e) {
  const n = e.lastIndexOf("/"), t = n >= 0 ? e.substring(n + 1) : e;
  if (!t.length)
    throw new Error(`invalid type url: ${e}`);
  return t;
}
const kd = /* @__PURE__ */ R("Ch5nb29nbGUvcHJvdG9idWYvZHVyYXRpb24ucHJvdG8SD2dvb2dsZS5wcm90b2J1ZiIqCghEdXJhdGlvbhIPCgdzZWNvbmRzGAEgASgDEg0KBW5hbm9zGAIgASgFQoMBChNjb20uZ29vZ2xlLnByb3RvYnVmQg1EdXJhdGlvblByb3RvUAFaMWdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2R1cmF0aW9ucGL4AQGiAgNHUEKqAh5Hb29nbGUuUHJvdG9idWYuV2VsbEtub3duVHlwZXNiBnByb3RvMw"), Ln = /* @__PURE__ */ R("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), Ud = /* @__PURE__ */ Ye(Ln, 0), Pl = /* @__PURE__ */ Ye(Ln, 1), Qd = /* @__PURE__ */ Ye(Ln, 2);
var Zn;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(Zn || (Zn = {}));
function vd(e, n) {
  jl(n, e);
  const t = Td(e.$unknown, n), [l, a, c] = je(n);
  for (const d of t)
    kl(l, new Sn(d.data), a, d.wireType, {
      readUnknownFields: !1
    });
  return c();
}
function Dd(e, n, t) {
  var l;
  jl(n, e);
  const a = ((l = e.$unknown) !== null && l !== void 0 ? l : []).filter((i) => i.no !== n.number), [c, d] = je(n, t), s = new Al();
  Ql(s, { writeUnknownFields: !1 }, c, d);
  const o = new Sn(s.finish());
  for (; o.pos < o.len; ) {
    const [i, g] = o.tag(), m = o.skip(g, i);
    a.push({ no: i, wireType: g, data: m });
  }
  e.$unknown = a;
}
function Td(e, n) {
  if (e === void 0)
    return [];
  if (n.fieldKind === "enum" || n.fieldKind === "scalar") {
    for (let t = e.length - 1; t >= 0; --t)
      if (e[t].no == n.number)
        return [e[t]];
    return [];
  }
  return e.filter((t) => t.no === n.number);
}
function je(e, n) {
  const t = e.typeName, l = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: t }), a = Object.assign(Object.assign({}, e.extendee), { fields: [l], members: [l], oneofs: [] }), c = O(a, n !== void 0 ? { [t]: n } : void 0);
  return [
    Q(a, c),
    l,
    () => {
      const d = c[t];
      if (d === void 0) {
        const s = e.message;
        return Se(s) ? ge(s.fields[0].scalar, s.fields[0].longAsString) : O(s);
      }
      return d;
    }
  ];
}
function jl(e, n) {
  if (e.extendee.typeName != n.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const Pd = 3, jd = 2, Nt = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function Od(e) {
  return e ? Object.assign(Object.assign({}, Nt), e) : Nt;
}
function _d(e, n, t) {
  return Fe(Q(e, n), Od(t));
}
function $d(e, n, t) {
  var l;
  const a = _d(e, n, t);
  return JSON.stringify(a, null, (l = t == null ? void 0 : t.prettySpaces) !== null && l !== void 0 ? l : 0);
}
function Fe(e, n) {
  var t;
  const l = ts(e, n);
  if (l !== void 0)
    return l;
  const a = {};
  for (const c of e.sortedFields) {
    if (!e.isSet(c)) {
      if (c.presence == Pd)
        throw new Error(`cannot encode field ${e.desc.typeName}.${c.name} to JSON: required field not set`);
      if (!n.alwaysEmitImplicit || c.presence !== jd)
        continue;
    }
    const d = xt(c, e.get(c), n);
    d !== void 0 && (a[ns(c, n)] = d);
  }
  if (n.registry) {
    const c = /* @__PURE__ */ new Set();
    for (const d of (t = e.getUnknown()) !== null && t !== void 0 ? t : []) {
      if (c.has(d.no))
        continue;
      const s = n.registry.getExtensionFor(e.desc, d.no);
      if (!s)
        continue;
      const o = vd(e.message, s), [i, g] = je(s, o), m = xt(g, i.get(g), n);
      m !== void 0 && (a[s.jsonName] = m);
    }
  }
  return a;
}
function xt(e, n, t) {
  switch (e.fieldKind) {
    case "scalar":
      return Oe(e, n);
    case "message":
      return Fe(n, t);
    case "enum":
      return kn(e.enum, n, t.enumAsInteger);
    case "list":
      return es(n, t);
    case "map":
      return qd(n, t);
  }
}
function qd(e, n) {
  const t = e.field(), l = {};
  switch (t.mapKind) {
    case "scalar":
      for (const [a, c] of e)
        l[a] = Oe(t, c);
      break;
    case "message":
      for (const [a, c] of e)
        l[a] = Fe(c, n);
      break;
    case "enum":
      for (const [a, c] of e)
        l[a] = kn(t.enum, c, n.enumAsInteger);
      break;
  }
  return n.alwaysEmitImplicit || e.size > 0 ? l : void 0;
}
function es(e, n) {
  const t = e.field(), l = [];
  switch (t.listKind) {
    case "scalar":
      for (const a of e)
        l.push(Oe(t, a));
      break;
    case "enum":
      for (const a of e)
        l.push(kn(t.enum, a, n.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        l.push(Fe(a, n));
      break;
  }
  return n.alwaysEmitImplicit || l.length > 0 ? l : void 0;
}
function kn(e, n, t) {
  var l;
  if (typeof n != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${N(n)}`);
  if (e.typeName == "google.protobuf.NullValue")
    return null;
  if (t)
    return n;
  const a = e.value[n];
  return (l = a == null ? void 0 : a.name) !== null && l !== void 0 ? l : n;
}
function Oe(e, n) {
  var t, l, a, c, d, s;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case r.INT32:
    case r.SFIXED32:
    case r.SINT32:
    case r.FIXED32:
    case r.UINT32:
      if (typeof n != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(t = re(e, n)) === null || t === void 0 ? void 0 : t.message}`);
      return n;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case r.FLOAT:
    case r.DOUBLE:
      if (typeof n != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(l = re(e, n)) === null || l === void 0 ? void 0 : l.message}`);
      return isNaN(n) ? "NaN" : n === Number.POSITIVE_INFINITY ? "Infinity" : n === Number.NEGATIVE_INFINITY ? "-Infinity" : n;
    // string:
    case r.STRING:
      if (typeof n != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = re(e, n)) === null || a === void 0 ? void 0 : a.message}`);
      return n;
    // bool:
    case r.BOOL:
      if (typeof n != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(c = re(e, n)) === null || c === void 0 ? void 0 : c.message}`);
      return n;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case r.UINT64:
    case r.FIXED64:
    case r.INT64:
    case r.SFIXED64:
    case r.SINT64:
      if (typeof n != "bigint" && typeof n != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(d = re(e, n)) === null || d === void 0 ? void 0 : d.message}`);
      return n.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case r.BYTES:
      if (n instanceof Uint8Array)
        return El(n);
      throw new Error(`cannot encode ${e} to JSON: ${(s = re(e, n)) === null || s === void 0 ? void 0 : s.message}`);
  }
}
function ns(e, n) {
  return n.useProtoFieldName ? e.name : e.jsonName;
}
function ts(e, n) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return ls(e.message, n);
      case "google.protobuf.Timestamp":
        return ds(e.message);
      case "google.protobuf.Duration":
        return as(e.message);
      case "google.protobuf.FieldMask":
        return cs(e.message);
      case "google.protobuf.Struct":
        return Ol(e.message);
      case "google.protobuf.Value":
        return Un(e.message);
      case "google.protobuf.ListValue":
        return _l(e.message);
      default:
        if (Se(e.desc)) {
          const t = e.desc.fields[0];
          return Oe(t, e.get(t));
        }
        return;
    }
}
function ls(e, n) {
  if (e.typeUrl === "")
    return {};
  const { registry: t } = n;
  let l, a;
  if (t && (l = wd(e, t), l && (a = t.getMessage(l.$typeName))), !a || !l)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let c = Fe(Q(a, l), n);
  return (a.typeName.startsWith("google.protobuf.") || c === null || Array.isArray(c) || typeof c != "object") && (c = { value: c }), c["@type"] = e.typeUrl, c;
}
function as(e) {
  if (Number(e.seconds) > 315576e6 || Number(e.seconds) < -315576e6)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
  let n = e.seconds.toString();
  if (e.nanos !== 0) {
    let t = Math.abs(e.nanos).toString();
    t = "0".repeat(9 - t.length) + t, t.substring(3) === "000000" ? t = t.substring(0, 3) : t.substring(6) === "000" && (t = t.substring(0, 6)), n += "." + t, e.nanos < 0 && Number(e.seconds) == 0 && (n = "-" + n);
  }
  return n + "s";
}
function cs(e) {
  return e.paths.map((n) => {
    if (n.match(/_[0-9]?_/g) || n.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + n + '" is irreversible');
    return Ce(n);
  }).join(",");
}
function Ol(e) {
  const n = {};
  for (const [t, l] of Object.entries(e.fields))
    n[t] = Un(l);
  return n;
}
function Un(e) {
  switch (e.kind.case) {
    case "nullValue":
      return null;
    case "numberValue":
      if (!Number.isFinite(e.kind.value))
        throw new Error(`${e.$typeName} cannot be NaN or Infinity`);
      return e.kind.value;
    case "boolValue":
      return e.kind.value;
    case "stringValue":
      return e.kind.value;
    case "structValue":
      return Ol(e.kind.value);
    case "listValue":
      return _l(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function _l(e) {
  return e.values.map(Un);
}
function ds(e) {
  const n = Number(e.seconds) * 1e3;
  if (n < Date.parse("0001-01-01T00:00:00Z") || n > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  if (e.nanos < 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
  let t = "Z";
  if (e.nanos > 0) {
    const l = (e.nanos + 1e9).toString().substring(1);
    l.substring(3) === "000000" ? t = "." + l.substring(0, 3) + "Z" : l.substring(6) === "000" ? t = "." + l.substring(0, 6) + "Z" : t = "." + l + "Z";
  }
  return new Date(n).toISOString().replace(".000Z", t);
}
const zt = {
  ignoreUnknownFields: !1
};
function ss(e) {
  return e ? Object.assign(Object.assign({}, zt), e) : zt;
}
function os(e, n, t) {
  return $l(e, Is(n, e.typeName), t);
}
function $l(e, n, t) {
  const l = Q(e);
  try {
    Ze(l, n, ss(t));
  } catch (a) {
    throw Sc(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return l.message;
}
function Ze(e, n, t) {
  var l;
  if (Gs(e, n, t))
    return;
  if (n == null || Array.isArray(n) || typeof n != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${N(n)}`);
  const a = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map();
  for (const d of e.desc.fields)
    c.set(d.name, d).set(d.jsonName, d);
  for (const [d, s] of Object.entries(n)) {
    const o = c.get(d);
    if (o) {
      if (o.oneof) {
        if (s === null && o.fieldKind == "scalar")
          continue;
        const i = a.get(o.oneof);
        if (i !== void 0)
          throw new w(o.oneof, `oneof set multiple times by ${i.name} and ${o.name}`);
        a.set(o.oneof, o);
      }
      Ht(e, o, s, t);
    } else {
      let i;
      if (d.startsWith("[") && d.endsWith("]") && (i = (l = t.registry) === null || l === void 0 ? void 0 : l.getExtension(d.substring(1, d.length - 1))) && i.extendee.typeName === e.desc.typeName) {
        const [g, m, h] = je(i);
        Ht(g, m, s, t), Dd(e.message, i, h());
      }
      if (!i && !t.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${d}" is unknown`);
    }
  }
}
function Ht(e, n, t, l) {
  switch (n.fieldKind) {
    case "scalar":
      ms(e, n, t);
      break;
    case "enum":
      gs(e, n, t, l);
      break;
    case "message":
      us(e, n, t, l);
      break;
    case "list":
      rs(e.get(n), t, l);
      break;
    case "map":
      is(e.get(n), t, l);
      break;
  }
}
function is(e, n, t) {
  if (n === null)
    return;
  const l = e.field();
  if (typeof n != "object" || Array.isArray(n))
    throw new w(l, "expected object, got " + N(n));
  for (const [a, c] of Object.entries(n)) {
    if (c === null)
      throw new w(l, "map value must not be null");
    let d;
    switch (l.mapKind) {
      case "message":
        const o = Q(l.message);
        Ze(o, c, t), d = o;
        break;
      case "enum":
        if (d = Qn(l.enum, c, t.ignoreUnknownFields, !0), d === _e)
          return;
        break;
      case "scalar":
        d = qe(l, c, !0);
        break;
    }
    const s = bs(l.mapKey, a);
    e.set(s, d);
  }
}
function rs(e, n, t) {
  if (n === null)
    return;
  const l = e.field();
  if (!Array.isArray(n))
    throw new w(l, "expected Array, got " + N(n));
  for (const a of n) {
    if (a === null)
      throw new w(l, "list item must not be null");
    switch (l.listKind) {
      case "message":
        const c = Q(l.message);
        Ze(c, a, t), e.add(c);
        break;
      case "enum":
        const d = Qn(l.enum, a, t.ignoreUnknownFields, !0);
        d !== _e && e.add(d);
        break;
      case "scalar":
        e.add(qe(l, a, !0));
        break;
    }
  }
}
function us(e, n, t, l) {
  if (t === null && n.message.typeName != "google.protobuf.Value") {
    e.clear(n);
    return;
  }
  const a = e.isSet(n) ? e.get(n) : Q(n.message);
  Ze(a, t, l), e.set(n, a);
}
function gs(e, n, t, l) {
  const a = Qn(n.enum, t, l.ignoreUnknownFields, !1);
  a === $e ? e.clear(n) : a !== _e && e.set(n, a);
}
function ms(e, n, t) {
  const l = qe(n, t, !1);
  l === $e ? e.clear(n) : e.set(n, l);
}
const _e = Symbol();
function Qn(e, n, t, l) {
  if (n === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : l ? e.values[0].number : $e;
  switch (typeof n) {
    case "number":
      if (Number.isInteger(n))
        return n;
      break;
    case "string":
      const a = e.values.find((c) => c.name === n);
      if (a !== void 0)
        return a.number;
      if (t)
        return _e;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${N(n)}`);
}
const $e = Symbol();
function qe(e, n, t) {
  if (n === null)
    return t ? ge(e.scalar, !1) : $e;
  switch (e.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case r.DOUBLE:
    case r.FLOAT:
      if (n === "NaN")
        return NaN;
      if (n === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (n === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof n == "number") {
        if (isNaN(n))
          throw new w(e, "unexpected NaN number");
        if (!isFinite(n))
          throw new w(e, "unexpected infinite number");
        break;
      }
      if (typeof n == "string") {
        if (n === "" || n.trim().length !== n.length)
          break;
        const l = Number(n);
        if (!isFinite(l))
          break;
        return l;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case r.INT32:
    case r.FIXED32:
    case r.SFIXED32:
    case r.SINT32:
    case r.UINT32:
      return ql(n);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case r.BYTES:
      if (typeof n == "string") {
        if (n === "")
          return new Uint8Array(0);
        try {
          return zn(n);
        } catch (l) {
          const a = l instanceof Error ? l.message : String(l);
          throw new w(e, a);
        }
      }
      break;
  }
  return n;
}
function bs(e, n) {
  switch (e) {
    case r.BOOL:
      switch (n) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      return n;
    case r.INT32:
    case r.FIXED32:
    case r.UINT32:
    case r.SFIXED32:
    case r.SINT32:
      return ql(n);
    default:
      return n;
  }
}
function ql(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const n = Number(e);
    return Number.isNaN(n) ? e : n;
  }
  return e;
}
function Is(e, n) {
  try {
    return JSON.parse(e);
  } catch (t) {
    const l = t instanceof Error ? t.message : String(t);
    throw new Error(
      `cannot decode message ${n} from JSON: ${l}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: t }
    );
  }
}
function Gs(e, n, t) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return hs(e.message, n, t), !0;
    case "google.protobuf.Timestamp":
      return Zs(e.message, n), !0;
    case "google.protobuf.Duration":
      return ys(e.message, n), !0;
    case "google.protobuf.FieldMask":
      return ps(e.message, n), !0;
    case "google.protobuf.Struct":
      return ea(e.message, n), !0;
    case "google.protobuf.Value":
      return vn(e.message, n), !0;
    case "google.protobuf.ListValue":
      return na(e.message, n), !0;
    default:
      if (Se(e.desc)) {
        const l = e.desc.fields[0];
        return n === null ? e.clear(l) : e.set(l, qe(l, n, !0)), !0;
      }
      return !1;
  }
}
function hs(e, n, t) {
  var l;
  if (n === null || Array.isArray(n) || typeof n != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${N(n)}`);
  if (Object.keys(n).length == 0)
    return;
  const a = n["@type"];
  if (typeof a != "string" || a == "")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
  const c = a.includes("/") ? a.substring(a.lastIndexOf("/") + 1) : a;
  if (!c.length)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
  const d = (l = t.registry) === null || l === void 0 ? void 0 : l.getMessage(c);
  if (!d)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${a} is not in the type registry`);
  const s = Q(d);
  if (c.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(n, "value")) {
    const o = n.value;
    Ze(s, o, t);
  } else {
    const o = Object.assign({}, n);
    delete o["@type"], Ze(s, o, t);
  }
  Kd(s.desc, s.message, e);
}
function Zs(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${N(n)}`);
  const t = n.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!t)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  const l = Date.parse(
    //prettier-ignore
    t[1] + "-" + t[2] + "-" + t[3] + "T" + t[4] + ":" + t[5] + ":" + t[6] + (t[8] ? t[8] : "Z")
  );
  if (Number.isNaN(l))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  if (l < Date.parse("0001-01-01T00:00:00Z") || l > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  e.seconds = B.parse(l / 1e3), e.nanos = 0, t[7] && (e.nanos = parseInt("1" + t[7] + "0".repeat(9 - t[7].length)) - 1e9);
}
function ys(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${N(n)}`);
  const t = n.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (t === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${N(n)}`);
  const l = Number(t[1]);
  if (l > 315576e6 || l < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${N(n)}`);
  if (e.seconds = B.parse(l), typeof t[2] != "string")
    return;
  const a = t[2] + "0".repeat(9 - t[2].length);
  e.nanos = parseInt(a), (l < 0 || Object.is(l, -0)) && (e.nanos = -e.nanos);
}
function ps(e, n) {
  if (typeof n != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${N(n)}`);
  if (n === "")
    return;
  function t(l) {
    if (l.includes("_"))
      throw new Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
    const a = l.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());
    return a[0] === "_" ? a.substring(1) : a;
  }
  e.paths = n.split(",").map(t);
}
function ea(e, n) {
  if (typeof n != "object" || n == null || Array.isArray(n))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${N(n)}`);
  for (const [t, l] of Object.entries(n)) {
    const a = O(Pl);
    vn(a, l), e.fields[t] = a;
  }
}
function vn(e, n) {
  switch (typeof n) {
    case "number":
      e.kind = { case: "numberValue", value: n };
      break;
    case "string":
      e.kind = { case: "stringValue", value: n };
      break;
    case "boolean":
      e.kind = { case: "boolValue", value: n };
      break;
    case "object":
      if (n === null)
        e.kind = { case: "nullValue", value: Zn.NULL_VALUE };
      else if (Array.isArray(n)) {
        const t = O(Qd);
        na(t, n), e.kind = { case: "listValue", value: t };
      } else {
        const t = O(Ud);
        ea(t, n), e.kind = { case: "structValue", value: t };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${N(n)}`);
  }
  return e;
}
function na(e, n) {
  if (!Array.isArray(n))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${N(n)}`);
  for (const t of n) {
    const l = O(Pl);
    vn(l, t), e.values.push(l);
  }
}
function yn(e) {
  const n = X[e];
  return typeof n != "string" ? e.toString() : n[0].toLowerCase() + n.substring(1).replace(/[A-Z]/g, (t) => "_" + t.toLowerCase());
}
let ze;
function fs(e) {
  if (!ze) {
    ze = {};
    for (const n of Object.values(X))
      typeof n != "string" && (ze[yn(n)] = n);
  }
  return ze[e];
}
class S extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with error.
   */
  constructor(n, t = X.Unknown, l, a, c) {
    super(Vs(n, t)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = n, this.code = t, this.metadata = new Headers(l ?? {}), this.details = a ?? [], this.cause = c;
  }
  /**
   * Convert any value - typically a caught error into a ConnectError,
   * following these rules:
   * - If the value is already a ConnectError, return it as is.
   * - If the value is an AbortError from the fetch API, return the message
   *   of the AbortError with code Canceled.
   * - For other Errors, return the error message with code Unknown by default.
   * - For other values, return the values String representation as a message,
   *   with the code Unknown by default.
   * The original value will be used for the "cause" property for the new
   * ConnectError.
   */
  static from(n, t = X.Unknown) {
    return n instanceof S ? n : n instanceof Error ? n.name == "AbortError" ? new S(n.message, X.Canceled) : new S(n.message, t, void 0, void 0, n) : new S(String(n), t, void 0, void 0, n);
  }
  static [Symbol.hasInstance](n) {
    return n instanceof Error ? Object.getPrototypeOf(n) === S.prototype ? !0 : n.name === "ConnectError" && "code" in n && typeof n.code == "number" && "metadata" in n && "details" in n && Array.isArray(n.details) && "rawMessage" in n && typeof n.rawMessage == "string" && "cause" in n : !1;
  }
  findDetails(n) {
    const t = n.kind === "message" ? {
      getMessage: (a) => a === n.typeName ? n : void 0
    } : n, l = [];
    for (const a of this.details) {
      if ("desc" in a) {
        t.getMessage(a.desc.typeName) && l.push(O(a.desc, a.value));
        continue;
      }
      const c = t.getMessage(a.type);
      if (c)
        try {
          l.push(Pe(c, a.value));
        } catch {
        }
    }
    return l;
  }
}
function Vs(e, n) {
  return e.length ? `[${yn(n)}] ${e}` : `[${yn(n)}]`;
}
function As(...e) {
  const n = new Headers();
  for (const t of e)
    t.forEach((l, a) => {
      n.append(a, l);
    });
  return n;
}
function Xs(e, n) {
  const t = {};
  for (const l of e.methods) {
    const a = n(l);
    a != null && (t[l.localName] = a);
  }
  return t;
}
const Kt = 1;
function Cs(e) {
  let n, t = new Uint8Array(0);
  function l(a) {
    const c = new Uint8Array(t.length + a.length);
    c.set(t), c.set(a, t.length), t = c;
  }
  return new ReadableStream({
    start() {
      n = e.getReader();
    },
    async pull(a) {
      let c;
      for (; ; ) {
        if (c === void 0 && t.byteLength >= 5) {
          let o = 0;
          for (let i = 1; i < 5; i++)
            o = (o << 8) + t[i];
          c = { flags: t[0], length: o };
        }
        if (c !== void 0 && t.byteLength >= c.length + 5)
          break;
        const s = await n.read();
        if (s.done)
          break;
        l(s.value);
      }
      if (c === void 0) {
        if (t.byteLength == 0) {
          a.close();
          return;
        }
        a.error(new S("premature end of stream", X.DataLoss));
        return;
      }
      const d = t.subarray(5, 5 + c.length);
      t = t.subarray(5 + c.length), a.enqueue({
        flags: c.flags,
        data: d
      });
    }
  });
}
function Ws(e, n) {
  const t = new Uint8Array(n.length + 5);
  t.set(n, 5);
  const l = new DataView(t.buffer, t.byteOffset, t.byteLength);
  return l.setUint8(0, e), l.setUint32(1, n.length), t;
}
var Bs = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator], t;
  return n ? n.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), t = {}, l("next"), l("throw"), l("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function l(c) {
    t[c] = e[c] && function(d) {
      return new Promise(function(s, o) {
        d = e[c](d), a(s, o, d.done, d.value);
      });
    };
  }
  function a(c, d, s, o) {
    Promise.resolve(o).then(function(i) {
      c({ value: i, done: s });
    }, d);
  }
}, Be = function(e) {
  return this instanceof Be ? (this.v = e, this) : new Be(e);
}, Rs = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var l = t.apply(e, n || []), a, c = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", d), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function d(u) {
    return function(I) {
      return Promise.resolve(I).then(u, m);
    };
  }
  function s(u, I) {
    l[u] && (a[u] = function(b) {
      return new Promise(function(Z, E) {
        c.push([u, b, Z, E]) > 1 || o(u, b);
      });
    }, I && (a[u] = I(a[u])));
  }
  function o(u, I) {
    try {
      i(l[u](I));
    } catch (b) {
      h(c[0][3], b);
    }
  }
  function i(u) {
    u.value instanceof Be ? Promise.resolve(u.value.v).then(g, m) : h(c[0][2], u);
  }
  function g(u) {
    o("next", u);
  }
  function m(u) {
    o("throw", u);
  }
  function h(u, I) {
    u(I), c.shift(), c.length && o(c[0][0], c[0][1]);
  }
}, Js = function(e) {
  var n, t;
  return n = {}, l("next"), l("throw", function(a) {
    throw a;
  }), l("return"), n[Symbol.iterator] = function() {
    return this;
  }, n;
  function l(a, c) {
    n[a] = e[a] ? function(d) {
      return (t = !t) ? { value: Be(e[a](d)), done: !1 } : c ? c(d) : d;
    } : c;
  }
};
function Ss(e) {
  return Rs(this, arguments, function* () {
    yield Be(yield* Js(Bs(e)));
  });
}
var ta = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = e[Symbol.asyncIterator], t;
  return n ? n.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), t = {}, l("next"), l("throw"), l("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function l(c) {
    t[c] = e[c] && function(d) {
      return new Promise(function(s, o) {
        d = e[c](d), a(s, o, d.done, d.value);
      });
    };
  }
  function a(c, d, s, o) {
    Promise.resolve(o).then(function(i) {
      c({ value: i, done: s });
    }, d);
  }
}, ye = function(e) {
  return this instanceof ye ? (this.v = e, this) : new ye(e);
}, Ys = function(e) {
  var n, t;
  return n = {}, l("next"), l("throw", function(a) {
    throw a;
  }), l("return"), n[Symbol.iterator] = function() {
    return this;
  }, n;
  function l(a, c) {
    n[a] = e[a] ? function(d) {
      return (t = !t) ? { value: ye(e[a](d)), done: !1 } : c ? c(d) : d;
    } : c;
  }
}, Fs = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var l = t.apply(e, n || []), a, c = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", d), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function d(u) {
    return function(I) {
      return Promise.resolve(I).then(u, m);
    };
  }
  function s(u, I) {
    l[u] && (a[u] = function(b) {
      return new Promise(function(Z, E) {
        c.push([u, b, Z, E]) > 1 || o(u, b);
      });
    }, I && (a[u] = I(a[u])));
  }
  function o(u, I) {
    try {
      i(l[u](I));
    } catch (b) {
      h(c[0][3], b);
    }
  }
  function i(u) {
    u.value instanceof ye ? Promise.resolve(u.value.v).then(g, m) : h(c[0][2], u);
  }
  function g(u) {
    o("next", u);
  }
  function m(u) {
    o("throw", u);
  }
  function h(u, I) {
    u(I), c.shift(), c.length && o(c[0][0], c[0][1]);
  }
};
function Es(e, n) {
  return Xs(e, (t) => {
    switch (t.methodKind) {
      case "unary":
        return Ns(n, t);
      case "server_streaming":
        return xs(n, t);
      case "client_streaming":
        return zs(n, t);
      case "bidi_streaming":
        return Hs(n, t);
      default:
        return null;
    }
  });
}
function Ns(e, n) {
  return async function(t, l) {
    var a, c;
    const d = await e.unary(n, l == null ? void 0 : l.signal, l == null ? void 0 : l.timeoutMs, l == null ? void 0 : l.headers, t, l == null ? void 0 : l.contextValues);
    return (a = l == null ? void 0 : l.onHeader) === null || a === void 0 || a.call(l, d.header), (c = l == null ? void 0 : l.onTrailer) === null || c === void 0 || c.call(l, d.trailer), d.message;
  };
}
function xs(e, n) {
  return function(t, l) {
    return la(e.stream(n, l == null ? void 0 : l.signal, l == null ? void 0 : l.timeoutMs, l == null ? void 0 : l.headers, Ss([t]), l == null ? void 0 : l.contextValues), l);
  };
}
function zs(e, n) {
  return async function(t, l) {
    var a, c, d, s, o, i;
    const g = await e.stream(n, l == null ? void 0 : l.signal, l == null ? void 0 : l.timeoutMs, l == null ? void 0 : l.headers, t, l == null ? void 0 : l.contextValues);
    (o = l == null ? void 0 : l.onHeader) === null || o === void 0 || o.call(l, g.header);
    let m, h = 0;
    try {
      for (var u = !0, I = ta(g.message), b; b = await I.next(), a = b.done, !a; u = !0)
        s = b.value, u = !1, m = s, h++;
    } catch (Z) {
      c = { error: Z };
    } finally {
      try {
        !u && !a && (d = I.return) && await d.call(I);
      } finally {
        if (c) throw c.error;
      }
    }
    if (!m)
      throw new S("protocol error: missing response message", X.Unimplemented);
    if (h > 1)
      throw new S("protocol error: received extra messages for client streaming method", X.Unimplemented);
    return (i = l == null ? void 0 : l.onTrailer) === null || i === void 0 || i.call(l, g.trailer), m;
  };
}
function Hs(e, n) {
  return function(t, l) {
    return la(e.stream(n, l == null ? void 0 : l.signal, l == null ? void 0 : l.timeoutMs, l == null ? void 0 : l.headers, t, l == null ? void 0 : l.contextValues), l);
  };
}
function la(e, n) {
  const t = function() {
    return Fs(this, arguments, function* () {
      var l, a;
      const c = yield ye(e);
      (l = n == null ? void 0 : n.onHeader) === null || l === void 0 || l.call(n, c.header), yield ye(yield* Ys(ta(c.message))), (a = n == null ? void 0 : n.onTrailer) === null || a === void 0 || a.call(n, c.trailer);
    });
  }()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => t.next()
    })
  };
}
function Ks(...e) {
  const n = new AbortController(), t = e.filter((a) => a !== void 0).concat(n.signal);
  for (const a of t) {
    if (a.aborted) {
      l.apply(a);
      break;
    }
    a.addEventListener("abort", l);
  }
  function l() {
    n.signal.aborted || n.abort(aa(this));
    for (const a of t)
      a.removeEventListener("abort", l);
  }
  return n;
}
function Ms(e) {
  const n = new AbortController(), t = () => {
    n.abort(new S("the operation timed out", X.DeadlineExceeded));
  };
  let l;
  return e !== void 0 && (e <= 0 ? t() : l = setTimeout(t, e)), {
    signal: n.signal,
    cleanup: () => clearTimeout(l)
  };
}
function aa(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const n = new Error("This operation was aborted");
  return n.name = "AbortError", n;
}
function Mt() {
  return {
    get(e) {
      return e.id in this ? this[e.id] : e.defaultValue;
    },
    set(e, n) {
      return this[e.id] = n, this;
    },
    delete(e) {
      return delete this[e.id], this;
    }
  };
}
function ws(e, n, ...t) {
  if (t.length > 0)
    throw new Error();
  return e.services[n];
}
function wt(e, n) {
  return e.toString().replace(/\/?$/, `/${n.parent.typeName}/${n.name}`);
}
function ca(e, n) {
  return O(e, n);
}
function Ls(e, n) {
  function t(l) {
    return l.done === !0 ? l : {
      done: l.done,
      value: ca(e, l.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const l = n[Symbol.asyncIterator](), a = {
        next: () => l.next().then(t)
      };
      return l.throw !== void 0 && (a.throw = (c) => l.throw(c).then(t)), l.return !== void 0 && (a.return = (c) => l.return(c).then(t)), a;
    }
  };
}
function da(e, n) {
  var t;
  return (t = n == null ? void 0 : n.concat().reverse().reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (l, a) => a(l),
    e
  )) !== null && t !== void 0 ? t : e;
}
function sa(e) {
  var n;
  const t = Object.assign({}, e);
  return (n = t.ignoreUnknownFields) !== null && n !== void 0 || (t.ignoreUnknownFields = !0), t;
}
function Lt(e, n, t, l) {
  const a = n ? kt(e.input, l) : Ut(e.input, t);
  return { parse: (n ? kt(e.output, l) : Ut(e.output, t)).parse, serialize: a.serialize };
}
function kt(e, n) {
  return {
    parse(t) {
      try {
        return Pe(e, t, n);
      } catch (l) {
        const a = l instanceof Error ? l.message : String(l);
        throw new S(`parse binary: ${a}`, X.Internal);
      }
    },
    serialize(t) {
      try {
        return Ul(e, t, n);
      } catch (l) {
        const a = l instanceof Error ? l.message : String(l);
        throw new S(`serialize binary: ${a}`, X.Internal);
      }
    }
  };
}
function Ut(e, n) {
  var t, l;
  const a = (t = n == null ? void 0 : n.textEncoder) !== null && t !== void 0 ? t : new TextEncoder(), c = (l = n == null ? void 0 : n.textDecoder) !== null && l !== void 0 ? l : new TextDecoder(), d = sa(n);
  return {
    parse(s) {
      try {
        const o = c.decode(s);
        return os(e, o, d);
      } catch (o) {
        throw S.from(o, X.InvalidArgument);
      }
    },
    serialize(s) {
      try {
        const o = $d(e, s, d);
        return a.encode(o);
      } catch (o) {
        throw S.from(o, X.Internal);
      }
    }
  };
}
const ks = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, Us = "application/proto", Qs = "application/json", vs = "application/connect+proto", Ds = "application/connect+json";
function Ts(e) {
  const n = e == null ? void 0 : e.match(ks);
  if (!n)
    return;
  const t = !!n[1], l = !!n[3];
  return { stream: t, binary: l };
}
function oa(e, n, t) {
  var l;
  if (n && new Headers(n).forEach((s, o) => t.metadata.append(o, s)), typeof e != "object" || e == null || Array.isArray(e))
    throw t;
  let a = t.code;
  "code" in e && typeof e.code == "string" && (a = (l = fs(e.code)) !== null && l !== void 0 ? l : a);
  const c = e.message;
  if (c != null && typeof c != "string")
    throw t;
  const d = new S(c ?? "", a, n);
  if ("details" in e && Array.isArray(e.details))
    for (const s of e.details) {
      if (s === null || typeof s != "object" || Array.isArray(s) || typeof s.type != "string" || typeof s.value != "string")
        throw t;
      try {
        d.details.push({
          type: s.type,
          value: zn(s.value),
          debug: s.debug
        });
      } catch {
        throw t;
      }
    }
  return d;
}
const Qt = 2;
function Ps(e) {
  const n = new S("invalid end stream", X.Unknown);
  let t;
  try {
    t = JSON.parse(typeof e == "string" ? e : new TextDecoder().decode(e));
  } catch {
    throw n;
  }
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw n;
  const l = new Headers();
  if ("metadata" in t) {
    if (typeof t.metadata != "object" || t.metadata == null || Array.isArray(t.metadata))
      throw n;
    for (const [c, d] of Object.entries(t.metadata)) {
      if (!Array.isArray(d) || d.some((s) => typeof s != "string"))
        throw n;
      for (const s of d)
        l.append(c, s);
    }
  }
  const a = "error" in t && t.error != null ? oa(t.error, l, n) : void 0;
  return { metadata: l, error: a };
}
const De = "Content-Type", js = "Content-Length", vt = "Content-Encoding", Os = "Accept-Encoding", _s = "Connect-Timeout-Ms", ia = "Connect-Protocol-Version", $s = "User-Agent";
function qs(e) {
  switch (e) {
    case 400:
      return X.Internal;
    case 401:
      return X.Unauthenticated;
    case 403:
      return X.PermissionDenied;
    case 404:
      return X.Unimplemented;
    case 429:
      return X.Unavailable;
    case 502:
      return X.Unavailable;
    case 503:
      return X.Unavailable;
    case 504:
      return X.Unavailable;
    default:
      return X.Unknown;
  }
}
function Dt(e) {
  const n = new Headers(), t = new Headers();
  return e.forEach((l, a) => {
    a.toLowerCase().startsWith("trailer-") ? t.append(a.substring(8), l) : n.append(a, l);
  }), [n, t];
}
const ra = "1";
function Tt(e, n, t, l, a) {
  const c = new Headers(l ?? {});
  return t !== void 0 && c.set(_s, `${t}`), c.set(De, e == "unary" ? n ? Us : Qs : n ? vs : Ds), c.set(ia, ra), c.has($s), c;
}
function Pt(e, n, t, l) {
  const a = l.get(De), c = Ts(a);
  if (t !== 200) {
    const s = new S(`HTTP ${t}`, qs(t), l);
    if (e == "unary" && c && !c.binary)
      return { isUnaryError: !0, unaryError: s };
    throw s;
  }
  const d = {
    binary: n,
    stream: e !== "unary"
  };
  if ((c == null ? void 0 : c.binary) !== d.binary || c.stream !== d.stream)
    throw new S(`unsupported content type ${a}`, c === void 0 ? X.Unknown : X.Internal, l);
  return { isUnaryError: !1 };
}
const jt = "application/";
function eo(e, n) {
  return n ? El(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function no(e, n, t) {
  let l = `?connect=v${ra}`;
  const a = e.header.get(De);
  (a == null ? void 0 : a.indexOf(jt)) === 0 && (l += "&encoding=" + encodeURIComponent(a.slice(jt.length)));
  const c = e.header.get(vt);
  c !== null && c !== "identity" && (l += "&compression=" + encodeURIComponent(c), t = !0), t && (l += "&base64=1"), l += "&message=" + eo(n, t);
  const d = e.url + l, s = new Headers(e.header);
  return [
    ia,
    De,
    js,
    vt,
    Os
  ].forEach((o) => s.delete(o)), Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: d,
    header: s
  });
}
function to(e) {
  const n = da(e.next, e.interceptors), [t, l, a] = ua(e), c = Object.assign(Object.assign({}, e.req), { message: ca(e.req.method.input, e.req.message), signal: t });
  return n(c).then((d) => (a(), d), l);
}
function lo(e) {
  const n = da(e.next, e.interceptors), [t, l, a] = ua(e), c = Object.assign(Object.assign({}, e.req), { message: Ls(e.req.method.input, e.req.message), signal: t });
  let d = !1;
  return t.addEventListener("abort", function() {
    var s, o;
    const i = e.req.message[Symbol.asyncIterator]();
    d || (s = i.throw) === null || s === void 0 || s.call(i, this.reason).catch(() => {
    }), (o = i.return) === null || o === void 0 || o.call(i).catch(() => {
    });
  }), n(c).then((s) => Object.assign(Object.assign({}, s), { message: {
    [Symbol.asyncIterator]() {
      const o = s.message[Symbol.asyncIterator]();
      return {
        next() {
          return o.next().then((i) => (i.done == !0 && (d = !0, a()), i), l);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), l);
}
function ua(e) {
  const { signal: n, cleanup: t } = Ms(e.timeoutMs), l = Ks(e.signal, n);
  return [
    l.signal,
    function(c) {
      const d = S.from(n.aborted ? aa(n) : c);
      return l.abort(d), t(), Promise.reject(d);
    },
    function() {
      t(), l.abort();
    }
  ];
}
function ao() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var Re = function(e) {
  return this instanceof Re ? (this.v = e, this) : new Re(e);
}, co = function(e, n, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var l = t.apply(e, n || []), a, c = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", d), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function d(u) {
    return function(I) {
      return Promise.resolve(I).then(u, m);
    };
  }
  function s(u, I) {
    l[u] && (a[u] = function(b) {
      return new Promise(function(Z, E) {
        c.push([u, b, Z, E]) > 1 || o(u, b);
      });
    }, I && (a[u] = I(a[u])));
  }
  function o(u, I) {
    try {
      i(l[u](I));
    } catch (b) {
      h(c[0][3], b);
    }
  }
  function i(u) {
    u.value instanceof Re ? Promise.resolve(u.value.v).then(g, m) : h(c[0][2], u);
  }
  function g(u) {
    o("next", u);
  }
  function m(u) {
    o("throw", u);
  }
  function h(u, I) {
    u(I), c.shift(), c.length && o(c[0][0], c[0][1]);
  }
};
const Ot = {
  redirect: "error"
};
function so(e) {
  var n;
  ao();
  const t = (n = e.useBinaryFormat) !== null && n !== void 0 ? n : !1;
  return {
    async unary(l, a, c, d, s, o) {
      const { serialize: i, parse: g } = Lt(l, t, e.jsonOptions, e.binaryOptions);
      return c = c === void 0 ? e.defaultTimeoutMs : c <= 0 ? void 0 : c, await to({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: c,
        req: {
          stream: !1,
          service: l.parent,
          method: l,
          requestMethod: "POST",
          url: wt(e.baseUrl, l),
          header: Tt(l.methodKind, t, c, d, !1),
          contextValues: o ?? Mt(),
          message: s
        },
        next: async (m) => {
          var h;
          const u = e.useHttpGet === !0 && l.idempotency === hn.NO_SIDE_EFFECTS;
          let I = null;
          u ? m = no(m, i(m.message), t) : I = i(m.message);
          const Z = await ((h = e.fetch) !== null && h !== void 0 ? h : globalThis.fetch)(m.url, Object.assign(Object.assign({}, Ot), { method: m.requestMethod, headers: m.header, signal: m.signal, body: I })), { isUnaryError: E, unaryError: A } = Pt(l.methodKind, t, Z.status, Z.headers);
          if (E)
            throw oa(await Z.json(), As(...Dt(Z.headers)), A);
          const [K, z] = Dt(Z.headers);
          return {
            stream: !1,
            service: l.parent,
            method: l,
            header: K,
            message: t ? g(new Uint8Array(await Z.arrayBuffer())) : $l(l.output, await Z.json(), sa(e.jsonOptions)),
            trailer: z
          };
        }
      });
    },
    async stream(l, a, c, d, s, o) {
      const { serialize: i, parse: g } = Lt(l, t, e.jsonOptions, e.binaryOptions);
      function m(u, I, b, Z) {
        return co(this, arguments, function* () {
          const A = Cs(u).getReader();
          let K = !1;
          for (; ; ) {
            const z = yield Re(A.read());
            if (z.done)
              break;
            const { flags: me, data: be } = z.value;
            if ((me & Kt) === Kt)
              throw new S("protocol error: received unsupported compressed output", X.Internal);
            if ((me & Qt) === Qt) {
              K = !0;
              const G = Ps(be);
              if (G.error) {
                const p = G.error;
                throw b.forEach(($, en) => {
                  p.metadata.append(en, $);
                }), p;
              }
              G.metadata.forEach((p, $) => I.set($, p));
              continue;
            }
            yield yield Re(g(be));
          }
          if ("throwIfAborted" in Z && Z.throwIfAborted(), !K)
            throw "missing EndStreamResponse";
        });
      }
      async function h(u) {
        if (l.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const I = await u[Symbol.asyncIterator]().next();
        if (I.done == !0)
          throw "missing request message";
        return Ws(0, i(I.value));
      }
      return c = c === void 0 ? e.defaultTimeoutMs : c <= 0 ? void 0 : c, await lo({
        interceptors: e.interceptors,
        timeoutMs: c,
        signal: a,
        req: {
          stream: !0,
          service: l.parent,
          method: l,
          requestMethod: "POST",
          url: wt(e.baseUrl, l),
          header: Tt(l.methodKind, t, c, d, !1),
          contextValues: o ?? Mt(),
          message: s
        },
        next: async (u) => {
          var I;
          const Z = await ((I = e.fetch) !== null && I !== void 0 ? I : globalThis.fetch)(u.url, Object.assign(Object.assign({}, Ot), { method: u.requestMethod, headers: u.header, signal: u.signal, body: await h(u.message) }));
          if (Pt(l.methodKind, t, Z.status, Z.headers), Z.body === null)
            throw "missing response body";
          const E = new Headers();
          return Object.assign(Object.assign({}, u), { header: Z.headers, trailer: E, message: m(Z.body, E, Z.headers, u.signal) });
        }
      });
    }
  };
}
const v = /* @__PURE__ */ R("ChtidWYvdmFsaWRhdGUvdmFsaWRhdGUucHJvdG8SDGJ1Zi52YWxpZGF0ZSI9CgpDb25zdHJhaW50EgoKAmlkGAEgASgJEg8KB21lc3NhZ2UYAiABKAkSEgoKZXhwcmVzc2lvbhgDIAEoCSJNChJNZXNzYWdlQ29uc3RyYWludHMSEAoIZGlzYWJsZWQYASABKAgSJQoDY2VsGAMgAygLMhguYnVmLnZhbGlkYXRlLkNvbnN0cmFpbnQiJAoQT25lb2ZDb25zdHJhaW50cxIQCghyZXF1aXJlZBgBIAEoCCLXCAoQRmllbGRDb25zdHJhaW50cxIlCgNjZWwYFyADKAsyGC5idWYudmFsaWRhdGUuQ29uc3RyYWludBIQCghyZXF1aXJlZBgZIAEoCBIkCgZpZ25vcmUYGyABKA4yFC5idWYudmFsaWRhdGUuSWdub3JlEikKBWZsb2F0GAEgASgLMhguYnVmLnZhbGlkYXRlLkZsb2F0UnVsZXNIABIrCgZkb3VibGUYAiABKAsyGS5idWYudmFsaWRhdGUuRG91YmxlUnVsZXNIABIpCgVpbnQzMhgDIAEoCzIYLmJ1Zi52YWxpZGF0ZS5JbnQzMlJ1bGVzSAASKQoFaW50NjQYBCABKAsyGC5idWYudmFsaWRhdGUuSW50NjRSdWxlc0gAEisKBnVpbnQzMhgFIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50MzJSdWxlc0gAEisKBnVpbnQ2NBgGIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50NjRSdWxlc0gAEisKBnNpbnQzMhgHIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50MzJSdWxlc0gAEisKBnNpbnQ2NBgIIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50NjRSdWxlc0gAEi0KB2ZpeGVkMzIYCSABKAsyGi5idWYudmFsaWRhdGUuRml4ZWQzMlJ1bGVzSAASLQoHZml4ZWQ2NBgKIAEoCzIaLmJ1Zi52YWxpZGF0ZS5GaXhlZDY0UnVsZXNIABIvCghzZml4ZWQzMhgLIAEoCzIbLmJ1Zi52YWxpZGF0ZS5TRml4ZWQzMlJ1bGVzSAASLwoIc2ZpeGVkNjQYDCABKAsyGy5idWYudmFsaWRhdGUuU0ZpeGVkNjRSdWxlc0gAEicKBGJvb2wYDSABKAsyFy5idWYudmFsaWRhdGUuQm9vbFJ1bGVzSAASKwoGc3RyaW5nGA4gASgLMhkuYnVmLnZhbGlkYXRlLlN0cmluZ1J1bGVzSAASKQoFYnl0ZXMYDyABKAsyGC5idWYudmFsaWRhdGUuQnl0ZXNSdWxlc0gAEicKBGVudW0YECABKAsyFy5idWYudmFsaWRhdGUuRW51bVJ1bGVzSAASLwoIcmVwZWF0ZWQYEiABKAsyGy5idWYudmFsaWRhdGUuUmVwZWF0ZWRSdWxlc0gAEiUKA21hcBgTIAEoCzIWLmJ1Zi52YWxpZGF0ZS5NYXBSdWxlc0gAEiUKA2FueRgUIAEoCzIWLmJ1Zi52YWxpZGF0ZS5BbnlSdWxlc0gAEi8KCGR1cmF0aW9uGBUgASgLMhsuYnVmLnZhbGlkYXRlLkR1cmF0aW9uUnVsZXNIABIxCgl0aW1lc3RhbXAYFiABKAsyHC5idWYudmFsaWRhdGUuVGltZXN0YW1wUnVsZXNIABITCgdza2lwcGVkGBggASgIQgIYARIYCgxpZ25vcmVfZW1wdHkYGiABKAhCAhgBQgYKBHR5cGUiPgoVUHJlZGVmaW5lZENvbnN0cmFpbnRzEiUKA2NlbBgBIAMoCzIYLmJ1Zi52YWxpZGF0ZS5Db25zdHJhaW50IrUXCgpGbG9hdFJ1bGVzEmkKBWNvbnN0GAEgASgCQlrCSFcKVQoLZmxvYXQuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSnwEKAmx0GAIgASgCQpABwkiMAQqJAQoIZmxvYXQubHQafSFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASrwEKA2x0ZRgDIAEoAkKfAcJImwEKmAEKCWZsb2F0Lmx0ZRqKASFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEu8HCgJndBgEIAEoAkLgB8JI3AcKjQEKCGZsb2F0Lmd0GoABIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKwwEKC2Zsb2F0Lmd0X2x0GrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKzQEKFWZsb2F0Lmd0X2x0X2V4Y2x1c2l2ZRqzAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCtMBCgxmbG9hdC5ndF9sdGUawgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrdAQoWZmxvYXQuZ3RfbHRlX2V4Y2x1c2l2ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESuggKA2d0ZRgFIAEoAkKqCMJIpggKmwEKCWZsb2F0Lmd0ZRqNASFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrSAQoMZmxvYXQuZ3RlX2x0GsEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrcAQoWZmxvYXQuZ3RlX2x0X2V4Y2x1c2l2ZRrBAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK4gEKDWZsb2F0Lmd0ZV9sdGUa0AFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCuwBChdmbG9hdC5ndGVfbHRlX2V4Y2x1c2l2ZRrQAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ1CgJpbhgGIAMoAkJpwkhmCmQKCGZsb2F0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnYKBm5vdF9pbhgHIAMoAkJmwkhjCmEKDGZsb2F0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEnUKBmZpbml0ZRgIIAEoCEJlwkhiCmAKDGZsb2F0LmZpbml0ZRpQcnVsZXMuZmluaXRlID8gKHRoaXMuaXNOYW4oKSB8fCB0aGlzLmlzSW5mKCkgPyAndmFsdWUgbXVzdCBiZSBmaW5pdGUnIDogJycpIDogJycSKwoHZXhhbXBsZRgJIAMoAkIawkgXChUKDWZsb2F0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIscXCgtEb3VibGVSdWxlcxJqCgVjb25zdBgBIAEoAUJbwkhYClYKDGRvdWJsZS5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKgAQoCbHQYAiABKAFCkQHCSI0BCooBCglkb3VibGUubHQafSFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASsAEKA2x0ZRgDIAEoAUKgAcJInAEKmQEKCmRvdWJsZS5sdGUaigEhaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlKT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABL0BwoCZ3QYBCABKAFC5QfCSOEHCo4BCglkb3VibGUuZ3QagAEhaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwrEAQoMZG91YmxlLmd0X2x0GrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKzgEKFmRvdWJsZS5ndF9sdF9leGNsdXNpdmUaswFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrUAQoNZG91YmxlLmd0X2x0ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCt4BChdkb3VibGUuZ3RfbHRlX2V4Y2x1c2l2ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESvwgKA2d0ZRgFIAEoAUKvCMJIqwgKnAEKCmRvdWJsZS5ndGUajQEhaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycK0wEKDWRvdWJsZS5ndGVfbHQawQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCt0BChdkb3VibGUuZ3RlX2x0X2V4Y2x1c2l2ZRrBAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK4wEKDmRvdWJsZS5ndGVfbHRlGtABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrtAQoYZG91YmxlLmd0ZV9sdGVfZXhjbHVzaXZlGtABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEnYKAmluGAYgAygBQmrCSGcKZQoJZG91YmxlLmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEncKBm5vdF9pbhgHIAMoAUJnwkhkCmIKDWRvdWJsZS5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxJ2CgZmaW5pdGUYCCABKAhCZsJIYwphCg1kb3VibGUuZmluaXRlGlBydWxlcy5maW5pdGUgPyAodGhpcy5pc05hbigpIHx8IHRoaXMuaXNJbmYoKSA/ICd2YWx1ZSBtdXN0IGJlIGZpbml0ZScgOiAnJykgOiAnJxIsCgdleGFtcGxlGAkgAygBQhvCSBgKFgoOZG91YmxlLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIucUCgpJbnQzMlJ1bGVzEmkKBWNvbnN0GAEgASgFQlrCSFcKVQoLaW50MzIuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSigEKAmx0GAIgASgFQnzCSHkKdwoIaW50MzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnAEKA2x0ZRgDIAEoBUKMAcJIiAEKhQEKCWludDMyLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASlwcKAmd0GAQgASgFQogHwkiEBwp6CghpbnQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKswEKC2ludDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq7AQoVaW50MzIuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKwwEKDGludDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKywEKFmludDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEuMHCgNndGUYBSABKAVC0wfCSM8HCogBCglpbnQzMi5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrCAQoMaW50MzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCsoBChZpbnQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrSAQoNaW50MzIuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwraAQoXaW50MzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdQoCaW4YBiADKAVCacJIZgpkCghpbnQzMi5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxJ2CgZub3RfaW4YByADKAVCZsJIYwphCgxpbnQzMi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIrCgdleGFtcGxlGAggAygFQhrCSBcKFQoNaW50MzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4i5xQKCkludDY0UnVsZXMSaQoFY29uc3QYASABKANCWsJIVwpVCgtpbnQ2NC5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKKAQoCbHQYAiABKANCfMJIeQp3CghpbnQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKcAQoDbHRlGAMgASgDQowBwkiIAQqFAQoJaW50NjQubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKXBwoCZ3QYBCABKANCiAfCSIQHCnoKCGludDY0Lmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwqzAQoLaW50NjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrsBChVpbnQ2NC5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrDAQoMaW50NjQuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrLAQoWaW50NjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES4wcKA2d0ZRgFIAEoA0LTB8JIzwcKiAEKCWludDY0Lmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsIBCgxpbnQ2NC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKygEKFmludDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtIBCg1pbnQ2NC5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtoBChdpbnQ2NC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ1CgJpbhgGIAMoA0JpwkhmCmQKCGludDY0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnYKBm5vdF9pbhgHIAMoA0JmwkhjCmEKDGludDY0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEisKB2V4YW1wbGUYCSADKANCGsJIFwoVCg1pbnQ2NC5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiL4FAoLVUludDMyUnVsZXMSagoFY29uc3QYASABKA1CW8JIWApWCgx1aW50MzIuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSiwEKAmx0GAIgASgNQn3CSHoKeAoJdWludDMyLmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp0BCgNsdGUYAyABKA1CjQHCSIkBCoYBCgp1aW50MzIubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKcBwoCZ3QYBCABKA1CjQfCSIkHCnsKCXVpbnQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtAEKDHVpbnQzMi5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvAEKFnVpbnQzMi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrEAQoNdWludDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzAEKF3VpbnQzMi5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLoBwoDZ3RlGAUgASgNQtgHwkjUBwqJAQoKdWludDMyLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsMBCg11aW50MzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCssBChd1aW50MzIuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK0wEKDnVpbnQzMi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtsBChh1aW50MzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdgoCaW4YBiADKA1CasJIZwplCgl1aW50MzIuaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSdwoGbm90X2luGAcgAygNQmfCSGQKYgoNdWludDMyLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKA1CG8JIGAoWCg51aW50MzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4i+BQKC1VJbnQ2NFJ1bGVzEmoKBWNvbnN0GAEgASgEQlvCSFgKVgoMdWludDY0LmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEosBCgJsdBgCIAEoBEJ9wkh6CngKCXVpbnQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKdAQoDbHRlGAMgASgEQo0BwkiJAQqGAQoKdWludDY0Lmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASnAcKAmd0GAQgASgEQo0HwkiJBwp7Cgl1aW50NjQuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrQBCgx1aW50NjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrwBChZ1aW50NjQuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxAEKDXVpbnQ2NC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCswBChd1aW50NjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES6AcKA2d0ZRgFIAEoBELYB8JI1AcKiQEKCnVpbnQ2NC5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrDAQoNdWludDY0Lmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrLAQoXdWludDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtMBCg51aW50NjQuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrbAQoYdWludDY0Lmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEnYKAmluGAYgAygEQmrCSGcKZQoJdWludDY0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEncKBm5vdF9pbhgHIAMoBEJnwkhkCmIKDXVpbnQ2NC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIsCgdleGFtcGxlGAggAygEQhvCSBgKFgoOdWludDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIvgUCgtTSW50MzJSdWxlcxJqCgVjb25zdBgBIAEoEUJbwkhYClYKDHNpbnQzMi5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKLAQoCbHQYAiABKBFCfcJIegp4CglzaW50MzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnQEKA2x0ZRgDIAEoEUKNAcJIiQEKhgEKCnNpbnQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEpwHCgJndBgEIAEoEUKNB8JIiQcKewoJc2ludDMyLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq0AQoMc2ludDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq8AQoWc2ludDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsQBCg1zaW50MzIuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrMAQoXc2ludDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEugHCgNndGUYBSABKBFC2AfCSNQHCokBCgpzaW50MzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKwwEKDXNpbnQzMi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKywEKF3NpbnQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrTAQoOc2ludDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK2wEKGHNpbnQzMi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ2CgJpbhgGIAMoEUJqwkhnCmUKCXNpbnQzMi5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxJ3CgZub3RfaW4YByADKBFCZ8JIZApiCg1zaW50MzIubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLAoHZXhhbXBsZRgIIAMoEUIbwkgYChYKDnNpbnQzMi5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiL4FAoLU0ludDY0UnVsZXMSagoFY29uc3QYASABKBJCW8JIWApWCgxzaW50NjQuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSiwEKAmx0GAIgASgSQn3CSHoKeAoJc2ludDY0Lmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp0BCgNsdGUYAyABKBJCjQHCSIkBCoYBCgpzaW50NjQubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKcBwoCZ3QYBCABKBJCjQfCSIkHCnsKCXNpbnQ2NC5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtAEKDHNpbnQ2NC5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvAEKFnNpbnQ2NC5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrEAQoNc2ludDY0Lmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzAEKF3NpbnQ2NC5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLoBwoDZ3RlGAUgASgSQtgHwkjUBwqJAQoKc2ludDY0Lmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsMBCg1zaW50NjQuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCssBChdzaW50NjQuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK0wEKDnNpbnQ2NC5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtsBChhzaW50NjQuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdgoCaW4YBiADKBJCasJIZwplCglzaW50NjQuaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSdwoGbm90X2luGAcgAygSQmfCSGQKYgoNc2ludDY0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKBJCG8JIGAoWCg5zaW50NjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4iiRUKDEZpeGVkMzJSdWxlcxJrCgVjb25zdBgBIAEoB0JcwkhZClcKDWZpeGVkMzIuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSjAEKAmx0GAIgASgHQn7CSHsKeQoKZml4ZWQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKeAQoDbHRlGAMgASgHQo4BwkiKAQqHAQoLZml4ZWQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqEHCgJndBgEIAEoB0KSB8JIjgcKfAoKZml4ZWQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtQEKDWZpeGVkMzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr0BChdmaXhlZDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsUBCg5maXhlZDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzQEKGGZpeGVkMzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES7QcKA2d0ZRgFIAEoB0LdB8JI2QcKigEKC2ZpeGVkMzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxAEKDmZpeGVkMzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCswBChhmaXhlZDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtQBCg9maXhlZDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3AEKGWZpeGVkMzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdwoCaW4YBiADKAdCa8JIaApmCgpmaXhlZDMyLmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEngKBm5vdF9pbhgHIAMoB0JowkhlCmMKDmZpeGVkMzIubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLQoHZXhhbXBsZRgIIAMoB0IcwkgZChcKD2ZpeGVkMzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4iiRUKDEZpeGVkNjRSdWxlcxJrCgVjb25zdBgBIAEoBkJcwkhZClcKDWZpeGVkNjQuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSjAEKAmx0GAIgASgGQn7CSHsKeQoKZml4ZWQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKeAQoDbHRlGAMgASgGQo4BwkiKAQqHAQoLZml4ZWQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqEHCgJndBgEIAEoBkKSB8JIjgcKfAoKZml4ZWQ2NC5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtQEKDWZpeGVkNjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr0BChdmaXhlZDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsUBCg5maXhlZDY0Lmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzQEKGGZpeGVkNjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES7QcKA2d0ZRgFIAEoBkLdB8JI2QcKigEKC2ZpeGVkNjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxAEKDmZpeGVkNjQuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCswBChhmaXhlZDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtQBCg9maXhlZDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3AEKGWZpeGVkNjQuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdwoCaW4YBiADKAZCa8JIaApmCgpmaXhlZDY0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEngKBm5vdF9pbhgHIAMoBkJowkhlCmMKDmZpeGVkNjQubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLQoHZXhhbXBsZRgIIAMoBkIcwkgZChcKD2ZpeGVkNjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4imhUKDVNGaXhlZDMyUnVsZXMSbAoFY29uc3QYASABKA9CXcJIWgpYCg5zZml4ZWQzMi5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKNAQoCbHQYAiABKA9Cf8JIfAp6CgtzZml4ZWQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKfAQoDbHRlGAMgASgPQo8BwkiLAQqIAQoMc2ZpeGVkMzIubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKmBwoCZ3QYBCABKA9ClwfCSJMHCn0KC3NmaXhlZDMyLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq2AQoOc2ZpeGVkMzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr4BChhzZml4ZWQzMi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrGAQoPc2ZpeGVkMzIuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrOAQoZc2ZpeGVkMzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES8gcKA2d0ZRgFIAEoD0LiB8JI3gcKiwEKDHNmaXhlZDMyLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsUBCg9zZml4ZWQzMi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzQEKGXNmaXhlZDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtUBChBzZml4ZWQzMi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCt0BChpzZml4ZWQzMi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ4CgJpbhgGIAMoD0JswkhpCmcKC3NmaXhlZDMyLmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnkKBm5vdF9pbhgHIAMoD0JpwkhmCmQKD3NmaXhlZDMyLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEi4KB2V4YW1wbGUYCCADKA9CHcJIGgoYChBzZml4ZWQzMi5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiKaFQoNU0ZpeGVkNjRSdWxlcxJsCgVjb25zdBgBIAEoEEJdwkhaClgKDnNmaXhlZDY0LmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEo0BCgJsdBgCIAEoEEJ/wkh8CnoKC3NmaXhlZDY0Lmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp8BCgNsdGUYAyABKBBCjwHCSIsBCogBCgxzZml4ZWQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqYHCgJndBgEIAEoEEKXB8JIkwcKfQoLc2ZpeGVkNjQuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrYBCg5zZml4ZWQ2NC5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvgEKGHNmaXhlZDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsYBCg9zZml4ZWQ2NC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs4BChlzZml4ZWQ2NC5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLyBwoDZ3RlGAUgASgQQuIHwkjeBwqLAQoMc2ZpeGVkNjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxQEKD3NmaXhlZDY0Lmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrNAQoZc2ZpeGVkNjQuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK1QEKEHNmaXhlZDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3QEKGnNmaXhlZDY0Lmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEngKAmluGAYgAygQQmzCSGkKZwoLc2ZpeGVkNjQuaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSeQoGbm90X2luGAcgAygQQmnCSGYKZAoPc2ZpeGVkNjQubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLgoHZXhhbXBsZRgIIAMoEEIdwkgaChgKEHNmaXhlZDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIqwBCglCb29sUnVsZXMSaAoFY29uc3QYASABKAhCWcJIVgpUCgpib29sLmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEioKB2V4YW1wbGUYAiADKAhCGcJIFgoUCgxib29sLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAiLgNgoLU3RyaW5nUnVsZXMSbAoFY29uc3QYASABKAlCXcJIWgpYCgxzdHJpbmcuY29uc3QaSHRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCBgJXNgJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxJ+CgNsZW4YEyABKARCccJIbgpsCgpzdHJpbmcubGVuGl51aW50KHRoaXMuc2l6ZSgpKSAhPSBydWxlcy5sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgJXMgY2hhcmFjdGVycycuZm9ybWF0KFtydWxlcy5sZW5dKSA6ICcnEpkBCgdtaW5fbGVuGAIgASgEQocBwkiDAQqAAQoOc3RyaW5nLm1pbl9sZW4abnVpbnQodGhpcy5zaXplKCkpIDwgcnVsZXMubWluX2xlbiA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSBhdCBsZWFzdCAlcyBjaGFyYWN0ZXJzJy5mb3JtYXQoW3J1bGVzLm1pbl9sZW5dKSA6ICcnEpcBCgdtYXhfbGVuGAMgASgEQoUBwkiBAQp/Cg5zdHJpbmcubWF4X2xlbhptdWludCh0aGlzLnNpemUoKSkgPiBydWxlcy5tYXhfbGVuID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlIGF0IG1vc3QgJXMgY2hhcmFjdGVycycuZm9ybWF0KFtydWxlcy5tYXhfbGVuXSkgOiAnJxKbAQoJbGVuX2J5dGVzGBQgASgEQocBwkiDAQqAAQoQc3RyaW5nLmxlbl9ieXRlcxpsdWludChieXRlcyh0aGlzKS5zaXplKCkpICE9IHJ1bGVzLmxlbl9ieXRlcyA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSAlcyBieXRlcycuZm9ybWF0KFtydWxlcy5sZW5fYnl0ZXNdKSA6ICcnEqMBCgltaW5fYnl0ZXMYBCABKARCjwHCSIsBCogBChBzdHJpbmcubWluX2J5dGVzGnR1aW50KGJ5dGVzKHRoaXMpLnNpemUoKSkgPCBydWxlcy5taW5fYnl0ZXMgPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWluX2J5dGVzXSkgOiAnJxKiAQoJbWF4X2J5dGVzGAUgASgEQo4BwkiKAQqHAQoQc3RyaW5nLm1heF9ieXRlcxpzdWludChieXRlcyh0aGlzKS5zaXplKCkpID4gcnVsZXMubWF4X2J5dGVzID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlIGF0IG1vc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWF4X2J5dGVzXSkgOiAnJxKNAQoHcGF0dGVybhgGIAEoCUJ8wkh5CncKDnN0cmluZy5wYXR0ZXJuGmUhdGhpcy5tYXRjaGVzKHJ1bGVzLnBhdHRlcm4pID8gJ3ZhbHVlIGRvZXMgbm90IG1hdGNoIHJlZ2V4IHBhdHRlcm4gYCVzYCcuZm9ybWF0KFtydWxlcy5wYXR0ZXJuXSkgOiAnJxKEAQoGcHJlZml4GAcgASgJQnTCSHEKbwoNc3RyaW5nLnByZWZpeBpeIXRoaXMuc3RhcnRzV2l0aChydWxlcy5wcmVmaXgpID8gJ3ZhbHVlIGRvZXMgbm90IGhhdmUgcHJlZml4IGAlc2AnLmZvcm1hdChbcnVsZXMucHJlZml4XSkgOiAnJxKCAQoGc3VmZml4GAggASgJQnLCSG8KbQoNc3RyaW5nLnN1ZmZpeBpcIXRoaXMuZW5kc1dpdGgocnVsZXMuc3VmZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHN1ZmZpeCBgJXNgJy5mb3JtYXQoW3J1bGVzLnN1ZmZpeF0pIDogJycSkAEKCGNvbnRhaW5zGAkgASgJQn7CSHsKeQoPc3RyaW5nLmNvbnRhaW5zGmYhdGhpcy5jb250YWlucyhydWxlcy5jb250YWlucykgPyAndmFsdWUgZG9lcyBub3QgY29udGFpbiBzdWJzdHJpbmcgYCVzYCcuZm9ybWF0KFtydWxlcy5jb250YWluc10pIDogJycSmAEKDG5vdF9jb250YWlucxgXIAEoCUKBAcJIfgp8ChNzdHJpbmcubm90X2NvbnRhaW5zGmV0aGlzLmNvbnRhaW5zKHJ1bGVzLm5vdF9jb250YWlucykgPyAndmFsdWUgY29udGFpbnMgc3Vic3RyaW5nIGAlc2AnLmZvcm1hdChbcnVsZXMubm90X2NvbnRhaW5zXSkgOiAnJxJ2CgJpbhgKIAMoCUJqwkhnCmUKCXN0cmluZy5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxJ3CgZub3RfaW4YCyADKAlCZ8JIZApiCg1zdHJpbmcubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycS3wEKBWVtYWlsGAwgASgIQs0BwkjJAQphCgxzdHJpbmcuZW1haWwSI3ZhbHVlIG11c3QgYmUgYSB2YWxpZCBlbWFpbCBhZGRyZXNzGiwhcnVsZXMuZW1haWwgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzRW1haWwoKQpkChJzdHJpbmcuZW1haWxfZW1wdHkSMnZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzGhohcnVsZXMuZW1haWwgfHwgdGhpcyAhPSAnJ0gAEucBCghob3N0bmFtZRgNIAEoCELSAcJIzgEKZQoPc3RyaW5nLmhvc3RuYW1lEh52YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaG9zdG5hbWUaMiFydWxlcy5ob3N0bmFtZSB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNIb3N0bmFtZSgpCmUKFXN0cmluZy5ob3N0bmFtZV9lbXB0eRItdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIGhvc3RuYW1lGh0hcnVsZXMuaG9zdG5hbWUgfHwgdGhpcyAhPSAnJ0gAEscBCgJpcBgOIAEoCEK4AcJItAEKVQoJc3RyaW5nLmlwEiB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVAgYWRkcmVzcxomIXJ1bGVzLmlwIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwKCkKWwoPc3RyaW5nLmlwX2VtcHR5Ei92YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgYWRkcmVzcxoXIXJ1bGVzLmlwIHx8IHRoaXMgIT0gJydIABLWAQoEaXB2NBgPIAEoCELFAcJIwQEKXAoLc3RyaW5nLmlwdjQSInZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3MaKSFydWxlcy5pcHY0IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwKDQpCmEKEXN0cmluZy5pcHY0X2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NCBhZGRyZXNzGhkhcnVsZXMuaXB2NCB8fCB0aGlzICE9ICcnSAAS1gEKBGlwdjYYECABKAhCxQHCSMEBClwKC3N0cmluZy5pcHY2EiJ2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NiBhZGRyZXNzGikhcnVsZXMuaXB2NiB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcCg2KQphChFzdHJpbmcuaXB2Nl9lbXB0eRIxdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjYgYWRkcmVzcxoZIXJ1bGVzLmlwdjYgfHwgdGhpcyAhPSAnJ0gAEr8BCgN1cmkYESABKAhCrwHCSKsBClEKCnN0cmluZy51cmkSGXZhbHVlIG11c3QgYmUgYSB2YWxpZCBVUkkaKCFydWxlcy51cmkgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzVXJpKCkKVgoQc3RyaW5nLnVyaV9lbXB0eRIodmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIFVSSRoYIXJ1bGVzLnVyaSB8fCB0aGlzICE9ICcnSAASZgoHdXJpX3JlZhgSIAEoCEJTwkhQCk4KDnN0cmluZy51cmlfcmVmEhl2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgVVJJGiEhcnVsZXMudXJpX3JlZiB8fCB0aGlzLmlzVXJpUmVmKClIABKQAgoHYWRkcmVzcxgVIAEoCEL8AcJI+AEKgQEKDnN0cmluZy5hZGRyZXNzEi12YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaG9zdG5hbWUsIG9yIGlwIGFkZHJlc3MaQCFydWxlcy5hZGRyZXNzIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0hvc3RuYW1lKCkgfHwgdGhpcy5pc0lwKCkKcgoUc3RyaW5nLmFkZHJlc3NfZW1wdHkSPHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBob3N0bmFtZSwgb3IgaXAgYWRkcmVzcxocIXJ1bGVzLmFkZHJlc3MgfHwgdGhpcyAhPSAnJ0gAEpgCCgR1dWlkGBYgASgIQocCwkiDAgqlAQoLc3RyaW5nLnV1aWQSGnZhbHVlIG11c3QgYmUgYSB2YWxpZCBVVUlEGnohcnVsZXMudXVpZCB8fCB0aGlzID09ICcnIHx8IHRoaXMubWF0Y2hlcygnXlswLTlhLWZBLUZdezh9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezEyfSQnKQpZChFzdHJpbmcudXVpZF9lbXB0eRIpdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIFVVSUQaGSFydWxlcy51dWlkIHx8IHRoaXMgIT0gJydIABLwAQoFdHV1aWQYISABKAhC3gHCSNoBCnMKDHN0cmluZy50dXVpZBIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIHRyaW1tZWQgVVVJRBo/IXJ1bGVzLnR1dWlkIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5tYXRjaGVzKCdeWzAtOWEtZkEtRl17MzJ9JCcpCmMKEnN0cmluZy50dXVpZF9lbXB0eRIxdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIHRyaW1tZWQgVVVJRBoaIXJ1bGVzLnR1dWlkIHx8IHRoaXMgIT0gJydIABKWAgoRaXBfd2l0aF9wcmVmaXhsZW4YGiABKAhC+AHCSPQBCngKGHN0cmluZy5pcF93aXRoX3ByZWZpeGxlbhIfdmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQIHByZWZpeBo7IXJ1bGVzLmlwX3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KCkKeAoec3RyaW5nLmlwX3dpdGhfcHJlZml4bGVuX2VtcHR5Ei52YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgcHJlZml4GiYhcnVsZXMuaXBfd2l0aF9wcmVmaXhsZW4gfHwgdGhpcyAhPSAnJ0gAEs8CChNpcHY0X3dpdGhfcHJlZml4bGVuGBsgASgIQq8CwkirAgqTAQoac3RyaW5nLmlwdjRfd2l0aF9wcmVmaXhsZW4SNXZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3Mgd2l0aCBwcmVmaXggbGVuZ3RoGj4hcnVsZXMuaXB2NF93aXRoX3ByZWZpeGxlbiB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcFByZWZpeCg0KQqSAQogc3RyaW5nLmlwdjRfd2l0aF9wcmVmaXhsZW5fZW1wdHkSRHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IGFkZHJlc3Mgd2l0aCBwcmVmaXggbGVuZ3RoGighcnVsZXMuaXB2NF93aXRoX3ByZWZpeGxlbiB8fCB0aGlzICE9ICcnSAASzwIKE2lwdjZfd2l0aF9wcmVmaXhsZW4YHCABKAhCrwLCSKsCCpMBChpzdHJpbmcuaXB2Nl93aXRoX3ByZWZpeGxlbhI1dmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaPiFydWxlcy5pcHY2X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KDYpCpIBCiBzdHJpbmcuaXB2Nl93aXRoX3ByZWZpeGxlbl9lbXB0eRJEdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjYgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaKCFydWxlcy5pcHY2X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgIT0gJydIABLyAQoJaXBfcHJlZml4GB0gASgIQtwBwkjYAQpsChBzdHJpbmcuaXBfcHJlZml4Eh92YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVAgcHJlZml4GjchcnVsZXMuaXBfcHJlZml4IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KHRydWUpCmgKFnN0cmluZy5pcF9wcmVmaXhfZW1wdHkSLnZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUCBwcmVmaXgaHiFydWxlcy5pcF9wcmVmaXggfHwgdGhpcyAhPSAnJ0gAEoMCCgtpcHY0X3ByZWZpeBgeIAEoCELrAcJI5wEKdQoSc3RyaW5nLmlwdjRfcHJlZml4EiF2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NCBwcmVmaXgaPCFydWxlcy5pcHY0X3ByZWZpeCB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcFByZWZpeCg0LCB0cnVlKQpuChhzdHJpbmcuaXB2NF9wcmVmaXhfZW1wdHkSMHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IHByZWZpeBogIXJ1bGVzLmlwdjRfcHJlZml4IHx8IHRoaXMgIT0gJydIABKDAgoLaXB2Nl9wcmVmaXgYHyABKAhC6wHCSOcBCnUKEnN0cmluZy5pcHY2X3ByZWZpeBIhdmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgcHJlZml4GjwhcnVsZXMuaXB2Nl9wcmVmaXggfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXBQcmVmaXgoNiwgdHJ1ZSkKbgoYc3RyaW5nLmlwdjZfcHJlZml4X2VtcHR5EjB2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBwcmVmaXgaICFydWxlcy5pcHY2X3ByZWZpeCB8fCB0aGlzICE9ICcnSAAStQIKDWhvc3RfYW5kX3BvcnQYICABKAhCmwLCSJcCCpkBChRzdHJpbmcuaG9zdF9hbmRfcG9ydBJBdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGhvc3QgKGhvc3RuYW1lIG9yIElQIGFkZHJlc3MpIGFuZCBwb3J0IHBhaXIaPiFydWxlcy5ob3N0X2FuZF9wb3J0IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0hvc3RBbmRQb3J0KHRydWUpCnkKGnN0cmluZy5ob3N0X2FuZF9wb3J0X2VtcHR5Ejd2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgaG9zdCBhbmQgcG9ydCBwYWlyGiIhcnVsZXMuaG9zdF9hbmRfcG9ydCB8fCB0aGlzICE9ICcnSAASqAUKEHdlbGxfa25vd25fcmVnZXgYGCABKA4yGC5idWYudmFsaWRhdGUuS25vd25SZWdleELxBMJI7QQK8AEKI3N0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl9uYW1lEiZ2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSFRUUCBoZWFkZXIgbmFtZRqgAXJ1bGVzLndlbGxfa25vd25fcmVnZXggIT0gMSB8fCB0aGlzID09ICcnIHx8IHRoaXMubWF0Y2hlcyghaGFzKHJ1bGVzLnN0cmljdCkgfHwgcnVsZXMuc3RyaWN0ID8nXjo/WzAtOWEtekEtWiEjJCUmXCcqKy0uXl98flx4NjBdKyQnIDonXlteXHUwMDAwXHUwMDBBXHUwMDBEXSskJykKjQEKKXN0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl9uYW1lX2VtcHR5EjV2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSFRUUCBoZWFkZXIgbmFtZRopcnVsZXMud2VsbF9rbm93bl9yZWdleCAhPSAxIHx8IHRoaXMgIT0gJycK5wEKJHN0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl92YWx1ZRIndmFsdWUgbXVzdCBiZSBhIHZhbGlkIEhUVFAgaGVhZGVyIHZhbHVlGpUBcnVsZXMud2VsbF9rbm93bl9yZWdleCAhPSAyIHx8IHRoaXMubWF0Y2hlcyghaGFzKHJ1bGVzLnN0cmljdCkgfHwgcnVsZXMuc3RyaWN0ID8nXlteXHUwMDAwLVx1MDAwOFx1MDAwQS1cdTAwMUZcdTAwN0ZdKiQnIDonXlteXHUwMDAwXHUwMDBBXHUwMDBEXSokJylIABIOCgZzdHJpY3QYGSABKAgSLAoHZXhhbXBsZRgiIAMoCUIbwkgYChYKDnN0cmluZy5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCDAoKd2VsbF9rbm93biK/EAoKQnl0ZXNSdWxlcxJmCgVjb25zdBgBIAEoDEJXwkhUClIKC2J5dGVzLmNvbnN0GkN0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgYmUgJXgnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEngKA2xlbhgNIAEoBEJrwkhoCmYKCWJ5dGVzLmxlbhpZdWludCh0aGlzLnNpemUoKSkgIT0gcnVsZXMubGVuID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlICVzIGJ5dGVzJy5mb3JtYXQoW3J1bGVzLmxlbl0pIDogJycSkAEKB21pbl9sZW4YAiABKARCf8JIfAp6Cg1ieXRlcy5taW5fbGVuGml1aW50KHRoaXMuc2l6ZSgpKSA8IHJ1bGVzLm1pbl9sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWluX2xlbl0pIDogJycSiAEKB21heF9sZW4YAyABKARCd8JIdApyCg1ieXRlcy5tYXhfbGVuGmF1aW50KHRoaXMuc2l6ZSgpKSA+IHJ1bGVzLm1heF9sZW4gPyAndmFsdWUgbXVzdCBiZSBhdCBtb3N0ICVzIGJ5dGVzJy5mb3JtYXQoW3J1bGVzLm1heF9sZW5dKSA6ICcnEpABCgdwYXR0ZXJuGAQgASgJQn/CSHwKegoNYnl0ZXMucGF0dGVybhppIXN0cmluZyh0aGlzKS5tYXRjaGVzKHJ1bGVzLnBhdHRlcm4pID8gJ3ZhbHVlIG11c3QgbWF0Y2ggcmVnZXggcGF0dGVybiBgJXNgJy5mb3JtYXQoW3J1bGVzLnBhdHRlcm5dKSA6ICcnEoEBCgZwcmVmaXgYBSABKAxCccJIbgpsCgxieXRlcy5wcmVmaXgaXCF0aGlzLnN0YXJ0c1dpdGgocnVsZXMucHJlZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHByZWZpeCAleCcuZm9ybWF0KFtydWxlcy5wcmVmaXhdKSA6ICcnEn8KBnN1ZmZpeBgGIAEoDEJvwkhsCmoKDGJ5dGVzLnN1ZmZpeBpaIXRoaXMuZW5kc1dpdGgocnVsZXMuc3VmZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHN1ZmZpeCAleCcuZm9ybWF0KFtydWxlcy5zdWZmaXhdKSA6ICcnEoMBCghjb250YWlucxgHIAEoDEJxwkhuCmwKDmJ5dGVzLmNvbnRhaW5zGlohdGhpcy5jb250YWlucyhydWxlcy5jb250YWlucykgPyAndmFsdWUgZG9lcyBub3QgY29udGFpbiAleCcuZm9ybWF0KFtydWxlcy5jb250YWluc10pIDogJycSlwEKAmluGAggAygMQooBwkiGAQqDAQoIYnl0ZXMuaW4ad2R5bihydWxlcylbJ2luJ10uc2l6ZSgpID4gMCAmJiAhKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnYKBm5vdF9pbhgJIAMoDEJmwkhjCmEKDGJ5dGVzLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEusBCgJpcBgKIAEoCELcAcJI2AEKdAoIYnl0ZXMuaXASIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUCBhZGRyZXNzGkYhcnVsZXMuaXAgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSA0IHx8IHRoaXMuc2l6ZSgpID09IDE2CmAKDmJ5dGVzLmlwX2VtcHR5Ei92YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgYWRkcmVzcxodIXJ1bGVzLmlwIHx8IHRoaXMuc2l6ZSgpICE9IDBIABLkAQoEaXB2NBgLIAEoCELTAcJIzwEKZQoKYnl0ZXMuaXB2NBIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjQgYWRkcmVzcxozIXJ1bGVzLmlwdjQgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSA0CmYKEGJ5dGVzLmlwdjRfZW1wdHkSMXZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IGFkZHJlc3MaHyFydWxlcy5pcHY0IHx8IHRoaXMuc2l6ZSgpICE9IDBIABLlAQoEaXB2NhgMIAEoCELUAcJI0AEKZgoKYnl0ZXMuaXB2NhIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgYWRkcmVzcxo0IXJ1bGVzLmlwdjYgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSAxNgpmChBieXRlcy5pcHY2X2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBhZGRyZXNzGh8hcnVsZXMuaXB2NiB8fCB0aGlzLnNpemUoKSAhPSAwSAASKwoHZXhhbXBsZRgOIAMoDEIawkgXChUKDWJ5dGVzLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkIMCgp3ZWxsX2tub3duIq8DCglFbnVtUnVsZXMSaAoFY29uc3QYASABKAVCWcJIVgpUCgplbnVtLmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEhQKDGRlZmluZWRfb25seRgCIAEoCBJ0CgJpbhgDIAMoBUJowkhlCmMKB2VudW0uaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSdQoGbm90X2luGAQgAygFQmXCSGIKYAoLZW51bS5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIqCgdleGFtcGxlGAUgAygFQhnCSBYKFAoMZW51bS5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAIigQQKDVJlcGVhdGVkUnVsZXMSngEKCW1pbl9pdGVtcxgBIAEoBEKKAcJIhgEKgwEKEnJlcGVhdGVkLm1pbl9pdGVtcxptdWludCh0aGlzLnNpemUoKSkgPCBydWxlcy5taW5faXRlbXMgPyAndmFsdWUgbXVzdCBjb250YWluIGF0IGxlYXN0ICVkIGl0ZW0ocyknLmZvcm1hdChbcnVsZXMubWluX2l0ZW1zXSkgOiAnJxKiAQoJbWF4X2l0ZW1zGAIgASgEQo4BwkiKAQqHAQoScmVwZWF0ZWQubWF4X2l0ZW1zGnF1aW50KHRoaXMuc2l6ZSgpKSA+IHJ1bGVzLm1heF9pdGVtcyA/ICd2YWx1ZSBtdXN0IGNvbnRhaW4gbm8gbW9yZSB0aGFuICVzIGl0ZW0ocyknLmZvcm1hdChbcnVsZXMubWF4X2l0ZW1zXSkgOiAnJxJwCgZ1bmlxdWUYAyABKAhCYMJIXQpbCg9yZXBlYXRlZC51bmlxdWUSKHJlcGVhdGVkIHZhbHVlIG11c3QgY29udGFpbiB1bmlxdWUgaXRlbXMaHiFydWxlcy51bmlxdWUgfHwgdGhpcy51bmlxdWUoKRItCgVpdGVtcxgEIAEoCzIeLmJ1Zi52YWxpZGF0ZS5GaWVsZENvbnN0cmFpbnRzKgkI6AcQgICAgAIilgMKCE1hcFJ1bGVzEo8BCgltaW5fcGFpcnMYASABKARCfMJIeQp3Cg1tYXAubWluX3BhaXJzGmZ1aW50KHRoaXMuc2l6ZSgpKSA8IHJ1bGVzLm1pbl9wYWlycyA/ICdtYXAgbXVzdCBiZSBhdCBsZWFzdCAlZCBlbnRyaWVzJy5mb3JtYXQoW3J1bGVzLm1pbl9wYWlyc10pIDogJycSjgEKCW1heF9wYWlycxgCIAEoBEJ7wkh4CnYKDW1hcC5tYXhfcGFpcnMaZXVpbnQodGhpcy5zaXplKCkpID4gcnVsZXMubWF4X3BhaXJzID8gJ21hcCBtdXN0IGJlIGF0IG1vc3QgJWQgZW50cmllcycuZm9ybWF0KFtydWxlcy5tYXhfcGFpcnNdKSA6ICcnEiwKBGtleXMYBCABKAsyHi5idWYudmFsaWRhdGUuRmllbGRDb25zdHJhaW50cxIuCgZ2YWx1ZXMYBSABKAsyHi5idWYudmFsaWRhdGUuRmllbGRDb25zdHJhaW50cyoJCOgHEICAgIACIiYKCEFueVJ1bGVzEgoKAmluGAIgAygJEg4KBm5vdF9pbhgDIAMoCSL1FgoNRHVyYXRpb25SdWxlcxKHAQoFY29uc3QYAiABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CXcJIWgpYCg5kdXJhdGlvbi5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKoAQoCbHQYAyABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25Cf8JIfAp6CgtkdXJhdGlvbi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABK6AQoDbHRlGAQgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQo8BwkiLAQqIAQoMZHVyYXRpb24ubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABLBBwoCZ3QYBSABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25ClwfCSJMHCn0KC2R1cmF0aW9uLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq2AQoOZHVyYXRpb24uZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr4BChhkdXJhdGlvbi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrGAQoPZHVyYXRpb24uZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrOAQoZZHVyYXRpb24uZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESjQgKA2d0ZRgGIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkLiB8JI3gcKiwEKDGR1cmF0aW9uLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsUBCg9kdXJhdGlvbi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzQEKGWR1cmF0aW9uLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtUBChBkdXJhdGlvbi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCt0BChpkdXJhdGlvbi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKTAQoCaW4YByADKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CbMJIaQpnCgtkdXJhdGlvbi5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxKUAQoGbm90X2luGAggAygLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQmnCSGYKZAoPZHVyYXRpb24ubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSSQoHZXhhbXBsZRgJIAMoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkIdwkgaChgKEGR1cmF0aW9uLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIvgXCg5UaW1lc3RhbXBSdWxlcxKJAQoFY29uc3QYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQl7CSFsKWQoPdGltZXN0YW1wLmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEqsBCgJsdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBCgAHCSH0KewoMdGltZXN0YW1wLmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAErwBCgNsdGUYBCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQpABwkiMAQqJAQoNdGltZXN0YW1wLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASbAoGbHRfbm93GAcgASgIQlrCSFcKVQoQdGltZXN0YW1wLmx0X25vdxpBKHJ1bGVzLmx0X25vdyAmJiB0aGlzID4gbm93KSA/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBub3cnIDogJydIABLHBwoCZ3QYBSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQpwHwkiYBwp+Cgx0aW1lc3RhbXAuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrcBCg90aW1lc3RhbXAuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr8BChl0aW1lc3RhbXAuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxwEKEHRpbWVzdGFtcC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs8BChp0aW1lc3RhbXAuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESkwgKA2d0ZRgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBC5wfCSOMHCowBCg10aW1lc3RhbXAuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxgEKEHRpbWVzdGFtcC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzgEKGnRpbWVzdGFtcC5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrWAQoRdGltZXN0YW1wLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3gEKG3RpbWVzdGFtcC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJvCgZndF9ub3cYCCABKAhCXcJIWgpYChB0aW1lc3RhbXAuZ3Rfbm93GkQocnVsZXMuZ3Rfbm93ICYmIHRoaXMgPCBub3cpID8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG5vdycgOiAnJ0gBErgBCgZ3aXRoaW4YCSABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CjAHCSIgBCoUBChB0aW1lc3RhbXAud2l0aGluGnF0aGlzIDwgbm93LXJ1bGVzLndpdGhpbiB8fCB0aGlzID4gbm93K3J1bGVzLndpdGhpbiA/ICd2YWx1ZSBtdXN0IGJlIHdpdGhpbiAlcyBvZiBub3cnLmZvcm1hdChbcnVsZXMud2l0aGluXSkgOiAnJxJLCgdleGFtcGxlGAogAygLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEIewkgbChkKEXRpbWVzdGFtcC5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiI5CgpWaW9sYXRpb25zEisKCnZpb2xhdGlvbnMYASADKAsyFy5idWYudmFsaWRhdGUuVmlvbGF0aW9uIlgKCVZpb2xhdGlvbhISCgpmaWVsZF9wYXRoGAEgASgJEhUKDWNvbnN0cmFpbnRfaWQYAiABKAkSDwoHbWVzc2FnZRgDIAEoCRIPCgdmb3Jfa2V5GAQgASgIKp0BCgZJZ25vcmUSFgoSSUdOT1JFX1VOU1BFQ0lGSUVEEAASGQoVSUdOT1JFX0lGX1VOUE9QVUxBVEVEEAESGwoXSUdOT1JFX0lGX0RFRkFVTFRfVkFMVUUQAhIRCg1JR05PUkVfQUxXQVlTEAMSFAoMSUdOT1JFX0VNUFRZEAEaAggBEhYKDklHTk9SRV9ERUZBVUxUEAIaAggBGgIQASpuCgpLbm93blJlZ2V4EhsKF0tOT1dOX1JFR0VYX1VOU1BFQ0lGSUVEEAASIAocS05PV05fUkVHRVhfSFRUUF9IRUFERVJfTkFNRRABEiEKHUtOT1dOX1JFR0VYX0hUVFBfSEVBREVSX1ZBTFVFEAI6XAoHbWVzc2FnZRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxiHCSABKAsyIC5idWYudmFsaWRhdGUuTWVzc2FnZUNvbnN0cmFpbnRzUgdtZXNzYWdlOlQKBW9uZW9mEh0uZ29vZ2xlLnByb3RvYnVmLk9uZW9mT3B0aW9ucxiHCSABKAsyHi5idWYudmFsaWRhdGUuT25lb2ZDb25zdHJhaW50c1IFb25lb2Y6VAoFZmllbGQSHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGIcJIAEoCzIeLmJ1Zi52YWxpZGF0ZS5GaWVsZENvbnN0cmFpbnRzUgVmaWVsZDpjCgpwcmVkZWZpbmVkEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxiICSABKAsyIy5idWYudmFsaWRhdGUuUHJlZGVmaW5lZENvbnN0cmFpbnRzUgpwcmVkZWZpbmVkQm4KEmJ1aWxkLmJ1Zi52YWxpZGF0ZUINVmFsaWRhdGVQcm90b1ABWkdidWYuYnVpbGQvZ2VuL2dvL2J1ZmJ1aWxkL3Byb3RvdmFsaWRhdGUvcHJvdG9jb2xidWZmZXJzL2dvL2J1Zi92YWxpZGF0ZQ", [Mn, kd, pe]), ga = /* @__PURE__ */ R("CidkZXZraXQvdjEvYWNjb3VudHNfbmF2aWdhdGlvbl9iYXIucHJvdG8SCWRldmtpdC52MSJ0Cg1OYXZpZ2F0aW9uQmFyEhkKEW5hdmlnYXRpb25fYmFyX2lkGAEgASgFEhsKE25hdmlnYXRpb25fYmFyX25hbWUYAiABKAkSKwoFaXRlbXMYBiADKAsyHC5kZXZraXQudjEuTmF2aWdhdGlvbkJhckl0ZW0izQEKEU5hdmlnYXRpb25CYXJJdGVtEh4KFm5hdmlnYXRpb25fYmFyX2l0ZW1faWQYCCABKAUSEQoJcGFyZW50X2lkGAkgASgFEgsKA2tleRgBIAEoCRINCgVsYWJlbBgCIAEoCRIQCghsYWJlbF9hchgDIAEoCRIMCgRpY29uGAQgASgJEg0KBXJvdXRlGAUgASgJEg0KBWxldmVsGAcgASgFEisKBWl0ZW1zGAYgAygLMhwuZGV2a2l0LnYxLk5hdmlnYXRpb25CYXJJdGVtYgZwcm90bzM"), ce = /* @__PURE__ */ R("ChZkZXZraXQvdjEvY2xpZW50LnByb3RvEglkZXZraXQudjEiNQoKUm91dGVRdWVyeRISCgpxdWVyeV9uYW1lGAEgASgJEhMKC3F1ZXJ5X3ZhbHVlGAIgASgJIkQKElJlZGlyZWN0Um91dGVQYXJhbRISCgpwYXJhbV9uYW1lGAEgASgJEhoKEnJlc3BvbnNlX3ZhbHVlX2tleRgCIAEoCSL9AQoNQ3JlYXRlSGFuZGxlchINCgV0aXRsZRgBIAEoCRIWCg5yZWRpcmVjdF9yb3V0ZRgCIAEoCRI7ChRyZWRpcmVjdF9yb3V0ZV9wYXJhbRgDIAEoCzIdLmRldmtpdC52MS5SZWRpcmVjdFJvdXRlUGFyYW0SEgoKcm91dGVfbmFtZRgEIAEoCRIqCgtyb3V0ZV9xdWVyeRgFIAMoCzIVLmRldmtpdC52MS5Sb3V0ZVF1ZXJ5EhAKCGVuZHBvaW50GAYgASgJEhkKEXVwZGF0ZV9wYXJhbV9uYW1lGAcgASgJEhsKE3BhcmFtX3Byb3BlcnR5X25hbWUYCCABKAki3gEKDVVwZGF0ZUhhbmRsZXISDQoFdGl0bGUYASABKAkSFgoOcmVkaXJlY3Rfcm91dGUYAiABKAkSEgoKcm91dGVfbmFtZRgDIAEoCRIqCgtyb3V0ZV9xdWVyeRgEIAMoCzIVLmRldmtpdC52MS5Sb3V0ZVF1ZXJ5EhAKCGVuZHBvaW50GAUgASgJEhUKDWZpbmRfZW5kcG9pbnQYBiABKAkSHQoVZmluZF9yZXF1ZXN0X3Byb3BlcnR5GAcgASgJEh4KFmZpbmRfcmVzcG9uc2VfcHJvcGVydHkYCCABKAkiOwoNRGVsZXRlSGFuZGxlchIQCghlbmRwb2ludBgBIAEoCRIYChByZXF1ZXN0X3Byb3BlcnR5GAIgASgJIkIKFERlbGV0ZVJlc3RvcmVIYW5kbGVyEhAKCGVuZHBvaW50GAEgASgJEhgKEHJlcXVlc3RfcHJvcGVydHkYAiABKAkiPwoNSW1wb3J0SGFuZGxlchIQCghlbmRwb2ludBgBIAEoCRIcChRpbXBvcnRfdGVtcGxhdGVfbGluaxgCIAEoCSI7CgxFcnJvckhhbmRsZXISFwoPY29uc3RyYWludF9uYW1lGAEgASgJEhIKCmZpZWxkX25hbWUYAiABKAki1AIKEEF2YWlsYWJsZU9wdGlvbnMSDQoFdGl0bGUYASABKAkSEwoLZGVzY3JpcHRpb24YAiABKAkSEwoLdG90YWxfY291bnQYCCABKAUSMAoOY3JlYXRlX2hhbmRsZXIYAyABKAsyGC5kZXZraXQudjEuQ3JlYXRlSGFuZGxlchIwCg51cGRhdGVfaGFuZGxlchgEIAEoCzIYLmRldmtpdC52MS5VcGRhdGVIYW5kbGVyEj8KFmRlbGV0ZV9yZXN0b3JlX2hhbmRsZXIYBSABKAsyHy5kZXZraXQudjEuRGVsZXRlUmVzdG9yZUhhbmRsZXISMAoOZGVsZXRlX2hhbmRsZXIYBiABKAsyGC5kZXZraXQudjEuRGVsZXRlSGFuZGxlchIwCg5pbXBvcnRfaGFuZGxlchgHIAEoCzIYLmRldmtpdC52MS5JbXBvcnRIYW5kbGVyIn4KClJvd0FjdGlvbnMSMAoOdXBkYXRlX2hhbmRsZXIYASABKAsyGC5kZXZraXQudjEuVXBkYXRlSGFuZGxlchI+ChVkZWxldGVfcmVzb3JlX2hhbmRsZXIYAiABKAsyHy5kZXZraXQudjEuRGVsZXRlUmVzdG9yZUhhbmRsZXIiTQoRU2VsZWN0SW5wdXRPcHRpb24SDQoFdmFsdWUYASABKAUSDQoFbGFiZWwYAiABKAkSDAoEaWNvbhgDIAEoCRIMCgRub3RlGAQgASgJInEKGlNlbGVjdElucHV0T3B0aW9uV2l0aEdyb3VwEhIKCmdyb3VwX2ljb24YASABKAkSEgoKZ3JvdXBfbmFtZRgCIAEoCRIrCgVpdGVtcxgDIAMoCzIcLmRldmtpdC52MS5TZWxlY3RJbnB1dE9wdGlvbiI0ChREZWxldGVSZXN0b3JlUmVxdWVzdBIcCgdyZWNvcmRzGAEgAygFQgu6SAiSAQUQ9AMYASKbAQoQUGFnaW5hdGlvblBhcmFtcxITCgtzb3J0X2NvbHVtbhgBIAEoCRI2Cg1zb3J0X2Z1bmN0aW9uGAIgASgJQh+6SBzQAQFyFzIVXihBU0N8REVTQ3xhc2N8ZGVzYykkEhMKC3BhZ2VfbnVtYmVyGAMgASgFEhIKCmlzX2RlbGV0ZWQYBSABKAgSEQoJcGFnZV9zaXplGAYgASgFYgZwcm90bzM", [v]), ma = /* @__PURE__ */ R("Ch1kZXZraXQvdjEvYWNjb3VudHNfdXNlci5wcm90bxIJZGV2a2l0LnYxIpICChdVc2VyQ3JlYXRlVXBkYXRlUmVxdWVzdBIPCgd1c2VyX2lkGAEgASgFEh0KCXVzZXJfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIRCgl0ZW5hbnRfaWQYCSABKAUSGwoTdXNlcl9zZWN1cml0eV9sZXZlbBgDIAEoBRIdCgx1c2VyX3R5cGVfaWQYBCABKAVCB7pIBBoCIAASGwoKdXNlcl9waG9uZRgFIAEoCUIHukgEcgIYMhIeCgp1c2VyX2VtYWlsGAYgASgJQgq6SAdyBRjIAWABEh8KDXVzZXJfcGFzc3dvcmQYByABKAlCCLpIBXIDGMgBEhoKBXJvbGVzGAggAygFQgu6SAiSAQUQ9AMYASKVAgoSQWNjb3VudHNTY2hlbWFVc2VyEg8KB3VzZXJfaWQYASABKAUSEQoJdXNlcl9uYW1lGAIgASgJEhEKCXRlbmFudF9pZBgMIAEoBRIbChN1c2VyX3NlY3VyaXR5X2xldmVsGAMgASgFEhQKDHVzZXJfdHlwZV9pZBgEIAEoBRISCgp1c2VyX3Bob25lGAUgASgJEhIKCnVzZXJfZW1haWwYBiABKAkSFQoNdXNlcl9wYXNzd29yZBgHIAEoCRIuCgpjcmVhdGVkX2F0GAkgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBISCgp1cGRhdGVkX2F0GAogASgJEhIKCmRlbGV0ZWRfYXQYCyABKAkiRwoYVXNlckNyZWF0ZVVwZGF0ZVJlc3BvbnNlEisKBHVzZXIYASABKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyIisKGFVzZXJEZWxldGVSZXN0b3JlUmVxdWVzdBIPCgdyZWNvcmRzGAEgAygFIksKGVVzZXJEZWxldGVSZXN0b3JlUmVzcG9uc2USLgoHcmVjb3JkcxgBIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVVzZXIiJAoRVXNlckRlbGV0ZVJlcXVlc3QSDwoHcmVjb3JkcxgBIAMoBSJEChJVc2VyRGVsZXRlUmVzcG9uc2USLgoHcmVjb3JkcxgBIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVVzZXIiEQoPVXNlckxpc3RSZXF1ZXN0IqgBChBVc2VyTGlzdFJlc3BvbnNlEi4KB3JlY29yZHMYASADKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyEjYKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVVzZXISLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIhYKFFVzZXJMaXN0SW5wdXRSZXF1ZXN0IkYKFVVzZXJMaXN0SW5wdXRSZXNwb25zZRItCgdvcHRpb25zGAEgAygLMhwuZGV2a2l0LnYxLlNlbGVjdElucHV0T3B0aW9uIhoKGFVzZXJUeXBlTGlzdElucHV0UmVxdWVzdCJKChlVc2VyVHlwZUxpc3RJbnB1dFJlc3BvbnNlEi0KB29wdGlvbnMYASADKAsyHC5kZXZraXQudjEuU2VsZWN0SW5wdXRPcHRpb24iLQoYVXNlckZpbmRGb3JVcGRhdGVSZXF1ZXN0EhEKCXJlY29yZF9pZBgBIAEoBSJQChlVc2VyRmluZEZvclVwZGF0ZVJlc3BvbnNlEjMKB3JlcXVlc3QYASABKAsyIi5kZXZraXQudjEuVXNlckNyZWF0ZVVwZGF0ZVJlcXVlc3RiBnByb3RvMw", [v, ce, pe]), oo = /* @__PURE__ */ R("Ch1kZXZraXQvdjEvYWNjb3VudHNfYXV0aC5wcm90bxIJZGV2a2l0LnYxIlUKEEF1dGhMb2dpblJlcXVlc3QSHgoKbG9naW5fY29kZRgBIAEoCUIKukgHcgUQAxjIARIhCg11c2VyX3Bhc3N3b3JkGAIgASgJQgq6SAdyBRAGGMgBIkIKCUxvZ2luSW5mbxIUCgxhY2Nlc3NfdG9rZW4YASABKAkSHwoXYWNjZXNzX3Rva2VuX2V4cGlyZXNfYXQYBCABKAkioAEKEUF1dGhMb2dpblJlc3BvbnNlEisKBHVzZXIYASABKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyEigKCmxvZ2luX2luZm8YAiABKAsyFC5kZXZraXQudjEuTG9naW5JbmZvEjQKDm5hdmlnYXRpb25fYmFyGAMgAygLMhwuZGV2a2l0LnYxLk5hdmlnYXRpb25CYXJJdGVtItIBChNBdXRoUmVnaXN0ZXJSZXF1ZXN0Eh0KCXVzZXJfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIbChN1c2VyX3NlY3VyaXR5X2xldmVsGAMgASgFEh0KDHVzZXJfdHlwZV9pZBgEIAEoBUIHukgEGgIgABIbCgp1c2VyX3Bob25lGAUgASgJQge6SARyAhgyEiAKCnVzZXJfZW1haWwYBiABKAlCDLpICXIHEAQYyAFgARIhCg11c2VyX3Bhc3N3b3JkGAcgASgJQgq6SAdyBRAGGMgBIm0KFEF1dGhSZWdpc3RlclJlc3BvbnNlEisKBHVzZXIYASABKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyEigKCmxvZ2luX2luZm8YAiABKAsyFC5kZXZraXQudjEuTG9naW5JbmZvIhYKFEF1dGhBdXRob3JpemVSZXF1ZXN0IkQKFUF1dGhBdXRob3JpemVSZXNwb25zZRIrCgR1c2VyGAEgASgLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hVXNlciIzChFBdXRoSW52aXRlUmVxdWVzdBIeCgp1c2VyX2VtYWlsGAEgASgJQgq6SAdyBRjIAWABIiUKEkF1dGhJbnZpdGVSZXNwb25zZRIPCgdtZXNzYWdlGAEgASgJIk0KGEF1dGhMb2dpblByb3ZpZGVyUmVxdWVzdBIbCghwcm92aWRlchgCIAEoCUIJukgGcgQQAxgUEhQKDHJlZGlyZWN0X3VybBgBIAEoCSIoChlBdXRoTG9naW5Qcm92aWRlclJlc3BvbnNlEgsKA3VybBgBIAEoCSJTCiBBdXRoTG9naW5Qcm92aWRlckNhbGxiYWNrUmVxdWVzdBIQCghwcm92aWRlchgBIAEoCRIdCgxhY2Nlc3NfdG9rZW4YAiABKAlCB7pIBHICEAYisAEKIUF1dGhMb2dpblByb3ZpZGVyQ2FsbGJhY2tSZXNwb25zZRIrCgR1c2VyGAEgASgLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hVXNlchIoCgpsb2dpbl9pbmZvGAIgASgLMhQuZGV2a2l0LnYxLkxvZ2luSW5mbxI0Cg5uYXZpZ2F0aW9uX2JhchgDIAMoCzIcLmRldmtpdC52MS5OYXZpZ2F0aW9uQmFySXRlbSI6Ch1BdXRoUmVzZXRQYXNzd29yZEVtYWlsUmVxdWVzdBIZCgVlbWFpbBgBIAEoCUIKukgHcgUYyAFgASIxCh5BdXRoUmVzZXRQYXNzd29yZEVtYWlsUmVzcG9uc2USDwoHbWVzc2FnZRgBIAEoCSK0AQoYQXV0aFJlc2V0UGFzc3dvcmRSZXF1ZXN0EhkKBWVtYWlsGAEgASgJQgq6SAdyBRjIAWABEh0KDG5ld19wYXNzd29yZBgCIAEoCUIHukgEcgIQBhIqChluZXdfcGFzc3dvcmRfY29uZmlybWF0aW9uGAMgASgJQge6SARyAhAGEhwKC3Jlc2V0X3Rva2VuGAQgASgJQge6SARyAhAGEhQKDHJlZGlyZWN0X3VybBgFIAEoCSKoAQoZQXV0aFJlc2V0UGFzc3dvcmRSZXNwb25zZRIrCgR1c2VyGAEgASgLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hVXNlchIoCgpsb2dpbl9pbmZvGAIgASgLMhQuZGV2a2l0LnYxLkxvZ2luSW5mbxI0Cg5uYXZpZ2F0aW9uX2JhchgDIAMoCzIcLmRldmtpdC52MS5OYXZpZ2F0aW9uQmFySXRlbWIGcHJvdG8z", [v, ga, ma]), io = /* @__PURE__ */ R("Ch1kZXZraXQvdjEvYWNjb3VudHNfcm9sZS5wcm90bxIJZGV2a2l0LnYxIsgBChdSb2xlQ3JlYXRlVXBkYXRlUmVxdWVzdBIPCgdyb2xlX2lkGAEgASgFEh0KCXJvbGVfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIkChNyb2xlX3NlY3VyaXR5X2xldmVsGAUgASgFQge6SAQaAiAAEhEKCXRlbmFudF9pZBgGIAEoBRIiChByb2xlX2Rlc2NyaXB0aW9uGAMgASgJQgi6SAVyAxjIARIgCgtwZXJtaXNzaW9ucxgEIAMoBUILukgIkgEFEPQDGAEioQEKEkFjY291bnRzU2NoZW1hUm9sZRIPCgdyb2xlX2lkGAEgASgFEhEKCXJvbGVfbmFtZRgCIAEoCRIRCgl0ZW5hbnRfaWQYByABKAUSGAoQcm9sZV9kZXNjcmlwdGlvbhgDIAEoCRISCgpjcmVhdGVkX2F0GAQgASgJEhIKCnVwZGF0ZWRfYXQYBSABKAkSEgoKZGVsZXRlZF9hdBgGIAEoCSJHChhSb2xlQ3JlYXRlVXBkYXRlUmVzcG9uc2USKwoEcm9sZRgBIAEoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVJvbGUiKwoYUm9sZURlbGV0ZVJlc3RvcmVSZXF1ZXN0Eg8KB3JlY29yZHMYASADKAUiSwoZUm9sZURlbGV0ZVJlc3RvcmVSZXNwb25zZRIuCgdyZWNvcmRzGAEgAygLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hUm9sZSIkChFSb2xlRGVsZXRlUmVxdWVzdBIPCgdyZWNvcmRzGAEgAygFIkQKElJvbGVEZWxldGVSZXNwb25zZRIuCgdyZWNvcmRzGAEgAygLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hUm9sZSJqCgtSb2xlRmlsdGVycxIRCglyb2xlX25hbWUYASABKAkSGAoQcm9sZV9kZXNjcmlwdGlvbhgCIAEoCRIXCg9jcmVhdGVkX2F0X2Zyb20YAyABKAkSFQoNY3JlYXRlZF9hdF90bxgEIAEoCSJyCg9Sb2xlTGlzdFJlcXVlc3QSJwoHZmlsdGVycxgBIAEoCzIWLmRldmtpdC52MS5Sb2xlRmlsdGVycxI2ChFwYWdpbmF0aW9uX3BhcmFtcxgCIAEoCzIbLmRldmtpdC52MS5QYWdpbmF0aW9uUGFyYW1zIqgBChBSb2xlTGlzdFJlc3BvbnNlEi4KB3JlY29yZHMYASADKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFSb2xlEjYKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVJvbGUSLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIi0KGFJvbGVGaW5kRm9yVXBkYXRlUmVxdWVzdBIRCglyZWNvcmRfaWQYASABKAUiUAoZUm9sZUZpbmRGb3JVcGRhdGVSZXNwb25zZRIzCgdyZXF1ZXN0GAEgASgLMiIuZGV2a2l0LnYxLlJvbGVDcmVhdGVVcGRhdGVSZXF1ZXN0IhYKFFJvbGVMaXN0SW5wdXRSZXF1ZXN0IkYKFVJvbGVMaXN0SW5wdXRSZXNwb25zZRItCgdvcHRpb25zGAEgAygLMhwuZGV2a2l0LnYxLlNlbGVjdElucHV0T3B0aW9uYgZwcm90bzM", [v, ce]), ro = /* @__PURE__ */ R("Ch1kZXZraXQvdjEvcHJvcGVydHlfY2l0eS5wcm90bxIJZGV2a2l0LnYxIqkBChRQcm9wZXJ0aWVzU2NoZW1hQ2l0eRIPCgdjaXR5X2lkGAEgASgFEhoKCWNpdHlfbmFtZRgCIAEoCUIHukgEcgIQARIUCgxjaXR5X25hbWVfYXIYAyABKAkSEgoKY2l0eV9pbWFnZRgEIAEoCRISCgpjcmVhdGVkX2F0GAUgASgJEhIKCnVwZGF0ZWRfYXQYBiABKAkSEgoKZGVsZXRlZF9hdBgHIAEoCSIRCg9DaXR5TGlzdFJlcXVlc3QirAEKEENpdHlMaXN0UmVzcG9uc2USMAoHcmVjb3JkcxgBIAMoCzIfLmRldmtpdC52MS5Qcm9wZXJ0aWVzU2NoZW1hQ2l0eRI4Cg9kZWxldGVkX3JlY29yZHMYAiADKAsyHy5kZXZraXQudjEuUHJvcGVydGllc1NjaGVtYUNpdHkSLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIhYKFENpdHlMaXN0SW5wdXRSZXF1ZXN0IkYKFUNpdHlMaXN0SW5wdXRSZXNwb25zZRItCgdvcHRpb25zGAEgAygLMhwuZGV2a2l0LnYxLlNlbGVjdElucHV0T3B0aW9uYgZwcm90bzM", [v, ce]), uo = /* @__PURE__ */ R("CiFkZXZraXQvdjEvcHJvcGVydHlfbG9jYXRpb24ucHJvdG8SCWRldmtpdC52MSLOAQoYUHJvcGVydGllc1NjaGVtYUxvY2F0aW9uEhMKC2xvY2F0aW9uX2lkGAEgASgFEh4KDWxvY2F0aW9uX25hbWUYAiABKAlCB7pIBHICEAESGAoQbG9jYXRpb25fbmFtZV9hchgDIAEoCRIWCg5sb2NhdGlvbl9pbWFnZRgEIAEoCRIPCgdjaXR5X2lkGAggASgFEhIKCmNyZWF0ZWRfYXQYBSABKAkSEgoKdXBkYXRlZF9hdBgGIAEoCRISCgpkZWxldGVkX2F0GAcgASgJIhUKE0xvY2F0aW9uTGlzdFJlcXVlc3QiuAEKFExvY2F0aW9uTGlzdFJlc3BvbnNlEjQKB3JlY29yZHMYASADKAsyIy5kZXZraXQudjEuUHJvcGVydGllc1NjaGVtYUxvY2F0aW9uEjwKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIjLmRldmtpdC52MS5Qcm9wZXJ0aWVzU2NoZW1hTG9jYXRpb24SLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIj0KGExvY2F0aW9uTGlzdElucHV0UmVxdWVzdBIPCgdjaXR5X2lkGAEgASgFEhAKCGNpdHlfaWRzGAIgAygFIkoKGUxvY2F0aW9uTGlzdElucHV0UmVzcG9uc2USLQoHb3B0aW9ucxgBIAMoCzIcLmRldmtpdC52MS5TZWxlY3RJbnB1dE9wdGlvbmIGcHJvdG8z", [v, ce]), go = /* @__PURE__ */ R("ChxkZXZraXQvdjEvcHVibGljX2VtYWlsLnByb3RvEglkZXZraXQudjEizwIKEEVtYWlsU2VuZFJlcXVlc3QSDAoEZnJvbRgBIAEoCRIKCgJ0bxgCIAMoCRIPCgdzdWJqZWN0GAMgASgJEgsKA2JjYxgEIAMoCRIKCgJjYxgFIAMoCRIQCghyZXBseV90bxgGIAEoCRIMCgRodG1sGAcgASgJEgwKBHRleHQYCCABKAkSHAoEdGFncxgJIAMoCzIOLmRldmtpdC52MS5UYWcSKgoLYXR0YWNobWVudHMYCiADKAsyFS5kZXZraXQudjEuQXR0YWNobWVudBI5CgdoZWFkZXJzGAsgAygLMiguZGV2a2l0LnYxLkVtYWlsU2VuZFJlcXVlc3QuSGVhZGVyc0VudHJ5EhQKDHNjaGVkdWxlZF9hdBgMIAEoCRouCgxIZWFkZXJzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASIfChFFbWFpbFNlbmRSZXNwb25zZRIKCgJpZBgBIAEoCSIhCgNUYWcSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJIkUKCkF0dGFjaG1lbnQSEAoIZmlsZW5hbWUYASABKAkSFAoMY29udGVudF90eXBlGAIgASgJEg8KB2NvbnRlbnQYAyABKAxiBnByb3RvMw"), mo = /* @__PURE__ */ R("ChtkZXZraXQvdjEvcHVibGljX2ljb24ucHJvdG8SCWRldmtpdC52MSJACgRJY29uEg8KB2ljb25faWQYASABKAUSEQoJaWNvbl9uYW1lGAIgASgJEhQKDGljb25fY29udGVudBgDIAEoCSI7ChBJY29uQ3JlYXRlVXBkYXRlEhEKCWljb25fbmFtZRgCIAEoCRIUCgxpY29uX2NvbnRlbnQYAyABKAkiEQoPSWNvbkxpc3RSZXF1ZXN0IjIKEEljb25MaXN0UmVzcG9uc2USHgoFaWNvbnMYASADKAsyDy5kZXZraXQudjEuSWNvbiI1Cg9JY29uRmluZFJlcXVlc3QSDwoHaWNvbl9pZBgBIAEoBRIRCglpY29uX25hbWUYAiABKAkiMQoQSWNvbkZpbmRSZXNwb25zZRIdCgRpY29uGAEgASgLMg8uZGV2a2l0LnYxLkljb24iSQobSWNvbkNyZWF0ZVVwZGF0ZUJ1bGtSZXF1ZXN0EioKBWljb25zGAEgAygLMhsuZGV2a2l0LnYxLkljb25DcmVhdGVVcGRhdGUiPgocSWNvbkNyZWF0ZVVwZGF0ZUJ1bGtSZXNwb25zZRIeCgVpY29ucxgBIAMoCzIPLmRldmtpdC52MS5JY29uYgZwcm90bzM"), bo = /* @__PURE__ */ R("Ch5kZXZraXQvdjEvcHVibGljX3NldHRpbmcucHJvdG8SCWRldmtpdC52MSJOCgdTZXR0aW5nEhMKC3NldHRpbmdfa2V5GAEgASgJEhUKDXNldHRpbmdfdmFsdWUYAiABKAkSFwoPaW5wdXRfdHlwZV9uYW1lGAMgASgJIh0KG1NldHRpbmdGaW5kRm9yVXBkYXRlUmVxdWVzdCJaChdTZXR0aW5nVXBkYXRlUmVxdWVzdFJvdxIfCgtzZXR0aW5nX2tleRgBIAEoCUIKukgHcgUQAhjIARIeCg1zZXR0aW5nX3ZhbHVlGAIgASgJQge6SARyAhACIkwKFFNldHRpbmdVcGRhdGVSZXF1ZXN0EjQKCHNldHRpbmdzGAEgAygLMiIuZGV2a2l0LnYxLlNldHRpbmdVcGRhdGVSZXF1ZXN0Um93IlkKF1NldHRpbmdGaW5kRm9yVXBkYXRlUm93EhMKC3NldHRpbmdfa2V5GAEgASgJEhUKDXNldHRpbmdfdmFsdWUYAiABKAkSEgoKaW5wdXRfdHlwZRgDIAEoCSJUChxTZXR0aW5nRmluZEZvclVwZGF0ZVJlc3BvbnNlEjQKCHNldHRpbmdzGAEgAygLMiIuZGV2a2l0LnYxLlNldHRpbmdGaW5kRm9yVXBkYXRlUm93IhcKFVNldHRpbmdVcGRhdGVSZXNwb25zZWIGcHJvdG8z", [v]), ba = /* @__PURE__ */ R("Ch5kZXZraXQvdjEvcHVibGljX3N0b3JhZ2UucHJvdG8SCWRldmtpdC52MSJrChFGaWxlQ3JlYXRlUmVxdWVzdBIVCgRwYXRoGAEgASgJQge6SARyAhACEhwKC2J1Y2tldF9uYW1lGAIgASgJQge6SARyAhACEg4KBnJlYWRlchgDIAEoDBIRCglmaWxlX3R5cGUYBCABKAkiRAoVRmlsZUNyZWF0ZUJ1bGtSZXF1ZXN0EisKBWZpbGVzGAEgAygLMhwuZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXF1ZXN0IiIKEkZpbGVDcmVhdGVSZXNwb25zZRIMCgRwYXRoGAEgASgJIiYKFkZpbGVDcmVhdGVCdWxrUmVzcG9uc2USDAoEcGF0aBgBIAMoCSJqChJJbXBvcnRUYWJsZVJlcXVlc3QSGwoKdGFibGVfbmFtZRgBIAEoCUIHukgEcgIQAhITCgtzY2hlbWFfbmFtZRgCIAEoCRISCgpzaGVldF9uYW1lGAMgASgJEg4KBnJlYWRlchgEIAEoDCImChNJbXBvcnRUYWJsZVJlc3BvbnNlEg8KB21lc3NhZ2UYASABKAkipQEKDVN0b3JhZ2VCdWNrZXQSCgoCaWQYASABKAkSDAoEbmFtZRgCIAEoCRIOCgZwdWJsaWMYAyABKAgSEgoKY3JlYXRlZF9hdBgEIAEoCRISCgp1cGRhdGVkX2F0GAUgASgJEg0KBW93bmVyGAYgASgJEhcKD2ZpbGVfc2l6ZV9saW1pdBgHIAEoAxIaChJhbGxvd2VkX21pbWVfdHlwZXMYCCADKAkimwEKGUJ1Y2tldENyZWF0ZVVwZGF0ZVJlcXVlc3QSEwoLYnVja2V0X25hbWUYASABKAkSEAoIaXNfcHVsaWMYAiABKAgSKAoPZmlsZV9zaXplX2xpbWl0GAMgASgJQg+6SAxyCjIIXlswLTldKiQSGgoSYWxsb3dlZF9maWxlX3R5cGVzGAQgAygJEhEKCWlzX3VwZGF0ZRgFIAEoCCJGChpCdWNrZXRDcmVhdGVVcGRhdGVSZXNwb25zZRIoCgZidWNrZXQYASABKAsyGC5kZXZraXQudjEuU3RvcmFnZUJ1Y2tldCITChFCdWNrZXRMaXN0UmVxdWVzdCI/ChJCdWNrZXRMaXN0UmVzcG9uc2USKQoHYnVja2V0cxgBIAMoCzIYLmRldmtpdC52MS5TdG9yYWdlQnVja2V0IrkBCgxGaWxlTWV0YWRhdGESDQoFZV90YWcYASABKAkSDAoEc2l6ZRgCIAEoAxIQCghtaW1ldHlwZRgDIAEoCRIVCg1jYWNoZV9jb250cm9sGAQgASgJEjEKDWxhc3RfbW9kaWZpZWQYBSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEhYKDmNvbnRlbnRfbGVuZ3RoGAYgASgDEhgKEGh0dHBfc3RhdHVzX2NvZGUYByABKAUi4AEKCkZpbGVPYmplY3QSDAoEbmFtZRgBIAEoCRIRCglidWNrZXRfaWQYAiABKAkSDQoFb3duZXIYAyABKAkSCgoCaWQYBCABKAkSEgoKdXBkYXRlZF9hdBgFIAEoCRISCgpjcmVhdGVkX2F0GAYgASgJEhgKEGxhc3RfYWNjZXNzZWRfYXQYByABKAkSKQoIbWV0YWRhdGEYCCABKAsyFy5kZXZraXQudjEuRmlsZU1ldGFkYXRhEikKB2J1Y2tldHMYCSABKAsyGC5kZXZraXQudjEuU3RvcmFnZUJ1Y2tldCJjCg9GaWxlTGlzdFJlcXVlc3QSHQoJYnVja2V0X2lkGAEgASgJQgq6SAdyBRABGMgBEhIKCnF1ZXJ5X3BhdGgYAiABKAkSDQoFbGltaXQYAyABKAUSDgoGb2ZmZXN0GAQgASgFIjgKEEZpbGVMaXN0UmVzcG9uc2USJAoFZmlsZXMYASADKAsyFS5kZXZraXQudjEuRmlsZU9iamVjdCK7AQoSR2FsbGVyeUxpc3RGaWx0ZXJzEh0KCWJ1Y2tldF9pZBgBIAEoCUIKukgHcgUQARjIARIRCglmaWxlX25hbWUYAiABKAkSDAoEcGF0aBgDIAEoCRIRCgltaW1lX3R5cGUYBCABKAkSEgoKcXVlcnlfcGF0aBgFIAEoCRIQCghtaW5fc2l6ZRgGIAEoBRIQCghtYXhfc2l6ZRgHIAEoBRIaChJjcmVhdGVkX2F0X2JldHdlZW4YCCADKAUifAoSR2FsbGVyeUxpc3RSZXF1ZXN0Ei4KB2ZpbHRlcnMYASABKAsyHS5kZXZraXQudjEuR2FsbGVyeUxpc3RGaWx0ZXJzEjYKEXBhZ2luYXRpb25fcGFyYW1zGAIgASgLMhsuZGV2a2l0LnYxLlBhZ2luYXRpb25QYXJhbXMiawoTR2FsbGVyeUxpc3RSZXNwb25zZRImCgdyZWNvcmRzGAEgAygLMhUuZGV2a2l0LnYxLkZpbGVPYmplY3QSLAoHb3B0aW9ucxgCIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIjEKEUZpbGVEZWxldGVSZXF1ZXN0EhwKB3JlY29yZHMYASADKAlCC7pICJIBBRD0AxgBIkYKEkZpbGVEZWxldGVSZXNwb25zZRIwCglyZXNwb25zZXMYASADKAsyHS5kZXZraXQudjEuRmlsZUNyZWF0ZVJlc3BvbnNlIk4KGUZpbGVEZWxldGVCeUJ1Y2tldFJlcXVlc3QSEwoLYnVja2V0X25hbWUYASABKAkSHAoHcmVjb3JkcxgCIAMoCUILukgIkgEFEPQDGAEiTgoaRmlsZURlbGV0ZUJ5QnVja2V0UmVzcG9uc2USMAoJcmVzcG9uc2VzGAEgAygLMh0uZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXNwb25zZWIGcHJvdG8z", [v, ce, pe]), Io = /* @__PURE__ */ R("CiJkZXZraXQvdjEvcHVibGljX3RyYW5zbGF0aW9uLnByb3RvEglkZXZraXQudjEiUwoLVHJhbnNsYXRpb24SFwoPdHJhbnNsYXRpb25fa2V5GAEgASgJEhUKDWVuZ2xpc2hfdmFsdWUYAiABKAkSFAoMYXJhYmljX3ZhbHVlGAMgASgJIk0KIlRyYW5zbGF0aW9uQ3JlYXRlVXBkYXRlQnVsa1JlcXVlc3QSJwoHcmVjb3JkcxgBIAMoCzIWLmRldmtpdC52MS5UcmFuc2xhdGlvbiIYChZUcmFuc2xhdGlvbkxpc3RSZXF1ZXN0IkcKF1RyYW5zbGF0aW9uTGlzdFJlc3BvbnNlEiwKDHRyYW5zbGF0aW9ucxgBIAMoCzIWLmRldmtpdC52MS5UcmFuc2xhdGlvbiIuChxUcmFuc2xhdGlvbkZpbmRMb2NhbGVSZXF1ZXN0Eg4KBmxvY2FsZRgBIAEoCSKmAQodVHJhbnNsYXRpb25GaW5kTG9jYWxlUmVzcG9uc2USUAoMdHJhbnNsYXRpb25zGAEgAygLMjouZGV2a2l0LnYxLlRyYW5zbGF0aW9uRmluZExvY2FsZVJlc3BvbnNlLlRyYW5zbGF0aW9uc0VudHJ5GjMKEVRyYW5zbGF0aW9uc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiKAoYVHJhbnNsYXRpb25EZWxldGVSZXF1ZXN0EgwKBGtleXMYASADKAkiSQoZVHJhbnNsYXRpb25EZWxldGVSZXNwb25zZRIsCgx0cmFuc2xhdGlvbnMYASADKAsyFi5kZXZraXQudjEuVHJhbnNsYXRpb24iUwojVHJhbnNsYXRpb25DcmVhdGVVcGRhdGVCdWxrUmVzcG9uc2USLAoMdHJhbnNsYXRpb25zGAEgAygLMhYuZGV2a2l0LnYxLlRyYW5zbGF0aW9uYgZwcm90bzM"), Go = /* @__PURE__ */ R("Ch9kZXZraXQvdjEvc2VydmljZV9vcHRpb25zLnByb3RvEglkZXZraXQudjE6UQoTc2tpcF9hdXRoZW50aWNhdGlvbhIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGNGGAyABKAhSEnNraXBBdXRoZW50aWNhdGlvbjpPChJza2lwX2F1dGhvcml6YXRpb24SHi5nb29nbGUucHJvdG9idWYuTWV0aG9kT3B0aW9ucxjShgMgASgIUhFza2lwQXV0aG9yaXphdGlvbjpLChBwZXJtaXNzaW9uX2dyb3VwEh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMY04YDIAEoCVIPcGVybWlzc2lvbkdyb3VwOkkKD3Blcm1pc3Npb25fbmFtZRIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGOPUAyABKAlSDnBlcm1pc3Npb25OYW1lYgZwcm90bzM", [Mn]), Ia = /* @__PURE__ */ R("Ch5kZXZraXQvdjEvdGVuYW50X3BhcnRpYWwucHJvdG8SCWRldmtpdC52MSKtBgoUVGVuYW50c1NjaGVtYVBhcnRpYWwSEgoKcGFydGlhbF9pZBgBIAEoBRIUCgxwYXJ0aWFsX25hbWUYAiABKAkSFwoPcGFydGlhbF9uYW1lX2FyGAMgASgJEhQKDHBhcnRpYWxfbGluaxgEIAEoCRIPCgdhZGRyZXNzGAUgASgJEhsKE3BhcnRpYWxfYnV0dG9uX2xpbmsYBiABKAkSHAoUcGFydGlhbF9idXR0b25fbGFiZWwYByABKAkSHwoXcGFydGlhbF9idXR0b25fbGFiZWxfYXIYCCABKAkSGwoTcGFydGlhbF9idXR0b25faWNvbhgJIAEoCRIeChZwYXJ0aWFsX2J1dHRvbl9wYWdlX2lkGAogASgFEhcKD3BhcnRpYWxfdHlwZV9pZBgLIAEoBRISCgpzZWN0aW9uX2lkGAwgASgFEhUKDXBhcnRpYWxfaW1hZ2UYDSABKAkSFgoOcGFydGlhbF9pbWFnZXMYDiADKAkSSAoNcGFydGlhbF9saW5rcxgPIAMoCzIxLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFydGlhbC5QYXJ0aWFsTGlua3NFbnRyeRIVCg1wYXJ0aWFsX2ljb25zGBAgAygJEhUKDXBhcnRpYWxfdmlkZW8YESABKAkSEwoLaXNfZmVhdHVyZWQYEiABKAgSFQoNcGFydGlhbF9icmllZhgTIAEoCRIYChBwYXJ0aWFsX2JyaWVmX2FyGBQgASgJEhcKD3BhcnRpYWxfY29udGVudBgVIAEoCRIaChJwYXJ0aWFsX2NvbnRlbnRfYXIYFiABKAkSLgoKY3JlYXRlZF9hdBgXIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgYIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKZGVsZXRlZF9hdBgZIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAaMwoRUGFydGlhbExpbmtzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASIUChJQYXJ0aWFsTGlzdFJlcXVlc3QirwEKE1BhcnRpYWxMaXN0UmVzcG9uc2USMAoHcmVjb3JkcxgBIAMoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFydGlhbBI4Cg9kZWxldGVkX3JlY29yZHMYAiADKAsyHy5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhcnRpYWwSLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIoYHChpQYXJ0aWFsQ3JlYXRlVXBkYXRlUmVxdWVzdBISCgpwYXJ0aWFsX2lkGAEgASgFEiAKDHBhcnRpYWxfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIhCg9wYXJ0aWFsX25hbWVfYXIYAyABKAlCCLpIBXIDGMgBEiAKD3BhcnRpYWxfdHlwZV9pZBgEIAEoBUIHukgEGgIoARIbCgpzZWN0aW9uX2lkGAUgASgFQge6SAQaAigBEh8KDXBhcnRpYWxfaW1hZ2UYBiABKAlCCLpIBXIDGPQDEhYKDnBhcnRpYWxfaW1hZ2VzGAcgAygJEh8KDXBhcnRpYWxfdmlkZW8YCCABKAlCCLpIBXIDGPQDEhMKC2lzX2ZlYXR1cmVkGAkgASgIEh8KDXBhcnRpYWxfYnJpZWYYCiABKAlCCLpIBXIDGOgHEiIKEHBhcnRpYWxfYnJpZWZfYXIYCyABKAlCCLpIBXIDGOgHEiEKD3BhcnRpYWxfY29udGVudBgMIAEoCUIIukgFcgMYiCcSJAoScGFydGlhbF9jb250ZW50X2FyGA0gASgJQgi6SAVyAxiIJxImChRwYXJ0aWFsX2J1dHRvbl9sYWJlbBgOIAEoCUIIukgFcgMYyAESKQoXcGFydGlhbF9idXR0b25fbGFiZWxfYXIYDyABKAlCCLpIBXIDGMgBEiUKE3BhcnRpYWxfYnV0dG9uX2ljb24YECABKAlCCLpIBXIDGPQDEiUKE3BhcnRpYWxfYnV0dG9uX2xpbmsYESABKAlCCLpIBXIDGPQDEh4KFnBhcnRpYWxfYnV0dG9uX3BhZ2VfaWQYEiABKAUSHwoNcGFydGlhbF9pY29ucxgTIAEoCUIIukgFcgMY9AMSGQoHYWRkcmVzcxgUIAEoCUIIukgFcgMY6AcSTgoNcGFydGlhbF9saW5rcxgVIAMoCzI3LmRldmtpdC52MS5QYXJ0aWFsQ3JlYXRlVXBkYXRlUmVxdWVzdC5QYXJ0aWFsTGlua3NFbnRyeRIeCgxwYXJ0aWFsX2xpbmsYFiABKAlCCLpIBXIDGPQDEjEKB3VwbG9hZHMYFyABKAsyIC5kZXZraXQudjEuRmlsZUNyZWF0ZUJ1bGtSZXF1ZXN0GjMKEVBhcnRpYWxMaW5rc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiTgobUGFydGlhbENyZWF0ZVVwZGF0ZVJlc3BvbnNlEi8KBnJlY29yZBgBIAEoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFydGlhbCI7ChtQYXJ0aWFsRGVsZXRlUmVzdG9yZVJlcXVlc3QSHAoHcmVjb3JkcxgBIAMoBUILukgIkgEFEPQDGAEiUAocUGFydGlhbERlbGV0ZVJlc3RvcmVSZXNwb25zZRIwCgdyZWNvcmRzGAEgAygLMh8uZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFQYXJ0aWFsIjAKG1BhcnRpYWxGaW5kRm9yVXBkYXRlUmVxdWVzdBIRCglyZWNvcmRfaWQYASABKAUiVgocUGFydGlhbEZpbmRGb3JVcGRhdGVSZXNwb25zZRI2CgdyZXF1ZXN0GAEgASgLMiUuZGV2a2l0LnYxLlBhcnRpYWxDcmVhdGVVcGRhdGVSZXF1ZXN0Ih0KG1BhcnRpYWxUeXBlTGlzdElucHV0UmVxdWVzdCJNChxQYXJ0aWFsVHlwZUxpc3RJbnB1dFJlc3BvbnNlEi0KB29wdGlvbnMYASADKAsyHC5kZXZraXQudjEuU2VsZWN0SW5wdXRPcHRpb25iBnByb3RvMw", [v, ce, ba, pe]), Ga = /* @__PURE__ */ R("Ch5kZXZraXQvdjEvdGVuYW50X3NlY3Rpb24ucHJvdG8SCWRldmtpdC52MSKzBAoUVGVuYW50c1NjaGVtYVNlY3Rpb24SEgoKc2VjdGlvbl9pZBgBIAEoBRIUCgxzZWN0aW9uX25hbWUYAiABKAkSFwoPc2VjdGlvbl9uYW1lX2FyGAMgASgJEhYKDnNlY3Rpb25faGVhZGVyGAQgASgJEhkKEXNlY3Rpb25faGVhZGVyX2FyGAUgASgJEhsKE3NlY3Rpb25fZGVzY3JpcHRpb24YBiABKAkSHgoWc2VjdGlvbl9kZXNjcmlwdGlvbl9hchgHIAEoCRIcChRzZWN0aW9uX2J1dHRvbl9sYWJlbBgIIAEoCRIfChdzZWN0aW9uX2J1dHRvbl9sYWJlbF9hchgJIAEoCRIeChZzZWN0aW9uX2J1dHRvbl9wYWdlX2lkGAogASgFEhYKDnNlY3Rpb25faW1hZ2VzGAsgASgJEhwKFHNlY3Rpb25faW1hZ2VzX2FycmF5GBUgAygJEhEKCXRlbmFudF9pZBgMIAEoBRIaChJzZWN0aW9uX2JhY2tncm91bmQYDSABKAkSFAoMc2VjdGlvbl9pY29uGA4gASgJEi4KCmNyZWF0ZWRfYXQYDyABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCnVwZGF0ZWRfYXQYECABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmRlbGV0ZWRfYXQYESABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wItoDChhUZW5hbnRzU2NoZW1hU2VjdGlvblZpZXcSEgoKc2VjdGlvbl9pZBgBIAEoBRIUCgxzZWN0aW9uX25hbWUYAiABKAkSFwoPc2VjdGlvbl9uYW1lX2FyGAMgASgJEhYKDnNlY3Rpb25faGVhZGVyGAQgASgJEhkKEXNlY3Rpb25faGVhZGVyX2FyGAUgASgJEhsKE3NlY3Rpb25fZGVzY3JpcHRpb24YBiABKAkSHgoWc2VjdGlvbl9kZXNjcmlwdGlvbl9hchgHIAEoCRIcChRzZWN0aW9uX2J1dHRvbl9sYWJlbBgIIAEoCRIfChdzZWN0aW9uX2J1dHRvbl9sYWJlbF9hchgJIAEoCRIeChZzZWN0aW9uX2J1dHRvbl9wYWdlX2lkGAogASgFEhwKFHNlY3Rpb25faW1hZ2VzX2FycmF5GBUgAygJEhYKDnNlY3Rpb25faW1hZ2VzGAsgASgJEhEKCXRlbmFudF9pZBgMIAEoBRIaChJzZWN0aW9uX2JhY2tncm91bmQYDSABKAkSFAoMc2VjdGlvbl9pY29uGA4gASgJEjEKCHBhcnRpYWxzGBIgAygLMh8uZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFQYXJ0aWFsIhQKElNlY3Rpb25MaXN0UmVxdWVzdCKvAQoTU2VjdGlvbkxpc3RSZXNwb25zZRIwCgdyZWNvcmRzGAEgAygLMh8uZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFTZWN0aW9uEjgKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hU2VjdGlvbhIsCgdvcHRpb25zGAMgASgLMhsuZGV2a2l0LnYxLkF2YWlsYWJsZU9wdGlvbnMiyQMKGlNlY3Rpb25DcmVhdGVVcGRhdGVSZXF1ZXN0EhIKCnNlY3Rpb25faWQYASABKAUSIAoMc2VjdGlvbl9uYW1lGAIgASgJQgq6SAdyBRACGMgBEiEKD3NlY3Rpb25fbmFtZV9hchgDIAEoCUIIukgFcgMYyAESJgoUc2VjdGlvbl9idXR0b25fbGFiZWwYBCABKAlCCLpIBXIDGMgBEikKF3NlY3Rpb25fYnV0dG9uX2xhYmVsX2FyGAUgASgJQgi6SAVyAxjIARIeChZzZWN0aW9uX2J1dHRvbl9wYWdlX2lkGAYgASgFEhYKDnNlY3Rpb25faGVhZGVyGAcgASgJEhkKEXNlY3Rpb25faGVhZGVyX2FyGAggASgJEhsKE3NlY3Rpb25fZGVzY3JpcHRpb24YCSABKAkSHgoWc2VjdGlvbl9kZXNjcmlwdGlvbl9hchgKIAEoCRIWCg5zZWN0aW9uX2ltYWdlcxgLIAMoCRIRCgl0ZW5hbnRfaWQYDCABKAUSJAoSc2VjdGlvbl9iYWNrZ3JvdW5kGA0gASgJQgi6SAVyAxj0AxIeCgxzZWN0aW9uX2ljb24YDiABKAlCCLpIBXIDGPQDIk4KG1NlY3Rpb25DcmVhdGVVcGRhdGVSZXNwb25zZRIvCgZyZWNvcmQYASABKAsyHy5kZXZraXQudjEuVGVuYW50c1NjaGVtYVNlY3Rpb24iOwobU2VjdGlvbkRlbGV0ZVJlc3RvcmVSZXF1ZXN0EhwKB3JlY29yZHMYASADKAVCC7pICJIBBRD0AxgBIlAKHFNlY3Rpb25EZWxldGVSZXN0b3JlUmVzcG9uc2USMAoHcmVjb3JkcxgBIAMoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hU2VjdGlvbiIwChtTZWN0aW9uRmluZEZvclVwZGF0ZVJlcXVlc3QSEQoJcmVjb3JkX2lkGAEgASgFIlYKHFNlY3Rpb25GaW5kRm9yVXBkYXRlUmVzcG9uc2USNgoHcmVxdWVzdBgBIAEoCzIlLmRldmtpdC52MS5TZWN0aW9uQ3JlYXRlVXBkYXRlUmVxdWVzdCIYChZTZWN0aW9uTGlzdElucHRSZXF1ZXN0IkgKF1NlY3Rpb25MaXN0SW5wdFJlc3BvbnNlEi0KB29wdGlvbnMYASADKAsyHC5kZXZraXQudjEuU2VsZWN0SW5wdXRPcHRpb25iBnByb3RvMw", [v, ce, Ia, pe]), ha = /* @__PURE__ */ R("ChtkZXZraXQvdjEvdGVuYW50X3BhZ2UucHJvdG8SCWRldmtpdC52MSL9AgoVVGVuYW50c1NjaGVtYVBhZ2VWaWV3Eg8KB3BhZ2VfaWQYASABKAUSEQoJcGFnZV9uYW1lGAIgASgJEhQKDHBhZ2VfbmFtZV9hchgDIAEoCRIYChBwYWdlX2Rlc2NyaXB0aW9uGAQgASgJEhsKE3BhZ2VfZGVzY3JpcHRpb25fYXIYBSABKAkSFwoPcGFnZV9icmVhZGNydW1iGAYgASgJEhEKCXRlbmFudF9pZBgHIAEoBRISCgpwYWdlX3JvdXRlGAggASgJEhgKEHBhZ2VfY292ZXJfaW1hZ2UYCSABKAkSGAoQcGFnZV9jb3Zlcl92aWRlbxgKIAEoCRIWCg5wYWdlX2tleV93b3JkcxgLIAEoCRIdChVwYWdlX21ldGFfZGVzY3JpcHRpb24YDCABKAkSEQoJcGFnZV9pY29uGA0gASgJEjUKCHNlY3Rpb25zGBEgAygLMiMuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFTZWN0aW9uVmlldyLSAwoRVGVuYW50c1NjaGVtYVBhZ2USDwoHcGFnZV9pZBgBIAEoBRIRCglwYWdlX25hbWUYAiABKAkSFAoMcGFnZV9uYW1lX2FyGAMgASgJEhgKEHBhZ2VfZGVzY3JpcHRpb24YBCABKAkSGwoTcGFnZV9kZXNjcmlwdGlvbl9hchgFIAEoCRIXCg9wYWdlX2JyZWFkY3J1bWIYBiABKAkSEQoJdGVuYW50X2lkGAcgASgFEhIKCnBhZ2Vfcm91dGUYCCABKAkSGAoQcGFnZV9jb3Zlcl9pbWFnZRgJIAEoCRIYChBwYWdlX2NvdmVyX3ZpZGVvGAogASgJEhYKDnBhZ2Vfa2V5X3dvcmRzGAsgASgJEh0KFXBhZ2VfbWV0YV9kZXNjcmlwdGlvbhgMIAEoCRIRCglwYWdlX2ljb24YDSABKAkSLgoKY3JlYXRlZF9hdBgOIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgPIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKZGVsZXRlZF9hdBgQIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAiEQoPUGFnZUxpc3RSZXF1ZXN0IqYBChBQYWdlTGlzdFJlc3BvbnNlEi0KB3JlY29yZHMYASADKAsyHC5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhZ2USNQoPZGVsZXRlZF9yZWNvcmRzGAIgAygLMhwuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFQYWdlEiwKB29wdGlvbnMYAyABKAsyGy5kZXZraXQudjEuQXZhaWxhYmxlT3B0aW9ucyKaAwoXUGFnZUNyZWF0ZVVwZGF0ZVJlcXVlc3QSDwoHcGFnZV9pZBgBIAEoBRIdCglwYWdlX25hbWUYAiABKAlCCrpIB3IFEAIYyAESHgoMcGFnZV9uYW1lX2FyGAMgASgJQgi6SAVyAxjIARIYChBwYWdlX2Rlc2NyaXB0aW9uGAQgASgJEhsKE3BhZ2VfZGVzY3JpcHRpb25fYXIYBSABKAkSIQoPcGFnZV9icmVhZGNydW1iGAYgASgJQgi6SAVyAxjIARIRCgl0ZW5hbnRfaWQYByABKAUSHAoKcGFnZV9yb3V0ZRgIIAEoCUIIukgFcgMYyAESIgoQcGFnZV9jb3Zlcl9pbWFnZRgJIAEoCUIIukgFcgMY9AMSIgoQcGFnZV9jb3Zlcl92aWRlbxgKIAEoCUIIukgFcgMY9AMSFgoOcGFnZV9rZXlfd29yZHMYCyADKAkSJwoVcGFnZV9tZXRhX2Rlc2NyaXB0aW9uGAwgASgJQgi6SAVyAxisAhIbCglwYWdlX2ljb24YDSABKAlCCLpIBXIDGMgBIkgKGFBhZ2VDcmVhdGVVcGRhdGVSZXNwb25zZRIsCgZyZWNvcmQYASABKAsyHC5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhZ2UiOAoYUGFnZURlbGV0ZVJlc3RvcmVSZXF1ZXN0EhwKB3JlY29yZHMYASADKAVCC7pICJIBBRD0AxgBIkoKGVBhZ2VEZWxldGVSZXN0b3JlUmVzcG9uc2USLQoHcmVjb3JkcxgBIAMoCzIcLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFnZSItChhQYWdlRmluZEZvclVwZGF0ZVJlcXVlc3QSEQoJcmVjb3JkX2lkGAEgASgFIlAKGVBhZ2VGaW5kRm9yVXBkYXRlUmVzcG9uc2USMwoHcmVxdWVzdBgBIAEoCzIiLmRldmtpdC52MS5QYWdlQ3JlYXRlVXBkYXRlUmVxdWVzdGIGcHJvdG8z", [v, ce, Ga, pe]), ho = /* @__PURE__ */ R("Ch1kZXZraXQvdjEvdGVuYW50X3RlbmFudC5wcm90bxIJZGV2a2l0LnYxIuwEChlUZW5hbnRDcmVhdGVVcGRhdGVSZXF1ZXN0EhEKCXRlbmFudF9pZBgBIAEoBRIfCgt0ZW5hbnRfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIgCg50ZW5hbnRfbmFtZV9hchgDIAEoCUIIukgFcgMYyAESHgoMdGVuYW50X3Bob25lGAQgASgJQgi6SAVyAxjIARIgCg50ZW5hbnRfYWRkcmVzcxgFIAEoCUIIukgFcgMYyAESIwoRdGVuYW50X2FkZHJlc3NfYXIYBiABKAlCCLpIBXIDGMgBEhoKEnRlbmFudF9kZXNjcmlwdGlvbhgHIAEoCRIdChV0ZW5hbnRfZGVzY3JpcHRpb25fYXIYCCABKAkSIAoMdGVuYW50X2VtYWlsGAkgASgJQgq6SAdyBRjIAWABEhMKC3RlbmFudF9sb2dvGBwgASgJEhwKFHRlbmFudF9sb2dvX3ZlcnRpY2FsGAsgASgJEhgKEHRlbmFudF9sb2dvX2RhcmsYDCABKAkSIQoZdGVuYW50X2xvZ29fZGFya192ZXJ0aWNhbBgNIAEoCRIVCg10ZW5hbnRfdmFsdWVzGA4gASgJEksKDHRlbmFudF9saW5rcxgSIAMoCzI1LmRldmtpdC52MS5UZW5hbnRDcmVhdGVVcGRhdGVSZXF1ZXN0LlRlbmFudExpbmtzRW50cnkSFQoNdGVuYW50X3Zpc2lvbhgPIAEoCRIWCg50ZW5hbnRfbWlzc2lvbhgQIAEoCRoyChBUZW5hbnRMaW5rc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEi3AQKE1RlbmFudHNTY2hlbWFUZW5hbnQSEQoJdGVuYW50X2lkGAEgASgFEhMKC3RlbmFudF9uYW1lGAIgASgJEhYKDnRlbmFudF9uYW1lX2FyGAMgASgJEhQKDHRlbmFudF9waG9uZRgEIAEoCRIWCg50ZW5hbnRfYWRkcmVzcxgFIAEoCRIZChF0ZW5hbnRfYWRkcmVzc19hchgGIAEoCRIaChJ0ZW5hbnRfZGVzY3JpcHRpb24YByABKAkSHQoVdGVuYW50X2Rlc2NyaXB0aW9uX2FyGAggASgJEhQKDHRlbmFudF9lbWFpbBgJIAEoCRITCgt0ZW5hbnRfbG9nbxgKIAEoCRIcChR0ZW5hbnRfbG9nb192ZXJ0aWNhbBgLIAEoCRIYChB0ZW5hbnRfbG9nb19kYXJrGAwgASgJEhUKDXRlbmFudF92YWx1ZXMYESABKAkSFQoNdGVuYW50X3Zpc2lvbhgSIAEoCRIWCg50ZW5hbnRfbWlzc2lvbhgTIAEoCRIhChl0ZW5hbnRfbG9nb19kYXJrX3ZlcnRpY2FsGA0gASgJEkUKDHRlbmFudF9saW5rcxgUIAMoCzIvLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50LlRlbmFudExpbmtzRW50cnkSEgoKY3JlYXRlZF9hdBgOIAEoCRISCgp1cGRhdGVkX2F0GA8gASgJEhIKCmRlbGV0ZWRfYXQYECABKAkaMgoQVGVuYW50TGlua3NFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBIsQFChdUZW5hbnRzU2NoZW1hVGVuYW50VmlldxIRCgl0ZW5hbnRfaWQYASABKAUSEwoLdGVuYW50X25hbWUYAiABKAkSFgoOdGVuYW50X25hbWVfYXIYAyABKAkSFAoMdGVuYW50X3Bob25lGAQgASgJEhYKDnRlbmFudF9hZGRyZXNzGAUgASgJEhkKEXRlbmFudF9hZGRyZXNzX2FyGAYgASgJEhoKEnRlbmFudF9kZXNjcmlwdGlvbhgHIAEoCRIdChV0ZW5hbnRfZGVzY3JpcHRpb25fYXIYCCABKAkSFAoMdGVuYW50X2VtYWlsGAkgASgJEhMKC3RlbmFudF9sb2dvGAogASgJEhwKFHRlbmFudF9sb2dvX3ZlcnRpY2FsGAsgASgJEhgKEHRlbmFudF9sb2dvX2RhcmsYDCABKAkSFQoNdGVuYW50X3ZhbHVlcxgNIAEoCRIVCg10ZW5hbnRfdmlzaW9uGA4gASgJEhYKDnRlbmFudF9taXNzaW9uGA8gASgJEiEKGXRlbmFudF9sb2dvX2RhcmtfdmVydGljYWwYECABKAkSSQoMdGVuYW50X2xpbmtzGBYgAygLMjMuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFUZW5hbnRWaWV3LlRlbmFudExpbmtzRW50cnkSEgoKY3JlYXRlZF9hdBgRIAEoCRISCgp1cGRhdGVkX2F0GBIgASgJEhIKCmRlbGV0ZWRfYXQYEyABKAkSLwoFcGFnZXMYFCADKAsyIC5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhZ2VWaWV3Ei0KC25hdmlnYXRpb25zGBUgAygLMhguZGV2a2l0LnYxLk5hdmlnYXRpb25CYXIaMgoQVGVuYW50TGlua3NFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBIkwKGlRlbmFudENyZWF0ZVVwZGF0ZVJlc3BvbnNlEi4KBnRlbmFudBgBIAEoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50IhMKEVRlbmFudExpc3RSZXF1ZXN0IqwBChJUZW5hbnRMaXN0UmVzcG9uc2USLwoHcmVjb3JkcxgBIAMoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50EjcKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50EiwKB29wdGlvbnMYAyABKAsyGy5kZXZraXQudjEuQXZhaWxhYmxlT3B0aW9ucyI6ChpUZW5hbnREZWxldGVSZXN0b3JlUmVxdWVzdBIcCgdyZWNvcmRzGAEgAygFQgu6SAiSAQUQ9AMYASJOChtUZW5hbnREZWxldGVSZXN0b3JlUmVzcG9uc2USLwoHcmVjb3JkcxgBIAMoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50Ii8KEVRlbmFudEZpbmRSZXF1ZXN0EhoKCXRlbmFudF9pZBgBIAEoBUIHukgEGgIgACJIChJUZW5hbnRGaW5kUmVzcG9uc2USMgoGdGVuYW50GAEgASgLMiIuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFUZW5hbnRWaWV3YgZwcm90bzM", [v, ga, ce, ha]), Zo = /* @__PURE__ */ R("Ch5kZXZraXQvdjEvZGV2a2l0X3NlcnZpY2UucHJvdG8SCWRldmtpdC52MTKBLwoNRGV2a2l0U2VydmljZRJhCg9TZWN0aW9uTGlzdElucHQSIS5kZXZraXQudjEuU2VjdGlvbkxpc3RJbnB0UmVxdWVzdBoiLmRldmtpdC52MS5TZWN0aW9uTGlzdElucHRSZXNwb25zZSIHkAIBkLUYARJwChRQYXJ0aWFsVHlwZUxpc3RJbnB1dBImLmRldmtpdC52MS5QYXJ0aWFsVHlwZUxpc3RJbnB1dFJlcXVlc3QaJy5kZXZraXQudjEuUGFydGlhbFR5cGVMaXN0SW5wdXRSZXNwb25zZSIHkAIBkLUYARJwChRQYXJ0aWFsRmluZEZvclVwZGF0ZRImLmRldmtpdC52MS5QYXJ0aWFsRmluZEZvclVwZGF0ZVJlcXVlc3QaJy5kZXZraXQudjEuUGFydGlhbEZpbmRGb3JVcGRhdGVSZXNwb25zZSIHkAIBkLUYARJnChFQYWdlRmluZEZvclVwZGF0ZRIjLmRldmtpdC52MS5QYWdlRmluZEZvclVwZGF0ZVJlcXVlc3QaJC5kZXZraXQudjEuUGFnZUZpbmRGb3JVcGRhdGVSZXNwb25zZSIHkAIBkLUYARJbCg1DaXR5TGlzdElucHV0Eh8uZGV2a2l0LnYxLkNpdHlMaXN0SW5wdXRSZXF1ZXN0GiAuZGV2a2l0LnYxLkNpdHlMaXN0SW5wdXRSZXNwb25zZSIHkAIBiLUYARJICghDaXR5TGlzdBIaLmRldmtpdC52MS5DaXR5TGlzdFJlcXVlc3QaGy5kZXZraXQudjEuQ2l0eUxpc3RSZXNwb25zZSIDkAIBEmcKEUxvY2F0aW9uTGlzdElucHV0EiMuZGV2a2l0LnYxLkxvY2F0aW9uTGlzdElucHV0UmVxdWVzdBokLmRldmtpdC52MS5Mb2NhdGlvbkxpc3RJbnB1dFJlc3BvbnNlIgeQAgGItRgBElQKDExvY2F0aW9uTGlzdBIeLmRldmtpdC52MS5Mb2NhdGlvbkxpc3RSZXF1ZXN0Gh8uZGV2a2l0LnYxLkxvY2F0aW9uTGlzdFJlc3BvbnNlIgOQAgESZgoTVGVuYW50RGVsZXRlUmVzdG9yZRIlLmRldmtpdC52MS5UZW5hbnREZWxldGVSZXN0b3JlUmVxdWVzdBomLmRldmtpdC52MS5UZW5hbnREZWxldGVSZXN0b3JlUmVzcG9uc2UiABJSCgpUZW5hbnRGaW5kEhwuZGV2a2l0LnYxLlRlbmFudEZpbmRSZXF1ZXN0Gh0uZGV2a2l0LnYxLlRlbmFudEZpbmRSZXNwb25zZSIHkAIBiLUYARJOCgpUZW5hbnRMaXN0EhwuZGV2a2l0LnYxLlRlbmFudExpc3RSZXF1ZXN0Gh0uZGV2a2l0LnYxLlRlbmFudExpc3RSZXNwb25zZSIDkAIBEmMKElRlbmFudENyZWF0ZVVwZGF0ZRIkLmRldmtpdC52MS5UZW5hbnRDcmVhdGVVcGRhdGVSZXF1ZXN0GiUuZGV2a2l0LnYxLlRlbmFudENyZWF0ZVVwZGF0ZVJlc3BvbnNlIgASbAoUU2V0dGluZ0ZpbmRGb3JVcGRhdGUSJi5kZXZraXQudjEuU2V0dGluZ0ZpbmRGb3JVcGRhdGVSZXF1ZXN0GicuZGV2a2l0LnYxLlNldHRpbmdGaW5kRm9yVXBkYXRlUmVzcG9uc2UiA5ACARJUCg1TZXR0aW5nVXBkYXRlEh8uZGV2a2l0LnYxLlNldHRpbmdVcGRhdGVSZXF1ZXN0GiAuZGV2a2l0LnYxLlNldHRpbmdVcGRhdGVSZXNwb25zZSIAEkwKCEljb25MaXN0EhouZGV2a2l0LnYxLkljb25MaXN0UmVxdWVzdBobLmRldmtpdC52MS5JY29uTGlzdFJlc3BvbnNlIgeQAgGItRgBEkwKCEljb25GaW5kEhouZGV2a2l0LnYxLkljb25GaW5kUmVxdWVzdBobLmRldmtpdC52MS5JY29uRmluZFJlc3BvbnNlIgeQAgGItRgBEmkKFEljb25DcmVhdGVVcGRhdGVCdWxrEiYuZGV2a2l0LnYxLkljb25DcmVhdGVVcGRhdGVCdWxrUmVxdWVzdBonLmRldmtpdC52MS5JY29uQ3JlYXRlVXBkYXRlQnVsa1Jlc3BvbnNlIgASUgoKQnVja2V0TGlzdBIcLmRldmtpdC52MS5CdWNrZXRMaXN0UmVxdWVzdBodLmRldmtpdC52MS5CdWNrZXRMaXN0UmVzcG9uc2UiB5ACAYi1GAESYwoSQnVja2V0Q3JlYXRlVXBkYXRlEiQuZGV2a2l0LnYxLkJ1Y2tldENyZWF0ZVVwZGF0ZVJlcXVlc3QaJS5kZXZraXQudjEuQnVja2V0Q3JlYXRlVXBkYXRlUmVzcG9uc2UiABJkCghGaWxlTGlzdBIaLmRldmtpdC52MS5GaWxlTGlzdFJlcXVlc3QaGy5kZXZraXQudjEuRmlsZUxpc3RSZXNwb25zZSIfkAIBiLUYAZq1GAZvYmplY3Saph0KT2JqZWN0TGlzdBJtCgtHYWxsZXJ5TGlzdBIdLmRldmtpdC52MS5HYWxsZXJ5TGlzdFJlcXVlc3QaHi5kZXZraXQudjEuR2FsbGVyeUxpc3RSZXNwb25zZSIfkAIBiLUYAZq1GAZvYmplY3Saph0KT2JqZWN0TGlzdBJpCgpGaWxlQ3JlYXRlEhwuZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXF1ZXN0Gh0uZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXNwb25zZSIekLUYAZq1GAZvYmplY3Saph0MT2JqZWN0Q3JlYXRlEm8KDkZpbGVDcmVhdGVCdWxrEiAuZGV2a2l0LnYxLkZpbGVDcmVhdGVCdWxrUmVxdWVzdBohLmRldmtpdC52MS5GaWxlQ3JlYXRlQnVsa1Jlc3BvbnNlIhiatRgGb2JqZWN0mqYdCk9iamVjdExpc3QSZQoKRmlsZURlbGV0ZRIcLmRldmtpdC52MS5GaWxlRGVsZXRlUmVxdWVzdBodLmRldmtpdC52MS5GaWxlRGVsZXRlUmVzcG9uc2UiGpq1GAZvYmplY3Saph0MT2JqZWN0RGVsZXRlEn0KEkZpbGVEZWxldGVCeUJ1Y2tldBIkLmRldmtpdC52MS5GaWxlRGVsZXRlQnlCdWNrZXRSZXF1ZXN0GiUuZGV2a2l0LnYxLkZpbGVEZWxldGVCeUJ1Y2tldFJlc3BvbnNlIhqatRgGb2JqZWN0mqYdDE9iamVjdERlbGV0ZRJOCgtJbXBvcnRUYWJsZRIdLmRldmtpdC52MS5JbXBvcnRUYWJsZVJlcXVlc3QaHi5kZXZraXQudjEuSW1wb3J0VGFibGVSZXNwb25zZSIAEkgKCUVtYWlsU2VuZBIbLmRldmtpdC52MS5FbWFpbFNlbmRSZXF1ZXN0GhwuZGV2a2l0LnYxLkVtYWlsU2VuZFJlc3BvbnNlIgASYQoPVHJhbnNsYXRpb25MaXN0EiEuZGV2a2l0LnYxLlRyYW5zbGF0aW9uTGlzdFJlcXVlc3QaIi5kZXZraXQudjEuVHJhbnNsYXRpb25MaXN0UmVzcG9uc2UiB5ACAYi1GAEScwoVVHJhbnNsYXRpb25GaW5kTG9jYWxlEicuZGV2a2l0LnYxLlRyYW5zbGF0aW9uRmluZExvY2FsZVJlcXVlc3QaKC5kZXZraXQudjEuVHJhbnNsYXRpb25GaW5kTG9jYWxlUmVzcG9uc2UiB5ACAYi1GAESfgobVHJhbnNsYXRpb25DcmVhdGVVcGRhdGVCdWxrEi0uZGV2a2l0LnYxLlRyYW5zbGF0aW9uQ3JlYXRlVXBkYXRlQnVsa1JlcXVlc3QaLi5kZXZraXQudjEuVHJhbnNsYXRpb25DcmVhdGVVcGRhdGVCdWxrUmVzcG9uc2UiABJgChFUcmFuc2xhdGlvbkRlbGV0ZRIjLmRldmtpdC52MS5UcmFuc2xhdGlvbkRlbGV0ZVJlcXVlc3QaJC5kZXZraXQudjEuVHJhbnNsYXRpb25EZWxldGVSZXNwb25zZSIAEkgKCFJvbGVMaXN0EhouZGV2a2l0LnYxLlJvbGVMaXN0UmVxdWVzdBobLmRldmtpdC52MS5Sb2xlTGlzdFJlc3BvbnNlIgOQAgESWwoNUm9sZUxpc3RJbnB1dBIfLmRldmtpdC52MS5Sb2xlTGlzdElucHV0UmVxdWVzdBogLmRldmtpdC52MS5Sb2xlTGlzdElucHV0UmVzcG9uc2UiB5ACAZC1GAESZwoRUm9sZUZpbmRGb3JVcGRhdGUSIy5kZXZraXQudjEuUm9sZUZpbmRGb3JVcGRhdGVSZXF1ZXN0GiQuZGV2a2l0LnYxLlJvbGVGaW5kRm9yVXBkYXRlUmVzcG9uc2UiB5ACAZC1GAESXQoQUm9sZUNyZWF0ZVVwZGF0ZRIiLmRldmtpdC52MS5Sb2xlQ3JlYXRlVXBkYXRlUmVxdWVzdBojLmRldmtpdC52MS5Sb2xlQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJgChFSb2xlRGVsZXRlUmVzdG9yZRIjLmRldmtpdC52MS5Sb2xlRGVsZXRlUmVzdG9yZVJlcXVlc3QaJC5kZXZraXQudjEuUm9sZURlbGV0ZVJlc3RvcmVSZXNwb25zZSIAEksKClJvbGVEZWxldGUSHC5kZXZraXQudjEuUm9sZURlbGV0ZVJlcXVlc3QaHS5kZXZraXQudjEuUm9sZURlbGV0ZVJlc3BvbnNlIgASSAoIVXNlckxpc3QSGi5kZXZraXQudjEuVXNlckxpc3RSZXF1ZXN0GhsuZGV2a2l0LnYxLlVzZXJMaXN0UmVzcG9uc2UiA5ACARJbCg1Vc2VyTGlzdElucHV0Eh8uZGV2a2l0LnYxLlVzZXJMaXN0SW5wdXRSZXF1ZXN0GiAuZGV2a2l0LnYxLlVzZXJMaXN0SW5wdXRSZXNwb25zZSIHkAIBkLUYARJnChFVc2VyVHlwZUxpc3RJbnB1dBIjLmRldmtpdC52MS5Vc2VyVHlwZUxpc3RJbnB1dFJlcXVlc3QaJC5kZXZraXQudjEuVXNlclR5cGVMaXN0SW5wdXRSZXNwb25zZSIHkAIBkLUYARJnChFVc2VyRmluZEZvclVwZGF0ZRIjLmRldmtpdC52MS5Vc2VyRmluZEZvclVwZGF0ZVJlcXVlc3QaJC5kZXZraXQudjEuVXNlckZpbmRGb3JVcGRhdGVSZXNwb25zZSIHkAIBkLUYARJdChBVc2VyQ3JlYXRlVXBkYXRlEiIuZGV2a2l0LnYxLlVzZXJDcmVhdGVVcGRhdGVSZXF1ZXN0GiMuZGV2a2l0LnYxLlVzZXJDcmVhdGVVcGRhdGVSZXNwb25zZSIAEmAKEVVzZXJEZWxldGVSZXN0b3JlEiMuZGV2a2l0LnYxLlVzZXJEZWxldGVSZXN0b3JlUmVxdWVzdBokLmRldmtpdC52MS5Vc2VyRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASSwoKVXNlckRlbGV0ZRIcLmRldmtpdC52MS5Vc2VyRGVsZXRlUmVxdWVzdBodLmRldmtpdC52MS5Vc2VyRGVsZXRlUmVzcG9uc2UiABJMCglBdXRoTG9naW4SGy5kZXZraXQudjEuQXV0aExvZ2luUmVxdWVzdBocLmRldmtpdC52MS5BdXRoTG9naW5SZXNwb25zZSIEiLUYARJVCgxBdXRoUmVnaXN0ZXISHi5kZXZraXQudjEuQXV0aFJlZ2lzdGVyUmVxdWVzdBofLmRldmtpdC52MS5BdXRoUmVnaXN0ZXJSZXNwb25zZSIEiLUYARJLCgpBdXRoSW52aXRlEhwuZGV2a2l0LnYxLkF1dGhJbnZpdGVSZXF1ZXN0Gh0uZGV2a2l0LnYxLkF1dGhJbnZpdGVSZXNwb25zZSIAElsKDUF1dGhBdXRob3JpemUSHy5kZXZraXQudjEuQXV0aEF1dGhvcml6ZVJlcXVlc3QaIC5kZXZraXQudjEuQXV0aEF1dGhvcml6ZVJlc3BvbnNlIgeQAgGQtRgBEmQKEUF1dGhMb2dpblByb3ZpZGVyEiMuZGV2a2l0LnYxLkF1dGhMb2dpblByb3ZpZGVyUmVxdWVzdBokLmRldmtpdC52MS5BdXRoTG9naW5Qcm92aWRlclJlc3BvbnNlIgSItRgBEnwKGUF1dGhMb2dpblByb3ZpZGVyQ2FsbGJhY2sSKy5kZXZraXQudjEuQXV0aExvZ2luUHJvdmlkZXJDYWxsYmFja1JlcXVlc3QaLC5kZXZraXQudjEuQXV0aExvZ2luUHJvdmlkZXJDYWxsYmFja1Jlc3BvbnNlIgSItRgBEnMKFkF1dGhSZXNldFBhc3N3b3JkRW1haWwSKC5kZXZraXQudjEuQXV0aFJlc2V0UGFzc3dvcmRFbWFpbFJlcXVlc3QaKS5kZXZraXQudjEuQXV0aFJlc2V0UGFzc3dvcmRFbWFpbFJlc3BvbnNlIgSItRgBEmQKEUF1dGhSZXNldFBhc3N3b3JkEiMuZGV2a2l0LnYxLkF1dGhSZXNldFBhc3N3b3JkUmVxdWVzdBokLmRldmtpdC52MS5BdXRoUmVzZXRQYXNzd29yZFJlc3BvbnNlIgSItRgBEmkKFFBhcnRpYWxEZWxldGVSZXN0b3JlEiYuZGV2a2l0LnYxLlBhcnRpYWxEZWxldGVSZXN0b3JlUmVxdWVzdBonLmRldmtpdC52MS5QYXJ0aWFsRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASZgoTUGFydGlhbENyZWF0ZVVwZGF0ZRIlLmRldmtpdC52MS5QYXJ0aWFsQ3JlYXRlVXBkYXRlUmVxdWVzdBomLmRldmtpdC52MS5QYXJ0aWFsQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJRCgtQYXJ0aWFsTGlzdBIdLmRldmtpdC52MS5QYXJ0aWFsTGlzdFJlcXVlc3QaHi5kZXZraXQudjEuUGFydGlhbExpc3RSZXNwb25zZSIDkAIBEmAKEVBhZ2VEZWxldGVSZXN0b3JlEiMuZGV2a2l0LnYxLlBhZ2VEZWxldGVSZXN0b3JlUmVxdWVzdBokLmRldmtpdC52MS5QYWdlRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASXQoQUGFnZUNyZWF0ZVVwZGF0ZRIiLmRldmtpdC52MS5QYWdlQ3JlYXRlVXBkYXRlUmVxdWVzdBojLmRldmtpdC52MS5QYWdlQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJICghQYWdlTGlzdBIaLmRldmtpdC52MS5QYWdlTGlzdFJlcXVlc3QaGy5kZXZraXQudjEuUGFnZUxpc3RSZXNwb25zZSIDkAIBEmkKFFNlY3Rpb25EZWxldGVSZXN0b3JlEiYuZGV2a2l0LnYxLlNlY3Rpb25EZWxldGVSZXN0b3JlUmVxdWVzdBonLmRldmtpdC52MS5TZWN0aW9uRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASZgoTU2VjdGlvbkNyZWF0ZVVwZGF0ZRIlLmRldmtpdC52MS5TZWN0aW9uQ3JlYXRlVXBkYXRlUmVxdWVzdBomLmRldmtpdC52MS5TZWN0aW9uQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJRCgtTZWN0aW9uTGlzdBIdLmRldmtpdC52MS5TZWN0aW9uTGlzdFJlcXVlc3QaHi5kZXZraXQudjEuU2VjdGlvbkxpc3RSZXNwb25zZSIDkAIBEnAKFFNlY3Rpb25GaW5kRm9yVXBkYXRlEiYuZGV2a2l0LnYxLlNlY3Rpb25GaW5kRm9yVXBkYXRlUmVxdWVzdBonLmRldmtpdC52MS5TZWN0aW9uRmluZEZvclVwZGF0ZVJlc3BvbnNlIgeQAgGQtRgBYgZwcm90bzM", [oo, io, ma, ro, uo, go, mo, bo, ba, Io, Go, ha, Ia, Ga, ho]), yo = /* @__PURE__ */ ws(Zo, 0), po = (e) => async (n) => {
  try {
    const t = localStorage.getItem("token");
    return n.header.append("Authorization", `bearer ${t}`), await e(n);
  } catch (t) {
    const l = {
      globalErrors: [],
      fieldErrors: {}
    };
    if (t.code == X.AlreadyExists)
      throw l.fieldErrors[t.rawMessage] = `${t.rawMessage}Unique`, new Error(JSON.stringify(l));
    console.log("rowmessageis", t.rawMessage), l.globalErrors = [`${t.rawMessage}`];
    const a = JSON.stringify(l), c = new Error(a);
    throw console.log("rowmessageis", c), c;
  }
}, fo = so({
  baseUrl: "http://localhost:9090",
  interceptors: [po],
  useHttpGet: !0
}), Vo = Es(yo, fo), wo = (e) => {
  if (e.props && e.props.type == "form") {
    const { id: n, attrs: t } = e.props, { findHandler: l, syncWithUrl: a, usePresist: c } = t;
    console.log("asdsyncWithUrl", a);
    const d = (m) => {
      const h = fn();
      if (!m) return;
      const u = {}, I = m.requestValue ? m.requestValue : h.params[m.routerParamName || "id"];
      u[m.requestPropertyName] = I, j(m.endpoint, Vo, u).then((b) => {
        if (m.responsePropertyName && m.responsePropertyName in b) {
          const Z = b[m.responsePropertyName];
          if (typeof Z == "object" && Z) {
            e.input(Z);
            return;
          }
        }
        e.input(b);
      }).catch((b) => {
        console.error("find handler failed", b);
      });
    }, s = (m) => {
      if (console.log("initial", m), m != null)
        try {
          return JSON.parse(m);
        } catch (h) {
          $t(n), localStorage.removeItem(n), console.log("error parsing url", h);
        }
    }, o = () => {
      if (!c) return;
      const m = localStorage.getItem(n);
      return m ? s(m) : {};
    }, i = () => {
      if (!a) return;
      const m = _t(n);
      return m ? s(m) : {};
    }, g = () => {
      if (console.log("default fetcher"), !a && !c)
        return;
      if (c) {
        const h = o();
        if (h && Le(h).length > 0) {
          e.input(h);
          return;
        }
      }
      console.log("default fetcher", e.props);
      const m = i();
      m && Le(m).length > 0 && e.input(m);
    };
    if (l) {
      d(l);
      return;
    }
    g(), console.log("node is node", e.props.attrs.findHandler);
  }
};
export {
  Do as Datepicker,
  Ko as DependencyManagerPlugin,
  Ho as Dropdown,
  No as FormBase,
  wo as FormDataGetter,
  To as InputDatepicker,
  xo as LoginForm,
  Mo as OptionsGetterPlugin,
  zo as Upload,
  Ba as default,
  Uo as useAppFormStore,
  Wa as useAppFormStoreWithKey,
  Qo as useAppFormStoreWithProps
};
