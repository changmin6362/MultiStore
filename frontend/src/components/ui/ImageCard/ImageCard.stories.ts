import type { Meta, StoryObj } from "@storybook/react";
import { ImageCard } from "./ImageCard";

const PLACEHOLDER_IMAGE_URL =
  "https://placehold.co/400x400/222222/FFFFFF/png?text=Product+Image";

const meta = {
  title: "UI/ImageCard",
  component: ImageCard,
  tags: ["autodocs"],
  argTypes: {
    imageSrc: {
      control: "text",
      description: "정적 에셋 경로 또는 외부 이미지 URL"
    },
    className: { control: "text" }
  }
} satisfies Meta<typeof ImageCard>;

export default meta;

export const DefaultImageCard: StoryObj<typeof ImageCard> = {
  args: {
    imageSrc: PLACEHOLDER_IMAGE_URL,
    className: "flex-1"
  }
};
