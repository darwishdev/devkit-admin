import { defineComponent as F, ref as N, inject as k, useSlots as x, computed as P, resolveComponent as $, unref as r, openBlock as g, createElementBlock as h, createElementVNode as L, createVNode as p, createSlots as D, withCtx as u, renderSlot as f } from "vue";
import { b as T, _ as V } from "./Datalist.vue_vue_type_script_setup_true_lang-DYcm5TLa.mjs";
import { AppBtn as B } from "devkit-base-components";
import { resolveApiEndpoint as z } from "devkit-apiclient";
const q = {
  $formkit: "devkitDropdown",
  useButtons: !0,
  options: "bucketList",
  responseOptionsKey: "buckets",
  optionValue: "id",
  optionLabel: "name",
  validation: "required",
  prefixIcon: "tools",
  showClear: !0,
  outerClass: "col-12 sm:col-6 md:col-3",
  name: "bucketId",
  placeholder: "buckets"
}, E = {
  bucket_info: {
    isTitleHidden: !0,
    isTransparent: !0,
    inputs: [
      {
        $formkit: "text",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "bucketName",
        validation: "required",
        placeholder: "bucketName",
        label: "bucketName"
      },
      {
        $formkit: "text",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "fileSizeLimit",
        placeholder: "fileSizeLimit",
        label: "fileSizeLimit"
      },
      {
        $formkit: "devkitDropdown",
        options: [{ label: "image/webp", value: "image/webp" }],
        optionValue: "label",
        optionLabel: "value",
        multiple: !0,
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "allowedFileTypes",
        placeholder: "allowedFileTypes",
        label: "allowedFileTypes"
      },
      {
        $formkit: "checkbox",
        prefixIcon: "tools",
        outerClass: "col-12 sm:col-6 md:col-5",
        name: "isPulic",
        value: !0,
        placeholder: "isPulic",
        label: "userPassword"
      }
    ]
  }
}, H = { key: 0 }, R = {
  key: 1,
  class: "buckets"
}, O = /* @__PURE__ */ F({
  __name: "FileManager",
  props: {
    bucketName: {}
  },
  setup(y) {
    const d = N(null), v = k("apiClient"), t = k("filesHandler"), n = y, m = x(), a = t ? {
      context: {
        datalistKey: "files",
        hideShowDeleted: !0,
        title: "files",
        formSections: E,
        rowIdentifier: "id",
        filters: n.bucketName ? void 0 : [q],
        requestMapper: n.bucketName ? (e) => ({
          filters: {
            ...e.filters,
            bucketId: n.bucketName
          },
          paginationParams: e.paginationParams
        }) : void 0,
        records: t.fileList,
        isServerSide: !0,
        isPresistFilters: !0,
        displayType: "card",
        isLazyFilters: !1,
        isActionsDropdown: !0,
        options: { title: "asd", description: "asd" }
      }
    } : void 0, s = a ? T(a) : void 0, b = P(() => {
      if (n.bucketName) return n.bucketName;
      if (!s) return "";
      const e = s.filtersFormStore.formValue;
      return !e || !("bucketId" in e) ? "" : e.bucketId;
    }), I = async (e) => {
      if (!(!s || !t)) {
        console.log("uploading", e), console.log(
          "reader is ",
          s.filtersFormStore.formValue,
          t
        );
        try {
          const o = e[0], i = o.name, l = o.type;
          if (b.value) return;
          const c = new FileReader();
          console.log("reader is ", t), c.onload = () => {
            if (c.result instanceof ArrayBuffer) {
              console.log("reader is ", t);
              const C = {
                path: i,
                bucketName: b.value,
                reader: new Uint8Array(c.result),
                fileType: l
              };
              z(
                t.fileCreate,
                v,
                C
              ).then((A) => {
                s.datalistQueryResult.refetch(), console.log("response", A);
              });
            }
          }, c.readAsArrayBuffer(o);
        } catch (o) {
          console.error("Upload failed:", o);
        }
      }
    }, w = () => {
      d.value && d.value.click();
    }, S = (e) => {
      console.log("filte changed", e);
      const o = { value: "images" }, i = e.target;
      !i.files || i.files.length === 0 || (console.log("should handle the upload", o.value), I(i.files));
    }, _ = (e) => {
      s && (s.filtersFormStore.refetchDropdownInput("bucketId"), console.log("submitted value is ", e));
    };
    return (e, o) => {
      const i = $("AppImage");
      return !r(t) || !r(a) ? (g(), h("div", H, " files handler is not passed on config ")) : (g(), h("div", R, [
        L("input", {
          type: "file",
          ref_key: "fileInput",
          ref: d,
          onChange: S,
          style: { display: "none" }
        }, null, 544),
        p(r(V), {
          context: r(a).context,
          "onCreate:submited": _
        }, D({
          card: u(({ data: l }) => [
            f(e.$slots, "card", { data: l }, () => [
              p(i, {
                src: l.name,
                class: "w-150"
              }, null, 8, ["src"])
            ])
          ]),
          globalActionsStartAppend: u(() => [
            p(r(B), {
              action: w,
              label: "upload"
            })
          ]),
          _: 2
        }, [
          m.globalActions ? {
            name: "globalActions",
            fn: u(({ store: l }) => [
              f(e.$slots, "globalActions", { store: l })
            ]),
            key: "0"
          } : void 0,
          m.actions ? {
            name: "actions",
            fn: u(({ data: l }) => [
              f(e.$slots, "actions", { data: l })
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["context"])
      ]));
    };
  }
});
export {
  O as _
};
