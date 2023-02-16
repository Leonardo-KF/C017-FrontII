import {
  ReactNode,
  SetStateAction,
  createContext,
  useState,
  Dispatch,
  useEffect,
} from "react";
import { User } from "../utils/types/data";
import { api } from "../utils/api/api";
import { LoginRequest } from "../utils/types/requests";
import { useNavigate } from "react-router-dom";

const defaultValue = {
  user: {} as User,
  setUser: () => {},
  login: () => Promise.resolve(undefined),
};

type ContextProps = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  login: (data: LoginRequest) => Promise<undefined | User>;
};

export const AuthContext = createContext<ContextProps>(defaultValue);

//HOC -> Higher Order Component

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(false);

  async function login(data: LoginRequest) {
    setLoading(true);
    const userData = await api.login(data);
    if (!userData) {
      setLoading(false);
      return;
    }
    setLoading(false);
    setUser(userData);
    if (userData.role === "student" && userData.classroomStudentId) {
      navigate("/classroom/" + userData.classroomStudentId);
      return;
    }
    navigate("/classroom");
    return userData;
  }

  async function getLoggedUser() {
    const userData = await api.authorization();
    if (!userData) {
      setUser({} as User);
      return;
    }
    setUser(userData);
  }

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login }}>
      {loading ? (
        <div>
          <h2>Loading...</h2>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
