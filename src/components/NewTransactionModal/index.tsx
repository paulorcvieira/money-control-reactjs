import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { useTransactions } from "../../hooks";

import * as S from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export type Type = "deposit" | "withdraw";

interface FormValues {
  title: string;
  value: number;
  category: string;
}

type FormObjectValue = "title" | "value" | "category";

export function NewTransactionModal({
  isOpen,
  onRequestClose
}: NewTransactionModalProps) {
  const [type, setType] = useState<Type>("deposit");
  const [values, setValues] = useState<FormValues>({
    title: "",
    category: "",
    value: 0
  });

  const { createTransaction } = useTransactions();

  function handleSetTypeDeposit() {
    setType("deposit");
  }

  function handleSetTypeWithdraw() {
    setType("withdraw");
  }

  function handleChange(prop: FormObjectValue, value: string | number) {
    setValues({ ...values, [prop]: value });
  }

  function clearValues() {
    setValues({ title: "", category: "", value: 0 });
    setType("deposit");
  }

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title: values.title,
      type,
      category: values.category,
      amount: values.value
    };

    createTransaction(data)
      .then(() => {
        clearValues();
        onRequestClose();
      })
      .catch(() =>
        alert(
          "Não foi possível criar um cadastro de transação. Tente novamente mais tarde"
        )
      );
  }

  return (
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
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={values.title}
          onChange={event => handleChange("title", event.target.value)}
        />
        <input
          placeholder="Valor"
          type="number"
          onChange={event => handleChange("value", Number(event.target.value))}
        />

        <S.TransactionTypeContainer>
          <S.ButtonBox
            type="button"
            onClick={handleSetTypeDeposit}
            isActive={type === "deposit"}
            activeColor="deposit"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </S.ButtonBox>
          <S.ButtonBox
            type="button"
            onClick={handleSetTypeWithdraw}
            isActive={type === "withdraw"}
            activeColor="withdraw"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </S.ButtonBox>
        </S.TransactionTypeContainer>

        <input
          placeholder="Categoria"
          onChange={event => handleChange("category", event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </S.Form>
    </Modal>
  );
}
