import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FC } from "react";
import { ProductList } from "./product-grid-list/product-list";

export const ProductListCard: FC = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Products</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <DataTable data={tasks} columns={columns} /> */}
        <ProductList />
      </CardContent>
    </Card>
  );
};
