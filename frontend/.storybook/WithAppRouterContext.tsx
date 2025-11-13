import {
  AppRouterContext,
  type AppRouterInstance
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FC } from "react";

const WithAppRouterContext = (Story: FC) => (
  <AppRouterContext.Provider value={{} as AppRouterInstance}>
    <Story />
  </AppRouterContext.Provider>
);

export default WithAppRouterContext;
