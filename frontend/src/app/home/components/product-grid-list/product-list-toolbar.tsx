import { Input } from "@/components/ui/input";
import { useContext, type FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import Trans from "@/components/trans";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";

export type ProductListToolbarProps = {
  className?: string;
  searchQuery: string;
  onSearch: (search: string) => void;
};

export const ProductListToolbar: FC<ProductListToolbarProps> = ({
  searchQuery,
  onSearch,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Tabs
          // defaultValue={currentUser?.gender}
          className="w-full"
          onValueChange={(value) => console.log(value)}
          value={currentUser?.gender}
        >
          <TabsList>
            <TabsTrigger value="Male">
              <span className="text-base">
                <Trans i18nKey={"Male"} />
              </span>
            </TabsTrigger>
            <TabsTrigger value="Female">
              <span className="text-base">
                <Trans i18nKey={"Female"} />
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "text-base text-red-500 font-semibold hover:text-red-600 transition-colors",
          searchQuery ? "block" : "hidden"
        )}
        onClick={() => onSearch("")}
      >
        ⨉
      </Button>
      <Input
        placeholder={t("Filter products")}
        className="h-8 w-[150px] lg:w-[250px]"
        onChange={(event) => onSearch?.(event.target.value)}
        value={searchQuery}
      />
    </div>
  );
};
