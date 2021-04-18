import { FormEvent, useCallback, useState } from "react"
import { Link } from "react-router-dom"
import logoImg from "../../assets/logo.svg"
import { useAuth } from "../../hooks"

import { Container } from "./styles"

interface FormValues {
  username: string;
  password: string;
}

type FormObjectValue = "username" | "password"

export const SignUp = () => {
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: ""
  });
  const { Register } = useAuth()

  const handleChange = useCallback((prop: FormObjectValue, value: string | number) => {
    setValues({ ...values, [prop]: value })
  }, [values])

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault()

    const { username, password } = values;

    Register({
      username,
      password
    })
  }, [Register, values])

  return (
    <Container>
      <header>
        <img src={logoImg} alt="dt money" />
      </header>
      <form onSubmit={handleSubmit}>
        <h2>Criar uma conta</h2>
        <input
          placeholder="Usuário"
          value={values.username}
          onChange={event => handleChange("username", event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={values.password}
          onChange={event => handleChange("password", event.target.value)}
        />

        <button type="submit">Fazer o registro</button>
        <Link to="/">Já tenho uma conta</Link>
      </form>
    </Container>
  )
}
