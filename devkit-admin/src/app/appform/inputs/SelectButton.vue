<script lang="ts" setup generic="
TApi extends Record<string, Function>, 
TOptionsReq extends StringUnkownRecord, 
TOptionsResp extends StringUnkownRecord = DropdownOptions">
import { StringUnkownRecord } from 'devkit-apiclient';
import InputSelectButton from './InputSelectButton.vue';
import { DropdownOptions, InputDropdownProps } from '../types';
const props = defineProps<InputDropdownProps<TApi, TOptionsReq, TOptionsResp>>()
</script>
<template>
	<Suspense>
		<InputSelectButton v-bind="props" @valueChange="props.context.node.input" />
		<!-- loading state via #fallback slot -->
		<template #fallback>
			Loading...
		</template>
	</Suspense>
</template>
