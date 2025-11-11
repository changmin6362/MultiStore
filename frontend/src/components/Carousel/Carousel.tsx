import Image from "next/image";
import background from "@public/background.svg";

export const Carousel = () => {
  return (
    <section
      className="flex flex-col items-center justify-center gap-2.5 px-8 relative
        min-h-[200px] overflow-hidden"
    >
      <Image
        src={background}
        alt="carousel"
        fill
        className="absolute top-0 left-0 object-cover"
        aria-hidden="true"
      />

      <div
        className="flex flex-col items-start justify-center relative
          self-stretch"
      >
        <h1
          className="relative [text-shadow:0px_4px_4px_#00000040] text-2xl
            text-white font-extrabold"
        >
          올마켓에서
          <br />
          다양한 상품을 만나보세요
        </h1>
      </div>
    </section>
  );
};
