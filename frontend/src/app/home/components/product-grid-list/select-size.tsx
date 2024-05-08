import { type FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Size } from "@/types/UniformRegistration/Size";
import { useTranslation } from "react-i18next";

export type SelectSizeProps = {
  className?: string;
  sizes: string;
  size: string;
  setSize: (size: string) => void;
  disabled?: boolean;
};

export const SelectSize: FC<SelectSizeProps> = ({
  sizes,
  size,
  setSize,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const sizeList = sizes ? sizes.split(",") : [];
  return (
    <Select
      value={size}
      onValueChange={(value) => setSize(value as Size)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        {sizeList.map((size) => (
          <SelectItem key={size} value={size}>
            {t(size)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
