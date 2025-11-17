import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta = {
  title: "UI/Divider",
  component: Divider,
  tags: ["autodocs"]
} satisfies Meta<typeof Divider>;

export default meta;

export const DefaultDivider: StoryObj<typeof Divider> = {};
