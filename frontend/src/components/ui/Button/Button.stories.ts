import type { Meta, StoryObj } from "@storybook/react";
import { Button, Buttons, States } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
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

export const DefaultButton: Story = {
  args: {
    label: "로그인",
    buttonType: Buttons[0],
    state: States[0]
  }
};
