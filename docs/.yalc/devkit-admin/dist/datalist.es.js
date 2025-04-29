var m = Object.defineProperty;
var i = (t, s, e) => s in t ? m(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var a = (t, s, e) => i(t, typeof s != "symbol" ? s + "" : s, e);
import { C as o, _ as f } from "./Datalist.vue_vue_type_script_setup_true_lang-upv7h8G1.mjs";
import { a as C, u as D, c as y, b as S } from "./Datalist.vue_vue_type_script_setup_true_lang-upv7h8G1.mjs";
import { h as r } from "vue";
import { T as u } from "./devkit_admin-DO-pzuyi.mjs";
import { AppImage as p } from "devkit-base-components";
class _ extends o {
  constructor() {
    super(...arguments);
    a(this, "renderHtml", (e) => {
      try {
        if (this.columnName in e) {
          const n = e[this.columnName];
          return !n || typeof n != "object" ? r("span", "") : "seconds" in n && "nanos" in n ? r(
            "span",
            u({ seconds: Number(n.seconds), nanos: Number(n.nanos) })
          ) : r("span", "");
        }
      } catch {
        return r("span", "error_parsing_date");
      }
      return r("span", "");
    });
  }
}
class b extends o {
  constructor() {
    super(...arguments);
    a(this, "renderHtml", (e) => this.columnName in e && typeof e[this.columnName] == "string" ? r(p, { src: e[this.columnName], size: 150 }) : r("span", "unable_to_parse"));
  }
}
export {
  o as ColumnBase,
  _ as ColumnDate,
  b as ColumnImage,
  C as ColumnText,
  f as default,
  D as useDatalistStore,
  y as useDatalistStoreWithKey,
  S as useDatalistStoreWithProps
};
