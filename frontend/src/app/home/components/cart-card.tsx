import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext, type FC, useState } from "react";
import { useFrappeGetCall } from "frappe-react-sdk";
import { FullPageLoader } from "@/components/state/full-page-loader";
import { ErrorBanner } from "@/components/state/error-banner";
import { EmptyContent } from "@/components/state/empty";
import { AuthContext } from "@/context/auth-provider";

import isEmpty from "lodash/isEmpty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fCurrency, fPercent } from "@/lib/format/format-number";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { UROrderItem } from "@/types/UniformRegistration/UROrderItem";

import { Loader } from "@/components/state/loader";
import { UROrder } from "@/types/UniformRegistration/UROrder";
import { useAppStore } from "@/core/stores/store";
// import Trans from "@/components/trans";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { EditItemPopup } from "./edit-item-popup";
import { transAttribute } from "@/lib/format/trans-attribute";
import { SettingsContext } from "@/context/settings-provider";

export const CartCard: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    t,
    i18n: { language: lng },
  } = useTranslation();
  const budgetLeft = useAppStore((state) => state.budgetLeft);
  const totalPrice = useAppStore((state) => state.orderTotalPrice);
  const setOrderTotalPrice = useAppStore((state) => state.setOrderTotalPrice);
  const [shoppingCart, setShoppingCart] = useState<UROrderItem[]>([]);

  const { tailorMadePrice, overBudgetDiscount } = useContext(SettingsContext);

  const { error, isLoading, isValidating } = useFrappeGetCall<{
    message: UROrder;
  }>(
    "uniform_registration.api.order.get_employee_order",
    {
      employee_id: currentUser?.name,
    },
    `get_order_for_employee_${currentUser?.name}`,
    {
      revalidateOnMount: true,
      onSuccess: (data) => {
        if (data.message) {
          setOrderTotalPrice(data.message.total_price);
          setShoppingCart(data.message.shopping_cart);
        } else {
          setOrderTotalPrice(0);
          setShoppingCart([]);
        }
      },
    }
  );

  if (isLoading) return <FullPageLoader />;
  if (error) return <ErrorBanner error={error} />;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-lg font-semibold">
          {t("Your Shopping Cart")}
        </CardTitle>
        <CardDescription>{t("What you have ordered")}</CardDescription>
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
                        key={item.name}
                        product={item}
                        employeeId={currentUser?.name}
                        isLoading={isLoading}
                        isValidating={isValidating}
                      />
                    )}
                  </div>
                  <Avatar>
                    <AvatarImage src={item.item_image} />
                    <AvatarFallback>W</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-base font-medium leading-none">
                      {item.quantity} x{" "}
                      {transAttribute(lng, item.item_title, item.item_title_en)}{" "}
                      ({t(item.size.toUpperCase())})
                    </p>
                    {/* {item.size.toLowerCase() === "tailor" && (
                      <span className="text-sm text-foreground">
                        {t("TailorPriceNotice", {
                          price: fCurrency(Number(tailorMadePrice)),
                        })}
                      </span>
                    )} */}
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
            {t("Total Price")}: {fCurrency(totalPrice)}
          </span>
        </div>
        {budgetLeft ? (
          <div className="flex justify-end">
            <span
              className={cn(
                "text-base font-medium text-right",
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
                <>
                  <Trans
                    i18nKey={"Out of Budget"}
                    className="flex justify-end"
                    values={{
                      budgetLeft: fCurrency(-Number(budgetLeft)),
                      toPay: fCurrency(
                        -Number(budgetLeft) *
                          (1 - Number(overBudgetDiscount) / 100)
                      ),
                    }}
                    components={{ p: <p /> }}
                  />
                  <br />
                  {Number(overBudgetDiscount) > 0 && (
                    <Trans
                      i18nKey={"Show Discount"}
                      className="flex justify-end"
                      values={{
                        discount: fPercent(Number(overBudgetDiscount)),
                      }}
                      components={{ p: <p /> }}
                    />
                  )}
                </>
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
