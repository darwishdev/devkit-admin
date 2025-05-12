import Datalist from "devkit-admin/datalist"
import type { Meta, MetaStoryFn, StoryObj } from "@storybook/vue3"
import { ColumnText } from "devkit-admin/datalist"
import type {
  DatalistColumnsBase,
  DatalistProps,
} from "devkit-admin/datalist"
import type { AccountsSchemaUser, UserListRequest } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_user_pb"
import { apiClient } from "../api/apiClient"

const columns: DatalistColumnsBase<AccountsSchemaUser> = {
  userId: new ColumnText("userId", {}),
  userName: new ColumnText("userName", {}),
}

const tableProps: DatalistProps<typeof apiClient, UserListRequest, AccountsSchemaUser> = {
  context: {
    datalistKey: "storybook-user",
    title: "Users",
    rowIdentifier: "userId",
    columns,
    records: apiClient.userList,
    isExportable: true,
    displayType: "table",
    formSections: {},
    options: {
      title: "Users Table",
      description: "List of users for demonstration",
    },
  },
}

// Meta definition
const meta: Meta<typeof Datalist> = {
  title: "Components/Datalist",
  component: Datalist  as unknown as Record<string, unknown>,
  tags: ["autodocs"],
  argTypes: {
    context: {
      control: "object",
      description: "Context props for the datalist component.",
    },
  },
  args: tableProps,
} satisfies Meta<typeof Datalist>;
export default meta
type Story = StoryObj<typeof meta>;


// 🔹 Template helper
const Template: Story = {
  render: (args) => ({
    setup() {
      return { args }
    },
    template: `<Datalist :context="args.context" ></Datalist>
<h2>asdasdas</h2>`
  })
}

// 🔹 Stories
export const Default: Story = {
  ...Template
}
