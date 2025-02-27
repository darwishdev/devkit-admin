
import { createInput, defaultConfig } from '@formkit/vue'
import { Dropdown } from 'devkit-admin'
import { rootClasses } from './formkit.theme'
import { ar, en } from '@formkit/i18n'
const formKitConfig = () => {
  const dropdownInput = createInput(Dropdown, {
    props: [
      // Keys from DropdownContext
      "options",
      "cacheKey",
      "cacheTimeout",
      "createRoute",
      "useLazy",
      "convertToFlat",
      "dependsOn",
      "requestPropertyName",
      "requestMapper",
      "bypassCache",
      "optionsMapper",
      "debounceInMilliSeconds",

      // Keys from FormKitInputContext
      "node",

      // Keys from SelectProps
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
      "editable",
      "placeholder",
      "size",
      "invalid",
      "disabled",
      "variant",
      "dataKey",
      "showClear",
      "fluid",
      "inputId",
      "inputStyle",
      "inputClass",
      "labelId",
      "labelStyle",
      "labelClass",
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
      "selectOnFocus",
      "focusOnHover",
      "highlightOnSelect",
      "checkmark",
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
      "unstyled"],
  })
  const inputs = {
    'devkitDropdown': dropdownInput,

  }
  return defaultConfig({
    inputs,
    locales: { en, ar },
    locale: 'en',
    config: {
      rootClasses,
    }
  })
}
export default formKitConfig
