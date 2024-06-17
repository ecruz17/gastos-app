import { useBudget } from "./hooks/useBudget"
import { BudgetForm, BudgetTracker, ExpenseList, FilterCategory } from "./components";
import { useEffect, useMemo } from 'react';
import ExpenseModal from "./components/ExpenseModal";

function App() {

  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state])
  

  return (
    <div className="bg-slate-100 h-[100vh]">
      <header className="bg-blue-500 fixed w-full p-8 shadow-md">
        <h1 className="uppercase text-4xl text-white font-black text-center">
          Planificador de Gastos - App
        </h1>
      </header>

      <div className="pt-48 bg-slate-white">
        <div className="max-w-3xl mx-4 md:mx-auto bg-white shadow-lg rounded-lg p-10"> 
          {
            isValidBudget
              ? <BudgetTracker />
              : <BudgetForm />
          }
        </div>
        {
          isValidBudget &&
          (
            <main className="max-w-3xl mx-auto py-10">
              <FilterCategory />
              <ExpenseList /> 
              <ExpenseModal />
            </main>
          )
          }
      </div>
    </div>
  )
}

export default App
