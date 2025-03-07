"use client";

import MedicineLoader from "@/components/loader";
import { getCurrentUser } from "@/services/AuthService";
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
  refreshUser: () => void;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserCookie | null>(null);
  const [initialLoading, setInitialLoading] = useState(true); // This is only for the first load

  const fetchUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
  };

  const refreshUser = async () => {
    await fetchUser(); // No loading screen for refresh!
  };

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setInitialLoading(false); // Only remove loader after first fetch
    };
    loadUser();
  }, []);

  if (initialLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <MedicineLoader />
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider.");
  }
  return context;
};

export default UserProvider;
