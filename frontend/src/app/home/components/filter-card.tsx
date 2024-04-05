import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type FC } from "react";

export const FilterCard: FC = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Filter</CardTitle>
        <CardDescription>Filter products</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <h1>Filter criteria</h1>
      </CardContent>
      <CardFooter>
        <span>Card Footer</span>
      </CardFooter>
    </Card>
  );
};
