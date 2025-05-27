import { User } from "./user"

export interface Issue {
  number: number
  title: string
  body: string
  created_at: string
  user: User
  comments: number
  html_url: string
}