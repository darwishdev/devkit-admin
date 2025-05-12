
import Datalist from "devkit-admin/datalist"
import type { Meta, StoryFn } from "@storybook/vue3"
import { FormKit } from "@formkit/vue"

export default {
  title: "Components/Datapicker",
  component: FormKit,
} as Meta<typeof Datalist>

const Template: StoryFn<typeof FormKit> = (args) => ({
  components: { FormKit },
  setup() {
    return { args }
  },
  template: `<h2>asd</h2><Formkit v-bind="args.context" />`,
})

export const Default = Template.bind({})
Default.args = {
  type: 'devkitDatepicker',
  name: 'date',
  label: 'date'
}
