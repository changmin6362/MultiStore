import Logo from "@public/logo.svg";
import { ImageViewer } from "@/components/ImageViewer/ImageViewer";

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

const HeaderContent = ({ storeName }: HeaderContentProps) => {
  return (
    <header
      className="flex flex-wrap w-full items-center justify-center gap-6 p-4
        bg-white"
    >
      <ImageViewer imageSrc={Logo} alt={"logo.svg"} width={42} height={42} />
      <div className="inline-flex flex-col items-center relative">
        <h1 className="font-bold">
          {storeName === "" ? "MultiStore" : storeName}
        </h1>
      </div>
    </header>
  );
};
