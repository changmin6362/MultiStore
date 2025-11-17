import Previous from "@public/previous.svg";
import { Navigation } from "../internal/Navigation/Navigation";
import { HeaderLogo } from "../internal/HeaderIcon/HeaderIcon";
import { HeaderTitle } from "../internal/HeaderTitle/HeaderTitle";
import { UserStateType } from "./type";

interface HeaderProps extends HeaderContentProps {
  title?: string;
}

export const HeaderPageNameAndLogin = ({ title, userState }: HeaderProps) => {
  return (
    <div className="flex flex-col border-b border-gray-400">
      <HeaderContent pageName={title} userState={userState} />
    </div>
  );
};

interface HeaderContentProps {
  pageName?: string;
  userState?: UserStateType;
}

const HeaderContent = ({ pageName = "", userState }: HeaderContentProps) => {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-6 bg-white p-4">
      <HeaderLogo imageSrc={Previous} alt="back" onBack={true} />
      <HeaderTitle title={pageName} />
      <Navigation userState={userState} />
    </header>
  );
};
