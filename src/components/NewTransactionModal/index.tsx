import { FormEvent, useCallback, useState } from 'react'
import Modal from 'react-modal'

import * as S from './styles'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { api } from '../../services/api'

type NewTransactionModalProps = {
  isOpen: boolean
  onRequestClose: () => void
}

Modal.setAppElement('#root')

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const handleCreateNewTransaction = useCallback((event: FormEvent) => {
    event.preventDefault()

    const data = {
      title,
      value,
      type,
      category,
    }

    api.post('/transactions', data)
  }, [title, type, value, category])

  return (
    <S.Container>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >

        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <S.Form onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar Transação</h2>

          <input
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={event => setValue(Number(event.target.value))}
          />

          <S.TransactionTypeContainer>
            <S.ButtonBox
              type="button"
              onClick={() => setType('deposit')}
              isActive={type === 'deposit'}
              activeColor="deposit"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </S.ButtonBox>

            <S.ButtonBox
              type="button"
              onClick={() => setType('withdraw')}
              isActive={type === 'withdraw'}
              activeColor="withdraw"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </S.ButtonBox>
          </S.TransactionTypeContainer>

          <input
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button type="submit">
            Cadastrar
          </button>
        </S.Form>
      </Modal>
    </S.Container>
  )
}
