import { type FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Size } from "@/types/UniformRegistration/Size";

export type SelectSizeProps = {
  className?: string;
  sizes: string;
  size: Size;
  setSize: (size: Size) => void;
};

export const SelectSize: FC<SelectSizeProps> = ({ sizes, size, setSize }) => {
  const sizeList = sizes ? (sizes.split(",") as Size[]) : [];
  return (
    <Select value={size} onValueChange={(value) => setSize(value as Size)}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        {sizeList.map((size) => (
          <SelectItem key={size} value={size}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
