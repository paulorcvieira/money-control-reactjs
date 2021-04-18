import logo from '../../assets/logo.svg'

import * as S from './styles'

type HeaderProps = {
  onOpenNewTransaction: () => void
}

export const Header = ({ onOpenNewTransaction }: HeaderProps) => {

  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt="money control"/>
        <button type="button" onClick={() => onOpenNewTransaction()}>
          Nova transação
        </button>
      </S.Content>
    </S.Container>
  )
}
