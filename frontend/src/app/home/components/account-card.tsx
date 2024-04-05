import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useContext, type FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CircleDollarSign } from "lucide-react";
import { AuthContext } from "@/context/auth-provider";
import { fCurrency } from "@/lib/format/format-number";

const getFirstLettersInFullName = (fullName: string | undefined) => {
  if (!fullName) return "";
  const [firstName, lastName] = fullName.split(" ");
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export const AccountCard: FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Card>
      <CardContent className="grid gap-4 mt-4">
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <Avatar>
            <AvatarImage src="currentUser.avatar" />
            <AvatarFallback>
              {getFirstLettersInFullName(currentUser?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-2xl font-semibold">{currentUser?.full_name}</p>
            <p className="text-normal text-muted-foreground">
              {currentUser?.title}
            </p>
          </div>
        </div>

        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <CircleDollarSign className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Budget</p>
            <p className="text-sm text-muted-foreground">
              {fCurrency(Number(currentUser?.budget))}
            </p>
          </div>
        </div>

        {/* <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <ShoppingCart className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Package</p>
            <p className="text-sm text-muted-foreground">Item 1</p>
            <p className="text-sm text-muted-foreground">Item 2</p>
            <p className="text-sm text-muted-foreground">Item 3</p>
            <p className="text-sm text-muted-foreground">Item 4</p>
          </div>
        </div> */}
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit</Button>
      </CardFooter>
    </Card>
  );
};
