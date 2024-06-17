import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetTracker = () => {
  const { totalExpenses, budgetLeft, state, dispatch } = useBudget();

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col justify-center items-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: state.budget < totalExpenses ? 'red' : '#3b82f6',
            trailColor: 'gray',
            strokeLinecap: 'round',
            textSize: '10px',
            textColor: state.budget < totalExpenses ? 'red' : '#3b82f6'
          })}
          text={`${percentage}% Gastado`}
        />
        {/* <img src="/grafico.jpg" alt="Gráfica de gastos" /> */}
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <button
          type="button"
          className="bg-pink-500 hover:bg-pink-600 duration-100 cursor-pointer 
                      px-4 py-2 w-auto text-white font-semibold uppercase rounded disabled:bg-opacity-30"
          onClick={()=> dispatch({ type: 'reset-app' })}
        >
          Resetear presupuesto
        </button>

        <div className="flex flex-col justify-end items-end gap-4">
          <AmountDisplay
            amount={state.budget}
            label="Presupuesto"
          />
          <AmountDisplay
            amount={totalExpenses}
            label="Gastado"
          />
          <div className="h-[2px] bg-blue-500 w-full"></div>
          <AmountDisplay
            amount={budgetLeft}
            label="Sobrante"
            isOverbudget={state.budget < totalExpenses}
          />
        </div>
        
      </div>
    </div>
  )
}
