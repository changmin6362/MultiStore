import type { Meta, StoryObj } from "@storybook/react";
import { Header, HeaderVariants } from "./Header";
import { HeaderPageNameAndLogin } from "./variants/HeaderPageNameAndLogin";
import { HeaderWithSearch } from "./variants/HeaderWithSearch";
import { HeaderStoreNameOnly } from "./variants/HeaderStoreNameOnly";

import { UserStates } from "./variants/type";

const VariantComponents = {
  [HeaderVariants[0]]: HeaderPageNameAndLogin,
  [HeaderVariants[1]]: HeaderWithSearch,
  [HeaderVariants[2]]: HeaderStoreNameOnly
};

const meta = {
  title: "Common/Header",
  component: Header,
  tags: ["autodocs"],
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Story: any, { args }: any) => {
      const variant = args.variant || HeaderVariants[2];

      const VariantComponent =
        VariantComponents[variant as keyof typeof VariantComponents];
      return <VariantComponent title={args.title} userState={args.userState} />;
    }
  ],
  argTypes: {
    variant: {
      control: "select",
      options: HeaderVariants
    },
    title: {
      control: "text"
    },
    userState: {
      control: "select",
      options: UserStates
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {
  args: {
    variant: HeaderVariants[0],
    title: "",
    userState: UserStates[0]
  } as unknown as Parameters<typeof Header>[0]
};
