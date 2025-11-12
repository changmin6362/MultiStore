import type { Meta, StoryObj } from "@storybook/react";
import { Footer, StoreDataType } from "./Footer";
const meta: Meta<typeof Footer> = {
  title: "MainComponents/Footer",
  component: Footer,
  tags: ["autodocs"],
  argTypes: {
    merchantData: { control: "object" }
  }
};

export default meta;

const mockData: StoreDataType = {
  companyName: "(주)테스트상사",
  businessNumber: "000-123-12-12345",
  sellerRegistrationNumber: "2025-서울-0000호",
  ceoName: "홍길동",
  address: "서울특별시 강서구 테스트로 123",
  phone: "1588-1234",
  email: "test@example.com",
  storeName: "테스트 스토어"
};

export const DefaultFooter: StoryObj<typeof Footer> = {
  args: {
    merchantData: mockData
  }
};

export const EmptyFooter: StoryObj<typeof Footer> = {
  args: {
    merchantData: undefined
  }
};
