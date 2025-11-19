import Logo from "@public/logo.svg";
import { Navigation } from "../internal/Navigation/Navigation";
import { SearchBar } from "../internal/SearchBar/SearchBar";
import { HeaderIcon } from "../internal/HeaderIcon/HeaderIcon";
import { HeaderTitle } from "../internal/HeaderTitle/HeaderTitle";
import { UserStateType } from "./type";

interface HeaderProps extends HeaderContentProps {
  title?: string;
}

export const HeaderWithSearch = ({ title, userState }: HeaderProps) => {
  return (
    <div className="flex flex-col border-b border-gray-400">
      <HeaderContent storeName={title} userState={userState} />
      <SearchBar />
    </div>
  );
};

interface HeaderContentProps {
  storeName?: string;
  userState?: UserStateType;
  children?: React.ReactElement;
}

const HeaderContent = ({
  storeName = "",
  userState,
  children
}: HeaderContentProps) => {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-6 bg-white p-4">
      <HeaderIcon imageSrc={Logo} alt="logo" />
      <HeaderTitle title={storeName} />
      {children && children}
      <Navigation userState={userState} />
    </header>
  );
};
