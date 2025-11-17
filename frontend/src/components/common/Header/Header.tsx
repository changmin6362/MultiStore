"use client";

import { HeaderPageNameAndLogin } from "./variants/HeaderPageNameAndLogin";
import { HeaderWithSearch } from "./variants/HeaderWithSearch";
import { HeaderStoreNameOnly } from "./variants/HeaderStoreNameOnly";
import { useHeaderVariantContext } from "./contexts/HeaderVariantProvider";

import { UserStateType } from "./variants/type";

export const HeaderVariants = [
  "pageNameAndLogin",
  "withSearch",
  "storeNameOnly"
] as const;

interface HeaderProps {
  title?: string;
  userState?: UserStateType;
}

export const Header = (props: HeaderProps) => {
  const variant = useHeaderVariantContext();

  switch (variant) {
    case HeaderVariants[0]: // pageNameAndLogin
      return <HeaderPageNameAndLogin {...props} />;

    case HeaderVariants[1]: // withSearch
      return <HeaderWithSearch {...props} />;

    case HeaderVariants[2]: // storeNameOnly
      return <HeaderStoreNameOnly {...props} />;

    default:
      return <HeaderStoreNameOnly {...props} />;
  }
};
