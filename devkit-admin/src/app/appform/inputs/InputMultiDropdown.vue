<script lang="ts" setup generic="
TApi extends Record<string, Function>, 
TOptionsReq extends StringUnkownRecord, 
TOptionsResp extends StringUnkownRecord = DropdownOptions">
import { StringUnkownRecord } from 'devkit-apiclient';
import MultiSelect from 'primevue/multiselect';
import { DropdownOptions, InputMultiDropdownProps } from '../types';
import { watch, h, inject, ref, computed, } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { clearOptionsCache, useMemoizedDropdownOptions, optionsErrorMessages } from './OptionsGetter';
import { useFormKitContext } from '@formkit/vue';
import { MultiSelectProps, SelectProps } from 'primevue';
import { AppBtn, AppIcon } from 'devkit-base-components';
const apiClient = inject<TApi>('apiClient')
const { context } = defineProps<InputMultiDropdownProps<TApi, TOptionsReq, TOptionsResp>>()
const emit = defineEmits<{
	(e: 'valueChange', value: any): void
}>();
const { options, cacheKey, dependsOn, bypassCache, createRoute, node, requestPropertyName = 'recordId', requestMapper, cacheTimeout = 60 * 60 * 1000 * 200, useLazy, responseOptionsKey = 'options', optionsMapper, hideReload } = context

const cacheKeyValue = cacheKey || node.name
const dependsOnFormValue = dependsOn ? useFormKitContext(dependsOn) : ref({ value: null })

const parentValue = computed(() => dependsOnFormValue.value?.value ?? 'default')
watch(parentValue, (newValue) => {
	console.log("parent value changed", newValue)
	onValueChange(undefined)
	if (!useLazy) {
		queryResult.refetch()
	}
})
const getCacheName = () => {
	let cacheName = cacheKeyValue
	if (dependsOn && dependsOnFormValue.value?.value) {
		cacheName += `-${dependsOnFormValue.value.value}`
	}
	return cacheName
}
const queryFn = () => {
	let request: StringUnkownRecord = {}
	const cacheName = getCacheName()
	if (dependsOn && dependsOnFormValue.value?.value) {
		request[requestPropertyName as string] = dependsOnFormValue.value.value
	}
	if (requestMapper) {
		request = requestMapper(request)
	}
	return useMemoizedDropdownOptions<TApi, TOptionsReq, TOptionsResp>()(cacheName, cacheTimeout, { options, request: request as TOptionsReq, bypassCache, apiClient, optionsMapper, responseOptionsKey })
}
const queryResult = useQuery({
	queryKey: [cacheKeyValue, parentValue.value],
	queryFn,
	retry: (failureCount, error) => {
		const skiptRetryErrors = optionsErrorMessages(responseOptionsKey as string)
		if (error.message == skiptRetryErrors.not_defined.message || error.message == skiptRetryErrors.not_array.message) {
			return false // Stop retrying if the error contains responseOptionsKey
		}
		return failureCount < 3 // Retry up to 3 times for other errors
	},
	enabled: !useLazy && options !== undefined,
	refetchOnWindowFocus: false,
	staleTime: cacheTimeout
})
const init = () => new Promise<MultiSelectProps>((resolve) => {
	const primevuePops: SelectProps = { ...context }
	if (!Array.isArray(options)) {
		primevuePops.optionLabel = primevuePops.optionLabel || 'label'
		primevuePops.optionValue = primevuePops.optionValue ? primevuePops.optionValue : context.convertToFlat ? primevuePops.optionLabel : 'value'
		primevuePops.placeholder = context.node.props.placeholder
	}
	if (!useLazy || typeof node.value != 'undefined') {
		queryResult.refetch()
		return resolve(primevuePops)
	}
	return resolve(primevuePops)
})
const onBeforeShow = () => {
	if (!useLazy || !options || (queryResult.data.value?.length && !dependsOn)) return
	queryResult.refetch()
}
const onValueChange = (value: any) => {
	if (formValue.value !== value) {
		formValue.value = value;
		emit('valueChange', value);
	}
}
const formValue = ref(node.value)
const forceReload = () => {
	clearOptionsCache(getCacheName())
	queryResult.refetch()
}
const selectProps = await init()
const renderInputDropdown = () => {
	return h(MultiSelect, {
		pt: { overlay: 'z-2000' },
		...selectProps,
		modelValue: formValue.value,
		"onUpdate:modelValue": onValueChange,
		loading: queryResult.isLoading.value || queryResult.isFetching.value,
		options: queryResult.data.value,
		onBeforeShow
	}, {
		header: (_: any) => h('div', { class: 'select-header' }, [
			!hideReload ? h(AppBtn, { action: forceReload, label: 'reload', icon: 'reload' }) : undefined,
			createRoute ? h(AppBtn, { action: createRoute, label: 'create', icon: 'plus' }) : undefined,
		]),
		option: ({ option, selected }: { option: any, selected: boolean }) => {
			if (queryResult.isLoading.value || queryResult.isFetching.value) {
				return h('h2', 'Loading...');
			}
			if (queryResult.error.value) {
				return h('h2', { class: 'text-red-500' }, `Error: ${queryResult.error.value.message}`);
			}
			return h('div', {
				class: `flex items-center ${selected ? 'selected' : ''}`
			}, [
				option.icon ? h(AppIcon, { icon: option.icon }) : undefined,
				typeof selectProps.optionLabel === 'string' && option[selectProps.optionLabel]
					? h('span', option[selectProps.optionLabel])
					: undefined,
				'note' in option ? h('span', option['note']) : undefined
			]);
		},
		empty: () => {
			if (queryResult.isLoading.value || queryResult.isFetching.value) {
				return h('h2', 'Loading...');
			}
			if (queryResult.error.value) {
				return h('h2', { class: 'text-red-500' }, `Error: ${queryResult.error.value.message}`);
			}
			return h('h2', 'No options available');
		}

	})
}
</script>
<template>
	<component :is="renderInputDropdown" />
</template>
