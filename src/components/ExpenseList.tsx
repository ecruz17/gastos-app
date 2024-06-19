import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseCard from "./ExpenseCard";

export const ExpenseList = () => {

  const { state } = useBudget();
  
  const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses;
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses]);

  return (
    <div className="mt-10 p-4 md:p-0">
      {
        isEmpty
          ? (
            <p className="text-gray-500 text-2xl font-bold p-4 rounded-md bg-white shadow-md">
              {`No hay gastos :)`}
            </p>
          )
          : (
            <div className="bg-white rounded-md shadow-md p-4">
              <p key={state.editingId} className="text-gray-500 text-2xl font-bold mb-4">
                Lista de gastos:
              </p>
              {
                filteredExpenses.map((expense, index) => (
                  <>
                    <ExpenseCard
                      key={index}
                      id={expense.id}
                      name={expense.expenseName}
                      category={expense.category}
                      amount={expense.amount}
                      date={expense.date}
                    />
                  </>
                )
                )
              }
            </div>
          )
      }
    </div>
  )
}
