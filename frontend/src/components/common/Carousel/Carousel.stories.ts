import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";

const meta = {
  title: "MainComponents/Carousel",
  component: Carousel,
  tags: ["autodocs"]
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

// 캐러셀 테스트
export const DefaultCarousel: Story = {};
