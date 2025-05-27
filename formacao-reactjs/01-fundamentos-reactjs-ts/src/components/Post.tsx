import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

import { Post as PostModel } from '../models/post'

export type PostProps = Omit<PostModel, 'id'>

export const Post = ({ author, publishedAt, content }: PostProps) => {
  const [comments, setComments] = useState<string[]>([])
  const [newCommentText, setNewCommentText] = useState('')

  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  const handleCreateNewComment = (e: FormEvent) => {
    e.preventDefault()
    if (newCommentText) {
      setComments([...comments, newCommentText])
      setNewCommentText('')
    }
  }

  const handleNewCommentInvalid = (e: InvalidEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('Esse campo é obrigatório')
  }

  const handleNewCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.setCustomValidity('')
    setNewCommentText(e.target.value)
  }

  const handleDeleteComment = (commentToDelete: string) => {
    const commentsWithoutDeleteOne = comments.filter(comment => comment !== commentToDelete)
    setComments(commentsWithoutDeleteOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
          Publicado {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {
          content.map((line, idx) => {
            if (line.type === 'paragraph') {
              return <p key={idx}>{line.content}</p>
            } else if (line.type === 'link') {
              return <p key={idx}><a href="">{line.content}</a></p>
            }
          })
        }
      </div>
      
      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>
          Deixe seu feedback
        </strong>

        <textarea
          value={newCommentText}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment, idx) => 
          <Comment 
            key={idx} 
            content={comment} 
            onDeleteComment={handleDeleteComment} 
          />)}
      </div>
    </article>
  )
}