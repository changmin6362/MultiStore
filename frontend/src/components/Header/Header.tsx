import { HeaderPageNameAndLogin } from "./variants/HeaderPageNameAndLogin";
import { HeaderWithSearch } from "./variants/HeaderWithSearch";
import { HeaderStoreNameOnly } from "./variants/HeaderStoreNameOnly";

import { UserStateType } from "./variants/type";

export const HeaderVariants = [
  "pageNameAndLogin",
  "withSearch",
  "storeNameOnly"
];

type HeaderVariantType = (typeof HeaderVariants)[number];

interface HeaderProps {
  variant: HeaderVariantType;
  title?: string;
  userState?: UserStateType;
}

export const Header = (props: HeaderProps) => {
  switch (props.variant) {
    case "pageNameAndLogin":
      return <HeaderPageNameAndLogin {...props} />;

    case "withSearch":
      return <HeaderWithSearch {...props} />;

    case "storeNameOnly":
      return <HeaderStoreNameOnly {...props} />;

    default:
      return <HeaderStoreNameOnly {...props} />;
  }
};
