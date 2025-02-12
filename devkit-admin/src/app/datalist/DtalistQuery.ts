
// import { AppFormSection } from '@/pkg/types/types';
// import type { FormKitSchemaNode } from '@formkit/core'
// import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
// import { inject, ref } from 'vue';
// export const usedatalistClient = <TReq, TRecord>(datalistKey: string, fetchFunction: DatalistFetchFunction<TReq, TRecord> | string, formSchema: Record<string, (AppFormSection | FormKitSchemaNode[])>) => {
//   const queryClient = useQueryClient();
//   const apiClient = inject('apiClient') as Record<string, unknown>

//   const methods = ref({
//     list: true,
//     create: false,
//     update: false,
//     deleteRestore: false,
//     delete: false,
//   });

//   const listFn = typeof fetchFunction == 'string' ? apiClient[fetchFunction] as tableFetchFn<TReq, TRecord> : fetchFunction
//   // List Query
//   const listQuery = useQuery({
//     queryKey: [datalistKey],
//     queryFn: () => listFn({} as TReq),

//   }
//   );

//   // Mutations
//   const createMutation = useMutation(api.create, {
//     onSuccess: () => queryClient.invalidateQueries([tableName]),
//   });

//   const updateMutation = useMutation(({ id, data }) => api.update(id, data), {
//     onSuccess: () => queryClient.invalidateQueries([tableName]),
//   });

//   const deleteRestoreMutation = useMutation(({ id, restore }) =>
//     api.deleteRestore(id, restore)
//   );

//   const deleteMutation = useMutation(api.delete);

//   return {
//     listQuery,
//     methods,
//     create: createMutation,
//     update: updateMutation,
//     deleteRestore: deleteRestoreMutation,
//     delete: deleteMutation,
//   };
// };

