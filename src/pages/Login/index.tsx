import { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks";

import { Container } from "./styles";

interface FormValues {
  username: string;
  password: string;
}

type FormObjectValue = "username" | "password";

export const Login = () => {
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: ""
  });
  const { Authenticate } = useAuth();

  const handleChange = useCallback((prop: FormObjectValue, value: string | number) => {
    setValues({ ...values, [prop]: value });
  }, [values])

  const handleSubmit = useCallback((ev: FormEvent) => {
    ev.preventDefault();

    const { username, password } = values;

    Authenticate({
      username,
      password
    });
  }, [Authenticate, values])

  return (
    <Container>
      <header>
        <img src={logoImg} alt="dt money" />
      </header>
      <form onSubmit={handleSubmit}>
        <h2>Fazer login</h2>
        <input
          placeholder="Usuário"
          value={values.username}
          onChange={ev => handleChange("username", ev.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={values.password}
          onChange={ev => handleChange("password", ev.target.value)}
        />

        <button type="submit">Fazer login</button>
        <Link to="/signup">Criar uma conta</Link>
      </form>
    </Container>
  );
}
