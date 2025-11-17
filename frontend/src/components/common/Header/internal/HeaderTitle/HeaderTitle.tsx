interface HeaderTitleProps {
  title?: string;
}

export const HeaderTitle = ({ title = "" }: HeaderTitleProps) => {
  return (
    <div className="relative inline-flex flex-col items-center">
      <h1 className="font-bold">{title === "" ? "MultiStore" : title}</h1>
    </div>
  );
};
