import type { Meta, StoryObj } from "@storybook/react";

import { MyButton } from "./Button";

const meta = {
  title: "MainComponents/Button",
  component: MyButton,
  tags: ["autodocs"],
  argTypes: {
    primary: { control: "boolean" },
    label: { control: "text" },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼 스토리
export const Primary: Story = {
  args: {
    primary: true,
    label: "Primary Button",
  },
};

// 보조 버튼 스토리 (다른 상태)
export const Secondary: Story = {
  args: {
    label: "Secondary Button",
  },
};
