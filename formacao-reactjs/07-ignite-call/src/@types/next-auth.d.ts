// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    avatar_url: string
  }

  export interface Session {
    user: User
  }

  export interface Account {
    id: string
    user_id: string
    type: string
    provider: string
    provider_account_id: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }
}
