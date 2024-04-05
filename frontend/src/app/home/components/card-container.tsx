import { cn } from "@/lib/utils";
import React, { type FC } from "react";

export const CardContainer: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex item-centers justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
};
