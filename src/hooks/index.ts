import { useContext } from "react"
import { AuthContext } from "../contexts/Auth"
import { TransactionsContext } from "../contexts/Transactions"

export const useTransactions = () => {
  return useContext(TransactionsContext)
}

export const useAuth = () => {
  return useContext(AuthContext)
}
