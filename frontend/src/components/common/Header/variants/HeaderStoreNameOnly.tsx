import Logo from "@public/logo.svg";
import { ImageViewer } from "@/components/ui/ImageViewer/ImageViewer";

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
    <header className="flex w-full flex-wrap items-center justify-center gap-6 bg-white p-4">
      <ImageViewer imageSrc={Logo} alt={"logo.svg"} width={42} height={42} />
      <div className="relative inline-flex flex-col items-center">
        <h1 className="font-bold">
          {storeName === "" ? "MultiStore" : storeName}
        </h1>
      </div>
    </header>
  );
};
