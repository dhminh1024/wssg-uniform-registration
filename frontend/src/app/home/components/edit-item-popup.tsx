import { useContext, type FC, useState } from "react";
import { EditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFrappePostCall, useSWRConfig } from "frappe-react-sdk";

import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getServerErrors } from "@/lib/format/error-server-message";
import { SelectSize } from "./product-grid-list/select-size";
import { SettingsContext } from "@/context/settings-provider";
import { fCurrency } from "@/lib/format/format-number";
import { UROrderItem } from "@/types/UniformRegistration/UROrderItem";

import { QuantityModifier } from "./product-grid-list/quantity-modifier";
import { useTranslation } from "react-i18next";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

export type EditItemPopupProps = {
  employeeId: string | undefined;
  product: UROrderItem;
};

export const EditItemPopup: FC<EditItemPopupProps> = ({
  employeeId,
  product,
}) => {
  const { call: deleteItem, loading: deleteItemLoading } = useFrappePostCall<{
    message: string;
  }>("uniform_registration.api.order.delete_order_item");

  const { call: updateItem, loading: updateItemLoading } = useFrappePostCall<{
    message: string;
  }>("uniform_registration.api.order.update_order_item");
  const { allowRegistration } = useContext(SettingsContext);

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [itemSize, setItemSize] = useState<string>(product.size);
  const [itemQuantity, setItemQuantity] = useState(product.quantity);
  const [notes, setNotes] = useState(product.notes);
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
      notes,
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(true)}
          disabled={!allowRegistration}
        >
          <EditIcon className="h-4 w-4 text-red-400" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[360px] md:w-[640px]">
        <div className="grid gap-4 mt-8">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{product.item_title}</h4>
            <p className="text-sm text-muted-foreground">
              {fCurrency(product.price)}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="item-size">{t("Size")}</Label>
              <SelectSize
                sizes={product.item_sizes}
                size={itemSize}
                setSize={setItemSize}
              />
            </div>
            <div className="flex justify-between items-center">
              <Label htmlFor="item-quantity">{t("Quantity")}</Label>
              <QuantityModifier
                quantity={itemQuantity}
                setQuantity={setItemQuantity}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="notes">{t("Notes")}</Label>
              <Textarea
                className="h-80"
                placeholder={t("Type your notes here")}
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              variant="destructive"
              size="sm"
              disabled={deleteItemLoading}
              onClick={() => handleDeleteItem(employeeId, product.name)}
            >
              {/* <Trash2Icon className="h-4 w-4" />  */}
              {t("Delete Item")}
            </Button>
            <Button
              size="sm"
              disabled={updateItemLoading}
              onClick={() => handleUpdateItem(employeeId, product.name)}
            >
              {t("Save Item")}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
