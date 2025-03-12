<script lang="ts" setup generic="
TApi extends Record<string, Function>, 
TOptionsReq extends StringUnkownRecord, 
TOptionsResp extends StringUnkownRecord = DropdownOptions">
import { StringUnkownRecord } from 'devkit-apiclient';
import { DropdownOptions, InputMultiDropdownProps } from '../types';
import InputMultiDropdown from './InputMultiDropdown.vue';
const props = defineProps<InputMultiDropdownProps<TApi, TOptionsReq, TOptionsResp>>()
</script>
<template>
	<Suspense>
		<InputMultiDropdown v-bind="props" @valueChange="props.context.node.input" />
		<!-- loading state via #fallback slot -->
		<template #fallback>
			Loading...
		</template>
	</Suspense>
</template>
