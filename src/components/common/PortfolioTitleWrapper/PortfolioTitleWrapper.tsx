import { ReactNode } from "react"

export const PortfolioTitleWrapper = ({children}:{children: ReactNode}) => {
  return (
    <div className={`p-6 bg-[url('@/assets/images/classicCase.webp')] bg-cover flex-1 flex flex-col justify-between rounded-xl shadow-sm`}>
      {children}
    </div>
  )
}