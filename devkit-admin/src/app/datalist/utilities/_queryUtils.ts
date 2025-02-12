
import type { ApiListOptions, CreateHandler, DatalisQueryReturnType, DatalistFetchFunction, DatalistQueryResult, DeleteHandler } from './_apiTypes'
// export type TanstackParams<TReq, TRecord extends Record<string, unknown>> = {
//   records: DatalistRecords<TReq, TRecord>,
//   paginationParams: PaginationParams,
//   apiClient: Record<string, Function>,
//   filtersFormValue: Record<string, unknown>
//   callBack: (response: DatalisQueryReturnType<TRecord>) => void,
//   deletedRecords?: TRecord[],
//   options?: ApiListOptions
// }
export type DatalistFetchWithArrayParams<TRecord extends Record<string, unknown>> = {
  records: TRecord[],
  deletedRecords: TRecord[],
  options?: ApiListOptions,
  callBack?: (response: DatalisQueryReturnType<TRecord>) => void
}

export type DatalistFetchWithStringParams<TReq, TRecord extends Record<string, unknown>> = {
  callBack?: (response: DatalisQueryReturnType<TRecord>) => void
  records: string,
  requestPayload: TReq
  apiClient: Record<string, Function>,
}

export type DatalistFetchWithFunctionParams<TReq, TRecord extends Record<string, unknown>> = {
  callBack?: (response: DatalisQueryReturnType<TRecord>) => void
  requestPayload: TReq
  records: DatalistFetchFunction<TReq, TRecord>,
}
export type DatalistFetchFunctionParams<TReq, TRecord extends Record<string, unknown>> = DatalistFetchWithArrayParams<TRecord> | DatalistFetchWithStringParams<TReq, TRecord> | DatalistFetchWithFunctionParams<TReq, TRecord>

export const _datalistFetchWithArray = <TRecord extends Record<string, unknown>>({ records, deletedRecords, options, callBack }: DatalistFetchWithArrayParams<TRecord>) => {
  return new Promise<DatalisQueryReturnType<TRecord>>((resolve) => {
    const response = { records, deletedRecords, options }
    if (callBack) callBack(response)
    resolve(response)
    return
  })
}

export const _datalistFetchWithString = <TReq, TRecord extends Record<string, unknown>>({ records, callBack, apiClient }: DatalistFetchWithStringParams<TReq, TRecord>) => {
  return new Promise<DatalisQueryReturnType<TRecord>>((resolve, reject) => {
    const apiListFunction = apiClient[records] as DatalistFetchFunction<{}, TRecord>
    apiListFunction({}).then((response: DatalisQueryReturnType<TRecord>) => {
      if (callBack) callBack(response)
      setTimeout(() => resolve(response), 1)
    }
    ).catch((e: Error) => reject(e))
  })
}

export const _datalistFetchWithFunction = <TReq, TRecord extends Record<string, unknown>>({ records, callBack, requestPayload }: DatalistFetchWithFunctionParams<TReq, TRecord>) => {
  return new Promise<DatalisQueryReturnType<TRecord>>((resolve, reject) => {
    records(requestPayload).then((response: DatalisQueryReturnType<TRecord>) => {
      if (callBack) callBack(response)
      setTimeout(() => resolve(response), 1)
    }
    ).catch((e: Error) => reject(e))
  })
}


export const isDatalistFetchWithArrayParams = <TReq, TRecord extends Record<string, unknown>>(param: DatalistFetchFunctionParams<TReq, TRecord>): param is DatalistFetchWithArrayParams<TRecord> => Array.isArray(param.records);

export const isDatalistFetchWithStringParams = <TReq, TRecord extends Record<string, unknown>>(param: DatalistFetchFunctionParams<TReq, TRecord>): param is DatalistFetchWithStringParams<TReq, TRecord> => typeof param.records == 'string';

export const datalistFetchFunction = <TReq, TRecord extends Record<string, unknown>>(params: DatalistFetchFunctionParams<TReq, TRecord>) => {
  if (isDatalistFetchWithArrayParams(params)) {
    return _datalistFetchWithArray(params)
  }
  if (isDatalistFetchWithStringParams(params)) {
    return _datalistFetchWithString(params)
  }
  return _datalistFetchWithFunction(params)
}

export const _refetch = <TRecord extends Record<string, unknown>>(tanstackQuery?: DatalistQueryResult<TRecord, Error>, callback?: (res: DatalistQueryResult<TRecord, Error>) => void) => {
  if (!tanstackQuery) return
  tanstackQuery.refetch().then((res: DatalistQueryResult<TRecord, Error>) => {
    if (callback) callback(res)
  })
}

export type DeleteConfirmedParams<TRecord extends Record<string, unknown>> = {
  dialogRef: { close: Function },
  handler: DeleteHandler
  rowIdentifier: keyof TRecord
  callback: () => void
  errorCallback: (error: unknown) => void
  selectedRecords: TRecord[],
  apiClient: Record<string, Function>,
}
export const _deleteRecordsConfirmed = <TRecord extends Record<string, unknown>>({ errorCallback, dialogRef, callback, handler, selectedRecords, apiClient, rowIdentifier }: DeleteConfirmedParams<TRecord>) => {
  return new Promise((resolve, reject) => {
    const deleteRequest: Record<string, unknown> = {}
    const requestProperty = handler.requestProperty || "records"
    deleteRequest[requestProperty] = selectedRecords.map((row) => {
      return row[rowIdentifier]
    })
    const deleteEndpointFn = apiClient[handler.endpoint]
    deleteEndpointFn(deleteRequest).then(() => {
      callback()
      dialogRef.close()
      resolve(null)
    }).catch((err: unknown) => {
      errorCallback(err)
      reject(err)
    })

  })
}

export type CreateConfirmedParams = {
  dialogRef: { close: Function },
  handler: CreateHandler
  formValue: Record<string, unknown>
  callback: () => void
  errorCallback: (error: unknown) => void
  apiClient: Record<string, Function>,
}
export const _createConfirmed = ({ formValue, errorCallback, dialogRef, callback, handler, apiClient }: CreateConfirmedParams) => {
  return new Promise((resolve, reject) => {
    const createEndpointFn = apiClient[handler.endpoint]
    createEndpointFn(formValue).then(() => {
      callback()
      dialogRef.close()
      resolve(null)
    }).catch((err: unknown) => {
      errorCallback(err)
      reject(err)
    })

  })
}
