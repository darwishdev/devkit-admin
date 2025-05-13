import { d as Sa, R as tn, e as rn, f as Ya, s as Fa, o as Tt, g as ka, h as wa } from "./Datalist.vue_vue_type_script_setup_true_lang-C-vgaYwt.mjs";
import { i as qs, j as ed } from "./Datalist.vue_vue_type_script_setup_true_lang-C-vgaYwt.mjs";
import { shallowReactive as Ea, defineComponent as Se, inject as ae, resolveComponent as O, withAsyncContext as Na, ref as se, openBlock as V, createBlock as w, resolveDynamicComponent as ue, h as Z, onMounted as za, createElementBlock as N, Fragment as Ke, createElementVNode as M, toDisplayString as ne, unref as oe, withCtx as K, createTextVNode as Xe, createCommentVNode as D, createVNode as L, mergeProps as W, renderSlot as ee, renderList as gt, normalizeClass as ge, withKeys as Pt, normalizeProps as nn, Suspense as Ha, guardReactiveProps as va } from "vue";
import { d as Me, s as Ka, B as an, a as Zt, b as Ma, r as jt, c as ln, e as La, f as un, R as Ua, g as Qa, _ as _a } from "./devkit_admin-C6eEBSUD.mjs";
import { h as rd } from "./devkit_admin-C6eEBSUD.mjs";
import { useToast as Da, SelectButton as Ta, MultiSelect as Pa } from "primevue";
import { useRoute as Vt, useRouter as ja } from "vue-router";
import { AppBtn as H, AppImage as on, AppIcon as Oa } from "devkit-base-components";
import { useQueryClient as $a, useMutation as qa } from "@tanstack/vue-query";
import { resolveApiEndpoint as P, ObjectKeys as Le } from "devkit-apiclient";
import "pinia";
import { createInput as nt, defaultConfig as el } from "@formkit/vue";
import { _ as tl } from "./FileManager.vue_vue_type_script_setup_true_lang-BRaF1BFM.mjs";
function rl(e, t) {
  const n = Ea(/* @__PURE__ */ new Map()), a = (...g) => JSON.stringify(g), l = (g, ...b) => (n.set(g, e(...b)), n.get(g)), u = (...g) => l(a(...g), ...g), o = (...g) => {
    n.delete(a(...g));
  }, s = () => {
    n.clear();
  }, d = (...g) => {
    const b = a(...g);
    return n.has(b) ? n.get(b) : l(b, ...g);
  };
  return d.load = u, d.delete = o, d.clear = s, d.generateKey = a, d.cache = n, d;
}
const Ts = /* @__PURE__ */ Se({
  __name: "FormBase",
  props: {
    context: {}
  },
  async setup(e) {
    let t, r;
    const n = ae("dialogRef"), a = O("FormKitSchema"), l = $a(), u = O("FormKit"), o = ae("apiClient"), s = Da(), d = e, { submitHandler: g, options: b, formKey: h, findHandler: c, invalidateCaches: p } = d.context, m = Sa(h), y = Vt(), F = (I) => {
      if (I != null)
        try {
          return JSON.parse(I);
        } catch (C) {
          rn(h), localStorage.removeItem(h), console.log("error parsing url", C);
        }
    }, A = () => {
      if (!d.context.useReset) return;
      const I = localStorage.getItem(h);
      return I ? F(I) : {};
    }, z = () => {
      if (!d.context.syncWithUrl) return;
      const I = tn(h);
      return I ? F(I) : {};
    }, E = () => {
      if (!d.context.syncWithUrl && !d.context.usePresist)
        return;
      if (d.context.usePresist) {
        const C = A();
        if (C && Le(C).length > 0)
          return m.formValueRef = C, C;
      }
      const I = z();
      if (I && Le(I).length > 0)
        return m.formValueRef = I, I;
    }, me = () => new Promise((I) => {
      if (!c)
        return I(null);
      const C = {}, S = c.requestValue ? c.requestValue : y.params[c.routerParamName || "id"];
      C[c.requestPropertyName] = S, P(c.endpoint, o, C).then((Y) => {
        if (c.responsePropertyName && c.responsePropertyName in Y) {
          const _ = Y[c.responsePropertyName];
          if (typeof _ == "object" && _)
            return I(_);
        }
        return I(Y);
      }).catch((Y) => {
        console.error("find handler failed", Y), I(null);
      });
    }), pe = ([t, r] = Na(() => me()), t = await t, r(), t), G = qa({
      mutationFn: (I) => new Promise((C, S) => {
        if (typeof g.endpoint == "string" && !o) {
          S("apiclient is not provided");
          return;
        }
        P(g.endpoint, o, I).then((Y) => {
          C(Y);
        }).catch((Y) => {
          S(Y);
        });
      }),
      onSuccess: () => {
        g.redirectRoute && Dt(g.redirectRoute), p && (Me.dropdownHelper.bulkDelete(p), l.invalidateQueries({
          queryKey: d.context.invalidateCaches
        }));
      }
    }), $ = (I) => typeof I == "object" && Array.isArray(I.inputs) && !Array.isArray(I), tt = () => {
      const I = [], { sections: C } = d.context;
      for (let S in C) {
        const Y = C[S];
        let _ = "form-section";
        const q = !$(Y), rt = {
          $el: "div",
          attrs: {
            class: q ? _ : `${_} ${Y.isTransparent ? " glass" : ""}`
          },
          children: q ? Y : Y.inputs
        };
        I.push(rt);
      }
      return I;
    }, Aa = se(!1), { push: Dt } = ja();
    function Xa(I) {
      const C = {}, S = /-\s(\w+):\s(.+?)\s\[/g;
      let Y;
      for (; (Y = S.exec(I)) !== null; ) {
        const [, _, q] = Y;
        C[_] = q;
      }
      return C;
    }
    const Ca = (I, C) => {
      console.log("error is here from handlerRrorrr methoed", C.message);
      try {
        const S = JSON.parse(C.rawMessage);
        I.setErrors(S.globalErrors, S.fieldErrors), console.log(S);
      } catch {
        console.log(C, "error from catch", Xa(C)), I.setErrors([C.message]);
      }
    }, Wa = (I, C) => {
      m.formValueRef = I, d.context.syncWithUrl && m.debouncedRouteQueryAppend();
      const S = d.context.submitHandler, Y = S.mapFunction ? S.mapFunction(I) : I;
      return new Promise((_) => {
        G.mutateAsync(Y).then((q) => {
          const rt = "api_success_summary", xa = "api_success_detail";
          if (d.context.resetOnSuccess && C.reset(), b && !b.isSuccessNotificationHidden) {
            const Ra = b.successMessageSummary ?? rt, Ja = b.successMessageDetail ?? xa;
            s.add({ severity: "success", summary: Ra, detail: Ja, life: 3e3 });
          }
          g.callback && g.callback(q), Aa.value || S.redirectRoute && typeof S.redirectRoute == "string" && Dt({ name: S.redirectRoute }), n && n.value.close(), _(null);
        }).catch((q) => {
          console.log("error from the sbmithandler", q), Ca(C, q), _(null);
        });
      });
    }, Ba = () => Z(
      u,
      {
        type: "form",
        id: d.context.formKey,
        onInput: d.context.invalidateCachesOnChage ? () => {
          l.invalidateQueries({ queryKey: d.context.invalidateCachesOnChage }), console.log("form updated");
        } : void 0,
        actions: !1,
        value: pe || E(),
        onSubmit: Wa
      },
      {
        default: () => [
          Z(a, {
            id: d.context.formKey,
            schema: {
              $el: "div",
              attrs: {
                class: "schema-wrapper"
              },
              children: tt()
            }
          }),
          Z("div", { class: "custom-form-actions" }, d.context.submitHandler.hideActions ? void 0 : [
            Z(H, { type: "submit", label: "submit", icon: "send" }),
            d.context.useClear ? Z(H, { action: m.clearForm, label: "clear" }) : void 0,
            d.context.useReset ? Z(H, { action: m.resetForm, label: "reset" }) : void 0,
            d.context.usePresist ? Z(H, { action: m.presistForm, label: "presist" }) : void 0
          ])
        ]
      }
    );
    return (I, C) => (V(), w(ue(Ba())));
  }
}), Ps = /* @__PURE__ */ Se({
  __name: "LoginForm",
  setup(e) {
    const t = ae("authHandler"), r = ae("apiClient"), n = (o, s) => {
      if (!["createdAt", "updatedAt", "deletedAt"].includes(o))
        return typeof s == "bigint" ? s.toString() : s;
    }, a = (o) => {
      o.navigationBar && localStorage.setItem("sidebar", JSON.stringify(o.navigationBar)), o.loginInfo && localStorage.setItem("token", o.loginInfo.accessToken), o.user && localStorage.setItem(
        "user_info",
        JSON.stringify(o.user, n)
      );
    }, l = {
      context: {
        title: "login",
        formKey: "login",
        options: {
          successMessageSummary: "logged in"
        },
        submitHandler: {
          endpoint: t ? t.login : "",
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
    Vt(), za(() => {
      if (!t) return;
      const o = window.location.hash.substring(1), d = new URLSearchParams(o).get("access_token");
      d && t.providerLoginCallback && P(t.providerLoginCallback, r, {
        accessToken: d
      }).then(a), console.log("routequery is", d), console.log("mounted changed");
    });
    const u = async (o) => {
      if (!(t != null && t.providerLogin)) return;
      const s = {
        provider: o,
        redirectUrl: "http://localhost:5173/provider-login"
      }, { url: d } = await P(
        t.providerLogin,
        r,
        s
      );
      window.open(d, "_blank"), console.log("url is ", d);
    };
    return (o, s) => {
      const d = O("Message");
      return V(), N(Ke, null, [
        M("h2", null, "hello authHandler " + ne(oe(t)), 1),
        oe(t) ? D("", !0) : (V(), w(d, {
          key: 0,
          severity: "error"
        }, {
          default: K(() => [
            Xe(ne(o.$t("provide auth handler")), 1)
          ]),
          _: 1
        })),
        L(oe(Ya), {
          context: l.context
        }, null, 8, ["context"]),
        L(oe(H), {
          icon: "google",
          label: "login by google",
          action: () => u("google")
        }, null, 8, ["action"])
      ], 64);
    };
  }
});
var sn = {
  name: "UploadIcon",
  extends: Ka
};
function nl(e, t, r, n, a, l) {
  return V(), N("svg", W({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, e.pti()), t[0] || (t[0] = [M("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M6.58942 9.82197C6.70165 9.93405 6.85328 9.99793 7.012 10C7.17071 9.99793 7.32234 9.93405 7.43458 9.82197C7.54681 9.7099 7.61079 9.55849 7.61286 9.4V2.04798L9.79204 4.22402C9.84752 4.28011 9.91365 4.32457 9.98657 4.35479C10.0595 4.38502 10.1377 4.40039 10.2167 4.40002C10.2956 4.40039 10.3738 4.38502 10.4467 4.35479C10.5197 4.32457 10.5858 4.28011 10.6413 4.22402C10.7538 4.11152 10.817 3.95902 10.817 3.80002C10.817 3.64102 10.7538 3.48852 10.6413 3.37602L7.45127 0.190618C7.44656 0.185584 7.44176 0.180622 7.43687 0.175736C7.32419 0.063214 7.17136 0 7.012 0C6.85264 0 6.69981 0.063214 6.58712 0.175736C6.58181 0.181045 6.5766 0.186443 6.5715 0.191927L3.38282 3.37602C3.27669 3.48976 3.2189 3.6402 3.22165 3.79564C3.2244 3.95108 3.28746 4.09939 3.39755 4.20932C3.50764 4.31925 3.65616 4.38222 3.81182 4.38496C3.96749 4.3877 4.11814 4.33001 4.23204 4.22402L6.41113 2.04807V9.4C6.41321 9.55849 6.47718 9.7099 6.58942 9.82197ZM11.9952 14H2.02883C1.751 13.9887 1.47813 13.9228 1.22584 13.8061C0.973545 13.6894 0.746779 13.5241 0.558517 13.3197C0.370254 13.1154 0.22419 12.876 0.128681 12.6152C0.0331723 12.3545 -0.00990605 12.0775 0.0019109 11.8V9.40005C0.0019109 9.24092 0.065216 9.08831 0.1779 8.97579C0.290584 8.86326 0.443416 8.80005 0.602775 8.80005C0.762134 8.80005 0.914966 8.86326 1.02765 8.97579C1.14033 9.08831 1.20364 9.24092 1.20364 9.40005V11.8C1.18295 12.0376 1.25463 12.274 1.40379 12.4602C1.55296 12.6463 1.76817 12.7681 2.00479 12.8H11.9952C12.2318 12.7681 12.447 12.6463 12.5962 12.4602C12.7453 12.274 12.817 12.0376 12.7963 11.8V9.40005C12.7963 9.24092 12.8596 9.08831 12.9723 8.97579C13.085 8.86326 13.2378 8.80005 13.3972 8.80005C13.5565 8.80005 13.7094 8.86326 13.8221 8.97579C13.9347 9.08831 13.998 9.24092 13.998 9.40005V11.8C14.022 12.3563 13.8251 12.8996 13.45 13.3116C13.0749 13.7236 12.552 13.971 11.9952 14Z",
    fill: "currentColor"
  }, null, -1)]), 16);
}
sn.render = nl;
var al = function(t) {
  var r = t.dt;
  return `
.p-progressbar {
    position: relative;
    overflow: hidden;
    height: `.concat(r("progressbar.height"), `;
    background: `).concat(r("progressbar.background"), `;
    border-radius: `).concat(r("progressbar.border.radius"), `;
}

.p-progressbar-value {
    margin: 0;
    background: `).concat(r("progressbar.value.background"), `;
}

.p-progressbar-label {
    color: `).concat(r("progressbar.label.color"), `;
    font-size: `).concat(r("progressbar.label.font.size"), `;
    font-weight: `).concat(r("progressbar.label.font.weight"), `;
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
}, ll = {
  root: function(t) {
    var r = t.instance;
    return ["p-progressbar p-component", {
      "p-progressbar-determinate": r.determinate,
      "p-progressbar-indeterminate": r.indeterminate
    }];
  },
  value: "p-progressbar-value",
  label: "p-progressbar-label"
}, ul = an.extend({
  name: "progressbar",
  theme: al,
  classes: ll
}), ol = {
  name: "BaseProgressBar",
  extends: Zt,
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
  style: ul,
  provide: function() {
    return {
      $pcProgressBar: this,
      $parentInstance: this
    };
  }
}, dn = {
  name: "ProgressBar",
  extends: ol,
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
}, sl = ["aria-valuenow"];
function dl(e, t, r, n, a, l) {
  return V(), N("div", W({
    role: "progressbar",
    class: e.cx("root"),
    "aria-valuemin": "0",
    "aria-valuenow": e.value,
    "aria-valuemax": "100"
  }, e.ptmi("root")), [l.determinate ? (V(), N("div", W({
    key: 0,
    class: e.cx("value"),
    style: l.progressStyle
  }, e.ptm("value")), [e.value != null && e.value !== 0 && e.showValue ? (V(), N("div", W({
    key: 0,
    class: e.cx("label")
  }, e.ptm("label")), [ee(e.$slots, "default", {}, function() {
    return [Xe(ne(e.value + "%"), 1)];
  })], 16)) : D("", !0)], 16)) : l.indeterminate ? (V(), N("div", W({
    key: 1,
    class: e.cx("value")
  }, e.ptm("value")), null, 16)) : D("", !0)], 16, sl);
}
dn.render = dl;
var il = function(t) {
  var r = t.dt;
  return `
.p-fileupload input[type="file"] {
    display: none;
}

.p-fileupload-advanced {
    border: 1px solid `.concat(r("fileupload.border.color"), `;
    border-radius: `).concat(r("fileupload.border.radius"), `;
    background: `).concat(r("fileupload.background"), `;
    color: `).concat(r("fileupload.color"), `;
}

.p-fileupload-header {
    display: flex;
    align-items: center;
    padding: `).concat(r("fileupload.header.padding"), `;
    background: `).concat(r("fileupload.header.background"), `;
    color: `).concat(r("fileupload.header.color"), `;
    border-style: solid;
    border-width: `).concat(r("fileupload.header.border.width"), `;
    border-color: `).concat(r("fileupload.header.border.color"), `;
    border-radius: `).concat(r("fileupload.header.border.radius"), `;
    gap: `).concat(r("fileupload.header.gap"), `;
}

.p-fileupload-content {
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    gap: `).concat(r("fileupload.content.gap"), `;
    transition: border-color `).concat(r("fileupload.transition.duration"), `;
    padding: `).concat(r("fileupload.content.padding"), `;
}

.p-fileupload-content .p-progressbar {
    width: 100%;
    height: `).concat(r("fileupload.progressbar.height"), `;
}

.p-fileupload-file-list {
    display: flex;
    flex-direction: column;
    gap: `).concat(r("fileupload.filelist.gap"), `;
}

.p-fileupload-file {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: `).concat(r("fileupload.file.padding"), `;
    border-block-end: 1px solid `).concat(r("fileupload.file.border.color"), `;
    gap: `).concat(r("fileupload.file.gap"), `;
}

.p-fileupload-file:last-child {
    border-block-end: 0;
}

.p-fileupload-file-info {
    display: flex;
    flex-direction: column;
    gap: `).concat(r("fileupload.file.info.gap"), `;
}

.p-fileupload-file-thumbnail {
    flex-shrink: 0;
}

.p-fileupload-file-actions {
    margin-inline-start: auto;
}

.p-fileupload-highlight {
    border: 1px dashed `).concat(r("fileupload.content.highlight.border.color"), `;
}

.p-fileupload-basic {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: `).concat(r("fileupload.basic.gap"), `;
}
`);
}, cl = {
  root: function(t) {
    var r = t.props;
    return ["p-fileupload p-fileupload-".concat(r.mode, " p-component")];
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
}, gl = an.extend({
  name: "fileupload",
  theme: il,
  classes: cl
}), bl = {
  name: "BaseFileUpload",
  extends: Zt,
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
  style: gl,
  provide: function() {
    return {
      $pcFileUpload: this,
      $parentInstance: this
    };
  }
}, cn = {
  name: "FileContent",
  hostName: "FileUpload",
  extends: Zt,
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
    formatSize: function(t) {
      var r, n = 1024, a = 3, l = ((r = this.$primevue.config.locale) === null || r === void 0 ? void 0 : r.fileSizeTypes) || ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      if (t === 0)
        return "0 ".concat(l[0]);
      var u = Math.floor(Math.log(t) / Math.log(n)), o = parseFloat((t / Math.pow(n, u)).toFixed(a));
      return "".concat(o, " ").concat(l[u]);
    }
  },
  components: {
    Button: ln,
    Badge: Qa,
    TimesIcon: un
  }
}, ml = ["alt", "src", "width"];
function pl(e, t, r, n, a, l) {
  var u = O("Badge"), o = O("TimesIcon"), s = O("Button");
  return V(!0), N(Ke, null, gt(r.files, function(d, g) {
    return V(), N("div", W({
      key: d.name + d.type + d.size,
      class: e.cx("file"),
      ref_for: !0
    }, e.ptm("file")), [M("img", W({
      role: "presentation",
      class: e.cx("fileThumbnail"),
      alt: d.name,
      src: d.objectURL,
      width: r.previewWidth,
      ref_for: !0
    }, e.ptm("fileThumbnail")), null, 16, ml), M("div", W({
      class: e.cx("fileInfo"),
      ref_for: !0
    }, e.ptm("fileInfo")), [M("div", W({
      class: e.cx("fileName"),
      ref_for: !0
    }, e.ptm("fileName")), ne(d.name), 17), M("span", W({
      class: e.cx("fileSize"),
      ref_for: !0
    }, e.ptm("fileSize")), ne(l.formatSize(d.size)), 17)], 16), L(u, {
      value: r.badgeValue,
      class: ge(e.cx("pcFileBadge")),
      severity: r.badgeSeverity,
      unstyled: e.unstyled,
      pt: e.ptm("pcFileBadge")
    }, null, 8, ["value", "class", "severity", "unstyled", "pt"]), M("div", W({
      class: e.cx("fileActions"),
      ref_for: !0
    }, e.ptm("fileActions")), [L(s, {
      onClick: function(h) {
        return e.$emit("remove", g);
      },
      text: "",
      rounded: "",
      severity: "danger",
      class: ge(e.cx("pcFileRemoveButton")),
      unstyled: e.unstyled,
      pt: e.ptm("pcFileRemoveButton")
    }, {
      icon: K(function(b) {
        return [r.templates.fileremoveicon ? (V(), w(ue(r.templates.fileremoveicon), {
          key: 0,
          class: ge(b.class),
          file: d,
          index: g
        }, null, 8, ["class", "file", "index"])) : (V(), w(o, W({
          key: 1,
          class: b.class,
          "aria-hidden": "true",
          ref_for: !0
        }, e.ptm("pcFileRemoveButton").icon), null, 16, ["class"]))];
      }),
      _: 2
    }, 1032, ["onClick", "class", "unstyled", "pt"])], 16)], 16);
  }), 128);
}
cn.render = pl;
function at(e) {
  return yl(e) || hl(e) || gn(e) || fl();
}
function fl() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hl(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function yl(e) {
  if (Array.isArray(e)) return bt(e);
}
function we(e, t) {
  var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = gn(e)) || t) {
      r && (e = r);
      var n = 0, a = function() {
      };
      return { s: a, n: function() {
        return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
      }, e: function(d) {
        throw d;
      }, f: a };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var l, u = !0, o = !1;
  return { s: function() {
    r = r.call(e);
  }, n: function() {
    var d = r.next();
    return u = d.done, d;
  }, e: function(d) {
    o = !0, l = d;
  }, f: function() {
    try {
      u || r.return == null || r.return();
    } finally {
      if (o) throw l;
    }
  } };
}
function gn(e, t) {
  if (e) {
    if (typeof e == "string") return bt(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? bt(e, t) : void 0;
  }
}
function bt(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
var bn = {
  name: "FileUpload",
  extends: bl,
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
    onBasicUploaderClick: function(t) {
      t.button === 0 && this.$refs.fileInput.click();
    },
    onFileSelect: function(t) {
      if (t.type !== "drop" && this.isIE11() && this.duplicateIEEvent) {
        this.duplicateIEEvent = !1;
        return;
      }
      this.isBasic && this.hasFiles && (this.files = []), this.messages = [], this.files = this.files || [];
      var r = t.dataTransfer ? t.dataTransfer.files : t.target.files, n = we(r), a;
      try {
        for (n.s(); !(a = n.n()).done; ) {
          var l = a.value;
          !this.isFileSelected(l) && !this.isFileLimitExceeded() && this.validate(l) && (this.isImage(l) && (l.objectURL = window.URL.createObjectURL(l)), this.files.push(l));
        }
      } catch (u) {
        n.e(u);
      } finally {
        n.f();
      }
      this.$emit("select", {
        originalEvent: t,
        files: this.files
      }), this.fileLimit && this.checkFileLimit(), this.auto && this.hasFiles && !this.isFileLimitExceeded() && this.uploader(), t.type !== "drop" && this.isIE11() ? this.clearIEInput() : this.clearInputElement();
    },
    choose: function() {
      this.$refs.fileInput.click();
    },
    uploader: function() {
      var t = this;
      if (this.customUpload)
        this.fileLimit && (this.uploadedFileCount += this.files.length), this.$emit("uploader", {
          files: this.files
        }), this.clear();
      else {
        var r = new XMLHttpRequest(), n = new FormData();
        this.$emit("before-upload", {
          xhr: r,
          formData: n
        });
        var a = we(this.files), l;
        try {
          for (a.s(); !(l = a.n()).done; ) {
            var u = l.value;
            n.append(this.name, u, u.name);
          }
        } catch (o) {
          a.e(o);
        } finally {
          a.f();
        }
        r.upload.addEventListener("progress", function(o) {
          o.lengthComputable && (t.progress = Math.round(o.loaded * 100 / o.total)), t.$emit("progress", {
            originalEvent: o,
            progress: t.progress
          });
        }), r.onreadystatechange = function() {
          if (r.readyState === 4) {
            var o;
            t.progress = 0, r.status >= 200 && r.status < 300 ? (t.fileLimit && (t.uploadedFileCount += t.files.length), t.$emit("upload", {
              xhr: r,
              files: t.files
            })) : t.$emit("error", {
              xhr: r,
              files: t.files
            }), (o = t.uploadedFiles).push.apply(o, at(t.files)), t.clear();
          }
        }, r.open("POST", this.url, !0), this.$emit("before-send", {
          xhr: r,
          formData: n
        }), r.withCredentials = this.withCredentials, r.send(n);
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
    isFileSelected: function(t) {
      if (this.files && this.files.length) {
        var r = we(this.files), n;
        try {
          for (r.s(); !(n = r.n()).done; ) {
            var a = n.value;
            if (a.name + a.type + a.size === t.name + t.type + t.size) return !0;
          }
        } catch (l) {
          r.e(l);
        } finally {
          r.f();
        }
      }
      return !1;
    },
    isIE11: function() {
      return !!window.MSInputMethodContext && !!document.documentMode;
    },
    validate: function(t) {
      return this.accept && !this.isFileTypeValid(t) ? (this.messages.push(this.invalidFileTypeMessage.replace("{0}", t.name).replace("{1}", this.accept)), !1) : this.maxFileSize && t.size > this.maxFileSize ? (this.messages.push(this.invalidFileSizeMessage.replace("{0}", t.name).replace("{1}", this.formatSize(this.maxFileSize))), !1) : !0;
    },
    isFileTypeValid: function(t) {
      var r = this.accept.split(",").map(function(o) {
        return o.trim();
      }), n = we(r), a;
      try {
        for (n.s(); !(a = n.n()).done; ) {
          var l = a.value, u = this.isWildcard(l) ? this.getTypeClass(t.type) === this.getTypeClass(l) : t.type == l || this.getFileExtension(t).toLowerCase() === l.toLowerCase();
          if (u)
            return !0;
        }
      } catch (o) {
        n.e(o);
      } finally {
        n.f();
      }
      return !1;
    },
    getTypeClass: function(t) {
      return t.substring(0, t.indexOf("/"));
    },
    isWildcard: function(t) {
      return t.indexOf("*") !== -1;
    },
    getFileExtension: function(t) {
      return "." + t.name.split(".").pop();
    },
    isImage: function(t) {
      return /^image\//.test(t.type);
    },
    onDragEnter: function(t) {
      this.disabled || (t.stopPropagation(), t.preventDefault());
    },
    onDragOver: function(t) {
      this.disabled || (!this.isUnstyled && Ma(this.$refs.content, "p-fileupload-highlight"), this.$refs.content.setAttribute("data-p-highlight", !0), t.stopPropagation(), t.preventDefault());
    },
    onDragLeave: function() {
      this.disabled || (!this.isUnstyled && jt(this.$refs.content, "p-fileupload-highlight"), this.$refs.content.setAttribute("data-p-highlight", !1));
    },
    onDrop: function(t) {
      if (!this.disabled) {
        !this.isUnstyled && jt(this.$refs.content, "p-fileupload-highlight"), this.$refs.content.setAttribute("data-p-highlight", !1), t.stopPropagation(), t.preventDefault();
        var r = t.dataTransfer ? t.dataTransfer.files : t.target.files, n = this.multiple || r && r.length === 1;
        n && this.onFileSelect(t);
      }
    },
    remove: function(t) {
      this.clearInputElement();
      var r = this.files.splice(t, 1)[0];
      this.files = at(this.files), this.$emit("remove", {
        file: r,
        files: this.files
      });
    },
    removeUploadedFile: function(t) {
      var r = this.uploadedFiles.splice(t, 1)[0];
      this.uploadedFiles = at(this.uploadedFiles), this.$emit("remove-uploaded-file", {
        file: r,
        files: this.uploadedFiles
      });
    },
    clearInputElement: function() {
      this.$refs.fileInput.value = "";
    },
    clearIEInput: function() {
      this.$refs.fileInput && (this.duplicateIEEvent = !0, this.$refs.fileInput.value = "");
    },
    formatSize: function(t) {
      var r, n = 1024, a = 3, l = ((r = this.$primevue.config.locale) === null || r === void 0 ? void 0 : r.fileSizeTypes) || ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      if (t === 0)
        return "0 ".concat(l[0]);
      var u = Math.floor(Math.log(t) / Math.log(n)), o = parseFloat((t / Math.pow(n, u)).toFixed(a));
      return "".concat(o, " ").concat(l[u]);
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
      var t;
      if (this.auto) return this.chooseButtonLabel;
      if (this.hasFiles) {
        var r;
        return this.files && this.files.length === 1 ? this.files[0].name : (r = this.$primevue.config.locale) === null || r === void 0 || (r = r.fileChosenMessage) === null || r === void 0 ? void 0 : r.replace("{0}", this.files.length);
      }
      return ((t = this.$primevue.config.locale) === null || t === void 0 ? void 0 : t.noFileChosenMessage) || "";
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
    Button: ln,
    ProgressBar: dn,
    Message: La,
    FileContent: cn,
    PlusIcon: Fa,
    UploadIcon: sn,
    TimesIcon: un
  },
  directives: {
    ripple: Ua
  }
}, Il = ["multiple", "accept", "disabled"], Gl = ["files"], Zl = ["accept", "disabled", "multiple"];
function Vl(e, t, r, n, a, l) {
  var u = O("Button"), o = O("ProgressBar"), s = O("Message"), d = O("FileContent");
  return l.isAdvanced ? (V(), N("div", W({
    key: 0,
    class: e.cx("root")
  }, e.ptmi("root")), [M("input", W({
    ref: "fileInput",
    type: "file",
    onChange: t[0] || (t[0] = function() {
      return l.onFileSelect && l.onFileSelect.apply(l, arguments);
    }),
    multiple: e.multiple,
    accept: e.accept,
    disabled: l.chooseDisabled
  }, e.ptm("input")), null, 16, Il), M("div", W({
    class: e.cx("header")
  }, e.ptm("header")), [ee(e.$slots, "header", {
    files: a.files,
    uploadedFiles: a.uploadedFiles,
    chooseCallback: l.choose,
    uploadCallback: l.uploader,
    clearCallback: l.clear
  }, function() {
    return [L(u, W({
      label: l.chooseButtonLabel,
      class: l.chooseButtonClass,
      style: e.style,
      disabled: e.disabled,
      unstyled: e.unstyled,
      onClick: l.choose,
      onKeydown: Pt(l.choose, ["enter"]),
      onFocus: l.onFocus,
      onBlur: l.onBlur
    }, e.chooseButtonProps, {
      pt: e.ptm("pcChooseButton")
    }), {
      icon: K(function(g) {
        return [ee(e.$slots, "chooseicon", {}, function() {
          return [(V(), w(ue(e.chooseIcon ? "span" : "PlusIcon"), W({
            class: [g.class, e.chooseIcon],
            "aria-hidden": "true"
          }, e.ptm("pcChooseButton").icon), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["label", "class", "style", "disabled", "unstyled", "onClick", "onKeydown", "onFocus", "onBlur", "pt"]), e.showUploadButton ? (V(), w(u, W({
      key: 0,
      class: e.cx("pcUploadButton"),
      label: l.uploadButtonLabel,
      onClick: l.uploader,
      disabled: l.uploadDisabled,
      unstyled: e.unstyled
    }, e.uploadButtonProps, {
      pt: e.ptm("pcUploadButton")
    }), {
      icon: K(function(g) {
        return [ee(e.$slots, "uploadicon", {}, function() {
          return [(V(), w(ue(e.uploadIcon ? "span" : "UploadIcon"), W({
            class: [g.class, e.uploadIcon],
            "aria-hidden": "true"
          }, e.ptm("pcUploadButton").icon, {
            "data-pc-section": "uploadbuttonicon"
          }), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["class", "label", "onClick", "disabled", "unstyled", "pt"])) : D("", !0), e.showCancelButton ? (V(), w(u, W({
      key: 1,
      class: e.cx("pcCancelButton"),
      label: l.cancelButtonLabel,
      onClick: l.clear,
      disabled: l.cancelDisabled,
      unstyled: e.unstyled
    }, e.cancelButtonProps, {
      pt: e.ptm("pcCancelButton")
    }), {
      icon: K(function(g) {
        return [ee(e.$slots, "cancelicon", {}, function() {
          return [(V(), w(ue(e.cancelIcon ? "span" : "TimesIcon"), W({
            class: [g.class, e.cancelIcon],
            "aria-hidden": "true"
          }, e.ptm("pcCancelButton").icon, {
            "data-pc-section": "cancelbuttonicon"
          }), null, 16, ["class"]))];
        })];
      }),
      _: 3
    }, 16, ["class", "label", "onClick", "disabled", "unstyled", "pt"])) : D("", !0)];
  })], 16), M("div", W({
    ref: "content",
    class: e.cx("content"),
    onDragenter: t[1] || (t[1] = function() {
      return l.onDragEnter && l.onDragEnter.apply(l, arguments);
    }),
    onDragover: t[2] || (t[2] = function() {
      return l.onDragOver && l.onDragOver.apply(l, arguments);
    }),
    onDragleave: t[3] || (t[3] = function() {
      return l.onDragLeave && l.onDragLeave.apply(l, arguments);
    }),
    onDrop: t[4] || (t[4] = function() {
      return l.onDrop && l.onDrop.apply(l, arguments);
    })
  }, e.ptm("content"), {
    "data-p-highlight": !1
  }), [ee(e.$slots, "content", {
    files: a.files,
    uploadedFiles: a.uploadedFiles,
    removeUploadedFileCallback: l.removeUploadedFile,
    removeFileCallback: l.remove,
    progress: a.progress,
    messages: a.messages
  }, function() {
    return [l.hasFiles ? (V(), w(o, {
      key: 0,
      value: a.progress,
      showValue: !1,
      unstyled: e.unstyled,
      pt: e.ptm("pcProgressbar")
    }, null, 8, ["value", "unstyled", "pt"])) : D("", !0), (V(!0), N(Ke, null, gt(a.messages, function(g) {
      return V(), w(s, {
        key: g,
        severity: "error",
        onClose: l.onMessageClose,
        unstyled: e.unstyled,
        pt: e.ptm("pcMessage")
      }, {
        default: K(function() {
          return [Xe(ne(g), 1)];
        }),
        _: 2
      }, 1032, ["onClose", "unstyled", "pt"]);
    }), 128)), l.hasFiles ? (V(), N("div", {
      key: 1,
      class: ge(e.cx("fileList"))
    }, [L(d, {
      files: a.files,
      onRemove: l.remove,
      badgeValue: l.pendingLabel,
      previewWidth: e.previewWidth,
      templates: e.$slots,
      unstyled: e.unstyled,
      pt: e.pt
    }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "unstyled", "pt"])], 2)) : D("", !0), l.hasUploadedFiles ? (V(), N("div", {
      key: 2,
      class: ge(e.cx("fileList"))
    }, [L(d, {
      files: a.uploadedFiles,
      onRemove: l.removeUploadedFile,
      badgeValue: l.completedLabel,
      badgeSeverity: "success",
      previewWidth: e.previewWidth,
      templates: e.$slots,
      unstyled: e.unstyled,
      pt: e.pt
    }, null, 8, ["files", "onRemove", "badgeValue", "previewWidth", "templates", "unstyled", "pt"])], 2)) : D("", !0)];
  }), e.$slots.empty && !l.hasFiles && !l.hasUploadedFiles ? (V(), N("div", nn(W({
    key: 0
  }, e.ptm("empty"))), [ee(e.$slots, "empty")], 16)) : D("", !0)], 16)], 16)) : l.isBasic ? (V(), N("div", W({
    key: 1,
    class: e.cx("root")
  }, e.ptmi("root")), [(V(!0), N(Ke, null, gt(a.messages, function(g) {
    return V(), w(s, {
      key: g,
      severity: "error",
      onClose: l.onMessageClose,
      unstyled: e.unstyled,
      pt: e.ptm("pcMessage")
    }, {
      default: K(function() {
        return [Xe(ne(g), 1)];
      }),
      _: 2
    }, 1032, ["onClose", "unstyled", "pt"]);
  }), 128)), L(u, W({
    label: l.chooseButtonLabel,
    class: l.chooseButtonClass,
    style: e.style,
    disabled: e.disabled,
    unstyled: e.unstyled,
    onMouseup: l.onBasicUploaderClick,
    onKeydown: Pt(l.choose, ["enter"]),
    onFocus: l.onFocus,
    onBlur: l.onBlur
  }, e.chooseButtonProps, {
    pt: e.ptm("pcChooseButton")
  }), {
    icon: K(function(g) {
      return [ee(e.$slots, "chooseicon", {}, function() {
        return [(V(), w(ue(e.chooseIcon ? "span" : "PlusIcon"), W({
          class: [g.class, e.chooseIcon],
          "aria-hidden": "true"
        }, e.ptm("pcChooseButton").icon), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 16, ["label", "class", "style", "disabled", "unstyled", "onMouseup", "onKeydown", "onFocus", "onBlur", "pt"]), e.auto ? D("", !0) : ee(e.$slots, "filelabel", {
    key: 0,
    class: ge(e.cx("filelabel"))
  }, function() {
    return [M("span", {
      class: ge(e.cx("filelabel")),
      files: a.files
    }, ne(l.basicFileChosenLabel), 11, Gl)];
  }), M("input", W({
    ref: "fileInput",
    type: "file",
    accept: e.accept,
    disabled: e.disabled,
    multiple: e.multiple,
    onChange: t[5] || (t[5] = function() {
      return l.onFileSelect && l.onFileSelect.apply(l, arguments);
    }),
    onFocus: t[6] || (t[6] = function() {
      return l.onFocus && l.onFocus.apply(l, arguments);
    }),
    onBlur: t[7] || (t[7] = function() {
      return l.onBlur && l.onBlur.apply(l, arguments);
    })
  }, e.ptm("input")), null, 16, Zl)], 16)) : D("", !0);
}
bn.render = Vl;
const Al = /* @__PURE__ */ Se({
  __name: "InputUploadDialog",
  props: {
    isSelectionHidden: { type: Boolean },
    bucketName: {}
  },
  emits: ["choose"],
  setup(e, { emit: t }) {
    const r = ae("dialogRef"), n = e, a = t, l = (o) => {
      console.log("close", r), r && (r.value.close(), a("choose", [o]));
    }, u = (o) => {
      console.log(o.modelSelectionRef), console.log("close", r), r && (r.value.close(), a("choose", o.modelSelectionRef), o.modelSelectionRef = []);
    };
    return (o, s) => (V(), w(Ha, null, {
      default: K(() => [
        L(oe(tl), nn(va(n)), {
          actions: K(({ data: d }) => [
            L(oe(H), {
              action: () => l(d),
              label: "choose"
            }, null, 8, ["action"])
          ]),
          globalActions: K(({ store: d }) => [
            L(oe(H), {
              action: () => u(d),
              label: "choose"
            }, null, 8, ["action"])
          ]),
          card: K(({ data: d }) => [
            Xe(ne(d.name) + " ", 1),
            L(oe(on), {
              width: 150,
              src: d.name
            }, null, 8, ["src"])
          ]),
          _: 1
        }, 16)
      ]),
      _: 1
    }));
  }
});
var Xl = Symbol();
function Cl() {
  var e = ae(Xl);
  if (!e)
    throw new Error("No PrimeVue Dialog provided!");
  return e;
}
const Wl = async (e, t) => {
  const r = await e.arrayBuffer();
  return {
    path: `${e.name}`,
    bucketName: t,
    reader: new Uint8Array(r),
    fileType: e.type
  };
}, Ot = async (e, t) => ({
  files: await Promise.all(
    e.map((n) => Wl(n, t))
  )
}), Bl = /* @__PURE__ */ Se({
  __name: "InputUpload",
  props: {
    context: {}
  },
  setup(e) {
    const { bucketName: t, auto: r, fileLimit: n, node: a, multiple: l } = e.context, u = ae("apiClient"), o = se([]), s = se([]), d = Cl(), g = ae("filesHandler"), b = se(), h = () => o.value.length + s.value.length, c = () => {
      if (!s.value.length) return l ? [] : "";
      if (l)
        return [
          ...s.value.map((G) => `${G.bucketId}/${G.name}`),
          ...o.value.map((G) => `${t}/${G.name}`)
        ];
      const f = s.value[0];
      return `${f.bucketId}/${f.name}`;
    }, p = async (f) => {
      if (console.log("files selected", f.files), !!f.files.length) {
        if (l) {
          const G = [...o.value, ...f.files];
          b.value.files = G, o.value = G;
        } else {
          s.value = [];
          const G = [f.files[f.files.length - 1]];
          b.value.files = G, o.value = G;
        }
        if (n && l && h() + f.files.length > n) {
          console.error("exceeded file limit");
          return;
        }
        if (!r && (a.input(c()), a.parent && a.parent.props.type == "form")) {
          const G = await Ot(
            f.files,
            t
          );
          a.parent.props.uploads = G;
        }
      }
    }, m = () => {
      d.open(
        Z(Al, {
          bucketName: t,
          isSelectionHidden: !l,
          onChoose: async (f) => {
            if (!l) {
              s.value = [f[0]], b.value.uploadedFiles = [f[0]], o.value = [], a.input(c());
              return;
            }
            b.value.uploadedFiles = [
              ...s.value,
              ...f
            ], s.value = [...s.value, ...f], a.input(c());
          }
        })
      );
    }, y = (f) => {
      const G = o.value.indexOf(f);
      G !== -1 && (o.value.splice(G, 1), a.input(c()), r && A(f));
    }, F = (f) => {
      const G = s.value.indexOf(f);
      G !== -1 && (s.value.splice(G, 1), a.input(c()));
    }, A = async (f) => {
      g && g.fileDeleteByBucket && await P(g.fileDeleteByBucket, u, {
        bucketName: t,
        records: Array.isArray(f) ? f.map((G) => G.name) : [f.name]
      });
    }, z = async (f) => {
      if (g) {
        if (g.fileCreate) {
          await P(
            g.fileCreate,
            u,
            f.files[0]
          );
          return;
        }
        if (g.fileBulkCreate) {
          await P(g.fileBulkCreate, u, f);
          return;
        }
      }
    }, E = async (f) => {
      if (g) {
        if (g.fileBulkCreate) {
          await P(g.fileBulkCreate, u, f);
          return;
        }
        if (g.fileCreate) {
          for (let G = 0; G < f.files.length; G++)
            await P(
              g.fileCreate,
              u,
              f.files[G]
            );
          return;
        }
      }
    }, me = async (f) => {
      if (!g || !g.fileBulkCreate && !g.fileCreate || !f.files || Array.isArray(f.files) && f.files.length == 0) return;
      const G = Array.isArray(f.files) ? f.files : [f.files];
      let $ = await Ot(G, t);
      if ($.files.length) {
        if (!l) {
          await z($), a.input(c());
          return;
        }
        await E($), a.input(c());
      }
    }, pe = () => Z(
      bn,
      {
        ...e.context,
        ref: (f) => b.value = f,
        onSelect: p,
        onUploader: me,
        fileLimit: l ? n : 1,
        customUpload: !0
      },
      {
        content: () => Z(
          "div",
          {
            class: "flex"
          },
          [
            o.value.map(
              (f) => Z(
                "div",
                {
                  class: "card"
                },
                [
                  Z("img", {
                    width: "150px",
                    src: URL.createObjectURL(f)
                  }),
                  Z(H, {
                    label: "remove",
                    icon: "trash",
                    action: () => y(f)
                  })
                ]
              )
            ),
            s.value.map(
              (f) => Z(
                "div",
                {
                  class: "card"
                },
                [
                  Z(on, {
                    width: "150px",
                    src: f.name
                  }),
                  Z(H, {
                    label: "remove",
                    icon: "trash",
                    action: () => F(f)
                  })
                ]
              )
            )
          ]
        ),
        empty: () => Z("h2", "drop files hear"),
        header: ({
          chooseCallback: f,
          clearCallback: G
        }) => Z(
          "div",
          {
            class: "flex gap-2"
          },
          [
            Z(H, {
              icon: "images",
              label: "select from files",
              rounded: !0,
              outlined: !0,
              severity: "info",
              action: () => {
                f(), console.log("choose");
              }
            }),
            Z(H, {
              icon: "images",
              label: "select from gallery",
              rounded: !0,
              outlined: !0,
              severity: "success",
              action: () => {
                m();
              }
            }),
            Z(H, {
              icon: "images",
              label: "cancel",
              rounded: !0,
              outlined: !0,
              severity: "danger",
              action: async () => {
                r && await A(o.value), s.value = [], o.value = [], a.input(c()), G();
              }
            })
          ]
        )
      }
    );
    return (f, G) => (V(), w(ue(pe)));
  }
}), $t = (e) => {
  if (!e.context || !e.context.messages) return;
  const [t] = Tt(e.context.messages);
  if (!t || !t.length) return;
  const r = [];
  for (const [n, a] of Tt(e.context.messages))
    a.type == "error" && r.push(Z(
      "p",
      { class: "input-error text-red-500" },
      `Error: ${a.value}`
    ));
  return r;
}, qt = (e) => {
  if (!e)
    return Z("h2", "Loading...");
}, xl = /* @__PURE__ */ Se({
  __name: "Dropdown",
  props: {
    context: {}
  },
  emits: ["valueChange"],
  setup(e, { emit: t }) {
    const r = e, { context: n } = r, a = t, {
      options: l,
      dependsOn: u,
      createRoute: o,
      node: s,
      useLazy: d,
      hideReload: g
    } = n, b = () => {
      const A = { ...n };
      return Array.isArray(l) || (A.optionLabel = A.optionLabel || "label", A.optionValue = A.optionValue ? A.optionValue : n.convertToFlat ? A.optionLabel : "value", "placeholder" in A && (A.placeholder = n.node.props.placeholder)), A;
    }, h = () => {
      if (u) {
        if (s.props.lastParentValue == s.props.getParentFormValue())
          return;
        s.props.optionsFetcher();
        return;
      }
      !d || !l || s.props.optionsArray.value.length || s.props.optionsFetcher();
    }, c = (A) => {
      s.input(A), a("valueChange", A);
    }, p = () => {
      s.props.forceReload();
    }, m = (A) => {
      if (s.props.isLoading.value || s.props.errorMessageRef.value) return;
      if (typeof n.slots.option == "function") return n.slots.option(A);
      const { selected: z, option: E } = A;
      return Z(
        "div",
        {
          class: `flex items-center ${z ? "selected" : ""}`
        },
        [
          E.icon ? Z(Oa, { icon: E.icon }) : void 0,
          typeof y.optionLabel == "string" && E[y.optionLabel] ? Z("span", E[y.optionLabel]) : void 0,
          "note" in E ? Z("span", E.note) : void 0
        ]
      );
    }, y = b(), F = () => {
      var A;
      return Z(
        n.useButtons ? Ta : n.multiple ? Pa : ka,
        {
          ...y,
          pt: { overlay: "z-2000" },
          modelValue: n._value,
          "onUpdate:modelValue": c,
          loading: s.props.isLoading.value,
          options: ((A = s.props.optionsArray) == null ? void 0 : A.value) || [],
          onBeforeShow: h
        },
        {
          ...n.slots,
          header: (z) => Z("div", { class: "select-header" }, [
            g ? void 0 : Z(H, {
              action: p,
              label: "reload",
              icon: "reload"
            }),
            o ? Z(H, { action: o, label: "create", icon: "plus" }) : void 0
          ]),
          option: (z) => [
            qt(s.props.isLoading),
            $t(s),
            m(z)
          ],
          empty: () => [
            qt(s.props.isLoading),
            $t(s),
            Z("h2", "No options available")
          ]
        }
      );
    };
    return (A, z) => (V(), w(ue(F)));
  }
}), er = (e) => ({
  not_array: new Error(`The value of "${e}" in the API response is not an array.`),
  not_defined: new Error(`The key "${e}" is missing in the API response.`)
}), mn = ({
  options: e,
  optionsMapper: t,
  apiClient: r,
  request: n = {},
  responseOptionsKey: a = "options"
}) => new Promise((l, u) => {
  if (Array.isArray(e)) return l(e);
  P(e, r, n).then((o) => (console.log("fetching from api", o), t ? l(t(o)) : Array.isArray(o) ? l(o) : (console.log("Asdasdasd", a), a in o ? Array.isArray(o[a]) ? l(o[a]) : u(er(a).not_array) : u(er(a).not_defined)))).catch(u);
}), Rl = () => wa(
  (t) => mn(t),
  300
  // 300ms debounce delay
), Jl = ({ cacheKey: e, cacheTimeout: t = 1e5, bypassCache: r }, n) => new Promise((a, l) => {
  if (console.log("fetching from db", e), !e || r)
    return console.log("fetch from api only"), mn(n).then(a).catch(l);
  Me.dropdownHelper.find(e).then(async (u) => {
    if (u) {
      a(u);
      return;
    }
    Rl()(n).then((s) => (console.log("apioptiosn", s), s.length && Me.dropdownHelper.create(e, s, t).catch((d) => console.warn("Failed to create cache entry", d)), a(s))).catch(l);
  });
}), Sl = () => rl(
  (t, r, n) => Jl({ cacheKey: t, cacheTimeout: r, bypassCache: n.bypassCache }, n)
), Yl = (e) => {
  if (e.props && (("dependsOn" in e.props || "requestMapper" in e.props || "requestPropertyName" in e.props) && (e.props.constructRequest = () => {
    const { requestMapper: t, requestPropertyName: r = "recordId" } = e.props;
    let n = {};
    if (e.props.dependsOn) {
      const a = e.props.getParentFormValue();
      if (!a) return !1;
      e.props.lastParentValue = a, n[r] = a;
    }
    return t && (n = t(n)), n;
  }), "dependsOn" in e.props)) {
    e.props.errorMessageRef = se("");
    const { dependsOn: t } = e.props, r = () => {
      if (!t) return {};
      if (!e.parent)
        return e.setErrors(["dependsOn is passed but the input has no parent"]), e.props.errorMessageRef.value = "dependsOn is passed but the input has no parent", !1;
      if (!e.parent.value || typeof e.parent.value != "object") return !1;
      const n = e.parent.value;
      return t in n ? n[t] ? n[t] : (e.props.errorMessageRef.value = `please select value from this input "${t}" in order to fetch options for this input`, !1) : (e.setErrors([`dependsOn is passed but the input has no sibling with this name "${t}"`]), !1);
    };
    e.props.getParentFormValue = r;
  }
}, Fl = (e) => {
  if (!e.props) return;
  const t = e.props.type;
  if (t == "devkitDropdown" || t == "devkitMultiDropdown") {
    e.props.isLoading = se(!1), e.props.optionsArray = se([]), e.props.errorMessageRef = se(""), e.props.lastParentValue = "";
    const r = ae("apiClient"), { options: n, dependsOn: a, cacheKey: l = e.props.name, bypassCache: u, useLazy: o, optionsMapper: s, responseOptionsKey: d = "options", cacheTimeout: g = 60 * 60 * 1e3 * 200 } = e.props, b = () => {
      if (!e.props.getParentFormValue || !a) return l;
      const m = e.props.getParentFormValue();
      return m ? `${l}-${m.value}` : l;
    }, h = () => {
      const m = e.props.constructRequest ? e.props.constructRequest() : {}, y = b();
      return m ? Sl()(
        y,
        g,
        {
          options: n,
          request: m,
          bypassCache: u,
          apiClient: r,
          optionsMapper: s,
          responseOptionsKey: d
        }
      ) : Promise.resolve([]);
    }, c = () => {
      if (e.props.isLoading.value = !0, Array.isArray(e.props.options)) {
        e.props.optionsArray.value = n, e.props.isLoading.value = !1;
        return;
      }
      h().then((m) => {
        e.props.optionsArray.value = m;
      }).catch((m) => {
        if (console.log("e", m), "message" in m) {
          if (m.message.includes("is not a function")) {
            e.props.errorMessageRef.value = "the function name passed on options not found on injected api client";
            return;
          }
          e.props.errorMessageRef.value = m.message;
          return;
        }
        e.props.errorMessageRef.value = m;
      }).finally(() => e.props.isLoading.value = !1);
    }, p = () => {
      Me.dropdownHelper.bulkDelete([b()]), c();
    };
    o || c(), e.props.optionsFetcher = c, e.props.forceReload = p;
  }
};
var X;
(function(e) {
  e[e.Canceled = 1] = "Canceled", e[e.Unknown = 2] = "Unknown", e[e.InvalidArgument = 3] = "InvalidArgument", e[e.DeadlineExceeded = 4] = "DeadlineExceeded", e[e.NotFound = 5] = "NotFound", e[e.AlreadyExists = 6] = "AlreadyExists", e[e.PermissionDenied = 7] = "PermissionDenied", e[e.ResourceExhausted = 8] = "ResourceExhausted", e[e.FailedPrecondition = 9] = "FailedPrecondition", e[e.Aborted = 10] = "Aborted", e[e.OutOfRange = 11] = "OutOfRange", e[e.Unimplemented = 12] = "Unimplemented", e[e.Internal = 13] = "Internal", e[e.Unavailable = 14] = "Unavailable", e[e.DataLoss = 15] = "DataLoss", e[e.Unauthenticated = 16] = "Unauthenticated";
})(X || (X = {}));
function At(e, t) {
  return e !== null && typeof e == "object" && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 ? !0 : t.typeName === e.$typeName : !1;
}
var i;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(i || (i = {}));
function kl() {
  let e = 0, t = 0;
  for (let n = 0; n < 28; n += 7) {
    let a = this.buf[this.pos++];
    if (e |= (a & 127) << n, !(a & 128))
      return this.assertBounds(), [e, t];
  }
  let r = this.buf[this.pos++];
  if (e |= (r & 15) << 28, t = (r & 112) >> 4, !(r & 128))
    return this.assertBounds(), [e, t];
  for (let n = 3; n <= 31; n += 7) {
    let a = this.buf[this.pos++];
    if (t |= (a & 127) << n, !(a & 128))
      return this.assertBounds(), [e, t];
  }
  throw new Error("invalid varint");
}
function lt(e, t, r) {
  for (let l = 0; l < 28; l = l + 7) {
    const u = e >>> l, o = !(!(u >>> 7) && t == 0), s = (o ? u | 128 : u) & 255;
    if (r.push(s), !o)
      return;
  }
  const n = e >>> 28 & 15 | (t & 7) << 4, a = !!(t >> 3);
  if (r.push((a ? n | 128 : n) & 255), !!a) {
    for (let l = 3; l < 31; l = l + 7) {
      const u = t >>> l, o = !!(u >>> 7), s = (o ? u | 128 : u) & 255;
      if (r.push(s), !o)
        return;
    }
    r.push(t >>> 31 & 1);
  }
}
const He = 4294967296;
function tr(e) {
  const t = e[0] === "-";
  t && (e = e.slice(1));
  const r = 1e6;
  let n = 0, a = 0;
  function l(u, o) {
    const s = Number(e.slice(u, o));
    a *= r, n = n * r + s, n >= He && (a = a + (n / He | 0), n = n % He);
  }
  return l(-24, -18), l(-18, -12), l(-12, -6), l(-6), t ? fn(n, a) : Xt(n, a);
}
function wl(e, t) {
  let r = Xt(e, t);
  const n = r.hi & 2147483648;
  n && (r = fn(r.lo, r.hi));
  const a = pn(r.lo, r.hi);
  return n ? "-" + a : a;
}
function pn(e, t) {
  if ({ lo: e, hi: t } = El(e, t), t <= 2097151)
    return String(He * t + e);
  const r = e & 16777215, n = (e >>> 24 | t << 8) & 16777215, a = t >> 16 & 65535;
  let l = r + n * 6777216 + a * 6710656, u = n + a * 8147497, o = a * 2;
  const s = 1e7;
  return l >= s && (u += Math.floor(l / s), l %= s), u >= s && (o += Math.floor(u / s), u %= s), o.toString() + rr(u) + rr(l);
}
function El(e, t) {
  return { lo: e >>> 0, hi: t >>> 0 };
}
function Xt(e, t) {
  return { lo: e | 0, hi: t | 0 };
}
function fn(e, t) {
  return t = ~t, e ? e = ~e + 1 : t += 1, Xt(e, t);
}
const rr = (e) => {
  const t = String(e);
  return "0000000".slice(t.length) + t;
};
function nr(e, t) {
  if (e >= 0) {
    for (; e > 127; )
      t.push(e & 127 | 128), e = e >>> 7;
    t.push(e);
  } else {
    for (let r = 0; r < 9; r++)
      t.push(e & 127 | 128), e = e >> 7;
    t.push(1);
  }
}
function Nl() {
  let e = this.buf[this.pos++], t = e & 127;
  if (!(e & 128))
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 7, !(e & 128))
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 14, !(e & 128))
    return this.assertBounds(), t;
  if (e = this.buf[this.pos++], t |= (e & 127) << 21, !(e & 128))
    return this.assertBounds(), t;
  e = this.buf[this.pos++], t |= (e & 15) << 28;
  for (let r = 5; e & 128 && r < 10; r++)
    e = this.buf[this.pos++];
  if (e & 128)
    throw new Error("invalid varint");
  return this.assertBounds(), t >>> 0;
}
const B = /* @__PURE__ */ zl();
function zl() {
  const e = new DataView(new ArrayBuffer(8));
  if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
    const r = BigInt("-9223372036854775808"), n = BigInt("9223372036854775807"), a = BigInt("0"), l = BigInt("18446744073709551615");
    return {
      zero: BigInt(0),
      supported: !0,
      parse(u) {
        const o = typeof u == "bigint" ? u : BigInt(u);
        if (o > n || o < r)
          throw new Error(`invalid int64: ${u}`);
        return o;
      },
      uParse(u) {
        const o = typeof u == "bigint" ? u : BigInt(u);
        if (o > l || o < a)
          throw new Error(`invalid uint64: ${u}`);
        return o;
      },
      enc(u) {
        return e.setBigInt64(0, this.parse(u), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      uEnc(u) {
        return e.setBigInt64(0, this.uParse(u), !0), {
          lo: e.getInt32(0, !0),
          hi: e.getInt32(4, !0)
        };
      },
      dec(u, o) {
        return e.setInt32(0, u, !0), e.setInt32(4, o, !0), e.getBigInt64(0, !0);
      },
      uDec(u, o) {
        return e.setInt32(0, u, !0), e.setInt32(4, o, !0), e.getBigUint64(0, !0);
      }
    };
  }
  return {
    zero: "0",
    supported: !1,
    parse(r) {
      return typeof r != "string" && (r = r.toString()), ar(r), r;
    },
    uParse(r) {
      return typeof r != "string" && (r = r.toString()), lr(r), r;
    },
    enc(r) {
      return typeof r != "string" && (r = r.toString()), ar(r), tr(r);
    },
    uEnc(r) {
      return typeof r != "string" && (r = r.toString()), lr(r), tr(r);
    },
    dec(r, n) {
      return wl(r, n);
    },
    uDec(r, n) {
      return pn(r, n);
    }
  };
}
function ar(e) {
  if (!/^-?[0-9]+$/.test(e))
    throw new Error("invalid int64: " + e);
}
function lr(e) {
  if (!/^[0-9]+$/.test(e))
    throw new Error("invalid uint64: " + e);
}
function be(e, t) {
  switch (e) {
    case i.STRING:
      return "";
    case i.BOOL:
      return !1;
    case i.DOUBLE:
    case i.FLOAT:
      return 0;
    case i.INT64:
    case i.UINT64:
    case i.SFIXED64:
    case i.FIXED64:
    case i.SINT64:
      return t ? "0" : B.zero;
    case i.BYTES:
      return new Uint8Array(0);
    default:
      return 0;
  }
}
function Hl(e, t) {
  switch (e) {
    case i.BOOL:
      return t === !1;
    case i.STRING:
      return t === "";
    case i.BYTES:
      return t instanceof Uint8Array && !t.byteLength;
    default:
      return t == 0;
  }
}
const hn = 2, re = Symbol.for("reflect unsafe local");
function yn(e, t) {
  const r = e[t.localName].case;
  return r === void 0 ? r : t.fields.find((n) => n.localName === r);
}
function vl(e, t) {
  const r = t.localName;
  if (t.oneof)
    return e[t.oneof.localName].case === r;
  if (t.presence != hn)
    return e[r] !== void 0 && Object.prototype.hasOwnProperty.call(e, r);
  switch (t.fieldKind) {
    case "list":
      return e[r].length > 0;
    case "map":
      return Object.keys(e[r]).length > 0;
    case "scalar":
      return !Hl(t.scalar, e[r]);
    case "enum":
      return e[r] !== t.enum.values[0].number;
  }
  throw new Error("message field with implicit presence");
}
function Ce(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function In(e, t) {
  if (t.oneof) {
    const r = e[t.oneof.localName];
    return r.case === t.localName ? r.value : void 0;
  }
  return e[t.localName];
}
function Gn(e, t, r) {
  t.oneof ? e[t.oneof.localName] = {
    case: t.localName,
    value: r
  } : e[t.localName] = r;
}
function Kl(e, t) {
  const r = t.localName;
  if (t.oneof) {
    const n = t.oneof.localName;
    e[n].case === r && (e[n] = { case: void 0 });
  } else if (t.presence != hn)
    delete e[r];
  else
    switch (t.fieldKind) {
      case "map":
        e[r] = {};
        break;
      case "list":
        e[r] = [];
        break;
      case "enum":
        e[r] = t.enum.values[0].number;
        break;
      case "scalar":
        e[r] = be(t.scalar, t.longAsString);
        break;
    }
}
function de(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function Ct(e, t) {
  var r, n, a, l;
  if (de(e) && re in e && "add" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const u = t, o = e.field();
      return u.listKind == o.listKind && u.scalar === o.scalar && ((r = u.message) === null || r === void 0 ? void 0 : r.typeName) === ((n = o.message) === null || n === void 0 ? void 0 : n.typeName) && ((a = u.enum) === null || a === void 0 ? void 0 : a.typeName) === ((l = o.enum) === null || l === void 0 ? void 0 : l.typeName);
    }
    return !0;
  }
  return !1;
}
function Wt(e, t) {
  var r, n, a, l;
  if (de(e) && re in e && "has" in e && "field" in e && typeof e.field == "function") {
    if (t !== void 0) {
      const u = t, o = e.field();
      return u.mapKey === o.mapKey && u.mapKind == o.mapKind && u.scalar === o.scalar && ((r = u.message) === null || r === void 0 ? void 0 : r.typeName) === ((n = o.message) === null || n === void 0 ? void 0 : n.typeName) && ((a = u.enum) === null || a === void 0 ? void 0 : a.typeName) === ((l = o.enum) === null || l === void 0 ? void 0 : l.typeName);
    }
    return !0;
  }
  return !1;
}
function Bt(e, t) {
  return de(e) && re in e && "desc" in e && de(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
function Ml(e) {
  return Zn(e.$typeName);
}
function Ye(e) {
  const t = e.fields[0];
  return Zn(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function Zn(e) {
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
const Ll = 999, Ul = 998, ve = 2;
function j(e, t) {
  if (At(t, e))
    return t;
  const r = Pl(e);
  return t !== void 0 && Ql(e, r, t), r;
}
function Ql(e, t, r) {
  for (const n of e.members) {
    let a = r[n.localName];
    if (a == null)
      continue;
    let l;
    if (n.kind == "oneof") {
      const u = yn(r, n);
      if (!u)
        continue;
      l = u, a = In(r, u);
    } else
      l = n;
    switch (l.fieldKind) {
      case "message":
        a = xt(l, a);
        break;
      case "scalar":
        a = Vn(l, a);
        break;
      case "list":
        a = Dl(l, a);
        break;
      case "map":
        a = _l(l, a);
        break;
    }
    Gn(t, l, a);
  }
  return t;
}
function Vn(e, t) {
  return e.scalar == i.BYTES ? Rt(t) : t;
}
function _l(e, t) {
  if (de(t)) {
    if (e.scalar == i.BYTES)
      return ur(t, Rt);
    if (e.mapKind == "message")
      return ur(t, (r) => xt(e, r));
  }
  return t;
}
function Dl(e, t) {
  if (Array.isArray(t)) {
    if (e.scalar == i.BYTES)
      return t.map(Rt);
    if (e.listKind == "message")
      return t.map((r) => xt(e, r));
  }
  return t;
}
function xt(e, t) {
  if (e.fieldKind == "message" && !e.oneof && Ye(e.message))
    return Vn(e.message.fields[0], t);
  if (de(t)) {
    if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value")
      return t;
    if (!At(t, e.message))
      return j(e.message, t);
  }
  return t;
}
function Rt(e) {
  return Array.isArray(e) ? new Uint8Array(e) : e;
}
function ur(e, t) {
  const r = {};
  for (const n of Object.entries(e))
    r[n[0]] = t(n[1]);
  return r;
}
const Tl = Symbol(), or = /* @__PURE__ */ new WeakMap();
function Pl(e) {
  let t;
  if (jl(e)) {
    const r = or.get(e);
    let n, a;
    if (r)
      ({ prototype: n, members: a } = r);
    else {
      n = {}, a = /* @__PURE__ */ new Set();
      for (const l of e.members)
        l.kind != "oneof" && (l.fieldKind != "scalar" && l.fieldKind != "enum" || l.presence != ve && (a.add(l), n[l.localName] = ut(l)));
      or.set(e, { prototype: n, members: a });
    }
    t = Object.create(n), t.$typeName = e.typeName;
    for (const l of e.members)
      a.has(l) || l.kind == "field" && (l.fieldKind == "message" || (l.fieldKind == "scalar" || l.fieldKind == "enum") && l.presence != ve) || (t[l.localName] = ut(l));
  } else {
    t = {
      $typeName: e.typeName
    };
    for (const r of e.members)
      (r.kind == "oneof" || r.presence == ve) && (t[r.localName] = ut(r));
  }
  return t;
}
function jl(e) {
  switch (e.file.edition) {
    case Ll:
      return !1;
    case Ul:
      return !0;
    default:
      return e.fields.some((t) => t.presence != ve && t.fieldKind != "message" && !t.oneof);
  }
}
function ut(e) {
  if (e.kind == "oneof")
    return { case: void 0 };
  if (e.fieldKind == "list")
    return [];
  if (e.fieldKind == "map")
    return {};
  if (e.fieldKind == "message")
    return Tl;
  const t = e.getDefaultValue();
  return t !== void 0 ? e.fieldKind == "scalar" && e.longAsString ? t.toString() : t : e.fieldKind == "scalar" ? be(e.scalar, e.longAsString) : e.enum.values[0].number;
}
const Ol = [
  "FieldValueInvalidError",
  "FieldListRangeError",
  "ForeignFieldError"
];
class v extends Error {
  constructor(t, r, n = "FieldValueInvalidError") {
    super(r), this.name = n, this.field = () => t;
  }
}
function $l(e) {
  return e instanceof Error && Ol.includes(e.name) && "field" in e && typeof e.field == "function";
}
const ot = Symbol.for("@bufbuild/protobuf/text-encoding");
function Jt() {
  if (globalThis[ot] == null) {
    const e = new globalThis.TextEncoder(), t = new globalThis.TextDecoder();
    globalThis[ot] = {
      encodeUtf8(r) {
        return e.encode(r);
      },
      decodeUtf8(r) {
        return t.decode(r);
      },
      checkUtf8(r) {
        try {
          return encodeURIComponent(r), !0;
        } catch {
          return !1;
        }
      }
    };
  }
  return globalThis[ot];
}
var R;
(function(e) {
  e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(R || (R = {}));
const An = 34028234663852886e22, Xn = -34028234663852886e22, Cn = 4294967295, Wn = 2147483647, Bn = -2147483648;
class xn {
  constructor(t = Jt().encodeUtf8) {
    this.encodeUtf8 = t, this.stack = [], this.chunks = [], this.buf = [];
  }
  /**
   * Return all bytes written and reset this writer.
   */
  finish() {
    this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
    let t = 0;
    for (let a = 0; a < this.chunks.length; a++)
      t += this.chunks[a].length;
    let r = new Uint8Array(t), n = 0;
    for (let a = 0; a < this.chunks.length; a++)
      r.set(this.chunks[a], n), n += this.chunks[a].length;
    return this.chunks = [], r;
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
    let t = this.finish(), r = this.stack.pop();
    if (!r)
      throw new Error("invalid state, fork stack empty");
    return this.chunks = r.chunks, this.buf = r.buf, this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Writes a tag (field number and wire type).
   *
   * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
   *
   * Generated code should compute the tag ahead of time and call `uint32()`.
   */
  tag(t, r) {
    return this.uint32((t << 3 | r) >>> 0);
  }
  /**
   * Write a chunk of raw bytes.
   */
  raw(t) {
    return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(t), this;
  }
  /**
   * Write a `uint32` value, an unsigned 32 bit varint.
   */
  uint32(t) {
    for (sr(t); t > 127; )
      this.buf.push(t & 127 | 128), t = t >>> 7;
    return this.buf.push(t), this;
  }
  /**
   * Write a `int32` value, a signed 32 bit varint.
   */
  int32(t) {
    return st(t), nr(t, this.buf), this;
  }
  /**
   * Write a `bool` value, a variant.
   */
  bool(t) {
    return this.buf.push(t ? 1 : 0), this;
  }
  /**
   * Write a `bytes` value, length-delimited arbitrary data.
   */
  bytes(t) {
    return this.uint32(t.byteLength), this.raw(t);
  }
  /**
   * Write a `string` value, length-delimited data converted to UTF-8 text.
   */
  string(t) {
    let r = this.encodeUtf8(t);
    return this.uint32(r.byteLength), this.raw(r);
  }
  /**
   * Write a `float` value, 32-bit floating point number.
   */
  float(t) {
    ql(t);
    let r = new Uint8Array(4);
    return new DataView(r.buffer).setFloat32(0, t, !0), this.raw(r);
  }
  /**
   * Write a `double` value, a 64-bit floating point number.
   */
  double(t) {
    let r = new Uint8Array(8);
    return new DataView(r.buffer).setFloat64(0, t, !0), this.raw(r);
  }
  /**
   * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
   */
  fixed32(t) {
    sr(t);
    let r = new Uint8Array(4);
    return new DataView(r.buffer).setUint32(0, t, !0), this.raw(r);
  }
  /**
   * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
   */
  sfixed32(t) {
    st(t);
    let r = new Uint8Array(4);
    return new DataView(r.buffer).setInt32(0, t, !0), this.raw(r);
  }
  /**
   * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
   */
  sint32(t) {
    return st(t), t = (t << 1 ^ t >> 31) >>> 0, nr(t, this.buf), this;
  }
  /**
   * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
   */
  sfixed64(t) {
    let r = new Uint8Array(8), n = new DataView(r.buffer), a = B.enc(t);
    return n.setInt32(0, a.lo, !0), n.setInt32(4, a.hi, !0), this.raw(r);
  }
  /**
   * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
   */
  fixed64(t) {
    let r = new Uint8Array(8), n = new DataView(r.buffer), a = B.uEnc(t);
    return n.setInt32(0, a.lo, !0), n.setInt32(4, a.hi, !0), this.raw(r);
  }
  /**
   * Write a `int64` value, a signed 64-bit varint.
   */
  int64(t) {
    let r = B.enc(t);
    return lt(r.lo, r.hi, this.buf), this;
  }
  /**
   * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
   */
  sint64(t) {
    const r = B.enc(t), n = r.hi >> 31, a = r.lo << 1 ^ n, l = (r.hi << 1 | r.lo >>> 31) ^ n;
    return lt(a, l, this.buf), this;
  }
  /**
   * Write a `uint64` value, an unsigned 64-bit varint.
   */
  uint64(t) {
    const r = B.uEnc(t);
    return lt(r.lo, r.hi, this.buf), this;
  }
}
class St {
  constructor(t, r = Jt().decodeUtf8) {
    this.decodeUtf8 = r, this.varint64 = kl, this.uint32 = Nl, this.buf = t, this.len = t.length, this.pos = 0, this.view = new DataView(t.buffer, t.byteOffset, t.byteLength);
  }
  /**
   * Reads a tag - field number and wire type.
   */
  tag() {
    let t = this.uint32(), r = t >>> 3, n = t & 7;
    if (r <= 0 || n < 0 || n > 5)
      throw new Error("illegal tag: field no " + r + " wire type " + n);
    return [r, n];
  }
  /**
   * Skip one element and return the skipped data.
   *
   * When skipping StartGroup, provide the tags field number to check for
   * matching field number in the EndGroup tag.
   */
  skip(t, r) {
    let n = this.pos;
    switch (t) {
      case R.Varint:
        for (; this.buf[this.pos++] & 128; )
          ;
        break;
      // @ts-expect-error TS7029: Fallthrough case in switch
      case R.Bit64:
        this.pos += 4;
      case R.Bit32:
        this.pos += 4;
        break;
      case R.LengthDelimited:
        let a = this.uint32();
        this.pos += a;
        break;
      case R.StartGroup:
        for (; ; ) {
          const [l, u] = this.tag();
          if (u === R.EndGroup) {
            if (r !== void 0 && l !== r)
              throw new Error("invalid end group tag");
            break;
          }
          this.skip(u, l);
        }
        break;
      default:
        throw new Error("cant skip wire type " + t);
    }
    return this.assertBounds(), this.buf.subarray(n, this.pos);
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
    let t = this.uint32();
    return t >>> 1 ^ -(t & 1);
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
    let [t, r] = this.varint64(), n = -(t & 1);
    return t = (t >>> 1 | (r & 1) << 31) ^ n, r = r >>> 1 ^ n, B.dec(t, r);
  }
  /**
   * Read a `bool` field, a variant.
   */
  bool() {
    let [t, r] = this.varint64();
    return t !== 0 || r !== 0;
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
    let t = this.uint32(), r = this.pos;
    return this.pos += t, this.assertBounds(), this.buf.subarray(r, r + t);
  }
  /**
   * Read a `string` field, length-delimited data converted to UTF-8 text.
   */
  string() {
    return this.decodeUtf8(this.bytes());
  }
}
function st(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid int32: " + typeof e);
  if (!Number.isInteger(e) || e > Wn || e < Bn)
    throw new Error("invalid int32: " + e);
}
function sr(e) {
  if (typeof e == "string")
    e = Number(e);
  else if (typeof e != "number")
    throw new Error("invalid uint32: " + typeof e);
  if (!Number.isInteger(e) || e > Cn || e < 0)
    throw new Error("invalid uint32: " + e);
}
function ql(e) {
  if (typeof e == "string") {
    const t = e;
    if (e = Number(e), Number.isNaN(e) && t !== "NaN")
      throw new Error("invalid float32: " + t);
  } else if (typeof e != "number")
    throw new Error("invalid float32: " + typeof e);
  if (Number.isFinite(e) && (e > An || e < Xn))
    throw new Error("invalid float32: " + e);
}
function ce(e, t) {
  const r = e.fieldKind == "list" ? Ct(t, e) : e.fieldKind == "map" ? Wt(t, e) : Yt(e, t);
  if (r === !0)
    return;
  let n;
  switch (e.fieldKind) {
    case "list":
      n = `expected ${Sn(e)}, got ${k(t)}`;
      break;
    case "map":
      n = `expected ${Yn(e)}, got ${k(t)}`;
      break;
    default:
      n = Ue(e, t, r);
  }
  return new v(e, n);
}
function dr(e, t, r) {
  const n = Yt(e, r);
  if (n !== !0)
    return new v(e, `list item #${t + 1}: ${Ue(e, r, n)}`);
}
function eu(e, t, r) {
  const n = Rn(t, e.mapKey);
  if (n !== !0)
    return new v(e, `invalid map key: ${Ue({ scalar: e.mapKey }, t, n)}`);
  const a = Yt(e, r);
  if (a !== !0)
    return new v(e, `map entry ${k(t)}: ${Ue(e, r, a)}`);
}
function Yt(e, t) {
  return e.scalar !== void 0 ? Rn(t, e.scalar) : e.enum !== void 0 ? e.enum.open ? Number.isInteger(t) : e.enum.values.some((r) => r.number === t) : Bt(t, e.message);
}
function Rn(e, t) {
  switch (t) {
    case i.DOUBLE:
      return typeof e == "number";
    case i.FLOAT:
      return typeof e != "number" ? !1 : Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > An || e < Xn ? `${e.toFixed()} out of range` : !0;
    case i.INT32:
    case i.SFIXED32:
    case i.SINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Wn || e < Bn ? `${e.toFixed()} out of range` : !0;
    case i.FIXED32:
    case i.UINT32:
      return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Cn || e < 0 ? `${e.toFixed()} out of range` : !0;
    case i.BOOL:
      return typeof e == "boolean";
    case i.STRING:
      return typeof e != "string" ? !1 : Jt().checkUtf8(e) || "invalid UTF8";
    case i.BYTES:
      return e instanceof Uint8Array;
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return B.parse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
    case i.FIXED64:
    case i.UINT64:
      if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0)
        try {
          return B.uParse(e), !0;
        } catch {
          return `${e} out of range`;
        }
      return !1;
  }
}
function Ue(e, t, r) {
  return r = typeof r == "string" ? `: ${r}` : `, got ${k(t)}`, e.scalar !== void 0 ? `expected ${tu(e.scalar)}` + r : e.enum !== void 0 ? `expected ${e.enum.toString()}` + r : `expected ${Jn(e.message)}` + r;
}
function k(e) {
  switch (typeof e) {
    case "object":
      return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Ct(e) ? Sn(e.field()) : Wt(e) ? Yn(e.field()) : Bt(e) ? Jn(e.desc) : At(e) ? `message ${e.$typeName}` : "object";
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
function Jn(e) {
  return `ReflectMessage (${e.typeName})`;
}
function Sn(e) {
  switch (e.listKind) {
    case "message":
      return `ReflectList (${e.message.toString()})`;
    case "enum":
      return `ReflectList (${e.enum.toString()})`;
    case "scalar":
      return `ReflectList (${i[e.scalar]})`;
  }
}
function Yn(e) {
  switch (e.mapKind) {
    case "message":
      return `ReflectMap (${i[e.mapKey]}, ${e.message.toString()})`;
    case "enum":
      return `ReflectMap (${i[e.mapKey]}, ${e.enum.toString()})`;
    case "scalar":
      return `ReflectMap (${i[e.mapKey]}, ${i[e.scalar]})`;
  }
}
function tu(e) {
  switch (e) {
    case i.STRING:
      return "string";
    case i.BOOL:
      return "boolean";
    case i.INT64:
    case i.SINT64:
    case i.SFIXED64:
      return "bigint (int64)";
    case i.UINT64:
    case i.FIXED64:
      return "bigint (uint64)";
    case i.BYTES:
      return "Uint8Array";
    case i.DOUBLE:
      return "number (float64)";
    case i.FLOAT:
      return "number (float32)";
    case i.FIXED32:
    case i.UINT32:
      return "number (uint32)";
    case i.INT32:
    case i.SFIXED32:
    case i.SINT32:
      return "number (int32)";
  }
}
function U(e, t, r = !0) {
  return new Fn(e, t, r);
}
class Fn {
  get sortedFields() {
    var t;
    return (t = this._sortedFields) !== null && t !== void 0 ? t : (
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      this._sortedFields = this.desc.fields.concat().sort((r, n) => r.number - n.number)
    );
  }
  constructor(t, r, n = !0) {
    this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = n, this.desc = t, this.message = this[re] = r ?? j(t), this.fields = t.fields, this.oneofs = t.oneofs, this.members = t.members;
  }
  findNumber(t) {
    return this._fieldsByNumber || (this._fieldsByNumber = new Map(this.desc.fields.map((r) => [r.number, r]))), this._fieldsByNumber.get(t);
  }
  oneofCase(t) {
    return Ve(this.message, t), yn(this.message, t);
  }
  isSet(t) {
    return Ve(this.message, t), vl(this.message, t);
  }
  clear(t) {
    Ve(this.message, t), Kl(this.message, t);
  }
  get(t) {
    Ve(this.message, t);
    const r = In(this.message, t);
    switch (t.fieldKind) {
      case "list":
        let n = this.lists.get(t);
        return (!n || n[re] !== r) && this.lists.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          n = new ru(t, r, this.check)
        ), n;
      case "map":
        let a = this.maps.get(t);
        return (!a || a[re] !== r) && this.maps.set(
          t,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = new nu(t, r, this.check)
        ), a;
      case "message":
        return kt(t, r, this.check);
      case "scalar":
        return r === void 0 ? be(t.scalar, !1) : wt(t, r);
      case "enum":
        return r ?? t.enum.values[0].number;
    }
  }
  set(t, r) {
    if (Ve(this.message, t), this.check) {
      const a = ce(t, r);
      if (a)
        throw a;
    }
    let n;
    t.fieldKind == "message" ? n = Ft(t, r) : Wt(r) || Ct(r) ? n = r[re] : n = Et(t, r), Gn(this.message, t, n);
  }
  getUnknown() {
    return this.message.$unknown;
  }
  setUnknown(t) {
    this.message.$unknown = t;
  }
}
function Ve(e, t) {
  if (t.parent.typeName !== e.$typeName)
    throw new v(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
class ru {
  field() {
    return this._field;
  }
  get size() {
    return this._arr.length;
  }
  constructor(t, r, n) {
    this._field = t, this._arr = this[re] = r, this.check = n;
  }
  get(t) {
    const r = this._arr[t];
    return r === void 0 ? void 0 : dt(this._field, r, this.check);
  }
  set(t, r) {
    if (t < 0 || t >= this._arr.length)
      throw new v(this._field, `list item #${t + 1}: out of range`);
    if (this.check) {
      const n = dr(this._field, t, r);
      if (n)
        throw n;
    }
    this._arr[t] = ir(this._field, r);
  }
  add(t) {
    if (this.check) {
      const r = dr(this._field, this._arr.length, t);
      if (r)
        throw r;
    }
    this._arr.push(ir(this._field, t));
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
    for (const t of this._arr)
      yield dt(this._field, t, this.check);
  }
  *entries() {
    for (let t = 0; t < this._arr.length; t++)
      yield [t, dt(this._field, this._arr[t], this.check)];
  }
}
class nu {
  constructor(t, r, n = !0) {
    this.obj = this[re] = r ?? {}, this.check = n, this._field = t;
  }
  field() {
    return this._field;
  }
  set(t, r) {
    if (this.check) {
      const n = eu(this._field, t, r);
      if (n)
        throw n;
    }
    return this.obj[Ee(t)] = au(this._field, r), this;
  }
  delete(t) {
    const r = Ee(t), n = Object.prototype.hasOwnProperty.call(this.obj, r);
    return n && delete this.obj[r], n;
  }
  clear() {
    for (const t of Object.keys(this.obj))
      delete this.obj[t];
  }
  get(t) {
    let r = this.obj[Ee(t)];
    return r !== void 0 && (r = it(this._field, r, this.check)), r;
  }
  has(t) {
    return Object.prototype.hasOwnProperty.call(this.obj, Ee(t));
  }
  *keys() {
    for (const t of Object.keys(this.obj))
      yield cr(t, this._field.mapKey);
  }
  *entries() {
    for (const t of Object.entries(this.obj))
      yield [
        cr(t[0], this._field.mapKey),
        it(this._field, t[1], this.check)
      ];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  get size() {
    return Object.keys(this.obj).length;
  }
  *values() {
    for (const t of Object.values(this.obj))
      yield it(this._field, t, this.check);
  }
  forEach(t, r) {
    for (const n of this.entries())
      t.call(r, n[1], n[0], this);
  }
}
function Ft(e, t) {
  return Bt(t) ? Ml(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? wn(t.message) : t.message : t;
}
function kt(e, t, r) {
  return t !== void 0 && (Ye(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
    $typeName: e.message.typeName,
    value: wt(e.message.fields[0], t)
  } : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && de(t) && (t = kn(t))), new Fn(e.message, t, r);
}
function ir(e, t) {
  return e.listKind == "message" ? Ft(e, t) : Et(e, t);
}
function dt(e, t, r) {
  return e.listKind == "message" ? kt(e, t, r) : wt(e, t);
}
function au(e, t) {
  return e.mapKind == "message" ? Ft(e, t) : Et(e, t);
}
function it(e, t, r) {
  return e.mapKind == "message" ? kt(e, t, r) : t;
}
function Ee(e) {
  return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function cr(e, t) {
  switch (t) {
    case i.STRING:
      return e;
    case i.INT32:
    case i.FIXED32:
    case i.UINT32:
    case i.SFIXED32:
    case i.SINT32: {
      const r = Number.parseInt(e);
      if (Number.isFinite(r))
        return r;
      break;
    }
    case i.BOOL:
      switch (e) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      break;
    case i.UINT64:
    case i.FIXED64:
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
function wt(e, t) {
  switch (e.scalar) {
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = B.parse(t));
      break;
    case i.FIXED64:
    case i.UINT64:
      "longAsString" in e && e.longAsString && typeof t == "string" && (t = B.uParse(t));
      break;
  }
  return t;
}
function Et(e, t) {
  switch (e.scalar) {
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = B.parse(t));
      break;
    case i.FIXED64:
    case i.UINT64:
      "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = B.uParse(t));
      break;
  }
  return t;
}
function kn(e) {
  const t = {
    $typeName: "google.protobuf.Struct",
    fields: {}
  };
  if (de(e))
    for (const [r, n] of Object.entries(e))
      t.fields[r] = Nn(n);
  return t;
}
function wn(e) {
  const t = {};
  for (const [r, n] of Object.entries(e.fields))
    t[r] = En(n);
  return t;
}
function En(e) {
  switch (e.kind.case) {
    case "structValue":
      return wn(e.kind.value);
    case "listValue":
      return e.kind.value.values.map(En);
    case "nullValue":
    case void 0:
      return null;
    default:
      return e.kind.value;
  }
}
function Nn(e) {
  const t = {
    $typeName: "google.protobuf.Value",
    kind: { case: void 0 }
  };
  switch (typeof e) {
    case "number":
      t.kind = { case: "numberValue", value: e };
      break;
    case "string":
      t.kind = { case: "stringValue", value: e };
      break;
    case "boolean":
      t.kind = { case: "boolValue", value: e };
      break;
    case "object":
      if (e === null)
        t.kind = { case: "nullValue", value: 0 };
      else if (Array.isArray(e)) {
        const r = {
          $typeName: "google.protobuf.ListValue",
          values: []
        };
        if (Array.isArray(e))
          for (const n of e)
            r.values.push(Nn(n));
        t.kind = {
          case: "listValue",
          value: r
        };
      } else
        t.kind = {
          case: "structValue",
          value: kn(e)
        };
      break;
  }
  return t;
}
function Nt(e) {
  const t = lu();
  let r = e.length * 3 / 4;
  e[e.length - 2] == "=" ? r -= 2 : e[e.length - 1] == "=" && (r -= 1);
  let n = new Uint8Array(r), a = 0, l = 0, u, o = 0;
  for (let s = 0; s < e.length; s++) {
    if (u = t[e.charCodeAt(s)], u === void 0)
      switch (e[s]) {
        // @ts-expect-error TS7029: Fallthrough case in switch
        case "=":
          l = 0;
        // reset state when padding found
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
    switch (l) {
      case 0:
        o = u, l = 1;
        break;
      case 1:
        n[a++] = o << 2 | (u & 48) >> 4, o = u, l = 2;
        break;
      case 2:
        n[a++] = (o & 15) << 4 | (u & 60) >> 2, o = u, l = 3;
        break;
      case 3:
        n[a++] = (o & 3) << 6 | u, l = 0;
        break;
    }
  }
  if (l == 1)
    throw Error("invalid base64 string");
  return n.subarray(0, a);
}
function zn(e, t = "std") {
  const r = Hn(t), n = t == "std";
  let a = "", l = 0, u, o = 0;
  for (let s = 0; s < e.length; s++)
    switch (u = e[s], l) {
      case 0:
        a += r[u >> 2], o = (u & 3) << 4, l = 1;
        break;
      case 1:
        a += r[o | u >> 4], o = (u & 15) << 2, l = 2;
        break;
      case 2:
        a += r[o | u >> 6], a += r[u & 63], l = 0;
        break;
    }
  return l && (a += r[o], n && (a += "=", l == 1 && (a += "="))), a;
}
let Ne, gr, fe;
function Hn(e) {
  return Ne || (Ne = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), gr = Ne.slice(0, -2).concat("-", "_")), e == "url" ? (
    // biome-ignore lint/style/noNonNullAssertion: TS fails to narrow down
    gr
  ) : Ne;
}
function lu() {
  if (!fe) {
    fe = [];
    const e = Hn("std");
    for (let t = 0; t < e.length; t++)
      fe[e[t].charCodeAt(0)] = t;
    fe[45] = e.indexOf("+"), fe[95] = e.indexOf("/");
  }
  return fe;
}
function We(e) {
  let t = !1;
  const r = [];
  for (let n = 0; n < e.length; n++) {
    let a = e.charAt(n);
    switch (a) {
      case "_":
        t = !0;
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
        r.push(a), t = !1;
        break;
      default:
        t && (t = !1, a = a.toUpperCase()), r.push(a);
        break;
    }
  }
  return r.join("");
}
const uu = /* @__PURE__ */ new Set([
  // names reserved by JavaScript
  "constructor",
  "toString",
  "toJSON",
  "valueOf"
]);
function Be(e) {
  return uu.has(e) ? e + "$" : e;
}
function zt(e) {
  for (const t of e.field)
    Ce(t, "jsonName") || (t.jsonName = We(t.name));
  e.nestedType.forEach(zt);
}
function ou(e, t) {
  const r = e.values.find((n) => n.name === t);
  if (!r)
    throw new Error(`cannot parse ${e} default value: ${t}`);
  return r.number;
}
function su(e, t) {
  switch (e) {
    case i.STRING:
      return t;
    case i.BYTES: {
      const r = du(t);
      if (r === !1)
        throw new Error(`cannot parse ${i[e]} default value: ${t}`);
      return r;
    }
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      return B.parse(t);
    case i.UINT64:
    case i.FIXED64:
      return B.uParse(t);
    case i.DOUBLE:
    case i.FLOAT:
      switch (t) {
        case "inf":
          return Number.POSITIVE_INFINITY;
        case "-inf":
          return Number.NEGATIVE_INFINITY;
        case "nan":
          return Number.NaN;
        default:
          return parseFloat(t);
      }
    case i.BOOL:
      return t === "true";
    case i.INT32:
    case i.UINT32:
    case i.SINT32:
    case i.FIXED32:
    case i.SFIXED32:
      return parseInt(t, 10);
  }
}
function du(e) {
  const t = [], r = {
    tail: e,
    c: "",
    next() {
      return this.tail.length == 0 ? !1 : (this.c = this.tail[0], this.tail = this.tail.substring(1), !0);
    },
    take(n) {
      if (this.tail.length >= n) {
        const a = this.tail.substring(0, n);
        return this.tail = this.tail.substring(n), a;
      }
      return !1;
    }
  };
  for (; r.next(); )
    switch (r.c) {
      case "\\":
        if (r.next())
          switch (r.c) {
            case "\\":
              t.push(r.c.charCodeAt(0));
              break;
            case "b":
              t.push(8);
              break;
            case "f":
              t.push(12);
              break;
            case "n":
              t.push(10);
              break;
            case "r":
              t.push(13);
              break;
            case "t":
              t.push(9);
              break;
            case "v":
              t.push(11);
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7": {
              const n = r.c, a = r.take(2);
              if (a === !1)
                return !1;
              const l = parseInt(n + a, 8);
              if (Number.isNaN(l))
                return !1;
              t.push(l);
              break;
            }
            case "x": {
              const n = r.c, a = r.take(2);
              if (a === !1)
                return !1;
              const l = parseInt(n + a, 16);
              if (Number.isNaN(l))
                return !1;
              t.push(l);
              break;
            }
            case "u": {
              const n = r.c, a = r.take(4);
              if (a === !1)
                return !1;
              const l = parseInt(n + a, 16);
              if (Number.isNaN(l))
                return !1;
              const u = new Uint8Array(4);
              new DataView(u.buffer).setInt32(0, l, !0), t.push(u[0], u[1], u[2], u[3]);
              break;
            }
            case "U": {
              const n = r.c, a = r.take(8);
              if (a === !1)
                return !1;
              const l = B.uEnc(n + a), u = new Uint8Array(8), o = new DataView(u.buffer);
              o.setInt32(0, l.lo, !0), o.setInt32(4, l.hi, !0), t.push(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7]);
              break;
            }
          }
        break;
      default:
        t.push(r.c.charCodeAt(0));
    }
  return new Uint8Array(t);
}
function* mt(e) {
  switch (e.kind) {
    case "file":
      for (const t of e.messages)
        yield t, yield* mt(t);
      yield* e.enums, yield* e.services, yield* e.extensions;
      break;
    case "message":
      for (const t of e.nestedMessages)
        yield t, yield* mt(t);
      yield* e.nestedEnums, yield* e.nestedExtensions;
      break;
  }
}
function vn(...e) {
  const t = iu();
  if (!e.length)
    return t;
  if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
    for (const r of e[0].file)
      fr(r, t);
    return t;
  }
  if ("$typeName" in e[0]) {
    let l = function(u) {
      const o = [];
      for (const s of u.dependency) {
        if (t.getFile(s) != null || a.has(s))
          continue;
        const d = n(s);
        if (!d)
          throw new Error(`Unable to resolve ${s}, imported by ${u.name}`);
        "kind" in d ? t.addFile(d, !1, !0) : (a.add(d.name), o.push(d));
      }
      return o.concat(...o.map(l));
    };
    const r = e[0], n = e[1], a = /* @__PURE__ */ new Set();
    for (const u of [r, ...l(r)].reverse())
      fr(u, t);
  } else
    for (const r of e)
      for (const n of r.files)
        t.addFile(n);
  return t;
}
function iu() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  return {
    kind: "registry",
    types: e,
    extendees: t,
    [Symbol.iterator]() {
      return e.values();
    },
    get files() {
      return r.values();
    },
    addFile(n, a, l) {
      if (r.set(n.proto.name, n), !a)
        for (const u of mt(n))
          this.add(u);
      if (l)
        for (const u of n.dependencies)
          this.addFile(u, a, l);
    },
    add(n) {
      if (n.kind == "extension") {
        let a = t.get(n.extendee.typeName);
        a || t.set(
          n.extendee.typeName,
          // biome-ignore lint/suspicious/noAssignInExpressions: no
          a = /* @__PURE__ */ new Map()
        ), a.set(n.number, n);
      }
      e.set(n.typeName, n);
    },
    get(n) {
      return e.get(n);
    },
    getFile(n) {
      return r.get(n);
    },
    getMessage(n) {
      const a = e.get(n);
      return (a == null ? void 0 : a.kind) == "message" ? a : void 0;
    },
    getEnum(n) {
      const a = e.get(n);
      return (a == null ? void 0 : a.kind) == "enum" ? a : void 0;
    },
    getExtension(n) {
      const a = e.get(n);
      return (a == null ? void 0 : a.kind) == "extension" ? a : void 0;
    },
    getExtensionFor(n, a) {
      var l;
      return (l = t.get(n.typeName)) === null || l === void 0 ? void 0 : l.get(a);
    },
    getService(n) {
      const a = e.get(n);
      return (a == null ? void 0 : a.kind) == "service" ? a : void 0;
    }
  };
}
const cu = 998, gu = 999, bu = 9, xe = 10, Ae = 11, mu = 12, br = 14, Ht = 3, pu = 2, mr = 1, fu = 0, ct = 1, pr = 2, hu = 3, yu = 1, Iu = 2, Gu = 1, Kn = {
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
    jsonFormat: 2,
    // LEGACY_BEST_EFFORT,
    enforceNamingStyle: 2
    // STYLE_LEGACY,
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
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 2
    // STYLE_LEGACY,
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
    jsonFormat: 1,
    // ALLOW,
    enforceNamingStyle: 2
    // STYLE_LEGACY,
  }
};
function fr(e, t) {
  var r, n;
  const a = {
    kind: "file",
    proto: e,
    deprecated: (n = (r = e.options) === null || r === void 0 ? void 0 : r.deprecated) !== null && n !== void 0 ? n : !1,
    edition: Xu(e),
    name: e.name.replace(/\.proto$/, ""),
    dependencies: Cu(e, t),
    enums: [],
    messages: [],
    extensions: [],
    services: [],
    toString() {
      return `file ${e.name}`;
    }
  }, l = /* @__PURE__ */ new Map(), u = {
    get(o) {
      return l.get(o);
    },
    add(o) {
      var s;
      T(((s = o.proto.options) === null || s === void 0 ? void 0 : s.mapEntry) === !0), l.set(o.typeName, o);
    }
  };
  for (const o of e.enumType)
    Mn(o, a, void 0, t);
  for (const o of e.messageType)
    Ln(o, a, void 0, t, u);
  for (const o of e.service)
    Zu(o, a, t);
  pt(a, t);
  for (const o of l.values())
    ft(o, t, u);
  for (const o of a.messages)
    ft(o, t, u), pt(o, t);
  t.addFile(a, !0);
}
function pt(e, t) {
  switch (e.kind) {
    case "file":
      for (const r of e.proto.extension) {
        const n = ht(r, e, t);
        e.extensions.push(n), t.add(n);
      }
      break;
    case "message":
      for (const r of e.proto.extension) {
        const n = ht(r, e, t);
        e.nestedExtensions.push(n), t.add(n);
      }
      for (const r of e.nestedMessages)
        pt(r, t);
      break;
  }
}
function ft(e, t, r) {
  const n = e.proto.oneofDecl.map((l) => Au(l, e)), a = /* @__PURE__ */ new Set();
  for (const l of e.proto.field) {
    const u = xu(l, n), o = ht(l, e, t, u, r);
    e.fields.push(o), e.field[o.localName] = o, u === void 0 ? e.members.push(o) : (u.fields.push(o), a.has(u) || (a.add(u), e.members.push(u)));
  }
  for (const l of n.filter((u) => a.has(u)))
    e.oneofs.push(l);
  for (const l of e.nestedMessages)
    ft(l, t, r);
}
function Mn(e, t, r, n) {
  var a, l, u, o, s;
  const d = Wu(e.name, e.value), g = {
    kind: "enum",
    proto: e,
    deprecated: (l = (a = e.options) === null || a === void 0 ? void 0 : a.deprecated) !== null && l !== void 0 ? l : !1,
    file: t,
    parent: r,
    open: !0,
    name: e.name,
    typeName: Te(e, r, t),
    value: {},
    values: [],
    sharedPrefix: d,
    toString() {
      return `enum ${this.typeName}`;
    }
  };
  g.open = Yu(g), n.add(g);
  for (const b of e.value) {
    const h = b.name;
    g.values.push(
      // biome-ignore lint/suspicious/noAssignInExpressions: no
      g.value[b.number] = {
        kind: "enum_value",
        proto: b,
        deprecated: (o = (u = b.options) === null || u === void 0 ? void 0 : u.deprecated) !== null && o !== void 0 ? o : !1,
        parent: g,
        name: h,
        localName: Be(d == null ? h : h.substring(d.length)),
        number: b.number,
        toString() {
          return `enum value ${g.typeName}.${h}`;
        }
      }
    );
  }
  ((s = r == null ? void 0 : r.nestedEnums) !== null && s !== void 0 ? s : t.enums).push(g);
}
function Ln(e, t, r, n, a) {
  var l, u, o, s;
  const d = {
    kind: "message",
    proto: e,
    deprecated: (u = (l = e.options) === null || l === void 0 ? void 0 : l.deprecated) !== null && u !== void 0 ? u : !1,
    file: t,
    parent: r,
    name: e.name,
    typeName: Te(e, r, t),
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
  ((o = e.options) === null || o === void 0 ? void 0 : o.mapEntry) === !0 ? a.add(d) : (((s = r == null ? void 0 : r.nestedMessages) !== null && s !== void 0 ? s : t.messages).push(d), n.add(d));
  for (const g of e.enumType)
    Mn(g, t, d, n);
  for (const g of e.nestedType)
    Ln(g, t, d, n, a);
}
function Zu(e, t, r) {
  var n, a;
  const l = {
    kind: "service",
    proto: e,
    deprecated: (a = (n = e.options) === null || n === void 0 ? void 0 : n.deprecated) !== null && a !== void 0 ? a : !1,
    file: t,
    name: e.name,
    typeName: Te(e, void 0, t),
    methods: [],
    method: {},
    toString() {
      return `service ${this.typeName}`;
    }
  };
  t.services.push(l), r.add(l);
  for (const u of e.method) {
    const o = Vu(u, l, r);
    l.methods.push(o), l.method[o.localName] = o;
  }
}
function Vu(e, t, r) {
  var n, a, l, u;
  let o;
  e.clientStreaming && e.serverStreaming ? o = "bidi_streaming" : e.clientStreaming ? o = "client_streaming" : e.serverStreaming ? o = "server_streaming" : o = "unary";
  const s = r.getMessage(te(e.inputType)), d = r.getMessage(te(e.outputType));
  T(s, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), T(d, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
  const g = e.name;
  return {
    kind: "rpc",
    proto: e,
    deprecated: (a = (n = e.options) === null || n === void 0 ? void 0 : n.deprecated) !== null && a !== void 0 ? a : !1,
    parent: t,
    name: g,
    localName: Be(g.length ? Be(g[0].toLowerCase() + g.substring(1)) : g),
    methodKind: o,
    input: s,
    output: d,
    idempotency: (u = (l = e.options) === null || l === void 0 ? void 0 : l.idempotencyLevel) !== null && u !== void 0 ? u : fu,
    toString() {
      return `rpc ${t.typeName}.${g}`;
    }
  };
}
function Au(e, t) {
  return {
    kind: "oneof",
    proto: e,
    deprecated: !1,
    parent: t,
    fields: [],
    name: e.name,
    localName: Be(We(e.name)),
    toString() {
      return `oneof ${t.typeName}.${this.name}`;
    }
  };
}
function ht(e, t, r, n, a) {
  var l, u, o;
  const s = a === void 0, d = {
    kind: "field",
    proto: e,
    deprecated: (u = (l = e.options) === null || l === void 0 ? void 0 : l.deprecated) !== null && u !== void 0 ? u : !1,
    name: e.name,
    number: e.number,
    scalar: void 0,
    message: void 0,
    enum: void 0,
    presence: Ru(e, n, s, t),
    listKind: void 0,
    mapKind: void 0,
    mapKey: void 0,
    delimitedEncoding: void 0,
    packed: void 0,
    longAsString: !1,
    getDefaultValue: void 0
  };
  if (s) {
    const c = t.kind == "file" ? t : t.file, p = t.kind == "file" ? void 0 : t, m = Te(e, p, c);
    d.kind = "extension", d.file = c, d.parent = p, d.oneof = void 0, d.typeName = m, d.jsonName = `[${m}]`, d.toString = () => `extension ${m}`;
    const y = r.getMessage(te(e.extendee));
    T(y, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), d.extendee = y;
  } else {
    const c = t;
    T(c.kind == "message"), d.parent = c, d.oneof = n, d.localName = n ? We(e.name) : Be(We(e.name)), d.jsonName = e.jsonName, d.toString = () => `field ${c.typeName}.${e.name}`;
  }
  const g = e.label, b = e.type, h = (o = e.options) === null || o === void 0 ? void 0 : o.jstype;
  if (g === Ht) {
    const c = b == Ae ? a == null ? void 0 : a.get(te(e.typeName)) : void 0;
    if (c) {
      d.fieldKind = "map";
      const { key: p, value: m } = Su(c);
      return d.mapKey = p.scalar, d.mapKind = m.fieldKind, d.message = m.message, d.delimitedEncoding = !1, d.enum = m.enum, d.scalar = m.scalar, d;
    }
    switch (d.fieldKind = "list", b) {
      case Ae:
      case xe:
        d.listKind = "message", d.message = r.getMessage(te(e.typeName)), T(d.message), d.delimitedEncoding = hr(e, t);
        break;
      case br:
        d.listKind = "enum", d.enum = r.getEnum(te(e.typeName)), T(d.enum);
        break;
      default:
        d.listKind = "scalar", d.scalar = b, d.longAsString = h == mr;
        break;
    }
    return d.packed = Ju(e, t), d;
  }
  switch (b) {
    case Ae:
    case xe:
      d.fieldKind = "message", d.message = r.getMessage(te(e.typeName)), T(d.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), d.delimitedEncoding = hr(e, t), d.getDefaultValue = () => {
      };
      break;
    case br: {
      const c = r.getEnum(te(e.typeName));
      T(c !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), d.fieldKind = "enum", d.enum = r.getEnum(te(e.typeName)), d.getDefaultValue = () => Ce(e, "defaultValue") ? ou(c, e.defaultValue) : void 0;
      break;
    }
    default: {
      d.fieldKind = "scalar", d.scalar = b, d.longAsString = h == mr, d.getDefaultValue = () => Ce(e, "defaultValue") ? su(b, e.defaultValue) : void 0;
      break;
    }
  }
  return d;
}
function Xu(e) {
  switch (e.syntax) {
    case "":
    case "proto2":
      return cu;
    case "proto3":
      return gu;
    case "editions":
      if (e.edition in Kn)
        return e.edition;
      throw new Error(`${e.name}: unsupported edition`);
    default:
      throw new Error(`${e.name}: unsupported syntax "${e.syntax}"`);
  }
}
function Cu(e, t) {
  return e.dependency.map((r) => {
    const n = t.getFile(r);
    if (!n)
      throw new Error(`Cannot find ${r}, imported by ${e.name}`);
    return n;
  });
}
function Wu(e, t) {
  const r = Bu(e) + "_";
  for (const n of t) {
    if (!n.name.toLowerCase().startsWith(r))
      return;
    const a = n.name.substring(r.length);
    if (a.length == 0 || /^\d/.test(a))
      return;
  }
  return r;
}
function Bu(e) {
  return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (t) => "_" + t)).toLowerCase();
}
function Te(e, t, r) {
  let n;
  return t ? n = `${t.typeName}.${e.name}` : r.proto.package.length > 0 ? n = `${r.proto.package}.${e.name}` : n = `${e.name}`, n;
}
function te(e) {
  return e.startsWith(".") ? e.substring(1) : e;
}
function xu(e, t) {
  if (!Ce(e, "oneofIndex") || e.proto3Optional)
    return;
  const r = t[e.oneofIndex];
  return T(r, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), r;
}
function Ru(e, t, r, n) {
  if (e.label == pu)
    return hu;
  if (e.label == Ht)
    return pr;
  if (t || e.proto3Optional || r)
    return ct;
  const a = he("fieldPresence", { proto: e, parent: n });
  return a == pr && (e.type == Ae || e.type == xe) ? ct : a;
}
function Ju(e, t) {
  if (e.label != Ht)
    return !1;
  switch (e.type) {
    case bu:
    case mu:
    case xe:
    case Ae:
      return !1;
  }
  const r = e.options;
  return r && Ce(r, "packed") ? r.packed : yu == he("repeatedFieldEncoding", {
    proto: e,
    parent: t
  });
}
function Su(e) {
  const t = e.fields.find((n) => n.number === 1), r = e.fields.find((n) => n.number === 2);
  return T(t && t.fieldKind == "scalar" && t.scalar != i.BYTES && t.scalar != i.FLOAT && t.scalar != i.DOUBLE && r && r.fieldKind != "list" && r.fieldKind != "map"), { key: t, value: r };
}
function Yu(e) {
  var t;
  return Gu == he("enumType", {
    proto: e.proto,
    parent: (t = e.parent) !== null && t !== void 0 ? t : e.file
  });
}
function hr(e, t) {
  return e.type == xe ? !0 : Iu == he("messageEncoding", {
    proto: e,
    parent: t
  });
}
function he(e, t) {
  var r, n;
  const a = (r = t.proto.options) === null || r === void 0 ? void 0 : r.features;
  if (a) {
    const l = a[e];
    if (l != 0)
      return l;
  }
  if ("kind" in t) {
    if (t.kind == "message")
      return he(e, (n = t.parent) !== null && n !== void 0 ? n : t.file);
    const l = Kn[t.edition];
    if (!l)
      throw new Error(`feature default for edition ${t.edition} not found`);
    return l[e];
  }
  return he(e, t.parent);
}
function T(e, t) {
  if (!e)
    throw new Error(t);
}
function Fu(e) {
  const t = ku(e);
  return t.messageType.forEach(zt), vn(t, () => {
  }).getFile(t.name);
}
function ku(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    syntax: "",
    edition: 0
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FileDescriptorProto", dependency: [], publicDependency: [], weakDependency: [], service: [], extension: [] }, e), { messageType: e.messageType.map(Un), enumType: e.enumType.map(Qn) }));
}
function Un(e) {
  var t, r, n, a, l, u, o, s;
  return {
    $typeName: "google.protobuf.DescriptorProto",
    name: e.name,
    field: (r = (t = e.field) === null || t === void 0 ? void 0 : t.map(wu)) !== null && r !== void 0 ? r : [],
    extension: [],
    nestedType: (a = (n = e.nestedType) === null || n === void 0 ? void 0 : n.map(Un)) !== null && a !== void 0 ? a : [],
    enumType: (u = (l = e.enumType) === null || l === void 0 ? void 0 : l.map(Qn)) !== null && u !== void 0 ? u : [],
    extensionRange: (s = (o = e.extensionRange) === null || o === void 0 ? void 0 : o.map((d) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, d))) !== null && s !== void 0 ? s : [],
    oneofDecl: [],
    reservedRange: [],
    reservedName: []
  };
}
function wu(e) {
  return Object.assign(/* @__PURE__ */ Object.create({
    label: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    proto3Optional: !1
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? Eu(e.options) : void 0 }));
}
function Eu(e) {
  var t, r, n;
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
  }), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), { targets: (t = e.targets) !== null && t !== void 0 ? t : [], editionDefaults: (n = (r = e.editionDefaults) === null || r === void 0 ? void 0 : r.map((l) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, l))) !== null && n !== void 0 ? n : [], uninterpretedOption: [] }));
}
function Qn(e) {
  return {
    $typeName: "google.protobuf.EnumDescriptorProto",
    name: e.name,
    reservedName: [],
    reservedRange: [],
    value: e.value.map((t) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, t))
  };
}
function Fe(e, t, ...r) {
  return r.reduce((n, a) => n.nestedMessages[a], e.messages[t]);
}
const vt = /* @__PURE__ */ Fu({ name: "google/protobuf/descriptor.proto", package: "google.protobuf", messageType: [{ name: "FileDescriptorSet", field: [{ name: "file", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FileDescriptorProto" }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "FileDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "package", number: 2, type: 9, label: 1 }, { name: "dependency", number: 3, type: 9, label: 3 }, { name: "public_dependency", number: 10, type: 5, label: 3 }, { name: "weak_dependency", number: 11, type: 5, label: 3 }, { name: "message_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 5, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "service", number: 6, type: 11, label: 3, typeName: ".google.protobuf.ServiceDescriptorProto" }, { name: "extension", number: 7, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FileOptions" }, { name: "source_code_info", number: 9, type: 11, label: 1, typeName: ".google.protobuf.SourceCodeInfo" }, { name: "syntax", number: 12, type: 9, label: 1 }, { name: "edition", number: 14, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }, { name: "DescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "field", number: 2, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "extension", number: 6, type: 11, label: 3, typeName: ".google.protobuf.FieldDescriptorProto" }, { name: "nested_type", number: 3, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto" }, { name: "enum_type", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto" }, { name: "extension_range", number: 5, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ExtensionRange" }, { name: "oneof_decl", number: 8, type: 11, label: 3, typeName: ".google.protobuf.OneofDescriptorProto" }, { name: "options", number: 7, type: 11, label: 1, typeName: ".google.protobuf.MessageOptions" }, { name: "reserved_range", number: 9, type: 11, label: 3, typeName: ".google.protobuf.DescriptorProto.ReservedRange" }, { name: "reserved_name", number: 10, type: 9, label: 3 }], nestedType: [{ name: "ExtensionRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions" }] }, { name: "ReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "ExtensionRangeOptions", field: [{ name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }, { name: "declaration", number: 2, type: 11, label: 3, typeName: ".google.protobuf.ExtensionRangeOptions.Declaration", options: { retention: 2 } }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "verification", number: 3, type: 14, label: 1, typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState", defaultValue: "UNVERIFIED", options: { retention: 2 } }], nestedType: [{ name: "Declaration", field: [{ name: "number", number: 1, type: 5, label: 1 }, { name: "full_name", number: 2, type: 9, label: 1 }, { name: "type", number: 3, type: 9, label: 1 }, { name: "reserved", number: 5, type: 8, label: 1 }, { name: "repeated", number: 6, type: 8, label: 1 }] }], enumType: [{ name: "VerificationState", value: [{ name: "DECLARATION", number: 0 }, { name: "UNVERIFIED", number: 1 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 3, type: 5, label: 1 }, { name: "label", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Label" }, { name: "type", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FieldDescriptorProto.Type" }, { name: "type_name", number: 6, type: 9, label: 1 }, { name: "extendee", number: 2, type: 9, label: 1 }, { name: "default_value", number: 7, type: 9, label: 1 }, { name: "oneof_index", number: 9, type: 5, label: 1 }, { name: "json_name", number: 10, type: 9, label: 1 }, { name: "options", number: 8, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions" }, { name: "proto3_optional", number: 17, type: 8, label: 1 }], enumType: [{ name: "Type", value: [{ name: "TYPE_DOUBLE", number: 1 }, { name: "TYPE_FLOAT", number: 2 }, { name: "TYPE_INT64", number: 3 }, { name: "TYPE_UINT64", number: 4 }, { name: "TYPE_INT32", number: 5 }, { name: "TYPE_FIXED64", number: 6 }, { name: "TYPE_FIXED32", number: 7 }, { name: "TYPE_BOOL", number: 8 }, { name: "TYPE_STRING", number: 9 }, { name: "TYPE_GROUP", number: 10 }, { name: "TYPE_MESSAGE", number: 11 }, { name: "TYPE_BYTES", number: 12 }, { name: "TYPE_UINT32", number: 13 }, { name: "TYPE_ENUM", number: 14 }, { name: "TYPE_SFIXED32", number: 15 }, { name: "TYPE_SFIXED64", number: 16 }, { name: "TYPE_SINT32", number: 17 }, { name: "TYPE_SINT64", number: 18 }] }, { name: "Label", value: [{ name: "LABEL_OPTIONAL", number: 1 }, { name: "LABEL_REPEATED", number: 3 }, { name: "LABEL_REQUIRED", number: 2 }] }] }, { name: "OneofDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "options", number: 2, type: 11, label: 1, typeName: ".google.protobuf.OneofOptions" }] }, { name: "EnumDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "value", number: 2, type: 11, label: 3, typeName: ".google.protobuf.EnumValueDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumOptions" }, { name: "reserved_range", number: 4, type: 11, label: 3, typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange" }, { name: "reserved_name", number: 5, type: 9, label: 3 }], nestedType: [{ name: "EnumReservedRange", field: [{ name: "start", number: 1, type: 5, label: 1 }, { name: "end", number: 2, type: 5, label: 1 }] }] }, { name: "EnumValueDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "number", number: 2, type: 5, label: 1 }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.EnumValueOptions" }] }, { name: "ServiceDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "method", number: 2, type: 11, label: 3, typeName: ".google.protobuf.MethodDescriptorProto" }, { name: "options", number: 3, type: 11, label: 1, typeName: ".google.protobuf.ServiceOptions" }] }, { name: "MethodDescriptorProto", field: [{ name: "name", number: 1, type: 9, label: 1 }, { name: "input_type", number: 2, type: 9, label: 1 }, { name: "output_type", number: 3, type: 9, label: 1 }, { name: "options", number: 4, type: 11, label: 1, typeName: ".google.protobuf.MethodOptions" }, { name: "client_streaming", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "server_streaming", number: 6, type: 8, label: 1, defaultValue: "false" }] }, { name: "FileOptions", field: [{ name: "java_package", number: 1, type: 9, label: 1 }, { name: "java_outer_classname", number: 8, type: 9, label: 1 }, { name: "java_multiple_files", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "java_generate_equals_and_hash", number: 20, type: 8, label: 1, options: { deprecated: !0 } }, { name: "java_string_check_utf8", number: 27, type: 8, label: 1, defaultValue: "false" }, { name: "optimize_for", number: 9, type: 14, label: 1, typeName: ".google.protobuf.FileOptions.OptimizeMode", defaultValue: "SPEED" }, { name: "go_package", number: 11, type: 9, label: 1 }, { name: "cc_generic_services", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "java_generic_services", number: 17, type: 8, label: 1, defaultValue: "false" }, { name: "py_generic_services", number: 18, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 23, type: 8, label: 1, defaultValue: "false" }, { name: "cc_enable_arenas", number: 31, type: 8, label: 1, defaultValue: "true" }, { name: "objc_class_prefix", number: 36, type: 9, label: 1 }, { name: "csharp_namespace", number: 37, type: 9, label: 1 }, { name: "swift_prefix", number: 39, type: 9, label: 1 }, { name: "php_class_prefix", number: 40, type: 9, label: 1 }, { name: "php_namespace", number: 41, type: 9, label: 1 }, { name: "php_metadata_namespace", number: 44, type: 9, label: 1 }, { name: "ruby_package", number: 45, type: 9, label: 1 }, { name: "features", number: 50, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "OptimizeMode", value: [{ name: "SPEED", number: 1 }, { name: "CODE_SIZE", number: 2 }, { name: "LITE_RUNTIME", number: 3 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MessageOptions", field: [{ name: "message_set_wire_format", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "no_standard_descriptor_accessor", number: 2, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "map_entry", number: 7, type: 8, label: 1 }, { name: "deprecated_legacy_json_field_conflicts", number: 11, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 12, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "FieldOptions", field: [{ name: "ctype", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.CType", defaultValue: "STRING" }, { name: "packed", number: 2, type: 8, label: 1 }, { name: "jstype", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.JSType", defaultValue: "JS_NORMAL" }, { name: "lazy", number: 5, type: 8, label: 1, defaultValue: "false" }, { name: "unverified_lazy", number: 15, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "weak", number: 10, type: 8, label: 1, defaultValue: "false" }, { name: "debug_redact", number: 16, type: 8, label: 1, defaultValue: "false" }, { name: "retention", number: 17, type: 14, label: 1, typeName: ".google.protobuf.FieldOptions.OptionRetention" }, { name: "targets", number: 19, type: 14, label: 3, typeName: ".google.protobuf.FieldOptions.OptionTargetType" }, { name: "edition_defaults", number: 20, type: 11, label: 3, typeName: ".google.protobuf.FieldOptions.EditionDefault" }, { name: "features", number: 21, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "feature_support", number: 22, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], nestedType: [{ name: "EditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "value", number: 2, type: 9, label: 1 }] }, { name: "FeatureSupport", field: [{ name: "edition_introduced", number: 1, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "edition_deprecated", number: 2, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "deprecation_warning", number: 3, type: 9, label: 1 }, { name: "edition_removed", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }] }], enumType: [{ name: "CType", value: [{ name: "STRING", number: 0 }, { name: "CORD", number: 1 }, { name: "STRING_PIECE", number: 2 }] }, { name: "JSType", value: [{ name: "JS_NORMAL", number: 0 }, { name: "JS_STRING", number: 1 }, { name: "JS_NUMBER", number: 2 }] }, { name: "OptionRetention", value: [{ name: "RETENTION_UNKNOWN", number: 0 }, { name: "RETENTION_RUNTIME", number: 1 }, { name: "RETENTION_SOURCE", number: 2 }] }, { name: "OptionTargetType", value: [{ name: "TARGET_TYPE_UNKNOWN", number: 0 }, { name: "TARGET_TYPE_FILE", number: 1 }, { name: "TARGET_TYPE_EXTENSION_RANGE", number: 2 }, { name: "TARGET_TYPE_MESSAGE", number: 3 }, { name: "TARGET_TYPE_FIELD", number: 4 }, { name: "TARGET_TYPE_ONEOF", number: 5 }, { name: "TARGET_TYPE_ENUM", number: 6 }, { name: "TARGET_TYPE_ENUM_ENTRY", number: 7 }, { name: "TARGET_TYPE_SERVICE", number: 8 }, { name: "TARGET_TYPE_METHOD", number: 9 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "OneofOptions", field: [{ name: "features", number: 1, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumOptions", field: [{ name: "allow_alias", number: 2, type: 8, label: 1 }, { name: "deprecated", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "deprecated_legacy_json_field_conflicts", number: 6, type: 8, label: 1, options: { deprecated: !0 } }, { name: "features", number: 7, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "EnumValueOptions", field: [{ name: "deprecated", number: 1, type: 8, label: 1, defaultValue: "false" }, { name: "features", number: 2, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "debug_redact", number: 3, type: 8, label: 1, defaultValue: "false" }, { name: "feature_support", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FieldOptions.FeatureSupport" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "ServiceOptions", field: [{ name: "features", number: 34, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "MethodOptions", field: [{ name: "deprecated", number: 33, type: 8, label: 1, defaultValue: "false" }, { name: "idempotency_level", number: 34, type: 14, label: 1, typeName: ".google.protobuf.MethodOptions.IdempotencyLevel", defaultValue: "IDEMPOTENCY_UNKNOWN" }, { name: "features", number: 35, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "uninterpreted_option", number: 999, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption" }], enumType: [{ name: "IdempotencyLevel", value: [{ name: "IDEMPOTENCY_UNKNOWN", number: 0 }, { name: "NO_SIDE_EFFECTS", number: 1 }, { name: "IDEMPOTENT", number: 2 }] }], extensionRange: [{ start: 1e3, end: 536870912 }] }, { name: "UninterpretedOption", field: [{ name: "name", number: 2, type: 11, label: 3, typeName: ".google.protobuf.UninterpretedOption.NamePart" }, { name: "identifier_value", number: 3, type: 9, label: 1 }, { name: "positive_int_value", number: 4, type: 4, label: 1 }, { name: "negative_int_value", number: 5, type: 3, label: 1 }, { name: "double_value", number: 6, type: 1, label: 1 }, { name: "string_value", number: 7, type: 12, label: 1 }, { name: "aggregate_value", number: 8, type: 9, label: 1 }], nestedType: [{ name: "NamePart", field: [{ name: "name_part", number: 1, type: 9, label: 2 }, { name: "is_extension", number: 2, type: 8, label: 2 }] }] }, { name: "FeatureSet", field: [{ name: "field_presence", number: 1, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.FieldPresence", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPLICIT", edition: 900 }, { value: "IMPLICIT", edition: 999 }, { value: "EXPLICIT", edition: 1e3 }] } }, { name: "enum_type", number: 2, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnumType", options: { retention: 1, targets: [6, 1], editionDefaults: [{ value: "CLOSED", edition: 900 }, { value: "OPEN", edition: 999 }] } }, { name: "repeated_field_encoding", number: 3, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "EXPANDED", edition: 900 }, { value: "PACKED", edition: 999 }] } }, { name: "utf8_validation", number: 4, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.Utf8Validation", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "NONE", edition: 900 }, { value: "VERIFY", edition: 999 }] } }, { name: "message_encoding", number: 5, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.MessageEncoding", options: { retention: 1, targets: [4, 1], editionDefaults: [{ value: "LENGTH_PREFIXED", edition: 900 }] } }, { name: "json_format", number: 6, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.JsonFormat", options: { retention: 1, targets: [3, 6, 1], editionDefaults: [{ value: "LEGACY_BEST_EFFORT", edition: 900 }, { value: "ALLOW", edition: 999 }] } }, { name: "enforce_naming_style", number: 7, type: 14, label: 1, typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle", options: { retention: 2, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9], editionDefaults: [{ value: "STYLE_LEGACY", edition: 900 }, { value: "STYLE2024", edition: 1001 }] } }], enumType: [{ name: "FieldPresence", value: [{ name: "FIELD_PRESENCE_UNKNOWN", number: 0 }, { name: "EXPLICIT", number: 1 }, { name: "IMPLICIT", number: 2 }, { name: "LEGACY_REQUIRED", number: 3 }] }, { name: "EnumType", value: [{ name: "ENUM_TYPE_UNKNOWN", number: 0 }, { name: "OPEN", number: 1 }, { name: "CLOSED", number: 2 }] }, { name: "RepeatedFieldEncoding", value: [{ name: "REPEATED_FIELD_ENCODING_UNKNOWN", number: 0 }, { name: "PACKED", number: 1 }, { name: "EXPANDED", number: 2 }] }, { name: "Utf8Validation", value: [{ name: "UTF8_VALIDATION_UNKNOWN", number: 0 }, { name: "VERIFY", number: 2 }, { name: "NONE", number: 3 }] }, { name: "MessageEncoding", value: [{ name: "MESSAGE_ENCODING_UNKNOWN", number: 0 }, { name: "LENGTH_PREFIXED", number: 1 }, { name: "DELIMITED", number: 2 }] }, { name: "JsonFormat", value: [{ name: "JSON_FORMAT_UNKNOWN", number: 0 }, { name: "ALLOW", number: 1 }, { name: "LEGACY_BEST_EFFORT", number: 2 }] }, { name: "EnforceNamingStyle", value: [{ name: "ENFORCE_NAMING_STYLE_UNKNOWN", number: 0 }, { name: "STYLE2024", number: 1 }, { name: "STYLE_LEGACY", number: 2 }] }], extensionRange: [{ start: 1e3, end: 9995 }, { start: 9995, end: 1e4 }, { start: 1e4, end: 10001 }] }, { name: "FeatureSetDefaults", field: [{ name: "defaults", number: 1, type: 11, label: 3, typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault" }, { name: "minimum_edition", number: 4, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "maximum_edition", number: 5, type: 14, label: 1, typeName: ".google.protobuf.Edition" }], nestedType: [{ name: "FeatureSetEditionDefault", field: [{ name: "edition", number: 3, type: 14, label: 1, typeName: ".google.protobuf.Edition" }, { name: "overridable_features", number: 4, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }, { name: "fixed_features", number: 5, type: 11, label: 1, typeName: ".google.protobuf.FeatureSet" }] }] }, { name: "SourceCodeInfo", field: [{ name: "location", number: 1, type: 11, label: 3, typeName: ".google.protobuf.SourceCodeInfo.Location" }], nestedType: [{ name: "Location", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "span", number: 2, type: 5, label: 3, options: { packed: !0 } }, { name: "leading_comments", number: 3, type: 9, label: 1 }, { name: "trailing_comments", number: 4, type: 9, label: 1 }, { name: "leading_detached_comments", number: 6, type: 9, label: 3 }] }], extensionRange: [{ start: 536e6, end: 536000001 }] }, { name: "GeneratedCodeInfo", field: [{ name: "annotation", number: 1, type: 11, label: 3, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation" }], nestedType: [{ name: "Annotation", field: [{ name: "path", number: 1, type: 5, label: 3, options: { packed: !0 } }, { name: "source_file", number: 2, type: 9, label: 1 }, { name: "begin", number: 3, type: 5, label: 1 }, { name: "end", number: 4, type: 5, label: 1 }, { name: "semantic", number: 5, type: 14, label: 1, typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic" }], enumType: [{ name: "Semantic", value: [{ name: "NONE", number: 0 }, { name: "SET", number: 1 }, { name: "ALIAS", number: 2 }] }] }] }], enumType: [{ name: "Edition", value: [{ name: "EDITION_UNKNOWN", number: 0 }, { name: "EDITION_LEGACY", number: 900 }, { name: "EDITION_PROTO2", number: 998 }, { name: "EDITION_PROTO3", number: 999 }, { name: "EDITION_2023", number: 1e3 }, { name: "EDITION_2024", number: 1001 }, { name: "EDITION_1_TEST_ONLY", number: 1 }, { name: "EDITION_2_TEST_ONLY", number: 2 }, { name: "EDITION_99997_TEST_ONLY", number: 99997 }, { name: "EDITION_99998_TEST_ONLY", number: 99998 }, { name: "EDITION_99999_TEST_ONLY", number: 99999 }, { name: "EDITION_MAX", number: 2147483647 }] }] }), Nu = /* @__PURE__ */ Fe(vt, 1);
var yr;
(function(e) {
  e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(yr || (yr = {}));
var Ir;
(function(e) {
  e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(Ir || (Ir = {}));
var Gr;
(function(e) {
  e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(Gr || (Gr = {}));
var Zr;
(function(e) {
  e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(Zr || (Zr = {}));
var Vr;
(function(e) {
  e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(Vr || (Vr = {}));
var Ar;
(function(e) {
  e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(Ar || (Ar = {}));
var Xr;
(function(e) {
  e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(Xr || (Xr = {}));
var Cr;
(function(e) {
  e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(Cr || (Cr = {}));
var yt;
(function(e) {
  e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(yt || (yt = {}));
var Wr;
(function(e) {
  e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(Wr || (Wr = {}));
var Br;
(function(e) {
  e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(Br || (Br = {}));
var xr;
(function(e) {
  e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(xr || (xr = {}));
var Rr;
(function(e) {
  e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(Rr || (Rr = {}));
var Jr;
(function(e) {
  e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(Jr || (Jr = {}));
var Sr;
(function(e) {
  e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(Sr || (Sr = {}));
var Yr;
(function(e) {
  e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(Yr || (Yr = {}));
var Fr;
(function(e) {
  e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Fr || (Fr = {}));
var kr;
(function(e) {
  e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 2147483647] = "EDITION_MAX";
})(kr || (kr = {}));
const wr = {
  readUnknownFields: !0
};
function zu(e) {
  return e ? Object.assign(Object.assign({}, wr), e) : wr;
}
function Pe(e, t, r) {
  const n = U(e, void 0, !1);
  return _n(n, new St(t), zu(r), !1, t.byteLength), n.message;
}
function _n(e, t, r, n, a) {
  var l;
  const u = n ? t.len : t.pos + a;
  let o, s;
  const d = (l = e.getUnknown()) !== null && l !== void 0 ? l : [];
  for (; t.pos < u && ([o, s] = t.tag(), !(n && s == R.EndGroup)); ) {
    const g = e.findNumber(o);
    if (!g) {
      const b = t.skip(s, o);
      r.readUnknownFields && d.push({ no: o, wireType: s, data: b });
      continue;
    }
    Dn(e, t, g, s, r);
  }
  if (n && (s != R.EndGroup || o !== a))
    throw new Error("invalid end group tag");
  d.length > 0 && e.setUnknown(d);
}
function Dn(e, t, r, n, a) {
  switch (r.fieldKind) {
    case "scalar":
      e.set(r, ye(t, r.scalar));
      break;
    case "enum":
      e.set(r, ye(t, i.INT32));
      break;
    case "message":
      e.set(r, Kt(t, a, r, e.get(r)));
      break;
    case "list":
      vu(t, n, e.get(r), a);
      break;
    case "map":
      Hu(t, e.get(r), a);
      break;
  }
}
function Hu(e, t, r) {
  const n = t.field();
  let a, l;
  const u = e.pos + e.uint32();
  for (; e.pos < u; ) {
    const [o] = e.tag();
    switch (o) {
      case 1:
        a = ye(e, n.mapKey);
        break;
      case 2:
        switch (n.mapKind) {
          case "scalar":
            l = ye(e, n.scalar);
            break;
          case "enum":
            l = e.int32();
            break;
          case "message":
            l = Kt(e, r, n);
            break;
        }
        break;
    }
  }
  if (a === void 0 && (a = be(n.mapKey, !1)), l === void 0)
    switch (n.mapKind) {
      case "scalar":
        l = be(n.scalar, !1);
        break;
      case "enum":
        l = n.enum.values[0].number;
        break;
      case "message":
        l = U(n.message, void 0, !1);
        break;
    }
  t.set(a, l);
}
function vu(e, t, r, n) {
  var a;
  const l = r.field();
  if (l.listKind === "message") {
    r.add(Kt(e, n, l));
    return;
  }
  const u = (a = l.scalar) !== null && a !== void 0 ? a : i.INT32;
  if (!(t == R.LengthDelimited && u != i.STRING && u != i.BYTES)) {
    r.add(ye(e, u));
    return;
  }
  const s = e.uint32() + e.pos;
  for (; e.pos < s; )
    r.add(ye(e, u));
}
function Kt(e, t, r, n) {
  const a = r.delimitedEncoding, l = n ?? U(r.message, void 0, !1);
  return _n(l, e, t, a, a ? r.number : e.uint32()), l;
}
function ye(e, t) {
  switch (t) {
    case i.STRING:
      return e.string();
    case i.BOOL:
      return e.bool();
    case i.DOUBLE:
      return e.double();
    case i.FLOAT:
      return e.float();
    case i.INT32:
      return e.int32();
    case i.INT64:
      return e.int64();
    case i.UINT64:
      return e.uint64();
    case i.FIXED64:
      return e.fixed64();
    case i.BYTES:
      return e.bytes();
    case i.FIXED32:
      return e.fixed32();
    case i.SFIXED32:
      return e.sfixed32();
    case i.SFIXED64:
      return e.sfixed64();
    case i.SINT64:
      return e.sint64();
    case i.UINT32:
      return e.uint32();
    case i.SINT32:
      return e.sint32();
  }
}
function x(e, t) {
  var r;
  const n = Pe(Nu, Nt(e));
  return n.messageType.forEach(zt), n.dependency = (r = t == null ? void 0 : t.map((l) => l.proto.name)) !== null && r !== void 0 ? r : [], vn(n, (l) => t == null ? void 0 : t.find((u) => u.proto.name === l)).getFile(n.name);
}
const Ze = /* @__PURE__ */ x("Ch9nb29nbGUvcHJvdG9idWYvdGltZXN0YW1wLnByb3RvEg9nb29nbGUucHJvdG9idWYiKwoJVGltZXN0YW1wEg8KB3NlY29uZHMYASABKAMSDQoFbmFub3MYAiABKAVChQEKE2NvbS5nb29nbGUucHJvdG9idWZCDlRpbWVzdGFtcFByb3RvUAFaMmdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3RpbWVzdGFtcHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), Ku = /* @__PURE__ */ x("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), Mu = /* @__PURE__ */ Fe(Ku, 0), Lu = 3, Er = {
  writeUnknownFields: !0
};
function Uu(e) {
  return e ? Object.assign(Object.assign({}, Er), e) : Er;
}
function Tn(e, t, r) {
  return Qe(new xn(), Uu(r), U(e, t)).finish();
}
function Qe(e, t, r) {
  var n;
  for (const a of r.sortedFields) {
    if (!r.isSet(a)) {
      if (a.presence == Lu)
        throw new Error(`cannot encode ${a} to binary: required field not set`);
      continue;
    }
    Pn(e, t, r, a);
  }
  if (t.writeUnknownFields)
    for (const { no: a, wireType: l, data: u } of (n = r.getUnknown()) !== null && n !== void 0 ? n : [])
      e.tag(a, l).raw(u);
  return e;
}
function Pn(e, t, r, n) {
  var a;
  switch (n.fieldKind) {
    case "scalar":
    case "enum":
      _e(e, r.desc.typeName, n.name, (a = n.scalar) !== null && a !== void 0 ? a : i.INT32, n.number, r.get(n));
      break;
    case "list":
      Qu(e, t, n, r.get(n));
      break;
    case "message":
      jn(e, t, n, r.get(n));
      break;
    case "map":
      for (const [l, u] of r.get(n))
        _u(e, t, n, l, u);
      break;
  }
}
function _e(e, t, r, n, a, l) {
  On(e.tag(a, Du(n)), t, r, n, l);
}
function jn(e, t, r, n) {
  r.delimitedEncoding ? Qe(e.tag(r.number, R.StartGroup), t, n).tag(r.number, R.EndGroup) : Qe(e.tag(r.number, R.LengthDelimited).fork(), t, n).join();
}
function Qu(e, t, r, n) {
  var a;
  if (r.listKind == "message") {
    for (const u of n)
      jn(e, t, r, u);
    return;
  }
  const l = (a = r.scalar) !== null && a !== void 0 ? a : i.INT32;
  if (r.packed) {
    if (!n.size)
      return;
    e.tag(r.number, R.LengthDelimited).fork();
    for (const u of n)
      On(e, r.parent.typeName, r.name, l, u);
    e.join();
    return;
  }
  for (const u of n)
    _e(e, r.parent.typeName, r.name, l, r.number, u);
}
function _u(e, t, r, n, a) {
  var l;
  switch (e.tag(r.number, R.LengthDelimited).fork(), _e(e, r.parent.typeName, r.name, r.mapKey, 1, n), r.mapKind) {
    case "scalar":
    case "enum":
      _e(e, r.parent.typeName, r.name, (l = r.scalar) !== null && l !== void 0 ? l : i.INT32, 2, a);
      break;
    case "message":
      Qe(e.tag(2, R.LengthDelimited).fork(), t, a).join();
      break;
  }
  e.join();
}
function On(e, t, r, n, a) {
  try {
    switch (n) {
      case i.STRING:
        e.string(a);
        break;
      case i.BOOL:
        e.bool(a);
        break;
      case i.DOUBLE:
        e.double(a);
        break;
      case i.FLOAT:
        e.float(a);
        break;
      case i.INT32:
        e.int32(a);
        break;
      case i.INT64:
        e.int64(a);
        break;
      case i.UINT64:
        e.uint64(a);
        break;
      case i.FIXED64:
        e.fixed64(a);
        break;
      case i.BYTES:
        e.bytes(a);
        break;
      case i.FIXED32:
        e.fixed32(a);
        break;
      case i.SFIXED32:
        e.sfixed32(a);
        break;
      case i.SFIXED64:
        e.sfixed64(a);
        break;
      case i.SINT64:
        e.sint64(a);
        break;
      case i.UINT32:
        e.uint32(a);
        break;
      case i.SINT32:
        e.sint32(a);
        break;
    }
  } catch (l) {
    throw l instanceof Error ? new Error(`cannot encode field ${t}.${r} to binary: ${l.message}`) : l;
  }
}
function Du(e) {
  switch (e) {
    case i.BYTES:
    case i.STRING:
      return R.LengthDelimited;
    case i.DOUBLE:
    case i.FIXED64:
    case i.SFIXED64:
      return R.Bit64;
    case i.FIXED32:
    case i.SFIXED32:
    case i.FLOAT:
      return R.Bit32;
    default:
      return R.Varint;
  }
}
function Tu(e, t, r) {
  let n = !1;
  return r || (r = j(Mu), n = !0), r.value = Tn(e, t), r.typeUrl = Ou(t.$typeName), n ? r : void 0;
}
function Pu(e, t) {
  if (e.typeUrl === "")
    return !1;
  const r = typeof t == "string" ? t : t.typeName, n = $n(e.typeUrl);
  return r === n;
}
function ju(e, t) {
  if (e.typeUrl === "")
    return;
  const r = t.kind == "message" ? t : t.getMessage($n(e.typeUrl));
  if (!(!r || !Pu(e, r)))
    return Pe(r, e.value);
}
function Ou(e) {
  return `type.googleapis.com/${e}`;
}
function $n(e) {
  const t = e.lastIndexOf("/"), r = t >= 0 ? e.substring(t + 1) : e;
  if (!r.length)
    throw new Error(`invalid type url: ${e}`);
  return r;
}
const $u = /* @__PURE__ */ x("Ch5nb29nbGUvcHJvdG9idWYvZHVyYXRpb24ucHJvdG8SD2dvb2dsZS5wcm90b2J1ZiIqCghEdXJhdGlvbhIPCgdzZWNvbmRzGAEgASgDEg0KBW5hbm9zGAIgASgFQoMBChNjb20uZ29vZ2xlLnByb3RvYnVmQg1EdXJhdGlvblByb3RvUAFaMWdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2R1cmF0aW9ucGL4AQGiAgNHUEKqAh5Hb29nbGUuUHJvdG9idWYuV2VsbEtub3duVHlwZXNiBnByb3RvMw"), Mt = /* @__PURE__ */ x("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), qu = /* @__PURE__ */ Fe(Mt, 0), qn = /* @__PURE__ */ Fe(Mt, 1), eo = /* @__PURE__ */ Fe(Mt, 2);
var It;
(function(e) {
  e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(It || (It = {}));
function to(e, t) {
  ea(t, e);
  const r = no(e.$unknown, t), [n, a, l] = je(t);
  for (const u of r)
    Dn(n, new St(u.data), a, u.wireType, {
      readUnknownFields: !0
    });
  return l();
}
function ro(e, t, r) {
  var n;
  ea(t, e);
  const a = ((n = e.$unknown) !== null && n !== void 0 ? n : []).filter((d) => d.no !== t.number), [l, u] = je(t, r), o = new xn();
  Pn(o, { writeUnknownFields: !0 }, l, u);
  const s = new St(o.finish());
  for (; s.pos < s.len; ) {
    const [d, g] = s.tag(), b = s.skip(g, d);
    a.push({ no: d, wireType: g, data: b });
  }
  e.$unknown = a;
}
function no(e, t) {
  if (e === void 0)
    return [];
  if (t.fieldKind === "enum" || t.fieldKind === "scalar") {
    for (let r = e.length - 1; r >= 0; --r)
      if (e[r].no == t.number)
        return [e[r]];
    return [];
  }
  return e.filter((r) => r.no === t.number);
}
function je(e, t) {
  const r = e.typeName, n = Object.assign(Object.assign({}, e), { kind: "field", parent: e.extendee, localName: r }), a = Object.assign(Object.assign({}, e.extendee), { fields: [n], members: [n], oneofs: [] }), l = j(a, t !== void 0 ? { [r]: t } : void 0);
  return [
    U(a, l),
    n,
    () => {
      const u = l[r];
      if (u === void 0) {
        const o = e.message;
        return Ye(o) ? be(o.fields[0].scalar, o.fields[0].longAsString) : j(o);
      }
      return u;
    }
  ];
}
function ea(e, t) {
  if (e.extendee.typeName != t.$typeName)
    throw new Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
const ao = 3, lo = 2, Nr = {
  alwaysEmitImplicit: !1,
  enumAsInteger: !1,
  useProtoFieldName: !1
};
function uo(e) {
  return e ? Object.assign(Object.assign({}, Nr), e) : Nr;
}
function oo(e, t, r) {
  return ke(U(e, t), uo(r));
}
function so(e, t, r) {
  var n;
  const a = oo(e, t, r);
  return JSON.stringify(a, null, (n = r == null ? void 0 : r.prettySpaces) !== null && n !== void 0 ? n : 0);
}
function ke(e, t) {
  var r;
  const n = bo(e, t);
  if (n !== void 0)
    return n;
  const a = {};
  for (const l of e.sortedFields) {
    if (!e.isSet(l)) {
      if (l.presence == ao)
        throw new Error(`cannot encode ${l} to JSON: required field not set`);
      if (!t.alwaysEmitImplicit || l.presence !== lo)
        continue;
    }
    const u = zr(l, e.get(l), t);
    u !== void 0 && (a[go(l, t)] = u);
  }
  if (t.registry) {
    const l = /* @__PURE__ */ new Set();
    for (const { no: u } of (r = e.getUnknown()) !== null && r !== void 0 ? r : [])
      if (!l.has(u)) {
        l.add(u);
        const o = t.registry.getExtensionFor(e.desc, u);
        if (!o)
          continue;
        const s = to(e.message, o), [d, g] = je(o, s), b = zr(g, d.get(g), t);
        b !== void 0 && (a[o.jsonName] = b);
      }
  }
  return a;
}
function zr(e, t, r) {
  switch (e.fieldKind) {
    case "scalar":
      return Oe(e, t);
    case "message":
      return ke(t, r);
    case "enum":
      return Lt(e.enum, t, r.enumAsInteger);
    case "list":
      return co(t, r);
    case "map":
      return io(t, r);
  }
}
function io(e, t) {
  const r = e.field(), n = {};
  switch (r.mapKind) {
    case "scalar":
      for (const [a, l] of e)
        n[a] = Oe(r, l);
      break;
    case "message":
      for (const [a, l] of e)
        n[a] = ke(l, t);
      break;
    case "enum":
      for (const [a, l] of e)
        n[a] = Lt(r.enum, l, t.enumAsInteger);
      break;
  }
  return t.alwaysEmitImplicit || e.size > 0 ? n : void 0;
}
function co(e, t) {
  const r = e.field(), n = [];
  switch (r.listKind) {
    case "scalar":
      for (const a of e)
        n.push(Oe(r, a));
      break;
    case "enum":
      for (const a of e)
        n.push(Lt(r.enum, a, t.enumAsInteger));
      break;
    case "message":
      for (const a of e)
        n.push(ke(a, t));
      break;
  }
  return t.alwaysEmitImplicit || n.length > 0 ? n : void 0;
}
function Lt(e, t, r) {
  var n;
  if (typeof t != "number")
    throw new Error(`cannot encode ${e} to JSON: expected number, got ${k(t)}`);
  if (e.typeName == "google.protobuf.NullValue")
    return null;
  if (r)
    return t;
  const a = e.value[t];
  return (n = a == null ? void 0 : a.name) !== null && n !== void 0 ? n : t;
}
function Oe(e, t) {
  var r, n, a, l, u, o;
  switch (e.scalar) {
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case i.INT32:
    case i.SFIXED32:
    case i.SINT32:
    case i.FIXED32:
    case i.UINT32:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(r = ce(e, t)) === null || r === void 0 ? void 0 : r.message}`);
      return t;
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case i.FLOAT:
    case i.DOUBLE:
      if (typeof t != "number")
        throw new Error(`cannot encode ${e} to JSON: ${(n = ce(e, t)) === null || n === void 0 ? void 0 : n.message}`);
      return Number.isNaN(t) ? "NaN" : t === Number.POSITIVE_INFINITY ? "Infinity" : t === Number.NEGATIVE_INFINITY ? "-Infinity" : t;
    // string:
    case i.STRING:
      if (typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(a = ce(e, t)) === null || a === void 0 ? void 0 : a.message}`);
      return t;
    // bool:
    case i.BOOL:
      if (typeof t != "boolean")
        throw new Error(`cannot encode ${e} to JSON: ${(l = ce(e, t)) === null || l === void 0 ? void 0 : l.message}`);
      return t;
    // JSON value will be a decimal string. Either numbers or strings are accepted.
    case i.UINT64:
    case i.FIXED64:
    case i.INT64:
    case i.SFIXED64:
    case i.SINT64:
      if (typeof t != "bigint" && typeof t != "string")
        throw new Error(`cannot encode ${e} to JSON: ${(u = ce(e, t)) === null || u === void 0 ? void 0 : u.message}`);
      return t.toString();
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case i.BYTES:
      if (t instanceof Uint8Array)
        return zn(t);
      throw new Error(`cannot encode ${e} to JSON: ${(o = ce(e, t)) === null || o === void 0 ? void 0 : o.message}`);
  }
}
function go(e, t) {
  return t.useProtoFieldName ? e.name : e.jsonName;
}
function bo(e, t) {
  if (e.desc.typeName.startsWith("google.protobuf."))
    switch (e.desc.typeName) {
      case "google.protobuf.Any":
        return mo(e.message, t);
      case "google.protobuf.Timestamp":
        return ho(e.message);
      case "google.protobuf.Duration":
        return po(e.message);
      case "google.protobuf.FieldMask":
        return fo(e.message);
      case "google.protobuf.Struct":
        return ta(e.message);
      case "google.protobuf.Value":
        return Ut(e.message);
      case "google.protobuf.ListValue":
        return ra(e.message);
      default:
        if (Ye(e.desc)) {
          const r = e.desc.fields[0];
          return Oe(r, e.get(r));
        }
        return;
    }
}
function mo(e, t) {
  if (e.typeUrl === "")
    return {};
  const { registry: r } = t;
  let n, a;
  if (r && (n = ju(e, r), n && (a = r.getMessage(n.$typeName))), !a || !n)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
  let l = ke(U(a, n), t);
  return (a.typeName.startsWith("google.protobuf.") || l === null || Array.isArray(l) || typeof l != "object") && (l = { value: l }), l["@type"] = e.typeUrl, l;
}
function po(e) {
  if (Number(e.seconds) > 315576e6 || Number(e.seconds) < -315576e6)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
  let t = e.seconds.toString();
  if (e.nanos !== 0) {
    let r = Math.abs(e.nanos).toString();
    r = "0".repeat(9 - r.length) + r, r.substring(3) === "000000" ? r = r.substring(0, 3) : r.substring(6) === "000" && (r = r.substring(0, 6)), t += "." + r, e.nanos < 0 && Number(e.seconds) == 0 && (t = "-" + t);
  }
  return t + "s";
}
function fo(e) {
  return e.paths.map((t) => {
    if (t.match(/_[0-9]?_/g) || t.match(/[A-Z]/g))
      throw new Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "` + t + '" is irreversible');
    return We(t);
  }).join(",");
}
function ta(e) {
  const t = {};
  for (const [r, n] of Object.entries(e.fields))
    t[r] = Ut(n);
  return t;
}
function Ut(e) {
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
      return ta(e.kind.value);
    case "listValue":
      return ra(e.kind.value);
    default:
      throw new Error(`${e.$typeName} must have a value`);
  }
}
function ra(e) {
  return e.values.map(Ut);
}
function ho(e) {
  const t = Number(e.seconds) * 1e3;
  if (t < Date.parse("0001-01-01T00:00:00Z") || t > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  if (e.nanos < 0)
    throw new Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
  let r = "Z";
  if (e.nanos > 0) {
    const n = (e.nanos + 1e9).toString().substring(1);
    n.substring(3) === "000000" ? r = "." + n.substring(0, 3) + "Z" : n.substring(6) === "000" ? r = "." + n.substring(0, 6) + "Z" : r = "." + n + "Z";
  }
  return new Date(t).toISOString().replace(".000Z", r);
}
const Hr = {
  ignoreUnknownFields: !1
};
function yo(e) {
  return e ? Object.assign(Object.assign({}, Hr), e) : Hr;
}
function Io(e, t, r) {
  return na(e, Wo(t, e.typeName), r);
}
function na(e, t, r) {
  const n = U(e);
  try {
    Ie(n, t, yo(r));
  } catch (a) {
    throw $l(a) ? new Error(`cannot decode ${a.field()} from JSON: ${a.message}`, {
      cause: a
    }) : a;
  }
  return n.message;
}
function Ie(e, t, r) {
  var n;
  if (Bo(e, t, r))
    return;
  if (t == null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode ${e.desc} from JSON: ${k(t)}`);
  const a = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map();
  for (const u of e.desc.fields)
    l.set(u.name, u).set(u.jsonName, u);
  for (const [u, o] of Object.entries(t)) {
    const s = l.get(u);
    if (s) {
      if (s.oneof) {
        if (o === null && s.fieldKind == "scalar")
          continue;
        const d = a.get(s.oneof);
        if (d !== void 0)
          throw new v(s.oneof, `oneof set multiple times by ${d.name} and ${s.name}`);
        a.set(s.oneof, s);
      }
      vr(e, s, o, r);
    } else {
      let d;
      if (u.startsWith("[") && u.endsWith("]") && // biome-ignore lint/suspicious/noAssignInExpressions: no
      (d = (n = r.registry) === null || n === void 0 ? void 0 : n.getExtension(u.substring(1, u.length - 1))) && d.extendee.typeName === e.desc.typeName) {
        const [g, b, h] = je(d);
        vr(g, b, o, r), ro(e.message, d, h());
      }
      if (!d && !r.ignoreUnknownFields)
        throw new Error(`cannot decode ${e.desc} from JSON: key "${u}" is unknown`);
    }
  }
}
function vr(e, t, r, n) {
  switch (t.fieldKind) {
    case "scalar":
      Xo(e, t, r);
      break;
    case "enum":
      Ao(e, t, r, n);
      break;
    case "message":
      Vo(e, t, r, n);
      break;
    case "list":
      Zo(e.get(t), r, n);
      break;
    case "map":
      Go(e.get(t), r, n);
      break;
  }
}
function Go(e, t, r) {
  if (t === null)
    return;
  const n = e.field();
  if (typeof t != "object" || Array.isArray(t))
    throw new v(n, "expected object, got " + k(t));
  for (const [a, l] of Object.entries(t)) {
    if (l === null)
      throw new v(n, "map value must not be null");
    let u;
    switch (n.mapKind) {
      case "message":
        const s = U(n.message);
        Ie(s, l, r), u = s;
        break;
      case "enum":
        if (u = Qt(n.enum, l, r.ignoreUnknownFields, !0), u === $e)
          return;
        break;
      case "scalar":
        u = et(n, l, !0);
        break;
    }
    const o = Co(n.mapKey, a);
    e.set(o, u);
  }
}
function Zo(e, t, r) {
  if (t === null)
    return;
  const n = e.field();
  if (!Array.isArray(t))
    throw new v(n, "expected Array, got " + k(t));
  for (const a of t) {
    if (a === null)
      throw new v(n, "list item must not be null");
    switch (n.listKind) {
      case "message":
        const l = U(n.message);
        Ie(l, a, r), e.add(l);
        break;
      case "enum":
        const u = Qt(n.enum, a, r.ignoreUnknownFields, !0);
        u !== $e && e.add(u);
        break;
      case "scalar":
        e.add(et(n, a, !0));
        break;
    }
  }
}
function Vo(e, t, r, n) {
  if (r === null && t.message.typeName != "google.protobuf.Value") {
    e.clear(t);
    return;
  }
  const a = e.isSet(t) ? e.get(t) : U(t.message);
  Ie(a, r, n), e.set(t, a);
}
function Ao(e, t, r, n) {
  const a = Qt(t.enum, r, n.ignoreUnknownFields, !1);
  a === qe ? e.clear(t) : a !== $e && e.set(t, a);
}
function Xo(e, t, r) {
  const n = et(t, r, !1);
  n === qe ? e.clear(t) : e.set(t, n);
}
const $e = Symbol();
function Qt(e, t, r, n) {
  if (t === null)
    return e.typeName == "google.protobuf.NullValue" ? 0 : n ? e.values[0].number : qe;
  switch (typeof t) {
    case "number":
      if (Number.isInteger(t))
        return t;
      break;
    case "string":
      const a = e.values.find((l) => l.name === t);
      if (a !== void 0)
        return a.number;
      if (r)
        return $e;
      break;
  }
  throw new Error(`cannot decode ${e} from JSON: ${k(t)}`);
}
const qe = Symbol();
function et(e, t, r) {
  if (t === null)
    return r ? be(e.scalar, !1) : qe;
  switch (e.scalar) {
    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
    // Either numbers or strings are accepted. Exponent notation is also accepted.
    case i.DOUBLE:
    case i.FLOAT:
      if (t === "NaN")
        return NaN;
      if (t === "Infinity")
        return Number.POSITIVE_INFINITY;
      if (t === "-Infinity")
        return Number.NEGATIVE_INFINITY;
      if (typeof t == "number") {
        if (Number.isNaN(t))
          throw new v(e, "unexpected NaN number");
        if (!Number.isFinite(t))
          throw new v(e, "unexpected infinite number");
        break;
      }
      if (typeof t == "string") {
        if (t === "" || t.trim().length !== t.length)
          break;
        const n = Number(t);
        if (!Number.isFinite(n))
          break;
        return n;
      }
      break;
    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
    case i.INT32:
    case i.FIXED32:
    case i.SFIXED32:
    case i.SINT32:
    case i.UINT32:
      return aa(t);
    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
    case i.BYTES:
      if (typeof t == "string") {
        if (t === "")
          return new Uint8Array(0);
        try {
          return Nt(t);
        } catch (n) {
          const a = n instanceof Error ? n.message : String(n);
          throw new v(e, a);
        }
      }
      break;
  }
  return t;
}
function Co(e, t) {
  switch (e) {
    case i.BOOL:
      switch (t) {
        case "true":
          return !0;
        case "false":
          return !1;
      }
      return t;
    case i.INT32:
    case i.FIXED32:
    case i.UINT32:
    case i.SFIXED32:
    case i.SINT32:
      return aa(t);
    default:
      return t;
  }
}
function aa(e) {
  if (typeof e == "string") {
    if (e === "" || e.trim().length !== e.length)
      return e;
    const t = Number(e);
    return Number.isNaN(t) ? e : t;
  }
  return e;
}
function Wo(e, t) {
  try {
    return JSON.parse(e);
  } catch (r) {
    const n = r instanceof Error ? r.message : String(r);
    throw new Error(
      `cannot decode message ${t} from JSON: ${n}`,
      // @ts-expect-error we use the ES2022 error CTOR option "cause" for better stack traces
      { cause: r }
    );
  }
}
function Bo(e, t, r) {
  if (!e.desc.typeName.startsWith("google.protobuf."))
    return !1;
  switch (e.desc.typeName) {
    case "google.protobuf.Any":
      return xo(e.message, t, r), !0;
    case "google.protobuf.Timestamp":
      return Ro(e.message, t), !0;
    case "google.protobuf.Duration":
      return Jo(e.message, t), !0;
    case "google.protobuf.FieldMask":
      return So(e.message, t), !0;
    case "google.protobuf.Struct":
      return la(e.message, t), !0;
    case "google.protobuf.Value":
      return _t(e.message, t), !0;
    case "google.protobuf.ListValue":
      return ua(e.message, t), !0;
    default:
      if (Ye(e.desc)) {
        const n = e.desc.fields[0];
        return t === null ? e.clear(n) : e.set(n, et(n, t, !0)), !0;
      }
      return !1;
  }
}
function xo(e, t, r) {
  var n;
  if (t === null || Array.isArray(t) || typeof t != "object")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${k(t)}`);
  if (Object.keys(t).length == 0)
    return;
  const a = t["@type"];
  if (typeof a != "string" || a == "")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
  const l = a.includes("/") ? a.substring(a.lastIndexOf("/") + 1) : a;
  if (!l.length)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
  const u = (n = r.registry) === null || n === void 0 ? void 0 : n.getMessage(l);
  if (!u)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${a} is not in the type registry`);
  const o = U(u);
  if (l.startsWith("google.protobuf.") && Object.prototype.hasOwnProperty.call(t, "value")) {
    const s = t.value;
    Ie(o, s, r);
  } else {
    const s = Object.assign({}, t);
    delete s["@type"], Ie(o, s, r);
  }
  Tu(o.desc, o.message, e);
}
function Ro(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${k(t)}`);
  const r = t.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
  if (!r)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  const n = Date.parse(
    // biome-ignore format: want this to read well
    r[1] + "-" + r[2] + "-" + r[3] + "T" + r[4] + ":" + r[5] + ":" + r[6] + (r[8] ? r[8] : "Z")
  );
  if (Number.isNaN(n))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
  if (n < Date.parse("0001-01-01T00:00:00Z") || n > Date.parse("9999-12-31T23:59:59Z"))
    throw new Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
  e.seconds = B.parse(n / 1e3), e.nanos = 0, r[7] && (e.nanos = parseInt("1" + r[7] + "0".repeat(9 - r[7].length)) - 1e9);
}
function Jo(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${k(t)}`);
  const r = t.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
  if (r === null)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${k(t)}`);
  const n = Number(r[1]);
  if (n > 315576e6 || n < -315576e6)
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${k(t)}`);
  if (e.seconds = B.parse(n), typeof r[2] != "string")
    return;
  const a = r[2] + "0".repeat(9 - r[2].length);
  e.nanos = parseInt(a), (n < 0 || Object.is(n, -0)) && (e.nanos = -e.nanos);
}
function So(e, t) {
  if (typeof t != "string")
    throw new Error(`cannot decode message ${e.$typeName} from JSON: ${k(t)}`);
  if (t === "")
    return;
  function r(n) {
    if (n.includes("_"))
      throw new Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
    const a = n.replace(/[A-Z]/g, (l) => "_" + l.toLowerCase());
    return a[0] === "_" ? a.substring(1) : a;
  }
  e.paths = t.split(",").map(r);
}
function la(e, t) {
  if (typeof t != "object" || t == null || Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${k(t)}`);
  for (const [r, n] of Object.entries(t)) {
    const a = j(qn);
    _t(a, n), e.fields[r] = a;
  }
}
function _t(e, t) {
  switch (typeof t) {
    case "number":
      e.kind = { case: "numberValue", value: t };
      break;
    case "string":
      e.kind = { case: "stringValue", value: t };
      break;
    case "boolean":
      e.kind = { case: "boolValue", value: t };
      break;
    case "object":
      if (t === null)
        e.kind = { case: "nullValue", value: It.NULL_VALUE };
      else if (Array.isArray(t)) {
        const r = j(eo);
        ua(r, t), e.kind = { case: "listValue", value: r };
      } else {
        const r = j(qu);
        la(r, t), e.kind = { case: "structValue", value: r };
      }
      break;
    default:
      throw new Error(`cannot decode message ${e.$typeName} from JSON ${k(t)}`);
  }
  return e;
}
function ua(e, t) {
  if (!Array.isArray(t))
    throw new Error(`cannot decode message ${e.$typeName} from JSON ${k(t)}`);
  for (const r of t) {
    const n = j(qn);
    _t(n, r), e.values.push(n);
  }
}
function Gt(e) {
  const t = X[e];
  return typeof t != "string" ? e.toString() : t[0].toLowerCase() + t.substring(1).replace(/[A-Z]/g, (r) => "_" + r.toLowerCase());
}
let ze;
function Yo(e) {
  if (!ze) {
    ze = {};
    for (const t of Object.values(X))
      typeof t != "string" && (ze[Gt(t)] = t);
  }
  return ze[e];
}
class J extends Error {
  /**
   * Create a new ConnectError.
   * If no code is provided, code "unknown" is used.
   * Outgoing details are only relevant for the server side - a service may
   * raise an error with details, and it is up to the protocol implementation
   * to encode and send the details along with error.
   */
  constructor(t, r = X.Unknown, n, a, l) {
    super(Fo(t, r)), this.name = "ConnectError", Object.setPrototypeOf(this, new.target.prototype), this.rawMessage = t, this.code = r, this.metadata = new Headers(n ?? {}), this.details = a ?? [], this.cause = l;
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
  static from(t, r = X.Unknown) {
    return t instanceof J ? t : t instanceof Error ? t.name == "AbortError" ? new J(t.message, X.Canceled) : new J(t.message, r, void 0, void 0, t) : new J(String(t), r, void 0, void 0, t);
  }
  static [Symbol.hasInstance](t) {
    return t instanceof Error ? Object.getPrototypeOf(t) === J.prototype ? !0 : t.name === "ConnectError" && "code" in t && typeof t.code == "number" && "metadata" in t && "details" in t && Array.isArray(t.details) && "rawMessage" in t && typeof t.rawMessage == "string" && "cause" in t : !1;
  }
  findDetails(t) {
    const r = t.kind === "message" ? {
      getMessage: (a) => a === t.typeName ? t : void 0
    } : t, n = [];
    for (const a of this.details) {
      if ("desc" in a) {
        r.getMessage(a.desc.typeName) && n.push(j(a.desc, a.value));
        continue;
      }
      const l = r.getMessage(a.type);
      if (l)
        try {
          n.push(Pe(l, a.value));
        } catch {
        }
    }
    return n;
  }
}
function Fo(e, t) {
  return e.length ? `[${Gt(t)}] ${e}` : `[${Gt(t)}]`;
}
function ko(...e) {
  const t = new Headers();
  for (const r of e)
    r.forEach((n, a) => {
      t.append(a, n);
    });
  return t;
}
function wo(e, t) {
  const r = {};
  for (const n of e.methods) {
    const a = t(n);
    a != null && (r[n.localName] = a);
  }
  return r;
}
const Kr = 1;
function Eo(e) {
  let t, r = new Uint8Array(0);
  function n(a) {
    const l = new Uint8Array(r.length + a.length);
    l.set(r), l.set(a, r.length), r = l;
  }
  return new ReadableStream({
    start() {
      t = e.getReader();
    },
    async pull(a) {
      let l;
      for (; ; ) {
        if (l === void 0 && r.byteLength >= 5) {
          let s = 0;
          for (let d = 1; d < 5; d++)
            s = (s << 8) + r[d];
          l = { flags: r[0], length: s };
        }
        if (l !== void 0 && r.byteLength >= l.length + 5)
          break;
        const o = await t.read();
        if (o.done)
          break;
        n(o.value);
      }
      if (l === void 0) {
        if (r.byteLength == 0) {
          a.close();
          return;
        }
        a.error(new J("premature end of stream", X.DataLoss));
        return;
      }
      const u = r.subarray(5, 5 + l.length);
      r = r.subarray(5 + l.length), a.enqueue({
        flags: l.flags,
        data: u
      });
    }
  });
}
function No(e, t) {
  const r = new Uint8Array(t.length + 5);
  r.set(t, 5);
  const n = new DataView(r.buffer, r.byteOffset, r.byteLength);
  return n.setUint8(0, e), n.setUint32(1, t.length), r;
}
var zo = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], r;
  return t ? t.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), r = {}, n("next"), n("throw"), n("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function n(l) {
    r[l] = e[l] && function(u) {
      return new Promise(function(o, s) {
        u = e[l](u), a(o, s, u.done, u.value);
      });
    };
  }
  function a(l, u, o, s) {
    Promise.resolve(s).then(function(d) {
      l({ value: d, done: o });
    }, u);
  }
}, Re = function(e) {
  return this instanceof Re ? (this.v = e, this) : new Re(e);
}, Ho = function(e, t, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(e, t || []), a, l = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), o("next"), o("throw"), o("return", u), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function u(c) {
    return function(p) {
      return Promise.resolve(p).then(c, b);
    };
  }
  function o(c, p) {
    n[c] && (a[c] = function(m) {
      return new Promise(function(y, F) {
        l.push([c, m, y, F]) > 1 || s(c, m);
      });
    }, p && (a[c] = p(a[c])));
  }
  function s(c, p) {
    try {
      d(n[c](p));
    } catch (m) {
      h(l[0][3], m);
    }
  }
  function d(c) {
    c.value instanceof Re ? Promise.resolve(c.value.v).then(g, b) : h(l[0][2], c);
  }
  function g(c) {
    s("next", c);
  }
  function b(c) {
    s("throw", c);
  }
  function h(c, p) {
    c(p), l.shift(), l.length && s(l[0][0], l[0][1]);
  }
}, vo = function(e) {
  var t, r;
  return t = {}, n("next"), n("throw", function(a) {
    throw a;
  }), n("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function n(a, l) {
    t[a] = e[a] ? function(u) {
      return (r = !r) ? { value: Re(e[a](u)), done: !1 } : l ? l(u) : u;
    } : l;
  }
};
function Ko(e) {
  return Ho(this, arguments, function* () {
    yield Re(yield* vo(zo(e)));
  });
}
var oa = function(e) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator], r;
  return t ? t.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), r = {}, n("next"), n("throw"), n("return"), r[Symbol.asyncIterator] = function() {
    return this;
  }, r);
  function n(l) {
    r[l] = e[l] && function(u) {
      return new Promise(function(o, s) {
        u = e[l](u), a(o, s, u.done, u.value);
      });
    };
  }
  function a(l, u, o, s) {
    Promise.resolve(s).then(function(d) {
      l({ value: d, done: o });
    }, u);
  }
}, Ge = function(e) {
  return this instanceof Ge ? (this.v = e, this) : new Ge(e);
}, Mo = function(e) {
  var t, r;
  return t = {}, n("next"), n("throw", function(a) {
    throw a;
  }), n("return"), t[Symbol.iterator] = function() {
    return this;
  }, t;
  function n(a, l) {
    t[a] = e[a] ? function(u) {
      return (r = !r) ? { value: Ge(e[a](u)), done: !1 } : l ? l(u) : u;
    } : l;
  }
}, Lo = function(e, t, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(e, t || []), a, l = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), o("next"), o("throw"), o("return", u), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function u(c) {
    return function(p) {
      return Promise.resolve(p).then(c, b);
    };
  }
  function o(c, p) {
    n[c] && (a[c] = function(m) {
      return new Promise(function(y, F) {
        l.push([c, m, y, F]) > 1 || s(c, m);
      });
    }, p && (a[c] = p(a[c])));
  }
  function s(c, p) {
    try {
      d(n[c](p));
    } catch (m) {
      h(l[0][3], m);
    }
  }
  function d(c) {
    c.value instanceof Ge ? Promise.resolve(c.value.v).then(g, b) : h(l[0][2], c);
  }
  function g(c) {
    s("next", c);
  }
  function b(c) {
    s("throw", c);
  }
  function h(c, p) {
    c(p), l.shift(), l.length && s(l[0][0], l[0][1]);
  }
};
function Uo(e, t) {
  return wo(e, (r) => {
    switch (r.methodKind) {
      case "unary":
        return Qo(t, r);
      case "server_streaming":
        return _o(t, r);
      case "client_streaming":
        return Do(t, r);
      case "bidi_streaming":
        return To(t, r);
      default:
        return null;
    }
  });
}
function Qo(e, t) {
  return async function(r, n) {
    var a, l;
    const u = await e.unary(t, n == null ? void 0 : n.signal, n == null ? void 0 : n.timeoutMs, n == null ? void 0 : n.headers, r, n == null ? void 0 : n.contextValues);
    return (a = n == null ? void 0 : n.onHeader) === null || a === void 0 || a.call(n, u.header), (l = n == null ? void 0 : n.onTrailer) === null || l === void 0 || l.call(n, u.trailer), u.message;
  };
}
function _o(e, t) {
  return function(r, n) {
    return sa(e.stream(t, n == null ? void 0 : n.signal, n == null ? void 0 : n.timeoutMs, n == null ? void 0 : n.headers, Ko([r]), n == null ? void 0 : n.contextValues), n);
  };
}
function Do(e, t) {
  return async function(r, n) {
    var a, l, u, o, s, d;
    const g = await e.stream(t, n == null ? void 0 : n.signal, n == null ? void 0 : n.timeoutMs, n == null ? void 0 : n.headers, r, n == null ? void 0 : n.contextValues);
    (s = n == null ? void 0 : n.onHeader) === null || s === void 0 || s.call(n, g.header);
    let b, h = 0;
    try {
      for (var c = !0, p = oa(g.message), m; m = await p.next(), a = m.done, !a; c = !0)
        o = m.value, c = !1, b = o, h++;
    } catch (y) {
      l = { error: y };
    } finally {
      try {
        !c && !a && (u = p.return) && await u.call(p);
      } finally {
        if (l) throw l.error;
      }
    }
    if (!b)
      throw new J("protocol error: missing response message", X.Unimplemented);
    if (h > 1)
      throw new J("protocol error: received extra messages for client streaming method", X.Unimplemented);
    return (d = n == null ? void 0 : n.onTrailer) === null || d === void 0 || d.call(n, g.trailer), b;
  };
}
function To(e, t) {
  return function(r, n) {
    return sa(e.stream(t, n == null ? void 0 : n.signal, n == null ? void 0 : n.timeoutMs, n == null ? void 0 : n.headers, r, n == null ? void 0 : n.contextValues), n);
  };
}
function sa(e, t) {
  const r = function() {
    return Lo(this, arguments, function* () {
      var n, a;
      const l = yield Ge(e);
      (n = t == null ? void 0 : t.onHeader) === null || n === void 0 || n.call(t, l.header), yield Ge(yield* Mo(oa(l.message))), (a = t == null ? void 0 : t.onTrailer) === null || a === void 0 || a.call(t, l.trailer);
    });
  }()[Symbol.asyncIterator]();
  return {
    [Symbol.asyncIterator]: () => ({
      next: () => r.next()
    })
  };
}
function Po(...e) {
  const t = new AbortController(), r = e.filter((a) => a !== void 0).concat(t.signal);
  for (const a of r) {
    if (a.aborted) {
      n.apply(a);
      break;
    }
    a.addEventListener("abort", n);
  }
  function n() {
    t.signal.aborted || t.abort(da(this));
    for (const a of r)
      a.removeEventListener("abort", n);
  }
  return t;
}
function jo(e) {
  const t = new AbortController(), r = () => {
    t.abort(new J("the operation timed out", X.DeadlineExceeded));
  };
  let n;
  return e !== void 0 && (e <= 0 ? r() : n = setTimeout(r, e)), {
    signal: t.signal,
    cleanup: () => clearTimeout(n)
  };
}
function da(e) {
  if (!e.aborted)
    return;
  if (e.reason !== void 0)
    return e.reason;
  const t = new Error("This operation was aborted");
  return t.name = "AbortError", t;
}
function Mr() {
  return {
    get(e) {
      return e.id in this ? this[e.id] : e.defaultValue;
    },
    set(e, t) {
      return this[e.id] = t, this;
    },
    delete(e) {
      return delete this[e.id], this;
    }
  };
}
function Oo(e, t, ...r) {
  if (r.length > 0)
    throw new Error();
  return e.services[t];
}
function Lr(e, t) {
  return e.toString().replace(/\/?$/, `/${t.parent.typeName}/${t.name}`);
}
function ia(e, t) {
  return j(e, t);
}
function $o(e, t) {
  function r(n) {
    return n.done === !0 ? n : {
      done: n.done,
      value: ia(e, n.value)
    };
  }
  return {
    [Symbol.asyncIterator]() {
      const n = t[Symbol.asyncIterator](), a = {
        next: () => n.next().then(r)
      };
      return n.throw !== void 0 && (a.throw = (l) => n.throw(l).then(r)), n.return !== void 0 && (a.return = (l) => n.return(l).then(r)), a;
    }
  };
}
function ca(e, t) {
  var r;
  return (r = t == null ? void 0 : t.concat().reverse().reduce(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    (n, a) => a(n),
    e
  )) !== null && r !== void 0 ? r : e;
}
function ga(e) {
  var t;
  const r = Object.assign({}, e);
  return (t = r.ignoreUnknownFields) !== null && t !== void 0 || (r.ignoreUnknownFields = !0), r;
}
function Ur(e, t, r, n) {
  const a = t ? Qr(e.input, n) : _r(e.input, r);
  return { parse: (t ? Qr(e.output, n) : _r(e.output, r)).parse, serialize: a.serialize };
}
function Qr(e, t) {
  return {
    parse(r) {
      try {
        return Pe(e, r, t);
      } catch (n) {
        const a = n instanceof Error ? n.message : String(n);
        throw new J(`parse binary: ${a}`, X.Internal);
      }
    },
    serialize(r) {
      try {
        return Tn(e, r, t);
      } catch (n) {
        const a = n instanceof Error ? n.message : String(n);
        throw new J(`serialize binary: ${a}`, X.Internal);
      }
    }
  };
}
function _r(e, t) {
  var r, n;
  const a = (r = t == null ? void 0 : t.textEncoder) !== null && r !== void 0 ? r : new TextEncoder(), l = (n = t == null ? void 0 : t.textDecoder) !== null && n !== void 0 ? n : new TextDecoder(), u = ga(t);
  return {
    parse(o) {
      try {
        const s = l.decode(o);
        return Io(e, s, u);
      } catch (s) {
        throw J.from(s, X.InvalidArgument);
      }
    },
    serialize(o) {
      try {
        const s = so(e, o, u);
        return a.encode(s);
      } catch (s) {
        throw J.from(s, X.Internal);
      }
    }
  };
}
const qo = /^application\/(connect\+)?(?:(json)(?:; ?charset=utf-?8)?|(proto))$/i, es = "application/proto", ts = "application/json", rs = "application/connect+proto", ns = "application/connect+json";
function as(e) {
  const t = e == null ? void 0 : e.match(qo);
  if (!t)
    return;
  const r = !!t[1], n = !!t[3];
  return { stream: r, binary: n };
}
function ba(e, t, r) {
  var n;
  if (t && new Headers(t).forEach((o, s) => r.metadata.append(s, o)), typeof e != "object" || e == null || Array.isArray(e))
    throw r;
  let a = r.code;
  "code" in e && typeof e.code == "string" && (a = (n = Yo(e.code)) !== null && n !== void 0 ? n : a);
  const l = e.message;
  if (l != null && typeof l != "string")
    throw r;
  const u = new J(l ?? "", a, t);
  if ("details" in e && Array.isArray(e.details))
    for (const o of e.details) {
      if (o === null || typeof o != "object" || Array.isArray(o) || typeof o.type != "string" || typeof o.value != "string")
        throw r;
      try {
        u.details.push({
          type: o.type,
          value: Nt(o.value),
          debug: o.debug
        });
      } catch {
        throw r;
      }
    }
  return u;
}
const Dr = 2;
function ls(e) {
  const t = new J("invalid end stream", X.Unknown);
  let r;
  try {
    r = JSON.parse(typeof e == "string" ? e : new TextDecoder().decode(e));
  } catch {
    throw t;
  }
  if (typeof r != "object" || r == null || Array.isArray(r))
    throw t;
  const n = new Headers();
  if ("metadata" in r) {
    if (typeof r.metadata != "object" || r.metadata == null || Array.isArray(r.metadata))
      throw t;
    for (const [l, u] of Object.entries(r.metadata)) {
      if (!Array.isArray(u) || u.some((o) => typeof o != "string"))
        throw t;
      for (const o of u)
        n.append(l, o);
    }
  }
  const a = "error" in r && r.error != null ? ba(r.error, n, t) : void 0;
  return { metadata: n, error: a };
}
const De = "Content-Type", us = "Content-Length", Tr = "Content-Encoding", os = "Accept-Encoding", ss = "Connect-Timeout-Ms", ma = "Connect-Protocol-Version", ds = "User-Agent";
function is(e) {
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
function Pr(e) {
  const t = new Headers(), r = new Headers();
  return e.forEach((n, a) => {
    a.toLowerCase().startsWith("trailer-") ? r.append(a.substring(8), n) : t.append(a, n);
  }), [t, r];
}
const pa = "1";
function jr(e, t, r, n, a) {
  const l = new Headers(n ?? {});
  return r !== void 0 && l.set(ss, `${r}`), l.set(De, e == "unary" ? t ? es : ts : t ? rs : ns), l.set(ma, pa), l.has(ds), l;
}
function Or(e, t, r, n) {
  const a = n.get(De), l = as(a);
  if (r !== 200) {
    const o = new J(`HTTP ${r}`, is(r), n);
    if (e == "unary" && l && !l.binary)
      return { isUnaryError: !0, unaryError: o };
    throw o;
  }
  const u = {
    binary: t,
    stream: e !== "unary"
  };
  if ((l == null ? void 0 : l.binary) !== u.binary || l.stream !== u.stream)
    throw new J(`unsupported content type ${a}`, l === void 0 ? X.Unknown : X.Internal, n);
  return { isUnaryError: !1 };
}
const $r = "application/";
function cs(e, t) {
  return t ? zn(e, "url") : encodeURIComponent(new TextDecoder().decode(e));
}
function gs(e, t, r) {
  let n = `?connect=v${pa}`;
  const a = e.header.get(De);
  (a == null ? void 0 : a.indexOf($r)) === 0 && (n += "&encoding=" + encodeURIComponent(a.slice($r.length)));
  const l = e.header.get(Tr);
  l !== null && l !== "identity" && (n += "&compression=" + encodeURIComponent(l), r = !0), r && (n += "&base64=1"), n += "&message=" + cs(t, r);
  const u = e.url + n, o = new Headers(e.header);
  return [
    ma,
    De,
    us,
    Tr,
    os
  ].forEach((s) => o.delete(s)), Object.assign(Object.assign({}, e), {
    requestMethod: "GET",
    url: u,
    header: o
  });
}
function bs(e) {
  const t = ca(e.next, e.interceptors), [r, n, a] = fa(e), l = Object.assign(Object.assign({}, e.req), { message: ia(e.req.method.input, e.req.message), signal: r });
  return t(l).then((u) => (a(), u), n);
}
function ms(e) {
  const t = ca(e.next, e.interceptors), [r, n, a] = fa(e), l = Object.assign(Object.assign({}, e.req), { message: $o(e.req.method.input, e.req.message), signal: r });
  let u = !1;
  return r.addEventListener("abort", function() {
    var o, s;
    const d = e.req.message[Symbol.asyncIterator]();
    u || (o = d.throw) === null || o === void 0 || o.call(d, this.reason).catch(() => {
    }), (s = d.return) === null || s === void 0 || s.call(d).catch(() => {
    });
  }), t(l).then((o) => Object.assign(Object.assign({}, o), { message: {
    [Symbol.asyncIterator]() {
      const s = o.message[Symbol.asyncIterator]();
      return {
        next() {
          return s.next().then((d) => (d.done == !0 && (u = !0, a()), d), n);
        }
        // We deliberately omit throw/return.
      };
    }
  } }), n);
}
function fa(e) {
  const { signal: t, cleanup: r } = jo(e.timeoutMs), n = Po(e.signal, t);
  return [
    n.signal,
    function(l) {
      const u = J.from(t.aborted ? da(t) : l);
      return n.abort(u), r(), Promise.reject(u);
    },
    function() {
      r(), n.abort();
    }
  ];
}
function ps() {
  try {
    new Headers();
  } catch {
    throw new Error("connect-web requires the fetch API. Are you running on an old version of Node.js? Node.js is not supported in Connect for Web - please stay tuned for Connect for Node.");
  }
}
var Je = function(e) {
  return this instanceof Je ? (this.v = e, this) : new Je(e);
}, fs = function(e, t, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(e, t || []), a, l = [];
  return a = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), o("next"), o("throw"), o("return", u), a[Symbol.asyncIterator] = function() {
    return this;
  }, a;
  function u(c) {
    return function(p) {
      return Promise.resolve(p).then(c, b);
    };
  }
  function o(c, p) {
    n[c] && (a[c] = function(m) {
      return new Promise(function(y, F) {
        l.push([c, m, y, F]) > 1 || s(c, m);
      });
    }, p && (a[c] = p(a[c])));
  }
  function s(c, p) {
    try {
      d(n[c](p));
    } catch (m) {
      h(l[0][3], m);
    }
  }
  function d(c) {
    c.value instanceof Je ? Promise.resolve(c.value.v).then(g, b) : h(l[0][2], c);
  }
  function g(c) {
    s("next", c);
  }
  function b(c) {
    s("throw", c);
  }
  function h(c, p) {
    c(p), l.shift(), l.length && s(l[0][0], l[0][1]);
  }
};
const qr = {
  redirect: "error"
};
function hs(e) {
  var t;
  ps();
  const r = (t = e.useBinaryFormat) !== null && t !== void 0 ? t : !1;
  return {
    async unary(n, a, l, u, o, s) {
      const { serialize: d, parse: g } = Ur(n, r, e.jsonOptions, e.binaryOptions);
      return l = l === void 0 ? e.defaultTimeoutMs : l <= 0 ? void 0 : l, await bs({
        interceptors: e.interceptors,
        signal: a,
        timeoutMs: l,
        req: {
          stream: !1,
          service: n.parent,
          method: n,
          requestMethod: "POST",
          url: Lr(e.baseUrl, n),
          header: jr(n.methodKind, r, l, u, !1),
          contextValues: s ?? Mr(),
          message: o
        },
        next: async (b) => {
          var h;
          const c = e.useHttpGet === !0 && n.idempotency === yt.NO_SIDE_EFFECTS;
          let p = null;
          c ? b = gs(b, d(b.message), r) : p = d(b.message);
          const y = await ((h = e.fetch) !== null && h !== void 0 ? h : globalThis.fetch)(b.url, Object.assign(Object.assign({}, qr), { method: b.requestMethod, headers: b.header, signal: b.signal, body: p })), { isUnaryError: F, unaryError: A } = Or(n.methodKind, r, y.status, y.headers);
          if (F)
            throw ba(await y.json(), ko(...Pr(y.headers)), A);
          const [z, E] = Pr(y.headers);
          return {
            stream: !1,
            service: n.parent,
            method: n,
            header: z,
            message: r ? g(new Uint8Array(await y.arrayBuffer())) : na(n.output, await y.json(), ga(e.jsonOptions)),
            trailer: E
          };
        }
      });
    },
    async stream(n, a, l, u, o, s) {
      const { serialize: d, parse: g } = Ur(n, r, e.jsonOptions, e.binaryOptions);
      function b(c, p, m, y) {
        return fs(this, arguments, function* () {
          const A = Eo(c).getReader();
          let z = !1;
          for (; ; ) {
            const E = yield Je(A.read());
            if (E.done)
              break;
            const { flags: me, data: pe } = E.value;
            if ((me & Kr) === Kr)
              throw new J("protocol error: received unsupported compressed output", X.Internal);
            if ((me & Dr) === Dr) {
              z = !0;
              const f = ls(pe);
              if (f.error) {
                const G = f.error;
                throw m.forEach(($, tt) => {
                  G.metadata.append(tt, $);
                }), G;
              }
              f.metadata.forEach((G, $) => p.set($, G));
              continue;
            }
            yield yield Je(g(pe));
          }
          if ("throwIfAborted" in y && y.throwIfAborted(), !z)
            throw "missing EndStreamResponse";
        });
      }
      async function h(c) {
        if (n.methodKind != "server_streaming")
          throw "The fetch API does not support streaming request bodies";
        const p = await c[Symbol.asyncIterator]().next();
        if (p.done == !0)
          throw "missing request message";
        return No(0, d(p.value));
      }
      return l = l === void 0 ? e.defaultTimeoutMs : l <= 0 ? void 0 : l, await ms({
        interceptors: e.interceptors,
        timeoutMs: l,
        signal: a,
        req: {
          stream: !0,
          service: n.parent,
          method: n,
          requestMethod: "POST",
          url: Lr(e.baseUrl, n),
          header: jr(n.methodKind, r, l, u, !1),
          contextValues: s ?? Mr(),
          message: o
        },
        next: async (c) => {
          var p;
          const y = await ((p = e.fetch) !== null && p !== void 0 ? p : globalThis.fetch)(c.url, Object.assign(Object.assign({}, qr), { method: c.requestMethod, headers: c.header, signal: c.signal, body: await h(c.message) }));
          if (Or(n.methodKind, r, y.status, y.headers), y.body === null)
            throw "missing response body";
          const F = new Headers();
          return Object.assign(Object.assign({}, c), { header: y.headers, trailer: F, message: b(y.body, F, y.headers, c.signal) });
        }
      });
    }
  };
}
const Q = /* @__PURE__ */ x("ChtidWYvdmFsaWRhdGUvdmFsaWRhdGUucHJvdG8SDGJ1Zi52YWxpZGF0ZSI9CgpDb25zdHJhaW50EgoKAmlkGAEgASgJEg8KB21lc3NhZ2UYAiABKAkSEgoKZXhwcmVzc2lvbhgDIAEoCSJNChJNZXNzYWdlQ29uc3RyYWludHMSEAoIZGlzYWJsZWQYASABKAgSJQoDY2VsGAMgAygLMhguYnVmLnZhbGlkYXRlLkNvbnN0cmFpbnQiJAoQT25lb2ZDb25zdHJhaW50cxIQCghyZXF1aXJlZBgBIAEoCCLXCAoQRmllbGRDb25zdHJhaW50cxIlCgNjZWwYFyADKAsyGC5idWYudmFsaWRhdGUuQ29uc3RyYWludBIQCghyZXF1aXJlZBgZIAEoCBIkCgZpZ25vcmUYGyABKA4yFC5idWYudmFsaWRhdGUuSWdub3JlEikKBWZsb2F0GAEgASgLMhguYnVmLnZhbGlkYXRlLkZsb2F0UnVsZXNIABIrCgZkb3VibGUYAiABKAsyGS5idWYudmFsaWRhdGUuRG91YmxlUnVsZXNIABIpCgVpbnQzMhgDIAEoCzIYLmJ1Zi52YWxpZGF0ZS5JbnQzMlJ1bGVzSAASKQoFaW50NjQYBCABKAsyGC5idWYudmFsaWRhdGUuSW50NjRSdWxlc0gAEisKBnVpbnQzMhgFIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50MzJSdWxlc0gAEisKBnVpbnQ2NBgGIAEoCzIZLmJ1Zi52YWxpZGF0ZS5VSW50NjRSdWxlc0gAEisKBnNpbnQzMhgHIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50MzJSdWxlc0gAEisKBnNpbnQ2NBgIIAEoCzIZLmJ1Zi52YWxpZGF0ZS5TSW50NjRSdWxlc0gAEi0KB2ZpeGVkMzIYCSABKAsyGi5idWYudmFsaWRhdGUuRml4ZWQzMlJ1bGVzSAASLQoHZml4ZWQ2NBgKIAEoCzIaLmJ1Zi52YWxpZGF0ZS5GaXhlZDY0UnVsZXNIABIvCghzZml4ZWQzMhgLIAEoCzIbLmJ1Zi52YWxpZGF0ZS5TRml4ZWQzMlJ1bGVzSAASLwoIc2ZpeGVkNjQYDCABKAsyGy5idWYudmFsaWRhdGUuU0ZpeGVkNjRSdWxlc0gAEicKBGJvb2wYDSABKAsyFy5idWYudmFsaWRhdGUuQm9vbFJ1bGVzSAASKwoGc3RyaW5nGA4gASgLMhkuYnVmLnZhbGlkYXRlLlN0cmluZ1J1bGVzSAASKQoFYnl0ZXMYDyABKAsyGC5idWYudmFsaWRhdGUuQnl0ZXNSdWxlc0gAEicKBGVudW0YECABKAsyFy5idWYudmFsaWRhdGUuRW51bVJ1bGVzSAASLwoIcmVwZWF0ZWQYEiABKAsyGy5idWYudmFsaWRhdGUuUmVwZWF0ZWRSdWxlc0gAEiUKA21hcBgTIAEoCzIWLmJ1Zi52YWxpZGF0ZS5NYXBSdWxlc0gAEiUKA2FueRgUIAEoCzIWLmJ1Zi52YWxpZGF0ZS5BbnlSdWxlc0gAEi8KCGR1cmF0aW9uGBUgASgLMhsuYnVmLnZhbGlkYXRlLkR1cmF0aW9uUnVsZXNIABIxCgl0aW1lc3RhbXAYFiABKAsyHC5idWYudmFsaWRhdGUuVGltZXN0YW1wUnVsZXNIABITCgdza2lwcGVkGBggASgIQgIYARIYCgxpZ25vcmVfZW1wdHkYGiABKAhCAhgBQgYKBHR5cGUiPgoVUHJlZGVmaW5lZENvbnN0cmFpbnRzEiUKA2NlbBgBIAMoCzIYLmJ1Zi52YWxpZGF0ZS5Db25zdHJhaW50IrUXCgpGbG9hdFJ1bGVzEmkKBWNvbnN0GAEgASgCQlrCSFcKVQoLZmxvYXQuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSnwEKAmx0GAIgASgCQpABwkiMAQqJAQoIZmxvYXQubHQafSFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASrwEKA2x0ZRgDIAEoAkKfAcJImwEKmAEKCWZsb2F0Lmx0ZRqKASFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEu8HCgJndBgEIAEoAkLgB8JI3AcKjQEKCGZsb2F0Lmd0GoABIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKwwEKC2Zsb2F0Lmd0X2x0GrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKzQEKFWZsb2F0Lmd0X2x0X2V4Y2x1c2l2ZRqzAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCtMBCgxmbG9hdC5ndF9sdGUawgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrdAQoWZmxvYXQuZ3RfbHRlX2V4Y2x1c2l2ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESuggKA2d0ZRgFIAEoAkKqCMJIpggKmwEKCWZsb2F0Lmd0ZRqNASFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrSAQoMZmxvYXQuZ3RlX2x0GsEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrcAQoWZmxvYXQuZ3RlX2x0X2V4Y2x1c2l2ZRrBAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK4gEKDWZsb2F0Lmd0ZV9sdGUa0AFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgdGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCuwBChdmbG9hdC5ndGVfbHRlX2V4Y2x1c2l2ZRrQAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ1CgJpbhgGIAMoAkJpwkhmCmQKCGZsb2F0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnYKBm5vdF9pbhgHIAMoAkJmwkhjCmEKDGZsb2F0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEnUKBmZpbml0ZRgIIAEoCEJlwkhiCmAKDGZsb2F0LmZpbml0ZRpQcnVsZXMuZmluaXRlID8gKHRoaXMuaXNOYW4oKSB8fCB0aGlzLmlzSW5mKCkgPyAndmFsdWUgbXVzdCBiZSBmaW5pdGUnIDogJycpIDogJycSKwoHZXhhbXBsZRgJIAMoAkIawkgXChUKDWZsb2F0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIscXCgtEb3VibGVSdWxlcxJqCgVjb25zdBgBIAEoAUJbwkhYClYKDGRvdWJsZS5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKgAQoCbHQYAiABKAFCkQHCSI0BCooBCglkb3VibGUubHQafSFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQpPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASsAEKA2x0ZRgDIAEoAUKgAcJInAEKmQEKCmRvdWJsZS5sdGUaigEhaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzID4gcnVsZXMubHRlKT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABL0BwoCZ3QYBCABKAFC5QfCSOEHCo4BCglkb3VibGUuZ3QagAEhaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwrEAQoMZG91YmxlLmd0X2x0GrMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKzgEKFmRvdWJsZS5ndF9sdF9leGNsdXNpdmUaswFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrUAQoNZG91YmxlLmd0X2x0ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCt4BChdkb3VibGUuZ3RfbHRlX2V4Y2x1c2l2ZRrCAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESvwgKA2d0ZRgFIAEoAUKvCMJIqwgKnAEKCmRvdWJsZS5ndGUajQEhaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgKHRoaXMuaXNOYW4oKSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycK0wEKDWRvdWJsZS5ndGVfbHQawQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCt0BChdkb3VibGUuZ3RlX2x0X2V4Y2x1c2l2ZRrBAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHRoaXMuaXNOYW4oKSB8fCAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK4wEKDmRvdWJsZS5ndGVfbHRlGtABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcy5pc05hbigpIHx8IHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrtAQoYZG91YmxlLmd0ZV9sdGVfZXhjbHVzaXZlGtABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmICh0aGlzLmlzTmFuKCkgfHwgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSkpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEnYKAmluGAYgAygBQmrCSGcKZQoJZG91YmxlLmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEncKBm5vdF9pbhgHIAMoAUJnwkhkCmIKDWRvdWJsZS5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxJ2CgZmaW5pdGUYCCABKAhCZsJIYwphCg1kb3VibGUuZmluaXRlGlBydWxlcy5maW5pdGUgPyAodGhpcy5pc05hbigpIHx8IHRoaXMuaXNJbmYoKSA/ICd2YWx1ZSBtdXN0IGJlIGZpbml0ZScgOiAnJykgOiAnJxIsCgdleGFtcGxlGAkgAygBQhvCSBgKFgoOZG91YmxlLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIucUCgpJbnQzMlJ1bGVzEmkKBWNvbnN0GAEgASgFQlrCSFcKVQoLaW50MzIuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSigEKAmx0GAIgASgFQnzCSHkKdwoIaW50MzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnAEKA2x0ZRgDIAEoBUKMAcJIiAEKhQEKCWludDMyLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASlwcKAmd0GAQgASgFQogHwkiEBwp6CghpbnQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKswEKC2ludDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq7AQoVaW50MzIuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKwwEKDGludDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKywEKFmludDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEuMHCgNndGUYBSABKAVC0wfCSM8HCogBCglpbnQzMi5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrCAQoMaW50MzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCsoBChZpbnQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrSAQoNaW50MzIuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwraAQoXaW50MzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdQoCaW4YBiADKAVCacJIZgpkCghpbnQzMi5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxJ2CgZub3RfaW4YByADKAVCZsJIYwphCgxpbnQzMi5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIrCgdleGFtcGxlGAggAygFQhrCSBcKFQoNaW50MzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4i5xQKCkludDY0UnVsZXMSaQoFY29uc3QYASABKANCWsJIVwpVCgtpbnQ2NC5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKKAQoCbHQYAiABKANCfMJIeQp3CghpbnQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKcAQoDbHRlGAMgASgDQowBwkiIAQqFAQoJaW50NjQubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKXBwoCZ3QYBCABKANCiAfCSIQHCnoKCGludDY0Lmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwqzAQoLaW50NjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrsBChVpbnQ2NC5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrDAQoMaW50NjQuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrLAQoWaW50NjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES4wcKA2d0ZRgFIAEoA0LTB8JIzwcKiAEKCWludDY0Lmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsIBCgxpbnQ2NC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKygEKFmludDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtIBCg1pbnQ2NC5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtoBChdpbnQ2NC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ1CgJpbhgGIAMoA0JpwkhmCmQKCGludDY0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnYKBm5vdF9pbhgHIAMoA0JmwkhjCmEKDGludDY0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEisKB2V4YW1wbGUYCSADKANCGsJIFwoVCg1pbnQ2NC5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiL4FAoLVUludDMyUnVsZXMSagoFY29uc3QYASABKA1CW8JIWApWCgx1aW50MzIuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSiwEKAmx0GAIgASgNQn3CSHoKeAoJdWludDMyLmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp0BCgNsdGUYAyABKA1CjQHCSIkBCoYBCgp1aW50MzIubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKcBwoCZ3QYBCABKA1CjQfCSIkHCnsKCXVpbnQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtAEKDHVpbnQzMi5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvAEKFnVpbnQzMi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrEAQoNdWludDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzAEKF3VpbnQzMi5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLoBwoDZ3RlGAUgASgNQtgHwkjUBwqJAQoKdWludDMyLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsMBCg11aW50MzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCssBChd1aW50MzIuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK0wEKDnVpbnQzMi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtsBChh1aW50MzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdgoCaW4YBiADKA1CasJIZwplCgl1aW50MzIuaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSdwoGbm90X2luGAcgAygNQmfCSGQKYgoNdWludDMyLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKA1CG8JIGAoWCg51aW50MzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4i+BQKC1VJbnQ2NFJ1bGVzEmoKBWNvbnN0GAEgASgEQlvCSFgKVgoMdWludDY0LmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEosBCgJsdBgCIAEoBEJ9wkh6CngKCXVpbnQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKdAQoDbHRlGAMgASgEQo0BwkiJAQqGAQoKdWludDY0Lmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASnAcKAmd0GAQgASgEQo0HwkiJBwp7Cgl1aW50NjQuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrQBCgx1aW50NjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCrwBChZ1aW50NjQuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxAEKDXVpbnQ2NC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCswBChd1aW50NjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES6AcKA2d0ZRgFIAEoBELYB8JI1AcKiQEKCnVpbnQ2NC5ndGUaeyFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDwgcnVsZXMuZ3RlPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlXSkgOiAnJwrDAQoNdWludDY0Lmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrLAQoXdWludDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtMBCg51aW50NjQuZ3RlX2x0ZRrAAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJwrbAQoYdWludDY0Lmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEnYKAmluGAYgAygEQmrCSGcKZQoJdWludDY0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEncKBm5vdF9pbhgHIAMoBEJnwkhkCmIKDXVpbnQ2NC5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIsCgdleGFtcGxlGAggAygEQhvCSBgKFgoOdWludDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIvgUCgtTSW50MzJSdWxlcxJqCgVjb25zdBgBIAEoEUJbwkhYClYKDHNpbnQzMi5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKLAQoCbHQYAiABKBFCfcJIegp4CglzaW50MzIubHQaayFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID49IHJ1bGVzLmx0PyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMubHRdKSA6ICcnSAASnQEKA2x0ZRgDIAEoEUKNAcJIiQEKhgEKCnNpbnQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEpwHCgJndBgEIAEoEUKNB8JIiQcKewoJc2ludDMyLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq0AQoMc2ludDMyLmd0X2x0GqMBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndCAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwq8AQoWc2ludDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsQBCg1zaW50MzIuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrMAQoXc2ludDMyLmd0X2x0ZV9leGNsdXNpdmUasAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndCAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJ0gBEugHCgNndGUYBSABKBFC2AfCSNQHCokBCgpzaW50MzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKwwEKDXNpbnQzMi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKywEKF3NpbnQzMi5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrTAQoOc2ludDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK2wEKGHNpbnQzMi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ2CgJpbhgGIAMoEUJqwkhnCmUKCXNpbnQzMi5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxJ3CgZub3RfaW4YByADKBFCZ8JIZApiCg1zaW50MzIubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLAoHZXhhbXBsZRgIIAMoEUIbwkgYChYKDnNpbnQzMi5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiL4FAoLU0ludDY0UnVsZXMSagoFY29uc3QYASABKBJCW8JIWApWCgxzaW50NjQuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSiwEKAmx0GAIgASgSQn3CSHoKeAoJc2ludDY0Lmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp0BCgNsdGUYAyABKBJCjQHCSIkBCoYBCgpzaW50NjQubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKcBwoCZ3QYBCABKBJCjQfCSIkHCnsKCXNpbnQ2NC5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtAEKDHNpbnQ2NC5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvAEKFnNpbnQ2NC5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrEAQoNc2ludDY0Lmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzAEKF3NpbnQ2NC5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLoBwoDZ3RlGAUgASgSQtgHwkjUBwqJAQoKc2ludDY0Lmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsMBCg1zaW50NjQuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCssBChdzaW50NjQuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK0wEKDnNpbnQ2NC5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCtsBChhzaW50NjQuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdgoCaW4YBiADKBJCasJIZwplCglzaW50NjQuaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSdwoGbm90X2luGAcgAygSQmfCSGQKYgoNc2ludDY0Lm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEiwKB2V4YW1wbGUYCCADKBJCG8JIGAoWCg5zaW50NjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4iiRUKDEZpeGVkMzJSdWxlcxJrCgVjb25zdBgBIAEoB0JcwkhZClcKDWZpeGVkMzIuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSjAEKAmx0GAIgASgHQn7CSHsKeQoKZml4ZWQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKeAQoDbHRlGAMgASgHQo4BwkiKAQqHAQoLZml4ZWQzMi5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqEHCgJndBgEIAEoB0KSB8JIjgcKfAoKZml4ZWQzMi5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtQEKDWZpeGVkMzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr0BChdmaXhlZDMyLmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsUBCg5maXhlZDMyLmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzQEKGGZpeGVkMzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES7QcKA2d0ZRgFIAEoB0LdB8JI2QcKigEKC2ZpeGVkMzIuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxAEKDmZpeGVkMzIuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCswBChhmaXhlZDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtQBCg9maXhlZDMyLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3AEKGWZpeGVkMzIuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdwoCaW4YBiADKAdCa8JIaApmCgpmaXhlZDMyLmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEngKBm5vdF9pbhgHIAMoB0JowkhlCmMKDmZpeGVkMzIubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLQoHZXhhbXBsZRgIIAMoB0IcwkgZChcKD2ZpeGVkMzIuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4iiRUKDEZpeGVkNjRSdWxlcxJrCgVjb25zdBgBIAEoBkJcwkhZClcKDWZpeGVkNjQuY29uc3QaRnRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCAlcycuZm9ybWF0KFtydWxlcy5jb25zdF0pIDogJycSjAEKAmx0GAIgASgGQn7CSHsKeQoKZml4ZWQ2NC5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKeAQoDbHRlGAMgASgGQo4BwkiKAQqHAQoLZml4ZWQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqEHCgJndBgEIAEoBkKSB8JIjgcKfAoKZml4ZWQ2NC5ndBpuIWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPD0gcnVsZXMuZ3Q/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndF0pIDogJycKtQEKDWZpeGVkNjQuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr0BChdmaXhlZDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsUBCg5maXhlZDY0Lmd0X2x0ZRqyAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA+PSBydWxlcy5ndCAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJycKzQEKGGZpeGVkNjQuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES7QcKA2d0ZRgFIAEoBkLdB8JI2QcKigEKC2ZpeGVkNjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxAEKDmZpeGVkNjQuZ3RlX2x0GrEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA+PSBydWxlcy5ndGUgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCswBChhmaXhlZDY0Lmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtQBCg9maXhlZDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3AEKGWZpeGVkNjQuZ3RlX2x0ZV9leGNsdXNpdmUavgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnSAESdwoCaW4YBiADKAZCa8JIaApmCgpmaXhlZDY0LmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEngKBm5vdF9pbhgHIAMoBkJowkhlCmMKDmZpeGVkNjQubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLQoHZXhhbXBsZRgIIAMoBkIcwkgZChcKD2ZpeGVkNjQuZXhhbXBsZRoEdHJ1ZSoJCOgHEICAgIACQgsKCWxlc3NfdGhhbkIOCgxncmVhdGVyX3RoYW4imhUKDVNGaXhlZDMyUnVsZXMSbAoFY29uc3QYASABKA9CXcJIWgpYCg5zZml4ZWQzMi5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKNAQoCbHQYAiABKA9Cf8JIfAp6CgtzZml4ZWQzMi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABKfAQoDbHRlGAMgASgPQo8BwkiLAQqIAQoMc2ZpeGVkMzIubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABKmBwoCZ3QYBCABKA9ClwfCSJMHCn0KC3NmaXhlZDMyLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq2AQoOc2ZpeGVkMzIuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr4BChhzZml4ZWQzMi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrGAQoPc2ZpeGVkMzIuZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrOAQoZc2ZpeGVkMzIuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAES8gcKA2d0ZRgFIAEoD0LiB8JI3gcKiwEKDHNmaXhlZDMyLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsUBCg9zZml4ZWQzMi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzQEKGXNmaXhlZDMyLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtUBChBzZml4ZWQzMi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCt0BChpzZml4ZWQzMi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJ4CgJpbhgGIAMoD0JswkhpCmcKC3NmaXhlZDMyLmluGlghKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnkKBm5vdF9pbhgHIAMoD0JpwkhmCmQKD3NmaXhlZDMyLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEi4KB2V4YW1wbGUYCCADKA9CHcJIGgoYChBzZml4ZWQzMi5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiKaFQoNU0ZpeGVkNjRSdWxlcxJsCgVjb25zdBgBIAEoEEJdwkhaClgKDnNmaXhlZDY0LmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEo0BCgJsdBgCIAEoEEJ/wkh8CnoKC3NmaXhlZDY0Lmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAEp8BCgNsdGUYAyABKBBCjwHCSIsBCogBCgxzZml4ZWQ2NC5sdGUaeCFoYXMocnVsZXMuZ3RlKSAmJiAhaGFzKHJ1bGVzLmd0KSAmJiB0aGlzID4gcnVsZXMubHRlPyAndmFsdWUgbXVzdCBiZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMubHRlXSkgOiAnJ0gAEqYHCgJndBgEIAEoEEKXB8JIkwcKfQoLc2ZpeGVkNjQuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrYBCg5zZml4ZWQ2NC5ndF9sdBqjAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPj0gcnVsZXMubHQgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKvgEKGHNmaXhlZDY0Lmd0X2x0X2V4Y2x1c2l2ZRqhAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndCAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDw9IHJ1bGVzLmd0KT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCsYBCg9zZml4ZWQ2NC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs4BChlzZml4ZWQ2NC5ndF9sdGVfZXhjbHVzaXZlGrABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0ZSA8IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0ZV0pIDogJydIARLyBwoDZ3RlGAUgASgQQuIHwkjeBwqLAQoMc2ZpeGVkNjQuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxQEKD3NmaXhlZDY0Lmd0ZV9sdBqxAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPj0gcnVsZXMuZ3RlICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrNAQoZc2ZpeGVkNjQuZ3RlX2x0X2V4Y2x1c2l2ZRqvAWhhcyhydWxlcy5sdCkgJiYgcnVsZXMubHQgPCBydWxlcy5ndGUgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8IHJ1bGVzLmd0ZSk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycK1QEKEHNmaXhlZDY0Lmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3QEKGnNmaXhlZDY0Lmd0ZV9sdGVfZXhjbHVzaXZlGr4BaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlIDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRlXSkgOiAnJ0gBEngKAmluGAYgAygQQmzCSGkKZwoLc2ZpeGVkNjQuaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSeQoGbm90X2luGAcgAygQQmnCSGYKZAoPc2ZpeGVkNjQubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSLgoHZXhhbXBsZRgIIAMoEEIdwkgaChgKEHNmaXhlZDY0LmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIqwBCglCb29sUnVsZXMSaAoFY29uc3QYASABKAhCWcJIVgpUCgpib29sLmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEioKB2V4YW1wbGUYAiADKAhCGcJIFgoUCgxib29sLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAiLgNgoLU3RyaW5nUnVsZXMSbAoFY29uc3QYASABKAlCXcJIWgpYCgxzdHJpbmcuY29uc3QaSHRoaXMgIT0gcnVsZXMuY29uc3QgPyAndmFsdWUgbXVzdCBlcXVhbCBgJXNgJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxJ+CgNsZW4YEyABKARCccJIbgpsCgpzdHJpbmcubGVuGl51aW50KHRoaXMuc2l6ZSgpKSAhPSBydWxlcy5sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgJXMgY2hhcmFjdGVycycuZm9ybWF0KFtydWxlcy5sZW5dKSA6ICcnEpkBCgdtaW5fbGVuGAIgASgEQocBwkiDAQqAAQoOc3RyaW5nLm1pbl9sZW4abnVpbnQodGhpcy5zaXplKCkpIDwgcnVsZXMubWluX2xlbiA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSBhdCBsZWFzdCAlcyBjaGFyYWN0ZXJzJy5mb3JtYXQoW3J1bGVzLm1pbl9sZW5dKSA6ICcnEpcBCgdtYXhfbGVuGAMgASgEQoUBwkiBAQp/Cg5zdHJpbmcubWF4X2xlbhptdWludCh0aGlzLnNpemUoKSkgPiBydWxlcy5tYXhfbGVuID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlIGF0IG1vc3QgJXMgY2hhcmFjdGVycycuZm9ybWF0KFtydWxlcy5tYXhfbGVuXSkgOiAnJxKbAQoJbGVuX2J5dGVzGBQgASgEQocBwkiDAQqAAQoQc3RyaW5nLmxlbl9ieXRlcxpsdWludChieXRlcyh0aGlzKS5zaXplKCkpICE9IHJ1bGVzLmxlbl9ieXRlcyA/ICd2YWx1ZSBsZW5ndGggbXVzdCBiZSAlcyBieXRlcycuZm9ybWF0KFtydWxlcy5sZW5fYnl0ZXNdKSA6ICcnEqMBCgltaW5fYnl0ZXMYBCABKARCjwHCSIsBCogBChBzdHJpbmcubWluX2J5dGVzGnR1aW50KGJ5dGVzKHRoaXMpLnNpemUoKSkgPCBydWxlcy5taW5fYnl0ZXMgPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWluX2J5dGVzXSkgOiAnJxKiAQoJbWF4X2J5dGVzGAUgASgEQo4BwkiKAQqHAQoQc3RyaW5nLm1heF9ieXRlcxpzdWludChieXRlcyh0aGlzKS5zaXplKCkpID4gcnVsZXMubWF4X2J5dGVzID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlIGF0IG1vc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWF4X2J5dGVzXSkgOiAnJxKNAQoHcGF0dGVybhgGIAEoCUJ8wkh5CncKDnN0cmluZy5wYXR0ZXJuGmUhdGhpcy5tYXRjaGVzKHJ1bGVzLnBhdHRlcm4pID8gJ3ZhbHVlIGRvZXMgbm90IG1hdGNoIHJlZ2V4IHBhdHRlcm4gYCVzYCcuZm9ybWF0KFtydWxlcy5wYXR0ZXJuXSkgOiAnJxKEAQoGcHJlZml4GAcgASgJQnTCSHEKbwoNc3RyaW5nLnByZWZpeBpeIXRoaXMuc3RhcnRzV2l0aChydWxlcy5wcmVmaXgpID8gJ3ZhbHVlIGRvZXMgbm90IGhhdmUgcHJlZml4IGAlc2AnLmZvcm1hdChbcnVsZXMucHJlZml4XSkgOiAnJxKCAQoGc3VmZml4GAggASgJQnLCSG8KbQoNc3RyaW5nLnN1ZmZpeBpcIXRoaXMuZW5kc1dpdGgocnVsZXMuc3VmZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHN1ZmZpeCBgJXNgJy5mb3JtYXQoW3J1bGVzLnN1ZmZpeF0pIDogJycSkAEKCGNvbnRhaW5zGAkgASgJQn7CSHsKeQoPc3RyaW5nLmNvbnRhaW5zGmYhdGhpcy5jb250YWlucyhydWxlcy5jb250YWlucykgPyAndmFsdWUgZG9lcyBub3QgY29udGFpbiBzdWJzdHJpbmcgYCVzYCcuZm9ybWF0KFtydWxlcy5jb250YWluc10pIDogJycSmAEKDG5vdF9jb250YWlucxgXIAEoCUKBAcJIfgp8ChNzdHJpbmcubm90X2NvbnRhaW5zGmV0aGlzLmNvbnRhaW5zKHJ1bGVzLm5vdF9jb250YWlucykgPyAndmFsdWUgY29udGFpbnMgc3Vic3RyaW5nIGAlc2AnLmZvcm1hdChbcnVsZXMubm90X2NvbnRhaW5zXSkgOiAnJxJ2CgJpbhgKIAMoCUJqwkhnCmUKCXN0cmluZy5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxJ3CgZub3RfaW4YCyADKAlCZ8JIZApiCg1zdHJpbmcubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycS3wEKBWVtYWlsGAwgASgIQs0BwkjJAQphCgxzdHJpbmcuZW1haWwSI3ZhbHVlIG11c3QgYmUgYSB2YWxpZCBlbWFpbCBhZGRyZXNzGiwhcnVsZXMuZW1haWwgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzRW1haWwoKQpkChJzdHJpbmcuZW1haWxfZW1wdHkSMnZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzGhohcnVsZXMuZW1haWwgfHwgdGhpcyAhPSAnJ0gAEucBCghob3N0bmFtZRgNIAEoCELSAcJIzgEKZQoPc3RyaW5nLmhvc3RuYW1lEh52YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaG9zdG5hbWUaMiFydWxlcy5ob3N0bmFtZSB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNIb3N0bmFtZSgpCmUKFXN0cmluZy5ob3N0bmFtZV9lbXB0eRItdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIGhvc3RuYW1lGh0hcnVsZXMuaG9zdG5hbWUgfHwgdGhpcyAhPSAnJ0gAEscBCgJpcBgOIAEoCEK4AcJItAEKVQoJc3RyaW5nLmlwEiB2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVAgYWRkcmVzcxomIXJ1bGVzLmlwIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwKCkKWwoPc3RyaW5nLmlwX2VtcHR5Ei92YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgYWRkcmVzcxoXIXJ1bGVzLmlwIHx8IHRoaXMgIT0gJydIABLWAQoEaXB2NBgPIAEoCELFAcJIwQEKXAoLc3RyaW5nLmlwdjQSInZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3MaKSFydWxlcy5pcHY0IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwKDQpCmEKEXN0cmluZy5pcHY0X2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NCBhZGRyZXNzGhkhcnVsZXMuaXB2NCB8fCB0aGlzICE9ICcnSAAS1gEKBGlwdjYYECABKAhCxQHCSMEBClwKC3N0cmluZy5pcHY2EiJ2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NiBhZGRyZXNzGikhcnVsZXMuaXB2NiB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcCg2KQphChFzdHJpbmcuaXB2Nl9lbXB0eRIxdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjYgYWRkcmVzcxoZIXJ1bGVzLmlwdjYgfHwgdGhpcyAhPSAnJ0gAEr8BCgN1cmkYESABKAhCrwHCSKsBClEKCnN0cmluZy51cmkSGXZhbHVlIG11c3QgYmUgYSB2YWxpZCBVUkkaKCFydWxlcy51cmkgfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzVXJpKCkKVgoQc3RyaW5nLnVyaV9lbXB0eRIodmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIFVSSRoYIXJ1bGVzLnVyaSB8fCB0aGlzICE9ICcnSAASZgoHdXJpX3JlZhgSIAEoCEJTwkhQCk4KDnN0cmluZy51cmlfcmVmEhl2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgVVJJGiEhcnVsZXMudXJpX3JlZiB8fCB0aGlzLmlzVXJpUmVmKClIABKQAgoHYWRkcmVzcxgVIAEoCEL8AcJI+AEKgQEKDnN0cmluZy5hZGRyZXNzEi12YWx1ZSBtdXN0IGJlIGEgdmFsaWQgaG9zdG5hbWUsIG9yIGlwIGFkZHJlc3MaQCFydWxlcy5hZGRyZXNzIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0hvc3RuYW1lKCkgfHwgdGhpcy5pc0lwKCkKcgoUc3RyaW5nLmFkZHJlc3NfZW1wdHkSPHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBob3N0bmFtZSwgb3IgaXAgYWRkcmVzcxocIXJ1bGVzLmFkZHJlc3MgfHwgdGhpcyAhPSAnJ0gAEpgCCgR1dWlkGBYgASgIQocCwkiDAgqlAQoLc3RyaW5nLnV1aWQSGnZhbHVlIG11c3QgYmUgYSB2YWxpZCBVVUlEGnohcnVsZXMudXVpZCB8fCB0aGlzID09ICcnIHx8IHRoaXMubWF0Y2hlcygnXlswLTlhLWZBLUZdezh9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezR9LVswLTlhLWZBLUZdezEyfSQnKQpZChFzdHJpbmcudXVpZF9lbXB0eRIpdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIFVVSUQaGSFydWxlcy51dWlkIHx8IHRoaXMgIT0gJydIABLwAQoFdHV1aWQYISABKAhC3gHCSNoBCnMKDHN0cmluZy50dXVpZBIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIHRyaW1tZWQgVVVJRBo/IXJ1bGVzLnR1dWlkIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5tYXRjaGVzKCdeWzAtOWEtZkEtRl17MzJ9JCcpCmMKEnN0cmluZy50dXVpZF9lbXB0eRIxdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIHRyaW1tZWQgVVVJRBoaIXJ1bGVzLnR1dWlkIHx8IHRoaXMgIT0gJydIABKWAgoRaXBfd2l0aF9wcmVmaXhsZW4YGiABKAhC+AHCSPQBCngKGHN0cmluZy5pcF93aXRoX3ByZWZpeGxlbhIfdmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQIHByZWZpeBo7IXJ1bGVzLmlwX3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KCkKeAoec3RyaW5nLmlwX3dpdGhfcHJlZml4bGVuX2VtcHR5Ei52YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgcHJlZml4GiYhcnVsZXMuaXBfd2l0aF9wcmVmaXhsZW4gfHwgdGhpcyAhPSAnJ0gAEs8CChNpcHY0X3dpdGhfcHJlZml4bGVuGBsgASgIQq8CwkirAgqTAQoac3RyaW5nLmlwdjRfd2l0aF9wcmVmaXhsZW4SNXZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUHY0IGFkZHJlc3Mgd2l0aCBwcmVmaXggbGVuZ3RoGj4hcnVsZXMuaXB2NF93aXRoX3ByZWZpeGxlbiB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcFByZWZpeCg0KQqSAQogc3RyaW5nLmlwdjRfd2l0aF9wcmVmaXhsZW5fZW1wdHkSRHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IGFkZHJlc3Mgd2l0aCBwcmVmaXggbGVuZ3RoGighcnVsZXMuaXB2NF93aXRoX3ByZWZpeGxlbiB8fCB0aGlzICE9ICcnSAASzwIKE2lwdjZfd2l0aF9wcmVmaXhsZW4YHCABKAhCrwLCSKsCCpMBChpzdHJpbmcuaXB2Nl93aXRoX3ByZWZpeGxlbhI1dmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaPiFydWxlcy5pcHY2X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KDYpCpIBCiBzdHJpbmcuaXB2Nl93aXRoX3ByZWZpeGxlbl9lbXB0eRJEdmFsdWUgaXMgZW1wdHksIHdoaWNoIGlzIG5vdCBhIHZhbGlkIElQdjYgYWRkcmVzcyB3aXRoIHByZWZpeCBsZW5ndGgaKCFydWxlcy5pcHY2X3dpdGhfcHJlZml4bGVuIHx8IHRoaXMgIT0gJydIABLyAQoJaXBfcHJlZml4GB0gASgIQtwBwkjYAQpsChBzdHJpbmcuaXBfcHJlZml4Eh92YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVAgcHJlZml4GjchcnVsZXMuaXBfcHJlZml4IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0lwUHJlZml4KHRydWUpCmgKFnN0cmluZy5pcF9wcmVmaXhfZW1wdHkSLnZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUCBwcmVmaXgaHiFydWxlcy5pcF9wcmVmaXggfHwgdGhpcyAhPSAnJ0gAEoMCCgtpcHY0X3ByZWZpeBgeIAEoCELrAcJI5wEKdQoSc3RyaW5nLmlwdjRfcHJlZml4EiF2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSVB2NCBwcmVmaXgaPCFydWxlcy5pcHY0X3ByZWZpeCB8fCB0aGlzID09ICcnIHx8IHRoaXMuaXNJcFByZWZpeCg0LCB0cnVlKQpuChhzdHJpbmcuaXB2NF9wcmVmaXhfZW1wdHkSMHZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IHByZWZpeBogIXJ1bGVzLmlwdjRfcHJlZml4IHx8IHRoaXMgIT0gJydIABKDAgoLaXB2Nl9wcmVmaXgYHyABKAhC6wHCSOcBCnUKEnN0cmluZy5pcHY2X3ByZWZpeBIhdmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgcHJlZml4GjwhcnVsZXMuaXB2Nl9wcmVmaXggfHwgdGhpcyA9PSAnJyB8fCB0aGlzLmlzSXBQcmVmaXgoNiwgdHJ1ZSkKbgoYc3RyaW5nLmlwdjZfcHJlZml4X2VtcHR5EjB2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBwcmVmaXgaICFydWxlcy5pcHY2X3ByZWZpeCB8fCB0aGlzICE9ICcnSAAStQIKDWhvc3RfYW5kX3BvcnQYICABKAhCmwLCSJcCCpkBChRzdHJpbmcuaG9zdF9hbmRfcG9ydBJBdmFsdWUgbXVzdCBiZSBhIHZhbGlkIGhvc3QgKGhvc3RuYW1lIG9yIElQIGFkZHJlc3MpIGFuZCBwb3J0IHBhaXIaPiFydWxlcy5ob3N0X2FuZF9wb3J0IHx8IHRoaXMgPT0gJycgfHwgdGhpcy5pc0hvc3RBbmRQb3J0KHRydWUpCnkKGnN0cmluZy5ob3N0X2FuZF9wb3J0X2VtcHR5Ejd2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgaG9zdCBhbmQgcG9ydCBwYWlyGiIhcnVsZXMuaG9zdF9hbmRfcG9ydCB8fCB0aGlzICE9ICcnSAASqAUKEHdlbGxfa25vd25fcmVnZXgYGCABKA4yGC5idWYudmFsaWRhdGUuS25vd25SZWdleELxBMJI7QQK8AEKI3N0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl9uYW1lEiZ2YWx1ZSBtdXN0IGJlIGEgdmFsaWQgSFRUUCBoZWFkZXIgbmFtZRqgAXJ1bGVzLndlbGxfa25vd25fcmVnZXggIT0gMSB8fCB0aGlzID09ICcnIHx8IHRoaXMubWF0Y2hlcyghaGFzKHJ1bGVzLnN0cmljdCkgfHwgcnVsZXMuc3RyaWN0ID8nXjo/WzAtOWEtekEtWiEjJCUmXCcqKy0uXl98flx4NjBdKyQnIDonXlteXHUwMDAwXHUwMDBBXHUwMDBEXSskJykKjQEKKXN0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl9uYW1lX2VtcHR5EjV2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSFRUUCBoZWFkZXIgbmFtZRopcnVsZXMud2VsbF9rbm93bl9yZWdleCAhPSAxIHx8IHRoaXMgIT0gJycK5wEKJHN0cmluZy53ZWxsX2tub3duX3JlZ2V4LmhlYWRlcl92YWx1ZRIndmFsdWUgbXVzdCBiZSBhIHZhbGlkIEhUVFAgaGVhZGVyIHZhbHVlGpUBcnVsZXMud2VsbF9rbm93bl9yZWdleCAhPSAyIHx8IHRoaXMubWF0Y2hlcyghaGFzKHJ1bGVzLnN0cmljdCkgfHwgcnVsZXMuc3RyaWN0ID8nXlteXHUwMDAwLVx1MDAwOFx1MDAwQS1cdTAwMUZcdTAwN0ZdKiQnIDonXlteXHUwMDAwXHUwMDBBXHUwMDBEXSokJylIABIOCgZzdHJpY3QYGSABKAgSLAoHZXhhbXBsZRgiIAMoCUIbwkgYChYKDnN0cmluZy5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCDAoKd2VsbF9rbm93biK/EAoKQnl0ZXNSdWxlcxJmCgVjb25zdBgBIAEoDEJXwkhUClIKC2J5dGVzLmNvbnN0GkN0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgYmUgJXgnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEngKA2xlbhgNIAEoBEJrwkhoCmYKCWJ5dGVzLmxlbhpZdWludCh0aGlzLnNpemUoKSkgIT0gcnVsZXMubGVuID8gJ3ZhbHVlIGxlbmd0aCBtdXN0IGJlICVzIGJ5dGVzJy5mb3JtYXQoW3J1bGVzLmxlbl0pIDogJycSkAEKB21pbl9sZW4YAiABKARCf8JIfAp6Cg1ieXRlcy5taW5fbGVuGml1aW50KHRoaXMuc2l6ZSgpKSA8IHJ1bGVzLm1pbl9sZW4gPyAndmFsdWUgbGVuZ3RoIG11c3QgYmUgYXQgbGVhc3QgJXMgYnl0ZXMnLmZvcm1hdChbcnVsZXMubWluX2xlbl0pIDogJycSiAEKB21heF9sZW4YAyABKARCd8JIdApyCg1ieXRlcy5tYXhfbGVuGmF1aW50KHRoaXMuc2l6ZSgpKSA+IHJ1bGVzLm1heF9sZW4gPyAndmFsdWUgbXVzdCBiZSBhdCBtb3N0ICVzIGJ5dGVzJy5mb3JtYXQoW3J1bGVzLm1heF9sZW5dKSA6ICcnEpABCgdwYXR0ZXJuGAQgASgJQn/CSHwKegoNYnl0ZXMucGF0dGVybhppIXN0cmluZyh0aGlzKS5tYXRjaGVzKHJ1bGVzLnBhdHRlcm4pID8gJ3ZhbHVlIG11c3QgbWF0Y2ggcmVnZXggcGF0dGVybiBgJXNgJy5mb3JtYXQoW3J1bGVzLnBhdHRlcm5dKSA6ICcnEoEBCgZwcmVmaXgYBSABKAxCccJIbgpsCgxieXRlcy5wcmVmaXgaXCF0aGlzLnN0YXJ0c1dpdGgocnVsZXMucHJlZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHByZWZpeCAleCcuZm9ybWF0KFtydWxlcy5wcmVmaXhdKSA6ICcnEn8KBnN1ZmZpeBgGIAEoDEJvwkhsCmoKDGJ5dGVzLnN1ZmZpeBpaIXRoaXMuZW5kc1dpdGgocnVsZXMuc3VmZml4KSA/ICd2YWx1ZSBkb2VzIG5vdCBoYXZlIHN1ZmZpeCAleCcuZm9ybWF0KFtydWxlcy5zdWZmaXhdKSA6ICcnEoMBCghjb250YWlucxgHIAEoDEJxwkhuCmwKDmJ5dGVzLmNvbnRhaW5zGlohdGhpcy5jb250YWlucyhydWxlcy5jb250YWlucykgPyAndmFsdWUgZG9lcyBub3QgY29udGFpbiAleCcuZm9ybWF0KFtydWxlcy5jb250YWluc10pIDogJycSlwEKAmluGAggAygMQooBwkiGAQqDAQoIYnl0ZXMuaW4ad2R5bihydWxlcylbJ2luJ10uc2l6ZSgpID4gMCAmJiAhKHRoaXMgaW4gZHluKHJ1bGVzKVsnaW4nXSkgPyAndmFsdWUgbXVzdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW2R5bihydWxlcylbJ2luJ11dKSA6ICcnEnYKBm5vdF9pbhgJIAMoDEJmwkhjCmEKDGJ5dGVzLm5vdF9pbhpRdGhpcyBpbiBydWxlcy5ub3RfaW4gPyAndmFsdWUgbXVzdCBub3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtydWxlcy5ub3RfaW5dKSA6ICcnEusBCgJpcBgKIAEoCELcAcJI2AEKdAoIYnl0ZXMuaXASIHZhbHVlIG11c3QgYmUgYSB2YWxpZCBJUCBhZGRyZXNzGkYhcnVsZXMuaXAgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSA0IHx8IHRoaXMuc2l6ZSgpID09IDE2CmAKDmJ5dGVzLmlwX2VtcHR5Ei92YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVAgYWRkcmVzcxodIXJ1bGVzLmlwIHx8IHRoaXMuc2l6ZSgpICE9IDBIABLkAQoEaXB2NBgLIAEoCELTAcJIzwEKZQoKYnl0ZXMuaXB2NBIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjQgYWRkcmVzcxozIXJ1bGVzLmlwdjQgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSA0CmYKEGJ5dGVzLmlwdjRfZW1wdHkSMXZhbHVlIGlzIGVtcHR5LCB3aGljaCBpcyBub3QgYSB2YWxpZCBJUHY0IGFkZHJlc3MaHyFydWxlcy5pcHY0IHx8IHRoaXMuc2l6ZSgpICE9IDBIABLlAQoEaXB2NhgMIAEoCELUAcJI0AEKZgoKYnl0ZXMuaXB2NhIidmFsdWUgbXVzdCBiZSBhIHZhbGlkIElQdjYgYWRkcmVzcxo0IXJ1bGVzLmlwdjYgfHwgdGhpcy5zaXplKCkgPT0gMCB8fCB0aGlzLnNpemUoKSA9PSAxNgpmChBieXRlcy5pcHY2X2VtcHR5EjF2YWx1ZSBpcyBlbXB0eSwgd2hpY2ggaXMgbm90IGEgdmFsaWQgSVB2NiBhZGRyZXNzGh8hcnVsZXMuaXB2NiB8fCB0aGlzLnNpemUoKSAhPSAwSAASKwoHZXhhbXBsZRgOIAMoDEIawkgXChUKDWJ5dGVzLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkIMCgp3ZWxsX2tub3duIq8DCglFbnVtUnVsZXMSaAoFY29uc3QYASABKAVCWcJIVgpUCgplbnVtLmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEhQKDGRlZmluZWRfb25seRgCIAEoCBJ0CgJpbhgDIAMoBUJowkhlCmMKB2VudW0uaW4aWCEodGhpcyBpbiBkeW4ocnVsZXMpWydpbiddKSA/ICd2YWx1ZSBtdXN0IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbZHluKHJ1bGVzKVsnaW4nXV0pIDogJycSdQoGbm90X2luGAQgAygFQmXCSGIKYAoLZW51bS5ub3RfaW4aUXRoaXMgaW4gcnVsZXMubm90X2luID8gJ3ZhbHVlIG11c3Qgbm90IGJlIGluIGxpc3QgJXMnLmZvcm1hdChbcnVsZXMubm90X2luXSkgOiAnJxIqCgdleGFtcGxlGAUgAygFQhnCSBYKFAoMZW51bS5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAIigQQKDVJlcGVhdGVkUnVsZXMSngEKCW1pbl9pdGVtcxgBIAEoBEKKAcJIhgEKgwEKEnJlcGVhdGVkLm1pbl9pdGVtcxptdWludCh0aGlzLnNpemUoKSkgPCBydWxlcy5taW5faXRlbXMgPyAndmFsdWUgbXVzdCBjb250YWluIGF0IGxlYXN0ICVkIGl0ZW0ocyknLmZvcm1hdChbcnVsZXMubWluX2l0ZW1zXSkgOiAnJxKiAQoJbWF4X2l0ZW1zGAIgASgEQo4BwkiKAQqHAQoScmVwZWF0ZWQubWF4X2l0ZW1zGnF1aW50KHRoaXMuc2l6ZSgpKSA+IHJ1bGVzLm1heF9pdGVtcyA/ICd2YWx1ZSBtdXN0IGNvbnRhaW4gbm8gbW9yZSB0aGFuICVzIGl0ZW0ocyknLmZvcm1hdChbcnVsZXMubWF4X2l0ZW1zXSkgOiAnJxJwCgZ1bmlxdWUYAyABKAhCYMJIXQpbCg9yZXBlYXRlZC51bmlxdWUSKHJlcGVhdGVkIHZhbHVlIG11c3QgY29udGFpbiB1bmlxdWUgaXRlbXMaHiFydWxlcy51bmlxdWUgfHwgdGhpcy51bmlxdWUoKRItCgVpdGVtcxgEIAEoCzIeLmJ1Zi52YWxpZGF0ZS5GaWVsZENvbnN0cmFpbnRzKgkI6AcQgICAgAIilgMKCE1hcFJ1bGVzEo8BCgltaW5fcGFpcnMYASABKARCfMJIeQp3Cg1tYXAubWluX3BhaXJzGmZ1aW50KHRoaXMuc2l6ZSgpKSA8IHJ1bGVzLm1pbl9wYWlycyA/ICdtYXAgbXVzdCBiZSBhdCBsZWFzdCAlZCBlbnRyaWVzJy5mb3JtYXQoW3J1bGVzLm1pbl9wYWlyc10pIDogJycSjgEKCW1heF9wYWlycxgCIAEoBEJ7wkh4CnYKDW1hcC5tYXhfcGFpcnMaZXVpbnQodGhpcy5zaXplKCkpID4gcnVsZXMubWF4X3BhaXJzID8gJ21hcCBtdXN0IGJlIGF0IG1vc3QgJWQgZW50cmllcycuZm9ybWF0KFtydWxlcy5tYXhfcGFpcnNdKSA6ICcnEiwKBGtleXMYBCABKAsyHi5idWYudmFsaWRhdGUuRmllbGRDb25zdHJhaW50cxIuCgZ2YWx1ZXMYBSABKAsyHi5idWYudmFsaWRhdGUuRmllbGRDb25zdHJhaW50cyoJCOgHEICAgIACIiYKCEFueVJ1bGVzEgoKAmluGAIgAygJEg4KBm5vdF9pbhgDIAMoCSL1FgoNRHVyYXRpb25SdWxlcxKHAQoFY29uc3QYAiABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CXcJIWgpYCg5kdXJhdGlvbi5jb25zdBpGdGhpcyAhPSBydWxlcy5jb25zdCA/ICd2YWx1ZSBtdXN0IGVxdWFsICVzJy5mb3JtYXQoW3J1bGVzLmNvbnN0XSkgOiAnJxKoAQoCbHQYAyABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25Cf8JIfAp6CgtkdXJhdGlvbi5sdBprIWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPj0gcnVsZXMubHQ/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5sdF0pIDogJydIABK6AQoDbHRlGAQgASgLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQo8BwkiLAQqIAQoMZHVyYXRpb24ubHRlGnghaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+IHJ1bGVzLmx0ZT8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmx0ZV0pIDogJydIABLBBwoCZ3QYBSABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25ClwfCSJMHCn0KC2R1cmF0aW9uLmd0Gm4haGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8PSBydWxlcy5ndD8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0XSkgOiAnJwq2AQoOZHVyYXRpb24uZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr4BChhkdXJhdGlvbi5ndF9sdF9leGNsdXNpdmUaoQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3QgJiYgKHJ1bGVzLmx0IDw9IHRoaXMgJiYgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBvciBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3QsIHJ1bGVzLmx0XSkgOiAnJwrGAQoPZHVyYXRpb24uZ3RfbHRlGrIBaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRlXSkgOiAnJwrOAQoZZHVyYXRpb24uZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESjQgKA2d0ZRgGIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkLiB8JI3gcKiwEKDGR1cmF0aW9uLmd0ZRp7IWhhcyhydWxlcy5sdCkgJiYgIWhhcyhydWxlcy5sdGUpICYmIHRoaXMgPCBydWxlcy5ndGU/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGVdKSA6ICcnCsUBCg9kdXJhdGlvbi5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzQEKGWR1cmF0aW9uLmd0ZV9sdF9leGNsdXNpdmUarwFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0IDwgcnVsZXMuZ3RlICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0ZSwgcnVsZXMubHRdKSA6ICcnCtUBChBkdXJhdGlvbi5ndGVfbHRlGsABaGFzKHJ1bGVzLmx0ZSkgJiYgcnVsZXMubHRlID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+IHJ1bGVzLmx0ZSB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdGVdKSA6ICcnCt0BChpkdXJhdGlvbi5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARKTAQoCaW4YByADKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CbMJIaQpnCgtkdXJhdGlvbi5pbhpYISh0aGlzIGluIGR5bihydWxlcylbJ2luJ10pID8gJ3ZhbHVlIG11c3QgYmUgaW4gbGlzdCAlcycuZm9ybWF0KFtkeW4ocnVsZXMpWydpbiddXSkgOiAnJxKUAQoGbm90X2luGAggAygLMhkuZ29vZ2xlLnByb3RvYnVmLkR1cmF0aW9uQmnCSGYKZAoPZHVyYXRpb24ubm90X2luGlF0aGlzIGluIHJ1bGVzLm5vdF9pbiA/ICd2YWx1ZSBtdXN0IG5vdCBiZSBpbiBsaXN0ICVzJy5mb3JtYXQoW3J1bGVzLm5vdF9pbl0pIDogJycSSQoHZXhhbXBsZRgJIAMoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbkIdwkgaChgKEGR1cmF0aW9uLmV4YW1wbGUaBHRydWUqCQjoBxCAgICAAkILCglsZXNzX3RoYW5CDgoMZ3JlYXRlcl90aGFuIvgXCg5UaW1lc3RhbXBSdWxlcxKJAQoFY29uc3QYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQl7CSFsKWQoPdGltZXN0YW1wLmNvbnN0GkZ0aGlzICE9IHJ1bGVzLmNvbnN0ID8gJ3ZhbHVlIG11c3QgZXF1YWwgJXMnLmZvcm1hdChbcnVsZXMuY29uc3RdKSA6ICcnEqsBCgJsdBgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBCgAHCSH0KewoMdGltZXN0YW1wLmx0GmshaGFzKHJ1bGVzLmd0ZSkgJiYgIWhhcyhydWxlcy5ndCkgJiYgdGhpcyA+PSBydWxlcy5sdD8gJ3ZhbHVlIG11c3QgYmUgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmx0XSkgOiAnJ0gAErwBCgNsdGUYBCABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQpABwkiMAQqJAQoNdGltZXN0YW1wLmx0ZRp4IWhhcyhydWxlcy5ndGUpICYmICFoYXMocnVsZXMuZ3QpICYmIHRoaXMgPiBydWxlcy5sdGU/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5sdGVdKSA6ICcnSAASbAoGbHRfbm93GAcgASgIQlrCSFcKVQoQdGltZXN0YW1wLmx0X25vdxpBKHJ1bGVzLmx0X25vdyAmJiB0aGlzID4gbm93KSA/ICd2YWx1ZSBtdXN0IGJlIGxlc3MgdGhhbiBub3cnIDogJydIABLHBwoCZ3QYBSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wQpwHwkiYBwp+Cgx0aW1lc3RhbXAuZ3QabiFoYXMocnVsZXMubHQpICYmICFoYXMocnVsZXMubHRlKSAmJiB0aGlzIDw9IHJ1bGVzLmd0PyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RdKSA6ICcnCrcBCg90aW1lc3RhbXAuZ3RfbHQaowFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ICYmICh0aGlzID49IHJ1bGVzLmx0IHx8IHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgYW5kIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndCwgcnVsZXMubHRdKSA6ICcnCr8BChl0aW1lc3RhbXAuZ3RfbHRfZXhjbHVzaXZlGqEBaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdCA8PSB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdF0pIDogJycKxwEKEHRpbWVzdGFtcC5ndF9sdGUasgFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3QgJiYgKHRoaXMgPiBydWxlcy5sdGUgfHwgdGhpcyA8PSBydWxlcy5ndCk/ICd2YWx1ZSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAlcyBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnCs8BChp0aW1lc3RhbXAuZ3RfbHRlX2V4Y2x1c2l2ZRqwAWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ICYmIChydWxlcy5sdGUgPCB0aGlzICYmIHRoaXMgPD0gcnVsZXMuZ3QpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gJXMgb3IgbGVzcyB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0LCBydWxlcy5sdGVdKSA6ICcnSAESkwgKA2d0ZRgGIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBC5wfCSOMHCowBCg10aW1lc3RhbXAuZ3RlGnshaGFzKHJ1bGVzLmx0KSAmJiAhaGFzKHJ1bGVzLmx0ZSkgJiYgdGhpcyA8IHJ1bGVzLmd0ZT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzJy5mb3JtYXQoW3J1bGVzLmd0ZV0pIDogJycKxgEKEHRpbWVzdGFtcC5ndGVfbHQasQFoYXMocnVsZXMubHQpICYmIHJ1bGVzLmx0ID49IHJ1bGVzLmd0ZSAmJiAodGhpcyA+PSBydWxlcy5sdCB8fCB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIGFuZCBsZXNzIHRoYW4gJXMnLmZvcm1hdChbcnVsZXMuZ3RlLCBydWxlcy5sdF0pIDogJycKzgEKGnRpbWVzdGFtcC5ndGVfbHRfZXhjbHVzaXZlGq8BaGFzKHJ1bGVzLmx0KSAmJiBydWxlcy5sdCA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHQgPD0gdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0XSkgOiAnJwrWAQoRdGltZXN0YW1wLmd0ZV9sdGUawAFoYXMocnVsZXMubHRlKSAmJiBydWxlcy5sdGUgPj0gcnVsZXMuZ3RlICYmICh0aGlzID4gcnVsZXMubHRlIHx8IHRoaXMgPCBydWxlcy5ndGUpPyAndmFsdWUgbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gJXMgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJycK3gEKG3RpbWVzdGFtcC5ndGVfbHRlX2V4Y2x1c2l2ZRq+AWhhcyhydWxlcy5sdGUpICYmIHJ1bGVzLmx0ZSA8IHJ1bGVzLmd0ZSAmJiAocnVsZXMubHRlIDwgdGhpcyAmJiB0aGlzIDwgcnVsZXMuZ3RlKT8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvICVzIG9yIGxlc3MgdGhhbiBvciBlcXVhbCB0byAlcycuZm9ybWF0KFtydWxlcy5ndGUsIHJ1bGVzLmx0ZV0pIDogJydIARJvCgZndF9ub3cYCCABKAhCXcJIWgpYChB0aW1lc3RhbXAuZ3Rfbm93GkQocnVsZXMuZ3Rfbm93ICYmIHRoaXMgPCBub3cpID8gJ3ZhbHVlIG11c3QgYmUgZ3JlYXRlciB0aGFuIG5vdycgOiAnJ0gBErgBCgZ3aXRoaW4YCSABKAsyGS5nb29nbGUucHJvdG9idWYuRHVyYXRpb25CjAHCSIgBCoUBChB0aW1lc3RhbXAud2l0aGluGnF0aGlzIDwgbm93LXJ1bGVzLndpdGhpbiB8fCB0aGlzID4gbm93K3J1bGVzLndpdGhpbiA/ICd2YWx1ZSBtdXN0IGJlIHdpdGhpbiAlcyBvZiBub3cnLmZvcm1hdChbcnVsZXMud2l0aGluXSkgOiAnJxJLCgdleGFtcGxlGAogAygLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcEIewkgbChkKEXRpbWVzdGFtcC5leGFtcGxlGgR0cnVlKgkI6AcQgICAgAJCCwoJbGVzc190aGFuQg4KDGdyZWF0ZXJfdGhhbiI5CgpWaW9sYXRpb25zEisKCnZpb2xhdGlvbnMYASADKAsyFy5idWYudmFsaWRhdGUuVmlvbGF0aW9uIlgKCVZpb2xhdGlvbhISCgpmaWVsZF9wYXRoGAEgASgJEhUKDWNvbnN0cmFpbnRfaWQYAiABKAkSDwoHbWVzc2FnZRgDIAEoCRIPCgdmb3Jfa2V5GAQgASgIKp0BCgZJZ25vcmUSFgoSSUdOT1JFX1VOU1BFQ0lGSUVEEAASGQoVSUdOT1JFX0lGX1VOUE9QVUxBVEVEEAESGwoXSUdOT1JFX0lGX0RFRkFVTFRfVkFMVUUQAhIRCg1JR05PUkVfQUxXQVlTEAMSFAoMSUdOT1JFX0VNUFRZEAEaAggBEhYKDklHTk9SRV9ERUZBVUxUEAIaAggBGgIQASpuCgpLbm93blJlZ2V4EhsKF0tOT1dOX1JFR0VYX1VOU1BFQ0lGSUVEEAASIAocS05PV05fUkVHRVhfSFRUUF9IRUFERVJfTkFNRRABEiEKHUtOT1dOX1JFR0VYX0hUVFBfSEVBREVSX1ZBTFVFEAI6XAoHbWVzc2FnZRIfLmdvb2dsZS5wcm90b2J1Zi5NZXNzYWdlT3B0aW9ucxiHCSABKAsyIC5idWYudmFsaWRhdGUuTWVzc2FnZUNvbnN0cmFpbnRzUgdtZXNzYWdlOlQKBW9uZW9mEh0uZ29vZ2xlLnByb3RvYnVmLk9uZW9mT3B0aW9ucxiHCSABKAsyHi5idWYudmFsaWRhdGUuT25lb2ZDb25zdHJhaW50c1IFb25lb2Y6VAoFZmllbGQSHS5nb29nbGUucHJvdG9idWYuRmllbGRPcHRpb25zGIcJIAEoCzIeLmJ1Zi52YWxpZGF0ZS5GaWVsZENvbnN0cmFpbnRzUgVmaWVsZDpjCgpwcmVkZWZpbmVkEh0uZ29vZ2xlLnByb3RvYnVmLkZpZWxkT3B0aW9ucxiICSABKAsyIy5idWYudmFsaWRhdGUuUHJlZGVmaW5lZENvbnN0cmFpbnRzUgpwcmVkZWZpbmVkQm4KEmJ1aWxkLmJ1Zi52YWxpZGF0ZUINVmFsaWRhdGVQcm90b1ABWkdidWYuYnVpbGQvZ2VuL2dvL2J1ZmJ1aWxkL3Byb3RvdmFsaWRhdGUvcHJvdG9jb2xidWZmZXJzL2dvL2J1Zi92YWxpZGF0ZQ", [vt, $u, Ze]), ha = /* @__PURE__ */ x("CidkZXZraXQvdjEvYWNjb3VudHNfbmF2aWdhdGlvbl9iYXIucHJvdG8SCWRldmtpdC52MSJ0Cg1OYXZpZ2F0aW9uQmFyEhkKEW5hdmlnYXRpb25fYmFyX2lkGAEgASgFEhsKE25hdmlnYXRpb25fYmFyX25hbWUYAiABKAkSKwoFaXRlbXMYBiADKAsyHC5kZXZraXQudjEuTmF2aWdhdGlvbkJhckl0ZW0izQEKEU5hdmlnYXRpb25CYXJJdGVtEh4KFm5hdmlnYXRpb25fYmFyX2l0ZW1faWQYCCABKAUSEQoJcGFyZW50X2lkGAkgASgFEgsKA2tleRgBIAEoCRINCgVsYWJlbBgCIAEoCRIQCghsYWJlbF9hchgDIAEoCRIMCgRpY29uGAQgASgJEg0KBXJvdXRlGAUgASgJEg0KBWxldmVsGAcgASgFEisKBWl0ZW1zGAYgAygLMhwuZGV2a2l0LnYxLk5hdmlnYXRpb25CYXJJdGVtYgZwcm90bzM"), le = /* @__PURE__ */ x("ChZkZXZraXQvdjEvY2xpZW50LnByb3RvEglkZXZraXQudjEiNQoKUm91dGVRdWVyeRISCgpxdWVyeV9uYW1lGAEgASgJEhMKC3F1ZXJ5X3ZhbHVlGAIgASgJIkQKElJlZGlyZWN0Um91dGVQYXJhbRISCgpwYXJhbV9uYW1lGAEgASgJEhoKEnJlc3BvbnNlX3ZhbHVlX2tleRgCIAEoCSL9AQoNQ3JlYXRlSGFuZGxlchINCgV0aXRsZRgBIAEoCRIWCg5yZWRpcmVjdF9yb3V0ZRgCIAEoCRI7ChRyZWRpcmVjdF9yb3V0ZV9wYXJhbRgDIAEoCzIdLmRldmtpdC52MS5SZWRpcmVjdFJvdXRlUGFyYW0SEgoKcm91dGVfbmFtZRgEIAEoCRIqCgtyb3V0ZV9xdWVyeRgFIAMoCzIVLmRldmtpdC52MS5Sb3V0ZVF1ZXJ5EhAKCGVuZHBvaW50GAYgASgJEhkKEXVwZGF0ZV9wYXJhbV9uYW1lGAcgASgJEhsKE3BhcmFtX3Byb3BlcnR5X25hbWUYCCABKAki3gEKDVVwZGF0ZUhhbmRsZXISDQoFdGl0bGUYASABKAkSFgoOcmVkaXJlY3Rfcm91dGUYAiABKAkSEgoKcm91dGVfbmFtZRgDIAEoCRIqCgtyb3V0ZV9xdWVyeRgEIAMoCzIVLmRldmtpdC52MS5Sb3V0ZVF1ZXJ5EhAKCGVuZHBvaW50GAUgASgJEhUKDWZpbmRfZW5kcG9pbnQYBiABKAkSHQoVZmluZF9yZXF1ZXN0X3Byb3BlcnR5GAcgASgJEh4KFmZpbmRfcmVzcG9uc2VfcHJvcGVydHkYCCABKAkiOwoNRGVsZXRlSGFuZGxlchIQCghlbmRwb2ludBgBIAEoCRIYChByZXF1ZXN0X3Byb3BlcnR5GAIgASgJIkIKFERlbGV0ZVJlc3RvcmVIYW5kbGVyEhAKCGVuZHBvaW50GAEgASgJEhgKEHJlcXVlc3RfcHJvcGVydHkYAiABKAkiPwoNSW1wb3J0SGFuZGxlchIQCghlbmRwb2ludBgBIAEoCRIcChRpbXBvcnRfdGVtcGxhdGVfbGluaxgCIAEoCSI7CgxFcnJvckhhbmRsZXISFwoPY29uc3RyYWludF9uYW1lGAEgASgJEhIKCmZpZWxkX25hbWUYAiABKAki1AIKEEF2YWlsYWJsZU9wdGlvbnMSDQoFdGl0bGUYASABKAkSEwoLZGVzY3JpcHRpb24YAiABKAkSEwoLdG90YWxfY291bnQYCCABKAUSMAoOY3JlYXRlX2hhbmRsZXIYAyABKAsyGC5kZXZraXQudjEuQ3JlYXRlSGFuZGxlchIwCg51cGRhdGVfaGFuZGxlchgEIAEoCzIYLmRldmtpdC52MS5VcGRhdGVIYW5kbGVyEj8KFmRlbGV0ZV9yZXN0b3JlX2hhbmRsZXIYBSABKAsyHy5kZXZraXQudjEuRGVsZXRlUmVzdG9yZUhhbmRsZXISMAoOZGVsZXRlX2hhbmRsZXIYBiABKAsyGC5kZXZraXQudjEuRGVsZXRlSGFuZGxlchIwCg5pbXBvcnRfaGFuZGxlchgHIAEoCzIYLmRldmtpdC52MS5JbXBvcnRIYW5kbGVyIn4KClJvd0FjdGlvbnMSMAoOdXBkYXRlX2hhbmRsZXIYASABKAsyGC5kZXZraXQudjEuVXBkYXRlSGFuZGxlchI+ChVkZWxldGVfcmVzb3JlX2hhbmRsZXIYAiABKAsyHy5kZXZraXQudjEuRGVsZXRlUmVzdG9yZUhhbmRsZXIiTQoRU2VsZWN0SW5wdXRPcHRpb24SDQoFdmFsdWUYASABKAUSDQoFbGFiZWwYAiABKAkSDAoEaWNvbhgDIAEoCRIMCgRub3RlGAQgASgJInEKGlNlbGVjdElucHV0T3B0aW9uV2l0aEdyb3VwEhIKCmdyb3VwX2ljb24YASABKAkSEgoKZ3JvdXBfbmFtZRgCIAEoCRIrCgVpdGVtcxgDIAMoCzIcLmRldmtpdC52MS5TZWxlY3RJbnB1dE9wdGlvbiI0ChREZWxldGVSZXN0b3JlUmVxdWVzdBIcCgdyZWNvcmRzGAEgAygFQgu6SAiSAQUQ9AMYASKbAQoQUGFnaW5hdGlvblBhcmFtcxITCgtzb3J0X2NvbHVtbhgBIAEoCRI2Cg1zb3J0X2Z1bmN0aW9uGAIgASgJQh+6SBzQAQFyFzIVXihBU0N8REVTQ3xhc2N8ZGVzYykkEhMKC3BhZ2VfbnVtYmVyGAMgASgFEhIKCmlzX2RlbGV0ZWQYBSABKAgSEQoJcGFnZV9zaXplGAYgASgFYgZwcm90bzM", [Q]), ya = /* @__PURE__ */ x("Ch1kZXZraXQvdjEvYWNjb3VudHNfdXNlci5wcm90bxIJZGV2a2l0LnYxIpICChdVc2VyQ3JlYXRlVXBkYXRlUmVxdWVzdBIPCgd1c2VyX2lkGAEgASgFEh0KCXVzZXJfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIRCgl0ZW5hbnRfaWQYCSABKAUSGwoTdXNlcl9zZWN1cml0eV9sZXZlbBgDIAEoBRIdCgx1c2VyX3R5cGVfaWQYBCABKAVCB7pIBBoCIAASGwoKdXNlcl9waG9uZRgFIAEoCUIHukgEcgIYMhIeCgp1c2VyX2VtYWlsGAYgASgJQgq6SAdyBRjIAWABEh8KDXVzZXJfcGFzc3dvcmQYByABKAlCCLpIBXIDGMgBEhoKBXJvbGVzGAggAygFQgu6SAiSAQUQ9AMYASKVAgoSQWNjb3VudHNTY2hlbWFVc2VyEg8KB3VzZXJfaWQYASABKAUSEQoJdXNlcl9uYW1lGAIgASgJEhEKCXRlbmFudF9pZBgMIAEoBRIbChN1c2VyX3NlY3VyaXR5X2xldmVsGAMgASgFEhQKDHVzZXJfdHlwZV9pZBgEIAEoBRISCgp1c2VyX3Bob25lGAUgASgJEhIKCnVzZXJfZW1haWwYBiABKAkSFQoNdXNlcl9wYXNzd29yZBgHIAEoCRIuCgpjcmVhdGVkX2F0GAkgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBISCgp1cGRhdGVkX2F0GAogASgJEhIKCmRlbGV0ZWRfYXQYCyABKAkiRwoYVXNlckNyZWF0ZVVwZGF0ZVJlc3BvbnNlEisKBHVzZXIYASABKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyIisKGFVzZXJEZWxldGVSZXN0b3JlUmVxdWVzdBIPCgdyZWNvcmRzGAEgAygFIksKGVVzZXJEZWxldGVSZXN0b3JlUmVzcG9uc2USLgoHcmVjb3JkcxgBIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVVzZXIiJAoRVXNlckRlbGV0ZVJlcXVlc3QSDwoHcmVjb3JkcxgBIAMoBSJEChJVc2VyRGVsZXRlUmVzcG9uc2USLgoHcmVjb3JkcxgBIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVVzZXIiEQoPVXNlckxpc3RSZXF1ZXN0IqgBChBVc2VyTGlzdFJlc3BvbnNlEi4KB3JlY29yZHMYASADKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyEjYKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVVzZXISLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIhYKFFVzZXJMaXN0SW5wdXRSZXF1ZXN0IkYKFVVzZXJMaXN0SW5wdXRSZXNwb25zZRItCgdvcHRpb25zGAEgAygLMhwuZGV2a2l0LnYxLlNlbGVjdElucHV0T3B0aW9uIhoKGFVzZXJUeXBlTGlzdElucHV0UmVxdWVzdCJKChlVc2VyVHlwZUxpc3RJbnB1dFJlc3BvbnNlEi0KB29wdGlvbnMYASADKAsyHC5kZXZraXQudjEuU2VsZWN0SW5wdXRPcHRpb24iLQoYVXNlckZpbmRGb3JVcGRhdGVSZXF1ZXN0EhEKCXJlY29yZF9pZBgBIAEoBSJQChlVc2VyRmluZEZvclVwZGF0ZVJlc3BvbnNlEjMKB3JlcXVlc3QYASABKAsyIi5kZXZraXQudjEuVXNlckNyZWF0ZVVwZGF0ZVJlcXVlc3RiBnByb3RvMw", [Q, le, Ze]), ys = /* @__PURE__ */ x("Ch1kZXZraXQvdjEvYWNjb3VudHNfYXV0aC5wcm90bxIJZGV2a2l0LnYxIlUKEEF1dGhMb2dpblJlcXVlc3QSHgoKbG9naW5fY29kZRgBIAEoCUIKukgHcgUQAxjIARIhCg11c2VyX3Bhc3N3b3JkGAIgASgJQgq6SAdyBRAGGMgBIkIKCUxvZ2luSW5mbxIUCgxhY2Nlc3NfdG9rZW4YASABKAkSHwoXYWNjZXNzX3Rva2VuX2V4cGlyZXNfYXQYBCABKAkioAEKEUF1dGhMb2dpblJlc3BvbnNlEisKBHVzZXIYASABKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyEigKCmxvZ2luX2luZm8YAiABKAsyFC5kZXZraXQudjEuTG9naW5JbmZvEjQKDm5hdmlnYXRpb25fYmFyGAMgAygLMhwuZGV2a2l0LnYxLk5hdmlnYXRpb25CYXJJdGVtItIBChNBdXRoUmVnaXN0ZXJSZXF1ZXN0Eh0KCXVzZXJfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIbChN1c2VyX3NlY3VyaXR5X2xldmVsGAMgASgFEh0KDHVzZXJfdHlwZV9pZBgEIAEoBUIHukgEGgIgABIbCgp1c2VyX3Bob25lGAUgASgJQge6SARyAhgyEiAKCnVzZXJfZW1haWwYBiABKAlCDLpICXIHEAQYyAFgARIhCg11c2VyX3Bhc3N3b3JkGAcgASgJQgq6SAdyBRAGGMgBIm0KFEF1dGhSZWdpc3RlclJlc3BvbnNlEisKBHVzZXIYASABKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFVc2VyEigKCmxvZ2luX2luZm8YAiABKAsyFC5kZXZraXQudjEuTG9naW5JbmZvIhYKFEF1dGhBdXRob3JpemVSZXF1ZXN0IkQKFUF1dGhBdXRob3JpemVSZXNwb25zZRIrCgR1c2VyGAEgASgLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hVXNlciIzChFBdXRoSW52aXRlUmVxdWVzdBIeCgp1c2VyX2VtYWlsGAEgASgJQgq6SAdyBRjIAWABIiUKEkF1dGhJbnZpdGVSZXNwb25zZRIPCgdtZXNzYWdlGAEgASgJIk0KGEF1dGhMb2dpblByb3ZpZGVyUmVxdWVzdBIbCghwcm92aWRlchgCIAEoCUIJukgGcgQQAxgUEhQKDHJlZGlyZWN0X3VybBgBIAEoCSIoChlBdXRoTG9naW5Qcm92aWRlclJlc3BvbnNlEgsKA3VybBgBIAEoCSJTCiBBdXRoTG9naW5Qcm92aWRlckNhbGxiYWNrUmVxdWVzdBIQCghwcm92aWRlchgBIAEoCRIdCgxhY2Nlc3NfdG9rZW4YAiABKAlCB7pIBHICEAYisAEKIUF1dGhMb2dpblByb3ZpZGVyQ2FsbGJhY2tSZXNwb25zZRIrCgR1c2VyGAEgASgLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hVXNlchIoCgpsb2dpbl9pbmZvGAIgASgLMhQuZGV2a2l0LnYxLkxvZ2luSW5mbxI0Cg5uYXZpZ2F0aW9uX2JhchgDIAMoCzIcLmRldmtpdC52MS5OYXZpZ2F0aW9uQmFySXRlbSI6Ch1BdXRoUmVzZXRQYXNzd29yZEVtYWlsUmVxdWVzdBIZCgVlbWFpbBgBIAEoCUIKukgHcgUYyAFgASIxCh5BdXRoUmVzZXRQYXNzd29yZEVtYWlsUmVzcG9uc2USDwoHbWVzc2FnZRgBIAEoCSK0AQoYQXV0aFJlc2V0UGFzc3dvcmRSZXF1ZXN0EhkKBWVtYWlsGAEgASgJQgq6SAdyBRjIAWABEh0KDG5ld19wYXNzd29yZBgCIAEoCUIHukgEcgIQBhIqChluZXdfcGFzc3dvcmRfY29uZmlybWF0aW9uGAMgASgJQge6SARyAhAGEhwKC3Jlc2V0X3Rva2VuGAQgASgJQge6SARyAhAGEhQKDHJlZGlyZWN0X3VybBgFIAEoCSKoAQoZQXV0aFJlc2V0UGFzc3dvcmRSZXNwb25zZRIrCgR1c2VyGAEgASgLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hVXNlchIoCgpsb2dpbl9pbmZvGAIgASgLMhQuZGV2a2l0LnYxLkxvZ2luSW5mbxI0Cg5uYXZpZ2F0aW9uX2JhchgDIAMoCzIcLmRldmtpdC52MS5OYXZpZ2F0aW9uQmFySXRlbWIGcHJvdG8z", [Q, ha, ya]), Is = /* @__PURE__ */ x("Ch1kZXZraXQvdjEvYWNjb3VudHNfcm9sZS5wcm90bxIJZGV2a2l0LnYxIsgBChdSb2xlQ3JlYXRlVXBkYXRlUmVxdWVzdBIPCgdyb2xlX2lkGAEgASgFEh0KCXJvbGVfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIkChNyb2xlX3NlY3VyaXR5X2xldmVsGAUgASgFQge6SAQaAiAAEhEKCXRlbmFudF9pZBgGIAEoBRIiChByb2xlX2Rlc2NyaXB0aW9uGAMgASgJQgi6SAVyAxjIARIgCgtwZXJtaXNzaW9ucxgEIAMoBUILukgIkgEFEPQDGAEioQEKEkFjY291bnRzU2NoZW1hUm9sZRIPCgdyb2xlX2lkGAEgASgFEhEKCXJvbGVfbmFtZRgCIAEoCRIRCgl0ZW5hbnRfaWQYByABKAUSGAoQcm9sZV9kZXNjcmlwdGlvbhgDIAEoCRISCgpjcmVhdGVkX2F0GAQgASgJEhIKCnVwZGF0ZWRfYXQYBSABKAkSEgoKZGVsZXRlZF9hdBgGIAEoCSJHChhSb2xlQ3JlYXRlVXBkYXRlUmVzcG9uc2USKwoEcm9sZRgBIAEoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVJvbGUiKwoYUm9sZURlbGV0ZVJlc3RvcmVSZXF1ZXN0Eg8KB3JlY29yZHMYASADKAUiSwoZUm9sZURlbGV0ZVJlc3RvcmVSZXNwb25zZRIuCgdyZWNvcmRzGAEgAygLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hUm9sZSIkChFSb2xlRGVsZXRlUmVxdWVzdBIPCgdyZWNvcmRzGAEgAygFIkQKElJvbGVEZWxldGVSZXNwb25zZRIuCgdyZWNvcmRzGAEgAygLMh0uZGV2a2l0LnYxLkFjY291bnRzU2NoZW1hUm9sZSJqCgtSb2xlRmlsdGVycxIRCglyb2xlX25hbWUYASABKAkSGAoQcm9sZV9kZXNjcmlwdGlvbhgCIAEoCRIXCg9jcmVhdGVkX2F0X2Zyb20YAyABKAkSFQoNY3JlYXRlZF9hdF90bxgEIAEoCSJyCg9Sb2xlTGlzdFJlcXVlc3QSJwoHZmlsdGVycxgBIAEoCzIWLmRldmtpdC52MS5Sb2xlRmlsdGVycxI2ChFwYWdpbmF0aW9uX3BhcmFtcxgCIAEoCzIbLmRldmtpdC52MS5QYWdpbmF0aW9uUGFyYW1zIqgBChBSb2xlTGlzdFJlc3BvbnNlEi4KB3JlY29yZHMYASADKAsyHS5kZXZraXQudjEuQWNjb3VudHNTY2hlbWFSb2xlEjYKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIdLmRldmtpdC52MS5BY2NvdW50c1NjaGVtYVJvbGUSLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIi0KGFJvbGVGaW5kRm9yVXBkYXRlUmVxdWVzdBIRCglyZWNvcmRfaWQYASABKAUiUAoZUm9sZUZpbmRGb3JVcGRhdGVSZXNwb25zZRIzCgdyZXF1ZXN0GAEgASgLMiIuZGV2a2l0LnYxLlJvbGVDcmVhdGVVcGRhdGVSZXF1ZXN0IhYKFFJvbGVMaXN0SW5wdXRSZXF1ZXN0IkYKFVJvbGVMaXN0SW5wdXRSZXNwb25zZRItCgdvcHRpb25zGAEgAygLMhwuZGV2a2l0LnYxLlNlbGVjdElucHV0T3B0aW9uYgZwcm90bzM", [Q, le]), Gs = /* @__PURE__ */ x("Ch1kZXZraXQvdjEvcHJvcGVydHlfY2l0eS5wcm90bxIJZGV2a2l0LnYxIqkBChRQcm9wZXJ0aWVzU2NoZW1hQ2l0eRIPCgdjaXR5X2lkGAEgASgFEhoKCWNpdHlfbmFtZRgCIAEoCUIHukgEcgIQARIUCgxjaXR5X25hbWVfYXIYAyABKAkSEgoKY2l0eV9pbWFnZRgEIAEoCRISCgpjcmVhdGVkX2F0GAUgASgJEhIKCnVwZGF0ZWRfYXQYBiABKAkSEgoKZGVsZXRlZF9hdBgHIAEoCSIRCg9DaXR5TGlzdFJlcXVlc3QirAEKEENpdHlMaXN0UmVzcG9uc2USMAoHcmVjb3JkcxgBIAMoCzIfLmRldmtpdC52MS5Qcm9wZXJ0aWVzU2NoZW1hQ2l0eRI4Cg9kZWxldGVkX3JlY29yZHMYAiADKAsyHy5kZXZraXQudjEuUHJvcGVydGllc1NjaGVtYUNpdHkSLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIhYKFENpdHlMaXN0SW5wdXRSZXF1ZXN0IkYKFUNpdHlMaXN0SW5wdXRSZXNwb25zZRItCgdvcHRpb25zGAEgAygLMhwuZGV2a2l0LnYxLlNlbGVjdElucHV0T3B0aW9uYgZwcm90bzM", [Q, le]), Zs = /* @__PURE__ */ x("CiFkZXZraXQvdjEvcHJvcGVydHlfbG9jYXRpb24ucHJvdG8SCWRldmtpdC52MSLOAQoYUHJvcGVydGllc1NjaGVtYUxvY2F0aW9uEhMKC2xvY2F0aW9uX2lkGAEgASgFEh4KDWxvY2F0aW9uX25hbWUYAiABKAlCB7pIBHICEAESGAoQbG9jYXRpb25fbmFtZV9hchgDIAEoCRIWCg5sb2NhdGlvbl9pbWFnZRgEIAEoCRIPCgdjaXR5X2lkGAggASgFEhIKCmNyZWF0ZWRfYXQYBSABKAkSEgoKdXBkYXRlZF9hdBgGIAEoCRISCgpkZWxldGVkX2F0GAcgASgJIhUKE0xvY2F0aW9uTGlzdFJlcXVlc3QiuAEKFExvY2F0aW9uTGlzdFJlc3BvbnNlEjQKB3JlY29yZHMYASADKAsyIy5kZXZraXQudjEuUHJvcGVydGllc1NjaGVtYUxvY2F0aW9uEjwKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIjLmRldmtpdC52MS5Qcm9wZXJ0aWVzU2NoZW1hTG9jYXRpb24SLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIj0KGExvY2F0aW9uTGlzdElucHV0UmVxdWVzdBIPCgdjaXR5X2lkGAEgASgFEhAKCGNpdHlfaWRzGAIgAygFIkoKGUxvY2F0aW9uTGlzdElucHV0UmVzcG9uc2USLQoHb3B0aW9ucxgBIAMoCzIcLmRldmtpdC52MS5TZWxlY3RJbnB1dE9wdGlvbmIGcHJvdG8z", [Q, le]), Vs = /* @__PURE__ */ x("ChxkZXZraXQvdjEvcHVibGljX2VtYWlsLnByb3RvEglkZXZraXQudjEizwIKEEVtYWlsU2VuZFJlcXVlc3QSDAoEZnJvbRgBIAEoCRIKCgJ0bxgCIAMoCRIPCgdzdWJqZWN0GAMgASgJEgsKA2JjYxgEIAMoCRIKCgJjYxgFIAMoCRIQCghyZXBseV90bxgGIAEoCRIMCgRodG1sGAcgASgJEgwKBHRleHQYCCABKAkSHAoEdGFncxgJIAMoCzIOLmRldmtpdC52MS5UYWcSKgoLYXR0YWNobWVudHMYCiADKAsyFS5kZXZraXQudjEuQXR0YWNobWVudBI5CgdoZWFkZXJzGAsgAygLMiguZGV2a2l0LnYxLkVtYWlsU2VuZFJlcXVlc3QuSGVhZGVyc0VudHJ5EhQKDHNjaGVkdWxlZF9hdBgMIAEoCRouCgxIZWFkZXJzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASIfChFFbWFpbFNlbmRSZXNwb25zZRIKCgJpZBgBIAEoCSIhCgNUYWcSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJIkUKCkF0dGFjaG1lbnQSEAoIZmlsZW5hbWUYASABKAkSFAoMY29udGVudF90eXBlGAIgASgJEg8KB2NvbnRlbnQYAyABKAxiBnByb3RvMw"), As = /* @__PURE__ */ x("ChtkZXZraXQvdjEvcHVibGljX2ljb24ucHJvdG8SCWRldmtpdC52MSJACgRJY29uEg8KB2ljb25faWQYASABKAUSEQoJaWNvbl9uYW1lGAIgASgJEhQKDGljb25fY29udGVudBgDIAEoCSI7ChBJY29uQ3JlYXRlVXBkYXRlEhEKCWljb25fbmFtZRgCIAEoCRIUCgxpY29uX2NvbnRlbnQYAyABKAkiEQoPSWNvbkxpc3RSZXF1ZXN0IjIKEEljb25MaXN0UmVzcG9uc2USHgoFaWNvbnMYASADKAsyDy5kZXZraXQudjEuSWNvbiI1Cg9JY29uRmluZFJlcXVlc3QSDwoHaWNvbl9pZBgBIAEoBRIRCglpY29uX25hbWUYAiABKAkiMQoQSWNvbkZpbmRSZXNwb25zZRIdCgRpY29uGAEgASgLMg8uZGV2a2l0LnYxLkljb24iSQobSWNvbkNyZWF0ZVVwZGF0ZUJ1bGtSZXF1ZXN0EioKBWljb25zGAEgAygLMhsuZGV2a2l0LnYxLkljb25DcmVhdGVVcGRhdGUiPgocSWNvbkNyZWF0ZVVwZGF0ZUJ1bGtSZXNwb25zZRIeCgVpY29ucxgBIAMoCzIPLmRldmtpdC52MS5JY29uYgZwcm90bzM"), Xs = /* @__PURE__ */ x("Ch5kZXZraXQvdjEvcHVibGljX3NldHRpbmcucHJvdG8SCWRldmtpdC52MSJOCgdTZXR0aW5nEhMKC3NldHRpbmdfa2V5GAEgASgJEhUKDXNldHRpbmdfdmFsdWUYAiABKAkSFwoPaW5wdXRfdHlwZV9uYW1lGAMgASgJIh0KG1NldHRpbmdGaW5kRm9yVXBkYXRlUmVxdWVzdCJaChdTZXR0aW5nVXBkYXRlUmVxdWVzdFJvdxIfCgtzZXR0aW5nX2tleRgBIAEoCUIKukgHcgUQAhjIARIeCg1zZXR0aW5nX3ZhbHVlGAIgASgJQge6SARyAhACIkwKFFNldHRpbmdVcGRhdGVSZXF1ZXN0EjQKCHNldHRpbmdzGAEgAygLMiIuZGV2a2l0LnYxLlNldHRpbmdVcGRhdGVSZXF1ZXN0Um93IlkKF1NldHRpbmdGaW5kRm9yVXBkYXRlUm93EhMKC3NldHRpbmdfa2V5GAEgASgJEhUKDXNldHRpbmdfdmFsdWUYAiABKAkSEgoKaW5wdXRfdHlwZRgDIAEoCSJUChxTZXR0aW5nRmluZEZvclVwZGF0ZVJlc3BvbnNlEjQKCHNldHRpbmdzGAEgAygLMiIuZGV2a2l0LnYxLlNldHRpbmdGaW5kRm9yVXBkYXRlUm93IhcKFVNldHRpbmdVcGRhdGVSZXNwb25zZWIGcHJvdG8z", [Q]), Ia = /* @__PURE__ */ x("Ch5kZXZraXQvdjEvcHVibGljX3N0b3JhZ2UucHJvdG8SCWRldmtpdC52MSJrChFGaWxlQ3JlYXRlUmVxdWVzdBIVCgRwYXRoGAEgASgJQge6SARyAhACEhwKC2J1Y2tldF9uYW1lGAIgASgJQge6SARyAhACEg4KBnJlYWRlchgDIAEoDBIRCglmaWxlX3R5cGUYBCABKAkiRAoVRmlsZUNyZWF0ZUJ1bGtSZXF1ZXN0EisKBWZpbGVzGAEgAygLMhwuZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXF1ZXN0IiIKEkZpbGVDcmVhdGVSZXNwb25zZRIMCgRwYXRoGAEgASgJIiYKFkZpbGVDcmVhdGVCdWxrUmVzcG9uc2USDAoEcGF0aBgBIAMoCSJqChJJbXBvcnRUYWJsZVJlcXVlc3QSGwoKdGFibGVfbmFtZRgBIAEoCUIHukgEcgIQAhITCgtzY2hlbWFfbmFtZRgCIAEoCRISCgpzaGVldF9uYW1lGAMgASgJEg4KBnJlYWRlchgEIAEoDCImChNJbXBvcnRUYWJsZVJlc3BvbnNlEg8KB21lc3NhZ2UYASABKAkipQEKDVN0b3JhZ2VCdWNrZXQSCgoCaWQYASABKAkSDAoEbmFtZRgCIAEoCRIOCgZwdWJsaWMYAyABKAgSEgoKY3JlYXRlZF9hdBgEIAEoCRISCgp1cGRhdGVkX2F0GAUgASgJEg0KBW93bmVyGAYgASgJEhcKD2ZpbGVfc2l6ZV9saW1pdBgHIAEoAxIaChJhbGxvd2VkX21pbWVfdHlwZXMYCCADKAkimwEKGUJ1Y2tldENyZWF0ZVVwZGF0ZVJlcXVlc3QSEwoLYnVja2V0X25hbWUYASABKAkSEAoIaXNfcHVsaWMYAiABKAgSKAoPZmlsZV9zaXplX2xpbWl0GAMgASgJQg+6SAxyCjIIXlswLTldKiQSGgoSYWxsb3dlZF9maWxlX3R5cGVzGAQgAygJEhEKCWlzX3VwZGF0ZRgFIAEoCCJGChpCdWNrZXRDcmVhdGVVcGRhdGVSZXNwb25zZRIoCgZidWNrZXQYASABKAsyGC5kZXZraXQudjEuU3RvcmFnZUJ1Y2tldCITChFCdWNrZXRMaXN0UmVxdWVzdCI/ChJCdWNrZXRMaXN0UmVzcG9uc2USKQoHYnVja2V0cxgBIAMoCzIYLmRldmtpdC52MS5TdG9yYWdlQnVja2V0IrkBCgxGaWxlTWV0YWRhdGESDQoFZV90YWcYASABKAkSDAoEc2l6ZRgCIAEoAxIQCghtaW1ldHlwZRgDIAEoCRIVCg1jYWNoZV9jb250cm9sGAQgASgJEjEKDWxhc3RfbW9kaWZpZWQYBSABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEhYKDmNvbnRlbnRfbGVuZ3RoGAYgASgDEhgKEGh0dHBfc3RhdHVzX2NvZGUYByABKAUi4AEKCkZpbGVPYmplY3QSDAoEbmFtZRgBIAEoCRIRCglidWNrZXRfaWQYAiABKAkSDQoFb3duZXIYAyABKAkSCgoCaWQYBCABKAkSEgoKdXBkYXRlZF9hdBgFIAEoCRISCgpjcmVhdGVkX2F0GAYgASgJEhgKEGxhc3RfYWNjZXNzZWRfYXQYByABKAkSKQoIbWV0YWRhdGEYCCABKAsyFy5kZXZraXQudjEuRmlsZU1ldGFkYXRhEikKB2J1Y2tldHMYCSABKAsyGC5kZXZraXQudjEuU3RvcmFnZUJ1Y2tldCJjCg9GaWxlTGlzdFJlcXVlc3QSHQoJYnVja2V0X2lkGAEgASgJQgq6SAdyBRABGMgBEhIKCnF1ZXJ5X3BhdGgYAiABKAkSDQoFbGltaXQYAyABKAUSDgoGb2ZmZXN0GAQgASgFIjgKEEZpbGVMaXN0UmVzcG9uc2USJAoFZmlsZXMYASADKAsyFS5kZXZraXQudjEuRmlsZU9iamVjdCK7AQoSR2FsbGVyeUxpc3RGaWx0ZXJzEh0KCWJ1Y2tldF9pZBgBIAEoCUIKukgHcgUQARjIARIRCglmaWxlX25hbWUYAiABKAkSDAoEcGF0aBgDIAEoCRIRCgltaW1lX3R5cGUYBCABKAkSEgoKcXVlcnlfcGF0aBgFIAEoCRIQCghtaW5fc2l6ZRgGIAEoBRIQCghtYXhfc2l6ZRgHIAEoBRIaChJjcmVhdGVkX2F0X2JldHdlZW4YCCADKAUifAoSR2FsbGVyeUxpc3RSZXF1ZXN0Ei4KB2ZpbHRlcnMYASABKAsyHS5kZXZraXQudjEuR2FsbGVyeUxpc3RGaWx0ZXJzEjYKEXBhZ2luYXRpb25fcGFyYW1zGAIgASgLMhsuZGV2a2l0LnYxLlBhZ2luYXRpb25QYXJhbXMiawoTR2FsbGVyeUxpc3RSZXNwb25zZRImCgdyZWNvcmRzGAEgAygLMhUuZGV2a2l0LnYxLkZpbGVPYmplY3QSLAoHb3B0aW9ucxgCIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIjEKEUZpbGVEZWxldGVSZXF1ZXN0EhwKB3JlY29yZHMYASADKAlCC7pICJIBBRD0AxgBIkYKEkZpbGVEZWxldGVSZXNwb25zZRIwCglyZXNwb25zZXMYASADKAsyHS5kZXZraXQudjEuRmlsZUNyZWF0ZVJlc3BvbnNlIk4KGUZpbGVEZWxldGVCeUJ1Y2tldFJlcXVlc3QSEwoLYnVja2V0X25hbWUYASABKAkSHAoHcmVjb3JkcxgCIAMoCUILukgIkgEFEPQDGAEiTgoaRmlsZURlbGV0ZUJ5QnVja2V0UmVzcG9uc2USMAoJcmVzcG9uc2VzGAEgAygLMh0uZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXNwb25zZWIGcHJvdG8z", [Q, le, Ze]), Cs = /* @__PURE__ */ x("CiJkZXZraXQvdjEvcHVibGljX3RyYW5zbGF0aW9uLnByb3RvEglkZXZraXQudjEiUwoLVHJhbnNsYXRpb24SFwoPdHJhbnNsYXRpb25fa2V5GAEgASgJEhUKDWVuZ2xpc2hfdmFsdWUYAiABKAkSFAoMYXJhYmljX3ZhbHVlGAMgASgJIk0KIlRyYW5zbGF0aW9uQ3JlYXRlVXBkYXRlQnVsa1JlcXVlc3QSJwoHcmVjb3JkcxgBIAMoCzIWLmRldmtpdC52MS5UcmFuc2xhdGlvbiIYChZUcmFuc2xhdGlvbkxpc3RSZXF1ZXN0IkcKF1RyYW5zbGF0aW9uTGlzdFJlc3BvbnNlEiwKDHRyYW5zbGF0aW9ucxgBIAMoCzIWLmRldmtpdC52MS5UcmFuc2xhdGlvbiIuChxUcmFuc2xhdGlvbkZpbmRMb2NhbGVSZXF1ZXN0Eg4KBmxvY2FsZRgBIAEoCSKmAQodVHJhbnNsYXRpb25GaW5kTG9jYWxlUmVzcG9uc2USUAoMdHJhbnNsYXRpb25zGAEgAygLMjouZGV2a2l0LnYxLlRyYW5zbGF0aW9uRmluZExvY2FsZVJlc3BvbnNlLlRyYW5zbGF0aW9uc0VudHJ5GjMKEVRyYW5zbGF0aW9uc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiKAoYVHJhbnNsYXRpb25EZWxldGVSZXF1ZXN0EgwKBGtleXMYASADKAkiSQoZVHJhbnNsYXRpb25EZWxldGVSZXNwb25zZRIsCgx0cmFuc2xhdGlvbnMYASADKAsyFi5kZXZraXQudjEuVHJhbnNsYXRpb24iUwojVHJhbnNsYXRpb25DcmVhdGVVcGRhdGVCdWxrUmVzcG9uc2USLAoMdHJhbnNsYXRpb25zGAEgAygLMhYuZGV2a2l0LnYxLlRyYW5zbGF0aW9uYgZwcm90bzM"), Ws = /* @__PURE__ */ x("Ch9kZXZraXQvdjEvc2VydmljZV9vcHRpb25zLnByb3RvEglkZXZraXQudjE6UQoTc2tpcF9hdXRoZW50aWNhdGlvbhIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGNGGAyABKAhSEnNraXBBdXRoZW50aWNhdGlvbjpPChJza2lwX2F1dGhvcml6YXRpb24SHi5nb29nbGUucHJvdG9idWYuTWV0aG9kT3B0aW9ucxjShgMgASgIUhFza2lwQXV0aG9yaXphdGlvbjpLChBwZXJtaXNzaW9uX2dyb3VwEh4uZ29vZ2xlLnByb3RvYnVmLk1ldGhvZE9wdGlvbnMY04YDIAEoCVIPcGVybWlzc2lvbkdyb3VwOkkKD3Blcm1pc3Npb25fbmFtZRIeLmdvb2dsZS5wcm90b2J1Zi5NZXRob2RPcHRpb25zGOPUAyABKAlSDnBlcm1pc3Npb25OYW1lYgZwcm90bzM", [vt]), Ga = /* @__PURE__ */ x("Ch5kZXZraXQvdjEvdGVuYW50X3BhcnRpYWwucHJvdG8SCWRldmtpdC52MSKtBgoUVGVuYW50c1NjaGVtYVBhcnRpYWwSEgoKcGFydGlhbF9pZBgBIAEoBRIUCgxwYXJ0aWFsX25hbWUYAiABKAkSFwoPcGFydGlhbF9uYW1lX2FyGAMgASgJEhQKDHBhcnRpYWxfbGluaxgEIAEoCRIPCgdhZGRyZXNzGAUgASgJEhsKE3BhcnRpYWxfYnV0dG9uX2xpbmsYBiABKAkSHAoUcGFydGlhbF9idXR0b25fbGFiZWwYByABKAkSHwoXcGFydGlhbF9idXR0b25fbGFiZWxfYXIYCCABKAkSGwoTcGFydGlhbF9idXR0b25faWNvbhgJIAEoCRIeChZwYXJ0aWFsX2J1dHRvbl9wYWdlX2lkGAogASgFEhcKD3BhcnRpYWxfdHlwZV9pZBgLIAEoBRISCgpzZWN0aW9uX2lkGAwgASgFEhUKDXBhcnRpYWxfaW1hZ2UYDSABKAkSFgoOcGFydGlhbF9pbWFnZXMYDiADKAkSSAoNcGFydGlhbF9saW5rcxgPIAMoCzIxLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFydGlhbC5QYXJ0aWFsTGlua3NFbnRyeRIVCg1wYXJ0aWFsX2ljb25zGBAgAygJEhUKDXBhcnRpYWxfdmlkZW8YESABKAkSEwoLaXNfZmVhdHVyZWQYEiABKAgSFQoNcGFydGlhbF9icmllZhgTIAEoCRIYChBwYXJ0aWFsX2JyaWVmX2FyGBQgASgJEhcKD3BhcnRpYWxfY29udGVudBgVIAEoCRIaChJwYXJ0aWFsX2NvbnRlbnRfYXIYFiABKAkSLgoKY3JlYXRlZF9hdBgXIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgYIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKZGVsZXRlZF9hdBgZIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAaMwoRUGFydGlhbExpbmtzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASIUChJQYXJ0aWFsTGlzdFJlcXVlc3QirwEKE1BhcnRpYWxMaXN0UmVzcG9uc2USMAoHcmVjb3JkcxgBIAMoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFydGlhbBI4Cg9kZWxldGVkX3JlY29yZHMYAiADKAsyHy5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhcnRpYWwSLAoHb3B0aW9ucxgDIAEoCzIbLmRldmtpdC52MS5BdmFpbGFibGVPcHRpb25zIoYHChpQYXJ0aWFsQ3JlYXRlVXBkYXRlUmVxdWVzdBISCgpwYXJ0aWFsX2lkGAEgASgFEiAKDHBhcnRpYWxfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIhCg9wYXJ0aWFsX25hbWVfYXIYAyABKAlCCLpIBXIDGMgBEiAKD3BhcnRpYWxfdHlwZV9pZBgEIAEoBUIHukgEGgIoARIbCgpzZWN0aW9uX2lkGAUgASgFQge6SAQaAigBEh8KDXBhcnRpYWxfaW1hZ2UYBiABKAlCCLpIBXIDGPQDEhYKDnBhcnRpYWxfaW1hZ2VzGAcgAygJEh8KDXBhcnRpYWxfdmlkZW8YCCABKAlCCLpIBXIDGPQDEhMKC2lzX2ZlYXR1cmVkGAkgASgIEh8KDXBhcnRpYWxfYnJpZWYYCiABKAlCCLpIBXIDGOgHEiIKEHBhcnRpYWxfYnJpZWZfYXIYCyABKAlCCLpIBXIDGOgHEiEKD3BhcnRpYWxfY29udGVudBgMIAEoCUIIukgFcgMYiCcSJAoScGFydGlhbF9jb250ZW50X2FyGA0gASgJQgi6SAVyAxiIJxImChRwYXJ0aWFsX2J1dHRvbl9sYWJlbBgOIAEoCUIIukgFcgMYyAESKQoXcGFydGlhbF9idXR0b25fbGFiZWxfYXIYDyABKAlCCLpIBXIDGMgBEiUKE3BhcnRpYWxfYnV0dG9uX2ljb24YECABKAlCCLpIBXIDGPQDEiUKE3BhcnRpYWxfYnV0dG9uX2xpbmsYESABKAlCCLpIBXIDGPQDEh4KFnBhcnRpYWxfYnV0dG9uX3BhZ2VfaWQYEiABKAUSHwoNcGFydGlhbF9pY29ucxgTIAEoCUIIukgFcgMY9AMSGQoHYWRkcmVzcxgUIAEoCUIIukgFcgMY6AcSTgoNcGFydGlhbF9saW5rcxgVIAMoCzI3LmRldmtpdC52MS5QYXJ0aWFsQ3JlYXRlVXBkYXRlUmVxdWVzdC5QYXJ0aWFsTGlua3NFbnRyeRIeCgxwYXJ0aWFsX2xpbmsYFiABKAlCCLpIBXIDGPQDEjEKB3VwbG9hZHMYFyABKAsyIC5kZXZraXQudjEuRmlsZUNyZWF0ZUJ1bGtSZXF1ZXN0GjMKEVBhcnRpYWxMaW5rc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEiTgobUGFydGlhbENyZWF0ZVVwZGF0ZVJlc3BvbnNlEi8KBnJlY29yZBgBIAEoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFydGlhbCI7ChtQYXJ0aWFsRGVsZXRlUmVzdG9yZVJlcXVlc3QSHAoHcmVjb3JkcxgBIAMoBUILukgIkgEFEPQDGAEiUAocUGFydGlhbERlbGV0ZVJlc3RvcmVSZXNwb25zZRIwCgdyZWNvcmRzGAEgAygLMh8uZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFQYXJ0aWFsIjAKG1BhcnRpYWxGaW5kRm9yVXBkYXRlUmVxdWVzdBIRCglyZWNvcmRfaWQYASABKAUiVgocUGFydGlhbEZpbmRGb3JVcGRhdGVSZXNwb25zZRI2CgdyZXF1ZXN0GAEgASgLMiUuZGV2a2l0LnYxLlBhcnRpYWxDcmVhdGVVcGRhdGVSZXF1ZXN0Ih0KG1BhcnRpYWxUeXBlTGlzdElucHV0UmVxdWVzdCJNChxQYXJ0aWFsVHlwZUxpc3RJbnB1dFJlc3BvbnNlEi0KB29wdGlvbnMYASADKAsyHC5kZXZraXQudjEuU2VsZWN0SW5wdXRPcHRpb25iBnByb3RvMw", [Q, le, Ia, Ze]), Za = /* @__PURE__ */ x("Ch5kZXZraXQvdjEvdGVuYW50X3NlY3Rpb24ucHJvdG8SCWRldmtpdC52MSKzBAoUVGVuYW50c1NjaGVtYVNlY3Rpb24SEgoKc2VjdGlvbl9pZBgBIAEoBRIUCgxzZWN0aW9uX25hbWUYAiABKAkSFwoPc2VjdGlvbl9uYW1lX2FyGAMgASgJEhYKDnNlY3Rpb25faGVhZGVyGAQgASgJEhkKEXNlY3Rpb25faGVhZGVyX2FyGAUgASgJEhsKE3NlY3Rpb25fZGVzY3JpcHRpb24YBiABKAkSHgoWc2VjdGlvbl9kZXNjcmlwdGlvbl9hchgHIAEoCRIcChRzZWN0aW9uX2J1dHRvbl9sYWJlbBgIIAEoCRIfChdzZWN0aW9uX2J1dHRvbl9sYWJlbF9hchgJIAEoCRIeChZzZWN0aW9uX2J1dHRvbl9wYWdlX2lkGAogASgFEhYKDnNlY3Rpb25faW1hZ2VzGAsgASgJEhwKFHNlY3Rpb25faW1hZ2VzX2FycmF5GBUgAygJEhEKCXRlbmFudF9pZBgMIAEoBRIaChJzZWN0aW9uX2JhY2tncm91bmQYDSABKAkSFAoMc2VjdGlvbl9pY29uGA4gASgJEi4KCmNyZWF0ZWRfYXQYDyABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCnVwZGF0ZWRfYXQYECABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEi4KCmRlbGV0ZWRfYXQYESABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wItoDChhUZW5hbnRzU2NoZW1hU2VjdGlvblZpZXcSEgoKc2VjdGlvbl9pZBgBIAEoBRIUCgxzZWN0aW9uX25hbWUYAiABKAkSFwoPc2VjdGlvbl9uYW1lX2FyGAMgASgJEhYKDnNlY3Rpb25faGVhZGVyGAQgASgJEhkKEXNlY3Rpb25faGVhZGVyX2FyGAUgASgJEhsKE3NlY3Rpb25fZGVzY3JpcHRpb24YBiABKAkSHgoWc2VjdGlvbl9kZXNjcmlwdGlvbl9hchgHIAEoCRIcChRzZWN0aW9uX2J1dHRvbl9sYWJlbBgIIAEoCRIfChdzZWN0aW9uX2J1dHRvbl9sYWJlbF9hchgJIAEoCRIeChZzZWN0aW9uX2J1dHRvbl9wYWdlX2lkGAogASgFEhwKFHNlY3Rpb25faW1hZ2VzX2FycmF5GBUgAygJEhYKDnNlY3Rpb25faW1hZ2VzGAsgASgJEhEKCXRlbmFudF9pZBgMIAEoBRIaChJzZWN0aW9uX2JhY2tncm91bmQYDSABKAkSFAoMc2VjdGlvbl9pY29uGA4gASgJEjEKCHBhcnRpYWxzGBIgAygLMh8uZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFQYXJ0aWFsIhQKElNlY3Rpb25MaXN0UmVxdWVzdCKvAQoTU2VjdGlvbkxpc3RSZXNwb25zZRIwCgdyZWNvcmRzGAEgAygLMh8uZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFTZWN0aW9uEjgKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hU2VjdGlvbhIsCgdvcHRpb25zGAMgASgLMhsuZGV2a2l0LnYxLkF2YWlsYWJsZU9wdGlvbnMiyQMKGlNlY3Rpb25DcmVhdGVVcGRhdGVSZXF1ZXN0EhIKCnNlY3Rpb25faWQYASABKAUSIAoMc2VjdGlvbl9uYW1lGAIgASgJQgq6SAdyBRACGMgBEiEKD3NlY3Rpb25fbmFtZV9hchgDIAEoCUIIukgFcgMYyAESJgoUc2VjdGlvbl9idXR0b25fbGFiZWwYBCABKAlCCLpIBXIDGMgBEikKF3NlY3Rpb25fYnV0dG9uX2xhYmVsX2FyGAUgASgJQgi6SAVyAxjIARIeChZzZWN0aW9uX2J1dHRvbl9wYWdlX2lkGAYgASgFEhYKDnNlY3Rpb25faGVhZGVyGAcgASgJEhkKEXNlY3Rpb25faGVhZGVyX2FyGAggASgJEhsKE3NlY3Rpb25fZGVzY3JpcHRpb24YCSABKAkSHgoWc2VjdGlvbl9kZXNjcmlwdGlvbl9hchgKIAEoCRIWCg5zZWN0aW9uX2ltYWdlcxgLIAMoCRIRCgl0ZW5hbnRfaWQYDCABKAUSJAoSc2VjdGlvbl9iYWNrZ3JvdW5kGA0gASgJQgi6SAVyAxj0AxIeCgxzZWN0aW9uX2ljb24YDiABKAlCCLpIBXIDGPQDIk4KG1NlY3Rpb25DcmVhdGVVcGRhdGVSZXNwb25zZRIvCgZyZWNvcmQYASABKAsyHy5kZXZraXQudjEuVGVuYW50c1NjaGVtYVNlY3Rpb24iOwobU2VjdGlvbkRlbGV0ZVJlc3RvcmVSZXF1ZXN0EhwKB3JlY29yZHMYASADKAVCC7pICJIBBRD0AxgBIlAKHFNlY3Rpb25EZWxldGVSZXN0b3JlUmVzcG9uc2USMAoHcmVjb3JkcxgBIAMoCzIfLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hU2VjdGlvbiIwChtTZWN0aW9uRmluZEZvclVwZGF0ZVJlcXVlc3QSEQoJcmVjb3JkX2lkGAEgASgFIlYKHFNlY3Rpb25GaW5kRm9yVXBkYXRlUmVzcG9uc2USNgoHcmVxdWVzdBgBIAEoCzIlLmRldmtpdC52MS5TZWN0aW9uQ3JlYXRlVXBkYXRlUmVxdWVzdCIYChZTZWN0aW9uTGlzdElucHRSZXF1ZXN0IkgKF1NlY3Rpb25MaXN0SW5wdFJlc3BvbnNlEi0KB29wdGlvbnMYASADKAsyHC5kZXZraXQudjEuU2VsZWN0SW5wdXRPcHRpb25iBnByb3RvMw", [Q, le, Ga, Ze]), Va = /* @__PURE__ */ x("ChtkZXZraXQvdjEvdGVuYW50X3BhZ2UucHJvdG8SCWRldmtpdC52MSL9AgoVVGVuYW50c1NjaGVtYVBhZ2VWaWV3Eg8KB3BhZ2VfaWQYASABKAUSEQoJcGFnZV9uYW1lGAIgASgJEhQKDHBhZ2VfbmFtZV9hchgDIAEoCRIYChBwYWdlX2Rlc2NyaXB0aW9uGAQgASgJEhsKE3BhZ2VfZGVzY3JpcHRpb25fYXIYBSABKAkSFwoPcGFnZV9icmVhZGNydW1iGAYgASgJEhEKCXRlbmFudF9pZBgHIAEoBRISCgpwYWdlX3JvdXRlGAggASgJEhgKEHBhZ2VfY292ZXJfaW1hZ2UYCSABKAkSGAoQcGFnZV9jb3Zlcl92aWRlbxgKIAEoCRIWCg5wYWdlX2tleV93b3JkcxgLIAEoCRIdChVwYWdlX21ldGFfZGVzY3JpcHRpb24YDCABKAkSEQoJcGFnZV9pY29uGA0gASgJEjUKCHNlY3Rpb25zGBEgAygLMiMuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFTZWN0aW9uVmlldyLSAwoRVGVuYW50c1NjaGVtYVBhZ2USDwoHcGFnZV9pZBgBIAEoBRIRCglwYWdlX25hbWUYAiABKAkSFAoMcGFnZV9uYW1lX2FyGAMgASgJEhgKEHBhZ2VfZGVzY3JpcHRpb24YBCABKAkSGwoTcGFnZV9kZXNjcmlwdGlvbl9hchgFIAEoCRIXCg9wYWdlX2JyZWFkY3J1bWIYBiABKAkSEQoJdGVuYW50X2lkGAcgASgFEhIKCnBhZ2Vfcm91dGUYCCABKAkSGAoQcGFnZV9jb3Zlcl9pbWFnZRgJIAEoCRIYChBwYWdlX2NvdmVyX3ZpZGVvGAogASgJEhYKDnBhZ2Vfa2V5X3dvcmRzGAsgASgJEh0KFXBhZ2VfbWV0YV9kZXNjcmlwdGlvbhgMIAEoCRIRCglwYWdlX2ljb24YDSABKAkSLgoKY3JlYXRlZF9hdBgOIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgPIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKZGVsZXRlZF9hdBgQIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXAiEQoPUGFnZUxpc3RSZXF1ZXN0IqYBChBQYWdlTGlzdFJlc3BvbnNlEi0KB3JlY29yZHMYASADKAsyHC5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhZ2USNQoPZGVsZXRlZF9yZWNvcmRzGAIgAygLMhwuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFQYWdlEiwKB29wdGlvbnMYAyABKAsyGy5kZXZraXQudjEuQXZhaWxhYmxlT3B0aW9ucyKaAwoXUGFnZUNyZWF0ZVVwZGF0ZVJlcXVlc3QSDwoHcGFnZV9pZBgBIAEoBRIdCglwYWdlX25hbWUYAiABKAlCCrpIB3IFEAIYyAESHgoMcGFnZV9uYW1lX2FyGAMgASgJQgi6SAVyAxjIARIYChBwYWdlX2Rlc2NyaXB0aW9uGAQgASgJEhsKE3BhZ2VfZGVzY3JpcHRpb25fYXIYBSABKAkSIQoPcGFnZV9icmVhZGNydW1iGAYgASgJQgi6SAVyAxjIARIRCgl0ZW5hbnRfaWQYByABKAUSHAoKcGFnZV9yb3V0ZRgIIAEoCUIIukgFcgMYyAESIgoQcGFnZV9jb3Zlcl9pbWFnZRgJIAEoCUIIukgFcgMY9AMSIgoQcGFnZV9jb3Zlcl92aWRlbxgKIAEoCUIIukgFcgMY9AMSFgoOcGFnZV9rZXlfd29yZHMYCyADKAkSJwoVcGFnZV9tZXRhX2Rlc2NyaXB0aW9uGAwgASgJQgi6SAVyAxisAhIbCglwYWdlX2ljb24YDSABKAlCCLpIBXIDGMgBIkgKGFBhZ2VDcmVhdGVVcGRhdGVSZXNwb25zZRIsCgZyZWNvcmQYASABKAsyHC5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhZ2UiOAoYUGFnZURlbGV0ZVJlc3RvcmVSZXF1ZXN0EhwKB3JlY29yZHMYASADKAVCC7pICJIBBRD0AxgBIkoKGVBhZ2VEZWxldGVSZXN0b3JlUmVzcG9uc2USLQoHcmVjb3JkcxgBIAMoCzIcLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hUGFnZSItChhQYWdlRmluZEZvclVwZGF0ZVJlcXVlc3QSEQoJcmVjb3JkX2lkGAEgASgFIlAKGVBhZ2VGaW5kRm9yVXBkYXRlUmVzcG9uc2USMwoHcmVxdWVzdBgBIAEoCzIiLmRldmtpdC52MS5QYWdlQ3JlYXRlVXBkYXRlUmVxdWVzdGIGcHJvdG8z", [Q, le, Za, Ze]), Bs = /* @__PURE__ */ x("Ch1kZXZraXQvdjEvdGVuYW50X3RlbmFudC5wcm90bxIJZGV2a2l0LnYxIuwEChlUZW5hbnRDcmVhdGVVcGRhdGVSZXF1ZXN0EhEKCXRlbmFudF9pZBgBIAEoBRIfCgt0ZW5hbnRfbmFtZRgCIAEoCUIKukgHcgUQAhjIARIgCg50ZW5hbnRfbmFtZV9hchgDIAEoCUIIukgFcgMYyAESHgoMdGVuYW50X3Bob25lGAQgASgJQgi6SAVyAxjIARIgCg50ZW5hbnRfYWRkcmVzcxgFIAEoCUIIukgFcgMYyAESIwoRdGVuYW50X2FkZHJlc3NfYXIYBiABKAlCCLpIBXIDGMgBEhoKEnRlbmFudF9kZXNjcmlwdGlvbhgHIAEoCRIdChV0ZW5hbnRfZGVzY3JpcHRpb25fYXIYCCABKAkSIAoMdGVuYW50X2VtYWlsGAkgASgJQgq6SAdyBRjIAWABEhMKC3RlbmFudF9sb2dvGBwgASgJEhwKFHRlbmFudF9sb2dvX3ZlcnRpY2FsGAsgASgJEhgKEHRlbmFudF9sb2dvX2RhcmsYDCABKAkSIQoZdGVuYW50X2xvZ29fZGFya192ZXJ0aWNhbBgNIAEoCRIVCg10ZW5hbnRfdmFsdWVzGA4gASgJEksKDHRlbmFudF9saW5rcxgSIAMoCzI1LmRldmtpdC52MS5UZW5hbnRDcmVhdGVVcGRhdGVSZXF1ZXN0LlRlbmFudExpbmtzRW50cnkSFQoNdGVuYW50X3Zpc2lvbhgPIAEoCRIWCg50ZW5hbnRfbWlzc2lvbhgQIAEoCRoyChBUZW5hbnRMaW5rc0VudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAEi3AQKE1RlbmFudHNTY2hlbWFUZW5hbnQSEQoJdGVuYW50X2lkGAEgASgFEhMKC3RlbmFudF9uYW1lGAIgASgJEhYKDnRlbmFudF9uYW1lX2FyGAMgASgJEhQKDHRlbmFudF9waG9uZRgEIAEoCRIWCg50ZW5hbnRfYWRkcmVzcxgFIAEoCRIZChF0ZW5hbnRfYWRkcmVzc19hchgGIAEoCRIaChJ0ZW5hbnRfZGVzY3JpcHRpb24YByABKAkSHQoVdGVuYW50X2Rlc2NyaXB0aW9uX2FyGAggASgJEhQKDHRlbmFudF9lbWFpbBgJIAEoCRITCgt0ZW5hbnRfbG9nbxgKIAEoCRIcChR0ZW5hbnRfbG9nb192ZXJ0aWNhbBgLIAEoCRIYChB0ZW5hbnRfbG9nb19kYXJrGAwgASgJEhUKDXRlbmFudF92YWx1ZXMYESABKAkSFQoNdGVuYW50X3Zpc2lvbhgSIAEoCRIWCg50ZW5hbnRfbWlzc2lvbhgTIAEoCRIhChl0ZW5hbnRfbG9nb19kYXJrX3ZlcnRpY2FsGA0gASgJEkUKDHRlbmFudF9saW5rcxgUIAMoCzIvLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50LlRlbmFudExpbmtzRW50cnkSEgoKY3JlYXRlZF9hdBgOIAEoCRISCgp1cGRhdGVkX2F0GA8gASgJEhIKCmRlbGV0ZWRfYXQYECABKAkaMgoQVGVuYW50TGlua3NFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBIsQFChdUZW5hbnRzU2NoZW1hVGVuYW50VmlldxIRCgl0ZW5hbnRfaWQYASABKAUSEwoLdGVuYW50X25hbWUYAiABKAkSFgoOdGVuYW50X25hbWVfYXIYAyABKAkSFAoMdGVuYW50X3Bob25lGAQgASgJEhYKDnRlbmFudF9hZGRyZXNzGAUgASgJEhkKEXRlbmFudF9hZGRyZXNzX2FyGAYgASgJEhoKEnRlbmFudF9kZXNjcmlwdGlvbhgHIAEoCRIdChV0ZW5hbnRfZGVzY3JpcHRpb25fYXIYCCABKAkSFAoMdGVuYW50X2VtYWlsGAkgASgJEhMKC3RlbmFudF9sb2dvGAogASgJEhwKFHRlbmFudF9sb2dvX3ZlcnRpY2FsGAsgASgJEhgKEHRlbmFudF9sb2dvX2RhcmsYDCABKAkSFQoNdGVuYW50X3ZhbHVlcxgNIAEoCRIVCg10ZW5hbnRfdmlzaW9uGA4gASgJEhYKDnRlbmFudF9taXNzaW9uGA8gASgJEiEKGXRlbmFudF9sb2dvX2RhcmtfdmVydGljYWwYECABKAkSSQoMdGVuYW50X2xpbmtzGBYgAygLMjMuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFUZW5hbnRWaWV3LlRlbmFudExpbmtzRW50cnkSEgoKY3JlYXRlZF9hdBgRIAEoCRISCgp1cGRhdGVkX2F0GBIgASgJEhIKCmRlbGV0ZWRfYXQYEyABKAkSLwoFcGFnZXMYFCADKAsyIC5kZXZraXQudjEuVGVuYW50c1NjaGVtYVBhZ2VWaWV3Ei0KC25hdmlnYXRpb25zGBUgAygLMhguZGV2a2l0LnYxLk5hdmlnYXRpb25CYXIaMgoQVGVuYW50TGlua3NFbnRyeRILCgNrZXkYASABKAkSDQoFdmFsdWUYAiABKAk6AjgBIkwKGlRlbmFudENyZWF0ZVVwZGF0ZVJlc3BvbnNlEi4KBnRlbmFudBgBIAEoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50IhMKEVRlbmFudExpc3RSZXF1ZXN0IqwBChJUZW5hbnRMaXN0UmVzcG9uc2USLwoHcmVjb3JkcxgBIAMoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50EjcKD2RlbGV0ZWRfcmVjb3JkcxgCIAMoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50EiwKB29wdGlvbnMYAyABKAsyGy5kZXZraXQudjEuQXZhaWxhYmxlT3B0aW9ucyI6ChpUZW5hbnREZWxldGVSZXN0b3JlUmVxdWVzdBIcCgdyZWNvcmRzGAEgAygFQgu6SAiSAQUQ9AMYASJOChtUZW5hbnREZWxldGVSZXN0b3JlUmVzcG9uc2USLwoHcmVjb3JkcxgBIAMoCzIeLmRldmtpdC52MS5UZW5hbnRzU2NoZW1hVGVuYW50Ii8KEVRlbmFudEZpbmRSZXF1ZXN0EhoKCXRlbmFudF9pZBgBIAEoBUIHukgEGgIgACJIChJUZW5hbnRGaW5kUmVzcG9uc2USMgoGdGVuYW50GAEgASgLMiIuZGV2a2l0LnYxLlRlbmFudHNTY2hlbWFUZW5hbnRWaWV3YgZwcm90bzM", [Q, ha, le, Va]), xs = /* @__PURE__ */ x("Ch5kZXZraXQvdjEvZGV2a2l0X3NlcnZpY2UucHJvdG8SCWRldmtpdC52MTKBLwoNRGV2a2l0U2VydmljZRJhCg9TZWN0aW9uTGlzdElucHQSIS5kZXZraXQudjEuU2VjdGlvbkxpc3RJbnB0UmVxdWVzdBoiLmRldmtpdC52MS5TZWN0aW9uTGlzdElucHRSZXNwb25zZSIHkAIBkLUYARJwChRQYXJ0aWFsVHlwZUxpc3RJbnB1dBImLmRldmtpdC52MS5QYXJ0aWFsVHlwZUxpc3RJbnB1dFJlcXVlc3QaJy5kZXZraXQudjEuUGFydGlhbFR5cGVMaXN0SW5wdXRSZXNwb25zZSIHkAIBkLUYARJwChRQYXJ0aWFsRmluZEZvclVwZGF0ZRImLmRldmtpdC52MS5QYXJ0aWFsRmluZEZvclVwZGF0ZVJlcXVlc3QaJy5kZXZraXQudjEuUGFydGlhbEZpbmRGb3JVcGRhdGVSZXNwb25zZSIHkAIBkLUYARJnChFQYWdlRmluZEZvclVwZGF0ZRIjLmRldmtpdC52MS5QYWdlRmluZEZvclVwZGF0ZVJlcXVlc3QaJC5kZXZraXQudjEuUGFnZUZpbmRGb3JVcGRhdGVSZXNwb25zZSIHkAIBkLUYARJbCg1DaXR5TGlzdElucHV0Eh8uZGV2a2l0LnYxLkNpdHlMaXN0SW5wdXRSZXF1ZXN0GiAuZGV2a2l0LnYxLkNpdHlMaXN0SW5wdXRSZXNwb25zZSIHkAIBiLUYARJICghDaXR5TGlzdBIaLmRldmtpdC52MS5DaXR5TGlzdFJlcXVlc3QaGy5kZXZraXQudjEuQ2l0eUxpc3RSZXNwb25zZSIDkAIBEmcKEUxvY2F0aW9uTGlzdElucHV0EiMuZGV2a2l0LnYxLkxvY2F0aW9uTGlzdElucHV0UmVxdWVzdBokLmRldmtpdC52MS5Mb2NhdGlvbkxpc3RJbnB1dFJlc3BvbnNlIgeQAgGItRgBElQKDExvY2F0aW9uTGlzdBIeLmRldmtpdC52MS5Mb2NhdGlvbkxpc3RSZXF1ZXN0Gh8uZGV2a2l0LnYxLkxvY2F0aW9uTGlzdFJlc3BvbnNlIgOQAgESZgoTVGVuYW50RGVsZXRlUmVzdG9yZRIlLmRldmtpdC52MS5UZW5hbnREZWxldGVSZXN0b3JlUmVxdWVzdBomLmRldmtpdC52MS5UZW5hbnREZWxldGVSZXN0b3JlUmVzcG9uc2UiABJSCgpUZW5hbnRGaW5kEhwuZGV2a2l0LnYxLlRlbmFudEZpbmRSZXF1ZXN0Gh0uZGV2a2l0LnYxLlRlbmFudEZpbmRSZXNwb25zZSIHkAIBiLUYARJOCgpUZW5hbnRMaXN0EhwuZGV2a2l0LnYxLlRlbmFudExpc3RSZXF1ZXN0Gh0uZGV2a2l0LnYxLlRlbmFudExpc3RSZXNwb25zZSIDkAIBEmMKElRlbmFudENyZWF0ZVVwZGF0ZRIkLmRldmtpdC52MS5UZW5hbnRDcmVhdGVVcGRhdGVSZXF1ZXN0GiUuZGV2a2l0LnYxLlRlbmFudENyZWF0ZVVwZGF0ZVJlc3BvbnNlIgASbAoUU2V0dGluZ0ZpbmRGb3JVcGRhdGUSJi5kZXZraXQudjEuU2V0dGluZ0ZpbmRGb3JVcGRhdGVSZXF1ZXN0GicuZGV2a2l0LnYxLlNldHRpbmdGaW5kRm9yVXBkYXRlUmVzcG9uc2UiA5ACARJUCg1TZXR0aW5nVXBkYXRlEh8uZGV2a2l0LnYxLlNldHRpbmdVcGRhdGVSZXF1ZXN0GiAuZGV2a2l0LnYxLlNldHRpbmdVcGRhdGVSZXNwb25zZSIAEkwKCEljb25MaXN0EhouZGV2a2l0LnYxLkljb25MaXN0UmVxdWVzdBobLmRldmtpdC52MS5JY29uTGlzdFJlc3BvbnNlIgeQAgGItRgBEkwKCEljb25GaW5kEhouZGV2a2l0LnYxLkljb25GaW5kUmVxdWVzdBobLmRldmtpdC52MS5JY29uRmluZFJlc3BvbnNlIgeQAgGItRgBEmkKFEljb25DcmVhdGVVcGRhdGVCdWxrEiYuZGV2a2l0LnYxLkljb25DcmVhdGVVcGRhdGVCdWxrUmVxdWVzdBonLmRldmtpdC52MS5JY29uQ3JlYXRlVXBkYXRlQnVsa1Jlc3BvbnNlIgASUgoKQnVja2V0TGlzdBIcLmRldmtpdC52MS5CdWNrZXRMaXN0UmVxdWVzdBodLmRldmtpdC52MS5CdWNrZXRMaXN0UmVzcG9uc2UiB5ACAYi1GAESYwoSQnVja2V0Q3JlYXRlVXBkYXRlEiQuZGV2a2l0LnYxLkJ1Y2tldENyZWF0ZVVwZGF0ZVJlcXVlc3QaJS5kZXZraXQudjEuQnVja2V0Q3JlYXRlVXBkYXRlUmVzcG9uc2UiABJkCghGaWxlTGlzdBIaLmRldmtpdC52MS5GaWxlTGlzdFJlcXVlc3QaGy5kZXZraXQudjEuRmlsZUxpc3RSZXNwb25zZSIfkAIBiLUYAZq1GAZvYmplY3Saph0KT2JqZWN0TGlzdBJtCgtHYWxsZXJ5TGlzdBIdLmRldmtpdC52MS5HYWxsZXJ5TGlzdFJlcXVlc3QaHi5kZXZraXQudjEuR2FsbGVyeUxpc3RSZXNwb25zZSIfkAIBiLUYAZq1GAZvYmplY3Saph0KT2JqZWN0TGlzdBJpCgpGaWxlQ3JlYXRlEhwuZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXF1ZXN0Gh0uZGV2a2l0LnYxLkZpbGVDcmVhdGVSZXNwb25zZSIekLUYAZq1GAZvYmplY3Saph0MT2JqZWN0Q3JlYXRlEm8KDkZpbGVDcmVhdGVCdWxrEiAuZGV2a2l0LnYxLkZpbGVDcmVhdGVCdWxrUmVxdWVzdBohLmRldmtpdC52MS5GaWxlQ3JlYXRlQnVsa1Jlc3BvbnNlIhiatRgGb2JqZWN0mqYdCk9iamVjdExpc3QSZQoKRmlsZURlbGV0ZRIcLmRldmtpdC52MS5GaWxlRGVsZXRlUmVxdWVzdBodLmRldmtpdC52MS5GaWxlRGVsZXRlUmVzcG9uc2UiGpq1GAZvYmplY3Saph0MT2JqZWN0RGVsZXRlEn0KEkZpbGVEZWxldGVCeUJ1Y2tldBIkLmRldmtpdC52MS5GaWxlRGVsZXRlQnlCdWNrZXRSZXF1ZXN0GiUuZGV2a2l0LnYxLkZpbGVEZWxldGVCeUJ1Y2tldFJlc3BvbnNlIhqatRgGb2JqZWN0mqYdDE9iamVjdERlbGV0ZRJOCgtJbXBvcnRUYWJsZRIdLmRldmtpdC52MS5JbXBvcnRUYWJsZVJlcXVlc3QaHi5kZXZraXQudjEuSW1wb3J0VGFibGVSZXNwb25zZSIAEkgKCUVtYWlsU2VuZBIbLmRldmtpdC52MS5FbWFpbFNlbmRSZXF1ZXN0GhwuZGV2a2l0LnYxLkVtYWlsU2VuZFJlc3BvbnNlIgASYQoPVHJhbnNsYXRpb25MaXN0EiEuZGV2a2l0LnYxLlRyYW5zbGF0aW9uTGlzdFJlcXVlc3QaIi5kZXZraXQudjEuVHJhbnNsYXRpb25MaXN0UmVzcG9uc2UiB5ACAYi1GAEScwoVVHJhbnNsYXRpb25GaW5kTG9jYWxlEicuZGV2a2l0LnYxLlRyYW5zbGF0aW9uRmluZExvY2FsZVJlcXVlc3QaKC5kZXZraXQudjEuVHJhbnNsYXRpb25GaW5kTG9jYWxlUmVzcG9uc2UiB5ACAYi1GAESfgobVHJhbnNsYXRpb25DcmVhdGVVcGRhdGVCdWxrEi0uZGV2a2l0LnYxLlRyYW5zbGF0aW9uQ3JlYXRlVXBkYXRlQnVsa1JlcXVlc3QaLi5kZXZraXQudjEuVHJhbnNsYXRpb25DcmVhdGVVcGRhdGVCdWxrUmVzcG9uc2UiABJgChFUcmFuc2xhdGlvbkRlbGV0ZRIjLmRldmtpdC52MS5UcmFuc2xhdGlvbkRlbGV0ZVJlcXVlc3QaJC5kZXZraXQudjEuVHJhbnNsYXRpb25EZWxldGVSZXNwb25zZSIAEkgKCFJvbGVMaXN0EhouZGV2a2l0LnYxLlJvbGVMaXN0UmVxdWVzdBobLmRldmtpdC52MS5Sb2xlTGlzdFJlc3BvbnNlIgOQAgESWwoNUm9sZUxpc3RJbnB1dBIfLmRldmtpdC52MS5Sb2xlTGlzdElucHV0UmVxdWVzdBogLmRldmtpdC52MS5Sb2xlTGlzdElucHV0UmVzcG9uc2UiB5ACAZC1GAESZwoRUm9sZUZpbmRGb3JVcGRhdGUSIy5kZXZraXQudjEuUm9sZUZpbmRGb3JVcGRhdGVSZXF1ZXN0GiQuZGV2a2l0LnYxLlJvbGVGaW5kRm9yVXBkYXRlUmVzcG9uc2UiB5ACAZC1GAESXQoQUm9sZUNyZWF0ZVVwZGF0ZRIiLmRldmtpdC52MS5Sb2xlQ3JlYXRlVXBkYXRlUmVxdWVzdBojLmRldmtpdC52MS5Sb2xlQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJgChFSb2xlRGVsZXRlUmVzdG9yZRIjLmRldmtpdC52MS5Sb2xlRGVsZXRlUmVzdG9yZVJlcXVlc3QaJC5kZXZraXQudjEuUm9sZURlbGV0ZVJlc3RvcmVSZXNwb25zZSIAEksKClJvbGVEZWxldGUSHC5kZXZraXQudjEuUm9sZURlbGV0ZVJlcXVlc3QaHS5kZXZraXQudjEuUm9sZURlbGV0ZVJlc3BvbnNlIgASSAoIVXNlckxpc3QSGi5kZXZraXQudjEuVXNlckxpc3RSZXF1ZXN0GhsuZGV2a2l0LnYxLlVzZXJMaXN0UmVzcG9uc2UiA5ACARJbCg1Vc2VyTGlzdElucHV0Eh8uZGV2a2l0LnYxLlVzZXJMaXN0SW5wdXRSZXF1ZXN0GiAuZGV2a2l0LnYxLlVzZXJMaXN0SW5wdXRSZXNwb25zZSIHkAIBkLUYARJnChFVc2VyVHlwZUxpc3RJbnB1dBIjLmRldmtpdC52MS5Vc2VyVHlwZUxpc3RJbnB1dFJlcXVlc3QaJC5kZXZraXQudjEuVXNlclR5cGVMaXN0SW5wdXRSZXNwb25zZSIHkAIBkLUYARJnChFVc2VyRmluZEZvclVwZGF0ZRIjLmRldmtpdC52MS5Vc2VyRmluZEZvclVwZGF0ZVJlcXVlc3QaJC5kZXZraXQudjEuVXNlckZpbmRGb3JVcGRhdGVSZXNwb25zZSIHkAIBkLUYARJdChBVc2VyQ3JlYXRlVXBkYXRlEiIuZGV2a2l0LnYxLlVzZXJDcmVhdGVVcGRhdGVSZXF1ZXN0GiMuZGV2a2l0LnYxLlVzZXJDcmVhdGVVcGRhdGVSZXNwb25zZSIAEmAKEVVzZXJEZWxldGVSZXN0b3JlEiMuZGV2a2l0LnYxLlVzZXJEZWxldGVSZXN0b3JlUmVxdWVzdBokLmRldmtpdC52MS5Vc2VyRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASSwoKVXNlckRlbGV0ZRIcLmRldmtpdC52MS5Vc2VyRGVsZXRlUmVxdWVzdBodLmRldmtpdC52MS5Vc2VyRGVsZXRlUmVzcG9uc2UiABJMCglBdXRoTG9naW4SGy5kZXZraXQudjEuQXV0aExvZ2luUmVxdWVzdBocLmRldmtpdC52MS5BdXRoTG9naW5SZXNwb25zZSIEiLUYARJVCgxBdXRoUmVnaXN0ZXISHi5kZXZraXQudjEuQXV0aFJlZ2lzdGVyUmVxdWVzdBofLmRldmtpdC52MS5BdXRoUmVnaXN0ZXJSZXNwb25zZSIEiLUYARJLCgpBdXRoSW52aXRlEhwuZGV2a2l0LnYxLkF1dGhJbnZpdGVSZXF1ZXN0Gh0uZGV2a2l0LnYxLkF1dGhJbnZpdGVSZXNwb25zZSIAElsKDUF1dGhBdXRob3JpemUSHy5kZXZraXQudjEuQXV0aEF1dGhvcml6ZVJlcXVlc3QaIC5kZXZraXQudjEuQXV0aEF1dGhvcml6ZVJlc3BvbnNlIgeQAgGQtRgBEmQKEUF1dGhMb2dpblByb3ZpZGVyEiMuZGV2a2l0LnYxLkF1dGhMb2dpblByb3ZpZGVyUmVxdWVzdBokLmRldmtpdC52MS5BdXRoTG9naW5Qcm92aWRlclJlc3BvbnNlIgSItRgBEnwKGUF1dGhMb2dpblByb3ZpZGVyQ2FsbGJhY2sSKy5kZXZraXQudjEuQXV0aExvZ2luUHJvdmlkZXJDYWxsYmFja1JlcXVlc3QaLC5kZXZraXQudjEuQXV0aExvZ2luUHJvdmlkZXJDYWxsYmFja1Jlc3BvbnNlIgSItRgBEnMKFkF1dGhSZXNldFBhc3N3b3JkRW1haWwSKC5kZXZraXQudjEuQXV0aFJlc2V0UGFzc3dvcmRFbWFpbFJlcXVlc3QaKS5kZXZraXQudjEuQXV0aFJlc2V0UGFzc3dvcmRFbWFpbFJlc3BvbnNlIgSItRgBEmQKEUF1dGhSZXNldFBhc3N3b3JkEiMuZGV2a2l0LnYxLkF1dGhSZXNldFBhc3N3b3JkUmVxdWVzdBokLmRldmtpdC52MS5BdXRoUmVzZXRQYXNzd29yZFJlc3BvbnNlIgSItRgBEmkKFFBhcnRpYWxEZWxldGVSZXN0b3JlEiYuZGV2a2l0LnYxLlBhcnRpYWxEZWxldGVSZXN0b3JlUmVxdWVzdBonLmRldmtpdC52MS5QYXJ0aWFsRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASZgoTUGFydGlhbENyZWF0ZVVwZGF0ZRIlLmRldmtpdC52MS5QYXJ0aWFsQ3JlYXRlVXBkYXRlUmVxdWVzdBomLmRldmtpdC52MS5QYXJ0aWFsQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJRCgtQYXJ0aWFsTGlzdBIdLmRldmtpdC52MS5QYXJ0aWFsTGlzdFJlcXVlc3QaHi5kZXZraXQudjEuUGFydGlhbExpc3RSZXNwb25zZSIDkAIBEmAKEVBhZ2VEZWxldGVSZXN0b3JlEiMuZGV2a2l0LnYxLlBhZ2VEZWxldGVSZXN0b3JlUmVxdWVzdBokLmRldmtpdC52MS5QYWdlRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASXQoQUGFnZUNyZWF0ZVVwZGF0ZRIiLmRldmtpdC52MS5QYWdlQ3JlYXRlVXBkYXRlUmVxdWVzdBojLmRldmtpdC52MS5QYWdlQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJICghQYWdlTGlzdBIaLmRldmtpdC52MS5QYWdlTGlzdFJlcXVlc3QaGy5kZXZraXQudjEuUGFnZUxpc3RSZXNwb25zZSIDkAIBEmkKFFNlY3Rpb25EZWxldGVSZXN0b3JlEiYuZGV2a2l0LnYxLlNlY3Rpb25EZWxldGVSZXN0b3JlUmVxdWVzdBonLmRldmtpdC52MS5TZWN0aW9uRGVsZXRlUmVzdG9yZVJlc3BvbnNlIgASZgoTU2VjdGlvbkNyZWF0ZVVwZGF0ZRIlLmRldmtpdC52MS5TZWN0aW9uQ3JlYXRlVXBkYXRlUmVxdWVzdBomLmRldmtpdC52MS5TZWN0aW9uQ3JlYXRlVXBkYXRlUmVzcG9uc2UiABJRCgtTZWN0aW9uTGlzdBIdLmRldmtpdC52MS5TZWN0aW9uTGlzdFJlcXVlc3QaHi5kZXZraXQudjEuU2VjdGlvbkxpc3RSZXNwb25zZSIDkAIBEnAKFFNlY3Rpb25GaW5kRm9yVXBkYXRlEiYuZGV2a2l0LnYxLlNlY3Rpb25GaW5kRm9yVXBkYXRlUmVxdWVzdBonLmRldmtpdC52MS5TZWN0aW9uRmluZEZvclVwZGF0ZVJlc3BvbnNlIgeQAgGQtRgBYgZwcm90bzM", [ys, Is, ya, Gs, Zs, Vs, As, Xs, Ia, Cs, Ws, Va, Ga, Za, Bs]), Rs = /* @__PURE__ */ Oo(xs, 0), Js = (e) => async (t) => {
  try {
    const r = localStorage.getItem("token");
    return t.header.append("Authorization", `bearer ${r}`), await e(t);
  } catch (r) {
    const n = {
      globalErrors: [],
      fieldErrors: {}
    };
    if (r.code == X.AlreadyExists)
      throw n.fieldErrors[r.rawMessage] = `${r.rawMessage}Unique`, new Error(JSON.stringify(n));
    console.log("rowmessageis", r.rawMessage), n.globalErrors = [`${r.rawMessage}`];
    const a = JSON.stringify(n), l = new Error(a);
    throw console.log("rowmessageis", l), l;
  }
}, Ss = hs({
  baseUrl: "http://localhost:9090",
  interceptors: [Js],
  useHttpGet: !0
}), Ys = Uo(Rs, Ss), Fs = (e) => {
  if (e.props && e.props.type == "form") {
    const { id: t, attrs: r } = e.props, { findHandler: n, syncWithUrl: a, usePresist: l } = r;
    console.log("asdsyncWithUrl", a);
    const u = (b) => {
      const h = Vt();
      if (!b || !b.endpoint) return;
      const c = {}, p = b.requestValue ? b.requestValue : h.params[b.routerParamName || "id"];
      c[b.requestPropertyName] = p, P(b.endpoint, Ys, c).then((m) => {
        if (m) {
          if (b.responsePropertyName && b.responsePropertyName in m) {
            const y = m[b.responsePropertyName];
            if (typeof y == "object" && y) {
              e.input(y);
              return;
            }
          }
          e.input(m);
        }
      }).catch((m) => {
        console.error("find handler failed", m);
      });
    }, o = (b) => {
      if (console.log("initial", b), b != null)
        try {
          return JSON.parse(b);
        } catch (h) {
          rn(t), localStorage.removeItem(t), console.log("error parsing url", h);
        }
    }, s = () => {
      if (!l) return;
      const b = localStorage.getItem(t);
      return b ? o(b) : {};
    }, d = () => {
      if (!a) return;
      const b = tn(t);
      return b ? o(b) : {};
    }, g = () => {
      if (console.log("default fetcher"), !a && !l)
        return;
      if (l) {
        const h = s();
        if (h && Le(h).length > 0) {
          e.input(h);
          return;
        }
      }
      console.log("default fetcher", e.props);
      const b = d();
      b && Le(b).length > 0 && e.input(b);
    };
    if (n) {
      u(n);
      return;
    }
    g(), console.log("node is node", e.props.attrs.findHandler);
  }
};
function en(e, t) {
  const r = `${t.props.type}__${e}`, n = `formkit-${e}`, a = t.props.family ? `family:${t.props.family}__${e}` : "", l = `${r}__${a}`;
  if (!(l in ie)) {
    const u = ie[r] ?? ks[e] ?? {};
    u[n] = !0, a in ie ? ie[l] = { ...ie[a], ...u } : ie[l] = u;
  }
  return ie[l] ?? { [n]: !0 };
}
const ie = {
  "family:button__wrapper": {
    "group-data-[disabled=true]:grayscale": !0
  },
  "family:button__input": {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "font-bold": !0,
    rounded: !0,
    "outline-none": !0,
    flex: !0,
    "!text-sm": !0,
    "px-7": !0,
    "py-3": !0,
    "items-center": !0,
    "mb-1.5": !0,
    "text-sm": !0,
    "ring-offset-2": !0,
    "ring-sky-400": !0,
    "focus-visible:ring-2": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "shadow-sm": !0,
    "group-data-[prefix-icon]:pl-5": !0,
    "group-data-[suffix-icon]:pr-5": !0,
    border: !0,
    "border-sky-500": !0,
    "text-sky-500": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "dark:border-sky-500": !0
  },
  "family:box__wrapper": {
    "inline-flex": !0,
    "items-center": !0,
    "mb-1": !0,
    "group-data-[multiple]:mb-0": !0
  },
  "family:box__legend": {
    block: !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "font-bold": !0,
    "dark:text-slate-300": !0,
    "mb-2": !0
  },
  "family:box__input": {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    peer: !0,
    "pointer-events-none": !0,
    absolute: !0,
    "h-0": !0,
    "w-0": !0,
    "overflow-hidden": !0,
    "opacity-0": !0
  },
  "family:box__decorator": {
    "mr-1.5": !0,
    "bg-white": !0,
    "ring-sky-400": !0,
    "peer-checked:border-sky-500": !0,
    relative: !0,
    block: !0,
    "text-lg": !0,
    "w-[1em]": !0,
    "aspect-[1/1]": !0,
    border: !0,
    "border-slate-300": !0,
    "text-transparent": !0,
    "peer-checked:bg-sky-50": !0,
    "peer-checked:text-sky-500": !0,
    "peer-focus-visible:ring-2": !0,
    "peer-focus-visible:ring-offset-1": !0,
    "select-none": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "peer-disabled:bg-slate-100": !0,
    "group-data-[disabled]:grayscale": !0,
    "shadow-sm": !0,
    "peer-disabled:cursor-not-allowed": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "dark:border-slate-600": !0,
    "dark:bg-transparent": !0,
    "dark:ring-offset-sky-400": !0,
    "dark:peer-focus-visible:ring-1": !0,
    "dark:peer-disabled:bg-slate-600/50": !0,
    "dark:peer-checked:bg-sky-800": !0,
    "dark:peer-checked:text-sky-300": !0
  },
  "family:box__decoratorIcon": {
    absolute: !0,
    "left-1/2": !0,
    "top-1/2": !0,
    flex: !0,
    "h-full": !0,
    "w-full": !0,
    "-translate-x-1/2": !0,
    "-translate-y-1/2": !0
  },
  "family:box__option": {
    "mb-1.5": !0,
    "last:mb-0": !0,
    "data-[disabled]:opacity-50": !0,
    "data-[disabled]:select-none": !0,
    "group-data-[disabled]:data-[disabled]:opacity-100": !0
  },
  "family:box__label": {
    block: !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "font-bold": !0,
    "mb-1": !0,
    "!mb-0": !0,
    "!font-normal": !0,
    "!text-sm": !0,
    "dark:text-slate-300": !0
  },
  "family:box__optionHelp": {
    "text-slate-500": !0,
    "text-xs": !0,
    "-mt-1": !0,
    "mb-1.5": !0,
    "ml-[min(2em,1.7rem)]": !0,
    relative: !0,
    "left-px": !0
  },
  "family:box__help": {
    "text-slate-500": !0,
    "text-xs": !0,
    "dark:text-slate-400": !0,
    "mb-1": !0,
    "group-data-[multiple]:mb-2": !0,
    "group-data-[multiple]:-mt-1.5": !0
  },
  "family:text__wrapper": {
    flex: !0,
    "flex-col": !0,
    "items-start": !0,
    "justify-start": !0,
    "mb-1.5": !0,
    "last:mb-0": !0
  },
  "family:text__label": {
    block: !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "font-bold": !0,
    "dark:text-slate-300": !0,
    "!inline-flex": !0,
    "mb-1": !0
  },
  "family:text__inner": {
    "text-base": !0,
    flex: !0,
    "items-center": !0,
    "w-full": !0,
    "py-2": !0,
    "px-3": !0,
    rounded: !0,
    border: !0,
    "border-slate-300": !0,
    "bg-white": !0,
    "focus-within:ring-1": !0,
    "focus-within:!ring-sky-400": !0,
    "focus-within:!border-sky-400": !0,
    "group-data-[invalid]:border-red-400": !0,
    "group-data-[invalid]:ring-1": !0,
    "group-data-[invalid]:ring-red-400": !0,
    "group-data-[disabled]:bg-slate-100": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "shadow-sm": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "dark:bg-transparent": !0,
    "dark:border-slate-600": !0,
    "dark:group-data-[disabled]:bg-slate-800/5": !0,
    "dark:group-data-[invalid]:border-red-400": !0,
    "dark:group-data-[invalid]:ring-red-400": !0
  },
  "family:text__input": {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "text-base": !0,
    "text-slate-700": !0,
    "min-w-0": !0,
    "min-h-[1.5em]": !0,
    grow: !0,
    "outline-none": !0,
    "bg-transparent": !0,
    "selection:bg-sky-100": !0,
    "placeholder:text-slate-400": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "dark:placeholder-slate-400/50": !0,
    "dark:text-slate-300": !0,
    "border-none": !0,
    "p-0": !0,
    "focus:ring-0": !0
  },
  "family:text__prefixIcon": {
    flex: !0,
    "items-center": !0,
    "-ml-1": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  "family:text__suffixIcon": {
    flex: !0,
    "items-center": !0,
    "-mr-1": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  "family:dropdown__wrapper": {
    "mb-1.5": !0
  },
  "family:dropdown__inner": {
    relative: !0,
    flex: !0,
    "items-center": !0,
    "bg-white": !0,
    border: !0,
    "border-slate-300": !0,
    rounded: !0,
    "group-data-[is-multiline]:!rounded": !0,
    "focus-within:ring-1": !0,
    "focus-within:!ring-sky-400": !0,
    "focus-within:!border-sky-400": !0,
    "group-data-[invalid]:border-red-400": !0,
    "group-data-[invalid]:ring-1": !0,
    "group-data-[invalid]:ring-red-400": !0,
    "group-data-[disabled]:bg-slate-100": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "shadow-sm": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "dark:bg-transparent": !0,
    "dark:border-slate-600": !0,
    "dark:group-data-[disabled]:bg-slate-700/40": !0,
    "dark:group-data-[invalid]:border-red-400": !0,
    "dark:group-data-[invalid]:ring-red-400": !0
  },
  "family:dropdown__input": {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    grow: !0,
    "p-2": !0,
    "pr-0": !0,
    "pl-3": !0,
    "text-base": !0,
    "text-slate-700": !0,
    "text-ellipsis": !0,
    "min-w-0": !0,
    "outline-none": !0,
    "bg-transparent": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "group-data-[prefix-icon]:!pl-0": !0,
    "group-data-[suffix-icon]:!pr-0": !0,
    "placeholder:text-slate-400": !0,
    "selection:bg-sky-100": !0,
    "dark:placeholder:text-slate-500": !0,
    "dark:text-slate-300": !0,
    "border-none": !0,
    "focus:ring-0": !0,
    "bg-none": !0
  },
  "family:dropdown__listboxButton": {
    "w-[2.5em]": !0,
    "self-stretch": !0,
    "text-base": !0,
    flex: !0,
    "items-center": !0,
    "text-slate-700": !0,
    "z-10": !0,
    "dark:text-slate-300": !0,
    "data-[disabled]:cursor-not-allowed": !0
  },
  "family:dropdown__removeSelection": {
    "w-[2.5em]": !0,
    "self-stretch": !0,
    "text-base": !0,
    flex: !0,
    "items-center": !0,
    "text-slate-700": !0,
    "hover:text-red-400": !0,
    "z-10": !0,
    "dark:text-slate-300": !0
  },
  "family:dropdown__controlLabel": {
    absolute: !0,
    "opacity-0": !0,
    "pointer-events-none": !0,
    "text-[0px]": !0
  },
  "family:dropdown__selectIcon": {
    "text-base": !0,
    "inline-flex": !0,
    "justify-center": !0,
    "w-[2.5em]": !0,
    relative: !0,
    "my-auto": !0,
    "[&>svg]:w-[1em]": !0,
    "[&>svg]:mx-auto": !0
  },
  "family:dropdown__closeIcon": {
    "text-base": !0,
    "w-[0.75em]": !0,
    relative: !0,
    "m-auto": !0
  },
  "family:dropdown__prefixIcon": {
    flex: !0,
    "items-center": !0,
    "-ml-1": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "!ml-2": !0,
    "!mr-0": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  "family:dropdown__suffixIcon": {
    flex: !0,
    "items-center": !0,
    "-mr-1": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "!mr-2": !0,
    "!ml-0": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  "family:dropdown__dropdownWrapper": {
    rounded: !0,
    "shadow-md": !0,
    "mt-1": !0,
    "overflow-clip": !0,
    "empty:hidden": !0,
    border: !0,
    "border-slate-200": !0,
    "dark:border-slate-700": !0,
    "group-data-[expanded]:opacity-100": !0,
    "group-data-[overscroll]:m-0": !0,
    "group-data-[overscroll]:shadow-none": !0,
    "group-data-[overscroll]:border-none": !0
  },
  "family:dropdown__listitemGroup": {
    "group/optgroup": !0,
    "last:pb-0": !0,
    "border-t": !0,
    "border-b": !0,
    "-mb-px": !0,
    "border-slate-200": !0,
    "dark:border-slate-700": !0
  },
  "family:dropdown__groupLabel": {
    block: !0,
    "pt-1.5": !0,
    "pb-1": !0,
    "px-2.5": !0,
    "font-bold": !0,
    "pointer-events-none": !0,
    "text-slate-500": !0,
    "dark:text-slate-400": !0
  },
  "family:dropdown__listbox": {
    "bg-white": !0,
    rounded: !0,
    "empty:hidden": !0,
    "dark:bg-slate-800": !0,
    "group-data-[overscroll]:shadow-md": !0,
    "group-data-[overscroll]:border": !0,
    "group-data-[overscroll]:border-slate-200": !0,
    "group-data-[overscroll]:dark:border-slate-700": !0
  },
  "family:dropdown__listitem": {
    relative: !0,
    flex: !0,
    "items-center": !0,
    "px-2": !0,
    "py-1.5": !0,
    "first:pt-2": !0,
    "last:pb-2": !0,
    "text-slate-700": !0,
    "text-base": !0,
    "data-[is-active]:bg-sky-100": !0,
    "dark:text-slate-200": !0,
    "dark:data-[is-active]:text-slate-700": !0,
    "before:content-['']": !0,
    "before:absolute": !0,
    "before:inset-0": !0,
    "data-[is-active]:first:before:rounded": !0,
    "data-[is-active]:first:before:rounded-b-none": !0,
    "data-[is-active]:last:before:rounded": !0,
    "data-[is-active]:last:before:rounded-t-none": !0,
    "data-[is-active]:first:last:before:rounded": !0,
    "data-[is-active]:before:ring-1": !0,
    "data-[is-active]:before:ring-sky-400": !0,
    "data-[is-active]:before:ring-inset": !0,
    "data-[is-active]:before:ring-offset-sky-100": !0,
    "group-[]/optgroup:first:before:!rounded-none": !0,
    "group-[]/optgroup:last:before:!rounded-none": !0
  },
  "family:dropdown__selectedIcon": {
    flex: !0,
    absolute: !0,
    "items-center": !0,
    "text-sky-500": !0,
    "left-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0
  },
  "family:dropdown__option": {
    "ml-[1.5em]": !0
  },
  "family:dropdown__loadMore": {
    "data-[is-active]:bg-sky-100": !0
  },
  "family:dropdown__loadMoreInner": {
    flex: !0,
    "text-sm": !0,
    "text-slate-500": !0,
    "p-2": !0,
    "items-center": !0,
    "justify-center": !0,
    "[&>span]:mr-2": !0,
    "cursor-pointer": !0,
    "dark:text-slate-200": !0,
    "dark:hover:text-sky-400": !0
  },
  "family:dropdown__selectionWrapper": {
    grow: !0,
    flex: !0,
    "items-center": !0,
    "text-slate-700": !0
  },
  "family:dropdown__selection": {
    grow: !0,
    "text-slate-700": !0,
    "group-data-[multiple]:p-2": !0,
    "dark:text-slate-300": !0
  },
  "family:dropdown__tagsWrapper": {
    "w-full": !0
  },
  "family:dropdown__tagWrapper": {
    "group/tag": !0,
    rounded: !0,
    "mr-1": !0,
    "mb-1": !0,
    "outline-none": !0,
    "data-[active-selection=true]:ring-2": !0,
    "data-[active-selection=true]:ring-sky-400": !0
  },
  "family:dropdown__tags": {
    "inline-flex": !0,
    "flex-wrap": !0,
    "items-center": !0,
    "w-full": !0,
    "-mb-1": !0,
    "empty:mb-0": !0
  },
  "family:dropdown__tag": {
    flex: !0,
    "items-center": !0,
    "cursor-default": !0,
    rounded: !0,
    "text-sm": !0,
    "px-1.5": !0,
    "py-0.5": !0,
    "bg-sky-500": !0,
    "text-white": !0,
    "[&>[type=button]]:!w-[0.5em]": !0,
    "[&>[type=button]]:aspect-[1/1]": !0,
    "[&>[type=button]]:!text-inherit": !0,
    "[&>[type=button]]:cursor-pointer": !0,
    "group-data-[active-selection=true]/tag:bg-sky-300": !0,
    "group-data-[active-selection=true]/tag:text-slate-700": !0
  },
  "family:dropdown__tagLabel": {
    "mr-1": !0
  },
  "family:dropdown__emptyMessage": {
    flex: !0,
    "items-center": !0,
    "px-2": !0,
    "py-1.5": !0,
    "first:pt-2": !0,
    "last:pb-2": !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "aria-selected:text-white": !0,
    "aria-selected:bg-sky-500": !0
  },
  button__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "bg-sky-50": !0,
    "hover:bg-sky-100": !0,
    "dark:text-sky-500": !0,
    "dark:bg-transparent": !0,
    "dark:hover:bg-sky-50/5": !0
  },
  checkbox__decorator: {
    rounded: !0
  },
  checkbox__decoratorIcon: {
    "max-w-[66.66%]": !0
  },
  color__inner: {
    "!w-auto": !0,
    "!p-1.5": !0,
    "!inline-flex": !0,
    "group-data-[prefix-icon]:border": !0,
    "group-data-[prefix-icon]:border-slate-300": !0,
    "group-data-[suffix-icon]:border": !0,
    "group-data-[suffix-icon]:border-slate-300": !0,
    "dark:group-data-[prefix-icon]:border-slate-600": !0,
    "dark:group-data-[suffix-icon]:border-slate-600": !0
  },
  color__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "!w-14": !0,
    "bg-transparent": !0,
    "cursor-pointer": !0,
    rounded: !0,
    "overflow-clip": !0,
    "[&::-webkit-color-swatch-wrapper]:p-0": !0,
    "[&::-webkit-color-swatch]:border-none": !0,
    "[&::-moz-color-swatch]:border-none": !0,
    "group-data-[prefix-icon]:mx-2": !0,
    "group-data-[suffix-icon]:mx-2": !0
  },
  color__prefixIcon: {
    flex: !0,
    "items-center": !0,
    "-ml-1": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "group-data-[prefix-icon]:m-1.5": !0,
    "group-data-[prefix-icon]:mr-0": !0
  },
  color__suffixIcon: {
    flex: !0,
    "items-center": !0,
    "-mr-1": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "group-data-[suffix-icon]:m-1.5": !0,
    "group-data-[prefix-icon]:ml-0": !0
  },
  date__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "focus:[&::-webkit-datetime-edit-day-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-month-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-sky-100": !0
  },
  "datetime-local__input": {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "focus:[&::-webkit-datetime-edit-day-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-month-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-hour-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-minute-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-ampm-field]:bg-sky-100": !0
  },
  file__fileList: {
    "group/list": !0,
    peer: !0,
    "w-full": !0,
    "min-w-0": !0,
    "data-[has-multiple]:mb-[1.25em]": !0
  },
  file__fileItemIcon: {
    "h-[1em]": !0,
    "w-[1em]": !0,
    "mr-2": !0,
    "shrink-0": !0
  },
  file__fileItem: {
    flex: !0,
    "min-w-0": !0,
    "items-center": !0,
    "text-slate-700": !0,
    "mb-1.5": !0,
    "last:mb-0": !0,
    "dark:text-slate-300": !0
  },
  file__fileName: {
    truncate: !0,
    "min-w-0": !0,
    "w-full": !0,
    shrink: !0,
    "leading-5": !0,
    "group-data-[has-multiple]/list:text-sm": !0
  },
  file__fileRemove: {
    "right-2": !0,
    "ring-sky-400": !0,
    rounded: !0,
    "z-20": !0,
    flex: !0,
    "appearance-none": !0,
    "items-center": !0,
    "text-[0px]": !0,
    "outline-none": !0,
    "hover:!text-red-400": !0,
    "focus-visible:ring-2": !0,
    "group-data-[disabled]:pointer-events-none": !0,
    "group-data-[disabled]:!text-slate-500": !0,
    "peer-data-[has-multiple]:absolute": !0,
    "peer-data-[has-multiple]:bottom-[max(0.5em,8px)]": !0,
    "peer-data-[has-multiple]:left-3": !0,
    "peer-data-[has-multiple]:text-sky-500": !0,
    "peer-data-[has-multiple]:text-xs": !0,
    "peer-data-[has-multiple]:whitespace-nowrap": !0,
    "group-data-[prefix-icon]:peer-data-[has-multiple]:left-2": !0,
    "dark:hover:!text-red-400": !0
  },
  file__fileRemoveIcon: {
    block: !0,
    "text-base": !0,
    "w-[0.75em]": !0,
    relative: !0,
    "z-10": !0
  },
  file__inner: {
    relative: !0,
    "cursor-pointer": !0,
    "group-data-[has-multiple]:rounded": !0
  },
  file__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "cursor-pointer": !0,
    "text-transparent": !0,
    absolute: !0,
    "inset-0": !0,
    "opacity-0": !0,
    "z-10": !0,
    "file:pointer-events-none": !0,
    "file:w-0": !0,
    "file:h-0": !0,
    "file:overflow-hidden": !0
  },
  file__noFiles: {
    flex: !0,
    "w-full": !0,
    "items-center": !0,
    "text-slate-400": !0,
    "dark:text-slate-500": !0
  },
  file__noFilesIcon: {
    "w-[1em]": !0,
    "mr-2": !0
  },
  form__form: {
    "group/form": !0
  },
  form__actions: {
    "": !0
  },
  form__summaryInner: {
    "group/summary": !0,
    border: !0,
    "border-slate-300": !0,
    "bg-white": !0,
    rounded: !0,
    "py-2": !0,
    "px-3": !0,
    "shadow-sm": !0,
    "dark:bg-transparent": !0,
    "dark:border-slate-600": !0
  },
  form__summaryHeader: {
    "text-lg": !0,
    "text-slate-700": !0,
    "font-bold": !0,
    "mb-2": !0,
    "dark:text-slate-300": !0
  },
  form__messages: {
    "": !0
  },
  form__message: {
    "text-red-500": !0,
    "mb-1.5": !0,
    "text-xs": !0,
    "dark:text-red-400": !0,
    "group-[]/summary:text-sm": !0
  },
  form__messageLink: {
    "group-[]/summary:outline-none": !0,
    "group-[]/summary:focus-visible:ring-2": !0,
    "group-[]/summary:ring-sky-500": !0
  },
  month__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "focus:[&::-webkit-datetime-edit-month-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-sky-100": !0
  },
  radio__decorator: {
    "rounded-full": !0
  },
  radio__decoratorIcon: {
    "max-w-[50%]": !0
  },
  range__inner: {
    relative: !0,
    "!border-none": !0,
    "!ring-0": !0,
    "!px-0": !0,
    "!bg-transparent": !0,
    "!shadow-none": !0
  },
  range__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "group/input": !0,
    "cursor-pointer": !0,
    "[&::-webkit-slider-runnable-track]:bg-slate-300/50": !0,
    "[&::-webkit-slider-runnable-track]:h-[0.25em]": !0,
    "[&::-webkit-slider-runnable-track]:rounded": !0,
    "dark:[&::-webkit-slider-runnable-track]:bg-slate-600/50": !0,
    "[&::-webkit-slider-thumb]:appearance-none": !0,
    "[&::-webkit-slider-thumb]:w-[0.85em]": !0,
    "[&::-webkit-slider-thumb]:aspect-[1/1]": !0,
    "[&::-webkit-slider-thumb]:bg-sky-500": !0,
    "[&::-webkit-slider-thumb]:rounded-full": !0,
    "[&::-webkit-slider-thumb]:relative": !0,
    "[&::-webkit-slider-thumb]:top-1/2": !0,
    "[&::-webkit-slider-thumb]:-translate-y-1/2": !0,
    "[&::-webkit-slider-thumb]:group-data-[disabled]:bg-slate-500": !0,
    "[&::-webkit-slider-thumb]:group-data-[disabled]:!ring-slate-200": !0,
    "[&::-webkit-slider-thumb]:focus-visible:ring-2": !0,
    "[&::-webkit-slider-thumb]:focus:!ring-sky-400": !0,
    "[&::-webkit-slider-thumb]:focus:ring-offset-2": !0,
    "[&::-webkit-slider-thumb]:shadow-sm": !0,
    "dark:[&::-webkit-slider-thumb]:group-data-[disabled]:!ring-slate-700": !0,
    "dark:[&::-webkit-slider-thumb]:focus:ring-offset-slate-700": !0,
    "[&::-moz-range-track]:bg-slate-300/50": !0,
    "[&::-moz-range-track]:h-[0.25]": !0,
    "[&::-moz-range-track]:rounded": !0,
    "dark:[&::-moz-range-track]:bg-slate-600/50": !0,
    "[&::-moz-range-thumb]:appearance-none": !0,
    "[&::-moz-range-thumb]:border-none": !0,
    "[&::-moz-range-thumb]:w-[0.85em]": !0,
    "[&::-moz-range-thumb]:h-[0.85em]": !0,
    "[&::-moz-range-thumb]:bg-sky-500": !0,
    "[&::-moz-range-thumb]:rounded-full": !0,
    "[&::-moz-range-thumb]:group-data-[disabled]:bg-slate-500": !0,
    "[&::-moz-range-thumb]:group-data-[disabled]:!ring-slate-300": !0,
    "[&::-moz-range-thumb]:focus-visible:ring-2": !0,
    "[&::-moz-range-thumb]:focus:!ring-sky-400": !0,
    "[&::-moz-range-thumb]:focus:ring-offset-2": !0,
    "[&::-moz-range-thumb]:shadow-sm": !0,
    "dark:[&::-moz-range-thumb]:group-data-[disabled]:!ring-slate-500": !0,
    "dark:[&::-moz-range-thumb]:focus:ring-offset-slate-700": !0
  },
  select__wrapper: {
    "mb-1.5": !0
  },
  select__inner: {
    relative: !0,
    flex: !0,
    "items-center": !0,
    "bg-white": !0,
    border: !0,
    "border-slate-300": !0,
    rounded: !0,
    "focus-within:ring-1": !0,
    "focus-within:!ring-sky-400": !0,
    "focus-within:!border-sky-400": !0,
    "group-data-[invalid]:border-red-400": !0,
    "group-data-[invalid]:ring-1": !0,
    "group-data-[invalid]:ring-red-400": !0,
    "group-data-[disabled]:bg-slate-100": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "shadow-sm": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "group-data-[multiple]:rounded": !0,
    "dark:bg-transparent": !0,
    "dark:border-slate-600": !0,
    "dark:group-data-[disabled]:bg-slate-800/5": !0,
    "dark:group-data-[invalid]:border-red-400": !0,
    "dark:group-data-[invalid]:ring-red-400": !0
  },
  select__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    grow: !0,
    "p-2": !0,
    "py-2": !0,
    "px-3": !0,
    "pr-[2em]": !0,
    "text-base": !0,
    "text-slate-700": !0,
    "text-ellipsis": !0,
    "min-w-0": !0,
    "outline-none": !0,
    "bg-transparent": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "group-data-[prefix-icon]:!pl-0": !0,
    "group-data-[suffix-icon]:!pr-0": !0,
    "data-[placeholder]:text-slate-400": !0,
    "group-data-[multiple]:!p-0": !0,
    "selection:bg-sky-100": !0,
    "dark:data-[placeholder]:text-slate-400/50": !0,
    "dark:text-slate-300": !0,
    "border-none": !0,
    "focus:ring-0": !0,
    "bg-none": !0
  },
  select__selectIcon: {
    absolute: !0,
    "w-[1em]": !0,
    "text-slate-700": !0,
    "pointer-events-none": !0,
    "right-2": !0,
    "group-data-[suffix-icon]:mr-[1.5em]": !0,
    "dark:text-slate-300": !0
  },
  select__optGroup: {
    "bg-white": !0,
    "text-slate-700": !0,
    "group/optgroup": !0,
    "group-data-[multiple]:px-1.5": !0,
    "pt-1.5": !0,
    "font-bold": !0,
    "text-sm": !0,
    "dark:bg-slate-800": !0,
    "dark:text-slate-300": !0
  },
  select__option: {
    "bg-white": !0,
    "text-slate-700": !0,
    "group-data-[disabled]:opacity-50": !0,
    "group-data-[disabled]:select-none": !0,
    "group-data-[multiple]:checked:bg-sky-100": !0,
    "group-data-[multiple]:focus:bg-sky-100": !0,
    "group-data-[multiple]:text-sm": !0,
    "group-data-[multiple]:outline-none": !0,
    "group-data-[multiple]:border-none": !0,
    "group-data-[multiple]:py-1.5": !0,
    "group-data-[multiple]:px-2": !0,
    "dark:bg-slate-800": !0,
    "dark:text-slate-300": !0,
    "dark:group-data-[multiple]:focus:bg-sky-700": !0,
    "dark:group-data-[multiple]:checked:bg-sky-700": !0
  },
  select__prefixIcon: {
    flex: !0,
    "items-center": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "ml-2": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  select__suffixIcon: {
    flex: !0,
    "items-center": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "mr-2": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  submit__outer: {
    group: !0,
    "max-w-none": !0,
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "data-[disabled]:select-none": !0,
    "text-base": !0,
    "data-[disabled]:opacity-100": !0
  },
  submit__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "bg-sky-500": !0,
    "!text-white": !0,
    "active:text-sky-100": !0,
    "active:bg-sky-600": !0,
    "hover:bg-sky-600": !0,
    "disabled:border-slate-300": !0,
    "disabled:bg-slate-400": !0,
    "disabled:text-slate-100": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "dark:disabled:border-slate-100": !0,
    "dark:disabled:bg-slate-500": !0,
    "dark:disabled:text-slate-200": !0,
    "dark:text-white": !0,
    "dark:ring-offset-sky-400": !0,
    "before:transition-all": !0,
    "group-data-[loading=true]/form:before:content['']": !0,
    "group-data-[loading=true]/form:before:block": !0,
    "group-data-[loading=true]/form:before:animate-spin": !0,
    "group-data-[loading=true]/form:before:w-5": !0,
    "group-data-[loading=true]/form:before:h-5": !0,
    "group-data-[loading=true]/form:before:rounded-full": !0,
    "group-data-[loading=true]/form:before:mr-3": !0,
    "group-data-[loading=true]/form:before:-ml-1.5": !0,
    "group-data-[loading=true]/form:before:border-2": !0,
    "group-data-[loading=true]/form:before:border-solid": !0,
    "group-data-[loading=true]/form:before:border-white": !0,
    "group-data-[loading=true]/form:before:border-r-transparent": !0
  },
  submit__prefixIcon: {
    flex: !0,
    "items-center": !0,
    "-ml-1": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "text-slate-100": !0
  },
  submit__suffixIcon: {
    flex: !0,
    "items-center": !0,
    "-mr-1": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "text-slate-100": !0
  },
  textarea__inner: {
    flex: !0,
    "items-center": !0,
    "mb-1.5": !0,
    "bg-white": !0,
    border: !0,
    "border-slate-300": !0,
    rounded: !0,
    "focus-within:ring-1": !0,
    "focus-within:!ring-sky-400": !0,
    "focus-within:!border-sky-400": !0,
    "group-data-[invalid]:border-red-400": !0,
    "group-data-[invalid]:ring-1": !0,
    "group-data-[invalid]:ring-red-400": !0,
    "group-data-[disabled]:bg-slate-100": !0,
    "shadow-sm": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "dark:border-slate-600": !0,
    "dark:group-data-[disabled]:bg-slate-800/5": !0,
    "dark:group-data-[invalid]:border-red-400": !0,
    "dark:group-data-[invalid]:ring-red-400": !0,
    "dark:bg-transparent": !0
  },
  textarea__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "text-base": !0,
    "h-24": !0,
    "text-slate-700": !0,
    "min-w-0": !0,
    grow: !0,
    shrink: !0,
    "!py-2": !0,
    "!px-3": !0,
    "outline-none": !0,
    "bg-transparent": !0,
    "selection:bg-sky-100": !0,
    "placeholder:text-slate-400": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "dark:placeholder-slate-400/50": !0,
    "dark:text-slate-300": !0,
    "p-0": !0,
    "border-none": !0,
    "focus:ring-0": !0
  },
  textarea__prefixIcon: {
    flex: !0,
    "items-center": !0,
    "-ml-1": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "!ml-2": !0,
    "!mr-0": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  textarea__suffixIcon: {
    flex: !0,
    "items-center": !0,
    "-mr-1": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "!mr-2": !0,
    "!ml-0": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  time__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "focus:[&::-webkit-datetime-edit-hour-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-minute-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-ampm-field]:bg-sky-100": !0
  },
  week__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "focus:[&::-webkit-datetime-edit-week-field]:bg-sky-100": !0,
    "focus:[&::-webkit-datetime-edit-year-field]:bg-sky-100": !0
  },
  autocomplete__selections: {
    flex: !0,
    absolute: !0,
    "inset-0": !0,
    "group-data-[multiple]:static": !0,
    "group-data-[multiple]:block": !0,
    "group-data-[empty]:hidden": !0,
    "group-data-[multiple]:mt-1.5": !0
  },
  autocomplete__selectionWrapper: {
    "bg-slate-100": !0,
    rounded: !0,
    "group-data-[multiple]:border": !0,
    "group-data-[multiple]:border-slate-200": !0,
    "group-data-[multiple]:mb-1.5": !0,
    "outline-none": !0,
    "data-[active-selection=true]:ring-2": !0,
    "data-[active-selection=true]:ring-sky-400": !0,
    "dark:bg-slate-600": !0,
    "dark:group-data-[multiple]:border-slate-600": !0,
    "[&.formkit-dropZone]:opacity-25": !0,
    "[&.formkit-touchDropZone]:opacity-25": !0,
    "[&.formkit-touchDragging]:!flex": !0,
    "[&.formkit-longTouch]:opacity-25": !0
  },
  autocomplete__selection: {
    rounded: !0,
    just: !0,
    "pl-2": !0,
    "[&>*]:ml-0": !0,
    "dark:text-slate-200": !0
  },
  colorpicker__outer: {
    group: !0,
    "max-w-none": !0,
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "data-[disabled]:select-none": !0,
    "data-[disabled]:opacity-50": !0,
    "text-base": !0,
    "data-[disabled]:cursor-not-allowed": !0,
    "data-[disabled]:pointer-events-none": !0
  },
  colorpicker__help: {
    "text-slate-500": !0,
    "text-xs": !0,
    "dark:text-slate-400": !0,
    "group-data-[inline]:-mt-1": !0,
    "group-data-[inline]:mb-2": !0
  },
  colorpicker__inner: {
    relative: !0,
    "inline-flex": !0,
    "!w-auto": !0,
    "pl-2": !0,
    "group-data-[inline]:border-none": !0,
    "group-data-[inline]:shadow-none": !0,
    "group-data-[inline]:p-0": !0,
    "group-data-[inline]:bg-transparent": !0,
    "group-data-[inline]:outline-none": !0,
    "group-data-[inline]:!ring-0": !0,
    "group-data-[inline]:!w-full": !0,
    "group-data-[inline]:rounded": !0
  },
  colorpicker__swatchPreview: {
    "w-full": !0,
    flex: !0,
    "justify-start": !0,
    "items-center": !0,
    rounded: !0,
    "text-sm": !0,
    "cursor-pointer": !0,
    "outline-none": !0
  },
  colorpicker__canvasSwatchPreviewWrapper: {
    relative: !0,
    "before:content-['']": !0,
    "before:absolute": !0,
    "before:inset-0": !0,
    "before:rounded": !0,
    "before:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]": !0,
    "before:z-[2]": !0
  },
  colorpicker__canvasSwatchPreview: {
    "text-base": !0,
    rounded: !0,
    "aspect-[1/1]": !0,
    "shrink-0": !0,
    grow: !0,
    "!w-[1.5em]": !0
  },
  colorpicker__valueString: {
    "text-base": !0,
    "text-slate-700": !0,
    "selection:bg-sky-100": !0,
    "font-mono": !0,
    "inline-block": !0,
    "ml-2": !0,
    "mr-1.5": !0,
    "dark:text-slate-300": !0,
    "dark:selection:text-slate-700": !0
  },
  colorpicker__panel: {
    absolute: !0,
    "left-0": !0,
    "top-full": !0,
    "z-[99]": !0,
    flex: !0,
    "w-[100vw]": !0,
    "max-w-[18.5em]": !0,
    "touch-manipulation": !0,
    "flex-col": !0,
    rounded: !0,
    border: !0,
    "bg-white": !0,
    "p-2": !0,
    shadow: !0,
    "group-data-[inline]:static": !0,
    "group-data-[inline]:max-w-none": !0,
    "border-slate-300": !0,
    "group-data-[inline]:z-auto": !0,
    "group-data-[inline]:w-full": !0,
    "group-data-[inline]:shadow-sm": !0,
    "group-data-[inline]:group-data-[disabled]:!cursor-not-allowed": !0,
    "group-data-[inline]:group-data-[disabled]:!pointer-events-none": !0,
    "group-data-[inline]:[&:has([id^=swatches]:first-child:last-child)]:w-auto": !0,
    "group-data-[inline]:[&:has([id^=swatches]:first-child:last-child)_[id^=swatches]>div]:w-[1.5em]": !0,
    "dark:bg-slate-800": !0,
    "dark:border-slate-600": !0,
    "dark:group-data-[inline]:bg-transparent": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:!fixed": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:top-auto": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:max-w-none": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:bottom-0": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:left-0": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:rounded-none": !0
  },
  colorpicker__panelClose: {
    flex: !0,
    "justify-end": !0,
    "items-center": !0,
    "text-slate-600": !0,
    "mb-1.5": !0,
    "-mt-1": !0,
    "border-none": !0,
    "bg-none": !0,
    "border-b": !0,
    "border-slate-200": !0,
    "w-[calc(100%+1rem)]": !0,
    "-ml-2": !0,
    "pt-0": !0,
    "pr-2": !0,
    "pb-1.5": !0,
    "pl-2": !0,
    "dark:border-slate-700": !0
  },
  colorpicker__closeIcon: {
    "w-[2rem]": !0,
    "aspect-[1/1]": !0,
    "p-1": !0,
    rounded: !0,
    border: !0,
    "[&>svg]:w-full": !0,
    "[&>svg]:aspect-[1/1]": !0,
    "[&>svg]:max-w-none": !0,
    "[&>svg]:max-h-none": !0
  },
  colorpicker__controlGroup: {
    grid: !0,
    "[grid-template-areas:'a_a_a'_'b_c_e'_'b_d_e']": !0,
    "mb-2": !0
  },
  colorpicker__LS: {
    "[grid-area:a]": !0,
    relative: !0,
    "mb-2": !0
  },
  colorpicker__canvas: {
    block: !0,
    "w-full": !0
  },
  colorpicker__canvasLS: {
    "aspect-[2/1]": !0,
    "cursor-pointer": !0,
    "rounded-none": !0
  },
  colorpicker__canvasHue: {
    "rounded-none": !0
  },
  colorpicker__canvasAlpha: {
    "rounded-none": !0
  },
  colorpicker__preview: {
    rounded: !0,
    "after:rounded": !0,
    relative: !0,
    "inline-flex": !0,
    "aspect-[1/1]": !0,
    "overflow-hidden": !0,
    "[grid-area:b]": !0,
    "mr-2": !0,
    "after:absolute": !0,
    "after:left-0": !0,
    "after:top-0": !0,
    "after:h-full": !0,
    "after:w-full": !0,
    "after:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]": !0,
    "after:content-['']": !0,
    "w-[2em]": !0,
    "dark:after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]": !0
  },
  colorpicker__hue: {
    "[grid-area:c]": !0,
    relative: !0,
    "inline-flex": !0,
    "h-3/4": !0
  },
  colorpicker__alpha: {
    "[grid-area:d]": !0,
    relative: !0,
    "inline-flex": !0,
    "h-3/4": !0
  },
  colorpicker__eyeDropper: {
    "[grid-area:e]": !0,
    "w-[2em]": !0,
    "ml-2": !0,
    "inline-flex": !0,
    "self-center": !0,
    "justify-center": !0,
    "justify-self-center": !0,
    "aspect-[1/1]": !0,
    rounded: !0,
    border: !0,
    "border-slate-200": !0,
    "cursor-pointer": !0,
    "content-center": !0,
    "items-center": !0,
    "text-slate-600": !0,
    "dark:border-slate-700": !0
  },
  colorpicker__eyeDropperIcon: {
    "w-auto": !0,
    "[&>svg]:w-[1em]": !0,
    "dark:text-slate-400": !0
  },
  colorpicker__control: {
    absolute: !0,
    "bg-white": !0,
    "shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,0.2)]": !0,
    "-translate-y-1/2": !0,
    "-translate-x-1/2": !0,
    "pointer-events-none": !0,
    "data-[prevent-focus-style]:shadow-[0_0_0_2px_rgba(255,255,255,1),0_0_0_3px_rgba(0,0,0,0.2)]": !0,
    "focus-visible:outline-none": !0,
    "focus-visible:ring-2": !0,
    "focus-visible:ring-offset-2": !0,
    "focus-visible:ring-sky-400": !0
  },
  colorpicker__controlLS: {
    "w-[10px]": !0,
    "h-[10px]": !0,
    "rounded-full": !0
  },
  colorpicker__controlHue: {
    "w-[4px]": !0,
    "h-[calc(100%-2px)]": !0,
    "top-1/2": !0,
    rounded: !0
  },
  colorpicker__controlAlpha: {
    "w-[4px]": !0,
    "h-[calc(100%-2px)]": !0,
    "top-1/2": !0,
    rounded: !0
  },
  colorpicker__formatField: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    grow: !0
  },
  colorpicker__colorField: {
    "bg-transparent": !0,
    "text-slate-700": !0,
    border: !0,
    "border-slate-200": !0,
    "dark:border-slate-700": !0,
    "dark:text-slate-300": !0,
    "dark:selection:text-slate-700": !0
  },
  colorpicker__colorInputGroup: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    grow: !0
  },
  colorpicker__fieldGroup: {
    flex: !0,
    "flex-col": !0,
    "items-center": !0,
    "justify-center": !0,
    "w-full": !0,
    "mr-1": !0,
    "[&>input]:p-1": !0,
    "[&>input]:text-sm": !0,
    "[&>input]:text-slate-700": !0,
    "[&>input]:selection:bg-sky-100": !0,
    "[&>input]:m-0": !0,
    "[&>input]:grow": !0,
    "[&>input]:shrink": !0,
    "[&>input]:w-full": !0,
    "[&>input]:border": !0,
    "[&>input]:border-slate-200": !0,
    "[&>input]:rounded": !0,
    "[&>input]:text-center": !0,
    "[&>input]:appearance-none": !0,
    "[&>input::-webkit-outer-spin-button]:appearance-none": !0,
    "[&>input::-webkit-inner-spin-button]:appearance-none": !0,
    "[&>input::-webkit-inner-spin-button]:m-0": !0,
    "[&>input:focus]:outline-none": !0,
    "[&>input:focus]:ring-1": !0,
    "[&>input:focus]:ring-sky-500": !0,
    "[&>input:focus]:border-sky-500": !0,
    "max-[431px]:[&>input]:text-base": !0
  },
  colorpicker__fieldLabel: {
    "text-xs": !0,
    "text-slate-500": !0,
    "mt-1.5": !0,
    "dark:text-slate-400": !0
  },
  colorpicker__formatSwitcher: {
    flex: !0,
    "justify-end": !0,
    "self-start": !0,
    uppercase: !0,
    "shrink-0": !0,
    "p-1": !0,
    "mt-0.5": !0,
    "text-slate-600": !0,
    rounded: !0,
    "select-none": !0,
    "dark:text-slate-400": !0
  },
  colorpicker__switchIcon: {
    "[&>svg]:w-3": !0
  },
  colorpicker__swatches: {
    "inline-flex": !0,
    "flex-wrap": !0,
    "w-full": !0,
    "justify-self-center": !0,
    "min-w-0": !0,
    "mx-auto": !0,
    "px-[1px]": !0,
    "pt-2": !0,
    "pb-2": !0,
    "mt-2": !0,
    "-mb-2": !0,
    "border-t": !0,
    "border-slate-200": !0,
    "overflow-auto": !0,
    "max-h-[200px]": !0,
    "select-none": !0,
    "first:-mt-[3px]": !0,
    "first:last:-mb-[3px]": !0,
    "first:last:pb-[2px]": !0,
    "first:pt-px": !0,
    "first:border-t-0": !0,
    "dark:border-slate-700": !0
  },
  colorpicker__swatchGroup: {
    flex: !0,
    "flex-wrap": !0,
    "w-full": !0,
    "mb-2": !0,
    "last:mb-0": !0
  },
  colorpicker__swatchGroupLabel: {
    "ml-1": !0,
    block: !0,
    "w-full": !0,
    "text-sm": !0,
    "text-slate-500": !0,
    "dark:text-slate-400": !0
  },
  colorpicker__swatch: {
    relative: !0,
    "text-base": !0,
    "w-[calc((100%/10)-0.5em)]": !0,
    "max-w-[22px]": !0,
    "m-[0.16em]": !0,
    "cursor-pointer": !0,
    "before:content-['']": !0,
    "before:absolute": !0,
    "before:inset-0": !0,
    "before:rounded": !0,
    "before:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)]": !0,
    "before:pointer-events-none": !0,
    "before:z-[2]": !0,
    "dark:before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]": !0,
    "data-[active=true]:after:content-['']": !0,
    "data-[active=true]:after:block": !0,
    "data-[active=true]:after:absolute": !0,
    "data-[active=true]:after:w-1.5": !0,
    "data-[active=true]:after:h-1.5": !0,
    "data-[active=true]:after:top-1/2": !0,
    "data-[active=true]:after:left-1/2": !0,
    "data-[active=true]:after:pointer-events-none": !0,
    "data-[active=true]:after:rounded-full": !0,
    "data-[active=true]:after:-translate-x-1/2": !0,
    "data-[active=true]:after:-translate-y-1/2": !0,
    "data-[active=true]:after:bg-white": !0,
    "data-[active=true]:after:z-[2]": !0,
    "data-[active=true]:after:ring-1": !0,
    "data-[active=true]:after:ring-[rgba(0,0,0,0.33)]": !0,
    "[&>canvas]:block": !0,
    "[&>canvas]:w-full": !0,
    "[&>canvas]:aspect-[1/1]": !0,
    "[&>canvas]:rounded": !0,
    "[&>canvas:focus-visible]:outline-none": !0,
    "[&>canvas:focus-visible]:ring-2": !0,
    "[&>canvas:focus-visible]:ring-sky-400": !0,
    "[&>canvas:focus-visible]:ring-offset-2": !0,
    "[&>canvas:focus-visible]:ring-offset-white": !0,
    "dark:[&>canvas:focus-visible]:ring-offset-slate-700": !0
  },
  datepicker__inner: {
    relative: !0
  },
  datepicker__removeSelection: {
    "self-stretch": !0,
    "text-base": !0,
    flex: !0,
    "items-center": !0,
    "ml-1": !0,
    "mr-2": !0,
    "text-slate-700": !0,
    "hover:text-red-400": !0,
    "z-10": !0,
    "dark:text-slate-300": !0
  },
  datepicker__clearIcon: {
    "[&>svg]:w-[0.75em]": !0
  },
  datepicker__panelWrapper: {
    "group/panel": !0,
    absolute: !0,
    "min-w-[20em]": !0,
    "top-[calc(100%_+_0.5em)]": !0,
    "left-0": !0,
    "shadow-[0_0_1.25em_rgba(0,0,0,.25)]": !0,
    rounded: !0,
    "p-4": !0,
    "bg-white": !0,
    "z-10": !0,
    "dark:bg-slate-800": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:!fixed": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:top-auto": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:max-w-none": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:bottom-0": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:left-0": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:rounded-none": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:w-full": !0
  },
  datepicker__panelHeader: {
    grid: !0,
    "grid-cols-[2.5em_1fr_2.5em]": !0,
    "justify-center": !0,
    "items-center": !0,
    "border-b-2": !0,
    "border-slate-200": !0,
    "mb-2": !0,
    "pb-2.5": !0,
    "dark:border-slate-700": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:grid-cols-[2.5em_1fr_2.5em_2.5em]": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:group-data-[panel=time]/panel:grid-cols-[2.5em_1fr_2.5em]": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-[&:not([data-inline])]:group-data-[panel=month]/panel:grid-cols-[2.5em_1fr_2.5em]": !0
  },
  datepicker__panelClose: {
    "aspect-[1/1]": !0,
    border: !0,
    "border-slate-200": !0,
    rounded: !0,
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "text-slate-700": !0,
    "[&_svg]:w-[1.25em]": !0,
    "dark:text-slate-300": !0,
    "dark:border-slate-700": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-data-[panel=time]/panel:col-start-3": !0,
    "[@media(max-width:431px)_and_(hover:none)]:group-data-[panel=month]/panel:col-start-3": !0
  },
  datepicker__panel: {
    flex: !0,
    "justify-center": !0
  },
  datepicker__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "placeholder:text-slate-400": !0
  },
  datepicker__monthsHeader: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "col-start-2": !0,
    "col-end-2": !0
  },
  datepicker__timeHeader: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "col-start-2": !0,
    "col-end-2": !0
  },
  datepicker__months: {
    grid: !0,
    "grid-cols-3": !0,
    "w-full": !0
  },
  datepicker__month: {
    "m-1.5": !0,
    "p-1.5": !0,
    "text-center": !0,
    "text-slate-700": !0,
    rounded: !0,
    "bg-slate-200": !0,
    "aria-selected:!bg-sky-500": !0,
    "aria-selected:!text-white": !0,
    "focus:outline": !0,
    "focus:outline-2": !0,
    "focus:outline-sky-500": !0,
    "focus:outline-offset-2": !0,
    "focus:bg-white": !0,
    "focus:text-slate-700": !0,
    "data-[is-extra=true]:opacity-25": !0,
    "group-data-[disabled=true]:opacity-50": !0,
    "group-data-[disabled=true]:cursor-default": !0,
    "group-data-[disabled=true]:pointer-events-none": !0,
    "dark:bg-slate-700": !0,
    "dark:text-slate-300": !0
  },
  datepicker__yearsHeader: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "text-slate-700": !0,
    "col-start-2": !0,
    "col-end-2": !0,
    "dark:text-slate-300": !0
  },
  datepicker__years: {
    grid: !0,
    "grid-cols-5": !0,
    "w-full": !0
  },
  datepicker__year: {
    "text-base": !0,
    "text-center": !0,
    "text-slate-700": !0,
    "items-center": !0,
    "m-1.5": !0,
    "p-1.5": !0,
    rounded: !0,
    "bg-slate-200": !0,
    "aria-selected:!bg-sky-500": !0,
    "aria-selected:!text-white": !0,
    "focus:outline": !0,
    "focus:outline-2": !0,
    "focus:outline-sky-500": !0,
    "focus:outline-offset-2": !0,
    "focus:bg-white": !0,
    "data-[is-extra=true]:opacity-25": !0,
    "group-data-[disabled=true]:opacity-50": !0,
    "group-data-[disabled=true]:cursor-default": !0,
    "group-data-[disabled=true]:pointer-events-none": !0,
    "dark:bg-slate-700": !0,
    "dark:text-slate-300": !0
  },
  datepicker__weekDays: {
    grid: !0,
    "grid-cols-7": !0
  },
  datepicker__weekDay: {
    "w-[2.25em]": !0,
    "text-slate-700": !0,
    "m-1.5": !0,
    rounded: !0,
    "font-medium": !0,
    lowercase: !0,
    "dark:text-slate-500": !0
  },
  datepicker__calendarWeeks: {
    "": !0
  },
  datepicker__week: {
    grid: !0,
    "grid-cols-7": !0,
    "group-data-[disabled=true]:opacity-50": !0,
    "group-data-[disabled=true]:cursor-default": !0,
    "group-data-[disabled=true]:pointer-events-none": !0
  },
  datepicker__dayCell: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "text-center": !0,
    "text-slate-700": !0,
    "w-[2.25em]": !0,
    "h-[2.25em]": !0,
    "m-1": !0,
    "p-2": !0,
    rounded: !0,
    "bg-slate-200": !0,
    "aria-selected:bg-sky-500": !0,
    "aria-selected:text-white": !0,
    "focus:outline": !0,
    "focus:outline-2": !0,
    "focus:outline-sky-500": !0,
    "focus:outline-offset-2": !0,
    "focus:bg-white": !0,
    "data-[is-extra=true]:opacity-25": !0,
    "data-[disabled=true]:opacity-50": !0,
    "data-[disabled=true]:cursor-default": !0,
    "data-[disabled=true]:pointer-events-none": !0,
    "dark:bg-slate-600": !0,
    "dark:text-slate-300": !0,
    "dark:aria-selected:bg-sky-500": !0,
    "dark:aria-selected:text-white": !0,
    "dark:focus:outline-sky-500": !0,
    "dark:focus:bg-slate-200": !0,
    "dark:focus:text-slate-700": !0
  },
  datepicker__timeInput: {
    "w-full": !0,
    "border-2": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "text-slate-700": !0,
    "border-slate-200": !0,
    rounded: !0,
    "p-1.5": !0,
    "my-2.5": !0,
    "focus-visible:outline-sky-500": !0,
    "dark:text-slate-300": !0,
    "dark:bg-transparent": !0,
    "dark:border-slate-700": !0
  },
  datepicker__daysHeader: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0
  },
  datepicker__prev: {
    "mr-auto": !0,
    "px-2.5": !0,
    "py-0.5": !0,
    "hover:bg-slate-100": !0,
    rounded: !0,
    "col-start-1": !0,
    "col-end-1": !0,
    "focus-visible:outline-none": !0,
    "focus-visible:ring-2": !0,
    "focus-visible:ring-sky-400": !0,
    "focus-visible:ring-offset-2": !0
  },
  datepicker__prevLabel: {
    hidden: !0
  },
  datepicker__prevIcon: {
    flex: !0,
    "w-[0.75em]": !0,
    "select-none": !0,
    "text-slate-700": !0,
    "[&>svg]:w-full": !0,
    "dark:text-slate-300": !0
  },
  datepicker__dayButton: {
    "appearance-none": !0,
    "text-slate-700": !0,
    "cursor-pointer": !0,
    "px-2.5": !0,
    "py-0.5": !0,
    "border-2": !0,
    "border-slate-200": !0,
    rounded: !0,
    "mx-1": !0,
    "hover:border-sky-500": !0,
    "focus-visible:outline-none": !0,
    "focus-visible:ring-2": !0,
    "focus-visible:ring-sky-400": !0,
    "focus-visible:ring-offset-2": !0,
    "dark:text-slate-300": !0,
    "dark:border-slate-700": !0,
    "dark:hover:border-sky-400": !0
  },
  datepicker__monthButton: {
    "appearance-none": !0,
    "text-slate-700": !0,
    "cursor-pointer": !0,
    "px-2.5": !0,
    "py-0.5": !0,
    "border-2": !0,
    "border-slate-200": !0,
    rounded: !0,
    "mx-1": !0,
    "hover:border-sky-500": !0,
    "focus-visible:outline-none": !0,
    "focus-visible:ring-2": !0,
    "focus-visible:ring-sky-400": !0,
    "focus-visible:ring-offset-2": !0,
    "dark:text-slate-300": !0,
    "dark:border-slate-700": !0,
    "dark:hover:border-sky-400": !0
  },
  datepicker__yearButton: {
    "appearance-none": !0,
    "text-slate-700": !0,
    "cursor-pointer": !0,
    "px-2.5": !0,
    "py-0.5": !0,
    "border-2": !0,
    "border-slate-200": !0,
    rounded: !0,
    "mx-1": !0,
    "hover:border-sky-500": !0,
    "focus-visible:outline-none": !0,
    "focus-visible:ring-2": !0,
    "focus-visible:ring-sky-400": !0,
    "focus-visible:ring-offset-2": !0,
    "dark:text-slate-300": !0,
    "dark:border-slate-700": !0,
    "dark:hover:border-sky-400": !0
  },
  datepicker__next: {
    "ml-auto": !0,
    "px-2.5": !0,
    "py-0.5": !0,
    rounded: !0,
    "hover:bg-slate-100": !0,
    "hover:rounded": !0,
    "col-start-3": !0,
    "col-end-3": !0,
    "focus-visible:outline-none": !0,
    "focus-visible:ring-2": !0,
    "focus-visible:ring-sky-400": !0,
    "focus-visible:ring-offset-2": !0
  },
  datepicker__nextLabel: {
    hidden: !0
  },
  datepicker__nextIcon: {
    flex: !0,
    "w-[0.75em]": !0,
    "select-none": !0,
    "text-slate-700": !0,
    "[&>svg]:w-full": !0,
    "dark:text-slate-300": !0
  },
  datepicker__openButton: {
    "appearance-none": !0,
    "border-0": !0,
    "bg-transparent": !0,
    flex: !0,
    "p-0": !0,
    "self-stretch": !0,
    "cursor-pointer": !0,
    "focus-visible:outline-none": !0,
    "focus-visible:ring-2": !0,
    "focus-visible:ring-sky-400": !0,
    "focus-visible:ring-offset-2": !0,
    "focus-visible:rounded": !0
  },
  datepicker__calendarIcon: {
    "text-slate-600": !0,
    "focus-visible:text-sky-500": !0,
    flex: !0,
    "w-[1em]": !0,
    "grow-0": !0,
    "shrink-0": !0,
    "self-stretch": !0,
    "select-none": !0,
    "[&>svg]:w-full": !0,
    "[&>svg]:m-auto": !0,
    "[&>svg]:max-h-[1em]": !0,
    "[&>svg]:max-w-[1em]": !0
  },
  dropdown__placeholder: {
    "text-slate-400": !0,
    grow: !0,
    "dark:text-slate-400/50": !0
  },
  dropdown__selector: {
    flex: !0,
    grow: !0,
    "justify-between": !0,
    "w-full": !0,
    "py-2": !0,
    "pl-3": !0,
    "pr-0": !0,
    "text-base": !0,
    "text-slate-700": !0,
    "text-left": !0,
    "group-data-[disabled]:!cursor-not-allowed": !0,
    "group-data-[prefix-icon]:!pl-0": !0,
    "group-data-[suffix-icon]:!pr-0": !0,
    "data-[placeholder]:text-slate-400": !0,
    "selection:bg-sky-100": !0,
    "dark:data-[placeholder]:text-slate-400/50": !0,
    "dark:text-slate-300": !0
  },
  dropdown__selectIcon: {
    "shrink-0": !0
  },
  dropdown__selectionsWrapper: {
    "w-[85%]": !0,
    "overflow-hidden": !0
  },
  dropdown__selection: {
    "[&>*]:ml-0": !0
  },
  dropdown__selections: {
    "inline-flex": !0,
    "items-center": !0
  },
  dropdown__selectionsItem: {
    "whitespace-nowrap": !0,
    "mr-1": !0
  },
  dropdown__tagWrapper: {
    "[&.formkit-dropZone_.formkit-tag]:opacity-25": !0,
    "[&.formkit-touchDropZone_.formkit-tag]:opacity-25": !0
  },
  dropdown__truncationCount: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "h-[1.5em]": !0,
    rounded: !0,
    "bg-slate-400": !0,
    "text-white": !0,
    "whitespace-nowrap": !0,
    "text-[11px]": !0,
    "[line-height:1em]": !0,
    "tracking-tighter": !0,
    "leading-0": !0,
    "py-1": !0,
    "px-1": !0,
    "shrink-0": !0,
    "my-auto": !0
  },
  mask__inner: {
    relative: !0
  },
  mask__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "group-data-[has-overlay]:!caret-slate-700": !0,
    "dark:group-data-[has-overlay]:!caret-slate-300": !0
  },
  rating__inner: {
    "text-slate-300": !0
  },
  rating__itemsWrapper: {
    relative: !0,
    "inline-flex": !0,
    "focus:border-sky-500": !0
  },
  rating__onItemRow: {
    "h-full": !0,
    "w-full": !0
  },
  rating__offItemRow: {
    "h-full": !0,
    "w-full": !0
  },
  rating__onItemWrapper: {
    "[&>*]:w-full": !0,
    "[&>*]:h-full": !0,
    "w-full": !0,
    "h-full": !0,
    "text-yellow-400": !0
  },
  rating__offItemWrapper: {
    "text-slate-300": !0,
    "w-full": !0,
    "h-full": !0,
    "[&>*]:w-full": !0,
    "[&>*]:h-full": !0,
    "dark:text-slate-600": !0
  },
  rating__ratingItem: {
    relative: !0,
    "focus-within:outline": !0,
    "focus-within:outline-sky-500": !0,
    "w-[1.5em]": !0,
    "h-[1.5em]": !0
  },
  rating__itemLabelInner: {
    "h-px": !0,
    "w-px": !0,
    "overflow-hidden": !0,
    absolute: !0,
    "white-space-nowrap": !0
  },
  rating__itemLabel: {
    absolute: !0,
    "h-full": !0
  },
  rating__ratingIcon: {
    "w-[1.5em]": !0,
    "h-[1.5em]": !0,
    flex: !0
  },
  rating__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "outline-none": !0
  },
  rating__messages: {
    "mt-1.5": !0
  },
  repeater__outer: {
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "text-base": !0,
    "group/repeater": !0,
    "max-w-full": !0
  },
  repeater__fieldset: {
    "min-w-0": !0
  },
  repeater__legend: {
    block: !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "font-bold": !0,
    "dark:text-slate-300": !0,
    "mb-2": !0
  },
  repeater__content: {
    "min-w-0": !0,
    grow: !0,
    "p-5": !0,
    flex: !0,
    "flex-col": !0,
    "align-center": !0,
    "[&>div[data-type]]:max-w-none": !0,
    "[&>div[data-type]:last-child]:mb-0": !0
  },
  repeater__addButton: {
    "!mb-0": !0,
    "group-data-[disabled]/repeater:pointer-events-none": !0,
    "group-data-[disabled]/repeater:opacity-50": !0,
    "group-data-[disabled]/repeater:grayscale": !0
  },
  repeater__controlLabel: {
    absolute: !0,
    "opacity-0": !0,
    "pointer-events-none": !0,
    "text-[0px]": !0
  },
  repeater__controls: {
    flex: !0,
    "flex-col": !0,
    "items-center": !0,
    "justify-center": !0,
    "bg-slate-50": !0,
    "p-2": !0,
    "[&>li]:aspect-[1/1]": !0,
    "dark:bg-slate-800": !0,
    rounded: !0,
    "rounded-tl-none": !0,
    "rounded-bl-none": !0
  },
  repeater__downControl: {
    "w-[1.5em]": !0,
    "h-[1.5em]": !0,
    "my-1.5": !0,
    "mx-auto": !0,
    flex: !0,
    "items-center": !0,
    "appearance-none": !0,
    "justify-center": !0,
    "aspect-[1/1]": !0,
    "text-slate-500": !0,
    "hover:text-sky-500": !0,
    "disabled:hover:text-inherit": !0,
    "disabled:opacity-25": !0,
    "disabled:!text-slate-500": !0,
    "dark:text-slate-300": !0,
    "dark:disabled:!text-slate-300": !0,
    "dark:hover:text-sky-400": !0
  },
  repeater__upControl: {
    "w-[1.5em]": !0,
    "h-[1.5em]": !0,
    "my-1.5": !0,
    "mx-auto": !0,
    flex: !0,
    "items-center": !0,
    "appearance-none": !0,
    "justify-center": !0,
    "aspect-[1/1]": !0,
    "text-slate-500": !0,
    "hover:text-sky-500": !0,
    "disabled:hover:text-inherit": !0,
    "disabled:opacity-25": !0,
    "disabled:!text-slate-500": !0,
    "dark:text-slate-300": !0,
    "dark:disabled:!text-slate-300": !0,
    "dark:hover:text-sky-400": !0
  },
  repeater__removeControl: {
    "w-[1.5em]": !0,
    "h-[1.5em]": !0,
    "my-1.5": !0,
    "mx-auto": !0,
    flex: !0,
    "items-center": !0,
    "appearance-none": !0,
    "justify-center": !0,
    "aspect-[1/1]": !0,
    "text-slate-500": !0,
    "hover:text-sky-500": !0,
    "disabled:hover:text-inherit": !0,
    "disabled:opacity-25": !0,
    "disabled:!text-slate-500": !0,
    "dark:text-slate-300": !0,
    "dark:disabled:!text-slate-300": !0,
    "dark:hover:text-sky-400": !0
  },
  repeater__insertControl: {
    "w-[1.5em]": !0,
    "h-[1.5em]": !0,
    "my-1.5": !0,
    "mx-auto": !0,
    flex: !0,
    "items-center": !0,
    "appearance-none": !0,
    "justify-center": !0,
    "aspect-[1/1]": !0,
    "text-slate-500": !0,
    "hover:text-sky-500": !0,
    "disabled:hover:text-inherit": !0,
    "disabled:opacity-25": !0,
    "disabled:!text-slate-500": !0,
    "dark:text-slate-300": !0,
    "dark:disabled:!text-slate-300": !0,
    "dark:hover:text-sky-400": !0
  },
  repeater__help: {
    "text-slate-500": !0,
    "text-xs": !0,
    "dark:text-slate-400": !0,
    "mb-2": !0,
    "-mt-1": !0
  },
  repeater__item: {
    flex: !0,
    relative: !0,
    "w-full": !0,
    "mb-2": !0,
    "bg-white": !0,
    border: !0,
    "border-slate-200": !0,
    rounded: !0,
    "shadow-sm": !0,
    "dark:border-slate-700": !0,
    "dark:bg-transparent": !0,
    "[&.formkit-dropZone]:opacity-30": !0,
    "[&.formkit-dropZone]:blur-[2px]": !0
  },
  repeater__dragHandleWrapper: {
    relative: !0,
    "w-8": !0,
    "bg-slate-50": !0,
    rounded: !0,
    "rounded-tr-none": !0,
    "rounded-br-none": !0,
    "dark:bg-slate-800": !0
  },
  repeater__dragHandle: {
    "w-full": !0,
    "h-full": !0,
    flex: !0,
    absolute: !0,
    "top-0": !0,
    "left-0": !0,
    "cursor-grab": !0,
    "active:cursor-grabbing": !0
  },
  repeater__dragHandleIcon: {
    "w-2": !0,
    "m-auto": !0,
    "text-slate-400": !0,
    "dark:text-slate-500": !0,
    "[&>svg>path]:fill-current": !0
  },
  repeater__moveDownIcon: {
    block: !0,
    "w-[0.75em]": !0,
    "aspect-[1/1]": !0
  },
  repeater__moveUpIcon: {
    block: !0,
    "w-[0.75em]": !0,
    "aspect-[1/1]": !0
  },
  repeater__removeIcon: {
    block: !0,
    "w-[1.25em]": !0,
    "aspect-[1/1]": !0
  },
  repeater__addIcon: {
    block: !0,
    "w-[1.25em]": !0,
    "aspect-[1/1]": !0
  },
  slider__outer: {
    group: !0,
    "max-w-none": !0,
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "data-[disabled]:select-none": !0,
    "data-[disabled]:opacity-50": !0,
    "text-base": !0,
    "data-[disabled]:pointer-events-none": !0
  },
  slider__help: {
    "text-slate-500": !0,
    "text-xs": !0,
    "dark:text-slate-400": !0,
    "-mt-0.5": !0,
    "mb-1.5": !0
  },
  slider__sliderInner: {
    flex: !0,
    "items-center": !0,
    "[&>[data-type=number]]:mb-0": !0,
    "[&>[data-type=number]]:ml-2.5": !0,
    "[&>[data-type=number]]:shrink": !0,
    "[&>[data-type=number]]:grow-0": !0,
    "[&[data-has-mark-labels=true]_[id^=track]]:mb-5": !0
  },
  slider__track: {
    grow: !0,
    relative: !0,
    "z-20": !0,
    "py-2.5": !0,
    "select-none": !0
  },
  slider__trackWrapper: {
    "px-[2px]": !0,
    "rounded-full": !0,
    "bg-slate-300": !0,
    "dark:bg-slate-500": !0
  },
  slider__trackInner: {
    "h-1.5": !0,
    "mx-0.5": !0,
    relative: !0
  },
  slider__prefixIcon: {
    flex: !0,
    "items-center": !0,
    "-ml-1": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  slider__suffixIcon: {
    flex: !0,
    "items-center": !0,
    "-mr-1": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0,
    "text-slate-600": !0,
    "dark:text-slate-300": !0
  },
  slider__fill: {
    "h-full": !0,
    "rounded-full": !0,
    absolute: !0,
    "top-0": !0,
    "-mx-1": !0,
    "bg-sky-500": !0,
    "group-data-[disabled]:bg-slate-500": !0
  },
  slider__marks: {
    absolute: !0,
    "pointer-events-none": !0,
    "inset-0": !0
  },
  slider__mark: {
    absolute: !0,
    "top-1/2": !0,
    "w-[3px]": !0,
    "h-[3px]": !0,
    "rounded-full": !0,
    "-translate-x-1/2": !0,
    "-translate-y-1/2": !0,
    "bg-slate-400": !0,
    "data-[active=true]:bg-white": !0
  },
  slider__markLabel: {
    absolute: !0,
    "top-[calc(100%+0.5em)]": !0,
    "left-1/2": !0,
    "text-slate-400": !0,
    "text-xs": !0,
    "-translate-x-1/2": !0
  },
  slider__handles: {
    "m-0": !0,
    "p-0": !0,
    "list-none": !0
  },
  slider__handle: {
    group: !0,
    "select-none": !0,
    "w-4": !0,
    "h-4": !0,
    "rounded-full": !0,
    "bg-white": !0,
    absolute: !0,
    "top-1/2": !0,
    "left-0": !0,
    "z-30": !0,
    "-translate-x-1/2": !0,
    "-translate-y-1/2": !0,
    "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.5)]": !0,
    "focus-visible:outline-0": !0,
    "focus-visible:ring-2": !0,
    "ring-sky-500": !0,
    "data-[is-target=true]:z-20": !0,
    "dark:bg-slate-200": !0
  },
  slider__tooltip: {
    absolute: !0,
    "bottom-full": !0,
    "left-1/2": !0,
    "-translate-x-1/2": !0,
    "-translate-y-[4px]": !0,
    "bg-sky-500": !0,
    "text-white": !0,
    "py-1": !0,
    "px-1.5": !0,
    "text-xs": !0,
    "leading-none": !0,
    "whitespace-nowrap": !0,
    rounded: !0,
    "opacity-0": !0,
    "pointer-events-none": !0,
    "transition-opacity": !0,
    'after:content-[""]': !0,
    "after:absolute": !0,
    "after:top-full": !0,
    "after:left-1/2": !0,
    "after:-translate-x-1/2": !0,
    "after:-translate-y-[1px]": !0,
    "after:border-4": !0,
    "after:border-transparent": !0,
    "after:border-t-sky-500": !0,
    "group-hover:opacity-100": !0,
    "group-focus-visible:opacity-100": !0,
    "group-data-[show-tooltip=true]:opacity-100": !0
  },
  slider__linkedValues: {
    flex: !0,
    "items-start": !0,
    "justify-between": !0
  },
  slider__minValue: {
    grow: !0,
    "!max-w-[45%]": !0,
    "mb-0": !0,
    "[&>div>div]:relative": !0,
    '[&>div>div::after]:content-[""]': !0,
    "[&>div>div::after]:absolute": !0,
    "[&>div>div::after]:top-1/2": !0,
    "[&>div>div::after]:left-[105.5%]": !0,
    "[&>div>div::after]:w-[12%]": !0,
    "[&>div>div::after]:h-[1px]": !0,
    "[&>div>div::after]:bg-slate-300": !0,
    "dark:[&>div>div::after]:bg-slate-600": !0
  },
  slider__maxValue: {
    grow: !0,
    "!max-w-[45%]": !0,
    "mb-0": !0,
    relative: !0
  },
  slider__chart: {
    relative: !0,
    "z-20": !0,
    "mb-2": !0,
    flex: !0,
    "justify-between": !0,
    "items-center": !0,
    "w-full": !0,
    "aspect-[3/1]": !0
  },
  slider__chartBar: {
    absolute: !0,
    "bottom-0": !0,
    "h-full": !0,
    "bg-slate-400": !0,
    "data-[active=false]:bg-slate-300": !0,
    "dark:bg-slate-500": !0,
    "dark:data-[active=false]:bg-slate-600": !0
  },
  taglist__inner: {
    "py-2": !0,
    "pr-0": !0,
    "pl-0": !0
  },
  taglist__tags: {
    "pl-3": !0
  },
  taglist__tagWrapper: {
    "[&.formkit-dropZone_.formkit-tag]:opacity-25": !0,
    "[&.formkit-touchDropZone_.formkit-tag]:opacity-25": !0
  },
  taglist__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "!p-0": !0,
    "!w-[0%]": !0,
    "min-w-[1em]": !0,
    "inline-block": !0,
    "-mt-1": !0,
    "first:mt-0": !0,
    "first:mb-1": !0
  },
  taglist__listboxButton: {
    "ml-auto": !0,
    "shrink-0": !0
  },
  toggle__outer: {
    group: !0,
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "data-[disabled]:select-none": !0,
    "data-[disabled]:opacity-50": !0,
    "text-base": !0,
    "max-w-none": !0
  },
  toggle__altLabel: {
    block: !0,
    "w-full": !0,
    "mb-1.5": !0,
    "font-bold": !0,
    "text-xs": !0,
    "text-slate-700": !0,
    "dark:text-slate-300": !0
  },
  toggle__inner: {
    peer: !0,
    "inline-block": !0,
    "mr-2": !0
  },
  toggle__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    peer: !0,
    absolute: !0,
    "opacity-0": !0,
    "w-0": !0,
    "h-0": !0
  },
  toggle__label: {
    block: !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "font-bold": !0,
    "mb-1": !0,
    "dark:text-slate-300": !0,
    "peer-first:font-normal": !0,
    "peer-first:mb-0": !0
  },
  toggle__innerLabel: {
    absolute: !0,
    "text-slate-200": !0,
    "text-[10px]": !0,
    "font-bold": !0,
    "select-none": !0,
    "left-full": !0,
    "top-1/2": !0,
    "-translate-x-full": !0,
    "-translate-y-1/2": !0,
    "px-1": !0
  },
  toggle__thumb: {
    relative: !0,
    "p-0.5": !0,
    "left-0": !0,
    "aspect-[1/1]": !0,
    "rounded-full": !0,
    "transition-all": !0,
    "w-[1.25em]": !0,
    "bg-slate-50": !0,
    "text-slate-600": !0,
    "shadow-base": !0
  },
  toggle__track: {
    "p-0.5": !0,
    "min-w-[3em]": !0,
    relative: !0,
    "cursor-pointer": !0,
    "select-none": !0,
    "rounded-full": !0,
    "transition-all": !0,
    "bg-slate-400": !0,
    "peer-checked:bg-sky-500": !0,
    "peer-checked:[&>div:last-child]:left-full": !0,
    "peer-checked:[&>div:last-child]:-translate-x-full": !0,
    "peer-checked:[&>div:first-child:not(:last-child)]:left-0": !0,
    "peer-checked:[&>div:first-child:not(:last-child)]:translate-x-0": !0,
    "shadow-none": !0,
    "peer-focus-visible:ring-2": !0,
    "peer-focus-visible:ring-sky-400": !0,
    "peer-focus-visible:ring-offset-2": !0,
    "dark:bg-slate-500": !0
  },
  toggle__valueLabel: {
    "font-bold": !0,
    "text-xs": !0,
    "text-slate-700": !0,
    "dark:text-slate-300": !0
  },
  toggle__wrapper: {
    flex: !0,
    "flex-wrap": !0,
    "items-center": !0,
    "mb-1.5": !0
  },
  togglebuttons__wrapper: {
    "mb-1.5": !0
  },
  togglebuttons__options: {
    "group/options": !0,
    "inline-flex": !0,
    "data-[vertical=true]:flex-col": !0
  },
  togglebuttons__option: {
    "group/option": !0
  },
  togglebuttons__input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0,
    "!px-4": !0,
    "!mb-0": !0,
    relative: !0,
    "focus:z-10": !0,
    "group-data-[vertical=true]/options:w-full": !0,
    "justify-center": !0,
    "bg-sky-50": !0,
    "disabled:opacity-50": !0,
    "disabled:cursor-not-allowed": !0,
    "group-data-[disabled]:disabled:opacity-100": !0,
    "dark:bg-transparent": !0,
    "dark:disabled:bg-transparent": !0,
    "dark:disabled:text-sky-500": !0,
    "dark:text-sky-500": !0,
    "aria-[pressed=true]:bg-sky-500": !0,
    "aria-[pressed=true]:text-white": !0,
    "dark:aria-[pressed=true]:bg-sky-500": !0,
    "dark:aria-[pressed=true]:text-white": !0,
    "group-[]/option:!rounded-none": !0,
    "group-data-[vertical=false]/options:group-first/option:!rounded": !0,
    "group-data-[vertical=true]/options:group-first/option:!rounded": !0,
    "group-data-[vertical=false]/options:group-first/option:!rounded-tr-none": !0,
    "group-data-[vertical=false]/options:group-first/option:!rounded-br-none": !0,
    "group-data-[vertical=true]/options:group-first/option:!rounded-bl-none": !0,
    "group-data-[vertical=true]/options:group-first/option:!rounded-br-none": !0,
    "group-data-[vertical=false]/options:group-last/option:!rounded": !0,
    "group-data-[vertical=true]/options:group-last/option:!rounded": !0,
    "group-data-[vertical=false]/options:group-last/option:!rounded-tl-none": !0,
    "group-data-[vertical=false]/options:group-last/option:!rounded-bl-none": !0,
    "group-data-[vertical=true]/options:group-last/option:!rounded-tl-none": !0,
    "group-data-[vertical=true]/options:group-last/option:!rounded-tr-none": !0,
    "group-data-[vertical=false]/options:group-[]/option:!border-r-0": !0,
    "group-data-[vertical=false]/options:group-last/option:!border-r": !0,
    "group-data-[vertical=false]/options:group-[]/option:aria-[pressed=true]:border-x-sky-500": !0,
    "group-data-[vertical=false]/options:group-first/option:aria-[pressed=true]:border-l-sky-500": !0,
    "group-data-[vertical=false]/options:group-last/option:aria-[pressed=true]:border-r-sky-500": !0,
    "dark:group-data-[vertical=false]/options:group-[]/option:aria-[pressed=true]:border-x-sky-500": !0,
    "dark:group-data-[vertical=false]/options:group-first/option:aria-[pressed=true]:border-l-sky-500": !0,
    "dark:group-data-[vertical=false]/options:group-last/option:aria-[pressed=true]:border-r-sky-500": !0,
    "group-data-[vertical=true]/options:group-[]/option:!border-b-0": !0,
    "group-data-[vertical=true]/options:group-last/option:!border-b": !0,
    "group-data-[vertical=true]/options:group-[]/option:aria-[pressed=true]:border-y-sky-500": !0,
    "group-data-[vertical=true]/options:group-first/option:aria-[pressed=true]:border-t-sky-500": !0,
    "group-data-[vertical=true]/options:group-last/option:aria-[pressed=true]:border-b-sky-500": !0,
    "dark:group-data-[vertical=true]/options:group-[]/option:aria-[pressed=true]:border-y-sky-500": !0,
    "dark:group-data-[vertical=true]/options:group-first/option:aria-[pressed=true]:border-t-sky-500": !0,
    "dark:group-data-[vertical=true]/options:group-last/option:aria-[pressed=true]:border-b-sky-500": !0
  },
  transferlist__outer: {
    group: !0,
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "data-[disabled]:select-none": !0,
    "data-[disabled]:opacity-50": !0,
    "text-base": !0,
    "max-w-none": !0,
    "[&_.dnd-placeholder]:bg-sky-500": !0,
    "[&_.dnd-placeholder]:text-white": !0
  },
  transferlist__wrapper: {
    flex: !0,
    "flex-col": !0,
    "sm:flex-row": !0,
    "justify-between": !0,
    "w-full": !0,
    "max-w-none": !0
  },
  transferlist__help: {
    "text-slate-500": !0,
    "text-xs": !0,
    "dark:text-slate-400": !0,
    "pb-2": !0
  },
  transferlist__transferlist: {
    grow: !0,
    shrink: !0,
    "min-w-0": !0,
    "shadow-sm": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "aspect-[4/5]": !0,
    flex: !0,
    "flex-col": !0,
    "h-[350px]": !0,
    border: !0,
    "border-slate-200": !0,
    rounded: !0,
    "overflow-hidden": !0,
    "select-none": !0,
    "[&:has(:focus-visible)]:ring-1": !0,
    "[&:has(:focus-visible)]:ring-sky-400": !0,
    "dark:border-slate-700": !0,
    "dark:bg-slate-900/50": !0
  },
  transferlist__transferlistHeader: {
    flex: !0,
    "bg-slate-100": !0,
    "text-slate-600": !0,
    "text-sm": !0,
    "justify-between": !0,
    "items-center": !0,
    "border-b": !0,
    "border-slate-200": !0,
    "py-2": !0,
    "px-2.5": !0,
    "dark:bg-slate-700": !0,
    "dark:border-slate-700": !0,
    "dark:text-slate-400": !0
  },
  transferlist__transferlistHeaderItemCount: {
    "ml-auto": !0,
    "text-xs": !0,
    "min-w-[1.5em]": !0,
    "[line-height:1.5em]": !0,
    "px-2": !0,
    "text-center": !0,
    "rounded-xl": !0,
    "bg-slate-200": !0,
    "text-slate-700": !0,
    "dark:bg-slate-500": !0,
    "dark:text-slate-300": !0
  },
  transferlist__transferlistListItems: {
    "list-none": !0,
    "bg-white": !0,
    "h-full": !0,
    "overflow-x-hidden": !0,
    "overflow-y-auto": !0,
    "dark:bg-transparent": !0,
    "outline-none": !0
  },
  transferlist__transferlistListItem: {
    "py-2": !0,
    "px-2": !0,
    "text-slate-700": !0,
    "ring-1": !0,
    "ring-slate-200": !0,
    "aria-selected:bg-sky-100": !0,
    "data-[is-active=true]:bg-sky-100": !0,
    "data-[is-active=true]:ring-sky-200": !0,
    "aria-selected:ring-sky-200": !0,
    relative: !0,
    flex: !0,
    "cursor-pointer": !0,
    "items-center": !0,
    "bg-white": !0,
    "pl-[1.5em]": !0,
    "first:-mt-px": !0,
    "first:border-t": !0,
    "aria-selected:z-[2]": !0,
    "aria-selected:border-transparent": !0,
    "aria-selected:ring-1": !0,
    "data-[is-active=true]:z-[2]": !0,
    "data-[is-active=true]:border-transparent": !0,
    "data-[is-active=true]:ring-1": !0,
    "group-data-[is-max=true]:cursor-not-allowed": !0,
    "dark:bg-slate-800": !0,
    "dark:text-slate-300": !0,
    "dark:data-[is-active=true]:bg-sky-800": !0,
    "dark:aria-selected:bg-sky-800": !0,
    "dark:ring-slate-700": !0,
    "dark:data-[is-active=true]:ring-sky-600": !0,
    "dark:aria-selected:ring-sky-600": !0,
    "[&.formkit-dropZone]:bg-sky-100": !0,
    "[&.formkit-selectionDropZone]:bg-sky-100": !0,
    "[&.formkit-touchDropZone]:bg-sky-100": !0,
    "[&.formkit-touchSelectionDropZone]:bg-sky-100": !0,
    "[&.formkit-longTouch]:bg-sky-100": !0,
    "dark:[&.formkit-dropZone]:bg-sky-900": !0,
    "dark:[&.formkit-selectionDropZone]:bg-sky-900": !0,
    "dark:[&.formkit-touchDropZone]:bg-sky-900": !0,
    "dark:[&.formkit-touchSelectionDropZone]:bg-sky-900": !0,
    "dark:[&.formkit-longTouch]:bg-sky-900": !0
  },
  transferlist__transferlistOption: {
    "text-sm": !0
  },
  transferlist__transferControls: {
    "inline-flex": !0,
    "grow-0": !0,
    shrink: !0,
    border: !0,
    "border-slate-200": !0,
    "flex-row": !0,
    "sm:flex-col": !0,
    "justify-center": !0,
    "my-2": !0,
    "sm:my-auto": !0,
    "mx-auto": !0,
    "sm:mx-2": !0,
    rounded: !0,
    "overflow-clip": !0,
    "shadow-none": !0,
    "group-[]/repeater:shadow-none": !0,
    "group-[]/multistep:shadow-none": !0,
    "dark:border-slate-800": !0
  },
  transferlist__sourceEmptyMessage: {
    "appearance-none": !0,
    "border-none": !0,
    "w-full": !0,
    "my-2": !0,
    "text-center": !0,
    "text-slate-500": !0,
    italic: !0
  },
  transferlist__sourceListItems: {
    "group-data-[is-max=true]:opacity-50": !0
  },
  transferlist__targetEmptyMessage: {
    "appearance-none": !0,
    "border-none": !0,
    "w-full": !0,
    "my-2": !0,
    "text-center": !0,
    "text-slate-500": !0,
    italic: !0
  },
  transferlist__emptyMessageInner: {
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "p-2": !0,
    "text-sm": !0
  },
  transferlist__transferlistControls: {
    "bg-white": !0,
    "p-2": !0,
    "border-b": !0,
    "border-slate-200": !0,
    "dark:bg-slate-700": !0,
    "dark:border-slate-700": !0
  },
  transferlist__transferlistSearch: {
    flex: !0,
    border: !0,
    "border-slate-200": !0,
    rounded: !0,
    "items-center": !0,
    "text-slate-700": !0,
    "selection:bg-sky-100": !0,
    "dark:border-slate-700": !0,
    "dark:text-slate-300": !0,
    "dark:selection:bg-sky-100": !0,
    "dark:selection:text-slate-700": !0,
    "dark:bg-slate-800": !0
  },
  transferlist__transferlistSearchInput: {
    "border-none": !0,
    "px-2": !0,
    "py-1.5": !0,
    "w-full": !0,
    "bg-transparent": !0,
    "outline-none": !0,
    "text-sm": !0
  },
  transferlist__transferlistSearchClear: {
    flex: !0,
    "w-[0.75em]": !0,
    "mr-2": !0,
    "[&_svg]:w-full": !0
  },
  transferlist__controlLabel: {
    absolute: !0,
    "opacity-0": !0,
    "pointer-events-none": !0,
    "text-[0px]": !0
  },
  transferlist__selectedIcon: {
    "w-[0.75em]": !0,
    absolute: !0,
    "left-[0.5em]": !0,
    "select-none": !0,
    "text-sky-500": !0,
    "dark:text-sky-400": !0
  },
  transferlist__transferlistButton: {
    "sm:w-5": !0,
    relative: !0,
    flex: !0,
    "justify-center": !0,
    "text-sm": !0,
    "shrink-0": !0,
    "box-content": !0,
    "text-slate-700": !0,
    "disabled:bg-slate-200": !0,
    "disabled:!text-slate-400": !0,
    "bg-slate-50": !0,
    "hover:text-sky-500": !0,
    "cursor-pointer": !0,
    "appearance-none": !0,
    "border-none": !0,
    "p-2.5": !0,
    "hover:z-10": !0,
    "disabled:cursor-not-allowed": !0,
    "disabled:opacity-50": !0,
    "disabled:hover:text-current": !0,
    "disabled:hover:outline-none": !0,
    "focus-visible:ring-1": !0,
    "focus-visible:ring-sky-400": !0,
    "focus-visible:z-10": !0,
    "dark:bg-slate-800": !0,
    "dark:text-slate-400": !0,
    "dark:disabled:!text-slate-600": !0,
    "dark:disabled:bg-slate-900": !0,
    "dark:disabled:hover:text-current": !0,
    "dark:disabled:hover:outline-none": !0,
    "dark:hover:text-sky-400": !0
  },
  transferlist__fastForwardIcon: {
    "w-4": !0,
    flex: !0,
    "select-none": !0,
    "[&>svg]:m-auto": !0,
    "[&>svg]:w-full": !0,
    "[&>svg]:max-w-[1rem]": !0,
    "[&>svg]:max-h-[1rem]": !0,
    "rotate-90": !0,
    "sm:rotate-0": !0
  },
  transferlist__moveRightIcon: {
    "w-4": !0,
    flex: !0,
    "select-none": !0,
    "[&>svg]:m-auto": !0,
    "[&>svg]:w-full": !0,
    "[&>svg]:max-w-[1rem]": !0,
    "[&>svg]:max-h-[1rem]": !0,
    "rotate-90": !0,
    "sm:rotate-0": !0
  },
  transferlist__moveLeftIcon: {
    "w-4": !0,
    flex: !0,
    "select-none": !0,
    "[&>svg]:m-auto": !0,
    "[&>svg]:w-full": !0,
    "[&>svg]:max-w-[1rem]": !0,
    "[&>svg]:max-h-[1rem]": !0,
    "rotate-90": !0,
    "sm:rotate-0": !0
  },
  transferlist__rewindIcon: {
    "w-4": !0,
    flex: !0,
    "select-none": !0,
    "[&>svg]:m-auto": !0,
    "[&>svg]:w-full": !0,
    "[&>svg]:max-w-[1rem]": !0,
    "[&>svg]:max-h-[1rem]": !0,
    "rotate-90": !0,
    "sm:rotate-0": !0
  },
  transferlist__messages: {
    "mt-2": !0
  },
  barcode__barcodeIcon: {
    "w-[1.5em]": !0,
    "text-slate-700": !0,
    "cursor-pointer": !0,
    "dark:text-slate-300": !0
  },
  barcode__dialog: {
    "border-none": !0,
    "outline-none": !0,
    "overflow-clip": !0,
    "p-0": !0,
    "bg-black": !0,
    rounded: !0,
    "w-[100%-2rem]": !0,
    "max-w-[30rem]": !0,
    "[&::backdrop]:bg-slate-800/50": !0
  },
  barcode__video: {
    "w-full": !0,
    "aspect-[1/1]": !0,
    "object-cover": !0,
    block: !0,
    "pointer-events-none": !0
  },
  barcode__closeIcon: {
    "cursor-pointer": !0,
    absolute: !0,
    "bg-white": !0,
    "color-slate-700": !0,
    "w-[1.5em]": !0,
    "h-[1.5em]": !0,
    rounded: !0,
    flex: !0,
    "top-2": !0,
    "right-2": !0,
    "z-20": !0,
    "[&>svg]:w-[1.25em]": !0,
    "[&>svg]:h-[1.25em]": !0,
    "[&>svg]:m-auto": !0
  },
  barcode__overlay: {
    "text-slate-700": !0,
    "dark:text-slate-300": !0,
    absolute: !0,
    "top-1/2": !0,
    "left-1/2": !0,
    "w-[min(20em,75%)]": !0,
    "aspect-[1/1]": !0,
    "-translate-x-1/2": !0,
    "-translate-y-1/2": !0,
    rounded: !0,
    "pointer-events-none": !0,
    "shadow-[0_0_0_999em_rgba(0,0,0,0.5)]": !0
  },
  barcode__overlayDecorators: {
    absolute: !0,
    "inset-0": !0,
    "z-10": !0
  },
  barcode__overlayDecoratorTopLeft: {
    absolute: !0,
    "w-[1.5rem]": !0,
    "h-[1.5rem]": !0,
    rounded: !0,
    "top-0": !0,
    "left-0": !0,
    "border-l-4": !0,
    "border-t-4": !0,
    "rounded-tr-none": !0,
    "rounded-bl-none": !0
  },
  barcode__overlayDecoratorTopRight: {
    absolute: !0,
    "w-[1.5rem]": !0,
    "h-[1.5rem]": !0,
    rounded: !0,
    "top-0": !0,
    "right-0": !0,
    "border-r-4": !0,
    "border-t-4": !0,
    "rounded-tl-none": !0,
    "rounded-br-none": !0
  },
  barcode__overlayDecoratorBottomRight: {
    absolute: !0,
    "w-[1.5rem]": !0,
    "h-[1.5rem]": !0,
    rounded: !0,
    "bottom-0": !0,
    "right-0": !0,
    "border-r-4": !0,
    "border-b-4": !0,
    "rounded-tr-none": !0,
    "rounded-bl-none": !0
  },
  barcode__overlayDecoratorBottomLeft: {
    absolute: !0,
    "w-[1.5rem]": !0,
    "h-[1.5rem]": !0,
    rounded: !0,
    "bottom-0": !0,
    "left-0": !0,
    "border-l-4": !0,
    "border-b-4": !0,
    "rounded-tl-none": !0,
    "rounded-br-none": !0
  },
  "multi-step__outer": {
    group: !0,
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "data-[disabled]:select-none": !0,
    "data-[disabled]:opacity-50": !0,
    "text-base": !0,
    "group/multistep": !0,
    "max-w-[32rem]": !0
  },
  "multi-step__wrapper": {
    "group/wrapper": !0,
    "data-[tab-style=tab]:shadow-sm": !0,
    "data-[tab-style=tab]:rounded": !0
  },
  "multi-step__tabs": {
    flex: !0,
    "items-center": !0,
    "group-data-[tab-style=tab]/wrapper:overflow-auto": !0,
    "group-data-[tab-style=tab]/wrapper:border": !0,
    "group-data-[tab-style=tab]/wrapper:border-b-0": !0,
    "group-data-[tab-style=tab]/wrapper:border-slate-200": !0,
    "group-data-[tab-style=tab]/wrapper:rounded": !0,
    "group-data-[tab-style=tab]/wrapper:rounded-bl-none": !0,
    "group-data-[tab-style=tab]/wrapper:rounded-br-none": !0,
    "dark:group-data-[tab-style=tab]/wrapper:border-slate-700": !0,
    "group-data-[tab-style=progress]/wrapper:my-6": !0,
    "group-data-[tab-style=progress]/wrapper:justify-around": !0,
    "group-data-[tab-style=progress]/wrapper:overflow-visible": !0,
    "group-data-[tab-style=progress]/wrapper:group-data-[hide-labels=true]/wrapper:mb-3.5": !0
  },
  "multi-step__tab": {
    "group/tab": !0,
    "group-data-[tab-style=tab]/wrapper:relative": !0,
    "group-data-[tab-style=tab]/wrapper:flex": !0,
    "group-data-[tab-style=tab]/wrapper:grow": !0,
    "group-data-[tab-style=tab]/wrapper:text-sm": !0,
    "group-data-[tab-style=tab]/wrapper:items-center": !0,
    "group-data-[tab-style=tab]/wrapper:justify-center": !0,
    "group-data-[tab-style=tab]/wrapper:cursor-pointer": !0,
    "group-data-[tab-style=tab]/wrapper:text-slate-700": !0,
    "group-data-[tab-style=tab]/wrapper:bg-slate-100": !0,
    "group-data-[tab-style=tab]/wrapper:py-3.5": !0,
    "group-data-[tab-style=tab]/wrapper:px-4": !0,
    "group-data-[tab-style=tab]/wrapper:border-r": !0,
    "group-data-[tab-style=tab]/wrapper:border-b": !0,
    "group-data-[tab-style=tab]/wrapper:border-slate-200": !0,
    "group-data-[tab-style=tab]/wrapper:last:border-r-0": !0,
    "group-data-[tab-style=tab]/wrapper:shadow-[inset_0_-0.5em_0.5em_-0.5em_rgba(0,0,0,0.1)]": !0,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:bg-white": !0,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:font-bold": !0,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:border-b-white": !0,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:z-10": !0,
    "group-data-[tab-style=tab]/wrapper:data-[active=true]:shadow-[0_0_0.5em_0_rgba(0,0,0,0.1)]": !0,
    "dark:group-data-[tab-style=tab]/wrapper:text-slate-300": !0,
    "dark:group-data-[tab-style=tab]/wrapper:bg-slate-950/20": !0,
    "dark:group-data-[tab-style=tab]/wrapper:data-[active=true]:bg-transparent": !0,
    "dark:group-data-[tab-style=tab]/wrapper:data-[active=true]:border-b-transparent": !0,
    "dark:group-data-[tab-style=tab]/wrapper:border-slate-700": !0,
    "group-data-[tab-style=progress]/wrapper:flex": !0,
    "group-data-[tab-style=progress]/wrapper:flex-col": !0,
    "group-data-[tab-style=progress]/wrapper:items-center": !0,
    "group-data-[tab-style=progress]/wrapper:grow": !0,
    "group-data-[tab-style=progress]/wrapper:shrink-0": !0,
    "group-data-[tab-style=progress]/wrapper:relative": !0,
    "group-data-[tab-style=progress]/wrapper:before:block": !0,
    "group-data-[tab-style=progress]/wrapper:before:text-sm": !0,
    "group-data-[tab-style=progress]/wrapper:before:w-[1.25rem]": !0,
    "group-data-[tab-style=progress]/wrapper:before:h-[1.25rem]": !0,
    "group-data-[tab-style=progress]/wrapper:before:border-4": !0,
    "group-data-[tab-style=progress]/wrapper:before:border-slate-300": !0,
    "group-data-[tab-style=progress]/wrapper:before:rounded-full": !0,
    "group-data-[tab-style=progress]/wrapper:before:bg-white": !0,
    "group-data-[tab-style=progress]/wrapper:before:z-10": !0,
    "dark:group-data-[tab-style=progress]/wrapper:before:border-slate-700": !0,
    "dark:group-data-[tab-style=progress]/wrapper:before:bg-slate-950": !0,
    "group-data-[tab-style=progress]/wrapper:after:block": !0,
    "group-data-[tab-style=progress]/wrapper:after:h-1": !0,
    "group-data-[tab-style=progress]/wrapper:after:w-full": !0,
    "group-data-[tab-style=progress]/wrapper:after:absolute": !0,
    "group-data-[tab-style=progress]/wrapper:after:top-[0.5em]": !0,
    "group-data-[tab-style=progress]/wrapper:after:left-[calc(50%+0.5em)]": !0,
    "group-data-[tab-style=progress]/wrapper:after:bg-slate-300": !0,
    "group-data-[tab-style=progress]/wrapper:data-[valid=true]:data-[visited=true]:after:bg-sky-500": !0,
    "group-data-[tab-style=progress]/wrapper:last:after:hidden": !0,
    "dark:group-data-[tab-style=progress]/wrapper:after:bg-slate-700": !0,
    "dark:group-data-[tab-style=progress]/wrapper:data-[valid=true]:data-[visited=true]:after:bg-sky-500": !0
  },
  "multi-step__tabLabel": {
    "group-data-[tab-style=progress]/wrapper:absolute": !0,
    "group-data-[tab-style=progress]/wrapper:text-slate-800": !0,
    "group-data-[tab-style=progress]/wrapper:top-full": !0,
    "group-data-[tab-style=progress]/wrapper:w-full": !0,
    "group-data-[tab-style=progress]/wrapper:whitespace-nowrap": !0,
    "group-data-[tab-style=progress]/wrapper:text-xs": !0,
    "dark:group-data-[tab-style=progress]/wrapper:text-slate-300": !0
  },
  "multi-step__badge": {
    "bg-red-500": !0,
    absolute: !0,
    "font-mono": !0,
    "font-bold": !0,
    flex: !0,
    "items-center": !0,
    "justify-center": !0,
    "aspect-[1/1]": !0,
    "[line-height:1.25rem]": !0,
    "text-white": !0,
    "rounded-full": !0,
    "group-data-[valid=true]/tab:bg-sky-500": !0,
    "group-data-[tab-style=tab]/wrapper:text-[0.66rem]": !0,
    "group-data-[tab-style=tab]/wrapper:p-1.5": !0,
    "group-data-[tab-style=tab]/wrapper:w-5": !0,
    "group-data-[tab-style=tab]/wrapper:h-5": !0,
    "group-data-[tab-style=tab]/wrapper:top-1.5": !0,
    "group-data-[tab-style=tab]/wrapper:right-1.5": !0,
    "group-data-[tab-style=progress]/wrapper:w-[1.25rem]": !0,
    "group-data-[tab-style=progress]/wrapper:h-[1.25rem]": !0,
    "group-data-[tab-style=progress]/wrapper:p-1": !0,
    "group-data-[tab-style=progress]/wrapper:text-[10px]": !0,
    "group-data-[tab-style=progress]/wrapper:[line-height:0]": !0,
    "group-data-[tab-style=progress]/wrapper:z-10": !0
  },
  "multi-step__validStepIcon": {
    "w-full": !0,
    "h-full": !0,
    "mt-0.5": !0
  },
  "multi-step__steps": {
    "px-10": !0,
    "pt-8": !0,
    "pb-4": !0,
    "bg-white": !0,
    border: !0,
    "border-slate-200": !0,
    rounded: !0,
    "dark:bg-transparent": !0,
    "dark:border-slate-700": !0,
    "group-data-[tab-style=tab]/wrapper:border-t-0": !0,
    "group-data-[tab-style=tab]/wrapper:rounded-tl-none": !0,
    "group-data-[tab-style=tab]/wrapper:rounded-tr-none": !0,
    "group-data-[tab-style=progress]/wrapper:shadow-sm": !0,
    "[&_[data-type]]:max-w-none": !0
  },
  step__stepActions: {
    flex: !0,
    "justify-between": !0,
    "[&>*]:grow-0": !0
  },
  step__stepPrevious: {
    "mr-1.5": !0
  },
  step__stepNext: {
    "ml-auto": !0
  }
}, ks = {
  outer: {
    group: !0,
    "max-w-none": !0,
    "min-w-0": !0,
    grow: !0,
    "mb-4": !0,
    "data-[disabled]:select-none": !0,
    "data-[disabled]:opacity-50": !0,
    "text-base": !0
  },
  label: {
    block: !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "font-bold": !0,
    "mb-1": !0,
    "dark:text-slate-300": !0
  },
  legend: {
    block: !0,
    "text-slate-700": !0,
    "text-sm": !0,
    "font-bold": !0,
    "dark:text-slate-300": !0
  },
  input: {
    "appearance-none": !0,
    "[color-scheme:light]": !0,
    "dark:[color-scheme:dark]": !0,
    "selection:bg-sky-100": !0,
    "selection:text-slate-700": !0,
    "group-data-[has-overlay]:selection:!text-transparent": !0
  },
  prefixIcon: {
    flex: !0,
    "items-center": !0,
    "-ml-1": !0,
    "mr-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0
  },
  suffixIcon: {
    flex: !0,
    "items-center": !0,
    "-mr-1": !0,
    "ml-2": !0,
    "text-base": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0
  },
  loaderIcon: {
    "animate-spin": !0,
    flex: !0,
    "items-center": !0,
    "my-auto": !0,
    "ml-2": !0,
    "text-base": !0,
    "text-slate-500": !0,
    "h-[1em]": !0,
    "w-[1em]": !0,
    "shrink-0": !0,
    "[&>svg]:w-full": !0
  },
  loadMoreInner: {
    flex: !0,
    "text-sm": !0,
    "text-slate-500": !0,
    "p-2": !0,
    "items-center": !0,
    "justify-center": !0,
    "[&>span]:mr-2": !0
  },
  help: {
    "text-slate-500": !0,
    "text-xs": !0,
    "dark:text-slate-400": !0
  },
  message: {
    "text-red-500": !0,
    "mb-1.5": !0,
    "text-xs": !0,
    "dark:text-red-400": !0
  },
  overlay: {
    "text-slate-700": !0,
    "dark:text-slate-300": !0
  },
  overlayPlaceholder: {
    "text-slate-400": !0,
    "dark:text-slate-400/50": !0
  },
  overlayLiteral: {
    "text-slate-700": !0,
    "dark:text-slate-300": !0
  },
  overlayChar: {
    "text-slate-700": !0,
    "dark:text-slate-300": !0
  },
  overlayEnum: {
    "text-slate-700": !0,
    "dark:text-slate-300": !0
  }
}, ws = (e) => (e.props.type === "checkbox" || e.props.type === "radio") && e.props.options, Es = (e) => {
  e.on("created", () => {
    const t = e.props.parsedRules.some((a) => a.name === "required");
    if (!t || !e.props || !e.props.definition) return;
    const r = ws(e);
    e.props.definition.schemaMemoKey = `required_${r ? "multi_" : ""}${e.props.definition.schemaMemoKey}`;
    const n = e.props.definition.schema;
    e.props.definition.schema = (a = {}) => (t && (r ? a.legend = {
      children: ["$label", "*"]
    } : a.label = {
      children: ["$label", "*"]
    }), typeof n == "function" ? n(a) : n ?? []);
  });
}, js = (e) => {
  const t = [
    Yl,
    Es,
    Fs,
    Fl
  ], r = [
    "name",
    "url",
    "mode",
    "multiple",
    "accept",
    "disabled",
    "auto",
    "maxFileSize",
    "invalidFileSizeMessage",
    "invalidFileLimitMessage",
    "invalidFileTypeMessage",
    "fileLimit",
    "withCredentials",
    "previewWidth",
    "chooseLabel",
    "uploadLabel",
    "cancelLabel",
    "customUpload",
    "showUploadButton",
    "showCancelButton",
    "chooseIcon",
    "uploadIcon",
    "cancelIcon",
    "style",
    "class",
    "chooseButtonProps",
    "uploadButtonProps",
    "cancelButtonProps",
    "dt",
    "pt",
    "ptOptions",
    "unstyled"
  ], a = [
    ...[
      "options",
      "cacheKey",
      "cacheTimeout",
      "createRoute",
      "useLazy",
      "convertToFlat",
      "dependsOn",
      "requestPropertyName",
      "responseOptionsKey",
      "requestMapper",
      "bypassCache",
      "optionsMapper",
      "debounceInMilliSeconds",
      // Keys from FormKitInputContext
      "node",
      // Common props shared between single and multi select
      "modelValue",
      "defaultValue",
      "name",
      "options",
      "optionLabel",
      "optionValue",
      "optionDisabled",
      "optionGroupLabel",
      "optionGroupChildren",
      "scrollHeight",
      "filter",
      "filterPlaceholder",
      "filterLocale",
      "filterMatchMode",
      "filterFields",
      "placeholder",
      "size",
      "invalid",
      "disabled",
      "variant",
      "dataKey",
      "showClear",
      "fluid",
      "inputId",
      "panelStyle",
      "panelClass",
      "overlayStyle",
      "overlayClass",
      "appendTo",
      "loading",
      "clearIcon",
      "dropdownIcon",
      "filterIcon",
      "loadingIcon",
      "resetFilterOnHide",
      "resetFilterOnClear",
      "virtualScrollerOptions",
      "autoOptionFocus",
      "autoFilterFocus",
      "focusOnHover",
      "highlightOnSelect",
      "filterMessage",
      "selectionMessage",
      "emptySelectionMessage",
      "emptyFilterMessage",
      "emptyMessage",
      "tabindex",
      "ariaLabel",
      "ariaLabelledby",
      "formControl",
      "dt",
      "pt",
      "ptOptions",
      "unstyled"
    ],
    "editable",
    "inputStyle",
    "inputClass",
    "labelId",
    "labelStyle",
    "labelClass",
    "useButtons",
    "multiple",
    "selectOnFocus",
    "checkmark"
  ], l = [
    "disabledDates",
    // from DatepickerContext
    "disabledDatesRequestPropertyName",
    // from DatepickerContext
    "disabledDatesResponsePropertyName",
    // from DatepickerContext
    "dsiabledDatesRequestMapper",
    // from DatepickerContext
    "dsiabledDatesResponseMapper",
    // from DatepickerContext
    "convertToNumber",
    // from DatepickerContext
    "defaultValue",
    "name",
    "selectionMode",
    "dateFormat",
    "inline",
    "showOtherMonths",
    "selectOtherMonths",
    "showIcon",
    "iconDisplay",
    "icon",
    "prevIcon",
    "nextIcon",
    "incrementIcon",
    "decrementIcon",
    "numberOfMonths",
    "responsiveOptions",
    "breakpoint",
    "view",
    "minDate",
    "maxDate",
    "disabledDates",
    "disabledDays",
    "maxDateCount",
    "showOnFocus",
    "autoZIndex",
    "baseZIndex",
    "showButtonBar",
    "shortYearCutoff",
    "showTime",
    "timeOnly",
    "hourFormat",
    "stepHour",
    "stepMinute",
    "stepSecond",
    "showSeconds",
    "hideOnDateTimeSelect",
    "hideOnRangeSelection",
    "timeSeparator",
    "showWeek",
    "manualInput",
    "size",
    "invalid",
    "disabled",
    "variant",
    "readonly",
    "placeholder",
    "appendTo",
    "id",
    "inputId",
    "inputStyle",
    "inputClass",
    "panelStyle",
    "panelClass",
    "todayButtonProps",
    "clearButtonProps",
    "navigatorButtonProps",
    "timepickerButtonProps",
    "fluid",
    "ariaLabelledby",
    "ariaLabel",
    "formControl",
    "dt",
    "pt",
    "ptOptions",
    "unstyled"
  ], u = nt(xl, {
    props: a
  }), o = nt(_a, {
    props: l
  }), s = nt(Bl, {
    props: ["bucketName", "filesHandler", ...r]
  });
  return el({
    ...e,
    inputs: { ...{
      devkitDropdown: u,
      devkitDatepicker: o,
      devkitUpload: s
    }, ...e.inputs },
    plugins: e.plugins ? { ...t, ...e.plugins } : t,
    config: e.config ? {
      rootClasses: e.config.rootClasses || en,
      ...e.config
    } : { rootClasses: en }
  });
};
export {
  _a as Datepicker,
  Yl as DependencyManagerPlugin,
  xl as Dropdown,
  Ts as FormBase,
  Fs as FormDataGetterPlugin,
  rd as InputDatepicker,
  Ps as LoginForm,
  Fl as OptionsGetterPlugin,
  Bl as Upload,
  Ya as default,
  js as formKitConfig,
  qs as useAppFormStore,
  Sa as useAppFormStoreWithKey,
  ed as useAppFormStoreWithProps
};
