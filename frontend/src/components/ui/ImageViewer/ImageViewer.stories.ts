import type { Meta, StoryObj } from "@storybook/react";
import { ImageViewer, ObjectClasses } from "./ImageViewer";

const PLACEHOLDER_IMAGE_URL =
  "https://placehold.co/400x400/222222/FFFFFF/png?text=Product+Image";

const meta = {
  title: "UI/ImageViewer",
  component: ImageViewer,
  tags: ["autodocs"],
  argTypes: {
    imageSrc: {
      control: "text",
      description: "정적 에셋 경로 또는 외부 이미지 URL"
    },
    alt: { control: "text" },
    url: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    objectFit: { control: "text", options: ObjectClasses }
  }
} satisfies Meta<typeof ImageViewer>;

export default meta;

export const DefaultImageViewer: StoryObj<typeof ImageViewer> = {
  args: {
    imageSrc: PLACEHOLDER_IMAGE_URL,
    alt: "alt",
    url: "www.naver.com",
    width: 24,
    height: 24,
    objectFit: ObjectClasses[0]
  }
};
