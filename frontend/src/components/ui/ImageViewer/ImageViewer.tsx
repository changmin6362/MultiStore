import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export const ObjectClasses = ["object-contain", "object-cover"] as const;

type ObjectFit = (typeof ObjectClasses)[number];

interface ImageViewerProps {
  imageSrc: string | StaticImageData;
  alt: string;
  url?: string;
  onClick?: () => void;
  width: number;
  height: number;
  objectFit?: ObjectFit;
}

const ImageContent = ({
  imageSrc,
  alt,
  objectFit
}: {
  imageSrc: string | StaticImageData;
  alt: string;
  objectFit: ObjectFit;
}) => {
  return <Image src={imageSrc} alt={alt} fill className={objectFit} />;
};

export const ImageViewer = ({
  imageSrc,
  alt,
  url,
  onClick,
  width,
  height,
  objectFit = ObjectClasses[0] // "object-contain"
}: ImageViewerProps) => {
  const containerStyle = {
    width: `${width}px`,
    height: `${height}px`
  };

  const imageElement = (
    <ImageContent imageSrc={imageSrc} alt={alt} objectFit={objectFit} />
  );

  return url ? (
    <Link
      href={url}
      className={"relative block"}
      style={containerStyle}
      onClick={onClick}
      aria-label={alt}
    >
      {imageElement}
    </Link>
  ) : (
    <div
      className={"relative block"}
      style={containerStyle}
      onClick={onClick}
      aria-label={alt}
    >
      {imageElement}
    </div>
  );
};
