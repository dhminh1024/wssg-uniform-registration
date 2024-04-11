import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditIcon, Trash2Icon } from "lucide-react";
import { useContext, type FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  useFrappeGetCall,
  useFrappePostCall,
  useSWRConfig,
} from "frappe-react-sdk";
import { FullPageLoader } from "@/components/state/full-page-loader";
import { ErrorBanner } from "@/components/state/error-banner";
import { EmptyContent } from "@/components/state/empty";
import { AuthContext } from "@/context/auth-provider";

import isEmpty from "lodash/isEmpty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fCurrency } from "@/lib/format/format-number";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UROrderItem } from "@/types/UniformRegistration/UROrderItem";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getServerErrors } from "@/lib/format/error-server-message";

import { QuantityModifier } from "./product-grid-list/quantity-modifier";
import { Loader } from "@/components/state/loader";
import { UROrder } from "@/types/UniformRegistration/UROrder";
import { useAppStore } from "@/core/stores/store";
// import Trans from "@/components/trans";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { SelectSize } from "./product-grid-list/select-size";
import { Size } from "@/types/UniformRegistration/Size";
import { SettingsContext } from "@/context/settings-provider";

export const CartCard: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const budgetLeft = useAppStore((state) => state.budgetLeft);
  const totalPrice = useAppStore((state) => state.orderTotalPrice);
  const setOrderTotalPrice = useAppStore((state) => state.setOrderTotalPrice);
  const [shoppingCart, setShoppingCart] = useState<UROrderItem[]>([]);

  const {
    data: order,
    error,
    isLoading,
    isValidating,
  } = useFrappeGetCall<{ message: UROrder }>(
    "uniform_registration.api.order.get_employee_order",
    {
      employee_id: currentUser?.name,
    },
    `get_order_for_employee_${currentUser?.name}`,
    { revalidateOnMount: true }
  );

  useEffect(() => {
    if (!order) return;
    if (order.message?.shopping_cart)
      setShoppingCart(order.message?.shopping_cart);
    if (order.message?.total_price)
      setOrderTotalPrice(order.message?.total_price);
  }, [order, setOrderTotalPrice]);

  if (isLoading) return <FullPageLoader />;
  if (error) return <ErrorBanner error={error} />;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          <Trans i18nKey="Your Shopping Cart" />
        </CardTitle>
        <CardDescription>
          <Trans i18nKey="What you have ordered" />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {isEmpty(shoppingCart) ? (
          <EmptyContent text={t("Your cart is empty")} />
        ) : (
          <div className="grid gap-6">
            {shoppingCart.map((item: UROrderItem) => (
              <div
                key={item.name}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-9 h-9 flex justify-center items-center">
                    {isLoading || isValidating ? (
                      <Loader />
                    ) : (
                      <EditItemPopup
                        product={item}
                        employeeId={currentUser?.name}
                      />
                    )}
                  </div>
                  <Avatar>
                    <AvatarImage src={item.item_image} />
                    <AvatarFallback>W</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium leading-none">
                      {item.quantity} x {item.item_title} ({item.size})
                    </p>
                  </div>
                </div>
                <div className="text-sm leading-none">
                  {fCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        )}
        <Separator className="my-1" />
        <div className="flex justify-end">
          <span className="text-base font-medium leading-none">
            <Trans i18nKey={"Total Price"} />: {fCurrency(totalPrice)}
          </span>
        </div>
        {budgetLeft ? (
          <div className="flex justify-end">
            <span
              className={cn(
                "text-base font-medium leading-none",
                budgetLeft > 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {/* {budgetLeft > 0
                ? `Within budget! ${fCurrency(Number(budgetLeft))} left`
                : `Out of budget: ${fCurrency(Number(budgetLeft))}`}{" "} */}
              {budgetLeft > 0 ? (
                <Trans
                  i18nKey={"Within Budget"}
                  values={{
                    budgetLeft: fCurrency(Number(budgetLeft)),
                  }}
                  components={{ b: <b /> }}
                />
              ) : (
                <Trans
                  i18nKey={"Out of Budget"}
                  values={{
                    budgetLeft: fCurrency(Number(budgetLeft)),
                  }}
                  components={{ b: <b /> }}
                />
              )}
            </span>
          </div>
        ) : null}
      </CardContent>
      {/* {!isEmpty(shoppingCart) ? (
        <CardFooter className="flex justify-end">
          <Button className="w-full">Edit</Button>
        </CardFooter>
      ) : null} */}
    </Card>
  );
};

export type EditItemPopupProps = {
  employeeId: string | undefined;
  product: UROrderItem;
};

const EditItemPopup: FC<EditItemPopupProps> = ({ employeeId, product }) => {
  const { call: deleteItem, loading: deleteItemLoading } = useFrappePostCall<{
    message: string;
  }>("uniform_registration.api.order.delete_order_item");

  const { call: updateItem, loading: updateItemLoading } = useFrappePostCall<{
    message: string;
  }>("uniform_registration.api.order.update_order_item");
  const { allowRegistration } = useContext(SettingsContext);

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [itemSize, setItemSize] = useState<Size>(product.size as Size);
  const [itemQuantity, setItemQuantity] = useState(product.quantity);
  const { mutate } = useSWRConfig();
  const { t } = useTranslation();

  if (!employeeId) return null;

  const handleDeleteItem = (employeeId: string, orderItemID: string) => {
    deleteItem({
      employee_id: employeeId,
      order_item_id: orderItemID,
    })
      .then(({ message }) => {
        setIsOpen(false);
        toast({
          title: "Success",
          description: message,
        });
        mutate(`get_order_for_employee_${employeeId}`);
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: t(getServerErrors(e)),
        });
      });
  };

  const handleUpdateItem = (employeeId: string, orderItemID: string) => {
    updateItem({
      employee_id: employeeId,
      order_item_id: orderItemID,
      size: itemSize,
      quantity: itemQuantity,
    })
      .then(({ message }) => {
        setIsOpen(false);
        toast({
          title: "Success",
          description: message,
        });
        mutate(`get_order_for_employee_${employeeId}`);
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
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          disabled={!allowRegistration}
        >
          <EditIcon className="h-4 w-4 text-red-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{product.item_title}</h4>
            <p className="text-sm text-muted-foreground">
              {fCurrency(product.price)}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="item-size">
                <Trans i18nKey={"Size"} />
              </Label>
              <SelectSize
                sizes={product.item_sizes}
                size={itemSize}
                setSize={setItemSize}
              />
              {/* <Select
                value={itemSize}
                onValueChange={(
                  value: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL"
                ) => setItemSize(value)}
              >
                <SelectTrigger className="w-[90px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XS">XS</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                  <SelectItem value="XXL">XXL</SelectItem>
                  <SelectItem value="XXXL">XXXL</SelectItem>
                </SelectContent>
              </Select> */}
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="item-quantity">
                <Trans i18nKey={"Quantity"} />
              </Label>
              <QuantityModifier
                quantity={itemQuantity}
                setQuantity={setItemQuantity}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="destructive"
              size="icon"
              disabled={deleteItemLoading}
              onClick={() => handleDeleteItem(employeeId, product.name)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              disabled={updateItemLoading}
              onClick={() => handleUpdateItem(employeeId, product.name)}
            >
              <Trans i18nKey={"Save"} />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
