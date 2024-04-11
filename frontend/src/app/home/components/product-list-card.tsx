import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FC } from "react";
import { ProductList } from "./product-grid-list/product-list";
import { useTranslation } from "react-i18next";

export const ProductListCard: FC = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">
          {t("Products")}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <DataTable data={tasks} columns={columns} /> */}

        <ProductList />
      </CardContent>
    </Card>
  );
};
