import styled from "styled-components";
import { darken, transparentize } from 'polished'

export const Container = styled.div``

export const Form = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;

    border-radius: 0.25rem;
    border: 1px solid var(--modal-input-border);
    background: var(--modal-input-background);

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--modal-input-text)
    }

    & + input {
      margin-top: 2rem;
    }
  }

  button[type=submit] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: var(--text-white);
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;

    transition: filter 2s;

    &:hover {
      filter: brightness(0.95);
    }
  }
`

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`

type ButtonProps = {
  isActive: boolean
  activeColor: 'deposit' | 'withdraw'
}

const colors = {
  deposit: '#33cc95',
  withdraw: '#e52e4d'
}

export const ButtonBox = styled.button<ButtonProps>`
  height: 4rem;
  border: 1px solid var(--modal-input-border);
  border-radius: 0.25rem;

  background: ${({ isActive, activeColor }) => isActive
    ? transparentize(0.9, colors[activeColor])
    : 'transparent'
  };

  display: flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s;

  &:hover {
    border-color: ${darken(0.1, '#d7d7d7')};
  }

  img {
    width: 20px;
    height: 20px;
  }

  span {
    display: inline-block;
    margin-left: 1rem;
    font-size: 1rem;
    color: var(--text-title);
  }
`
