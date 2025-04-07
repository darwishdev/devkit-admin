
import { createInput, defaultConfig } from '@formkit/vue'
import { Dropdown, SelectButton, MultiDropdown, Datepicker } from 'devkit-admin/form'
import InputImage from './components/InputImage.vue'

import { rootClasses } from './formkit.theme'
import { ar, en } from '@formkit/i18n'

import type { FormKitPlugin } from '@formkit/core';
const isCheckboxAndRadioMultiple: FormKitPlugin = (node: any) => (node.props.type === 'checkbox' || node.props.type === 'radio') && node.props.options
const addAsteriskPlugin = (node: any) => {
  node.on('created', () => {
    const isRequired = node.props.parsedRules.some((rule: any) => rule.name === 'required');
    if (!isRequired) return

    const isMultiOption = isCheckboxAndRadioMultiple(node)
    node.props.definition.schemaMemoKey = `required_${isMultiOption ? 'multi_' : ""}${node.props.definition.schemaMemoKey}`
    const schemaFn = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema: any = {}) => {
      if (isRequired) {
        if (isMultiOption) {
          sectionsSchema.legend = {
            children: ['$label', '*']
          }
        } else {
          sectionsSchema.label = {
            children: ['$label', '*']
          }
        }
      }
      return schemaFn(sectionsSchema);
    }
  })
}
const formKitConfig = () => {
  const plugins: FormKitPlugin[] = [
    addAsteriskPlugin,
  ]
  const commonDropdownProps = [
    "options",
    "cacheKey",
    "cacheTimeout",
    "createRoute",
    "useLazy",
    "convertToFlat",
    "dependsOn",
    "requestPropertyName",
    'responseOptionsKey',
    "requestMapper",
    "bypassCache",
    "optionsMapper",
    "debounceInMilliSeconds",

    // Keys from FormKitInputContext
    "node",

    // Common props shared between single and multi select
    "modelValue",
    "defaultValue",
    "name",
    "options",
    "optionLabel",
    "optionValue",
    "optionDisabled",
    "optionGroupLabel",
    "optionGroupChildren",
    "scrollHeight",
    "filter",
    "filterPlaceholder",
    "filterLocale",
    "filterMatchMode",
    "filterFields",
    "placeholder",
    "size",
    "invalid",
    "disabled",
    "variant",
    "dataKey",
    "showClear",
    "fluid",
    "inputId",
    "panelStyle",
    "panelClass",
    "overlayStyle",
    "overlayClass",
    "appendTo",
    "loading",
    "clearIcon",
    "dropdownIcon",
    "filterIcon",
    "loadingIcon",
    "resetFilterOnHide",
    "resetFilterOnClear",
    "virtualScrollerOptions",
    "autoOptionFocus",
    "autoFilterFocus",
    "focusOnHover",
    "highlightOnSelect",
    "filterMessage",
    "selectionMessage",
    "emptySelectionMessage",
    "emptyFilterMessage",
    "emptyMessage",
    "tabindex",
    "ariaLabel",
    "ariaLabelledby",
    "formControl",
    "dt",
    "pt",
    "ptOptions",
    "unstyled"
  ]
  const singleDropdownProps = [
    ...commonDropdownProps,
    "editable",
    "inputStyle",
    "inputClass",
    "labelId",
    "labelStyle",
    "labelClass",
    "selectOnFocus",
    "checkmark",
  ]
  const multiDropdownProps = [
    ...commonDropdownProps,
    "display",
    "selectedItemsLabel",
    "maxSelectedLabels",
    "selectionLimit",
    "showToggleAll",
    "checkboxIcon",
    "removeTokenIcon",
    "chipIcon",
    "selectAll",
  ]
  const datepickerContextKeys = [
    "disabledDates", // from DatepickerContext
    "disabledDatesRequestPropertyName", // from DatepickerContext
    "disabledDatesResponsePropertyName", // from DatepickerContext
    "dsiabledDatesRequestMapper", // from DatepickerContext
    "dsiabledDatesResponseMapper", // from DatepickerContext
    "convertToNumber", // from DatepickerContext

    "defaultValue",
    "name",
    "selectionMode",
    "dateFormat",
    "inline",
    "showOtherMonths",
    "selectOtherMonths",
    "showIcon",
    "iconDisplay",
    "icon",
    "prevIcon",
    "nextIcon",
    "incrementIcon",
    "decrementIcon",
    "numberOfMonths",
    "responsiveOptions",
    "breakpoint",
    "view",
    "minDate",
    "maxDate",
    "disabledDates",
    "disabledDays",
    "maxDateCount",
    "showOnFocus",
    "autoZIndex",
    "baseZIndex",
    "showButtonBar",
    "shortYearCutoff",
    "showTime",
    "timeOnly",
    "hourFormat",
    "stepHour",
    "stepMinute",
    "stepSecond",
    "showSeconds",
    "hideOnDateTimeSelect",
    "hideOnRangeSelection",
    "timeSeparator",
    "showWeek",
    "manualInput",
    "size",
    "invalid",
    "disabled",
    "variant",
    "readonly",
    "placeholder",

    "appendTo",
    "id",
    "inputId",
    "inputStyle",
    "inputClass",
    "panelStyle",
    "panelClass",
    "todayButtonProps",
    "clearButtonProps",
    "navigatorButtonProps",
    "timepickerButtonProps",
    "fluid",
    "ariaLabelledby",
    "ariaLabel",
    "formControl",
    "dt",
    "pt",
    "ptOptions",
    "unstyled",
  ];
  const dropdownInput = createInput(Dropdown, {
    props: singleDropdownProps,
  })

  const multDropdownInput = createInput(MultiDropdown, {
    props: multiDropdownProps,
  })

  const selectButtonInput = createInput(SelectButton, {
    props: singleDropdownProps,
  })

  const datePickerInput = createInput(Datepicker, {
    props: datepickerContextKeys,
  })

  const imageInput = createInput(InputImage, {
    props: [''],
  })

  const inputs = {
    'devkitDropdown': dropdownInput,
    'devkitSelectButton': selectButtonInput,
    'devkitMultiDropdown': multDropdownInput,
    'devkitDatepicker': datePickerInput,
    'devkitImage': imageInput,

  }
  return defaultConfig({
    inputs,
    locales: { en, ar },
    plugins,
    locale: 'en',
    config: {
      rootClasses,
    }
  })
}
export default formKitConfig
