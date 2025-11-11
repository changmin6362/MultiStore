import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface ImageContentProps {
  imageSrc: string | StaticImageData;
  alt: string;
}

interface ImageContainerProps extends ImageContentProps {
  url?: string;
  onClick?: () => void;
  width: number;
  height: number;
}

export const ImageContainer = ({
  imageSrc,
  alt,
  url,
  onClick,
  width,
  height
}: ImageContainerProps) => {
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`
  };

  return url ? (
    <Link
      href={url}
      className={"relative block"}
      style={containerStyle}
      onClick={onClick}
    >
      <ImageContent imageSrc={imageSrc} alt={alt} />
    </Link>
  ) : (
    <div className={"relative block"} style={containerStyle} onClick={onClick}>
      <ImageContent imageSrc={imageSrc} alt={alt} />
    </div>
  );
};

const ImageContent = ({ imageSrc, alt }: ImageContentProps) => {
  return <Image src={imageSrc} alt={alt} fill className="object-contain" />;
};
