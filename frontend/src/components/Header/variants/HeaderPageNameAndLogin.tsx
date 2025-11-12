import Previous from "@public/previous.svg";
import { ImageViewer } from "@/components/ImageViewer/ImageViewer";
import { Navigation } from "../internal/Navigation/Navigation";
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

const HeaderContent = ({ pageName, userState }: HeaderContentProps) => {
  return (
    <header
      className="flex flex-wrap w-full items-center justify-between gap-6 p-4
        bg-white"
    >
      <ImageViewer
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
