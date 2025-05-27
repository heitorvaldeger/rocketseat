import styles from './Avatar.module.css'

export const Avatar = ({ noBorder, src }) => {
  return (
    <img className={noBorder ? styles.avatar : styles.avatarWithBorder} src={src} />
  )
}