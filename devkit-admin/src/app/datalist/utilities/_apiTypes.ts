
import type { QueryObserverResult } from '@tanstack/vue-query'

export type CreateHandler = {
  title: string
  redirectRoute: string
  routeName: string
  endpoint: string
  redirectRouteParamName?: string
}


export type UpdateHandler = {
  title: string
  redirectRoute: string
  redirectRouteParamName?: string,
  routeName: string
  endpoint: string
  findEndpoint: string
  findRequestProperty: string
  findResponseProperty: string
}

export type DeleteHandler = {
  endpoint: string
  requestProperty: string
}

export type ImportHandler = {
  endpoint: string
  importTemplateLink: string
}

export type ApiListOptions = {
  title: string
  totalCount?: number
  description: string
  createHandler?: CreateHandler
  updateHandler?: UpdateHandler
  deleteRestoreHandler?: DeleteHandler
  deleteHandler?: DeleteHandler
  importHandler?: ImportHandler
}

export type ApiResponseList<TRecord extends Record<string, unknown>> = {
  records: TRecord[]
  deletedRecords?: TRecord[]
  options?: ApiListOptions
}

export type DatalistQueryResult<TRecord extends Record<string, unknown>, TError = Error> = QueryObserverResult<ApiResponseList<TRecord>, TError>

export type DatalistFetchFunction<TReq, TRecord extends Record<string, unknown>> = (req: TReq, options?: any) => Promise<ApiResponseList<TRecord>>
