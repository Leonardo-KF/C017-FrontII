import { FormEvent, useState } from "react";
import { StyledForm, StyledLoginForm } from "./styles";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { api } from "../../../utils/api/api";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../celules/loading/loading";
import { useAuth } from "../../../hooks/useAuth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginPayload = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    setLoading(false);
    const user = await login(loginPayload);
    if (!user) {
      setError(true);
      return;
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <StyledLoginForm>
          <h2>Login</h2>
          <StyledForm onSubmit={handleSubmit} error={error}>
            <input placeholder="Seu email" name="email" required />
            <div>
              <input
                placeholder="Sua senha"
                type={showPassword ? "text" : "password"}
                name="password"
                required
              />
              <button type="button" onClick={handleShowPassword}>
                {showPassword ? (
                  <BsEyeSlashFill size={25} />
                ) : (
                  <BsEyeFill size={25} />
                )}
              </button>
            </div>
            <button type="submit">Login</button>
          </StyledForm>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Not have Account?
          </button>
        </StyledLoginForm>
      )}
    </>
  );
}
