import { CardGridPrimary } from "./variants/CardGridPrimary";
import { CardGridSecondary } from "./variants/CardGridSecondary";

export const GridVariants = ["Primary", "Secondary"];

type GridVariantType = (typeof GridVariants)[number];

interface CardGridProps {
  variant?: GridVariantType;
}
// 카드 아이템 내의 라벨과 이미지에 동일한 id를 적용시켜서 둘 중에 하나를 선택하면 onClick이 발생하게 하기. 그리고 개별 카드 아이템에서 onClick은 독립적으로 동작해야 할 것. onClick시 수행될 동작은 부모 컴포넌트에서 처리할 것
export const CardGrid = ({ variant }: CardGridProps) => {
  if (variant === "Secondary") {
    return <CardGridSecondary />;
  }

  return <CardGridPrimary />;
};
