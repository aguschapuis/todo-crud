// context/AppContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ToDo } from "../models/interfaces/ToDo";
import { User } from "../models/interfaces/User";
import { getTodos } from "../services/getTodos";

interface AppContextProps {
  todos: ToDo[];
  user: User;
  setTodos: (todos: ToDo[]) => void;
  setUser: (user: User) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [user, setUser] = useState<User>({
    email: "",
    id: 1,
    name: "",
    phone: "",
  });

  const loadData = async () => {
    const tasks = await getTodos();
    setTodos(tasks.slice(0, 3));
  };

  useEffect(() => {
    if (todos.length === 0) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ todos, user, setTodos, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Error: Use inside AppProvider");
  }
  return context;
};
