<script lang="ts" setup generic="
TApi extends Record<string, Function>, 
TOptionsReq extends StringUnkownRecord, 
TOptionsResp extends StringUnkownRecord = DropdownOptions">
import { ApiEndpoint, ObjectKeys, StringUnkownRecord } from 'devkit-apiclient';
import Select from 'primevue/select';
import { DropdownOptions, InputDropdownProps } from '../types';
import { SelectProps } from 'primevue';
import { inject, ref, computed } from 'vue';
import { AppBtn, AppIcon } from 'devkit-base-components';
import { DBDropdownOptions } from '@/pkg/database/DbTypes';
import { optionsCacheDelete, useDebouncedFetchOptionsFromApi, useMemoizedDropdownOptions } from './OptionsGetter';
import { db } from '@/devkit_admin';
import { useFormKitContext } from '@formkit/vue';
const apiClient = inject<TApi>('apiClient')
const { context } = defineProps<InputDropdownProps<TApi, TOptionsReq, TOptionsResp>>()
const { options, cacheKey, dependsOn, bypassCache, node, requestPropertyName = 'recordId', requestMapper, cacheTimeout = 10000, useLazy, responseOptionsKey, optionsMapper, hideReload } = context
const dependsOnFormValue = dependsOn ? useFormKitContext(dependsOn) : undefined
const apiFetcher = useDebouncedFetchOptionsFromApi<TApi, TOptionsReq, TOptionsResp>()
const fetchOptions = useMemoizedDropdownOptions<TApi, TOptionsReq, TOptionsResp>()
const optionsRef = ref<DBDropdownOptions>([])
const isLoadingRef = ref<boolean>(false)
const dependencyManager = computed<{ cacheKeyValue: string, requestValue: TOptionsReq }>(() => {
	const requestValue: StringUnkownRecord = {}
	const cacheKeyValue = cacheKey || node.name
	if (!dependsOn || !dependsOnFormValue || !dependsOnFormValue.value || !('value' in dependsOnFormValue.value)) {
		return { cacheKeyValue, requestValue: requestValue as TOptionsReq }
	}
	emit("valueChange", undefined)
	const requestValueString = `${cacheKey}-${requestPropertyName as string}=${dependsOnFormValue.value.value}`
	requestValue[requestPropertyName as string] = dependsOnFormValue.value.value
	return { cacheKeyValue: requestValueString, requestValue: requestValue as TOptionsReq }
})
const overRidePrimeProps = (primevuePops: SelectProps) => {
	primevuePops.optionLabel = primevuePops.optionLabel || 'label'
	primevuePops.optionValue = primevuePops.optionValue ? primevuePops.optionValue : context.convertToFlat ? primevuePops.optionLabel : 'value'
	primevuePops.placeholder = context.node.props.placeholder
}
const fetchFromApi = () => {
	isLoadingRef.value = true
	if (Array.isArray(options)) {
		optionsRef.value = options
		isLoadingRef.value = false
		return
	}
	apiFetcher({
		options,
		request: dependencyManager.value.requestValue,
		apiClient,
		responseOptionsKey,
		optionsMapper
	})
		.then(options => {
			if (cacheKey) {
				db.dropdownHelper.create(dependencyManager.value.cacheKeyValue, optionsRef.value, cacheTimeout)
			}
			optionsRef.value = options
		})
		.catch((err) => {
			console.log("db err", err)
		}).finally(() => {
			isLoadingRef.value = false
		})

}
const generatePrimevueProps = () => new Promise<SelectProps>((resolve) => {
	const primevuePops: SelectProps = { ...context }
	if (Array.isArray(options)) {
		optionsRef.value = options
		resolve(primevuePops)
		return
	}
	overRidePrimeProps(primevuePops)
	if (useLazy) {
		resolve(primevuePops)
		return
	}
	if (cacheKey) {
		fetchOptions(dependencyManager.value.cacheKeyValue, cacheTimeout, {
			options,
			apiClient,
			request: dependencyManager.value.requestValue,
			responseOptionsKey,
			optionsMapper
		})
	}
})
const selectProps = await generatePrimevueProps()
const emit = defineEmits<{
	(e: 'valueChange', value: any): void
}>();
const onValueChange = (value: any) => {
	const { optionValue = 'value' } = context
	if (typeof value == 'object') {
		if (typeof optionValue == 'string' && optionValue in value) {
			emit('valueChange', value[optionValue])
			return
		}
	}
	emit('valueChange', value)
	return
}
const onBeforeShow = () => {
	if (!useLazy || !options || (optionsRef.value.length && !dependsOn)) return
	if (Array.isArray(options) && !dependsOn) {
		optionsRef.value = options
		return
	}
	fetchOptions(dependencyManager.value.cacheKeyValue, cacheTimeout, {
		options: options as ApiEndpoint<TApi, TOptionsReq, TOptionsResp>,
		apiClient,
		request: dependencyManager.value.requestValue,
		responseOptionsKey,
		optionsMapper
	}).then((response) => {
		optionsRef.value = response
		console.log("response", response)
	})
}
const onReload = () => {
	if (cacheKey) {
		optionsCacheDelete(dependencyManager.value.cacheKeyValue)
	}
	fetchFromApi()
}
</script>
<template>
	<h2>req is :{{ JSON.stringify(dependencyManager.requestValue) }} : reqstring :
		{{ dependencyManager.cacheKeyValue }}
	</h2>
	<Select v-bind="selectProps" :options="optionsRef" :loading="isLoadingRef" :defaultValue="context.node.value"
		@value-change="onValueChange" @before-show="onBeforeShow">
		<template #option="{ option }">
			<div class="flex items-center" v-if="typeof option == 'object'">
				<AppIcon v-if="option.icon" :icon="option.icon" />
				<h1
					v-if="typeof selectProps.optionLabel == 'string' && selectProps.optionLabel in option">
					{{
						option[selectProps.optionLabel] }}</h1>
			</div>
		</template>
		<template #footer>
			<AppBtn :action="onReload" v-if="!hideReload" icon="reload" label="reload" />
			<AppBtn label="Add New" v-if="context.createRoute" fluid severity="secondary" text size="small"
				icon="plus" :action="context.createRoute" />
		</template>
	</Select>
</template>
