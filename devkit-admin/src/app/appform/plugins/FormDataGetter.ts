import { FormKitPlugin } from "@formkit/core";
import { ObjectKeys, resolveApiEndpoint } from "devkit-apiclient";
import { FindHandler } from "@/pkg/types/types";
import { apiClient } from "@/apiClient";
import { useRoute } from "vue-router";
import { RouteQueryFind, RouteQueryRemove } from "@/pkg/utils/QueryUtils";

export const FormDataGetter: FormKitPlugin = (node) => {
  if (!node.props) return
  if (node.props.type == 'form') {
    const { id: formKey, attrs } = node.props
    const { findHandler, syncWithUrl, usePresist } = attrs
    console.log("asdsyncWithUrl", syncWithUrl)
    const getDataFromFindHandler = (handler: FindHandler<any, any, any>) => {
      const route = useRoute()
      if (!handler) return
      const findHandlerRequest: any = {};
      const requestValue = handler.requestValue
        ? handler.requestValue
        : route.params[handler.routerParamName || "id"];
      findHandlerRequest[handler.requestPropertyName] = requestValue;
      resolveApiEndpoint<any, any, any>(handler.endpoint, apiClient, findHandlerRequest)
        .then((resp) => {
          if (handler.responsePropertyName) {
            if (handler.responsePropertyName in resp) {
              const formValue = resp[handler.responsePropertyName];
              if (typeof formValue == "object" && formValue) {
                node.input(formValue)
                return
              }
            }
          }
          node.input(resp)
        })
        .catch((e: Error) => {
          console.error("find handler failed", e);
        });
    }

    const getInitialValue = (formValues: string) => {
      console.log("initial", formValues)
      if (formValues != null) {
        try {
          return JSON.parse(formValues);
        } catch (e) {
          RouteQueryRemove(formKey);
          localStorage.removeItem(formKey);
          console.log("error parsing url", e);
        }
      }
    };
    const getInitialValueFromLocalStorage = () => {
      if (!usePresist) return undefined;
      const formValues = localStorage.getItem(formKey);
      if (!formValues) return {};
      return getInitialValue(formValues);
    };
    const getInitialValueFromUrl = () => {
      if (!syncWithUrl) return undefined;
      const formValues = RouteQueryFind(formKey);

      if (!formValues) return {};
      return getInitialValue(formValues);
    };

    const getDefaultFormValue = () => {
      console.log("default fetcher")
      if (!syncWithUrl && !usePresist) {
        return;
      }
      if (usePresist) {
        const localStorageFormValues = getInitialValueFromLocalStorage();
        if (localStorageFormValues) {
          if (ObjectKeys(localStorageFormValues).length > 0) {
            node.input(localStorageFormValues)
            return
          }
        }
      }

      console.log("default fetcher", node.props)
      const urlFormValues = getInitialValueFromUrl();
      if (urlFormValues) {
        if (ObjectKeys(urlFormValues).length > 0) {
          // formStore.formValueRef = urlFormValues
          node.input(urlFormValues)
        }
      }
    };

    if (findHandler) {
      getDataFromFindHandler(findHandler)
      return
    }
    getDefaultFormValue()
    console.log("node is node", node.props.attrs.findHandler)
  }
}
