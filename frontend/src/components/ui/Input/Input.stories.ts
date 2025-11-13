import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    hasBorder: {
      control: "boolean"
    },
    type: {
      control: "select",
      options: [
        "text",
        "email",
        "password",
        "number",
        "date",
        "search",
        "tel",
        "url"
      ],
      description:
        "HTML input 요소의 type 속성을 정의합니다. (자동 완성 옵션 제공)"
    }
  }
} satisfies Meta<typeof Input>;

export default meta;

export const DefaultInput: StoryObj<typeof Input> = {
  args: {
    placeholder: "값을 입력하세요",
    hasBorder: true,
    type: "text"
  }
};
