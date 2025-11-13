import { StaticImageData } from "next/image";
import Image from "next/image";

interface ImageCardProps {
  imageSrc: string | StaticImageData;
  alt?: string;
  className?: string;
  useLabel?: boolean;
}

export const ImageCard = ({
  imageSrc,
  alt = "ImageCard",
  className = "flex-1",
  useLabel = true
}: ImageCardProps) => {
  return (
    <div
      className={`flex flex-col ${useLabel ? "gap-1 p-1" : ""} ${className}`}
    >
      {/* aspect로 종횡비를 지정함으로써 fill을 정상적으로 사용 가능 */}
      <div className="relative flex aspect-square w-full flex-col items-center justify-center">
        <Image src={imageSrc} alt={alt} fill className="object-cover" />
      </div>
      {useLabel && (
        <p className="font-semi-bold text-left text-[14px] text-black">
          상품명
        </p>
      )}
    </div>
  );
};
