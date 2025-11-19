import { CardGridPrimary } from "./variants/CardGridPrimary";
import { CardGridSecondary } from "./variants/CardGridSecondary";

export const GridVariants = ["Primary", "Secondary"] as const;

type GridVariantType = (typeof GridVariants)[number];

interface CardGridProps {
  variant?: GridVariantType;
}

export const CardGrid = ({ variant }: CardGridProps) => {
  if (variant === GridVariants[1] /* "Secondary" */) {
    return <CardGridSecondary />;
  }

  return <CardGridPrimary />;
};
