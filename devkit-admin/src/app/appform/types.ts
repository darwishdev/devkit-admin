import type { DropdownContext, InputDropdownProps, InputMultiDropdownProps, DropdownOption, DropdownOptions, DependantDropdown } from "./inputs/DropdownTypes";
import type { DatepickerContext, InputDatepickerProps, } from "./inputs/DatepickerTypes";
import type { FormKitNode } from '@formkit/core';
export type FormKitInputContext<V = unknown> = {
	node: FormKitNode<V>
}
export type InputEmits = {
	(e: 'valueChange', value: unknown): void
}

export { InputMultiDropdownProps, InputDropdownProps, DependantDropdown, DropdownOption, DropdownOptions, DropdownContext, DatepickerContext, InputDatepickerProps, }
