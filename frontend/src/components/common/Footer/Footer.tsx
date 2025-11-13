import { ImageViewer } from "../../ui/ImageViewer/ImageViewer";

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
    <div className="items-first flex w-full flex-col justify-center gap-16 bg-white p-8 whitespace-nowrap">
      <div className="flex w-full items-center justify-between">
        <p className="text-2xl text-black">
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
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <p className="font-bold text-black">
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
        <div className="flex w-full flex-col gap-2 md:w-1/2">
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
