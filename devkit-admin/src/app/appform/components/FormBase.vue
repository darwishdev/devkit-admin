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
import { h, inject, ref, resolveComponent } from 'vue';
import { type FormKitSchemaNode, type FormKitNode } from '@formkit/core'
import { useToast } from 'primevue';
import { useRoute, useRouter } from 'vue-router';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useAppFormStoreWithKey } from '../store/AppFormStore';
import { ObjectKeys, StringUnkownRecord } from 'devkit-apiclient';
import { AppFormProps } from 'dist/types/pkg/types/types';
import { AppFormSection } from '@/pkg/types/types';
const dialogRef = inject("dialogRef") as any;
const formkitSchemaComp = resolveComponent('FormKitSchema')
const queryClient = useQueryClient()
const formkitComp = resolveComponent('FormKit')
const apiClient = inject<Record<string, Function>>('apiClient')
const toast = useToast()
const props = defineProps<AppFormProps<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>>()
const formStore = useAppFormStoreWithKey<TKey, TFormRequest, TApiRequest, TApiResponse, TFindRequestPropName, TFindResponsePropName, TFindCallbakResponse, TCallbakResponse>(props.context.formKey)
const route = useRoute()
const init = () => {
  return new Promise<void>((resolve) => {
    const findHandler = props.context.findHandler
    if (!findHandler) {
      resolve()
      return
    }
    const findHandlerFn = typeof findHandler.endpoint == 'string' ? apiClient![findHandler.endpoint] as FindHandlerFn<TFindRequestPropName, TFindResponsePropName, TApiRequest> : findHandler.endpoint
    const findHandlerRequest: any = {}
    const requestValue = findHandler.requestValue ? findHandler.requestValue : route.params[findHandler.routerParamName || 'id']
    findHandlerRequest[findHandler.requestPropertyName] = requestValue
    findHandlerFn(findHandlerRequest).then((resp) => {
      if (findHandler.responsePropertyName) {
        const propName = findHandler.responsePropertyName as string
        if (propName in resp) {
          const formValue = resp[propName]
          if (typeof formValue == 'object' && formValue) {
            ObjectKeys(formValue).forEach((k) => formStore.initialFormValue[k as string] = formValue[k])
            resolve()
            return
          }
        }
        ObjectKeys(resp).forEach((k) => formStore.initialFormValue[k] = resp[k])
        resolve()
        return
      }
      resolve()
    }).catch((e) => {
      console.error("find handler failed", e)
      resolve()
    })
  })
}
await init()
const submitMutation = useMutation({
  mutationFn: (req: TApiRequest): Promise<TApiResponse> => formStore.submitMutationFunntion(props, req),
  onSuccess: () => {
    console.log("props", props.context.invalidateCaches)
    if (props.context.submitHandler.redirectRoute) {
      push(props.context.submitHandler.redirectRoute)
    }
    if (props.context.invalidateCaches) {
      queryClient.invalidateQueries({ queryKey: props.context.invalidateCaches })
    }
  },
})
const isAppFormSection = (input: any): input is AppFormSection<TFormRequest> => {
  return (
    typeof input === 'object' &&
    Array.isArray(input.inputs) && !Array.isArray(input)
  );
}
const generateFormSchema = () => {
  const schema: FormKitSchemaNode[] = []
  const { sections } = props.context
  for (let sectionKey in sections) {
    const currentSection = sections[sectionKey]
    let className = `form-section`
    const isCurrentSectionArray = !isAppFormSection(currentSection)
    const sectionToBePushed: FormKitSchemaNode = {
      $el: 'div',
      attrs: {
        class: isCurrentSectionArray ? className : `${className} ${currentSection.isTransparent ? ' glass' : ''}`
      },
      children: isCurrentSectionArray ? currentSection : currentSection.inputs
    }
    schema.push(sectionToBePushed)
  }
  return schema
}
const isBulkCreateRef = ref(false)
const { push } = useRouter()

const handleError = (node: FormKitNode, error: any) => {
  console.log("error is", error.message)
  try {
    const errorObject: any = JSON.parse(error.rawMessage)
    node.setErrors(
      errorObject.globalErrors,
      errorObject.fieldErrors
    )
    console.log(errorObject)
  } catch (_err: any) {
    node.setErrors(
      [error.message],
    )
  }
}

const formSubmitHandler = (req: TFormRequest, formNode: FormKitNode) => {
  const handler = props.context.submitHandler
  const apiRequest: TApiRequest = handler.mapFunction ? handler.mapFunction(req) : req as unknown as TApiRequest
  return new Promise((resolve) => {
    console.log("reqis ", req)

    submitMutation.mutateAsync(apiRequest).then(async (response: TApiResponse) => {
      formNode.clearErrors()
      formNode.reset()
      if (handler.callback) {
        await handler.callback(response)
      }
      const options = props.context.options
      const defaultSummary = 'api_success_summary'
      const defaultContent = 'api_success_detail'
      if (dialogRef) {
        dialogRef.value.close()
      }
      if (options) {
        if (!options.isSuccessNotificationHidden) {
          const summary = options.successMessageSummary ?? defaultSummary
          const detail = options.successMessageDetail ?? defaultContent
          toast.add({ severity: 'success', summary, detail, life: 3000 });
        }
      }
      if (!options) {
        toast.add({ severity: 'success', summary: defaultSummary, detail: defaultContent, life: 3000 });
      }
      if (!isBulkCreateRef.value) {
        if (handler.redirectRoute) {
          if (typeof handler.redirectRoute == 'string') {
            push({ name: handler.redirectRoute })
          }
        }
      }
      resolve(null)
    }).catch((e: Error) => {
      handleError(formNode, e)
      resolve(null)
    })
    return
  })
}
const renderAppForm = () => {
  return h(formkitComp, {
    type: "form",
    value: formStore.initialFormValue,
    onSubmit: formSubmitHandler
  }, {
    default: () => h(formkitSchemaComp, {
      schema: {
        $el: "div",
        attrs: {
          class: "schema-wrapper",
        },
        children: generateFormSchema()
      }
    })
  })
}
</script>
<template>
  <component :is="renderAppForm()" />
</template>
