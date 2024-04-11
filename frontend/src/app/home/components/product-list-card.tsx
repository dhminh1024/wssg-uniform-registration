import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FC } from "react";
import { ProductList } from "./product-grid-list/product-list";
// import Trans from "@/components/trans";
import { Trans } from "react-i18next";

export const ProductListCard: FC = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">
          <Trans i18nKey="Products" />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <DataTable data={tasks} columns={columns} /> */}

        <ProductList />
      </CardContent>
    </Card>
  );
};
