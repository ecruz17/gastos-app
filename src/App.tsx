import { useBudget } from "./hooks/useBudget"
import { BudgetForm, BudgetTracker, ExpenseList, FilterCategory, Header } from "./components";
import { useEffect, useMemo } from 'react';
import ExpenseModal from "./components/ExpenseModal";
import BudgetModal from "./components/BudgetModal";
import { HeartIcon } from "@heroicons/react/24/solid";

function App() {

  const { state } = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state])
  

  return (
    <div className="bg-[#f0f0f0] min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow pt-48 bg-[#f0f0f0]">
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
            <div className="max-w-3xl mx-auto py-10">
              <FilterCategory />
              <ExpenseList /> 
              <ExpenseModal />
              <BudgetModal />
            </div>
          )
        }
      </div>
        <footer className="flex items-center justify-center font-medium text-gray-800 p-4">
          <p>Made with</p>
          <div className="size-4 text-blue-500 ml-1">
            <HeartIcon />
          </div>
          <p className="ml-1">by</p>
          <a href="https://www.linkedin.com/in/ecruzdev/" className="font-bold ml-1 underline">ecruzdev</a>
        </footer>
    </div>
  )
}

export default App
