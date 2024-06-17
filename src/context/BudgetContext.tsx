import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer";
import { Expense } from "../types/Expense";

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  budgetLeft: number
  totalExpenses: number
}

type BudgetProviderProps = {
  children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = state.expenses.reduce((acc: number, expense: Expense) => acc + expense.amount, 0);
  const budgetLeft = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        budgetLeft,
        totalExpenses,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}
