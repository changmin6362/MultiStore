import Logo from "@public/logo.svg";
import { HeaderIcon } from "../internal/HeaderIcon/HeaderIcon";
import { HeaderTitle } from "../internal/HeaderTitle/HeaderTitle";

interface HeaderProps extends HeaderContentProps {
  title?: string;
}

export const HeaderStoreNameOnly = ({ title }: HeaderProps) => {
  return (
    <div className="flex flex-col border-b border-gray-400">
      <HeaderContent storeName={title} />
    </div>
  );
};

interface HeaderContentProps {
  storeName?: string;
}

const HeaderContent = ({ storeName = "" }: HeaderContentProps) => {
  return (
    <header className="flex w-full flex-wrap items-center justify-center gap-6 bg-white p-4">
      <HeaderIcon imageSrc={Logo} alt="logo" />
      <HeaderTitle title={storeName} />
    </header>
  );
};
