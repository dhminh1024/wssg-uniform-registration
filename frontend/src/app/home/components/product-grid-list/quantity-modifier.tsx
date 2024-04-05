import { cn } from "@/lib/utils";
import { type FC } from "react";

export type QuantityModifierProps = {
  className?: string;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export const QuantityModifier: FC<QuantityModifierProps> = ({
  className,
  quantity,
  setQuantity,
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      {/* <span className="mr-2">Qty</span> */}
      <button
        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
        className="px-2 py-1 border border-gray-300 rounded-l"
      >
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-10 text-center border border-gray-300"
      />
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="px-2 py-1 border border-gray-300 rounded-r"
      >
        +
      </button>
    </div>
  );
};
