import * as S from "./styles";

export const TransactionsTable = () => {
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
            <tr>
              <td>Título</td>
              <td className="type">R$ 200,00</td>
              <td>Categoria</td>
              <td>Data</td>
            </tr>
        </tbody>
      </table>
    </S.Container>
  );
}