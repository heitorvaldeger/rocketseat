import { Author } from "./author"
import { PostContent } from "./post-content"

export interface Post {
  id: number
  author: Author
  content: PostContent[]
  publishedAt: Date
}