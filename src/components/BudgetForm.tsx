import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export const BudgetForm = () => {
  
  const [budget, setBudget] = useState<number>(0);
  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber);
  } 
  
  const isValidNum = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget])

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: 'add-budget', payload: {budget}})
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-500 font-bold text-center">
          Definir Presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray-300 p-2 rounded"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <input
          type="submit"
          value="Definir presupuesto"
          className="bg-blue-500 hover:bg-blue-600 duration-100 cursor-pointer 
                      px-4 py-2 w-auto text-white font-semibold uppercase rounded disabled:bg-opacity-30"
          disabled={isValidNum}
        />
      </div>
    </form>
  )
}
