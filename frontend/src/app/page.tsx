import { Carousel } from "@/components/common/Carousel/Carousel";
import { CardGrid } from "@/components/common/CardGrid/CardGrid";

export default function Home() {
  return (
    <div>
      <Carousel />
      <CardGrid />
      <CardGrid variant="Secondary" />
    </div>
  );
}
