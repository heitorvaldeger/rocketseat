import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { User } from "../models/user";
import { USER_REPOSITORY_GITHUB_PATH } from "../constants";

interface UserContextValues {
  user: User | null
  fetchUser: () => void
}

export const UserContext = createContext({} as UserContextValues)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = async () => {
    const response = await api.get(`users/${USER_REPOSITORY_GITHUB_PATH.split('/')[0]}`)
    const user = response.data

    setUser(user)
  }

  useEffect(() => {
    if (!user) {
      fetchUser()
    }
  }, [])

  return (
    <UserContext.Provider value={{
      user,
      fetchUser
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const issueContext = useContext(UserContext)
  if (!issueContext) {
    throw new Error('UserContext creation failed!')
  }

  return issueContext
}