
import { DropdownContext, InputDropdownProps, InputMultiDropdownProps, DropdownOption, DropdownOptions, DependantDropdown } from "./inputs/DropdownTypes";

import { DatepickerContext, InputDatepickerProps, } from "./inputs/DatepickerTypes";

import { FormKitNode } from '@formkit/core';

export type FormKitInputContext<V = unknown> = {
	node: FormKitNode<V>
}
export type InputEmits = {
	(e: 'valueChange', value: any): void
}

export { InputMultiDropdownProps, InputDropdownProps, DependantDropdown, DropdownOption, DropdownOptions, DropdownContext, DatepickerContext, InputDatepickerProps, }
