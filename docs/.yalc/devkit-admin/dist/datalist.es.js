var i = Object.defineProperty;
var m = (r, e, t) => e in r ? i(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var a = (r, e, t) => m(r, typeof e != "symbol" ? e + "" : e, t);
import { C as o, _ as l } from "./Datalist.vue_vue_type_script_setup_true_lang-C-vgaYwt.mjs";
import { a as x, u as C, c as S, b as y } from "./Datalist.vue_vue_type_script_setup_true_lang-C-vgaYwt.mjs";
import { h as n } from "vue";
import { T as u } from "./devkit_admin-C6eEBSUD.mjs";
import { AppImage as p } from "devkit-base-components";
class N extends o {
  constructor() {
    super(...arguments);
    a(this, "renderHtml", (t) => {
      try {
        if (this.columnName in t) {
          const s = t[this.columnName];
          return s instanceof Date ? n("span", s.toDateString()) : !s || typeof s != "object" ? n("span", "") : "seconds" in s && "nanos" in s ? n(
            "span",
            u({ seconds: Number(s.seconds), nanos: Number(s.nanos) })
          ) : n("span", "");
        }
      } catch {
        return n("span", "error_parsing_date");
      }
      return n("span", "");
    });
  }
}
class _ extends o {
  constructor() {
    super(...arguments);
    a(this, "renderHtml", (t) => this.columnName in t && typeof t[this.columnName] == "string" ? n(p, { src: t[this.columnName], size: 150 }) : n("span", "unable_to_parse"));
  }
}
export {
  o as ColumnBase,
  N as ColumnDate,
  _ as ColumnImage,
  x as ColumnText,
  l as default,
  C as useDatalistStore,
  S as useDatalistStoreWithKey,
  y as useDatalistStoreWithProps
};
