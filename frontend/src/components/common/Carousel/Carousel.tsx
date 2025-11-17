import Image from "next/image";
import background from "@public/background.svg";

export const Carousel = () => {
  return (
    <section className="relative flex h-60 flex-col items-center justify-center gap-2.5 overflow-hidden px-8 lg:h-72">
      <Image src={background} alt="carousel" fill className="object-cover" />

      <div className="relative flex flex-col items-start justify-center self-stretch">
        <h1 className="relative text-2xl font-extrabold text-white [text-shadow:0px_4px_4px_#00000040]">
          올마켓에서
          <br />
          다양한 상품을 만나보세요
        </h1>
      </div>
    </section>
  );
};
