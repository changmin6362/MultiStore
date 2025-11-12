import type { Meta, StoryObj } from "@storybook/react";
import { CardGrid } from "./CardGrid";
import { GridVariants } from "./CardGrid";

const meta = {
  title: "Common/CardGrid",
  component: CardGrid,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: GridVariants }
  }
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCardGrid: Story = {
  args: {
    variant: GridVariants[0]
  }
};
