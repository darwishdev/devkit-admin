<script lang="ts" setup generic="
		TApi extends Record<string, Function>,
		TReq extends Record<string, unknown>,
		TRecord extends Record<string, unknown>,
		TFiltersReq extends Record<string, unknown> | undefined = undefined,
		TApiResponse extends Record<string, unknown> | undefined = undefined,
		TFormSectionsRequest extends Record<string, unknown> | undefined = undefined">
		import { useDatalistStoreWithKey } from '../store/DatalistStore';
		import { DatalistProps } from '../types';
		const props = defineProps<DatalistProps<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>>();
		const datalistStore = useDatalistStoreWithKey(props)
		await datalistStore.init()
		console.log("propsis", props)
</script>
<template>
	<h2>
		datalist base , {{datalistStore.filtersFormSchema}}
	</h2>
</template>
