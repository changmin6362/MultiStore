import Previous from "@public/previous.svg";
import { ImageContainer } from "@/components/ImageContainer/ImageContainer";
import { Navigation } from "../internal/Navigation/Navigation";
import { BreakpointType, UserStateType, Breakpoints } from "./type";

interface HeaderProps extends HeaderContentProps {
  breakpoint?: BreakpointType;
  title?: string;
}

export const HeaderPageNameAndLogin = ({
  breakpoint,
  title,
  userState
}: HeaderProps) => {
  return breakpoint === Breakpoints[0] ? (
    <div
      className="flex flex-col border-b [border-bottom-style:solid] border-gray"
    >
      <HeaderContent pageName={title} userState={userState} />
    </div>
  ) : breakpoint === Breakpoints[1] ? (
    <div
      className="flex flex-col border-b [border-bottom-style:solid] border-gray"
    >
      <HeaderContent pageName={title} userState={userState} />
    </div>
  ) : (
    <div className="flex border-b [border-bottom-style:solid] border-gray">
      <HeaderContent pageName={title} userState={userState}></HeaderContent>
    </div>
  );
};

interface HeaderContentProps {
  pageName?: string;
  userState?: UserStateType;
}

const HeaderContent = ({ pageName, userState }: HeaderContentProps) => {
  return (
    <header
      className="flex flex-wrap w-full items-center justify-between gap-6 p-4
        bg-white"
    >
      <ImageContainer
        imageSrc={Previous}
        alt={"logo.svg"}
        width={42}
        height={42}
      />
      <div className="inline-flex flex-col items-center relative">
        <h1 className="font-bold">
          {pageName === "" ? "MultiStore" : pageName}
        </h1>
      </div>

      <Navigation userState={userState} />
    </header>
  );
};
