<script setup lang="ts" generic="
    TKey extends string,
    TFormRequest extends StringUnkownRecord = StringUnkownRecord,
    TApiRequest extends StringUnkownRecord = StringUnkownRecord,
    TApiResponse extends StringUnkownRecord = StringUnkownRecord,
    TFindRequestPropName extends string | undefined = 'recordId',
    TFindResponsePropName extends string | undefined = 'request',
    TFindCallbakResponse = unknown,
    TCallbakResponse = unknown
  ">
  import { db } from "@/devkit_admin";
  import { type FormKitSchemaNode, type FormKitNode } from "@formkit/core";
  import { h, inject, ref, resolveComponent } from "vue";
  import { useToast } from "primevue";
  import { useRoute, useRouter } from "vue-router";
  import { reset } from "@formkit/core";
  import { AppBtn } from "devkit-base-components";
  import { useMutation, useQueryClient } from "@tanstack/vue-query";
  import { useAppFormStoreWithKey } from "../store/AppFormStore";
  import { ObjectKeys, StringUnkownRecord } from "devkit-apiclient";
  import { AppFormProps } from "@/pkg/types/types";
  import {
    AppFormSection,
    FindHandlerFn,
    SubmitHandlerFn,
  } from "@/pkg/types/types";
  import { RouteQueryFind, RouteQueryRemove } from "@/pkg/utils/QueryUtils";
  import { useDebounceFn } from "@vueuse/core";
  const dialogRef = inject("dialogRef") as any;
  const formkitSchemaComp = resolveComponent("FormKitSchema");
  const queryClient = useQueryClient();
  const formkitComp = resolveComponent("FormKit");
  const apiClient = inject<Record<string, Function>>("apiClient");
  const toast = useToast();
  const props =
    defineProps<
      AppFormProps<
        TKey,
        TFormRequest,
        TApiRequest,
        TApiResponse,
        TFindRequestPropName,
        TFindResponsePropName,
        TFindCallbakResponse,
        TCallbakResponse
      >
    >();
  const { submitHandler, options, formKey, findHandler, invalidateCaches } =
    props.context;
  const formStore = useAppFormStoreWithKey(formKey);
  const route = useRoute();

  const getInitialValue = (formValues: string) => {
    console.log('urlvalues', formValues)
    let formValuesObject: StringUnkownRecord = {}
    if (formValues != null) {
      try {
        formValuesObject = JSON.parse(formValues)
      } catch (e) {
        RouteQueryRemove(formKey)
        console.log('error parsing url', e)
      }
    }
    return formValuesObject

  }
  const getInitialValueFromLocalStorage = () => {
    if (!props.context.useReset) return undefined
    const formValues = localStorage.getItem(formKey)
    if (!formValues) return {}
    return getInitialValue(formValues)
  }
  const getInitialValueFromUrl = () => {
    if (!props.context.syncWithUrl) return undefined
    console.log('urlvalues')
    const formValues = RouteQueryFind(formKey)

    if (!formValues) return {}
    return getInitialValue(formValues)
  }

  const init = () => {
    return new Promise<void>((resolve) => {
      if (!findHandler) {
        if (props.context.syncWithUrl) {
          const urlFormValues = getInitialValueFromUrl()
          console.log('urlFormValues', urlFormValues)
          if (urlFormValues) formStore.formValueRef = urlFormValues
        }
        if (props.context.useReset) {
          const localStorageFormValues = getInitialValueFromLocalStorage()
          if (localStorageFormValues) formStore.formValueRef = localStorageFormValues
        }
        resolve();
        return;
      }
      const findHandlerFn =
        typeof findHandler.endpoint == "string"
          ? (apiClient![findHandler.endpoint] as FindHandlerFn<
            TFindRequestPropName,
            TFindResponsePropName,
            TApiRequest
          >)
          : findHandler.endpoint;
      const findHandlerRequest: any = {};
      const requestValue = findHandler.requestValue
        ? findHandler.requestValue
        : route.params[findHandler.routerParamName || "id"];
      findHandlerRequest[findHandler.requestPropertyName] = requestValue;
      findHandlerFn(findHandlerRequest)
        .then((resp: any) => {
          if (findHandler.responsePropertyName) {
            const propName = findHandler.responsePropertyName as string;
            if (propName in resp) {
              const formValue = resp[propName];
              if (typeof formValue == "object" && formValue) {
                formStore.formValueRef = formValue;
                resolve();
                return;
              }
            }
            formStore.formValueRef = resp;
            resolve();
            return;
          }
          resolve();
        })
        .catch((e: Error) => {
          console.error("find handler failed", e);
          resolve();
        });
    });
  };
  await init();
  const mutationFn = (req: TApiRequest) =>
    new Promise<TApiResponse>((resolve, reject) => {
      if (typeof submitHandler.endpoint == "string" && !apiClient) {
        reject("apiclient is not provided");
        return;
      }
      const endpoint =
        typeof submitHandler.endpoint == "string"
          ? (apiClient![submitHandler.endpoint] as SubmitHandlerFn<
            TApiRequest,
            TApiResponse
          >)
          : submitHandler.endpoint;
      endpoint(req)
        .then((response: TApiResponse) => {
          resolve(response);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  const submitMutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      if (submitHandler.redirectRoute) {
        push(submitHandler.redirectRoute);
      }
      if (invalidateCaches) {
        db.dropdownHelper.bulkDelete(invalidateCaches);
        queryClient.invalidateQueries({
          queryKey: props.context.invalidateCaches,
        });
      }
    },
  });
  const isAppFormSection = (
    input: any,
  ): input is AppFormSection<TFormRequest> => {
    return (
      typeof input === "object" &&
      Array.isArray(input.inputs) &&
      !Array.isArray(input)
    );
  };
  const generateFormSchema = () => {
    const schema: FormKitSchemaNode[] = [];
    const { sections } = props.context;
    for (let sectionKey in sections) {
      const currentSection = sections[sectionKey];
      let className = `form-section`;
      const isCurrentSectionArray = !isAppFormSection(currentSection);
      const sectionToBePushed: FormKitSchemaNode = {
        $el: "div",
        attrs: {
          class: isCurrentSectionArray
            ? className
            : `${className} ${currentSection.isTransparent ? " glass" : ""}`,
        },
        children: isCurrentSectionArray ? currentSection : currentSection.inputs,
      };
      schema.push(sectionToBePushed);
    }
    return schema;
  };
  const isBulkCreateRef = ref(false);
  const { push } = useRouter();

  function parseValidationError(errorMessage: string) {
    const errorObject: Record<string, string> = {};

    // Match errors in the format: "- input_name: error message"
    const regex = /-\s(\w+):\s(.+?)\s\[/g;
    let match;

    while ((match = regex.exec(errorMessage)) !== null) {
      const [, inputName, errorValue] = match;
      errorObject[inputName] = errorValue;
    }

    return errorObject;
  }
  const handleError = (node: FormKitNode, error: any) => {
    console.log("error is here from handlerRrorrr methoed", error.message);
    try {
      const errorObject: any = JSON.parse(error.rawMessage);
      node.setErrors(errorObject.globalErrors, errorObject.fieldErrors);
      console.log(errorObject);
    } catch (_err: any) {
      console.log(error, "error from catch", parseValidationError(error));
      node.setErrors([error.message]);
    }
  };

  const formSubmitHandler = (req: TFormRequest, formNode: FormKitNode) => {
    formStore.formValueRef = req
    const handler = props.context.submitHandler;
    const apiRequest: TApiRequest = handler.mapFunction
      ? handler.mapFunction(req)
      : (req as unknown as TApiRequest);
    return new Promise((resolve, reject) => {
      submitMutation
        .mutateAsync(apiRequest)
        .then((response: TApiResponse) => {
          const defaultSummary = "api_success_summary";
          const defaultContent = "api_success_detail";
          if (props.context.resetOnSuccess) formNode.reset()

          if (options) {
            if (!options.isSuccessNotificationHidden) {
              const summary = options.successMessageSummary ?? defaultSummary;
              const detail = options.successMessageDetail ?? defaultContent;
              toast.add({ severity: "success", summary, detail, life: 3000 });
            }
          }
          if (submitHandler.callback) {
            submitHandler.callback(response);
          }
          if (!isBulkCreateRef.value) {
            if (handler.redirectRoute) {
              if (typeof handler.redirectRoute == "string") {
                push({ name: handler.redirectRoute });
              }
            }
          }
          if (dialogRef) {
            dialogRef.value.close()
          }
          resolve(null);
        })
        .catch((e: Error) => {
          console.log("error from the sbmithandler", e);
          handleError(formNode, e);
          resolve(null);
        });
      return;
    });
  };
  const renderAppForm = () => {
    return h(
      formkitComp,
      {
        type: "form",
        actions: false,
        value: props.context.isLazy ? formStore.formValueRef : undefined,
        modelValue: props.context.isLazy ? undefined : formStore.formValueRef,
        "onUpdate:modelValue": props.context.isLazy ? undefined : (value: StringUnkownRecord) => {
          console.log('modechange', value)
          if (props.context.invalidateCachesOnChage) {
            useDebounceFn(() => {
              formStore.formValueRef = value;
              queryClient.invalidateQueries({ queryKey: props.context.invalidateCachesOnChage })

            }, 1000)()
          }
        }
        ,
        ref: (ref: any) => {
          formStore.formElementRef = ref
        },
        onSubmit: formSubmitHandler,
      },
      {
        default: () => [
          h(formkitSchemaComp, {

            id: props.context.formKey,
            schema: {
              $el: "div",
              attrs: {
                class: "schema-wrapper",
              },
              children: generateFormSchema(),
            },
          }),
          h('div', { class: 'custom-form-actions' }, [
            !props.context.submitHandler.hideActions ? h(AppBtn, { type: 'submit', label: 'submit', icon: 'send' }) : undefined,
            props.context.useReset ? h(AppBtn, { action: formStore.resetForm, label: 'reset' }) : undefined,
            props.context.useReset ? h(AppBtn, { action: formStore.resetForm, label: 'reset' }) : undefined,
            props.context.usePresist ? h(AppBtn, { action: formStore.presistForm, label: 'presist' }) : undefined,
          ])],

      },
    );
  };
</script>
<template>
  <component :is="renderAppForm()" />
</template>
<style>
.custom-form-actions {
  display: flex;
  gap: var(--gap);

  button:first-child {
    flex: 1
  }
}
</style>
