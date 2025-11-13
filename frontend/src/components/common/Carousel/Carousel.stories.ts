import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";

const meta = {
  title: "Common/Carousel",
  component: Carousel,
  tags: ["autodocs"]
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCarousel: Story = {};
