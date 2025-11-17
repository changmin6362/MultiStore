"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserStateType, UserStates } from "../../variants/type";
import { ImageViewer } from "@/components/ui/ImageViewer/ImageViewer";

import Cart from "@public/cart.svg";

interface NavigationProps {
  userState?: UserStateType;
}

export const Navigation = ({ userState }: NavigationProps) => {
  const router = useRouter();
  const isUser = userState === UserStates[0];

  const handleLogout = () => {
    // 웹 스토리지에서 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    // 홈으로 이동
    router.push("/");
  };

  const navigationItems = isUser
    ? [
        { id: 1, label: "로그아웃", action: handleLogout, href: null },
        { id: 2, label: "마이페이지", action: null, href: "/user/profile" }
      ]
    : [
        { id: 1, label: "로그인", action: null, href: "/auth/signin" },
        { id: 2, label: "회원가입", action: null, href: "/auth/signup" }
      ];

  return (
    <nav
      className="relative flex flex-1 items-center justify-end gap-2"
      aria-label="Main navigation"
    >
      {navigationItems.map((item) =>
        item.action ? (
          <button
            key={item.id}
            onClick={item.action}
            className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center justify-center rounded-lg p-2"
          >
            <span className="relative flex items-center justify-center whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ) : (
          <Link
            key={item.id}
            href={item.href || "/"}
            className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center justify-center rounded-lg p-2"
          >
            <span className="relative flex items-center justify-center whitespace-nowrap">
              {item.label}
            </span>
          </Link>
        )
      )}

      {isUser && (
        <Link href="/cart">
          <ImageViewer imageSrc={Cart} alt="장바구니" width={24} height={24} />
        </Link>
      )}
    </nav>
  );
};
