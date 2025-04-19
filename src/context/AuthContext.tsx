import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  accesToken: null;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const AuthProvider = (props: Props) => {

  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState(null);


  useEffect(() => {
    (async () => {
      setLoading(false)
    })()
  }, [])


  const reLogin = async (refreshToken: string) => {

  }

  const login = async () => {

  }

  const logout = async () => {

  }

  const updateUser = async () => {

  }


  const data = {
    accesToken: token,
    user,
    login,
    logout,
    updateUser
  };

  if (loading) return null

  return (
    <AuthContext.Provider value={data}  >
      {children}
    </AuthContext.Provider>
  )

};

