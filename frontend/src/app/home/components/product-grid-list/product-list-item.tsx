import { useState, type FC, useContext } from "react";
import { QuantityModifier } from "./quantity-modifier";
import { Button } from "@/components/ui/button";

import { fCurrency } from "@/lib/format/format-number";
import { Badge } from "@/components/ui/badge";
import { AuthContext } from "@/context/auth-provider";
import { useFrappePostCall, useSWRConfig } from "frappe-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { getServerErrors } from "@/lib/format/error-server-message";
import { URItem } from "@/types/UniformRegistration/URItem";
import { useTranslation } from "react-i18next";
import { SelectSize } from "./select-size";
import { SettingsContext } from "@/context/settings-provider";

export type ProductListItemProps = {
  product: URItem;
};

export const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string>(
    product.sizes.split(",")[0].toUpperCase()
  );
  const { currentUser } = useContext(AuthContext);
  const { allowRegistration } = useContext(SettingsContext);

  const { call, loading } = useFrappePostCall(
    "uniform_registration.api.order.add_to_order"
  );
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleAddToCart = () => {
    call({
      employee_id: currentUser?.name,
      product_id: product.name,
      product_title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      sizes: product.sizes,
    })
      .then((data) => {
        toast({
          title: "Success",
          description: data.message,
        });
        mutate(`get_order_for_employee_${currentUser?.name}`);
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: t(getServerErrors(e)),
        });
      });
  };

  return (
    <li key={product.name} className="relative space-y-2">
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <div className="h-64 flex items-center justify-center">
          <img
            src={product.item_image}
            alt=""
            className="pointer-events-none object-cover group-hover:opacity-75"
          />
        </div>
        {/* <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {product.title}</span>
        </button> */}
      </div>
      <div className="flex justify-between items-center mt-6">
        <p className="pointer-events-none block truncate text-lg font-medium text-gray-900">
          {product.title}
        </p>
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 pointer-events-none block text-sm font-semibold text-orange-500"
        >
          {fCurrency(product.price)}
        </Badge>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <span className="text-base">{t("Quantity")}</span>
          <span className="text-base">{t("Size")}</span>
        </div>
        <div className="flex justify-between items-center">
          <QuantityModifier quantity={quantity} setQuantity={setQuantity} />
          <SelectSize sizes={product.sizes} size={size} setSize={setSize} />
        </div>
      </div>

      <p className="text-base text-orange-500">
        {t("Total Price")}: {fCurrency(quantity * product.price)}
      </p>
      <Button
        className="w-full"
        onClick={handleAddToCart}
        disabled={loading || !allowRegistration}
      >
        Order
      </Button>
    </li>
  );
};
