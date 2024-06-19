import { useBudget } from "./hooks/useBudget"
import { BudgetForm, BudgetTracker, ExpenseList, FilterCategory, Header } from "./components";
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
    <div className="bg-[#f0f0f0] h-[100vh]">
      <Header />

      <div className="pt-48 bg-[#f0f0f0]">
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
            </div>
          )
          }
      </div>
    </div>
  )
}

export default App
