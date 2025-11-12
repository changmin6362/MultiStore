import type { Meta, StoryObj } from "@storybook/react";
import { SignupForm } from "./SignupForm";

const meta = {
  title: "Forms/SignupForm",
  component: SignupForm,
  tags: ["autodocs"],
  argTypes: {
    onSignup: { action: "onSignup triggered" },
    errorMessage: { control: "text" }
  }
} satisfies Meta<typeof SignupForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultSignupForm: Story = {
  args: {
    onSignup: () => {},
    errorMessage: ""
  }
};
