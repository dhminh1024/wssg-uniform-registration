import { type FC } from "react";
import { CardContainer } from "./components/card-container";
import { AccountCard } from "./components/account-card";
import { CartCard } from "./components/cart-card";
import { FilterCard } from "./components/filter-card";
import { ProductListCard } from "./components/product-list-card";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

const DISPLAY_NAME = "Home";

const Component: FC = () => {
  return (
    <Container>
      {/* <h1 className="text-4xl font-bold">WSSG Uniform Registration 2024</h1>
      <Separator className="my-6" /> */}
      <div className="grid grid-cols-1 items-start justify-center gap-6 rounded-lg md:grid-cols-3">
        <div className="col-span-1 grid item-starts gap-6">
          <CardContainer>
            <AccountCard />
          </CardContainer>
          <CardContainer>
            <CartCard />
          </CardContainer>
        </div>
        <div className="col-span-1 grid item-starts gap-6 md:col-span-2">
          {/* <CardContainer>
            <FilterCard />
          </CardContainer> */}
          <CardContainer>
            <ProductListCard />
          </CardContainer>
        </div>
      </div>
    </Container>
  );
};

Component.displayName = DISPLAY_NAME;

export { Component };
