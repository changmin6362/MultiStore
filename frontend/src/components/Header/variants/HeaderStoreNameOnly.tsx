import Logo from "@public/logo.svg";
import { ImageContainer } from "@/components/ImageContainer/ImageContainer";
import { BreakpointType, Breakpoints } from "./type";

interface HeaderProps extends HeaderContentProps {
  breakpoint?: BreakpointType;
  label?: string;
}

export const HeaderStoreNameOnly = ({ breakpoint, label }: HeaderProps) => {
  return breakpoint === Breakpoints[0] ? (
    <div
      className="flex flex-col border-b [border-bottom-style:solid] border-gray"
    >
      <HeaderContent storeName={label} />
    </div>
  ) : breakpoint === Breakpoints[1] ? (
    <div
      className="flex flex-col border-b [border-bottom-style:solid] border-gray"
    >
      <HeaderContent storeName={label} />
    </div>
  ) : (
    <div className="flex border-b [border-bottom-style:solid] border-gray">
      <HeaderContent storeName={label} />
    </div>
  );
};

interface HeaderContentProps {
  storeName?: string;
}

const HeaderContent = ({ storeName }: HeaderContentProps) => {
  return (
    <header
      className="flex flex-wrap w-full items-center justify-center gap-6 p-4
        bg-white"
    >
      <ImageContainer imageSrc={Logo} alt={"logo.svg"} width={42} height={42} />
      <div className="inline-flex flex-col items-center relative">
        <h1 className="font-bold">
          {storeName === "" ? "MultiStore" : storeName}
        </h1>
      </div>
    </header>
  );
};
