import { categories } from '../data/categories';
import { useBudget } from "../hooks/useBudget";

export const FilterCategory = () => {

  const { dispatch } = useBudget();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'add-category-filter',
      payload: { id: e.target.value }
    })
  }

  return (
    <div className="bg-white shadow-md rounded-md p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category" className="font-semibold text-gray-500">Filtrar Gastos:</label>
          <select
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded-md"
            onChange={handleChange}
          >
            <option value="">-- Todas las Categorías --</option>
            {categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div> 
      </form>
    </div>
  )
}
