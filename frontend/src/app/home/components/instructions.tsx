import { useAppStore } from "@/core/stores/store";
import { fCurrency, fPercent } from "@/lib/format/format-number";
import { EditIcon } from "lucide-react";
import { useContext, type FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingsContext } from "@/context/settings-provider";

export type InstructionsProps = {
  className?: string;
};

export const Instructions: FC<InstructionsProps> = () => {
  const { allowRegistration, allowOverBudget, overBudgetDiscount } =
    useContext(SettingsContext);
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">
          {t("Instructions")}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="list-disc list-inside space-y-2">
          <li className="text-sm">{t("Instructions Step 1")}</li>
          <li className="text-sm">
            {t("Instructions Step 2")}{" "}
            <span className="font-semibold">
              {fCurrency(Number(useAppStore.getState().budget))}
            </span>
          </li>
          <li className="text-sm">
            {t("Instructions Step 3")}{" "}
            <EditIcon className="h-4 w-4 inline text-orange-500" />
          </li>
          {!allowRegistration && (
            <li className="text-sm font-semibold text-red-500">
              {t("Registration has been disabled")}
            </li>
          )}
          {allowOverBudget && Number(overBudgetDiscount) > 0 ? (
            <li className="text-sm">
              <Trans
                i18nKey={"Instructions Step 4"}
                values={{
                  discount: fPercent(Number(overBudgetDiscount)),
                }}
                components={{ p: <p /> }}
              />
            </li>
          ) : null}
        </ul>
      </CardContent>
    </Card>
  );
};
