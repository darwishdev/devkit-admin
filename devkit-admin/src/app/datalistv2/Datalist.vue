<script lang="ts" setup generic="
		TApi extends Record<string, Function>,
		TReq extends Record<string, unknown>,
		TRecord extends Record<string, unknown>,
		TFiltersReq extends Record<string, unknown> | undefined = undefined,
		TApiResponse extends Record<string, unknown> | undefined = undefined,
		TFormSectionsRequest extends Record<string, unknown> | undefined = undefined">
		import DatalistBase from './components/DatalistBase.vue';
		import { useDatalistStoreWithKey } from './store/DatalistStore';
		import { DatalistProps } from './types';
		const props = defineProps<DatalistProps<TApi, TReq, TRecord, TFiltersReq, TApiResponse, TFormSectionsRequest>>();
		const datalistStore = useDatalistStoreWithKey(props)
		console.log("data", datalistStore)
</script>
<template>
	<Suspense>
		<template #default>
			<DatalistBase v-bind="props" />
		</template>
		<template #fallback>
			<div>Loading from datalist...</div>
		</template>
	</Suspense>
</template>
