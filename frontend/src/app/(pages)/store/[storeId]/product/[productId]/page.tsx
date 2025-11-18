import { ProductDescription } from "@/components/pages/product/ProductDescription";
import { ProductInfoCard } from "@/components/pages/product/ProductInfoCard";
import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import hamburgerImage from "@public/hamburger.png";

export default function Product() {
  return (
    <>
      <ImageCard imageSrc={hamburgerImage} useLabel={false} />
      <ProductInfoCard />
      <ProductDescription />
    </>
  );
}
