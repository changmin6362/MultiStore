import type { Meta, StoryObj } from "@storybook/react";
import { Button, Buttons, States } from "./Button";

const meta = {
  title: "MainComponents/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    // Controls 패널에 드롭다운 메뉴 추가
    buttonType: {
      control: "select",
      options: Buttons
    },
    state: {
      control: "select",
      options: States
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 버튼 테스트
export const PrimaryBlue: Story = {
  args: {
    label: "로그인",
    buttonType: Buttons[0],
    state: States[0]
  }
};
