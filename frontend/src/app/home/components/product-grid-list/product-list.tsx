import { type FC } from "react";
import { ProductListToolbar } from "./product-list-toolbar";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { FullPageLoader } from "@/components/state/full-page-loader";
import { ErrorBanner } from "@/components/state/error-banner";
import { EmptyContent } from "@/components/state/empty";
import { ProductListItem } from "./product-list-item";

export type ProductListProps = {
  className?: string;
};

export const ProductList: FC<ProductListProps> = () => {
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useFrappeGetDocList("UR Item", {
    fields: ["name", "title", "description", "price", "item_image"],
    asDict: true,
  });

  useFrappeDocTypeEventListener("UR Item", () => {
    mutate();
  });

  if (isLoading) return <FullPageLoader />;
  if (error) return <ErrorBanner error={error} />;
  if (!products) return <EmptyContent />;

  return (
    <div className="space-y-4">
      <ProductListToolbar />
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product) => (
          <ProductListItem key={product.name} product={product} />
        ))}
      </ul>
    </div>
  );
};
