import { formatCurrency } from "../helpers";

type AmountDisplayProps = {
  amount: number;
  label?: string;
  isOverbudget?: boolean;
}

const AmountDisplay = ({ amount, label, isOverbudget = false }: AmountDisplayProps) => {
  return (
    <p className={`text-2xl text-blue-500 font-bold`}>
      {label && `${label}: `}
      <span className={`${isOverbudget ? 'text-red-500' : 'text-black'}`}>
        {formatCurrency(amount)}
      </span>
    </p>
  )
}

export default AmountDisplay