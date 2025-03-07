"use client";
import MedicineLoader from "@/components/loader";
import { getCurrentUser } from "@/services/AuthService";
//import { IUser } from "@/types/User";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
interface IUserCookie {
  exp: number;
  iat: number;
  role: string;
  userId: string;
}
interface IUserContext {
  user: IUserCookie | null;
  setUser: React.Dispatch<React.SetStateAction<IUserCookie | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserCookie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    console.log("user context", user);
    
    setIsLoading(false);
  };
  useEffect(() => {
    handleUser();
  }, [isLoading]);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <MedicineLoader />
      </div>
    );
  }
  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context == undefined) {
    throw new Error("UseUser must be used within the userProvider context.");
  }
  return context;
};
export default UserProvider;
