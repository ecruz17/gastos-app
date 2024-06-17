import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import { formatDate } from "../helpers";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";
import { Value } from "../types/Expense";
import { Category } from "../types/Category";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css";

interface Props {
  name: string;
  amount: number;
  date: Value;
  category: string;
  id: string;
}

const ExpenseCard = ({ name, date, amount, category, id }: Props) => {

  const { dispatch } = useBudget();

  const categoryInfo: Category = useMemo(() => categories.filter(cat => cat.id === category)[0], [category]);

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: 'get-expense-by-id', payload: { id } }),
          dispatch({ type: 'show-modal' })
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => dispatch({ type: 'remove-expense', payload: { id } })}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
        <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div key={id} className="bg-white p-8 w-full rounded-lg hover:shadow-lg hover:bg-gray-100">      
        <div className="flex gap-4">
          <img
            className="w-10 lg:w-14"
            src={`/icono_${categoryInfo.icon}.svg`}
            alt="icono_categoría"
          />        
        <div className="grid grid-cols-2 gap-8 items-center w-full">
          <div>
            <span className="text-slate-500 uppercase font-bold">
              {
                categoryInfo.name
              }
            </span>
            <p className="text-lg font-bold">{name}</p>
              <div className="grid grid-cols-1 text-xs lg:text-sm w-full">
              <p>{formatDate(date!.toString())}</p>
            </div>
          </div>
          <div className="flex flex-row justify-end items-end">
          <AmountDisplay
            amount={amount}
            />
          </div>
        </div>
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default ExpenseCard