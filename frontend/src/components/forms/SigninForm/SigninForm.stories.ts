import type { Meta, StoryObj } from "@storybook/react";
import { SigninForm } from "./SigninForm";

const meta: Meta<typeof SigninForm> = {
  title: "Forms/SigninForm",
  component: SigninForm,
  tags: ["autodocs"],
  argTypes: {
    onSignin: { action: "onSignin triggered" },
    errorMessage: { control: "text" }
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSigninForm: Story = {
  args: {
    errorMessage: ""
  }
};
