
import type { FormKitSchemaNode } from '@formkit/core'
import type { RouteLocationRaw, NavigationFailure } from 'vue-router'
import type { CreateHandler, UpdateHandler } from './_apiTypes';
import type { AppFormSection } from '@/pkg/types/types';
import type { DatalistRouter } from '../types';

type _constrcutRoueParams<TRecord> = {
  record: TRecord,
  rowIdentifier: keyof TRecord,
  handler: { redirectRouteParamName?: string; routeName: string },
}
const _constrcutRoue = <TRecord>({ record, rowIdentifier, handler }: _constrcutRoueParams<TRecord>) => {
  const id = record[rowIdentifier] as string
  const routeParams: Record<string, string> = {}
  const routeParamName = handler.redirectRouteParamName || 'id'
  routeParams[routeParamName] = id
  return { name: handler.routeName, params: routeParams }
}
export type _updateRecordParams<TRecord> = {
  record: TRecord,
  rowIdentifier: keyof TRecord,
  updateHandler: UpdateHandler,
  formSchema?: Record<string, AppFormSection<any> | FormKitSchemaNode[]>,
  push: (to: RouteLocationRaw) => Promise<NavigationFailure | void | undefined>
}

export const _updateRecord = <TRecord>({ record, rowIdentifier, updateHandler, push, formSchema }: _updateRecordParams<TRecord>) => {
  if (formSchema) {
    console.log("show the form dialog thing")
    return
  }
  const routerObject = _constrcutRoue({ record, rowIdentifier, handler: updateHandler })
  push(routerObject)
}

export type _createRecordParams = {
  createHandler: CreateHandler,
  formSchema?: Record<string, AppFormSection<any> | FormKitSchemaNode[]>,
  push: (to: RouteLocationRaw) => Promise<NavigationFailure | void | undefined>
}

export const _createRecord = ({ createHandler, push, formSchema }: _createRecordParams) => {
  if (formSchema) {
    console.log("show the form dialog thing")
    return
  }
  push({ name: createHandler.routeName })
}

export type _viewRecordParams<TRecord extends Record<string, unknown>> = {
  record: TRecord,
  viewRouter: DatalistRouter<TRecord>
  push: (to: RouteLocationRaw) => Promise<NavigationFailure | void | undefined>
}

export const _viewRecord = <TRecord extends Record<string, unknown>>({ record, push, viewRouter }: _viewRecordParams<TRecord>) => {
  const params: Record<string, string> = {}
  params[viewRouter.paramName] = record[viewRouter.paramColumnName] as string
  push({ name: viewRouter.name, params: params })
}


