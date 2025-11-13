import type { Meta, StoryObj } from "@storybook/react";
import { SigninForm } from "./SigninForm";

const meta = {
  title: "Forms/SigninForm",
  component: SigninForm,
  tags: ["autodocs"],
  argTypes: {
    onSignin: { action: "onSignin triggered" },
    errorMessage: { control: "text" }
  }
} satisfies Meta<typeof SigninForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSigninForm: Story = {
  args: {
    onSignin: () => {},
    errorMessage: ""
  }
};
