import { Button } from "@/components/ui/Button/Button";
import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import profile from "@public/product1.png";

export const ProfileCard = () => {
  return (
    <>
      <div className="flex w-full items-center justify-start gap-2.5 overflow-hidden px-1.5 py-2">
        {/* 프로필 사진 */}
        <div className="size-16">
          <ImageCard
            imageSrc={profile}
            alt="profile"
            useLabel={false}
            isCircle
          />
        </div>
        {/* 프로필 정보 */}
        <div className="flex flex-col items-start justify-between gap-0.5">
          {/* 닉네임 */}
          <p className="text-lg font-bold text-black">떡볶이 러버</p>
          {/* 이메일 */}
          <p className="text-lg font-bold text-black">zzangmin3@gmail.com</p>
        </div>
      </div>
      <Button
        label="프로필 정보 수정하기"
        state="Navigation"
        buttonType="Secondary"
        href="/user/profile/edit"
      />
    </>
  );
};
