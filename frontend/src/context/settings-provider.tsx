import { URSettings } from "@/types/UniformRegistration/URSettings";
import { useFrappeGetCall } from "frappe-react-sdk";
import React, { createContext } from "react";

interface SettingsContextProps {
  allowOverBudget?: 0 | 1;
  allowRegistration?: 0 | 1;
  tailorMadePrice?: number;
  overBudgetDiscount?: number;
}

export const SettingsContext = createContext<SettingsContextProps>({
  allowOverBudget: 0,
  allowRegistration: 1,
  tailorMadePrice: 0,
  overBudgetDiscount: 0,
});

export const SettingsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { data } = useFrappeGetCall<{ message: URSettings }>(
    "uniform_registration.api.settings.get_settings"
  );

  const settings = {
    allowOverBudget: data?.message.allow_over_budget,
    allowRegistration: data?.message.allow_registration,
    tailorMadePrice: data?.message.tailor_made_price,
    overBudgetDiscount: data?.message.over_budget_discount,
  };

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};
