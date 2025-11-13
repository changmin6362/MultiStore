import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta = {
  title: "UI/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: "number" },
    hasBorder: { control: "boolean" }
  }
} satisfies Meta<typeof TextArea>;

export default meta;

export const DefaultTextArea: StoryObj<typeof TextArea> = {
  args: {
    placeholder: "설명을 작성해주세요",
    rows: 4,
    hasBorder: true
  }
};
