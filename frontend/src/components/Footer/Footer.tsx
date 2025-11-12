import { ImageViewer } from "../ImageViewer/ImageViewer";

import x from "@public/logo_x.svg";
import instagram from "@public/logo_instagram.svg";
import linkedin from "@public/logo_linkedIn.svg";
import youtube from "@public/logo_youtube.svg";

export interface StoreDataType {
  companyName: string;
  businessNumber: string;
  sellerRegistrationNumber: string;
  ceoName: string;
  address: string;
  phone: string;
  email: string;
  storeName: string;
}

interface FooterProps {
  merchantData?: StoreDataType;
}

export const Footer = ({ merchantData }: FooterProps) => {
  return (
    <div
      className="w-full p-8 bg-white flex flex-col justify-center items-first
        gap-16 whitespace-nowrap"
    >
      <div className="w-full flex justify-between items-center">
        <p className="text-black text-2xl">
          {merchantData?.storeName || "All Market"}
        </p>
        <div className="flex gap-4">
          <ImageViewer imageSrc={x} alt="x" width={24} height={24} />
          <ImageViewer
            imageSrc={instagram}
            alt="instagram"
            width={24}
            height={24}
          />
          <ImageViewer
            imageSrc={youtube}
            alt="youtube"
            width={24}
            height={24}
          />
          <ImageViewer
            imageSrc={linkedin}
            alt="linkedin"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row justify-between items-start gap-2"
      >
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="text-black font-bold">
            {merchantData?.companyName || "회사명(주)"}
          </p>
          <p className="text-black">
            {merchantData?.businessNumber || "사업자등록번호 000-123-12-12345"}
          </p>
          <p className="text-black">
            {merchantData?.ceoName || "대표이사 000"}
          </p>
          <p className="text-black">
            {merchantData?.phone || "전화 1588-1234"}
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <p className="text-black">
            {merchantData?.sellerRegistrationNumber ||
              "통신판매업 신고번호 2025-서울-0000호"}
          </p>
          <p className="text-black">
            {merchantData?.address || "서울특별시 강서구"}
          </p>
          <p className="text-black">
            {merchantData?.email || "이메일 ecommerce@naver.com"}
          </p>
        </div>
      </div>
    </div>
  );
};
