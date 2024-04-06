import { Menu } from 'antd'
import { AppRoutes, RoutePath } from '../AppRouter/routerConfig'
import styles from './Navbar.module.scss'
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

interface LinkConfig {
  key: AppRoutes
  label: ReactNode
}

export const Navbar = () => {
  const linkConfig: LinkConfig[] = [
    { key: AppRoutes.FILM, label: <Link to={RoutePath.movies}>Фильмы</Link> },
    {
      key: AppRoutes.RANDOM,
      label: <Link to={RoutePath.random}>Случайный фильм</Link>,
    },
  ]

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      className={styles.menu}
      defaultSelectedKeys={[AppRoutes.FILM]}
      items={linkConfig}
    />
  )
}
