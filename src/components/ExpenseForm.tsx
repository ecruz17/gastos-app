import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { categories } from "../data/categories";
import DatePicker from "react-date-picker";

import { DraftExpense, Value } from "../types/Expense";
import 'react-calendar/dist/Calendar.css';
import 'react-date-picker/dist/DatePicker.css';
import ErrorMsg from "./ErrorMsg";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {

  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');

  const { dispatch, state } = useBudget();

  useEffect(() => {
    if (state.editingId){
      const editingExpense = state.expenses.filter(currExp => currExp.id === state.editingId)[0];
      setExpense(editingExpense);
    }
  }, [state.editingId])
  

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);
    
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    })
  }


  const isValidAmount = useMemo(() => {
    return isNaN(expense.amount) || expense.amount <= 0;
  }, [expense.amount])

  const handleDateChange = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes('')) {
      setError('¡Todos los campos son obligatorios!');
      return;
    }

    //añadir o actualizar gasto
    if(state.editingId){
      dispatch({type: 'edit-expense', payload: {expense: {id: state.editingId, ...expense}} })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }

    //reiniciar estado
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    });
  }
  
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <legend
        className="uppercase text-2xl text-center font-black border-b-2 border-blue-500 py-2"
      >
        {state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'}
      </legend>

      {error && <ErrorMsg>{error}</ErrorMsg>}
    
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl text-black font-semibold text-start">
          Nombrar Gasto:
        </label>
        <input
          id="expenseName"
          type="text"
          className="w-full bg-white border border-gray-300 p-2 rounded"
          placeholder="Nombra tu gasto"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl text-black font-semibold text-start">
          Gasto:
        </label>
        <input
          id="amount"
          type="number"
          className="w-full bg-white border border-gray-300 p-2 rounded"
          placeholder="Coloca la cantidad de $"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl text-black font-semibold text-start">
          Categoría:
        </label>
        <select
          id="category"
          className="w-full bg-white border border-gray-300 p-2 rounded"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccionar --</option>
          {
            categories.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-xl text-black font-semibold text-start">
          Fecha de Gasto:
        </label>
        
        <DatePicker
          className='bg-slate-100 p-2 border-0'
          value={expense.date}
          onChange={handleDateChange}
        />
      </div>

      <input
        type="submit"
        value={state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'}
        disabled={isValidAmount}
        className="bg-blue-500 hover:bg-blue-600 duration-100 cursor-pointer 
                      px-4 py-2 w-full text-white font-semibold uppercase rounded disabled:bg-opacity-30"
      />

    </form>
  )
}

export default ExpenseForm