import { Input } from "@/components/ui/input";
import { type FC } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ProductListToolbarProps = {
  className?: string;
};

export const ProductListToolbar: FC<ProductListToolbarProps> = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Tabs
          defaultValue="male"
          className="w-[400px]"
          onValueChange={(value) => console.log(value)}
        >
          <TabsList>
            <TabsTrigger value="male">Male</TabsTrigger>
            <TabsTrigger value="female">Female</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Input
        placeholder="Filter products..."
        className="h-8 w-[150px] lg:w-[250px]"
      />
    </div>
  );
};
