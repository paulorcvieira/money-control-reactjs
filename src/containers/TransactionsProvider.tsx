import { ReactNode, useCallback, useEffect, useState } from "react";
import { Type } from "../components/NewTransactionModal";
import { TransactionsContext } from "../contexts/Transactions";
import { useAuth } from "../hooks";
import { api } from "../services/api";

interface TransactionsProviderProps {
  children: ReactNode;
}

export interface TransactionItemProps {
  id: number;
  title: string;
  type: Type;
  category: string;
  amount: number;
  createdAt: string;
}

export type NewTransactionInput = Omit<
  TransactionItemProps,
  "id" | "createdAt"
>;
// type NewTransactionInput = Prick<TransactionItemProps, 'title' | 'amount' | 'type' | 'category'>

interface TransactionResponseProps {
  transaction: TransactionItemProps;
}

interface TransactionsResponseProps {
  transactions: TransactionItemProps[];
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { user, signed } = useAuth();
  const [transactions, setTransactions] = useState<TransactionItemProps[]>([]);

  const createTransaction = useCallback(async (transaction: NewTransactionInput) => {
    const response = await api.post<TransactionResponseProps>(
      "/transactions",
      transaction,
      {
        headers: {
          username: user?.username,
          token: user?.token
        }
      }
    );
    return setTransactions([...transactions, response.data.transaction]);
  }, [transactions, user?.username, user?.token])

  useEffect(() => {
    if (signed) {
      api
        .get<TransactionsResponseProps>("/transactions", {
          headers: {
            username: user?.username,
            token: user?.token
          }
        })
        .then(response => setTransactions(response.data.transactions));
    } else {
      setTransactions([]);
    }
  }, [signed, user]);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
