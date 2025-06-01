import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserController } from '../api/auth/user';
import { Auth } from '../api/auth/auth';
import { hasExpiredToken } from '../utils/token';

export type Usuario = {
  _id: string;
  name: string;
  email: string;
  firstname: string,
  lastname: string,
  avatar: string
};

export type AuthContextType = {
  accesToken: null;
  user: Usuario | null;
  login: (access: string) => Promise<void>
  logout: () => Promise<void>;
  //updateUser: (key: keyof Usuario, value: string) => Promise<void>
  updateUser: (dataToUpdate: any) => Promise<void>
};

const userController = new UserController();
const authController = new Auth();

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const AuthProvider = (props: Props) => {

  const { children } = props;
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState(null);


  useEffect(() => {
    (async () => {

      const accessToken = await authController.getAccessToken();
      const refreshToken = await authController.getRefreshToken();

      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false)
        return
      }

      if (hasExpiredToken(accessToken)) {
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLoading(false)
    })()
  }, [])


  const reLogin = async (refreshToken: string) => {
    console.log("reLogin======>")

    const { accessToken } = await authController.refreshAccessToken(refreshToken);
    authController.setAccessToken(accessToken);
    await login(accessToken);

  }

  const login = async (accessToken: string) => {
    try {
      setLoading(true)

      //setUser({username: "Agustin"})
      //setToken(access);

      const usuario = await userController.getMe(accessToken);
      setUser(usuario);

      setLoading(false)
    } catch (error) {
      console.error(error)

      setLoading(false)
    }
  }

  const logout = async () => {
    setUser(null);
    setToken(null);

    authController.removeTokens();
  }

  const updateUser1 = async (key: keyof Usuario, value: string) => {


    setUser((prev) => ({
      ...prev,
      [key]: value,
    } as Usuario))



  }

  const updateUser = async (dataToUpdate: any) => {
    console.log("dataToUpdate===>", dataToUpdate)

    const resp = await userController.updateMe(dataToUpdate);

    console.log("respupdateUser===>", resp)

    if (resp?.data) {
      Object.keys(resp?.data).forEach((key) => {
        if (resp?.data[key]) {
          console.log("resp?.data[key]==>",resp?.data[key])
          setUser((prev) => ({
            ...prev,
            [key]: resp?.data[key],
          } as Usuario))
        }
      });
    }
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

