import type { Preview } from "@storybook/nextjs-vite";
import { fontVariables } from "../src/app/fonts";
import "../src/app/globals.css";
import WithAppRouterContext from "./withAppRouterContext";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-sans antialiased`}>
        <Story />
      </div>
    ),
    WithAppRouterContext
  ]
};

export default preview;
