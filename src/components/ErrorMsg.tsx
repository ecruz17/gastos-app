import { PropsWithChildren } from "react"

const ErrorMsg = ({children}: PropsWithChildren) => {
  return (
    <p className="bg-red-500 text-white px-4 py-2 text-sm font-semibold text-center">
      {
        children
      }
    </p>
  )
}

export default ErrorMsg