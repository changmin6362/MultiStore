import type { Meta, StoryObj } from "@storybook/react";
import { Header, HeaderVariants } from "./Header";

import { Breakpoints, UserStates } from "./variants/type";

const meta = {
  title: "MainComponents/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {
    breakpoint: { control: "select", options: Breakpoints },
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

// 헤더 테스트
export const DefaultHeader: Story = {
  args: {
    breakpoint: Breakpoints[0],
    variant: HeaderVariants[0],
    title: "",
    userState: UserStates[0]
  }
};
