import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Post } from './components/Post'

import styles from './App.module.css'
import './global.css'
import { Post as PostModel } from './models/post'

const posts: PostModel[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/heitorvaldeger.png',
      name: "Heitor Valdeger",
      role: "Software Enginner"
    },
    content: [
      {
        type: "paragraph", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        type: "paragraph", content: "Tenetur illo doloremque fuga cum, exercitationem aperiam nostrum dignissimos mollitia placeat accusantium quia architecto omnis, impedit, molestias inventore blanditiis velit suscipit porro."
      },
      {
        type: "link", content: "jane.design/doctorcare"
      }
    ],
    publishedAt: new Date('2025-01-21 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/fabricyoc.png',
      name: "Fabricyo Costa",
      role: "Teacher"
    },
    content: [
      {
        type: "paragraph", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      },
      {
        type: "paragraph", content: "Tenetur illo doloremque fuga cum, exercitationem aperiam nostrum dignissimos mollitia placeat accusantium quia architecto omnis, impedit, molestias inventore blanditiis velit suscipit porro."
      },
      {
        type: "link", content: "jane.design/doctorcare"
      }
    ],
    publishedAt: new Date('2025-01-23 12:00:00')
  }
]
export function App() {
  return (
    <div>
      <Header />
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => (
              <Post key={post.id} author={post.author} content={post.content} publishedAt={post.publishedAt}/>
            ))
          }
        </main>
      </div>
    </div>
  )
}