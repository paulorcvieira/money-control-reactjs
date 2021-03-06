import { ReactNode, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext, User, UserInput } from "../contexts/Auth";
import { api } from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthenticateResponseProps {
  user?: User;
  error?: string;
}

export function UserProvider({ children }: AuthProviderProps) {
  const [signed, setSigned] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const Authenticate = useCallback(async (user: UserInput) => {
    return api
      .post<AuthenticateResponseProps>("/auth", user)
      .then(response => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setUser(response.data.user!);
          setSigned(true);
        }
      })
      .catch(() => {
        toast.error("Erro no sistema de login.");
      });
  }, [])

  const Register = useCallback(async (user: UserInput) => {
    return api
      .post<AuthenticateResponseProps>("/signup", user)
      .then(response => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setUser(response.data.user!);
          setSigned(true);
        }
      })
      .catch(() => {
        toast.error("Erro no sistema de login.");
      });
  }, [])

  const Logout = useCallback(async () => {
    setUser(null);
    setSigned(false);
  }, [])

  return (
    <AuthContext.Provider
      value={{ signed, user, Authenticate, Register, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
