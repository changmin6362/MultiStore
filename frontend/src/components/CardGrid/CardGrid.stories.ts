import type { Meta, StoryObj } from "@storybook/react";
import { CardGrid } from "./CardGrid";

const meta = {
  title: "MainComponents/CardGrid",
  component: CardGrid,
  tags: ["autodocs"]
} satisfies Meta<typeof CardGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// 카드 그리드 테스트
export const DefaultCardGrid: Story = {};
