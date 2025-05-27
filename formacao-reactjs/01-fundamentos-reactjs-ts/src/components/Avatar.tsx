import { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'

type AvatarProps = {
  src: string
  noBorder?: boolean
  alt?: string
} & ImgHTMLAttributes<HTMLImageElement>

export const Avatar = ({ noBorder, ...restProps }: AvatarProps) => {
  return (
    <img className={noBorder ? styles.avatar : styles.avatarWithBorder} {...restProps} />
  )
}