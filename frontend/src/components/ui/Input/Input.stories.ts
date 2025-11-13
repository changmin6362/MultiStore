import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    hasBorder: { control: "boolean" }
  }
} satisfies Meta<typeof Input>;

export default meta;

export const DefaultInput: StoryObj<typeof Input> = {
  args: {
    placeholder: "값을 입력하세요",
    hasBorder: true
  }
};
