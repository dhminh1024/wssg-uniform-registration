import { create } from "zustand";
import createSelectors from "./create-selectors";

interface AppState {
  budget: number;
  setBudget: (budget: number) => void;
  orderTotalPrice: number;
  setOrderTotalPrice: (orderTotalPrice: number) => void;
  budgetLeft: number;
}

const useAppState = create<AppState>()((set) => ({
  budget: 0,
  setBudget: (budget) =>
    set((state) => ({
      budget: budget,
      budgetLeft: budget - state.orderTotalPrice,
    })),
  orderTotalPrice: 0,
  setOrderTotalPrice: (orderTotalPrice) =>
    set((state) => ({
      orderTotalPrice: orderTotalPrice,
      budgetLeft: state.budget - orderTotalPrice,
    })),
  budgetLeft: 0,
}));

export const useAppStore = createSelectors(useAppState);
