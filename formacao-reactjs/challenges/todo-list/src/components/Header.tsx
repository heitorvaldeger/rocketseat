import styles from './Header.module.css'

import rocketSvg from '../assets/images/rocket.svg'

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={rocketSvg} alt="TODO Logo" />
      <span className={styles.highlight}></span>
    </header>
  )
}