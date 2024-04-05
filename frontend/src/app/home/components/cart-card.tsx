import { BellIcon, EyeNoneIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext, type FC } from "react";
import { Button } from "@/components/ui/button";
import { useFrappeGetCall } from "frappe-react-sdk";
import { FullPageLoader } from "@/components/state/full-page-loader";
import { ErrorBanner } from "@/components/state/error-banner";
import { EmptyContent } from "@/components/state/empty";
import { AuthContext } from "@/context/auth-provider";

import isEmpty from "lodash/isEmpty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fCurrency } from "@/lib/format/format-number";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface OrderItem {
  name: string;
  item_id: string;
  item_title: string;
  price: number;
  quantity: number;
  size: string;
  item_image: string;
}

export const CartCard: FC = () => {
  const { currentUser } = useContext(AuthContext);

  const {
    data: order,
    error,
    isLoading,
  } = useFrappeGetCall(
    "uniform_registration.api.order.get_employee_order",
    {
      employee_id: currentUser?.name,
    },
    `get_order_for_employee_${currentUser?.name}`
  );
  const shoppingCart = order?.message?.shopping_cart;
  const totalPrice = order?.message?.total_price;
  const budgetLeft = currentUser?.budget ? currentUser?.budget - totalPrice : 0;

  if (isLoading) return <FullPageLoader />;
  if (error) return <ErrorBanner error={error} />;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Your Shopping Cart</CardTitle>
        <CardDescription>What you have ordered so far</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {isEmpty(shoppingCart) ? (
          <EmptyContent />
        ) : (
          <div className="grid gap-6">
            {shoppingCart.map((item: OrderItem) => (
              <div
                key={item.name}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={item.item_image} />
                    <AvatarFallback>I</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-medium leading-none">
                      {item.quantity} x {item.item_title} ({item.size})
                    </p>
                  </div>
                </div>
                <div className="text-sm">
                  {fCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        )}
        <Separator className="my-1" />
        <div className="flex justify-end">
          <span className="text-normal font-medium">
            Total {fCurrency(totalPrice)}
          </span>
        </div>
        {budgetLeft ? (
          <div className="flex justify-end">
            <span
              className={cn(
                "text-normal font-medium",
                budgetLeft > 500000 ? "text-green-500" : "text-red-500"
              )}
            >
              {budgetLeft > 0
                ? `Within budget! ${fCurrency(Number(budgetLeft))} left`
                : `Out of budget: ${fCurrency(Number(budgetLeft))}`}{" "}
            </span>
          </div>
        ) : null}
      </CardContent>
      {!isEmpty(shoppingCart) ? (
        <CardFooter className="flex justify-end">
          <Button className="w-full">Edit</Button>
        </CardFooter>
      ) : null}
    </Card>
  );
};
