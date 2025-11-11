import { UserStateType, UserStates } from "../../variants/type";
import { ImageContainer } from "@/components/ImageContainer/ImageContainer";

import Cart from "@public/cart.svg";

interface NavigationProps {
  userState?: UserStateType;
}

export const Navigation = ({ userState }: NavigationProps) => {
  const isUser = userState === UserStates[0];

  const navigationItems = isUser
    ? [
        { id: 1, label: "로그아웃", href: "/logout" },
        { id: 2, label: "마이페이지", href: "/mypage" }
      ]
    : [
        { id: 1, label: "로그인", href: "/login" },
        { id: 2, label: "회원가입", href: "/signup" }
      ];

  return (
    <nav
      className="flex items-center justify-end gap-2 relative flex-1"
      aria-label="Main navigation"
    >
      {navigationItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="inline-flex items-center justify-center p-2 relative
            flex-[0_0_auto] rounded-lg cursor-pointer"
        >
          <span
            className="flex items-center justify-center whitespace-nowrap
              relative"
          >
            {item.label}
          </span>
        </a>
      ))}

      {isUser && (
        <ImageContainer
          imageSrc={Cart}
          alt="장바구니"
          width={24}
          height={24}
          url="/cart"
        />
      )}
    </nav>
  );
};
