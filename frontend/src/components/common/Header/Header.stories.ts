import type { Meta, StoryObj } from "@storybook/react";
import { Header, HeaderVariants } from "./Header";

import { UserStates } from "./variants/type";

const meta = {
  title: "Common/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: HeaderVariants },
    title: {
      control: "text"
    },
    userState: {
      control: "select",
      options: UserStates
    }
  }
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {
  args: {
    variant: HeaderVariants[0],
    title: "",
    userState: UserStates[0]
  }
};
