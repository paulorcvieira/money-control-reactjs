import { useAuth } from '../../hooks'

import logo from '../../assets/logo.svg'

import * as S from './styles'

type HeaderProps = {
  onOpenNewTransactionModal: () => void
}

export const Header = ({ onOpenNewTransactionModal }: HeaderProps) => {
  const { Logout } = useAuth();

  const handleLogout = () => {
    Logout();
  }

  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt="money control"/>
        <button type="button" onClick={() => onOpenNewTransactionModal()}>
          Nova transação
        </button>
        <button type="button" onClick={handleLogout} className="logout">
          Logout
        </button>
      </S.Content>
    </S.Container>
  )
}
