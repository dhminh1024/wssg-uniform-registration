import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useContext, type FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CircleDollarSign } from "lucide-react";
import { AuthContext } from "@/context/auth-provider";
import { fCurrency } from "@/lib/format/format-number";
import { useAppStore } from "@/core/stores/store";

import { useTranslation } from "react-i18next";

const getFirstLettersInFullName = (fullName: string | undefined) => {
  if (!fullName) return "";
  const [firstName, lastName] = fullName.split(" ");
  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};

export const AccountCard: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useTranslation();

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
            <p className="text-lg font-semibold">{currentUser?.full_name}</p>
            <p className="text-muted-foreground">{currentUser?.title}</p>
          </div>
        </div>

        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <CircleDollarSign className="mt-px h-5 w-5" />
          <div className="space-y-1">
            <p className="text-lg font-medium leading-none">{t("Budget")}</p>
            <p className="text-sm text-muted-foreground">
              {fCurrency(Number(useAppStore.getState().budget))}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full hidden">Submit</Button>
      </CardFooter>
    </Card>
  );
};
