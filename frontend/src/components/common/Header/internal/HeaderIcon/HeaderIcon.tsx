"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageViewer } from "@/components/ui/ImageViewer/ImageViewer";

interface HeaderIconProps {
  imageSrc: string;
  alt?: string;
  href?: string;
  onBack?: boolean;
}

export const HeaderIcon = ({
  imageSrc,
  alt = "icon",
  href = "/",
  onBack = false
}: HeaderIconProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onBack) {
      router.back();
    }
  };

  if (onBack) {
    return (
      <button
        onClick={handleClick}
        className="flex cursor-pointer items-center transition-opacity hover:opacity-80"
        aria-label="Go back"
      >
        <ImageViewer imageSrc={imageSrc} alt={alt} width={42} height={42} />
      </button>
    );
  }

  return (
    <Link href={href}>
      <ImageViewer imageSrc={imageSrc} alt={alt} width={42} height={42} />
    </Link>
  );
};

// 하위 호환성을 위한 별칭
export const HeaderLogo = HeaderIcon;
