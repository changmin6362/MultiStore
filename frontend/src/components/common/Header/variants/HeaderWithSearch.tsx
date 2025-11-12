import Logo from "@public/logo.svg";
import { ImageViewer } from "@/components/ui/ImageViewer/ImageViewer";
import { Navigation } from "../internal/Navigation/Navigation";
import { SearchBar } from "../internal/SearchBar/SearchBar";
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
  storeName,
  userState,
  children
}: HeaderContentProps) => {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-6 bg-white p-4">
      <ImageViewer imageSrc={Logo} alt={"logo.svg"} width={42} height={42} />
      <div className="relative inline-flex flex-col items-center">
        <h1 className="font-bold">
          {storeName === "" ? "MultiStore" : storeName}
        </h1>
      </div>

      {children && children}

      <Navigation userState={userState} />
    </header>
  );
};
