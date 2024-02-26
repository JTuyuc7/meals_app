import Link from 'next/link'
import logoImg from '@/assets/logo.png'
import styles from './main-header.module.css'
import Image from 'next/image'
import NavLink from './nav-link'

export default function MainHeader() {
  return (
    <>
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
          <Image
            src={logoImg.src}
            alt="Logo Image"
            width={300}
            height={300}
            priority
          />
          NextLevel Food
        </Link>
        <nav className={styles.nav}>
          <ul>
            <li>
              <NavLink href="meals" text="Browse Meals" />
            </li>
            <li>
              <NavLink href="community" text="Community Foodies" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
