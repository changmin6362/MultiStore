import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta = {
  title: "MainComponents/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    // Controls 패널에 드롭다운 메뉴 추가
    buttonType: {
      control: "select",
      options: ["primary", "secondary"]
    },
    state: {
      control: "select",
      options: ["cancel", "submit", "negative", "positive", "navigation"]
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 버튼 테스트
export const PrimaryBlue: Story = {
  args: {
    label: "Primary Blue Button",
    buttonType: "primary",
    state: "cancel"
  }
};
