import { useEffect, useState } from "react";
import { api } from "../../services/api";
import * as S from "./styles";

type Transactions = {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    api.get('http://localhost:3000/api/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  return (
    <S.Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
            {transactions.map((transition) => (
              <tr key={transition.id}>
                <td>{transition.title}</td>
                <td className={transition.type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(transition.amount)}
                </td>
                <td>{transition.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transition.createdAt)
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </S.Container>
  );
}
