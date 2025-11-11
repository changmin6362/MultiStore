import Logo from "@public/logo.svg";
import { ImageViewer } from "@/components/ImageViewer/ImageViewer";
import { Navigation } from "../internal/Navigation/Navigation";
import { SearchBar } from "../internal/SearchBar/SearchBar";
import { BreakpointType, UserStateType, Breakpoints } from "./type";

interface HeaderProps extends HeaderContentProps {
  breakpoint?: BreakpointType;
  title?: string;
}

export const HeaderWithSearch = ({
  breakpoint,
  title,
  userState
}: HeaderProps) => {
  return breakpoint === Breakpoints[0] ? (
    <div className="flex flex-col border-b border-gray-400">
      <HeaderContent storeName={title} userState={userState} />
      <SearchBar />
    </div>
  ) : breakpoint === Breakpoints[1] ? (
    <div className="flex flex-col border-b border-gray-400">
      <HeaderContent storeName={title} userState={userState} />
      <SearchBar />
    </div>
  ) : (
    <div className="flex border-b border-gray-400">
      <HeaderContent storeName={title} userState={userState}>
        <SearchBar />
      </HeaderContent>
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
    <header
      className="flex flex-wrap w-full items-center justify-between gap-6 p-4
        bg-white"
    >
      <ImageViewer imageSrc={Logo} alt={"logo.svg"} width={42} height={42} />
      <div className="inline-flex flex-col items-center relative">
        <h1 className="font-bold">
          {storeName === "" ? "MultiStore" : storeName}
        </h1>
      </div>

      {children && children}

      <Navigation userState={userState} />
    </header>
  );
};
