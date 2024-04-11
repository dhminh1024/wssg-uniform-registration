import { useContext, type FC, useState, useCallback, useMemo } from "react";
import { ProductListToolbar } from "./product-list-toolbar";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { FullPageLoader } from "@/components/state/full-page-loader";
import { ErrorBanner } from "@/components/state/error-banner";
import { EmptyContent } from "@/components/state/empty";
import { ProductListItem } from "./product-list-item";
import { URItem } from "@/types/UniformRegistration/URItem";
import { AuthContext } from "@/context/auth-provider";
import { useDebounce } from "@/hooks/use-debounce";
import { useAppStore } from "@/core/stores/store";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "@/context/settings-provider";

export type ProductListProps = {
  className?: string;
};

export const ProductList: FC<ProductListProps> = () => {
  const { currentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery);
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useFrappeGetDocList<URItem>("UR Item", {
    fields: ["*"],
    filters: [["title", "like", `%${debouncedQuery}%`]],
    orderBy: {
      field: "title",
      order: "asc",
    },
    asDict: true,
  });
  const { t } = useTranslation();

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);
  const budgetLeft = useAppStore((state) => state.budgetLeft);
  const budget = useAppStore((state) => state.budget);
  const { allowOverBudget } = useContext(SettingsContext);

  // filter products based on user's gender
  const filteredProducts = useMemo(() => {
    return products
      ? products.filter(
          (product) =>
            (product.gender === currentUser?.gender ||
              product.gender === "All") &&
            product.price <= (allowOverBudget ? budget : budgetLeft)
        )
      : [];
  }, [products, currentUser, budget, budgetLeft, allowOverBudget]);

  useFrappeDocTypeEventListener("UR Item", () => {
    mutate();
  });

  if (isLoading) return <FullPageLoader />;
  if (error) return <ErrorBanner error={error} />;
  if (!products) return <EmptyContent />;

  return (
    <div className="space-y-4">
      <ProductListToolbar searchQuery={searchQuery} onSearch={handleSearch} />
      {filteredProducts.length === 0 ? (
        <EmptyContent text={t("Product List Empty")} />
      ) : (
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProducts.map((product) => (
            <ProductListItem key={product.name} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};
