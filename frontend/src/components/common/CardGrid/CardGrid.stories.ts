import type { Meta, StoryObj } from "@storybook/react";
import { CardGrid } from "./CardGrid";
import { GridVariants } from "./CardGrid";

const meta = {
  title: "MainComponents/CardGrid",
  component: CardGrid,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: GridVariants }
  }
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// 카드 그리드 테스트
export const DefaultCardGrid: Story = {
  args: {
    variant: GridVariants[0]
  }
};
